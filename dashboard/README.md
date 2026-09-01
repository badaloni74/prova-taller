# Dashboard de trazabilidad y estado

`dashboard-actual.html` es el dashboard con los **datos reales actuales** del
proyecto: requisitos, casos de prueba, cobertura, planes de prueba, preguntas
abiertas, defectos, mejoras, riesgos, evolutivos, especificaciones, nuevas
funcionalidades y documentos. Se abre directamente en el navegador, sin
servidor.

## Cómo se regenera

```bash
node dashboard/generar-dashboard.js
```

Lee `docs/*.md`, `docs/DOC-24-BUGS.json`, `registro-ids.json` y `specs/` —
nunca escribe datos a mano — y ejecuta de verdad `matriz.js` (S-14) para la
cobertura, en vez de recalcularla. Sobrescribe `dashboard-actual.html`.

**Un fichero HTML estático no puede recargarse solo cuando cambian los
documentos** — un navegador no lee el filesystem por su cuenta. Lo que sí es
real: regenerar el dashboard entero es este único comando, y tarda segundos.
Ejecútalo después de cualquier cambio en `docs/` que quieras ver reflejado
(una implantación de spec, una regeneración de documentación, un ciclo de
`s16-cascada-obsolescencia`).

Encaja de forma natural al final del flujo de `/spec-impl`: justo después de
que `A-03` actualice `DOC-05` y de que se resuelva la cascada de
obsolescencia, es el momento en que `docs/` ha terminado de cambiar.

## De dónde sale cada página

| Página | Fuente |
|---|---|
| Resumen General | Todas las siguientes, agregadas |
| Requisitos | `DOC-04-FUNCIONAL.md` (bloque `requirements`), enriquecido con la matriz |
| Casos de Prueba | `DOC-05-PLAN-PRUEBAS.md` (bloques `testcases`) |
| Cobertura | Matriz de `s14-matriz-trazabilidad` (`matriz.js`), ejecutada de verdad |
| Test Plans | Módulos de `DOC-05` §4 como planes; estado de cada caso de `DOC-23` (UI) y `DOC-27` (servicio) |
| Preguntas | `registro-ids.json` (anclas `Q-nnn`) |
| Defectos | `DOC-24-BUGS.json`, con el cierre de `BUG-002` inferido de `specs/implemented/SPE-06-*` |
| Mejoras | `DOC-16-ROADMAP.md` (bloque `roadmap`) |
| Riesgos y Alertas | Sintetizado a partir de las demás fuentes (nunca inventado) |
| Evolutivos | `specs/implemented/` y `specs/pending/` |
| Especificaciones | Cabecera de cada `specs/implemented/SPE-nn-*` (estado, origen, fecha, objetivo) |
| Nuevas funcionalidades | `DOC-25-PROPUESTAS-FUNCIONALES.md` (bloque `propuestas`, `FUN-nnn`) |
| Documentos | Front-matter de cada `docs/DOC-nn-*.md` |

## Ficheros

- `generar-dashboard.js` — el generador. Es el único que hay que ejecutar.
- `motor.css` / `motor.js` — el motor de render (navegación, filtros, orden,
  tablas) y el estilo visual. Compartidos por las 10 páginas; no se editan a
  mano salvo para cambiar el diseño.
- `dashboard-actual.html` — la salida. No se edita a mano: se sobrescribe en
  cada regeneración.
- `Dashboard.jpg`, `dashboard-*-v7-*.html`, `dashboard-*-v8-*.html`,
  `PROMPT_AGENTE_GENERADOR_DASHBOARD_APP_TALLER.md` — versiones y prompts
  anteriores, conservados como referencia de diseño.
