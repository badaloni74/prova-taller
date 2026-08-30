---
doc_id: DOC-16
doc_name: DOC-16-ROADMAP
version: 3.2.0
status: draft
generator: A-12 mejoras/roadmap
generator_version: "1.1"
generated_at: 2026-08-29T20:00:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: cf7f4c084dbf2a6cd392a06e8e485db5ad476280
  working_tree_clean: false   # sin versionar y ajeno a este documento: ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/, promptDashboard.txt
inputs:
  - id: DOC-16-ROADMAP.md
    from: A-12
    version: 3.1.0
    hash: sha256:3baf09b197aef0fe758569befb44b0066fe92e0ccbdfd46bb497cb7f6440287a
    present: true
  - id: DOC-02-TECNICA.md
    from: S-01
    version: 1.1.0
    hash: sha256:5a4fce68251cc84977b15f363c63e850f85caa737b89fea8cf2e4f3ef83b8304
    present: true
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:43051f32f13c32da7350e79d3fb92503c695618375cbae82b4950abb734b2688
    present: true
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    version: 1.12.0
    hash: sha256:4b3e99db4a6275027e9830ee17a5731bf1e5b14dada0aad22c57eaf76efa6ffe
    present: true
  - id: DOC-14-INFORME-EXPLORADOR-QA.md
    from: A-10
    version: 2.1.0
    hash: sha256:f1449e133c2eacf224467c55c01d9bcc4fb6bee9443d239fd27867ae1cd5b7ee
    present: true
  - id: DOC-23-INFORME-EJECUCION-TCS-UI.md
    from: S-10
    version: 2.2.0
    hash: sha256:33ac58bcf4188dddccce71aa88bd2f4174af74c1c291032f302ec68fddd84c47
    present: true
  - id: DOC-27-INFORME-EJECUCION-TCS-API.md
    from: S-17
    version: 1.1.0
    hash: sha256:2ae7596bf44f875ce2a675715344b739f0a1520301cf224746b8aafd8d192e20
    present: true
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    version: 1.2.1
    hash: sha256:256d1507f2bb5aa5fdf3193622ff688de3f069182413a3ef29c98d9e9e4f5c02
    present: true
  - id: registro-ids.json
    from: S-12
    version: "1"
    hash: sha256:bc54df9a531287e953975a311cea55a25297ecba3ce50d403f91dc6106528b97
    present: true
  - id: DOC-17-DEUDA-TECNICA.md
    from: S-05
    present: false
  - id: DOC-20-RALLY-STATE.json
    from: I-01
    present: false
  - id: DOC-19-RALLY-TESTCASES.csv
    from: S-07
    present: false
obsolescence_ack:
  - input: DOC-02
    upto: 1.2.0
    date: 2026-08-29
    note: "SPE-06: AlbaraForm filtra el selector de vehículo + guarda en el router de albaranes. Ningún MEJ-nnn del roadmap se apoya en esa zona del código. server/routes/ no cambió (893 líneas, 86 res.status, 71 literales, recontado en cf7f4c0). Fuera del alcance de la delta 3.2.0; se consumirá en la próxima ronda de análisis."
  - input: DOC-05
    upto: 1.8.0
    date: 2026-08-29
    note: "SPE-06: +9 casos TC-111..TC-119. El roadmap técnico no depende del censo de casos del plan. Fuera del alcance de la delta 3.2.0."
  - input: DOC-14
    upto: 2.1.1
    date: 2026-08-29
    note: "Resync circular de A-10 tras DOC-16 3.1.0. Sin cambio de contenido; ningún EXP-nnn nace ni cierra. Fuera del alcance de la delta 3.2.0."
  - input: DOC-25
    upto: 1.2.2
    date: 2026-08-29
    note: "Resync de A-15 tras DOC-14. No alimenta el análisis de deuda/cobertura/defectos. Fuera del alcance de la delta 3.2.0."
  - input: registro-ids.json
    upto: 1.6.0
    date: 2026-08-29
    note: "SPE-06 añadió REQ-080/081, TC-111..119 y Q-30. Anclas MEJ sin cambios: siguen MEJ-001..MEJ-008 (MEJ-009 aún sin censar, findings_for_others target S-12). Fuera del alcance de la delta 3.2.0."
---

# DOC-16 · Mejoras y roadmap técnico — app-taller

> Qué patrón hay detrás de los defectos de este sistema y dónde conviene invertir
> esfuerzo técnico. **Solo mejoras sobre lo que ya existe.** Ninguna propuesta de este
> documento añade funcionalidad: lo que hay de esa clase está en el apartado 6, dirigido
> a `A-15`.
>
> **Este documento no lleva historial de cambios.** Refleja solo el estado actual, con su
> `version` en el front-matter. El historial está en **`docs/DOC-16-ROADMAP-HIST.md`**.
>
> `status: draft`. Nueve mejoras: dos `implemented`, tres `accepted` que siguen sin entrar
> en `A-07` y cuatro esperando decisión. La 3.1.0 fue la última ronda de análisis; **la
> 3.2.0 es una delta acotada sobre ella**: `S-17` amplió la suite de servicio (`DOC-27`
> 1.0.0 → 1.1.0) y `A-05` regeneró la trazabilidad (`DOC-07` 1.10.0 → 1.12.0). **No nace
> ninguna mejora nueva y ninguna cambia de estado**; lo que se mueve es la evidencia de
> tres de ellas —`MEJ-002` crece (de 4 a 8 literales afirmados con igualdad exacta),
> `MEJ-003` y `MEJ-006` se matizan (ver §1.7)—. **Las decide una persona, no A-12.**

## Procedencia

Cómo se han usado las entradas, por qué la versión es la que es y qué se ha decidido en
esta ronda sobre la forma del propio documento.

### Ronda 3.2.0 (2026-08-29) — delta acotada, no ronda de análisis

`S-16` volvió a marcar `DOC-16` como obsoleto. Esta pasada trata **solo** las dos entradas
que se movieron por evidencia de ejecución nueva, no por SPE-06:

- **`DOC-27` 1.0.0 → 1.1.0** (`35ff50b`). `S-17` amplió `automation/api/`: de 10 a 22
  `TCS` (TCS011…TCS022), de 28 a 53 peticiones, 74 aserciones, 0 rojos, base **resembrada**
  y sin residuo. Leídos §1, §2.2, §2.3, §3, §4, §5 y §6, y la propia colección
  (`tallerMecaniccollection.json`) para contar los `to.eql` sobre literales del servidor.
- **`DOC-07` 1.10.0 → 1.12.0** (`cf7f4c0`). La 1.11.0 incorporó SPE-06 (cobertura 79/79 →
  81/81, sigue 100 %, 0 GAP PLAN — ya reconocido en `obsolescence_ack`); la 1.12.0
  incorpora `DOC-27` 1.1.0 (evidencia de ejecución 106 → 111\* de 119). Leídos el
  front-matter, §1.12.0 del `-HIST`, y las secciones que cruzan `DOC-27`.
- **Código, recontado en `HEAD` (`cf7f4c0`).** El merge de SPE-06 (`c771e35`) tocó solo
  `client/src/pages/albarans/AlbaraForm.tsx` y `server/db/seed.js`: **`server/routes/` no
  cambió** — 893 líneas, 86 `res.status`, 71 literales de error, igual que en la 3.1.0. La
  ruta `PUT /albarans/:id` con la comprobación de «vehículo de otro cliente» ya existía
  desde el fix de bugs `ed61c24`, no la trajo SPE-06.

**Lo que esta delta NO ha hecho, a propósito.** No ha reconsumido `DOC-02` 1.2.0, `DOC-05`
1.8.0, `registro-ids.json` 1.6.0, `DOC-14` 2.1.1 ni `DOC-25` 1.2.2 (ver `obsolescence_ack`):
los tres primeros son SPE-06 sin impacto en ningún `MEJ-nnn` —`server/routes/` no cambió y
las anclas `MEJ` del registro siguen en `MEJ-001`…`MEJ-008`—, los dos últimos son resyncs
circulares de la propia 3.1.0. No ha barrido todas las citas «79/79» ni «110 casos» del
cuerpo heredado —solo las de las secciones que esta delta toca (§1, §1.7, §5.5)—; el resto
se corrige en la próxima ronda de análisis completa.

### Ronda 3.1.0 (2026-08-24) — lo que se ha leído y lo que se ha corregido del bloque `inputs`

**Se ha verificado entrada por entrada la versión declarada contra la real y el hash
declarado contra el calculado**, y no era un trámite: **cuatro entradas llevaban un hash
que ya no correspondía a su fichero**, el fallo que `cascada.js` no puede ver porque solo
compara números de versión.

| Entrada | Estaba declarado | Es | Por qué |
|---|---|---|---|
| `DOC-07-TRAZABILIDAD.md` | 1.9.0 · `7094bd37…` | **1.10.0** · `f3eb60be…` | El motivo de esta ronda. `A-05` la regeneró al nacer `DOC-27` |
| `DOC-02-TECNICA.md` | 1.1.0 · `32639b3f…` | 1.1.0 · **`5a4fce68…`** | Misma versión, bytes distintos. Commit `c71c580` reescribió dos rutas de spec (`specs/01-…` → `specs/implemented/SPE-01-…`). **Verificado el diff: son las dos únicas líneas tocadas**, ningún cambio en el bloque `graph` |
| `DOC-05-PLAN-PRUEBAS.md` | 1.6.0 · `a88ca2aa…` | 1.6.0 · **`43051f32…`** | Misma versión, bytes distintos. Commit `7f2000f`, resello de procedencia de `A-03` contra `DOC-23` 2.2.0. **Verificado el diff: solo front-matter** |
| `DOC-25-PROPUESTAS-FUNCIONALES.md` | 1.2.0 · `b4f26c8f…` | **1.2.1** · `256d1507…` | `A-15` la reselló contra `DOC-14` 2.1.0 (commit `320246d`) |
| `registro-ids.json` | `9f5b3679…` | **`bc54df9a…`** | Tocado en `20496d3` y `c71c580`. Recontado: **sigue con 8 anclas `MEJ`** |
| `DOC-27-INFORME-API.md` | — | **1.0.0** · `178d4b14…` | **Entrada nueva.** No estaba declarada en ningún `inputs` de este documento porque hasta hoy no existía |

Las cuatro correcciones de hash **no han cambiado ninguna conclusión** —se ha comprobado el
diff de cada una, no se ha asumido—, pero dejarlas mal declaradas habría significado que
`S-16` no volvería a marcar este documento por esas entradas aunque cambiaran de verdad.

**Qué se ha leído de las entradas que sí traen contenido nuevo.**

- **`DOC-07` 1.10.0** — §3.14 a §3.16 (los tres avisos nuevos), la tabla de magnitudes de
  §1, §5 (cobertura por módulo) y la ficha de `A-05-15` entera, incluidos los dos fragmentos
  de `server/routes/albarans.js` que cita. **Releído el código en `HEAD` (`40bbd43`) para no
  citar de segunda mano**: las líneas 197-224 hacen `UPDATE peces SET estoc = estoc + ?` al
  retirar una línea y las 116-132 no lo hacen al borrar el albarán. Confirmado.
- **`DOC-27` 1.0.0** — §1 (resultado global), §3 (residuo), §4 (hallazgos abiertos sobre el
  servidor) y §5 (límites). Y **la propia colección**, que es donde está el dato que más
  mueve esta ronda: `automation/api/tallerMecaniccollection.json`.
