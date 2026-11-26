export type PlanTipo = 'plata' | 'oro' | 'diamante';

export type CategoriaEvento = 'xv-anos' | 'bodas' | 'bautizos' | 'cumpleanos';

export type TemaInvitacion = 'clasico' | 'base' | 'xv-editorial';

export type IconoItinerario =
  | 'ceremonia'
  | 'recepcion'
  | 'brindis'
  | 'cena'
  | 'vals'
  | 'baile'
  | 'pastel'
  | 'reloj';

export interface ModulosInvitacion {
  padresPadrinos: boolean;
  contador: boolean;
  ubicaciones: boolean;
  musica: boolean;
  galeria: boolean;
  itinerario: boolean;
  dressCode: boolean;
  mesaRegalos: boolean;
  rsvpWhatsapp: boolean;
  rsvpGoogleForm: boolean;
  paseBoletos: boolean;
  calendario: boolean;
  hoteles: boolean;
  albumQr: boolean;
}

export interface TemaColores {
  bg: string;
  surface: string;
  accent: string;
  ink: string;
  accentSoft?: string;
  inkMuted?: string;
  fontDisplay?: string;
  fontBody?: string;
}

export interface GrupoMencion {
  titulo: string;
  nombres: string[];
}

export interface PadresPadrinosData {
  nota?: string;
  grupos: GrupoMencion[];
}

export interface UbicacionItem {
  tipo: string;
  nombre: string;
  direccion: string;
  hora: string;
  googleMapsUrl: string;
  wazeUrl?: string;
  referencia?: string;
  foto?: string;
  fotoAlt?: string;
}

export interface MusicaData {
  titulo: string;
  artista?: string;
  audioUrl: string;
  modoDemo?: boolean;
}

export interface FotoGaleria {
  url: string;
  alt: string;
  caption?: string;
}

export interface ItinerarioItem {
  hora: string;
  titulo: string;
  descripcion?: string;
  icono?: IconoItinerario;
}

export interface ColorVestimenta {
  nombre: string;
  hex: string;
}

export interface DressCodeData {
  etiqueta: string;
  descripcion?: string;
  coloresSugeridos?: ColorVestimenta[];
  coloresReservados?: ColorVestimenta[];
  nota?: string;
}

export interface TiendaRegalo {
  nombre: string;
  url: string;
  numeroEvento?: string;
  descripcion?: string;
}

export interface LluviaSobresData {
  banco: string;
  titular: string;
  clabe: string;
  nota?: string;
}

export interface MesaRegalosData {
  mensaje?: string;
  tiendas?: TiendaRegalo[];
  lluviaSobres?: LluviaSobresData;
}

export interface RsvpWhatsappData {
  telefono: string;
  mensajeBase: string;
  fechaLimite?: string;
  etiquetaBoton?: string;
}

export interface RsvpGoogleFormData {
  url: string;
  fechaLimite?: string;
  instruccion?: string;
  etiquetaBoton?: string;
}

export interface PaseBoletosData {
  pasesDefault: number;
  maxPases?: number;
  etiqueta?: string;
  nota?: string;
}

export interface CalendarioData {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  duracionHoras?: number;
}

export interface HotelItem {
  nombre: string;
  direccion: string;
  distancia?: string;
  tarifaReferencia?: string;
  codigoDescuento?: string;
  telefono?: string;
  mapsUrl: string;
  webUrl?: string;
}

export interface AlbumQrData {
  titulo?: string;
  descripcion?: string;
  url: string;
  hashtag?: string;
  qrImagenUrl?: string;
}

export interface ClienteInvitacion {
  slug: string;
  categoria: CategoriaEvento;
  tema: TemaInvitacion;
  plan: PlanTipo;
  modulosOverride?: Partial<ModulosInvitacion>;
  temaColores: TemaColores;
  esDemo?: boolean;

  titulo: string;
  protagonistas: string;
  subtitulo?: string;
  frase?: string;
  fechaISO: string;
  horaInicio: string;
  ciudad: string;
  fotoPortada: string;
  fotoPortadaAlt?: string;
  fotoPosicion?: string;
  sobreBienvenida?: boolean;
  ogImage?: string;

  padresPadrinos?: PadresPadrinosData;
  ubicaciones?: UbicacionItem[];
  musica?: MusicaData;
  galeria?: FotoGaleria[];
  /** 'dispersas' reparte las fotos por toda la invitación; por defecto 'galeria'. */
  modoFotos?: 'dispersas' | 'galeria';
  itinerario?: ItinerarioItem[];
  dressCode?: DressCodeData;
  mesaRegalos?: MesaRegalosData;
  rsvpWhatsapp?: RsvpWhatsappData;
  rsvpGoogleForm?: RsvpGoogleFormData;
  paseBoletos?: PaseBoletosData;
  calendario?: CalendarioData;
  hoteles?: HotelItem[];
  albumQr?: AlbumQrData;
}
