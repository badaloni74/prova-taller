---
doc_id: DOC-16-HIST
doc_name: DOC-16-ROADMAP-HIST
of_document: DOC-16-ROADMAP.md
version: 3.1.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-12 mejoras/roadmap
generator_version: "1.1"
generated_at: 2026-08-24T17:15:00+02:00
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

## 3.1.0 — 2026-08-24 — MINOR

**Ronda de análisis con evidencia nueva, no solo resello de procedencia.** `S-16` volvió a
marcar `DOC-16` como obsoleto por una única entrada:

```
DOC-07: declara 1.9.0, actual 1.10.0  [MINOR]
```

**Alcance deliberadamente estrecho.** Hay una onada mayor en curso con seis documentos
obsoletos; `DOC-16` fue el único despachado en esta pasada por ser el único invalidado
**solo** por `DOC-07` y sin depender de una decisión de negocio pendiente. `DOC-09`, que
acaba de pasar a 2.1.0 y está en revisión dentro de esa misma onada, **queda
deliberadamente congelado**: no se declara como entrada ni se cita, aunque
`DOC-07/A-05-15` conste allí como riesgo `RS-07`.

**Qué trajo `DOC-07` 1.10.0, verificado documento a documento, no asumido.** Nace
`docs/DOC-27-INFORME-API.md` 1.0.0 (`S-17`): informe de ejecución de la suite de servicio
sobre `automation/api/` — 10 `TCS-nnn` en verde, 28 peticiones, 31 aserciones, 0 residuo en
la base. `DOC-07` la incorpora sin mover la cobertura (100,00 %, 0 `GAP PLAN`, CSV
idéntico byte a byte, octava vez consecutiva) y nacen tres avisos: `A-05-14` (paso 2 de
`TC-041` sin ejercer por ninguna suite), `A-05-15` (borrar un albarán no devuelve el stock
de sus líneas de pieza, a diferencia de retirar una línea suelta) y `A-05-16` (la familia
`TCS-nnn` nace fuera de `registro-ids.json`).

**Antes de tocar nada se comprobó que ningún `MEJ-nnn` citaba `DOC-07`** en su
`evidence_refs` — cierto: las únicas menciones eran narrativas. El salto de versión, por sí
solo, no invalidaba ninguna prioridad. Lo que sí la movió fue leer `DOC-27` y su colección
directamente.

**Ninguna mejora nace ni cambia de estado.** Se decidió expresamente no crear un `MEJ-010`
a partir de `A-05-15`, con tres motivos: (1) si el sistema debe devolver el stock al borrar
el albarán es una pregunta de producto que `DOC-07` deja explícitamente sin responder —
`REQ-039` habla de retirar una línea, `REQ-041` de borrar el albarán, ninguno del otro —;
(2) cualquier reformulación aparentemente neutra («reutilizar el camino de retirada de
línea») decide lo mismo por la puerta de atrás; (3) la parte que sí es técnica ya tenía
sitio en `MEJ-004`. El hallazgo se incorpora como `evidence_ref` de `MEJ-004` (noveno
candidato de la misma familia, con una forma nueva: la regla existe en una ruta del
fichero y no en la otra) y la pregunta de producto va a `findings_for_others`, target
`A-02`, sin resolverla.

**Cuatro mejoras ganan o matizan evidencia, ninguna cambia de tamaño, dificultad ni
dependencia:**

- **`MEJ-002`** crece: la colección de servicio afirma cuatro de los 71 literales de error
  con igualdad exacta (`to.eql`), verificados contra el código. Segundo consumidor, segundo
  dueño (`S-17`), mismo texto sin catálogo.
- **`MEJ-003`** (aceptada) queda **parcialmente satisfecha, sin cambio de estado**: existe
  ya una suite de servidor real y con informe, pero cubre 2 de 7 routers, vive fuera de
  `server/`, no tiene CI y `nomines`/`personal` no tienen ni una comprobación. La pregunta
  de si esto sustituye o solo complementa a `MEJ-003` queda para quien la lleve a `A-07`.
- **`MEJ-004`** crece por `A-05-15`, como se ha explicado arriba.
- **`MEJ-006`** se matiza **en contra** de su propio argumento de urgencia: `DOC-27` §5
  demuestra que la suite de servicio se ejecuta de forma repetible sin nada de lo que
  `MEJ-006` propone (base no resembrada, idéntica antes y después). Baja del primer al
  tercer puesto en la recomendación.

