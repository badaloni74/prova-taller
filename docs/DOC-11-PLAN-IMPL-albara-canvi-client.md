---
doc_id: DOC-11
doc_name: DOC-11-PLAN-IMPL-albara-canvi-client
version: 1.0.0
status: draft
generator: S-04 plan de implementación
generated_at: 2026-08-23T17:30:00+00:00
language: es
project: app-taller
evolutivo_id: EVO-001
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: worktree-agent-a925686b208a430f2
  commit_sha: b325248946c22fd06c9d1afdac65c56560a2b8bf
  working_tree_clean: true
inputs:
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 2.0.2
    hash: sha256:25a8475707e073adf5ab6bd681cb01131118843ecc78f454a60381bf66f17f41
    present: true
    usage: >-
      bloque `impacto` completo: componentes afectados (§2.4), requisitos afectados (§3),
      modelo de datos y fixtures que faltan (§4), riesgos silenciosos RS-01 a RS-06 (§5).
      Usado para decidir qué se toca, en qué orden y qué se deja como está
  - id: DOC-02-TECNICA.md
    from: S-01
    version: 1.1.0
    hash: sha256:32639b3f515f4780fdaf962513f02abf6f01fa2854b2418c2ef1f2ef864a44ca
    present: true
    usage: >-
      bloque `graph`: identificadores de componente citados en este plan (albarans-router,
      albarans-pages, vehicles-router, vehicles-service, db-seed, shared-components,
      factures-router) y sus rutas de fichero
  - id: specs/06-albara-canvi-client.md
    from: /spec
    spec_status: Approved
    hash: sha256:4bce9eca9fab0fa0a5ebfccf5b2a109a986a56257917fbc27908f8d11dec126a
    present: true
    usage: >-
      los once criterios de aceptación (AC-001 a AC-011) de la sección «Criterios de
      aceptación», y las precondiciones de datos que exigen (DP-001 a DP-003, citadas en la
      subsección «Datos que exigen los criterios»). El fichero migrado no reproduce el bloque
      `yaml evolutivo` de `DOC-08` (retirado); ese bloque se ha leído igualmente como registro
      histórico conservado — sección 7 de `docs/DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md`,
      versión 2.2.0 — para contrastar `affects_requirements`, `contradicts` y el detalle de
      `DP-001`/`DP-002`/`DP-003` que `specs/06` resume en prosa
  - id: codigo-fuente
    from: repositorio
    version: b325248
    hash: git:b325248946c22fd06c9d1afdac65c56560a2b8bf
    present: true
    usage: >-
      server/routes/albarans.js, server/routes/vehicles.js, server/db/seed.js,
      client/src/pages/albarans/AlbaraForm.tsx, client/src/pages/albarans/AlbaraDetail.tsx,
      client/src/services/vehicles.ts, client/src/components/EntityForm.tsx
finding: >-
  Lectura directa del código (obligatoria por contrato de S-04) descubre que la premisa
  central de `DOC-09` — que `albarans-router` «gana una comprobación entre las líneas 90-95» —
  ya no es cierta sobre el código de este worktree. El commit `ed61c24` («Fix stock/client-
  mismatch bugs, add UI test automation and doc pipeline output») ya añadió esa comprobación
  a `server/routes/albarans.js:90-104`, cerrando BUG-002 por el lado del servidor. `DOC-09`
  fue escrito describiendo el estado de `albarans-router` antes de ese commit, o sin haberlo
  visto; en cualquier caso, el código real manda sobre el análisis de impacto cuando ambos
  discrepan (contrato de esta skill: «El código del repositorio, obligatoria»). El plan de
  este documento se ha reescrito en consecuencia: el paso 1 no añade código, lo confirma.
---

# DOC-11 · Plan de implementación — `EVO-001` · Un albarán no puede cambiar de cliente

> Convierte el análisis de impacto en una secuencia de pasos que alguien puede seguir. No
> decide qué hacer —eso ya está decidido en `specs/06`, `Approved`— sino en qué orden hacerlo
> para que en cada punto el sistema siga en pie.

