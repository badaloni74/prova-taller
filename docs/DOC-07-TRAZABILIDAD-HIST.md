---
doc_id: DOC-07-HIST
doc_name: DOC-07-TRAZABILIDAD-HIST
of_document: DOC-07-TRAZABILIDAD.md
version: 1.12.0       # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-05 coherencia y trazabilidad
generator_version: "1.2"
generated_at: 2026-08-29T18:00:00+02:00
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

## 1.12.0 — 2026-08-29 · MINOR

**Fidelidad:** primaria.

Consume `DOC-27-INFORME-API.md` **1.1.0** (`35ff50b`): S-17 amplió la colección de servicio
con 12 `TCS` (TCS011…TCS022) que cubren por servicio TC-111, TC-113, TC-115, TC-116 y la
mitad de servicio de TC-119 —los casos de SPE-06 sacados de la interfaz—. No es entrada del
JOIN: **la matriz no se toca** (DOC-04 1.3.1 y DOC-05 1.8.0 sin mover; `DOC-07-MATRIZ.csv`
no se regenera). Los casos del plan con evidencia de ejecución publicada suben de **106 a
111 \*** de 119 (102 interfaz + 8 servicio + TC-119 en su mitad de servicio); los 4 `ui` de
SPE-06 —TC-112/114/117/118— no cuentan hasta que se regenere DOC-23. La pregunta 19 de §7.3
pasa a **parcialmente respondida**. Tocado: front-matter, §1, §2, §3.16, §5.5, §5.6, §6,
§7.3. Ninguna anomalía `A-05-nn` se abre ni se cierra (32 avisos, 0 bloqueantes); las marcas
`*` de regeneración completa pendiente de 1.11.0 siguen abiertas.

---

## 1.11.0 — 2026-08-29 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** `SPE-06 · Albarà canvi de client` está `Implemented`. DOC-04 sube a
**1.3.1** (añade REQ-080 `critical` y REQ-081 `high`; renumera su `Q-16` a `Q-30` por
colisión con la `Q-16` de DOC-05) y DOC-05 a **1.8.0** (añade TC-111…TC-119, 9 casos,
todos `albarans`). `S-16` marcó DOC-07 obsoleto por ambas entradas del JOIN.

**La matriz la regeneró S-14, no A-05.** `docs/DOC-07-MATRIZ.csv` lo produjo
`s14-matriz-trazabilidad` (`matriz.js`, determinista) en el commit `621ea3b`: 81 filas,
119 casos, cobertura **81/81 = 100,00 %**, 0 GAP PLAN, 0 bloqueantes, 3 columnas de Rally
en `n/d`. Esta versión de A-05 solo verifica esa salida y pone la narrativa a la par.

**Reparto de los 9 casos nuevos en la matriz:** REQ-080 → `TC-111;TC-113;TC-119`;
REQ-081 → `TC-117;TC-118`; REQ-040 → `TC-055;TC-112;TC-114`; REQ-042 suma `TC-115`;
REQ-027 suma `TC-116`. Por vía: 4 `service`, 4 `ui`, 1 `mixed` (TC-119, el primero del
plan).

**Qué cambia en el cuerpo.** §1 (recuento y tabla de magnitudes), §2 (tabla de entradas),
§3.1 (reglas de S-14 sobre 81/119), §4 (matriz: +fila REQ-080, filas con reserva 26→27,
verificaciones sobre el CSV), §5.1/5.2/5.3 (totales), §6 y §7.1 (notas de alcance). Consume
DOC-06 **1.4.0** y DOC-09 **2.1.0** —releídos, ninguno alimenta el JOIN— y el nuevo hash de
`registro-ids.json` (81 REQ, 119 TC, 30 Q).

**Un hallazgo empeora sin abrirse ni cerrarse: `A-05-09`.** Era «`Q-30` de DOC-06 sin
ancla». Ahora `Q-30` **está registrado, pero apunta a la pregunta de DOC-04** (renumerada
desde su `Q-16`). El `Q-30` propio de DOC-06 1.4.0 —otra pregunta— y su `Q-31` numerado a
mano quedan en colisión de identificador. Corrección: **S-12** asigna los siguientes libres
y **A-04** los renumera. El censo de avisos sigue en **32** (SPE-06 no abre ni cierra
ninguno).

**Por qué MINOR y no PATCH.** Dos requisitos nuevos entran en cobertura y la matriz cambia
de contenido por primera vez tras ocho versiones idéntica (+2 filas, +9 casos). **Por qué
no MAJOR.** No cambia el contrato del CSV —mismas 10 columnas, mismos diagnósticos—, sigue
en 100 % y sigue siendo pasada `pre`.

**Pendiente para la próxima regeneración completa:** re-derivar los cinco alcances de §7.1,
`ui-only`, el recuento de `A-05-11` (¿TC-116 cierra la mitad de vector de REQ-027?), el
reparto fino por vía de §5.6 y la coherencia del resumen `verification_path` de DOC-05 1.8.0
(`A-05-12`). SPE-06 no cierra ninguna pregunta abierta.

