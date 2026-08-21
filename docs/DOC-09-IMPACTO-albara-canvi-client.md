---
doc_id: DOC-09
doc_name: DOC-09-IMPACTO-albara-canvi-client
version: 1.0.0
status: draft
generator: A-07 analisis de impacto
generator_version: "1.0"
generated_at: 2026-08-17T09:05:00+02:00
language: es
project: app-taller
evolutivo_id: EVO-001
history_document: docs/DOC-09-IMPACTO-albara-canvi-client-HIST.md
history_note: >-
  este documento no lleva historial de cambios: refleja solo el estado actual, con su version en
  este front-matter. Si hay versiones futuras, que cambio y por que ira en el fichero -HIST.md,
  que declara ademas la version del documento que acompana
source:
  repo_path: C:\Claude\appdani
  vcs: git
  branch: master
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  working_tree_clean: false   # sin versionar: docs/, automation/ y registro-ids.json
inputs:
  - id: DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md
    from: A-06
    version: 2.0.0
    hash: sha256:5f46a07a585dbdb991bb5c42f66bec909d43bfe062fbb5c4fb4b0ad1eb3c2634
    present: true
    usage: >-
      punto de entrada. affects_requirements [REQ-040, REQ-046], contradicts [REQ-040], los once
      criterios de aceptacion con su verification_path, el apartado 5 (fuera de alcance) y PD-002
  - id: DOC-02-TECNICA.md
    from: S-01
    version: 1.0.0
    hash: sha256:735feb13b7b0774ca1b370a8d1659ee9c7d145f6d8a52f35dc486491953bd7f1
    present: true
    usage: >-
      bloque `graph` (33 componentes, 58 aristas), apartado 4 de acoplamientos entre modulos y
      apartado 5 de modelo de datos. Es el punto de partida del alcance tecnico
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.2.0
    hash: sha256:7d1844156487a62b8936a0d2164ebec043eb7fdb7043d27afdd649316f9b63a0
    present: true
    usage: >-
      enunciados y modulo de REQ-040, REQ-046, REQ-042, REQ-041, REQ-027, REQ-011 y REQ-015.
      Hash identico al que declara DOC-08: no ha cambiado entre las dos lecturas
  - id: DOC-03-API.md
    from: S-03
    present: false
    hash: null
    note: >-
      NO EXISTE. El proyecto no expone OpenAPI (DOC-02 apartado 6, Q-05). El impacto sobre la
      superficie de API queda DECLARADO COMO NO EVALUADO, no como inexistente. Ver apartado 6
  - id: DOC-21-GRAPH.json
    from: S-08
    present: false
    hash: null
    note: >-
      no existe. El cierre transitivo se ha hecho a mano sobre las aristas de DOC-02, con tope de
      tres saltos. Ver la nota de metodo del apartado 2
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
    usage: BUG-002 (el defecto confirmado ejecutando) y BUG-004 (por que los datos siguen ahi)
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.5.0
    hash: sha256:3ab6925abc0489c7f178c6d2c94cfade700f961e129b0d0e402a0e24367713fd
    present: true
    volatile: true
    usage: >-
      que casos cuelgan de los requisitos afectados y por que via se ejercen. LEIDO EN CALIENTE:
      A-03 estaba editando el documento durante esta ejecucion. La version 1.5.0 y el hash son
      los del momento de la lectura y pueden haber cambiado ya. Este documento NO toca DOC-05
  - id: DOC-07-MATRIZ.csv
    from: A-05
    hash: sha256:1676546ad1473a6401ab8aaa6010e246f2f4b2ef4693da37c75c305ec540efb3
    present: true
    usage: >-
      fuente estable de la traza REQ -> TC, usada para contrastar lo leido en DOC-05 mientras
      A-03 lo editaba
  - id: codigo-fuente
    from: repositorio
    present: true
    usage: >-
      lectura dirigida para verificar tres cosas que DOC-02 no puede responder por si sola: donde
      se resuelve el cliente al facturar (REQ-046), tres aristas reales que faltan en el grafo, y
      el estado de los datos de ejemplo
  - id: contexto-confluence
    from: I-02
    present: false
    note: >-
      no disponible en esta ejecucion. Si existiera alguna decision de negocio anterior sobre
      cambio de propietario de vehiculo o sobre facturacion cruzada, no se ha podido consultar