- **Código, recontado en `HEAD` (`40bbd43`)** — `server/routes/`: **893 líneas, 86
  `res.status`, 71 literales de error**. Las tres cifras coinciden con las de 3.0.0; no se
  han recorregido porque no ha cambiado nada. Y se ha comprobado que **no hay ni un fichero
  de prueba dentro de `server/`, ni script `test`, ni dependencia de test, ni CI**
  (`find server -name '*.test.*'` vacío, `.github/` inexistente) — el dato que sostiene la
  respuesta sobre `MEJ-003` en 1.1.

**Lo que esta ronda NO ha mirado, a propósito.** `DOC-09` acaba de pasar a 2.1.0 y está en
revisión dentro de una onada mayor. No es entrada de este documento, no se declara y no se
cita, aunque `A-05-15` conste allí como riesgo `RS-07`. Se dice para que quien lea sepa que
la ausencia es deliberada y no un olvido.

### Rondas anteriores

El detalle de cómo se leyó cada entrada en 3.0.0, 2.1.0, 2.0.0 y 1.0.0 está en
**`docs/DOC-16-ROADMAP-HIST.md`** y no se reproduce aquí. Se conservan solo los cuatro
datos de rondas anteriores que **siguen sosteniendo una afirmación de este documento** y
que ninguna entrada nueva ha desmentido:

- **`DOC-02` 1.1.0, bloque `graph`: 51 componentes y 71 aristas.** De ahí sale el impacto
  de cada mejora. Los dos componentes que nacieron en esa versión —`use-submit-guard` y
  `format-utils`, con 7 y 6 aristas entrantes— son la infraestructura que `MEJ-007` y
  `MEJ-008` pedían. **Las tres aristas que `DOC-07` §7.2 señaló como ausentes siguen
  ausentes** en 1.1.0; consta en 6.8.
- **`DOC-14` 2.1.0.** Cuatro hallazgos cerrados y verificados (`EXP-001`, `EXP-002`,
  `EXP-007`, `EXP-014`), uno a medias (`EXP-009`), y `EXP-027` **ya cerrado** en esta
  versión. Sostiene las fichas de cierre de 3.1 y la de `MEJ-009`.
- **`specs/implemented/SPE-04-…` y `SPE-05-…`**, los dos `Implemented`, citan a este
  documento por nombre («ja ho havia censat com **MEJ-007**», «com **MEJ-008**»). Es la
  evidencia de cierre de 3.1.
- **`DOC-17` (S-05) sigue sin existir.** Quinta versión consecutiva de este roadmap escrita
  sin que nadie haya analizado la deuda técnica del proyecto como tal.

## 1. Qué ha cambiado desde el roadmap anterior

**No es la primera ejecución.** La última ronda de análisis fue la **3.1.0** (2026-08-24);
esta **3.2.0** es una delta acotada sobre ella (§1.7). Los apartados 1.1 a 1.6 de abajo son
el análisis de la 3.1.0, actualizado en cifras donde la delta lo toca; el resumen de qué se
movió en la delta está en **§1.7**. La 3.0.0 llevó `MEJ-007` y `MEJ-008` a `implemented`
(apartado 3.1).

| Entrada | Qué cambió | Qué aporta a este documento |
|---|---|---|
| **`DOC-07` 1.10.0** (era 1.9.0; **1.12.0 en la 3.2.0**, ver §1.7) | Nacen `A-05-14`, `A-05-15` y `A-05-16`. La evidencia de ejecución publicada pasa de 102 a 106 y, con la 1.12.0, a 111\* de 119 casos | Una mejora gana evidencia (`MEJ-004`), otra queda parcialmente satisfecha (`MEJ-003`) y aparece un hallazgo que **no** se convierte en mejora, con el motivo escrito |
| **`DOC-27` 1.0.0** (entrada nueva; **1.1.0 en la 3.2.0**, ver §1.7) | Suite de servicio: 10 → 22 `TCS-nnn`, 28 → 53 peticiones, 74 aserciones, 0 rojos, sin residuo en la base | Es la primera verificación automática del servidor que existe en este proyecto. Obligó a repreguntar si `MEJ-003` sigue haciendo falta (sí, reforzado en 3.2.0), y destapa evidencia nueva para `MEJ-002` (4 → 8 literales) |

**La cobertura no se mueve, y conviene decirlo antes que nada.** `DOC-07` (1.10.0 en la
3.1.0; **1.12.0** en la 3.2.0) mantiene **100,00 %** —**79/79** hasta SPE-06, **81/81** con
`REQ-080`/`REQ-081` ya cubiertos—, **0 `GAP PLAN`**, **0 anomalías bloqueantes**. Además,
**ningún `MEJ-nnn` de este documento citaba `DOC-07` en su `evidence_refs`** hasta esta
ronda — comprobado una a una sobre las nueve fichas del bloque estructurado antes de tocar
nada; las únicas menciones eran narrativas (`A-05-06` en 5.4, `A-05-11c` en 6.3, las tres
aristas de §7.2 en 6.8). **El salto de versión de `DOC-07`, por sí solo, no invalida
ninguna prioridad de este roadmap.** Lo que lo mueve son los tres avisos nuevos y el
documento que los destapó, `DOC-27`.

**Ninguna mejora cambia de estado esta ronda y no nace ninguna nueva.** Se dice al principio
para que quien solo lea esto no busque movimiento que no hay. Lo que sí cambia es la
evidencia de tres mejoras, y en una de ellas cambia **en contra** de lo que cabría esperar.

### 1.1 `DOC-27` y `MEJ-003`: ya existe una suite de servidor, y `MEJ-003` sigue haciendo falta

Es la pregunta obligada de esta ronda, y la respuesta corta es **no, `MEJ-003` no queda
satisfecha**, pero tampoco sigue igual: **queda parcialmente satisfecha, y por primera vez
su forma no es una hipótesis**.

**Lo que sí ha llegado.** `automation/api/` es una colección Postman ejecutable con
`newman`, y `DOC-27` **1.1.0** publica su resultado: **22 `TCS-nnn` en verde** (10 previos
+ 12 de SPE-06), **53 peticiones, 74 aserciones, 0 fallidas, 4,4 s**. Verifica reglas que
la interfaz no permite ni intentar —un tipo de línea que el desplegable no ofrece, facturar
un albarán ya facturado, mezclar clientes en una factura y, desde 1.1.0, cambiar por
servicio el vehículo de un albarán a uno de otro cliente— y **no deja residuo**: facturas
1→1, albaranes 4→4, líneas 7→7, stock del catálogo 167→167, medido antes y después sobre
base resembrada. Es exactamente la clase de comprobación que `MEJ-003` compraba, y es real.

**Lo que no ha llegado, recontado en `HEAD` (`cf7f4c0`) y no deducido de la prosa de nadie.**

| Lo que `MEJ-003` pedía | Estado hoy (3.2.0, `DOC-27` 1.1.0) |
|---|---|
| Pruebas automáticas del servidor | **Parcial.** `find server -name '*.test.*' -o -name '*.spec.*'` sigue devolviendo **0 ficheros**. La suite ha doblado de tamaño pero sigue viviendo fuera de `server/`, se dispara a mano y **necesita el servidor levantado** para ejecutarse |
| Cobertura de los routers | **2 de 7, igual que en 1.0.0.** Los doce `TCS` de SPE-06 caen sobre `albarans-router` (`PUT /:id`) y `factures-router`; `clients`, `vehicles` y `peces` solo como lectura de fixture, y `personal` y `nomines` **siguen sin aparecer**. La suite creció en profundidad, no en alcance |
| Densidad | **22 comprobaciones frente a 86 `res.status`** en `server/routes/` (893 líneas, 71 literales, recontado en `HEAD` `cf7f4c0` — SPE-06 no tocó `server/routes/`). Más tensa sobre `albarans`/`factures`, igual de ausente en el resto |
| CI mínima | **Nada.** No hay `.github/`, ni `.gitlab-ci.yml`, ni script `test` en la raíz ni en `server/package.json`, ni una sola dependencia de test declarada |

**La consecuencia para `MEJ-004`, que es lo que de verdad importa.** `MEJ-004` (mover las
reglas de escritura de los siete routers a un módulo por dominio) `depends_on: [MEJ-003]`
por un motivo concreto: sin red, mover reglas es apostar. Veintidós comprobaciones sobre los
mismos dos routers **siguen sin ser esa red**. En particular, `nomines-router` y
`vehicles-router` —donde viven `EXP-004`, `EXP-005` y `EXP-015`— siguen sin tener ni una
sola comprobación automática de servicio. **La dependencia se mantiene entera.**

**Lo que sí ha cambiado, y no es poco: la pregunta de forma está respondida.** Hasta hoy
`MEJ-003` llevaba `confidence: medium` en parte porque nadie sabía qué forma tendría la
suite (¿Vitest + supertest dentro de `server/`? ¿algo externo?). Ahora hay **un ejemplo que
funciona, en el repositorio, con informe publicado y con un patrón de fixture que devuelve
la base a su estado**. Quien haga `A-07` sobre `MEJ-003` ya no diseña desde cero: extiende
o decide no extender. **Eso es una decisión de una persona, no de A-12**, y por eso no se
tocan aquí ni el tamaño ni la dificultad de una mejora ya `accepted`: cambiarle los números
sin pasar por `A-07` sería volver a decidir lo ya decidido.

**¿La suite que ha doblado de tamaño debilita el argumento de `MEJ-003`? No: lo refuerza.**
Cabría pensar que una colección de servicio el doble de grande acerca el proyecto a lo que
`MEJ-003` compra y hace la mejora menos urgente. El dato dice lo contrario: el crecimiento
de `automation/api/` entre 1.0.0 y 1.1.0 fue **todo profundidad sobre `albarans`/`factures`**
—los routers que ya cubría— y **cero avance** en las tres piezas que faltan (CI, ficheros
dentro de `server/`, los otros cinco routers). Es la evidencia de que dejar crecer la
colección orgánicamente no converge hacia `MEJ-003`: la red sobre `nomines`, `personal`,
`clients`, `vehicles` y `peces` no va a aparecer sola.

**`MEJ-003` sigue `accepted`, sin implementar, y A-12 no la repropone.**

### 1.2 `A-05-15` no se convierte en un `MEJ-nnn` propio, y el motivo es la parte importante

`DOC-27` §4.1 lo levanta y lo propone literalmente como «candidato para `A-12 · Roadmap`».
`DOC-07` §3.15 lo recoge, lo verifica en el servidor y lo cruza con la matriz. El hecho,
**releído por A-12 en `HEAD` para no citarlo de segunda mano**, es este: al retirar una
línea, `server/routes/albarans.js:197-224` hace `UPDATE peces SET estoc = estoc + ?`; al
borrar el albarán entero, las líneas 116-132 borran `albara_linies` y `albarans` y **no
tocan `peces`**. El stock que las líneas descontaron no vuelve.

**Y aun así no nace un `MEJ-010`.** Tres razones, en orden de peso:

1. **Si debe o no devolver el stock es una pregunta de producto, y A-05 lo dice
   explícitamente.** `REQ-039` habla de retirar *una línea*; `REQ-041`, de borrar *el
   albarán*. Ninguno se pronuncia sobre el otro. Una mejora titulada «hacer que el borrado
   devuelva el stock» **resolvería esa ambigüedad por la puerta de atrás**, decidiendo en un
   roadmap técnico algo que nadie ha decidido en el funcional.
2. **La reformulación aparentemente neutra tampoco lo es.** «Que el borrado del albarán
   reutilice el camino de retirada de línea» suena a refactorización pura y no lo es:
   reutilizar ese camino *devuelve el stock*. Decide lo mismo con otras palabras.
3. **La parte que sí es mía ya tiene sitio, y es `MEJ-004`.** Ver 1.3.