---

## 1.10.0 — 2026-08-24 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** Ha nacido `docs/DOC-27-INFORME-API.md` **1.0.0**, de `S-17 · api-qa`:
el informe de ejecución de la suite de servicio, contraparte de `DOC-23` para la colección
Postman de `automation/api/`. Registra 10 comprobaciones `TCS-nnn`, todas en verde, que
cubren los **4 casos de DOC-05 marcados `verification_path: service`** — `TC-041`, `TC-045`,
`TC-063` y `TC-064`.

**Quién disparó la regeneración, y por qué no fue S-16.** Las cinco anteriores las disparó
`S-16 · Cascada de obsolescencia`. Esta no podía dispararla: **la cascada compara lo que
está declarado en algún bloque `inputs`, y `DOC-27` no estaba declarado en ninguno porque
hasta hoy no existía.** Un documento que nace es invisible al control de obsolescencia
hasta que alguien lo declara la primera vez. El disparo fue humano. Declararlo ahora en
`inputs` es lo que hace que, a partir de la próxima ejecución de la suite de servicio, sí lo
vea S-16.

### Por qué MINOR y no PATCH

Era la decisión que había que tomar con cuidado, porque el resultado más probable a priori
era un PATCH: `DOC-27` **no es una entrada del JOIN**, la cobertura sigue en 100,00 % y el
CSV vuelve a salir byte a byte idéntico —md5 `087a03779bd36a00d09f9e87943588c0`, **octava
vez consecutiva**—. Si lo único que hubiera cambiado fuese la procedencia, PATCH habría sido
lo correcto.

No es lo único. Hay **contenido nuevo verificable** que 1.9.1 no podía contener:

1. **Cuatro casos dejan de ser un punto ciego de la evidencia.** Hasta 1.9.1 este documento
   solo cruzaba ejecución contra `DOC-23`, que informa exclusivamente de la suite de
   navegador. Los 4 casos `service` estaban correctamente fuera de ella y **ninguna fuente
   decía si se habían ejecutado alguna vez**. §5.5 los daba por «correcto: los ejecutará
   S-17», en futuro, desde 1.7.0. La cifra de evidencia de ejecución publicada pasa de
   **102 de 110 a 106 de 110**, con las dos fuentes declaradas por separado.
2. **`A-05-11a` pasa de cerrado por inferencia a cerrado por comprobación.** El cierre se
   sostenía en que A-05 leyó `FacturaForm.tsx` y `AlbaraLiniesSection.tsx` y concluyó que el
   vector existía por servicio. `DOC-27` compuso los tres intentos —`TCS008`, `TCS005`,
   `TCS003`— y los tres fueron rechazados con `400` y el mensaje esperado. Es la primera vez
   en la vida de este documento que una reclasificación de `verification_path` se contrasta
   con un hecho.
3. **El límite declarado en §5.6 gana una excepción de tamaño conocido.** «`verification_path`
   es un campo declarativo, no verificado» sigue siendo cierto para 106 casos y ha dejado de
   serlo para 4.
4. **Nacen tres avisos**, los tres verificados por A-05 en el código o en los ficheros de las
   suites, no aceptados de la prosa de `DOC-27`:
   - **`A-05-14`** — `TC-041` se ejecuta entero por servicio, y su paso 2 —«El selector
     ofrece exactamente dos tipos […] y ninguna otra opción»— **no lo ejerce ninguna de las
     dos suites**: S-10 no tiene escenario para el caso y `TCS001` comprueba la API, que es
     otra afirmación. Corrección de A-03.
   - **`A-05-15`** — borrar un albarán **no devuelve al catálogo el stock** de sus líneas de
     pieza (verificado en `server/routes/albarans.js:116-132`, frente a las líneas 197-224
     que sí lo devuelven al retirar una línea suelta). Ningún requisito decide si eso está
     bien —REQ-039 habla de la línea, REQ-041 del albarán—, `TC-056` está en verde sin mirar
     el stock, su escenario ni siquiera crea una línea de pieza pese a la precondición
     `DS-005`, y su `touches` no declara `peces.estoc`. Tres destinatarios: producto/A-02,
     A-03 y `s10-auto-tcs`.
   - **`A-05-16`** — la familia `TCS-nnn` nace **fuera de `registro-ids.json`** (0
     ocurrencias en las 317 anclas). No es bloqueante —un `TCS` no viaja a Rally— y la
     decisión de registrarla es de S-12 y del canon, no de A-05.

El censo de avisos pasa de **29 (17 + 12) a 32 (17 + 15)**. Las filas con reserva del §4
pasan de 25 a **26**: entra REQ-041.

**Por qué no MAJOR.** No cambia el contrato del CSV —mismas 10 columnas, mismas 79 filas,
mismos diagnósticos—, no cambia el porcentaje de cobertura y no cambia la pasada: sigue
siendo `pre`. No se ha tocado ni una celda del fichero que consume S-07.

