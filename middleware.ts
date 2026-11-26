import { next } from '@vercel/edge';

declare const process: {
  readonly env: Record<string, string | undefined>;
};

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

const CABECERAS_SEGURIDAD_ADMIN = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
} as const;

function respuestaNoAutorizada(): Response {
  return new Response('Acceso no autorizado.', {
    status: 401,
    headers: {
      ...CABECERAS_SEGURIDAD_ADMIN,
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-Authenticate': 'Basic realm="Casa Signato Admin", charset="UTF-8"',
    },
  });
}

function respuestaServicioNoDisponible(): Response {
  return new Response('Servicio de administración no disponible.', {
    status: 503,
    headers: {
      ...CABECERAS_SEGURIDAD_ADMIN,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

async function compararEnTiempoConstante(
  recibido: string,
  esperado: string,
): Promise<boolean> {
  const codificador = new TextEncoder();
  const [resumenRecibido, resumenEsperado] = await Promise.all([
    crypto.subtle.digest('SHA-256', codificador.encode(recibido)),
    crypto.subtle.digest('SHA-256', codificador.encode(esperado)),
  ]);

  const bytesA = new Uint8Array(resumenRecibido);
  const bytesB = new Uint8Array(resumenEsperado);

  if (bytesA.length !== bytesB.length) {
    return false;
  }

  let diferencia = 0;
  for (let i = 0; i < bytesA.length; i++) {
    diferencia |= (bytesA[i] ?? 0) ^ (bytesB[i] ?? 0);
  }

  return diferencia === 0;
}

function decodificarCredencialesBasic(
  encabezadoAuth: string,
): { usuario: string; contrasena: string } | null {
  if (encabezadoAuth.length > 4096) {
    return null;
  }

  const coincidencia = /^Basic\s+(.+)$/i.exec(encabezadoAuth.trim());
  const cargaBase64 = coincidencia?.[1]?.trim();

  if (!cargaBase64) {
    return null;
  }

  try {
    const binario = atob(cargaBase64);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) {
      bytes[i] = binario.charCodeAt(i);
    }

    const textoDecodificado = new TextDecoder('utf-8', { fatal: true }).decode(
      bytes,
    );
    const indiceSeparador = textoDecodificado.indexOf(':');

    if (indiceSeparador === -1) {
      return null;
    }

    return {
      usuario: textoDecodificado.slice(0, indiceSeparador),
      contrasena: textoDecodificado.slice(indiceSeparador + 1),
    };
  } catch {
    return null;
  }
}

export default async function middleware(request: Request): Promise<Response> {
  const usuarioEsperado = process.env.ADMIN_USER;
  const contrasenaEsperada = process.env.ADMIN_PASS;

  if (!usuarioEsperado || !contrasenaEsperada) {
    return respuestaServicioNoDisponible();
  }

  const encabezadoAuth = request.headers.get('authorization');
  if (!encabezadoAuth) {
    return respuestaNoAutorizada();
  }

  const credenciales = decodificarCredencialesBasic(encabezadoAuth);
  if (!credenciales) {
    return respuestaNoAutorizada();
  }

  const [usuarioValido, contrasenaValida] = await Promise.all([
    compararEnTiempoConstante(credenciales.usuario, usuarioEsperado),
    compararEnTiempoConstante(credenciales.contrasena, contrasenaEsperada),
  ]);

  if (!usuarioValido || !contrasenaValida) {
    return respuestaNoAutorizada();
  }

  return next();
}
