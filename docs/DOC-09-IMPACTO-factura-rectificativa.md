---
doc_id: DOC-09
doc_name: DOC-09-IMPACTO-factura-rectificativa
version: 1.0.0
status: draft
generator: A-07 análisis de impacto
generated_at: 2026-08-30T12:00:00+02:00
preliminary: true
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: d484e535d3525465fae9e111eca6e892ecb4480c
  working_tree_clean: true
inputs:
  - id: descripcion-cruda
    from: /spec (Fase 1)
    present: true
  - id: docs/DOC-02-TECNICA.md
    from: S-01
    version: 1.2.0
    hash: sha256:2c250e67faf056a161cf6fb2fcfe5b24ffbfd29c2d113c5f595b4159db0adfe8
    present: true
  - id: docs/DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
    present: true
  - id: docs/DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.8.0
    hash: sha256:9f6d861682b8c8ec2ce2abd8da8a5d4945b60e49717021d59e3846ac402591b0
    present: true
  - id: docs/DOC-24-BUGS.json
    from: A-14
    version: "1.1.0"
    hash: sha256:33bfb68c4007c9de0a7eaa6addbfc3d0e2fc95cb0ebbf58cdb3d07c33fe8abc7
    present: true
  - id: codigo-fuente
    from: repositorio
    version: d484e53
    hash: git:d484e535d3525465fae9e111eca6e892ecb4480c
    present: true
  - id: docs/DOC-03-API.md
    from: S-03
    present: false
  - id: docs/DOC-21-GRAPH.json
    from: S-08
    present: false
  - id: contexto-confluence
    from: I-02
    present: false
---

> **Nota de pase.** Este documento es un **pase preliminar**: `/spec` lo encarga en su Fase 1,
> antes de la entrevista y antes de que exista `specs/NN-factura-rectificativa.md`. No hay
> bloque `yaml evolutivo` del que leer `affects_requirements` — lo infiero yo, leyendo DOC-04 y
> el código, y lo digo explícitamente en el apartado 3. **Es probable que haga falta un pase
> final** después de la entrevista: el alcance que describe la petición cruda («factura
> rectificativa», «numeración propia», «ambas quedan en el histórico») es exactamente el tipo de
> decisión —qué pasa con los albaranes de la factura anulada— que la entrevista tiene que cerrar
> y que aquí solo puedo dejar planteada en dos ramas (apartado 3.2). Si la entrevista elige una
> rama distinta de la que aquí se trata como más probable, o amplía el alcance más allá de
> `REQ-042`/`REQ-043`/`REQ-047`, hace falta regenerar este análisis con el spec ya `Approved`.

# DOC-09 · Análisis de impacto — `BUG-004` · Factura rectificativa

> Qué se rompe si cambiamos esto. Este documento **no estima** (eso es A-08), **no decide si el
> cambio se hace**, **no diseña la solución** (eso es la Sección 4 del spec, vía `/spec-impl`) y
> **no toca DOC-04 ni DOC-05**: señala lo que quedará desactualizado y quién lo actualiza.

---

## 1. Resumen ejecutivo

**Qué se toca.** El módulo `factures` entero (esquema, numeración, cálculo de totales,
servicio y pantallas) y, en la medida en que la rectificativa libere sus albaranes, el
invariante de `REQ-042` sobre el módulo `albarans` — sin que necesariamente cambie una sola
línea de `server/routes/albarans.js`. Es una migración de esquema nueva (`factures` no tiene
hoy ningún campo para enlazar dos facturas entre sí), un endpoint nuevo, y una decisión de
numeración que el propio negocio ya adelantó como «propia» (DOC-04, Q-06).

**Qué se rompe.** Nada dentro del código actual: todo lo que existe hoy sigue funcionando
igual, porque la petición es aditiva (tabla, columna, endpoint, pantalla nuevos) y la
inmutabilidad de la factura original explícitamente **no se toca**. Lo que sí se rompe si el
diseño no se cuida es **el vocabulario cerrado de `REQ-055`** («el estado de pago solo puede
ser pendiente o pagada»): la forma más obvia de marcar una factura como anulada es añadir un
tercer valor a `estat_pagament`, y eso la contradice literalmente. Ver 3.3.

**Cuál es el riesgo mayor.** No es técnico, es de decisión de negocio todavía no tomada, y
condiciona todo lo demás: **¿qué pasa con los albaranes de la factura que se anula?** La
petición cruda no lo dice. Si quedan enlazados a la factura anulada tal cual, el caso de uso
que motivó el bug —corregir `BUG-002`, una factura de 114.835,05 € al cliente equivocado
(`DOC-24`)— sigue sin tener salida real: el trabajo seguiría facturado al cliente equivocado,
solo que con un documento adicional que dice que ese importe no vale. Si en cambio la
rectificativa libera los albaranes a `pendent` para poder refacturarlos bien, entonces
`REQ-042` («un albarán facturado no se puede modificar») deja de ser un invariante absoluto sin
que `albarans.js` cambie ni una línea — es exactamente el patrón de riesgo silencioso que ya
tiene un precedente en este mismo proyecto (`REQ-046`/`TC-064`, citado en DOC-04 3.4): una
garantía que cambia de significado en un componente que no aparece en el diff. Ver 3.2 y RS-02.

