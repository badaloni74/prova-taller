---
spec: SPE-06-albara-canvi-client.md
spec_status: Implemented
generator: A-09 (formato TS- original, 2026-08-28); dividido en -TS.md + -QA.md al migrar a carpeta por spec
generated_at: 2026-08-28T12:30:00+02:00
commit_range: 65b23a2..dc53dbf
inputs:
  - id: SPE-06-albara-canvi-client
    path: specs/implemented/SPE-06-albara-canvi-client/SPE-06-albara-canvi-client.md
    spec_status: Implemented
    present: true
  - id: DOC-05-PLAN-PRUEBAS
    version: 1.7.0
    hash_md5: 60fb2241807017e1340ea8eaa6dc1b72
    present: true
  - id: DOC-07-MATRIZ
    version: "1.10.0"
    hash_md5: 087a03779bd36a00d09f9e87943588c0
    present: true
    note: >-
      No incluye todavía TC-111 a TC-119 (fila REQ-040/REQ-027/REQ-042 sigue citando solo los
      IDs previos a 1.7.0). Es esperable: DOC-07 no se ha resincronizado desde el cierre de
      SPE-06 y no es este documento quien lo hace.
  - id: DOC-09-IMPACTO-albara-canvi-client
    version: 2.1.0
    hash_md5: e400256a93bb71ca1c3719c99a3af627
    present: true
    used: false
    note: >-
      No se usa como fuente de impacto: predata la implantación real de SPE-06 (última revisión,
      2.1.0, disparada por una cascada ajena — DOC-07 1.10.0 / DOC-27) y hoy está en revisión por
      esa causa distinta, no por este cierre. El alcance de este documento se deriva directamente
      de los 3 commits de la implantación, según instrucción explícita de la tarea.
  - id: DOC-20-RALLY-STATE
    present: false
---

# SPE-06-albara-canvi-client — Manifiesto de ejecución (`-TS`)

Qué se ejecuta para validar esta implantación: pruebas de aceptación (una por
criterio del spec) y el recorte de regresión. **El plan de cambios que la
automatización tiene pendiente** —los 9 `TC-nnn` nuevos que aún no están en
ninguna suite— vive en el fichero hermano
[`SPE-06-albara-canvi-client-QA.md`](SPE-06-albara-canvi-client-QA.md).

## 1. Qué se implantó

`SPE-06` (origen `BUG-002`) impide que cambiar el vehículo de un albarán pendiente mueva el
trabajo al cliente de otro vehículo. Tres commits, `65b23a2..dc53dbf`:

- `65b23a2` — segundo vehículo (`6789GHI`) para el cliente `Anna Puig Ferrer` (NIF `12345671A`)
  en `server/db/seed.js`, dato imprescindible para poder reproducir "cambiar de vehículo dentro
  del mismo cliente" (antes cada cliente del seed tenía uno solo).
- `e6ecc5b` — `client/src/pages/albarans/AlbaraForm.tsx`: en la rama de edición, el selector de
  vehículo deja de cargar `vehiclesService.list()` (todos) y pasa a resolver el `client_id` del
  vehículo actual y cargar `vehiclesService.listByClient(clientId)`. La rama de creación queda
  intacta (guardia `if (isEdit) return;`).
- `dc53dbf` — cierre administrativo: estado a `Implemented`, criterios marcados, traslado a
  `specs/implemented/`. Sin diff funcional.

La comprobación de servidor que hace el trabajo pesado (`server/routes/albarans.js:95-104`,
rechazo `409` si el vehículo nuevo es de otro cliente) **no se tocó en este spec** — ya existía
de un commit anterior (`ed61c24`, citado también en `DOC-09-IMPACTO-albara-canvi-client` 2.1.0);
el paso 1 del plan solo la confirmó por prueba manual.

## 2. Pruebas de aceptación

Los 11 criterios ya se revisaron en `DOC-05` 1.7.0 (`A-03`, commit `e0d6629`). Verificado línea a
línea contra el documento vivo, no solo contra la tabla-resumen que me despachó: los 9 `TC-nnn`
nuevos (`TC-111`–`TC-119`) existen con el módulo, prioridad y contenido que dice, `TC-055` sigue
siendo `REQ-040`/`albarans`/`Medium` y su escenario no cambió (solo se revisó `automation.reason`).

