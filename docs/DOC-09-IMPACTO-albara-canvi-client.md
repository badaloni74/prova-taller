---
doc_id: DOC-09
doc_name: DOC-09-IMPACTO-albara-canvi-client
version: 2.1.0
status: draft
generator: A-07 análisis de impacto
generated_at: 2026-08-24T14:40:00+02:00
resync_note: >-
  Revisión MINOR (2.0.4 -> 2.1.0) disparada por S-16 · Cascada de obsolescencia: DOC-07 pasó de
  1.9.1 a 1.10.0 al nacer DOC-27-INFORME-API 1.0.0. A diferencia de los tres resellos anteriores,
  esta vez sí hay cambio de contenido, y no viene de la matriz. Comprobadas una a una las cuatro
  citas propias a DOC-07 —la nota de método del apartado 3, «lo que sí falta» de 3.1, la fila de
  A-05 en 3.5 y el bloque `coverage_note`—: las cuatro siguen siendo ciertas, porque
  `DOC-07-MATRIZ.csv` volvió a salir byte a byte idéntica (md5 087a0377…, octava vez consecutiva)
  y su hash declarado en este bloque no se ha movido; la fila de REQ-040 sigue teniendo un solo
  caso y diagnóstico `Correcto`. Lo que ha dejado de ser cierto apareció al verificarlas: el
  cuerpo seguía hablando de DOC-05 1.5.0 —109 casos `ui` y uno solo `service`— mientras el bloque
  `inputs` ya declaraba la 1.6.0, que reclasificó TC-045, TC-063 y TC-064 a
  `verification_path: service`. Eso invalidaba el núcleo del «riesgo mayor» del apartado 1 y de
  RS-01 («TC-064 declara vía ui y nadie lo ha notado»): el precedente que este documento citaba
  como vivo está cerrado (A-05-11a en DOC-07 §3.11, la reclasificación en DOC-05 1.6.0 y la
  ejecución real en DOC-27, TCS008/TCS009/TCS010 en verde). Corregidos los apartados 1, 3, 3.1,
  3.2, 3.3, 3.5, 4.1, 4.2, RS-01, RS-04, el bloque `coverage_note`, el `test_cases_path` de
  REQ-046 y el motivo de `effort_signal`, que se mantiene en `medium` por razones distintas de
  las de 2.0.x. A-05-15 —borrar un albarán no devuelve el estoc de sus líneas de pieza,
  verificado aquí en server/routes/albarans.js:116-132 frente a 197-224— sí obliga a añadir
  análisis: nace RS-07, porque EVO-001 convierte «borrar y rehacer» (REQ-041, PD-003) en la única
  salida del usuario que ya se equivocó y ese camino pierde existencias sin dar ningún error.
  Se añade además una nota de estado del código: la mitad de servidor de EVO-001 ya está en el
  tronco desde ed61c24 y la mitad de cliente no; el cuerpo no se reescribe a pasado porque eso es
  una regeneración completa y decidir si SPE-06 se da por implementado no es de A-07. Revisado
  todo el bloque `inputs`, versión a versión y hash a hash: tres entradas llevaban un hash
  desfasado sin cambio de versión (DOC-08, DOC-02 y DOC-05, las tres por resellos o correcciones
  de rutas en el documento de origen, verificado en los diffs que no tocan nada que este
  documento cite) y se corrigen; se añaden dos entradas que faltaban, specs/SPE-06 —la versión
  viva de la especificación desde la migración, declarada con `spec_status` porque los specs no
  llevan semver— y DOC-27, del que esta revisión cita contenido. Sigue sin existir
  DOC-09-IMPACTO-albara-canvi-client-HIST.md y esta revisión tampoco lo crea: la procedencia de
  las revisiones de este documento vive en este campo.
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: b5284b4154b70fa856795e6a92f7aa67d32bec15
  working_tree_clean: true   # sin cambios sobre ficheros versionados; sin versionar (ajeno a este documento): ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/, promptDashboard.txt
inputs:
  - id: specs/SPE-06-albara-canvi-client.md
    from: /spec
    spec_status: Approved
    hash: sha256:77f25aab1096407fdba0fd9e360dcd414d1f27b70a8b7194aa76c42ba7f6eac8
    present: true
  - id: DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md
    from: A-06
    version: 2.2.0
    hash: sha256:b7f9d9e851dc610c33e3d1149b1ca4ef89f28933aed2382c47cb45b38cafa523
    present: true
  - id: DOC-02-TECNICA.md
    from: S-01
    version: 1.1.0
    hash: sha256:5a4fce68251cc84977b15f363c63e850f85caa737b89fea8cf2e4f3ef83b8304
    present: true
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.2.0
    hash: sha256:626fdb84957ca198001aa3cba40572bf2632d0e9ea1e75136e61c217f2f042e3
    present: true
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:43051f32f13c32da7350e79d3fb92503c695618375cbae82b4950abb734b2688
    present: true
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    version: 1.10.0
    hash: sha256:f3eb60be92de53c46245bb92637446551d102333761576119d85f9a84f9c5a86
    present: true
  - id: DOC-07-MATRIZ.csv
    from: A-05
    version: 1.7.0
    hash: sha256:1676546ad1473a6401ab8aaa6010e246f2f4b2ef4693da37c75c305ec540efb3
    present: true
  - id: DOC-14-EXPLORATORIO.md
    from: A-10
    version: 2.1.0
    hash: sha256:f1449e133c2eacf224467c55c01d9bcc4fb6bee9443d239fd27867ae1cd5b7ee
    present: true
  - id: DOC-23-INFORME.md
    from: S-10
    version: 2.2.0
    hash: sha256:33ac58bcf4188dddccce71aa88bd2f4174af74c1c291032f302ec68fddd84c47
    present: true
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
  - id: DOC-27-INFORME-API.md
    from: S-17
    version: 1.0.0
    hash: sha256:178d4b14e0202ec9f8846b661f1dda465e552cb6d3aa5f563e19d9b9c5b82573
    present: true
  - id: codigo-fuente
    from: repositorio
    version: b5284b4
    hash: git:b5284b4154b70fa856795e6a92f7aa67d32bec15
    present: true
  - id: DOC-03-API.md
    from: S-03
    present: false
  - id: DOC-21-GRAPH.json
    from: S-08
    present: false
  - id: contexto-confluence
    from: I-02
    present: false
---

> **Nota de migración (2026-08-23).** La especificación que este documento analiza vivía en
> `docs/DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md` (formato retirado); ahora es
> `specs/SPE-06-albara-canvi-client.md`. El contenido no cambió en la migración, así que este
> análisis sigue siendo válido sin regenerar.

> **Nota de estado del código (2026-08-24, revisión 2.1.0).** Verificado en `HEAD` mientras se
> comprobaban las citas de esta revisión: **la mitad de servidor de `EVO-001` ya está en el
> tronco.** `server/routes/albarans.js:95-104` compara el `client_id` del vehículo actual con el
> del propuesto y responde `409 · «No es pot canviar el vehicle a un que pertany a un altre
> client»`; la línea 90 ya lee `SELECT id, client_id FROM vehicles`. Entró en el commit
> `ed61c24` (2026-08-21, «Fix stock/client-mismatch bugs»), **fuera del flujo `/spec` →
> `/spec-impl`** —cosa que el propio `specs/subidas.log` reconoce en su cabecera: «hay al menos
> uno: `ed61c24`, anterior a la adopción de este registro»—. **La mitad de cliente no está**:
> `AlbaraForm.tsx:35` sigue cargando `vehiclesService.list()` —todos los vehículos— y el
> desplegable no filtra, así que AC-010 y AC-011 siguen pendientes. `specs/SPE-06` sigue en
> estado `Approved` y no en `specs/implemented/`, y `DOC-24/BUG-002` sigue declarado abierto.
>
> **Esta revisión no reescribe el cuerpo a pasado.** Los apartados 1 a 7 siguen redactados como
> análisis previo a la implantación, que es lo que eran. Convertirlos en un análisis
> post-implantación es una regeneración completa de A-07, no una resincronización, y antes hace
> falta una decisión que **no es de A-07**: si `SPE-06` se da por implementado en parte, si se
> reabre para completar la mitad de cliente, o si el arreglo de `ed61c24` se considera una
> corrección de `BUG-002` independiente del spec. Quien lea lo que sigue debe leerlo con esta
> nota delante: donde dice que `albarans-router` «gana una comprobación», esa comprobación ya
> está escrita y es literalmente la que el apartado describe.

# DOC-09 · Análisis de impacto — `EVO-001` · Un albarán no puede cambiar de cliente

> Qué se rompe si cambiamos esto. Este documento **no estima** (eso es A-08),
> **no decide si el cambio se hace**, **no diseña la solución** (eso es S-04) y
> **no toca DOC-04 ni DOC-05**: señala lo que quedará desactualizado y quién lo actualiza.

---

## 1. Resumen ejecutivo

**Qué se toca.** Dos componentes, uno por capa: `albarans-router`
(`server/routes/albarans.js`, el `PUT /:id` de las líneas 76-103) y `albarans-pages`
(`client/src/pages/albarans/AlbaraForm.tsx`, el selector de vehículo). Nada más se
modifica. El resto del alcance —doce componentes— es revisión, no cambio.

**Qué se rompe.** Nada deja de compilar: el servidor es JavaScript sin tipos y el cuerpo
de la petición `PUT /api/albarans/:id` no cambia de forma. Lo que se rompe es
**documental y de comportamiento aceptado**: `REQ-040` deja de ser cierto tal como está
escrito, la tarea A.13 de `DOC-06` («Cuidado con cambiar el vehículo») pasa a describir un
riesgo que ya no existe, y `TC-055` queda apuntando a un requisito reformulado. Lo que
devolvía `200` para un vehículo de otro cliente pasa a rechazarse: eso es exactamente lo
que se pide, y es la única rotura funcional buscada. *(En `HEAD` esa mitad ya está hecha: el
`PUT` responde `409`. Ver la nota de estado del código, al principio.)*

**Cuál es el riesgo mayor.** La regla queda implementada **dos veces en dos componentes
distintos** —el filtro del desplegable en `albarans-pages` y la comprobación al guardar en
`albarans-router`—, y **el proyecto ya tuvo ese patrón funcionando mal en el módulo vecino**:
`REQ-046` se comprueba en `factures-router` y su único caso de prueba, `TC-064`, declaraba
`verification_path: ui` cuando el formulario de emisión hace imposible componer ese intento
desde la pantalla. Es decir: la divergencia que A-06 anticipó como riesgo futuro **ya ocurrió
una vez en este mismo repositorio**, con un caso de prioridad `Critical` que creía cubrir una
comprobación que no podía alcanzar, y **no lo detectó ninguna ejecución: lo detectó A-05
leyendo el código** (`A-05-11a`). Ese precedente está **cerrado** desde el 2026-08-24 —`DOC-05`
1.6.0 reclasificó `TC-064` a `service` y `DOC-27` 1.0.0 lo ejecutó de verdad contra el
servicio: `TCS008` recibe el `400`, `TCS009` y `TCS010` comprueban que no se movió nada—, y su
cierre deja dos hechos que cambian este análisis en vez de anularlo: la divergencia **ocurrió**
y tardó en verse, y **ya existe la herramienta con la que se ve** (`automation/api/`, con
informe propio). Ver apartado 5.

