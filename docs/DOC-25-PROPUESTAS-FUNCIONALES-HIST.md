---
doc_id: DOC-25-HIST
doc_name: DOC-25-PROPUESTAS-FUNCIONALES-HIST
of_document: DOC-25-PROPUESTAS-FUNCIONALES.md
main_document: docs/DOC-25-PROPUESTAS-FUNCIONALES.md
version: 1.3.0        # no se versiona por separado: refleja la version del documento que historia, para que S-16 no lo lea como artefacto sin version
status: draft
generator: A-15 propuestas de funcionalidad
generator_version: "1.1"
generated_at: 2026-08-31T21:00:00+02:00
language: es
purpose: >-
  historial de versiones de DOC-25. El documento principal refleja solo el estado actual y no
  reproduce nada de lo que hay aquí. La procedencia —el bloque `inputs` con version y hash de
  cada entrada, que S-16 necesita— se queda en el documento principal y no se duplica aquí
---

# DOC-25 · Historial de versiones

Una entrada por versión, de la más nueva a la más antigua.

**Qué es cada tipo de salto**, tal como los aplica A-15:

| Tipo | Cuándo |
|---|---|
| **MAJOR** | Una propuesta cambia de estado por decisión de negocio, se retira o se sustituye por otra. Cambia lo que el lector puede dar por decidido |
| **MINOR** | Nacen propuestas nuevas, o cambia la evidencia, el alcance o una señal (`confidence`, `size`, `impact`) de alguna viva. Nada de lo ya leído deja de ser cierto |
| **PATCH** | Correcciones que no tocan el fondo de ninguna propuesta: citas rotas, erratas, procedencia |

---

## 1.3.0 — 2026-08-31 · MINOR

**Dos bugs que este documento seguía tratando como problema abierto ya están
resueltos: se corrige la lectura, no se inventa nada. `FUN-002` cambia de
evidencia; ninguna propuesta cambia de estado, se retira o nace.**

### Por qué se regenera

Lo detectó **`S-16 · Cascada de obsolescencia`**: `DOC-25` 1.2.2 declaraba
`DOC-04-FUNCIONAL.md` en `1.2.0`, con un `obsolescence_ack` que solo cubría
hasta `1.3.1`, y `DOC-04` había subido a `1.3.2`. Al leer el diff real para
decidir si bastaba con extender el `ack`, apareció el motivo de fondo: `DOC-04`
1.3.2 corrige la atribución de bug de tres preguntas respondidas (`Q-02`,
`Q-06`, `Q-12`) y, de paso, su propio texto seguía describiendo `BUG-004` y
`BUG-003` como abiertos en `DOC-24` — cierto cuando A-02 escribió esa
corrección (2026-08-30), ya no cierto el 2026-08-31.

Eso llevó a abrir `DOC-24-BUGS.json` directamente — entrada opcional que
ninguna ronda de este documento había vuelto a leer desde la 1.0.0 original
(2026-08-16) — y ahí está el hallazgo real: declaraba `1.0.0`, la versión real
es **`1.1.2`**. Los cuatro bugs censados constan `fixed`: `BUG-001` y `BUG-002`
desde el 2026-08-21 (commit directo `ed61c24`, sin `/spec`), `BUG-003` desde el
2026-08-30 (`SPE-07-importes-negativos`) y `BUG-004` desde el 2026-08-31
(`SPE-08-factura-rectificativa`), los cuatro verificados en vivo.

De paso se encontraron dos `obsolescence_ack` más superados por lectura real:
`DOC-01` (declarado `1.1.0`, `ack` hasta `1.2.0`, real `1.3.0`) y `DOC-16`
(declarado `3.1.0`, `ack` hasta `3.2.0`, real `3.3.0`). Los tres `ack` se
retiran del front-matter (quedan registrados en `obsolescence_response`); el de
`DOC-06` (hasta `1.4.1`) sigue vigente porque `DOC-06` real sigue en `1.4.1`.

### Por qué MINOR y no PATCH ni MAJOR

**No es PATCH** porque cambia la evidencia y la nota de una propuesta viva
(`FUN-002`): se retira `DOC-24/BUG-004` de su `evidence_refs` porque el caso
que citaba —una factura emitida por error no se podía eliminar por ningún
medio— ya tiene solución propia (`SPE-08`), ajena a esta propuesta. **No es
MAJOR** porque ninguna `FUN-nnn` cambia de `status`, se retira ni se sustituye,
y el orden de la recomendación del apartado 2 no cambia.

### Qué ha cambiado

