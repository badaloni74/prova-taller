---
doc_id: DOC-16
doc_name: DOC-16-ROADMAP
version: 2.1.0
status: draft
generator: A-12 mejoras/roadmap
generator_version: "1.1"
generated_at: 2026-08-22T14:10:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: b2a8d7706df4fef373b87a144fe4be6cfbc94390
  working_tree_clean: false
inputs:
  - id: DOC-16-ROADMAP.md
    from: A-12
    version: 2.0.0
    hash: sha256:17ab7298e9eb2db441d6d5d5b4b0b8e5b515fe0ddd00fbbc84a004d2bb43991a
    present: true
  - id: DOC-02-TECNICA.md
    from: S-01
    version: 1.0.0
    hash: sha256:735feb13b7b0774ca1b370a8d1659ee9c7d145f6d8a52f35dc486491953bd7f1
    present: true
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:cd248197d27e59d213b0228ccf07178bcf1c13c456549419079f967aa3588926
    present: true
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    version: 1.7.0
    hash: sha256:5886d815ce76903589494440a479fd244fc28f768f44a4c8c48b8cf8e563451a
    present: true
  - id: DOC-14-EXPLORATORIO.md
    from: A-10
    version: 1.0.0
    hash: sha256:447e44d8c89854907a32e552fb32b4b91c1e79c68285f89d6fd9c892011bd090
    present: true
  - id: DOC-23-INFORME.md
    from: S-10
    version: 2.0.0
    hash: sha256:1ba0743c9461ac60f35a00ccc42f12dbaeac25f40d99992bd469d6efe968208e
    present: true
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    version: 1.1.1
    hash: sha256:b9070b120a46eb1a4a17f99eb9983270828b597ce41e8d4cda8b8204c7591b8a
    present: true
  - id: registro-ids.json
    from: S-12
    version: "1"
    hash: sha256:afca8a7f31c6da308a6c7060e52beda89419727ed4278787b87ab2ea1f232b3f
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
> `status: draft`. Tres mejoras están decididas y cinco esperan decisión. **Las decide una
> persona, no A-12.**

## Procedencia

Cómo se han usado las entradas, por qué la versión es la que es y qué se ha decidido en
esta ronda sobre la forma del propio documento.

**El front-matter ha adelgazado a propósito, y el motivo sale de una entrada.** Las
versiones 1.0.0 y 2.0.0 llevaban en el front-matter un bloque `counts`, un bloque
`decision` y un campo `usage` por cada entrada de `inputs`. `DOC-07/A-05-12` acaba de
documentar exactamente ese modo de fallo en otro documento —DOC-05 declara `ui: 109` en su
resumen de front-matter mientras su propio YAML dice 106— y lo llama por su nombre: **un
dato derivado que deja de derivarse; un caché que nadie invalida**. Este documento corría
el mismo riesgo, así que el front-matter se queda con lo que `S-16` necesita para calcular
obsolescencia —`doc_id` e `inputs` con `version` y `hash`— y todo lo demás baja al cuerpo,
donde se puede matizar y donde nadie lo confunde con un contrato. Los recuentos están en el
apartado 7, contados sobre las fichas.

**Se corrige además el aviso de `S-16` sobre este documento:** 2.0.0 declaraba `DOC-23`
**sin versión**, y una entrada sin versión queda exenta del control de obsolescencia sin
que nadie lo note. Aquí va como `DOC-23-INFORME.md` **2.0.0**, con su hash y en su ruta
nueva (`docs/`, no `automation/ui/`).

**Qué se ha leído de cada entrada.**

- **`DOC-02` 1.0.0** — bloque `graph` (33 componentes, 58 aristas) para el impacto de cada
  mejora, bloque `testing` y preguntas Q-01 a Q-06. Mismo hash por cuarta versión
  consecutiva. **Con una advertencia que ahora importa:** `DOC-07/7.2` documenta **tres
  aristas reales que faltan en ese grafo**, y una de ellas —`albarans-pages →
  shared-components`— cae justo debajo de una de las mejoras nuevas. Consta en la ficha de
  MEJ-007, porque el impacto sale del grafo y el grafo se sabe incompleto.
- **`DOC-05` 1.6.0** — apartados 4.11 y 4.10. Releído antes de reutilizar sus cifras:
  «Literal del aviso» **25**, «Formulario de línea» **14** y «Apartado de ficha o lista sin
  identificador» **19** siguen diciendo lo mismo que en 1.4.1. La reclasificación de
  TC-045, TC-063 y TC-064 a `service` no mueve ninguna cifra que este roadmap cite.
- **`DOC-07` 1.7.0** — cobertura, `A-05-03` y su nuevo `A-05-03b`, `A-05-11`, `A-05-12`,
  §5.5 y §7.2. Leído por tramos.
- **`DOC-14` 1.0.0 y `DOC-23` 2.0.0** — **entradas nuevas, y la evidencia que justifica
  esta versión.** No existían cuando se escribió 2.0.0.
- **`DOC-24` 1.0.0** — mismo hash. Los cuatro defectos siguen censados ahí; que dos estén
  corregidos lo dice `DOC-14`, no `DOC-24`, y eso también se anota.
- **`DOC-25` 1.1.1** — no consumida como evidencia: solo para comprobar que nada de lo que
  este documento manda a `A-15` está ya propuesto allí. **No lo está**: FUN-001 a FUN-008
  no cubren ninguno de los tres hallazgos del apartado 6.1.
- **`registro-ids.json`** — 311 anclas. Se han pedido los identificadores nuevos a `S-12`
  (`registry.js next registro-ids.json --prefix MEJ --count 4` → «6 existentes, máximo 6;
  siguientes libres: **MEJ-007, MEJ-008**, MEJ-009, MEJ-010»). Se usan los dos primeros.
  **A-12 no ha tocado el registro.**
- **Código fuente** — releído en el commit `b2a8d77`, que es HEAD y **ya no es el
  `44748fb` sobre el que se verificaron las citas de 1.0.0**. Todas las cifras de código de
  este documento se han vuelto a contar; las que se han movido están señaladas. No se
  declara como entrada de `inputs` porque su versión es el `commit_sha` de `source`.
- **`DOC-17` (S-05) sigue sin existir.** Por tercera versión consecutiva este roadmap se
  escribe **sin que nadie haya analizado la deuda técnica del proyecto**. Toda su evidencia
  procede de defectos, exploración, cobertura, automatización y lectura de código.

## 1. Qué ha cambiado desde el roadmap anterior

**No es la primera ejecución, y esta vez hay evidencia nueva de verdad.** Dos documentos
que no existían el 2026-08-17 y que miden, cada uno por su lado, cosas que este roadmap
solo podía suponer:

| Entrada nueva | Qué aporta |
|---|---|
| **`DOC-23-INFORME` 2.0.0** (S-10) | La suite pasó de 4 escenarios acotados a **102 de los 110 casos**: 107 escenarios, **106 verdes y 1 rojo** |
| **`DOC-14-EXPLORATORIO` 1.0.0** (A-10) | **26 hallazgos** de exploración libre: 1 `critical`, 4 `high`, 17 `medium`, 4 `low` |

Y algo que **no** ha ocurrido: **las tres mejoras aceptadas el 2026-08-17 siguen sin pasar
por `A-07`**. Cinco días después, MEJ-001, MEJ-003 y MEJ-005 están decididas y paradas. No
es un reproche: es el dato que explica por qué dos de ellas aparecen aquí con la evidencia
crecida y el coste subido.

### 1.1 Qué le ha pasado a MEJ-003, que es la pregunta con más consecuencias

**Sigue `accepted` y NO está implementada.** Lo que ha aparecido no es lo que pedía.

MEJ-003 pedía dos cosas: **pruebas automáticas sobre la API del servidor** y **una CI que
las ejecute en cada cambio**. Lo verificado hoy en el repositorio, commit `b2a8d77`:

| Lo que pedía MEJ-003 | Estado real hoy | Comprobación |
|---|---|---|
| Pruebas sobre la API del servidor | **No existe ninguna** | `find server -name "*.test.js" -o -name "*.spec.js"` → 0 ficheros |
| CI que las ejecute en cada cambio | **No existe** | no hay `.github/`, ni `.gitlab-ci.yml`, ni ningún otro descriptor |
| Poder lanzarlas de forma estándar | **No existe** | ninguno de los tres `package.json` (raíz, `server`, `client`) declara un script `test` |

Lo que sí ha aparecido es **la suite de interfaz de S-10**: 8 ficheros `.feature`, 26
clases Java, 102 casos automatizados y una ejecución completa con 106 verdes. **Es mucho,
es real, y no es lo que MEJ-003 compraba.** Tres datos citables explican por qué el
problema que atacaba no ha desaparecido:

1. **`DOC-07/3.4` (A-05-03) sigue en pie y ha crecido a 6 requisitos.** Los cuatro defectos
   de DOC-24 tienen cobertura formal `Correcto` y **ningún caso los detecta**; los cuatro
   se reprodujeron por servicio y los siete casos que los cubren son `ui`.
2. **`DOC-07/3.4` abre `A-05-03b`, y es peor que lo anterior.** `TC-073` y `TC-075` llevan
   el IVA en el título, están **en verde en DOC-23 2.0.0** y no lo comprueban en ningún
   paso, sobre dos requisitos —REQ-051 y REQ-053— que el sistema **no cumple**
   (`DOC-14/EXP-007`: la ficha de la factura no muestra el importe del IVA en ninguna
   parte; la cuota de 20,66 € no aparece). Una suite verde de extremo a extremo no es la
   red que MEJ-003 pedía.