### La decisión que se tomó, y la que no

**Se decidió que `DOC-27` entra como evidencia citada en la prosa y no como columna del
CSV**, exactamente por la misma puerta por la que entra `DOC-23`. `DOC-27` lo preguntaba en
su §6.2 («¿Entra esta suite en el Go/No-Go? […] eso lo decide A-05»). Las tres columnas
`exists_in_rally`, `executed` y `result` nombran **una sola** fuente, `DOC-19` y `DOC-20`;
rellenarlas con una suite local —de navegador o de servicio— dejaría a cualquier consumidor
que hiciera `join` con `DOC-20` con contradicciones sin procedencia. Que ahora haya dos
fuentes de ejecución en vez de una no ablanda el argumento: lo endurece.

**No se decidió, porque no es de A-05**, si el Go/No-Go debe **exigir** esa evidencia. Eso
es criterio de A-11. Ni si la familia `TCS-nnn` se registra (S-12 y canon `DOC-nn`), ni si
borrar un albarán debe devolver el stock (producto). Las tres quedan como preguntas 16, 17 y
18 del §7.3.

### Correcciones de procedencia que van en esta versión

- **`DOC-05`**: 1.9.1 declaraba `sha256:d338297a…`, el hash del resello contra `DOC-23`
  2.1.0, cuando en el árbol ya estaba el resello contra la 2.2.0 (`7f2000f`,
  `sha256:43051f32…`). Se corrige. **Es el hash lo que S-16 compara**, así que un hash
  desfasado en `inputs` es el mismo fallo silencioso que este documento persigue en otros.
  De paso queda sin objeto el matiz que 1.9.1 anotaba sobre que DOC-05 «sigue citando la
  2.1.0»: A-03 ya lo había resincronizado.
- **`DOC-09`**: hash actualizado a `sha256:b745b092…` y **versión corregida de 2.0.2 a
  2.0.4**. El borrador de esta misma versión declaraba `version: 2.0.2` con el hash de la
  2.0.4: el hash ya era el bueno —es el del fichero real— pero el número se había heredado
  de 1.9.1 sin tocar, así que los dos campos de la entrada describían estados distintos del
  mismo fichero. Detectado en revisión antes de subir la 1.10.0 y corregido dentro de ella,
  sin abrir versión nueva. **No era bloqueante para `cascada.js`** —2.0.2 → 2.0.4 es PATCH,
  «no invalida»— pero era una declaración de procedencia falsa, que es la deriva que este
  documento persigue en §3.12 cuando la comete otro. Son **dos** resellos, no uno:
  `3606266` (2.0.2 → 2.0.3, contra `DOC-07` 1.9.0 y `DOC-23` 2.2.0) y `2bbd4fe`
  (2.0.3 → 2.0.4, tras el cierre de `EXP-027`). **Comprobado, no supuesto**, que ninguno de
  los dos toca lo que este documento cita: extraído el cuerpo de las tres versiones —desde
  el segundo `---`— y comparados los bytes, las tres dan `sha256:a3d63770…` sobre 917
  líneas. Las tres aristas ausentes de `DOC-09` §2.3 que cita §7.2 y el enunciado de REQ-040
  de su §3.1 que cita la fila de §4 siguen siendo palabra por palabra los mismos.
- **`DOC-27`**: entrada nueva, `version: 1.0.0` y hash. Se ha leído también su `-HIST.md`.

### Limpieza

- **`A-05-11a` y `A-05-13` salen del censo de avisos.** Los dos estaban cerrados y se
  mostraban «por última vez» en 1.9.x. La ficha de `A-05-11a` (§3.11) se conserva una vez
  más, y solo una, porque hay evidencia nueva sobre ella; a partir de 1.11.0 vivirá solo
  aquí. La de `A-05-13` (§3.13) se reduce a los hechos verificados en los que se apoyan §3.4
  y §5.5; el relato completo estaba ya en las entradas 1.8.0 y 1.9.0 de este fichero y no se
  duplica.
- El párrafo de «Procedencia» sobre `DOC-14` 2.1.0 se condensa a tres líneas por el mismo
  motivo: su análisis completo es la entrada 1.9.1 de este fichero.

### Verificaciones hechas antes de entregar

- El JOIN se **volvió a ejecutar** (`matriz.js` de S-14 sobre DOC-04 1.2.0, DOC-05 1.6.0 y
  `registro-ids.json`), no se copió el CSV anterior: **código de salida 0, 0 bloqueantes**,
  79 filas, 110 casos, suma de `test_case_count` = 110, tres columnas de Rally en `n/d` en
  las 79, **0 ocurrencias de `GAP EXPORT`**, 0 `GAP PLAN`.
- Salida byte a byte idéntica a la del fichero versionado (md5 y sha256 comprobados).
- Las afirmaciones de `DOC-27` que este documento usa para sostener un hallazgo se han
  verificado en la fuente: `server/routes/albarans.js` y `server/routes/factures.js` para
  `A-05-15` y para la corroboración de `A-05-04`, `tallerMecaniccollection.json` para las
  aserciones de `A-05-14` y §3.11, `albarans.feature` para el escenario de TC-056 y
  `registro-ids.json` para `A-05-16`.

