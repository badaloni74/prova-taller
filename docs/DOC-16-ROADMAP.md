---
doc_id: DOC-16
doc_name: DOC-16-ROADMAP
version: 2.0.0
status: draft
generator: A-12 mejoras/roadmap
generator_version: "1.1"
generated_at: 2026-08-17T11:20:00+02:00
project: app-taller
language: es
history: docs/DOC-16-ROADMAP-HIST.md   # este documento NO lleva historial de cambios
source:
  repo_path: C:\Claude\appdani
  vcs: git
  branch: master
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  working_tree_clean: false   # sin versionar: docs/ y registro-ids.json, generados por este ciclo
decision:
  decided_on: 2026-08-17
  decided_by: propietario del proyecto
  accepted: [MEJ-001, MEJ-003, MEJ-005]
  rejected: []
  still_proposed: [MEJ-002, MEJ-004, MEJ-006]
  note: >-
    esta versión registra una decisión, no una ronda de análisis. No se ha propuesto ninguna
    mejora nueva y no se ha pedido ningún `MEJ-nnn` a S-12: el registro sigue en MEJ-006
inputs:
  - id: DOC-16-ROADMAP.md
    from: A-12
    present: true
    version: 1.0.0
    hash: sha256:1d1ba5a8d67ac87f00e72ed35bd6695860188067cfc3e9198a93541f4ab24943
    usage: >-
      versión anterior de este mismo documento, y la entrada que manda. De ella salen los seis
      MEJ-nnn, sus fichas y su evidencia; esta versión solo cambia el estado de tres de ellos
  - id: DOC-17-DEUDA-TECNICA.md
    from: S-05
    present: false
    note: >-
      S-05 sigue sin ejecutarse. Este roadmap sigue escrito SIN deuda técnica analizada por nadie:
      toda su evidencia procede de cobertura (DOC-07), defectos (DOC-24), automatización (DOC-23)
      y verdad técnica (DOC-02), más la lectura directa de código hecha en 1.0.0
  - id: DOC-20-RALLY-STATE.json
    from: I-01
    present: false
    note: el proyecto no tiene entorno Rally; sigue sin haber histórico de ejecución
  - id: DOC-19-RALLY-TESTCASES.csv
    from: S-07
    present: false
  - id: DOC-02-TECNICA.md
    from: S-01
    present: true
    version: 1.0.0
    hash: sha256:735feb13b7b0774ca1b370a8d1659ee9c7d145f6d8a52f35dc486491953bd7f1
    usage: bloque `graph` (33 componentes, 58 aristas) para el impacto de cada mejora; bloque `testing`; Q-01 a Q-06
    unchanged_since: 1.0.0
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    present: true
    version: 1.5.0
    hash: sha256:381135dd024a2dc7e05020ee2a60c71080791bfc16dad2e627e1c7056e8c2a91
    previous_version: 1.4.0
    previous_hash: sha256:50fbddacdb3799bef679e12850813d1a8d7b6f801f4516ae0ec8a3bd7d84331b
    companion_file: docs/DOC-07-MATRIZ.csv
    companion_from: S-14
    companion_hash: sha256:1676546ad1473a6401ab8aaa6010e246f2f4b2ef4693da37c75c305ec540efb3
    companion_note: >-
      la matriz es el artefacto acompañante del mismo documento, no una entrada aparte. En 1.0.0
      se declaró dos veces —una de ellas sin versión— y A-05 lo señaló: aquí hay una sola
      declaración de DOC-07, con la versión del documento y el hash de las dos piezas. El CSV
      sigue byte a byte idéntico por tercera versión consecutiva
    usage: >-
      avisos A-05-01b, A-05-03, A-05-06, `critico_caso_unico`; reparto por módulo y prioridad
    change_note: >-
      regenerado a 1.5.0 mientras A-12 escribía esta versión. Releído entero antes de reutilizarlo.
      Tres cifras que este roadmap citaba de 1.4.0 se corrigen aquí —A-05-01 pasa de 3 requisitos a
      2 porque A-05-01a se cierra, y las 19 colisiones de A-05-06 eran 15 para DOC-05 y son 34 en
      total repartidas entre dos documentos—, y aparecen tres hallazgos nuevos, de los que
      A-05-10 refuerza a MEJ-001. Ninguna mejora cambia de estado ni de prioridad por esto
  - id: DOC-24-BUGS.json
    from: A-14
    present: true
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    usage: los 4 defectos confirmados ejecutando; único origen de patrón medido de este documento
    unchanged_since: 1.0.0
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    present: true
    version: 1.4.1
    hash: sha256:81a8895cad8bcf307d241ec63f4e2d4e1bf4e9ec7eb906b6992ed7f05b59e297
    previous_version: 1.4.0
    previous_hash: sha256:1682e36f1ed63fba192d825422776405fb6a3b5687f34e478f71de060e5a1f81
    usage: apartado 4.11 (grado de automatización y las cinco familias que degradan) y 4.10 (olas y carriles)
    change_note: >-
      PATCH de conciliación con DOC-04 1.2.0. A-12 ha vuelto a leer 4.11 antes de reutilizar sus
      cifras: «Literal del aviso» 25, «Formulario de línea» 14 y «Apartado de ficha o lista sin
      identificador» 19 siguen diciendo exactamente lo mismo
  - id: DOC-23-AUTOMATION/DOC-23-INFORME.md
    from: S-10
    present: true
    hash: sha256:597226dfc95d17a5e15a6efa2958338c105cfc2541ed1b713219278a8b6b536e
    usage: evidencia de campo de la fragilidad de los localizadores y del estado compartido entre escenarios
    unchanged_since: 1.0.0
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    present: true
    version: 1.1.0
    hash: sha256:1041cebf287ac1059e63e857c95107dadceaf429f2cd8ec527ac2b4183dc29f5
    usage: >-
      entrada nueva, no consumida como evidencia: solo para comprobar qué ha hecho A-15 con los
      hallazgos 6.1 y 6.3 que este documento le dirigió. No cambia ninguna mejora
  - id: registro-ids.json
    from: S-12
    present: true
    hash: sha256:83064f60b872869a7a11ed72d1c5729edd136394b2d4ca53f9d247f0fa91ad16
    previous_hash: sha256:c496f9e406bc42f9a300598a8eb0e103e3e1c548e091110b838c267939dccf59
    note: >-
      310 anclas. MEJ-001 a MEJ-006 ya están censadas y `owners` ya declara `MEJ-*`:
      el hallazgo 6.4.2 de 1.0.0 está resuelto. A-12 no ha tocado el registro
  - id: codigo-fuente
    from: repositorio
    present: true
    usage: >-
      sin relectura nueva en esta versión. Las citas de código de las fichas se verificaron en
      1.0.0 sobre el commit 44748fb, que sigue siendo HEAD y no ha cambiado
counts:
  improvements: 6
  by_status: { proposed: 3, accepted: 3, rejected: 0, implemented: 0, superseded: 0 }
  by_source: { evidence: 5, opinion: 1 }
  new_this_round: 0
  rejected_respected: 0
  findings_for_others: 5
---

# DOC-16 · Mejoras y roadmap técnico — app-taller

> Qué patrón hay detrás de los defectos de este sistema y dónde conviene invertir
> esfuerzo técnico. **Solo mejoras sobre lo que ya existe.** Ninguna propuesta de
> este documento añade funcionalidad: lo que hay de esa clase está en el apartado 6,
> dirigido a `A-15`.
>
> **Este documento no lleva historial de cambios.** Refleja solo el estado actual,
> con su `version` en el front-matter. Todo el historial —qué cambió en cada versión y
> por qué— está en **`docs/DOC-16-ROADMAP-HIST.md`**.
>
> `status: draft`. Tres mejoras están decididas; las otras tres no, y las decide una
> persona.

## 1. Qué ha cambiado desde el roadmap anterior

**El 2026-08-17 el propietario del proyecto ha decidido sobre las seis propuestas de
1.0.0. Ha aceptado tres y ha dejado tres sin decidir. No ha rechazado ninguna.**