**La recomendación cambia de orden**, no de contenido: `MEJ-009` (sin cambios, primer
puesto), `MEJ-002` (sube al segundo por evidencia nueva), `MEJ-006` (baja al tercero por el
motivo de arriba).

**Se corrige el cuerpo heredado que la 3.0.1 dejó desfasado a propósito**, tal como
anunciaba su propia entrada de este fichero: las citas a «`DOC-14` 2.0.0», «`DOC-23` sigue
en 2.0.0», «`DOC-07` 1.7.0», `EXP-027` como abierto y «`DOC-25` 1.1.1» pasan a reflejar
`DOC-14` 2.1.0, `DOC-23` 2.2.0, `DOC-07` 1.10.0, `EXP-027` cerrado y `DOC-25` 1.2.1.

**Tres hallazgos que este documento venía reenviando ronda tras ronda ya fueron recogidos
por su destinatario**: `EXP-017`, `EXP-026` y `EXP-019` son `FUN-009` a `FUN-011` en
`DOC-25` 1.2.0; `EXP-003` es `FUN-012`; `DOC-07/A-05-11c` fue evaluado por `A-15` y no dio
lugar a propuesta. Se documenta el cierre y se deja de repetirlos como pendientes.

**Corrección del bloque `inputs`, verificación hash a hash.** Se comprobó versión
declarada contra real y hash declarado contra calculado en las diez entradas presentes
(`DOC-09` excluido por estar congelado). Cuatro llevaban un hash que ya no correspondía a
su fichero, sin que hubiera cambiado el número de versión: `DOC-02-TECNICA.md` (commit
`c71c580`, dos rutas de spec reescritas, `graph` sin cambios — verificado el diff),
`DOC-05-PLAN-PRUEBAS.md` (commit `7f2000f`, resello de procedencia de `A-03`, solo
front-matter — verificado el diff), `registro-ids.json` (tocado en `20496d3` y `c71c580`,
recontado: sigue con 8 anclas `MEJ`) y `DOC-25-PROPUESTAS-FUNCIONALES.md`, que además
llevaba la propia versión mal declarada (1.2.0 en vez de 1.2.1 real). Las cuatro se
corrigen; ninguna cambió una conclusión de este documento — se verificó el diff de cada
una, no se asumió.

**Por qué MINOR y no PATCH.** Era la decisión que había que tomar con cuidado, porque el
resultado más probable a priori era PATCH: la cobertura no se mueve y ningún `MEJ-nnn`
cambia de estado. No es lo único que ha pasado. Hay contenido nuevo verificable que la
3.0.1 no podía contener: cuatro fichas de mejora ganan o pierden peso en su argumento
(`MEJ-002`, `MEJ-003`, `MEJ-004`, `MEJ-006`), el orden de la recomendación cambia, nace un
apartado de análisis nuevo (`A-05-15` y por qué no se convierte en `MEJ-010`) y tres
hallazgos históricos se cierran por su destinatario. Es el mismo criterio que sostuvo la
2.1.0: evidencia que crece o se matiza en varias fichas es `MINOR`, aunque ningún `MEJ-nnn`
cambie de estado.

**Efecto secundario, anotado sin ser responsabilidad de esta ronda.** Este salto a 3.1.0
deja a `DOC-14` (que cita `DOC-16` 3.0.0 en su propio `inputs`) y a `DOC-25` (que cita
`DOC-16` 3.0.0) como obsoletos según `S-16`. No corresponde a `A-12` corregirlo: lo
disparará el propio dueño de cada documento en su momento.

**`registro-ids.json` no se toca.** Ningún `MEJ-nnn` nuevo, retirado ni reformulado.

---

## 3.0.1 — 2026-08-24 — PATCH

**Resincronización de procedencia, sin ronda de análisis.** `S-16 · Cascada de
obsolescencia` volvió a marcar `DOC-16` como obsoleto por tres entradas a la vez:

```
DOC-07: declara 1.8.0, actual 1.9.0  [MINOR]
DOC-14: declara 2.0.0, actual 2.1.0  [MINOR]
DOC-23: declara 2.0.0, actual 2.2.0  [MINOR]
```

**Motivo, comprobado documento a documento, no asumido.**

