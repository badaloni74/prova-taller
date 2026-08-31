---
spec: SPE-08-factura-rectificativa.md
spec_status: Implemented
commits: [e788063, eff00e1, 106cf11, df1ab05]
generator: A-03 plan de pruebas — revisión post-implementación
generated_at: 2026-08-31T10:00:00+02:00
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    version: 1.10.0
    hash: sha256:a050cca8974802655ff15515c99cde729d7c976d866a9622f30f689398745f32
  - id: DOC-04-FUNCIONAL.md
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
---

# SPE-08-factura-rectificativa — manifiesto de aceptación y regresión

## 1. Qué valida esta implantación

Que una factura emitida por error se pueda corregir mediante una factura
rectificativa: numerada con prefijo propio, que libera los albaranes de la
original a pendiente sin alterar ninguno de sus campos propios, que no se
puede emitir dos veces sobre la misma original, que exige un motivo, que
funciona con independencia del estado de pago, y que queda visible con una
marca «Anulada» en las tres pantallas de factura — cerrando `BUG-004`
(`DOC-24`) y `DOC-04/Q-06`.

## 2. Pruebas de aceptación

| Criterio (spec) | `verification_path` | Cubierto por |
|---|---|---|
| AC-001 — Existe `POST /api/factures/:id/rectificar`, acepta `{ motiu }` | ui | TC-127 |
| AC-002 — Al rectificar, cada albarán vuelve a `pendent`/`factura_id: NULL` en la misma operación | ui | TC-127 |
| AC-003 — La rectificativa se numera con su propio prefijo (`año/R-nnnu`) | ui | TC-127 |
| AC-004 — La factura original no cambia ningún campo propio; su condición «anulada» es derivada | ui | TC-128 |
| AC-005 — No se puede rectificar una factura que ya tiene una rectificativa (409) | service | TC-129 |
| AC-006 — Se puede rectificar una factura en cualquier `estat_pagament` | ui | TC-130 |
| AC-007 — Rectificar sin `motiu` (vacío o ausente) devuelve 400 | service | TC-131 |
| AC-008 — `estat_pagament` conserva su vocabulario cerrado; REQ-055/TC-078 sin cambios | ui | TC-078 *(existente, sin cambio)* |
| AC-009 — `FacturaDetail.tsx` muestra la acción, el enlace bidireccional y la marca «Anulada» | ui | TC-127 |
| AC-010 — `FacturesList.tsx` y `ClientDetail.tsx` muestran la misma marca | ui | TC-132 |
| AC-011 — El caso real de `BUG-004` (factura `2026/F-0002`) puede rectificarse | ui | TC-127 *(datos de seed equivalentes; los originales ya no existen — salvedad del propio spec)* |

**11 de 11 criterios cubiertos. Cero `sin caso`.**

## 3. Pruebas de regresión

Alcance derivado de los ficheros tocados (`git show --stat e788063..df1ab05`:
`server/db/migrations/004_factura_rectificativa.sql`,
`server/routes/factures.js`, `client/src/services/factures.ts`,
`client/src/types/factura.ts`, `client/src/pages/factures/FacturaDetail.tsx`
—reescrito en un 146-line diff—, `client/src/pages/factures/FacturesList.tsx`,
`client/src/pages/clients/ClientDetail.tsx`, `client/src/locales/{es,ca}.json`)
y del módulo `factures` (y la ficha de cliente) en `DOC-05`.

| TC | Módulo | Prioridad | Motivo | Automatizado |
|---|---|---|---|---|
| TC-006 | clients | High | impacto directo — `ClientDetail.tsx` cambia (gana la marca condicional en su lista de facturas) | ui |
| TC-060 | factures | Critical | vecindad — camino feliz de emisión, mismo módulo, no debía verse afectado | ui |
| TC-069 | factures | Critical | impacto directo — lee base/IVA/total desde `FacturaDetail.tsx`, el componente reescrito | ui |
| TC-071 | factures | Critical | vecindad — variante del cálculo por defecto, mismo detalle | ui |
| TC-074 | factures | High | impacto directo — `FacturesList.tsx` cambia (marca condicional nueva) | ui |
| TC-075 | factures | High | impacto directo — el detalle que este caso verifica es exactamente el componente reescrito | ui |
| TC-076 | factures | High | impacto directo — `togglePaymentStatus` vive en el mismo componente reescrito | ui |
| TC-077 | factures | Medium | impacto directo — idem, sentido inverso | ui |
| TC-078 | factures | High | vecindad — mismo componente; el desplegable de estado de pago no debía tocarse | ui |
| TC-119 | factures | Critical | vecindad — `mixed`; abre el detalle de la factura resultante, mismo componente reescrito | mixed |

**10 casos seleccionados de 132** (los 6 nuevos de aceptación se ejecutan
aparte, sección 2). No se selecciona todo `factures` (26 casos): se excluyen
los que no tocan ni el fichero modificado ni el campo visible (emisión con
variantes de IVA no relacionadas, bloqueos de refacturación por servicio,
boundary de numeración anual).

## 4. Lo que queda fuera y el riesgo aceptado