---

## 1.9.1 — 2026-08-24 · PATCH

**Fidelidad:** primaria.

**Motivo del salto.** `S-16 · Cascada de obsolescencia` volvió a marcar a DOC-07 como
obsoleto tras regenerar 1.9.0 el mismo día:

```
DOC-07 1.9.0 — por DOC-14: declara 2.0.1, actual 2.1.0  [MINOR]
```

`DOC-14-EXPLORATORIO.md` subió de 2.0.1 a 2.1.0 (MINOR en su propio ciclo, no PATCH: A-10
lo justifica porque cambia contenido sustantivo, no solo front-matter) al cerrar formalmente
`EXP-027` —de `abierto` a `estado: corregido`— citando `DOC-23-INFORME` 2.2.0 como prueba.

**Por qué PATCH y no MINOR ni "sin cambio de versión".** A-05 ha comprobado, no asumido,
que el cambio de `DOC-14` no aporta nada que este documento no supiera ya: `EXP-027` es el
origen histórico de **A-05-13**, cerrado en 1.9.0 con evidencia propia —`DOC-23` 2.1.0/2.2.0
verificada directamente sobre los cuatro `.feature` afectados y sobre
`client/src/utils/format.ts`, no sobre la declaración de `DOC-14`— y con **A-05-03b**
reverificado en verde por el mismo motivo (§3.4). DOC-07 nunca cita el campo `estado` de
`EXP-027` en `DOC-14` como prueba de un hallazgo propio; solo cita a `DOC-14` 2.0.0 como
**origen** del hallazgo (§3.13). El JOIN no se ha vuelto a ejecutar: ni DOC-04 ni DOC-05 han
cambiado de versión, así que no hay contenido de matriz que numerar. Es el mismo criterio
que ya se aplicó a los resellos de `DOC-09` y del propio `DOC-14` dentro del ciclo de 1.9.0.

**Qué cambia.**

| Qué | 1.9.0 | 1.9.1 |
|---|---|---|
| Entrada DOC-14 | 2.0.1 (`5e9ada5a…`) | **2.1.0** (`f1449e13…`) — cierra `EXP-027` en su propio informe |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | idéntico — no se ha vuelto a ejecutar el JOIN |
| Cobertura · bloqueantes · avisos | 100,00 % · 0 · 29 | sin cambios |
| A-05-13, A-05-03b | cerrado / reverificado en 1.9.0 | sin cambios: ninguna evidencia nueva que no tuviera ya |

**Nada se abre ni se cierra en este documento.** Es una resincronización de procedencia
pura: el front-matter (versión y hash de la entrada `DOC-14`, `commit_sha` de `source`,
`generated_at`) y una nota breve en «Procedencia» del documento principal explicando por
qué el cambio de `DOC-14` no obliga a tocar ningún hallazgo ni la matriz.

---

## 1.9.0 — 2026-08-24 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** `DOC-23-INFORME.md` subió dos versiones MINOR el mismo día
—2.0.0 → 2.1.0 → 2.2.0— desde la última lectura de A-05, y `S-16 · Cascada de
obsolescencia` volvió a marcar a DOC-07 como obsoleto:

```
DOC-07 1.8.0 — por DOC-23: declara 2.0.0, actual 2.2.0  [MINOR]
```

Quinta regeneración consecutiva disparada por una máquina. La tarea que dispara este ciclo
citaba «DOC-23 subió a 2.1.0», pero para cuando A-05 fue a leerlo el repositorio ya estaba
en 2.2.0: A-05 verificó el estado real con `cascada.js` y con `git log` en vez de fiarse de
la descripción con la que empezó la tarea, y regeneró contra la versión vigente, no contra
la citada. `S-16` también marcó `DOC-05` como obsoleto en el mismo ciclo (declara `DOC-23`
2.1.0, actual 2.2.0) — no es competencia de A-05 corregirlo, y A-05 ha verificado que ese
resello pendiente no toca ningún `REQ-nnn` ni `TC-nnn`, así que no bloquea esta
regeneración.

**Qué trae `DOC-23` 2.1.0 y 2.2.0.** 2.1.0 confirmó con una ejecución real —no con lectura
de código— los hallazgos que 1.8.0 solo podía acotar por abajo: **TC-048** rojo por falta
de aislamiento con TC-040 (A-05-08b, hipótesis desde 1.4.0), **17 casos** rojos por una
única causa raíz (`EXP-027`, literales de importe con punto decimal que la pantalla ya no
produce desde `SPEC 05` — A-05-13, nacido en 1.8.0) y un rojo aislado de infraestructura.
2.2.0, el mismo día, documenta que los 18 se corrigieron y se reverificaron —commits
`735ded8` y `5366e18`— y corrige una atribución errónea de la propia 2.1.0 (el rojo de
infraestructura era `TC-103`, no `TC-029`).