**Dos cosas más que A-08 necesita saber antes de estimar.** Primera: seis de los once
criterios exigen la vía de servicio, y ahí el terreno ha cambiado desde la primera versión de
este análisis. El plan tiene hoy **106 casos por interfaz y cuatro por servicio** (`DOC-05`
1.6.0: `TC-041`, `TC-045`, `TC-063`, `TC-064`), y existen **dos suites reales** —
`automation/ui/` con 102 casos (`DOC-23`) y `automation/api/` con 4 (`DOC-27`)—, de modo que la
vía de servicio ya no hay que inventarla: hay dónde poner los casos negativos y hay quien
publique su resultado. *(Ojo al citar: `DOC-02` 1.1.0 §9 sigue diciendo «cobertura 0%, ningún
fichero de test». Era cierto cuando S-01 lo escribió mirando `client/` y `server/`, y hoy
induce a error; queda señalado para S-01 en §6.6, y este documento ya no se apoya en ese dato.)*
Segunda: los datos de ejemplo (`server/db/seed.js`) dan **un vehículo por cliente**, de modo que
ni AC-001 ni AC-010 son reproducibles sin ampliarlos. El código es pequeño; comprobarlo no lo
es.

---

## 2. Alcance técnico

### 2.1 Punto de entrada

`DOC-08` declara `affects_requirements: [REQ-040, REQ-046]`. `DOC-04` da su módulo:
`REQ-040` → `albarans`, `REQ-046` → `factures`. `DOC-02` da los componentes de cada módulo.
De ahí salen seis candidatos (`albarans-router`, `albarans-service`, `albarans-pages`,
`factures-router`, `factures-service`, `factures-pages`), de los cuales los criterios de
aceptación reducen el punto de entrada real a dos:

| Criterio | Dónde vive | Componente |
|---|---|---|
| AC-002, AC-004, AC-006, AC-007, AC-009 | `PUT /api/albarans/:id`, `server/routes/albarans.js:76-103` | `albarans-router` |
| AC-010, AC-011 | selector de vehículo, `client/src/pages/albarans/AlbaraForm.tsx:34-36,53-64` | `albarans-pages` |

AC-001, AC-003, AC-005 y AC-008 no añaden componentes: comprueban que lo que hoy funciona
sigue funcionando en esos mismos dos, más la emisión de factura que ya existe.

**Nota de la revisión 2.1.0 sobre los números de línea.** Los rangos que este documento cita de
`server/routes/albarans.js` son los del fichero **anterior** a `ed61c24`, que es el estado sobre
el que se hizo el análisis. Se conservan por fidelidad, con su equivalencia en `HEAD`:

| Este documento dice | En `HEAD` (`b5284b4`) |
|---|---|
| `76-103` (el `PUT` entero) | `76-114` |
| `90-95` (dónde entraría la comprobación de cliente) | `95-104`, ya escrita |
| `95-99` (el `UPDATE`) | `106-110` |
| `167-169` (descuento de estoc al añadir línea) | `184` |
| `199-201` (devolución de estoc al retirar línea) | `216` |

### 2.2 Nota de método: por qué el cierre transitivo ciego no sirve aquí

**`DOC-21-GRAPH.json` no existe**, así que el recorrido va a mano sobre las 58 aristas de
`DOC-02`. Al hacerlo aparece un problema que conviene declarar antes que los resultados,
porque cambia lo que significan: **el grafo tiene dos nodos concentradores que, recorridos
hacia atrás sin criterio, conectan todo con todo**.

1. **`api-client` → `server-app`** (`client/src/services/api.ts:43`). Es *una sola* arista
   que representa **la frontera HTTP entera**, no una dependencia por endpoint. Recorrida
   hacia atrás desde `albarans-router` da: `server-app` (1), `api-client` (2), **los siete
   servicios** (3) y **las siete páginas** (4). Es decir, «toda la aplicación» en cuatro
   saltos, y es falso: `peces-pages` no depende del `PUT` de albaranes.
2. **`db-connection`**. Siete routers escriben o leen contra él. Recorrido hacia atrás
   desde `albarans-router` devuelve otra vez los siete routers en dos saltos.

**Cómo lo he resuelto.** Atravieso esas dos aristas **solo cuando hay una razón nombrada**
para hacerlo, y la digo caso por caso: por `api-client` solo bajo hacia el módulo `albarans`
—que sí consume el endpoint que cambia— y hacia `factures`, que consume la tabla; por
`db-connection` solo llego a `db-seed`, y por una razón de datos, no de llamada. Todo lo
demás que solo es alcanzable atravesando esos dos nodos queda **fuera del alcance por
construcción**, y está enumerado en 2.5.

**Esto es una limitación de DOC-02, no un defecto de este análisis, y conviene que S-08 lo
sepa** si algún día genera `DOC-21-GRAPH.json`: sin granularidad de endpoint, el cierre
transitivo de cualquier cambio de servidor es el 100% del cliente.

### 2.3 Tres aristas reales que faltan en el grafo de DOC-02

Verificadas en el código en esta pasada. **No las corrijo yo** —`DOC-02` es de S-01—, pero
las uso, porque dos de ellas sostienen la mitad del alcance del cliente:

| Origen | Destino | Evidencia | Por qué importa aquí |
|---|---|---|---|
| `albarans-pages` | `vehicles-service` | `AlbaraForm.tsx:9`, `AlbaraDetail.tsx:5` | Es **por donde entra AC-010**. Sin esta arista, el filtro del desplegable parece no tener dependencias |
| `albarans-pages` | `shared-components` | `AlbaraForm.tsx:5-7` (`EntityForm`, `Spinner`) | `EntityForm` renderiza el `<select>`. Es el componente compartido por los siete módulos: define el radio de explosión de AC-011 |
| `factures-pages` | `albarans-service` | `FacturaForm.tsx:7` | Es la que explica por qué `TC-064` no puede ejercer `REQ-046` desde la pantalla (apartado 5) |

El grafo modela `<modulo>-pages → <modulo>-service` como si cada módulo solo hablara con el
suyo. En el código, las páginas de albaranes llaman a **tres** servicios (`albarans`,
`vehicles`, `clients`) y las de facturas a **tres** (`factures`, `clients`, `albarans`).

### 2.4 Componentes afectados, con distancia y efecto

La distancia se cuenta en saltos sobre el grafo de `DOC-02` desde el punto de entrada (2.1),
en cualquier sentido de la arista, e incluyendo las tres de 2.3. El efecto usa tres valores:

- **`breaks`** — hay que tocarlo, o su comportamiento actual deja de ser válido. Da la cara.
- **`behaviour`** — **no se toca ni una línea**, pero lo que garantiza cambia de significado.
  Es el peligroso: no da error.
- **`review`** — hay que mirarlo para confirmar que no le afecta, o participa sin cambiar.

| Componente | Dist. | Efecto | Directo/transitivo | Qué le pasa |
|---|---|---|---|---|
| `albarans-router` | 0 | breaks | directo | `PUT /:id` gana una comprobación entre las líneas 90-95 —**ya la tiene**, en `95-104`, desde `ed61c24`—. El análisis decía que la consulta del vehículo nuevo, entonces `SELECT id FROM vehicles WHERE id = ?`, necesitaba traer también el `client_id`: hoy trae `SELECT id, client_id` (línea 90) y compara contra el del vehículo actual. Es el componente que protege el dinero |
| `albarans-pages` | 0 | breaks | directo | `AlbaraForm` carga hoy `vehiclesService.list()` (**todos** los vehículos, línea 35). Con AC-010 el selector deja de ofrecer lo que ofrecía |
| `vehicles-router` | 1 | review | directo (`albarans-router` → `vehicles-router`, reads) | **No necesita cambios**: `GET /api/vehicles?client_id=` ya existe y filtra (`vehicles.js:6-14`), y `vehicles.client_id` ya viaja en la fila. Pero es **el fichero donde vive PD-002** (apartado 3.4) |
| `vehicles-service` | 1 | review | directo (arista de 2.3) | `listByClient()` **ya existe** (`vehicles.ts:6`). AC-010 no obliga a tocar este componente, solo a llamarlo desde otro sitio |
| `albarans-service` | 1 | review | directo | Envoltorio tipado de 17 líneas. `update()` no cambia de firma; lo único que cambia es que su promesa puede rechazar donde antes no lo hacía |
| `shared-components` | 1 | review | directo (arista de 2.3) | `EntityForm` es de los **siete** módulos. Si AC-010/AC-011 se resolvieran tocándolo, el radio pasa de un módulo a siete. Hoy su `<select>` ya emite siempre una opción vacía inicial (`EntityForm.tsx:63`), que es la mitad de AC-011 ya resuelta |
| `factures-router` | 1 | **behaviour** | directo (`factures-router` → `albarans-router`, writes) | **Ni una línea cambia y su garantía sí.** Ver apartado 3.2: es la comprobación de `REQ-046`, hoy inútil, que pasa a valer algo |
| `db-connection` | 1 | review | directo | Un `SELECT` más por operación de guardado. Sin cambio de esquema, sin cambio de configuración |
| `server-app` | 1 | review | directo (monta el router) | Solo monta. No cambia |
| `db-numbering` | 1 | review | directo | **Revisado y descartado**: `albarans-router` solo lo llama en el `POST` (creación, `albarans.js:63`), y crear albarán está fuera de alcance (DOC-08 §5.1) |
| `api-client` | 2 | review | transitivo (vía `server-app`) | Por aquí pasa el mensaje de rechazo nuevo, envuelto en `ApiError`. No cambia. Ver el riesgo del idioma en 5.4 |
| `factures-pages` | 2 | review | transitivo (vía `factures-router` y vía la arista de 2.3) | No cambia. Es el **precedente** del patrón de doble protección, y por eso está en el apartado 5 |
| `db-seed` | 2 | review | transitivo (vía `db-connection`, razón de datos) | Los datos de ejemplo dan **un vehículo por cliente** (`seed.js:33-39`, seis clientes con NIF distinto, seis vehículos). AC-001 y AC-010 no son reproducibles sobre ellos. Ver 4.3 |
| `i18n` | 2 | review | transitivo (vía `client-main`) | Si el filtro necesita algún literal nuevo en pantalla, va en `client/src/locales/es.json` y `ca.json`. El mensaje de rechazo del servidor **no pasa por aquí** (5.4) |

**Ningún componente pasa de dos saltos.** No es que haya cortado a tres: es que el alcance
real se agota antes, en cuanto se deja de atravesar los dos concentradores de 2.2. Lo que
hay más allá no es impacto, es la aplicación entera.

### 2.5 Componentes descartados y por qué

Quedan fuera los diecinueve restantes del grafo. Se agrupan en tres motivos:

1. **Solo alcanzables atravesando `api-client` → `server-app`** (frontera HTTP agregada,
   2.2): `clients-pages`, `peces-pages`, `personal-pages`, `nomines-pages`, `vehicles-pages`,
   `clients-service`, `peces-service`, `personal-service`, `nomines-service`,
   `factures-service`. Ninguno consume `PUT /api/albarans/:id`. *(`clients-service` sí lo
   usa `AlbaraDetail` para pintar el nombre del cliente, pero solo lee: nada cambia.)*
2. **Solo alcanzables atravesando `db-connection`**: `clients-router`, `peces-router`,
   `personal-router`, `nomines-router`, `db-migrate`. Ninguno lee ni escribe `albarans`
   con criterio de cliente. `peces-router` toca `albara_linies` para bloquear borrados
   (`peces.js:82`), que este evolutivo no altera.