---

## 1. Resumen

**Tres pasos, sin punto de no retorno.** El alcance real de este plan es menor de lo que
`DOC-09` hacía prever, porque **la mitad del trabajo que describía ya está hecha**: la
comprobación de servidor que impide mover un albarán al vehículo de otro cliente
(`server/routes/albarans.js:90-104`) ya existe en el código de este worktree. Es el cierre de
`BUG-002` por el lado que protege el dinero, y ya cubre, sin escribir una línea más, siete de
los once criterios de aceptación (`AC-002`, `AC-004`, `AC-005`, `AC-006`, `AC-007` en su mitad
de servicio, `AC-008`, `AC-009`).

Lo que de verdad falta construir es **el filtro del desplegable de vehículo** en la edición de
la cabecera del albarán (`AC-010`, `AC-011`) — hoy `AlbaraForm.tsx` carga siempre la lista
completa de vehículos, de cualquier cliente. Y antes de poder darlo por comprobado hace falta
**ampliar los datos de ejemplo**: hoy ningún cliente tiene más de un vehículo, así que ni
`AC-001` ni `AC-010` se pueden reproducir (`DOC-09` §4.3).

1. **Verificar y dejar constancia de que la regla de servidor ya está implementada** — sin
   tocar código.
2. **Ampliar `server/db/seed.js`** para que exista `DP-001`: un cliente con al menos dos
   vehículos, uno de ellos con un albarán pendiente.
3. **Filtrar el selector de vehículo en `AlbaraForm.tsx`** cuando se edita un albarán
   existente, dejando intacta la creación (fuera de alcance por `specs/06`).

**`point_of_no_return: null`.** Ningún paso es destructivo: el paso 1 no cambia nada, el paso
2 se deshace con `rm data/taller.db && npm run seed`, y el paso 3 es un cambio de cliente
revertible con `git revert`. No hay migración de esquema (`DOC-09` §4.1,
`migration_required: false`) ni contrato de API publicado que cambie de forma.

---

## 2. Precondiciones

- `specs/06-albara-canvi-client.md` en estado `Approved` — lo está.
- Worktree sincronizado con `master` — hecho (`git merge --ff-only master`, fast-forward
  `0c7ca37..b325248`).
- Tras el paso 2, la base de datos debe resembrarse (`rm -f data/taller.db && npm run seed`)
  antes de comprobar cualquier criterio que dependa de `DP-001`; los pasos 1 y 3 no dependen de
  esto salvo en su propia verificación final.

---

## 3. Los pasos

### Paso 1 — Confirmar que la comprobación de servidor ya existe

**Qué se hace.** No se escribe código. Se confirma, leyendo y ejerciendo el endpoint, que
`PUT /api/albarans/:id` ya rechaza el cambio de vehículo cuando el vehículo nuevo pertenece a
un cliente distinto del actual, y que lo hace **en el orden correcto** — después de comprobar
que el albarán existe (404) y que no está facturado (409), y después de comprobar que el
`vehicle_id` viene informado y existe (400) — de modo que un vehículo inexistente sigue dando
el motivo de siempre y no el nuevo.

**Ficheros (solo lectura, sin modificar).**
- `server/routes/albarans.js:76-104` — el `PUT` completo. La comprobación de cliente vive en
  las líneas 95-104: lee `client_id` del vehículo nuevo (línea 90) y del vehículo actual
  (líneas 96-98), y si difieren responde `409` con
  `'No es pot canviar el vehicle a un que pertany a un altre client'`.

**Cómo se verifica.** Reproducir exactamente los pasos de `DOC-24/BUG-002` contra el servidor
en marcha (`npm run dev`, o `curl`/Postman directo a `localhost:3001`) usando dos clientes
existentes en el seed de hoy (no hace falta esperar al paso 2):
1. `PUT /api/albarans/:id` con el `vehicle_id` de un vehículo de **otro** cliente → debe
   devolver `409`, no `200`. Con el código de hoy, ya lo hace.
