export type TipoResultadoBusqueda = 'muestra' | 'paquete' | 'pregunta' | 'proceso';

export interface ItemIndiceBusqueda {
  id: string;
  tipo: TipoResultadoBusqueda;
  etiquetaTipo: string;
  titulo: string;
  subtitulo: string;
  href: string;
  imagen?: string;
  imagenAlt?: string;
  imagenPosicion?: string;
  meta?: string;
  palabrasClave: string;
}

export interface OpcionesBuscadorNavbar {
  header: HTMLElement;
  onAbrir?: () => void;
  onNavegarSeccion?: () => void;
}

export interface ControladorBuscadorNavbar {
  abrir: () => void;
  cerrar: (opciones?: { devolverFoco?: boolean }) => void;
  estaAbierto: () => boolean;
}

interface ItemIndexado extends ItemIndiceBusqueda {
  tituloNorm: string;
  subtituloNorm: string;
  etiquetaNorm: string;
  palabrasNorm: string;
  textoCompleto: string;
}

const CHIPS_RAPIDOS = ['Bodas', 'XV Años', 'Bautizos', 'Precios', 'Entrega'];
const MAX_RESULTADOS = 6;

const PRIORIDAD_TIPO: Record<TipoResultadoBusqueda, number> = {
  muestra: 12,
  paquete: 10,
  pregunta: 8,
  proceso: 6,
};

const PALABRAS_PAQUETE = new Set([
  'precio',
  'precios',
  'costo',
  'costos',
  'plan',
  'planes',
  'paquete',
  'paquetes',
  'plata',
  'oro',
  'diamante',
  '349',
  '449',
  '749',
]);

const PALABRAS_DUDA = new Set([
  'entrega',
  'entregan',
  'tiempo',
  '24',
  '72',
  'horas',
  'envio',
  'envios',
  'cambio',
  'cambios',
  'vigencia',
  'pago',
  'funciona',
]);

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function crearSvgFlecha(): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', 'nav-search-flecha h-4 w-4 shrink-0');

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M5 12h14M13 6l6 6-6 6');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);
  return svg;
}

