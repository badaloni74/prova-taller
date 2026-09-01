---
doc_id: DOC-04-HIST
doc_name: DOC-04-FUNCIONAL-HIST
of_document: DOC-04-FUNCIONAL.md
version: 1.4.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-02 documentación funcional
generator_version: "1.0"
generated_at: 2026-09-01T09:30:00+02:00
---

# DOC-04-FUNCIONAL · Historial de versiones

Historial del documento `docs/DOC-04-FUNCIONAL.md`. Una entrada por versión, de
la más nueva a la más antigua. **El documento principal no reproduce nada de
esto**: refleja solo el estado actual, con su `version` en el front-matter.

**Nota sobre este fichero.** Lo crea A-02 en el ciclo del 2026-08-23. Las
versiones 1.0.0, 1.1.0 y 1.2.0 no llegaron a declarar un fichero de historial
propio; sus entradas están reconstruidas a partir de los avisos de cambio
(«Qué cambia en X.Y.Z») que el propio documento llevaba en el cuerpo hasta
esta regeneración, y son fieles a lo que allí constaba. Se señalan como
reconstruidas. Las fechas de 1.0.0 y 1.1.0 son aproximadas, tomadas de
`registro-ids.json` (anclas `REQ-*` creadas el 2026-08-15, preguntas `Q-*`
creadas el 2026-08-16).

---

## 1.4.0 — 2026-09-01 — MINOR — `SPE-07` y `SPE-08` cierran `Q-12` y `Q-06`; ocho requisitos nuevos

Consume `DOC-01-BASE-ASIS.md` 1.3.0 (antes 1.2.0), que incorpora cinco reglas de
negocio nuevas, un caso de uso nuevo y un término de glosario nuevo, resultado
de ocho commits sobre `client/`/`server/` desde `345a3ae` que entregan
`SPE-07-importes-negativos` (origen `BUG-003`) y `SPE-08-factura-rectificativa`
(origen `BUG-004`), ambos `status: Implemented`.

**Anclas nuevas en DOC-01 1.3.0** (registradas por `S-01` el 2026-08-31):

- `BR-PEC-03` — el precio y, si se informa, el coste de una pieza deben ser
  mayores que cero.
- `BR-PEC-04` — el estoc de una pieza no puede ser negativo; cero es válido.
- `BR-ALB-11` — el precio de una línea de albarán debe ser mayor que cero: en
  pieza solo si se informa explícitamente, en mano de obra siempre.
- `BR-FAC-10` — al emitir una rectificativa, los albaranes de la original
  vuelven a pendiente y quedan libres de ella, sin que la original cambie
  ningún campo propio.
- `BR-FAC-11` — una factura ya rectificada no se puede volver a rectificar.
- `UC-FAC-05` — Rectificar una factura emitida.
- Glosario: «Factura rectificativa» (término nuevo, no ambiguo).

**Ocho requisitos nuevos**, ninguno de los 81 anteriores se reformula, se
elimina ni cambia de prioridad, confianza o ancla:

| REQ | Módulo | Ancla de origen | Enunciado (resumen) |
|---|---|---|---|
| REQ-082 | factures | UC-FAC-05 | Permite rectificar una factura, emitiendo una rectificativa numerada aparte |
| REQ-083 | factures | UC-FAC-05 | Exige un motivo para rectificar |
| REQ-084 | factures | BR-FAC-10, UC-FAC-05 | Los albaranes de la original vuelven a pendiente y quedan libres de ella |
| REQ-085 | factures | BR-FAC-10, UC-FAC-05 | La original no cambia ningún campo propio; queda marcada como anulada por la existencia de la rectificativa |
| REQ-086 | factures | BR-FAC-11, UC-FAC-05 | Impide rectificar una factura ya rectificada |
| REQ-087 | peces | BR-PEC-03, UC-PEC-02, UC-PEC-04 | Precio y coste de una pieza deben ser mayores que cero |
| REQ-088 | peces | BR-PEC-04, UC-PEC-02, UC-PEC-04 | El estoc de una pieza no puede ser negativo |
| REQ-089 | albarans | BR-ALB-11, UC-ALB-03, UC-ALB-04 | El precio de una línea debe ser mayor que cero |