| AC-nnn | Criterio (citado del spec) | Vía de comprobación | TC-nnn |
|---|---|---|---|
| AC-001 | Cambiar el vehículo de un albarán pendiente por otro **del mismo cliente** y guardar deja el albarán sobre el vehículo nuevo, pendiente, con fecha y notas intactas | ui | `TC-055` (existente, revisado — mismo escenario) |
| AC-002 | Una petición que mueve el albarán al vehículo de otro cliente, aunque no se pueda componer desde el desplegable, se rechaza: vehículo original y motivo explicado | service | `TC-111` |
| AC-003 | Con líneas ya anotadas, cambiar de vehículo dentro del mismo cliente no toca líneas, stock ni importe | ui | `TC-112` |
| AC-004 | Un cambio simultáneo de vehículo a otro cliente **y** fecha o notas no guarda nada de los tres | service | `TC-113` |
| AC-005 | Guardar sin tocar el vehículo (o reseleccionando el mismo) funciona con normalidad, sin el rechazo nuevo | ui | `TC-114` |
| AC-006 | Sobre un albarán ya facturado, el rechazo sigue siendo el de "facturado", no el de cambio de cliente | service | `TC-115` |
| AC-007 | Aun con el selector ya filtrado (AC-010), un cambio a vehículo de otro cliente que llegue sin pasar por el formulario se rechaza igual | service | `TC-111` (misma llamada que AC-002, dos motivos de la misma comprobación) |
| AC-008 | Tras un intento rechazado de mover el albarán a otro cliente, la factura que se emita después sale al cliente original | mixed | `TC-119` (módulo Facturas) |
| AC-009 | Vehículo inexistente o no informado se rechaza por el motivo de siempre (`REQ-027`), no por el nuevo | service | `TC-116` |
| AC-010 | El selector de vehículo al editar muestra solo los del cliente actual | ui | `TC-117` |
| AC-011 | Con exactamente un vehículo, el selector lo muestra seleccionado y guardar funciona | ui | `TC-118` |

**Total: 11/11 criterios cubiertos.** Ninguno se marcó `deprecated` en `DOC-05`, y ningún `TC-nnn`
citado en la tabla de despacho resultó ser un espejismo: los nueve nuevos existen de verdad con
el contenido que promete su nombre.

## 3. Los criterios sin caso

**Ninguno.** `A-03` pasó antes que yo (commit `e0d6629`, plan a 1.7.0) y cerró los 11 sin dejar
huecos. No hay nada que añadir a `gaps` en este bloque.

## 4. Pruebas de regresión

**34 de 119 casos.** Sin `DOC-09` propio (ver `inputs`): el alcance se deriva de los 3 commits de
la implantación, 2 de ellos con diff de código (`server/db/seed.js`, `AlbaraForm.tsx`) y uno solo
administrativo (`dc53dbf`, sin efecto en el sistema).

**Impacto directo (10)** — los `TC-nnn` que `DOC-05` 1.7.0 asigna a los 11 `AC-nnn` de `SPE-06`
(tabla del apartado 2): `TC-055`, `TC-111` a `TC-119`. Entran sin discusión: son la mitad de
regresión que exige este cierre por definición.

