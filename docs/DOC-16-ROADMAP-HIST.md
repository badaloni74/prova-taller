---
doc_id: DOC-16-HIST
doc_name: DOC-16-ROADMAP-HIST
of_document: DOC-16-ROADMAP.md
version: 3.0.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-12 mejoras/roadmap
generator_version: "1.1"
generated_at: 2026-08-23T14:38:00+02:00
project: app-taller
project_code: TALLER
purpose: >-
  Historial de versiones de DOC-16. El documento principal refleja solo el estado
  actual; todo lo que cambió en cada versión, por qué subió el número y qué mejoras
  cambiaron de estado vive aquí. La **procedencia** —el bloque `inputs` con versión y
  hash de cada entrada— NO está aquí: se queda en el documento principal, porque es lo
  que `S-16 · Cascada de obsolescencia` necesita leer para calcular qué ha quedado
  obsoleto.
reconstruction_note: >-
  Este fichero nace en 2.1.0. Las entradas de 2.0.0 y 1.0.0 están reconstruidas a
  partir del propio DOC-16 y son fieles a lo que allí consta, pero no se escribieron en
  su momento; se señalan como reconstruidas. Hasta esta versión (3.0.0) el fichero no
  llevaba front-matter, excepción histórica documentada más abajo: se corrige aquí para
  seguir el mismo patrón que DOC-05-HIST, DOC-07-HIST, DOC-08-HIST y DOC-25-HIST.
---

# DOC-16-ROADMAP · Historial de versiones

Historial del documento `docs/DOC-16-ROADMAP.md`. Una entrada por versión, de la más nueva
a la más antigua. **El documento principal no reproduce nada de esto**: refleja solo el
estado actual, con su `version` en el front-matter.

**Nota sobre este fichero.** Lo crea A-12 en la versión 2.1.0. Las versiones 2.0.0 y 1.0.0
lo declaraban como fichero hermano y **no llegó a escribirse**; sus entradas están
reconstruidas a partir del propio documento y son fieles a lo que allí consta, pero se
señalan como reconstruidas para que nadie las tome por notas escritas en su momento.
**Hasta la versión 3.0.0 este fichero no llevaba front-matter propio** —excepción
histórica ya señalada por `S-16` (`sin_procedencia`, `DOC-16-ROADMAP-HIST.md`)—; se
añade en 3.0.0 siguiendo el mismo patrón que adoptaron `DOC-05-HIST`, `DOC-07-HIST`,
`DOC-08-HIST` y `DOC-25-HIST`.

---

## Nota — 2026-08-23 — resincronización de procedencia, sin cambio de versión

No es una entrada de versión: no hay análisis nuevo que hacer. Se documenta porque
`S-16 · Cascada de obsolescencia` marcó `DOC-16` como obsoleto por depender de una
versión superada de `DOC-25-PROPUESTAS-FUNCIONALES.md`.

**Motivo.** `DOC-25-PROPUESTAS-FUNCIONALES.md` pasó de 1.1.1 a 1.2.0 (commit
`3f10869`): nacen `FUN-009` a `FUN-012` a partir de los hallazgos que este mismo
documento —`DOC-16` 3.0.0, apartado 6— ya le había dirigido (`EXP-017`, `EXP-026`,
`EXP-019` del apartado 6.1, y el detalle técnico de `REQ-025`/`REQ-034` del apartado
6.3). `DOC-25` 1.2.0 cita explícitamente `DOC-16` 3.0.0 como versión actual y no
introduce ningún hallazgo que este documento no conociera ya.

**Por qué no hay reanálisis.** El contenido de `DOC-16` no depende de lo que `A-15`
haga con los hallazgos que le manda: `DOC-25` es un consumidor de este documento en
el apartado 6, no una entrada que alimente el análisis de deuda técnica, cobertura o
defectos de las secciones 1 a 5. Que `FUN-009` a `FUN-012` existan ahora no cambia
ninguna evidencia (`DOC-24`, `DOC-07`, `DOC-14`, `DOC-02`) sobre la que se sostienen
las mejoras `MEJ-nnn`.

**Qué se actualiza.** Solo el front-matter del documento principal: la versión de
`DOC-25-PROPUESTAS-FUNCIONALES.md` declarada en `inputs` (1.1.1 → 1.2.0), su `hash`
(`sha256:b9070b12…` → `sha256:b4f26c8f…`), el `commit_sha` de `source` y
`generated_at`. La `version: 3.0.0` del documento principal **no cambia**: no hay
contenido nuevo que numerar, siguiendo el mismo criterio que `A-05` aplicó al
resincronizar `DOC-07` con `DOC-06` 1.3.0 (commit `8c4086c`). Las menciones en el
cuerpo a «`DOC-25` 1.1.1» (apartados de procedencia, 6.1 y hallazgos) quedan tal cual
hasta la próxima regeneración con análisis, que es cuando corresponde revisarlas.