3. **`ci: none` sigue siendo cierto.** Los 107 escenarios corren cuando alguien se sienta a
   lanzar `mvn test`, con el procedimiento manual de cuatro pasos que documenta `DOC-23/2`
   —incluidos un `curl` para crear el vehículo fixture y una edición temporal de
   `vite.config.ts`—.

**Conclusión, y es evidencia, no opinión: MEJ-003 no se toca, no se repropone y no se
trocea.** Sigue `accepted` y sigue entera. Lo que ha cambiado es que **su mitad de CI vale
hoy bastante más que el 17 de agosto**: entonces la CI no tenía casi nada que ejecutar; hoy
tiene 107 escenarios que solo corren a mano. Es un dato para `A-07`.

### 1.2 Qué les ha pasado a las otras dos aceptadas

**MEJ-001 · el reloj que avisaba ha corrido, y alguien ha pagado.** Su ficha de 1.0.0
decía: «la suite se está escribiendo ahora mismo (DOC-23 tiene 4 casos de 110 hechos): cada
Page Object escrito contra un rótulo se rehará después, y el coste crece con lo
automatizado». **Se ha escrito.** Verificado en `automation/ui/src`: 26 clases Java, 8
`.feature`, **20 localizadores `By.xpath` —18 de ellos con `normalize-space`— frente a 1
solo `By.id` y 1 `By.cssSelector`**. Dos pruebas de que la suite depende estructuralmente
de que la aplicación **no** tenga identificadores:

- `automation/ui/src/main/java/com/qa/taller/Plantillas/BasePO.java:76` localiza un campo
  con `By.xpath("//input[@type='text' and not(@id)]")`. **Es un localizador cuya condición
  es la ausencia del identificador que MEJ-001 quiere añadir.**
- `automation/ui/src/main/java/com/qa/taller/AlbaraDetallPO.java:12`, comentario del propio
  autor de la suite: «el formulario de líneas (`AlbaraLiniesSection.tsx`) no declara ningún
  `id` ni `data-testid`. Los localizadores van por proximidad de etiqueta visible, que es
  el único anclaje estable disponible hoy. Si la aplicación cambia los textos de interfaz,
  esta PO se rompe».

MEJ-001 **no cambia de estado y no se repropone**. Pero su alcance de ejecución ya no es
solo la aplicación: hacerla obliga a revisar localizadores de S-10, y al menos uno
—`not(@id)`— **se rompe precisamente al hacerla bien**. Es coordinación para el análisis de
impacto, no una razón para no hacerla.

**MEJ-005 · su evidencia ha crecido y ahora tiene nombre y apellidos.** El único caso rojo
de la suite completa es **TC-048**, y `DOC-23/4` identifica la causa raíz: no es un defecto
de la aplicación, es que **TC-040 consume 2 unidades de la misma pieza y nunca las
devuelve**, así que TC-048 llega con el stock a 33 y espera 35. Es literalmente el
escenario que MEJ-005 nombró en 1.0.0, con el mismo par de casos. Además `DOC-23/7` deja
constancia de que el vehículo fixture `8001TST` y los datos que generan los escenarios de
facturas, albaranes y nóminas **se quedan en la base**. **1 rojo de 107, y el 100 % de ese
rojo es falta de aislamiento.**

### 1.3 Los defectos: dos cerrados, dos abiertos, y cuatro nuevos de la misma familia

`DOC-14`, carta CH-11, volvió sobre lo corregido y lo comprobó en vivo: **`BUG-001` y
`BUG-002` funcionan**. `BUG-003` y `BUG-004` siguen abiertos. `DOC-24` no lo refleja
todavía: sigue en 1.0.0 con los cuatro censados.

**Y la corrección de esos dos defectos confirma el patrón del apartado 3.0 en vez de
desmentirlo.** Recuento de código de hoy contra el de 1.0.0:

| Magnitud | 1.0.0 (`44748fb`) | Hoy (`b2a8d77`) |
|---|---:|---:|
| Líneas en `server/routes/` | 877 | **893** |
| Llamadas a `res.status` | 84 | **86** |
| Literales de error incrustados | 70 | **71** |

Las dos comprobaciones que faltaban se escribieron **en línea, dentro del mismo router**,
que es exactamente donde MEJ-004 sostiene que no deberían vivir.

### 1.4 La cobertura, sin novedad

`DOC-07` 1.7.0: **100,00 % (79 de 79 requisitos, 0 GAP PLAN)**, 0 anomalías bloqueantes, 0
casos huérfanos, CSV idéntico por quinta vez. `A-05-11a` —el que señalaba TC-064— **se
cierra** porque DOC-05 1.6.0 lo reclasificó a `service`. Nacen `A-05-03b`, `A-05-11c` y
`A-05-12`. **Ninguno de los tres produce una mejora técnica:** `A-05-03b` y `A-05-12` son
correcciones de `A-03`, y `A-05-11c` (TC-032, TC-033, TC-047) es una carencia de la
interfaz que `DOC-23/5` describe como funcionalidad ausente —filtro por vehículo o cliente
en el listado de albaranes, campo de precio manual en la línea de pieza—, es decir
**producto, no deuda**. Va al apartado 6.

### 1.5 Lo nuevo de esta ronda

**Dos mejoras: `MEJ-007` y `MEJ-008`.** Las dos salen de `DOC-14`, las dos son
refactorizaciones de código que ya existe y ninguna añade funcionalidad. Los
identificadores los ha dado `S-12`.

**Tres de los hallazgos que `DOC-14` me dirigió explícitamente (`deriva_a: A-12`) NO se
convierten en mejora**, y el apartado 6.1 explica por qué: EXP-017, EXP-019 y EXP-026
cambian lo que el usuario ve y decide —un aviso al abandonar un formulario, una salida en
la pantalla de error, el nombre del registro en el diálogo de borrado—, y eso es
funcionalidad. **Que un hallazgo venga dirigido a A-12 no lo convierte en deuda técnica.**

## 2. Recomendación

Las tres primeras por relación valor/dificultad **entre las cinco que esperan decisión**.
Las tres aceptadas quedan fuera: recomendar lo ya decidido no ayuda a nadie.

| # | Mejora | Por qué ésta |
|---|---|---|
| 1 | **MEJ-007 · Una sola guarda contra el reenvío en los tres puntos de escritura del cliente** | Es la única propuesta viva cuyo respaldo incluye un defecto **`critical`** reproducido: dos clics duplican una línea de albarán y descuentan el stock dos veces (`DOC-14/EXP-002`). Cuesta poco —tres puntos de envío en todo el cliente— y el patrón ya está escrito y funcionando en dos sitios de la misma casa. Sin ella, el arreglo se escribirá tres veces distinto |
| 2 | **MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base** | Sigue siendo la más barata del documento y **sigue bloqueando parcialmente a dos aceptadas**. Lo que ha cambiado desde el 17 de agosto es a peor: cinco días sin decisión, y ahora hay 107 escenarios esperando una CI que, sin versión de Node fijada, no es reproducible —`better-sqlite3` es nativo y se recompila—. **Sigue siendo `opinion` y sigue sin un solo incidente medido**: se recomienda por lo que desbloquea, no por lo que ha roto |
| 3 | **MEJ-008 · Un único sitio donde se dé formato a importes y fechas** | La segunda más barata, con evidencia contada: **15 llamadas a `toFixed` repartidas en 8 ficheros, cero usos de `Intl`, el símbolo `€` incrustado en esos mismos 8 y ni una sola función de formato de fecha en todo el cliente**. Hoy responder a la pregunta P-03 de negocio —coma o punto decimal— cuesta 8 ficheros; con la mejora cuesta uno |

**MEJ-004 sigue siendo la de más valor absoluto del documento y no está en el podio**, y
conviene decir por qué en vez de que parezca un descuido: dificultad `high`, toca los ocho
componentes por los que pasa toda escritura, y su condición previa —MEJ-003— **está
aceptada pero ni siquiera ha entrado en `A-07`**. Refactorizar sin red es cambiar un riesgo
conocido por uno desconocido. Su evidencia, en cambio, es la que más ha crecido de todo el
documento: **de 4 defectos de la misma clase a 8**.

**MEJ-002 queda la última por urgencia, no por valor**, y su evidencia también ha crecido:
`DOC-14/EXP-006` la ha reproducido en los siete módulos con la interfaz en castellano.

## 3. Mejoras

Ocho: seis de rondas anteriores y **dos nuevas**. Siete salen de evidencia con fuente
citable y una de criterio, marcada como `opinion` para poder filtrarla de un vistazo.
Ninguna añade funcionalidad.

### 3.0 El patrón, recontado: de cuatro defectos a ocho, y una segunda mitad en el cliente

La versión 1.0.0 sostenía que **los cuatro defectos confirmados eran el mismo defecto**:
una comprobación ausente en el punto exacto donde el dato se escribe. `DOC-14` ha explorado
el sistema entero sin guion y ha encontrado **cuatro más de la misma clase**:

| Origen | Qué falta | Dónde | Severidad y estado |
|---|---|---|---|
| `DOC-24/BUG-001` | comprobar existencias antes de descontar stock | `albarans-router` | `critical` · **corregido**, verificado en vivo (DOC-14 CH-11) |
| `DOC-24/BUG-002` | comprobar que el vehículo nuevo es del mismo cliente | `albarans-router` | `critical` · **corregido**, verificado en vivo |
| `DOC-24/BUG-003` | precio, coste y stock no negativos | `peces-router` | `high` · abierto |
| `DOC-24/BUG-004` | no hay camino para anular o rectificar una factura | `factures-router` | `high` · abierto |
| `DOC-14/EXP-004` | deducciones mayores que el bruto: neto **−500,00 €** aceptado con `201 Created` | `nomines-router` | `high` |
| `DOC-14/EXP-005` | mes con decimales y año sin límite (`999999`) | `nomines-router` | `medium` |
| `DOC-14/EXP-015` | año de matriculación `2099` y kilometraje `−500`, `201 Created` | `vehicles-router` | `medium` |
| `DOC-14/EXP-016` | longitud y formato: nombre de **281 caracteres** y correo sin arroba, guardados | `clients-router` + `shared-components` | `medium` |

