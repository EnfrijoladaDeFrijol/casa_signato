import type { TemaColores } from '../types/invitacion';

export interface Paleta {
  id: string;
  nombre: string;
  descripcion: string;
  colores: TemaColores;
}

/**
 * Cinco paletas editoriales curadas para invitaciones.
 * Todas son claras (texto oscuro sobre papel) y no usan negro puro.
 * Contraste mínimo verificado: tinta/fondo ≥ 7:1; acento, texto atenuado y
 * texto de botón sobre acento ≥ 4.5:1 tanto en `bg` como en `surface`.
 */
export const PALETAS: Paleta[] = [
  {
    id: 'rosa-polvo',
    nombre: 'Rosa Polvo & Marfil',
    descripcion: 'Romántica, cálida y suave. La favorita para XV Años.',
    colores: {
      bg: '#FBF6F2',
      surface: '#F5EAE4',
      accent: '#86494A',
      ink: '#3B2B2B',
    },
  },
  {
    id: 'salvia-arena',
    nombre: 'Salvia & Arena',
    descripcion: 'Orgánica y serena, ideal para jardín y luz de día.',
    colores: {
      bg: '#F6F5EF',
      surface: '#ECE9DD',
      accent: '#476346',
      ink: '#2B362D',
    },
  },
  {
    id: 'vino-champagne',
    nombre: 'Vino & Champagne',
    descripcion: 'Profunda y festiva, pensada para noche de gala.',
    colores: {
      bg: '#FAF3E8',
      surface: '#F1E4D0',
      accent: '#7A2E3F',
      ink: '#35222A',
    },
  },
  {
    id: 'azul-perla',
    nombre: 'Azul Noche & Perla',
    descripcion: 'Sobria y elegante, con aire de papelería clásica.',
    colores: {
      bg: '#F5F6F8',
      surface: '#E9ECF1',
      accent: '#2F4668',
      ink: '#1E2A3F',
    },
  },
  {
    id: 'lavanda-editorial',
    nombre: 'Lavanda Editorial',
    descripcion: 'Lavanda polvosa y apagada, con carácter de revista.',
    colores: {
      bg: '#F6F3F7',
      surface: '#EBE5EF',
      accent: '#62517F',
      ink: '#2D2639',
    },
  },
];

export const PALETA_POR_DEFECTO_ID = 'rosa-polvo';

export const PALETAS_POR_ID: Record<string, Paleta> = Object.fromEntries(
  PALETAS.map((paleta) => [paleta.id, paleta]),
);

export function obtenerPaleta(id: string): Paleta | undefined {
  return PALETAS_POR_ID[id];
}

function mismoColor(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/** Devuelve el id de la paleta curada que coincide con los colores dados. */
export function identificarPaleta(colores: TemaColores): string | undefined {
  return PALETAS.find(
    (paleta) =>
      mismoColor(paleta.colores.bg, colores.bg) &&
      mismoColor(paleta.colores.accent, colores.accent) &&
      mismoColor(paleta.colores.ink, colores.ink),
  )?.id;
}

/** Variables CSS que viajan en el atributo `style` (solo valores completos). */
export const VARIABLES_OPCIONALES = ['--accent-soft', '--ink-muted'] as const;

export function variablesTema(colores: TemaColores): Record<string, string> {
  const variables: Record<string, string> = {
    '--bg': colores.bg,
    '--surface': colores.surface,
    '--accent': colores.accent,
    '--ink': colores.ink,
  };
  if (colores.accentSoft) variables['--accent-soft'] = colores.accentSoft;
  if (colores.inkMuted) variables['--ink-muted'] = colores.inkMuted;
  return variables;
}