**1 · La tabla del apartado 5.1.** Marcaba las decisiones de `Q-02`, `Q-06`,
`Q-10` y `Q-12` como «Decidido», sin más. Las cuatro pasan a **Implementado**,
con su vía de corrección y su fecha: `Q-02`/`Q-10` por corrección directa
(`Q-10` además formalizada como `SPEC 06`), `Q-06` por `SPE-08`, `Q-12` por
`SPE-07`. Solo `Q-14` y `Q-15` siguen pendientes. La viñeta sobre «los
albaranes de una factura quedan bloqueados para siempre» deja de ser una
decisión pendiente: ya está resuelta por `SPE-08`.

**2 · `FUN-002`.** Se retira `DOC-24/BUG-004` de `evidence_refs` y se explica
por qué no pierde nada: su valor nunca dependió de ese caso en particular, sino
de que todos los datos del taller viven en un único ordenador sin ninguna forma
de respaldo, que sigue siendo exactamente igual de cierto. Se anota, sin
proponer nada por falta de evidencia, que `SPE-08` deja explícito fuera de su
alcance el abono parcial de una factura (nueva fila en `considered_and_not_proposed`,
apartado 5.3).

**3 · Los hallazgos hacia `A-12`** sobre la falta de una comprobación común de
escritura (apartado 6). Los tres bugs que sostenían el hallazgo ya están
corregidos, cada uno en su propio router, sin módulo compartido; `DOC-16`
3.3.0 §1.8 documenta que `SPE-07` dejó además la misma regla duplicada
verbatim en `peces.js` (`POST` y `PUT`). Se actualiza la nota de cada fila con
este ejemplo. No se propone nada nuevo: la decisión sobre `MEJ-004` sigue
siendo de A-12.

**4 · El bloque `inputs`.** `DOC-04` (`1.2.0` → `1.3.2`), `DOC-24`
(`1.0.0` → `1.1.2`), `DOC-16` (`3.1.0` → `3.3.0`) y `DOC-01` (`1.1.0` → `1.3.0`)
pasan a su versión y hash reales, con `change_note` explicando qué se leyó y
por qué no mueve ninguna `FUN-nnn`. Los tres `obsolescence_ack` que estas tres
últimas superaban se retiran del front-matter.

**Lo que NO cambia.** Las doce `FUN-nnn` conservan número, texto y `status`.
Ninguna cambia `impact`, `difficulty`, `size` ni `business_value`. El orden de
la recomendación del apartado 2 es el mismo que en `1.2.2`.

---

## 1.2.2 — 2026-08-28 · PATCH

**Resello de procedencia contra `DOC-16-ROADMAP` 3.1.0, y tres correcciones de
hash desactualizado en `inputs`. Ninguna propuesta cambia: ni de estado, ni de
evidencia, ni de señal.**

### Por qué se regenera

Lo detectó **`S-16 · Cascada de obsolescencia`**: `DOC-25` 1.2.1 declaraba
`DOC-16-ROADMAP.md` en `3.0.0`, y el roadmap había subido a `3.1.0`. El motivo
del salto es ajeno a `A-15`: nació `DOC-27` —primer informe de la suite de
servicio de `S-17`— y, junto con la resincronización de `DOC-07` a 1.10.0,
`A-12` revisó las nueve `MEJ-nnn` de su roadmap contra esa evidencia.

### Por qué PATCH y no MINOR ni MAJOR

**No es MAJOR** porque ninguna propuesta ha cambiado de estado: las doce
siguen en `proposed`. **No es MINOR** porque se comprobó explícitamente, tal
como pide la instrucción de esta ronda, si alguna `FUN-nnn` cita `DOC-16` como
evidencia de algo que hubiera cambiado —no como mapa de cobertura cruzado— o
depende de una `MEJ-nnn` que hubiera cambiado de estado o de una cifra que
este documento reproduzca. **Ninguna de las dos cosas ocurre**:

- `DOC-16` 3.1.0 declara con todas las letras que **ninguna `MEJ-nnn` cambia
  de estado y no nace ninguna nueva** esta ronda. Crece la evidencia de
  `MEJ-002`, `MEJ-003` y `MEJ-004`, y se matiza la de `MEJ-006`, pero ninguna
  de las cuatro sostiene ni cierra ninguna `FUN-nnn` de este documento (5.5 no
  cambia ninguna de sus seis conclusiones).
- `DOC-16/§6.1` y `§6.2`, en 3.1.0, **dejan de reenviar** `EXP-017`,
  `EXP-026`, `EXP-019` y `EXP-003`: confirman explícitamente que están «ya
  recogidos» como `FUN-009` a `FUN-012` en esta misma `DOC-25`, citando su
  versión. Es una confirmación de que la puerta ya está cruzada, no evidencia
  nueva que mueva ninguna señal.
- `DOC-16/§6.3` confirma, sin matiz nuevo, la decisión que A-15 ya tomó en la
  ronda 1.2.0 de no proponer `FUN-nnn` para `REQ-025`/`REQ-034` y de
  redirigirlos a `A-14`.
