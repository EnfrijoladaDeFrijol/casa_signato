import type {
  ClienteInvitacion,
  ModulosInvitacion,
  PlanTipo,
} from '../types/invitacion';
import { esFechaValida } from './fechas';

export interface PlanInfo {
  id: PlanTipo;
  nombre: string;
  precioMXN: number;
  etiqueta: string;
  destacado: boolean;
  limiteFotos: number;
  descripcion: string;
  beneficios: string[];
}

export const PLANES_ORDEN: PlanTipo[] = ['plata', 'gold', 'diamante'];

export const PLANES_INFO: Record<PlanTipo, PlanInfo> = {
  plata: {
    id: 'plata',
    nombre: 'Plata',
    precioMXN: 349,
    etiqueta: 'Esencial',
    destacado: false,
    limiteFotos: 0,
    descripcion:
      'Ideal para eventos íntimos que buscan presencia elegante, clara y rápida de compartir por WhatsApp.',
    beneficios: [
      'Enlace personalizado pensado para celular',
      'Portada editorial con 1 fotografía y frase emotiva',
      'Mención honorífica de padres y padrinos',
      'Cuenta regresiva en tiempo real',
      'Ubicaciones directas a Google Maps y Waze',
      'Confirmación rápida por WhatsApp',
    ],
  },
  gold: {
    id: 'gold',
    nombre: 'Gold',
    precioMXN: 449,
    etiqueta: 'Más vendido',
    destacado: true,
    limiteFotos: 6,
    descripcion:
      'La experiencia favorita para XV Años y Bodas, con narrativa completa del evento y detalles interactivos.',
    beneficios: [
      'Todo lo incluido en el paquete Plata',
      'Reproductor discreto de música de fondo',
      'Galería fotográfica de alta nitidez (hasta 6 fotos)',
      'Itinerario visual con horarios de tu evento',
      'Código de vestimenta con paleta de colores sugerida',
      'Mesa de regalos y datos para lluvia de sobres',
    ],
  },
  diamante: {
    id: 'diamante',
    nombre: 'Diamante',
    precioMXN: 749,
    etiqueta: 'Control VIP',
    destacado: false,
    limiteFotos: 12,
    descripcion:
      'Pensado para celebraciones con control de pases, logística para invitados foráneos y registro organizado.',
    beneficios: [
      'Todo lo incluido en el paquete Gold',
      'Galería fotográfica extendida (hasta 12 fotos)',
      'Pase digital personalizado con los lugares por familia',
      'Confirmación en línea conectada a tu lista en vivo',
      'Botón para agendar en Google y Apple Calendar',
      'Hoteles sugeridos y álbum compartido con código QR',
    ],
  },
};

export const PLANES_MODULOS_BASE: Record<PlanTipo, ModulosInvitacion> = {
  plata: {
    padresPadrinos: true,
    contador: true,
    ubicaciones: true,
    musica: false,
    galeria: false,
    itinerario: false,
    dressCode: false,
    mesaRegalos: false,
    rsvpWhatsapp: true,
    rsvpGoogleForm: false,
    paseBoletos: false,
    calendario: false,
    hoteles: false,
    albumQr: false,
  },
  gold: {
    padresPadrinos: true,
    contador: true,
    ubicaciones: true,
    musica: true,
    galeria: true,
    itinerario: true,
    dressCode: true,
    mesaRegalos: true,
    rsvpWhatsapp: true,
    rsvpGoogleForm: false,
    paseBoletos: false,
    calendario: false,
    hoteles: false,
    albumQr: false,
  },
  diamante: {
    padresPadrinos: true,
    contador: true,
    ubicaciones: true,
    musica: true,
    galeria: true,
    itinerario: true,
    dressCode: true,
    mesaRegalos: true,
    rsvpWhatsapp: true,
    rsvpGoogleForm: true,
    paseBoletos: true,
    calendario: true,
    hoteles: true,
    albumQr: true,
  },
};

export function obtenerLimiteGaleria(plan: PlanTipo): number {
  if (plan === 'diamante') return 12;
  return 6;
}

function tieneTexto(valor?: string): boolean {
  return typeof valor === 'string' && valor.trim().length > 0;
}