**Qué cambia.**

| Qué | 1.8.0 | 1.9.0 |
|---|---|---|
| Entrada DOC-04 | 1.2.0 (`626fdb84…`) | 1.2.0 — sin cambios |
| Entrada DOC-05 | 1.6.0 (`a88ca2aa…`) | 1.6.0 — **hash resincronizado** (`d338297a…`, resello de procedencia contra DOC-23 2.1.0, sin tocar `requirements`/`testcases`) |
| Entrada DOC-09 | 2.0.0 | **2.0.2** — resello de PATCH |
| Entrada DOC-14 | 2.0.0 | **2.0.1** — resello de PATCH |
| Entrada DOC-23 | 2.0.0 | **2.2.0 — motivo del disparo** |
| Entrada `registro-ids.json` | 317 anclas | **317 — sin cambios de contenido**, hash resincronizado por el renombrado `SPE-` de los specs |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | **idéntico, séptima vez consecutiva** |
| Cobertura · bloqueantes | 100,00 % · 0 | 100,00 % · 0 — sin cambios |
| Avisos | 30 (17 + 13) | **29** (17 + 12) — se cierra A-05-13 |
| Escenarios en verde (DOC-23) | 106 de 107 | **107 de 107** |
| Requisitos con defecto confirmado | 4 | 4 — sin cambios |

**Un hallazgo se cierra: A-05-13.** Nacido en 1.8.0 a partir de `EXP-027` de `DOC-14`,
citaba «al menos nueve» casos con literales de punto decimal obsoletos. `DOC-23` 2.1.0
cerró la cuenta con ejecución real: 17 exactos. `DOC-23` 2.2.0 documenta la corrección
(commit `5366e18`), y A-05 la ha verificado directamente sobre los cuatro `.feature`
afectados —no sobre la declaración de DOC-23—, confirmando el literal con coma decimal y
el espacio no separable (`U+00A0`) que produce `Intl.NumberFormat('es-ES', …)`. Se cierra
con un residuo metodológico anotado, no un hallazgo nuevo: la verificación de los 18 casos
corregidos fue una reejecución dirigida a esos 18, no una pasada completa de los 107; la
próxima ejecución íntegra queda pendiente de confirmarlo de forma independiente.

**Un hallazgo cambia de forma sin cerrarse: A-05-08b.** El caso concreto que lo demostraba
—TC-040 contaminando el estoc que TC-048 asumía intacto— está corregido y verificado en
`DOC-23` 2.2.0. El riesgo estructural que lo sostiene —nadie hace cumplir en tiempo de
ejecución el orden de aislamiento que S-14 deriva— no se ha tocado, y dos `critical` de
caso único más (REQ-028, REQ-036) siguen viviendo en el mismo carril sin haber sido puestos
a prueba. Sigue abierto, con la corrección de fondo en **S-06 / DOC-13**.

**A-05-03b no cambia de fondo, pero su fila de ejecución sí.** TC-073 y TC-075 pasaron por
rojo en `DOC-23` 2.1.0 (por el mismo `EXP-027`) y vuelven a estar en verde en 2.2.0. La
mitad del hallazgo que importa a A-03 —ninguno de los dos casos comprueba el IVA que
anuncian— no se ha movido.

**Pregunta retirada: la 16 de 1.8.0** («¿se actualizan los literales de importe al
separador decimal vigente?»), contestada que sí y verificada por A-05. No se renumeran las
que quedan.

---

## 1.8.0 — 2026-08-23 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** `DOC-14-EXPLORATORIO.md` pasó de **1.0.0 a 2.0.0** y
`S-16 · Cascada de obsolescencia` volvió a marcar a DOC-07 como obsoleto:

```
DOC-07 1.7.0 — por DOC-14: declara 1.0.0, actual 2.0.0  [MAJOR]
```

Cuarta regeneración consecutiva disparada por una máquina, y la primera en la que **ni
DOC-04 ni DOC-05 cambian de versión de contenido**: el disparo viene de una entrada que
nunca ha alimentado el JOIN. A-05 verificó, byte a byte, que los bloques `yaml
requirements` de DOC-04 y los nueve `yaml testcases` de DOC-05 son idénticos a los que
produjeron el CSV de 1.7.0, así que el JOIN no se recalculó: se confirmó que no hacía
falta recalcularlo.

**Qué trae DOC-14 2.0.0.** Es, en sus propias palabras, «una ronda de verificación de
cierre, no una exploración desde cero»: reproduce en vivo `EXP-001`, `EXP-002`, `EXP-007`
y `EXP-014` (los cuatro se cierran), cierra `EXP-009` a medias, y añade `EXP-027` y
`EXP-028`.

**Qué cambia.**