- **`DOC-23` 2.0.0 → 2.2.0.** Dos ejecuciones reales de la suite (no de código
  leído): 2.1.0 confirmó `TC-048` corregido y 18 casos nuevos en rojo, todos con
  la misma causa raíz (`EXP-027`, 17 casos) más un rojo aislado de
  infraestructura (`TC-103`); 2.2.0 documenta que los 18 se corrigieron y
  reverificaron (commits `735ded8` y `5366e18`), dejando la suite en 107/107.
- **`DOC-14` 2.0.0 → 2.1.0.** Resincronización dirigida de `A-10` contra `DOC-23`
  2.2.0: `EXP-027` pasa de `abierto` a `corregido` (`corregido_en: 2026-08-24`),
  citando la reejecución de `DOC-23` como prueba de cierre en vez de reproducir
  el defecto a mano. Ningún otro `EXP-nnn` cambia. Hubo una 2.0.1 intermedia
  (`PATCH`, resync de la cita a `DOC-16` 2.1.0→3.0.0, sin tocar ningún hallazgo).
- **`DOC-07` 1.8.0 → 1.9.0.** `A-05` confirmó, byte a byte, que el CSV de la
  matriz sale con el mismo md5 y que los bloques `yaml requirements`/`yaml
  testcases` de `DOC-04`/`DOC-05` no cambian: el salto es trazabilidad pura del
  cierre de `EXP-027` (formalizado como `A-05-13`, que se cierra) y de `TC-048`
  (que cierra la mitad concreta de `A-05-08b`, sin cerrar el hallazgo entero).
  0 GAP PLAN y 100,00 % de cobertura no cambian.

**Comprobado contra el propio contenido de `DOC-16`, no dado por supuesto: ningún
`MEJ-nnn` cambia de estado.** `EXP-027` nunca se convirtió en una mejora de este
roadmap — es, y sigue siendo, un hallazgo dirigido a `A-03`/`S-10` (apartado 6.5,
`findings_for_others`), porque el defecto no estaba en la aplicación sino en los
`.feature` de `automation/ui/`. Revisados uno a uno los nueve `MEJ-nnn`:
ninguno cita `DOC-07`, `DOC-14` ni `DOC-23` en su `evidence_refs` por algo que
haya cambiado en este salto. En concreto:

- **`MEJ-008`** (implementada) menciona `EXP-027` solo en su `residual_note`,
  como confirmación de un riesgo que la propia ficha ya había anticipado por
  escrito; el hallazgo nunca fue parte de lo que `MEJ-008` tenía que cerrar.
- **`MEJ-005`** (aceptada) cita a `TC-048` como ejemplo narrativo de por qué
  hace falta un estado de base reproducible; `TC-048` ya estaba corregido antes
  de esta ronda (`DOC-23` 2.1.0) y este salto no cambia esa mejora ni su
  justificación de fondo — la necesidad de un estado de base reproducible entre
  escenarios no depende de si hay 0 o 18 casos en rojo hoy.
- Ninguna otra mejora (`MEJ-001` a `MEJ-004`, `MEJ-006`, `MEJ-007`, `MEJ-009`)
  menciona `EXP-027`, `TC-048` ni ninguno de los 18 casos.

**Qué se actualiza.** Solo el front-matter del documento principal: las tres
entradas de `inputs` (`DOC-07` 1.8.0→1.9.0, `DOC-14` 2.0.0→2.1.0, `DOC-23`
2.0.0→2.2.0, hashes recalculados), el `commit_sha` de `source` y
`generated_at`. **El cuerpo no se toca.** Quedan, a propósito, menciones ya
desactualizadas hasta la próxima regeneración con análisis: «`DOC-14` 2.0.0»
(Procedencia, 1.1 a 1.4, 3.3, 5.1, 5.6), «`DOC-23` sigue en 2.0.0» (3.3, fila de
`MEJ-005`) y `EXP-027` descrito como hallazgo abierto para `A-03` (6.5 punto 1,
bloque `findings_for_others`) cuando ya está cerrado. Es el mismo criterio que
las dos notas de 2026-08-23 de más abajo, y el mismo que `A-05` aplicó al
resincronizar `DOC-07` con `DOC-06` 1.3.0: un resello de procedencia no
reescribe un análisis que no se ha vuelto a hacer.

