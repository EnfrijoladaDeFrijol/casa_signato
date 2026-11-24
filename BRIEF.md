# BRIEF MAESTRO — CASA SIGNATO

## 1. Visión del Producto y Modelo de Negocio
- **Nombre de la marca:** Casa Signato (PROHIBIDO usar el nombre viejo "Core Invitaciones").
- **Qué es:** Emprendimiento boutique en México dedicado a crear invitaciones digitales interactivas, elegantes y rápidas para eventos sociales (XV Años, Bodas, Bautizos, Cumpleaños).
- **Equipo:** 2 desarrolladores (Arturo y Dey) trabajando en el mismo repositorio con Astro, TypeScript y Tailwind CSS.
- **Filosofía de infraestructura ($0 USD/mes):** Monolito estático en Astro desplegado en Vercel Hobby (`casa-signato.vercel.app`, futuro dominio propio `casasignato.com`) bajo un solo dominio. Cero backend de pago y cero base de datos externa; el catálogo y los eventos viven como datos tipados locales en `src/data/clientes.ts`.
- **Operación administrativa:** Existe una cuenta de Google oficial exclusiva de Casa Signato para alojar el Google Drive de recursos/fotos, los Google Forms de confirmación (RSVP) y las hojas de Google Sheets compartidas con cada cliente.

## 2. Las 3 Superficies del Sitio (Todo en el mismo proyecto)
1. **`/` (Landing Page Comercial):** Sitio de ventas para presentar la marca, mostrar el catálogo de muestras, explicar los 3 paquetes (Plata, Gold, Diamante), resolver dudas y llevar a cotizar por WhatsApp.
2. **`/admin` (Panel Interno):** Dashboard 100% responsivo (Mobile-First) con buscador en tiempo real y filtros por categoría para encontrar, revisar y abrir enlaces de clientes y demos rápidamente desde el celular.
3. **`/[categoria]/[slug]` (Invitaciones Finales):** Rutas estáticas dinámicas para cada evento (ej. `/xv-anos/sofia-xv`, `/bodas/karen-y-luis`, `/bautizos/mateo`, `/cumpleanos/lucas`).

## 3. Paquetes Comerciales y Arquitectura Modular
Todas las invitaciones se renderizan desde un **único orquestador** (`src/components/InvitacionMain.astro`) que consulta `src/utils/planes.ts` para activar o desactivar secciones automáticamente según el paquete contratado, permitiendo además activar/desactivar módulos sueltos (*add-ons*) vía `modulosOverride` en cada cliente.

### Niveles Oficiales (Pago Único en MXN)
- **🥈 PLATA — $349 MXN** *(Esencial / Eventos íntimos)*
  - Enlace personalizado (`/[categoria]/[slug]`), diseño Mobile-First, paleta y tipografía del evento.
  - Portada (`Hero`) con nombres, fecha, frase emotiva y **1 fotografía**.
  - Mención honorífica de Padres y Padrinos.
  - Cuenta regresiva en tiempo real (días, horas, minutos, segundos).
  - Ubicaciones interactivas (Ceremonia y Recepción) con botones directos a Google Maps / Waze.
  - Confirmación básica por botón de WhatsApp (`https://wa.me/` con mensaje pre-llenado codificado).
- **🥇 GOLD — $449 MXN ⭐** *(El más vendido — XV Años y Bodas)*
  - Todo lo de Plata, más:
  - Reproductor flotante de música de fondo (Play/Pause con audio ligero).
  - Galería fotográfica optimizada en WebP (**hasta 6 fotos**).
  - Itinerario del evento (línea de tiempo vertical con horarios e iconos minimalistas).
  - Código de vestimenta (*Dress Code*) con indicación de colores sugeridos o reservados.
  - Mesa de regalos (enlaces a tiendas departamentales como Liverpool/Amazon) y Lluvia de sobres (datos bancarios/CLABE con botón para copiar).
- **💎 DIAMANTE — $749 MXN** *(Control VIP de invitados)*
  - Todo lo de Gold, más:
  - Galería extendida (**hasta 12 fotos**).
  - Confirmación inteligente: botón directo a un **Google Form personalizado** (`target="_blank"`) conectado a Google Sheets en vivo (cero formularios HTML propios ni backend).
  - Pase de boletos digital (*Ticket Pass*): muestra lugares asignados leyendo `?pases=X` de la URL con fallback al valor por defecto del cliente.
  - Botón "Agendar en Calendario" (Google Calendar / archivo `.ics` para Apple Calendar).
  - Sección de hospedaje / hoteles sugeridos con ubicación (para invitados foráneos).
  - Álbum compartido de la fiesta (botón y/o código QR hacia Google Drive / Google Photos).
- **Extras sueltos (Add-ons):** Cualquier módulo de un nivel superior puede encenderse individualmente en un plan inferior mediante `modulosOverride` (ej. un cliente Gold que agrega `rsvpGoogleForm: true`).

