export type IconoPaso = 'estilo' | 'datos' | 'enlace';

export interface PasoProceso {
  numero: string;
  titulo: string;
  descripcion: string;
  icono: IconoPaso;
  destacado?: boolean;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export const PASOS_PROCESO: PasoProceso[] = [
  {
    numero: '01',
    titulo: 'Elige tu estilo',
    descripcion: 'Explora las muestras y elige tu paquete.',
    icono: 'estilo',
  },
  {
    numero: '02',
    titulo: 'Envía tus datos',
    descripcion: 'Mándanos fotos, horarios y música en minutos.',
    icono: 'datos',
  },
  {
    numero: '03',
    titulo: 'Comparte tu enlace',
    descripcion: 'Lista en 24 a 72 hrs para WhatsApp.',
    icono: 'enlace',
    destacado: true,
  },
];

export const PREGUNTAS_FRECUENTES: PreguntaFrecuente[] = [
  {
    pregunta: '¿Cuántas personas pueden abrir mi invitación?',
    respuesta:
      'Todas las que necesites. Tu enlace tiene envíos y visitas ilimitadas para compartir por WhatsApp, mensaje o correo sin costo adicional por invitado.',
  },
  {
    pregunta: '¿En cuánto tiempo entregan mi invitación lista?',
    respuesta:
      'Entre 24 y 72 horas hábiles a partir de que recibimos tus textos, ubicaciones y fotografías finales.',
  },
  {
    pregunta: '¿Puedo agregar una función de otro paquete sin cambiar de nivel?',
    respuesta:
      'Sí. Puedes contratar el paquete Plata u Oro y sumar módulos individuales —como pase digital de boletos, música o confirmación en formulario— con un ajuste accesible.',
  },
  {
    pregunta: '¿Cómo confirman asistencia mis invitados?',
    respuesta:
      'En Plata y Oro confirman con un toque por WhatsApp mediante un mensaje ya redactado. En Diamante (o como extra) incluimos confirmación en línea conectada a tu hoja de control en vivo.',
  },
  {
    pregunta: '¿Qué pasa si cambia un horario o dirección después de enviarla?',
    respuesta:
      'Actualizamos el dato en tu mismo enlace sin necesidad de reenviar una invitación nueva. Quien vuelva a abrirlo verá la información corregida al momento.',
  },
  {
    pregunta: '¿Cuánto tiempo permanece activa la invitación y cómo se paga?',
    respuesta:
      'Es un pago único por transferencia bancaria en México y tu invitación permanece disponible antes, durante y hasta 30 días después de tu celebración.',
  },
];