2. El mismo albarán, releído después, sigue sobre su vehículo original.
3. `PUT` con vehículo inexistente → sigue devolviendo `400` con el motivo de «el vehicle
   indicat no existeix», no el `409` de cambio de cliente (orden correcto, `AC-009`).
4. `PUT` sobre un albarán ya facturado → sigue devolviendo `409` con «L'albarà ja està
   facturat...», no el mensaje nuevo (`AC-006`).
5. `PUT` que cambia vehículo a otro cliente y a la vez `data`/`notes` en la misma llamada →
   nada se guarda: ni vehículo, ni fecha, ni notas (`AC-004`); se cumple hoy porque el guardado
   es un único `UPDATE` sin transacción (`server/routes/albarans.js:106-110`) — es accidental,
   no diseñado, tal como advierte `DOC-09` RS-05: si el guardado deja de ser una sola sentencia,
   este criterio puede romperse sin que ningún caso de pantalla lo note.
6. Tras un intento rechazado, emitir la factura de ese albarán y confirmar que sale al cliente
   original (`AC-008`) — usa el flujo de facturación existente, sin cambios.

**Reversible.** Trivialmente: no se modifica nada.

**Implementa.** `AC-002`, `AC-004`, `AC-005`, `AC-006`, `AC-008`, `AC-009` completos; la mitad
de servicio de `AC-007` (la mitad de pantalla se cierra en el paso 3).

---

### Paso 2 — Ampliar los datos de ejemplo (`DP-001`)

**Por qué antes que el paso 3, invirtiendo el orden por defecto.** El orden habitual deja los
datos de ejemplo al final (`§ Cómo ordenas los pasos` de esta skill). Aquí se invierte con
motivo escrito: el paso 3 (filtrar el desplegable) no se puede verificar por sí solo —sin
depender de un paso posterior— si antes no existe un cliente con más de un vehículo. Generar
ese dato primero es lo que permite que el paso 3 cumpla la regla de que cada paso lleva su
propia verificación.

**Qué se hace.** `server/db/seed.js` da hoy un vehículo por cliente (`DOC-09` §4.3): de los
doce clientes del seed, seis (los «SL») no tienen ningún vehículo y los otros seis (personas
físicas) tienen exactamente uno. Se añade **un segundo vehículo** para uno de los clientes que
ya tiene uno **y** cuyo vehículo ya arrastra un albarán pendiente, para no tener que crear
también el albarán: `Anna Puig Ferrer` (`nif: '12345671A'`), cuyo vehículo (`vehicleIds[0]`,
matrícula `1234ABC`) es el que abre el primer albarán del seed (`addAlbara(vehicleIds[0],
'Revisió periòdica', ...)`, línea 144) — pendiente de facturar, sin tocar.

- `server/db/seed.js:33-40` (array `vehicles`) — añadir una entrada con
  `clientNif: '12345671A'` (mismo NIF que la primera fila, otro vehículo, otra matrícula).
- `server/db/seed.js:110-122` (`vehicleIds = vehicles.map(...)`) — no cambia de forma, el
  nuevo vehículo entra automáticamente en el array por estar en la lista de origen.

**Qué no hace falta tocar para que los otros dos `DP` se cumplan.** `DP-002` (vehículos de un
cliente distinto, existentes a la vez) ya se da hoy con cualquiera de los otros cinco clientes
con un vehículo. `DP-003` (un cliente con exactamente un vehículo) ya se da hoy con cualquiera
de los cinco clientes que no se toca en este paso. Ninguno de los dos exige cambios.

**Cómo se verifica.**
1. `rm -f data/taller.db && npm run seed`.
2. `SELECT client_id, COUNT(*) FROM vehicles GROUP BY client_id HAVING COUNT(*) > 1;` devuelve
   exactamente una fila (el cliente de Anna Puig Ferrer).
