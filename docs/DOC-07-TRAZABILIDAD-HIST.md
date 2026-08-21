---
doc_id: DOC-07-HIST
doc_name: DOC-07-TRAZABILIDAD-HIST
of_document: DOC-07-TRAZABILIDAD.md
version: 1.6.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-05 coherencia y trazabilidad
generator_version: "1.2"
generated_at: 2026-08-17T14:05:00+02:00
project: app-taller
project_code: TALLER
purpose: >
  Historial de versiones de DOC-07. El documento principal refleja solo el estado
  actual; todo lo que cambió en cada versión, por qué subió el número y qué tablas
  de equivalencia hicieron falta vive aquí. La **procedencia** —el bloque `inputs`
  con versión y hash de cada entrada— NO está aquí: se queda en el documento
  principal, porque es lo que `S-16 · Cascada de obsolescencia` necesita leer para
  calcular qué ha quedado obsoleto.
reconstruction_note: >
  Este fichero nace en 1.5.0, cuando el contrato de A-05 separa historial y estado.
  Las entradas de **1.4.0 y 1.3.0** se trasladan literalmente desde el apartado 8 y
  el `version_reason` de DOC-07 1.4.0, que las contenía completas. Las de **1.2.0,
  1.1.0 y 1.0.0** se **reconstruyen** a partir de las referencias que el propio
  DOC-07 1.4.0 hace a ellas, porque no existía un registro de cambios primario;
  están marcadas como `fidelity: reconstruida` y solo afirman lo que hay evidencia
  textual de afirmar. No se ha inventado ninguna cifra para rellenar un hueco: donde
  no hay dato, dice que no hay dato.
---

# DOC-07 · Historial de versiones

Una entrada por versión, de la más nueva a la más antigua. El estado actual está en
**`DOC-07-TRAZABILIDAD.md`**; este fichero no lo duplica.

Todas las versiones han sido de **pasada `pre`**: en ninguna existían
`DOC-19-RALLY-TESTCASES.csv` ni `DOC-20-RALLY-STATE.json`, así que en ninguna se ha
escrito jamás un `GAP EXPORT`, un `NOT RUN` ni un resultado.

---

## 1.6.0 — 2026-08-17 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** DOC-05 pasó de **1.4.1 a 1.5.0** y `S-16 · Cascada de obsolescencia`
volvió a marcar a DOC-07 como obsoleto, con este resultado:

```
DOC-07 1.5.0 (A-05 coherencia y trazabilidad)
   DOC-05: declara 1.4.1, actual 1.5.0  [MINOR]
```

Es la segunda regeneración consecutiva disparada por una máquina, y ya no es novedad sino
rutina: es exactamente para lo que existe el bloque `inputs` con versión y hash.

**Qué cambia.**

| Qué | 1.5.0 | 1.6.0 |
|---|---|---|
| Entrada DOC-04 | 1.2.0 | 1.2.0 (mismo hash; sin cambios) |
| Entrada DOC-05 | 1.4.1 | **1.5.0** (`f2e13dbc…`) |
| Entrada DOC-09 | no existía | **1.0.0, declarada por primera vez** (A-07) |
| Entrada DOC-06 | 1.2.0 | 1.2.0 (mismo hash) |
| Entrada `registro-ids.json` | 310 anclas | **311** (+1: `EVO-001`, de A-06) |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | md5 `087a0377…` — **byte a byte idéntico** (4.ª vez consecutiva) |
| Cobertura | 100,00 % | 100,00 % |
| Bloqueantes | 0 | 0 |
| Avisos | 28 (17 + 11) | **27** (17 + 10) — recuento corregido, ver abajo |
| Hallazgos nuevos | A-05-08, A-05-09, A-05-10 | **A-05-11a, A-05-11b** |
| Hallazgos cerrados | A-05-01a, A-05-02, A-05-07 | **ninguno** |
| Alcance ③ | 10 req, 8 casos | **5 req, 3 casos** |
| Unión ①∪②∪③ | 33 req, 45 casos | **32 req, 44 casos** |
| Unión total | 64 req (81,0 %) | 64 req (81,0 %) — **=** |

**Por qué MINOR y no otra cosa.** No es MAJOR porque nada de lo que consumen A-11 y S-07
queda invalidado: misma cabecera de CSV, mismo mapa requisito → caso, ningún identificador
movido, cobertura en 100 % y cero bloqueantes. No es PATCH porque **A-05-11a es un punto de
Go/No-Go nuevo** con fecha de caducidad —sólo se puede cazar en la pasada `pre`— y porque
tres cifras del apartado 7 cambian. Cuarta versión consecutiva con el CSV idéntico y la
versión subiendo igual: **no se versiona el fichero, se versiona lo que un consumidor
decidiría distinto.**