**Por qué esta granularidad.** `BR-FAC-10` agrupa tres comportamientos
comprobables por separado —numeración de la rectificativa (recogida ya en la
acción base, `REQ-082`), liberación de los albaranes (`REQ-084`) e
inmutabilidad de la factura original (`REQ-085`)— y se separan por el mismo
criterio que ya se aplicó a `BR-ALB-10` en el ciclo 1.3.0: agrupar dos
comportamientos en un solo `REQ-nnn` deja a uno de los dos sin prueba propia
sin que nadie lo note. `BR-PEC-03` y `BR-PEC-04` se mantienen separadas
(importe monetario vs. cantidad de stock) en vez de fundirse en un único
«los importes de una pieza deben ser positivos».

**`Q-06` y `Q-12` pasan a `answered` con evolutivo `implemented`** (ver
apartado 6.2 del documento principal), con el mismo criterio ya aplicado a
`Q-10` en el ciclo 1.3.0 (spec trazable + `REQ-nnn` que materializa la
decisión):

- `Q-06` (factura rectificativa) — `implemented_on: 2026-08-31`,
  `implemented_by: SPEC 08`, `realised_in: [BR-FAC-10, BR-FAC-11, UC-FAC-05,
  REQ-082, REQ-083, REQ-084, REQ-085, REQ-086]`. `describes_gap_in` y
  `affects_requirements` no cambian (`REQ-042`, `REQ-047`, `REQ-043`): esos
  requisitos siguen describiendo el sistema tal cual, sin reformularse.
- `Q-12` (importes negativos) — `implemented_on: 2026-08-30`,
  `implemented_by: SPEC 07`, `realised_in: [BR-PEC-03, BR-PEC-04, BR-ALB-11,
  REQ-087, REQ-088, REQ-089]`. Igual que en `Q-06`, `REQ-019`, `REQ-022`,
  `REQ-034` y `REQ-036` no se reformulan.
- `Q-02` **no se toca en este ciclo**: aunque el mismo tema (stock negativo) ya
  está corregido en código (`BUG-001`, `fixed` desde `DOC-24` 1.1.0), su cierre
  no pasó por un spec trazable ni `REQ-035` se reformuló para reflejarlo — el
  criterio de cierre que exige este documento (ver nota de `Q-02` en el bloque
  estructurado) no se cumple todavía. Sigue con evolutivo pendiente.

`open_questions_summary.pending_evolutivo` pasa de 5 a **3** (`Q-02`, `Q-14`,
`Q-15` — `Q-02` sigue `pending` porque su cierre en código no pasó por un spec
trazable, ver más arriba) y `implemented_evolutivo` pasa de 1 a **3** (`Q-06`,
`Q-10`, `Q-12`). Las seis preguntas `answered` se reparten así: 3 pendientes +
3 implementadas.

**Por qué MINOR.** El bloque `requirements` gana ocho entradas. **`DOC-05`,
`DOC-06` y `DOC-07` quedan desfasados** y deben revisarse por A-03, A-04 y A-05.
Nota para A-03: `DOC-05` ya había incorporado `TC-120` a `TC-132` para SPE-07 y
SPE-08 colgados de los `REQ-nnn` más próximos que existían entonces (`REQ-019`,
`REQ-022`, `REQ-034`, `REQ-036`, `REQ-042`, `REQ-047`, `REQ-052`); falta
recolgarlos de `REQ-082` a `REQ-089`, igual que ocurrió con `REQ-080`/`REQ-081`
en el ciclo 1.3.0.

**`registro-ids.json`.** Se añaden `REQ-082` a `REQ-089` vía `s12-registro-ids`
(`next` reservó desde `REQ-082`, siguiente libre tras `REQ-081`; `sync
--block requirements`). Las seis anclas `BR-PEC-03`, `BR-PEC-04`, `BR-ALB-11`,
`BR-FAC-10`, `BR-FAC-11` y `UC-FAC-05` ya estaban registradas por `S-01` antes
de esta regeneración y no se tocan. `Q-06` y `Q-12` no cambian de `status`,
`resolution` ni `blocks` en el registro —esos campos siguen siendo `answered` /
`gap_confirmed`, sin cambios—: los campos `implemented_on`, `implemented_by`,
`realised_in` y el `evolutivo` ampliado son propios del bloque `open_questions`
del cuerpo de DOC-04, no del esquema `questions` de `s12-registro-ids` (mismo
criterio que en 1.3.0 para `Q-10`). Verificado con `sync --block requirements`
y `validate --doc docs/DOC-04-FUNCIONAL.md --block requirements`.

