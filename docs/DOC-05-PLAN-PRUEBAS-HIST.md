---
doc_id: DOC-05-HIST
doc_name: DOC-05-PLAN-PRUEBAS-HIST
of_document: DOC-05-PLAN-PRUEBAS.md
version: 1.7.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-03 plan de pruebas
generator_version: "1.2"
generated_at: 2026-08-28T12:30:00+02:00
project: app-taller
project_code: TALLER
purpose: >
  Historial de versiones de DOC-05. El documento principal refleja solo el estado
  actual; todo lo que cambió en cada versión, por qué subió el número, qué quedó
  obsoleto y las tablas de equivalencia de renumeraciones viven aquí. La
  **procedencia** —el bloque `inputs` con versión y hash de cada entrada— NO está
  aquí: se queda en el documento principal, porque es lo que `S-16 · Cascada de
  obsolescencia` necesita leer para calcular qué ha quedado obsoleto.
reconstruction_note: >
  Este fichero nace en 1.5.0, cuando el contrato de A-03 separa historial y estado.
  Las entradas de **1.4.1, 1.4.0 y 1.3.0** se trasladan literalmente desde los tres
  bloques «Aviso a las fases posteriores» y los tres «Qué cambia en …» que el propio
  DOC-05 1.4.1 llevaba dentro, con sus cifras intactas. Las de **1.2.0, 1.1.0 y
  1.0.0** se **reconstruyen** a partir de lo que DOC-05 1.4.1 y DOC-07 afirman de
  ellas; están marcadas `fidelity: reconstruida` y solo dicen lo que hay evidencia
  textual de decir. Donde no hay dato, dice que no hay dato.
---

# DOC-05 · Historial de versiones

Una entrada por versión, de la más nueva a la más antigua. El estado actual está en
**`DOC-05-PLAN-PRUEBAS.md`**; este fichero no lo duplica.

El plan tenía **110 casos de prueba desde 1.0.0 hasta 1.6.0**, y suma **9 más en
1.7.0** (TC-111 a TC-119). **Nunca se ha renumerado, ni retirado, ni reutilizado
un `TC-nnn`**. Conviene tenerlo delante al leer lo que sigue: casi todas las
subidas de versión de este documento han sido aditivas, y las únicas que
tocaron el contenido de un caso existente sin añadir ninguno —1.3.0, sobre
TC-041— necesitaron autorización nominal.

---

## 1.7.0 — 2026-08-28 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** `/spec-impl` cerró `specs/implemented/SPE-06-albara-canvi-client.md`
(`Implemented`, origen `BUG-002`) y despachó a A-03 en modo «Revisión
post-implementación»: no una regeneración completa —DOC-04 sigue en 1.2.0 y no
la dispara— sino la revisión acotada de si este spec ya implementado deja algo
del plan desactualizado. La respuesta, criterio a criterio sobre los once
`AC-nnn` del spec: sí, en ocho casos nuevos, uno ya cubierto y uno cerrado
desde otro módulo.

**Qué cambia.**

| Qué | 1.6.0 | 1.7.0 |
|---|---|---|
| Casos | 110 | **119** (TC-111 a TC-119) |
| Pasos | 241 | **263** |
| Prioridades | 49 C / 31 H / 28 M / 2 L | **55 C / 32 H / 30 M / 2 L** |
| Reparto por tipo | 66 F / 31 N / 9 B / 4 I | **68 F / 34 N / 10 B / 7 I** |
| Vía de verificación | 106 ui / 4 service / 0 mixed (real; el documento citaba 109/1/0 por desactualización) | **110 ui / 8 service / 1 mixed** |
| Grado de automatización | 25 high / 80 medium / 4 low / 1 not-recommended | **27 high / 87 medium / 4 low / 1 not-recommended** |
| Carril más largo / carriles totales | 17 / 67 | **20 / 72** |
| `DS-nnn` | 10 | **12** |
| `TC-nnn` modificado sin añadir contenido | — | `TC-055` (solo `automation.reason`) |

**Los nueve casos nuevos, y a qué criterio responde cada uno**: `TC-111`
(AC-002 y AC-007, fundidos en un caso), `TC-112` (AC-003), `TC-113` (AC-004),
`TC-114` (AC-005), `TC-115` (AC-006), `TC-116` (AC-009, y cierra además el
vector de `REQ-027` que el apartado 4.12 tenía declarado como no cubierto
desde 1.5.0), `TC-117` (AC-010), `TC-118` (AC-011) y `TC-119` (AC-008, en el
módulo Facturas). El detalle completo, con el porqué de cada decisión, está en
el «Anexo · Versión 1.7.0» del documento principal.