**Lo que A-12 hace con él**: lo incorpora como evidencia de `MEJ-004` (3.4), lo añade al
patrón de 3.0 marcado como **candidato a noveno defecto, no como noveno defecto**, y manda
la pregunta de producto al apartado 6 sin responderla. **Si producto decide que sí debe
devolver el stock, esto es un `BUG-nnn` para `A-14`, no un `MEJ-nnn` para mí.**

### 1.3 `MEJ-004` gana evidencia por primera vez en tres rondas, y de un tipo nuevo

Las ocho piezas del patrón de 3.0 eran todas **la misma forma**: una comprobación que falta
en el punto donde el dato se escribe. `A-05-15` es la misma familia con **una forma que no
estaba representada**: la regla **sí existe**, escrita, funcionando —en una de las dos rutas
del mismo fichero— y **no está en la otra**. No es una comprobación olvidada: es una regla
que vive duplicada-por-omisión porque no tiene un sitio propio.

Eso es, palabra por palabra, lo que `MEJ-004` propone arreglar, y sin necesidad de decidir
la pregunta de producto: **si la regla de «devolver stock al retirar líneas de pieza»
viviera en un módulo de dominio en vez de incrustada en un `router.delete`, las dos rutas
compartirían el mismo comportamiento por construcción, fuera cual fuera**. La mejora sigue
sin añadir ni cambiar ninguna regla; lo que cambia es que ahora hay un caso donde el coste
de no tenerla ya se ha materializado en una divergencia real y verificada, no en un defecto
hipotético.

Su `risk_if_not_done` decía «el noveno defecto de la misma familia». **Ha aparecido un
candidato exacto a noveno, por la vía que la ficha predecía**, y ha hecho falta que se
cruzaran tres documentos (`DOC-27`, `DOC-07` y el código) para verlo. La evidencia de
`MEJ-004` **crece**; su dificultad, su impacto y su dependencia de `MEJ-003`, no cambian.

### 1.4 `MEJ-002` gana un segundo consumidor de los literales, y es más estricto que el primero

Es el hallazgo con más consecuencia práctica, y no lo señalaba ningún documento: sale de
leer la colección directamente. En la 3.1.0 eran **cuatro**; con `DOC-27` 1.1.0 son **ocho
de los 71 literales de error del servidor afirmados con igualdad exacta** (`to.eql`), no
con `include`:

| Aserción en la colección | Literal en el servidor | Desde |
|---|---|---|
| `to.eql("Tots els albarans han d'estar pendents de facturar")` | `factures.js:69` | 3.1.0 |
| `to.eql('Tots els albarans han de ser del mateix client')` | `factures.js:76` | 3.1.0 |
| `to.eql('El camp tipus ha de ser "peca" o "ma_obra"')` | `albarans.js:146` | 3.1.0 |
| `to.eql('La peça indicada no existeix')` | `albarans.js:161` | 3.1.0 |
| `to.eql("L'albarà ja està facturat i no es pot modificar")` | `albarans.js:82` (`PUT /:id`) | **3.2.0** |
| `to.eql("No es pot canviar el vehicle a un que pertany a un altre client")` | `albarans.js:101` | **3.2.0** |
| `to.eql("El camp vehicle_id és obligatori")` | `albarans.js:87` | **3.2.0** |
| `to.eql("El vehicle indicat no existeix")` | `albarans.js:92` | **3.2.0** |

**Los ocho verificados verbatim contra el código en `HEAD` (`cf7f4c0`).** Y los ocho están
en catalán, que es exactamente el objeto de `DOC-14/EXP-006` (`deriva_a: A-14`: la interfaz
en castellano devuelve avisos en catalán). Tres de los cuatro nuevos (`TCS015`, `TCS018`,
`TCS019`) añaden además una aserción **negativa** —que el mensaje *no* sea el de cambio de
cliente—, con lo que el texto exacto queda clavado por partida doble.

**Por qué esto sube la evidencia y no es una curiosidad.** Hasta ahora `MEJ-002` se sostenía
en un acoplamiento: 25 casos de la familia «Literal del aviso» de `DOC-05` §4.11 anclados a
los 71 literales. Ahora son **dos suites, de dos tecnologías distintas, con dos dueños
distintos** (`s10-auto-tcs` y `S-17`) ancladas al mismo texto, y la segunda con igualdad
exacta en ocho puntos —el doble que en la 3.1.0—. El día que `A-14` corrija el idioma de
`EXP-006`, rompe las dos a la vez.

**Y el ensayo general ya ocurrió.** `EXP-027` fue precisamente esto: `SPEC 05` cambió un
formato de presentación y **17 escenarios se pusieron en rojo** porque validaban el literal
antiguo (`DOC-23` 2.1.0, corregidos y reverificados en 2.2.0). No es una hipótesis sobre lo
que podría pasar: es lo que pasó hace un día, contado, con su informe. La diferencia es que
`EXP-027` afectaba a literales de la pantalla, sobre los que `MEJ-002` no puede nada, y los
71 de error sí son su objeto.

### 1.5 `MEJ-006`: la evidencia se matiza, y no en la dirección que cabría esperar

Sería fácil escribir aquí que `MEJ-006` gana urgencia porque ahora hay una suite más que
necesita entorno reproducible. **Sería falso, y el dato apunta al revés.**

En la 1.0.0, `DOC-27` §5 anotaba que la base **no se resembró** y que la corrida salió
igualmente limpia. La 1.1.0 lo confirma desde los dos lados: esta vez **sí se resembró**
(corrida de entrega) y, aun así, `DOC-27` §1 y §6 dejan constancia de que **dos pasadas
seguidas sin resembrar dan el mismo recuento (53 / 74 / 0)** y de que el estado medido
antes y después es idéntico (facturas 1→1, albaranes 4→4, líneas 7→7, stock 167→167). Es
decir: **la suite de servicio se ejecuta de forma repetible con y sin resembrado, sin nada
de lo que `MEJ-006` propone.** El argumento de «bloquea a dos aceptadas» se ablanda un poco
más, no se refuerza.

Lo que sí queda es la otra mitad: `DOC-27` §6 confirma que la 1.1.0 fue «una corrida de
entrega» y **partió de `npm run seed`**, que **rehace `data/taller.db` en el sitio**,
destruyendo la base de trabajo. Ya no es hipótesis: es lo que hubo que hacer esta vez. Esa
es exactamente la incomodidad que resuelve hacer configurable la ruta. Sigue sin haber **ni
un solo dato** que mida un incidente causado por la mitad de `engines`/`.nvmrc`.

**Conclusión: `MEJ-006` no sube de urgencia, sigue en `medium` y sigue marcada `opinion`.**
La 3.1.0 ya la bajó al tercer puesto del podio por lo que desbloquea (que se ha visto
contradicho); `DOC-27` 1.1.0 solo refuerza esa lectura. **Se mantiene en el tercer puesto —
ver apartado 2.**

**Un apunte lateral que sí es útil para `MEJ-005`** (aceptada, sin empezar): el patrón
`_setup`/`_teardown` de la colección —31 peticiones de fixture que devuelven la base a su
estado, medido antes y después— es una demostración funcionando, dentro del repositorio, de
la técnica que `MEJ-005` quiere para la suite de navegador. No cambia su estado ni su
prioridad; es material para quien la ejecute.

### 1.6 Lo que esta ronda corrige del cuerpo heredado

La 3.0.1 documentó por escrito, en su `-HIST.md`, que dejaba el cuerpo con citas
desfasadas hasta la próxima ronda con análisis. **Esta es esa ronda**, y quedan corregidas
las menciones a «`DOC-14` 2.0.0» (por **2.1.0**: `EXP-027` cierra), «`DOC-23` sigue en
2.0.0» (por **2.2.0**: `TC-048` y los 17 de `EXP-027` corregidos y reverificados; 89
escenarios no re-ejecutados en esta versión, pendientes de una pasada completa), «`DOC-07`
1.7.0» (por **1.10.0**), `EXP-027` citado como hallazgo abierto para `A-03` (ya **cerrado**
en `DOC-14` 2.1.0 y `DOC-23` 2.2.0), «`DOC-25` 1.1.1» (por **1.2.1**) y «cuarta versión sin
`DOC-17`» (por **quinta**). El detalle punto por punto de qué decía cada sitio y qué dice
ahora está en el apartado correspondiente (3.0, 3.3, 5.1, 5.5, 5.6, 6.5, 6.7) y no se
repite aquí.

**Los defectos de `DOC-24`, sin novedad, cuarta ronda que se señala.** `DOC-24` sigue en
1.0.0 con sus cuatro defectos «abiertos» en su propio texto, mientras `DOC-14` verificó en
vivo que `BUG-001` y `BUG-002` funcionan. `BUG-003` (con decisión de negocio desde el
2026-08-16, pendiente de implantar) y `BUG-004` siguen abiertos.

**Las tres aceptadas el 2026-08-17 siguen sin pasar por `A-07`, siete días después.**
`MEJ-001`, `MEJ-003` y `MEJ-005`. Ninguna ha entrado en el ciclo. Para `MEJ-003` esta ronda
sí trae información nueva (1.1); para `MEJ-001` y `MEJ-005`, no.

### 1.7 Delta 3.2.0 (2026-08-29) — `S-17` amplía la suite de servicio, `A-05` regenera trazabilidad

Delta acotada sobre la 3.1.0, no ronda de análisis nueva. Dos entradas se movieron y
**ninguna hace nacer, retirar ni cambiar de estado un `MEJ-nnn`**:

| Entrada | 3.1.0 → 3.2.0 | Qué aporta |
|---|---|---|
| **`DOC-27` 1.0.0 → 1.1.0** (`35ff50b`) | La colección de servicio pasa de 10 a 22 `TCS` (TCS011…TCS022) y de 28 a 53 peticiones; 74 aserciones, 0 rojos, base resembrada y sin residuo. Cubre por servicio TC-111/113 (`REQ-080`), TC-115 (`REQ-042`), TC-116 (`REQ-027`) y la mitad de servicio de TC-119 — los vectores que el selector filtrado de SPE-06 sacó de la interfaz | `MEJ-002` gana cuatro literales más afirmados con igualdad exacta (1.4); `MEJ-003` mueve su «parcialmente satisfecha» sin cambiar de estado, con el argumento reforzado (1.1); `MEJ-006` ve su matiz reforzado por una segunda corrida (1.5) |
| **`DOC-07` 1.10.0 → 1.12.0** (`cf7f4c0`) | La 1.11.0 incorporó SPE-06 (cobertura 79/79 → 81/81, sigue 100 %, 0 GAP PLAN); la 1.12.0 incorpora `DOC-27` 1.1.0: evidencia de ejecución publicada 106 → 111\* de 119 casos. La pregunta abierta 19 (casos service de SPE-06 sin evidencia) pasa a parcialmente respondida | Ningún `MEJ-nnn` la cita como `evidence_ref` por la cobertura; el salto no mueve ninguna prioridad |

Los routers cubiertos por servicio **siguen siendo dos** —`albarans` y `factures`—: los doce
`TCS` nuevos caen sobre las mismas rutas y no amplían el alcance a `nomines`, `personal`,
`clients`, `vehicles` ni `peces`. Siguen **0 ficheros de prueba dentro de `server/` y 0 CI**.
`server/routes/` no cambió con SPE-06 (893 líneas, 86 `res.status`, 71 literales, recontado
en `cf7f4c0`).

## 2. Recomendación

Las tres primeras por relación valor/dificultad **entre las cuatro que esperan decisión**.
Las tres aceptadas y las dos implementadas quedan fuera: recomendar lo ya decidido o lo ya
hecho no ayuda a nadie. **El orden no cambia respecto a la 3.1.0** (`MEJ-009`, `MEJ-002`,
`MEJ-006`); la 3.1.0 ya bajó `MEJ-006` al tercer puesto y `DOC-27` 1.1.0 solo refuerza ese
movimiento (1.5).