**Lo que trae DOC-05 1.5.0, que es aditivo y se ha verificado que lo es.** A-03 declara que
ningún `id`, `external_id`, `requirement`, `priority`, `type`, `name`, `preconditions` ni
`steps` se ha tocado, y lo verificó parseando. A-05 no lo dio por bueno: volvió a ejecutar
el JOIN y **el CSV salió byte a byte idéntico**, que es la comprobación que no depende de
la palabra de nadie. Lo que 1.5.0 añade es **`verification_path` en los 110 casos** —109
`ui`, 1 `service` (TC-041), 0 `mixed`—, el cierre de **`Q-18`** en dos mitades con dueños
distintos, y la corrección de las rutas de `automation/`.

**El hallazgo de esta versión: A-05-11 · vector no alcanzable por la vía declarada.** Nace
del cruce entre el campo nuevo y la matriz, y no era formulable antes porque los casos no
declaraban vía. Tiene dos formas:

- **A-05-11a** — `TC-064` (`Critical`, `Negative`, `ui`, único caso de **REQ-046**, que es
  `critical`) pide seleccionar juntos albaranes de dos clientes distintos, y `FacturaForm`
  obliga a elegir cliente antes de listarlos. **Ese intento no se puede componer en ese
  formulario.** El hallazgo viene de `DOC-09` §RS-01 y §3.2 (A-07) y **A-05 lo verificó de
  nuevo sobre `FacturaForm.tsx`** en vez de citarlo, porque una afirmación de ese peso no
  se sostiene en la lectura de otro agente.
- **A-05-11b** — `TC-015`, `TC-036` y `TC-090` cubren requisitos que hablan de *referencia
  existente* y sólo ejercen la mitad *vacía*. La otra mitad sólo se compone por servicio y
  hoy no la cubre nadie. **Lo declara A-03** en DOC-05 §4.12; A-05 lo recoge para que esté
  en el censo de cobertura y no sólo en una tabla de dudosos.

**Por qué identificador propio y no una variante de A-05-03**, que era la pregunta
planteada: porque lo que falla es distinto. En A-05-03 el caso se ejecuta y hace lo que
dice; el defecto vive en una parte del sistema que el caso no visita, y un `PASS` engaña
sobre el sistema. En A-05-11a el caso **no se ejecuta tal como está escrito**, y un `PASS`
—que es lo que un tester registrará— **miente sobre el caso mismo**. Es la tercera variante
del verde falso, después de «verde por omisión» y «verde por afirmación» que se discutieron
en Q-19, y la más difícil de detectar porque nada falla.

**Qué le pasa a `critico_caso_unico`, que es el efecto colateral más importante.** La lista
de 17 no cambia, el número no cambia, y sin embargo el aviso **se agrava**: cuatro de sus
diecisiete —**REQ-011, REQ-027, REQ-046 y REQ-065**, los cuatro `critical`— tienen un caso
único que además no ejerce entero su vector. La pregunta «¿basta un caso?» se convierte
para ellos en «¿basta medio caso?».

**Q-18 y el alcance ③.** Al pasar Q-18 a `answered`, ③ baja de 3 preguntas a 2, de 10
requisitos a **5** y de 8 casos a **3**. Cuatro de los cinco requisitos que salen ya
estaban en ① o en ②; **el quinto, REQ-032, sale de la unión ①∪②∪③**, que pasa de 33 a
**32** requisitos, y con él sale **TC-043**, de 45 a **44** casos. Es la primera vez en
cuatro versiones que esa unión se mueve. La unión total **no** se mueve: REQ-032 sigue
alcanzado por una pregunta de DOC-06, así que cambia de casilla, no de cuadro.

**Corrección de un recuento propio, otra vez y por el mismo motivo.** 1.5.0 declaró 28
avisos (17 + 11) y esta versión declara 27 (17 + 10) **añadiendo dos hallazgos**, lo que
sólo cuadra si el censo anterior contaba de más. Contaba de más: arrastraba en el número un
hallazgo que su propio apartado daba por cerrado. Se corrige avisando, como en 1.5.0 con la
medición de A-05-06, porque un documento que corrige callando enseña a no fiarse de sus
versiones anteriores. El apartado 3.0 de 1.6.0 **enumera los diez** para que el número sea
auditable y no haya que volver a discutirlo.