function crearIconoTipo(tipo: TipoResultadoBusqueda): HTMLElement {
  const contenedor = document.createElement('span');
  contenedor.className =
    'nav-search-icono flex h-10 w-10 shrink-0 items-center justify-center rounded-lg';
  contenedor.setAttribute('aria-hidden', 'true');

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('class', 'h-4 w-4');

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  if (tipo === 'paquete') {
    path.setAttribute('d', 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5');
  } else if (tipo === 'pregunta') {
    path.setAttribute(
      'd',
      'M9.5 9a2.5 2.5 0 114.2 1.8c-.9.7-1.7 1.3-1.7 2.4v.3M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    );
  } else {
    path.setAttribute('d', 'M4 7h10M4 12h16M4 17h12');
  }

  svg.appendChild(path);
  contenedor.appendChild(svg);
  return contenedor;
}

function leerIndice(): ItemIndexado[] {
  const scriptIndice = document.getElementById('nav-search-index');
  if (!scriptIndice?.textContent) return [];

  try {
    const crudos = JSON.parse(scriptIndice.textContent) as ItemIndiceBusqueda[];
    if (!Array.isArray(crudos)) return [];

    return crudos.map((item) => {
      const tituloNorm = normalizarTexto(item.titulo);
      const subtituloNorm = normalizarTexto(item.subtitulo);
      const etiquetaNorm = normalizarTexto(item.etiquetaTipo);
      const palabrasNorm = normalizarTexto(item.palabrasClave);
      return {
        ...item,
        tituloNorm,
        subtituloNorm,
        etiquetaNorm,
        palabrasNorm,
        textoCompleto: `${tituloNorm} ${subtituloNorm} ${etiquetaNorm} ${palabrasNorm}`,
      };
    });
  } catch {
    return [];
  }
}

function filtrarIndice(items: ItemIndexado[], consultaRaw: string): ItemIndexado[] {
  const consultaNorm = normalizarTexto(consultaRaw);
  if (!consultaNorm) return [];

  const tokens = consultaNorm.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const buscaPaquete = tokens.some((t) => PALABRAS_PAQUETE.has(t));
  const buscaDuda = tokens.some((t) => PALABRAS_DUDA.has(t));

  const puntuados: Array<{ item: ItemIndexado; puntaje: number }> = [];

  for (const item of items) {
    const coincideTodo = tokens.every((token) => item.textoCompleto.includes(token));
    if (!coincideTodo) continue;

    let puntaje = PRIORIDAD_TIPO[item.tipo];

    if (item.tituloNorm.includes(consultaNorm)) {
      puntaje += 50;
    }
    if (item.tituloNorm.startsWith(consultaNorm)) {
      puntaje += 25;
    }

    for (const token of tokens) {
      if (item.tituloNorm.includes(token)) puntaje += 22;
      if (item.etiquetaNorm.includes(token)) puntaje += 14;
      if (item.subtituloNorm.includes(token)) puntaje += 12;
      if (item.palabrasNorm.includes(token)) puntaje += 8;
    }

    if (buscaPaquete && item.tipo === 'paquete') {
      puntaje += 26;
    }
    if (buscaDuda && (item.tipo === 'pregunta' || item.tipo === 'proceso')) {
      puntaje += 22;
    }

    puntuados.push({ item, puntaje });
  }

  puntuados.sort((a, b) => b.puntaje - a.puntaje);
  return puntuados.slice(0, MAX_RESULTADOS).map((entrada) => entrada.item);
}

export function inicializarBuscadorNavbar(
  opciones: OpcionesBuscadorNavbar,
): ControladorBuscadorNavbar {
  const { header, onAbrir, onNavegarSeccion } = opciones;
  const botonAbrir = document.getElementById('nav-search-toggle') as HTMLButtonElement | null;
  const botonLimpiar = document.getElementById('nav-search-clear') as HTMLButtonElement | null;
  const input = document.getElementById('nav-search-input') as HTMLInputElement | null;
  const panel = document.getElementById('nav-search-panel') as HTMLElement | null;
  const contenidoPanel = document.getElementById('nav-search-results') as HTMLElement | null;

  const indice = leerIndice();
  const cotizarHref = panel?.dataset.cotizarHref || '#paquetes';
  const cotizarExterno = panel?.dataset.cotizarExterno === 'true';

  let abierto = false;

  const actualizarEtiquetaLimpiar = () => {
    if (!botonLimpiar || !input) return;
    const tieneTexto = input.value.trim().length > 0;
    botonLimpiar.setAttribute(
      'aria-label',
      tieneTexto ? 'Limpiar búsqueda' : 'Cerrar búsqueda',
    );
  };

  const cerrar = (config?: { devolverFoco?: boolean }) => {
    if (!abierto) return;
    abierto = false;
    header.dataset.searchOpen = 'false';
    botonAbrir?.setAttribute('aria-expanded', 'false');

    if (panel) {
      panel.classList.add('hidden');
      panel.setAttribute('aria-hidden', 'true');
    }

    if (config?.devolverFoco) {
      botonAbrir?.focus();
    }
  };

  const manejarClickResultado = (href: string) => {
    cerrar({ devolverFoco: false });
    if (href.startsWith('#')) {
      onNavegarSeccion?.();
    }
  };

  const crearEnlaceResultado = (item: ItemIndexado): HTMLAnchorElement => {
    const enlace = document.createElement('a');
    enlace.href = item.href;
    enlace.dataset.searchResult = 'true';
    enlace.className =
      'nav-search-item flex min-h-[56px] items-center gap-3 rounded-2xl px-3 py-2.5 text-left';

    if (item.tipo === 'muestra' && item.imagen) {
      const img = document.createElement('img');
      img.src = item.imagen;
      img.alt = item.imagenAlt || item.titulo;
      img.width = 44;
      img.height = 44;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.className = 'nav-search-thumb h-11 w-11 shrink-0 rounded-lg object-cover';
      if (item.imagenPosicion) {
        img.style.objectPosition = item.imagenPosicion;
      }
      enlace.appendChild(img);
    } else {
      enlace.appendChild(crearIconoTipo(item.tipo));
    }

    const cuerpo = document.createElement('span');
    cuerpo.className = 'flex min-w-0 flex-1 flex-col gap-0.5';

    const lineaMeta = document.createElement('span');
    lineaMeta.className =
      'nav-search-kicker flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em]';
    lineaMeta.textContent = item.meta
      ? `${item.etiquetaTipo} · ${item.meta}`
      : item.etiquetaTipo;

    const titulo = document.createElement('span');
    titulo.className = 'nav-search-titulo truncate text-sm font-medium leading-snug';
    titulo.textContent = item.titulo;

    const subtitulo = document.createElement('span');
    subtitulo.className = 'nav-search-subtitulo truncate text-xs leading-snug';
    subtitulo.textContent = item.subtitulo;

    cuerpo.appendChild(lineaMeta);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(subtitulo);

    enlace.appendChild(cuerpo);
    enlace.appendChild(crearSvgFlecha());

    enlace.addEventListener('click', () => manejarClickResultado(item.href));
    return enlace;
  };

  const crearEncabezadoSeccion = (texto: string): HTMLElement => {
    const fila = document.createElement('div');
    fila.className = 'flex items-center gap-3 px-2 pt-1 pb-2';

    const etiqueta = document.createElement('span');
    etiqueta.className =
      'nav-search-seccion shrink-0 text-[10px] font-medium uppercase tracking-[0.16em]';
    etiqueta.textContent = texto;

    const linea = document.createElement('span');
    linea.className = 'nav-search-linea h-px flex-1';
    linea.setAttribute('aria-hidden', 'true');

    fila.appendChild(etiqueta);
    fila.appendChild(linea);
    return fila;
  };

  const renderizar = () => {
    if (!contenidoPanel || !input) return;
    const consulta = input.value.trim();
    contenidoPanel.replaceChildren();

    if (!consulta) {
      if (panel) {
        panel.dataset.compact = 'true';
      }

      const tira = document.createElement('div');
      tira.className =
        'nav-search-atajos no-scrollbar flex w-full min-w-0 items-center justify-start gap-x-3 overflow-x-auto whitespace-nowrap sm:justify-center';

      CHIPS_RAPIDOS.forEach((etiquetaAtajo, indiceAtajo) => {
        const botonAtajo = document.createElement('button');
        botonAtajo.type = 'button';
        botonAtajo.className =
          'nav-search-atajo inline-flex min-h-[32px] shrink-0 items-center py-1 text-[13px] font-medium tracking-[0.01em] active:scale-[0.98]';
        botonAtajo.textContent = etiquetaAtajo;
        botonAtajo.addEventListener('click', (evento) => {
          evento.stopPropagation();
          input.value = etiquetaAtajo;
          actualizarEtiquetaLimpiar();
          renderizar();
          input.focus();
        });
        tira.appendChild(botonAtajo);

        if (indiceAtajo < CHIPS_RAPIDOS.length - 1) {
          const separador = document.createElement('span');
          separador.className = 'nav-search-sep shrink-0 select-none text-xs';
          separador.setAttribute('aria-hidden', 'true');
          separador.textContent = '·';
          tira.appendChild(separador);
        }
      });

      contenidoPanel.appendChild(tira);
      return;
    }

    if (panel) {
      panel.dataset.compact = 'false';
    }

    const resultados = filtrarIndice(indice, consulta);

    if (resultados.length === 0) {
      const vacio = document.createElement('div');
      vacio.className = 'flex flex-col gap-3 px-3 py-4 text-center sm:text-left';

      const mensaje = document.createElement('p');
      mensaje.className = 'nav-search-subtitulo text-sm leading-relaxed';
      mensaje.textContent = `No encontramos coincidencias para "${consulta}". Puedes explorar nuestras muestras o escribirnos para cotizar tu evento.`;

      const acciones = document.createElement('div');
      acciones.className =
        'flex flex-wrap items-center justify-center gap-2 sm:justify-start';

      const enlaceMuestras = document.createElement('a');
      enlaceMuestras.href = '#muestras';
      enlaceMuestras.dataset.searchResult = 'true';
      enlaceMuestras.className =
        'nav-search-chip inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium';
      enlaceMuestras.textContent = 'Ver muestras';
      enlaceMuestras.addEventListener('click', () => manejarClickResultado('#muestras'));

      const enlaceCotizar = document.createElement('a');
      enlaceCotizar.href = cotizarHref;
      if (cotizarExterno) {
        enlaceCotizar.target = '_blank';
        enlaceCotizar.rel = 'noopener noreferrer';
      }
      enlaceCotizar.className =
        'nav-movil-cta inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium';
      enlaceCotizar.textContent = 'Cotizar evento';
      enlaceCotizar.addEventListener('click', () => manejarClickResultado(cotizarHref));

      acciones.appendChild(enlaceMuestras);
      acciones.appendChild(enlaceCotizar);
      vacio.appendChild(mensaje);
      vacio.appendChild(acciones);
      contenidoPanel.appendChild(vacio);
      return;
    }

    contenidoPanel.appendChild(
      crearEncabezadoSeccion(
        resultados.length === 1 ? '1 resultado' : `${resultados.length} resultados`,
      ),
    );

    const lista = document.createElement('div');
    lista.className = 'flex flex-col gap-0.5';
    for (const item of resultados) {
      lista.appendChild(crearEnlaceResultado(item));
    }
    contenidoPanel.appendChild(lista);
  };

  const abrir = () => {
    if (abierto) {
      input?.focus();
      return;
    }

    onAbrir?.();
    abierto = true;
    header.dataset.hidden = 'false';
    header.dataset.searchOpen = 'true';
    botonAbrir?.setAttribute('aria-expanded', 'true');

    if (panel) {
      panel.classList.remove('hidden');
      panel.setAttribute('aria-hidden', 'false');
    }

    actualizarEtiquetaLimpiar();
    renderizar();

    window.requestAnimationFrame(() => {
      input?.focus();
    });
  };

  botonAbrir?.addEventListener('click', () => {
    if (abierto) {
      cerrar({ devolverFoco: true });
    } else {
      abrir();
    }
  });

  botonLimpiar?.addEventListener('click', (evento) => {
    evento.stopPropagation();
    if (!input) {
      cerrar({ devolverFoco: true });
      return;
    }
    if (input.value.trim().length > 0) {
      input.value = '';
      actualizarEtiquetaLimpiar();
      renderizar();
      input.focus();
    } else {
      cerrar({ devolverFoco: true });
    }
  });

  panel?.addEventListener('click', (evento) => {
    evento.stopPropagation();
  });

  input?.addEventListener('input', () => {
    actualizarEtiquetaLimpiar();
    renderizar();
  });

  input?.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      const primerResultado = contenidoPanel?.querySelector<HTMLAnchorElement>(
        '[data-search-result="true"]',
      );
      if (primerResultado) {
        evento.preventDefault();
        primerResultado.click();
      }
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && abierto) {
      evento.preventDefault();
      cerrar({ devolverFoco: true });
    }
  });

  document.addEventListener('click', (evento) => {
    if (!abierto) return;
    const ruta = typeof evento.composedPath === 'function' ? evento.composedPath() : [];
    const destino = evento.target as Node | null;
    const dentroDeHeader =
      ruta.includes(header) || (destino ? header.contains(destino) : false);
    if (!dentroDeHeader) {
      cerrar({ devolverFoco: false });
    }
  });

  return {
    abrir,
    cerrar,
    estaAbierto: () => abierto,
  };
}