**`registro-ids.json` no se toca.** Ningún `MEJ-nnn` nuevo, retirado ni reformulado.

---

## 3.0.0 — 2026-08-23 — MAJOR

**Ronda de verificación de cierre, no ronda de análisis desde cero.** Se ejecuta porque
`S-16` marca `DOC-16` como obsoleto por `DOC-02` (1.0.0 → 1.1.0, MINOR) y `DOC-14` (1.0.0
→ 2.0.0, MAJOR).

**Qué cambia.**

- **Dos mejoras pasan de `proposed` a `implemented`**: `MEJ-007` (guarda de reenvío,
  construida por `specs/04-proteccio-enviaments-duplicats.md`) y `MEJ-008` (formato único
  de importe y fecha, construida por `specs/05-presentacio-imports-i-dates.md`). Los dos
  specs citan a `DOC-16` por nombre. Verificado que el problema atacado desapareció de
  verdad: `EXP-001`, `EXP-002`, `EXP-007` y `EXP-014` cierran con red y base de datos
  comprobadas; `EXP-009` cierra solo en su parte de presentación.
- **Una mejora nueva**: `MEJ-009` (aplicar `formatDate` a `Personal.dataAlta`), de
  `DOC-14/EXP-028`, identificador pedido a `S-12`. Tamaño trivial, `low`/`low`/`low`.
- **Ninguna otra mejora cambia de estado.** `MEJ-001`, `MEJ-003` y `MEJ-005` siguen
  `accepted` sin haber entrado en `A-07`, seis días después de la decisión. `MEJ-002`,
  `MEJ-004` y `MEJ-006` siguen `proposed`, **sin evidencia nueva esta ronda**: se dice así
  en vez de fabricar movimiento.
- **El worktree de esta ronda estaba desactualizado respecto a `master`** (mismo
  merge-base que su propia `HEAD`, doce commits detrás) y se avanzó en fast-forward antes
  de leer nada; sin eso se habría regenerado sobre `DOC-02` y `DOC-14` en 1.0.0.
- **Ninguna cifra de código requirió corrección**: `server/routes/` no se ha tocado desde
  la verificación de 2.1.0 (`b2a8d77`), así que 893 líneas, 86 `res.status` y 71 literales
  siguen siendo correctos.
- **Dos hallazgos nuevos para `A-03`/`S-10`**: `DOC-14/EXP-027` (`high`, los `.feature` de
  `factures`/`nomines` validan literales con punto decimal que ya no coinciden con la
  pantalla) y la constatación de que `CLAUDE.md` ya no describe el estado exacto de la
  suite.
- **Se añade el front-matter de este fichero**, siguiendo el patrón de `DOC-05-HIST` y
  `DOC-07-HIST`.

**Por qué MAJOR.** Dos mejoras cambian de significado —de `proposed` a `implemented`—,
el mismo tipo de cambio que 2.0.0 marcó como invalidante cuando fue de `proposed` a
`accepted`.

---

## 2.1.0 — 2026-08-22 — MINOR

**Ronda de análisis con evidencia nueva.** Se ejecuta porque `S-16` marca DOC-16 como
obsoleto por DOC-07 (1.5.0 → 1.7.0) y DOC-05 (1.4.1 → 1.6.0), y porque aparecen dos
entradas que no existían: `DOC-23-INFORME` 2.0.0 y `DOC-14-EXPLORATORIO` 1.0.0.

**Qué cambia.**

- **Dos mejoras nuevas**, con identificadores pedidos a `S-12`:
  - `MEJ-007` · Una sola guarda contra el reenvío en los tres puntos de escritura del
    cliente (de `DOC-14/EXP-002` `critical` y `EXP-001` `high`).
  - `MEJ-008` · Un único sitio donde se dé formato a importes y fechas (de
    `DOC-14/EXP-014` y `EXP-009`, con 15 `toFixed` en 8 ficheros contados en código).
- **Ninguna mejora cambia de estado.** Siguen `accepted` MEJ-001, MEJ-003 y MEJ-005;
  siguen `proposed` MEJ-002, MEJ-004 y MEJ-006. **Ninguna decisión nueva: A-12 no decide.**
- **Se responde a la pregunta de si MEJ-003 ha dejado de hacer falta**: no. Verificado en
  `b2a8d77` que no hay pruebas de servidor, ni CI, ni script `test`. Lo aparecido es una
  suite de interfaz que `A-05-03` y el nuevo `A-05-03b` demuestran insuficiente para lo que
  MEJ-003 compraba. Apartado 1.1, nuevo.