**Vecindad (3)** — mismo componente que tocó `e6ecc5b`, `AlbaraForm.tsx`, pero en su **rama de
creación** (`isEdit === false`), que el commit no debía cambiar y por eso es exactamente donde
puede haberse filtrado un error silencioso. El propio spec lo señala como riesgo explícito
(«Riesgos identificados», fila 1: *"AlbaraForm sirve a la vez para crear y editar (...) extender
el filtro al alta, o retirarlo de la edición, no daría ningún error visible"*):

- `TC-034` — abrir un albarán nuevo eligiendo vehículo (ya entra también por `smoke`)
- `TC-035` — abrir un albarán nuevo desde la ficha del vehículo, con el vehículo preasignado
- `TC-036` — rechazar la apertura sin vehículo elegido (ejercita la misma rama de creación que
  ahora depende de la guardia `if (isEdit) return;`)
- `TC-057` — editar la cabecera de un albarán **ya facturado**: mismo componente, rama de
  edición, pero fuera del camino feliz que prueban `TC-111`–`TC-118`; el encadenado nuevo de
  `get()` → `vehiclesService.get()` → `listByClient()` se ejecuta igual al abrir el formulario,
  esté o no facturado el albarán, así que un fallo en esa cadena también lo alcanzaría

(`TC-037` cae en el mismo perímetro de creación, pero ya entra por `smoke`, así que no se cuenta
dos veces.)

**Riesgos silenciosos** — no aplica en este modo: no hay `DOC-09` propio del que extraer
`silent_risks`. El `DOC-09-IMPACTO-albara-canvi-client` existente no se usa como fuente (ver
`inputs`), así que no hay lista que contrastar.

**Smoke (21)** — todos los casos con tag `smoke` del plan entero, siempre, sea cual sea el
módulo tocado: `TC-001`, `TC-003`, `TC-006`, `TC-013`, `TC-020`, `TC-024`, `TC-034`, `TC-037`,
`TC-040`, `TC-048`, `TC-050`, `TC-060`, `TC-065`, `TC-069`, `TC-071`, `TC-074`, `TC-080`, `TC-088`,
`TC-097`, `TC-098`, `TC-105`.

**Histórico** — no aplica: no existe `docs/DOC-20-RALLY-STATE.json` en el repositorio. La
selección es teórica: no se sabe qué de esto existe ya en Rally ni si alguna vez se ha ejecutado.
Todo `last_result` del bloque estructurado va como `n/d`.

**Una anomalía de prioridad, para dejar constancia.** `DOC-07-MATRIZ.csv` (aún sin resincronizar
para `SPE-06`) sigue listando `REQ-040` como prioridad `medium`, mismo dato que llevaba con un
único caso `TC-055` (`Medium`). Desde 1.7.0, seis de los ocho `TC-nnn` nuevos que cuelgan de
`REQ-040` son `Critical` — coherente con que el origen de todo el spec es `BUG-002`, un defecto
`critical` que emitió una factura de 114.835,05 € al cliente equivocado. No corrijo `REQ-040`
—no es mío tocar `DOC-04` ni `DOC-07`— pero lo señalo porque es justo el patrón que este informe
tiene mandato de vigilar: un requisito que su ficha sigue llamando `medium` hoy se sostiene, en la
práctica, sobre pruebas `Critical`.

## 5. Lo que queda fuera y el riesgo aceptado

**85 de 119 casos quedan fuera.** El grueso es el resto de la aplicación, no tocado por ningún
commit de este cierre (`clients`, `vehicles`, `peces`, `personal`, `nomines` fuera de sus casos
`smoke`, y el resto de `factures`) — riesgo aceptado: nulo específico a este cambio, es exactamente
lo que la regla de vecindad existe para no arrastrar.

Dentro del propio módulo `albarans`, quedan fuera **19 casos** que no comparten componente ni
requisito con este spec: `TC-032`, `TC-033`, `TC-038`, `TC-039`, `TC-041` a `TC-047`, `TC-049`,
`TC-051` a `TC-054`, `TC-056`, `TC-058`, `TC-059`. Riesgo aceptado explícito sobre dos de ellos
por estar cerca del cambio sin llegar a entrar:

- **`TC-058`** (impedir borrar un albarán facturado) y **`TC-059`** (impedir añadir/retirar
  líneas en uno facturado) comparten precondición y módulo con `TC-057`, pero no pasan por
  `AlbaraForm.tsx` — son acciones de listado/detalle, no de edición de cabecera. Se acepta el
  riesgo de que una regresión en el bloqueo "ya facturado" fuera de la cabecera no se detecte
  hasta la próxima regresión completa.
- **`TC-038`/`TC-039`** (numeración automática del albarán) usan la misma rama de creación de
  `AlbaraForm.tsx` que `TC-034`–`TC-036`, pero verifican un dato (`any/A-nnnn`) que ninguno de los
  dos commits toca ni de lejos. Se acepta el riesgo de una colisión de numeración no relacionada
  con este cambio.

`TC-055` merece una mención aparte: no queda fuera —está en impacto directo—, pero su propio
`automation.reason` en `DOC-05` 1.7.0 avisa de que el selector de vehículo en edición ahora carga
por `fetch` (`listByClient`), "el mismo tipo de punto que ya produjo un flake dependiente del
orden en el desplegable de pieza (`DOC-23`)". Riesgo aceptado: si `TC-055` sale rojo en la próxima
ejecución, no descartar automáticamente que sea la app — revisar primero si es el mismo patrón de
flake ya documentado antes de abrir un `BUG-nnn`.

## 6. Cómo se ejecuta

| Caso | Vía DOC-05 | Suite | Estado hoy |
|---|---|---|---|
| `TC-055` | ui | `automation/ui/` (`@TC-055`, `albarans.feature`) | automatizado |
| `TC-034`, `TC-035`, `TC-036`, `TC-037`, `TC-057` | ui | `automation/ui/` (`@TC-034/035/036/037/057`) | automatizado |
| `TC-001`, `TC-003`, `TC-006`, `TC-013`, `TC-020`, `TC-024`, `TC-040`, `TC-048`, `TC-050`, `TC-060`, `TC-065`, `TC-069`, `TC-071`, `TC-074`, `TC-080`, `TC-088`, `TC-097`, `TC-098`, `TC-105` (smoke) | ui | `automation/ui/` | automatizado |
| `TC-112`, `TC-114`, `TC-117`, `TC-118` | ui | ninguna todavía | **manual** — no aparecen en ningún `.feature` de `automation/ui/` |
| `TC-111`, `TC-113`, `TC-115`, `TC-116` | service | ninguna todavía | **manual** — no aparecen en `automation/api/tallerMecaniccollection.json` (que hoy solo trae `TC-041`, `TC-045`, `TC-063`, `TC-064`) |
| `TC-119` | mixed | ninguna todavía | **manual** — ni la mitad de servicio ni la de pantalla están en ninguna suite |

Comandos de lo que sí está automatizado:

```bash
export JAVA_HOME="C:\Program Files\Java\jdk-21.0.9.10-hotspot"
cd automation/ui && mvn test -Dapp.url=http://localhost:5173
```

(Reseed antes: `rm -f data/taller.db && npm run seed`. Para la suite completa, servir un build de
producción — `vite preview` — en vez de `npm run dev`.)

```bash
cd automation/api && newman run tallerMecaniccollection.json -e environments/tallerMecanicEnvironmentLocal.json --reporters cli,json --reporter-json-export newman/run.json
```

**Los 9 casos nuevos de `SPE-06` (`TC-111` a `TC-119`) no están automatizados en ninguna suite.**
Es trabajo pendiente y manual mientras tanto — no lo hago yo: los `service`/`mixed`
(`TC-111`, `TC-113`, `TC-115`, `TC-116`, `TC-119`) son candidatos naturales para `S-17` /
`DOC-26`; los `ui` (`TC-112`, `TC-114`, `TC-117`, `TC-118`) para `S-10`. Quien planifique la
validación de este cierre debe contar con ejecutarlos a mano.

## 7. Bloque estructurado

```yaml pruebas-spec
version: 1
spec: SPE-06-albara-canvi-client.md
impact_source: commits
commits_analyzed: 3
acceptance:
  - criterion: "AC-001 — cambiar el vehículo dentro del mismo cliente deja el albarán sobre el vehículo nuevo, pendiente, con fecha y notas intactas"
    verification_path: ui
    covered_by: TC-055
  - criterion: "AC-002 — una petición que mueve el albarán a otro cliente, no compostable desde el desplegable, se rechaza"
    verification_path: service
    covered_by: TC-111
  - criterion: "AC-003 — cambiar de vehículo dentro del mismo cliente no toca líneas, stock ni importe"
    verification_path: ui
    covered_by: TC-112
  - criterion: "AC-004 — un cambio simultáneo de vehículo a otro cliente y fecha/notas no guarda nada de los tres"
    verification_path: service
    covered_by: TC-113
  - criterion: "AC-005 — guardar sin tocar el vehículo (o reseleccionando el mismo) funciona con normalidad"
    verification_path: ui
    covered_by: TC-114
  - criterion: "AC-006 — sobre un albarán facturado, el rechazo sigue siendo el de facturado, no el de cambio de cliente"
    verification_path: service
    covered_by: TC-115
  - criterion: "AC-007 — con el selector ya filtrado, un cambio a otro cliente sin pasar por el formulario se rechaza igual"
    verification_path: service
    covered_by: TC-111
  - criterion: "AC-008 — tras un intento rechazado, la factura que se emita después sale al cliente original"
    verification_path: mixed
    covered_by: TC-119
  - criterion: "AC-009 — vehículo inexistente o no informado se rechaza por el motivo de siempre (REQ-027)"
    verification_path: service
    covered_by: TC-116
  - criterion: "AC-010 — el selector de vehículo al editar muestra solo los del cliente actual"
    verification_path: ui
    covered_by: TC-117
  - criterion: "AC-011 — con exactamente un vehículo, el selector lo muestra seleccionado y guardar funciona"
    verification_path: ui
    covered_by: TC-118
regression:
  selected:
    - id: TC-055
      module: albarans
      priority: Medium
      reason: impacto_directo
      automated: ui
      last_result: n/d
    - id: TC-111
      module: albarans
      priority: Critical
      reason: impacto_directo
      automated: service
      last_result: n/d
    - id: TC-112
      module: albarans
      priority: Critical
      reason: impacto_directo
      automated: no
      last_result: n/d
    - id: TC-113
      module: albarans
      priority: Critical
      reason: impacto_directo
      automated: service
      last_result: n/d
    - id: TC-114
      module: albarans
      priority: Medium
      reason: impacto_directo
      automated: no
      last_result: n/d
    - id: TC-115
      module: albarans
      priority: Critical
      reason: impacto_directo
      automated: service
      last_result: n/d
    - id: TC-116
      module: albarans
      priority: Critical
      reason: impacto_directo
      automated: service
      last_result: n/d
    - id: TC-117
      module: albarans
      priority: High
      reason: impacto_directo
      automated: no
      last_result: n/d
    - id: TC-118
      module: albarans
      priority: Medium
      reason: impacto_directo
      automated: no
      last_result: n/d
    - id: TC-119
      module: factures
      priority: Critical
      reason: impacto_directo
      automated: no
      last_result: n/d
    - id: TC-035
      module: albarans
      priority: Medium
      reason: vecindad
      automated: ui
      last_result: n/d
    - id: TC-036
      module: albarans
      priority: Critical
      reason: vecindad
      automated: ui
      last_result: n/d
    - id: TC-057
      module: albarans
      priority: Critical
      reason: vecindad
      automated: ui
      last_result: n/d
    - id: TC-001
      module: clients
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-003
      module: clients
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-006
      module: clients
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-013
      module: vehicles
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-020
      module: vehicles
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-024
      module: peces
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-034
      module: albarans
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-037
      module: albarans
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-040
      module: albarans
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-048
      module: albarans
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-050
      module: albarans
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-060
      module: factures
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-065
      module: factures
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-069
      module: factures
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-071
      module: factures
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-074
      module: factures
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-080
      module: personal
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-088
      module: nomines
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-097
      module: nomines
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-098
      module: nomines
      priority: Critical
      reason: smoke
      automated: ui
      last_result: n/d
    - id: TC-105
      module: shell
      priority: High
      reason: smoke
      automated: ui
      last_result: n/d
  excluded_summary:
    total: 85
    accepted_risk: >-
      Se asume que ningún commit de este cierre (seed de datos + filtro del selector en
      AlbaraForm.tsx) alcanza a los 19 casos restantes del propio módulo albarans (numeración,
      líneas, borrado, bloqueos de facturado fuera de cabecera) ni a ningún módulo no tocado
      (clients, vehicles, peces, personal, nomines salvo su smoke, y el resto de factures). Sin
      DOC-20, no se sabe además si TC-111 a TC-119 ya existen en Rally.
gaps: []
totals:
  acceptance: { total: 11, covered: 11, uncovered: 0 }
  regression: { selected: 34, of: 119, by_priority: { Critical: 21, High: 9, Medium: 4, Low: 0 } }
```