---

## 1.3.2 — 2026-08-30 — PATCH — corrección de metadatos de seguimiento en `Q-02`, `Q-06` y `Q-12`

Corrección puntual del bloque `open_questions`, a petición del propietario del
proyecto. **Sin ningún cambio de contenido funcional**: el bloque `requirements`
es idéntico byte a byte al de 1.3.1; ningún `REQ-nnn` se rederiva. No se ha
regenerado el documento desde `DOC-01`, solo se ha editado el fichero.

**Defecto 1 — atribución de bug equivocada en `Q-02`.** La nota del `evolutivo`
de `Q-02` (stock que queda negativo al añadir una línea de pieza) citaba
`BUG-003` de `docs/DOC-24-BUGS.json`. Contrastado contra `DOC-24`: `Q-02`
corresponde a **`BUG-001`** (mismo tema); `BUG-003` es el bug de `Q-12`
(importes negativos). Se corrige la cita. Además, `BUG-001` ya consta
`status: fixed` en `DOC-24` desde su versión 1.1.0 (commit `ed61c24`,
2026-08-21) — la nota decía «abierto» y ya no es así.

- `gap_open_until_implemented` de `Q-02` **se mantiene en `true`**: cerrarlo
  del todo exigiría el mismo criterio aplicado a `Q-10` (spec trazable +
  `REQ-035` actualizado para reflejar el bloqueo), que aquí no se cumple — el
  fix llegó por un commit directo, sin pasar por `/spec`, y `REQ-035` sigue
  describiendo el sistema sin ese bloqueo. Es una decisión de A-02, no un
  hecho automático derivado de que el código ya esté corregido.
- El `status` propio de `Q-02` (`answered`) tampoco cambia.

**Defecto 2 — referencias muertas a un mecanismo retirado.** El bloque
`evolutivo` de `Q-02`, `Q-06` y `Q-12` llevaba `owner: A-06` y (`Q-02`/`Q-06`)
`target_doc: DOC-08`. `A-06` está retirado y los evolutivos ya no se
formalizan en `DOC-08`: el mecanismo vigente es `/spec` → `specs/*.md`, con
`Origin: BUG-nnn` cuando el spec resuelve un bug catalogado. Se sustituyen
`owner`/`target_doc` por dos campos nuevos, `mechanism` y `spec_ref`, en las
tres entradas:

- **`Q-02` (`BUG-001`, ya corregido en código, sin spec):** `spec_ref: null`.
  No hay spec que citar; el cierre fue un commit directo anterior al mecanismo
  `/spec`.
- **`Q-12` (`BUG-003`, abierto):** `spec_ref` apunta a `SPE-07`, en redacción
  (`Draft`) en el momento de esta corrección. Comprobado contra `specs/`: no
  existe todavía ningún fichero `SPE-07-*`; se declara así, como observación,
  sin fabricar su slug.
- **`Q-06` (`BUG-004`, abierto):** `spec_ref` apunta a `SPE-08`, previsto a
  continuación de `SPE-07` y sin redactar todavía. Mismo criterio: no se
  fabrica ruta ni slug.

**Alcance deliberadamente limitado.** `Q-14` y `Q-15` presentan el mismo
`owner: A-06` / `target_doc: DOC-08` y **no se han tocado** en esta pasada: el
encargo se limitaba a las tres entradas con defecto confirmado. Queda anotado
en el cuerpo del documento (apartado 6.2, «Quién recoge las decisiones
pendientes») como pendiente de una corrección posterior.

**Prosa tocada.** Apartado «Procedencia» (nueva nota de versión 1.3.2), tabla
del apartado 6.2 (fila `Q-02` corregida; `Q-06` y `Q-12` amplían su celda con
el estado del bug y del spec), párrafo «Quién recoge las decisiones
pendientes» (sustituye la mención a A-06/DOC-08 por `/spec` → `specs/*.md` y
añade la nota de alcance sobre `Q-14`/`Q-15`) y apartado 6.3 (misma
sustitución). También se amplía el comentario de esquema que precede a
`open_questions:` para documentar `mechanism`/`spec_ref`.

