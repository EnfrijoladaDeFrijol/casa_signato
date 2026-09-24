// ============================================================
// Base de Datos de Clientes — TypeScript tipado
// Archivo: src/data/clientes.ts
//
// Fuente única de verdad para TODOS los clientes del sistema.
// Importa el tipo ClienteInvitacion para autocompletado y
// validación en tiempo de compilación.
// ============================================================
import type { ClienteInvitacion } from '../types/invitacion';



// ╔═══════════════════════════════════════════════════════════╗
// ║                        🤵 BODAS 💐                       ║
// ╚═══════════════════════════════════════════════════════════╝

const bodas: ClienteInvitacion[] = [
  {
    slug: 'ana-y-carlos',
    categoria: 'bodas',
    plantilla: 'boda-clasica',
    colores: {
      primario:   '#6B4F3A',
      secundario: '#D4A574',
      acento:     '#C8956C',
      fondo:      '#FDF8F3',
      texto:      '#3D2B1F',
    },
    contenido: {
      titulo:    'Ana & Carlos',
      subtitulo: '¡Nos casamos!',
      fecha:     '2026-03-15',
      hora:      '17:00',
      mensaje:
        'Con la bendición de Dios y de nuestros padres, tenemos el honor de invitarlos a celebrar el día más importante de nuestras vidas. Su presencia será el mejor regalo.',
      ubicaciones: [
        {
          nombre:       'Parroquia San José',
          direccion:    'Av. Revolución 450, Col. Centro, Guadalajara, Jalisco',
          hora:         '17:00',
          googleMapsUrl: 'https://maps.google.com/?q=Parroquia+San+Jose+Guadalajara',
        },
        {
          nombre:       'Hacienda Los Eucaliptos',
          direccion:    'Carretera a Chapala Km 12, Jalisco',
          hora:         '19:30',
          googleMapsUrl: 'https://maps.google.com/?q=Hacienda+Los+Eucaliptos+Jalisco',
        },
      ],
      galeria: [],
      padres: [
        'Sr. Roberto García & Sra. María López',
        'Sr. Fernando Méndez & Sra. Laura Herrera',
      ],
    },
  },
];



// ╔═══════════════════════════════════════════════════════════╗
// ║                    👑 XV AÑOS 🌟                         ║
// ╚═══════════════════════════════════════════════════════════╝

const xvAnos: ClienteInvitacion[] = [
  {
    slug: 'valentina-lopez',
    categoria: 'xv-anos',
    plantilla: 'xv-elegante',
    colores: {
      primario:   '#8B2252',
      secundario: '#D4679A',
      acento:     '#F0A6CA',
      fondo:      '#FFF0F5',
      texto:      '#4A0E2E',
    },
    contenido: {
      titulo:    'Valentina López',
      subtitulo: 'Mis XV Años',
      fecha:     '2026-06-21',
      hora:      '18:00',
      mensaje:
        'Con la emoción de cumplir quince primaveras, te invito a compartir conmigo esta celebración tan especial. ¡Tu compañía hará de este día un momento inolvidable!',
      ubicaciones: [
        {
          nombre:       'Catedral Metropolitana',
          direccion:    'Plaza de la Constitución S/N, Centro, CDMX',
          hora:         '18:00',
          googleMapsUrl: 'https://maps.google.com/?q=Catedral+Metropolitana+CDMX',
        },
        {
          nombre:       'Salón Versalles',
          direccion:    'Blvd. de los Reyes 200, Puebla',
          hora:         '20:30',
          googleMapsUrl: 'https://maps.google.com/?q=Salon+Versalles+Puebla',
        },
      ],
      galeria: [],
      padres: [
        'Sr. Alejandro López & Sra. Patricia Ramírez',
      ],
      padrinos: [
        'Sr. Miguel Ángel Torres & Sra. Carmen Ríos',
      ],
    },
  },
];



// ╔═══════════════════════════════════════════════════════════╗
// ║                   ✝️ BAUTIZOS 👼                         ║
// ╚═══════════════════════════════════════════════════════════╝

const bautizos: ClienteInvitacion[] = [
  {
    slug: 'mateo-garcia',
    categoria: 'bautizos',
    plantilla: 'bautizo-angelical',
    colores: {
      primario:   '#5B8FA8',
      secundario: '#A8D4E6',
      acento:     '#7EC8E3',
      fondo:      '#F0F8FF',
      texto:      '#2C4A5A',
    },
    contenido: {
      titulo:    'Mateo García',
      subtitulo: 'Mi Bautizo',
      fecha:     '2026-04-12',
      hora:      '12:00',
      mensaje:
        'Con gran alegría y fe, los invitamos a acompañarnos en el sacramento del Bautizo de nuestro pequeño Mateo. Celebremos juntos este hermoso momento de gracia.',
      ubicaciones: [
        {
          nombre:       'Iglesia de la Sagrada Familia',
          direccion:    'Calle Hidalgo 78, Col. San Ángel, CDMX',
          hora:         '12:00',
          googleMapsUrl: 'https://maps.google.com/?q=Iglesia+Sagrada+Familia+San+Angel',
        },
        {
          nombre:       'Restaurante El Jardín',
          direccion:    'Av. Insurgentes Sur 1234, CDMX',
          hora:         '14:00',
          googleMapsUrl: 'https://maps.google.com/?q=Restaurante+El+Jardin+Insurgentes',
        },
      ],
      galeria: [],
      padres: [
        'Sr. David García & Sra. Sofía Hernández',
      ],
      padrinos: [
        'Sr. Andrés Castillo & Sra. Elena Morales',
      ],
    },
  },
];



// ╔═══════════════════════════════════════════════════════════╗
// ║                  🎂 CUMPLEAÑOS 🎉                        ║
// ╚═══════════════════════════════════════════════════════════╝

const cumpleanos: ClienteInvitacion[] = [
  {
    slug: 'sofia-martinez',
    categoria: 'cumpleanos',
    plantilla: 'cumpleanos-fiesta',
    colores: {
      primario:   '#FF6B35',
      secundario: '#FFD166',
      acento:     '#06D6A0',
      fondo:      '#FFFCF0',
      texto:      '#2B2D42',
    },
    contenido: {
      titulo:    'Sofía Martínez',
      subtitulo: '¡Mis 30 Años!',
      fecha:     '2026-08-05',
      hora:      '20:00',
      mensaje:
        '¡Llegaron los 30 y hay que celebrar a lo grande! Te invito a una noche llena de música, risas y buena vibra. ¡No faltes!',
      ubicaciones: [
        {
          nombre:       'Terraza Skyline',
          direccion:    'Paseo de la Reforma 505, Piso 40, CDMX',
          hora:         '20:00',
          googleMapsUrl: 'https://maps.google.com/?q=Terraza+Skyline+Reforma+CDMX',
        },
      ],
      galeria: [],
      padres: [],
    },
  },
];



// ============================================================
// Exportación unificada — Todas las categorías consolidadas
// Para agregar un nuevo cliente, simplemente añádelo al array
// de su categoría correspondiente arriba.
// ============================================================
export const clientes: ClienteInvitacion[] = [
  ...bodas,
  ...xvAnos,
  ...bautizos,
  ...cumpleanos,
];