Fuera de la sección 3 quedan el resto de `factures` (`TC-061` a `TC-068`,
`TC-070`, `TC-072`, `TC-073` — estos tres últimos son variantes del mismo
cálculo, cubiertas indirectamente por `TC-069`/`TC-071`), además de los otros
siete módulos completos. El riesgo aceptado: si `SPE-08` hubiera roto algo
fuera del flujo de rectificación/detalle/listado de factura —por ejemplo, la
emisión con un tipo de IVA indicado a mano, o la numeración anual—, no se
detectaría en esta pasada acotada. Es un riesgo bajo: el diff de los cuatro
commits no toca `FacturaForm.tsx`, `server/routes/albarans.js` ni ningún otro
endpoint o componente fuera de los listados arriba; la selección pesada de
regresión completa (informada por el estado de Rally) es tarea del `DOC-12` de
A-09 en Fase 2, no de este manifiesto.

## 5. Cómo se ejecuta

- **Aceptación de servicio** (`TC-129`, `TC-131`): `automation/api/`, una vez
  `s10-auto-tcs`/S-17 las incorpore a la colección (pendiente — ver `-QA.md`).
  Mientras tanto, ejecutar a mano contra el servidor real:
  ```bash
  cd automation/api && newman run tallerMecaniccollection.json -e environments/tallerMecanicEnvironmentLocal.json --reporters cli,json --reporter-json-export newman/run.json
  ```
  (no cubre `TC-129`/`TC-131` hasta que se añadan las peticiones).
- **Aceptación de interfaz** (`TC-127`, `TC-128`, `TC-130`, `TC-132`):
  `automation/ui/`, pendiente de que `s10-auto-tcs` escriba los escenarios. Hoy
  se ejecutan **a mano**: detalle de una factura pendiente de cobro
  (`TC-127`), comparación de campos antes/después de rectificar (`TC-128`),
  detalle de una factura pagada (`TC-130`), y listado de facturas más ficha de
  cliente (`TC-132`).
- **Regresión** (sección 3): una vez existan los escenarios nuevos,
  ```bash
  export JAVA_HOME="C:\Program Files\Java\jdk-21.0.9.10-hotspot"
  cd automation/ui && mvn test -Dapp.url=http://localhost:5173 -Dcucumber.filter.tags="@TC-006 or @TC-060 or @TC-069 or @TC-071 or @TC-074 or @TC-075 or @TC-076 or @TC-077 or @TC-078 or @TC-119"
  ```
  Reseed antes de ejecutar (`npm run seed`), como exige `CLAUDE.md` para
  cualquier corrida que toque stock o cree registros — la rectificación crea
  filas nuevas en `factures` y libera albaranes, así que no restaura el estado
  original.

## 6. Bloque estructurado

```yaml pruebas-spec
version: 1
spec: SPE-08-factura-rectificativa.md
impact_source: commits
acceptance:
  - criterion: "AC-001 — endpoint de rectificación acepta motiu"
    verification_path: ui
    covered_by: TC-127
  - criterion: "AC-002 — los albaranes vuelven a pendent/factura_id null"
    verification_path: ui
    covered_by: TC-127
  - criterion: "AC-003 — numeracion propia año/R-nnnu"
    verification_path: ui
    covered_by: TC-127
  - criterion: "AC-004 — la factura original no cambia ningun campo propio"
    verification_path: ui
    covered_by: TC-128
  - criterion: "AC-005 — rechazo de una segunda rectificacion (409)"
    verification_path: service
    covered_by: TC-129
  - criterion: "AC-006 — se puede rectificar una factura pagada"
    verification_path: ui
    covered_by: TC-130
  - criterion: "AC-007 — rechazo sin motivo (400)"
    verification_path: service
    covered_by: TC-131
  - criterion: "AC-008 — estat_pagament conserva su vocabulario cerrado"
    verification_path: ui
    covered_by: TC-078
  - criterion: "AC-009 — accion, enlace bidireccional y marca en FacturaDetail"
    verification_path: ui
    covered_by: TC-127
  - criterion: "AC-010 — marca en FacturesList y ClientDetail"
    verification_path: ui
    covered_by: TC-132
  - criterion: "AC-011 — el caso real de BUG-004 puede rectificarse"
    verification_path: ui
    covered_by: TC-127
regression:
  selected:
    - id: TC-006
      module: clients
      priority: High
      reason: impacto_directo
      automated: ui
    - id: TC-060
      module: factures
      priority: Critical
      reason: vecindad
      automated: ui
    - id: TC-069
      module: factures
      priority: Critical
      reason: impacto_directo
      automated: ui
    - id: TC-071
      module: factures
      priority: Critical
      reason: vecindad
      automated: ui
    - id: TC-074
      module: factures
      priority: High
      reason: impacto_directo
      automated: ui
    - id: TC-075
      module: factures
      priority: High
      reason: impacto_directo
      automated: ui
    - id: TC-076
      module: factures
      priority: High
      reason: impacto_directo
      automated: ui
    - id: TC-077
      module: factures
      priority: Medium
      reason: impacto_directo
      automated: ui
    - id: TC-078
      module: factures
      priority: High
      reason: vecindad
      automated: ui
    - id: TC-119
      module: factures
      priority: Critical
      reason: vecindad
      automated: mixed
  excluded_summary:
    total: 116
    accepted_risk: "ningun otro endpoint ni componente aparece en el diff de los cuatro commits (no toca FacturaForm.tsx, albarans.js ni peces.js); riesgo bajo de regresion fuera del flujo de rectificacion/detalle/listado de factura"
gaps: []
totals:
  acceptance: { total: 11, covered: 11, uncovered: 0 }
  regression: { selected: 10, of: 132 }
```