**Por qué PATCH.** No hay ningún requisito añadido, eliminado ni con
semántica modificada — el bloque `requirements` no cambia. Los campos
tocados son de procedencia y seguimiento del `evolutivo`, no de contenido
funcional. `DOC-05`, `DOC-06` y `DOC-07` no quedan obsoletos.

**`registro-ids.json`.** No se toca. `Q-02`, `Q-06` y `Q-12` conservan su
`status`/`resolution`/`blocks` en el registro (el esquema `questions` de
`s12-registro-ids` no persiste `owner`, `target_doc`, `mechanism` ni
`spec_ref`: son propios del bloque `evolutivo` en el cuerpo de DOC-04).
Verificado con `sync --block requirements` y `sync --block questions`
(0 añadidos, 16 y 81 ya presentes, sin colisiones ni derivas) y
`validate --doc docs/DOC-04-FUNCIONAL.md --block requirements` (0
bloqueantes). `cascada.js lint docs/DOC-04-FUNCIONAL.md` también sin
problemas.

---

## 1.3.1 — 2026-08-29 — PATCH — renumeración de `Q-16` a `Q-30` por colisión de identificador

Cambio quirúrgico de identificador, **sin ningún cambio de contenido
funcional**. El bloque `requirements` es idéntico byte a byte al de 1.3.0.

**Motivo.** DOC-04 1.3.0 emitió en su bloque `open_questions` una pregunta con
`id: Q-16` (heredada de `DOC-01/Q-08`, recoge `PD-002` de SPE-06: la fuga de
cliente por la puerta de `UC-VEH-04`). Ese número **ya estaba ocupado** por la
`Q-16` de `DOC-05-PLAN-PRUEBAS.md`, anterior (creada el 2026-08-16, sobre la
numeración anual de albarán y factura al cambiar de ejercicio), registrada en
`registro-ids.json` con `document: DOC-05-PLAN-PRUEBAS.md`.

**Resolución.** Regla de gobierno de identificadores (14.1 / `registro-ids.json`):
ante colisión, **cede el reclamante**. El reclamante es A-02, porque su `Q-16` es
posterior. DOC-05 conserva su `Q-16` (ya dejó constancia en su §6.7 y en su
`-HIST`). La pregunta de A-02 pasa al siguiente `Q-nnn` libre del registro,
**`Q-30`** (`Q-01`…`Q-29` ocupados).

**Alcance del cambio en DOC-04.**

- Bloque `open_questions`: la entrada `Q-16` pasa a `id: Q-30`. Texto,
  `blocks: REQ-015`, `affects_requirements: [REQ-015, REQ-080]`,
  `inherited_from: DOC-01/Q-08` y `status: open` **no cambian**. Se amplía
  `origin_note` para dejar constancia de la renumeración. Se actualiza también
  la `note` del `evolutivo` de `Q-10`, que remitía a `Q-16`.
- Prosa: apartado 3.2 (modificación de vehículo), apartado 6 («Nota de
  numeración», fila de la tabla 6.1, epígrafe «Sobre `Q-16`» → «Sobre `Q-30`»
  con nota nueva sobre la colisión, cierre de 6.2 sobre `Q-10`) y el apartado
  «Procedencia» (nueva nota de versión 1.3.1, «Consecuencia sobre los
  requisitos», «Qué se ha leído de cada entrada»).
- `open_questions_summary`: sin cambios. Siguen siendo 16 preguntas
  (10 abiertas, 6 respondidas); los recuentos son por número de preguntas, no
  por ID.

**Por qué PATCH.** El bloque estructurado de requisitos no cambia y el de
preguntas solo cambia un identificador, sin alterar semántica, estado ni
requisitos afectados. La regla de regeneración manda PATCH cuando solo cambia
la redacción/forma y no el contenido. **DOC-05, DOC-06 y DOC-07 no quedan
obsoletos por este cambio** en cuanto a requisitos; DOC-05 ya había gestionado
su lado de la colisión.

**`registro-ids.json`.** Se añade `Q-30` (`document: DOC-04-FUNCIONAL.md`,
`created: 2026-08-29`, `status: open`, `blocks: REQ-015`, `source: yaml`) vía
`s12-registro-ids` (`sync --block questions`). El esquema `questions` de la
skill no persiste `inherited_from` —ninguna entrada `Q-*` del registro lo
lleva—; la herencia consta en el bloque `open_questions` de DOC-04. La `Q-16`
del registro **no se toca**: sigue siendo la de DOC-05.