**Qué necesita saber A-08 antes de estimar.** El propio DOC-04 ya calificó este evolutivo como
`scope: large` (Q-06) y da la razón exacta: «entidad nueva, numeración propia, afecta al
cálculo de totales». Este análisis confirma las tres partes: no hay ninguna columna hoy en
`factures` para enlazar dos facturas (`migration_required: true`), la numeración `año/F-nnnn`
de `REQ-048` es una función reutilizable pero con una decisión de prefijo pendiente, y
`computeTotals`/`withDetails` en `factures.js` asumen que los importes de una factura salen
siempre en positivo de líneas que aún no se han facturado — una rectificativa que exprese un
abono en negativo, en vez de una sustitución completa, obliga a tocar esa función.

---

## 2. Alcance técnico

### 2.1 Punto de entrada

No hay `affects_requirements` declarado por ningún spec —no existe todavía—. Lo infiero
leyendo DOC-04: el texto de la petición («factura emitida», «anular», «factura nueva», «ambas
quedan en el histórico») encaja en el módulo `factures` con más fuerza que en ningún otro, y
DOC-04 ya lo confirma en su propia anotación de `Q-06`: `blocks: REQ-043`,
`affects_requirements: [REQ-043, REQ-047, REQ-042]`, `describes_gap_in: [REQ-042, REQ-047]`. La
uso directamente en vez de re-derivarla, y añado un candidato que esa anotación no incluye
porque no era su objeto pero que la implementación no puede evitar tocar: **`REQ-055`** (ver
3.3, riesgo de contradicción). No hay dos lecturas razonables sobre el módulo — solo sobre qué
requisitos concretos del módulo quedan afectados y cómo — así que no hace falta declarar
candidatos alternativos de módulo, solo de alcance dentro de él (3.2).

DOC-02 da los componentes de los dos módulos implicados:

| Módulo | Componentes (DOC-02 §3/§11) |
|---|---|
| `factures` | `factures-router`, `factures-service`, `factures-pages` |
| `albarans` | `albarans-router`, `albarans-service`, `albarans-pages` |

### 2.2 Nota de método: el mismo concentrador que ya documentó `DOC-09-IMPACTO-albara-canvi-client.md`

`DOC-21-GRAPH.json` no existe, así que el cierre transitivo es manual sobre las aristas de
`DOC-02` §11. El grafo tiene los mismos dos nodos concentradores que el análisis de
`albara-canvi-client` ya señaló para S-01: `api-client → server-app` (agrega **toda** la
frontera HTTP en una sola arista) y `db-connection` (siete routers lo tocan). Recorridos sin
criterio, los dos convierten cualquier cambio de servidor en «toda la aplicación» en dos o tres
saltos. Aplico el mismo criterio que aquel análisis: cruzo esas dos aristas **solo con razón
nombrada** — hacia los módulos `factures` y `albarans`, que son los que consumen lo que cambia
— y todo lo alcanzable solo a través de ellas queda fuera por construcción (2.5).

### 2.3 Una arista que falta en DOC-02 y que aquí importa

Verificada en el código, no corregida aquí (es de S-01, y `DOC-02` §10 ya tiene abierta `Q-07`
sobre este mismo hueco):

| Origen | Destino | Evidencia | Por qué importa aquí |
|---|---|---|---|
| `clients-pages` | `factures-service` | `client/src/pages/clients/ClientDetail.tsx:6,38` | `ClientDetail` pinta la lista de facturas del cliente (`REQ-004`) llamando directamente a `facturesService.listByClient`, sin pasar por `clients-service`. Es un segundo sitio, además de `factures-pages`, donde una factura anulada o rectificativa aparecería sin marca distintiva si no se actualiza (ver RS-03) |

### 2.4 Componentes afectados, con distancia y efecto

Distancia en saltos desde los dos puntos de entrada (2.1), cruzando los concentradores solo
por la razón nombrada en 2.2. Valores de efecto: `breaks` (hay que tocarlo o dejará de ser
válido), `behaviour` (cero líneas cambian, la garantía sí) y `review` (hay que confirmar que no
le afecta, o participa sin cambiar).