| | Mejoras | Qué significa |
|---|---|---|
| `accepted` | **MEJ-001**, **MEJ-003**, **MEJ-005** | Decididas. Entran al ciclo por `A-07`. **No se vuelven a proponer nunca** |
| `proposed` | MEJ-002, MEJ-004, MEJ-006 | **Esperando decisión, que no es lo mismo que descartadas**. Siguen vivas y siguen contando |
| `rejected` | — | Ninguna. Este proyecto no tiene todavía ninguna mejora descartada |

**Esta versión registra una decisión, no una ronda de análisis.** No he propuesto nada
nuevo, no he pedido ningún `MEJ-nnn` a S-12 —el registro sigue en MEJ-006— y no he
reescrito ninguna ficha salvo para reflejar el estado y corregir tres cifras que A-05 ha
rectificado. Las mejoras del apartado 3 son las mismas seis.

**La aceptación que más consecuencias tiene es MEJ-003**, y conviene decir por qué sin
esperar a su ficha: **es la que contradice una decisión explícita del SPEC 01**, que
excluyó la suite de tests y declaró que «la verificació d'aquest spec és manual». Quien
lea esto dentro de seis meses encontrará esa contradicción antes que el motivo, así que el
motivo está escrito en el estado aceptado de MEJ-003 y no hay que ir a buscarlo: **el
sistema sobre el que se tomó aquella decisión ya no es este.**

**Evidencia nueva: ninguna que mueva una mejora, y lo he comprobado en vez de suponerlo.**
De las entradas presentes, cinco tienen hoy el mismo hash que declaraba 1.0.0 —DOC-02,
la matriz de DOC-07, DOC-24 y el informe de DOC-23— y dos han cambiado:

- **`DOC-05` 1.4.0 → 1.4.1**, un PATCH de conciliación que **no toca ninguna cifra que
  este roadmap le cite**: he releído el apartado 4.11 y las tres familias que sostienen
  MEJ-001 y MEJ-002 siguen en 25, 14 y 19 casos.
- **`DOC-07` 1.4.0 → 1.5.0**, regenerado por A-05 mientras yo escribía. Lo he releído
  entero. **Corrige tres cifras que yo citaba** —están corregidas en los apartados 5.3 y
  5.4— y **añade tres hallazgos nuevos**, de los cuales `A-05-10` es el único que toca a
  una mejora: **refuerza a MEJ-001, que ya está aceptada**, así que no cambia ninguna
  decisión ni justifica proponer nada.

**Y se ha resuelto un hallazgo mío.** 1.0.0 avisaba de que `MEJ-*` no tenía dueño
declarado en `registro-ids.json` y de que las seis anclas no estaban censadas. Hoy están:
**310 anclas**, `MEJ-001` a `MEJ-006` presentes y `owners` declarando
`"MEJ-*": "A-12 mejoras y roadmap"`. Lo confirma también `DOC-07/3.10`.

Para el detalle de qué cambió en cada versión y por qué,
**`docs/DOC-16-ROADMAP-HIST.md`**.

## 2. Recomendación

Las tres del podio de 1.0.0 —MEJ-001, MEJ-003 y MEJ-005— **ya están decididas y salen de
la recomendación**: recomendar lo ya aceptado no ayuda a nadie. Lo que sigue es el orden
por relación valor/dificultad **entre las tres que esperan decisión**.

| # | Mejora | Por qué ésta |
|---|---|---|
| 1 | **MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base** | Sube al primer puesto **por consecuencia directa de la decisión de ayer, no porque haya ganado valor propio**: es la más barata del documento y ahora **bloquea a dos aceptadas**. MEJ-005 necesita poder apuntar a una base que no sea la de desarrollo; MEJ-003 necesita una versión de Node fijada, porque `better-sqlite3` es un módulo nativo que se recompila y una CI que no fija versión no es reproducible. Sigue siendo la única `opinion` del documento y sigue sin un solo dato que mida daño causado: lo que la mueve es que ahora hay trabajo decidido esperándola |
| 2 | **MEJ-004 · Un sitio donde vivan las reglas de escritura** | Ataca la causa común de los cuatro defectos confirmados y **su condición previa acaba de decidirse**: su ficha decía «después de MEJ-003, no antes», y MEJ-003 ya está aceptada. Deja de estar bloqueada por una propuesta sin decidir y pasa a estarlo por trabajo en cola, que es una situación distinta y mejor. Su ventana sigue siendo estrecha: los cuatro evolutivos van a escribirse en los ficheros que esta mejora quiere vaciar |
| 3 | **MEJ-002 · Catálogo único de los literales de error del servidor** | La última de las tres, como en 1.0.0: es la de menor urgencia y la única cuyo riesgo de no hacerla sigue siendo bajo. Lo que ha cambiado a su alrededor es que `DOC-07/A-05-10` cuenta ahora la misma causa desde tres agentes a la vez, y la mitad que le corresponde —los literales de error— sigue sin dueño en el lado del servidor |

**Dos consecuencias de la decisión que conviene leer antes de planificar, y ninguna es
una decisión mía.**

1. **`MEJ-005` y `MEJ-003` están aceptadas y las dos declaran `depends_on: [MEJ-006]`,
   que sigue sin decidir.** Ninguna está bloqueada del todo —la reconstrucción desde el
   seed y las primeras pruebas de servidor se pueden hacer sobre la base y el Node
   actuales—, pero la parte reproducible de ambas, no. **Es un dato para el análisis de
   impacto de `A-07`.**
2. **`MEJ-004` ya no tiene delante una propuesta sin decidir, sino una aceptada.** Su
   orden natural sigue siendo después de MEJ-003, y ahora eso es una secuencia de trabajo
   y no una hipótesis.

## 3. Mejoras

Seis, las mismas de 1.0.0. **Cinco salen de evidencia con fuente citable y una de mi
criterio**, marcada como tal para poder filtrarla de un vistazo. Ninguna añade
funcionalidad.

Antes de las fichas, el hecho del que salen tres de ellas.

### 3.0 El patrón: los cuatro defectos son el mismo defecto

DOC-24 reporta cuatro defectos confirmados ejecutando. Puestos uno al lado del otro:

| Defecto | Qué falta | Dónde | Capa |
|---|---|---|---|
| BUG-001 | comprobar existencias antes de descontar stock | `albarans-router` (`albarans.js:168`) | escritura |
| BUG-002 | comprobar que el vehículo nuevo es del mismo cliente | `albarans-router` (`albarans.js:76-103`) | escritura |
| BUG-003 | comprobar que precio, coste y stock no son negativos | `peces-router` (`peces.js:22`) | escritura |
| BUG-004 | no existe camino para anular o rectificar una factura | `factures-router` | escritura |

**Los cuatro son la misma clase: una comprobación ausente en el punto exacto donde el
dato se escribe.** Ninguno es un error de cálculo, ninguno es un fallo de la interfaz,
ninguno es un problema de datos. Los cuatro ocurren porque **el sistema no tiene ningún
sitio donde vivan las reglas de escritura**: cada router valida lo que su autor recordó
validar, en línea, entre el `req.body` y el `INSERT`.

Verificado en el código (commit `44748fb`, que sigue siendo HEAD): los siete routers suman
**877 líneas** y **84 llamadas a `res.status`**, y `albarans.js` —el más cargado— tiene 211
líneas y 22 de esas llamadas. No hay capa de servicio, no hay esquema de validación, no hay
un módulo de reglas. Es lo mismo que S-01 dejó anotado como pregunta abierta técnica en
**DOC-02/Q-06** («los routers concentran validación, negocio y SQL sin capa intermedia»),
sólo que ahora no es una pregunta: **hay cuatro consecuencias medidas**.

Y la concentración importa. Según DOC-07 §5, `albarans` (18 requisitos, 28 casos) y
`factures` (13 requisitos, 19 casos) son **31 de los 79 requisitos (39 %) y 47 de los
110 casos (43 %)**, y ahí caen **tres de los cuatro defectos**; el cuarto (BUG-003) está
en `peces`, que es el catálogo del que salen los precios de las líneas de albarán. **Los
cuatro están sobre el camino del dinero.** En el grafo de DOC-02, `albarans-router` es
el componente de API más acoplado del sistema: **8 aristas** (4 entrantes, 4 salientes),
por delante de `vehicles-router` (7) y `factures-router` (6).

---

### 3.1 Decididas · `accepted` el 2026-08-17

Las tres siguientes **ya no son propuestas**. Están decididas por el propietario del
proyecto y **A-12 no volverá a proponerlas en ninguna ronda futura**, ni con este número
ni reformuladas ni troceadas.