**Lo que no ha cambiado y merece constar:** cobertura 100 % (79/79), 0 GAP PLAN, 0
bloqueantes, 0 casos huérfanos, 0 referencias rotas, 0 `anchor_conflict`, plan de ejecución
idéntico (2 olas, 3 casos en la ola 1), exposición de A-05-06 idéntica (34 entradas), y
`Q-30` sigue sin ancla (A-05-09, reverificado hoy con S-12 en lectura).

**Recogido de otros y no corregido aquí:** las **tres aristas que faltan en el bloque
`graph` de DOC-02** (A-07 §2.3, corrección de **S-01**) —una de ellas,
`factures-pages → albarans-service`, es la evidencia de A-05-11a— y el ancla **`EVO-001`
registrada con `text: null`**, que S-12 marca como aviso y que corresponde a **A-06**.

---

## 1.5.0 — 2026-08-17 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** DOC-05 pasó de 1.2.0 a **1.4.1** en tres saltos (1.3.0, 1.4.0
y 1.4.1) y `S-16 · Cascada de obsolescencia` —pieza nueva que compara la versión
declarada en `inputs` contra la real— marcó a DOC-07 como obsoleto. Es la primera
vez que la regeneración de este documento la dispara una máquina y no un agente.

**Qué cambia.**

| Qué | 1.4.0 | 1.5.0 |
|---|---|---|
| Entrada DOC-04 | 1.2.0 | 1.2.0 (mismo hash; sin cambios) |
| Entrada DOC-05 | 1.2.0 | **1.4.1** (`81a8895c…`) |
| Entrada DOC-06 | no declarada | **1.2.0, declarada por primera vez** como entrada del censo de `Q-nnn` |
| Entrada `registro-ids.json` | 286 anclas | **310** (+24: 10 `Q` de DOC-06, 8 `FUN`, 6 `MEJ`) |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | md5 `087a0377…` — **byte a byte idéntico** (3.ª vez consecutiva) |
| Cobertura | 100,00 % | 100,00 % |
| Bloqueantes | 0 | 0 |
| Avisos | 28 | **28**, con composición distinta: −3 cerrados, +3 nuevos |
| Pasos de prueba | 239 | **241** (los 2 de más son de TC-041) |
| Tipos de caso | 67 `Functional` · 30 `Negative` | **66 `Functional` · 31 `Negative`** (TC-041 cambia de tipo) |
| Censo de `Q-nnn` | 19 | **29 con ancla + 1 reclamado sin ancla** (`Q-30`) |
| Alcance ③ (método) | 4 preguntas · 13 req · 12 casos | **3 preguntas · 10 req · 8 casos** (Q-19 respondida) |
| Unión ①∪②∪③ | 33 req (41,8 %) / 45 casos | **33 req (41,8 %) / 45 casos** — sin cambio |
| Alcance ⑤ (DOC-06) | no medido | **47 req (59,5 %)**; unión total **64 (81,0 %)** |
| Plan de ejecución | no recogido | **recogido en su intersección con la cobertura** (§5.4) |
| Grados de automatización | no recogidos | recogidos como contexto, no como cobertura (§5.4 y A-05-10) |
| Historial | apartado 8 del documento | **este fichero** |

**Avisos que se cierran — tres.**

- **A-05-01a · REQ-031 / TC-041.** El hallazgo más antiguo de este documento, vivo
  desde 1.1.0 y elevado en 1.4.0 a punto de Go/No-Go de A-11. A-03 reescribió TC-041
  en DOC-05 1.3.0 con autorización enumerada del propietario del proyecto: pasa de
  `Functional` con 2 pasos a `Negative` con 4 y verifica el invariante que REQ-031
  promete —dos líneas, 25,00 € y 70,00 €, base 95,00 € y no 125,00 €—. Verificado
  sobre el YAML de 1.4.1, no sobre el resumen de nadie.
- **A-05-02 · entrada desfasada.** DOC-05 1.4.1 declara como entrada DOC-04 **1.2.0**
  y conserva la procedencia real en campos aparte (`derived_from_version: 1.0.0`).
  Es la forma correcta y la que S-16 puede leer: el resello sale limpio.
- **A-05-07 · dos cifras de prosa.** Las dos corregidas: la tabla de riesgos dice 4
  casos `Integration` y el título de §6.3 dice «las seis respuestas de negocio».