- Nace `DOC-16/§6.9` (si borrar un albarán debe devolver el stock de sus
  líneas de pieza): va dirigido a **`A-02`**, no a `A-15`, y no se recoge en
  este documento.

Es, por tanto, un resello puro de la entrada `DOC-16` en `inputs`.

### Qué ha cambiado

**1 · La entrada `DOC-16-ROADMAP.md` en `inputs`.** Versión `3.0.0 → 3.1.0`,
hash recalculado sobre el fichero actual
(`sha256:9e68df18dd10f62a1698e5be478a1d5c0c46aa58b389ecf17394467989a85c81`), y
`change_note` con el detalle de la comprobación. `commit_sha` de `source` se
actualiza al `HEAD` tras la cascada (`511796975891e4ef74e644b0cc6e926d20ee4e8b`).

**2 · Tres hashes desactualizados sin cambio de versión, corregidos por
verificación propia, no por aviso de `S-16`.** Se comprobó versión declarada
contra real y hash declarado contra calculado en todo el bloque `inputs` —el
fallo que `S-16` no puede ver por sí solo, porque solo compara números de
versión—:

| Entrada | Declarado en 1.2.1 | Real | Por qué |
|---|---|---|---|
| `DOC-01-BASE-ASIS.md` | 1.1.0 · `0f074e68…` | 1.1.0 · **`828f05be…`** | Commit `c71c580` renombra la ruta de dos *specs* citadas como fuente de `BR-SHL-01`/`BR-SHL-02` (`specs/01-…` → `specs/implemented/SPE-01-…`). Verificado el diff completo: son las dos únicas líneas tocadas |
| `DOC-06-MANUAL-USUARIO.md` | 1.3.0 · `90ea9dd6…` | 1.3.0 · **`c081aea1…`** | Mismo commit `c71c580`, mismo patrón, sobre las dos rutas de `SPEC 04`/`SPEC 05` que cita el front-matter. §6 y §9 —el único alcance que A-15 lee de este documento— no cambian ni una palabra |
| `registro-ids.json` | `9f5b3679…` | **`bc54df9a…`** | Dos commits: `3f10869` (censo real de `FUN-009` a `FUN-012`, la propia ronda 1.2.0 de este documento) y `c71c580` (mismo renombrado de rutas). Recontado: siguen siendo las doce anclas `FUN` ya declaradas, todas `proposed` |

Ninguna de las tres correcciones cambia contenido sustantivo: en `DOC-01` y
`DOC-06` se verificó el diff completo (solo referencias de ruta), y en
`registro-ids.json` se recontaron las anclas `FUN`. Se corrigen porque
dejarlas mal declaradas habría significado que `S-16` no volviera a marcar
este documento por esas entradas aunque cambiaran de verdad.

### Qué no ha cambiado

Las **doce propuestas**, con su número, su texto, su estado `proposed` y todas
sus señales. La **recomendación** del apartado 2, en el mismo orden desde
1.2.0. `DOC-01`, `DOC-04`, `DOC-06` y `DOC-24` siguen en las versiones
declaradas en 1.2.1, sin cambio de contenido de negocio en ninguno. `DOC-14`
sigue en 2.1.0, sin cambios desde 1.2.1.

---

## 1.2.1 — 2026-08-24 · PATCH

**Resello de procedencia contra `DOC-14-EXPLORATORIO` 2.1.0. Ninguna propuesta
cambia: ni de estado, ni de evidencia, ni de señal.**

### Por qué se regenera

Lo detectó **`S-16 · Cascada de obsolescencia`**: `DOC-25` 1.2.0 declaraba
`DOC-14` en `2.0.0`, y el informe había subido a `2.1.0` (a través de una
versión intermedia `2.0.1`, resello puro del propio `DOC-14` contra `DOC-16`).
El salto de `2.0.0` a `2.1.0` cierra formalmente `EXP-027` —de `abierto` a
`corregido`— porque `A-10` verificó que `DOC-23` 2.2.0 confirma en verde los
`.feature` de `automation/ui` que antes citaban literales con punto decimal
(`121.00 €`) contra una pantalla que ya usa coma decimal desde `SPEC 05`.

### Por qué PATCH y no MINOR ni MAJOR

**No es MAJOR** porque ninguna de las doce propuestas cambia de estado.
**No es MINOR** porque se comprobó, propuesta por propuesta, que ninguna
`FUN-nnn` cita `EXP-027` en su `evidence_refs` ni depende de su estado
—abierto o corregido— para sostener su justificación. La única mención que
este documento le hacía a `EXP-027` era de procedencia: en el `scope`/`usage`
de la entrada de `DOC-14` en el front-matter, donde se dejaba constancia de
que ese hallazgo deriva a `A-03`/`S-10` (es un desajuste entre los `.feature`
de automatización y la pantalla, no una carencia funcional de la aplicación)
y no a `A-15`. Esa conclusión era cierta con `EXP-027` abierto y sigue siendo
cierta corregido: no hay nada que una propuesta de A-15 pudiera haber dado
por sentado y que ahora deje de serlo. Es, por tanto, un resello puro.