---

## 1.3.0 — 2026-08-28 — MINOR *(entrada reconstruida)* — propagación de `BR-ALB-10`

Entrada reconstruida a partir del commit `2453935` y del apartado
«Procedencia» del documento principal: el ciclo 1.3.0 bumpeó el front-matter
de este fichero a 1.3.0 pero no llegó a dejar aquí su entrada de cuerpo.

Consume `DOC-01-BASE-ASIS.md` 1.2.0 (antes 1.1.0), que incorpora la regla
nueva `BR-ALB-10`, el flujo detallado de `UC-ALB-06` y la pregunta nueva
`Q-08` de DOC-01.

- **Dos requisitos nuevos en el módulo `albarans`**: `REQ-080` (el sistema
  rechaza por completo sustituir el vehículo de un albarán no facturado por
  uno de otro cliente; ni la fecha ni las notas quedan guardadas) y `REQ-081`
  (el selector de vehículo del formulario de edición solo ofrece los vehículos
  del cliente actual del albarán). Ambos con ancla de origen
  `BR-ALB-10` / `UC-ALB-06`.
- **Ninguno de los 79 requisitos anteriores** se reformula, se elimina ni
  cambia de prioridad, confianza o ancla. `REQ-040` se conserva tal cual.
- **`open_questions`**: se añade `Q-16` (heredada de la `Q-08` nueva de
  DOC-01, recoge `PD-002` de SPE-06). La `Q-10` pasa de `answered` con
  evolutivo pendiente a `answered` con evolutivo **implementado** (entregado
  como SPEC 06, realizado en `BR-ALB-10`, `REQ-080`, `REQ-081`).
- `registro-ids.json`: se añaden `REQ-080` y `REQ-081` vía `s12-registro-ids`.

**Por qué MINOR.** El bloque `requirements` gana dos entradas nuevas. Al subir
MINOR, `DOC-05`, `DOC-06` y `DOC-07` quedaron desfasados y fueron revisados
por sus propietarios.

---

## Nota — 2026-08-23 — resincronización de procedencia, sin cambio de versión

No es una entrada de versión: el bloque `requirements` y el bloque
`open_questions` de este ciclo son idénticos byte a byte a los de 1.2.0. Se
documenta aquí porque es la regeneración que crea este fichero de historial.

**Motivo.** `DOC-01-BASE-ASIS.md` pasó de 1.0.0 a 1.1.0 (commit `7c5c39f`).
Verificado por diff de anclas (las 77 `UC-nnn`/`BR-nnn` de 1.1.0 son las
mismas 77 de 1.0.0, mismo texto y módulo) y por diff completo del fichero (39
líneas de diferencia): (1) front-matter propio de DOC-01, (2) el árbol
comentado de su sección 6, que pasa de citar tres especificaciones a cinco
porque se implementaron `SPEC 04 use-submit-guard` y `SPEC 05 format-utils`,
y (3) el cierre de su antigua `Q-02` («¿el stock puede quedar negativo?»),
resuelta por negocio el 2026-08-16 y ya recogida en DOC-04 desde 1.2.0 como
`Q-02` y `Q-12`, pendiente de implementación como `BUG-003`
(`docs/DOC-24-BUGS.json`). Ningún actor, caso de uso, regla de negocio ni
término de glosario cambia de texto.

**Consecuencia.** Ningún `REQ-nnn` se añade, se elimina ni cambia de
enunciado, módulo, ancla, prioridad o confianza. Se aplica la regla de
regeneración: *bloques de negocio idénticos y prosa equivalente → ninguna
versión de contenido nueva*. Se actualiza solo el front-matter: la versión de
`DOC-01-BASE-ASIS.md` declarada en `inputs` (1.0.0 → 1.1.0), su `hash`, el
`commit_sha` de `source` (`44748fb` → `88af6e7`) y `generated_at`. También se
adelgaza el cuerpo: los avisos «Qué cambia en 1.1.0 / 1.2.0» que vivían en la
introducción del documento se trasladan a este fichero y se sustituyen por un
apartado «Procedencia», siguiendo el mismo criterio que `DOC-16/A-12` aplicó
el 2026-08-22: un resumen narrativo en el cuerpo es más fácil de mantener
sincronizado que uno repetido en dos sitios.