**Su siguiente paso es `A-07 · Impacto`, y todavía no ha ocurrido.** Las tres son trabajo
técnico interno: no hay ambigüedad de negocio que resolver, ninguna pantalla cambia de
comportamiento y ningún requisito se toca, de modo que **no pasan por
`A-06 · Refinamiento`**. Lo que falta es el análisis de impacto, y hasta que exista no
hay ni alcance cerrado ni estimación. **La estimación es de `A-08`, cuando entren en el
ciclo; este documento no da horas.**

---

#### MEJ-001 · Identificadores estables de prueba en la interfaz

| | |
|---|---|
| **Estado** | **`accepted`** · decidida el **2026-08-17** por el **propietario del proyecto** |
| **Siguiente paso** | `A-07 · Impacto` — **pendiente, no ha ocurrido** |
| **Origen** | `evidence` |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `medium` |

**En qué consiste.** Añadir un atributo de prueba estable (`data-testid` o equivalente)
a los elementos que hoy sólo se pueden localizar por su rótulo visible: los campos y
botones del formulario de línea de albarán, y los apartados de relación de las fichas
(vehículos del cliente, albaranes del vehículo, nóminas del empleado, lista de albaranes
de la emisión). **No cambia ni una pantalla, ni un flujo, ni un texto.**

**Qué aporta.** Baja el coste de mantenimiento de la suite automatizada y elimina una
clase entera de fallo intermitente. Hoy un cambio de rótulo —o el simple cambio de
idioma, que esta aplicación ofrece— rompe tests que verifican comportamiento correcto.

**Evidencia** (verificada de nuevo contra DOC-05 **1.4.1**; ninguna cifra se ha movido).

- `DOC-05/4.11`: de las cinco familias que degradan casos a `automation.grade: medium`,
  dos son exactamente esto: **«Formulario de línea» (14 casos)** —«no llevan `id` y hay
  que localizarlos por proximidad de la etiqueta visible»— y **«Apartado de ficha o
  lista sin identificador» (19 casos)**. **33 de los 110 casos.**
- `DOC-05/4.11` cierra el apartado diciendo que documentar los mensajes de error y
  poner identificador estable en esos formularios subiría **43 de los 80 `medium`**, y
  que «es la recomendación más rentable que sale de este documento y va dirigida a quien
  mantenga la aplicación, no a quien la automatice».
- `DOC-23-INFORME`: dos de los cuatro defectos del código generado son de esta causa
  —se asumió `<a>` donde había `<button>`; el desplegable de pieza carga por `fetch` y
  produjo **un flake dependiente del orden de ejecución**—.
- **Verificado en el código** (A-12, commit `44748fb`): `client/src/components/EntityForm.tsx`
  lleva `id={field.name}` en sus tres campos, y **no hay ni una sola ocurrencia de
  `data-testid` en todo `client/src`**; `client/src/pages/albarans/` no tiene ningún `id=`.
- **Refuerzo nuevo, de `DOC-07/A-05-10` (1.5.0), posterior a la decisión.** A-05 es el
  único que mira los tres documentos a la vez y ha contado la misma causa medida por tres
  agentes distintos: los 43 casos degradados de A-03, el flake de campo de S-10 y las
  **8 de 11 preguntas de DOC-06 con `blocks_automation`, que alcanzan 47 requisitos**.
  Su tabla de correcciones asigna «poner identificador estable en los formularios de línea
  de albarán y en los apartados de relación» a **«quien mantenga la aplicación»**, que es
  exactamente esta mejora. **No cambia nada —ya estaba aceptada—, pero conviene que conste
  que la evidencia siguió creciendo después de decidirla.**

**Componentes afectados** (bloque `graph` de DOC-02): `albarans-pages`, `clients-pages`,
`vehicles-pages`, `factures-pages`, `personal-pages`, `shared-components`. **Seis de 33
componentes, todos hojas de la interfaz**: cada `*-pages` tiene exactamente 2 aristas y
`shared-components` tiene 1. Ningún componente de `api` ni de `data` se toca.

**Riesgo de no hacerla** *(se conserva porque justifica la urgencia con la que A-07 debería
recogerla)*. La suite se está escribiendo ahora mismo (DOC-23 tiene 4 casos de 110 hechos):
cada Page Object escrito contra un rótulo se rehará después, y el coste crece con lo
automatizado. **Aceptarla no detiene ese reloj; solo lo detiene ejecutarla.**

**Entra por** `A-07`.

---

#### MEJ-003 · Suite de pruebas automáticas del servidor y CI mínima

| | |
|---|---|
| **Estado** | **`accepted`** · decidida el **2026-08-17** por el **propietario del proyecto** |
| **Siguiente paso** | `A-07 · Impacto` — **pendiente, no ha ocurrido** |
| **Origen** | `evidence` |
| **Tamaño** | `large` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `low` (añade, casi no modifica) / `medium` / `high` |

**En qué consiste.** Montar una suite de pruebas automáticas sobre la API del servidor
—las reglas de dinero primero: totales, IVA, numeración, bloqueos de borrado— y una CI
que la ejecute en cada cambio. No sustituye a los 110 casos de DOC-05, que son de
extremo a extremo y viven en Rally: **cubre la capa donde están los cuatro defectos**.

**Qué aporta.** Es la única mejora del documento que cambia lo que el equipo *sabe* en
lugar de lo que el equipo *tiene*. Hoy nadie se entera de una regresión hasta que alguien
la ve.

---

##### Por qué esta mejora aceptada contradice el SPEC 01, y por qué se aceptó igual

**Esto es lo primero que hay que leer de esta ficha, y está aquí para que dentro de seis
meses nadie tenga que reconstruirlo.**

`specs/01-esquelet-app-taller.md:48` **excluye explícitamente la suite de tests** y declara
que «la verificació d'aquest spec és manual». `DOC-02/Q-04` recoge esa exclusión como
decisión consciente, no como olvido. **Quien encuentre esta mejora aceptada y aquel SPEC
abierto verá una contradicción, y lo es: es una decisión que revoca otra anterior.**

**Lo que ha cambiado desde entonces son tres hechos medidos, no un cambio de opinión:**

1. **Entonces el sistema no tenía defectos conocidos; hoy tiene cuatro confirmados, dos
   `critical`** (`DOC-24`), y dos de ellos se encadenaron produciendo una factura de
   **114.835,05 €** a un cliente equivocado. La verificación manual que el SPEC daba por
   suficiente es exactamente la que los dejó pasar.
2. **Entonces la verificación manual cubría un esqueleto y un módulo piloto; hoy hay 79
   requisitos y 110 casos** (`DOC-07` 1.5.0, cobertura 100 %). Verificar eso a mano en
   cada cambio no es una decisión sostenible, es una intención.
3. **Cuatro evolutivos ya decididos por negocio** (Q-02, Q-06, Q-10, Q-12) van a tocar
   precisamente las reglas de escritura del ciclo del dinero. **La decisión del SPEC 01 se
   tomó para un sistema que nadie iba a modificar bajo presión, y ya no es ése.**

**Lo que esta aceptación NO significa.** No invalida el SPEC 01 ni convierte en error la
decisión de entonces: era razonable para lo que el proyecto era. Lo que hace es declararla
**superada por los hechos posteriores**. Si alguien actualiza `specs/01`, conviene que cite
esta mejora; si no lo hace, la contradicción sigue viva en el papel y este apartado es lo
único que la explica.

---

**Evidencia. Es la misma de 1.0.0, verificada de nuevo entrada por entrada.**

- `DOC-02/testing`, literal del bloque estructurado: `frameworks: []`, `test_files: 0`,
  `coverage_percent: 0`, `ci: none`, `linter: oxlint (solo client)`. DOC-02 sigue en 1.0.0
  con el mismo hash, así que sigue siendo el estado de hoy.
- `DOC-24`: los cuatro defectos se encontraron **ejecutando la aplicación a mano**.
  Ninguno lo detectó ningún automatismo, porque no hay ninguno.
- `DOC-23-INFORME`: **los cuatro defectos del código generado «aparecieron ejecutando
  contra la aplicación real, no revisando el código»**.