### Qué ha cambiado

Solo la entrada `DOC-14-EXPLORATORIO.md` en `inputs`: versión `2.0.0 →
2.1.0`, hash recalculado sobre el fichero actual
(`sha256:f1449e133c2eacf224467c55c01d9bcc4fb6bee9443d239fd27867ae1cd5b7ee`), y
una nota de cambio (`change_note`) que deja explícita la comprobación hecha.
`commit_sha` de `source` se actualiza al `HEAD` tras la cascada
(`2bbd4fe689b5f9f637d0c822bf4f0b0c81d3b93b`). El bloque `obsolescence_response`
del front-matter pasa a reflejar esta ronda (`round: 1.2.1`) y archiva el de
`1.2.0` bajo `history`, siguiendo el mismo criterio de «solo estado actual»
que aplica al resto del documento.

### Qué no ha cambiado

Las **doce propuestas**, con su número, su texto, su estado `proposed` y
todas sus señales. La **recomendación** del apartado 2, en el mismo orden
desde 1.2.0. El apartado 5.7 —que ya citaba `EXP-022`, `EXP-023` y `EXP-024`
como hallazgos de `DOC-14` sin pasar por el triaje de `DOC-16`— no se toca:
`EXP-027` no está entre ellos y su cierre no cambia el criterio de por qué
esos tres siguen fuera de alcance. `DOC-01`, `DOC-04`, `DOC-06`, `DOC-16` y
`DOC-24` siguen en las versiones declaradas en `1.2.0`, sin cambios.

---

## 1.2.0 — 2026-08-23 · MINOR

**Nacen cuatro propuestas: `FUN-009`, `FUN-010`, `FUN-011` y `FUN-012`. Las ocho
anteriores no cambian de estado ni de señal.** Primera novedad de propuestas
desde 1.0.0.

### Por qué se regenera

`S-16 · Cascada de obsolescencia` disparó la ronda: `DOC-25` 1.1.1 declaraba
`DOC-01` en 1.0.0, `DOC-06` en 1.2.0 y `DOC-16` en 2.0.0, y los tres habían
subido a **1.1.0**, **1.3.0** y **3.0.0**. El worktree estaba además catorce
commits por detrás de `master` y se hizo `git merge --ff-only master` antes de
leer nada.

### Por qué MINOR y no MAJOR ni PATCH

**No es MAJOR** porque ninguna de las ocho propuestas anteriores cambia de
estado: las ocho siguen en `proposed`, y ninguna decisión de negocio ha
recaído sobre ellas. **No es PATCH** porque nacen cuatro propuestas nuevas, que
por definición de esta misma tabla es MINOR.

### Qué ha cambiado

**1 · `DOC-01` 1.1.0 y `DOC-06` 1.3.0, sin efecto sobre este documento.**
`DOC-01` sube sin cambio de contenido de negocio (mismos actores, casos de
uso, reglas y glosario), verificado contra su propio `-HIST.md`. `DOC-06` sube
y añade en §6.1 dos avisos sobre comportamiento ya implementado por `SPEC 04`
y `SPEC 05` (protección de doble envío, formato de importes/fechas): no son
funcionalidad ausente, son defectos ya corregidos que el manual todavía no ha
limpiado de su lista. Las catorce carencias que sostenían las ocho propuestas
vivas siguen palabra por palabra iguales. §9 gana `Q-30`, hueco de
documentación ajeno a A-15.

**2 · `DOC-16` 3.0.0 reafirma tres hallazgos de UX que llevaban desde su ronda
2.0.0 sin que A-15 los hubiera podido evaluar, y nacen tres propuestas.**
`DOC-14 · Exploración QA` no existía cuando se escribieron las rondas 1.0.0 y
1.1.0/1.1.1 de este documento (nació el 2026-08-21); la única vía por la que
sus hallazgos podían llegar a A-15 era el triaje de `A-12` en `DOC-16`, y
`DOC-16` los reenvió desde su versión 2.0.0/2.1.0 sin que ninguna ronda de
A-15 se hubiera ejecutado desde entonces. Es la primera oportunidad real de
recogerlos, no un hallazgo perdido.

| Origen | Nace |
|---|---|
| `EXP-017` — formulario abandonado sin aviso | `FUN-009` |
| `EXP-026` — diálogo de borrado sin identificar el registro | `FUN-010` |
| `EXP-019` — pantalla de error sin salida | `FUN-011` |