**`TC-055` se revisa y no se reescribe.** Cubre AC-001 sin necesitar ningún
cambio de `steps` ni de `requirement`: el escenario —vehículo nuevo dentro del
mismo cliente— sigue exactamente igual. Solo cambia su `automation.reason`,
que dejaba de ser cierto tal como estaba escrito porque citaba una reescritura
de `REQ-040` que ya había llegado.

**Una corrección de mantenimiento, aprovechada aquí.** El recuento agregado de
`verification_path` (front-matter y Anexo de validaciones) seguía en
109/1/0 desde 1.5.0, sin recoger que 1.6.0 ya había pasado TC-045, TC-063 y
TC-064 a `service`. El dato de cada caso siempre fue correcto; solo el
recuento agregado no se había vuelto a calcular. Se corrige junto con esta
subida en vez de abrir una revisión aparte.

**`registro-ids.json`.** Nueve anclas `TC-nnn` nuevas (`TC-111`–`TC-119`),
`type: test_case`, con su `module`, `requirement` y `external_id`. Ningún
`TC-nnn` existente se renumera ni se retira.

**Por qué MINOR y no otra cosa.** No es PATCH porque el contenido que
consumen Rally, S-10, S-14 y S-17 cambia de verdad: nueve casos nuevos que
exportar, un primer caso `mixed` real, un requisito que pasa de 1 a 8 casos.
No es MAJOR porque nada de lo que ya existía se retira ni cambia de
significado.

**Qué queda obsoleto:** DOC-07, DOC-08 y DOC-16 (declaran DOC-05 1.6.0 como
entrada). DOC-13 recibe dos encargos nuevos (`DS-011`, `DS-012`). DOC-19 no
queda obsoleto. Rally/S-07 no es un no-op esta vez: hay 9 altas que exportar.
Detalle en el Anexo · Versión 1.7.0 del documento principal.

---

## Nota — 2026-08-24 — resincronización de procedencia (DOC-23 2.2.0), sin cambio de versión

No es una entrada de versión: el bloque `testcases` de este ciclo es idéntico
byte a byte al de 1.6.0. Se documenta porque `S-16 · Cascada de obsolescencia`
marcó este documento como obsoleto por depender de una versión superada de
`DOC-23-INFORME.md` (2.1.0 → 2.2.0, MINOR).

**Motivo.** `DOC-23` 2.2.0 cierra los 18 escenarios que estaban en rojo en
2.1.0 (re-ejecutados, no la suite completa): los 17 casos de `EXP-027`
(literales de importe con punto en vez de coma) quedaron corregidos y
verificados en verde, y el fallo aislado de infraestructura
(`SessionNotCreated` al arrancar Chrome) se confirmó transitorio. `DOC-23`
2.2.0 también corrige una atribución errónea de su propia 2.1.0: el fallo de
infraestructura era de `TC-103`, no de `TC-029` como decía la nota de este
plan sobre el resello anterior — corregido ahí mismo, en la nota nueva del
apartado «Procedencia», dejando la nota original de la 2.1.0 intacta como
registro de lo que se sabía entonces.

**Consecuencia sobre este plan.** Ningún `TC-nnn`, `requirement`, `steps` ni
campo de `automation` o aislamiento cambia. Los tres hechos de localización
que sostienen los `automation.grade` no dependen del separador decimal ni del
arranque de Chrome, así que ningún `grade` ni `reason` se reevalúa. La
vigilancia de verdes/rojos de ejecución sigue viviendo en `DOC-23`, no en
este plan (apartado 6.4).

**Qué se actualiza.** Solo el front-matter del documento principal: la
versión y el `hash` de la entrada `DOC-23-INFORME.md` de `inputs` (2.1.0 →
2.2.0), su `usage`, el `commit_sha`/`working_tree_clean` de `source` y
`generated_at`, y una nota de corrección en el apartado «Procedencia». Los 110
`TC-nnn`, sus `steps`, sus `requirement`, `automation` y campos de aislamiento
quedan exactamente como en 1.6.0.

**`registro-ids.json` no se toca.** No hay `TC-nnn` nuevo, retirado ni
reformulado.

---

## Nota — 2026-08-23 — resincronización de procedencia (DOC-23), sin cambio de versión

No es una entrada de versión: el bloque `testcases` de este ciclo es idéntico
byte a byte al de 1.6.0. Se documenta porque `S-16 · Cascada de obsolescencia`
marcó este documento como obsoleto por depender de una versión superada de
`DOC-23-INFORME.md` (2.0.0 → 2.1.0, MINOR).

