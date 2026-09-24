// ============================================================
// Sistema de Invitaciones Digitales — Tipos TypeScript Estrictos
// ============================================================

/** Categorías de evento soportadas por el sistema */
export type CategoriaEvento = 'bodas' | 'xv-anos' | 'bautizos' | 'cumpleanos';

/** Identificadores de plantillas visuales disponibles */
export type PlantillaID =
  | 'boda-clasica'
  | 'xv-elegante'
  | 'bautizo-angelical'
  | 'cumpleanos-fiesta';

/** Ubicación física de un evento con coordenadas de Google Maps */
export interface Ubicacion {
  /** Nombre del lugar (ej. "Parroquia San José") */
  nombre: string;
  /** Dirección completa */
  direccion: string;
  /** Hora del evento en este lugar (ej. "16:00") */
  hora: string;
  /** URL de Google Maps para navegación directa */
  googleMapsUrl: string;
}

/** Paleta de colores personalizada por cliente */
export interface Colores {
  /** Color principal del diseño (ej. "#6B4F3A") */
  primario: string;
  /** Color secundario complementario */
  secundario: string;
  /** Color de acento para detalles y CTAs */
  acento: string;
  /** Color de fondo principal */
  fondo: string;
  /** Color del texto principal */
  texto: string;
}

/** Datos variables del contenido de cada invitación */
export interface ContenidoCliente {
  /** Título principal de la invitación (ej. "Ana & Carlos") */
  titulo: string;
  /** Subtítulo o frase complementaria */
  subtitulo: string;
  /** Fecha del evento en formato ISO 8601 (ej. "2026-03-15") */
  fecha: string;
  /** Hora principal del evento (ej. "17:00") */
  hora: string;
  /** Mensaje personalizado de los anfitriones */
  mensaje: string;
  /** Lista de ubicaciones del evento (ceremonia, recepción, etc.) */
  ubicaciones: Ubicacion[];
  /** URLs de imágenes para la galería (opcional) */
  galeria?: string[];
  /** Nombres de los padres o anfitriones (opcional) */
  padres?: string[];
  /** Nombre de los padrinos (opcional, para bautizos/XV) */
  padrinos?: string[];
}

/** Entidad principal: un cliente con su invitación contratada */
export interface ClienteInvitacion {
  /** Slug único para la URL (ej. "ana-y-carlos") */
  slug: string;
  /** Categoría del evento */
  categoria: CategoriaEvento;
  /** Identificador de la plantilla visual contratada */
  plantilla: PlantillaID;
  /** Paleta de colores personalizada */
  colores: Colores;
  /** Datos de contenido de la invitación */
  contenido: ContenidoCliente;
}

/** Estructura completa del archivo clientes.json */
export interface BaseDatosClientes {
  clientes: ClienteInvitacion[];
}

/** Props que reciben los componentes de plantilla visual */
export interface PlantillaProps {
  datos: ContenidoCliente;
  colores: Colores;
}