**Ocho de ocho son una comprobación ausente en el punto de escritura.** Ninguno es error de
cálculo, ninguno es fallo de presentación, ninguno es problema de datos. La causa sigue
siendo la que `DOC-02/Q-06` dejó como pregunta abierta —«los routers concentran validación,
negocio y SQL sin capa intermedia»— y que hoy tiene ocho consecuencias medidas en vez de
cuatro. El código lo confirma en HEAD: **893 líneas y 86 `res.status` en `server/routes/`,
sin capa de servicio ni esquema de validación**, y `albarans.js` sigue siendo el más
cargado, con 20 de los 71 literales de error.

**La concentración también sigue.** Según `DOC-07` §5, `albarans` (18 requisitos, 28 casos)
y `factures` (13 requisitos, 19 casos) son **31 de 79 requisitos (39 %) y 47 de 110 casos
(43 %)**, y ahí caen tres de los cuatro defectos de DOC-24. En el grafo de `DOC-02`,
`albarans-router` sigue siendo el componente de API más acoplado: **8 aristas**.

**Lo que `DOC-14` añade y 1.0.0 no podía ver: hay una segunda mitad del mismo problema, y
está en el cliente.** No es la misma que la de los routers y no la arregla MEJ-004:

| Hallazgo | Qué falta | Severidad |
|---|---|---|
| `DOC-14/EXP-002` | el botón no se bloquea mientras la petición está en vuelo: **dos líneas, stock descontado dos veces** | **`critical`** |
| `DOC-14/EXP-001` | lo mismo en el alta de cliente: **dos clientes idénticos, ids 13 y 14** | `high` |

Y una tercera clase, de presentación, que no es de escritura pero sí es el mismo tipo de
deuda —lógica duplicada sin sitio propio—: `DOC-14/EXP-014` (tres formatos del mismo
precio) y `DOC-14/EXP-009` (la fecha del albarán presentada como
`2026-08-21T15:25:05.101Z`).

**De ahí salen las dos mejoras nuevas.** Ni una ni otra corrigen los defectos: los defectos
tienen dueño y es `A-14`. Lo que proponen es **dónde tiene que vivir la corrección para que
no haya que escribirla tres veces**.

---

### 3.1 Nuevas en esta ronda

#### MEJ-007 · Una sola guarda contra el reenvío en los tres puntos de escritura del cliente

| | |
|---|---|
| **Estado** | `proposed` — **nueva**, identificador dado por S-12 |
| **Origen** | `evidence` |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `medium` / `low` / `high` |

**En qué consiste.** Que el envío de un formulario quede bloqueado mientras su petición
está en vuelo, y que ese bloqueo viva **en un solo sitio** en lugar de en cada formulario.
En todo el cliente hay exactamente **tres puntos de envío**: `EntityForm.tsx:90`, que usan
**seis módulos de páginas** (clientes, vehículos, piezas, personal, nóminas y la cabecera
de albarán), `AlbaraLiniesSection.tsx:221` y `FacturaForm.tsx:142`. **No cambia ninguna
pantalla, ningún flujo ni ningún texto**: el botón deja de aceptar la segunda pulsación.

**Qué aporta.** Cierra de una vez una clase de defecto que ya ha producido un `critical`, y
—esto es lo propio de A-12— **evita que la corrección se escriba tres veces distinta**. El
patrón ya existe hecho y probado en esta misma aplicación: `FacturaDetail.tsx:68` y
`NominaDetail.tsx:86` usan `disabled={updating}`. Está aplicado a dos conmutadores de
estado y **a ninguno de los tres puntos donde se crean registros**.

**Evidencia.**

- **`DOC-14/EXP-002`**, severidad **`critical`**, reproducible: doble clic en «Añadir
  línea» de `/albarans/5` produce **dos `POST /api/albarans/5/linies` → 201**, dos líneas
  (ids 8 y 9) con `quantitat 2` y `preu 8.5`, y el stock de la pieza **pasa de 39 a 35**:
  cuatro unidades por dos pulsaciones de una línea de dos. La ficha no distingue el
  duplicado de dos entradas legítimas de la misma pieza, «así que el error es invisible
  salvo que alguien recuente». `DOC-14/1` lo pone como **la primera de las tres razones por
  las que el sistema no se puede entregar**.
- **`DOC-14/EXP-001`**, severidad `high`: doble clic en «Guardar» del alta de cliente crea
  **los ids 13 y 14 con los mismos datos**, y además deja la pantalla descuadrada respecto
  a la URL —la barra marcaba `/clients/14` mientras «Nuevo vehículo» apuntaba a
  `clientId=13`—. Su `hipotesis_causa` señala a `EntityForm.tsx` como componente compartido
  y su `sugerencia` es literalmente **«comprobar si el arreglo de EXP-002 cabe en
  `EntityForm.tsx` y cubre este de paso»**: la pregunta de dónde vive el arreglo, que es la
  que responde esta mejora.
- **Verificado en el código** (A-12, commit `b2a8d77`): `grep -rn 'type="submit"'` en
  `client/src` devuelve **exactamente tres resultados**, ninguno con guarda; `EntityForm`
  lo importan **6 de los 7 módulos de páginas**; y `disabled=` solo aparece en cuatro
  sitios, dos de paginación y dos de conmutador de estado.

**Un tercer punto de envío que nadie ha reproducido, y se dice como lo que es.**
`FacturaForm.tsx:142` es estructuralmente idéntico y **no** está cubierto por ningún
hallazgo: A-10 no llegó a probarlo y lo declara («no verificado»). Emitir dos veces la
misma factura sería el peor caso imaginable de esta familia, pero **es una inferencia de
lectura de código, no un dato**, y no cuenta como evidencia.

**Componentes afectados** (bloque `graph` de `DOC-02`): `shared-components`,
`albarans-pages`, `factures-pages`. **Tres de 33.**

**Por qué el impacto es `medium` y no `low`, contado sobre el grafo y no a ojo.**
`shared-components` declara **1 sola arista entrante** en `DOC-02`, lo que haría pensar en
un componente hoja. **No lo es, y el propio grafo está reconocido incompleto:**
`DOC-07/7.2` documenta que falta la arista `albarans-pages → shared-components`, verificada
por A-07 en `AlbaraForm.tsx:5-7`. Contado sobre el código, `EntityForm` lo consumen **seis
módulos de páginas**, así que un cambio ahí llega a todos los formularios de entidad de la
aplicación. Es aditivo y de bajo riesgo, pero no es local.

**Riesgo de no hacerla.** Que se corrija EXP-002 donde se reprodujo —la línea de albarán— y
queden vivos el alta de cliente y la emisión de factura, que es el desenlace por defecto
cuando tres formularios se arreglan por separado. Y que el duplicado siga siendo invisible:
ninguno de los 110 casos de `DOC-05` prueba una doble pulsación, así que la suite no lo
verá aunque vuelva a pasar.

**Frontera, explícita.** Esta mejora **no es la corrección de EXP-001 ni de EXP-002**: los
dos son defectos, están dirigidos a `A-14` y su corrección entra por donde entren los
defectos. Lo que aporta A-12 es **la decisión de que el mecanismo viva en un sitio**, que
es la que A-10 dejó abierta y no tiene dueño.

**Entra por** `A-07`.

---

#### MEJ-008 · Un único sitio donde se dé formato a importes y fechas

| | |
|---|---|
| **Estado** | `proposed` — **nueva**, identificador dado por S-12 |
| **Origen** | `evidence` |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `medium` / `low` / `medium` |

**En qué consiste.** Extraer a un módulo único del cliente el formato de importe y el de
fecha, y usarlo desde las pantallas que hoy lo resuelven cada una por su cuenta. **No
decide qué formato se usa**: adopta el que ya es mayoritario en la aplicación —dos
decimales y símbolo—, y deja el resto —coma o punto decimal, separador de miles, formato de
fecha— como un cambio de una línea el día que negocio conteste.

**Qué aporta.** Baja el coste de una decisión que ya está formulada y esperando. Hoy
cambiar cómo se presenta un euro son ocho ficheros y quince ediciones; después es una. Y
elimina la divergencia que ya se ha medido entre pantallas de la misma aplicación.

**Evidencia.**

- **`DOC-14/EXP-014`**: el precio de «Filtre d'oli» se muestra como **`8.5` en `/peces`**,
  como **`8.50 €` en `/peces/1`** y como **`8.50 €` en la línea de `/albarans/5`**. Todos
  los importes usan punto decimal (`119.06 €`, `1360.00 €`) y **no hay separador de
  miles**. A-10 lo argumenta sin invadir negocio: «el formato concreto no está documentado
  […] lo que **no** es opinable es la incoherencia interna: el catálogo incumple lo que la
  ficha sí hace, y ambos son la misma aplicación». Su sugerencia es **«una función única de
  formato de importe, usada desde todas las pantallas»**.
- **`DOC-14/EXP-009`**: el listado y la ficha de albaranes presentan la fecha como
  **`2026-08-21T15:25:05.101Z`**, con milisegundos y zona horaria, y afecta también a los
  cuatro albaranes del seed.