3. **Marco de la SPA, sin relación con la regla**: `client-main`, `client-app`, `layout`,
   `use-theme`.

---

## 3. Alcance funcional

**Aviso sobre `DOC-05`.** La primera versión de este análisis lo leyó mientras `A-03 · Plan de
pruebas` lo estaba editando —pasó de 1.4.1 a 1.5.0 durante aquella ejecución—, así que la traza
`REQ → TC` se contrastó contra `DOC-07-MATRIZ.csv`, que no estaba en edición. **En la revisión
2.1.0 esa precaución ya no hace falta**: `DOC-05` está estable en **1.6.0** y la matriz ha vuelto
a salir byte a byte idéntica al regenerar `DOC-07` 1.10.0 (md5 `087a0377…`, octava vez
consecutiva), lo que confirma la traza sin depender de una lectura en caliente. Este documento
**no toca DOC-05**.

**Lo que 1.6.0 aporta, y que corrige lo que este documento afirmaba leyendo la 1.5.0.** Los 110
casos declaran `verification_path`, pero **no son 109 `ui` y uno `service`**, como se escribió
aquí: son **106 `ui` y cuatro `service`** —`TC-041`, `TC-045`, `TC-063` y `TC-064`, los tres
últimos reclasificados en 1.6.0 (anexo «Versión 1.6.0 · reclasificación de TC-045, TC-063 y
TC-064»)—. El razonamiento de fondo no cambia y sigue siendo determinante para el impacto: **un
requisito cuya cobertura entera sea de pantalla queda ciego ante un cambio que solo se puede
provocar por servicio.** De los seis requisitos de este apartado que tienen caso, **cinco siguen
exactamente en esa situación**; el sexto, `REQ-046`, es el único que ha salido de ella, y **cómo
salió** —y qué mitad de su ceguera sigue abierta— es la lección del apartado 5.

### 3.1 El requisito que se contradice

| | |
|---|---|
| **REQ-040** | «El sistema permite modificar el vehículo, la fecha y las notas de un albarán no facturado.» (módulo `albarans`, `medium`, ancla `UC-ALB-06`) |
| Efecto | **`contradicted`**, y solo en parte: fecha y notas no se tocan |
| Casos | `TC-055` · `verification_path: ui` |

Deja de ser cierto sin matiz: el vehículo solo podrá cambiarse por otro **del mismo cliente**.
Cuando el evolutivo se implemente, **A-02 debe reformular el enunciado**; hasta entonces
`REQ-040` describe un comportamiento que el sistema ya no tendrá.

**Un matiz que no es evidente y que evita trabajo inútil: `TC-055` no hay que reescribirlo.**
Su precondición es *«Existe un albarán pendiente de facturar del vehículo 1234ABC, y **el
mismo cliente** tiene además el vehículo 5678DEF»* y su paso cambia el vehículo entre esos
dos. Es decir: `TC-055` ejercita **exactamente AC-001**, el camino feliz que sigue permitido.
Sus pasos siguen siendo válidos palabra por palabra; lo que queda desactualizado es el
**enunciado del requisito al que traza**. La nota de automatización del propio caso dice
*«REQ-040 se reescribe con el evolutivo de DOC-04/Q-10 [...] el caso cambia de enunciado en
cuanto llegue»*, y conviene precisarla: cambia de enunciado, no de pasos.

**Lo que sí falta.** `DOC-07-MATRIZ.csv` da `REQ-040` por cubierto con un caso y estado
`Correcto`. Ese único caso es el positivo. **No existe ningún caso del lado negativo** —el
rechazo—, y con la regla nueva el lado negativo es el que protege el dinero. La matriz
seguirá diciendo `Correcto` mientras la parte crítica esté sin cubrir, hasta que A-05
regenere.

**Reverificado en la revisión 2.1.0**, porque era una de las citas que el resello obligaba a
comprobar: la fila sigue siendo palabra por palabra
`REQ-040,"El sistema permite modificar el vehículo, la fecha y las notas de un albarán no
facturado.",albarans,medium,TC-055,1,n/d,n/d,n/d,Correcto`, y `DOC-07` 1.10.0 la reconfirma sin
tocar una celda. Que la evidencia de ejecución publicada haya subido de 102 a **106 de 110**
casos no alcanza a `REQ-040`: los cuatro que entran son `TC-041`, `TC-045`, `TC-063` y `TC-064`,
y `TC-055` no está entre ellos.

### 3.2 El requisito que se refuerza

| | |
|---|---|
| **REQ-046** | «El sistema exige que todos los albaranes de una misma factura pertenezcan al mismo cliente.» (módulo `factures`, `critical`, ancla `BR-FAC-03`) |
| Efecto | **`modified`** — ampliado en su alcance real, **no contradicho** |
| Casos | `TC-064` · `Critical`, `Negative`, **`verification_path: service`** desde `DOC-05` 1.6.0 (era `ui` cuando se escribió este análisis) · ejecutado en verde por `DOC-27` 1.0.0 (`TCS008`, `TCS009`, `TCS010`) |

**A-06 tiene razón y lo he verificado en el código.** El detalle está en RS-02; en corto: la
comprobación de `factures.js:72-77` resuelve el cliente atravesando el vehículo **en el
momento de emitir**, de modo que un albarán ya movido llega con el cliente nuevo y la regla
lo da por bueno. La línea inmediatamente siguiente usa ese mismo cliente como destinatario
de la factura. La comprobación de `REQ-046` es, hoy, la que escribe a quién se cobra.

**¿Cambia esto mi análisis? Sí, en dos cosas.**

1. `REQ-046` **no requiere ni una línea de código**, y aun así su garantía cambia. Por eso
   `factures-router` va marcado `behaviour` y no `review` en el apartado 2.4: es el único
   componente del alcance que cambia de significado sin cambiar de contenido.
2. **La ceguera de `REQ-046` era doble; desde el 2026-08-24 es simple.** Cuando se escribió
   este análisis, su único caso, `TC-064`, declaraba `verification_path: ui` y **no podía
   ejecutarse por la interfaz**, porque `FacturaForm` obliga a elegir cliente antes de listar
   albaranes: ni el sistema comprobaba el caso que importa, ni el plan lo ejercía por la vía
   que declaraba. **Esa mitad está cerrada, y no por este documento**: `A-05-11a` lo demostró
   leyendo `FacturaForm.tsx`, `DOC-05` 1.6.0 reclasificó el caso —«vector no compostable por
   UI […] el intento tiene que ejercerse contra `POST /api/factures` directamente»— y `DOC-27`
   1.0.0 lo ejerció de verdad: `TCS008` recibe `400` con el mensaje esperado y `TCS009`/`TCS010`
   comprueban que los dos albaranes siguen pendientes y que no se creó ninguna factura.
   **La mitad que sigue abierta es justo la que le importa a `EVO-001`:** el sistema sigue sin
   poder detectar el albarán movido, porque el `Set` de `factures.js:72-77` se calcula
   *después* del movimiento y para entonces el dato ya llega coherente. Eso no lo puede ver
   ninguna suite —no es un defecto de la prueba, es que no hay nada anómalo que observar—; solo
   lo cierra la regla nueva.

### 3.3 Requisitos que hay que revisar, no cambiar

| REQ | Enunciado (DOC-04 1.2.0) | Efecto | Casos y vía | Por qué está |
|---|---|---|---|---|
| **REQ-042** | «El sistema impide modificar, borrar o alterar las líneas de un albarán que ya ha sido facturado.» | `review` | `TC-057`, `TC-058`, `TC-059` — las tres `ui` | AC-006 exige que **siga mandando antes**: sobre un albarán facturado el rechazo debe seguir siendo «ya está facturado». Los tres casos cubren el intento desde pantalla; el intento con vehículo de otro cliente **no es alcanzable desde ninguno de ellos** |
| **REQ-027** | «Todo albarán queda asociado a un vehículo que ya existe en el sistema.» (`BR-ALB-01`) | `review` | `TC-036` · `ui` | AC-009 exige que el motivo «el vehículo no existe» siga distinguiéndose del motivo nuevo. Ojo: `TC-036` comprueba la **apertura** de un albarán (`POST`), no la modificación; el vector de AC-009 vive en el `PUT` y **no lo toca ningún caso** |
| **REQ-041** | «El sistema permite borrar un albarán no facturado junto con todas sus líneas, previa confirmación del usuario.» | `review` | `TC-056` · `ui` | Es la única salida que le queda al usuario que ya se equivocó: borrar y rehacer (`PD-003`, abierta). El caso no cambia; lo que cambia es cuánto se va a usar ese camino — **y desde `DOC-07` 1.10.0 se sabe qué cuesta usarlo**: `A-05-15` verifica que borrar un albarán **no devuelve al catálogo el stock** de sus líneas de pieza. Ver **RS-07** |
| **REQ-015** | «El sistema permite modificar los datos de un vehículo ya registrado.» (`UC-VEH-04`) | `review` | `TC-021` · `ui` | **La otra puerta.** Ver 3.4 |
| **REQ-011** | «Todo vehículo queda asociado a un cliente que ya existe en el sistema.» (`BR-VEH-01`) | `review` | — | Sigue mandando en `vehicles.js:81-84`. La regla nueva se apoya en que todo vehículo tiene cliente; si `REQ-011` cayera, `EVO-001` se queda sin criterio de comparación |

### 3.4 `PD-002` · la misma fuga tiene otra puerta, y el componente es el vecino

`DOC-08` §5.2 deja `PD-002` **fuera de alcance** por decisión de A-06, y este documento no la
discute. Lo que sí le corresponde a un análisis de impacto es dejar constancia de **dónde
está esa otra puerta en el código**, porque el resultado es idéntico y la distancia es corta:

`REQ-015` se implementa en `vehicles.js:65-112`. El `UPDATE` de la línea 93 escribe
`client_id = ?` **sin ninguna comprobación sobre los albaranes pendientes de ese vehículo**.
Solo valida que el cliente nuevo exista (`vehicles.js:81-84`). Es decir: cambiar el
propietario de un vehículo arrastra todos sus albaranes pendientes al dueño nuevo, y la
factura saldrá a ese, por la misma mecánica de `factures.js:73` descrita en RS-02.

**Tres datos para quien tenga que decidir sobre `PD-002`:**

1. **El componente es `vehicles-router`, a un salto de `albarans-router`** (arista
   `albarans-router → vehicles-router`, `reads`). No es un módulo lejano: es el vecino
   inmediato, y el que `EVO-001` ya va a tocar como lectura.
2. **El acoplamiento que haría falta ya existe en ese mismo fichero.** `vehicles-router` ya
   consulta la tabla `albarans` para bloquear el borrado de un vehículo con albaranes
   (`vehicles.js:120-124`, y `DOC-02` §4 lo lista como acoplamiento entre módulos). La
   consulta necesaria para saber si un vehículo tiene albaranes pendientes está escrita a
   pocas líneas de distancia, a falta del filtro por estado.
3. **Su cobertura es de pantalla.** `TC-021` («Modificar los datos de un vehículo
   registrado») es `verification_path: ui` y es el único caso de `REQ-015`.