consumers:
  - agent: A-08
    doc: DOC-10
    note: estimacion. Lee sobre todo el resumen ejecutivo y effort_signal
  - agent: S-04
    doc: DOC-11
    note: plan de implementacion
  - agent: A-09
    doc: DOC-12
    note: regresion
gate:
  status: pending
  owner: peticionario de negocio
  required: >-
    hereda el gate de DOC-08: la especificacion no esta validada por el peticionario. Este
    analisis mide un borrador y lo dice
---

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
riesgo que ya no existe, y `TC-055` queda apuntando a un requisito reformulado. Lo que hoy
devuelve `200` para un vehículo de otro cliente pasará a rechazarse: eso es exactamente lo
que se pide, y es la única rotura funcional buscada.

**Cuál es el riesgo mayor.** La regla queda implementada **dos veces en dos componentes
distintos** —el filtro del desplegable en `albarans-pages` y la comprobación al guardar en
`albarans-router`— y **el proyecto ya tiene ese patrón funcionando mal en el módulo vecino**:
`REQ-046` se comprueba en `factures-router` y su único caso de prueba, `TC-064`, declara
`verification_path: ui` cuando el formulario de emisión hace imposible componer ese intento
desde la pantalla. Es decir: la divergencia que A-06 anticipó como riesgo futuro **ya ha
ocurrido una vez en este mismo repositorio**, con un caso de prueba que cree cubrir una
comprobación que no puede alcanzar. Ver apartado 5.

**Dos cosas más que A-08 necesita saber antes de estimar.** Primera: seis de los once
criterios exigen la vía de servicio y el plan de pruebas tiene hoy **109 casos de 110 por
interfaz** y un único precedente de servicio (`TC-041`); el proyecto no tiene ninguna
prueba automatizada (DOC-02 §9, cobertura 0%). Segunda: los datos de ejemplo
(`server/db/seed.js`) dan **un vehículo por cliente**, de modo que ni AC-001 ni AC-010 son
reproducibles sin ampliarlos. El código es pequeño; comprobarlo no lo es.

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
| `albarans-router` | 0 | breaks | directo | `PUT /:id` gana una comprobación entre las líneas 90-95. Hoy lee el vehículo nuevo con `SELECT id FROM vehicles WHERE id = ?` (solo `id`): necesita también su `client_id` y el del vehículo actual. Es el componente que protege el dinero |
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

**Aviso sobre `DOC-05`.** Lo leí mientras `A-03 · Plan de pruebas` lo estaba editando: pasó
de 1.4.1 a **1.5.0** durante esta ejecución. **No me fío de su número de versión** y lo digo:
todo lo que cito de él lleva la fecha de lectura, y he contrastado la traza `REQ → TC` contra
`DOC-07-MATRIZ.csv`, que no estaba en edición. Este documento **no toca DOC-05**.

**Lo que 1.5.0 aporta y antes no existía:** los 110 casos declaran `verification_path`,
**109 `ui` y uno solo `service`** (`TC-041`). Es información nueva y es determinante para el
impacto, porque permite decir algo que hasta ahora no se podía: **un requisito cuya cobertura
entera sea de pantalla queda ciego ante un cambio que solo se puede provocar por servicio.**
Los seis requisitos de este apartado están, sin excepción, en esa situación.

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

### 3.2 El requisito que se refuerza

| | |
|---|---|
| **REQ-046** | «El sistema exige que todos los albaranes de una misma factura pertenezcan al mismo cliente.» (módulo `factures`, `critical`, ancla `BR-FAC-03`) |
| Efecto | **`modified`** — ampliado en su alcance real, **no contradicho** |
| Casos | `TC-064` · `Critical`, `Negative`, `verification_path: ui` |