- **Verificado en el código** (A-12, commit `b2a8d77`): **15 llamadas a `toFixed`
  repartidas en 8 ficheros** —`AlbaraLiniesSection`, `ClientDetail`, `FacturaDetail`,
  `FacturesList`, `NominaDetail`, `NominesList`, `PecaDetail`, `PersonalDetail`—, el
  símbolo `€` incrustado en esos mismos 8, **cero ocurrencias de `Intl.NumberFormat` o
  `Intl.DateTimeFormat`** y **ninguna función de formato de fecha**: el único tratamiento
  de fecha en todo el cliente es `AlbaraForm.tsx:46`, un `slice(0, 10)` para rellenar el
  campo del formulario.
- **`DOC-14/P-03`**, pregunta abierta a negocio: si los importes deben llevar la coma
  decimal del castellano y del catalán. **Está formulada, sin responder, y su respuesta cae
  entera dentro de esta mejora.**

**Componentes afectados:** `albarans-pages`, `clients-pages`, `factures-pages`,
`nomines-pages`, `peces-pages`, `personal-pages` y `shared-components`, donde aterrizaría
el módulo. **Siete de 33, todos de la capa `ui`**; cada `*-pages` tiene 2 aristas y ningún
componente de `api` ni de `data` se toca. **`vehicles-pages` es el único módulo de páginas
que queda fuera**, porque no presenta ningún importe. El impacto es `medium` por el número
de ficheros tocados, no por la profundidad del cambio.

**Riesgo de no hacerla.** Que P-03 se responda «sí, coma decimal» y la respuesta cueste
ocho ficheros más los literales de los `.feature`; y que cada pantalla nueva siga
inventándose su formato, como ya ha pasado entre el catálogo y la ficha de pieza.

**Cautela que hay que leer antes de aceptarla, y no es menor.** Unificar el formato
**cambia lo que se ve en pantalla** en las pantallas que hoy divergen, y `DOC-14/P-03`
avisa de la consecuencia: los `.feature` de `automation/ui/` validan literales como
`119.06 €` y `98.40 €`. **Ese impacto sobre la suite es de `A-03` y de `S-10`**, y A-07
debería contarlo dentro del alcance en vez de descubrirlo después. La corrección de EXP-009
y EXP-014 **como defectos** sigue siendo de `A-14`: esta mejora solo construye el sitio
donde esa corrección puede escribirse una vez.

**Entra por** `A-07`.

---

### 3.2 Decididas · `accepted` el 2026-08-17

**Las tres siguientes no son propuestas.** Están decididas y **A-12 no las volverá a
proponer en ninguna ronda, ni con este número ni reformuladas ni troceadas.** Lo que sigue
es su estado, no una reproposición.

**Su siguiente paso es `A-07 · Impacto`, y a 2026-08-22 no ha ocurrido con ninguna de las
tres.** Son trabajo técnico interno: no hay ambigüedad de negocio, ninguna pantalla cambia
de comportamiento y ningún requisito se toca, así que **no pasan por `A-06`**. La estimación
es de `A-08` cuando entren en el ciclo; este documento no da horas.

| Mejora | Estado | Qué ha cambiado desde el 17 de agosto |
|---|---|---|
| **MEJ-001 · Identificadores estables de prueba en la interfaz** | `accepted`, sin ejecutar | **Evidencia reforzada y coste subido.** La suite se ha escrito entera contra rótulos: 26 POs, 20 `By.xpath` frente a 1 `By.id`, y un localizador —`BasePO.java:76`, `//input[@type='text' and not(@id)]`— que **se rompe justo al añadir el identificador**. Las tres familias de `DOC-05/4.11` siguen en 25, 14 y 19 casos, y `DOC-07/A-05-10` sigue abierto |
| **MEJ-003 · Suite de pruebas del servidor y CI mínima** | `accepted`, sin ejecutar | **El problema NO ha desaparecido; ver 1.1.** 0 pruebas de servidor, 0 CI, 0 scripts `test`. Lo que ha aparecido es una suite de interfaz que `A-05-03` y el nuevo `A-05-03b` demuestran que **no cubre lo que MEJ-003 compraba**. Su mitad de CI vale más que antes: hay 107 escenarios que solo corren a mano |
| **MEJ-005 · Estado de base reproducible entre escenarios** | `accepted`, sin ejecutar | **Evidencia reforzada, y esta vez ejecutada.** El único rojo de la suite completa (TC-048) es exactamente su escenario: contaminación entre escenarios por TC-040, diagnosticada en `DOC-23/4`. Los datos que la suite deja en la base están inventariados en `DOC-23/7` |

**Las dependencias siguen igual y siguen sin resolverse.** MEJ-003 y MEJ-005 declaran
`depends_on: [MEJ-006]`, y **MEJ-006 sigue sin decidir cinco días después**. Ninguna está
bloqueada del todo, pero la parte reproducible de las dos sí. Es un dato para `A-07`.

---

### 3.3 Esperando decisión · `proposed` desde el 2026-08-16

**Ninguna de estas tres está descartada: están sin decidir.** Sus fichas son las de 1.0.0;
aquí va lo que se ha movido en su evidencia, que en dos de los tres casos es bastante.

#### MEJ-002 · Catálogo único de los literales de error del servidor

| | |
|---|---|
| **Estado** | `proposed` — sin decidir |
| **Origen** | `evidence` · **evidencia crecida** |
| **Tamaño** | `medium` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `medium` / `low` / **`medium`** (era `low`) |

**En qué consiste.** Extraer los mensajes de error hoy incrustados en las rutas a un módulo
único del servidor, cada uno con un código estable, y devolver ese código junto al mensaje.
**El texto no cambia y el idioma tampoco**: es una extracción, no una traducción.

**Qué ha crecido.** En 1.0.0 la evidencia era de plan —25 casos degradados por «Literal del
aviso», 34 con solapamiento— y de lectura de código. **Ahora hay una reproducción en vivo.**
`DOC-14/EXP-006` lo ejecutó en los siete módulos con la interfaz en castellano y recogió
pantallas con los dos idiomas a la vez: «Nòmina no trobada» sobre «Volver a intentarlo»,
«Ja existeix un vehicle amb aquesta matrícula» (409), «El client té vehicles associats i no
es pot esborrar» (409), «Estoc insuficient: hi ha 8 unitats de "Corretja de distribució"»
(409). **Y da el recuento por fichero: albarans 20, nomines 13, vehicles 12, clients 7,
factures 7, peces 6, personal 6 — total 71.** A-12 lo ha vuelto a contar en HEAD y
**coinciden los 71**; la cifra de 1.0.0, 70, era del commit anterior y queda corregida.

**Su `sugerencia` es esta mejora, dicha por otro:** «devolver un código de error estable
desde la API y traducirlo en el cliente: 71 claves nuevas en `client/src/locales/` y un
contrato de error. Decisión previa del propietario».

**La urgencia sube de `low` a `medium`.** No por el texto, sino porque ahora hay **102
casos automatizados** anclados a esos literales, y porque el defecto de idioma está
reproducido y dirigido a `A-14`: cuando se corrija, se corregirá con o sin catálogo, y sin
catálogo se corregirá 71 veces.

**Evidencia previa que sigue en pie.** `DOC-05/4.11` («Literal del aviso», **25** casos, 34
con solapamiento); `client/src/services/api.ts` propaga `body.error` tal cual;
`specs/01-esquelet-app-taller.md:102` fija como convención del proyecto «claus de traducció
en anglès pla amb punts, **mai el text final incrustat al codi**», que se cumple en el
cliente y **no se cumple en las 71 del servidor**. Y `DOC-07/A-05-10` sigue asignando a
`A-02` la mitad documental —documentar los literales en DOC-04—, que **no es esta mejora**:
documentar el literal y tener un sitio único donde vive el literal son cosas distintas.

**Componentes afectados:** los siete routers y, si se decide devolver el código,
`api-client` (8 aristas).

**Riesgo de no hacerla.** Que la corrección del idioma se escriba router a router, y que
102 casos automatizados sigan anclados a textos que nadie ha declarado estables.

**Cautela.** Añadir un `code` a la respuesta **es un cambio del contrato de la API**, aunque
sea aditivo, y `DOC-03` no existe. La mitad puramente interna —el módulo de catálogo— no
toca contrato y se puede hacer sola.

**Entra por** `A-07`.

---

#### MEJ-004 · Un sitio donde vivan las reglas de escritura

| | |
|---|---|
| **Estado** | `proposed` — sin decidir |
| **Origen** | `evidence` · **evidencia duplicada: de 4 defectos a 8** |
| **Tamaño** | `large` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `high` / `high` / **`high`** (era `medium`) |

**En qué consiste.** Extraer de los routers la validación de entrada y las reglas de
negocio a un módulo por dominio, de modo que cada regla tenga un sitio, un nombre y una
prueba. **No añade ni cambia ninguna regla**: mueve las que ya existen.

**Qué ha crecido, y es lo más importante de esta ronda.** La tabla del apartado 3.0:
`DOC-14` ha encontrado **cuatro casos más de la misma clase exacta** —`EXP-004` (`high`,
neto de −500,00 € aceptado), `EXP-005`, `EXP-015`, `EXP-016`—, todos con reproducción por
API y respuesta `201 Created`. **Ocho de ocho defectos de escritura son la misma ausencia.**

**Y hay un segundo dato, más incómodo:** las correcciones de BUG-001 y BUG-002 **se
escribieron en línea dentro de los mismos routers** (893 líneas y 86 `res.status` hoy,
frente a 877 y 84). Funcionan —`DOC-14` CH-11 lo verificó en vivo— y a la vez confirman que
el sistema sigue sin ningún sitio donde una regla pueda vivir con nombre.

**La urgencia sube de `medium` a `high`** por la ventana: cuatro evolutivos decididos por
negocio (Q-02, Q-06, Q-10, Q-12) y, según `DOC-14/6`, **dos preguntas nuevas —P-01 y P-02—
que, si negocio contesta que sí, añaden reglas de rango a nóminas y vehículos**. Todas van
al mismo sitio.