| Componente | Dist. | Efecto | Directo/transitivo | Qué le pasa |
|---|---|---|---|---|
| `factures-router` | 0 | breaks | directo | Necesita el endpoint nuevo (emitir la rectificativa), la columna de enlace en el modelo de datos (4.1), y una decisión sobre `computeTotals`/`withDetails` (`factures.js:7-36`) si la rectificativa expresa un abono en vez de una sustitución completa |
| `albarans-router` | 0 | **behaviour** (rama probable) / review (rama alternativa) | directo | Si la rectificativa libera los albaranes de la factura anulada a `pendent` (3.2, rama B), el cambio se escribe **directamente sobre la tabla `albarans` desde `factures.js`**, igual que hoy `POST /api/factures` ya hace en sentido contrario (`factures.js:92-97`). `albarans.js` no necesita ganar ninguna línea, y aun así `REQ-042` deja de ser un invariante absoluto. Si en cambio la rectificativa no toca los albaranes (rama A), este componente es solo `review` |
| `db-connection` | 1 | review | directo (ambos routers ya escriben aquí) | Requiere migración de esquema (4.1). Sin cambio de configuración ni de motor |
| `db-numbering` | 1 | review | directo (`factures-router` ya lo llama, `factures.js:3,80`) | `generateNumero(table, prefix)` es reutilizable tal cual si la rectificativa recibe un prefijo propio (p. ej. `R`) dentro de la misma tabla `factures`; el `LIKE '${year}/${prefix}-%'` ya aísla series por prefijo. Si en cambio negocio quiere una tabla propia, esta función se reutiliza igual pasándole el nombre de esa tabla — no hay cambio de firma en ningún caso |
| `vehicles-router` | 1 | review | directo (`factures-router → vehicles-router`, reads, ya existe) | Sigue resolviendo el cliente de un albarán al emitir; no participa en la anulación |
| `clients-router` | 1 | review | directo (`clients-router → factures-router`, reads, ya existe) | `REQ-008` bloquea la baja de un cliente con facturas asociadas contando filas de `factures` sin filtrar por estado (`clients.js:81-86`). **Confirmado sin cambio necesario**: una fila de rectificativa o una factura anulada seguirán contando, que es el comportamiento correcto — pero conviene que quien implemente lo confirme explícitamente, porque es la clase de suposición que se rompe sola si el diseño acaba en una tabla separada en vez de una fila más de `factures` |
| `server-app` | 1 | review | directo (monta el router) | Solo monta. No cambia |
| `peces-router` / tabla `peces` | 1–2 | review | condicional | Si la rama B libera un albarán a `pendent` sin tocar sus líneas, el estoc no se mueve (el descuento ya ocurrió al añadir la línea, `albarans.js:184`, y no hay ninguna operación de línea en juego). Buscado y descartado como riesgo: no hay movimiento de estoc en ningún punto de este flujo, salvo que el diseño añada edición de líneas después de liberar, que sería un albarán editado normal y ya cubierto por `REQ-035`/`REQ-039` |
| `factures-service` | 2 | breaks | transitivo (vía `api-client`, razón: consume el endpoint nuevo) | Necesita un método nuevo (`rectify`/`create` de rectificativa) y, si el modelo de datos enlaza las dos facturas, un campo nuevo en el tipo `Factura` del lado cliente (hoy `client/src/types/factura.ts` no tiene ningún campo de enlace) |
| `albarans-service` | 2 | review | transitivo (vía `api-client`, razón: `AlbaraDetail` lee el estado tras la anulación) | **Sin cambio necesario si se sigue la rama B**: `get()`/`list()` ya devuelven el `estat` que tenga la fila; no hace falta ningún método nuevo para que un albarán liberado se vea `pendent` en el cliente |
| `factures-pages` | 3 | breaks | transitivo | `FacturaDetail.tsx` necesita la acción de rectificar y el enlace bidireccional (factura original ↔ rectificativa); `FacturesList.tsx` y `ClientDetail.tsx` (2.3) necesitan una marca visual de «anulada», o mostrarán el importe de una factura sin validez como si aún contara (RS-01) |
| `albarans-pages` | 3 | behaviour | transitivo (vía la arista de 2.3 aplicada en sentido inverso, y vía `api-client`) | `AlbaraDetail.tsx:65,77-95,117-124` ya calcula `isPendent = albara.estat === 'pendent'` para mostrar Editar/Borrar, y ya muestra el enlace a `albara.facturaId` si existe. Si la rama B libera el albarán y limpia `factura_id`, esta pantalla **ya hace lo correcto sin cambiar una línea** — vuelve a ofrecer Editar/Borrar y deja de enlazar a la factura vieja. Si el diseño libera el `estat` pero **no** limpia `factura_id`, esta misma pantalla mostrará un enlace roto de sentido: un albarán editable que dice seguir facturado a un documento anulado. Ver RS-02 |
| `format-utils` | — | review | usado por `factures-pages` | `formatMoney` usa `Intl.NumberFormat`, que ya formatea negativos correctamente (`-100,00 €`). Sin cambio necesario aunque la rama de diseño elegida exprese la rectificativa como un importe negativo |
| `clients-pages` | 3 | behaviour | transitivo (arista de 2.3, no documentada en DOC-02) | Mismo riesgo que `factures-pages` en `FacturesList`: `ClientDetail.tsx:167-185` pinta cada factura del cliente con su `estatPagament` y su `total` tal cual, sin ninguna noción de «anulada». Ver RS-01 |

