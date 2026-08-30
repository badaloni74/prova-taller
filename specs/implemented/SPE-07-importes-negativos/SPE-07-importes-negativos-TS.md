---
spec: SPE-07-importes-negativos.md
spec_status: Implemented
commits: [969edf9, e7ab829, 2b841e3, 29371fd, 6499474]
generator: A-03 plan de pruebas — revisión post-implementación
generated_at: 2026-08-30T20:15:00+02:00
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    version: 1.9.0
    hash: sha256:9cea84a7f8804d357a6b69498bf9ece90eb437ca681cb8181996cee1788d36f9
  - id: DOC-04-FUNCIONAL.md
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
---

# SPE-07-importes-negativos — manifiesto de aceptación y regresión

## 1. Qué valida esta implantación

Que el precio, el coste y el stock de una pieza, el precio de una línea de
albarán y el precio por hora de la mano de obra no puedan guardarse con un
valor negativo o (salvo el stock) igual a cero — ni por servicio ni por
interfaz —, cerrando `BUG-003` (`DOC-24`) y `DOC-04/Q-12`.

## 2. Pruebas de aceptación

| Criterio (spec) | `verification_path` | Cubierto por |
|---|---|---|
| AC-001 — `POST /api/peces` con `preu` negativo se rechaza (400), no se crea | service | TC-120 |
| AC-002 — `POST /api/peces` con `cost` negativo informado se rechaza (400) | service | TC-120 |
| AC-003 — `POST /api/peces` con `estoc` negativo se rechaza (400); `estoc: 0` se crea | service | TC-120 |
| AC-004 — `PUT /api/peces/:id` con `preu`/`cost`/`estoc` negativo se rechaza; valores previos intactos | service | TC-121 |
| AC-005 — línea de mano de obra con `preu` ≤ 0 (u omitido) se rechaza (400) | service | TC-122 |
| AC-006 — línea de pieza sin `preu` sigue usando el precio de catálogo | service | TC-046 *(existente, sin cambio)* |
| AC-007 — línea de pieza con `preu` override negativo se rechaza igual | service | TC-123 |
| AC-008 — formulario de pieza: precio/coste/estoc inválido, error en pantalla, sin llamada al servidor | ui | TC-124 |
| AC-009 — formulario de línea de mano de obra: precio ≤ 0 o vacío, error en pantalla, sin llamada al servidor | ui | TC-125 |
| AC-010 — reproducir `DOC-24/BUG-003` (API y UI) ya no se acepta en ninguno de los dos | mixed | TC-126 |

**10 de 10 criterios cubiertos. Cero `sin caso`.**

## 3. Pruebas de regresión

Alcance derivado de los ficheros tocados (`git show --stat 969edf9..6499474`:
`server/routes/peces.js`, `server/routes/albarans.js`, `PecaForm.tsx`,
`EntityForm.tsx`, `AlbaraLiniesSection.tsx`) y de los módulos `peces` y
`albarans` en `DOC-05`.

| TC | Módulo | Prioridad | Motivo | Automatizado |
|---|---|---|---|---|
| TC-024 | peces | High | vecindad — mismo módulo, catálogo no debe haber cambiado de comportamiento en su camino feliz | ui |
| TC-025 | peces | High | vecindad — alta de pieza con valores positivos, el vector que `SPE-07` no debía tocar | ui |
| TC-026 | peces | Critical | vecindad — el rechazo por nombre vacío no debe haberse visto afectado por el nuevo `handleSubmit` de `PecaForm.tsx` | ui |
| TC-027 | peces | Critical | vecindad — ídem, en modificación | ui |
| TC-029 | peces | High | impacto directo — modifica precio y stock de una pieza; mismo fichero (`peces.js` `PUT`) que `SPE-07` tocó | ui |
| TC-046 | albarans | High | impacto directo — `AC-006`: línea de pieza sin `preu` hereda el catálogo; el `if (preu && Number(preu) < 0)` nuevo no debe alterar la rama `!preu` | ui |
| TC-047 | albarans | Medium | impacto directo — override de precio (positivo) en línea de pieza; mismo bloque de código que `TC-123` ejercita en negativo | ui |
| TC-048 | albarans | Critical | vecindad — línea de pieza descuenta stock; `peces.js`/`albarans.js` tocados, aunque `SPE-07` no cambia la resta de stock en sí | ui |
| TC-050 | albarans | Critical | impacto directo — línea de mano de obra con precio positivo; mismo `if (!(Number(preu) > 0))` que ahora también rechaza negativo/cero | ui |
| TC-051 | albarans | High | vecindad — rechazo de línea de mano de obra sin descripción, mismo bloque `else` de `albarans.js` | ui |
| TC-900 | (fuera del rango, `automation/ui/`) | — | smoke de vigilancia — no relacionado con `BUG-003`, pero comparte fichero (`albarans.js`) con `TC-122`/`TC-123`; reejecutar de paso | ui |

**11 casos seleccionados de 126** (los 7 nuevos de aceptación se ejecutan aparte,
sección 2). No se selecciona todo `peces`/`albarans` (20 y 12 casos
respectivamente): se excluyen los que no tocan ni el fichero modificado ni el
campo validado (listados, filtros, bloqueos de borrado, ficha de consulta).

## 4. Lo que queda fuera y el riesgo aceptado