**Consecuencia para el alcance de `EVO-001`:** con el evolutivo implementado, la protección
tapa la puerta principal y deja abierta la de servicio de `vehicles-router`. Quien lea
después que «un albarán ya no puede cambiar de cliente» debe saber que la frase es cierta
**solo por la puerta del albarán**.

### 3.5 Documentación que quedará desactualizada

**No la toco.** Se enumera para que sus propietarios lo sepan:

| Documento | Qué queda desactualizado | Propietario |
|---|---|---|
| `DOC-04-FUNCIONAL.md` | El enunciado de `REQ-040`. La `Q-10` pasa de hueco confirmado a hueco cerrado. `PD-002` pide **pregunta abierta nueva** | A-02 |
| `DOC-05-PLAN-PRUEBAS.md` | `TC-055` cambia de enunciado (no de pasos). Faltan los casos del lado negativo, que por política de `Q-18` nacen por servicio | A-03 |
| `DOC-06-MANUAL-USUARIO.md` | Tarea **A.13**, §4: el aviso «**Cuidado con cambiar el vehículo**» (línea 528) describe un riesgo que dejará de existir. También §6.1 y §6.2, que ya se declaran afectadas por `Q-10` | A-04 |
| `DOC-07-TRAZABILIDAD` / `DOC-07-MATRIZ.csv` | Las filas de `REQ-040` y `REQ-046`, y el estado `Correcto` de `REQ-040` con un solo caso positivo. Desde 1.10.0 la fila de `REQ-041` ya lleva reserva propia (`A-05-15`), que `EVO-001` agrava sin cambiarla de sitio (RS-07) | A-05 |
| `DOC-02-TECNICA.md` | Las tres aristas que faltan en el grafo (§2.3), independientemente de este evolutivo | S-01 |

---

## 4. Modelo de datos

### 4.1 Entidades implicadas y por qué no hay migración

| Entidad | Tabla | Papel en la regla |
|---|---|---|
| `Albara` | `albarans` | El que no puede cambiar de cliente. Tiene `vehicle_id INTEGER NOT NULL REFERENCES vehicles(id)` y **no tiene `client_id`** |
| `Vehicle` | `vehicles` | El único sitio donde consta a qué cliente pertenece algo: `client_id INTEGER NOT NULL REFERENCES clients(id)` |
| `Client` | `clients` | Extremo de la comparación. No participa activamente |
| `Factura` | `factures` | Sí guarda `client_id`, materializado en el momento de emitir (`factures.js:88`). Es donde se hace visible el daño |
| `Peca` | `peces` | **Añadida en la revisión 2.1.0.** No participa en la regla y su esquema no cambia; entra porque el evolutivo redirige tráfico hacia el camino que descuadra `peces.estoc` (RS-07) |

**`migration_required: false`.** El esquema no cambia: la regla compara el `client_id` del
vehículo actual con el del vehículo propuesto, y **los dos datos ya están en la base**
(`server/db/migrations/002_vehicles_peces_albarans_factures.sql`). Tampoco hacen falta
índices: la consulta del filtro (`SELECT * FROM vehicles WHERE client_id = ?`,
`vehicles.js:10`) ya existe y ya se usa; el volumen es de un taller de un solo puesto y
`DOC-02` §5 declara que el proyecto no tiene índices adicionales por decisión asumida.

**La causa raíz, dicha una vez:** que `albarans` no tenga `client_id` es exactamente lo que
hace posible la fuga. La pertenencia a un cliente no es un dato del albarán, es el resultado
de seguir un puntero que alguien puede reescribir. `EVO-001` **no cambia eso**: cierra la
reescritura, no materializa la pertenencia.

### 4.2 Datos existentes: ninguno queda inválido, y conviene entender por qué

**`existing_data_at_risk: false`**, y el argumento importa porque la conclusión no es obvia
teniendo una factura mal emitida en la base:

- La regla nueva restringe una **transición** (pasar de un vehículo a otro), no un **estado**.
  Ninguna fila almacenada puede violarla: cualquier albarán, mirado hoy, tiene un vehículo y
  ese vehículo tiene un cliente. No hay nada que validar retroactivamente ni nada que rellenar.
- El daño de `BUG-002` sigue en la base —albarán 5 y factura `2026/F-0002` de 114.835,05 € al
  cliente 8, `DOC-24/test_data_left_behind`— pero esas filas son **internamente coherentes**:
  el albarán apunta a un vehículo del cliente 8 y la factura está emitida al cliente 8. Son
  datos **incorrectos de negocio y válidos de esquema**. Corregirlos está **fuera de alcance**
  (`DOC-08` §5.3) y además hoy es imposible desde la aplicación (`BUG-004`).

**Un matiz que añade la revisión 2.1.0, y que no cambia el veredicto.** `existing_data_at_risk`
sigue siendo `false`: la regla nueva no invalida ninguna fila que ya esté grabada, tampoco en
`peces`. Lo que introduce RS-07 es distinto y va hacia delante, no hacia atrás: **a partir de la
implantación, cada corrección de un albarán mal abierto deja `peces.estoc` por debajo de la
realidad**, sin migración de por medio y sin nada que lo marque. Es deriva de datos futura, no
datos existentes inválidos, y las dos cosas se financian de maneras distintas.

**Bifurcación que A-08 y S-04 deben conocer.** Todo lo anterior vale para `EVO-001` **tal
como está especificado**. Si el diseño eligiera otro camino —materializar `client_id` en
`albarans`— el análisis de datos cambia por completo: habría migración, relleno de todas las
filas existentes, y el albarán 5 quedaría con un cliente que contradice su propio historial.
No digo cuál es el camino bueno; digo que las dos ramas **no cuestan lo mismo en datos** y
que la especificación no obliga a la segunda.

### 4.3 Datos de ejemplo: dos criterios no son reproducibles hoy

Hallazgo de `db-seed` (`server/db/seed.js:33-39`): hay **seis vehículos y seis clientes, uno
por cliente** —cada vehículo declara un `clientNif` distinto— y los cuatro albaranes del
seed cuelgan de cuatro vehículos de cuatro clientes distintos. **Ningún cliente tiene dos
vehículos.** De ahí:

- **AC-001** («corregir el vehículo dentro del mismo cliente») **no se puede reproducir**:
  no hay ningún segundo vehículo al que cambiar dentro del mismo cliente.
- **AC-010** («aparecen todos los vehículos de C1 y ninguno de otro») queda
  **indistinguible de AC-011**: el desplegable filtrado mostraría siempre exactamente una
  opción, con lo que el caso del cliente con un solo vehículo y el caso general dan el mismo
  resultado observable, y una implementación que no filtre nada pero devuelva solo el
  vehículo actual pasaría los dos.
- `DS-004` y `DS-005` de `DOC-05` **suponen** un cliente con dos vehículos (la precondición
  de `TC-055` lo dice expresamente), y el seed no lo proporciona.

Es impacto real sobre la preparación del entorno, y afecta a A-09 y a A-03 antes que a nadie.

---

## 5. Riesgos silenciosos

Sección obligatoria. Aquí van los cambios que **no producen ningún error** y alteran el
comportamiento o su significado. Se han buscado a propósito, y hay siete —el séptimo nace en la
revisión 2.1.0, con `A-05-15` de `DOC-07` 1.10.0—. Los identificadores
`RS-nn` son **locales de este documento**: no son anclas de `registro-ids.json` y A-07 no
acuña identificadores.

### RS-01 · La misma regla vive en dos componentes, y este repositorio ya tiene el precedente de que eso se pudre

**Qué pasa.** `EVO-001` implementa una sola regla de negocio —«un albarán no cambia de
cliente»— **dos veces y en dos componentes distintos**: el filtro del desplegable en
`albarans-pages` (AC-010) y la comprobación al guardar en `albarans-router` (AC-002). A-06
lo advirtió en `DOC-08` §4.2: el día que divergan, ningún caso que solo mire la pantalla lo
detectará y el síntoma será otra vez una factura al cliente equivocado.

**Lo que añade este análisis: no es una hipótesis de futuro. Ya ocurrió, en el módulo vecino,
con esta misma regla de dinero.** `REQ-046` está protegido exactamente igual:

| Capa | Dónde | Qué hace |
|---|---|---|
| Pantalla | `FacturaForm.tsx:28-34` | El usuario elige **primero** el cliente; la lista de albaranes se pide con `albaransService.listByClient(clientId, 'pendent')`. Las casillas que se pintan (`FacturaForm.tsx:105-118`) **solo pueden ser de ese cliente** |
| Servidor | `factures.js:72-77` | Reúne los `client_id` de los vehículos de los albaranes recibidos en un `Set` y rechaza si `size > 1` |

Y el caso de prueba que decía cubrirlo, `TC-064` («Rechazar la emisión con albaranes de dos
clientes distintos», `Critical`, `Negative`), declaraba **`verification_path: ui`** y su primer
paso es *«Iniciar la emisión de una factura incluyendo el albarán pendiente de "Garcia Motors
SL" y el de "Tallers Puig SL"»*. **Ese intento no se puede componer en ese formulario.** El
caso estaba escrito contra una pantalla que no ofrece el vector.

Es la divergencia en su forma madura: una comprobación de servidor viva, un filtro de
pantalla que la tapa, y un caso de prueba de prioridad `Critical` que creía ejercerla y no
podía. **Nadie lo notó por ejecución, porque nada fallaba**: lo encontró A-05 leyendo el código
(`A-05-11a`, `DOC-07` §3.11), y hasta que `DOC-27` 1.0.0 compuso el intento contra el servicio
no hubo un hecho que lo confirmara. Ese es el dato que hay que llevarse a `EVO-001`, no el
susto: **el modo de fallo de la doble protección no lo encuentra una suite verde; lo encuentra
alguien comparando dos capas a mano, o no lo encuentra nadie.**

**Qué ha cambiado desde la primera versión de este análisis, y qué no.** El precedente está
cerrado: `DOC-05` 1.6.0 reclasificó `TC-064` a `service`, `S-17` lo llevó a
`automation/api/` y `DOC-27` 1.0.0 publica su resultado (`TCS008` rechaza con `400`, `TCS009`
y `TCS010` verifican que no se movió nada). Lo que **no** cambia es el riesgo que este apartado
describe para `EVO-001`: la regla nueva sigue quedando partida en dos capas, y la capa de
pantalla sigue tapando el vector de la de servidor. Lo que sí cambia —y es la mejor noticia
para A-08 y para A-09— es que **ya existe el sitio donde ponerlo a prueba**: no hay que montar
nada para escribir los casos de servicio de AC-002, AC-004, AC-007 y AC-009.

**La dirección peligrosa es asimétrica, y conviene decirlo porque no es simétrica en
absoluto:**

- Si se pudre **el filtro** (`albarans-pages` deja de filtrar), el usuario vuelve a ver
  vehículos de otros clientes, los selecciona, y el servidor los rechaza. Es feo y visible.
  **El dinero está a salvo.**
- Si se pudre **la comprobación** (`albarans-router`), la pantalla sigue impecable, el
  usuario no nota nada, y la única puerta que queda abierta es la que usó `BUG-002` —el
  servicio— por la que se emitió una factura de 114.835,05 € al cliente 8. **Nada falla y el
  dinero se va.**