| Qué | 1.7.0 | 1.8.0 |
|---|---|---|
| Entrada DOC-04 | 1.2.0 (`7d184415…`) | 1.2.0 — **mismo número, hash resincronizado** (`626fdb84…`, resync de front-matter contra DOC-01 1.1.0, sin tocar `requirements`) |
| Entrada DOC-05 | 1.6.0 (`cd248197…`) | 1.6.0 — **mismo número, hash resincronizado** (`a88ca2aa…`, mismo motivo) |
| Entrada DOC-14 | 1.0.0 | **2.0.0 — motivo del disparo** |
| Entrada `registro-ids.json` | 311 anclas | **317** (+6: `FUN` 8→12, `MEJ` 6→8; `REQ`/`TC`/`Q` sin cambios) |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | **idéntico, sexta vez consecutiva** |
| Cobertura · bloqueantes | 100,00 % · 0 | 100,00 % · 0 — sin cambios |
| Avisos | 29 (17 + 12) | **30** (17 + 13) — nace A-05-13 |
| Requisitos con defecto confirmado | 6 | **4** — baja por cierre de `EXP-007` |
| Front-matter | 55 líneas | 55 líneas — sin cambios |

**Un hallazgo cambia de naturaleza, no se cierra.** `A-05-03b` (TC-073 y TC-075, IVA)
nació en 1.7.0 como «verde que oculta un defecto vivo»: la ficha de factura no mostraba el
importe del IVA y los dos casos, aun llamándose por el IVA, tampoco lo comprobaban. `DOC-14`
2.0.0 confirma que el defecto de sistema está corregido —verificado por A-05 en
`FacturaDetail.tsx:99-107`, no solo citado—, así que la mitad «engaño sobre el sistema»
desaparece. La mitad «engaño sobre el caso» **no se ha movido ni una línea**: TC-073 y
TC-075 siguen sin un solo `Literal:` sobre el importe del IVA, verificado por A-05 sobre
`factures.feature`. El hallazgo pasa de «verde que oculta un defecto» a «verde que no
prueba lo que promete sobre un sistema sano» — riesgo de regresión silenciosa, no ya de
defecto oculto. Es la razón de que «requisitos con defecto confirmado» baje de 6 a 4: el
censo de A-05-03 nunca incluyó a REQ-051/REQ-053, y ahora el recuento del §1 vuelve a
coincidir con él.

**Un hallazgo nuevo: A-05-13.** De `EXP-027` de `DOC-14` 2.0.0, que si cita `TC-nnn` de
DOC-05 y por eso entra en el alcance de A-05 a diferencia de `EXP-028`. `SPEC 05` cambió el
separador decimal de la aplicación de punto a coma; los `.feature` de `automation/ui/` que
comprueban importes por su texto literal —`factures.feature`, `nomines.feature`— siguen
escritos con punto. A-05 lo verificó por su cuenta en `client/src/utils/format.ts`
(`Intl.NumberFormat('es-ES', …)`) y releyendo los dos casos que ya tenía citados por
A-05-03b: TC-073 (`33.33`, `40.33`) y TC-075 (`98.40`, `119.06`), los dos con punto. Al
menos nueve casos están afectados, según el recuento de `DOC-14`, sin cerrar. La
consecuencia que le da peso propio: `DOC-23-INFORME` 2.0.0 —la única foto de ejecución que
existe— es del **2026-08-21**, un día **antes** de que `SPEC 05` entrara en `Implemented`
(2026-08-22), así que su «106 en verde» ya no describe el estado actual de la suite para
esos casos. No toca la matriz ni el CSV. Corrección de **A-03 / `s10-auto-tcs`**.

**Por qué MINOR y no otra cosa.** No es MAJOR porque nada de lo que consumen A-11 y S-07
queda invalidado: mismo CSV, mismo mapa requisito → caso, cobertura en 100 % y cero
bloqueantes. No es PATCH porque una fila del resumen (defecto confirmado) baja de 6 a 4,
nace un hallazgo con identificador propio y una cifra de ejecución que este documento citaba
como evidencia (DOC-23) queda señalada como caducada.

**Lo que no cambia y merece constar:** los 79 `REQ-nnn` y los 110 `TC-nnn`, con el mismo
`text`, `requirement` y `external_id`; los cinco requisitos de A-05-11 (§3.11); los 17
`critico_caso_unico`; las cinco cifras del alcance de preguntas abiertas (§7.1); las tres
aristas que faltan en el grafo de DOC-02 (§7.2, de S-01).

---

## Nota — 2026-08-23 — resincronización de procedencia, sin cambio de versión

No es una entrada de versión: el JOIN de este ciclo —el bloque `requirements` de
DOC-04 cruzado contra los nueve bloques `testcases` de DOC-05— es idéntico byte a
byte al de 1.7.0. Se documenta porque `S-16 · Cascada de obsolescencia` marcó este
documento como obsoleto por depender de una versión superada de
`DOC-06-MANUAL-USUARIO.md`.