3. El albarán ya existente sobre el vehículo original de ese cliente sigue `pendent` y con sus
   líneas intactas (el seed no las toca).
4. `GET /api/vehicles?client_id=<id de Anna Puig Ferrer>` devuelve los dos vehículos.

**Reversible.** Sí — `rm -f data/taller.db && npm run seed` vuelve al estado anterior si se
revierte el cambio en el fichero.

**Implementa.** `AC-001` y `AC-003` — el comportamiento que comprueban ya existe (paso 1 y el
código sin tocar de las líneas de albarán), lo único que faltaba para poder afirmarlos era este
dato.

---

### Paso 3 — Filtrar el selector de vehículo al editar un albarán

**Qué se hace.** `AlbaraForm.tsx` sirve a la vez para crear (`isEdit === false`) y editar
(`isEdit === true`) — `DOC-09` RS-03 avisa explícitamente de no unificar las dos ramas. Hoy
carga siempre la lista completa (`client/src/pages/albarans/AlbaraForm.tsx:35-37`,
`vehiclesService.list().then(setVehicles)`), sin distinguir entre las dos.

Cambio a introducir, solo en la rama de edición:
- **Creación (`isEdit === false`): no cambia.** Sigue llamando a `vehiclesService.list()` sin
  filtrar — no hay cliente del que mover el trabajo (`specs/06`, fuera de alcance §1).
- **Edición (`isEdit === true`):** antes de poblar `vehicles`, resolver el `client_id` del
  vehículo actual del albarán y pedir solo los vehículos de ese cliente. El patrón ya existe en
  el propio módulo — `client/src/pages/albarans/AlbaraDetail.tsx:32-42` encadena
  `albaransService.get(id)` → `vehiclesService.get(albara.vehicleId)` → lee `vehicle.clientId`.
  `AlbaraForm.tsx` ya hace el primer salto (`albaransService.get(Number(id))`, líneas 44-51);
  falta añadir el segundo (`vehiclesService.get(albara.vehicleId)`) y sustituir la llamada a
  `vehiclesService.list()` por `vehiclesService.listByClient(vehicle.clientId)` — que ya existe
  en `client/src/services/vehicles.ts:6` y ya la usa `vehicles-router`
  (`server/routes/vehicles.js:6-14`, `GET /api/vehicles?client_id=`) sin cambios.

**Ficheros.**
- `client/src/pages/albarans/AlbaraForm.tsx:35-37` (efecto que hoy carga todos los vehículos,
  sin condicionar a `isEdit`) y `:39-52` (efecto que carga el albarán en edición) — se
  reorganiza la carga de vehículos para que dependa de `isEdit`, como se describe arriba.
- No se toca `client/src/services/vehicles.ts` (`listByClient` ya existe), ni
  `server/routes/vehicles.js` (el filtro por `client_id` ya existe), ni
  `client/src/components/EntityForm.tsx` (el `<select>` ya es controlado y ya renderiza una
  opción vacía inicial sin que interfiera cuando `value` coincide con una opción — la mitad de
  `AC-011` que `DOC-09` da por resuelta de antemano).

**Cómo se verifica.**
1. Con los datos del paso 2: abrir en edición el albarán pendiente de Anna Puig Ferrer →
   el desplegable muestra **sus dos** vehículos y **ninguno** de otro cliente (`AC-010`).
2. Abrir en edición un albarán de un cliente con un solo vehículo (cualquiera de los otros
   cinco) → el desplegable lo muestra ya seleccionado, no vacío, y guardar sin tocarlo funciona
   con normalidad (`AC-011`).
3. Repetir el intento de `AC-002`/`AC-007` ahora **desde el formulario**: el vehículo del otro
   cliente ya no aparece en las opciones — confirma que el filtro está activo y que, aun así,
   el paso 1 sigue siendo la protección real (`AC-007` completo).