**Ningún componente pasa de tres saltos.** El límite lo marca `clients-pages`/`factures-pages`
(3), y solo por cruzar el concentrador `api-client`↔`server-app` con razón nombrada.

### 2.5 Componentes descartados y por qué

Los trece restantes del grafo quedan fuera:

1. **Solo alcanzables atravesando `api-client → server-app` sin razón nombrada**:
   `clients-service`, `vehicles-service`, `peces-service`, `personal-service`, `nomines-service`,
   `vehicles-pages`, `peces-pages`, `personal-pages`, `nomines-pages`. Ninguno consume el
   endpoint nuevo ni lee `factures`.
2. **Solo alcanzables atravesando `db-connection` sin razón nombrada**: `personal-router`,
   `nomines-router`, `db-migrate`, `db-seed`. `db-migrate` aplicará la migración nueva, pero
   como mecanismo genérico, no como componente que cambie de comportamiento propio.
3. **Marco de la SPA**: `client-main`, `client-app`, `layout`, `shared-components`, `use-theme`,
   `i18n`, `use-submit-guard`.

---

## 3. Alcance funcional

### 3.1 Requisitos afectados (leídos directamente de DOC-04)

| REQ | Enunciado (DOC-04 1.3.2) | Efecto | Casos (DOC-05 1.8.0) |
|---|---|---|---|
| `REQ-043` | «El sistema permite emitir una factura a partir de los albaranes pendientes de facturar de un cliente.» | `modified` — gana una segunda vía de emisión (la rectificativa), con reglas propias | TC-060, TC-061 |
| `REQ-047` | «Al emitir una factura, el sistema marca sus albaranes como facturados y los enlaza a ella en la misma operación.» | `review`, condicionado a 3.2: si la rectificativa libera albaranes, este requisito gana una operación simétrica que hoy no existe en ningún sitio del sistema (nadie hoy hace `estat: 'facturat' → 'pendent'`) | TC-065, TC-066 |
| `REQ-042` | «El sistema impide modificar, borrar o alterar las líneas de un albarán que ya ha sido facturado.» | `review` — no se contradice (la petición es explícita: la inmutabilidad de la *factura* original no se toca), pero deja de ser el único camino de salida de un albarán facturado si la rama B se implementa | TC-057, TC-058, TC-059, TC-115 |

### 3.2 La decisión que no está tomada, en dos ramas

La petición cruda dice: *«introducir la factura rectificativa, una factura nueva que anula la
anterior; ambas quedan en el histórico. La inmutabilidad de la factura original no se toca.»*
No dice qué pasa con los albaranes que la factura original agrupaba. Son dos diseños
razonables y **no es decisión de A-07 elegir entre ellos** — es justo lo que la entrevista de
`/spec` tiene que resolver con quien pide el cambio:

**Rama A — rectificativa puramente financiera.** La factura rectificativa es un documento
nuevo con su propio total (típicamente el importe en signo contrario, o cero), que no agrupa
ningún albarán propio y solo referencia a la factura que anula. Los albaranes de la factura
original **siguen** con `estat: 'facturat'` y `factura_id` apuntando a ella. Alcance más
pequeño: no toca `albarans` en absoluto, `REQ-042` y `REQ-047` quedan intactos, y el impacto se
concentra en `factures-router`/`factures-pages`. **El problema**: no resuelve el caso real que
motivó `BUG-004` — `BUG-002`, una factura al cliente equivocado (`DOC-24`, 114.835,05 €) —
porque el trabajo seguiría facturado, sin remedio, al cliente que no lo encargó. La
rectificativa solo diría «esto no vale», no permitiría cobrárselo a quien corresponde.

**Rama B — rectificativa que libera los albaranes.** Al emitir la rectificativa, los
albaranes de la factura anulada vuelven a `estat: 'pendent'` (y, previsiblemente, `factura_id`
a `NULL`), quedando disponibles para agruparse en una factura nueva y correcta. Resuelve el
caso real de `BUG-002`. Alcance mayor: toca el invariante de `REQ-042`/`REQ-047` (3.1), y es la
lectura que hace consistente que DOC-04 haya anotado `REQ-042` en `affects_requirements` de
`Q-06` — si la rama fuera A, `REQ-042` no tendría por qué aparecer ahí.

**Por qué lo trato como más probable sin decidirlo.** La propia anotación de DOC-04 en `Q-06`
lista `REQ-042` entre los afectados, y la rama A no le daría motivo para estar. Este análisis
usa la rama B como hipótesis de trabajo en los apartados 2.4 y 5, mint marcando siempre que es
una hipótesis — y si la entrevista confirma la rama A, la mitad del alcance de este documento
(todo lo que toca `albarans-router`, `albarans-pages`, `albarans-service` y RS-02) deja de
aplicar.

### 3.3 Un requisito en riesgo de contradicción, según cómo se implemente