**Motivo.** `DOC-06-MANUAL-USUARIO.md` pasó de 1.2.0 a 1.3.0 (commit `348a697`,
resincronización de A-04 tras el ciclo que también movió `DOC-01-BASE-ASIS.md` a
1.1.0). Es un salto de contenido real, no cosmético: DOC-06 1.3.0 documenta dos
avisos nuevos en el manual y amplía las tareas A.16 y A.17 con el importe del IVA
en euros y el formato de importes/fechas, leídos de los SPECs 04 y 05 ya
implementados (protección de doble envío, `formatMoney`/`formatDate`). Detalle
completo en `DOC-06-MANUAL-USUARIO-HIST.md`, entrada 1.3.0.

**Por qué no mueve la matriz.** Ninguno de los dos SPECs toca `DOC-04-FUNCIONAL.md`
ni `DOC-05-PLAN-PRUEBAS.md` — los dos siguen en 1.2.0 y 1.6.0, resincronizados por su
cuenta contra DOC-01 1.1.0 sin cambio de contenido (ver sus respectivos `-HIST.md`,
entradas del 2026-08-23). Ejecutado `node matriz.js --doc04 ... --doc05 ...` sobre
los ficheros actuales: **79 requisitos, 110 casos, cobertura 100 %, 0 GAP PLAN, 0
bloqueantes**, y el CSV resultante es **idéntico byte a byte** al `DOC-07-MATRIZ.csv`
ya publicado — sexta vez consecutiva. DOC-06 no alimenta el JOIN: entra en este
documento como fuente de la magnitud ⑤ (escena no documentada) y de los hallazgos
A-05-09 y A-05-10, ninguno de los cuales se recalcula en este ciclo.

**Lo que este ciclo no hace, y por qué.** DOC-06 1.3.0 documenta que la ficha de
factura ahora muestra el importe del IVA en euros además del porcentaje — el mismo
dato cuya ausencia en pantalla sostiene el hallazgo **A-05-03b** (§3.4 del documento
principal, TC-073 y TC-075). Esta resincronización es deliberadamente de
front-matter: no se ha vuelto a reproducir `/factures/1` ni a releer
`FacturaForm.tsx` para confirmar si el defecto sigue vivo, así que A-05-03b se deja
**tal cual estaba en 1.7.0** y no se cierra por esta vía. Corresponde a la próxima
regeneración completa —cuando DOC-04 o DOC-05 cambien de versión de contenido, o
cuando se decida reabrir la verificación en vivo— reproducir la pantalla y
contrastarla contra el `"iva_import"` de la API antes de tocar el diagnóstico.

**Qué se actualiza.** Solo el front-matter del documento principal: la versión de
`DOC-06-MANUAL-USUARIO.md` declarada en `inputs` (1.2.0 → 1.3.0), su `hash`
(`sha256:150240af…` → `sha256:90ea9dd6…`), el `commit_sha` de `source` y
`generated_at`. La `version: 1.7.0` del documento principal **no cambia**: no hay
contenido nuevo que numerar, siguiendo el mismo criterio que A-02 y A-03 aplicaron
en `DOC-04-FUNCIONAL-HIST.md` y `DOC-05-PLAN-PRUEBAS-HIST.md` el mismo día.

**`registro-ids.json` no se toca.** Ningún `REQ-nnn` ni `TC-nnn` nuevo, retirado ni
reformulado.

---

## 1.7.0 — 2026-08-22 · MINOR

**Fidelidad:** primaria.

**Motivo del salto.** DOC-05 pasó de **1.5.0 a 1.6.0** y `S-16 · Cascada de obsolescencia`
volvió a marcar a DOC-07 como obsoleto:

```
DOC-07 1.6.0 — por DOC-05: declara 1.5.0, actual 1.6.0  [MINOR]
```

Tercera regeneración consecutiva disparada por una máquina, y la primera en la que el
documento regenerado descubre que **una de sus propias recomendaciones ha sido atendida**.

**Qué cambia.**

| Qué | 1.6.0 | 1.7.0 |
|---|---|---|
| Entrada DOC-04 | 1.2.0 | 1.2.0 (mismo hash) |
| Entrada DOC-05 | 1.5.0 | **1.6.0** — motivo del disparo |
| Entrada DOC-14 | no declarada | **1.0.0, nueva** (A-10, exploración libre) |
| Entrada DOC-23 | no declarada | **2.0.0, nueva** (S-10, suite completa) |
| Cobertura | 100 % (79/79) | **100 % (79/79), sin cambios** |
| `DOC-07-MATRIZ.csv` | md5 `087a0377…` | **idéntico, quinta vez consecutiva** |
| Anomalías bloqueantes | 0 | 0 |
| Avisos | 27 (17 + 10) | **29 (17 + 12)** |
| Casos `ui` / `service` | 109 / 1 | **106 / 4** |
| Requisitos `ui-only` | 78 | **75** |
| Requisitos con vector inalcanzable por la vía declarada | 4 | **5** |
| Requisitos con defecto confirmado | 4 | **6** |
| Front-matter | 184 líneas (12 % del fichero) | **55 líneas** |