**`registro-ids.json` no se toca.** Las 79 anclas `REQ-001` a `REQ-079` ya
registradas coinciden en texto, módulo y anclas de origen con este documento;
no hay nada que añadir ni que deprecar.

---

## 1.2.0 — 2026-08-16 — MINOR *(entrada reconstruida)*

El negocio respondió a **seis** de las quince preguntas abiertas (`Q-02`,
`Q-06`, `Q-10`, `Q-12`, `Q-14` y `Q-15`) el 2026-08-16. Las seis respuestas
confirman que el comportamiento actual es un **hueco que debe cambiar**;
ninguna declara intencionado lo que hoy hace el sistema.

- **Ningún `REQ-nnn` se reformula, se añade ni se elimina.** Los 79
  requisitos siguen describiendo el sistema tal como está hoy.
- Cambia solo el **estado de esas seis preguntas**, de `open` a `answered`
  con `resolution: gap_confirmed`, la decisión de negocio registrada
  (`answer`, `answered_on: 2026-08-16`) y una petición de evolutivo asociada
  (`evolutivo.target_doc: DOC-08`, propietario `A-06`, Fase 2). Las nueve
  preguntas restantes siguen abiertas.
- Se amplía el esquema de `open_questions` con los campos `resolution`,
  `answer`, `answered_on`, `answered_by`, `describes_gap_in`,
  `affects_requirements`, `gap_open_until_implemented` y `evolutivo`,
  compatible hacia atrás con `blocks`.

**Por qué MINOR.** No se renumera ni se retira ningún `REQ-nnn`, pero el
bloque `open_questions` —que forma parte del bloque estructurado— cambia de
estado y de esquema para seis entradas y añade información nueva que
consumen A-05 y A-06.

---

## 1.1.0 — 2026-08-16 — MINOR *(entrada reconstruida, fecha aproximada)*

A petición de A-03, se revisan los tres requisitos de vocabulario cerrado que
solo se podían comprobar mirando una lista de opciones (`REQ-031`,
`REQ-055`, `REQ-073`).

- **`REQ-031` se reformula**: DOC-01 sí sostiene qué ocurre cuando la regla
  se rompe (la anotación no llega a registrarse y el albarán mantiene las
  líneas e importes que ya tenía), así que el enunciado deja de ser un mero
  «solo se admiten estos dos tipos» y declara la consecuencia observable.
- **`REQ-055` y `REQ-073` se mantienen tal cual**: DOC-01 no documenta
  ninguna consecuencia observable de que el estado de pago tome un tercer
  valor, y enunciarla sería inventar comportamiento. Quedan bloqueados por
  dos preguntas nuevas dirigidas al negocio: `Q-14` (facturas) y `Q-15`
  (nóminas).
- Los otros 76 requisitos no se tocan y ningún identificador se renumera.

**Por qué MINOR.** Un requisito activo (`REQ-031`) cambia de semántica
observable, no solo de redacción, y se añaden dos preguntas nuevas al bloque
estructurado.

---

## 1.0.0 — 2026-08-15 — MAJOR *(entrada reconstruida)* — primera versión

Primera extracción de requisitos funcionales desde `DOC-01-BASE-ASIS.md`
1.0.0.

- **79 requisitos** (`REQ-001` a `REQ-079`) derivados de las 77 anclas
  `UC-nnn`/`BR-nnn` de DOC-01 (40 casos de uso, 37 reglas de negocio),
  agrupados en 9 módulos: clients, vehicles, peces, albarans, factures,
  personal, nomines, shell y configuracio.
- **Cobertura total de anclas**: las 77 anclas de DOC-01 producen al menos un
  requisito; ninguna queda sin requisito derivado.
- **Quince preguntas abiertas**: siete heredadas de DOC-01 (`Q-01`, `Q-03` a
  `Q-07` tal como venían numeradas allí) y ocho nacidas en A-02 de
  contradicciones entre reglas, casos de uso sin regla que los gobierne y
  términos del glosario marcados como ambiguos.
- Un único actor, `ACT-01 · Personal del taller`, heredado de DOC-01: el
  sistema no distingue usuarios ni permisos.