**Avisos que nacen — tres.**

- **A-05-08 · cobertura condicionada.** Del cruce entre la matriz y el plan de
  ejecución que S-14 deriva: dos requisitos `high` (REQ-019, REQ-057) tienen **toda**
  su cobertura en la ola 1, y tres de los 17 críticos de caso único viven dentro del
  carril serial de 17 casos.
- **A-05-09 · `Q-30` fuera de registro.** DOC-06 1.2.0 publica `Q-30` con
  `registry_status: pending_confirmation`; el registro no tiene el ancla.
- **A-05-10 · una superficie de interfaz no documentada, medida tres veces.** La
  misma carencia explica 43 de los 80 `medium` de automatización, las cinco preguntas
  más grandes de DOC-06 y el techo que S-10 encontró en campo.

**Corrección de una medición propia.** El experimento de A-05-06 se rehízo con el
nombre de fichero original y da **15** colisiones para DOC-05, no las **19** que
declaró 1.4.0: las cuatro de diferencia eran las preguntas propias, que solo colisionan
si además cambia el nombre del fichero —un artefacto del método de medición sobre
copias, no del riesgo—. La cifra vigente, con DOC-06 incluido, es **34**.

**Por qué MINOR y no otra cosa.** No es PATCH porque el Go/No-Go de A-11 cambia de
contenido: se le retira un punto de decisión (A-05-01a), se le añaden tres avisos y
una de las cifras que consume se corrige a la baja. No es MAJOR porque nada de lo que
consumen A-11 y S-07 queda invalidado: misma cabecera de CSV, mismo mapa requisito →
caso, ningún ID movido, cobertura en 100 % y cero bloqueantes. El traslado del
historial a este fichero es una **reubicación declarada**, no una supresión; si algún
consumidor estuviera fijado al apartado 8, MAJOR sería defendible, y se deja dicho en
lugar de darlo por obvio.

---

## 1.4.0 — 2026-08-16 · MINOR

**Fidelidad:** primaria (trasladada del apartado 8 y del `version_reason` de 1.4.0).

**Motivo del salto.** Segunda versión consecutiva con el CSV byte a byte idéntico
(md5 `087a0377…`) y la versión subiendo igual. Criterio, establecido en 1.3.0 y no
relajado por repetirse: **no se versiona el fichero, se versiona lo que un consumidor
decidiría distinto.**

| Qué | 1.3.0 | 1.4.0 |
|---|---|---|
| Entrada DOC-04 | 1.2.0 | 1.2.0 (sin cambios) |
| Entrada DOC-05 | 1.1.0 | **1.2.0** (bloque `open_questions`; ningún caso tocado) |
| Entrada `registro-ids.json` | 267 anclas | **286** (+19 `open_question`) |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | idéntico (2.ª vez) |
| Cobertura · bloqueantes | 100,00 % · 0 | 100,00 % · 0 |
| Avisos | 27 | **28** |
| Censo de `Q-nnn` | inexistente | **19**, con `document` y `status` |
| Colisiones `Q-nnn` | 2 (`Q-14`, `Q-15`) | **0**, verificado con S-12 |
| Alcance de preguntas abiertas | 29 req / 41 casos | **tres cifras**: 16/21 ① · 16/23 ② · 13/12 ③ · unión **33/45** |
| A-05-02 entrada desfasada | aviso vivo | **degradado**: A-03 declara ambas versiones de DOC-04 |
| A-05-04 DISC-001 | dos mitades abiertas | **mitad cerrada** (DOC-05); queda la de A-02 |
| A-05-05 colisión `Q-nnn` | abierto | **CERRADO** |
| Hallazgos nuevos | A-05-03, A-05-04, A-05-05 | **A-05-06**, **A-05-07** |
| Q-19 | — | **respondida por A-05** en §7.2, dirigida a A-01 |
| A-05-01a REQ-031 | recomendación a A-03 | **elevado a punto de Go/No-Go de A-11** |

**Tres razones concretas por las que saltarse esta versión salía caro:** (a) contar 29
requisitos de alcance cuando eran 33 y 41 casos cuando eran 45; (b) arrastrar al
Go/No-Go A-05-05, cerrado y verificado, lo que enseña a no fiarse de la lista; (c) no
saber que dos ediciones cosméticas sobre DOC-05 devolvían el proyecto a colisiones
bloqueantes.