Fuera de la sección 3 quedan el resto de `peces` (TC-027 ya incluido; TC-028,
TC-030, TC-031) y de `albarans` (TC-032 a TC-045, TC-049, TC-052 a TC-068,
TC-111 a TC-118, TC-122, TC-123, TC-125 — estos tres últimos ya son aceptación,
no regresión), además de los otros seis módulos completos. El riesgo aceptado:
si `SPE-07` hubiera roto algo fuera del camino de precio/coste/stock/línea
—por ejemplo, el bloqueo de borrado de una pieza usada en un albarán, o el
listado de piezas—, no se detectaría en esta pasada acotada. Es un riesgo bajo:
el diff de los cuatro commits no toca ningún otro endpoint ni componente, y la
selección pesada de regresión completa (informada por el estado de Rally) es
tarea de `DOC-12` de A-09 en Fase 2, no de este manifiesto.

## 5. Cómo se ejecuta

- **Aceptación de servicio** (`TC-120` a `TC-123`): `automation/api/`, una vez
  `s10-auto-tcs`/S-17 las incorpore a la colección (pendiente — ver `-QA.md`).
  Mientras tanto, ejecutar a mano contra el servidor real:
  ```bash
  cd automation/api && newman run tallerMecaniccollection.json -e environments/tallerMecanicEnvironmentLocal.json --reporters cli,json --reporter-json-export newman/run.json
  ```
  (no cubre `TC-120`-`TC-123` hasta que se añadan las peticiones).
- **Aceptación de interfaz** (`TC-124`, `TC-125`) y **mixta** (`TC-126`):
  `automation/ui/`, pendiente de que `s10-auto-tcs` escriba los escenarios. Hoy
  se ejecutan **a mano**: Piezas > Nueva pieza (`TC-124`), línea de mano de obra
  de un albarán (`TC-125`), y la reproducción literal de `DOC-24/BUG-003` en
  las dos vías (`TC-126`).
- **Regresión** (sección 3): una vez existan los escenarios nuevos,
  ```bash
  export JAVA_HOME="C:\Program Files\Java\jdk-21.0.9.10-hotspot"
  cd automation/ui && mvn test -Dapp.url=http://localhost:5173 -Dcucumber.filter.tags="@TC-024 or @TC-025 or @TC-026 or @TC-027 or @TC-029 or @TC-046 or @TC-047 or @TC-048 or @TC-050 or @TC-051 or @TC-900"
  ```
  Reseed antes de ejecutar (`npm run seed`), como exige `CLAUDE.md` para
  cualquier corrida que toque stock o cree registros.

## 6. Bloque estructurado

```yaml pruebas-spec
version: 1
spec: SPE-07-importes-negativos.md
impact_source: commits
acceptance:
  - criterion: "AC-001 — precio negativo en alta de pieza se rechaza"
    verification_path: service
    covered_by: TC-120
  - criterion: "AC-002 — coste negativo informado en alta de pieza se rechaza"
    verification_path: service
    covered_by: TC-120
  - criterion: "AC-003 — estoc negativo se rechaza; estoc 0 se acepta"
    verification_path: service
    covered_by: TC-120
  - criterion: "AC-004 — modificación con precio/coste/estoc negativo se rechaza"
    verification_path: service
    covered_by: TC-121
  - criterion: "AC-005 — línea de mano de obra con precio no positivo se rechaza"
    verification_path: service
    covered_by: TC-122
  - criterion: "AC-006 — línea de pieza sin precio hereda el del catálogo"
    verification_path: service
    covered_by: TC-046
  - criterion: "AC-007 — override de precio negativo en línea de pieza se rechaza"
    verification_path: service
    covered_by: TC-123
  - criterion: "AC-008 — formulario de pieza avisa sin llamar al servidor"
    verification_path: ui
    covered_by: TC-124
  - criterion: "AC-009 — formulario de línea de mano de obra avisa sin llamar al servidor"
    verification_path: ui
    covered_by: TC-125
  - criterion: "AC-010 — reproducción de BUG-003 ya no se acepta"
    verification_path: mixed
    covered_by: TC-126
regression:
  selected:
    - id: TC-024
      module: peces
      priority: High
      reason: vecindad
      automated: ui
    - id: TC-025
      module: peces
      priority: High
      reason: vecindad
      automated: ui
    - id: TC-026
      module: peces
      priority: Critical
      reason: vecindad
      automated: ui
    - id: TC-027
      module: peces
      priority: Critical
      reason: vecindad
      automated: ui
    - id: TC-029
      module: peces
      priority: High
      reason: impacto_directo
      automated: ui
    - id: TC-046
      module: albarans
      priority: High
      reason: impacto_directo
      automated: ui
    - id: TC-047
      module: albarans
      priority: Medium
      reason: impacto_directo
      automated: ui
    - id: TC-048
      module: albarans
      priority: Critical
      reason: vecindad
      automated: ui
    - id: TC-050
      module: albarans
      priority: Critical
      reason: impacto_directo
      automated: ui
    - id: TC-051
      module: albarans
      priority: High
      reason: vecindad
      automated: ui
    - id: TC-900
      module: albarans
      priority: null
      reason: smoke
      automated: ui
  excluded_summary:
    total: 105
    accepted_risk: "ningun otro endpoint ni componente aparece en el diff de los cuatro commits; riesgo bajo de regresion fuera de precio/coste/stock/linea"
gaps: []
totals:
  acceptance: { total: 10, covered: 10, uncovered: 0 }
  regression: { selected: 11, of: 126 }
```