**Y hoy sigue sin haber nada que detecte esa segunda pudrición, aunque por menos motivos que
antes.** `DOC-05` 1.6.0 declara `verification_path` en sus 110 casos: **106 `ui` y cuatro
`service`** (`TC-041`, `TC-045`, `TC-063`, `TC-064`), y los cuatro de servicio tienen ya
ejecución publicada (`DOC-27` 1.0.0, 10 `TCS-nnn` en verde). **Ninguno de los cuatro toca el
`PUT` de albaranes**: la protección que guarda el dinero en `EVO-001` sigue sin un solo caso que
la ejerza. `Q-18` quedó **`answered` el 2026-08-17**, en dos mitades: la vía de servicio
**existe y está usada** —evidencia ejecutada, `DOC-24/BUG-003`— y la política de A-03 es que un
caso va por servicio **solo cuando el vector no existe en la interfaz**. Aplicada a `EVO-001`,
esa política manda que AC-002, AC-004, AC-007 y AC-009 nazcan por servicio; pero `DOC-05` §6.5
dice también que esos casos **nacerán en la regeneración del plan, cuando A-02 haya regenerado
DOC-04**. Entre la implementación y esa regeneración hay una ventana en la que la protección que
guarda el dinero **no tiene ningún caso que la ejerza**. Esa ventana es el riesgo — y con la
mitad de servidor ya en el tronco desde `ed61c24` (nota de estado del código, al principio de
este documento), **la ventana no es futura: está abierta ahora mismo**.

**Componentes:** `albarans-router`, `albarans-pages`. **Precedente vivo:** `factures-router`,
`factures-pages`.

### RS-02 · `factures-router` cambia de significado sin que nadie lo toque

**Verificado en el código, que es lo que pedía el encargo.** `factures.js:72-78`:

```js
const clientIds = new Set(
  albarans.map((a) => db.prepare('SELECT client_id FROM vehicles WHERE id = ?').get(a.vehicle_id).client_id),
);
if (clientIds.size > 1) {
  return res.status(400).json({ error: 'Tots els albarans han de ser del mateix client' });
}
const clientId = [...clientIds][0];
```

El cliente de la factura **no se guarda nunca en el albarán**: se resuelve atravesando
`albarans.vehicle_id → vehicles.client_id` **en el instante de emitir**. De ahí salen dos
hechos:

1. **A-06 tiene razón: `REQ-046` no se contradice, se refuerza.** La comprobación no puede
   detectar el albarán movido, porque cuando llega el momento de facturar el albarán ya
   «pertenece» al cliente nuevo: el `Set` tiene un solo elemento y la regla pasa. Peor: la
   línea siguiente, `const clientId = [...clientIds][0]`, **usa ese mismo cliente
   equivocado** para emitir. La comprobación de `REQ-046` es literalmente la que escribe el
   destinatario de la factura. Es la mecánica exacta de `BUG-002`, y coincide con
   `DOC-24`: *«El cliente de la factura se resuelve en factures.js:73 desde el vehículo en el
   momento de facturar, no en el de crear el albarán»*.
2. **Con `EVO-001`, el mismo código pasa a garantizar algo que hoy no garantiza.** Al
   volverse inmutable la pertenencia del albarán a un cliente, el `Set` deja de poder ser
   manipulado por la puerta de atrás y la comprobación empieza a significar lo que su
   enunciado dice.

**Por qué es silencioso.** `factures.js` **no aparecerá en el diff**. Quien revise el cambio
verá dos ficheros de albaranes y ninguna razón para mirar facturas; quien mantenga
`factures.js` dentro de seis meses no tendrá forma de saber que su corrección depende de una
regla que vive en otro módulo. Es el caso de manual de `effect: behaviour`: cero líneas,
garantía distinta.

**Componente:** `factures-router`.

### RS-03 · El mismo formulario servirá para dos cosas distintas, y solo una filtra

`AlbaraForm.tsx` es a la vez alta y edición (`const isEdit = Boolean(id)`, línea 22). Crear
un albarán está **fuera de alcance** por decisión de `DOC-08` §5.1, y con razón: al crear no
hay cliente del que mover el trabajo. Consecuencia: después de `EVO-001` el mismo componente
tendrá **un desplegable que filtra al editar y no filtra al crear**, sin que ninguna de las
dos conductas dé error.

Dos formas de que se pudra, ninguna ruidosa: que alguien «unifique» el comportamiento y
extienda el filtro al alta —donde no hay cliente de referencia; la línea 28 solo trae un
`vehicleId` de la URL—, o que alguien lo simplifique al revés y devuelva la lista completa a
la edición. La segunda reabre `BUG-002` desde la pantalla y no produce ningún error.

Añadido menor de la misma familia: sobre los datos de ejemplo actuales el selector pasa de
mostrar **seis** vehículos a mostrar **uno** (§4.3). Cualquier comprobación manual escrita
suponiendo la lista completa cambia de significado sin avisar.

**Componente:** `albarans-pages`.

### RS-04 · El motivo del rechazo puede ser el equivocado sin que nada falle

AC-006 y AC-009 no piden que el sistema rechace: piden que rechace **por el motivo de
siempre**. El `PUT` comprobaba, antes del evolutivo, en este orden: existe el albarán (404) →
está facturado (409) → falta `vehicle_id` (400) → el vehículo no existe (400) → escribe.

*(Actualizado en la revisión 2.1.0: la comprobación que estaba en el tronco desde `ed61c24`
—ver la nota de estado del código— quedó **la última de las cuatro**, en
`albarans.js:95-104`, después de «el vehículo no existe» y antes del `UPDATE`. Con ese orden,
AC-006 y AC-009 se cumplen. El riesgo que sigue describe qué pasa si alguien la mueve, que es
exactamente lo que puede ocurrir cuando se complete la otra mitad del evolutivo.)*

Si la comprobación nueva se coloca antes de alguna de esas, **el resultado sigue siendo
correcto** —el cambio se rechaza y el albarán no se mueve— y **el criterio queda incumplido
igualmente**, porque el usuario recibe el motivo equivocado. No hay error, no hay traza, no
hay compilación rota: solo un mensaje que dice una cosa por otra, que es justo lo que AC-009
existe para impedir («dos rechazos con el mismo mensaje son un mensaje inútil»).

Lo que lo hace silencioso de verdad es que **no hay nada que lo mire**. No es ya que no haya
suites —las hay, dos—: es que **ninguno de los 110 casos de `DOC-05` 1.6.0 ejerce el `PUT` de
albaranes por servicio**, que es la única vía por la que se distingue un motivo de rechazo de
otro, y que los literales de los avisos no están documentados en ningún requisito. Lo dice el
propio plan en la nota de automatización de una decena de casos: *«comprueba que el sistema
avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un
texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma»*. El orden de
las comprobaciones es, en este evolutivo, información de comportamiento; no está escrito en
ningún requisito y no lo protege ninguna prueba. *(Dónde colocarla es diseño y es de S-04; aquí solo consta que el
orden es portante.)*

**Componente:** `albarans-router`.

### RS-05 · La atomicidad que AC-004 exige hoy es un accidente, no una garantía

AC-004 pide que un rechazo no guarde nada a medias. Hoy eso se cumple **por casualidad
estructural**: el guardado es un único `UPDATE` (`albarans.js:95-99`) sin transacción, de
modo que una comprobación previa deja el albarán intacto sin necesidad de nada más. `DOC-02`
§5 confirma que las transacciones del proyecto están en otros cuatro puntos, y ninguno es
este.

Es silencioso porque **hoy pasa el criterio sin que nadie haya hecho nada para que pase**, y
seguirá pasándolo hasta el día en que el guardado deje de ser una sola sentencia. Ese día
AC-004 se romperá sin que ningún caso de pantalla lo note: el usuario verá el rechazo
—correcto— y no verá que la fecha o las notas sí se guardaron.

**Componente:** `albarans-router`.

### RS-06 · El mensaje nuevo saldrá en catalán en una interfaz en castellano, y bajo el campo equivocado

Dos comportamientos existentes que el mensaje nuevo hereda sin que nadie los decida:

- **Idioma.** Los errores del servidor son literales en catalán (`albarans.js:82,87,92`;
  `DOC-02` §6 lo declara como convención) y el cliente los pinta tal cual: `AlbaraForm.tsx:94`
  hace `err instanceof ApiError ? err.message : t('albarans.error')`. La interfaz tiene
  `es.json` y `ca.json`; un usuario en castellano recibirá el rechazo nuevo en catalán. No es
  una regresión —ya pasa con los tres mensajes actuales— pero sí es una decisión que se toma
  por omisión, y `DOC-08` §6.1 dejó el texto del mensaje **expresamente sin decidir**.
- **Ubicación.** El `catch` de `AlbaraForm.tsx:93-95` asigna **cualquier** error al campo
  `vehicleId`. Para la regla nueva acierta por casualidad. Pero un rechazo motivado por otra
  cosa se seguirá pintando bajo el desplegable de vehículo.

**Componentes:** `albarans-pages`, `api-client`, `i18n`.

### RS-07 · La salida que `EVO-001` deja al usuario que ya se equivocó pierde estoc, y no avisa

**Nuevo en la revisión 2.1.0.** Nace de `A-05-15` (`DOC-07` 1.10.0 §3.15), verificado aquí en
el código antes de darlo por bueno.

**El hecho.** Las dos rutas que retiran líneas de albarán hacen cosas distintas con el stock.
Al retirar **una línea suelta** (`server/routes/albarans.js:197-224`) el borrado y la
devolución van en la misma transacción:

```js
db.prepare('DELETE FROM albara_linies WHERE id = ?').run(linia.id);
if (linia.tipus === 'peca') {
  db.prepare('UPDATE peces SET estoc = estoc + ? WHERE id = ?').run(linia.quantitat, linia.peca_id);
}
```

Al borrar **el albarán entero** (`server/routes/albarans.js:116-132`), no:

```js
db.prepare('DELETE FROM albara_linies WHERE albara_id = ?').run(req.params.id);
db.prepare('DELETE FROM albarans WHERE id = ?').run(req.params.id);
```

**No hay ningún `UPDATE peces`.** Las líneas de pieza desaparecen y las unidades que
descontaron (`albarans.js:184`, `estoc = estoc - ?`) no vuelven al catálogo.

**Por qué es impacto de `EVO-001` y no un defecto ajeno que se cita de paso.** El defecto es
anterior y no lo causa el evolutivo; lo que hace el evolutivo es **convertir ese camino en el
único que le queda al usuario que ya se equivocó**. Es literalmente lo que dice `PD-003`
(`DOC-08` §6.2, pendiente de negocio): *«un albarán abierto al vehículo de otro cliente y con
trabajo ya anotado solo se puede arreglar borrándolo y volviéndolo a abrir, rehaciendo las
líneas a mano (REQ-041, mientras no esté facturado)»*. Antes de la regla, corregir el error era cambiar el vehículo:
una operación de cabecera que **no toca el stock** (así se descartó en su día, y sigue siendo
cierto para AC-003). Después de la regla, corregirlo es borrar y rehacer, y cada corrección
**descuenta dos veces** las mismas piezas: una en el albarán equivocado, que se borra sin
devolverlas, y otra al volver a anotarlas en el bueno.

**Por qué es silencioso.** No hay error en ningún punto: el borrado responde `204`, el albarán
nuevo se crea, las líneas se anotan y la factura sale correcta. Lo único que queda mal es el
estoc del catálogo, que baja sin que nada lo haya consumido, y que nadie mira en ese momento.
El síntoma aparece semanas después y en otro sitio: un `Estoc insuficient: hi ha N unitats`
(`albarans.js:163-165`) al anotar una pieza que sí estaba, o un inventario que no cuadra. Entre
la causa y el síntoma no hay ninguna traza.