function tieneDatosModulo(cliente: ClienteInvitacion): ModulosInvitacion {
  const tienePadres = Boolean(
    cliente.padresPadrinos &&
      cliente.padresPadrinos.grupos.some((g) => g.nombres.length > 0),
  );
  const tieneFecha = esFechaValida(cliente.fechaISO);
  const tieneUbicaciones = Boolean(
    cliente.ubicaciones && cliente.ubicaciones.length > 0,
  );
  const tieneMusica = Boolean(
    cliente.musica &&
      tieneTexto(cliente.musica.titulo) &&
      (Boolean(cliente.musica.modoDemo) || tieneTexto(cliente.musica.audioUrl)),
  );
  const tieneGaleria = Boolean(cliente.galeria && cliente.galeria.length > 0);
  const tieneItinerario = Boolean(
    cliente.itinerario && cliente.itinerario.length > 0,
  );
  const tieneDressCode = Boolean(
    cliente.dressCode && tieneTexto(cliente.dressCode.etiqueta),
  );
  const tieneMesaRegalos = Boolean(
    cliente.mesaRegalos &&
      ((cliente.mesaRegalos.tiendas && cliente.mesaRegalos.tiendas.length > 0) ||
        Boolean(
          cliente.mesaRegalos.lluviaSobres &&
            tieneTexto(cliente.mesaRegalos.lluviaSobres.clabe),
        )),
  );
  const tieneRsvpWhatsapp = Boolean(
    cliente.rsvpWhatsapp && tieneTexto(cliente.rsvpWhatsapp.telefono),
  );
  const tieneRsvpGoogleForm = Boolean(
    cliente.rsvpGoogleForm && tieneTexto(cliente.rsvpGoogleForm.url),
  );
  const tienePaseBoletos = Boolean(
    cliente.paseBoletos && cliente.paseBoletos.pasesDefault > 0,
  );
  const tieneCalendario = Boolean(
    tieneFecha &&
      cliente.calendario &&
      tieneTexto(cliente.calendario.titulo),
  );
  const tieneHoteles = Boolean(cliente.hoteles && cliente.hoteles.length > 0);
  const tieneAlbumQr = Boolean(
    cliente.albumQr && tieneTexto(cliente.albumQr.url),
  );

  return {
    padresPadrinos: tienePadres,
    contador: tieneFecha,
    ubicaciones: tieneUbicaciones,
    musica: tieneMusica,
    galeria: tieneGaleria,
    itinerario: tieneItinerario,
    dressCode: tieneDressCode,
    mesaRegalos: tieneMesaRegalos,
    rsvpWhatsapp: tieneRsvpWhatsapp,
    rsvpGoogleForm: tieneRsvpGoogleForm,
    paseBoletos: tienePaseBoletos,
    calendario: tieneCalendario,
    hoteles: tieneHoteles,
    albumQr: tieneAlbumQr,
  };
}

export function resolverModulos(cliente: ClienteInvitacion): ModulosInvitacion {
  const base = PLANES_MODULOS_BASE[cliente.plan];
  const overrides = cliente.modulosOverride ?? {};
  const combinados: ModulosInvitacion = {
    ...base,
    ...overrides,
  };
  const datosValidos = tieneDatosModulo(cliente);

  return {
    padresPadrinos: combinados.padresPadrinos && datosValidos.padresPadrinos,
    contador: combinados.contador && datosValidos.contador,
    ubicaciones: combinados.ubicaciones && datosValidos.ubicaciones,
    musica: combinados.musica && datosValidos.musica,
    galeria: combinados.galeria && datosValidos.galeria,
    itinerario: combinados.itinerario && datosValidos.itinerario,
    dressCode: combinados.dressCode && datosValidos.dressCode,
    mesaRegalos: combinados.mesaRegalos && datosValidos.mesaRegalos,
    rsvpWhatsapp: combinados.rsvpWhatsapp && datosValidos.rsvpWhatsapp,
    rsvpGoogleForm: combinados.rsvpGoogleForm && datosValidos.rsvpGoogleForm,
    paseBoletos: combinados.paseBoletos && datosValidos.paseBoletos,
    calendario: combinados.calendario && datosValidos.calendario,
    hoteles: combinados.hoteles && datosValidos.hoteles,
    albumQr: combinados.albumQr && datosValidos.albumQr,
  };
}

export function contarModulosActivos(modulos: ModulosInvitacion): number {
  return Object.values(modulos).filter(Boolean).length;
}