**Evidencia previa que sigue en pie.** `DOC-24/BUG-001` a `BUG-004`; `DOC-02/Q-06`, abierta
desde la Fase 0; `DOC-02/graph`, donde `albarans-router` tiene 8 aristas y `db-connection`
recibe 10 entrantes.

**Componentes afectados:** los siete routers más `db-connection`. **Ocho de 33, y son los
ocho por los que pasa toda escritura.**

**Riesgo de no hacerla.** El noveno defecto de la misma familia. No sé cuál será, y ése es
justamente el argumento: los ocho primeros tampoco se sabían.

**Riesgo de hacerla mal, que sigue siendo igual de real.** Refactorizar los ocho
componentes por los que pasa toda escritura **sin una sola prueba automática de servidor**
cambia un riesgo conocido por uno desconocido. Su ficha sigue diciendo **después de
MEJ-003, no antes**, y MEJ-003 está aceptada pero no ha empezado. **La recomendación de
A-12 —y es recomendación, no decisión— sigue siendo la tercera vía: hacerla con el primer
evolutivo, acotada al dominio que ese evolutivo toque.**

**Entra por** `A-07`.

---

#### MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, y **bloquea parcialmente a dos aceptadas desde hace cinco días** |
| **Origen** | **`opinion`** |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `medium` (era `low`) |

**En qué consiste.** Declarar `engines` y `.nvmrc` con la versión de Node de referencia, y
leer la ruta de la base de datos de una variable de entorno con el valor actual como valor
por defecto.

**Por qué sigue marcada `opinion`.** Los hechos están verificados otra vez en HEAD —ningún
`package.json` declara `engines`, no hay `.nvmrc`, `server/db/index.js:5-6` construye
`DB_PATH` con `path.join(__dirname, '..', '..', 'data')`— y anotados como `DOC-02/Q-01` y
`Q-02`. **Pero sigue sin haber un solo dato que mida que esto haya causado un problema.**
Que la recomiende en segundo lugar no la convierte en `evidence`.

**Qué ha cambiado.** Nada en sus datos; todo en lo que cuelga de ella. Ahora hay **107
escenarios ejecutables** que dependen de un procedimiento manual, y la CI que MEJ-003 tiene
aceptada no puede ser reproducible sin fijar Node: **`better-sqlite3` es un módulo nativo
que se recompila con cada versión**. La urgencia sube por eso.

**Componentes afectados:** `db-connection` (**10 aristas entrantes, el componente más
acoplado del grafo**) y `server-app` (9 aristas), más los `package.json`. El impacto se
mantiene `low` porque **el cambio es aditivo y conserva el valor actual por defecto**: los
diez consumidores no se enteran.

**Riesgo de no hacerla.** La CI reproducible de MEJ-003 y la parte de MEJ-005 que apunta a
otra base **no se pueden hacer sin esto**, y las dos están decididas.

**Entra por** `A-07`.

## 4. Vivas de rondas anteriores

Las cinco `proposed` —tres heredadas y las dos nuevas—, con si su evidencia ha crecido o
menguado. Las citas se han comprobado una a una contra los hashes y el commit actuales.

| Mejora | Evidencia | Qué ha pasado |
|---|---|---|
| **MEJ-002** | **Crecida** | De evidencia de plan a **reproducción en vivo en los siete módulos** (`DOC-14/EXP-006`), con recuento por fichero. La cifra sube de 70 a **71** literales, verificada por A-12 en HEAD. Urgencia `low` → `medium` |
| **MEJ-004** | **Crecida al doble** | De **4** defectos de la misma clase a **8** (`DOC-14/EXP-004`, `EXP-005`, `EXP-015`, `EXP-016`). Además, las dos correcciones ya hechas se escribieron dentro de los routers. Urgencia `medium` → `high` |
| **MEJ-006** | **Igual en datos** | Ningún incidente medido: **sigue siendo `opinion`**. Lo único que ha cambiado es que lleva cinco días bloqueando parcialmente a dos aceptadas y que ahora hay 107 escenarios esperando la CI. Urgencia `low` → `medium` |
| **MEJ-007** | **Nueva** | Nace con un `critical` y un `high` reproducidos, y con los tres puntos de envío contados en el código |
| **MEJ-008** | **Nueva** | Nace con dos hallazgos `medium` y un recuento de 15 `toFixed` en 8 ficheros |

**Ninguna ha menguado.** Y una nota sobre las aceptadas, para que no se pierda: la evidencia
de **MEJ-001** y **MEJ-005** también ha crecido después de estar decididas (apartado 1.2).
No cambia nada —están aceptadas y no volverán a proponerse—, pero si algún día se discute su
orden de ejecución, ese dato cuenta.

## 5. Descartadas

**Ninguna, y sigue siendo importante decirlo con todas las letras.** El propietario del
proyecto no ha rechazado ninguna mejora, ni el 2026-08-17 ni después. **No hay ninguna
`rejected` de clase `not-now` que pueda volver si crece la evidencia, ni ninguna
`not-wanted` que no pueda volver nunca.** MEJ-002, MEJ-004 y MEJ-006 **no están
descartadas: están esperando decisión desde hace seis días.**

Lo que sí se conserva —y crece— son **las que se han considerado y se ha decidido no
proponer**, porque cualquiera que lea esto en una reunión las volverá a encontrar en la
misma evidencia.

### 5.1 El control de concurrencia (`DOC-14/EXP-003`) · **con una corrección de mi propia argumentación**

`DOC-14/EXP-003`, severidad `high`, reproducido: dos pestañas sobre la misma ficha,
`PUT /api/clients/14 → 200` deja el teléfono en `611111111` a las 15:39:50 y **un segundo
`PUT` desde la pestaña estancada lo devuelve a `600999888` a las 15:40:39, sin ningún
aviso**. `DOC-14/1` lo pone como la **segunda** de las tres razones por las que el sistema
no se puede entregar. En el bloque YAML de A-10 su `deriva_a` es **`null`**: no tiene dueño.

**No lo propongo, y el motivo tiene dos mitades.**

1. **La decisión es de producto, no técnica.** `specs/01-esquelet-app-taller.md:50` excluye
   explícitamente el «accés multiusuari simultani». Elegir entre bloqueo optimista y fusión
   por campos —y decidir qué ve el usuario cuando hay conflicto— cambia el comportamiento
   de la aplicación para el usuario. **Eso no es una refactorización.** Va al apartado 6.
2. **Y sin embargo corrijo una premisa mía.** En 1.0.0 usé esa misma exclusión del SPEC 01
   para descartar la condición de carrera de `generateNumero` diciendo que «no hay
   concurrencia por diseño». **EXP-003 demuestra que sí la hay**: se reprodujo con un solo
   usuario y dos pestañas, que es exactamente lo que el SPEC no excluye. **La conclusión
   sobre `generateNumero` no cambia** —sigue protegida porque `better-sqlite3` es síncrono
   dentro de un único proceso, y `DOC-24` verificó la numeración como correcta—, pero el
   argumento que usé para llegar a ella era más flojo de lo que parecía, y quien lo
   reutilice debe saberlo.

### 5.2 La numeración de albaranes y facturas (`generateNumero`) · sin cambios

Sigue sin proponerse. `better-sqlite3` es síncrono; el orden textual `ORDER BY numero DESC`
funciona mientras `padStart(4, '0')` mantenga la anchura y **rompe en el número 10.000**;
`DOC-24` comprobó la numeración y la dio por correcta, y `DOC-14` lo ha vuelto a confirmar
en vivo («la numeración es correcta, la emisión de factura resiste la concurrencia»).
**Proponerlo seguiría siendo fabricar trabajo.** Lo único que cambia es la nota del 5.1
sobre uno de los tres argumentos.

### 5.3 Las correcciones de los defectos, los ocho

No son mías y no las propongo: `BUG-003` y `BUG-004` son evolutivos ya decididos por
negocio, y los 20 defectos de `DOC-14` están dirigidos a `A-14`. Lo que hago con ellos es
**leerlos como patrón** (apartado 3.0) y proponer los sitios donde aterrizarán: MEJ-004 en
el servidor, MEJ-007 y MEJ-008 en el cliente.

### 5.4 La fragilidad del extractor de S-12 (`DOC-07/A-05-06`) · sin cambios

Sigue sin proponerse como `MEJ-nnn`: `registry.js` **no es código de `app-taller`** y no
existe en el bloque `graph` de `DOC-02`; es utillaje documental y `A-05` ya le asignó dueño
y recomendación. `DOC-07` 1.7.0 lo mantiene «sin cambios, remedido». Va al apartado 6.

### 5.5 Los huecos de cobertura

Sigue sin haber ninguno que proponer, con las cifras de `DOC-07` **1.7.0**: **100,00 %, 0
GAP PLAN, 0 anomalías bloqueantes, 0 casos huérfanos, 0 casos con `blocked: true`**. De los
avisos vivos, `A-05-03b`, `A-05-11b` y `A-05-12` son correcciones de `A-03`; `A-05-09` y
`A-05-06` son de `A-04` y `S-12`; `A-05-11c` es funcionalidad ausente y va a `A-15`; y la
mitad técnica de `A-05-10` **ya está aceptada como MEJ-001**. **La cobertura tampoco ha
producido ninguna propuesta en esta ronda.**

### 5.6 Los tres hallazgos que `DOC-14` me dirigió y no convierto en mejora

`EXP-017`, `EXP-019` y `EXP-026` llevan `deriva_a: A-12` y **no** se proponen. Están
desarrollados en el 6.1: los tres cambian lo que el usuario ve y decide, y eso lo decide
negocio, no un perfil técnico. **Lo digo aquí además de allí porque el modo de fallo obvio
sería aceptarlos solo porque venían con mi nombre.**