4. Abrir el formulario de **creación** (`/albarans/new` o `?vehicleId=`) y comprobar que sigue
   ofreciendo la lista completa de vehículos, sin filtrar — cierra el riesgo de RS-03 en la
   dirección que rompería algo sin dar error (unificar el filtro también en el alta).

**Reversible.** Sí — cambio de cliente, sin migración ni endpoint publicado de por medio.

**Implementa.** `AC-010`, `AC-011`; cierra la mitad de pantalla de `AC-007`.

---

## 4. Cobertura de criterios

| AC | Qué comprueba | Paso |
|---|---|---|
| AC-001 | Corregir el vehículo dentro del mismo cliente | 2 |
| AC-002 | El rechazo al guardar existe aunque el desplegable filtre | 1 |
| AC-003 | Las líneas no se tocan al corregir dentro del mismo cliente | 2 |
| AC-004 | El rechazo no deja el albarán a medias | 1 |
| AC-005 | Guardar sin tocar el vehículo no cambia | 1 |
| AC-006 | Sobre un albarán facturado no cambia nada | 1 |
| AC-007 | El filtro de pantalla no es la protección | 1 (servicio) + 3 (pantalla) |
| AC-008 | La factura acaba en el cliente correcto | 1 |
| AC-009 | El vehículo inexistente sigue teniendo su propio motivo | 1 |
| AC-010 | El desplegable solo ofrece vehículos del cliente del albarán | 3 |
| AC-011 | Un cliente con un solo vehículo no se queda sin opción | 3 |

Los once criterios de `specs/06` quedan cubiertos.

---

## 5. Lo que no se toca

| Componente (`DOC-02`) | Motivo |
|---|---|
| `vehicles-router` (`server/routes/vehicles.js`) | El filtro `GET /api/vehicles?client_id=` ya existe (líneas 6-14) y ya lo usa `AlbaraDetail`. Nada que añadir para este evolutivo |
| `vehicles-service` (`client/src/services/vehicles.ts`) | `listByClient()` ya existe (línea 6); el paso 3 lo reutiliza tal cual |
| `albarans-service` (`client/src/services/albarans.ts`) | `update()` no cambia de firma; el `PUT` que envía no cambia de forma |
| `factures-router` (`server/routes/factures.js`) | `DOC-09` RS-02 documenta que su garantía cambia de significado sin que ninguna línea suya se toque, como consecuencia del paso 1 (ya hecho antes de este plan). No hay nada que este plan deba modificar ahí |
| `shared-components` / `EntityForm` (`client/src/components`) | Compartido por los siete módulos (radio de explosión si se toca). El `<select>` controlado ya resuelve la mitad de `AC-011` sin cambios — `DOC-09` lo señala explícitamente para no tocarlo |
| `db-connection`, `server-app`, `db-numbering`, `db-migrate` | Sin migración ni cambio de esquema (`DOC-09` §4.1, `migration_required: false`) |
| `api-client`, `i18n` | El mensaje de rechazo (ya existente) sigue en catalán fijo independientemente del idioma de la interfaz — decidido-por-omisión en el histórico de `DOC-08` §6.1, no bloquea ningún criterio (`DOC-09` RS-06) |
| `vehicles-router` — la puerta de `PD-002` (`server/routes/vehicles.js:65-112`, cambio de propietario de un vehículo) | Fuera de alcance explícito de `specs/06`; `PD-002` sigue abierta y sin dueño de decisión en este evolutivo |

---

## 6. Documentación a regenerar al terminar

`DOC-04-FUNCIONAL.md` (enunciado de `REQ-040`, cierre de `Q-10`, pregunta nueva por `PD-002`),
`DOC-05-PLAN-PRUEBAS.md` (enunciado de `TC-055`, casos del lado negativo por servicio),
`DOC-06-MANUAL-USUARIO.md` (tarea A.13, §6.1, §6.2), `DOC-07-TRAZABILIDAD.md` y
`DOC-07-MATRIZ.csv` (filas de `REQ-040`/`REQ-046`), y `DOC-02-TECNICA.md` (las tres aristas del
grafo que `DOC-09` §2.3 encontró ausentes, independientes de este evolutivo). Ninguno se toca
en este documento — los regenera quien los tiene asignados (tabla de `CLAUDE.md`).