- **Evidencia crecida en cuatro mejoras**: MEJ-001 y MEJ-005 (aceptadas, apartado 1.2),
  MEJ-002 y MEJ-004. Sube la urgencia de MEJ-002 (`low` → `medium`), MEJ-004
  (`medium` → `high`) y MEJ-006 (`low` → `medium`). **Ninguna evidencia ha menguado.**
- **El patrón del apartado 3.0 se recuenta: de 4 defectos de escritura a 8.**
- **Tres hallazgos que `DOC-14` dirigió a A-12 (`EXP-017`, `EXP-019`, `EXP-026`) NO se
  convierten en mejora**: son funcionalidad y van a `A-15`. Apartados 5.6 y 6.1.
- **Se corrige una premisa propia de 1.0.0**: «no hay concurrencia por diseño», usada para
  descartar la carrera de `generateNumero`, queda parcialmente falsada por `DOC-14/EXP-003`.
  La conclusión se mantiene; el argumento, no. Apartado 5.1.
- **Correcciones de cifras** por cambio de commit (`44748fb` → `b2a8d77`): literales de
  error 70 → **71**; `server/routes/` 877 → **893** líneas y 84 → **86** `res.status`.
- **Front-matter reescrito.** Se retiran `counts`, `decision`, `project`, `language`,
  `history` y los `usage` por entrada, y bajan al cuerpo, a un apartado «Procedencia». El
  motivo está tomado de `DOC-07/A-05-12`: un resumen en el front-matter es un caché que
  nadie invalida. **Se corrige el aviso de `S-16`**: `DOC-23` se declaraba sin versión y
  ahora va como 2.0.0 con hash y con su ruta nueva en `docs/`.
- **Hallazgo nuevo para `S-01`** (apartado 6.8): las tres aristas ausentes del grafo de
  DOC-02 afectan al cálculo de impacto de MEJ-007.
- **Se crea este fichero de historial.**

**Por qué MINOR y no MAJOR.** No se renumera ni se retira ningún `MEJ-nnn`, no se revoca
ninguna decisión y no cambia la estructura de identificadores. Se añade contenido y se
actualizan evidencias.

---

## 2.0.0 — 2026-08-17 — MAJOR *(entrada reconstruida)*

**Registro de decisión, no ronda de análisis.** El propietario del proyecto decidió sobre
las seis propuestas de 1.0.0.

- **Aceptadas**: `MEJ-001`, `MEJ-003`, `MEJ-005`.
- **Sin decidir**: `MEJ-002`, `MEJ-004`, `MEJ-006`.
- **Rechazadas**: ninguna.
- **No se propuso ninguna mejora nueva** y no se pidió ningún identificador a `S-12`.
- Se documentó por qué la aceptación de `MEJ-003` **contradice `specs/01:48`**, que excluía
  la suite de tests, y por qué se aceptó igual: el sistema sobre el que se tomó aquella
  decisión ya no es éste.
- Se corrigieron tres cifras que 1.0.0 citaba de `DOC-07` 1.4.0 y que su autor rectificó en
  1.5.0 (alcance de A-05-01, y las colisiones de A-05-06: 15 en DOC-05 y 19 en DOC-06).
- Se unificó la declaración de `DOC-07` en `inputs`, con la matriz como `companion_file`.

**Por qué MAJOR.** Cambia el estado de tres mejoras de `proposed` a `accepted`, que es un
cambio de significado del documento para sus consumidores.

---

## 1.0.0 — 2026-08-16 — primera versión *(entrada reconstruida)*

Primera ejecución de A-12 sobre `app-taller`. Sin histórico previo, sin `DOC-17` y sin
entorno Rally: toda la evidencia salió de cobertura (`DOC-07`), defectos (`DOC-24`),
automatización (`DOC-23` 1.0.0), verdad técnica (`DOC-02`) y lectura directa de código en
el commit `44748fb`.

- **Seis mejoras propuestas**, `MEJ-001` a `MEJ-006`, cinco de `evidence` y una de
  `opinion`.
- **El hallazgo central**: los cuatro defectos confirmados de `DOC-24` son el mismo
  defecto —una comprobación ausente en el punto de escritura—, del que salen MEJ-004 y,
  como condición previa, MEJ-003.
- **Cuatro cosas consideradas y no propuestas**, con su motivo escrito, entre ellas la
  carrera de `generateNumero` y las correcciones de BUG-001 a BUG-004.
- **Cinco hallazgos dirigidos a otras piezas** (A-15, A-14, S-12, A-03).