**Por qué PATCH y no «sin cambio de versión».** Las dos notas anteriores de este
mismo fichero (2026-08-23) dejaron la versión en 3.0.0 sin incrementarla,
razonando que «no hay contenido nuevo que numerar». Esta vez se numera, en
línea con lo que ya hacen los documentos vecinos de esta misma cascada para
resincronizaciones puramente de procedencia (`DOC-14` 2.0.0→2.0.1,
`DOC-09` 2.0.2→2.0.3): un `PATCH` explícito deja rastro de que hubo una
resincronización real, con su propio commit y su propia fecha, en vez de que el
número se quede fijo indefinidamente mientras las notas se acumulan debajo. No
es `MINOR` porque ningún `MEJ-nnn` cambia de estado, tamaño, prioridad ni
evidencia citable — el criterio que la propia tarea de esta ronda pedía
verificar contra el contenido, no asumir.

**`registro-ids.json` no se toca.** Ningún `MEJ-nnn` nuevo, retirado ni
reformulado.

---

## Nota — 2026-08-23 (2) — resincronización de procedencia, sin cambio de versión

No es una entrada de versión: no hay análisis nuevo que hacer. Se documenta porque
`S-16 · Cascada de obsolescencia` volvió a marcar `DOC-16` como obsoleto, esta vez por
depender de una versión superada de `DOC-07-TRAZABILIDAD.md` (1.7.0 → 1.8.0, MINOR).

**Motivo.** `DOC-07` subió a 1.8.0 (commit `de39daf`) porque `S-16` la marcó obsoleta
por su propia dependencia de `DOC-14` (1.0.0 → 2.0.0, ya incorporada por `DOC-16` en su
propia versión 3.0.0). Verificado leyendo `DOC-07-TRAZABILIDAD.md` 1.8.0 y su
`-HIST.md`: el salto trae el cierre de `EXP-007` (A-05-03b deja de tener un defecto de
sistema vivo; «requisitos con defecto confirmado» baja de 6 a 4) y un hallazgo nuevo,
`A-05-13`, que formaliza dentro de la trazabilidad lo que `EXP-027` ya decía —los
`.feature` de `factures`/`nomines` siguen con punto decimal tras `SPEC 05`— y añade que
`DOC-23` 2.0.0 es un día anterior a que ese spec entrara en `Implemented`.

**Por qué no hay reanálisis.** Ninguno de los dos hechos es nuevo para este documento:
`DOC-16` 3.0.0 ya citaba el cierre de `EXP-007` como uno de los cuatro hallazgos que
`DOC-14` 2.0.0 verificó cerrados (apartado 1, tabla de cambios) y ya dedicaba el
apartado 1.1 (punto 2) y el hallazgo 6.5 a `EXP-027` con la misma severidad `high`,
dirigido a `A-03`/`S-10`, con el mismo conteo de casos afectados. **`DOC-16` no cita
`DOC-07` como fuente de evidencia de ningún `MEJ-nnn`** —comprobado: ningún
`evidence_refs` de la sección estructurada apunta a `DOC-07`; las únicas menciones son
narrativas (`A-05-06`, `A-05-11c`, las tres aristas de grafo en 5.4/6.3/6.8), ninguna
tocada por el salto a 1.8.0—, así que no hay evidencia nueva que mueva ninguna mejora,
ni siquiera `MEJ-009` (que sale de `EXP-028`, no de `EXP-007`). `A-05-13` no es un
hallazgo distinto de `EXP-027`: es el mismo hecho leído desde la matriz de cobertura.

**Qué se actualiza.** Solo el front-matter del documento principal: la versión de
`DOC-07-TRAZABILIDAD.md` declarada en `inputs` (1.7.0 → 1.8.0), su `hash`
(`sha256:5cc1a789…` → `sha256:095c6baf…`), el `commit_sha` de `source` y
`generated_at`. La `version: 3.0.0` del documento principal **no cambia**, mismo
criterio que la nota anterior de esta misma fecha (resync con `DOC-25` 1.2.0) y que
`A-05` aplicó al resincronizar `DOC-07` con `DOC-06` 1.3.0. Las menciones en el cuerpo a
«`DOC-07` 1.7.0» (apartado de Procedencia, 1.4, 5.5) quedan tal cual hasta la próxima
regeneración con análisis.

**`registro-ids.json` no se toca.** Ningún `MEJ-nnn` nuevo, retirado ni reformulado.

---

## Nota — 2026-08-23 (1) — resincronización de procedencia, sin cambio de versión

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
  construida por `specs/implemented/SPE-04-proteccio-enviaments-duplicats.md`) y `MEJ-008` (formato único
  de importe y fecha, construida por `specs/implemented/SPE-05-presentacio-imports-i-dates.md`). Los dos
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