- `DOC-07/A-05-03` (releído en 1.5.0): cuatro requisitos —dos de ellos `critical`— tienen
  cobertura formal correcta y defecto confirmado; **si los 110 casos se exportan y se
  ejecutan, saldrán en verde y los cuatro defectos seguirán ahí**.
- `DOC-24/validated_ok`: las reglas de cálculo (BR-FAC-05/06/07) y la numeración
  (BR-ALB-09, BR-FAC-09) están verificadas correctas **una vez, a mano, el 2026-08-16**.

**Un matiz que 1.5.0 añade y que hay que decir, porque juega en contra de mi propio
argumento.** `DOC-07/A-05-03` ya no es un hueco por omisión: Q-19 está respondida y la
vigilancia de los cuatro defectos vive en `DOC-23-AUTOMATION`, **con un TC-900 en rojo
sobre BUG-001** que no se exporta a Rally. Es una mitigación real y no la escondo. **No
sustituye a esta mejora por dos razones:** es de extremo a extremo, no cubre la capa donde
la regla se escribe, y **hoy no la ejecuta nada automáticamente** —seguimos en `ci: none`—,
así que vigila solo cuando alguien se acuerda de lanzarla.

**Componentes afectados.** Ninguno se modifica: la suite **añade** ficheros y ejercita
`clients-router`, `vehicles-router`, `peces-router`, `albarans-router`, `factures-router`,
`personal-router`, `nomines-router`, `db-connection`, `db-migrate` y `db-numbering`. Lo
único que se toca de lo existente es el `package.json` raíz y el de `server`. Por eso el
impacto es `low` y la dificultad `medium`: el trabajo es de volumen, no de riesgo.

**Riesgo de no hacerla** *(se conserva porque es lo que A-07 tiene que dimensionar)*. Los
cuatro evolutivos entran a mano sobre 877 líneas de rutas sin red, y la métrica que se va a
presentar —«100 % de cobertura, todo verde»— es cierta y engañosa a la vez; DOC-23 ya avisa
de que «presentar ese dato a un comité sin este matiz sería engañoso».

**Dependencia que A-07 tiene que resolver.** Declara `depends_on: [MEJ-006]`, y **MEJ-006
sigue sin decidir**. Las primeras pruebas de servidor se pueden escribir sin ella; una CI
reproducible, no: `better-sqlite3` es un módulo nativo que se recompila con cada versión
de Node.

**Entra por** `A-07`.

---

#### MEJ-005 · Estado de base reproducible entre escenarios

| | |
|---|---|
| **Estado** | **`accepted`** · decidida el **2026-08-17** por el **propietario del proyecto** |
| **Siguiente paso** | `A-07 · Impacto` — **pendiente, no ha ocurrido** |
| **Origen** | `evidence` |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `high` |

**En qué consiste.** Dar a la automatización una forma barata y rápida de dejar la base
en un estado conocido: reconstrucción completa desde el seed y, si se quiere, restauración
por escenario. Hoy existe `npm run seed` y nada más.

**Qué aporta.** Que un rojo signifique un defecto. Es la condición para que la suite que
se está construyendo sirva de algo.

**Evidencia** (sin cambios desde 1.0.0).

- `DOC-23-INFORME`: **«Estado del catálogo al terminar la suite: stock −966»**.
- `DOC-23-INFORME`, defecto 4 y «Qué queda pendiente», punto 1: **«los escenarios no son
  independientes»** —TC-040 consume 2 unidades antes de que TC-048 compruebe el stock
  inicial— y «no hay setup ni teardown».
- `DOC-05` (nota de cabecera, ya en 1.4.0 y conservada en 1.4.1): aislado TC-048 pasaba y
  en suite completa se ponía en rojo sin que la aplicación tuviera ningún defecto, y
  **costó tres ejecuciones averiguar que el problema era la suite**.
- `DOC-05/4.10`: 3 casos con `depends_on`, **54 con `touches`**, 57 que restauran estado,
  14 recursos distintos, 2 olas de ejecución.
- `DOC-24/test_data_left_behind`: la exploración dejó **permanentes** el albarán 5 y la
  factura 2026/F-0002 de 114.835,05 €.

**Componentes afectados:** `db-seed` (1 arista), `db-migrate` (2 aristas), `db-connection`
(10 entrantes, sólo como consumidor de la ruta). **Tres de 33 componentes, ninguna
pantalla, ningún router.**

**Dependencia que A-07 tiene que resolver.** Declara `depends_on: [MEJ-006]`, y **MEJ-006
sigue sin decidir**. La reconstrucción desde el seed no la necesita; apuntar a una base
distinta de la de desarrollo, sí. O se decide MEJ-006, o A-07 acota MEJ-005 a la parte que
funciona sobre la base actual.

**Frontera.** El *contenido* de los conjuntos de datos es de `S-06`/DOC-13 y DOC-05 §5 ya
le ha dado tres encargos concretos. Lo mío es sólo el mecanismo de reposición.

**Entra por** `A-07`.

---

### 3.2 Esperando decisión · `proposed`

**Las tres siguientes no están descartadas: están sin decidir.** No hay ningún motivo de
rechazo que respetar porque no hay ningún rechazo. Sus fichas son las de 1.0.0 y su
evidencia es la misma; el apartado 4 dice, una por una, si ha crecido o menguado.

---

#### MEJ-002 · Catálogo único de los literales de error del servidor

| | |
|---|---|
| **Estado** | `proposed` — **sin decidir el 2026-08-17** |
| **Origen** | `evidence` |
| **Tamaño** | `medium` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `medium` / `low` / `low` |

**En qué consiste.** Extraer los mensajes de error hoy incrustados en las rutas a un
módulo único del servidor, cada uno con un código estable, y devolver ese código junto
al mensaje. **El texto no cambia y el idioma tampoco**: es una extracción, no una
traducción.

**Qué aporta.** Dos cosas distintas. Para las pruebas: un ancla que no se mueve cuando se
retoca la redacción de un aviso. Para el producto: el punto único desde el que se podría
decidir después qué hacer con esos textos —**decisión que no es mía y va al apartado 6**—.

**Evidencia.**

- **Verificado en el código** (A-12): **70 literales** `res.status(...).json({ error: '…' })`
  repartidos por los siete ficheros de `server/routes/`, todos en catalán fijo.
- `client/src/services/api.ts` los propaga **tal cual** a la interfaz:
  `const message = (body && body.error) || 'Error ' + response.status`.
- `DOC-05/4.11`: la familia **«Literal del aviso» degrada 25 casos**, y con los nueve de
  doble motivo **los afectados por el texto de error son 34**.
- `specs/01-esquelet-app-taller.md:102` fija como convención del proyecto «claus de
  traducció en anglès pla amb punts, **mai el text final incrustat al codi**». La
  convención existe, se cumple en el cliente y **no se cumple en las 70 del servidor**.
- **Contexto nuevo, no evidencia nueva** (`DOC-07/A-05-10`, 1.5.0): A-05 cuenta la misma
  causa desde tres agentes y concluye que la corrección de los literales es **de A-02**
  —documentarlos en DOC-04— y no del código. Es cierto y no lo discuto: **documentar el
  literal y tener un sitio único donde vive el literal son cosas distintas**, y esta
  mejora sigue siendo solo la segunda.

**Componentes afectados:** los siete routers (`clients-router`, `vehicles-router`,
`peces-router`, `albarans-router`, `factures-router`, `personal-router`,
`nomines-router`) y, si se decide devolver el código, `api-client` (8 aristas).

**Riesgo de no hacerla.** Bajo y creciente: 34 casos automatizados quedarán anclados a
textos que nadie ha declarado estables.

**Cautela que hay que leer antes de aceptarla.** Añadir un `code` a la respuesta de error
**es un cambio en el contrato de la API**, aunque sea aditivo. DOC-03 no existe (S-03 no
se ha ejecutado), así que no hay contrato escrito que actualizar, pero el cambio debe
pasar por A-07 igualmente. La mitad puramente interna —el módulo de catálogo— no toca
ningún contrato y se puede hacer sola.

**Entra por** `A-07`.

---

#### MEJ-004 · Un sitio donde vivan las reglas de escritura

| | |
|---|---|
| **Estado** | `proposed` — **sin decidir el 2026-08-17** |
| **Origen** | `evidence` |
| **Tamaño** | `large` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `high` / `high` / `medium` |