| | |
|---|---|
| `REQ-055` | «El estado de pago de una factura solo puede ser pendiente o pagada.» (`BR-FAC-08`, `high`) |
| Efecto si se reutiliza `estat_pagament` para marcar la anulación | **`contradicted`** — un tercer valor (`anulada`, por ejemplo) rompe el enunciado literalmente, y con él su único caso, `TC-078` («El estado de pago de la factura solo admite pendiente o pagada») |
| Efecto si se usa un campo nuevo (p. ej. `anulada_el` o un enlace a la rectificativa que la propia presencia del enlace señala como anulada) | `review` — `REQ-055` sigue siendo cierto tal cual, sin tocarlo |

`server/routes/factures.js:113-116` valida hoy `estat_pagament !== 'pendent' && estat_pagament
!== 'pagada'` con un `400`. Reutilizar ese campo es el camino más corto de implementar y por
eso conviene nombrarlo aquí antes de que alguien lo tome sin darse cuenta de que contradice un
requisito vigente con caso de prueba en verde.

### 3.4 Requisitos que hay que revisar, no cambiar

| REQ | Efecto | Casos | Por qué está |
|---|---|---|---|
| `REQ-048` | `review` | TC-067, TC-068 | «Formato año/F-nnnn» sigue siendo cierto para facturas normales. La rectificativa necesita su propia regla de numeración (DOC-04 Q-06: «numeración propia»), que es un requisito nuevo, no una modificación de este |
| `REQ-046` | `review` | TC-064 | Aplica sin cambios a la emisión normal. Si la rectificativa (rama B) vuelve a agrupar los albaranes liberados en una factura nueva, esa factura nueva pasa otra vez por esta misma regla — no hace falta ninguna regla nueva, la que existe ya protege el caso |
| `REQ-049`, `REQ-050`, `REQ-051` | `review` | TC-069–073 | `computeTotals`/`withDetails` siguen siendo válidos para facturas normales. Si la rectificativa (rama A) expresa un abono en signo contrario, esta función gana una segunda forma de calcular que no es la actual — no la sustituye, la extiende |
| `REQ-052` | `review` (ver RS-01) | TC-074 | El listado sigue mostrando número, estado de pago y total; sin marca de «anulada» explícita, una factura sin validez se ve igual que una válida |
| `REQ-053` | `review` | TC-075 | El detalle necesita mostrar el enlace a la factura relacionada (original ↔ rectificativa), que hoy no tiene ningún campo que lo sostenga |
| `REQ-004` | `review` (ver RS-01) | TC-006 | La ficha del cliente muestra sus facturas (2.3); mismo riesgo que `REQ-052` |
| `REQ-008` | `review` — confirmado sin cambio | TC-011 | Sigue contando filas de `factures` sin distinguir estado; se mantiene el comportamiento correcto (2.4) |

### 3.5 Documentación que quedará desactualizada

No la toco — se enumera para sus propietarios, y solo se concretará de verdad cuando exista un
spec `Approved` con alcance cerrado:

| Documento | Qué queda desactualizado | Propietario |
|---|---|---|
| `DOC-04-FUNCIONAL.md` | `Q-06` deja de ser evolutivo pendiente y pasa a `implementado`; nace un requisito nuevo para la numeración propia de la rectificativa y, según la rama elegida, uno para la liberación de albaranes | A-02 |
| `DOC-05-PLAN-PRUEBAS.md` | Casos nuevos para la emisión de rectificativa, el enlace bidireccional y (si aplica la rama B) el rechazo de editar/borrar líneas de un albarán ya liberado que vuelve a estar `facturat` en otra factura | A-03 |
| `DOC-06-MANUAL-USUARIO.md` | Sección nueva: cómo corregir una factura emitida por error | A-04 |
| `DOC-07-TRAZABILIDAD` / `DOC-07-MATRIZ.csv` | Filas de `REQ-043`, `REQ-047`, `REQ-042` y, si aplica, `REQ-046`/`REQ-048` | A-05 |
| `DOC-02-TECNICA.md` | Modelo de datos de `factures` (4.1), la arista `clients-pages → factures-service` (2.3), y el componente nuevo del endpoint de rectificación | S-01 |

---

## 4. Modelo de datos

### 4.1 Entidades implicadas y migración necesaria

| Entidad | Tabla | Papel |
|---|---|---|
| `Factura` | `factures` | La que se anula y la que anula. **No tiene hoy ningún campo que enlace una factura con otra** (`server/db/migrations/002_vehicles_peces_albarans_factures.sql:28-36`: `id, numero, client_id, iva_percentatge, estat_pagament, creat_el, actualitzat_el`) |
| `Albara` | `albarans` | Solo relevante en la rama B (3.2): su `estat` y `factura_id` son los que habría que revertir |
| `Client` | `clients` | Extremo de la comparación de `REQ-046`/`REQ-008`. No cambia |