## 6. Hallazgos para otras piezas

Ninguno se desarrolla aquí y **ninguno se registra editando el documento de su dueño**.

### 6.1 → `A-15` · Tres hallazgos que `A-10` me dirigió y que son funcionalidad

Los tres vienen de `DOC-14` con `deriva_a: A-12`, y los tres **cambian lo que el usuario ve
o puede hacer**, que es la frontera exacta entre este documento y `DOC-25`. **Ninguno está
ya propuesto en `DOC-25` 1.1.1: comprobado contra FUN-001 a FUN-008.**

1. **`EXP-017`** (`mejora`, `medium`): se puede abandonar un formulario a medio rellenar sin
   ningún aviso y lo escrito se pierde. Cambiar el nombre de un cliente y pulsar «Piezas»
   navega sin diálogo; recargar `/peces/nou` vacía el campo y no hay ningún manejador de
   `beforeunload`. **Un aviso de cambios sin guardar es comportamiento nuevo**, y quien
   decide si el usuario debe verlo es negocio.
2. **`EXP-026`** (`mejora`, `medium`): el diálogo de confirmación de borrado no dice qué
   registro se va a borrar —«¿Seguro que quieres eliminar este cliente?», con dos clientes
   homónimos en pantalla—. **Dato técnico que sí aporto**: `ConfirmDialog.tsx` es único y lo
   usan los 6 módulos que borran, así que el cambio tendría un solo punto. **La decisión de
   qué debe decir el diálogo sigue siendo de producto.**
3. **`EXP-019`** (`mejora`, `low`): las pantallas de error no ofrecen salida, solo «Volver a
   intentarlo», que vuelve a fallar contra un `404`. Distinguir error recuperable de
   registro inexistente **es una pantalla nueva**.

### 6.2 → `A-15` (y a través suyo, a negocio) · Si la concurrencia está o no en el alcance

`DOC-14/EXP-003` demuestra que dos ventanas del mismo usuario pierden trabajo en silencio
(reproducción y horas en el 5.1), y `A-10` lo dejó **sin destinatario**. La exclusión de
`specs/01:50` habla de acceso multiusuario simultáneo; esto ocurre con un solo usuario. **La
pregunta previa no es cómo se implementa sino si el sistema debe defenderse de ello**, y esa
es de producto. Dato técnico que aporto para cuando se conteste: **`actualitzat_el` ya
existe en todas las tablas**, así que el coste de un bloqueo optimista no incluye migración
de esquema. **A-12 no propondrá esto mientras no haya respuesta.**

### 6.3 → `A-15` · Funcionalidad ausente que la automatización ha topado

`DOC-07/A-05-11c` y `DOC-23/5` coinciden: **TC-032, TC-033 y TC-047 no tienen vector en la
interfaz** porque la funcionalidad no existe —`AlbaransList.tsx` no expone filtro por
`vehicle_id` ni por `client_id`, y `AlbaraLiniesSection.tsx` no renderiza campo de precio
para las líneas de pieza—. `DOC-23/5` lo dice con todas las letras: «si se quieren cubrir
algún día, hace falta que antes exista la funcionalidad; decisión que no corresponde a QA
sino a producto». **No la propongo: no es deuda, es producto.**

### 6.4 → `A-14` · Dos cosas del censo de defectos

1. **`DOC-24` está desactualizado y nadie lo ha marcado.** Sigue en 1.0.0 con los cuatro
   defectos abiertos, mientras `DOC-14` CH-11 **verificó en vivo que BUG-001 y BUG-002
   funcionan**. Este roadmap ha tenido que cruzar dos documentos para saberlo.
2. **El hallazgo 6.2 de las versiones anteriores queda cerrado por mi parte.** El candidato
   a `BUG-005` que yo señalaba por lectura de código —avisos en catalán con la interfaz en
   castellano— **está reproducido y documentado** como `DOC-14/EXP-006`, con
   `deriva_a: A-14`. Ya no hace falta que lo empuje yo.

### 6.5 → `A-03` y `S-10` · Tres cosas del plan y de la suite

1. **El caso rojo tiene dueño y no es la aplicación.** `DOC-23/4`: TC-048 falla por
   contaminación de TC-040, y los cuatro casos preexistentes (TC-034, TC-040, TC-042,
   TC-048) quedaron fuera del mandato de esa sesión. La corrección recomendada por S-10
   —que TC-040 retire su línea, como ya hacen TC-053 y TC-054— **es de quien tenga mandato
   sobre esos cuatro**. Lo anoto porque **MEJ-005, aceptada, no sustituye a esa
   corrección**: reponer la base tapa el síntoma; el escenario seguiría sin ser
   independiente.
2. **`A-05-12` sigue sin corregir** y es de tres líneas: el resumen del front-matter de
   DOC-05 dice `ui: 109 / service: 1` y su propio YAML dice **106 / 4**. No lo toco, pero lo
   he tenido en cuenta al reescribir mi propio front-matter (ver «Procedencia»).
3. **`P-03` tiene consecuencias sobre la suite**, y conviene que A-03 y S-10 las conozcan
   antes de que se responda: los `.feature` validan literales como `119.06 €`. Está en la
   cautela de MEJ-008.

### 6.6 → `S-12` · Tres cosas del registro, una nueva

1. **`MEJ-007` y `MEJ-008` necesitan censo.** Los números los ha dado `registry.js next`;
   **A-12 no ha escrito en el registro**, que sigue con 311 anclas y seis `MEJ`.
2. **Sigue la divergencia de estado**: `MEJ-001`, `MEJ-003` y `MEJ-005` figuran como
   `proposed` en el registro mientras este documento las declara `accepted` desde hace seis
   días. `sync` no sobrescribe estado, que es la conducta correcta. **La fuente de verdad
   del estado es DOC-16**; reflejarlo es decisión de quien custodie el registro.
3. **`A-05-06` sigue abierta**: entradas protegidas solo por el orden de las claves, hoy en
   dos documentos.

### 6.7 → `S-05` · La deuda técnica de este proyecto no la ha analizado nadie

Tercera versión consecutiva sin `DOC-17`. Este roadmap **suple esa ausencia con evidencia de
otros** —defectos, exploración, cobertura y lectura de código—, y lo hace razonablemente
bien en la capa donde hay defectos medidos. Lo que no puede hacer es ver la deuda que **no
ha producido ningún defecto todavía**, que es justamente la que S-05 encontraría.

### 6.8 → `S-01` · El grafo con el que se calcula el impacto está incompleto

`DOC-07/7.2` documenta tres aristas reales ausentes del bloque `graph` de `DOC-02`,
verificadas en código por A-07. **Una de ellas cae debajo de una mejora de este documento**:
`albarans-pages → shared-components`. El impacto de MEJ-007 ha tenido que corregirse a mano
por eso, y consta en su ficha. Cualquier cálculo de impacto futuro heredará las ausencias
mientras no se corrijan.

## 7. Bloque estructurado