**En qué consiste.** Extraer de los routers la validación de entrada y las reglas de
negocio a un módulo por dominio, de modo que cada regla tenga un sitio, un nombre y una
prueba. **La refactorización no añade ni cambia ninguna regla**: mueve las que ya existen.
Las reglas nuevas son los evolutivos de Q-02, Q-06, Q-10 y Q-12, que no son mías.

**Qué aporta.** Convierte «acordarse de validar» en «declarar la regla». Es la respuesta
al patrón del apartado 3.0, y baja el coste de los cuatro evolutivos que vienen.

**Evidencia.**

- `DOC-24/BUG-001`, `DOC-24/BUG-002`, `DOC-24/BUG-003`, `DOC-24/BUG-004`: **4 de 4
  defectos confirmados son una comprobación ausente en el punto de escritura**. Ver 3.0.
- `DOC-02/Q-06`, abierta desde la Fase 0: «los routers concentran validación, negocio y
  SQL sin capa intermedia. ¿Es una decisión asumida para el tamaño actual?». Esta mejora
  es el precio de contestar «no» y **no puede avanzar sin esa respuesta**.
- **Verificado en el código** (A-12): 877 líneas en `server/routes/`, 84 `res.status`,
  ninguna capa de servicio ni esquema de validación.
- `DOC-02/graph`: `albarans-router` es el componente de API más acoplado (**8 aristas**),
  y `db-connection` recibe **10 aristas entrantes**.

**Componentes afectados:** los siete routers más `db-connection`. **Ocho de 33
componentes, y son los ocho por los que pasa toda escritura.**

**Riesgo de no hacerla.** El quinto defecto de la misma familia. No sé cuál será, y ése
es justamente el argumento: los cuatro primeros tampoco se sabían.

**Riesgo de hacerla mal, que es igual de real.** Refactorizar los ocho componentes por
los que pasa toda escritura **sin una sola prueba automática** cambia un riesgo conocido
por uno desconocido. Su ficha sigue diciendo: **después de MEJ-003, no antes** —y desde
el 2026-08-17 eso ha dejado de ser una condición sobre una propuesta sin decidir: MEJ-003
está aceptada, así que la condición es de secuencia de trabajo, no de decisión.

**La ventana, que es lo que hay que decidir pronto.** Los cuatro evolutivos van a tocar
estos mismos ficheros. Hacer la refactorización *antes* retrasa cuatro correcciones de las
que una ya ha producido una factura errónea; hacerla *después* significa escribir las
cuatro reglas nuevas en el sitio que esta mejora quiere vaciar. **La opción que yo
recomendaría —y es recomendación, no decisión— es la tercera: hacerla con el primer
evolutivo, acotada al dominio que ese evolutivo toque.**

**Entra por** `A-07`.

---

#### MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base

| | |
|---|---|
| **Estado** | `proposed` — **sin decidir el 2026-08-17, y ahora bloquea parcialmente a dos aceptadas** |
| **Origen** | **`opinion`** |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `low` |

**En qué consiste.** Declarar `engines` y `.nvmrc` con la versión de Node de referencia, y
leer la ruta de la base de datos de una variable de entorno con el valor actual como
valor por defecto.

**Por qué sigue marcada `opinion` y no `evidence`.** Los dos hechos están verificados y los
puedo citar: `package.json` no tiene `engines`, no hay `.nvmrc`, y
`server/db/index.js:5-6` construye `DB_PATH` con `path.join(__dirname, '..', '..', 'data')`.
Están además anotados como `DOC-02/Q-01` y `DOC-02/Q-02`. **Pero ningún dato mide que esto
haya causado un problema todavía.** Que MEJ-003 y MEJ-005 se hayan aceptado le da una razón
práctica para hacerse antes, **pero no le da evidencia**: sigue siendo `opinion` y la subo
en el podio del apartado 2 diciendo exactamente por qué.

**Qué aporta.** Es un habilitador de las otras dos, **y las dos ya están decididas**:
MEJ-003 necesita una versión de Node fijada porque **`better-sqlite3` es un módulo nativo**
que se recompila con cada versión, y MEJ-005 necesita poder apuntar a una base que no sea
la de desarrollo.

**Componentes afectados:** `db-connection` (**10 aristas entrantes, el componente más
acoplado del grafo**) y `server-app` (9 aristas), más los `package.json`. Lo que salva el
impacto es que **el cambio es aditivo y conserva el valor actual por defecto**, de modo que
ninguno de los diez consumidores se entera.

**Riesgo de no hacerla.** Ha dejado de ser sólo teórico: **la CI reproducible de MEJ-003 y
la parte de MEJ-005 que apunta a otra base no se pueden hacer sin esto**, y las dos están
decididas. Sigue sin haber ningún incidente medido.

**Entra por** `A-07`.

## 4. Vivas de rondas anteriores

Las tres `proposed`, con si su evidencia ha crecido o menguado desde 1.0.0. **He
comprobado sus citas una por una** contra los hashes actuales, incluida la relectura
completa de DOC-07 1.5.0.

| Mejora | Evidencia | Qué ha pasado |
|---|---|---|
| **MEJ-002** | **Igual** | DOC-05 1.4.1 conserva «Literal del aviso» en **25 casos** y los 34 con solapamiento. Los 70 literales del servidor y `api.ts` no se han tocado: el commit sigue siendo `44748fb`. `DOC-07/A-05-10` cuenta ahora la misma causa desde tres agentes, pero asigna la corrección de los literales a **A-02** (documentarlos en DOC-04): es contexto, no evidencia nueva para esta mejora |
| **MEJ-004** | **Igual** | Los cuatro defectos siguen en DOC-24 sin corregir, `DOC-02/Q-06` sigue abierta y las 877 líneas y las 84 `res.status` no se han movido. Lo que ha cambiado no es su evidencia sino su camino: **su condición previa, MEJ-003, ya está aceptada** |
| **MEJ-006** | **Igual en datos, mayor en consecuencia** | No ha aparecido ningún incidente que la convierta en `evidence` —sigue en `opinion`—, pero **ahora hay dos mejoras aceptadas que la necesitan**. Eso cambia su prioridad práctica, no su clase de origen |

**Ninguna ha menguado y ninguna ha crecido en datos.** Es coherente con lo que es esta
versión: un día de diferencia, ninguna ejecución nueva del sistema, y de los dos documentos
que se han regenerado ninguno ha medido nada nuevo sobre estas tres.

**Y una nota sobre las aceptadas, para que no se pierda:** `DOC-07/A-05-10` **sí** ha
añadido evidencia a **MEJ-001**, después de que estuviera decidida. No cambia nada —ya
está aceptada y no volverá a proponerse— pero está anotado en su ficha, porque si algún
día se discute su prioridad de ejecución, ese dato cuenta.

## 5. Descartadas

**Ninguna.** El propietario del proyecto no ha rechazado ninguna mejora el 2026-08-17.

Conviene que esto quede escrito con todas las letras, porque es la primera vez que este
documento registra una decisión y la confusión es fácil: **MEJ-002, MEJ-004 y MEJ-006 no
están descartadas. Están esperando decisión.** No hay ningún motivo de rechazo que
respetar, ninguna de clase `not-now` que pueda volver si la evidencia crece y ninguna de
clase `not-wanted` que no pueda volver nunca. La tabla de descartadas de este documento
está vacía, y la próxima ronda de A-12 debe encontrarlas vivas.

Lo que sí tiene sentido conservar son **las que he considerado y he decidido no proponer**,
porque cualquiera que lea esto en una reunión las volverá a encontrar en la misma evidencia.

### 5.1 La numeración de albaranes y facturas (`generateNumero`)

`DOC-02/Q-03` pregunta por dos cosas reales, verificadas en `server/db/numbering.js`: la
consulta ordena `ORDER BY numero DESC` sobre un campo de texto, y **se ejecuta fuera de la
transacción del `INSERT`** (`albarans.js:63` y `factures.js:80`). Parece una condición de
carrera de manual. **No la propongo, por tres motivos que se suman:**

1. `specs/01-esquelet-app-taller.md:50` excluye explícitamente el «accés multiusuari
   simultani». No hay concurrencia por diseño.
2. `better-sqlite3` es **síncrono**: dentro de un único proceso Node no hay dos peticiones
   interleavadas.