**3 · `DOC-16/§6.2` reafirma `EXP-003` (concurrencia entre pestañas), no
evaluado nunca por A-15, y nace `FUN-012`.** Dos pestañas sobre la misma
ficha, y la que guarda en segundo lugar borra en silencio lo que había
guardado la primera. `A-12` lo deja pendiente de una decisión de negocio
—bloqueo con aviso o fusión por campos— que no le corresponde tomar a él;
tampoco a A-15, que lo traslada como propuesta con `confidence: medium`
precisamente porque el tamaño real depende de esa decisión.

**4 · `DOC-16/§6.3` señala por primera vez `REQ-025` y `REQ-034`/`BR-ALB-06`
sin cumplir en la interfaz, y no nace ninguna `FUN-nnn`.** `A-05`
(`DOC-07/A-05-11c`, citado por `DOC-16`) verificó leyendo `AlbaransList.tsx` y
`AlbaraLiniesSection.tsx` que el listado de albaranes no filtra por vehículo
ni por cliente y que la línea de pieza no tiene campo de precio manual. `A-12`
lo etiqueta como «funcionalidad ausente» y lo dirige a A-15; **A-15 no está de
acuerdo con esa clasificación** y aplica el mismo criterio que ya usaba con
los avisos de error en catalán: los dos requisitos están redactados en
presente, no en condicional, así que un comportamiento distinto no es un
hueco de producto por decidir, es un requisito vigente incumplido. Se
redirige a `A-14` como candidato a defecto, reforzado por que `DOC-06/§3`
describe la misma capacidad como si existiera. Detalle en el documento
principal, apartado 5.6.

**5 · Se anota, sin proponer nada, que `DOC-14` deriva tres hallazgos más
directamente a A-15** (`EXP-022`, `EXP-023`, `EXP-024`) **sin haber pasado
por el triaje de `DOC-16`.** `DOC-14` no es entrada formal de A-15; adelantar
estos tres sería saltarse la vía por la que le llegan los hallazgos de
exploración. Quedan anotados para no perderlos (apartado 5.7 del documento
principal) a la espera de que `DOC-16` los recoja.

**6 · La recomendación cambia de orden por primera vez desde 1.0.0.**
`FUN-010` entra al tercer lugar: mismo tamaño que `FUN-005` pero protege una
acción irreversible frente a un error de identificación ya reproducido
(`EXP-001`/`EXP-026`, dos clientes homónimos). `FUN-005` baja al cuarto lugar
sin perder ninguna señal.

**7 · `MEJ-007` y `MEJ-008` pasan a `implemented` en `DOC-16` 3.0.0; nace
`MEJ-009`.** Ninguna de las tres cierra ni abre una `FUN-nnn`: las dos
primeras son correcciones técnicas ya reflejadas en propuestas que no
dependían de ellas, y la tercera es consistencia de presentación entre dos
pantallas, no una capacidad ausente.

**8 · Registro de identificadores.** `S-12 next --prefix FUN` devolvió
`FUN-009`; se reclamaron los cuatro consecutivos (`FUN-009` a `FUN-012`) y se
sincronizó `registro-ids.json` con `sync --block propuestas`.

### Qué no ha cambiado

Las ocho propuestas anteriores, con su número, su texto, su estado `proposed`
y todas sus señales, salvo el orden de la recomendación (punto 6). `DOC-04`
sigue en 1.2.0, sin cambio de enunciado en ningún `REQ-nnn` verificado ancla a
ancla por A-02. `DOC-24` sigue en 1.0.0 con cuatro defectos.

---

## 1.1.1 — 2026-08-17 · PATCH

**Puesta al día contra `DOC-16-ROADMAP` 2.0.0 y dos correcciones de procedencia.
Ninguna propuesta cambia: ni de estado, ni de evidencia, ni de señal.**

### Por qué se regenera

Lo detectó otra vez **`S-16 · Cascada de obsolescencia`**: DOC-25 1.1.0 declaraba
`DOC-16` en **1.0.0** y `A-12 · Mejoras/Roadmap` lo había llevado a **2.0.0**. El
salto es MAJOR porque el 2026-08-17 el propietario del proyecto decidió sobre las
seis mejoras técnicas —**MEJ-001, MEJ-003 y MEJ-005 pasan a `accepted`**;
MEJ-002, MEJ-004 y MEJ-006 siguen `proposed`; ninguna rechazada—.

S-16 avisaba además de dos cosas propias de A-15: el `-HIST.md` no declaraba
`version`, y `DOC-02` figuraba en `inputs` sin versión.

### Por qué PATCH y no MINOR ni MAJOR

**No es MAJOR** porque ninguna propuesta ha cambiado de estado: las ocho siguen
en `proposed` y nadie ha decidido sobre ellas. **Que se hayan aceptado tres
mejoras técnicas no decide ninguna `FUN-nnn`.**

