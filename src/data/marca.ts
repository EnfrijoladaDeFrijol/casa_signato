export interface RedSocialMarca {
  id: 'instagram' | 'tiktok';
  nombre: string;
  url: string;
}

export const MARCA = {
  nombre: 'Casa Signato',
  email: 'casasignato@gmail.com',
  whatsappNumero: '',
  instagramUrl: '',
  tiktokUrl: '',
  ubicacion: 'México',
  tiempoEntrega: '24 a 72 horas',
} as const;

export function esWhatsappActivo(): boolean {
  return MARCA.whatsappNumero.replace(/\D/g, '').length >= 10;
}

export function obtenerMensajeCotizacion(paquete?: string): string {
  if (paquete) {
    return `Hola Casa Signato, me gustaría cotizar una invitación digital con el paquete ${paquete}. Mi evento es: [XV Años / Boda / Bautizo / Cumpleaños] y la fecha aproximada es: [Fecha].`;
  }

  return 'Hola Casa Signato, me gustaría cotizar una invitación digital para mi evento. Tipo de evento: [XV Años / Boda / Bautizo / Cumpleaños], fecha aproximada: [Fecha].';
}

export function obtenerEnlaceCotizacion(paquete?: string): string {
  const mensaje = obtenerMensajeCotizacion(paquete);
  const numeroLimpio = MARCA.whatsappNumero.replace(/\D/g, '');

  if (numeroLimpio.length >= 10) {
    return `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
  }

  const asunto = paquete
    ? `Cotización Casa Signato — Paquete ${paquete}`
    : 'Cotización de invitación digital — Casa Signato';

  return `mailto:${MARCA.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
}

export function obtenerEtiquetaCtaCotizar(paquete?: string): string {
  if (paquete) {
    return esWhatsappActivo()
      ? `Cotizar ${paquete} por WhatsApp`
      : `Solicitar paquete ${paquete}`;
  }

  return esWhatsappActivo() ? 'Cotizar por WhatsApp' : 'Cotizar mi evento';
}

export function obtenerRedesActivas(): RedSocialMarca[] {
  const lista: RedSocialMarca[] = [
    { id: 'instagram', nombre: 'Instagram', url: MARCA.instagramUrl.trim() },
    { id: 'tiktok', nombre: 'TikTok', url: MARCA.tiktokUrl.trim() },
  ];

  return lista.filter((red) => red.url.length > 0);
}