```yaml roadmap
version: 1
project: app-taller
run:
  date: 2026-08-22
  kind: analysis_round
  first_run: false
  previous_doc_version: 2.0.0
  commit_sha: b2a8d7706df4fef373b87a144fe4be6cfbc94390
  new_inputs_this_run: [DOC-14-EXPLORATORIO.md, DOC-23-INFORME.md]
  inputs_absent: [DOC-17-DEUDA-TECNICA.md, DOC-20-RALLY-STATE.json, DOC-19-RALLY-TESTCASES.csv, DOC-03-API.md]
  ids_granted_by: S-12
  ids_requested_this_run: 2
  ids_granted: [MEJ-007, MEJ-008]
decision_of_record:
  date: 2026-08-17
  by: propietario del proyecto
  accepted: [MEJ-001, MEJ-003, MEJ-005]
  rejected: []
  a07_done_for_accepted: false
  note: >-
    Ninguna de las tres aceptadas ha entrado todavía en A-07, cinco días después. No hay
    ninguna decisión nueva en esta ronda: A-12 propone, decide una persona.
improvements:
  - id: MEJ-001
    title: Identificadores estables de prueba en la interfaz
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    what: >-
      Añadir un atributo de prueba estable a los elementos que hoy sólo se localizan por su
      rótulo visible: formulario de línea de albarán y apartados de relación de las fichas.
      No cambia ninguna pantalla, ningún flujo ni ningún texto.
    value: >-
      33 de los 110 casos dejan de depender de rótulos visibles y desaparece una clase
      entera de fallo intermitente.
    source: evidence
    evidence_refs:
      - DOC-05/4.11/familia-formulario-de-linea-14-casos
      - DOC-05/4.11/familia-apartado-sin-identificador-19-casos
      - DOC-07/A-05-10
      - DOC-23/1/102-de-110-casos-automatizados
      - codigo/automation-ui-BasePO.java:76-localizador-not(@id)
      - codigo/automation-ui-AlbaraDetallPO.java:12-nota-de-localizadores
    evidence_change_since_2_0_0: reforzada
    evidence_change_note: >-
      La suite ya está escrita: 26 clases Java, 8 .feature, 20 By.xpath (18 con
      normalize-space) frente a 1 By.id. BasePO.java:76 localiza con
      //input[@type='text' and not(@id)], un localizador cuya condición es la ausencia del
      identificador que esta mejora añade. El riesgo que la ficha de 1.0.0 anunciaba se ha
      materializado.
    components: [albarans-pages, clients-pages, vehicles-pages, factures-pages, personal-pages, shared-components]
    impact: low
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    risk_if_not_done: >-
      Ya no es prospectivo: los Page Objects escritos contra rótulos son 26 clases, y cada
      caso nuevo añade coste al mismo reloj.
    scope_note_for_a07: >-
      Ejecutarla ya no toca sólo la aplicación: obliga a revisar localizadores de S-10, y al
      menos uno se rompe justo al añadir el identificador. Es coordinación, no impedimento.
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
      - DOC-05/4.11/familia-literal-del-aviso-25-casos-34-con-solapamiento
      - codigo/71-literales-en-server-routes-recontados-en-b2a8d77
      - codigo/client-src-services-api.ts-propaga-body.error-tal-cual
      - specs/01-esquelet-app-taller.md:102
    evidence_change_since_2_0_0: crecida
    evidence_change_note: >-
      EXP-006 la reproduce en los siete módulos con la interfaz en castellano y da el
      recuento por fichero (albarans 20, nomines 13, vehicles 12, clients 7, factures 7,
      peces 6, personal 6 = 71). Su sugerencia es literalmente esta mejora. La cifra de
      1.0.0, 70, era del commit 44748fb y queda corregida a 71 en b2a8d77.
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, api-client]
    impact: medium
    difficulty: low
    urgency: medium
    urgency_change: low -> medium
    size: medium
    confidence: medium
    risk_if_not_done: >-
      La corrección del idioma se escribirá router a router, y 102 casos automatizados
      siguen anclados a textos que nadie ha declarado estables.
    note: >-
      Devolver un `code` es un cambio aditivo del contrato de API y debe pasar por A-07;
      DOC-03 no existe. La mitad interna no toca contrato. DOC-07/A-05-10 asigna a A-02 la
      mitad documental, que no es esta mejora.
    enters_cycle_via: A-07
  - id: MEJ-003
    title: Suite de pruebas automáticas del servidor y CI mínima
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    implemented: false
    what: >-
      Pruebas automáticas sobre la API del servidor, empezando por las reglas de dinero, y
      una CI que las ejecute en cada cambio.
    value: >-
      La única red del proyecto en la capa donde están los defectos, justo antes de que los
      evolutivos decididos toquen el ciclo del dinero.
    source: evidence
    evidence_refs:
      - DOC-02/testing/frameworks-vacio-test-files-0-coverage-0-ci-none
      - DOC-07/A-05-03
      - DOC-07/A-05-03b
      - DOC-14/EXP-007
      - DOC-23/1/102-de-110-y-ejecucion-manual
      - codigo/sin-.github-sin-script-test-sin-ficheros-de-prueba-de-servidor
    evidence_change_since_2_0_0: reforzada
    problem_still_present: true
    problem_status_note: >-
      Verificado en b2a8d77: 0 ficheros de prueba en server/, 0 descriptores de CI y ningún
      script `test` en los tres package.json. Lo aparecido es una suite de interfaz de S-10
      (102/110, 106 verdes) que NO es lo que esta mejora compraba: A-05-03 muestra que los
      cuatro defectos siguen sin ser detectados por ningún caso, y el nuevo A-05-03b muestra
      dos casos verdes (TC-073, TC-075) que anuncian el IVA y no lo comprueban, sobre dos
      requisitos que el sistema incumple (EXP-007). La mitad de CI vale hoy más que el
      2026-08-17: hay 107 escenarios que sólo corren a mano.
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection, db-migrate, db-numbering]
    impact: low
    difficulty: medium
    urgency: high
    size: large
    confidence: medium
    risk_if_not_done: >-
      Los evolutivos entran a mano sobre 893 líneas de rutas sin red, y la métrica «100 % de
      cobertura, 106 escenarios verdes» es cierta y engañosa a la vez.
    depends_on: [MEJ-006]
    blocked_note: >-
      MEJ-006 sigue sin decidir; better-sqlite3 es nativo y una CI sin versión de Node
      fijada no es reproducible.
    supersedes_decision:
      what: specs/01-esquelet-app-taller.md:48 excluyó la suite de tests; DOC-02/Q-04 la recoge
      why_revoked: >-
        Decisión razonable para el sistema de entonces, superada por hechos posteriores:
        defectos confirmados, 79 requisitos y 110 casos, y evolutivos decididos sobre el
        ciclo del dinero. Si alguien actualiza specs/01, debería citar MEJ-003.
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer, ni entera ni troceada.
  - id: MEJ-004
    title: Un sitio donde vivan las reglas de escritura
    status: proposed
    what: >-
      Extraer de los routers la validación de entrada y las reglas de negocio a un módulo
      por dominio. Mueve las reglas que ya existen; no añade ninguna.
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
      - codigo/893-lineas-y-86-res.status-en-server-routes
    evidence_change_since_2_0_0: crecida
    evidence_change_note: >-
      De 4 defectos de la misma clase a 8. EXP-004 acepta un neto de -500,00 € con 201
      Created; EXP-005 admite mes con decimales y año 999999; EXP-015 admite matriculación
      2099 y -500 km; EXP-016 guarda un nombre de 281 caracteres y un correo sin arroba.
      Además, las correcciones de BUG-001 y BUG-002 se escribieron en línea dentro de los
      mismos routers: 877->893 líneas y 84->86 res.status.
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection]
    impact: high
    difficulty: high
    urgency: high
    urgency_change: medium -> high
    size: large
    confidence: medium
    risk_if_not_done: El noveno defecto de la misma familia; los ocho primeros tampoco se sabían.
    depends_on: [MEJ-003]
    note: >-
      Sigue sin poder ir antes que MEJ-003, que está aceptada pero no ha entrado en A-07.
      Recomendación de A-12: hacerla con el primer evolutivo y acotada a su dominio. La
      ventana se estrecha: además de Q-02, Q-06, Q-10 y Q-12, las preguntas P-01 y P-02 de
      DOC-14 añadirían reglas de rango a nóminas y vehículos si negocio contesta que sí.
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
    value: Que un rojo signifique un defecto.
    source: evidence
    evidence_refs:
      - DOC-23/4/TC-048-rojo-por-contaminacion-de-TC-040
      - DOC-23/7/datos-que-se-quedan-en-la-base
      - DOC-05/4.10/54-casos-con-touches-14-recursos
      - DOC-24/test_data_left_behind
    evidence_change_since_2_0_0: reforzada
    evidence_change_note: >-
      Ya no es prospectiva: el único caso rojo de la suite completa (1 de 107) es TC-048, y
      su causa raíz diagnosticada por S-10 es exactamente la contaminación entre escenarios
      que esta mejora nombró, con el mismo par TC-040/TC-048.
    components: [db-seed, db-migrate, db-connection]
    impact: low
    difficulty: low
    urgency: high
    size: small
    confidence: high
    risk_if_not_done: >-
      El equipo aprende que los rojos de esta suite no significan nada. Ya ha ocurrido dos
      veces con el mismo caso.
    depends_on: [MEJ-006]
    boundary_note: >-
      No sustituye a la corrección de aislamiento de TC-040, que es de quien tenga mandato
      sobre los cuatro casos preexistentes (DOC-23/4). Reponer la base tapa el síntoma; el
      escenario seguiría sin ser independiente.
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer en ninguna ronda.
  - id: MEJ-006
    title: Fijar la versión de Node y hacer configurable la ruta de la base
    status: proposed
    what: >-
      Declarar `engines` y `.nvmrc`, y leer la ruta de la base de una variable de entorno
      con el valor actual como valor por defecto.
    value: Habilitador de MEJ-003 y MEJ-005, las dos aceptadas y las dos paradas.
    source: opinion
    evidence_refs:
      - DOC-02/Q-01
      - DOC-02/Q-02
      - codigo/ningun-package.json-declara-engines-y-no-hay-.nvmrc
      - codigo/server-db-index.js:5-6-DB_PATH-codificada
    evidence_change_since_2_0_0: unchanged
    components: [db-connection, server-app]
    impact: low
    difficulty: low
    urgency: medium
    urgency_change: low -> medium
    size: small
    confidence: high
    risk_if_not_done: >-
      La CI reproducible de MEJ-003 y la parte de MEJ-005 que apunta a otra base no se
      pueden hacer sin esto, y las dos están decididas desde hace seis días.
    blocks: [MEJ-003, MEJ-005]
    note: >-
      Sigue marcada `opinion` a propósito: los hechos están verificados en HEAD, pero ningún
      dato mide que hayan causado un problema. Que dos aceptadas la necesiten le da una
      razón práctica, no evidencia.
    enters_cycle_via: A-07
  - id: MEJ-007
    title: Una sola guarda contra el reenvío en los tres puntos de escritura del cliente
    status: proposed
    new_this_round: true
    what: >-
      Bloquear el envío mientras la petición está en vuelo, y que ese bloqueo viva en un
      solo sitio. Hay exactamente tres puntos de envío en el cliente: EntityForm.tsx:90
      (usado por 6 módulos de páginas), AlbaraLiniesSection.tsx:221 y FacturaForm.tsx:142.
      No cambia ninguna pantalla, ningún flujo ni ningún texto.
    value: >-
      Cierra una clase de defecto que ya ha producido un critical y evita que la corrección
      se escriba tres veces distinta. El patrón ya existe hecho en la misma aplicación
      (FacturaDetail.tsx:68 y NominaDetail.tsx:86, disabled={updating}), aplicado a dos
      conmutadores y a ninguno de los tres puntos de creación.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-002
      - DOC-14/EXP-001
      - codigo/tres-type=submit-en-client-src-ninguno-con-guarda
      - codigo/EntityForm-importado-por-6-modulos-de-paginas
    components: [shared-components, albarans-pages, factures-pages]
    impact: medium
    difficulty: low
    urgency: high
    size: small
    confidence: high
    impact_note: >-
      El grafo de DOC-02 declara 1 sola arista entrante a shared-components, y se sabe
      incompleto: DOC-07/7.2 documenta que falta albarans-pages -> shared-components,
      verificada por A-07 en AlbaraForm.tsx:5-7. Contado sobre el código, EntityForm lo
      consumen 6 módulos de páginas. Por eso el impacto es medium y no low.
    risk_if_not_done: >-
      Que EXP-002 se corrija sólo donde se reprodujo y queden vivos el alta de cliente y la
      emisión de factura. Ninguno de los 110 casos de DOC-05 prueba una doble pulsación, así
      que la suite no lo vería.
    unverified_inference: >-
      FacturaForm.tsx:142 es estructuralmente idéntico y nadie ha reproducido el defecto
      allí. Es lectura de código, no dato, y no cuenta como evidencia.
    boundary_note: >-
      No es la corrección de EXP-001 ni de EXP-002, que son defectos de A-14. Lo que decide
      esta mejora es dónde vive el mecanismo, que es lo que A-10 dejó abierto y sin dueño.
    enters_cycle_via: A-07
  - id: MEJ-008
    title: Un único sitio donde se dé formato a importes y fechas
    status: proposed
    new_this_round: true
    what: >-
      Extraer a un módulo único del cliente el formato de importe y el de fecha, y usarlo
      desde las pantallas que hoy lo resuelven cada una por su cuenta. Adopta el formato ya
      mayoritario; no decide coma o punto decimal.
    value: >-
      Hoy cambiar cómo se presenta un euro son 8 ficheros y 15 ediciones; después es una. Y
      elimina una divergencia ya medida entre pantallas de la misma aplicación.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-014
      - DOC-14/EXP-009
      - DOC-14/P-03
      - codigo/15-toFixed-en-8-ficheros-cero-Intl-y-ninguna-funcion-de-fecha
    components: [albarans-pages, clients-pages, factures-pages, nomines-pages, peces-pages, personal-pages, shared-components]
    impact: medium
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    risk_if_not_done: >-
      Que la respuesta a P-03 cueste 8 ficheros más los literales de los .feature, y que
      cada pantalla nueva siga inventándose su formato.
    caution: >-
      Unificar cambia lo que se ve en las pantallas que hoy divergen, y los .feature de
      automation/ui validan literales como 119.06 € y 98.40 €. Ese impacto es de A-03 y de
      S-10, y A-07 debería contarlo en el alcance. La corrección de EXP-009 y EXP-014 como
      defectos sigue siendo de A-14.
    enters_cycle_via: A-07
considered_not_proposed:
  - what: Control de concurrencia / bloqueo optimista (DOC-14/EXP-003)
    why: >-
      La decisión previa es de producto: specs/01:50 excluye el acceso multiusuario
      simultáneo, y elegir entre bloqueo optimista y fusión por campos cambia lo que ve el
      usuario. Va a findings_for_others. Se corrige de paso una premisa propia: en 1.0.0
      A-12 argumentó que «no hay concurrencia por diseño» para descartar la carrera de
      generateNumero; EXP-003 la reproduce con un solo usuario y dos pestañas. La conclusión
      sobre generateNumero no cambia; el argumento era más flojo de lo que parecía.
  - what: Condición de carrera y orden textual en generateNumero (DOC-02/Q-03)
    why: >-
      better-sqlite3 es síncrono en un único proceso; el orden textual sólo rompe en el
      número 10.000; DOC-24 verificó la numeración y DOC-14 lo confirmó en vivo. Proponerlo
      seguiría siendo fabricar trabajo.
  - what: Las correcciones de los ocho defectos de escritura
    why: >-
      BUG-003 y BUG-004 son evolutivos ya decididos por negocio; los defectos de DOC-14
      están dirigidos a A-14. A-12 los lee como patrón y propone dónde aterrizan.
  - what: Fragilidad del extractor de S-12 (DOC-07/A-05-06)
    why: >-
      registry.js no es código de app-taller y no existe en el grafo de DOC-02; A-05 ya le
      asignó dueño. Va a findings_for_others.
  - what: Huecos de cobertura
    why: >-
      DOC-07 1.7.0: 100 %, 0 GAP PLAN, 0 bloqueantes, 0 huérfanos, 0 blocked. Los avisos
      vivos son correcciones de A-02, A-03, A-04 o S-12, o funcionalidad para A-15.
  - what: EXP-017, EXP-019 y EXP-026 (los tres hallazgos con deriva_a A-12)
    why: >-
      Los tres cambian lo que el usuario ve o puede hacer: un aviso de cambios sin guardar,
      una salida en la pantalla de error y el nombre del registro en el diálogo de borrado.
      Es funcionalidad y la decide negocio. Que vinieran dirigidos a A-12 no los convierte
      en deuda técnica. Van a findings_for_others.
corrections_to_previous_version:
  - what: literales de error incrustados en server/routes
    was: 70
    now: 71
    source: recuento de A-12 en b2a8d77, coincidente con el de DOC-14/EXP-006
  - what: tamaño de server/routes
    was: 877 líneas y 84 res.status
    now: 893 líneas y 86 res.status
    source: recuento de A-12 en b2a8d77, tras las correcciones de BUG-001 y BUG-002
  - what: premisa «no hay concurrencia por diseño» usada en 1.0.0 §5.1
    was: usada para descartar la carrera de generateNumero
    now: falsada parcialmente por DOC-14/EXP-003; la conclusión se mantiene, el argumento no
    source: DOC-14/EXP-003
  - what: declaración de DOC-23 en `inputs`
    was: sin versión y en la ruta automation/ui, señalado por S-16
    now: DOC-23-INFORME.md 2.0.0 en docs/, con hash
    source: aviso de S-16
findings_for_others:
  - target: A-15
    status: nuevo
    note: >-
      Tres hallazgos que DOC-14 dirigió a A-12 y que son funcionalidad, no deuda: EXP-017
      (aviso al abandonar un formulario con cambios sin guardar), EXP-026 (el diálogo de
      borrado no dice qué registro se borra; ConfirmDialog.tsx es único y lo usan 6 módulos)
      y EXP-019 (las pantallas de error no ofrecen salida). Ninguno está en DOC-25 1.1.1:
      comprobado contra FUN-001 a FUN-008.
  - target: A-15
    status: nuevo
    note: >-
      Si la concurrencia está en el alcance. EXP-003 pierde trabajo en silencio con un solo
      usuario y dos pestañas, y A-10 lo dejó sin destinatario. Dato técnico para cuando se
      conteste: actualitzat_el ya existe en todas las tablas, así que no hay migración de
      esquema en juego.
  - target: A-15
    status: nuevo
    note: >-
      Funcionalidad ausente topada por la automatización: TC-032, TC-033 y TC-047 no tienen
      vector porque no existe filtro por vehículo o cliente en el listado de albaranes ni
      campo de precio manual en la línea de pieza (DOC-07/A-05-11c, DOC-23/5).
  - target: A-14
    status: nuevo
    note: >-
      DOC-24 sigue en 1.0.0 con BUG-001 y BUG-002 abiertos, mientras DOC-14 CH-11 verificó
      en vivo que los dos funcionan. Y el candidato a BUG-005 que A-12 señalaba desde 1.0.0
      queda cerrado por su parte: está reproducido como DOC-14/EXP-006 y ya dirigido a A-14.
  - target: A-03
    status: abierto
    note: >-
      (1) A-05-12 sigue sin corregir: el resumen del front-matter de DOC-05 dice ui:109 /
      service:1 y su YAML dice 106/4. (2) TC-073 y TC-075 necesitan el paso que comprueba el
      IVA (A-05-03b). (3) P-03 tiene consecuencias sobre los literales de los .feature.
  - target: S-10
    status: abierto
    note: >-
      TC-048 es el único rojo y su causa es la contaminación de TC-040 (DOC-23/4). La
      corrección es de quien tenga mandato sobre los cuatro casos preexistentes. MEJ-005 no
      la sustituye.
  - target: S-12
    status: abierto
    note: >-
      (1) MEJ-007 y MEJ-008 necesitan censo; A-12 no ha escrito en el registro, que sigue
      con 311 anclas y seis MEJ. (2) MEJ-001, MEJ-003 y MEJ-005 siguen `proposed` en el
      registro mientras este documento las declara `accepted`. (3) A-05-06 sigue abierta.
  - target: S-05
    status: abierto
    note: >-
      Tercera versión consecutiva sin DOC-17. Este roadmap suple la ausencia con evidencia
      de otros, pero no puede ver la deuda que todavía no ha producido ningún defecto.
  - target: S-01
    status: abierto
    note: >-
      Las tres aristas que faltan en el grafo de DOC-02 (DOC-07/7.2) afectan al cálculo de
      impacto de este documento: una de ellas, albarans-pages -> shared-components, cae bajo
      MEJ-007 y ha obligado a corregir su impacto a mano.
registry_check:
  command: registry.js next registro-ids.json --prefix MEJ --count 4
  result: "6 existentes, máximo 6; siguientes libres: MEJ-007, MEJ-008, MEJ-009, MEJ-010"
  used: [MEJ-007, MEJ-008]
  written_by_a12: false
summary:
  total: 8
  new: 2
  still_open: 5
  accepted_not_started: 3
  implemented: 0
  rejected_respected: 0
  rejected_total: 0
  evidence_grown: [MEJ-001, MEJ-002, MEJ-004, MEJ-005]
  evidence_shrunk: []
  by_source: { evidence: 7, opinion: 1 }
  considered_not_proposed: 6
  findings_for_others: 9
  recommended_top3_among_undecided: [MEJ-007, MEJ-006, MEJ-008]
  never_propose_again: [MEJ-001, MEJ-003, MEJ-005]
```