**No es MINOR** porque no nace ninguna propuesta y **ninguna de las ocho cambia
de evidencia, de alcance ni de señal**. Se comprobó una a una: ni `confidence`,
ni `size`, ni `impact`, ni `business_value` se mueven. Un MINOR habría que
justificarlo con algo que negocio pudiera leer distinto, y no lo hay.

**Es PATCH** porque lo que cambia es procedencia, una cita literal y el estado de
los hallazgos enviados a otras piezas. Y tiene una consecuencia práctica que
conviene dejar escrita: **DOC-16 2.0.0 declara DOC-25 en 1.1.0, y por la regla de
S-16 un PATCH no invalida a quien lo consume.** Elegir MINOR habría dejado
obsoleto el roadmap por un cambio que no le afecta en nada.

### Qué ha cambiado

**1 · Las citas a DOC-16, verificadas una a una. Ninguna rota.** Era el riesgo
real del MAJOR y por eso se comprobó antes que nada.

| Cita | En 2.0.0 | Estado |
|---|---|---|
| `DOC-16/§6.1` | Sigue siendo el hallazgo a A-15 sobre los avisos en catalán, ahora marcado `encaminado` | Intacta |
| `DOC-16/§6.2` | Sigue siendo el hallazgo a A-14, candidato a `BUG-005`, y sigue abierto | Intacta |
| `DOC-16/§6.3` | Sigue siendo el hallazgo a A-15 sobre *Configuración*, marcado `encaminado` porque ya es `FUN-003` | Intacta |

**2 · Una cita literal corregida, la única de esta versión.** La ficha de
`FUN-003` reproducía a A-12 como «un módulo sin desarrollar **no es una mejora,
es funcionalidad**», que es la redacción de DOC-16 1.0.0. En 2.0.0 la frase es
«un módulo sin desarrollar **es funcionalidad, no una mejora**». Mismo sentido,
mismo fondo de la propuesta, cita ahora exacta.

**3 · Las tres mejoras aceptadas, valoradas una a una. Ninguna cierra una
`FUN-nnn`.** Nuevo apartado **5.5** del documento principal, escrito porque en la
próxima ronda alguien se lo volverá a preguntar:

| Aceptada | Conclusión |
|---|---|
| `MEJ-001` · identificadores de prueba | Va a abrir las pantallas donde vive `FUN-001`, pero no cambia ninguna pantalla, flujo ni texto. **No se propone nada por aprovechar el viaje**: eso es calendario y lo valora `A-07` |
| `MEJ-003` · pruebas del servidor y CI | Cambia lo que el equipo sabe, no lo que el taller puede hacer |
| `MEJ-005` · estado de base reproducible | **No cubre `FUN-002`**, y es la confusión más fácil del documento: repone datos de prueba, no el trabajo real del taller |

**4 · Los cuatro hallazgos dirigidos a `A-12`, contrastados contra DOC-16 2.0.0.**
Se comprobó si habían aterrizado, que es lo que hay que hacer con un hallazgo
enviado. Los cuatro tienen dueño técnico: tres en `MEJ-004` —que sigue sin
decidir— y uno en `MEJ-005`, **ya aceptado**, que queda cerrado por parte de
A-15. Ninguno se reenvía como novedad y **no hay hallazgos nuevos para A-12**.

**5 · Dos correcciones de procedencia.**

- **El `-HIST.md` declara `version`.** Convención de A-05 adoptada: este fichero
  declara la versión del documento que acompaña. En 1.1.0 el dato estaba, pero
  bajo `current_version`, que S-16 no lee.
- **`DOC-02-TECNICA` sale de `inputs`.** No era una entrada sin versión: era una
  entrada que no debía existir. **A-15 tiene prohibido leer DOC-02**, así que
  declararlo como entrada afirmaba consumir algo que no se consume. Pasa a
  `not_read_by_contract`, donde queda constancia de por qué no está.

**6 · El documento principal deja de reproducir su propio historial.** Los
apartados 1.1 y 1.2 de 1.1.0 eran un changelog dentro del documento de estado: la
tabla de equivalencia de la renumeración de DOC-06 y el detalle de qué cambió en
cada propuesta. Todo eso **ya vivía aquí**, en la entrada 1.1.0, y allí se
remite. Los apartados «Qué ha cambiado en esta ronda» de cada ficha pasan a
llamarse **«Estado de la evidencia»** y describen de qué está respaldada hoy la
propuesta, no qué pasó en una ronda concreta.

### Qué no ha cambiado

Las **ocho propuestas**, con su número, su texto, su estado `proposed` y todas
sus señales. La **recomendación**: `FUN-002`, `FUN-001`, `FUN-005`, tercer
documento seguido con el mismo orden. `DOC-06` en 1.2.0, `DOC-04` en 1.2.0,
`DOC-01` y `DOC-24` en 1.0.0, **los cuatro con el mismo hash**. El registro de
identificadores en FUN-008: **no se pidió `FUN-009`**, porque no había nada que
numerar.