**A-06 tiene razón y lo he verificado en el código.** El detalle está en RS-02; en corto: la
comprobación de `factures.js:72-77` resuelve el cliente atravesando el vehículo **en el
momento de emitir**, de modo que un albarán ya movido llega con el cliente nuevo y la regla
lo da por bueno. La línea inmediatamente siguiente usa ese mismo cliente como destinatario
de la factura. La comprobación de `REQ-046` es, hoy, la que escribe a quién se cobra.

**¿Cambia esto mi análisis? Sí, en dos cosas.**

1. `REQ-046` **no requiere ni una línea de código**, y aun así su garantía cambia. Por eso
   `factures-router` va marcado `behaviour` y no `review` en el apartado 2.4: es el único
   componente del alcance que cambia de significado sin cambiar de contenido.
2. **La ceguera de `REQ-046` es doble, no simple.** No solo no detecta el albarán movido:
   su único caso, `TC-064`, declara `verification_path: ui` y **no puede ejecutarse por la
   interfaz**, porque `FacturaForm` obliga a elegir cliente antes de listar albaranes. Así
   que hoy `REQ-046` no lo comprueba ni el sistema en el caso que importa ni el plan por la
   vía que declara. Esto es un hallazgo sobre el estado actual, **no un efecto de
   `EVO-001`**, y su dueño es A-03; queda señalado, no corregido.

### 3.3 Requisitos que hay que revisar, no cambiar

| REQ | Enunciado (DOC-04 1.2.0) | Efecto | Casos y vía | Por qué está |
|---|---|---|---|---|
| **REQ-042** | «El sistema impide modificar, borrar o alterar las líneas de un albarán que ya ha sido facturado.» | `review` | `TC-057`, `TC-058`, `TC-059` — las tres `ui` | AC-006 exige que **siga mandando antes**: sobre un albarán facturado el rechazo debe seguir siendo «ya está facturado». Los tres casos cubren el intento desde pantalla; el intento con vehículo de otro cliente **no es alcanzable desde ninguno de ellos** |
| **REQ-027** | «Todo albarán queda asociado a un vehículo que ya existe en el sistema.» (`BR-ALB-01`) | `review` | `TC-036` · `ui` | AC-009 exige que el motivo «el vehículo no existe» siga distinguiéndose del motivo nuevo. Ojo: `TC-036` comprueba la **apertura** de un albarán (`POST`), no la modificación; el vector de AC-009 vive en el `PUT` y **no lo toca ningún caso** |
| **REQ-041** | «El sistema permite borrar un albarán no facturado junto con todas sus líneas, previa confirmación del usuario.» | `review` | `TC-056` · `ui` | Es la única salida que le queda al usuario que ya se equivocó: borrar y rehacer (`PD-003`, abierta). El caso no cambia; lo que cambia es cuánto se va a usar ese camino |
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
| `DOC-07-TRAZABILIDAD` / `DOC-07-MATRIZ.csv` | Las filas de `REQ-040` y `REQ-046`, y el estado `Correcto` de `REQ-040` con un solo caso positivo | A-05 |
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
comportamiento o su significado. Se han buscado a propósito, y hay seis. Los identificadores
`RS-nn` son **locales de este documento**: no son anclas de `registro-ids.json` y A-07 no
acuña identificadores.

### RS-01 · La misma regla vive en dos componentes, y este repositorio ya tiene el precedente de que eso se pudre

**Qué pasa.** `EVO-001` implementa una sola regla de negocio —«un albarán no cambia de
cliente»— **dos veces y en dos componentes distintos**: el filtro del desplegable en
`albarans-pages` (AC-010) y la comprobación al guardar en `albarans-router` (AC-002). A-06
lo advirtió en `DOC-08` §4.2: el día que divergan, ningún caso que solo mire la pantalla lo
detectará y el síntoma será otra vez una factura al cliente equivocado.

**Lo que añade este análisis: no es una hipótesis de futuro. Ya ha ocurrido, en el módulo
vecino, con esta misma regla de dinero.** `REQ-046` está protegido exactamente igual:

| Capa | Dónde | Qué hace |
|---|---|---|
| Pantalla | `FacturaForm.tsx:28-34` | El usuario elige **primero** el cliente; la lista de albaranes se pide con `albaransService.listByClient(clientId, 'pendent')`. Las casillas que se pintan (`FacturaForm.tsx:105-118`) **solo pueden ser de ese cliente** |
| Servidor | `factures.js:72-77` | Reúne los `client_id` de los vehículos de los albaranes recibidos en un `Set` y rechaza si `size > 1` |

Y el caso de prueba que dice cubrirlo, `TC-064` («Rechazar la emisión con albaranes de dos
clientes distintos», `Critical`, `Negative`), declara **`verification_path: ui`** y su primer
paso es *«Iniciar la emisión de una factura incluyendo el albarán pendiente de "Garcia Motors
SL" y el de "Tallers Puig SL"»*. **Ese intento no se puede componer en ese formulario.** El
caso está escrito contra una pantalla que no ofrece el vector.

Es la divergencia en su forma madura: una comprobación de servidor viva, un filtro de
pantalla que la tapa, y un caso de prueba de prioridad `Critical` que cree ejercerla y no
puede. Nadie lo ha notado porque **nada falla**.

**La dirección peligrosa es asimétrica, y conviene decirlo porque no es simétrica en
absoluto:**

- Si se pudre **el filtro** (`albarans-pages` deja de filtrar), el usuario vuelve a ver
  vehículos de otros clientes, los selecciona, y el servidor los rechaza. Es feo y visible.
  **El dinero está a salvo.**
- Si se pudre **la comprobación** (`albarans-router`), la pantalla sigue impecable, el
  usuario no nota nada, y la única puerta que queda abierta es la que usó `BUG-002` —el
  servicio— por la que se emitió una factura de 114.835,05 € al cliente 8. **Nada falla y el
  dinero se va.**

**Y hoy no hay nada que pueda detectar esa segunda pudrición.** `DOC-05` 1.5.0 declara
`verification_path` en sus 110 casos: **109 `ui` y uno solo `service`** (`TC-041`). `Q-18`
quedó **`answered` el 2026-08-17**, en dos mitades: la vía de servicio **existe y está usada**
—evidencia ejecutada, `DOC-24/BUG-003`— y la política de A-03 es que un caso va por servicio
**solo cuando el vector no existe en la interfaz**. Aplicada a `EVO-001`, esa política manda
que AC-002, AC-004, AC-007 y AC-009 nazcan por servicio; pero `DOC-05` §6.5 dice también
que esos casos **nacerán en la regeneración del plan, cuando A-02 haya regenerado DOC-04**.
Entre la implementación y esa regeneración hay una ventana en la que la protección que
guarda el dinero **no tiene ningún caso que la ejerza**. Esa ventana es el riesgo.

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
siempre**. Hoy el `PUT` (`albarans.js:76-99`) comprueba en este orden: existe el albarán
(404) → está facturado (409) → falta `vehicle_id` (400) → el vehículo no existe (400) →
escribe.

Si la comprobación nueva se coloca antes de alguna de esas, **el resultado sigue siendo
correcto** —el cambio se rechaza y el albarán no se mueve— y **el criterio queda incumplido
igualmente**, porque el usuario recibe el motivo equivocado. No hay error, no hay traza, no
hay compilación rota: solo un mensaje que dice una cosa por otra, que es justo lo que AC-009
existe para impedir («dos rechazos con el mismo mensaje son un mensaje inútil»).