**`migration_required: true`.** Hace falta al menos una columna nueva en `factures` para
enlazar la rectificativa con la original — un `FK` auto-referenciado (p. ej.
`factura_rectificada_id INTEGER REFERENCES factures(id)`, nullable) es la forma más barata
dentro del esquema actual. Si negocio confirma «numeración propia» como una serie realmente
distinta (no solo un prefijo distinto dentro de la misma tabla), la migración crece: o una
columna `tipus` (`'original' | 'rectificativa'`) con su propia secuencia de numeración
filtrada por tipo, o una tabla nueva — que entonces exige revisar cada `SELECT * FROM factures`
del proyecto (`factures.js:38-52`) para decidir si debe incluir o excluir las rectificativas.
Ninguna de las dos variantes está descartable con la información de la petición cruda; ambas
son nullable/aditivas y ninguna exige tocar filas existentes.

### 4.2 Datos existentes: ninguno queda inválido

**`existing_data_at_risk: false`.** Cualquier migración razonable (columna nueva nullable, o
tabla nueva) es puramente aditiva: ninguna factura ni albarán existente dejaría de cumplir un
esquema que no tenían antes. Dato relevante para quien decida: la propia factura que motivó el
hallazgo de `BUG-004` sigue en la base (`DOC-24`, `test_data_left_behind`: factura
`2026/F-0002`, 114.835,05 €, cliente 8) y sería el primer caso real sobre el que probar la
rectificativa — con la salvedad de que, si la rama elegida es la B, esa prueba **sí movería
datos reales** (el albarán 5 volvería a `pendent`), cosa que conviene decidir antes de usarla
como caso de prueba manual.

### 4.3 Numeración

`REQ-029`/`REQ-048` usan `generateNumero(table, prefix)` (`server/db/numbering.js`), que
construye `${year}/${prefix}-${nnnn}` filtrando por `numero LIKE '${year}/${prefix}-%'`. La
función es reutilizable sin cambios sea cual sea la decisión de esquema: con un prefijo nuevo
dentro de la misma tabla `factures` (p. ej. `generateNumero('factures', 'R')`) o con una tabla
propia (`generateNumero('factures_rectificatives', 'R')`). Lo único que no está decidido es
**cuál** de las dos, y no es un problema técnico sino el mismo de 4.1.

---

## 5. Riesgos silenciosos

### RS-01 · Una factura sin validez se ve igual que una válida en las tres pantallas que listan facturas

**Qué pasa.** `FacturesList.tsx:86-99`, `ClientDetail.tsx:167-185` y `FacturaDetail.tsx:88-123`
pintan `estatPagament` y `total` de cada factura tal cual los devuelve la API, sin ningún
concepto de «anulada». Si el modelo de datos no añade una marca visible y las tres pantallas no
se actualizan para leerla, una factura anulada por una rectificativa aparecerá en las tres con
su total original y un estado «pendent» o «pagada» como si aún contara — exactamente el tipo de
dato que alguien usaría para calcular lo que un cliente debe.

**Por qué es silencioso.** No hay ningún error: la factura existe, tiene un número válido y un
total numérico correcto según su propio cálculo. Lo que falta es contexto, no un dato erróneo.

**Componentes:** `factures-pages`, `clients-pages` (2.3).

### RS-02 · `REQ-042` deja de ser absoluto sin que `albarans.js` cambie una línea (rama B)

**Qué pasa.** Si la rectificativa libera los albaranes de la factura anulada, esa liberación se
escribe razonablemente **desde `factures.js`**, igual que hoy la operación inversa —marcar como
`facturat`— ya se escribe desde `factures.js:92-97` sin pasar por ningún método de
`albarans-router`. El fichero que hoy sostiene `REQ-042` (`server/routes/albarans.js:81-83,
121-123,139-141,210-212`, los cuatro puntos que comprueban `estat === 'facturat'`) no
necesitaría ganar ni una línea, y aun así el invariante que protege — «una vez facturado, nunca
más editable» — pasa a tener una puerta trasera legítima y documentada. Es el mismo patrón que
ya describió el análisis de `albara-canvi-client` sobre `REQ-046`/`factures-router`: una
garantía que cambia de significado en un componente ausente del diff.

**Por qué importa que se detecte aquí y no después.** Los tres casos que hoy protegen
`REQ-042` (`TC-057`, `TC-058`, `TC-059`) verifican que un albarán facturado rechaza cambios.
Ninguno verifica qué pasa **después** de que ese mismo albarán vuelva a `pendent` por la vía de
una rectificativa — porque hoy esa vía no existe. Si se implementa sin un caso nuevo que la
ejerza, la reapertura de un albarán queda con la misma cobertura que tenía antes de existir:
ninguna.

**Componentes:** `albarans-router` (comportamiento, no código), `factures-router` (quien
escribe el cambio).

### RS-03 · El enlace `albara.facturaId` puede quedar apuntando a un documento anulado