**Motivo.** `DOC-23` 2.1.0 es una ejecución real de la suite, no una
reescritura de contenido. Aporta tres hechos: (a) `TC-048` quedó corregido —se
aisló `TC-040`, que arrastraba estoc consumido, con el mismo patrón que ya
usan TC-053/TC-054, commit `735ded8`—; (b) 17 rojos nuevos con una sola causa
raíz, `EXP-027`: los `.feature` de `facturas.feature`/`nomines.feature` siguen
comprobando literales de importe con punto decimal que la pantalla ya no
muestra desde el SPEC 05; y (c) un fallo aislado de infraestructura en
`TC-029` (`SessionNotCreated` al arrancar Chrome), no reproducible de forma
fiable.

**Consecuencia sobre este plan.** Ningún `TC-nnn`, `requirement`, `steps` ni
campo de `automation` o aislamiento cambia. Los tres hechos de localización
que sostienen los `automation.grade` —formulario de línea sin `id`,
desplegable de pieza por `fetch`, campos de `EntityForm` con `id` estable— no
dependen del separador decimal que motiva `EXP-027`, así que ningún `grade` ni
`reason` se reevalúa. La vigilancia de verdes/rojos de ejecución vive en
`DOC-23`, no en este plan (apartado 6.4).

**Qué se actualiza.** Solo el front-matter del documento principal: la
versión y el `hash` de la entrada `DOC-23-INFORME.md` de `inputs` (2.0.0 →
2.1.0), su `usage`, el `commit_sha` de `source` y `generated_at`. Los 110
`TC-nnn`, sus `steps`, sus `requirement`, `automation` y campos de aislamiento
quedan exactamente como en 1.6.0.

**`registro-ids.json` no se toca.** No hay `TC-nnn` nuevo, retirado ni
reformulado.

---

## Nota — 2026-08-23 — resincronización de procedencia (DOC-08, DOC-25), sin cambio de versión

No es una entrada de versión: el bloque `testcases` de este ciclo es idéntico
byte a byte al de 1.6.0. Se documenta porque `S-16 · Cascada de obsolescencia`
marcó este documento como obsoleto por depender de versiones superadas de
`DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md` (2.1.0 → 2.2.0) y de
`DOC-25-PROPUESTAS-FUNCIONALES.md` (1.1.1 → 1.2.0).

**Motivo — DOC-08 2.1.0 → 2.2.0 (MINOR).** Según su propio
`DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client-HIST.md`, ninguno de los once
criterios de aceptación de `EVO-001` se reformula, cambia de vía de
comprobación o gana/pierde una precondición; lo que cambia es procedencia
propia (dos afirmaciones corregidas en sus apartados 3 y 4.1) y un apartado
nuevo (4.5) que cita riesgos de `DOC-09`. Este plan **no deriva ningún caso**
de `DOC-08`: lo cita solo como origen del vocabulario `verification_path`
(`interfaz`/`servicio`/`mixta` ↔ `ui`/`service`/`mixed`, apartado 4.12) y como
evidencia de urgencia de `Q-18` sobre `AC-002`, `AC-004`, `AC-007` y `AC-009`.
Los cuatro criterios citados no cambian de enunciado ni de vía en 2.2.0.

**Motivo — DOC-25 1.1.1 → 1.2.0 (MINOR).** Nacen cuatro propuestas nuevas
(`FUN-009` a `FUN-012`); las ocho anteriores no cambian de estado, evidencia ni
señal. Este plan cita `DOC-25` únicamente como segundo testigo de la mitad
factual de `Q-18` (la reproducción de `BUG-003` que A-15 anotó como
`evidence`), y declara expresamente que «ninguna FUN/MEJ de A-15 genera casos
en este plan». Las cuatro propuestas nuevas no alteran esa cita.

**Consecuencia sobre este plan.** Ningún `TC-nnn`, `requirement`, `steps` ni
campo de `automation` o aislamiento cambia. No hace falta releer `DOC-04` ni
reconciliar ningún caso.

**Qué se actualiza.** Solo el front-matter del documento principal: la
versión y el `hash` de las dos entradas de `inputs` (`DOC-08` y `DOC-25`), el
`commit_sha` de `source` y `generated_at`. Los 110 `TC-nnn`, sus `steps`, sus
`requirement`, `automation` y campos de aislamiento quedan exactamente como en
1.6.0.

**`registro-ids.json` no se toca.** No hay `TC-nnn` nuevo, retirado ni
reformulado.

---

## Nota — 2026-08-23 — resincronización de procedencia, sin cambio de versión

No es una entrada de versión: el bloque `testcases` de este ciclo es idéntico
byte a byte al de 1.6.0. Se documenta porque `S-16 · Cascada de obsolescencia`
marcó este documento como obsoleto por depender de una versión superada de
`DOC-01-BASE-ASIS.md`.