---

```yaml plan
version: 1
evolutivo: EVO-001
point_of_no_return: null
steps:
  - id: 1
    title: Confirmar que la comprobación de servidor ya existe (sin escribir código)
    files: [server/routes/albarans.js]
    component: albarans-router
    verification: >-
      reproducir DOC-24/BUG-002 contra el servidor en marcha con dos clientes existentes en el
      seed de hoy: PUT a vehiculo de otro cliente devuelve 409 y el albaran no se mueve; PUT con
      vehicle_id inexistente sigue devolviendo 400 con el motivo de siempre; PUT sobre albaran
      facturado sigue devolviendo 409 con el mensaje de siempre; PUT que cambia vehiculo de
      cliente y data/notes a la vez no guarda nada; una factura posterior sale al cliente original
    reversible: true
    implements: [AC-002, AC-004, AC-005, AC-006, AC-008, AC-009]
  - id: 2
    title: Ampliar server/db/seed.js con un segundo vehiculo para un cliente existente (DP-001)
    files: [server/db/seed.js]
    component: db-seed
    verification: >-
      rm -f data/taller.db && npm run seed; SELECT client_id, COUNT(*) FROM vehicles GROUP BY
      client_id HAVING COUNT(*) > 1 devuelve exactamente una fila; el albaran pendent original
      de ese cliente sigue intacto; GET /api/vehicles?client_id=<id> devuelve los dos vehicles
    reversible: true
    implements: [AC-001, AC-003]
  - id: 3
    title: Filtrar el selector de vehiculo de AlbaraForm.tsx al editar, sin tocar la creacion
    files: [client/src/pages/albarans/AlbaraForm.tsx]
    component: albarans-pages
    verification: >-
      en edicion, el desplegable del cliente con dos vehiculos (paso 2) muestra los dos y
      ninguno de otro cliente (AC-010); en edicion, el cliente con un solo vehiculo lo muestra
      ya seleccionado y guarda con normalidad (AC-011); el vehiculo de otro cliente ya no es
      seleccionable desde el formulario (cierra AC-007 por el lado de pantalla); el formulario
      de creacion sigue ofreciendo la lista completa sin filtrar (cierra RS-03)
    reversible: true
    implements: [AC-007, AC-010, AC-011]
untouched:
  - component: vehicles-router
    reason: GET /api/vehicles?client_id= ya existe y ya filtra (vehicles.js:6-14)
  - component: vehicles-service
    reason: listByClient() ya existe (vehicles.ts:6), el paso 3 lo reutiliza sin cambios
  - component: albarans-service
    reason: update() no cambia de firma
  - component: factures-router
    reason: >-
      su garantia cambia de significado (DOC-09 RS-02) sin que este plan deba tocar ni una linea
      suya; es consecuencia del paso 1, que ya estaba hecho antes de este plan
  - component: shared-components
    reason: >-
      compartido por los siete modulos; el select controlado ya resuelve la mitad de AC-011 sin
      cambios (DOC-09 lo senala explicitamente para no tocarlo)
  - component: db-connection
    reason: sin migracion ni cambio de esquema (DOC-09 4.1, migration_required false)
  - component: server-app
    reason: solo monta routers, no cambia
  - component: db-numbering
    reason: solo interviene en la creacion de albaranes (POST), fuera de alcance
  - component: db-migrate
    reason: sin migracion
  - component: api-client
    reason: el mensaje de rechazo ya existente sigue viajando tal cual, sin cambio de forma
  - component: i18n
    reason: >-
      el mensaje de rechazo sigue en catalan fijo independientemente del idioma, decidido por
      omision (DOC-09 RS-06), no bloquea ningun criterio
docs_to_regenerate: [DOC-02, DOC-04, DOC-05, DOC-06, DOC-07]
```