Lo que lo hace silencioso de verdad es que **no hay nada que lo mire**: `DOC-02` §9 declara
cobertura 0% y cero ficheros de test, y los literales de los avisos no están documentados
—la nota de automatización de `TC-064` lo dice con todas las letras: *«DOC-04 no documenta
el literal del aviso que el caso espera»*—. El orden de las comprobaciones es, en este
evolutivo, información de comportamiento; no está escrito en ningún requisito y no lo
protege ninguna prueba. *(Dónde colocarla es diseño y es de S-04; aquí solo consta que el
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

### Buscados y descartados

Para que conste que la sección no se ha llenado por intuición, tres candidatos que se han
mirado y **no** son riesgo:

- **Que el vehículo actual del albarán haya desaparecido** y la comparación no tenga contra
  qué medir. No puede pasar: `albarans.vehicle_id` es `NOT NULL REFERENCES vehicles(id)` con
  `foreign_keys = ON`, y `vehicles-router` bloquea el borrado de un vehículo con albaranes
  (`vehicles.js:120-124`).
- **Que la regla afecte al movimiento de stock.** No lo toca: el stock se mueve al añadir y
  retirar líneas (`albarans.js:167-169,199-201`), nunca al guardar la cabecera. AC-003 se
  cumple por construcción.
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

---

## 7. Bloque estructurado

```yaml impacto
version: 1
evolutivo: EVO-001
project: app-taller
generated_by: A-07
status: draft

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
    test_cases_path: [ui]
    note: >-
      reforzado, no contradicho. Verificado en factures.js:72-78. Doble ceguera: el sistema no
      detecta el albaran movido y TC-064 declara via ui sin poder componer el intento en
      FacturaForm
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
    note: unica salida del usuario que ya se equivoco; PD-003 abierta
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
  version_read: 1.5.0
  read_hot: true
  caveat: >-
    A-03 estaba editando el documento durante esta ejecucion; la version y el hash son los del
    momento de la lectura y no son de fiar. La traza REQ->TC se contrasto contra DOC-07-MATRIZ.csv
  paths: {ui: 109, service: 1, total: 110}
  finding: >-
    los siete requisitos del alcance tienen cobertura integramente `ui`. Seis de los once
    criterios de EVO-001 solo son ejercitables por servicio: la cobertura actual es ciega a
    ellos por construccion

data_model:
  entities: [Albara, Vehicle, Client, Factura]
  migration_required: false
  existing_data_at_risk: false
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
      nada falla y la factura sale al cliente equivocado. El precedente ya existe en este
      repositorio con REQ-046, y no hay ningun caso que pueda detectar la divergencia
    component: albarans-router
    also: [albarans-pages, factures-router, factures-pages]
    severity: alto
    evidence: [DOC-08 4.2, FacturaForm.tsx:28-34, TC-064 verification_path ui, DOC-05 6.5]
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
      Nada lo vigila: cobertura automatizada 0% y literales de aviso sin documentar
    component: albarans-router
    severity: medio
    evidence: [albarans.js:76-99, DOC-02 seccion 9, nota de automatizacion de TC-064]
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

risks_ruled_out:
  - vehiculo actual inexistente: imposible por FK NOT NULL y bloqueo de borrado en vehicles.js:120-124
  - movimiento de stock: solo ocurre al anadir o retirar lineas, nunca al guardar la cabecera
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

ids_minted: []
ids_note: A-07 no acuna identificadores. Los RS-nn son locales de este documento y no van a registro-ids.json

effort_signal: medium
effort_signal_reason: >-
  el codigo por si solo seria small y coincide con el scope declarado en DOC-08: dos ficheros, una
  comprobacion en albarans.js entre las lineas 90 y 95, y una llamada distinta en AlbaraForm.tsx
  apoyada en un listByClient y un endpoint con filtro que YA EXISTEN. Lo que empuja la senal a
  medium no es la implementacion, es lo que hay que hacer para creersela: seis de los once
  criterios solo son ejercitables por la via de servicio y el proyecto tiene cobertura
  automatizada 0%, cero frameworks de test y 109 de 110 casos por pantalla; los datos de ejemplo
  no permiten reproducir AC-001 ni distinguir AC-010 de AC-011; y la proteccion queda partida en
  dos componentes con un precedente en el mismo repositorio de que ese patron ya divergio sin que
  nadie lo notara. NO ES UNA ESTIMACION: es una senal de tamano para A-08, que es quien estima
```

---

**Nota de cierre.** Este análisis se ha escrito sobre un `DOC-08` cuyo `gate` sigue
`pending`: el peticionario de negocio no ha validado todavía la especificación. A-07 y A-08
pueden trabajar sobre el borrador —así lo autoriza el propio `DOC-08`—, pero nada de lo
medido aquí es firme hasta esa validación. Si `PD-001` se revisara, AC-010 y AC-011
desaparecerían y con ellos la mitad del alcance del cliente y el riesgo RS-01 en su forma
actual.