**Motivo.** `DOC-01-BASE-ASIS.md` pasó de 1.0.0 a 1.1.0 (commit `7c5c39f`),
resincronización que `A-02` ya conciliara con `DOC-04-FUNCIONAL.md` (que
permanece en 1.2.0 — ver `DOC-04-FUNCIONAL-HIST.md`, nota del 2026-08-23).
Releído DOC-01 1.1.0 completo: los 77 anclas `UC-nnn`/`BR-nnn` conservan el
mismo texto y módulo que en 1.0.0; lo único que cambia es el propio
front-matter de DOC-01, el árbol comentado de su sección 6 (pasa de citar tres
especificaciones a cinco, por SPEC 04 y SPEC 05 ya implementadas) y el cierre
de su antigua `Q-02`, ya recogida en DOC-04 desde 1.2.0. Ningún actor, caso de
uso ni regla de negocio cambia de enunciado.

**Consecuencia sobre este plan.** Este documento no lee DOC-01 directamente
para redactar casos —su fuente única declarada es DOC-04 (ver apartado 1)—,
así que la resincronización de DOC-01 solo llega aquí como entrada de
procedencia informativa (`usage: consulta de glosario y de contexto de
módulo`). Como DOC-04 no cambió de versión ni de contenido, ningún
`REQ-nnn` referenciado por los 110 `TC-nnn` cambia de enunciado, módulo,
prioridad o confianza. Se aplica la misma regla que en DOC-04: *fuente
idéntica en contenido → ninguna versión de contenido nueva*.

**Qué se actualiza.** Solo el front-matter del documento principal: la
versión de `DOC-01-BASE-ASIS.md` declarada en `inputs` (1.0.0 → 1.1.0), su
`hash` (`sha256:4e49485c...` → `sha256:0f074e686a...`), el `commit_sha` de
`source` y `generated_at`. Los 110 `TC-nnn`, sus `steps`, sus `requirement`,
`automation` y campos de aislamiento quedan exactamente como en 1.6.0.

**`registro-ids.json` no se toca.** No hay `TC-nnn` nuevo, retirado ni
reformulado.

---

## 1.6.0 — 2026-08-21 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** Automatizar la interfaz sobre los casos `critical`
(`S-10`) confirmó empíricamente lo que `DOC-07` 1.6.0 §3.11 ya había establecido
para TC-064 (`A-05-11a`): `FacturaForm` carga los albaranes seleccionables con
`listByClient(clientId, 'pendent')`, así que TC-063 y TC-064 describen un
primer paso que la interfaz no puede ofrecer. La misma pasada encontró un
tercer caso de la misma familia: TC-045 pide seleccionar una pieza inexistente
en un `<select>` que solo ofrece piezas reales.

**Qué cambia.** `TC-045`, `TC-063` y `TC-064` pasan `verification_path` de `ui`
a `service`, con su `automation.reason` corregido a la causa real. Ningún otro
campo de estos tres casos cambia, y ningún otro caso del plan se toca: 110
casos, mismos `id`, mismos `steps`.

**Qué queda obsoleto:** ver el anexo del documento principal («Anexo · Versión
1.6.0 · reclasificación de TC-045, TC-063 y TC-064»). En resumen:
`automation/api/` (S-17) hereda los tres casos; `automation/ui/` no pierde nada
porque nunca llegó a escribirlos.

---

## 1.5.0 — 2026-08-17 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** Dos encargos que llegaron juntos y que resultaron ser el
mismo: la carpeta de automatización se reorganizó, y `S-17 · Automatizador QA de
servicio` entró en servicio necesitando saber **qué casos le tocan**. Lo segundo
exigía un campo que no existía; lo primero, corregir cuatro rutas.

**Qué cambia.**

| Qué | 1.4.1 | 1.5.0 |
|---|---|---|
| Casos | 110 | 110 (ninguno nuevo, retirado ni modificado) |
| Pasos | 241 | 241 |
| Prioridades | 49 C / 31 H / 28 M / 2 L | idéntico |
| Reparto por tipo | 66 F / 31 N / 9 B / 4 I | idéntico |
| Claves por caso | 15 | **16** (`verification_path`), más `verification_path_note` en TC-041 |
| Vía de verificación | no declarada | **109 `ui` · 1 `service` · 0 `mixed`** |
| Preguntas propias | 3 `open`, 1 `answered` | **2 `open`, 2 `answered`** |
| `Q-18` | `open` | **`answered`**, en dos mitades |
| Ruta de la automatización de interfaz | `docs/DOC-23-AUTOMATION/` | **`automation/ui/`** |
| Entradas declaradas | 7 | **9** (+DOC-08 2.0.0 de A-06, +DOC-25 1.1.1 de A-15) |
| Apartados nuevos | — | **4.12** (vía de verificación) y **6.5** (`Q-18` cerrada) |
| Historial | dentro del documento | **este fichero** |

