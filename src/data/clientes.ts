import type { ClienteInvitacion } from '../types/invitacion';
import { PALETAS_POR_ID } from '../utils/paletas';

export const clientes: ClienteInvitacion[] = [
  {
    slug: 'mateo',
    categoria: 'bautizos',
    tema: 'base',
    plan: 'plata',
    esDemo: true,
    temaColores: {
      bg: '#F9F7F3',
      surface: '#FFFFFF',
      accent: '#7E9A84',
      ink: '#2F3A33',
    },
    titulo: 'Bautizo de Mateo Hernández',
    protagonistas: 'Mateo Hernández',
    subtitulo: 'Mi Bautizo',
    frase:
      'Con la bendición de Dios y el amor de nuestra familia, damos la bienvenida a Mateo en su primer sacramento.',
    fechaISO: '2027-04-17',
    horaInicio: '12:00',
    ciudad: 'Querétaro, Qro.',
    fotoPortada: '/demos/portada-bautizo.svg',
    fotoPortadaAlt: 'Portada editorial del bautizo de Mateo Hernández',
    padresPadrinos: {
      nota: 'Agradecemos profundamente el cariño y guía de quienes acompañan este día tan especial.',
      grupos: [
        {
          titulo: 'Sus papás',
          nombres: ['Valeria Mendoza Ruiz', 'Alejandro Hernández Silva'],
        },
        {
          titulo: 'Sus padrinos',
          nombres: ['Mariana Mendoza Ruiz', 'Diego Castro Navarro'],
        },
      ],
    },
    ubicaciones: [
      {
        tipo: 'Ceremonia Religiosa',
        nombre: 'Parroquia de Santa Rosa de Viterbo',
        direccion: 'Calle José María Arteaga 89, Centro, Santiago de Querétaro, Qro.',
        hora: '12:00 hrs',
        referencia: 'Se sugiere llegar 15 minutos antes del inicio.',
        googleMapsUrl:
          'https://maps.google.com/?q=Templo+de+Santa+Rosa+de+Viterbo+Queretaro',
        wazeUrl:
          'https://waze.com/ul?q=Templo+de+Santa+Rosa+de+Viterbo+Queretaro',
      },
      {
        tipo: 'Recepción Familiar',
        nombre: 'Jardín Los Olivos',
        direccion: 'Calzada de los Arcos 214, Carretas, Santiago de Querétaro, Qro.',
        hora: '14:00 hrs',
        referencia: 'Estacionamiento con valet disponible en la entrada principal.',
        googleMapsUrl: 'https://maps.google.com/?q=Calzada+de+los+Arcos+Queretaro',
      },
    ],
    rsvpWhatsapp: {
      telefono: '524420000101',
      mensajeBase:
        'Hola, confirmo con mucho gusto nuestra asistencia al bautizo de Mateo Hernández el 17 de abril de 2027.',
      fechaLimite: '3 de abril de 2027',
      etiquetaBoton: 'Confirmar por WhatsApp',
    },
  },
  {
    slug: 'karen-y-luis',
    categoria: 'bodas',
    tema: 'base',
    plan: 'gold',
    modulosOverride: {
      rsvpGoogleForm: true,
    },
    esDemo: true,
    temaColores: {
      bg: '#F7F5F0',
      surface: '#FFFFFF',
      accent: '#9C7A65',
      ink: '#33302B',
    },
    titulo: 'Nuestra Boda · Karen & Luis',
    protagonistas: 'Karen & Luis',
    subtitulo: 'Nos casamos',
    frase:
      'Después de compartir tantos caminos juntos, queremos celebrar el inicio de nuestra vida en matrimonio rodeados de quienes más queremos.',
    fechaISO: '2027-06-12',
    horaInicio: '17:00',
    ciudad: 'San Miguel de Allende, Gto.',
    fotoPortada: '/demos/portada-boda.svg',
    fotoPortadaAlt: 'Portada editorial de la boda de Karen y Luis',
    padresPadrinos: {
      nota: 'Con la bendición de nuestros padres, celebramos el amor que nos une.',
      grupos: [
        {
          titulo: 'Padres de la novia',
          nombres: ['Patricia Delgado Vega', 'Fernando Morales Ríos'],
        },
        {
          titulo: 'Padres del novio',
          nombres: ['Lucía Paredes Ortiz', 'Ricardo Torres Gómez'],
        },
        {
          titulo: 'Padrinos de velación',
          nombres: ['Claudia Morales Delgado', 'Andrés Beltrán Cruz'],
        },
      ],
    },
    ubicaciones: [
      {
        tipo: 'Ceremonia',
        nombre: 'Parroquia de San Miguel Arcángel',
        direccion: 'Principal s/n, Zona Centro, San Miguel de Allende, Gto.',
        hora: '17:00 hrs',
        referencia: 'Acceso por el atrio principal.',
        googleMapsUrl:
          'https://maps.google.com/?q=Parroquia+de+San+Miguel+Arcangel+San+Miguel+de+Allende',
        wazeUrl:
          'https://waze.com/ul?q=Parroquia+de+San+Miguel+Arcangel+San+Miguel+de+Allende',
      },
      {
        tipo: 'Recepción',
        nombre: 'Hacienda Viñedo San Lucas',
        direccion: 'Carretera a Querétaro Km 9, San Miguel de Allende, Gto.',
        hora: '19:00 hrs',
        referencia: 'Cóctel de bienvenida en la terraza al llegar.',
        googleMapsUrl:
          'https://maps.google.com/?q=San+Miguel+de+Allende+Guanajuato',
        wazeUrl: 'https://waze.com/ul?q=San+Miguel+de+Allende+Guanajuato',
      },
    ],
    musica: {
      titulo: 'La Vie En Rose (Versión Acústica)',
      artista: 'Cuarteto de Cuerdas',
      audioUrl: '',
      modoDemo: true,
    },
    galeria: [
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Sesión previa de Karen y Luis en el viñedo',
        caption: 'Atardecer en San Miguel',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Karen y Luis caminando por los arcos de piedra',
        caption: 'Nuestro compromiso',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Detalle floral y argollas de compromiso',
        caption: 'Los primeros preparativos',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Retrato editorial de la pareja en blanco y sepia',
        caption: 'Camino al altar',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Paseo matutino en el centro histórico',
        caption: 'Un día inolvidable',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Brindis de compromiso junto a familiares',
        caption: 'Celebrando el sí',
      },
    ],
    itinerario: [
      {
        hora: '17:00',
        titulo: 'Ceremonia Religiosa',
        descripcion: 'Misa de esponsales en la Parroquia de San Miguel Arcángel.',
        icono: 'ceremonia',
      },
      {
        hora: '19:00',
        titulo: 'Cóctel de Bienvenida',
        descripcion: 'Música en vivo y canapés en el jardín de la hacienda.',
        icono: 'brindis',
      },
      {
        hora: '20:30',
        titulo: 'Cena de Tres Tiempos',
        descripcion: 'Banquete en el salón principal bajo las luces del patio.',
        icono: 'cena',
      },
      {
        hora: '22:00',
        titulo: 'Primer Baile',
        descripcion: 'Vals de los novios e inicio oficial de la pista.',
        icono: 'vals',
      },
      {
        hora: '22:30',
        titulo: 'Fiesta y Música en Vivo',
        descripcion: 'Celebración hasta el amanecer.',
        icono: 'baile',
      },
    ],
    dressCode: {
      etiqueta: 'Etiqueta Formal de Jardín',
      descripcion:
        'Traje oscuro o lino elegante para caballeros; vestido largo o midi formal para damas. Recomendamos tacón ancho por tratarse de jardín empedrado.',
      coloresSugeridos: [
        { nombre: 'Salvia', hex: '#8BA888' },
        { nombre: 'Arena', hex: '#C6B4A6' },
        { nombre: 'Terracota suave', hex: '#9C7A65' },
        { nombre: 'Oliva profundo', hex: '#4B5649' },
      ],
      coloresReservados: [
        { nombre: 'Blanco y Marfil', hex: '#FAF8F4' },
        { nombre: 'Beige nupcial', hex: '#EAE2D8' },
      ],
      nota: 'Agradecemos reservar los tonos blancos exclusivamente para la novia.',
    },
    mesaRegalos: {
      mensaje:
        'Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, ponemos a su disposición estas opciones.',
      tiendas: [
        {
          nombre: 'Liverpool',
          numeroEvento: 'Evento #51849201',
          descripcion: 'Mesa de bodas disponible en línea y tiendas físicas.',
          url: 'https://mesaderegalos.liverpool.com.mx/',
        },
        {
          nombre: 'Amazon México',
          numeroEvento: 'Lista Karen & Luis 2027',
          descripcion: 'Artículos seleccionados para nuestro nuevo hogar.',
          url: 'https://www.amazon.com.mx/wedding',
        },
      ],
      lluviaSobres: {
        banco: 'BBVA México',
        titular: 'Karen Morales Delgado',
        clabe: '012180015489203417',
        nota: 'También contaremos con buzón de sobres en la recepción.',
      },
    },
    rsvpGoogleForm: {
      url: 'https://docs.google.com/forms/',
      fechaLimite: '15 de mayo de 2027',
      instruccion:
        'Por favor registra tus datos y alergias alimentarias en nuestro formulario de confirmación.',
      etiquetaBoton: 'Confirmar asistencia en formulario',
    },
    rsvpWhatsapp: {
      telefono: '524150000202',
      mensajeBase:
        'Hola Karen y Luis, confirmo mi asistencia a su boda el 12 de junio de 2027.',
      etiquetaBoton: 'Escribir por WhatsApp',
    },
  },
  {
    slug: 'sofia-xv',
    categoria: 'xv-anos',
    tema: 'xv-editorial',
    plan: 'diamante',
    esDemo: true,
    temaColores: PALETAS_POR_ID['rosa-polvo'].colores,
    titulo: 'Mis XV Años · Sofía Ramírez',
    protagonistas: 'Sofía Ramírez',
    subtitulo: 'Mis XV Años',
    frase:
      'Hay momentos en la vida que merecen brillar para siempre. Me llena de ilusión compartir este capítulo contigo.',
    fechaISO: '2027-09-18',
    horaInicio: '18:00',
    ciudad: 'Guadalajara, Jal.',
    fotoPortada: '/demos/portada-xv.svg',
    fotoPortadaAlt: 'Portada editorial de los XV años de Sofía Ramírez',
    padresPadrinos: {
      nota: 'Gracias por sostener mi mano, creer en mis sueños y celebrar conmigo esta noche inolvidable.',
      grupos: [
        {
          titulo: 'Mis papás',
          nombres: ['Gabriela López Navarro', 'Eduardo Ramírez Castillo'],
        },
        {
          titulo: 'Mis padrinos',
          nombres: ['Sofía Navarro de López', 'Héctor Guzmán Villaseñor'],
        },
      ],
    },
    ubicaciones: [
      {
        tipo: 'Misa de Acción de Gracias',
        nombre: 'Templo Expiatorio del Santísimo Sacramento',
        direccion: 'Calle Manuel López Cotilla 935, Americana, Guadalajara, Jal.',
        hora: '18:00 hrs',
        referencia: 'Les agradecemos llegar con 20 minutos de anticipación.',
        googleMapsUrl: 'https://maps.google.com/?q=Templo+Expiatorio+Guadalajara',
        wazeUrl: 'https://waze.com/ul?q=Templo+Expiatorio+Guadalajara',
      },
      {
        tipo: 'Recepción y Cena',
        nombre: 'Salón Hacienda La Providencia',
        direccion: 'Av. Providencia 2845, Providencia, Guadalajara, Jal.',
        hora: '20:00 hrs',
        referencia: 'Presenta tu pase digital en la mesa de recepción.',
        googleMapsUrl: 'https://maps.google.com/?q=Providencia+Guadalajara',
        wazeUrl: 'https://waze.com/ul?q=Providencia+Guadalajara',
      },
    ],
    musica: {
      titulo: 'A Thousand Years',
      artista: 'Christina Perri',
      audioUrl: '/demos/musica/Christina%20Perri%20-%20A%20Thousand%20Years.m4a',
      modoDemo: false,
    },
    galeria: [
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Sesión editorial de Sofía en estudio con luz natural',
        caption: 'Sesión previa',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Retrato de Sofía en los jardines de Guadalajara',
        caption: 'Jardín botánico',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Detalle del vestido palo de rosa y ramo floral',
        caption: 'Detalles',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Sofía sonriendo junto a sus padres',
        caption: 'En familia',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Retrato vertical con arquitectura colonial de fondo',
        caption: 'Centro histórico',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Atardecer dorado durante la sesión de XV años',
        caption: 'Luz dorada',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Fotografía artística en blanco y tono cálido',
        caption: 'Editorial',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Ensayo del vals con chambelanes',
        caption: 'Preparativos',
      },
      {
        url: '/demos/galeria-muestra.svg',
        alt: 'Retrato final de la sesión de quince años',
        caption: 'Rumbo a mis XV',
      },
    ],
    itinerario: [
      {
        hora: '18:00',
        titulo: 'Ceremonia Religiosa',
        descripcion: 'Misa de acción de gracias en el Templo Expiatorio.',
        icono: 'ceremonia',
      },
      {
        hora: '20:00',
        titulo: 'Recepción y Alfombra de Bienvenida',
        descripcion: 'Cóctel sin alcohol, fotografías y registro de invitados.',
        icono: 'recepcion',
      },
      {
        hora: '21:00',
        titulo: 'Cena y Brindis',
        descripcion: 'Palabras de bienvenida de mis papás y cena de gala.',
        icono: 'cena',
      },
      {
        hora: '22:15',
        titulo: 'Vals y Baile Sorpresa',
        descripcion: 'Vals familiar seguido de la coreografía de XV años.',
        icono: 'vals',
      },
      {
        hora: '23:30',
        titulo: 'Mesa de Postres y Pastel',
        descripcion: 'Corte del pastel y apertura de barra de dulces.',
        icono: 'pastel',
      },
      {
        hora: '00:00',
        titulo: 'DJ y Pista Abierta',
        descripcion: 'Música, luces y celebración hasta las 02:30 hrs.',
        icono: 'baile',
      },
    ],
    dressCode: {
      etiqueta: 'Rigurosa Etiqueta / Formal Nocturno',
      descripcion:
        'Vestido largo para damas y traje oscuro con corbata o moño para caballeros.',
      coloresSugeridos: [
        { nombre: 'Champagne', hex: '#DDD0C8' },
        { nombre: 'Ciruela suave', hex: '#7D5A68' },
        { nombre: 'Salvia', hex: '#8BA888' },
        { nombre: 'Topo elegante', hex: '#6B5E5B' },
      ],
      coloresReservados: [
        { nombre: 'Palo de Rosa', hex: '#B07D76' },
        { nombre: 'Blanco puro', hex: '#FAF6F3' },
      ],
      nota: 'El color palo de rosa está reservado exclusivamente para la quinceañera.',
    },
    mesaRegalos: {
      mensaje:
        'Tu compañía es el regalo más valioso en esta noche. Si deseas obsequiarme un detalle adicional, te comparto estas opciones.',
      tiendas: [
        {
          nombre: 'El Palacio de Hierro',
          numeroEvento: 'Celebración #402918',
          descripcion: 'Mesa de regalos disponible en sucursales y en línea.',
          url: 'https://www.elpalaciodehierro.com/',
        },
        {
          nombre: 'Liverpool',
          numeroEvento: 'Evento #52104488',
          descripcion: 'Mesa digital de XV años.',
          url: 'https://mesaderegalos.liverpool.com.mx/',
        },
      ],
      lluviaSobres: {
        banco: 'Santander México',
        titular: 'Gabriela López Navarro',
        clabe: '014320605981247032',
        nota: 'También habrá cofre para sobres al ingresar al salón.',
      },
    },
    paseBoletos: {
      pasesDefault: 2,
      maxPases: 10,
      etiqueta: 'Pase Personal e Intransferible',
      nota: 'Hemos reservado estos lugares especialmente para ti y tu familia. Presenta esta pantalla en la recepción.',
    },
    rsvpGoogleForm: {
      url: 'https://docs.google.com/forms/',
      fechaLimite: '25 de agosto de 2027',
      instruccion:
        'Confirma el nombre completo de tus acompañantes mediante el formulario oficial.',
      etiquetaBoton: 'Confirmar pases en formulario',
    },
    rsvpWhatsapp: {
      telefono: '523300000303',
      mensajeBase:
        'Hola, confirmo asistencia a los XV Años de Sofía Ramírez el 18 de septiembre de 2027.',
      etiquetaBoton: 'Dudas o confirmación por WhatsApp',
    },
    calendario: {
      titulo: 'XV Años de Sofía Ramírez',
      descripcion:
        'Misa en Templo Expiatorio (18:00 hrs) y Recepción en Salón Hacienda La Providencia (20:00 hrs).',
      ubicacion: 'Guadalajara, Jalisco, México',
      duracionHoras: 7,
    },
    hoteles: [
      {
        nombre: 'Hotel Casa Habita Guadalajara',
        direccion: 'Calle Miguel Lerdo de Tejada 2308, Lafayette, Guadalajara, Jal.',
        distancia: 'A 8 minutos del templo',
        tarifaReferencia: '$2,650 MXN / noche',
        codigoDescuento: 'XVSOFIA27',
        telefono: '+52 33 3615 0000',
        mapsUrl: 'https://maps.google.com/?q=Lafayette+Guadalajara',
        webUrl: 'https://www.designhotels.com/',
      },
      {
        nombre: 'Fiesta Americana Guadalajara',
        direccion: 'Aurelio Aceves 225, Vallarta Poniente, Guadalajara, Jal.',
        distancia: 'A 10 minutos de la recepción',
        tarifaReferencia: '$2,100 MXN / noche',
        codigoDescuento: 'RAMIREZ2027',
        telefono: '+52 33 3818 1400',
        mapsUrl: 'https://maps.google.com/?q=Glorieta+Minerva+Guadalajara',
      },
    ],
    albumQr: {
      titulo: 'Álbum Compartido de la Noche',
      descripcion:
        'Sube tus mejores fotos y videos durante la fiesta para que todos podamos revivir cada momento.',
      url: 'https://drive.google.com/',
      hashtag: '#SofiaXV2027',
    },
  },
];

export function buscarCliente(
  categoria: string,
  slug: string,
): ClienteInvitacion | undefined {
  return clientes.find(
    (cliente) => cliente.categoria === categoria && cliente.slug === slug,
  );
}