## 4. Identidad Visual y Dirección de Arte (Anti-Genérico)
### A. Marca Casa Signato (Landing Page `/` y Panel `/admin`)
- **Personalidad:** invitaciones digitales boutique — sobria, cálida, orgánica y de lujo accesible.
- **Símbolo oficial:** Caballito de mar en SVG limpio.
- **Paleta estricta de marca:**
  - Lienzo / Fondo principal: `#F7F6F2` (Blanco Hueso / Alabastro — sensación de papel fino)
  - Principal / Sello / CTAs: `#8BA888` (Verde Salvia apagado; variante oliva `#93A889`)
  - Secundario / Acentos / Divisores: `#C6B4A6` (Arcilla suave / Arena)
  - Contraste / Textos y títulos: `#363E35` (Verde Bosque Profundo / Carbón)
  - **REGLA ABSOLUTA:** PROHIBIDO usar negro puro (`#000000`) en textos, bordes o fondos.
- **Uso controlado de Liquid Glass + UI Espacial:**
  - Aplicar *UI Espacial* mediante aire generoso, ritmo visual limpio y elevación sutil.
  - Aplicar *Liquid Glass* (`backdrop-blur`, fondos translúcidos claros sobre `#F7F6F2`, bordes finos `border-white/50`) **con moderación** en la barra de navegación sticky, tarjeta destacada del paquete Gold y tarjetas clave de la Landing. Nunca caer en glassmorphism oscuro, neones ni sombras pesadas.

### B. Invitaciones de Clientes (`/[categoria]/[slug]`)
- **Experiencia 100% Mobile-First:** Más del 95% de los invitados abrirá el enlace desde WhatsApp en celular. Cero desbordamiento horizontal, botones cómodos para el pulgar y sensación de app editorial.
- **Temas dinámicos por CSS Variables:** Cada invitación define su propia paleta y par tipográfico mediante CSS Variables (`--bg`, `--surface`, `--accent`, `--accent-soft`, `--ink`, `--ink-muted`, `--font-display`, `--font-body`) inyectadas en `InvitacionLayout.astro`. Prohibido concatenar sufijos de opacidad a strings HEX dentro de `style`.
- **Prohibiciones estrictas (Anti-Slop):**
  - PROHIBIDO usar emojis del sistema (`🎉`, `🎂`, `💍`, `👑`, `🕊️`, `📍`) como arte, íconos o divisores dentro de invitaciones o la landing. Usar únicamente SVG minimalistas de trazo fino o líneas/ornamentos tipográficos.
  - PROHIBIDO usar gradientes pastel genéricos o layouts donde todas las secciones son la misma tarjeta blanca apilada.
  - Usar jerarquía tipográfica editorial real (Serif expresiva o Display elegante para nombres/fechas + Sans limpia para lectura y horarios) y alternar ritmo visual entre secciones.

## 5. Arquitectura de Carpetas y Convenciones Técnicas
- **Stack:** Astro + TypeScript estricto + Tailwind CSS (cero librerías pesadas de JS; animaciones con CSS/Tailwind respetando `prefers-reduced-motion`).
- **Idioma:** Todo texto visible para el usuario, demos, copy y comentarios en **español (México)**.
- **Estructura obligatoria de `src/`:**
  - `src/styles/global.css`: Tokens de Casa Signato y variables base.
  - `src/types/invitacion.ts`: Tipos estrictos (`PlanTipo`, `CategoriaEvento`, `ModulosInvitacion`, `ClienteInvitacion`).
  - `src/utils/`: Lógica pura (`planes.ts`, `fechas.ts`, `categorias.ts`).
  - `src/data/clientes.ts`: Lista tipada de demos y clientes reales.
  - `src/layouts/`: `MarcaLayout.astro` (Casa Signato) e `InvitacionLayout.astro` (eventos).
  - `src/components/InvitacionMain.astro`: Orquestador central único.
  - `src/components/secciones/`: Secciones funcionales reutilizadas por todos los eventos (<150 líneas c/u).
  - `src/components/temas/`: Portadas (`Hero.astro`) y acentos visuales por estilo de invitación.
  - `src/components/landing/` y `src/components/admin/`: Componentes modulares de ventas y panel interno.
  - `src/pages/`: `index.astro`, `admin/index.astro`, `[categoria]/[slug].astro`.
- **Reglas de calidad:**
  - En barras flexibles con scroll horizontal (como filtros en `/admin`), usar siempre `w-full min-w-0` para evitar *Flexbox Blowout* en móvil.
  - Imágenes optimizadas en WebP y carga diferida (`loading="lazy"`) debajo del primer pliegue.
  - Todo cambio debe compilar limpio con `npm run build` sin errores ni warnings de TypeScript.