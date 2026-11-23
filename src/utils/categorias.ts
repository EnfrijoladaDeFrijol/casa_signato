import type { CategoriaEvento, ClienteInvitacion } from '../types/invitacion';

export interface CategoriaMeta {
  id: CategoriaEvento;
  etiqueta: string;
  etiquetaSingular: string;
}

export const CATEGORIAS_ORDEN: CategoriaEvento[] = [
  'xv-anos',
  'bodas',
  'bautizos',
  'cumpleanos',
];

export const CATEGORIAS_META: Record<CategoriaEvento, CategoriaMeta> = {
  'xv-anos': {
    id: 'xv-anos',
    etiqueta: 'XV Años',
    etiquetaSingular: 'XV Años',
  },
  bodas: {
    id: 'bodas',
    etiqueta: 'Bodas',
    etiquetaSingular: 'Boda',
  },
  bautizos: {
    id: 'bautizos',
    etiqueta: 'Bautizos',
    etiquetaSingular: 'Bautizo',
  },
  cumpleanos: {
    id: 'cumpleanos',
    etiqueta: 'Cumpleaños',
    etiquetaSingular: 'Cumpleaños',
  },
};

export function obtenerEtiquetaCategoria(
  categoria: CategoriaEvento,
  singular = false,
): string {
  const meta = CATEGORIAS_META[categoria];
  return singular ? meta.etiquetaSingular : meta.etiqueta;
}

export function agruparClientesPorCategoria(
  listaClientes: ClienteInvitacion[],
): Record<CategoriaEvento, ClienteInvitacion[]> {
  const agrupado: Record<CategoriaEvento, ClienteInvitacion[]> = {
    'xv-anos': [],
    bodas: [],
    bautizos: [],
    cumpleanos: [],
  };

  for (const cliente of listaClientes) {
    agrupado[cliente.categoria].push(cliente);
  }

  return agrupado;
}