**`verification_path`, adoptado tal cual de A-06.** El campo no lo inventa A-03: lo
introdujo `A-06 · Refinamiento` para los criterios de aceptación de `EVO-001` y este
contrato lo adopta un escalón más abajo, en el caso en vez de en el criterio.
Equivalencia de vocabulario: `interfaz` → `ui`, `servicio` → `service`,
`mixta` → `mixed`.

**`Q-18` se cierra en dos mitades, con dueños distintos.** La mitad **factual** —¿la
vía existe?— la contesta la evidencia: A-14 ejecutó contra `localhost:3001` sin
pasar por la pantalla y `DOC-24/BUG-003` demuestra que la validación de importes no
está en ninguna de las dos capas. La mitad de **método** —¿el plan la cubre?— la
firma A-03, que es su dueño, con la política del apartado 4.12: *un caso va por
servicio solo cuando el vector no existe en la interfaz*. Es la política que el plan
**ya practicaba** en TC-041 desde 1.3.0.

**La ruta de Q-19 no se reescribió, se anotó.** La `resolution` de `Q-19` cita
`docs/DOC-23-AUTOMATION` porque esa era la ruta el 2026-08-16, cuando la decisión se
tomó. El movimiento es del 2026-08-17, posterior. El texto se conserva palabra por
palabra con `resolution_immutable: true` y la corrección va **al lado**, en
`resolution_path_correction`, con `quoted_path`, `current_path`, fecha y qué cambió
y qué no. Las otras tres referencias —dos en `inputs` y una en 6.4— sí se
corrigieron sin más, porque no son el registro de ninguna decisión.

**Cuatro casos dudosos, revisados y declarados.** El barrido del campo sobre los 110
—concentrado en los 31 `Negative` y los 9 `Boundary`— dejó cuatro casos que
obligaron a pararse: **TC-045**, **TC-015**, **TC-036** y **TC-090**. Los cuatro se
quedan en `ui`, con el motivo escrito en 4.12. De ahí salió además un **vector no
cubierto que antes no se veía**: REQ-011, REQ-027 y REQ-065 hablan de una referencia
*existente* y sus casos solo ejercen la mitad vacía; la otra mitad solo se puede
componer por servicio y hoy no la cubre nadie.

**Por qué MINOR y no otra cosa.** No es PATCH porque los consumidores obtienen
información que antes no existía y que cambia lo que hacen: S-17 decide con este
campo qué automatiza, y una pregunta propia cambia de estado. No es MAJOR porque el
cambio es estrictamente aditivo y el contrato anterior sigue siendo válido palabra
por palabra. El traslado del historial a este fichero es una **reubicación
declarada**, no una supresión.

**Qué queda obsoleto:** DOC-23 y DOC-26 (como entrada de decisión, no de contenido)
y DOC-07 (por el cambio de estado de `Q-18`). **DOC-13, DOC-19 y Rally/S-07, no.**
El detalle está en el anexo de versión del documento principal.

---

## 1.4.1 — 2026-08-16 · PATCH

**Fidelidad:** primaria (trasladada del blockquote de cabecera y del «Aviso a las
fases posteriores · 1.4.1» de DOC-05 1.4.1).

**Motivo del salto.** `S-16 · Cascada de obsolescencia` marcó el plan como obsoleto
por una razón correcta: el front-matter declaraba consumir **DOC-04 1.0.0** cuando
DOC-04 iba por **1.2.0**. La tentación era cambiar el número y seguir; no se hizo
así.

**Qué cambia: nada del contenido de prueba.** Ni un `TC-nnn`, ni un paso, ni una
prioridad, ni una etiqueta. Los nueve bloques `testcases` son **idénticos byte a
byte** a los de 1.4.0. Lo único que cambia es la **declaración de entrada** y la
prosa que la justifica.

**Lo que se hizo antes de resellar.** Se releyó entero el bloque `requirements` de
DOC-04 1.2.0 —los 79 requisitos— y se contrastó enunciado por enunciado con lo que
dan por supuesto los 110 casos: mismos identificadores, mismos `statement`, mismos
campos, todos `status: active`. REQ-031, el único reformulado desde 1.0.0, tiene en
1.2.0 el enunciado de 1.1.0 palabra por palabra, contra el que **ya** se había
reescrito TC-041 en 1.3.0.

**La forma de declarar la procedencia, que A-05 recogió como mejor que su propia
recomendación.** En vez de sustituir 1.0.0 por 1.2.0, el front-matter declara
`version: 1.2.0` —la versión con la que el plan está **conciliado**— y conserva en
`derived_from_version` / `derived_from_hash` que **109 de los 110 casos se
escribieron mirando 1.0.0**. Las dos cosas son ciertas y dicen cosas distintas.