| # | Mejora | Por qué ésta |
|---|---|---|
| 1 | **MEJ-009 · Aplicar `formatDate` a `Personal.dataAlta`** | Coste casi nulo: el módulo de formato ya existe, probado y usado en seis páginas; falta una línea en `PersonalDetail.tsx`. Cierra la única inconsistencia de presentación que queda documentada tras `MEJ-008` |
| 2 | **MEJ-002 · Catálogo único de los literales de error del servidor** | Sube por evidencia, no por antigüedad: además de `DOC-14/EXP-006` y los 102 casos de interfaz, **la colección de servicio afirma ocho de los 71 literales con igualdad exacta** —el doble que en la 3.1.0, tras la ampliación de SPE-06 (1.4)—. Dos suites de dos dueños distintos dependen ya del mismo texto, y `EXP-027` ya demostró qué pasa cuando un formato cambia sin avisar a quien lo valida |
| 3 | **MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base** | Sigue en el tercer puesto: `DOC-27` 1.1.0 refuerza que la suite de servicio se ejecuta de forma repetible —con y sin resembrado— sin nada de lo que `MEJ-006` propone (1.5), así que el argumento de «bloquea a dos aceptadas» pesa aún menos. Sigue siendo `opinion`, sigue sin incidente medido, y sigue siendo la más barata de las de mayor alcance |

**MEJ-004 sigue siendo la de más valor absoluto del documento y no está en el podio**, por
el mismo motivo que en la ronda anterior: dificultad `high`, toca los ocho componentes por
los que pasa toda escritura, y depende de `MEJ-003`, que sigue aceptada sin haber entrado
en `A-07`. La 3.1.0 le hizo crecer evidencia (1.3, `A-05-15`); la delta 3.2.0 **no la
mueve** —la ampliación de servicio es profundidad sobre `albarans`/`factures`, no sobre los
routers de sus defectos abiertos—, y sigue sin cambiarle dificultad ni dependencia, así que
no cambia su posición fuera del podio.

## 3. Mejoras

Nueve en total: seis heredadas, dos `implemented` desde la 3.0.0 y una `proposed` nacida
entonces. **Ninguna nace ni cambia de estado esta ronda**; en la delta 3.2.0 tres ganan o
matizan evidencia (`MEJ-002` crece, `MEJ-003` y `MEJ-006` se matizan — ver §1.7). Ocho de
nueve salen de evidencia con fuente citable; una (`MEJ-006`) es de criterio, marcada como
`opinion` para poder filtrarse de un vistazo. Ninguna añade funcionalidad.

### 3.0 El patrón, recontado: la mitad del cliente se cierra, la del servidor sigue igual

La versión 1.0.0 sostuvo que los defectos confirmados eran, todos, la misma ausencia: una
comprobación que falta en el punto exacto donde el dato se escribe. `DOC-14` había
encontrado ocho casos de esa clase, todos en el servidor:

| Origen | Qué falta | Dónde | Estado |
|---|---|---|---|
| `DOC-24/BUG-001` | comprobar existencias antes de descontar stock | `albarans-router` | `critical` · corregido, verificado en vivo |
| `DOC-24/BUG-002` | comprobar que el vehículo nuevo es del mismo cliente | `albarans-router` | `critical` · corregido, verificado en vivo |
| `DOC-24/BUG-003` | precio, coste y stock no negativos | `peces-router` | `high` · abierto |
| `DOC-24/BUG-004` | no hay camino para anular o rectificar una factura | `factures-router` | `high` · abierto |
| `DOC-14/EXP-004` | deducciones mayores que el bruto: neto negativo aceptado | `nomines-router` | `high` · abierto, bloqueado por P-01 |
| `DOC-14/EXP-005` | mes con decimales y año sin límite | `nomines-router` | `medium` · abierto, bloqueado por P-02 |
| `DOC-14/EXP-015` | año de matriculación 2099 y kilometraje negativo | `vehicles-router` | `medium` · abierto, bloqueado por P-02 |
| `DOC-14/EXP-016` | validación de navegador desactivada: correo sin arroba, nombre de 281 caracteres | `clients-router` + `shared-components` | `medium` · abierto |
| `DOC-07/A-05-15` | borrar el albarán entero no devuelve el stock de sus líneas de pieza, a diferencia de retirar una línea suelta | `albarans-router` | aviso · **candidato**, no defecto — pendiente de que producto diga si `REQ-039` alcanza a este camino (1.2) |

**Los ocho de siempre no se mueven: seis abiertos, dos corregidos.** `albarans` (18
requisitos, 28 casos) y `factures` (13 requisitos, 19 casos) siguen siendo, según `DOC-07`
§5, el 39 % de los requisitos y el 43 % de los casos, y ahí caen tres de los cuatro
defectos de `DOC-24`. **Lo que sí se añade esta ronda es un noveno candidato**, distinto de
forma a los ocho anteriores: no es una comprobación ausente, es una regla que existe en un
sitio y no en el otro — ver 1.2 y 1.3.

**La segunda mitad, la del cliente, sí se ha movido, y es la novedad de esta ronda.** Los
dos defectos de doble envío que `DOC-14` había encontrado fuera de los routers —`EXP-002`
(`critical`) y `EXP-001` (`high`)— **están cerrados**, verificados con red y base de
datos. La tercera clase, de presentación (`EXP-014`, `EXP-009`), también se cierra en su
mayor parte. Lo que queda de esa familia es lo residual: la pérdida de hora al editar un
albarán (`EXP-009`, fuera de alcance por decisión de modelo) y la fecha de alta de
personal (`EXP-028`, `MEJ-009`).

---

### 3.1 Implementadas esta ronda

#### MEJ-007 · Una sola guarda contra el reenvío en los tres puntos de escritura del cliente

| | |
|---|---|
| **Estado** | `implemented` — verificado en vivo el 2026-08-23 |
| **Construida por** | `specs/implemented/SPE-04-proteccio-enviaments-duplicats.md`, `Estado: Implemented`, que cita esta mejora por nombre |
| **Verificación de que el problema desapareció** | `DOC-14/EXP-001` y `DOC-14/EXP-002`, ambos `CORREGIDO en v2.0.0`, con panel de red y `GET` de comprobación antes/después |

**Qué se construyó.** `client/src/hooks/useSubmitGuard.ts`, un único hook que bloquea el
reenvío mientras la petición está en vuelo. Lo consumen **9 ficheros**: los siete
formularios de entidad (`ClientForm`, `VehicleForm`, `PecaForm`, `PersonalForm`,
`NominaForm`, `AlbaraForm`, `FacturaForm`) y `AlbaraLiniesSection.tsx`. Es exactamente el
«un solo sitio en vez de tres implementaciones» que pedía la ficha original.

**Lo que la evidencia de cierre añade sobre la ficha original.** La ficha 2.1.0 dejaba
`FacturaForm.tsx:142` como «inferencia de lectura de código, no dato»: nadie lo había
reproducido. Ahora **sí está cubierto por el mismo mecanismo que los otros seis**, aunque
`DOC-14` no haya reproducido específicamente un doble envío de factura. Y la
generalización a un formulario no probado en la sesión original —alta de vehículo— **se
verificó y se confirmó**: un solo `POST /api/vehicles → 201`, un solo registro.

**Riesgo si no se hubiera hecho, y por qué ya no aplica.** La ficha 2.1.0 avisaba de que,
sin un sitio único, `EXP-002` se corregiría donde se reprodujo y quedarían vivos el alta
de cliente y la emisión de factura. No ha ocurrido: los tres puntos comparten el mismo
hook.

**Frontera respetada.** Esta mejora no fue la corrección de `EXP-001` ni de `EXP-002` en
sí —esas son de `A-14`—; lo que aportaba era la decisión de dónde vive el mecanismo. Esa
decisión se tomó y se ejecutó como se propuso: un hook, no tres parches.

---

#### MEJ-008 · Un único sitio donde se dé formato a importes y fechas

| | |
|---|---|
| **Estado** | `implemented` — verificado en vivo el 2026-08-23, con un residual pequeño (ver `MEJ-009`) |
| **Construida por** | `specs/implemented/SPE-05-presentacio-imports-i-dates.md`, `Estado: Implemented`, que cita esta mejora por nombre |
| **Verificación de que el problema desapareció** | `DOC-14/EXP-014` `CORREGIDO en v2.0.0`; `DOC-14/EXP-009` `PARCIALMENTE CORREGIDO en v2.0.0` (presentación cierra, el defecto de fondo no, y no era de esta mejora) |

**Qué se construyó.** `client/src/utils/format.ts`: `formatMoney` sobre
`Intl.NumberFormat('es-ES', {style:'currency', currency:'EUR'})` y `formatDate` sobre
`Intl.DateTimeFormat('es-ES', ...)`. Recuento sobre el código en `HEAD` (`4526cf0`): **0
llamadas a `toFixed` en todo `client/src`**, frente a las 15 en 8 ficheros que motivaron
la mejora.

**Lo que cierra.** El precio de una pieza se presenta igual en catálogo, ficha, línea de
albarán, factura y nómina —coma decimal, separador de miles, símbolo €—, verificado en las
cinco pantallas. La fecha del albarán se presenta como `21/08/2026` en listado y ficha,
donde antes había una marca de tiempo ISO cruda. `P-03`, la pregunta de negocio sobre coma
o punto decimal, queda respondida por la propia decisión del spec.

**Lo que no cierra, y por qué no invalida el estado.** El defecto de fondo de `EXP-009`
—editar el albarán reescribe la fecha a medianoche UTC y pierde la hora— sigue
reproduciéndose exactamente igual. **No es un fallo de esta mejora**: es una decisión de
modelo de datos que la propia ficha original de `MEJ-008` ya dejaba fuera («la corrección
de EXP-009 y EXP-014 como defectos sigue siendo de A-14»), y que `SPEC 05` declaró fuera
de su alcance por el mismo motivo, por escrito.

**La cautela que la ficha original escribió se ha cumplido.** Avisaba de que unificar el
formato «cambia lo que se ve en pantalla» y que «los `.feature` de `automation/ui/`
validan literales como `119.06 €`». Es exactamente lo que confirma `DOC-14/EXP-027`:
`factures.feature` y `nomines.feature` siguen con punto decimal y ya no coinciden con la
pantalla, con al menos nueve casos afectados contados a mano. Es trabajo de `A-03`, no de
esta mejora ni de `A-12`; consta en el apartado 6.

**Un hueco que la ficha original no pudo prever.** `Personal.dataAlta` no entraba en el
alcance de `SPEC 05` —lo dice el propio spec— y sigue sin `formatDate`. Es
`DOC-14/EXP-028`, y de ahí nace `MEJ-009`.

---

### 3.2 Nueva esta ronda

#### MEJ-009 · Aplicar `formatDate` a `Personal.dataAlta`

| | |
|---|---|
| **Estado** | `proposed` — **nueva**, identificador dado por S-12 |
| **Origen** | `evidence` |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `low` |

**En qué consiste.** Envolver `persona.dataAlta` con el `formatDate` de
`client/src/utils/format.ts` en `PersonalDetail.tsx`, tal como ya se hace con
`salariBase` y `formatMoney` dos líneas más abajo en el mismo fichero. **No decide ningún
formato nuevo**: usa el que `MEJ-008` ya construyó y que el resto de la aplicación ya
consume.

**Qué aporta.** Cierra la única inconsistencia de presentación que queda documentada tras
`MEJ-008`: hoy la ficha de un empleado muestra `FECHA DE ALTA 2020-01-15` junto a
`SALARIO BASE 1.650,00 €`, dos datos destacados de la misma ficha con dos niveles de
cuidado distintos.

**Evidencia.**

