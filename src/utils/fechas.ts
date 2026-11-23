interface FechaPartes {
  anio: number;
  mes: number;
  dia: number;
}

function parsearFechaISO(fechaISO: string): FechaPartes | null {
  const coincidencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaISO.trim());
  if (!coincidencia) return null;

  const anio = Number(coincidencia[1]);
  const mes = Number(coincidencia[2]);
  const dia = Number(coincidencia[3]);

  if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return null;

  const prueba = new Date(Date.UTC(anio, mes - 1, dia, 12, 0, 0));
  if (
    prueba.getUTCFullYear() !== anio ||
    prueba.getUTCMonth() !== mes - 1 ||
    prueba.getUTCDate() !== dia
  ) {
    return null;
  }

  return { anio, mes, dia };
}

function crearFechaMediodiaUTC(partes: FechaPartes): Date {
  return new Date(Date.UTC(partes.anio, partes.mes - 1, partes.dia, 12, 0, 0));
}

function normalizarHora(horaInicio: string): { horas: number; minutos: number } {
  const coincidencia = /^(\d{1,2}):(\d{2})$/.exec(horaInicio.trim());
  if (!coincidencia) return { horas: 17, minutos: 0 };

  const horas = Math.min(23, Math.max(0, Number(coincidencia[1])));
  const minutos = Math.min(59, Math.max(0, Number(coincidencia[2])));
  return { horas, minutos };
}

function pad2(valor: number): string {
  return String(valor).padStart(2, '0');
}

export function esFechaValida(fechaISO: string): boolean {
  return parsearFechaISO(fechaISO) !== null;
}

export function formatearFechaLarga(fechaISO: string): string {
  const partes = parsearFechaISO(fechaISO);
  if (!partes) return fechaISO;

  const fecha = crearFechaMediodiaUTC(partes);
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(fecha);
}

export function formatearFechaCorta(fechaISO: string): string {
  const partes = parsearFechaISO(fechaISO);
  if (!partes) return fechaISO;

  const fecha = crearFechaMediodiaUTC(partes);
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(fecha);
}

export function formatearPartesFecha(fechaISO: string): {
  diaSemana: string;
  dia: string;
  mes: string;
  anio: string;
} {
  const partes = parsearFechaISO(fechaISO);
  if (!partes) {
    return { diaSemana: '', dia: fechaISO, mes: '', anio: '' };
  }

  const fecha = crearFechaMediodiaUTC(partes);
  const diaSemana = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    timeZone: 'UTC',
  }).format(fecha);
  const mes = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    timeZone: 'UTC',
  }).format(fecha);

  return {
    diaSemana,
    dia: pad2(partes.dia),
    mes,
    anio: String(partes.anio),
  };
}

export function formatearHora(horaInicio: string): string {
  const { horas, minutos } = normalizarHora(horaInicio);
  return `${pad2(horas)}:${pad2(minutos)} hrs`;
}

export function obtenerFechaObjetivoISO(
  fechaISO: string,
  horaInicio: string,
  offsetZona = '-06:00',
): string {
  const partes = parsearFechaISO(fechaISO);
  const { horas, minutos } = normalizarHora(horaInicio);
  if (!partes) return `${fechaISO}T17:00:00${offsetZona}`;

  return `${partes.anio}-${pad2(partes.mes)}-${pad2(partes.dia)}T${pad2(horas)}:${pad2(minutos)}:00${offsetZona}`;
}

function formatearFechaHoraCompacta(
  partes: FechaPartes,
  horas: number,
  minutos: number,
): string {
  return `${partes.anio}${pad2(partes.mes)}${pad2(partes.dia)}T${pad2(horas)}${pad2(minutos)}00`;
}

function sumarHoras(
  partes: FechaPartes,
  horas: number,
  minutos: number,
  duracionHoras: number,
): { partesFin: FechaPartes; horasFin: number; minutosFin: number } {
  const base = new Date(
    Date.UTC(partes.anio, partes.mes - 1, partes.dia, horas, minutos, 0),
  );
  const fin = new Date(base.getTime() + duracionHoras * 60 * 60 * 1000);
  return {
    partesFin: {
      anio: fin.getUTCFullYear(),
      mes: fin.getUTCMonth() + 1,
      dia: fin.getUTCDate(),
    },
    horasFin: fin.getUTCHours(),
    minutosFin: fin.getUTCMinutes(),
  };
}

export function construirUrlGoogleCalendar(params: {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fechaISO: string;
  horaInicio: string;
  duracionHoras?: number;
}): string {
  const partes = parsearFechaISO(params.fechaISO);
  if (!partes) return 'https://calendar.google.com/calendar/render';

  const { horas, minutos } = normalizarHora(params.horaInicio);
  const duracion = params.duracionHoras ?? 5;
  const { partesFin, horasFin, minutosFin } = sumarHoras(
    partes,
    horas,
    minutos,
    duracion,
  );

  const inicio = formatearFechaHoraCompacta(partes, horas, minutos);
  const fin = formatearFechaHoraCompacta(partesFin, horasFin, minutosFin);

  const query = new URLSearchParams({
    action: 'TEMPLATE',
    text: params.titulo,
    details: params.descripcion,
    location: params.ubicacion,
    dates: `${inicio}/${fin}`,
    ctz: 'America/Mexico_City',
  });

  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

function escaparTextoICS(valor: string): string {
  return valor
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

export function construirContenidoICS(params: {
  uid: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fechaISO: string;
  horaInicio: string;
  duracionHoras?: number;
}): string {
  const partes = parsearFechaISO(params.fechaISO);
  if (!partes) return '';

  const { horas, minutos } = normalizarHora(params.horaInicio);
  const duracion = params.duracionHoras ?? 5;
  const { partesFin, horasFin, minutosFin } = sumarHoras(
    partes,
    horas,
    minutos,
    duracion,
  );

  const inicio = formatearFechaHoraCompacta(partes, horas, minutos);
  const fin = formatearFechaHoraCompacta(partesFin, horasFin, minutosFin);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Casa Signato//Invitacion Digital//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${params.uid}@casasignato.com`,
    `DTSTART;TZID=America/Mexico_City:${inicio}`,
    `DTEND;TZID=America/Mexico_City:${fin}`,
    `SUMMARY:${escaparTextoICS(params.titulo)}`,
    `DESCRIPTION:${escaparTextoICS(params.descripcion)}`,
    `LOCATION:${escaparTextoICS(params.ubicacion)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