3. El orden textual funciona mientras `padStart(4, '0')` mantenga la anchura. Rompe en el
   número **10.000**.

`DOC-24` además comprobó la numeración y la dio por correcta. **Proponer esto sería
fabricar trabajo.**

### 5.2 Las correcciones de BUG-001 a BUG-004

No son mías y no las propongo. Negocio ya decidió las cuatro el 2026-08-16 (Q-02, Q-06,
Q-10, Q-12) y entran por `A-06` → `A-07` como evolutivos. Lo que hago con ellas es
**leerlas como patrón** (apartado 3.0) y proponer la estructura donde aterrizarán (MEJ-004).

### 5.3 La fragilidad del extractor de S-12 (`DOC-07/A-05-06`) · **cifra corregida**

**Corrijo una cifra que publiqué en 1.0.0, porque la corrige su autor.** Yo escribí «19
colisiones bloqueantes» en DOC-05; `DOC-07` 1.5.0 rectifica esa medición propia: **eran 15
para DOC-05**, y las cuatro de diferencia eran un artefacto del método (copias renombradas),
no del riesgo. Al mismo tiempo **la exposición total ha subido**: A-04 ha adoptado la misma
convención en DOC-06, de modo que hoy hay **34 entradas protegidas solo por el orden de las
claves —15 en DOC-05 y 19 en DOC-06—**, y una edición que cualquier revisor consideraría
cosmética devuelve el proyecto a 34 colisiones bloqueantes.

**Sigo sin proponerla como `MEJ-nnn`, y el crecimiento no cambia el motivo:** el componente
no existe en el bloque `graph` de DOC-02 —`registry.js` no es código de `app-taller`, es
utillaje documental— y **A-05 ya le asignó dueño y recomendación en DOC-07 §3.7**. Va al
apartado 6.

### 5.4 Los huecos de cobertura

Sigue sin haber ninguno que proponer, con las cifras de `DOC-07` **1.5.0**: **cobertura del
100 %, 0 GAP PLAN, 0 anomalías bloqueantes, 0 casos huérfanos**, y una regla nueva
—`automatizacion_sin_motivo`— **que se estrena en cero**: los 85 casos con grado distinto
de `high` llevan los 85 su motivo.

**Corrijo aquí otra cifra de 1.0.0.** Yo decía «`A-05-01` en 3 requisitos»; en 1.5.0
**`A-05-01a` está cerrado** y lo que queda es `A-05-01b` sobre **2 requisitos** (REQ-055 y
REQ-073), esperando el evolutivo de Q-14 y Q-15. `critico_caso_unico` sigue en **17
requisitos**, sin cambios en número ni en composición.

Los avisos vivos —`A-05-01b`, `A-05-03`, `A-05-04`, `A-05-06` y los tres nuevos
`A-05-08`, `A-05-09` y `A-05-10`— **son correcciones de A-02, A-03, A-06 o S-12**, no
mejoras técnicas del producto. El único que roza mi terreno es `A-05-10`, y su mitad
técnica **ya está aceptada como MEJ-001**. **La cobertura tampoco ha producido ninguna
propuesta en esta versión.**

## 6. Hallazgos para otras piezas

Cinco, los mismos de 1.0.0, actualizados con lo que ha pasado desde entonces. Ninguno lo
desarrollo y ninguno toca el documento de su dueño.

### 6.1 → `A-15` · Los mensajes de error llegan siempre en catalán · **encaminado**

**El hecho, verificado en el código:** los 70 literales de error de `server/routes/*.js`
están en catalán fijo, y `client/src/services/api.ts` los muestra tal cual. No pasan por
`i18n` en ningún punto. **Y `REQ-076` dice que «la interfaz se presenta en castellano
mientras el usuario no elija otro idioma»**.

**Qué ha hecho A-15 con él.** Lo ha valorado y **lo ha devuelto a `A-14` como defecto, no
como funcionalidad ausente** (DOC-25 1.1.0): «REQ-076 ya exige la interfaz en castellano por
defecto, así que es defecto y no hueco de producto». **Me parece bien y no lo discuto**: la
distinción no era mía y ya dije en 1.0.0 que podía ser lo uno o lo otro. El hallazgo queda
cerrado por mi parte y sigue vivo en 6.2, que es su destino real.

**Lo que no cambia:** MEJ-002 sigue siendo el habilitador técnico y **deliberadamente no
cambia ningún texto**. Que el aviso salga en el idioma elegido no es mío.

### 6.2 → `A-14` (o `A-10`) · Posible defecto no censado, mismo hecho

Lo de 6.1 desde el otro lado, y ahora con dos piezas apuntando al mismo sitio: A-15 lo ha
devuelto aquí en DOC-25 1.1.0. **No lo he ejecutado**: es lectura de código en el commit
`44748fb`. Es un candidato a `BUG-005` y **no está en DOC-24**. Reproducción sugerida:
interfaz en castellano, guardar un cliente sin nombre, leer el aviso (`clients.js:24`,
«El camp nom és obligatori»).

### 6.3 → `A-15` · El módulo de Configuración · **ya tiene número**

A-15 lo tenía identificado desde su 1.0.0 como **`FUN-003`** y confirma en 1.1.0 que mi
hallazgo no necesitaba identificador nuevo. Lo dejo anotado sólo para que conste que lo he
visto y que **no he propuesto nada sobre él**: un módulo sin desarrollar es funcionalidad,
no una mejora.

### 6.4 → `S-12` / propietario de `registro-ids.json` · **una mitad resuelta, otra abierta y creciendo**

1. **Lo que pedí en 1.0.0 está hecho.** El registro tiene hoy **310 anclas**, `MEJ-001` a
   `MEJ-006` están censadas con su estado, y `owners` declara
   `"MEJ-*": "A-12 mejoras y roadmap"`. `DOC-07/3.10` lo confirma y `validate` sale en
   código 0. **A-12 no ha tocado el registro** en ninguna de las dos versiones.
2. **Lo que sigue abierto, y ahora con una consecuencia concreta.** `sync` **no sobrescribe
   el estado de un ancla ya censada**, que es la conducta correcta y deliberada. La
   comprobación de esta versión da **6 encontradas, 0 añadidas, 0 colisiones**, pero
   **MEJ-001, MEJ-003 y MEJ-005 siguen figurando como `proposed` en el registro** mientras
   este documento las declara `accepted`. La fuente de verdad del estado es DOC-16; quien
   custodie el registro decide si lo refleja allí. **No lo he hecho yo.**
3. **La mitad grande de `A-05-06` sigue abierta y ha crecido**: 34 entradas protegidas
   solo por el orden de las claves, en dos documentos en vez de uno. Sigue siendo de S-12.

### 6.5 → `A-03` · Un dato del plan que la automatización no puede honrar

`DOC-23-INFORME` lo dice: TC-048 referencia la pieza `FIL-001` con stock 40 y **esa pieza
no existe** en el seed. DOC-05 §5 ya lo ha convertido en tres encargos para `S-06`/DOC-13.
Lo anoto porque **MEJ-005, que ya está aceptada, se apoya en que esos datos existan**: si
S-06 no se ejecuta, el mecanismo de reposición repondrá un estado que no corresponde a
ningún caso. Con la aceptación de ayer esto ha dejado de ser una nota y es una dependencia
de trabajo decidido.

## 7. Bloque estructurado