**Segunda ronda consecutiva sin propuestas nuevas.** No es un descuido: ninguna
fuente de carencias ha cambiado. Lo que cambió fue el roadmap técnico, que no lo
es.

---

## 1.1.0 — 2026-08-17 · MINOR

**Regeneración contra `DOC-06-MANUAL-USUARIO` 1.2.0. Sin propuestas nuevas.**

### Por qué se regenera

Lo detectó **`S-16 · Cascada de obsolescencia`**, pieza nueva que compara las
versiones que un documento declara contra las reales: DOC-25 1.0.0 declaraba
haberse escrito sobre DOC-06 **1.0.0**, y el manual iba por **1.2.0**. No era un
descuido de procedencia: DOC-06 es la fuente principal de este documento y había
cambiado dos veces, una de ellas renumerando preguntas que aquí se citan.

### Por qué MINOR y no MAJOR ni PATCH

**No es MAJOR** porque ninguna propuesta ha cambiado de estado: las ocho siguen
en `proposed`, ninguna ha sido aceptada, rechazada, implementada ni sustituida.
Nada de lo que el lector de 1.0.0 daba por decidido ha dejado de serlo, entre
otras cosas porque no había nada decidido.

**No es PATCH** porque no se limita a arreglar citas. Tres propuestas cambian de
fondo aunque no de texto: `FUN-001` baja de confianza, `FUN-007` estrecha su
alcance y `FUN-002` y `FUN-003` incorporan evidencia que antes no tenían. Un
PATCH no debería mover una señal que negocio usa para priorizar.

### Qué ha cambiado

**1 · Citas corregidas — siete.** DOC-06 1.1.0 reclasificó trece de sus
veintitrés preguntas como citas de DOC-04 y renumeró seis. El apartado 5.2 de
este documento citaba el rango movido.

| Cita en 1.0.0 | Cita en 1.1.0 | De qué trata |
|---|---|---|
| `DOC-06/Q-14` | `DOC-06/Q-24` | Nombres de los botones de guardar, cancelar y confirmar |
| `DOC-06/Q-15` | `DOC-06/Q-25` | Textos de los mensajes de error |
| `DOC-06/Q-16` | `DOC-06/Q-26` | Cómo se editan y se borran las fichas |
| `DOC-06/Q-17` | `DOC-06/Q-27` | La pantalla de emisión de factura |
| `DOC-06/Q-18` | `DOC-06/Q-28` | Dónde está el conmutador de pago |
| `DOC-06/Q-19` | `DOC-06/Q-29` | La lista completa de datos de cliente y de empleado |
| `DOC-06/§6` | `DOC-06/§6.1` | El apartado 6 del manual se partió en 6.1 (carencias vivas) y 6.2 (cambios ya decididos). Todas las citas de A-15 se refieren a 6.1 |

**Citas verificadas y no movidas — cuatro.** `DOC-06/Q-20`, `Q-21`, `Q-22` y
`Q-23` conservan su número. Las dos importantes son `Q-21` y `Q-22`, evidencia de
`FUN-001` y `FUN-002`: A-04 las mantuvo a propósito y lo dejó escrito en
`DOC-06/§9.1` —«están citadas fuera por A-15 y moverlas rompería DOC-25»—.

**Citas añadidas — cinco.** `DOC-06/Q-30` (nueva en el manual, entra en 5.2 como
hueco de documentación), `DOC-06/§3`, `DOC-06/§5`, `DOC-16/§6.1` y `DOC-16/§6.3`.

**2 · Ninguna propuesta nueva.** Las catorce viñetas de `DOC-06/§6.1` —eran once
en 1.0.0— se repasaron una a una y ninguna quedó sin dueño: cinco remiten a los
evolutivos ya decididos, cinco son propuestas vivas, dos son decisiones de regla
y dos son decisiones de negocio documentadas. **No se pidió `FUN-009` a `S-12`.**
El registro sigue en FUN-008.

**3 · Cambios en las propuestas vivas.** Ninguna cambia de estado; cinco cambian
de evidencia.

