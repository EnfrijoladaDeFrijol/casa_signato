# Reglas del Repositorio — Casa Signato

1. Antes de planear o escribir código, lee obligatoriamente `BRIEF.md`.
2. Respeta la arquitectura modular: un solo orquestador (`InvitacionMain.astro`), secciones reutilizables en `src/components/secciones/` controladas por `src/utils/planes.ts`, y temas visuales en `src/components/temas/`.
3. Paleta oficial de marca (`#F7F6F2`, `#8BA888`, `#C6B4A6`, `#363E35`). Prohibido usar `#000000` (negro puro) en textos o fondos.
4. Prohibido usar emojis del sistema (`🎉`, `🎂`, `💍`, `👑`) como gráficos o divisores en invitaciones o landing.
5. Las invitaciones usan CSS Variables dinámicas (`--bg`, `--surface`, `--accent`, `--ink`); nunca concatenes sufijos de opacidad a strings hex en `style`.
6. Todo copy, comentarios y textos visibles deben estar en español (México). Nunca uses el nombre viejo "Core Invitaciones".
7. Verifica siempre con `npm run build` que no haya errores de TypeScript o Astro antes de dar una tarea por terminada.
8. Prohibido usar etiquetas tipo píldora ovalada con punto de color a la izquierda (status-dot pills / badges redondeados tipo SaaS) como subtítulos o encabezados. Usar únicamente tipografía editorial limpia con líneas finas de 1px.