**Hallazgos: uno cerrado, tres nuevos.**

- **A-05-11a · CERRADO.** Era el hallazgo principal de 1.6.0: TC-064 declaraba
  `verification_path: ui` y su primer paso no se podía componer en `FacturaForm`, con lo
  que un tester lo habría marcado `PASS` sin haber ejercido nada. 1.6.0 recomendó
  reclasificarlo a `service` —lo que mandaba la propia política de §4.12 de DOC-05— y
  hacerlo **antes de exportar a Rally**. A-03 lo hizo en DOC-05 1.6.0. Es el **primer
  hallazgo de este documento que se cierra porque su destinatario lo corrigió**; los
  cuatro anteriores (A-05-01a, A-05-02, A-05-05, A-05-07) se cerraron por reformulación o
  absorción. A-03 encontró además dos casos más de la misma familia que A-05 no había
  visto —**TC-063** y **TC-045**— y los reclasificó también.
- **A-05-11c · NUEVO.** De `DOC-23-INFORME` 2.0.0 §5: **TC-032, TC-033 y TC-047** siguen
  declarando `ui` y no tienen vector en la interfaz. A-05 lo verificó en el código
  (`DataTable.tsx` filtra solo sobre las claves de las columnas declaradas, y el listado
  de albaranes solo declara `numero`, `estat` y `data`; `AlbaraLiniesSection.tsx` renderiza
  el campo de precio dentro de un `{tipus === 'ma_obra' && …}`). Es más grave que 11a
  porque no se resuelve reclasificando: **REQ-025 promete un filtro que la aplicación no
  tiene**, y ponerlo en verde por servicio haría desaparecer el síntoma. Decisión de
  producto, no de A-03.
- **A-05-03b · NUEVO.** De `EXP-007` de `DOC-14-EXPLORATORIO` 1.0.0: **TC-073 y TC-075**
  llevan el IVA en el nombre, están **en verde** en DOC-23 y no lo comprueban en ningún
  paso, sobre dos requisitos —REQ-051 y REQ-053— que la aplicación no cumple (la ficha de
  factura muestra el tipo, `21%`, y no el importe, 20,66 €). Es la primera vez que este
  documento registra un verde ya producido y ya falso.
- **A-05-12 · NUEVO.** El bloque de resumen `verification_path` del front-matter de DOC-05
  1.6.0 sigue declarando `ui: 109, service: 1` mientras sus propios bloques `testcases`
  dicen 106 y 4. Lo destapó la comprobación de coherencia del §3.1, que **falla por primera
  vez** desde que se añadió en 1.6.0. No afecta a nada de este documento —A-05 cuenta sobre
  el YAML y nunca sobre resúmenes— pero mandaría tres casos `Critical` a la cola de
  automatización equivocada a quien lo leyera. Corrección de **A-03**, tres líneas.

**Correcciones de censo respecto de 1.6.0**, todas anunciadas y ninguna silenciosa:

| Qué decía 1.6.0 | Qué dice 1.7.0 | Por qué |
|---|---|---|
| «los 70 casos `Functional` e `Integration` no son el riesgo: si su vector no existiera fallarían de forma ruidosa el primer día» | **falso** | TC-032, TC-033 y TC-047 son `Functional` y no fallaron ruidosamente: **nunca llegaron a escribirse**, y un caso sin escenario no sale rojo en ningún informe |
| «los cuatro requisitos de A-05-11 son los cuatro `critical`» | 3 `critical` + 2 `high` | los `high` entran por A-05-11c, que es de otra naturaleza |
| A-05-08b como riesgo razonado sobre el grafo de dependencias | **materializado** | el único rojo de 107 escenarios es TC-048, arrastrado por TC-040 en el carril serial de 17 |
| «corregir A-05-11 entero llevaría el reparto a 105/5» | reparto real 106/4 | se corrigieron tres casos en vez de uno, y los tres hermanos de 11b siguen sin escribirse |

**Por qué MINOR y no otra cosa.** No es MAJOR porque nada de lo que consumen A-11 y S-07
queda invalidado: misma cabecera de CSV, mismo mapa requisito → caso, ningún ID movido,
cobertura en 100 % y cero anomalías bloqueantes. No es PATCH porque se cierra un punto de
Go/No-Go, nacen tres, cambian seis cifras del resumen y entran dos entradas nuevas en
`inputs` que S-16 tendrá que vigilar a partir de ahora.

**Cambio de forma: el front-matter baja de 184 líneas a 55.** Llevaba `version_reason`,
`counts`, `execution`, `automation`, `verification_path` y una nota `usage` por entrada
—el 12 % del fichero—, duplicando cifras que el cuerpo ya daba con contexto. El contrato
de A-05 dice que el front-matter declara de dónde viene el documento y nada más. Cada dato
se ha movido a donde se lee: las cifras a §1 y §5, los matices de cada entrada al apartado
«Procedencia» del cuerpo, y el motivo del salto de versión a este fichero. **No se ha
perdido ninguno.**

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