| Propuesta | Cambio |
|---|---|
| `FUN-001` | `confidence` **high → medium**. DOC-06 1.2.0 convierte el apartado 6 en una lista explícita de carencias y la impresión no está en ella, porque `Q-21` dice que no se sabe si no existe o si solo no se documentó. 1.0.0 la dio por carencia cierta, en contra del mismo criterio con el que rechazó proponer la búsqueda en los listados. Se mantiene la propuesta porque el documento entregable no existe en ningún caso —falta la identidad fiscal del taller—, y la comprobación se pide a `A-03` |
| `FUN-002` | Evidencia reforzada. `DOC-06/§6.1` añade «ni de recuperarlo» a la viñeta de la ausencia de identificación |
| `FUN-003` | Evidencia reforzada por dos vías: `DOC-06/§6.1` añade «no está decidido qué contendrá», y `A-12` la deriva aquí en `DOC-16/§6.3` sin proponer nada él |
| `FUN-006` | Dos citas nuevas: la tarea A.17 y las preguntas frecuentes del apartado 5 |
| `FUN-007` | Alcance estrechado. El filtro por situación del listado de albaranes **ya existe** (`DOC-06/§3`, REQ-025); lo que faltaría son las situaciones. En 1.0.0 se pedía construir también el filtro |
| `FUN-004`, `FUN-005`, `FUN-008` | Sin cambios. Verificadas contra 1.2.0 |

**4 · Dos hallazgos de `A-12` valorados, ninguno convertido en propuesta.**
Los avisos de error que llegan siempre en catalán se descartan como funcionalidad
y se devuelven a `A-14`: `REQ-076` ya exige la interfaz en castellano por
defecto, así que es defecto y no hueco de producto. El módulo de Configuración ya
era `FUN-003` desde 1.0.0 y no necesita identificador nuevo.

**5 · Un hallazgo nuevo para `A-14`** —confirmación del candidato a `BUG-005`
desde el lado del usuario— y **uno nuevo para `A-03`**, marcado de prioridad
alta: comprobar `DOC-06/Q-21` antes de refinar `FUN-001`.

**6 · Se descarta explícitamente una candidata más**, el aviso de nóminas del mes
sin registrar, por salir de la misma viñeta que `FUN-004`. Las no propuestas por
criterio pasan de cinco a seis.

**7 · El historial sale del documento principal.** Cambio de contrato de A-15:
DOC-25 refleja solo el estado actual con su `version`, y todo el historial pasa a
este fichero. La procedencia —el bloque `inputs` con versión y hash— **se queda
en el documento principal**, porque es lo que `S-16` necesita para calcular qué
ha quedado obsoleto. Esta es la primera versión de este fichero y recoge también
la entrada de 1.0.0.

### Qué no ha cambiado

`DOC-04-FUNCIONAL` sigue en 1.2.0 con los mismos 79 requisitos y las mismas nueve
preguntas abiertas; `DOC-01` en 1.0.0; `DOC-24` en 1.0.0 con cuatro defectos. La
recomendación del apartado 2 mantiene el mismo orden: `FUN-002`, `FUN-001`,
`FUN-005`. Ningún `FUN-nnn` se renumera, y ninguno se renumerará nunca.

---

## 1.0.0 — 2026-08-16 · Primera versión

**Primera ronda de A-15 sobre app-taller.** No había documento anterior: ninguna
propuesta viva que arrastrar, ninguna aceptada que seguir hasta `DOC-08` y
ningún rechazo cuyo motivo respetar.

**Ocho propuestas, `FUN-001` a `FUN-008`**, numeradas por `S-12` con
`--prefix FUN` sobre un registro que hasta entonces no tenía ninguna. Siete
nacidas de evidencia citable y una —`FUN-008`— de criterio propio, marcada como
tal.

| ID | Título |
|---|---|
| `FUN-001` | Llevarse la factura en papel o en un archivo para dárselo al cliente |
| `FUN-002` | Poder guardar una copia de los datos del taller y recuperarla |
| `FUN-003` | Dar contenido a la sección *Configuración* |
| `FUN-004` | Avisar de qué piezas se están acabando |
| `FUN-005` | Que la nómina proponga el salario bruto del empleado |
| `FUN-006` | Saber cuánto gana el taller en cada trabajo |
| `FUN-007` | Poder decir en qué punto está un trabajo |
| `FUN-008` | Anotar el material que entra, en vez de recontar el stock entero |

**Dos reglas explícitas para no proponer de más**, en ausencia del filtro que dan
las rondas anteriores: no reproponer lo que el negocio ya decidió el 2026-08-16
—las seis respuestas de `DOC-04/§6.2` y los cuatro defectos de `DOC-24`—, y
distinguir «falta decidir una regla» de «falta construir algo», dejando lo
primero fuera del documento.

**Escrito sobre** `DOC-01` 1.0.0, `DOC-04` 1.2.0, `DOC-06` **1.0.0** y `DOC-24`
1.0.0, en el commit `44748fb`. Esa declaración de DOC-06 quedó obsoleta y es lo
que motivó la versión 1.1.0.

**Diecisiete descartes documentados con motivo**: seis carencias ya encaminadas,
seis preguntas abiertas que no eran de A-15 y cinco candidatas no propuestas por
criterio. **Seis hallazgos** para otras piezas: cuatro a `A-12` y dos a `A-03`.