**Qué pasa.** `AlbaraDetail.tsx:117-124` muestra un enlace a la factura mientras
`albara.facturaId` no sea nulo. Si la rama B cambia `estat` a `pendent` pero no limpia
`factura_id` en la misma operación, la pantalla mostraría un albarán editable (`isPendent` ya
es `true`) que a la vez enlaza a una factura marcada como anulada — dos señales contradictorias
en la misma ficha, ninguna de las dos errónea por sí sola.

**Por qué es silencioso.** Ambos campos se leen de forma independiente
(`AlbaraDetail.tsx:65` y `:117`); nada impide que uno se actualice y el otro no, y no hay
ninguna validación que lo detecte porque hoy esa combinación de valores nunca ha existido.

**Componente:** `albarans-pages`.

### RS-04 · La cuenta de `REQ-008` sigue siendo correcta, pero por una razón que nadie escribió a propósito

**Qué pasa.** `clients.js:81-86` cuenta filas de `factures` sin filtrar por estado ni por tipo.
Con cualquiera de los diseños de 4.1 que añaden una columna a la misma tabla, una rectificativa
sigue contando y el cliente sigue bloqueado para borrar mientras tenga alguna — lo cual es
correcto. Pero si el diseño acaba en una tabla separada (`factures_rectificatives`), esta
consulta deja de verlas **sin que nadie lo note**, porque seguiría devolviendo `count > 0` por
la factura original ya existente. El día en que la factura original y todas sus rectificativas
convivan solo en la tabla nueva —hipotético, pero posible si el modelo evoluciona— esta cuenta
se quedaría ciega ante ellas.

**Componente:** `clients-router`.

### Buscado y descartado

- **Que la rectificativa mueva estoc.** No hay ninguna operación de línea en el flujo descrito
  por la petición cruda: liberar un albarán a `pendent` no toca `peces.estoc`, que solo se
  mueve al añadir o retirar líneas (`REQ-035`, `REQ-039`). Riesgo descartado salvo que el
  diseño final incluya editar líneas tras la liberación, que ya sería un albarán normal.
- **Que `generateNumero` necesite cambiar de firma.** No: acepta tabla y prefijo como
  parámetros desde el primer día (`server/db/numbering.js:3`); cualquiera de las dos ramas de
  4.1 la reutiliza sin tocarla.
- **Que `formatMoney` rompa con importes negativos.** No: `Intl.NumberFormat` los formatea sin
  configuración adicional.

---

## 6. Lo no evaluado

### 6.1 Superficie de API — `DOC-03-API.md` no existe

Igual que en el análisis anterior de este mismo proyecto: no hay OpenAPI ni equivalente
(`DOC-02` §6, `Q-05` abierta). No puedo enumerar quién más, aparte de `factures-service`,
consumiría un endpoint nuevo de rectificación si alguna vez se llama desde fuera de la SPA.
`DOC-24` ya demuestra que existe al menos un consumidor por servicio (A-14, contra
`localhost:3001` directamente), así que la posibilidad no es solo teórica.

### 6.2 Contexto de Confluence — `I-02 READ` no disponible

No ha estado disponible en esta ejecución. Es exactamente el tipo de entrada que podría
resolver la ambigüedad de 3.2 si existiera una decisión de negocio previa sobre qué pasa con
los albaranes de una factura corregida — pero no se ha podido consultar.

### 6.3 Grafo calculado — `DOC-21-GRAPH.json` no existe

El cierre transitivo del apartado 2 es manual, con el criterio de corte de 2.2. No afirmo que
sea exhaustivo; afirmo que es el que sostiene la evidencia disponible en `DOC-02` y en el
código.

### 6.4 Diseño de la solución

No es de este documento decidir entre las ramas A y B de 3.2, ni la forma exacta de la
migración de 4.1, ni el endpoint concreto. Eso es la Sección 4 del spec que salga de la
entrevista de `/spec`, y de ahí lo sigue `/spec-impl`.

### 6.5 Lo que este documento no hace por contrato

No estimo (`effort_signal` es señal de tamaño, no horas — la traduce A-08); no decido si el
cambio se hace; no diseño la solución; no toco `DOC-04` ni `DOC-05`, solo señalo lo que queda
desactualizado (3.5).

---

## 7. Bloque estructurado