**Por qué PATCH.** Ningún consumidor obtiene nada distinto: los 110 `external_id` no
varían y S-07, S-10, S-14 y S-06 leen exactamente lo mismo. **No invalida a DOC-07,
DOC-13, DOC-19 ni DOC-23**; la regla de S-16 lo dice sola: un PATCH en la entrada no
invalida. La reimportación a Rally es un no-op.

---

## 1.4.0 — 2026-08-16 · MINOR

**Fidelidad:** primaria (trasladada del «Aviso a las fases posteriores · 1.4.0» y
del blockquote de cabecera de DOC-05 1.4.1).

**Motivo del salto.** Lo pidió el propietario del proyecto tras un fallo real de la
suite documentado en DOC-23: **TC-040 consumía 2 unidades de una pieza y TC-048
comprobaba después el stock de partida**. Aislado pasaba; en suite completa se ponía
en rojo sin que la aplicación tuviera ningún defecto, y costó **tres ejecuciones**
averiguar que el problema era la suite y no el sistema.

**Qué cambia: los 110 casos ganan cinco campos**, y ninguno pierde ni cambia nada.
`depends_on`, `touches`, `restores_state` y el bloque `automation` con `grade`,
`reason` y `blocked`.

| Qué | 1.3.0 | 1.4.0 |
|---|---|---|
| Casos | 110 | 110 (ninguno nuevo, ninguno retirado, ninguno modificado) |
| Pasos | 241 | 241 |
| Prioridades | 49 C / 31 H / 28 M / 2 L | idéntico |
| Reparto por tipo | 66 F / 31 N / 9 B / 4 I | idéntico |
| Claves por caso | 11 | **15**, tres de primer nivel más el bloque `automation` |
| Plan de ejecución | no derivable | **2 olas, 67 carriles, carril más largo 17** |
| Grado de automatización | no declarado | **25 high / 80 medium / 4 low / 1 not-recommended**, 0 bloqueados |
| Preguntas abiertas | 3 `open`, 1 `answered` | idéntico |

**Lo nuevo de leer** quedó en los apartados **4.10** (olas, carriles y cuellos de
botella) y **4.11** (reparto por grado de automatización), y de ahí salieron los
**tres encargos a S-06** del apartado 5.

**Por qué MINOR.** Es estrictamente aditiva: el contrato anterior sigue siendo
válido palabra por palabra y no se renumera, retira ni añade ningún `TC-nnn`. No es
PATCH porque los consumidores obtienen información que antes no existía: S-14 deriva
de aquí el plan de ejecución y S-10 puede decidir por dónde empieza y qué salta.

**Qué quedó obsoleto:**

- **DOC-07** (A-05): **sí**, aunque el CSV no cambiara. S-14 empezó a devolver un
  bloque `execution` con las olas y los carriles y otro `automation` con el reparto
  por grado. El JOIN requisito-caso, idéntico.
- **DOC-23** (S-10): **sí, como entrada de decisión, no de contenido**. Ningún
  `step` cambió, así que ningún escenario generado quedó inválido. Lo que cambió es
  la cola de trabajo —los 25 `high` primero, TC-109 no debe generarse— y el aviso de
  que los diecisiete casos del carril largo **no pueden ejecutarse en paralelo entre
  sí** hasta que S-06 reparta los datos.
- **DOC-13** (S-06): **no obsoleto, pero con tres encargos nuevos**. Ningún `DS-nnn`
  cambió de contenido.
- **DOC-19**: **no**. Lo que cambió es cómo conviene ordenar la ejecución.
- **Rally / S-07**: la reimportación no cambia ni un campo. Upsert no-op.

---

## 1.3.0 — 2026-08-16 · MINOR

**Fidelidad:** primaria (trasladada del «Aviso a las fases posteriores · 1.3.0» y
del blockquote de cabecera de DOC-05 1.4.1).

**Motivo del salto.** Dos cosas, ambas por **autorización expresa del propietario
del proyecto**, y la autorización fue **enumerada**: reescribir TC-041 y solo
TC-041.

**(1) Se reescribe `TC-041`.** A-02 había reformulado REQ-031 en DOC-04 1.1.0 y el
caso seguía comprobando la **premisa** —que el desplegable ofrece dos tipos— en vez
de la **consecuencia** que el requisito promete: que la anotación de un tercer tipo
no llega a registrarse y el albarán conserva sus líneas y sus importes. Es el aviso
**A-05-01a**, que A-05 arrastraba tres versiones y acabó elevando a punto de
Go/No-Go de A-11. `id`, `external_id`, `requirement` y `priority` se conservan;
cambian `name`, `type`, `preconditions` y `steps`. **Ningún otro `TC-nnn` se tocó.**