```yaml roadmap
version: 1
project: app-taller
run:
  date: 2026-08-17
  kind: decision_record          # no es una ronda de análisis: no se propone nada nuevo
  first_run: false
  previous_doc_version: 1.0.0
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  inputs_absent: [DOC-17-DEUDA-TECNICA.md, DOC-20-RALLY-STATE.json, DOC-19-RALLY-TESTCASES.csv, DOC-03-API.md]
  ids_granted_by: S-12
  ids_requested_this_run: 0
decision:
  date: 2026-08-17
  by: propietario del proyecto
  accepted: [MEJ-001, MEJ-003, MEJ-005]
  rejected: []
  still_proposed: [MEJ-002, MEJ-004, MEJ-006]
improvements:
  - id: MEJ-001
    title: Identificadores estables de prueba en la interfaz
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    what: >-
      Añadir un atributo de prueba estable a los elementos que hoy sólo se localizan por
      su rótulo visible: formulario de línea de albarán y apartados de relación de las fichas.
      No cambia ninguna pantalla, ningún flujo ni ningún texto.
    value: >-
      33 de los 110 casos dejan de depender de rótulos visibles; elimina la clase de flake
      que ya se produjo en la prueba acotada de S-10 y baja el coste de mantener la suite.
    source: evidence
    evidence_refs:
      - DOC-05/4.11/familia-formulario-de-linea-14-casos
      - DOC-05/4.11/familia-apartado-sin-identificador-19-casos
      - DOC-23-INFORME/defectos-2-y-4-del-codigo-generado
      - codigo/client-src-sin-ninguna-ocurrencia-de-data-testid
      - DOC-07/A-05-10
    evidence_change_since_1_0_0: reforzada
    evidence_change_note: >-
      DOC-07 1.5.0 abre A-05-10, que cuenta la misma causa medida por A-03, S-10 y A-04 a la
      vez y asigna el identificador estable a «quien mantenga la aplicación». Llegó después
      de la decisión y no la cambia: solo confirma que la evidencia seguía creciendo.
    components: [albarans-pages, clients-pages, vehicles-pages, factures-pages, personal-pages, shared-components]
    impact: low
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    risk_if_not_done: >-
      La suite se está escribiendo ahora; cada Page Object escrito contra un rótulo habrá
      que rehacerlo. Aceptarla no detiene ese reloj: solo lo detiene ejecutarla.
    enters_cycle_via: A-07
    note: >-
      Trabajo técnico interno sin ambigüedad de negocio: no pasa por A-06. La estimación es
      de A-08 cuando entre en el ciclo. A-12 no la volverá a proponer en ninguna ronda.
  - id: MEJ-002
    title: Catálogo único de los literales de error del servidor
    status: proposed
    what: >-
      Extraer los 70 mensajes de error incrustados en las rutas a un módulo único con un
      código estable por mensaje, y devolver ese código junto al texto. No traduce ni
      reescribe ningún literal.
    value: >-
      Da a 34 casos un ancla que no se mueve al retocar la redacción de un aviso, y crea el
      punto único desde el que se podría decidir después qué hacer con esos textos.
    source: evidence
    evidence_refs:
      - DOC-05/4.11/familia-literal-del-aviso-25-casos-34-con-solapamiento
      - codigo/70-literales-en-server-routes
      - codigo/client-src-services-api.ts-propaga-body.error-tal-cual
      - specs/01-esquelet-app-taller.md:102
    evidence_change_since_1_0_0: unchanged
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, api-client]
    impact: medium
    difficulty: low
    urgency: low
    size: medium
    confidence: medium
    risk_if_not_done: >-
      34 casos automatizados quedan anclados a textos que nadie ha declarado estables.
    note: >-
      Devolver un `code` es un cambio aditivo del contrato de API y debe pasar por A-07;
      DOC-03 no existe. La mitad interna (el módulo de catálogo) no toca ningún contrato.
      Sin decidir el 2026-08-17: esperando decisión, no descartada. DOC-07/A-05-10 asigna a
      A-02 la mitad documental (documentar los literales en DOC-04), que no es esta mejora.
    enters_cycle_via: A-07
  - id: MEJ-003
    title: Suite de pruebas automáticas del servidor y CI mínima
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    what: >-
      Montar pruebas automáticas sobre la API del servidor, empezando por las reglas de
      dinero (totales, IVA, numeración, bloqueos de borrado), y una CI que las ejecute en
      cada cambio. No sustituye a los 110 casos de DOC-05.
    value: >-
      Es la única red del proyecto en la capa donde están los cuatro defectos, justo antes
      de que cuatro evolutivos ya decididos toquen el ciclo del dinero.
    source: evidence
    evidence_refs:
      - DOC-02/testing/frameworks-vacio-test-files-0-coverage-0-ci-none
      - DOC-24/summary/4-defectos-hallados-ejecutando-a-mano
      - DOC-23-INFORME/los-cuatro-defectos-aparecieron-ejecutando
      - DOC-07/A-05-03
      - DOC-24/validated_ok/reglas-de-calculo-verificadas-una-vez-a-mano
    evidence_change_since_1_0_0: unchanged
    supersedes_decision:
      what: specs/01-esquelet-app-taller.md:48 excluyó la suite de tests; DOC-02/Q-04 la recoge
      why_revoked: >-
        No es un cambio de criterio, son tres hechos posteriores: (1) cuatro defectos
        confirmados, dos `critical`, dos de ellos encadenados en una factura de 114.835,05 €
        a un cliente equivocado; (2) el sistema pasó de un esqueleto con un módulo piloto a
        79 requisitos y 110 casos, que no se verifican a mano en cada cambio; (3) cuatro
        evolutivos ya decididos por negocio (Q-02, Q-06, Q-10, Q-12) van a tocar las reglas
        de escritura del ciclo del dinero. La decisión de SPEC 01 era razonable para el
        sistema de entonces y queda superada por los hechos, no invalidada retroactivamente.
      pending: >-
        specs/01 sigue diciendo lo contrario en el papel. Si alguien lo actualiza, debería
        citar MEJ-003; mientras no ocurra, este apartado es lo único que explica la contradicción.
    partial_mitigation_already_in_place: >-
      DOC-07 1.5.0 (A-05-03) registra que la vigilancia de los cuatro defectos vive en
      DOC-23-AUTOMATION con un TC-900 en rojo sobre BUG-001, fuera de Rally. Es real y no
      sustituye a esta mejora: es de extremo a extremo, no cubre la capa donde se escribe la
      regla, y con `ci: none` solo vigila cuando alguien la lanza a mano.
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection, db-migrate, db-numbering]
    impact: low
    difficulty: medium
    urgency: high
    size: large
    confidence: medium
    risk_if_not_done: >-
      Los cuatro evolutivos entran a mano sobre 877 líneas de rutas sin ninguna red, y la
      métrica «100 % de cobertura, todo verde» se presenta sin el matiz que la hace cierta.
    depends_on: [MEJ-006]
    blocked_note: >-
      MEJ-006 sigue `proposed`. Las primeras pruebas de servidor se pueden escribir sin ella;
      una CI reproducible no: better-sqlite3 es nativo y se recompila con cada versión de Node.
    note: >-
      Trabajo técnico interno sin ambigüedad de negocio: no pasa por A-06. La estimación es
      de A-08 cuando entre en el ciclo. A-12 no la volverá a proponer en ninguna ronda.
    enters_cycle_via: A-07
  - id: MEJ-004
    title: Un sitio donde vivan las reglas de escritura
    status: proposed
    what: >-
      Extraer de los routers la validación de entrada y las reglas de negocio a un módulo
      por dominio. Mueve las reglas que ya existen; no añade ninguna. Las nuevas son los
      evolutivos de Q-02, Q-06, Q-10 y Q-12, que no son de A-12.
    value: >-
      Ataca la causa común de los cuatro defectos confirmados y hace que los cuatro
      evolutivos aterricen en un sitio con dueño en vez de en cuatro parches.
    source: evidence
    evidence_refs:
      - DOC-24/BUG-001
      - DOC-24/BUG-002
      - DOC-24/BUG-003
      - DOC-24/BUG-004
      - DOC-02/Q-06
      - codigo/877-lineas-y-84-res.status-en-server-routes
    evidence_change_since_1_0_0: unchanged
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection]
    impact: high
    difficulty: high
    urgency: medium
    size: large
    confidence: medium
    risk_if_not_done: El quinto defecto de la misma familia; los cuatro primeros tampoco se sabían.
    depends_on: [MEJ-003]
    note: >-
      Sin decidir el 2026-08-17. Sigue sin poder ir antes que MEJ-003, pero desde la decisión
      esa condición ya no cuelga de una propuesta sin decidir: MEJ-003 está aceptada, así que
      es secuencia de trabajo. Recomendación de A-12: hacerla con el primer evolutivo y
      acotada a su dominio, lo que exige que A-07 lo contemple en el análisis de impacto de
      ese primero.
    enters_cycle_via: A-07
  - id: MEJ-005
    title: Estado de base reproducible entre escenarios
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    what: >-
      Dar a la automatización una forma barata de dejar la base en un estado conocido:
      reconstrucción desde el seed y, si se quiere, restauración por escenario.
    value: Que un rojo signifique un defecto. Condición para que la suite en construcción sirva.
    source: evidence
    evidence_refs:
      - DOC-23-INFORME/estado-del-catalogo-al-terminar-stock-966
      - DOC-23-INFORME/los-escenarios-no-son-independientes
      - DOC-05/incidente-TC-040-TC-048-tres-ejecuciones
      - DOC-05/4.10/54-casos-con-touches-14-recursos
      - DOC-24/test_data_left_behind
    evidence_change_since_1_0_0: unchanged
    components: [db-seed, db-migrate, db-connection]
    impact: low
    difficulty: low
    urgency: high
    size: small
    confidence: high
    risk_if_not_done: >-
      El equipo aprende que los rojos de esta suite no significan nada. Ya ha ocurrido una
      vez con TC-048 y costó tres ejecuciones.
    depends_on: [MEJ-006]
    blocked_note: >-
      MEJ-006 sigue `proposed`. La reconstrucción desde el seed no la necesita; apuntar a
      una base distinta de la de desarrollo, sí. A-07 tiene que resolverlo: o se decide
      MEJ-006, o se acota MEJ-005 a la parte que funciona sobre la base actual.
    note: >-
      El contenido de los datasets es de S-06/DOC-13; aquí sólo el mecanismo de reposición.
      Trabajo técnico interno: no pasa por A-06. La estimación es de A-08. A-12 no la
      volverá a proponer en ninguna ronda.
    enters_cycle_via: A-07
  - id: MEJ-006
    title: Fijar la versión de Node y hacer configurable la ruta de la base
    status: proposed
    what: >-
      Declarar `engines` y `.nvmrc`, y leer la ruta de la base de una variable de entorno
      con el valor actual como valor por defecto.
    value: >-
      Habilitador de MEJ-003 y de MEJ-005, que desde el 2026-08-17 están las dos aceptadas:
      better-sqlite3 es nativo y se recompila con cada versión de Node, y la reposición de
      base necesita poder apuntar a otra ruta.
    source: opinion
    evidence_refs:
      - DOC-02/Q-01
      - DOC-02/Q-02
      - codigo/package.json-sin-engines-y-sin-.nvmrc
      - codigo/server-db-index.js:5-6-DB_PATH-codificada
    evidence_change_since_1_0_0: unchanged
    components: [db-connection, server-app]
    impact: low
    difficulty: low
    urgency: low
    size: small
    confidence: high
    risk_if_not_done: >-
      Ha dejado de ser sólo teórico: la CI reproducible de MEJ-003 y la parte de MEJ-005 que
      apunta a otra base no se pueden hacer sin esto, y las dos están decididas.
    blocks: [MEJ-003, MEJ-005]
    note: >-
      Sin decidir el 2026-08-17. Sigue marcada `opinion` a propósito: los dos hechos están
      verificados en el código, pero ningún dato mide que hayan causado un problema. Que dos
      aceptadas la necesiten le da una razón práctica para ir antes, no evidencia.
      El impacto es `low` sólo porque el cambio es aditivo y conserva el valor por defecto.
    enters_cycle_via: A-07
considered_not_proposed:
  - what: Condición de carrera y orden textual en `generateNumero` (DOC-02/Q-03)
    why: >-
      SPEC 01:50 excluye el acceso multiusuario simultáneo, better-sqlite3 es síncrono en
      un único proceso, y el orden textual sólo rompe en el número 10.000. DOC-24 verificó
      la numeración como correcta. Proponerlo sería fabricar trabajo.
  - what: Las correcciones de BUG-001 a BUG-004
    why: Evolutivos ya decididos por negocio el 2026-08-16 (Q-02, Q-06, Q-10, Q-12); entran por A-06/A-07.
  - what: Fragilidad del extractor de S-12 (DOC-07/A-05-06)
    why: >-
      No es código de app-taller y su componente no existe en el grafo de DOC-02; A-05 ya le
      asignó dueño y recomendación en DOC-07 §3.7. Va a findings_for_others. Cifra corregida
      por su autor en 1.5.0: no eran 19 colisiones en DOC-05 sino 15, y la exposición total
      es hoy de 34 repartidas entre DOC-05 (15) y DOC-06 (19).
  - what: Huecos de cobertura
    why: >-
      DOC-07 1.5.0: cobertura 100 %, 0 GAP PLAN, 0 bloqueantes, 0 huérfanos y
      `automatizacion_sin_motivo` estrenándose en cero. Los avisos vivos son correcciones de
      A-02, A-03, A-06 o S-12, no mejoras técnicas del producto; la mitad técnica del único
      que roza este terreno, A-05-10, ya está aceptada como MEJ-001.
corrections_to_previous_version:
  - what: A-05-06 en DOC-05
    was: 19 colisiones bloqueantes
    now: 15 en DOC-05 y 19 en DOC-06, 34 en total
    source: DOC-07 1.5.0 §3.7 — corrección de una medición propia de A-05
  - what: alcance de A-05-01
    was: 3 requisitos
    now: 2 (A-05-01b, REQ-055 y REQ-073); A-05-01a cerrado
    source: DOC-07 1.5.0 §3.3
  - what: declaración de DOC-07 en `inputs`
    was: dos entradas, una de ellas sin versión (documento y matriz por separado)
    now: una sola entrada, versión 1.5.0, con la matriz como `companion_file`
    source: aviso de A-05
findings_for_others:
  - target: A-15
    status: encaminado
    note: >-
      Los 70 literales de error del servidor están en catalán fijo y api.ts los muestra tal
      cual, mientras REQ-076 exige castellano por defecto. A-15 lo ha valorado en DOC-25
      1.1.0 y lo ha devuelto a A-14 como defecto, no como funcionalidad ausente. A-12 lo da
      por cerrado por su parte y lo mantiene vivo en el hallazgo dirigido a A-14.
  - target: A-14
    status: abierto
    note: >-
      Candidato a BUG-005 no censado en DOC-24, ahora señalado por dos piezas (A-12 y A-15).
      No reproducido por A-12: es lectura de código en 44748fb. Reproducción sugerida:
      interfaz en castellano, guardar un cliente sin nombre, leer el aviso (clients.js:24).
  - target: A-15
    status: encaminado
    note: >-
      Módulo de Configuración sin desarrollar (DOC-05 §4.9, TC-110). A-15 confirma en DOC-25
      1.1.0 que ya era FUN-003 desde su 1.0.0 y que no necesitaba identificador nuevo.
  - target: S-12
    status: parcialmente resuelto
    note: >-
      (1) Resuelto: el registro tiene 310 anclas, MEJ-001 a MEJ-006 censadas y `owners`
      declara `MEJ-*`; DOC-07/3.10 lo confirma con `validate` en código 0. (2) Abierto y
      nuevo: `sync` no sobrescribe estado —conducta correcta—, así que MEJ-001, MEJ-003 y
      MEJ-005 siguen como `proposed` en el registro mientras este documento las declara
      `accepted`. La fuente de verdad del estado es DOC-16; quien custodie el registro decide
      si lo refleja. A-12 no ha tocado el registro. (3) Sigue abierta y ha crecido la mitad
      grande de A-05-06: 34 entradas protegidas solo por el orden de claves, en dos documentos.
  - target: A-03
    status: abierto
    note: >-
      TC-048 referencia la pieza FIL-001 con stock 40, que no existe en el seed (DOC-23).
      DOC-05 §5 ya lo ha convertido en tres encargos para S-06. Con MEJ-005 aceptada esto
      deja de ser una nota y pasa a ser dependencia de trabajo decidido.
registry_check:
  command: registry.js sync registro-ids.json --doc docs/DOC-16-ROADMAP.md --block roadmap --dry-run
  found: 6
  added: 0
  collisions: 0
  note: >-
    `sync` no sobrescribe el estado de las anclas ya censadas: en el registro los seis MEJ
    siguen como `proposed`. Reflejar `accepted` en el registro es decisión de su custodio.
summary:
  new: 0
  accepted_this_round: 3
  still_open: 3
  rejected_respected: 0
  rejected_total: 0
  considered_not_proposed: 4
  findings_for_others: 5
  recommended_top3_among_undecided: [MEJ-006, MEJ-004, MEJ-002]
  never_propose_again: [MEJ-001, MEJ-003, MEJ-005]
```