```yaml impacto
version: 1
evolutivo: BUG-004
project: app-taller
preliminary: true
note: >-
  pase preliminar sobre la descripcion cruda de /spec Fase 1, previo a la entrevista. affects_requirements
  inferido leyendo DOC-04 (anotacion propia de Q-06) y el codigo, no declarado por ningun spec todavia.
  Puede hacer falta un pase final si la entrevista amplia el alcance mas alla de REQ-042/043/047 o si
  elige la rama A de 3.2 en vez de la B (ver nota de pase, al principio del documento)

components_affected:
  - id: factures-router
    distance: 0
    effect: breaks
    note: endpoint nuevo de emision de rectificativa; requiere migracion de esquema y decision sobre computeTotals/withDetails
  - id: albarans-router
    distance: 0
    effect: behaviour
    note: >-
      solo si la rama B (3.2) libera albaranes a pendent: el cambio se escribiria desde factures.js sin
      tocar albarans.js, y REQ-042 deja de ser invariante absoluto sin que el fichero cambie una linea.
      Si aplica la rama A, este componente es review
  - id: db-connection
    distance: 1
    effect: review
    note: migracion de esquema en factures (4.1)
  - id: db-numbering
    distance: 1
    effect: review
    note: generateNumero(table, prefix) reutilizable sin cambio de firma en cualquiera de las dos variantes de 4.1
  - id: vehicles-router
    distance: 1
    effect: review
    note: sigue resolviendo el cliente al emitir; no participa en la anulacion
  - id: clients-router
    distance: 1
    effect: review
    note: REQ-008 sigue contando filas de factures correctamente si el diseno anade columna a la misma tabla; ver RS-04 si acaba en tabla separada
  - id: server-app
    distance: 1
    effect: review
    note: solo monta el router
  - id: factures-service
    distance: 2
    effect: breaks
    note: metodo nuevo para emitir la rectificativa; tipo Factura del cliente necesita el campo de enlace
  - id: albarans-service
    distance: 2
    effect: review
    note: sin cambio necesario si aplica la rama B; get()/list() ya devuelven el estat que tenga la fila
  - id: factures-pages
    distance: 3
    effect: breaks
    note: FacturaDetail necesita accion de rectificar y enlace bidireccional; FacturesList necesita marca visual de anulada (RS-01)
  - id: albarans-pages
    distance: 3
    effect: behaviour
    note: >-
      AlbaraDetail ya reacciona bien a estat=pendent (boton editar/borrar) si aplica la rama B; riesgo
      si factura_id no se limpia en la misma operacion (RS-03)
  - id: clients-pages
    distance: 3
    effect: behaviour
    note: >-
      ClientDetail llama a factures-service directamente (arista no documentada en DOC-02, ver 2.3);
      mismo riesgo de RS-01

components_excluded:
  - reason: solo alcanzables atravesando api-client->server-app sin razon nombrada
    ids: [clients-service, vehicles-service, peces-service, personal-service, nomines-service, vehicles-pages, peces-pages, personal-pages, nomines-pages]
  - reason: solo alcanzables atravesando db-connection sin razon nombrada
    ids: [personal-router, nomines-router, db-migrate, db-seed]
  - reason: marco de la SPA, sin relacion con la peticion
    ids: [client-main, client-app, layout, shared-components, use-theme, i18n, use-submit-guard]

requirements_affected:
  - id: REQ-043
    effect: modified
    test_cases: [TC-060, TC-061]
  - id: REQ-047
    effect: review
    test_cases: [TC-065, TC-066]
  - id: REQ-042
    effect: review
    test_cases: [TC-057, TC-058, TC-059, TC-115]
  - id: REQ-055
    effect: review
    test_cases: [TC-078]
  - id: REQ-048
    effect: review
    test_cases: [TC-067, TC-068]
  - id: REQ-046
    effect: review
    test_cases: [TC-064]
  - id: REQ-049
    effect: review
    test_cases: [TC-069, TC-070]
  - id: REQ-050
    effect: review
    test_cases: [TC-071, TC-072]
  - id: REQ-051
    effect: review
    test_cases: [TC-073]
  - id: REQ-052
    effect: review
    test_cases: [TC-074]
  - id: REQ-053
    effect: review
    test_cases: [TC-075]
  - id: REQ-004
    effect: review
    test_cases: [TC-006]
  - id: REQ-008
    effect: review
    test_cases: [TC-011]

data_model:
  entities: [Factura, Albara]
  migration_required: true
  existing_data_at_risk: false

silent_risks:
  - description: Una factura anulada se lista con su total y estado original, indistinguible de una valida
    component: factures-pages
  - description: REQ-042 deja de ser invariante absoluto sin que albarans.js cambie una linea, si aplica la rama B
    component: albarans-router
  - description: albara.facturaId puede quedar apuntando a una factura anulada si factura_id no se limpia junto con estat
    component: albarans-pages
  - description: REQ-008 deja de contar rectificativas si el diseno final usa una tabla separada de factures
    component: clients-router

not_evaluated:
  - area: api_surface
    reason: DOC-03 no existe
  - area: decision_de_diseno
    reason: >-
      que pasa con los albaranes de la factura anulada (rama A vs B, 3.2) no esta decidido; lo cierra
      la entrevista de /spec, no este documento
  - area: contexto_confluence
    reason: I-02 READ no disponible en esta ejecucion
  - area: grafo_calculado
    reason: DOC-21-GRAPH.json no existe; cierre transitivo manual sobre DOC-02

effort_signal: large   # coincide con el scope declarado por DOC-04 en la anotacion de Q-06
```