Es también la versión en la que **TC-041 pasa a ejecutarse en parte fuera de la
interfaz**, con el motivo escrito: el tercer tipo de línea no se puede ni formular
desde la pantalla. Esa frase acabaría siendo, dos versiones después, la política
general de 1.5.0.

**(2) Se cierra `Q-19`** con la recomendación de A-05: no se añaden casos-testigo al
plan y la vigilancia de los defectos de DOC-24 vive en DOC-23, que no exporta a
Rally. Cero casos nuevos, cero casos modificados por esa respuesta. Se corrigieron
además dos cifras de prosa que A-05 detectó (aviso **A-05-07**).

| Qué | 1.2.0 | 1.3.0 |
|---|---|---|
| Casos | 110 | 110 (ninguno nuevo, ninguno retirado) |
| Pasos | 239 | **241** (TC-041 pasa de 2 a 4) |
| `TC-041` `type` | `Functional` | **`Negative`** |
| Reparto por tipo | 67 F / 30 N / 9 B / 4 I | **66 F / 31 N / 9 B / 4 I** |
| Prioridades | 49 C / 31 H / 28 M / 2 L | idéntico |
| Preguntas propias | 4 `open` | 3 `open`, **1 `answered`** (`Q-19`) |

**Registro.** El cambio de `name` de TC-041 produjo **una deriva de significado** en
S-12, que se aceptó **de forma nominal** con `accept --ids TC-041`: no existe
aceptación en bloque, a propósito. Ninguna otra ancla se tocó.

**Por qué MINOR.** Por primera vez desde 1.0.0 cambia el contenido del bloque
`testcases`. **No es MAJOR** porque no cambia la estructura del contrato ni se
renumera, retira o añade ningún `TC-nnn`, y los otros 109 casos son idénticos byte a
byte. **No es PATCH** porque quien ya hubiera generado algo a partir de TC-041 —un
escenario Cucumber, una fila de Rally— obtiene un resultado distinto.

**Qué quedó obsoleto:** DOC-07 (**sí**, y el aviso A-05-01a quedó resuelto), DOC-23
(**sí, y esta vez de verdad**: el escenario `@TC-041` debía regenerarse, y su tercer
paso necesita la misma llamada directa que TC-900), DOC-19 (**sí, para un caso**).
DOC-13, **no**. Rally: **un solo upsert con efecto**, `TALLER-ALB-TC-041`; como el
`external_id` no varía, Rally actualiza en vez de duplicar.

---

## 1.2.0 — 2026-08-16 · MINOR

**Fidelidad:** reconstruida a partir de lo que DOC-05 1.4.1 y DOC-07 1.5.0 afirman
de ella. **Ningún caso cambió en esta versión.**

**Qué cambió.** Nace el bloque estructurado **`open_questions`**, con `owner` en
cada entrada y con la separación entre `questions` (propias) y `cites` (de otro
documento). Hasta 1.1.0 las preguntas vivían solo en prosa, y leyendo prosa S-12 no
puede distinguir si un `Q-nnn` ajeno se **cita** o se **reclama**: sobre 1.1.0
informaba de *11 sospechas y ninguna certeza*. Con el bloque, cero.

**Renumeración de las preguntas propias — tabla de equivalencia.** Tres preguntas
habían nacido el 2026-08-15 numeradas a mano, sin censo común, y dos de esos números
**ya pertenecían a A-02** en DOC-04, que los usó el 2026-08-16 con **ocho minutos de
diferencia** para los estados de pago de factura y de nómina. La regla se aplicó tal
cual: **el reclamante renumera y no toca las del otro documento.** Los números libres
los dio S-12 (`next --prefix Q --count 4`).

| Número en 1.1.0 | Número desde 1.2.0 | Pregunta | Motivo del cambio |
|---|---|---|---|
| Q-14 (A-03) | **Q-17** | Modo de redondeo cuando el tercer decimal es exactamente 5 | Colisión: `Q-14` es de A-02 en DOC-04 (estado de pago de la factura) |
| Q-15 (A-03) | **Q-18** | Vías de entrada distintas de la interfaz | Colisión: `Q-15` es de A-02 en DOC-04 (estado de pago de la nómina) |
| Q-16 (A-03) | **Q-16** | Reinicio de la numeración anual al cambiar de ejercicio | **Sin colisión: conserva su número** |
| — | **Q-19** | Cobertura de los defectos confirmados por A-14 | **Nueva en 1.2.0**; respondida en 1.3.0 |

**`Q-16` se conservó a propósito.** Estaba libre en el registro, así que no había
colisión que resolver, y desplazarla habría hecho que el mismo `Q-16` designara dos
preguntas distintas en dos versiones del mismo documento —justo el daño que la
renumeración pretendía evitar—. **Renumerar lo que no colisiona no es prudencia, es
ruido.** Quien citara `DOC-05/Q-14` o `DOC-05/Q-15` de la versión 1.1.0 encuentra
aquí su equivalencia, y cada entrada del bloque conserva su `previous_id`.