**Y no hay nada que lo vigile.** `REQ-041` no dice nada del stock y `REQ-039` habla solo de la
línea suelta, así que **ningún requisito decide si esto está bien** —`A-05-15` lo deja
expresamente como pregunta de producto, no la resuelve—. `TC-056`, su único caso, está en
verde: ni menciona el stock en sus pasos ni declara `peces.estoc` en `touches`, y el escenario
que ejecuta `automation/ui/` ni siquiera crea una línea de pieza pese a lo que pide su
precondición `DS-005`.

**Consecuencia para quien decida.** `PD-003` estaba abierta como pregunta de comodidad —«¿le
vale al taller rehacer las líneas a mano?»—. Con `A-05-15` deja de serlo: la respuesta «sí, que
lo rehagan» **tiene un coste en existencias** que nadie había medido. No lo decide este
documento; lo que sí le corresponde es que la pregunta llegue con el dato.

**Componente:** `albarans-router`, sus dos rutas de borrado. **`peces-router` no interviene**:
quien descuenta al anotar la línea y quien deja de devolver al borrar el albarán son la misma
ruta de albaranes, escribiendo directamente sobre la tabla `peces`. La damnificada es la
**entidad**, no el componente vecino, y por eso `peces-router` sigue fuera del alcance por el
mismo motivo del apartado 2.5.

### Buscados y descartados

Para que conste que la sección no se ha llenado por intuición, tres candidatos que se han
mirado y **no** son riesgo:

- **Que el vehículo actual del albarán haya desaparecido** y la comparación no tenga contra
  qué medir. No puede pasar: `albarans.vehicle_id` es `NOT NULL REFERENCES vehicles(id)` con
  `foreign_keys = ON`, y `vehicles-router` bloquea el borrado de un vehículo con albaranes
  (`vehicles.js:120-124`).
- **Que la regla afecte al movimiento de stock *al guardar la cabecera*.** No lo toca: el stock
  se mueve al añadir y al retirar líneas (`albarans.js:184` y `albarans.js:216`), nunca en el
  `PUT` de la cabecera. AC-003 se cumple por construcción. **Este descarte se mantiene y se
  acota en la revisión 2.1.0**: era correcto para la operación que el evolutivo modifica, y no
  lo era como afirmación general sobre el stock. Por el camino que el evolutivo *fuerza* —borrar
  y rehacer— sí hay pérdida de existencias; eso es RS-07, y por eso deja de estar en esta
  lista.
- **Que cambie el listado de albaranes por cliente.** `GET /api/albarans?client_id=` resuelve
  el cliente con un `JOIN` sobre `vehicles` (`albarans.js:22-25`), igual que la factura. Con
  la regla puesta ese listado deja de poder cambiar solo, que es una mejora, no un riesgo.

---

## 6. Lo no evaluado

Lo que **no** he podido analizar, con su motivo. Nada de esto está declarado como
inexistente: está declarado como no evaluado.

### 6.1 Superficie de API — `DOC-03-API.md` NO EXISTE

**Es la ausencia más importante de este análisis y no la puedo suplir.** `DOC-03` es el
propietario del contrato (`DOC-02` §6) y el documento **no existe**: el proyecto no expone
OpenAPI ni equivalente, y `Q-05` sigue abierta preguntando si se introduce un generador o se
deriva del código.

Lo que esto deja sin medir, en concreto:

- **Quién consume `PUT /api/albarans/:id` además del propio cliente de la SPA.** Sé que
  `albarans-service` lo llama porque lo he leído; **no sé si algo más lo llama**. `DOC-24`
  demuestra que la vía de servicio existe y está usada —A-14 ejecutó contra
  `localhost:3001` sin pasar por la pantalla— y `Q-18` la da por confirmada, lo que
  significa que **hay al menos un consumidor documentado fuera de la interfaz**. Si hay
  scripts, integraciones o herramientas de importación que hagan ese `PUT`, empezarán a
  recibir un rechazo donde antes recibían `200`, y este análisis **no puede enumerarlos**.
- **Qué código de estado corresponde al rechazo nuevo.** `DOC-02` §6 observa la convención
  —`400` validación, `409` conflicto de estado o integridad— pero es una observación de
  hecho, no un contrato publicado. La regla nueva cae entre las dos lecturas posibles y no
  hay documento que arbitre.
- **Si el cambio rompe a algún cliente que dependa de la forma de la respuesta.** No cambia
  el cuerpo del `PUT`, pero eso lo afirmo leyendo el código, no un contrato.

**Lo que sí puedo afirmar sin `DOC-03`:** dentro de este repositorio, el único consumidor del
endpoint es `albarans-service`, y la forma de la petición no cambia. Todo lo que esté fuera
del repositorio queda **fuera de mi alcance de análisis**.

### 6.2 Contexto de Confluence — `I-02 READ` no disponible

No ha estado disponible en esta ejecución. Es la entrada que más habría cambiado el análisis
en un punto concreto: **si existiera una decisión de negocio anterior sobre el cambio de
propietario de un vehículo** —el escenario de `PD-002`, vender un coche con trabajo pendiente
de facturar—, cambiaría si esa puerta es un hueco o un comportamiento querido. `DOC-08`
declara `PD-002` como pregunta nueva para negocio precisamente porque tampoco tuvo esa
entrada. Queda sin consultar.

### 6.3 Grafo calculado — `DOC-21-GRAPH.json` no existe

El cierre transitivo es **manual sobre las 58 aristas de `DOC-02`**, con las limitaciones y
el criterio de corte del apartado 2.2 y las tres aristas ausentes del 2.3. Un grafo calculado
por S-08 —con granularidad de endpoint, que es lo que aquí falta— podría encontrar
dependencias que un recorrido a mano no ve. No afirmo que el alcance del apartado 2.4 sea
exhaustivo: afirmo que es el que se sostiene con la evidencia disponible.

### 6.4 Rendimiento, concurrencia y seguridad

- **Concurrencia:** no evaluada, y hay motivo para nombrarla. `Q-03` de `DOC-02` está abierta
  sobre `generateNumero`, y la comprobación nueva es un `SELECT` seguido de un `UPDATE` sin
  transacción: en un sistema de un solo puesto es irrelevante, y en otro no lo sería. `DOC-02`
  §8 confirma el uso monopuesto pero `Q-03` sigue sin cerrarse.
- **Rendimiento:** no evaluado en profundidad; una consulta más por guardado sobre SQLite
  local con volumen de taller no da para análisis.
- **Seguridad y permisos:** no aplica y está descartado en origen. La aplicación tiene un
  único actor sin autenticación (`ACT-01`), y `DOC-08` §5.7 excluye expresamente cualquier
  excepción por perfil.

### 6.5 Lo que este documento no hace por contrato

No estimo —`effort_signal` es una señal de tamaño, no horas ni puntos, y es de A-08 traducirla—;
no decido si el cambio se hace; no diseño la solución, que es de S-04; y no toco `DOC-04` ni
`DOC-05`, solo señalo lo que quedará desactualizado (3.5).

**Una nota de contrato, por ser la primera ejecución de esta pieza en el proyecto.** El
contrato de A-07 da por supuesto que se puede calcular un cierre transitivo sobre el grafo de
`DOC-02` y cortar a tres saltos. En este proyecto ese supuesto **no se sostiene tal cual**: el
grafo tiene dos nodos concentradores (`api-client → server-app` y `db-connection`) que
conectan todo con todo en dos o tres saltos, de modo que el límite de tres saltos no acota
nada. He tenido que sustituir el criterio de distancia por un criterio de razón nombrada
(apartado 2.2). Lo declaro porque **el resultado no es comparable con un cierre transitivo
ciego** y porque, si esto se repite en otros proyectos con frontera HTTP, conviene que el
contrato lo prevea en lugar de dejar que cada ejecución lo resuelva a su manera.

### 6.6 Procedencia · qué se verificó en la revisión 2.1.0 y qué se reporta a otros

Este apartado existe porque el dato de procedencia vive en el front-matter y **su
justificación, no**. Lo que se comprobó al resincronizar:

**Las entradas de `inputs`, una a una, versión declarada contra versión real y hash declarado
contra hash calculado.** Tres llevaban un hash desfasado **sin cambio de versión**, que es
justamente el fallo que `S-16` no puede ver —compara números, y el número no se había movido—.
La cuarta fila de la tabla no tenía problema y se incluye por el aviso de método que arrastra:

| Entrada | Versión | Qué pasó | Efecto en este documento |
|---|---|---|---|
| `DOC-08-…-client.md` | 2.2.0, correcta | El commit `c71c580` cambió dentro del fichero la ruta `specs/06-…` por `specs/SPE-06-…` | Ninguno. Verificado en el diff: solo la cadena de la ruta |
| `DOC-02-TECNICA.md` | 1.1.0, correcta | El mismo `c71c580` cambió dos rutas de spec en su §9 | Ninguno. El bloque `graph`, del que cuelga todo el apartado 2, no se toca |
| `DOC-05-PLAN-PRUEBAS.md` | 1.6.0, correcta | Resello de procedencia de A-03 contra `DOC-23` 2.2.0 (`7f2000f`) | Ninguno sobre el bloque `testcases`. Lo que sí estaba desfasado era el **cuerpo** de este documento, que seguía leyendo la 1.5.0 (ver §3) |
| `DOC-07-MATRIZ.csv` | 1.7.0 | Sin cambios: hash idéntico al declarado | Ninguno. **Aviso de método:** el CSV no lleva versión propia —es un fichero de datos sin front-matter—, así que ese `1.7.0` es la versión de `DOC-07` en la que su contenido cambió por última vez, y **lo que de verdad identifica la entrada es el hash**. `S-16` no puede comparar semver sobre ella con fiabilidad; se compara por hash |

**Las demás coinciden.** `DOC-04-FUNCIONAL.md` 1.2.0, `DOC-14-EXPLORATORIO.md` 2.1.0,
`DOC-23-INFORME.md` 2.2.0 y `DOC-24-BUGS.json` 1.0.0 declaran la versión que llevan y el hash
que se calcula sobre el fichero. `DOC-07-TRAZABILIDAD.md` es la que disparó esta revisión y
pasa de 1.9.0 a 1.10.0. Las tres entradas con `present: false` —`DOC-03-API.md`,
`DOC-21-GRAPH.json` y el contexto de Confluence— se han vuelto a comprobar y siguen sin
existir; el apartado 6 sigue siendo válido palabra por palabra.

**Dos entradas que faltaban y ahora se declaran.** `specs/SPE-06-albara-canvi-client.md`, que
es la versión viva de la especificación desde la migración (se declara con `spec_status`, no
con `version`: los `specs/*.md` no llevan semver), y `DOC-27-INFORME-API.md` 1.0.0, del que
esta revisión cita contenido —los `TCS-nnn` y su resultado— y que por tanto tiene que quedar
bajo el control de obsolescencia de `S-16`. `DOC-08` se conserva como entrada porque es el
registro histórico del que salieron los criterios de aceptación que este análisis numera.

**Lo que se reporta y no se toca**, porque son documentos de otros:

- **`DOC-02` 1.1.0 §9 dice «no hay ninguna prueba automatizada, cobertura 0%».** Hoy induce a
  error: existen `automation/ui/` (102 casos, `DOC-23`) y `automation/api/` (4 casos,
  `DOC-27`). Es de **S-01**. Este documento dejó de apoyarse en ese dato en la revisión 2.1.0;
  donde lo citaba —§1 y RS-04— ahora cita las suites reales.
- **`DOC-24` 1.0.0 declara `BUG-002` con `reachable_from_ui: true` y `probable_cause` en
  `albarans.js:76-103` «no compara su `client_id`».** Esa causa dejó de ser cierta en
  `ed61c24`: la comparación está escrita. Es de **A-14**.
- **La mitad de servidor de `EVO-001` está en el tronco y el spec sigue `Approved`** (nota de
  estado del código, al principio). No es de A-07 decidir cómo se registra eso.

---

## 7. Bloque estructurado

```yaml impacto
version: 1
evolutivo: EVO-001
project: app-taller
generated_by: A-07
status: draft

code_state_at_revision:                # nuevo en 2.1.0; verificado en HEAD b5284b4
  server_half: implementada
  where: server/routes/albarans.js:95-104 (409 'No es pot canviar el vehicle a un que pertany a un altre client')
  since: ed61c24 (2026-08-21), fuera del flujo /spec -> /spec-impl
  client_half: no implementada          # AlbaraForm.tsx:35 sigue con vehiclesService.list(), sin filtro
  criteria_covered_by_trunk: [AC-002, AC-004, AC-006, AC-007, AC-009]
  criteria_pending: [AC-010, AC-011]
  spec_status: Approved                 # specs/SPE-06, no esta en specs/implemented/
  bug_status: BUG-002 declarado abierto en DOC-24 1.0.0, con una probable_cause que ya no es cierta
  note: >-
    el cuerpo de este documento sigue redactado como analisis previo a la implantacion. Que
    SPE-06 se de por implementado en parte, se reabra o se separe del arreglo de ed61c24 NO es
    decision de A-07; hasta que se decida, este bloque es el aviso

entry_point:
  requirements: [REQ-040, REQ-046]
  components: [albarans-router, albarans-pages]
  method: >-
    recorrido manual sobre las 58 aristas del bloque `graph` de DOC-02, sin DOC-21-GRAPH.json.
    Dos nodos concentradores (api-client->server-app y db-connection) se atraviesan solo con
    razon nombrada; ver apartado 2.2. Ningun componente supera los 2 saltos

components_affected:
  - id: albarans-router
    distance: 0
    effect: breaks
    note: PUT /:id, server/routes/albarans.js:76-103. Aqui viven AC-002, AC-004, AC-006, AC-007 y AC-009
  - id: albarans-pages
    distance: 0
    effect: breaks
    note: AlbaraForm.tsx:34-36 y 53-64. Aqui viven AC-010 y AC-011
  - id: vehicles-router
    distance: 1
    effect: review
    note: >-
      no necesita cambios (GET /api/vehicles?client_id= ya filtra, vehicles.js:6-14), pero es el
      fichero donde vive la otra puerta de PD-002 (vehicles.js:65-112)
  - id: vehicles-service
    distance: 1
    effect: review
    note: listByClient() ya existe (vehicles.ts:6). Arista albarans-pages->vehicles-service ausente de DOC-02
  - id: albarans-service
    distance: 1
    effect: review
    note: envoltorio tipado; update() no cambia de firma
  - id: shared-components
    distance: 1
    effect: review
    note: >-
      EntityForm renderiza el select y lo comparten los siete modulos. Arista
      albarans-pages->shared-components ausente de DOC-02
  - id: factures-router
    distance: 1
    effect: behaviour
    note: >-
      cero lineas cambian y su garantia si. factures.js:72-78 resuelve el cliente desde el
      vehiculo al emitir; REQ-046 pasa a significar lo que su enunciado dice. Ver RS-02
  - id: db-connection
    distance: 1
    effect: review
    note: un SELECT mas por guardado; sin cambio de esquema
  - id: server-app
    distance: 1
    effect: review
    note: solo monta el router
  - id: db-numbering
    distance: 1
    effect: review
    note: revisado y descartado; solo interviene en el POST de creacion, fuera de alcance
  - id: api-client
    distance: 2
    effect: review
    note: transporta el mensaje de rechazo nuevo dentro de ApiError; no cambia
  - id: factures-pages
    distance: 2
    effect: review
    note: >-
      no cambia. Es el precedente vivo del patron de doble proteccion: FacturaForm.tsx:28-34
      filtra por cliente y deja TC-064 sin vector desde la interfaz
  - id: db-seed
    distance: 2
    effect: review
    note: >-
      un vehiculo por cliente (seed.js:33-39). AC-001 no es reproducible y AC-010 es
      indistinguible de AC-011 sobre estos datos
  - id: i18n
    distance: 2
    effect: review
    note: literales de pantalla si el filtro los necesita; el mensaje del servidor no pasa por aqui

components_excluded:
  - reason: solo alcanzables atravesando la arista agregada api-client->server-app
    ids: [clients-pages, peces-pages, personal-pages, nomines-pages, vehicles-pages, clients-service, peces-service, personal-service, nomines-service, factures-service]
  - reason: solo alcanzables atravesando el concentrador db-connection
    ids: [clients-router, peces-router, personal-router, nomines-router, db-migrate]
  - reason: marco de la SPA, sin relacion con la regla
    ids: [client-main, client-app, layout, use-theme]

graph_edges_missing_in_doc02:
  owner: S-01
  note: no las corrige este documento; se declaran porque el alcance del cliente se apoya en dos de ellas
  edges:
    - from: albarans-pages
      to: vehicles-service
      type: calls
      evidence: client/src/pages/albarans/AlbaraForm.tsx:9
    - from: albarans-pages
      to: shared-components
      type: imports
      evidence: client/src/pages/albarans/AlbaraForm.tsx:5-7
    - from: factures-pages
      to: albarans-service
      type: calls
      evidence: client/src/pages/factures/FacturaForm.tsx:7

requirements_affected:
  - id: REQ-040
    effect: contradicted
    test_cases: [TC-055]
    test_cases_path: [ui]
    note: >-
      contradicho en parte: fecha y notas no se tocan. TC-055 ejercita AC-001 y sus pasos siguen
      siendo validos; lo que queda desactualizado es el enunciado del requisito. No existe caso
      del lado negativo
  - id: REQ-046
    effect: modified
    test_cases: [TC-064]
    test_cases_path: [service]          # corregido en 2.1.0; era `ui` hasta DOC-05 1.6.0
    note: >-
      reforzado, no contradicho. Verificado en factures.js:72-78. La ceguera era doble y ahora es
      simple: TC-064 se reclasifico a `service` (DOC-05 1.6.0, a raiz de A-05-11a) y DOC-27 1.0.0
      lo ejecuto en verde (TCS008/TCS009/TCS010), pero el sistema sigue sin detectar el albaran
      movido, que es la mitad que solo cierra EVO-001
  - id: REQ-042
    effect: review
    test_cases: [TC-057, TC-058, TC-059]
    test_cases_path: [ui]
    note: AC-006 exige que el bloqueo por facturado siga mandando antes
  - id: REQ-027
    effect: review
    test_cases: [TC-036]
    test_cases_path: [ui]
    note: AC-009 exige distinguir el motivo. TC-036 cubre la apertura (POST), no la modificacion
  - id: REQ-041
    effect: review
    test_cases: [TC-056]
    test_cases_path: [ui]
    note: >-
      unica salida del usuario que ya se equivoco; PD-003 abierta. En 2.1.0 gana peso: A-05-15
      (DOC-07 1.10.0) verifica que ese camino no devuelve el estoc de las lineas de pieza, de modo
      que la salida que EVO-001 fuerza tiene un coste que PD-003 no habia medido. Ver RS-07
  - id: REQ-015
    effect: review
    test_cases: [TC-021]
    test_cases_path: [ui]
    note: la otra puerta de la misma fuga (PD-002), en vehicles.js:65-112. Fuera de alcance por DOC-08
  - id: REQ-011
    effect: review
    test_cases: []
    note: la regla nueva se apoya en que todo vehiculo tiene cliente

coverage_note:
  source: DOC-05-PLAN-PRUEBAS.md
  version_read: 1.6.0                   # corregido en 2.1.0: el cuerpo seguia leyendo la 1.5.0
  read_hot: false                       # 1.6.0 esta estable; ya no hace falta la cautela de 2.0.x
  caveat: >-
    la traza REQ->TC se contrasta contra DOC-07-MATRIZ.csv, que en DOC-07 1.10.0 vuelve a salir
    byte a byte identica (md5 087a0377..., octava vez consecutiva)
  paths: {ui: 106, service: 4, total: 110}
  service_cases: [TC-041, TC-045, TC-063, TC-064]
  execution_evidence:
    ui: DOC-23 2.2.0 (102 casos, automation/ui/)
    service: DOC-27 1.0.0 (4 casos, 10 TCS-nnn en verde, automation/api/)
    published_total: 106 de 110         # antes de DOC-27 eran 102
  finding: >-
    de los seis requisitos del alcance que tienen caso, cinco siguen con cobertura integramente
    `ui`; REQ-046 salio de ahi en DOC-05 1.6.0. Seis de los once criterios de EVO-001 solo son
    ejercitables por servicio y NINGUNO de los cuatro casos `service` existentes toca el PUT de
    albaranes: la cobertura sigue siendo ciega a ellos, pero ya existe la suite donde ponerlos
    (automation/api/), que en 2.0.x no existia

data_model:
  entities: [Albara, Vehicle, Client, Factura, Peca]   # Peca entra en 2.1.0 por RS-07, no por la regla
  migration_required: false
  existing_data_at_risk: false
  future_data_drift:                    # nuevo en 2.1.0: no es dato existente invalido, es deriva hacia delante
    entity: Peca
    field: peces.estoc
    cause: >-
      EVO-001 convierte "borrar y rehacer" en la unica correccion posible y DELETE /api/albarans/:id
      no devuelve el estoc de las lineas de pieza (albarans.js:116-132 frente a 197-224)
    effect: cada correccion descuenta dos veces las mismas piezas, sin error ni traza
    ref: RS-07
  reason: >-
    la regla restringe una transicion, no un estado: ninguna fila almacenada puede violarla y no
    hay nada que rellenar. El client_id ya esta en vehicles y albarans no lo materializa
  existing_bad_data:
    present: true
    records: ["albarans.id = 5", "factures.numero = 2026/F-0002"]   # filas de datos, no componentes
    valid_under_new_rule: true
    note: >-
      incorrectos de negocio y coherentes de esquema. Corregirlos esta fuera de alcance
      (DOC-08 5.3) y hoy es imposible desde la aplicacion (BUG-004)
  design_fork:
    condition: si el diseno materializara client_id en albarans
    consequence: migracion, relleno de todas las filas y el albaran 5 con un cliente contradictorio
    owner: S-04
  fixtures:
    component: db-seed
    problem: un vehiculo por cliente (seed.js:33-39)
    blocks: [AC-001, AC-010]
    note: DS-004 y DS-005 suponen un cliente con dos vehiculos que el seed no proporciona

silent_risks:
  - id: RS-01
    description: >-
      la misma regla implementada dos veces (filtro de pantalla y comprobacion al guardar). Si se
      pudre el filtro, el fallo es visible y el dinero esta a salvo; si se pudre la comprobacion,
      nada falla y la factura sale al cliente equivocado. El precedente YA OCURRIO en este
      repositorio con REQ-046 y no lo detecto ninguna ejecucion: lo detecto A-05 leyendo el
      codigo (A-05-11a). Sigue sin haber un solo caso que ejerza el PUT de albaranes por servicio
    component: albarans-router
    also: [albarans-pages, factures-router, factures-pages]
    severity: alto
    precedent_status: cerrado           # DOC-05 1.6.0 reclasifico TC-064 a service; DOC-27 1.0.0 lo ejecuto en verde
    evidence: [DOC-08 4.2, FacturaForm.tsx:28-34, DOC-07 1.10.0 3.11 (A-05-11a), DOC-27 1.0.0 TCS008-TCS010, DOC-05 6.5]
  - id: RS-02
    description: >-
      factures-router cambia de garantia sin cambiar de codigo y sin aparecer en el diff. Hoy su
      comprobacion de REQ-046 no detecta el albaran movido y ademas escribe con ese cliente el
      destinatario de la factura
    component: factures-router
    severity: alto
    evidence: factures.js:72-78
  - id: RS-03
    description: >-
      AlbaraForm sirve para alta y edicion; tras el cambio el mismo desplegable filtra al editar y
      no al crear, sin error en ninguno de los dos casos. Unificarlo en cualquier direccion rompe
      algo en silencio
    component: albarans-pages
    severity: medio
    evidence: AlbaraForm.tsx:22,28,34-36
  - id: RS-04
    description: >-
      si la comprobacion nueva se coloca fuera de orden, el rechazo sigue siendo correcto y el
      motivo pasa a ser el equivocado, incumpliendo AC-006 y AC-009 sin producir ningun error.
      Nada lo vigila: ninguno de los 110 casos ejerce el PUT de albaranes por servicio, que es la
      unica via que distingue un motivo de otro, y los literales de aviso no estan documentados en
      ningun requisito. En el tronco (ed61c24) la comprobacion quedo la ultima de las cuatro, que
      es el orden que AC-006 y AC-009 exigen; el riesgo es que alguien la mueva
    component: albarans-router
    severity: medio
    evidence: [albarans.js:95-104, DOC-05 1.6.0 (ningun caso `service` toca el PUT de albaranes), notas de automatizacion de DOC-05 sobre literales de aviso no documentados]
  - id: RS-05
    description: >-
      la atomicidad que exige AC-004 se cumple hoy por accidente estructural: el guardado es un
      unico UPDATE sin transaccion. El dia que deje de serlo, AC-004 se rompe sin que ningun caso
      de pantalla lo note
    component: albarans-router
    severity: bajo
    evidence: albarans.js:95-99
  - id: RS-06
    description: >-
      el mensaje de rechazo nuevo saldra en catalan en una interfaz en castellano (los errores del
      servidor no pasan por i18n) y se pintara bajo el campo de vehiculo sea cual sea su motivo
    component: albarans-pages
    also: [api-client, i18n]
    severity: bajo
    evidence: [albarans.js:82,87,92, AlbaraForm.tsx:93-95, DOC-02 seccion 6]

  - id: RS-07
    description: >-
      EVO-001 deja "borrar y rehacer" como unica correccion posible (REQ-041, PD-003) y ese camino
      no devuelve al catalogo el estoc de las lineas de pieza: DELETE /api/albarans/:id borra las
      lineas sin UPDATE peces (albarans.js:116-132), a diferencia del borrado de una linea suelta
      (197-224). Cada correccion descuenta dos veces las mismas piezas. No hay error, no hay traza,
      y el sintoma aparece semanas despues como "Estoc insuficient" o un inventario descuadrado
    component: albarans-router
    entity_at_risk: peces.estoc
    severity: medio
    new_in: 2.1.0
    origin: A-05-15 (DOC-07 1.10.0 3.15), a su vez desde DOC-27 1.0.0 4.1; verificado aqui en el codigo
    governance: >-
      ningun requisito decide si esto esta bien (REQ-039 habla de la linea suelta, REQ-041 del
      albaran) y TC-056 esta en verde sin mirar el estoc ni declarar peces.estoc en `touches`.
      La decision es de producto/A-02, no de A-07; lo que aporta este documento es que PD-003
      deja de ser una pregunta de comodidad y pasa a tener coste en existencias

risks_ruled_out:
  - vehiculo actual inexistente: imposible por FK NOT NULL y bloqueo de borrado en vehicles.js:120-124
  - movimiento de stock al guardar la cabecera: >-
      solo ocurre al anadir o retirar lineas (albarans.js:184 y 216), nunca en el PUT. AC-003 se
      cumple por construccion. ACOTADO EN 2.1.0 - el descarte vale para la operacion que el
      evolutivo modifica, no para el camino que el evolutivo fuerza, que es RS-07
  - listado de albaranes por cliente: deja de poder cambiar solo, que es mejora y no riesgo

not_evaluated:
  - area: api_surface
    reason: DOC-03 no existe. El proyecto no expone OpenAPI (DOC-02 seccion 6, Q-05 abierta)
    consequence: >-
      no se puede enumerar quien consume PUT /api/albarans/:id fuera de este repositorio. DOC-24 y
      Q-18 confirman que la via de servicio existe y esta usada, de modo que hay al menos un
      consumidor documentado fuera de la interfaz. Tampoco hay contrato que arbitre el codigo de
      estado del rechazo nuevo
    declared_as: no evaluado, NO como inexistente
  - area: contexto_de_negocio
    reason: I-02 READ no disponible en esta ejecucion
    consequence: >-
      no se ha podido comprobar si existe una decision anterior sobre el cambio de propietario de
      un vehiculo, que es el escenario de PD-002
  - area: cierre_transitivo_calculado
    reason: DOC-21-GRAPH.json no existe
    consequence: recorrido manual; el alcance es el que sostiene la evidencia, no necesariamente exhaustivo
  - area: concurrencia
    reason: Q-03 de DOC-02 sigue abierta y el uso monopuesto la hace poco relevante hoy
  - area: seguridad_y_permisos
    reason: no aplica; actor unico sin autenticacion (ACT-01) y excepciones por perfil excluidas en DOC-08 5.7

out_of_scope_confirmed:
  - id: PD-002
    what: cambio de propietario de un vehiculo con albaranes pendientes (REQ-015)
    where: server/routes/vehicles.js:65-112, UPDATE de la linea 93 sin comprobacion de albaranes
    component: vehicles-router
    distance_from_entry: 1
    note: >-
      fuera de alcance por decision de A-06. Consta aqui porque el componente es el vecino
      inmediato del que se toca y el acoplamiento necesario ya existe en el mismo fichero
      (vehicles.js:120-124). Con EVO-001 implementado, la frase "un albaran ya no puede cambiar
      de cliente" sera cierta solo por la puerta del albaran

documents_left_stale:
  - {doc: DOC-04-FUNCIONAL.md, owner: A-02, what: enunciado de REQ-040, cierre de Q-10 y pregunta nueva por PD-002}
  - {doc: DOC-05-PLAN-PRUEBAS.md, owner: A-03, what: enunciado de TC-055 y casos del lado negativo, que nacen por servicio}
  - {doc: DOC-06-MANUAL-USUARIO.md, owner: A-04, what: tarea A.13 seccion 4 linea 528, mas 6.1 y 6.2}
  - {doc: DOC-07-TRAZABILIDAD, owner: A-05, what: filas de REQ-040 y REQ-046 y el estado Correcto de REQ-040}
  - {doc: DOC-02-TECNICA.md, owner: S-01, what: las tres aristas ausentes del grafo}

reported_to_owners:                     # nuevo en 2.1.0; hallazgos sobre documentos ajenos, NO corregidos aqui
  - doc: DOC-02-TECNICA.md
    owner: S-01
    finding: >-
      1.1.0 seccion 9 declara "no hay ninguna prueba automatizada, cobertura 0%". Hoy existen
      automation/ui (102 casos, DOC-23) y automation/api (4 casos, DOC-27). Este documento dejo de
      apoyarse en ese dato en 2.1.0
  - doc: DOC-24-BUGS.json
    owner: A-14
    finding: >-
      BUG-002 sigue declarado con probable_cause "albarans.js:76-103 valida que el vehiculo exista,
      pero no compara su client_id": esa comparacion existe desde ed61c24 (albarans.js:95-104)
  - doc: specs/SPE-06-albara-canvi-client.md
    owner: /spec, /spec-impl y la persona que aprueba
    finding: >-
      estado Approved y fuera de specs/implemented/, con la mitad de servidor ya en el tronco. No
      es de A-07 decidir como se registra

ids_minted: []
ids_note: A-07 no acuna identificadores. Los RS-nn son locales de este documento y no van a registro-ids.json

effort_signal: medium
effort_signal_changed_in: 2.1.0   # mismo valor, razones distintas
effort_signal_reason: >-
  el codigo por si solo seria small, y de hecho la mitad ya esta escrita: la comprobacion de
  servidor esta en el tronco desde ed61c24 (albarans.js:95-104) y lo que falta es el filtro del
  desplegable en AlbaraForm.tsx, apoyado en un listByClient y un endpoint con filtro que YA
  EXISTEN. Lo que sostiene la senal en medium no es la implementacion, es lo que hay que hacer
  para creersela, y en 2.1.0 el reparto cambia. Baja de peso el argumento de infraestructura: ya
  no es cierto que el proyecto tenga cobertura 0% ni un unico precedente de servicio - hay dos
  suites reales (automation/ui con 102 casos y automation/api con 4, esta ultima con informe
  propio en DOC-27), asi que los casos de servicio de AC-002/AC-004/AC-007/AC-009 tienen donde
  nacer y quien publique su resultado. Siguen en pie, y son la razon de que no baje a small:
  ninguno de los 110 casos ejerce hoy el PUT de albaranes por servicio, los datos de ejemplo no
  permiten reproducir AC-001 ni distinguir AC-010 de AC-011, la proteccion queda partida en dos
  componentes con un precedente propio de que ese patron ya divergio, y aparece un frente que
  2.0.x no tenia: RS-07 obliga a decidir que se hace con el estoc que pierde "borrar y rehacer"
  (PD-003), que es trabajo de producto antes que de codigo. NO ES UNA ESTIMACION: es una senal de
  tamano para A-08, que es quien estima
```

---

**Nota de cierre (actualizada en 2.1.0).** La versión original de este análisis se escribió
sobre un `DOC-08` cuyo `gate` estaba `pending`. **Ya no lo está**: `gate.status: approved`,
`approved_at: 2026-08-23`, «aprobado tras revisar el resumen de la 2.2.0: el comportamiento
pedido, los once criterios y las dos decisiones pendientes no bloqueantes (PD-002, PD-003)», y
la especificación viva es `specs/SPE-06-albara-canvi-client.md` en estado `Approved`. La
salvedad que sigue viva es la otra: si `PD-001` se revisara, AC-010 y AC-011 desaparecerían y
con ellos la mitad del alcance del cliente y el riesgo RS-01 en su forma actual — con el matiz
de que esa mitad es, hoy, **la única que falta por implementar** (nota de estado del código).
`PD-002` y `PD-003` siguen abiertas, y `PD-003` ha ganado un dato que no tenía: RS-07.