**Corrección publicada en esta versión.** La tabla de `critico_caso_unico` de 1.3.0
asignaba REQ-062 a `nomines` y REQ-066 a `personal`; es al revés. El error era solo de
la prosa —el CSV siempre tuvo el módulo correcto— y se corrigió avisando, no en
silencio.

---

## 1.3.0 — 2026-08-16 · MINOR

**Fidelidad:** primaria (reconstruida desde las referencias explícitas de 1.4.0, que
la citan en veinte lugares con cifras).

**Motivo del salto.** Primera versión en la que **el CSV no cambia ni un byte**
(md5 `087a0377…`) y la versión sube igualmente. Aquí se establece el criterio que
1.4.0 y 1.5.0 heredan.

| Qué | 1.2.0 | 1.3.0 |
|---|---|---|
| Entrada DOC-05 | 1.0.0 | **1.1.0** (`7d032df0…`) |
| Entrada `registro-ids.json` | — | 267 anclas (`4c8313ad…`) |
| Cobertura · bloqueantes | 100,00 % · 0 | 100,00 % · 0 |
| Avisos | — | **27** |
| Alcance de preguntas abiertas | un número | **dos cifras**: 29 req / 41 casos |
| Hallazgos nuevos | — | **A-05-03** (cobertura verde sobre defecto confirmado, 4 req) · **A-05-04** (DISC-001: regla afirmada fuera del censo) · **A-05-05** (colisión `Q-14`/`Q-15` entre DOC-04 y DOC-05) |

**Las tres advertencias sobre qué no mide el 100 %** se enuncian aquí por primera vez
y siguen vigentes: no mide ejecución ni resultado; no mide que el caso verifique lo
que su requisito enuncia; no mide que el requisito describa un sistema sano.

**Lo que 1.3.0 pidió y no era la mejor solución.** Recomendó a A-03 actualizar la
referencia de DOC-05 a DOC-04 1.2.0. A-03 hizo algo mejor en 1.4.0 —declarar las dos
versiones con su papel— y A-05 recogió la corrección en lugar de defender su
recomendación.

---

## 1.2.0 — 2026-08-16 · MINOR

**Fidelidad:** reconstruida. Solo se afirma lo que DOC-07 1.4.0 declara de ella.

- El alcance de preguntas abiertas se publicaba como **un solo número**; 1.3.0 lo
  partió en dos y 1.4.0 en tres.
- Se anota por primera vez el matiz de procedencia del ancla **REQ-031**: el registro
  pasa a ser derivado del documento que vigila, porque aceptar una deriva es copiarla.
  El matiz sigue vivo en 1.5.0 y se recuperará en el siguiente cambio de DOC-04 que
  toque ese enunciado.
- **No consta** en las fuentes disponibles el detalle de entradas, avisos ni hash del
  CSV de esta versión. No se rellena.

---

## 1.1.0 — 2026-08-16 · MINOR

**Fidelidad:** reconstruida.

- Es la versión de referencia del hallazgo **A-05-01a**: DOC-05 1.0.0 se cerró **ocho
  minutos antes** que DOC-04 1.1.0, que reformuló REQ-031, de modo que TC-041 quedó
  escrito contra un enunciado anterior. Esa simultaneidad fue la explicación válida
  del desfase hasta 1.3.0, y dejó de serlo cuando A-03 regeneró DOC-05 sin tocar el
  caso.
- Sobre el estado de DOC-05 1.1.0 se detectaron después **11 sospechas de reclamación
  falsa de `Q-nnn` en prosa**, que el prefijo `DOC-04/Q-nn` eliminó.
- **No consta** el resto del detalle. No se rellena.

---

## 1.0.0 — 2026-08-15 · primera versión

**Fidelidad:** reconstruida.

Primera matriz de trazabilidad del proyecto, en pasada `pre`, sobre DOC-04 1.0.0 y
DOC-05 1.0.0. De ella procede la afirmación, verificada después tres veces, de que
109 de los 110 casos se escribieron contra DOC-04 1.0.0.

**No consta** el detalle de cifras de esta versión en ninguna fuente conservada. No se
rellena.

---

## Nota de método sobre este fichero

Las entradas marcadas como **reconstruidas** no son un historial: son lo que se ha
podido salvar de un historial que no se llevaba aparte. La lección está en el propio
hueco — un documento que solo cuenta su última diferencia pierde las anteriores en
cuanto se reescribe— y es exactamente el motivo por el que el contrato ha separado
las dos cosas. A partir de 1.5.0 cada entrada es primaria y se escribe en el momento.