**Nota de formato que sigue vigente y que no debe «arreglarse».** En la tabla de
prosa los identificadores ajenos se escriben `DOC-04/Q-nn`, con el documento dueño
delante, y en el bloque las entradas de `cites` llevan `owner` **como primera
clave**. El extractor de S-12 abre entrada nueva en cada fila cuyo primer campo es un
`Q-nnn` a secas y en cada línea `- id: Q-nnn`, y **una cita no debe abrir entrada**.
Si alguien reordena las claves o quita el prefijo, las 13 citas vuelven a contarse
como reclamaciones.

**Registro.** Se añadieron las 4 anclas Q-16 a Q-19 sin tocar las 282 anteriores.

---

## 1.1.0 — 2026-08-15 · MINOR

**Fidelidad:** reconstruida. Solo se afirma lo que DOC-05 1.4.1 y DOC-07 declaran de
ella.

**Qué cambió: ocho prioridades, sin añadir ni renumerar ningún caso.** La versión
1.0.0 aplicaba de forma mecánica la regla «`High` para el camino feliz de cada
requisito», y eso dejaba **ocho requisitos cubiertos solo por casos de prioridad
inferior a la suya**: cuando Rally ordenase la ejecución por prioridad del caso,
esos requisitos se probarían tarde pese a ser de lo más grave que puede romperse.

- **Cinco requisitos `critical`** —REQ-002, REQ-010, REQ-026, REQ-030, REQ-036—:
  suben a `Critical` **TC-003, TC-013, TC-034, TC-040 y TC-050**. En 1.0.0 se había
  resuelto al revés: se reservó `Critical` para los casos defensivos y se dejó en
  `High` la operación constructiva que esos casos protegen. TC-014 y TC-035 se
  quedaron en `Medium` por ser la segunda vía de acceso a la misma operación.
- **Tres requisitos `high`** —REQ-031, REQ-055, REQ-073—: suben **TC-041, TC-078 y
  TC-103**. En 1.0.0 se les había puesto `Medium` por confundir *lo barato que es
  comprobarlas* con *lo poco que importan*.

**Ninguna de las ocho correcciones requirió tocar DOC-04**: el error estaba en el
plan, no en el funcional.

**Lo que se detectó después sobre esta versión.** Sobre el estado de 1.1.0, S-12
encontró **11 sospechas de reclamación falsa de `Q-nnn` en prosa**, que el prefijo
`DOC-04/Q-nn` y el bloque estructurado de 1.2.0 eliminaron. Y A-05 fechó aquí el
origen de **A-05-01a**: DOC-05 1.0.0 se cerró **ocho minutos antes** que DOC-04
1.1.0, que reformuló REQ-031, de modo que TC-041 quedó escrito contra un enunciado
anterior. Esa simultaneidad fue la explicación válida del desfase hasta 1.3.0.

---

## 1.0.0 — 2026-08-15 · primera versión

**Fidelidad:** reconstruida.

Primer plan de pruebas del proyecto, derivado de **DOC-04 1.0.0**: **110 casos**
(TC-001 a TC-110) sobre **79 requisitos**, en nueve módulos, **sin ningún GAP
PLAN**. **239 pasos.** Sin `DOC-03-API.md` y sin `DOC-22-RALLY-BASELINE.yaml`: los
110 `TC-nnn` se crearon desde cero, no se heredó ninguno de Rally.

De esta versión procede la afirmación, verificada después tres veces, de que **109
de los 110 casos se escribieron contra DOC-04 1.0.0** —el caso 110, TC-041, se
re-derivó en 1.3.0—, y es la que el front-matter del documento principal sigue
conservando en `derived_from_version`.

**No consta** el detalle de reparto por prioridad y por tipo tal como se publicó
entonces; las cifras que se conocen son las de 1.2.0 en adelante. No se rellena.

---

## Nota de método sobre este fichero

Las entradas marcadas como **reconstruidas** no son un historial: son lo que se ha
podido salvar de un historial que no se llevaba aparte. La lección está en el propio
hueco —un documento que solo cuenta su última diferencia pierde las anteriores en
cuanto se reescribe— y es exactamente el motivo por el que el contrato separó las
dos cosas. A partir de 1.5.0 cada entrada es primaria y se escribe en el momento.

**Lo que este fichero no contiene, a propósito:** el bloque `inputs` con versión y
hash de cada entrada. Vive en el documento principal, porque es lo que S-16 lee para
calcular la cascada de obsolescencia, y duplicarlo aquí crearía dos verdades que se
desincronizarían a la primera.