- **`DOC-14/EXP-028`**, severidad `low`, reproducido: `/personal/1` muestra `FECHA DE
  ALTA 2020-01-15`; `/albarans/3` muestra `FECHA 21/08/2026` con el mismo tipo de dato
  —una fecha destacada de ficha, no una marca de auditoría—. El propio `SPEC 05` ya
  declaraba esta inconsistencia como riesgo conocido y aceptado por escrito: «si es vol
  coherència total, és un spec futur».
- **Verificado en código** (A-12, commit `4526cf0`): `PersonalDetail.tsx:68` imprime
  `persona.dataAlta || '—'` en crudo; la línea 71 envuelve `persona.salariBase` en
  `formatMoney(...)`. El propio fichero ya importa `formatMoney` de
  `../../utils/format`; añadir `formatDate` al mismo `import` es el cambio.

**Distinción a propósito.** `EXP-028` distingue explícitamente esta fecha de negocio de
los campos de auditoría `creatEl`/`actualitzatEl`, que siguen sin tocar en toda la
aplicación y que nadie espera que `MEJ-008` ni esta mejora toquen: no son el mismo tipo de
dato y no están en su alcance.

**Componentes afectados** (bloque `graph` de `DOC-02`): `personal-pages`. **Uno de 51.**

**Riesgo de no hacerla.** Ninguno grave: es la inconsistencia visual más pequeña del
documento. El motivo para hacerla no es el riesgo de dejarla, es que el coste de hacerla
es casi nulo y el mecanismo ya existe, probado, en el mismo fichero.

**Entra por** `A-07`, aunque por su tamaño es candidata razonable a agruparse con
cualquier otro cambio menor que toque `personal-pages`.

---

### 3.3 Decididas · `accepted` el 2026-08-17, sin ejecutar

**No son propuestas. A-12 no las repropone, ni con este número ni reformuladas.** Su
siguiente paso es `A-07`, y siete días después no ha ocurrido con ninguna de las tres.

| Mejora | Estado | Nota de esta ronda |
|---|---|---|
| **MEJ-001 · Identificadores estables de prueba en la interfaz** | `accepted`, sin ejecutar | Sin cambios en su evidencia (26 POs, 20 `By.xpath` frente a 1 `By.id`). El reloj sigue corriendo: la suite de interfaz ya pasó por un susto real con `EXP-027` (17 escenarios en rojo por un cambio de formato, ya corregidos), y cuanto más tarde `MEJ-001` más Page Objects habrá escritos contra rótulos |
| **MEJ-003 · Suite de pruebas del servidor y CI mínima** | `accepted`, sin ejecutar | **Evidencia matizada en 3.2.0, sin cambio de estado — ver 1.1.** `DOC-27` 1.1.0: la colección pasa de 10 a 22 `TCS` y de 28 a 53 peticiones, pero **todo el crecimiento es profundidad sobre los mismos 2 de 7 routers** (`albarans`, `factures`); siguen 0 ficheros dentro de `server/`, 0 CI y `clients`/`vehicles`/`peces`/`personal`/`nomines` sin ninguna comprobación de servicio. Queda parcialmente satisfecha, no sustituida — y la ampliación **refuerza** que dejar crecer la colección sola no converge hacia lo que `MEJ-003` compra |
| **MEJ-005 · Estado de base reproducible entre escenarios** | `accepted`, sin ejecutar | Sin cambios en su propia evidencia. `DOC-23` 2.2.0 confirma `TC-048` y los 17 de `EXP-027` corregidos y reverificados (89 escenarios no re-ejecutados en esta versión). El patrón `_setup`/`_teardown` de `automation/api/` es una demostración funcionando de la técnica que pide, sin que eso cambie su prioridad (1.5) |

**Las dependencias siguen sin resolverse.** `MEJ-003` y `MEJ-005` dependen de `MEJ-006`,
que sigue sin decidir siete días después.

---

### 3.4 Esperando decisión

**Ninguna de estas tres está descartada: están sin decidir.** En la delta 3.2.0 `MEJ-002`
crece y `MEJ-006` se matiza (`MEJ-004` no se mueve); ninguna cambia de tamaño, dificultad
ni dependencia — eso es análisis de impacto y le corresponde a `A-07` cuando entren en
ciclo.

#### MEJ-002 · Catálogo único de los literales de error del servidor

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, **evidencia crecida de nuevo en 3.2.0** |
| **Origen** | `evidence` |
| **Tamaño** | `medium` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `medium` / `low` / `medium` |

**En qué consiste.** Extraer los 71 mensajes de error hoy incrustados en las rutas a un
módulo único, con un código estable por mensaje. No traduce ni reescribe ningún literal.

**Evidencia.** `DOC-14/EXP-006` (reproducido en los siete módulos con la interfaz en
castellano, recuento por fichero: albarans 20, nomines 13, vehicles 12, clients 7, factures
7, peces 6, personal 6 = 71); `DOC-05/4.11` («Literal del aviso», 25 casos);
`client/src/services/api.ts` propaga `body.error` tal cual; `specs/implemented/SPE-01-…:102`
fija la convención de claves de traducción que las 71 incumplen. **Recontado en `HEAD`
(`cf7f4c0`): SPE-06 no tocó `server/routes/` (893 líneas, 86 `res.status`, 71 literales),
los 71 siguen siendo 71.**

