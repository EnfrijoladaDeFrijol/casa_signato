import type { ClienteInvitacion } from '../types/invitacion';

export const iconoCategoria: Record<string, string> = {
  'bodas': '💍',
  'xv-anos': '👑',
  'bautizos': '🕊️',
  'cumpleanos': '🎉',
};

export const labelCategoria: Record<string, string> = {
  'bodas': 'Bodas',
  'xv-anos': 'XV Años',
  'bautizos': 'Bautizos',
  'cumpleanos': 'Cumpleaños',
};

export function agruparClientesPorCategoria(clientes: ClienteInvitacion[]) {
  return clientes.reduce((acc, cliente) => {
    if (!acc[cliente.categoria]) {
      acc[cliente.categoria] = [];
    }
    acc[cliente.categoria].push(cliente);
    return acc;
  }, {} as Record<string, ClienteInvitacion[]>);
}
