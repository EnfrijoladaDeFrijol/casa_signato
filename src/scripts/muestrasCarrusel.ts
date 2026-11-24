export function iniciarMuestrasCarrusel(raiz: HTMLElement): void {
  const pista = raiz.querySelector<HTMLElement>('[data-carrusel-track]');
  const slides = Array.from(raiz.querySelectorAll<HTMLElement>('[data-slide]'));
  const tabs = Array.from(raiz.querySelectorAll<HTMLButtonElement>('[data-filtro-cat]'));
  const btnPrev = raiz.querySelector<HTMLButtonElement>('[data-carrusel-prev]');
  const btnNext = raiz.querySelector<HTMLButtonElement>('[data-carrusel-next]');
  const btnPreview = raiz.querySelector<HTMLButtonElement>('[data-toggle-preview]');
  const iconoPausa = raiz.querySelector<SVGElement>('[data-icon-pause]');
  const iconoPlay = raiz.querySelector<SVGElement>('[data-icon-play]');
  const ctaTitulo = raiz.querySelector<HTMLElement>('[data-cta-titulo]');
  const ctaMeta = raiz.querySelector<HTMLElement>('[data-cta-meta]');
  const ctaLink = raiz.querySelector<HTMLAnchorElement>('[data-cta-link]');

  if (!pista || slides.length === 0) return;

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activo: HTMLElement | null = null;
  let rafId = 0;

  const obtenerVisibles = (): HTMLElement[] =>
    slides.filter((slide) => !slide.hidden);

  const calcularScrollCentro = (slide: HTMLElement): number => {
    const maxScroll = Math.max(0, pista.scrollWidth - pista.clientWidth);
    const destino = slide.offsetLeft - (pista.clientWidth - slide.offsetWidth) / 2;
    return Math.max(0, Math.min(maxScroll, destino));
  };

  const sincronizarFlechas = (visibles: HTMLElement[]): void => {
    const mostrar = visibles.length > 1;
    const indice = activo ? visibles.indexOf(activo) : 0;

    if (btnPrev) {
      btnPrev.hidden = !mostrar;
      btnPrev.disabled = indice <= 0;
    }
    if (btnNext) {
      btnNext.hidden = !mostrar;
      btnNext.disabled = indice >= visibles.length - 1;
    }
  };

  const aplicarActivo = (candidato: HTMLElement | null): void => {
    const visibles = obtenerVisibles();
    if (!candidato || candidato.hidden) {
      candidato = visibles[0] ?? null;
    }
    if (!candidato) return;

    activo = candidato;
    for (const slide of slides) {
      slide.dataset.active = slide === candidato ? 'true' : 'false';
    }

    if (ctaTitulo) ctaTitulo.textContent = candidato.dataset.titulo ?? '';
    if (ctaMeta) ctaMeta.textContent = candidato.dataset.meta ?? '';
    if (ctaLink && candidato.dataset.href) ctaLink.href = candidato.dataset.href;

    sincronizarFlechas(visibles);
  };

  const detectarSlideCentral = (): HTMLElement | null => {
    const visibles = obtenerVisibles();
    if (visibles.length === 0) return null;

    const centroPista = pista.scrollLeft + pista.clientWidth / 2;
    let masCercano = visibles[0];
    let menorDistancia = Infinity;

    for (const slide of visibles) {
      const centroSlide = slide.offsetLeft + slide.offsetWidth / 2;
      const distancia = Math.abs(centroSlide - centroPista);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        masCercano = slide;
      }
    }

    return masCercano;
  };

  const irASlide = (slide: HTMLElement, suave: boolean): void => {
    aplicarActivo(slide);
    const left = calcularScrollCentro(slide);
    if (suave && !reducirMovimiento) {
      pista.scrollTo({ left, behavior: 'smooth' });
    } else {
      pista.scrollLeft = left;
    }
  };

  const aplicarFiltro = (categoria: string): void => {
    for (const tab of tabs) {
      const seleccionado = tab.dataset.filtroCat === categoria;
      tab.setAttribute('aria-selected', seleccionado ? 'true' : 'false');
    }

    for (const slide of slides) {
      const coincide = categoria === 'todas' || slide.dataset.categoria === categoria;
      slide.hidden = !coincide;
    }

    const visibles = obtenerVisibles();
    const indiceDestino = visibles.length >= 3 ? 1 : 0;
    const objetivo = visibles[indiceDestino] ?? visibles[0];
    if (!objetivo) return;

    aplicarActivo(objetivo);
    pista.scrollLeft = calcularScrollCentro(objetivo);
    window.requestAnimationFrame(() => {
      pista.scrollLeft = calcularScrollCentro(objetivo);
    });
  };

  const actualizarEstadoPreview = (pausado: boolean): void => {
    raiz.dataset.previewPaused = pausado ? 'true' : 'false';
    btnPreview?.setAttribute('aria-pressed', pausado ? 'true' : 'false');
    iconoPausa?.classList.toggle('hidden', pausado);
    iconoPlay?.classList.toggle('hidden', !pausado);
  };

  pista.addEventListener(
    'scroll',
    () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const central = detectarSlideCentral();
        if (central && central !== activo) {
          aplicarActivo(central);
        }
      });
    },
    { passive: true },
  );

  slides.forEach((slide) => {
    const enlace = slide.querySelector<HTMLAnchorElement>('[data-phone-link]');
    enlace?.addEventListener('click', (evento) => {
      if (slide.dataset.active !== 'true') {
        evento.preventDefault();
        irASlide(slide, true);
      }
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.filtroCat ?? 'todas';
      aplicarFiltro(cat);
    });
  });

  btnPrev?.addEventListener('click', () => {
    const visibles = obtenerVisibles();
    const indice = activo ? visibles.indexOf(activo) : 0;
    if (indice > 0) irASlide(visibles[indice - 1], true);
  });

  btnNext?.addEventListener('click', () => {
    const visibles = obtenerVisibles();
    const indice = activo ? visibles.indexOf(activo) : 0;
    if (indice < visibles.length - 1) irASlide(visibles[indice + 1], true);
  });

  btnPreview?.addEventListener('click', () => {
    const pausado = raiz.dataset.previewPaused === 'true';
    actualizarEstadoPreview(!pausado);
  });

  actualizarEstadoPreview(reducirMovimiento);

  const visiblesIniciales = obtenerVisibles();
  const inicial = visiblesIniciales[visiblesIniciales.length >= 3 ? 1 : 0] ?? visiblesIniciales[0];
  if (inicial) {
    aplicarActivo(inicial);
    pista.scrollLeft = calcularScrollCentro(inicial);
  }
}