**Segundo consumidor, con igualdad exacta — crecido en 3.2.0 (1.4).**
`automation/api/tallerMecaniccollection.json` afirma **ocho** literales con `to.eql(...)`,
no con `include` (cuatro desde la 3.1.0, cuatro más con `DOC-27` 1.1.0): los de
`factures.js:69` y `:76`, `albarans.js:146` y `:161`, y los cuatro de la ruta
`PUT /albarans/:id` que llegaron con la automatización de SPE-06 —`albarans.js:82` («ja
està facturat»), `:87` («vehicle_id obligatori»), `:92` («vehicle no existeix») y `:101`
(«canviar el vehicle a un d'un altre client»)—. Los ocho verificados contra el código en
`HEAD` (`cf7f4c0`); tres con aserción negativa añadida. Dos suites, dos dueños
(`s10-auto-tcs` y `S-17`), el mismo texto sin catálogo.

**Componentes afectados:** los siete routers y, si se decide devolver un código,
`api-client`.

**Riesgo de no hacerla.** La corrección del idioma (`EXP-006`, `deriva_a: A-14`) se
escribirá router a router si llega antes que el catálogo, y ahora rompe dos suites en vez
de una — `EXP-027` ya mostró lo que cuesta ese escenario cuando ocurre sin catálogo.

**Entra por** `A-07`.

---

#### MEJ-004 · Un sitio donde vivan las reglas de escritura

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, **evidencia crecida en la 3.1.0; sin cambios en la delta 3.2.0** |
| **Origen** | `evidence` |
| **Tamaño** | `large` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `high` / `high` / `high` |

**En qué consiste.** Extraer de los routers la validación y las reglas de negocio a un
módulo por dominio. No añade ni cambia ninguna regla: mueve las que ya existen.

**Evidencia.** Los ocho defectos de escritura del apartado 3.0 (`DOC-24/BUG-001` a
`BUG-004`, `DOC-14/EXP-004`, `EXP-005`, `EXP-015`, `EXP-016`); `DOC-02/Q-06`; 893 líneas y
86 `res.status` en `server/routes/`, recontados en `HEAD` y sin cambios porque
`server/routes/` no se ha tocado.

**Nuevo en la 3.1.0 — un noveno candidato, de una forma distinta a los ocho anteriores
(1.2, 1.3).** `DOC-07/A-05-15`: `server/routes/albarans.js:197-224` devuelve el stock al
retirar una línea de pieza; `:116-132` no lo hace al borrar el albarán entero, aunque
retire las mismas líneas. No es una comprobación ausente, sino la misma regla escrita en
un sitio y ausente en el otro — exactamente el síntoma que un módulo de dominio compartido
elimina por construcción. **No se resuelve aquí si el comportamiento actual es un defecto**
—eso es de producto, ver 1.2 y apartado 6—; lo que aporta a esta ficha es evidencia de que
el patrón de duplicación que `MEJ-004` ataca ya se ha materializado una vez más.

**Componentes afectados:** los siete routers más `db-connection`.

**Riesgo de no hacerla.** El noveno defecto de la misma familia — ya no es una proyección
abstracta, tiene candidato y cita.

**Sigue recomendándose la tercera vía**, no antes: hacerla con el primer evolutivo,
acotada al dominio que ese evolutivo toque, porque `MEJ-003` —de la que depende para tener
red— sigue aceptada y parada, y la suite de servicio que ha nacido no cubre `nomines` ni
`personal` (1.1).

**Entra por** `A-07`.

---

#### MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, **matiz reforzado en la delta 3.2.0 (1.5)** |
| **Origen** | **`opinion`** |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `medium` |

**En qué consiste.** Declarar `engines` y `.nvmrc`, y leer la ruta de la base de una
variable de entorno con el valor actual como valor por defecto.

**Por qué sigue marcada `opinion`.** Verificado de nuevo: ningún `package.json` declara
`engines`, no hay `.nvmrc`, `Q-01` y `Q-02` (`DOC-02`) siguen abiertas. Sigue sin haber un
solo dato que mida que esto haya causado un incidente.

**Matiz reforzado en 3.2.0, en contra del argumento de urgencia.** `DOC-27` 1.1.0 confirma
por los dos lados que `automation/api/` se ejecuta de forma repetible **sin** nada de lo
que esta mejora propone: dos pasadas seguidas sin resembrar dan el mismo recuento
(53 / 74 / 0) y el estado medido queda idéntico antes y después. Eso ablanda, no refuerza,
el argumento de «bloquea a dos aceptadas». Sigue pendiente solo la parte de
`data/taller.db` configurable: la corrida de entrega de la 1.1.0 partió de `npm run seed`,
que reescribe la base en el sitio (`DOC-27` §6).

**Componentes afectados:** `db-connection` y `server-app`.

**Riesgo de no hacerla.** `MEJ-003` (CI reproducible) y la mitad de `MEJ-005` que apunta a
otra base no se pueden hacer sin esto, y las dos siguen aceptadas.

**Entra por** `A-07`.

## 4. Vivas de rondas anteriores

Las cuatro `proposed` —una con evidencia que crece en la delta 3.2.0, una que se matiza,
dos sin evidencia nueva—.

| Mejora | Evidencia | Qué ha pasado |
|---|---|---|
| **MEJ-002** | **Crece (más en 3.2.0)** | Segundo consumidor de los 71 literales: `automation/api/` los afirma con igualdad exacta en **8 casos** (eran 4 en la 3.1.0), tras la ampliación de servicio de SPE-06 (1.4) |
| **MEJ-004** | Sin cambios desde 3.1.0 | Noveno candidato de la misma familia, de forma nueva: `DOC-07/A-05-15` (1.2, 1.3). Sigue dependiendo de `MEJ-003` |
| **MEJ-006** | **Se matiza (3.2.0)** | Sigue `opinion`, sigue sin incidente medido; el argumento de «bloquea a dos aceptadas» se ablanda un poco más con la segunda corrida de `DOC-27` 1.1.0 (1.5) |
| **MEJ-009** | Sin cambios | Nació en la 3.0.0 de `DOC-14/EXP-028`, coste trivial. Sigue `proposed` |

**MEJ-007 y MEJ-008 salen de esta lista porque están `implemented`**, no porque se hayan
descartado. Su verificación de cierre está en el apartado 3.1.

## 5. Descartadas

**Ninguna, y sigue siendo importante decirlo con todas las letras.** El propietario del
proyecto no ha rechazado ninguna mejora desde el 2026-08-17. `MEJ-002`, `MEJ-004` y
`MEJ-006` **no están descartadas: están esperando decisión desde hace siete días.**

Lo que se conserva, actualizado donde `DOC-07` 1.10.0 o `DOC-27` lo tocan:

### 5.1 El control de concurrencia (`DOC-14/EXP-003`) · sin cambios

`DOC-14` 2.1.0 no lo revisa de nuevo: sigue vigente lo dicho en 2.0.0. Sigue sin
proponerse: la decisión —bloqueo optimista o fusión por campos— es de producto, no técnica
(`specs/implemented/SPE-01-…:50` excluye el acceso multiusuario simultáneo; `EXP-003`
ocurre con un solo usuario y dos pestañas, que el spec no excluye). Va al apartado 6.

### 5.2 La numeración de albaranes y facturas (`generateNumero`) · sin cambios

Sigue sin proponerse. `better-sqlite3` es síncrono; `DOC-24` y `DOC-14` verificaron la
numeración como correcta.

### 5.3 Las correcciones de los defectos, los ocho (y el candidato a noveno) · matizado

No son mías: `BUG-003`/`BUG-004` son evolutivos decididos por negocio; los defectos de
`DOC-14` van a `A-14`. Lo que hago con ellos es leerlos como patrón (3.0) y proponer dónde
aterrizan: `MEJ-004` en el servidor. **`A-05-15` se suma al mismo tratamiento**: no se
propone su corrección —depende de una decisión de producto que no me corresponde tomar
(1.2)— y se incorpora como evidencia de `MEJ-004`.

### 5.4 La fragilidad del extractor de S-12 (`DOC-07/A-05-06`) · sin cambios

No existe en el grafo de `DOC-02` y no es código de `app-taller`. Va al apartado 6.

### 5.5 Los huecos de cobertura · cobertura al 100 %, sube la evidencia de ejecución

`DOC-07` 1.12.0: **100,00 %**, 0 `GAP PLAN`, 0 anomalías bloqueantes — igual que en toda la
historia de este documento (**79/79** hasta SPE-06, **81/81** con `REQ-080`/`REQ-081` ya
cubiertos). Lo que cambia en la delta 3.2.0 es que la evidencia de ejecución publicada sube
de **106 a 111\* de 119 casos**, al ampliar `DOC-27` 1.1.0 la cobertura de servicio a los
casos de SPE-06 sacados de la interfaz (TC-111/113/115/116 y la mitad de servicio de
TC-119). Los avisos vivos siguen siendo correcciones de otros agentes o funcionalidad para
`A-15`; ver 6.5 y 6.9 para lo que nació en la 3.1.0.

### 5.6 EXP-017, EXP-019 y EXP-026 (`deriva_a: A-12`, no revisados esta sesión) · sin cambios

`DOC-14` 2.1.0 los marca «sin cambios, no revisado de nuevo» para los tres. Siguen sin
proponerse por el mismo motivo de siempre: cambian lo que el usuario ve y decide —un aviso
de cambios sin guardar, una salida en la pantalla de error, qué registro se va a borrar—, y
eso es funcionalidad, no deuda técnica. Van al apartado 6.

## 6. Hallazgos para otras piezas

Ninguno se desarrolla aquí y ninguno se registra editando el documento de su dueño.

### 6.1 → `A-15` · Tres hallazgos que eran funcionalidad, no deuda — ya recogidos

Los tres que este roadmap venía reenviando sin cambios desde la 2.1.0 —`EXP-017` (aviso al
abandonar un formulario con cambios sin guardar), `EXP-026` (el diálogo de borrado no dice
qué registro se borra) y `EXP-019` (las pantallas de error no ofrecen salida)— **ya están
en `DOC-25` 1.2.0/1.2.1** como `FUN-009`, `FUN-010` y `FUN-011`, citando a este documento
como origen. **No hace falta seguir reenviándolos**: la puerta ya está cruzada y lo que
sigue con ellos es decisión de negocio sobre las tres `FUN-nnn`, no trabajo pendiente de
`A-15`.

### 6.2 → ya recogido en `DOC-25` como `FUN-012` · Si la concurrencia está o no en el alcance

`DOC-14/EXP-003` (dos pestañas del mismo usuario pierden trabajo en silencio) dio lugar a
**`FUN-012`** en `DOC-25` 1.2.0, citando a este documento como origen. La pregunta de fondo
—si el sistema debe defenderse de ello— sigue siendo de negocio, y ahora tiene ficha propia
donde decidirla; A-12 no necesita seguir reenviándola.

### 6.3 → ya recogido en `DOC-25`, con un matiz que sí es nuevo · Funcionalidad ausente que la automatización topó

`DOC-07/A-05-11c` (`TC-032`, `TC-033`, `TC-047` sin vector porque no existe filtro por
vehículo/cliente en albaranes ni campo de precio manual en la línea de pieza) fue evaluado
por `A-15` en `DOC-25` 1.2.0, que **decidió no convertirlo en `FUN-nnn`**: razona que
`REQ-025` y `REQ-034`/`BR-ALB-06` ya dan por hecho, en presente, que esas capacidades
existen, así que el hueco no es una funcionalidad que falte proponer sino una discrepancia
entre lo que `DOC-04` declara y lo que la interfaz ofrece. **Eso es un hallazgo de
`DOC-04`/`DOC-07`, no de este roadmap ni de `A-15`**; se deja constancia aquí solo para que
quede claro que ya se evaluó y no quedó huérfano.

### 6.4 → `A-14` · El censo de defectos sigue sin reflejar lo verificado, cuarta ronda que lo señala

`DOC-24` sigue en 1.0.0 con los cuatro defectos «abiertos», mientras `DOC-14` verificó en
vivo —ya en su versión 1.0.0— que `BUG-001` y `BUG-002` funcionan. `BUG-003` tiene decisión
de negocio desde el 2026-08-16 (Q-12), pendiente de implantar; `BUG-004` sigue abierto sin
decisión. Es la cuarta versión de este roadmap que tiene que cruzar dos documentos para
saber el estado real de los cuatro.

### 6.5 → `A-03` · El paso 2 de `TC-041` no lo ejerce ninguna suite

**Nuevo — `DOC-07/A-05-15`, ver `DOC-07` §3.14.** `TC-041` ya tiene evidencia de ejecución
por servicio (`TCS001`), pero su paso 2 —«el selector ofrece exactamente dos tipos […] y
ninguna otra opción»— es una afirmación sobre la pantalla, y **ni la suite de navegador ni
la de servicio lo ejercen**: `S-10` no tiene escenario para el caso y `TCS001` comprueba la
API, que es otra cosa. Corrección de guion de prueba, no de la aplicación.

**Cerrado desde la ronda anterior, se retira de este apartado: `EXP-027`.** `DOC-14` 2.1.0
y `DOC-23` 2.2.0 confirman los 17 `.feature` corregidos y reverificados en verde. Seguía
citado como abierto en la 3.0.1 por la razón explicada en 1.6.

**Sin cambios:**

1. **El estado documentado del proyecto ya no es exacto.** `CLAUDE.md` sigue anunciando «1
   caso vermell: TC-048», que ya no lo es tras `DOC-23` 2.2.0. No es un `DOC-nn` y `A-12` no
   lo edita; se deja constancia para quien mantenga `CLAUDE.md`.
2. **`A-05-12` sigue sin corregir**: el resumen del front-matter de `DOC-05` dice
   `ui:109/service:1`, su YAML dice `106/4`.
3. **`TC-073` y `TC-075` siguen sin comprobar el IVA** (`A-05-03b`): están en verde y no
   validan `Literal: <ivaEsperado> €` en ningún paso.

### 6.6 → `S-12` · Cinco cosas del registro, una nueva

1. **La familia `TCS-nnn` nace fuera de `registro-ids.json`.** Nuevo — `DOC-07/A-05-16`,
   origen `DOC-27` §6.1: los diez identificadores de la colección de servicio se asignan
   dentro del propio JSON de Postman, sin pasar por `S-12`, a diferencia de `REQ`, `TC`,
   `UC` y `BR`. Si la familia debe registrarse es decisión de `S-12` y del canon `DOC-nn`,
   no de `A-12`.
2. **`MEJ-009` sigue sin censo.** Nació en la 3.0.0 con número dado por `registry.js`; **A-12
   no ha escrito en el registro** en ninguna ronda desde entonces, que sigue con 8 anclas
   `MEJ`.
3. **La divergencia de estado sigue**: `MEJ-001`, `MEJ-003` y `MEJ-005` deberían figurar
   `accepted` y `MEJ-007`/`MEJ-008` `implemented`; si el registro no lo refleja, sigue
   siendo `proposed` allí. La fuente de verdad del estado es `DOC-16`.
4. **`A-05-06` sigue abierta**, sin cambios.

### 6.7 → `S-05` · Quinta versión consecutiva sin `DOC-17`

Este roadmap sigue supliendo la ausencia con evidencia de defectos, exploración,
cobertura y lectura de código, y no puede ver la deuda que todavía no ha producido ningún
defecto.

### 6.8 → `S-01` · El grafo sigue sin las tres aristas que `DOC-07/7.2` documentó, pese a dos regeneraciones

Las tres aristas que `DOC-07` §7.2 señaló como faltantes —`albarans-pages →
vehicles-service`, `albarans-pages → shared-components`, `factures-pages →
albarans-service`— **siguen sin estar en el grafo**. `DOC-02` ha subido de versión dos
veces desde que se señaló (1.1.0 por `use-submit-guard`/`format-utils`; el salto de hash
sin versión de esta ronda, por dos rutas de spec reescritas) y ninguna de las dos tocó
esta carencia. Verificado a mano sobre el bloque `edges` de `DOC-02` en `HEAD`. Tercera
ronda que lo señala.

### 6.9 → `A-02` (producto) · Si borrar un albarán debe devolver el stock de sus líneas de pieza

**Nuevo — `DOC-07/A-05-15`, origen `DOC-27` §4.1.** El hecho, verificado en el servidor:
retirar una línea de pieza devuelve la cantidad al stock (`server/routes/albarans.js:197-224`);
borrar el albarán entero, que retira las mismas líneas, no lo hace (`:116-132`). `A-05` ya
señala que ningún requisito de `DOC-04` decide si el segundo camino debe comportarse como
el primero: `REQ-039` habla de retirar una línea; `REQ-041`, de borrar el albarán. **A-12
no responde esta pregunta** —es la misma clase de decisión que `EXP-003` en 6.2: técnica no
es, de producto sí— y la incorpora solo como evidencia de `MEJ-004` (1.2, 1.3, 3.4). Si la
respuesta es que sí debe devolverlo, hay un defecto de aplicación para `DOC-24`/`A-14`; si
no, falta el requisito que lo diga, y es trabajo de `A-02`. `A-05` añade además que `TC-056`
—el único caso de `REQ-041`— está en verde sin mirar el stock y que su escenario no coincide
con la precondición del caso (`s10-auto-tcs`); A-12 no repite ese detalle, ya está en
`DOC-07` §3.15.

## 7. Bloque estructurado

```yaml roadmap
version: 1
project: app-taller
run:
  date: 2026-08-29
  round: 3.2.0
  kind: bounded_delta
  first_run: false
  previous_doc_version: 3.1.0
  last_analysis_round: 3.1.0
  commit_sha: cf7f4c084dbf2a6cd392a06e8e485db5ad476280
  new_inputs_this_run: []
  inputs_changed_this_run: [DOC-27-INFORME-API.md, DOC-07-TRAZABILIDAD.md]
  inputs_absent: [DOC-17-DEUDA-TECNICA.md, DOC-20-RALLY-STATE.json, DOC-19-RALLY-TESTCASES.csv]
  obsolescence_ack_this_run: [DOC-02-TECNICA.md, DOC-05-PLAN-PRUEBAS.md, registro-ids.json, DOC-14-EXPLORATORIO.md, DOC-25-PROPUESTAS-FUNCIONALES.md]
  obsolescence_ack_reason: >-
    DOC-02 1.2.0, DOC-05 1.8.0 y registro-ids.json 1.6.0 son SPE-06, ya reconocidos, sin
    impacto en ningun MEJ-nnn (server/routes/ no cambio: 893 lineas, 86 res.status, 71
    literales en cf7f4c0; anclas MEJ siguen en MEJ-001..MEJ-008). DOC-14 2.1.1 y DOC-25
    1.2.2 son resyncs circulares de la propia 3.1.0. Fuera del alcance de esta delta
    acotada; se consumiran en la proxima ronda de analisis.
  ids_granted_by: S-12
  ids_requested_this_run: 0
  ids_granted: []
  no_new_mej_this_round: true
  no_status_change_this_round: true
  provenance_note: >-
    Delta acotada 3.1.0 -> 3.2.0. Solo se reconsumen las dos entradas movidas por evidencia
    de ejecucion nueva: DOC-27 1.0.0 -> 1.1.0 (S-17 amplia automation/api/: 10 -> 22 TCS,
    28 -> 53 peticiones, 74 aserciones, 0 rojos, base resembrada) y DOC-07 1.10.0 -> 1.12.0
    (A-05: 1.11.0 incorpora SPE-06 con 79/79 -> 81/81; 1.12.0 incorpora DOC-27 1.1.0 con
    evidencia de ejecucion 106 -> 111* de 119). Hashes recalculados en HEAD (cf7f4c0). No
    se ha barrido cada cita "79/79"/"110 casos" del cuerpo heredado, solo las de secciones
    tocadas por la delta (S1, S1.7, S5.5).
decision_of_record:
  date: 2026-08-17
  by: propietario del proyecto
  accepted: [MEJ-001, MEJ-003, MEJ-005]
  rejected: []
  a07_done_for_accepted: false
  note: >-
    Sin decision nueva esta ronda: A-12 propone, decide una persona. MEJ-007 y MEJ-008
    pasaron a implemented por via de /spec, no por una decision de aceptacion formal de
    A-07/A-08.
improvements:
  - id: MEJ-001
    title: Identificadores estables de prueba en la interfaz
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    evidence_change_since_3_0_0: sin cambios
    components: [albarans-pages, clients-pages, vehicles-pages, factures-pages, personal-pages, shared-components]
    impact: low
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer en ninguna ronda.
  - id: MEJ-002
    title: Catálogo único de los literales de error del servidor
    status: proposed
    what: >-
      Extraer los 71 mensajes de error incrustados en las rutas a un módulo único con un
      código estable por mensaje, y devolver ese código junto al texto. No traduce ni
      reescribe ningún literal.
    value: >-
      Un ancla que no se mueve al retocar la redacción de un aviso para los casos
      automatizados, y el punto único desde el que corregir el idioma una vez en lugar de 71.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-006
      - DOC-05/4.11/familia-literal-del-aviso-25-casos
      - codigo/71-literales-en-server-routes-recontados-en-cf7f4c0-sin-cambios-por-SPE-06
      - specs/implemented/SPE-01-esquelet-app-taller.md:102
      - automation/api/tallerMecaniccollection.json/8-literales-en-igualdad-exacta-to.eql
    evidence_change_since_3_0_0: >-
      Crece, y mas en la delta 3.2.0. Segundo consumidor de los mismos literales: la
      coleccion de servicio (DOC-27 1.1.0) afirma 8 de los 71 con igualdad exacta (to.eql)
      -eran 4 en la 3.1.0-. Los 4 nuevos son de la ruta PUT /albarans/:id automatizada con
      SPE-06: albarans.js:82 (ja facturat), :87 (vehicle_id obligatori), :92 (vehicle no
      existeix) y :101 (canvi de client); tres con asercion negativa anadida. Verificados
      contra el codigo en HEAD (cf7f4c0). Dos suites, dos duenos (s10-auto-tcs, S-17).
    evidence_change_3_2_0: >-
      Crece: de 4 a 8 literales afirmados con to.eql. No cambia tamano, dificultad,
      impacto, urgencia ni estado; sigue proposed, sigue #2 en la recomendacion.
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, api-client]
    impact: medium
    difficulty: low
    urgency: medium
    size: medium
    confidence: medium
    risk_if_not_done: >-
      La corrección del idioma (EXP-006, deriva_a A-14) se escribirá router a router si
      llega antes que el catálogo.
    enters_cycle_via: A-07
  - id: MEJ-003
    title: Suite de pruebas automáticas del servidor y CI mínima
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    implemented: false
    evidence_change_since_3_0_0: >-
      Parcialmente satisfecha, sin cambio de estado. Nace automation/api/ con informe
      publicado (DOC-27), 0 residuo en base medido. Sigue faltando: 0 ficheros de prueba
      dentro de server/, 0 CI, y 5 de 7 routers (clients, vehicles, peces, personal,
      nomines) sin ninguna comprobacion de servicio. La decision de si esto sustituye o
      solo complementa a MEJ-003 es de quien la lleve a A-07.
    evidence_change_3_2_0: >-
      Se matiza en contra de "menos urgente". DOC-27 1.1.0: la coleccion pasa de 10 a 22
      TCS y de 28 a 53 peticiones, pero TODO el crecimiento es profundidad sobre los 2
      routers ya cubiertos (albarans PUT /:id, factures); 0 avance en CI, en ficheros
      dentro de server/ y en los otros 5 routers. Refuerza que dejar crecer la coleccion
      externa organicamente no converge hacia lo que MEJ-003 compra. Sin cambio de estado,
      tamano ni prioridad; sigue accepted, sin ejecutar.
    evidence_refs:
      - DOC-27-INFORME-API.md/1.1.0
      - codigo/0-ficheros-test-en-server-en-cf7f4c0
      - codigo/sin-CI-sin-script-test-en-cf7f4c0
      - codigo/automation-api-cubre-2-de-7-routers-tras-doblar-a-22-TCS
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection, db-migrate, db-numbering]
    impact: low
    difficulty: medium
    urgency: high
    size: large
    confidence: medium
    depends_on: [MEJ-006]
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer, ni entera ni troceada.
  - id: MEJ-004
    title: Un sitio donde vivan las reglas de escritura
    status: proposed
    what: >-
      Extraer de los routers la validación de entrada y las reglas de negocio a un módulo
      por dominio. No añade ni cambia ninguna regla; mueve las que ya existen.
    value: >-
      Ataca la causa común de los ocho defectos de escritura y hace que los evolutivos
      aterricen en un sitio con dueño en vez de en ocho parches.
    source: evidence
    evidence_refs:
      - DOC-24/BUG-001
      - DOC-24/BUG-002
      - DOC-24/BUG-003
      - DOC-24/BUG-004
      - DOC-14/EXP-004
      - DOC-14/EXP-005
      - DOC-14/EXP-015
      - DOC-14/EXP-016
      - DOC-02/Q-06
      - codigo/893-lineas-y-86-res.status-en-server-routes-sin-cambios-desde-b2a8d77
      - DOC-07/A-05-15
    evidence_change_since_3_0_0: >-
      Crece. Noveno candidato de la misma familia, de forma nueva: la regla de devolver
      stock existe en albarans.js:197-224 (retirar linea) y no en :116-132 (borrar
      albaran), verificado en HEAD. No se decide si es defecto -- pregunta de producto,
      ver DOC-16 apartado 6.9 -- se incorpora solo como evidencia de duplicacion-por-omision.
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection]
    impact: high
    difficulty: high
    urgency: high
    size: large
    confidence: medium
    risk_if_not_done: El noveno defecto de la misma familia.
    depends_on: [MEJ-003]
    note: >-
      Recomendación de A-12: hacerla con el primer evolutivo, acotada a su dominio, después
      de MEJ-003.
    enters_cycle_via: A-07
  - id: MEJ-005
    title: Estado de base reproducible entre escenarios
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    evidence_change_since_3_0_0: sin cambios
    components: [db-seed, db-migrate, db-connection]
    impact: low
    difficulty: low
    urgency: high
    size: small
    confidence: high
    depends_on: [MEJ-006]
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer en ninguna ronda.
  - id: MEJ-006
    title: Fijar la versión de Node y hacer configurable la ruta de la base
    status: proposed
    what: >-
      Declarar `engines` y `.nvmrc`, y leer la ruta de la base de una variable de entorno
      con el valor actual como valor por defecto.
    value: Habilitador parcial de MEJ-003 y MEJ-005, las dos aceptadas y las dos paradas.
    source: opinion
    evidence_refs:
      - DOC-02/Q-01
      - DOC-02/Q-02
      - codigo/ningun-package.json-declara-engines-y-no-hay-.nvmrc
      - DOC-27-INFORME-API.md/1.1.0/§1-§6
    evidence_change_since_3_0_0: >-
      Se matiza, en contra de la urgencia. DOC-27 demuestra que automation/api/ se ejecuta
      de forma repetible SIN nada de lo que esta mejora propone; el argumento "bloquea a
      dos aceptadas" pesa menos. Queda en pie la mitad de ruta de base configurable: un
      informe de entrega parte de npm run seed, que reescribe data/taller.db en el sitio.
    evidence_change_3_2_0: >-
      Matiz reforzado. DOC-27 1.1.0 lo confirma por los dos lados: dos pasadas seguidas sin
      resembrar dan el mismo recuento (53/74/0) y, con resembrado, el estado medido queda
      identico antes y despues (facturas 1->1, albaranes 4->4, lineas 7->7, stock
      167->167). La corrida de entrega de la 1.1.0 partio de npm run seed. Sin cambio de
      estado, tamano, prioridad ni source (sigue opinion, urgency medium, #3 en el podio).
    components: [db-connection, server-app]
    impact: low
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    risk_if_not_done: >-
      La CI reproducible de MEJ-003 y la parte de MEJ-005 que apunta a otra base no se
      pueden hacer sin esto.
    blocks: [MEJ-003, MEJ-005]
    enters_cycle_via: A-07
  - id: MEJ-007
    title: Una sola guarda contra el reenvío en los tres puntos de escritura del cliente
    status: implemented
    implemented_via: specs/implemented/SPE-04-proteccio-enviaments-duplicats.md
    implemented_verified_on: 2026-08-23
    what: >-
      Bloquear el envío mientras la petición está en vuelo, en un solo sitio:
      client/src/hooks/useSubmitGuard.ts, consumido por 9 ficheros.
    value: >-
      Cierra EXP-002 (critical) y EXP-001 (high), verificados con red y base de datos, y
      evita que el mecanismo se escribiera tres veces distinto.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-002
      - DOC-14/EXP-001
      - specs/implemented/SPE-04-proteccio-enviaments-duplicats.md
      - codigo/9-ficheros-importan-useSubmitGuard-en-4526cf0
    components: [shared-components, albarans-pages, factures-pages, clients-pages, vehicles-pages, peces-pages, personal-pages, nomines-pages]
    problem_verified_gone: true
    residual_note: >-
      FacturaForm.tsx no tiene reproducción específica de doble envío pero usa el mismo
      hook que los demás; no es una brecha, es ausencia de reproducción puntual.
    enters_cycle_via: n/a (implementada vía /spec, no via A-07 formal)
    note: A-12 no la volverá a proponer.
  - id: MEJ-008
    title: Un único sitio donde se dé formato a importes y fechas
    status: implemented
    implemented_via: specs/implemented/SPE-05-presentacio-imports-i-dates.md
    implemented_verified_on: 2026-08-23
    what: >-
      client/src/utils/format.ts: formatMoney (Intl.NumberFormat) y formatDate
      (Intl.DateTimeFormat), consumidos desde las pantallas que antes formateaban cada una
      por su cuenta.
    value: >-
      0 llamadas a toFixed en client/src (eran 15 en 8 ficheros). Cierra EXP-014 y la parte
      de presentación de EXP-009. Responde P-03.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-014
      - DOC-14/EXP-009
      - specs/implemented/SPE-05-presentacio-imports-i-dates.md
      - codigo/0-toFixed-en-client-src-en-4526cf0
    components: [albarans-pages, clients-pages, factures-pages, nomines-pages, peces-pages, personal-pages, shared-components]
    problem_verified_gone: true
    residual_note: >-
      El defecto de fondo de EXP-009 (pérdida de hora al editar el albarán) sigue abierto;
      es de A-14, fuera del alcance de esta mejora por decisión explícita de SPEC 05.
      EXP-028 (Personal.dataAlta sin formatDate) queda fuera del alcance original y da
      lugar a MEJ-009. La cautela sobre los .feature de automation/ui se ha cumplido:
      EXP-027, dirigido a A-03.
    enters_cycle_via: n/a (implementada vía /spec, no via A-07 formal)
    note: A-12 no la volverá a proponer.
  - id: MEJ-009
    title: Aplicar formatDate a Personal.dataAlta
    status: proposed
    new_this_round: true
    what: >-
      Envolver persona.dataAlta con formatDate en PersonalDetail.tsx, igual que ya se hace
      con salariBase y formatMoney dos líneas más abajo en el mismo fichero.
    value: >-
      Cierra la única inconsistencia de presentación que queda documentada tras MEJ-008,
      con un cambio de una línea sobre un mecanismo ya construido y probado.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-028
      - codigo/PersonalDetail.tsx:68-dataAlta-sin-formatDate
      - codigo/PersonalDetail.tsx:71-salariBase-con-formatMoney
    components: [personal-pages]
    impact: low
    difficulty: low
    urgency: low
    size: small
    confidence: high
    risk_if_not_done: >-
      Ninguno grave: es la inconsistencia visual más pequeña del documento. Se propone por
      el coste casi nulo, no por el riesgo de dejarla.
    enters_cycle_via: A-07
considered_not_proposed:
  - what: Control de concurrencia / bloqueo optimista (DOC-14/EXP-003)
    why: >-
      Decisión de producto, no técnica; sin cambios esta ronda (DOC-14 2.1.0: no revisado de
      nuevo, se da por vigente). Ya recogido por A-15 como FUN-012 en DOC-25 1.2.0.
  - what: Condición de carrera y orden textual en generateNumero (DOC-02/Q-03)
    why: better-sqlite3 es síncrono; verificado correcto por DOC-24 y DOC-14.
  - what: Las correcciones de los ocho defectos de escritura, y el candidato a noveno
    why: >-
      Son de A-14 (BUG-nnn, EXP-nnn) o de una decisión de producto pendiente (DOC-07/A-05-15,
      ver findings_for_others target A-02). A-12 los lee como patrón y propone dónde
      aterrizan: MEJ-004.
  - what: Si borrar un albarán debe devolver el stock de sus líneas de pieza (DOC-07/A-05-15)
    why: >-
      Pregunta de producto, no técnica; el propio DOC-07 lo dice explícitamente. Incorporado
      solo como evidence_ref de MEJ-004; no nace MEJ-010. Va a findings_for_others, target A-02.
  - what: Fragilidad del extractor de S-12 (DOC-07/A-05-06)
    why: No es código de app-taller, no existe en el grafo de DOC-02.
  - what: Huecos de cobertura
    why: "DOC-07 1.12.0: 100% (81/81), 0 GAP PLAN, 0 bloqueantes. Evidencia de ejecucion 106 -> 111* de 119 con DOC-27 1.1.0."
  - what: EXP-017, EXP-019 y EXP-026 (deriva_a A-12, no revisados en DOC-14 2.1.0)
    why: >-
      Cambian lo que el usuario ve o puede hacer; es funcionalidad y la decide negocio. Ya
      recogidos por A-15 como FUN-009, FUN-010 y FUN-011 en DOC-25 1.2.0.
  - what: TC-032/TC-033/TC-047 sin vector por REQ-025/REQ-034 (DOC-07/A-05-11c)
    why: >-
      Evaluado por A-15 en DOC-25 1.2.0, que no lo convierte en FUN-nnn: los requisitos ya
      dan por hecho que la capacidad existe, así que es discrepancia DOC-04/DOC-07, no
      funcionalidad ausente que A-12 deba reenviar de nuevo.
corrections_to_previous_version:
  - what: inputs DOC-27 y DOC-07 al dia
    detail: >-
      DOC-27-INFORME-API.md 1.0.0 -> 1.1.0 (hash 178d4b14 -> 2ae7596b) y
      DOC-07-TRAZABILIDAD.md 1.10.0 -> 1.12.0 (hash f3eb60be -> 4b3e99db). commit_sha de
      source 40bbd43 -> cf7f4c0.
  - what: citas de cifras actualizadas solo en las secciones tocadas por la delta
    detail: >-
      S1 (tabla de cambios, parrafo de cobertura), S1.1 (10->22 TCS, 28->53 peticiones,
      2 de 7 routers), S1.4 (4->8 literales to.eql), S1.5 (repetibilidad con y sin
      resembrado), S1.7 (nueva), S2 (podio), S3.3/S3.4 (fichas MEJ-002/003/006), S4, S5.5.
      Las citas "79/79" y "110 casos" de otras secciones reflejan el censo pre-SPE-06 y se
      barren en la proxima ronda de analisis (ver obsolescence_ack).
  - what: ninguna cifra de server/routes/ requirió corrección de contenido
    detail: >-
      893 líneas, 86 res.status y 71 literales de error, recontados en HEAD (cf7f4c0):
      SPE-06 (merge c771e35) toco solo AlbaraForm.tsx y seed.js, no server/routes/. La
      ruta PUT /albarans/:id ya existia desde el fix de bugs ed61c24.
findings_for_others:
  - target: A-15
    status: cerrado por el destinatario
    note: >-
      EXP-017, EXP-026 y EXP-019 ya son FUN-009, FUN-010 y FUN-011 en DOC-25 1.2.0/1.2.1,
      citando este documento como origen. No se repropone.
  - target: A-15
    status: cerrado por el destinatario
    note: >-
      Si la concurrencia (EXP-003) está en el alcance del producto: ya es FUN-012 en DOC-25
      1.2.0. No se repropone.
  - target: A-15
    status: evaluado por el destinatario, sin FUN-nnn
    note: >-
      DOC-07/A-05-11c (TC-032/TC-033/TC-047 sin vector) evaluado por A-15 en DOC-25 1.2.0:
      no da lugar a propuesta, es discrepancia DOC-04/DOC-07. Se deja constancia, no se
      repropone.
  - target: A-02
    status: nuevo
    note: >-
      DOC-07/A-05-15 — si borrar un albarán debe devolver el stock de sus líneas de pieza.
      REQ-039 habla de retirar una línea, REQ-041 de borrar el albarán; ninguno decide sobre
      el otro. A-12 no lo resuelve ni lo propone como MEJ; lo usa solo como evidence_ref de
      MEJ-004. Si la respuesta es sí, es BUG-nnn para A-14; si no, falta requisito en DOC-04.
  - target: A-14
    status: sin cambios
    note: >-
      DOC-24 sigue en 1.0.0 con BUG-001/BUG-002 "abiertos" pese a que DOC-14 verificó en
      vivo que funcionan. Cuarta ronda que lo señala.
  - target: A-03
    status: nuevo
    note: >-
      DOC-07/A-05-14: TC-041 ya se ejecuta por servicio, pero su paso 2 (el selector ofrece
      exactamente dos tipos) no lo ejerce ninguna de las dos suites. Corrección de guion,
      no de la aplicación.
  - target: A-03
    status: cerrado
    note: >-
      DOC-14/EXP-027 y el estado de CLAUDE.md ligado a él: EXP-027 cierra en DOC-14 2.1.0 y
      DOC-23 2.2.0 (17 escenarios corregidos y reverificados en verde). Se retira de esta
      lista; queda solo la nota de que CLAUDE.md sigue sin reflejar la ejecución completa
      más reciente (89 escenarios no re-ejecutados en 2.2.0), que no es un DOC-nn.
  - target: A-03
    status: sin cambios
    note: "A-05-12 (resumen de front-matter de DOC-05 no coincide con su YAML) sigue sin corregir."
  - target: A-03
    status: sin cambios
    note: "TC-073 y TC-075 (A-05-03b) siguen sin comprobar el IVA en su literal."
  - target: S-12
    status: nuevo
    note: >-
      DOC-07/A-05-16 — la familia TCS-nnn (colección de servicio) nace fuera de
      registro-ids.json. Decisión de S-12 y del canon, no de A-12.
  - target: S-12
    status: sin cambios
    note: "MEJ-009 sigue sin censo. A-12 no ha escrito en el registro en ninguna ronda."
  - target: S-12
    status: sin cambios
    note: >-
      Divergencia de estado: MEJ-001/003/005 deberían ser accepted y MEJ-007/008
      implemented en el registro. A-05-06 sigue abierta.
  - target: S-05
    status: sin cambios
    note: Quinta versión consecutiva sin DOC-17.
  - target: S-01
    status: sin cambios
    note: >-
      Las tres aristas que DOC-07/7.2 señaló como ausentes siguen ausentes en el grafo de
      DOC-02 tras dos regeneraciones por otros motivos. Tercera ronda que lo señala.
registry_check:
  command_previous_round: registry.js next registro-ids.json --prefix MEJ --count 2
  result_previous_round: "8 existentes, máximo 8; siguientes libres: MEJ-009, MEJ-010"
  requested_this_round: 0
  used_this_round: []
  written_by_a12: false
  note: >-
    No se pide número esta ronda: no nace ningún MEJ-nnn. MEJ-009 sigue sin censar en
    registro-ids.json (findings_for_others, target S-12).
summary:
  round: 3.2.0
  kind: bounded_delta
  total: 9
  new_this_round: 0
  status_changed_this_round: 0
  implemented: 2
  accepted_not_started: 3
  proposed_undecided: 3
  proposed_new_pending: 1
  rejected_respected: 0
  rejected_total: 0
  evidence_grown_this_round: [MEJ-002]
  evidence_matured_this_round: [MEJ-003, MEJ-006]
  evidence_unchanged_this_round: [MEJ-004]
  evidence_shrunk: []
  by_source: { evidence: 8, opinion: 1 }
  considered_not_proposed: 8
  findings_for_others: 14
  findings_closed_by_recipient_this_round: 0
  recommended_top3_among_undecided: [MEJ-009, MEJ-002, MEJ-006]
  recommended_order_changed_this_round: false
  recommended_order_note: >-
    Mismo orden que la 3.1.0 (MEJ-009, MEJ-002, MEJ-006). DOC-27 1.1.0 solo refuerza los
    movimientos que ya hizo la 3.1.0: MEJ-002 en el #2 (ahora 8 literales to.eql, eran 4)
    y MEJ-006 en el #3 (repetibilidad de la suite confirmada con y sin resembrado).
  never_propose_again: [MEJ-001, MEJ-003, MEJ-005, MEJ-007, MEJ-008]
  a05_15_decision: >-
    No nace MEJ-010. A-05-15 (borrar albarán no devuelve stock) se incorpora como
    evidence_ref de MEJ-004 y como candidato a noveno defecto en el apartado 3.0; la
    pregunta de si el comportamiento actual es correcto queda sin responder, dirigida a
    A-02 en findings_for_others, respetando que es decisión de producto, no técnica.
```
