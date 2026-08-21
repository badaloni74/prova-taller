---
doc_id: DOC-05
doc_name: DOC-05-PLAN-PRUEBAS
version: 1.6.0
status: draft
history: DOC-05-PLAN-PRUEBAS-HIST.md   # este documento no lleva historial; solo estado actual
generator: A-03 plan de pruebas
generator_version: "1.2"
generated_at: 2026-08-17T09:10:00+02:00
project: app-taller
project_code: TALLER
source:
  repo_path: C:\Claude\appdani
  vcs: git
  branch: master
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  working_tree_clean: false   # solo hay sin versionar docs/ y registro-ids.json, generados por este ciclo
inputs:
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    present: true
    version: 1.2.0
    hash: sha256:7d1844156487a62b8936a0d2164ebec043eb7fdb7043d27afdd649316f9b63a0
    usage: >-
      fuente única de este plan, y versión contra la que queda conciliado. El bloque `requirements` de
      1.2.0 se ha releído entero y contrastado enunciado por enunciado con lo que dan por supuesto los
      110 casos: los 79 `statement` dicen hoy lo mismo que decían cuando se derivó cada caso, y el bloque
      no ha ganado ningún campo por requisito. Ningún caso se ha reescrito, ver apartado 6.7
    derived_from_version: 1.0.0
    derived_from_hash: sha256:2c1ef6f897d722a224d89ab30fa6c5733711cf3b00c1d544aa4819b01660ec0e
    derived_from_note: >-
      procedencia real, que no se borra al resellar: 109 de los 110 casos se escribieron contra 1.0.0, que
      es la versión que este plan tenía delante cuando los redactó. El caso 110, TC-041, se re-derivó en
      1.3.0 contra el enunciado que REQ-031 tiene desde 1.1.0 y que 1.2.0 conserva palabra por palabra.
      Entre 1.0.0 y 1.2.0 A-02 no reformuló ningún otro `statement` —A-05 lo comprobó con el CSV de DOC-07
      byte a byte idéntico dos revisiones seguidas—, así que la conciliación con 1.2.0 es una comprobación,
      no una re-derivación, y se declara como tal
    fields_note: >-
      `derived_from_version` y `derived_from_hash` no son una segunda entrada de `inputs`. Declararlas
      como tal decía que este plan consume hoy una versión obsoleta de DOC-04, que es justo lo que S-16
      señala y lo que 1.4.1 corrige; declararlas como procedencia dice lo que de verdad pasó
  - id: DOC-24-BUGS.json
    from: A-14
    present: true
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    usage: >-
      evidencia de la mitad factual de Q-18 —A-14 ejecutó contra `localhost:3001` sin pasar por la
      pantalla— y origen de Q-19; ningún caso se ha modificado a partir de él
  - id: DOC-23-AUTOMATION
    path: automation/ui/
    previous_path: docs/DOC-23-AUTOMATION/
    path_changed_on: 2026-08-17
    from: S-10 / A-13
    present: true
    usage: destino acordado de la vigilancia de los defectos de DOC-24 al cerrar Q-19; contiene TC-900, en rojo sobre BUG-001. No exporta a Rally y no comparte numeración con este plan
    path_note: >-
      la carpeta de automatización se reorganizó el 2026-08-17 a petición del propietario del proyecto:
      el proyecto Selenium + Cucumber pasa de `docs/DOC-23-AUTOMATION/` a `automation/ui/`, y nace
      `automation/api/` para la colección Postman de S-17 (DOC-26). El documento sigue siendo DOC-23;
      lo que cambia es dónde vive
  - id: DOC-23-INFORME.md
    path: automation/ui/DOC-23-INFORME.md
    previous_path: docs/DOC-23-AUTOMATION/DOC-23-INFORME.md
    path_changed_on: 2026-08-17
    from: S-10
    present: true
    usage: >-
      evidencia de campo para el grado de automatización asignado a los 110 casos. De ahí salen los
      tres hechos que más degradan: los formularios de línea de albarán no llevan id y hay que localizarlos
      por proximidad de la etiqueta visible, el desplegable de pieza carga sus opciones por fetch y produjo
      un flake dependiente del orden, y los campos de EntityForm sí llevan id={field.name} y son estables.
      Es también la fuente del incidente TC-040/TC-048 que motiva los campos de aislamiento
    note: no modifica ningún caso; solo justifica los campos `automation.grade` y `automation.reason`
  - id: DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md
    from: A-06
    present: true
    version: 2.0.0
    hash: sha256:5f46a07a585dbdb991bb5c42f66bec909d43bfe062fbb5c4fb4b0ad1eb3c2634
    usage: >-
      origen del campo `verification_path`, que A-06 inventó para los criterios de aceptación de EVO-001
      y que este plan adopta en el contrato `testcases`. También es la evidencia de urgencia de Q-18:
      cuatro de los once criterios de EVO-001 —AC-002, AC-004, AC-007 y AC-009— solo son alcanzables por
      servicio, e incluyen el que impide facturar al cliente equivocado. Ningún caso de este plan se
      deriva de DOC-08: los casos de EVO-001 nacen cuando A-02 regenere DOC-04
    vocabulary_note: >-
      A-06 escribe los valores en castellano (`interfaz` | `servicio` | `mixta`); el contrato de
      `testcases` los fija en inglés (`ui` | `service` | `mixed`). La equivalencia es uno a uno y está
      declarada en el apartado 4.12 para que S-14 y S-17 no tengan que adivinarla
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    present: true
    version: 1.1.1
    hash: sha256:b9070b120a46eb1a4a17f99eb9983270828b597ce41e8d4cda8b8204c7591b8a
    usage: >-
      segundo testigo de la mitad factual de Q-18: A-15 anotó como `evidence` la misma reproducción de
      A-14. Solo se cita; ninguna `FUN`/`MEJ` de A-15 genera casos en este plan
  - id: decision-de-propietario
    from: humano
    present: true
    received_on: 2026-08-16
    scope: "Cierre de Q-19 sobre recomendación de A-05, y autorización enumerada para reescribir TC-041 y solo TC-041."
  - id: reorganizacion-de-carpetas
    from: humano
    present: true
    received_on: 2026-08-17
    scope: >-
      Movimiento del proyecto de automatización de `docs/DOC-23-AUTOMATION/` a `automation/ui/` y
      creación de `automation/api/` para la colección Postman (DOC-26). Afecta a cuatro referencias de
      este documento; tres se corrigen y la cuarta, dentro de la `resolution` de Q-19, se anota sin
      reescribirse (apartado 6.4)
  - id: registro-ids.json
    from: S-01 / A-02
    present: true
    hash: sha256:afca8a7f31c6da308a6c7060e52beda89419727ed4278787b87ab2ea1f232b3f
    anchors: 311   # ACT=1 UC=40 BR=37 REQ=79 TC=110 Q=29 FUN=8 MEJ=6 EVO=1
    note: >-
      **Los 110 `TC-nnn` no se han tocado**: ninguno se añade, retira, renumera ni cambia de `name`, así
      que no hay deriva de significado que aceptar y no se ejecuta `sync --block testcases`. Lo único que
      esta versión escribe en el registro es el ancla `Q-18`, que pasa a `status: answered` con su
      `resolution` en dos mitades, y una nota de corrección de ruta en `Q-19` **junto** a su `resolution`,
      nunca dentro. `sync` no actualiza el `status` de un ancla existente —solo añade—, así que ambas
      ediciones son nominales y están declaradas aquí en vez de darse por hechas.
    hash_before: sha256:2bf7ab77d6ad3fa562193a8130339e55f6fe4f2ccd1159a600817b3b6b3e3391   # antes de las dos ediciones nominales de 1.5.0
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    present: true
    version: 1.0.0
    hash: sha256:4e49485c3ad1529b2eee9d56487e188617011d772fe5908740cbed4114f01097
    usage: consulta de glosario y de contexto de módulo
  - id: DOC-03-API.md
    from: S-03
    present: false
    note: el proyecto no expone OpenAPI y S-03 no se ha ejecutado; los casos se diseñan sobre comportamiento de negocio, no sobre contratos de endpoint
  - id: DOC-22-RALLY-BASELINE.yaml
    from: S-09
    present: false
    note: no ha habido bootstrap inverso de Rally; los 110 TC-nnn se crean desde cero
counts:
  test_cases: 110
  test_case_steps: 241
  requirements_covered: 79
  requirements_total: 79
  gap_plan: 0
  open_questions_own: 4
  open_questions_own_open: 2
  open_questions_own_answered: 2
  open_questions_cited: 13
verification_path:            # nuevo en 1.5.0; los 110 casos lo declaran, ninguno sin informar
  ui: 109
  service: 1                  # TC-041
  mixed: 0
  vocabulary: [ui, service, mixed]
  criterion: >-
    un caso va por servicio SOLO cuando el vector no existe en la interfaz. Si el vector existe en la
    pantalla es `ui`, aunque por API también funcionara. No es una prueba de contrato de API: es la
    única vía de ejercer la regla. Ver apartado 4.12
automation_projects:          # reorganizados el 2026-08-17 por decisión del propietario del proyecto
  ui: automation/ui           # Selenium + Cucumber, DOC-23, antes docs/DOC-23-AUTOMATION/ — lo genera S-10
  api: automation/api         # colección Postman, DOC-26, nueva — la genera S-17
isolation:                    # los 110 casos llevan los cinco campos, ninguno sin declarar
  cases_with_depends_on: 3
  cases_with_touches: 54
  cases_restoring_state: 57
  distinct_resources: 14
  execution_waves: 2
  max_parallel_lanes: 67
  longest_lane: 17
automation:
  high: 25
  medium: 80
  low: 4
  not_recommended: 1
  blocked: 0
---

# DOC-05 · Plan de pruebas — app-taller

> Qué merece la pena probar de los 79 requisitos de `DOC-04-FUNCIONAL.md`, con qué
> prioridad y con qué datos concretos. La fuente única de este plan es DOC-04:
> ningún caso prueba comportamiento que DOC-04 no afirme.

> **Este documento no lleva historial.** Refleja solo el estado actual, con su
> `version` en el front-matter. Qué cambió en cada versión, por qué subió el
> número y las tablas de equivalencia de renumeraciones viven en el fichero
> hermano **`DOC-05-PLAN-PRUEBAS-HIST.md`**, que también es de A-03. La
> **procedencia** —el bloque `inputs` con versión y hash de cada entrada— se queda
> aquí, porque es lo que `S-16 · Cascada de obsolescencia` necesita leer.

## 1. Alcance y estrategia

Este plan cubre los **79 requisitos** de DOC-04 (REQ-001 a REQ-079) con **110 casos
de prueba** (TC-001 a TC-110) repartidos en los nueve módulos del sistema. Todos
los requisitos tienen al menos un caso: **no hay ningún GAP PLAN**. Lo que sí hay
—y se declara en el apartado 6— son **vectores deliberadamente no cubiertos**,
todos ellos en zonas donde DOC-04 dejó una pregunta abierta y por tanto no existe
un resultado esperado que se pueda escribir sin inventarlo.

**Qué se prueba.** El ciclo central del negocio —cliente, vehículo, albarán,
factura— con especial insistencia en los tres puntos donde el sistema mueve dos
cosas a la vez: el stock al anotar y retirar una línea de pieza (REQ-035,
REQ-039), y el cambio de situación de los albaranes al emitir la factura
(REQ-047). Se prueban también todos los bloqueos de borrado por dependencia
(REQ-007, REQ-008, REQ-017, REQ-024, REQ-062), la unicidad de matrícula
(REQ-013) y de nómina por empleado-mes-año (REQ-068), y **todos los cálculos con
números concretos**: base, IVA y total de la factura (REQ-049 a REQ-051) y
salario neto de la nómina (REQ-070). Los dos contadores anuales —número de
albarán y número de factura— se prueban por formato y por incremento (REQ-029,
REQ-048).

**Qué no se prueba, y por qué.**

- **No hay pruebas de acceso, roles ni permisos.** DOC-04 no emite ningún
  requisito de autenticación o autorización porque el sistema no identifica a
  quien lo usa; es una decisión de negocio documentada, no una carencia. Probar
  algo ahí sería probar un requisito inexistente.
- **No hay pruebas de contrato de API.** `DOC-03-API.md` no existe. Todos los
  casos se expresan como acciones observables del personal del taller sobre la
  aplicación, sin nombrar rutas, verbos ni códigos de respuesta. Si más adelante
  se ejecuta S-03, este plan admite una capa de casos de contrato encima, no en
  lugar de estos. **Un único caso escapa de la interfaz**: TC-041, porque el
  tercer tipo de línea que REQ-031 prohíbe no se puede ni formular desde la
  pantalla. Tampoco ahí se comprueba ruta ni código de respuesta, sino el efecto
  sobre el albarán. Desde 1.5.0 esto ya no es una excepción anecdótica sino una
  regla escrita: **cada caso declara `verification_path`** y el criterio que
  decide su valor está en el apartado **4.12**. La vía de servicio **existe y
  está usada** —A-14 la ejerció contra `localhost:3001`—, y aun así este plan no
  la duplica: se usa solo donde el vector no existe en la pantalla.
- **No hay pruebas de rendimiento, carga ni concurrencia.** La aplicación es de
  uso local y de un solo puesto (DOC-04, apartado 1): no existe el escenario de
  dos usuarios simultáneos, así que las condiciones de carrera no son un vector
  de negocio.
- **No hay pruebas de traducción palabra a palabra.** REQ-075 a REQ-078 se
  prueban como comportamiento del marco —el idioma cambia, la elección persiste,
  el trabajo en curso no se pierde—, no como revisión del catálogo de textos.

**Vectores aplicados.** Para cada requisito se ha diseñado siempre el camino
feliz; sobre él se han añadido, cuando el requisito lo sostiene: violación de la
regla (los 31 casos `Negative`), límites (los 9 casos `Boundary`: cantidad de
línea en 0 y en 1, mes de nómina en 0, 1, 12 y 13, redondeos a dos decimales,
segundo documento del año en los contadores), estado (albarán facturado
bloqueado, albarán ya facturado que no se puede volver a facturar) y cálculo
(todos los importes con cifras exactas). Los 4 casos `Integration` son
exactamente los que verifican que las operaciones dobles no se quedan a medias.

**Dependencia de las preguntas abiertas.** DOC-04 avisa de que REQ-019, REQ-021,
REQ-035, REQ-040, REQ-050, REQ-071, REQ-074 y REQ-079 pueden cambiar de enunciado
en cuanto el negocio conteste. Los casos que cuelgan de ellos —TC-025, TC-028,
TC-048, TC-055, TC-071, TC-072, TC-101, TC-104 y TC-110— están escritos sobre lo
que DOC-04 **sí** afirma hoy, nunca sobre la parte en duda, y quedan marcados en
el apartado 6 como casos que habrá que revisar tras la respuesta. Desde la
revisión 1.2.0, seis de esas preguntas tienen ya respuesta de negocio y **ningún
caso ha cambiado por ello**: el motivo, en el apartado 6.3.

## 2. Riesgos y prioridades

Dónde duele más que falle, en orden, y cómo se traduce en la prioridad asignada.

| Riesgo | Por qué duele | Requisitos implicados | Prioridad asignada |
|---|---|---|---|
| **El importe facturado es incorrecto** | El taller cobra de menos o de más, y la factura ya emitida no se puede corregir (Q-06) | REQ-049, REQ-050, REQ-051 | `Critical` en el cálculo de base, IVA por defecto y redondeo; `High` en el IVA indicado a mano |
| **El stock deja de reflejar el almacén** | El taller compra piezas que tiene o vende las que no; el error es silencioso y se acumula | REQ-035, REQ-039 | `Critical` en descuento, devolución y en las dos pruebas de operación completa |
| **Una operación doble se queda a medias** | Línea registrada sin mover stock, o factura emitida sin bloquear sus albaranes: el dato queda incoherente sin que nadie se entere | REQ-035, REQ-039, REQ-047 | `Critical` en los 4 casos `Integration` |
| **Se borra algo de lo que cuelga trabajo o dinero** | Un cliente, un vehículo, una pieza o un empleado borrado deja huérfanos albaranes, facturas y nóminas | REQ-007, REQ-008, REQ-017, REQ-024, REQ-062 | `Critical` en los cinco bloqueos |
| **Se duplica una identidad única** | Dos vehículos con la misma matrícula, o dos nóminas del mismo mes: el trabajo se imputa al documento equivocado | REQ-013, REQ-068 | `Critical` en alta y en modificación |
| **Un documento cerrado se altera** | Un albarán ya facturado que se modifica cambia el respaldo de una factura emitida | REQ-042 | `Critical` en los tres casos de bloqueo |
| **Un dato obligatorio entra vacío** | Registros sin nombre que no se pueden buscar ni identificar | REQ-003, REQ-012, REQ-020, REQ-032, REQ-058, REQ-066 | `Critical` en el rechazo; `High`/`Medium` en el camino feliz |
| **El correlativo anual se rompe** | Numeración duplicada o con saltos en documentos con valor fiscal | REQ-029, REQ-048 | `High` en el formato, `Medium` en el incremento |
| **Una consulta no muestra lo que debe** | Molesta al usuario pero no corrompe nada, y se detecta a simple vista | REQ-001, REQ-004, REQ-018, REQ-052, REQ-056, REQ-063 | `High` o `Medium` según el módulo |
| **El idioma o el tema no se comportan** | Es cosmético y reversible al instante | REQ-075 a REQ-079 | `Medium`, y `Low` en el tema por defecto y en Configuración |
| **No se puede crear un eslabón del ciclo** | Sin cliente, sin vehículo, sin albarán o sin línea no hay nada que facturar: el taller trabaja y no cobra, y la línea es además donde nace el importe | REQ-002, REQ-010, REQ-026, REQ-030, REQ-036 | `Critical` en el camino principal de cada uno; `Medium` en la segunda vía de acceso a la misma operación |
| **Un vocabulario cerrado deja de serlo** | Una línea sin tipo, o un documento en un estado que no es ni pendiente ni pagado, dejan importes fuera de todo recuento sin que salte ningún aviso | REQ-031, REQ-055, REQ-073 | `High` en el único caso de cada uno |

**Reparto resultante:** 49 `Critical`, 31 `High`, 28 `Medium`, 2 `Low`. La
prioridad discrimina: si A-09 necesita la suite mínima, los 49 `Critical`
protegen dinero, stock, unicidad, bloqueos y la creación de los eslabones del
ciclo; los 21 casos etiquetados `smoke` demuestran en unos minutos que la
aplicación levanta y que el ciclo cliente-vehículo-albarán-factura funciona de
punta a punta.

**Dos criterios que compiten, y cuál manda.** La regla general de este plan es
`High` para el camino feliz de cada requisito. Cuando ese camino feliz **es** el
camino del dinero, manda la otra regla —`Critical` para lo que rompe dinero o
integridad— y no la general:

- **Los cinco requisitos `critical`** —REQ-002, REQ-010, REQ-026, REQ-030,
  REQ-036— dan de alta los eslabones del ciclo de facturación: cliente, vehículo,
  albarán, línea de pieza y línea de mano de obra. Tres de ellos son de
  `albarans`, y no por casualidad: cada línea que se añade produce el importe que
  acabará en la factura. Sus casos principales —**TC-003, TC-013, TC-034, TC-040
  y TC-050**— son `Critical`. **TC-014 y TC-035 se quedan en `Medium`**: son la
  segunda vía de acceso —desde la ficha del cliente y desde la ficha del
  vehículo— a una operación que el caso principal ya deja verificada.
- **Los tres requisitos `high`** —REQ-031, REQ-055, REQ-073— son invariantes de
  vocabulario cerrado nacidas de BR-ALB-04, BR-FAC-08 y BR-NOM-06. **TC-041,
  TC-078 y TC-103 son el único caso de su requisito** y por tanto su camino
  feliz: los tres son `High`. Lo barato que es comprobar una invariante no dice
  nada de lo que importa que se rompa.

**Los tres no se comprueban igual, y la asimetría es deliberada.** REQ-031 sí
describe una consecuencia observable —la anotación de un tercer tipo *no llega a
registrarse, de modo que el albarán mantiene las líneas y los importes que ya
tenía*—, así que **TC-041 la verifica** y es `Negative`. REQ-055 y REQ-073 no
enuncian ninguna consecuencia de que su estado de pago tome otro valor —está en
manos de `DOC-04/Q-14` y `DOC-04/Q-15`—, así que TC-078 y TC-103 comprueban lo
único observable: que la opción existe y se puede cambiar. Se verifica la
consecuencia donde el requisito la sostiene, no en los tres a la vez por simetría.

Ninguno de estos ajustes ha requerido tocar DOC-04: las prioridades que A-02
asignó son coherentes con el resto del documento —los eslabones de la cadena de
facturación son `critical` y los catálogos auxiliares, pieza y empleado, son
`high`—.

## 3. Cobertura de requisitos

Los 79 requisitos de DOC-04, con los casos que los cubren. **Sin GAP PLAN: 79 de
79 cubiertos.**

| REQ | Módulo | Casos | Nº |
|---|---|---|---|
| REQ-001 | clients | TC-001, TC-002 | 2 |
| REQ-002 | clients | TC-003 | 1 |
| REQ-003 | clients | TC-004, TC-005 | 2 |
| REQ-004 | clients | TC-006 | 1 |
| REQ-005 | clients | TC-007 | 1 |
| REQ-006 | clients | TC-008, TC-009 | 2 |
| REQ-007 | clients | TC-010 | 1 |
| REQ-008 | clients | TC-011 | 1 |
| REQ-009 | vehicles | TC-012 | 1 |
| REQ-010 | vehicles | TC-013, TC-014 | 2 |
| REQ-011 | vehicles | TC-015 | 1 |
| REQ-012 | vehicles | TC-016, TC-017 | 2 |
| REQ-013 | vehicles | TC-018, TC-019 | 2 |
| REQ-014 | vehicles | TC-020 | 1 |
| REQ-015 | vehicles | TC-021 | 1 |
| REQ-016 | vehicles | TC-022 | 1 |
| REQ-017 | vehicles | TC-023 | 1 |
| REQ-018 | peces | TC-024 | 1 |
| REQ-019 | peces | TC-025 | 1 |
| REQ-020 | peces | TC-026, TC-027 | 2 |
| REQ-021 | peces | TC-028 | 1 |
| REQ-022 | peces | TC-029 | 1 |
| REQ-023 | peces | TC-030 | 1 |
| REQ-024 | peces | TC-031 | 1 |
| REQ-025 | albarans | TC-032, TC-033 | 2 |
| REQ-026 | albarans | TC-034, TC-035 | 2 |
| REQ-027 | albarans | TC-036 | 1 |
| REQ-028 | albarans | TC-037 | 1 |
| REQ-029 | albarans | TC-038, TC-039 | 2 |
| REQ-030 | albarans | TC-040 | 1 |
| REQ-031 | albarans | TC-041 | 1 |
| REQ-032 | albarans | TC-042, TC-043, TC-044 | 3 |
| REQ-033 | albarans | TC-045 | 1 |
| REQ-034 | albarans | TC-046, TC-047 | 2 |
| REQ-035 | albarans | TC-048, TC-049 | 2 |
| REQ-036 | albarans | TC-050 | 1 |
| REQ-037 | albarans | TC-051 | 1 |
| REQ-038 | albarans | TC-052 | 1 |
| REQ-039 | albarans | TC-053, TC-054 | 2 |
| REQ-040 | albarans | TC-055 | 1 |
| REQ-041 | albarans | TC-056 | 1 |
| REQ-042 | albarans | TC-057, TC-058, TC-059 | 3 |
| REQ-043 | factures | TC-060, TC-061 | 2 |
| REQ-044 | factures | TC-062 | 1 |
| REQ-045 | factures | TC-063 | 1 |
| REQ-046 | factures | TC-064 | 1 |
| REQ-047 | factures | TC-065, TC-066 | 2 |
| REQ-048 | factures | TC-067, TC-068 | 2 |
| REQ-049 | factures | TC-069, TC-070 | 2 |
| REQ-050 | factures | TC-071, TC-072 | 2 |
| REQ-051 | factures | TC-073 | 1 |
| REQ-052 | factures | TC-074 | 1 |
| REQ-053 | factures | TC-075 | 1 |
| REQ-054 | factures | TC-076, TC-077 | 2 |
| REQ-055 | factures | TC-078 | 1 |
| REQ-056 | personal | TC-079 | 1 |
| REQ-057 | personal | TC-080 | 1 |
| REQ-058 | personal | TC-081, TC-082 | 2 |
| REQ-059 | personal | TC-083 | 1 |
| REQ-060 | personal | TC-084 | 1 |
| REQ-061 | personal | TC-085 | 1 |
| REQ-062 | personal | TC-086 | 1 |
| REQ-063 | nomines | TC-087 | 1 |
| REQ-064 | nomines | TC-088, TC-089 | 2 |
| REQ-065 | nomines | TC-090 | 1 |
| REQ-066 | nomines | TC-091 | 1 |
| REQ-067 | nomines | TC-092, TC-093, TC-094 | 3 |
| REQ-068 | nomines | TC-095, TC-096 | 2 |
| REQ-069 | nomines | TC-097 | 1 |
| REQ-070 | nomines | TC-098, TC-099, TC-100 | 3 |
| REQ-071 | nomines | TC-101 | 1 |
| REQ-072 | nomines | TC-102 | 1 |
| REQ-073 | nomines | TC-103 | 1 |
| REQ-074 | nomines | TC-104 | 1 |
| REQ-075 | shell | TC-105 | 1 |
| REQ-076 | shell | TC-106, TC-107 | 2 |
| REQ-077 | shell | TC-108 | 1 |
| REQ-078 | shell | TC-109 | 1 |
| REQ-079 | configuracio | TC-110 | 1 |

**Requisitos sin cobertura: ninguno.** Los cinco requisitos que más casos
concentran son REQ-032, REQ-042, REQ-067 y REQ-070 (tres casos cada uno), y no es
casualidad: son los que combinan una regla que se puede violar con un límite
numérico o con un estado final.

## 4. Casos por módulo

Nueve bloques `testcases`, uno por módulo, con numeración `TC-nnn` **global y
continua** de TC-001 a TC-110. El `external_id` sigue el formato
`TALLER-<MOD>-TC-nnn` y es la clave del upsert en Rally: si cambia, Rally duplica
el caso en vez de actualizarlo.

| Módulo | Código | Casos | Rango |
|---|---|---|---|
| clients | CLI | 11 | TC-001 – TC-011 |
| vehicles | VEH | 12 | TC-012 – TC-023 |
| peces | PEC | 8 | TC-024 – TC-031 |
| albarans | ALB | 28 | TC-032 – TC-059 |
| factures | FAC | 19 | TC-060 – TC-078 |
| personal | PER | 8 | TC-079 – TC-086 |
| nomines | NOM | 18 | TC-087 – TC-104 |
| shell | SHL | 5 | TC-105 – TC-109 |
| configuracio | CFG | 1 | TC-110 |

**Los campos que cada caso declara además de los del contrato base.**
`depends_on` (los casos que **deben** haber corrido antes), `touches` (los
recursos que el caso **modifica**, nunca los que solo lee), `restores_state`
(verdadero solo si deja el sistema exactamente como lo encontró), un bloque
`automation` con `grade`, `reason` y `blocked`, y **`verification_path`**, que
dice por qué vía se prueba el caso. **Los 110 los llevan; ninguno queda sin
declarar.** `blocked` es `false` en los 110: nadie ha prohibido automatizar nada,
y el grado es informativo —S-10 lo usa para decidir por dónde empieza, no para
excluir—. Las tablas resumen de cada módulo siguen mostrando lo que un QA humano
necesita para elegir qué ejecutar; lo que sale de estos campos —el orden, los
carriles, el reparto por grado y el reparto por vía— se lee entero en 4.10, 4.11
y 4.12, sin parsear YAML.

### 4.1 Clientes

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-001 | REQ-001 | Listar clientes y buscar por nombre | High | Functional | smoke, regresion |
| TC-002 | REQ-001 | Ordenar por columna y paginar el listado de clientes | Medium | Functional | regresion |
| TC-003 | REQ-002 | Registrar un cliente nuevo | Critical | Functional | smoke, regresion |
| TC-004 | REQ-003 | Rechazar el alta de un cliente sin nombre | Critical | Negative | regresion |
| TC-005 | REQ-003 | Rechazar la modificación que deja al cliente sin nombre | Critical | Negative | regresion |
| TC-006 | REQ-004 | Consultar la ficha de un cliente con vehículos y facturas | High | Functional | smoke |
| TC-007 | REQ-005 | Modificar los datos de un cliente registrado | High | Functional | regresion |
| TC-008 | REQ-006 | Dar de baja un cliente sin vehículos ni facturas | Medium | Functional | regresion |
| TC-009 | REQ-006 | Cancelar la confirmación de baja deja el cliente registrado | Medium | Negative | — |
| TC-010 | REQ-007 | Impedir la baja de un cliente con vehículos asociados | Critical | Negative | regresion |
| TC-011 | REQ-008 | Impedir la baja de un cliente con facturas asociadas | Critical | Negative | regresion |

```yaml testcases
version: 1
module: clients
cases:
  - id: TC-001
    external_id: TALLER-CLI-TC-001
    name: "Listar clientes y buscar por nombre"
    requirement: REQ-001
    priority: High
    type: Functional
    component: clients
    preconditions: "Existen al menos tres clientes registrados, entre ellos 'Garcia Motors SL' y 'Tallers Puig SL'"
    steps:
      - input: "Abrir la sección Clientes desde el menú"
        expected: "El listado muestra los clientes registrados, con la columna Nombre visible"
      - input: "Escribir 'Garcia' en el buscador por nombre"
        expected: "El listado queda reducido a los clientes cuyo nombre contiene 'Garcia' e incluye 'Garcia Motors SL'; 'Tallers Puig SL' no aparece"
      - input: "Vaciar el buscador"
        expected: "El listado vuelve a mostrar todos los clientes registrados"
    test_data_ref: DS-001
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-002
    external_id: TALLER-CLI-TC-002
    name: "Ordenar por columna y paginar el listado de clientes"
    requirement: REQ-001
    priority: Medium
    type: Functional
    component: clients
    preconditions: "Existen más clientes registrados de los que caben en una página del listado"
    steps:
      - input: "Pulsar la cabecera de la columna Nombre"
        expected: "El listado se reordena por nombre en orden alfabético ascendente"
      - input: "Pulsar de nuevo la cabecera de la columna Nombre"
        expected: "El listado se reordena por nombre en orden alfabético descendente"
      - input: "Avanzar a la página siguiente del listado"
        expected: "El listado muestra el grupo siguiente de clientes, sin repetir ninguno de la página anterior"
    test_data_ref: DS-001
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el resultado depende del volumen y del orden del dataset, que ningún DS-nnn fija todavía: una fila de más cambia lo que muestra la página siguiente"
      blocked: false
  - id: TC-003
    external_id: TALLER-CLI-TC-003
    name: "Registrar un cliente nuevo"
    requirement: REQ-002
    priority: Critical
    type: Functional
    component: clients
    preconditions: "No existe ningún cliente con NIF B12345678"
    steps:
      - input: "Pulsar Nuevo cliente, informar nombre 'Tallers Puig SL', NIF B12345678 y teléfono 933000111, y guardar"
        expected: "El sistema registra el cliente y 'Tallers Puig SL' aparece en el listado de clientes"
      - input: "Abrir la ficha de 'Tallers Puig SL'"
        expected: "La ficha muestra NIF B12345678 y teléfono 933000111"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [clients]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-004
    external_id: TALLER-CLI-TC-004
    name: "Rechazar el alta de un cliente sin nombre"
    requirement: REQ-003
    priority: Critical
    type: Negative
    component: clients
    preconditions: "La sección Clientes está abierta"
    steps:
      - input: "Pulsar Nuevo cliente, dejar el nombre vacío, informar teléfono 933000222 y guardar"
        expected: "El sistema no registra el cliente y avisa de que el nombre es obligatorio"
      - input: "Volver al listado de clientes"
        expected: "No existe ningún cliente con teléfono 933000222"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-005
    external_id: TALLER-CLI-TC-005
    name: "Rechazar la modificación que deja al cliente sin nombre"
    requirement: REQ-003
    priority: Critical
    type: Negative
    component: clients
    preconditions: "Existe el cliente 'Garcia Motors SL'"
    steps:
      - input: "Abrir 'Garcia Motors SL', borrar el contenido del campo Nombre y guardar"
        expected: "El sistema no guarda el cambio y avisa de que el nombre es obligatorio"
      - input: "Volver al listado de clientes"
        expected: "El cliente sigue apareciendo con el nombre 'Garcia Motors SL'"
    test_data_ref: DS-001
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-006
    external_id: TALLER-CLI-TC-006
    name: "Consultar la ficha de un cliente con vehículos y facturas"
    requirement: REQ-004
    priority: High
    type: Functional
    component: clients
    preconditions: "El cliente 'Garcia Motors SL' tiene el vehículo 1234ABC y una factura emitida"
    steps:
      - input: "Abrir la ficha del cliente 'Garcia Motors SL'"
        expected: "La ficha muestra los datos del cliente: nombre, NIF, teléfono y dirección"
      - input: "Localizar el apartado de vehículos de la ficha"
        expected: "Aparece el vehículo con matrícula 1234ABC"
      - input: "Localizar el apartado de facturas de la ficha"
        expected: "Aparece la factura emitida a este cliente con su número y su total"
    test_data_ref: DS-002
    tags: [smoke]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-007
    external_id: TALLER-CLI-TC-007
    name: "Modificar los datos de un cliente registrado"
    requirement: REQ-005
    priority: High
    type: Functional
    component: clients
    preconditions: "Existe el cliente 'Garcia Motors SL' con teléfono 933000111"
    steps:
      - input: "Abrir 'Garcia Motors SL', cambiar el teléfono a 933999888 y guardar"
        expected: "El sistema guarda el cambio y vuelve al listado sin avisos de error"
      - input: "Abrir de nuevo la ficha de 'Garcia Motors SL'"
        expected: "La ficha muestra el teléfono 933999888 y el nombre sin cambios"
    test_data_ref: DS-001
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [clients]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-008
    external_id: TALLER-CLI-TC-008
    name: "Dar de baja un cliente sin vehículos ni facturas"
    requirement: REQ-006
    priority: Medium
    type: Functional
    component: clients
    preconditions: "Existe el cliente 'Motos Rius' sin vehículos ni facturas asociadas"
    steps:
      - input: "Abrir el listado de clientes y pulsar Borrar en la fila de 'Motos Rius'"
        expected: "El sistema pide confirmación antes de dar de baja al cliente"
      - input: "Confirmar la baja"
        expected: "'Motos Rius' desaparece del listado de clientes"
    test_data_ref: DS-001
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [clients]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-009
    external_id: TALLER-CLI-TC-009
    name: "Cancelar la confirmación de baja deja el cliente registrado"
    requirement: REQ-006
    priority: Medium
    type: Negative
    component: clients
    preconditions: "Existe el cliente 'Motos Rius' sin vehículos ni facturas asociadas"
    steps:
      - input: "Pulsar Borrar en la fila de 'Motos Rius' y cancelar la confirmación"
        expected: "El sistema cierra la confirmación sin dar de baja al cliente"
      - input: "Revisar el listado de clientes"
        expected: "'Motos Rius' sigue apareciendo en el listado"
    test_data_ref: DS-001
    tags: []
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-010
    external_id: TALLER-CLI-TC-010
    name: "Impedir la baja de un cliente con vehículos asociados"
    requirement: REQ-007
    priority: Critical
    type: Negative
    component: clients
    preconditions: "El cliente 'Garcia Motors SL' tiene asociado el vehículo 1234ABC"
    steps:
      - input: "Pulsar Borrar en la fila de 'Garcia Motors SL' y confirmar la baja"
        expected: "El sistema no da de baja al cliente y avisa de que tiene vehículos asociados"
      - input: "Revisar el listado de clientes y la ficha del cliente"
        expected: "'Garcia Motors SL' sigue registrado y el vehículo 1234ABC sigue asociado a él"
    test_data_ref: DS-002
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-011
    external_id: TALLER-CLI-TC-011
    name: "Impedir la baja de un cliente con facturas asociadas"
    requirement: REQ-008
    priority: Critical
    type: Negative
    component: clients
    preconditions: "El cliente 'Garcia Motors SL' tiene una factura emitida y ningún vehículo asociado"
    steps:
      - input: "Pulsar Borrar en la fila de 'Garcia Motors SL' y confirmar la baja"
        expected: "El sistema no da de baja al cliente y avisa de que tiene facturas asociadas"
      - input: "Abrir la ficha del cliente"
        expected: "El cliente sigue registrado y su factura sigue apareciendo en la ficha"
    test_data_ref: DS-002
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
```

### 4.2 Vehículos

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-012 | REQ-009 | Listar vehículos, buscar, ordenar y paginar | High | Functional | regresion |
| TC-013 | REQ-010 | Registrar un vehículo desde el módulo de vehículos | Critical | Functional | smoke, regresion |
| TC-014 | REQ-010 | Registrar un vehículo desde la ficha del cliente | Medium | Functional | regresion |
| TC-015 | REQ-011 | Rechazar el alta de un vehículo sin cliente existente | Critical | Negative | regresion |
| TC-016 | REQ-012 | Rechazar el alta de un vehículo sin marca, modelo o matrícula | Critical | Negative | regresion |
| TC-017 | REQ-012 | Rechazar la modificación que deja el vehículo sin matrícula | Critical | Negative | regresion |
| TC-018 | REQ-013 | Impedir registrar dos vehículos con la misma matrícula | Critical | Negative | regresion |
| TC-019 | REQ-013 | Impedir asignar por modificación una matrícula ya existente | Critical | Negative | regresion |
| TC-020 | REQ-014 | Consultar la ficha de un vehículo con su cliente y sus albaranes | High | Functional | smoke |
| TC-021 | REQ-015 | Modificar los datos de un vehículo registrado | High | Functional | regresion |
| TC-022 | REQ-016 | Dar de baja un vehículo sin albaranes | Medium | Functional | regresion |
| TC-023 | REQ-017 | Impedir la baja de un vehículo con albaranes asociados | Critical | Negative | regresion |

```yaml testcases
version: 1
module: vehicles
cases:
  - id: TC-012
    external_id: TALLER-VEH-TC-012
    name: "Listar vehículos, buscar, ordenar y paginar"
    requirement: REQ-009
    priority: High
    type: Functional
    component: vehicles
    preconditions: "Existen al menos tres vehículos registrados, entre ellos 1234ABC, y más de los que caben en una página"
    steps:
      - input: "Abrir la sección Vehículos desde el menú"
        expected: "El listado muestra los vehículos registrados con matrícula, marca y modelo"
      - input: "Escribir '1234ABC' en el buscador"
        expected: "El listado queda reducido al vehículo con matrícula 1234ABC"
      - input: "Vaciar el buscador, pulsar la cabecera de la columna Matrícula y avanzar de página"
        expected: "El listado se reordena por matrícula y la página siguiente muestra vehículos distintos de los de la primera"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el resultado depende del volumen y del orden del dataset, que ningún DS-nnn fija todavía: una fila de más cambia lo que muestra la página siguiente"
      blocked: false
  - id: TC-013
    external_id: TALLER-VEH-TC-013
    name: "Registrar un vehículo desde el módulo de vehículos"
    requirement: REQ-010
    priority: Critical
    type: Functional
    component: vehicles
    preconditions: "Existe el cliente 'Garcia Motors SL' y no existe ningún vehículo con matrícula 5678DEF"
    steps:
      - input: "Abrir Vehículos, pulsar Nuevo vehículo, elegir el cliente 'Garcia Motors SL', informar marca Seat, modelo Ibiza y matrícula 5678DEF, y guardar"
        expected: "El sistema registra el vehículo y 5678DEF aparece en el listado de vehículos"
      - input: "Abrir la ficha del vehículo 5678DEF"
        expected: "La ficha muestra marca Seat, modelo Ibiza y el cliente 'Garcia Motors SL' como propietario"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [vehicles]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-014
    external_id: TALLER-VEH-TC-014
    name: "Registrar un vehículo desde la ficha del cliente"
    requirement: REQ-010
    priority: Medium
    type: Functional
    component: vehicles
    preconditions: "Existe el cliente 'Tallers Puig SL' y no existe ningún vehículo con matrícula 9012GHI"
    steps:
      - input: "Abrir la ficha de 'Tallers Puig SL' y pulsar Nuevo vehículo desde el apartado de vehículos"
        expected: "Se abre el formulario de vehículo con el cliente 'Tallers Puig SL' ya asignado"
      - input: "Informar marca Renault, modelo Clio y matrícula 9012GHI, y guardar"
        expected: "El vehículo 9012GHI aparece en el apartado de vehículos de la ficha de 'Tallers Puig SL'"
    test_data_ref: DS-001
    tags: [regresion]
    verification_path: ui

    depends_on: [TC-022]
    touches: [vehicles]
    restores_state: false
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-015
    external_id: TALLER-VEH-TC-015
    name: "Rechazar el alta de un vehículo sin cliente existente"
    requirement: REQ-011
    priority: Critical
    type: Negative
    component: vehicles
    preconditions: "La sección Vehículos está abierta y no existe ningún vehículo con matrícula 3456JKL"
    steps:
      - input: "Pulsar Nuevo vehículo, dejar el cliente sin elegir, informar marca Ford, modelo Focus y matrícula 3456JKL, y guardar"
        expected: "El sistema no registra el vehículo y avisa de que debe indicarse un cliente existente"
      - input: "Volver al listado de vehículos"
        expected: "No existe ningún vehículo con matrícula 3456JKL"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-016
    external_id: TALLER-VEH-TC-016
    name: "Rechazar el alta de un vehículo sin marca, modelo o matrícula"
    requirement: REQ-012
    priority: Critical
    type: Negative
    component: vehicles
    preconditions: "Existe el cliente 'Garcia Motors SL'"
    steps:
      - input: "Pulsar Nuevo vehículo, elegir 'Garcia Motors SL', informar solo la matrícula 7788MNO y guardar"
        expected: "El sistema no registra el vehículo y avisa de que marca y modelo son obligatorios"
      - input: "Informar marca Opel y modelo Corsa, borrar la matrícula y guardar"
        expected: "El sistema no registra el vehículo y avisa de que la matrícula es obligatoria"
      - input: "Volver al listado de vehículos"
        expected: "No existe ningún vehículo con matrícula 7788MNO"
    test_data_ref: DS-001
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-017
    external_id: TALLER-VEH-TC-017
    name: "Rechazar la modificación que deja el vehículo sin matrícula"
    requirement: REQ-012
    priority: Critical
    type: Negative
    component: vehicles
    preconditions: "Existe el vehículo con matrícula 1234ABC"
    steps:
      - input: "Abrir el vehículo 1234ABC, borrar el contenido del campo Matrícula y guardar"
        expected: "El sistema no guarda el cambio y avisa de que la matrícula es obligatoria"
      - input: "Volver al listado de vehículos"
        expected: "El vehículo sigue apareciendo con la matrícula 1234ABC"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-018
    external_id: TALLER-VEH-TC-018
    name: "Impedir registrar dos vehículos con la misma matrícula"
    requirement: REQ-013
    priority: Critical
    type: Negative
    component: vehicles
    preconditions: "Existe el vehículo con matrícula 1234ABC del cliente 'Garcia Motors SL'"
    steps:
      - input: "Pulsar Nuevo vehículo, elegir el cliente 'Tallers Puig SL', informar marca Audi, modelo A3 y matrícula 1234ABC, y guardar"
        expected: "El sistema no registra el vehículo y avisa de que la matrícula ya existe"
      - input: "Buscar 1234ABC en el listado de vehículos"
        expected: "Aparece un único vehículo con matrícula 1234ABC y sigue perteneciendo a 'Garcia Motors SL'"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-019
    external_id: TALLER-VEH-TC-019
    name: "Impedir asignar por modificación una matrícula ya existente"
    requirement: REQ-013
    priority: Critical
    type: Negative
    component: vehicles
    preconditions: "Existen los vehículos 1234ABC y 5678DEF"
    steps:
      - input: "Abrir el vehículo 5678DEF, cambiar su matrícula a 1234ABC y guardar"
        expected: "El sistema no guarda el cambio y avisa de que la matrícula ya existe"
      - input: "Buscar 1234ABC y 5678DEF en el listado de vehículos"
        expected: "Siguen existiendo dos vehículos distintos, uno con 1234ABC y otro con 5678DEF"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-020
    external_id: TALLER-VEH-TC-020
    name: "Consultar la ficha de un vehículo con su cliente y sus albaranes"
    requirement: REQ-014
    priority: High
    type: Functional
    component: vehicles
    preconditions: "El vehículo 1234ABC pertenece a 'Garcia Motors SL' y tiene al menos un albarán abierto"
    steps:
      - input: "Abrir la ficha del vehículo 1234ABC"
        expected: "La ficha muestra matrícula 1234ABC, marca y modelo del vehículo"
      - input: "Localizar el propietario en la ficha"
        expected: "Aparece 'Garcia Motors SL' como cliente propietario"
      - input: "Localizar el apartado de albaranes de la ficha"
        expected: "Aparece el albarán del vehículo con su número y su situación"
    test_data_ref: DS-004
    tags: [smoke]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-021
    external_id: TALLER-VEH-TC-021
    name: "Modificar los datos de un vehículo registrado"
    requirement: REQ-015
    priority: High
    type: Functional
    component: vehicles
    preconditions: "Existe el vehículo 1234ABC con modelo Ibiza"
    steps:
      - input: "Abrir el vehículo 1234ABC, cambiar el modelo a 'Ibiza 1.6 TDI' y guardar"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Abrir de nuevo la ficha del vehículo 1234ABC"
        expected: "La ficha muestra el modelo 'Ibiza 1.6 TDI' y la matrícula 1234ABC sin cambios"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [vehicles]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-022
    external_id: TALLER-VEH-TC-022
    name: "Dar de baja un vehículo sin albaranes"
    requirement: REQ-016
    priority: Medium
    type: Functional
    component: vehicles
    preconditions: "Existe el vehículo 9012GHI sin ningún albarán asociado"
    steps:
      - input: "Pulsar Borrar en la fila del vehículo 9012GHI"
        expected: "El sistema pide confirmación antes de dar de baja el vehículo"
      - input: "Confirmar la baja"
        expected: "El vehículo 9012GHI desaparece del listado de vehículos"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [vehicles]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-023
    external_id: TALLER-VEH-TC-023
    name: "Impedir la baja de un vehículo con albaranes asociados"
    requirement: REQ-017
    priority: Critical
    type: Negative
    component: vehicles
    preconditions: "El vehículo 1234ABC tiene al menos un albarán asociado"
    steps:
      - input: "Pulsar Borrar en la fila del vehículo 1234ABC y confirmar la baja"
        expected: "El sistema no da de baja el vehículo y avisa de que tiene albaranes asociados"
      - input: "Abrir la ficha del vehículo 1234ABC"
        expected: "El vehículo sigue registrado y su albarán sigue apareciendo en la ficha"
    test_data_ref: DS-004
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
```

### 4.3 Piezas

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-024 | REQ-018 | Consultar el catálogo de piezas con referencia, precio y stock | High | Functional | smoke, regresion |
| TC-025 | REQ-019 | Dar de alta una pieza con su stock inicial | High | Functional | regresion |
| TC-026 | REQ-020 | Rechazar el alta de una pieza sin nombre | Critical | Negative | regresion |
| TC-027 | REQ-020 | Rechazar la modificación que deja la pieza sin nombre | Critical | Negative | regresion |
| TC-028 | REQ-021 | Consultar la ficha completa de una pieza | Medium | Functional | — |
| TC-029 | REQ-022 | Modificar el precio y el stock de una pieza | High | Functional | regresion |
| TC-030 | REQ-023 | Dar de baja una pieza no utilizada en ningún albarán | Medium | Functional | regresion |
| TC-031 | REQ-024 | Impedir la baja de una pieza utilizada en un albarán | Critical | Negative | regresion |

```yaml testcases
version: 1
module: peces
cases:
  - id: TC-024
    external_id: TALLER-PEC-TC-024
    name: "Consultar el catálogo de piezas con referencia, precio y stock"
    requirement: REQ-018
    priority: High
    type: Functional
    component: peces
    preconditions: "Existe en el catálogo la pieza 'Filtro de aceite' con referencia FIL-001, precio 12,50 € y stock 40"
    steps:
      - input: "Abrir la sección Piezas desde el menú"
        expected: "El catálogo muestra las piezas registradas"
      - input: "Localizar la fila de la pieza 'Filtro de aceite'"
        expected: "La fila muestra referencia FIL-001, precio 12,50 € y stock 40"
    test_data_ref: DS-003
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-025
    external_id: TALLER-PEC-TC-025
    name: "Dar de alta una pieza con su stock inicial"
    requirement: REQ-019
    priority: High
    type: Functional
    component: peces
    preconditions: "No existe ninguna pieza con referencia PAS-010"
    steps:
      - input: "Pulsar Nueva pieza, informar nombre 'Pastillas de freno', referencia PAS-010, precio 45,00 € y stock inicial 12, y guardar"
        expected: "El sistema da de alta la pieza y 'Pastillas de freno' aparece en el catálogo"
      - input: "Localizar la fila de 'Pastillas de freno' en el catálogo"
        expected: "La fila muestra referencia PAS-010, precio 45,00 € y stock 12"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: [TC-030]
    touches: [peces]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-026
    external_id: TALLER-PEC-TC-026
    name: "Rechazar el alta de una pieza sin nombre"
    requirement: REQ-020
    priority: Critical
    type: Negative
    component: peces
    preconditions: "La sección Piezas está abierta"
    steps:
      - input: "Pulsar Nueva pieza, dejar el nombre vacío, informar referencia XXX-999 y precio 5,00 €, y guardar"
        expected: "El sistema no da de alta la pieza y avisa de que el nombre es obligatorio"
      - input: "Volver al catálogo de piezas"
        expected: "No existe ninguna pieza con referencia XXX-999"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-027
    external_id: TALLER-PEC-TC-027
    name: "Rechazar la modificación que deja la pieza sin nombre"
    requirement: REQ-020
    priority: Critical
    type: Negative
    component: peces
    preconditions: "Existe la pieza 'Filtro de aceite' con referencia FIL-001"
    steps:
      - input: "Abrir la pieza FIL-001, borrar el contenido del campo Nombre y guardar"
        expected: "El sistema no guarda el cambio y avisa de que el nombre es obligatorio"
      - input: "Volver al catálogo de piezas"
        expected: "La pieza FIL-001 sigue mostrando el nombre 'Filtro de aceite'"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-028
    external_id: TALLER-PEC-TC-028
    name: "Consultar la ficha completa de una pieza"
    requirement: REQ-021
    priority: Medium
    type: Functional
    component: peces
    preconditions: "La pieza FIL-001 tiene precio 12,50 €, coste 7,80 €, unidad 'unitat', proveedor 'Recanvis Vallès' y stock 40"
    steps:
      - input: "Abrir la ficha de la pieza FIL-001"
        expected: "La ficha muestra referencia FIL-001, precio 12,50 €, coste 7,80 €, unidad 'unitat', proveedor 'Recanvis Vallès' y stock 40"
    test_data_ref: DS-003
    tags: []
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "verifica solo que el coste y la unidad se muestran, nunca que se usen: DOC-04/Q-01 y DOC-04/Q-03 siguen abiertas y, si el negocio les da un papel, la ficha cambia y el caso se queda corto"
      blocked: false
  - id: TC-029
    external_id: TALLER-PEC-TC-029
    name: "Modificar el precio y el stock de una pieza"
    requirement: REQ-022
    priority: High
    type: Functional
    component: peces
    preconditions: "La pieza FIL-001 tiene precio 12,50 € y stock 40"
    steps:
      - input: "Abrir la pieza FIL-001, cambiar el precio a 13,20 € y el stock a 55, y guardar"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Localizar la fila de FIL-001 en el catálogo"
        expected: "La fila muestra precio 13,20 € y stock 55"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [peces, peces.estoc]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-030
    external_id: TALLER-PEC-TC-030
    name: "Dar de baja una pieza no utilizada en ningún albarán"
    requirement: REQ-023
    priority: Medium
    type: Functional
    component: peces
    preconditions: "Existe la pieza PAS-010 y no aparece en ninguna línea de albarán"
    steps:
      - input: "Pulsar Borrar en la fila de la pieza PAS-010"
        expected: "El sistema pide confirmación antes de dar de baja la pieza"
      - input: "Confirmar la baja"
        expected: "La pieza PAS-010 desaparece del catálogo de piezas"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [peces]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-031
    external_id: TALLER-PEC-TC-031
    name: "Impedir la baja de una pieza utilizada en un albarán"
    requirement: REQ-024
    priority: Critical
    type: Negative
    component: peces
    preconditions: "La pieza FIL-001 aparece en una línea de pieza de un albarán existente"
    steps:
      - input: "Pulsar Borrar en la fila de la pieza FIL-001 y confirmar la baja"
        expected: "El sistema no da de baja la pieza y avisa de que se ha utilizado en algún albarán"
      - input: "Volver al catálogo de piezas"
        expected: "La pieza FIL-001 sigue en el catálogo con su stock sin alterar"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
```

### 4.4 Albaranes

Es el módulo con más casos (28 de 110) por tres motivos: concentra 18 de los 79
requisitos, contiene las dos operaciones dobles sobre el stock y es el único con
un estado final que bloquea el documento.

**TC-041 es el único caso del plan que no se ejecuta entero por la interfaz**, y
conviene saber por qué. REQ-031 afirma que una anotación que no sea de pieza ni
de mano de obra no llega a registrarse; la pantalla no ofrece ningún tercer tipo,
de modo que por la interfaz el intento **no se puede ni formular**, y un caso que
solo mire el desplegable comprueba la premisa, no la consecuencia. El tercer paso
usa por tanto la única vía donde el tipo se escribe a mano: el registro directo
de líneas del albarán. No es una prueba de contrato de API —no comprueba ruta,
verbo ni código de respuesta— sino la comprobación del efecto que el requisito
promete sobre el albarán. **Es el único caso del plan con
`verification_path: service`**, y de él sale el criterio general que el apartado
**4.12** convierte en política y que cierra `Q-18`: los otros 30 casos `Negative`
**no** se duplican sobre esa vía, porque su vector sí existe en la pantalla.

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-032 | REQ-025 | Filtrar el listado de albaranes por vehículo | High | Functional | regresion |
| TC-033 | REQ-025 | Filtrar el listado de albaranes por cliente y por situación | Medium | Functional | regresion |
| TC-034 | REQ-026 | Abrir un albarán desde el módulo de albaranes y comprobar que nace sin líneas | Critical | Functional | smoke, regresion |
| TC-035 | REQ-026 | Abrir un albarán desde la ficha del vehículo | Medium | Functional | regresion |
| TC-036 | REQ-027 | Rechazar la apertura de un albarán sin vehículo existente | Critical | Negative | regresion |
| TC-037 | REQ-028 | Un albarán recién abierto queda pendiente de facturar | Critical | Functional | smoke, regresion |
| TC-038 | REQ-029 | El albarán recibe número automático con formato año/A-nnnn | High | Functional | regresion |
| TC-039 | REQ-029 | El segundo albarán del año incrementa el correlativo en uno | Medium | Boundary | regresion |
| TC-040 | REQ-030 | Añadir a un albarán una línea de pieza con su cantidad | Critical | Functional | smoke, regresion |
| TC-041 | REQ-031 | Una anotación de un tercer tipo no se registra y el albarán conserva sus líneas y sus importes | High | Negative | — |
| TC-042 | REQ-032 | Rechazar una línea con cantidad cero | Critical | Boundary | regresion |
| TC-043 | REQ-032 | Rechazar una línea con cantidad negativa | Critical | Negative | regresion |
| TC-044 | REQ-032 | Aceptar una línea con cantidad uno | Medium | Boundary | regresion |
| TC-045 | REQ-033 | Rechazar una línea de pieza que no existe en el catálogo | Critical | Negative | regresion |
| TC-046 | REQ-034 | La línea de pieza sin precio hereda el precio del catálogo | High | Functional | regresion |
| TC-047 | REQ-034 | El precio informado a mano prevalece sobre el del catálogo | Medium | Functional | regresion |
| TC-048 | REQ-035 | Añadir una línea de pieza descuenta el stock del catálogo | Critical | Functional | smoke, regresion |
| TC-049 | REQ-035 | Una línea rechazada no mueve el stock | Critical | Integration | regresion |
| TC-050 | REQ-036 | Añadir una línea de mano de obra con horas y precio por hora | Critical | Functional | smoke, regresion |
| TC-051 | REQ-037 | Rechazar una línea de mano de obra sin descripción | High | Negative | regresion |
| TC-052 | REQ-038 | Retirar una línea de un albarán no facturado | High | Functional | regresion |
| TC-053 | REQ-039 | Retirar una línea de pieza devuelve el stock al catálogo | Critical | Functional | regresion |
| TC-054 | REQ-039 | Añadir y retirar la misma línea deja el stock como estaba | Critical | Integration | regresion |
| TC-055 | REQ-040 | Modificar vehículo, fecha y notas de un albarán no facturado | Medium | Functional | regresion |
| TC-056 | REQ-041 | Borrar un albarán no facturado con todas sus líneas | Medium | Functional | regresion |
| TC-057 | REQ-042 | Impedir modificar la cabecera de un albarán facturado | Critical | Negative | regresion |
| TC-058 | REQ-042 | Impedir borrar un albarán facturado | Critical | Negative | regresion |
| TC-059 | REQ-042 | Impedir añadir o retirar líneas en un albarán facturado | Critical | Negative | regresion |

```yaml testcases
version: 1
module: albarans
cases:
  - id: TC-032
    external_id: TALLER-ALB-TC-032
    name: "Filtrar el listado de albaranes por vehículo"
    requirement: REQ-025
    priority: High
    type: Functional
    component: albarans
    preconditions: "Existen albaranes de al menos dos vehículos distintos, uno de ellos el 1234ABC"
    steps:
      - input: "Abrir la sección Albaranes desde el menú"
        expected: "El listado muestra los albaranes registrados con su número, su vehículo y su situación"
      - input: "Aplicar el filtro por vehículo con el valor 1234ABC"
        expected: "El listado muestra únicamente albaranes del vehículo 1234ABC y ninguno de otros vehículos"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-033
    external_id: TALLER-ALB-TC-033
    name: "Filtrar el listado de albaranes por cliente y por situación"
    requirement: REQ-025
    priority: Medium
    type: Functional
    component: albarans
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente de facturar y otro ya facturado; existe además otro cliente con albaranes"
    steps:
      - input: "Aplicar el filtro por cliente con el valor 'Garcia Motors SL'"
        expected: "El listado muestra los dos albaranes de 'Garcia Motors SL' y ninguno de otro cliente"
      - input: "Añadir el filtro por situación con el valor pendiente de facturar"
        expected: "El listado muestra solo el albarán pendiente de facturar de 'Garcia Motors SL'; el ya facturado desaparece"
      - input: "Cambiar el filtro de situación al valor facturado"
        expected: "El listado muestra solo el albarán ya facturado de 'Garcia Motors SL'"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el resultado se comprueba por el rótulo del estado en pantalla, y DOC-04/Q-13 sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro"
      blocked: false
  - id: TC-034
    external_id: TALLER-ALB-TC-034
    name: "Abrir un albarán desde el módulo de albaranes y comprobar que nace sin líneas"
    requirement: REQ-026
    priority: Critical
    type: Functional
    component: albarans
    preconditions: "Existe el vehículo 1234ABC"
    steps:
      - input: "Abrir Albaranes, pulsar Nuevo albarán, elegir el vehículo 1234ABC, informar la fecha de hoy y guardar"
        expected: "El sistema abre el albarán y lo muestra en el listado asociado al vehículo 1234ABC"
      - input: "Abrir el detalle del albarán recién creado"
        expected: "El albarán no tiene ninguna línea: ni de pieza ni de mano de obra"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-035
    external_id: TALLER-ALB-TC-035
    name: "Abrir un albarán desde la ficha del vehículo"
    requirement: REQ-026
    priority: Medium
    type: Functional
    component: albarans
    preconditions: "Existe el vehículo 5678DEF"
    steps:
      - input: "Abrir la ficha del vehículo 5678DEF y pulsar Nuevo albarán desde su apartado de albaranes"
        expected: "Se abre el formulario de albarán con el vehículo 5678DEF ya asignado"
      - input: "Informar la fecha de hoy y guardar"
        expected: "El albarán aparece en el apartado de albaranes de la ficha del vehículo 5678DEF y no tiene ninguna línea"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans]
    restores_state: false
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-036
    external_id: TALLER-ALB-TC-036
    name: "Rechazar la apertura de un albarán sin vehículo existente"
    requirement: REQ-027
    priority: Critical
    type: Negative
    component: albarans
    preconditions: "La sección Albaranes está abierta"
    steps:
      - input: "Pulsar Nuevo albarán, dejar el vehículo sin elegir, informar la fecha de hoy y guardar"
        expected: "El sistema no abre el albarán y avisa de que debe indicarse un vehículo existente"
      - input: "Volver al listado de albaranes"
        expected: "No se ha creado ningún albarán nuevo: el listado conserva el mismo número de albaranes que antes"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-037
    external_id: TALLER-ALB-TC-037
    name: "Un albarán recién abierto queda pendiente de facturar"
    requirement: REQ-028
    priority: Critical
    type: Functional
    component: albarans
    preconditions: "Existe el vehículo 1234ABC"
    steps:
      - input: "Abrir un albarán nuevo para el vehículo 1234ABC con la fecha de hoy y guardar"
        expected: "El albarán queda en situación de pendiente de facturar, sin que el usuario haya elegido ninguna situación"
      - input: "Aplicar en el listado el filtro de situación pendiente de facturar"
        expected: "El albarán recién abierto aparece en el resultado del filtro"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans]
    restores_state: false
    automation:
      grade: medium
      reason: "el resultado se comprueba por el rótulo del estado en pantalla, y DOC-04/Q-13 sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro"
      blocked: false
  - id: TC-038
    external_id: TALLER-ALB-TC-038
    name: "El albarán recibe número automático con formato año/A-nnnn"
    requirement: REQ-029
    priority: High
    type: Functional
    component: albarans
    preconditions: "Existe el vehículo 1234ABC y el formulario de albarán no ofrece ningún campo de número"
    steps:
      - input: "Abrir un albarán nuevo para el vehículo 1234ABC y guardar sin informar ningún número"
        expected: "El sistema asigna un número con el formato año/A-nnnn, con el año en curso y cuatro dígitos, por ejemplo 2026/A-0007"
      - input: "Abrir el detalle del albarán"
        expected: "El número mostrado en el detalle es el mismo que muestra el listado"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans]
    restores_state: false
    automation:
      grade: medium
      reason: "el número esperado depende del contador vivo del entorno y del año en curso, así que el test debe derivarlo en ejecución en vez de compararlo con un valor fijo"
      blocked: false
  - id: TC-039
    external_id: TALLER-ALB-TC-039
    name: "El segundo albarán del año incrementa el correlativo en uno"
    requirement: REQ-029
    priority: Medium
    type: Boundary
    component: albarans
    preconditions: "Existe el vehículo 1234ABC y se conoce el número del último albarán del año en curso"
    steps:
      - input: "Abrir un albarán nuevo para el vehículo 1234ABC y anotar el número asignado"
        expected: "El sistema asigna un número del año en curso, por ejemplo 2026/A-0007"
      - input: "Abrir un segundo albarán para el mismo vehículo"
        expected: "El sistema asigna el número inmediatamente siguiente del mismo año, 2026/A-0008, sin repetir el anterior"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans]
    restores_state: false
    automation:
      grade: medium
      reason: "el número esperado depende del contador vivo del entorno y del año en curso, así que el test debe derivarlo en ejecución en vez de compararlo con un valor fijo"
      blocked: false
  - id: TC-040
    external_id: TALLER-ALB-TC-040
    name: "Añadir a un albarán una línea de pieza con su cantidad"
    requirement: REQ-030
    priority: Critical
    type: Functional
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar y la pieza FIL-001 'Filtro de aceite' con precio 12,50 € en el catálogo"
    steps:
      - input: "Abrir el albarán pendiente y pulsar Añadir línea de pieza"
        expected: "Se abre el formulario de línea de pieza con los campos de pieza y cantidad"
      - input: "Elegir la pieza FIL-001, informar cantidad 2 y guardar"
        expected: "El albarán muestra una línea de pieza con FIL-001, cantidad 2, precio 12,50 € e importe 25,00 €"
    test_data_ref: DS-005
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-041
    external_id: TALLER-ALB-TC-041
    name: "Una anotación de un tercer tipo no se registra y el albarán conserva sus líneas y sus importes"
    requirement: REQ-031
    priority: High
    type: Negative
    component: albarans
    preconditions: "Existe el albarán pendiente de facturar del vehículo 1234ABC con exactamente dos líneas: una de pieza FIL-001 (2 unidades a 12,50 €, importe 25,00 €) y una de mano de obra (2 h a 35,00 €, importe 70,00 €). La base del albarán es 95,00 €"
    steps:
      - input: "Abrir el albarán pendiente de facturar del vehículo 1234ABC y anotar su contenido de partida"
        expected: "El albarán muestra exactamente dos líneas, la de FIL-001 con importe 25,00 € y la de mano de obra con importe 70,00 €, y una base de 95,00 €"
      - input: "Desplegar el selector de tipo del formulario de añadir línea"
        expected: "El selector ofrece exactamente dos tipos, pieza y mano de obra, y ninguna otra opción"
      - input: "Registrar en ese mismo albarán una anotación con tipo 'recanvi' —un tercer tipo que el selector no ofrece—, descripción 'Recanvi divers', cantidad 1 y precio 30,00 €, enviándola directamente al servicio de líneas del albarán, que es la única vía por la que el tipo se puede escribir a mano"
        expected: "El sistema rechaza la anotación avisando de que el tipo debe ser pieza o mano de obra, y no crea ninguna línea"
      - input: "Volver a abrir en la pantalla el albarán del vehículo 1234ABC y revisar sus líneas y su base"
        expected: "El albarán sigue mostrando exactamente las dos líneas de partida, 25,00 € y 70,00 €, ninguna línea de tipo 'recanvi' ni sin tipo, y la base sigue siendo 95,00 €, no 125,00 €"
    test_data_ref: DS-005
    tags: []
    verification_path: service
    verification_path_note: "clasifica el vector, no cada paso: los pasos 1, 2 y 4 se ejecutan por la pantalla y solo el 3 -el intento- va por servicio. Se declara service porque la anotacion de un tercer tipo no existe en la interfaz y por tanto la regla no se puede ejercer desde ella. En el vocabulario de A-06 este caso seria mixta (cf. EVO-001/AC-008); aqui pesa mas quien tiene que automatizarlo: el intento y la comprobacion del efecto los ejecuta S-17 de punta a punta."

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el tercer paso no se ejecuta por la pantalla y necesita una llamada directa al servicio de líneas, la misma maquinaria que ya usa TC-900 de DOC-23; además su alcance depende de Q-18, todavía abierta"
      blocked: false
  - id: TC-042
    external_id: TALLER-ALB-TC-042
    name: "Rechazar una línea con cantidad cero"
    requirement: REQ-032
    priority: Critical
    type: Boundary
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar y la pieza FIL-001 en el catálogo"
    steps:
      - input: "Añadir una línea de pieza con FIL-001 y cantidad 0, y guardar"
        expected: "El sistema no registra la línea y avisa de que la cantidad debe ser mayor que cero"
      - input: "Revisar las líneas del albarán"
        expected: "El albarán no incluye ninguna línea de FIL-001 con cantidad 0"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible (DOC-23), y además el aviso que el caso espera no tiene literal documentado en DOC-04"
      blocked: false
  - id: TC-043
    external_id: TALLER-ALB-TC-043
    name: "Rechazar una línea con cantidad negativa"
    requirement: REQ-032
    priority: Critical
    type: Negative
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar y la pieza FIL-001 en el catálogo"
    steps:
      - input: "Añadir una línea de pieza con FIL-001 y cantidad -2, y guardar"
        expected: "El sistema no registra la línea y avisa de que la cantidad debe ser mayor que cero"
      - input: "Revisar las líneas del albarán"
        expected: "El albarán no incluye ninguna línea con cantidad negativa"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible (DOC-23), y además el aviso que el caso espera no tiene literal documentado en DOC-04"
      blocked: false
  - id: TC-044
    external_id: TALLER-ALB-TC-044
    name: "Aceptar una línea con cantidad uno"
    requirement: REQ-032
    priority: Medium
    type: Boundary
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar y la pieza FIL-001 con precio 12,50 € en el catálogo"
    steps:
      - input: "Añadir una línea de pieza con FIL-001 y cantidad 1, y guardar"
        expected: "El sistema registra la línea sin ningún aviso"
      - input: "Revisar las líneas del albarán"
        expected: "El albarán muestra una línea de FIL-001 con cantidad 1 e importe 12,50 €"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-045
    external_id: TALLER-ALB-TC-045
    name: "Rechazar una línea de pieza que no existe en el catálogo"
    requirement: REQ-033
    priority: Critical
    type: Negative
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar y no existe ninguna pieza con referencia ZZZ-000"
    steps:
      - input: "Añadir una línea de pieza indicando la referencia ZZZ-000, cantidad 1, y guardar"
        expected: "El sistema no registra la línea y avisa de que la pieza no existe en el catálogo"
      - input: "Revisar las líneas del albarán"
        expected: "El albarán no incluye ninguna línea con la referencia ZZZ-000"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: service   # ver Anexo · Versión 1.6.0 · reclasificación de TC-045, TC-063 y TC-064

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "vector no compostable por UI: el campo Pieza de la línea de albarán es un <select> poblado con peces reales (seleccionarPorTextoParcial); no hay manera de introducir una referencia inexistente desde el formulario, así que el intento tiene que ejercerse contra POST /api/albarans/:id/linies directamente"
      blocked: false
  - id: TC-046
    external_id: TALLER-ALB-TC-046
    name: "La línea de pieza sin precio hereda el precio del catálogo"
    requirement: REQ-034
    priority: High
    type: Functional
    component: albarans
    preconditions: "La pieza FIL-001 tiene precio 12,50 € en el catálogo y existe un albarán pendiente de facturar"
    steps:
      - input: "Añadir una línea de pieza con FIL-001 y cantidad 2, dejando el precio sin informar, y guardar"
        expected: "La línea queda registrada con precio 12,50 €, el mismo que la pieza tiene en el catálogo"
      - input: "Revisar el importe de la línea"
        expected: "El importe de la línea es 25,00 €, resultado de 2 por 12,50 €"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-047
    external_id: TALLER-ALB-TC-047
    name: "El precio informado a mano prevalece sobre el del catálogo"
    requirement: REQ-034
    priority: Medium
    type: Functional
    component: albarans
    preconditions: "La pieza FIL-001 tiene precio 12,50 € en el catálogo y existe un albarán pendiente de facturar"
    steps:
      - input: "Añadir una línea de pieza con FIL-001, cantidad 2 y precio 10,00 €, y guardar"
        expected: "La línea queda registrada con precio 10,00 € e importe 20,00 €"
      - input: "Abrir la ficha de la pieza FIL-001 en el catálogo"
        expected: "El precio de la pieza en el catálogo sigue siendo 12,50 €"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-048
    external_id: TALLER-ALB-TC-048
    name: "Añadir una línea de pieza descuenta el stock del catálogo"
    requirement: REQ-035
    priority: Critical
    type: Functional
    component: albarans
    preconditions: "La pieza FIL-001 tiene stock 40 en el catálogo y existe un albarán pendiente de facturar"
    steps:
      - input: "Comprobar el stock de FIL-001 en el catálogo antes de tocar el albarán"
        expected: "El catálogo muestra stock 40 para FIL-001"
      - input: "Añadir al albarán una línea de pieza con FIL-001 y cantidad 3, y guardar"
        expected: "La línea queda registrada en el albarán con cantidad 3"
      - input: "Volver al catálogo y comprobar el stock de FIL-001"
        expected: "El catálogo muestra stock 37 para FIL-001"
    test_data_ref: DS-005
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-049
    external_id: TALLER-ALB-TC-049
    name: "Una línea rechazada no mueve el stock"
    requirement: REQ-035
    priority: Critical
    type: Integration
    component: albarans
    preconditions: "La pieza FIL-001 tiene stock 40 en el catálogo y existe un albarán pendiente de facturar"
    steps:
      - input: "Comprobar el stock de FIL-001 en el catálogo"
        expected: "El catálogo muestra stock 40 para FIL-001"
      - input: "Intentar añadir al albarán una línea de pieza con FIL-001 y cantidad 0, y guardar"
        expected: "El sistema rechaza la línea y avisa de que la cantidad debe ser mayor que cero"
      - input: "Volver al catálogo y comprobar el stock de FIL-001"
        expected: "El catálogo sigue mostrando stock 40 para FIL-001: el rechazo no ha movido el stock"
    test_data_ref: DS-003
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible (DOC-23), y además el aviso que el caso espera no tiene literal documentado en DOC-04"
      blocked: false
  - id: TC-050
    external_id: TALLER-ALB-TC-050
    name: "Añadir una línea de mano de obra con horas y precio por hora"
    requirement: REQ-036
    priority: Critical
    type: Functional
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar"
    steps:
      - input: "Abrir el albarán y pulsar Añadir línea de mano de obra"
        expected: "Se abre el formulario de mano de obra con los campos de descripción, horas y precio por hora"
      - input: "Informar descripción 'Cambio de aceite y filtro', 2 horas y precio por hora 35,00 €, y guardar"
        expected: "El albarán muestra una línea de mano de obra con la descripción indicada, 2 horas, 35,00 € por hora e importe 70,00 €"
    test_data_ref: DS-005
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-051
    external_id: TALLER-ALB-TC-051
    name: "Rechazar una línea de mano de obra sin descripción"
    requirement: REQ-037
    priority: High
    type: Negative
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar"
    steps:
      - input: "Añadir una línea de mano de obra con la descripción vacía, 2 horas y precio por hora 35,00 €, y guardar"
        expected: "El sistema no registra la línea y avisa de que la descripción del trabajo es obligatoria"
      - input: "Revisar las líneas del albarán"
        expected: "El albarán no incluye ninguna línea de mano de obra sin descripción"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible (DOC-23), y además el aviso que el caso espera no tiene literal documentado en DOC-04"
      blocked: false
  - id: TC-052
    external_id: TALLER-ALB-TC-052
    name: "Retirar una línea de un albarán no facturado"
    requirement: REQ-038
    priority: High
    type: Functional
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar con una línea de mano de obra de 2 horas a 35,00 €"
    steps:
      - input: "Abrir el albarán y pulsar Retirar en la línea de mano de obra"
        expected: "El sistema retira la línea y el albarán deja de mostrarla"
      - input: "Revisar el albarán tras la operación"
        expected: "El albarán conserva sus demás líneas y sigue en situación de pendiente de facturar"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-053
    external_id: TALLER-ALB-TC-053
    name: "Retirar una línea de pieza devuelve el stock al catálogo"
    requirement: REQ-039
    priority: Critical
    type: Functional
    component: albarans
    preconditions: "El albarán pendiente tiene una línea de FIL-001 con cantidad 3 y el catálogo muestra stock 37 para esa pieza"
    steps:
      - input: "Comprobar el stock de FIL-001 en el catálogo"
        expected: "El catálogo muestra stock 37 para FIL-001"
      - input: "Abrir el albarán y retirar la línea de FIL-001 de cantidad 3"
        expected: "El albarán deja de mostrar esa línea"
      - input: "Volver al catálogo y comprobar el stock de FIL-001"
        expected: "El catálogo muestra stock 40 para FIL-001: las 3 unidades han vuelto al almacén"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: false
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-054
    external_id: TALLER-ALB-TC-054
    name: "Añadir y retirar la misma línea deja el stock como estaba"
    requirement: REQ-039
    priority: Critical
    type: Integration
    component: albarans
    preconditions: "La pieza FIL-001 tiene stock 40 en el catálogo y existe un albarán pendiente de facturar"
    steps:
      - input: "Anotar el stock de FIL-001 en el catálogo"
        expected: "El catálogo muestra stock 40 para FIL-001"
      - input: "Añadir al albarán una línea de FIL-001 con cantidad 5 y comprobar el catálogo"
        expected: "El catálogo muestra stock 35 para FIL-001"
      - input: "Retirar del albarán esa misma línea y comprobar el catálogo"
        expected: "El catálogo vuelve a mostrar stock 40 para FIL-001 y el albarán no tiene ninguna línea de FIL-001"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albara_linies, peces.estoc]
    restores_state: true
    automation:
      grade: medium
      reason: "el formulario de línea de albarán no lleva id y hay que localizarlo por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por fetch: es el punto exacto donde la prueba acotada de S-10 produjo un flake (DOC-23)"
      blocked: false
  - id: TC-055
    external_id: TALLER-ALB-TC-055
    name: "Modificar vehículo, fecha y notas de un albarán no facturado"
    requirement: REQ-040
    priority: Medium
    type: Functional
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar del vehículo 1234ABC, y el mismo cliente tiene además el vehículo 5678DEF"
    steps:
      - input: "Abrir el albarán pendiente, cambiar el vehículo a 5678DEF, poner la fecha 10/03/2026 y escribir en notas 'Revisión de los 60.000 km', y guardar"
        expected: "El sistema guarda los cambios sin avisos de error"
      - input: "Abrir de nuevo el detalle del albarán"
        expected: "El albarán muestra el vehículo 5678DEF, la fecha 10/03/2026 y la nota 'Revisión de los 60.000 km', y conserva sus líneas"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans]
    restores_state: false
    automation:
      grade: medium
      reason: "REQ-040 se reescribe con el evolutivo de DOC-04/Q-10, ya respondida: habrá que impedir el cambio de vehículo entre clientes, de modo que el caso cambia de enunciado en cuanto llegue"
      blocked: false
  - id: TC-056
    external_id: TALLER-ALB-TC-056
    name: "Borrar un albarán no facturado con todas sus líneas"
    requirement: REQ-041
    priority: Medium
    type: Functional
    component: albarans
    preconditions: "Existe un albarán pendiente de facturar con dos líneas: una de pieza y una de mano de obra"
    steps:
      - input: "Pulsar Borrar en la fila del albarán pendiente"
        expected: "El sistema pide confirmación antes de borrar el albarán"
      - input: "Confirmar el borrado"
        expected: "El albarán desaparece del listado de albaranes"
      - input: "Abrir la ficha del vehículo del albarán borrado"
        expected: "El apartado de albaranes ya no muestra ese albarán ni ninguna de sus líneas"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [albarans, albara_linies]
    restores_state: false
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-057
    external_id: TALLER-ALB-TC-057
    name: "Impedir modificar la cabecera de un albarán facturado"
    requirement: REQ-042
    priority: Critical
    type: Negative
    component: albarans
    preconditions: "Existe un albarán ya facturado, enlazado a una factura emitida"
    steps:
      - input: "Abrir el albarán facturado e intentar cambiar su fecha y sus notas, y guardar"
        expected: "El sistema no guarda el cambio y avisa de que el albarán ya está facturado"
      - input: "Abrir de nuevo el detalle del albarán"
        expected: "La fecha y las notas conservan los valores que tenían antes del intento"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-058
    external_id: TALLER-ALB-TC-058
    name: "Impedir borrar un albarán facturado"
    requirement: REQ-042
    priority: Critical
    type: Negative
    component: albarans
    preconditions: "Existe un albarán ya facturado, enlazado a una factura emitida"
    steps:
      - input: "Pulsar Borrar en la fila del albarán facturado y confirmar"
        expected: "El sistema no borra el albarán y avisa de que ya está facturado"
      - input: "Revisar el listado de albaranes y el detalle de la factura"
        expected: "El albarán sigue existiendo en situación de facturado y la factura sigue mostrándolo entre los albaranes que agrupa"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-059
    external_id: TALLER-ALB-TC-059
    name: "Impedir añadir o retirar líneas en un albarán facturado"
    requirement: REQ-042
    priority: Critical
    type: Negative
    component: albarans
    preconditions: "Existe un albarán ya facturado con una línea de pieza de FIL-001 y una línea de mano de obra"
    steps:
      - input: "Abrir el albarán facturado e intentar añadir una línea de pieza con FIL-001 y cantidad 1"
        expected: "El sistema no registra la línea y avisa de que el albarán ya está facturado"
      - input: "Intentar retirar la línea de mano de obra del albarán facturado"
        expected: "El sistema no retira la línea y avisa de que el albarán ya está facturado"
      - input: "Revisar las líneas del albarán y el stock de FIL-001 en el catálogo"
        expected: "El albarán conserva exactamente las mismas líneas y el stock de FIL-001 no ha variado"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
```

### 4.5 Facturas

Es el módulo donde el error cuesta dinero y no se puede corregir después (Q-06),
así que 10 de sus 19 casos son `Critical`. Los cinco casos de cálculo —TC-069 a
TC-073— llevan cifras exactas: si el sistema devuelve otra, el caso falla.

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-060 | REQ-043 | Emitir una factura con los albaranes pendientes de un cliente | Critical | Functional | smoke, regresion |
| TC-061 | REQ-043 | La emisión solo ofrece albaranes pendientes del cliente elegido | High | Functional | regresion |
| TC-062 | REQ-044 | Rechazar la emisión de una factura sin ningún albarán | Critical | Negative | regresion |
| TC-063 | REQ-045 | Rechazar la emisión con un albarán ya facturado | Critical | Negative | regresion |
| TC-064 | REQ-046 | Rechazar la emisión con albaranes de dos clientes distintos | Critical | Negative | regresion |
| TC-065 | REQ-047 | Al emitir, los albaranes pasan a facturados y quedan enlazados | Critical | Integration | smoke, regresion |
| TC-066 | REQ-047 | Una emisión rechazada deja los albaranes pendientes | Critical | Integration | regresion |
| TC-067 | REQ-048 | La factura recibe número automático con formato año/F-nnnn | High | Functional | regresion |
| TC-068 | REQ-048 | La segunda factura del año incrementa el correlativo en uno | Medium | Boundary | regresion |
| TC-069 | REQ-049 | La base es la suma de cantidad por precio y el total es base más IVA | Critical | Functional | smoke, regresion |
| TC-070 | REQ-049 | La base agrega las líneas de todos los albaranes de la factura | Critical | Functional | regresion |
| TC-071 | REQ-050 | Sin indicar tipo de IVA, la factura aplica el 21 por ciento | Critical | Functional | smoke, regresion |
| TC-072 | REQ-050 | El tipo de IVA indicado se aplica en lugar del 21 por ciento | High | Functional | regresion |
| TC-073 | REQ-051 | Base, IVA y total se presentan con dos decimales | Critical | Boundary | regresion |
| TC-074 | REQ-052 | Listar facturas con número, estado de pago y total | High | Functional | smoke, regresion |
| TC-075 | REQ-053 | El detalle de la factura muestra albaranes, base, IVA y total | High | Functional | regresion |
| TC-076 | REQ-054 | Marcar una factura como pagada | High | Functional | regresion |
| TC-077 | REQ-054 | Devolver una factura pagada a pendiente de cobro | Medium | Functional | regresion |
| TC-078 | REQ-055 | El estado de pago de la factura solo admite pendiente o pagada | High | Functional | — |

```yaml testcases
version: 1
module: factures
cases:
  - id: TC-060
    external_id: TALLER-FAC-TC-060
    name: "Emitir una factura con los albaranes pendientes de un cliente"
    requirement: REQ-043
    priority: Critical
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente de facturar con base 95,00 €"
    steps:
      - input: "Abrir Facturas, pulsar Nueva factura y elegir el cliente 'Garcia Motors SL'"
        expected: "El sistema ofrece los albaranes pendientes de facturar de ese cliente"
      - input: "Seleccionar el albarán pendiente y emitir la factura"
        expected: "La factura queda emitida y aparece en el listado de facturas asociada a 'Garcia Motors SL'"
    test_data_ref: DS-005
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-061
    external_id: TALLER-FAC-TC-061
    name: "La emisión solo ofrece albaranes pendientes del cliente elegido"
    requirement: REQ-043
    priority: High
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente y otro ya facturado; 'Tallers Puig SL' tiene otro albarán pendiente"
    steps:
      - input: "Pulsar Nueva factura y elegir el cliente 'Garcia Motors SL'"
        expected: "La selección de albaranes muestra únicamente el albarán pendiente de 'Garcia Motors SL'"
      - input: "Revisar si aparecen el albarán ya facturado y el albarán de 'Tallers Puig SL'"
        expected: "Ninguno de los dos aparece en la selección"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-062
    external_id: TALLER-FAC-TC-062
    name: "Rechazar la emisión de una factura sin ningún albarán"
    requirement: REQ-044
    priority: Critical
    type: Negative
    component: factures
    preconditions: "'Garcia Motors SL' tiene al menos un albarán pendiente de facturar"
    steps:
      - input: "Pulsar Nueva factura, elegir 'Garcia Motors SL', no seleccionar ningún albarán y emitir"
        expected: "El sistema no emite la factura y avisa de que debe agrupar al menos un albarán"
      - input: "Volver al listado de facturas"
        expected: "No se ha creado ninguna factura nueva"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable, y además DOC-04 no documenta el literal del aviso que el caso espera"
      blocked: false
  - id: TC-063
    external_id: TALLER-FAC-TC-063
    name: "Rechazar la emisión con un albarán ya facturado"
    requirement: REQ-045
    priority: Critical
    type: Negative
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente y otro ya facturado en una factura anterior"
    steps:
      - input: "Iniciar la emisión de una factura para 'Garcia Motors SL' incluyendo el albarán ya facturado junto al pendiente"
        expected: "El sistema no emite la factura y avisa de que todos los albaranes deben estar pendientes de facturar"
      - input: "Revisar el albarán ya facturado y la factura anterior"
        expected: "El albarán sigue enlazado únicamente a la factura anterior y no se ha creado ninguna factura nueva"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: service   # ver Anexo · Versión 1.6.0 · reclasificación de TC-063 y TC-064

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "vector no compostable por UI: FacturaForm carga los albaranes con listByClient(clientId, 'pendent'), así que un albarán ya facturado nunca aparece en la lista de selección. El intento tiene que ejercerse contra POST /api/factures directamente"
      blocked: false
  - id: TC-064
    external_id: TALLER-FAC-TC-064
    name: "Rechazar la emisión con albaranes de dos clientes distintos"
    requirement: REQ-046
    priority: Critical
    type: Negative
    component: factures
    preconditions: "'Garcia Motors SL' y 'Tallers Puig SL' tienen cada uno un albarán pendiente de facturar"
    steps:
      - input: "Iniciar la emisión de una factura incluyendo el albarán pendiente de 'Garcia Motors SL' y el de 'Tallers Puig SL'"
        expected: "El sistema no emite la factura y avisa de que todos los albaranes deben ser del mismo cliente"
      - input: "Revisar el listado de albaranes"
        expected: "Los dos albaranes siguen en situación de pendiente de facturar y no se ha creado ninguna factura"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: service   # ver Anexo · Versión 1.6.0 · reclasificación de TC-063 y TC-064

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "vector no compostable por UI: DOC-07 1.6.0 §3.11 (A-05-11a) demostró que FacturaForm solo lista albaranes pendientes del cliente elegido, así que nunca coexisten en pantalla los de dos clientes distintos. El intento tiene que ejercerse contra POST /api/factures directamente"
      blocked: false
  - id: TC-065
    external_id: TALLER-FAC-TC-065
    name: "Al emitir, los albaranes pasan a facturados y quedan enlazados"
    requirement: REQ-047
    priority: Critical
    type: Integration
    component: factures
    preconditions: "'Garcia Motors SL' tiene dos albaranes pendientes de facturar"
    steps:
      - input: "Comprobar la situación de los dos albaranes en el listado de albaranes"
        expected: "Los dos aparecen en situación de pendiente de facturar"
      - input: "Emitir una factura para 'Garcia Motors SL' agrupando los dos albaranes"
        expected: "La factura queda emitida con su número asignado"
      - input: "Volver al listado de albaranes y abrir después el detalle de la factura"
        expected: "Los dos albaranes aparecen en situación de facturado y el detalle de la factura los muestra a ambos como albaranes que agrupa"
    test_data_ref: DS-005
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-066
    external_id: TALLER-FAC-TC-066
    name: "Una emisión rechazada deja los albaranes pendientes"
    requirement: REQ-047
    priority: Critical
    type: Integration
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente y 'Tallers Puig SL' otro albarán pendiente"
    steps:
      - input: "Comprobar la situación de los dos albaranes"
        expected: "Los dos aparecen en situación de pendiente de facturar"
      - input: "Intentar emitir una factura que agrupe los albaranes de los dos clientes"
        expected: "El sistema rechaza la emisión y avisa de que los albaranes deben ser del mismo cliente"
      - input: "Volver al listado de albaranes y al listado de facturas"
        expected: "Los dos albaranes siguen pendientes de facturar, sin enlace a ninguna factura, y no se ha creado ninguna factura"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable, y además DOC-04 no documenta el literal del aviso que el caso espera"
      blocked: false
  - id: TC-067
    external_id: TALLER-FAC-TC-067
    name: "La factura recibe número automático con formato año/F-nnnn"
    requirement: REQ-048
    priority: High
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente y el formulario de emisión no ofrece ningún campo de número"
    steps:
      - input: "Emitir una factura para 'Garcia Motors SL' sin informar ningún número"
        expected: "El sistema asigna un número con el formato año/F-nnnn, con el año en curso y cuatro dígitos, por ejemplo 2026/F-0003"
      - input: "Abrir el detalle de la factura"
        expected: "El número mostrado en el detalle coincide con el del listado de facturas"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "el número esperado depende del contador vivo del entorno y del año en curso, así que el test debe derivarlo en ejecución en vez de compararlo con un valor fijo"
      blocked: false
  - id: TC-068
    external_id: TALLER-FAC-TC-068
    name: "La segunda factura del año incrementa el correlativo en uno"
    requirement: REQ-048
    priority: Medium
    type: Boundary
    component: factures
    preconditions: "Hay al menos dos albaranes pendientes de facturar de clientes con los que se pueden emitir dos facturas seguidas"
    steps:
      - input: "Emitir una primera factura y anotar su número"
        expected: "El sistema asigna un número del año en curso, por ejemplo 2026/F-0003"
      - input: "Emitir una segunda factura"
        expected: "El sistema asigna el número inmediatamente siguiente del mismo año, 2026/F-0004, sin repetir el anterior"
    test_data_ref: DS-005
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "el número esperado depende del contador vivo del entorno y del año en curso, así que el test debe derivarlo en ejecución en vez de compararlo con un valor fijo"
      blocked: false
  - id: TC-069
    external_id: TALLER-FAC-TC-069
    name: "La base es la suma de cantidad por precio y el total es base más IVA"
    requirement: REQ-049
    priority: Critical
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente con una línea de pieza de 2 unidades a 12,50 € y una línea de mano de obra de 2 horas a 35,00 €"
    steps:
      - input: "Emitir una factura para 'Garcia Motors SL' agrupando ese albarán, sin indicar tipo de IVA"
        expected: "La factura queda emitida"
      - input: "Abrir el detalle de la factura y leer la base"
        expected: "La base es 95,00 €, resultado de 25,00 € de piezas más 70,00 € de mano de obra"
      - input: "Leer el IVA y el total de la factura"
        expected: "El IVA es 19,95 € y el total es 114,95 €, resultado de la base más el IVA"
    test_data_ref: DS-007
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-070
    external_id: TALLER-FAC-TC-070
    name: "La base agrega las líneas de todos los albaranes de la factura"
    requirement: REQ-049
    priority: Critical
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene dos albaranes pendientes: uno con base 95,00 € y otro con una única línea de 1 unidad a 20,00 €"
    steps:
      - input: "Emitir una factura para 'Garcia Motors SL' agrupando los dos albaranes, sin indicar tipo de IVA"
        expected: "La factura queda emitida y agrupa los dos albaranes"
      - input: "Abrir el detalle de la factura y leer la base"
        expected: "La base es 115,00 €, suma de los 95,00 € del primer albarán y los 20,00 € del segundo"
      - input: "Leer el IVA y el total"
        expected: "El IVA es 24,15 € y el total es 139,15 €"
    test_data_ref: DS-007
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-071
    external_id: TALLER-FAC-TC-071
    name: "Sin indicar tipo de IVA, la factura aplica el 21 por ciento"
    requirement: REQ-050
    priority: Critical
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente con base 95,00 €"
    steps:
      - input: "Emitir una factura para 'Garcia Motors SL' dejando el tipo de IVA sin informar"
        expected: "La factura queda emitida sin pedir el tipo de IVA como dato obligatorio"
      - input: "Abrir el detalle de la factura y leer el tipo de IVA y el importe de IVA"
        expected: "El tipo aplicado es el 21 por ciento y el IVA es 19,95 € sobre una base de 95,00 €"
    test_data_ref: DS-007
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-072
    external_id: TALLER-FAC-TC-072
    name: "El tipo de IVA indicado se aplica en lugar del 21 por ciento"
    requirement: REQ-050
    priority: High
    type: Functional
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente con base 95,00 €"
    steps:
      - input: "Emitir una factura para 'Garcia Motors SL' indicando un tipo de IVA del 10 por ciento"
        expected: "La factura queda emitida con el tipo indicado"
      - input: "Abrir el detalle de la factura y leer el IVA y el total"
        expected: "El IVA es 9,50 € y el total es 104,50 €, no los 19,95 € y 114,95 € que daría el 21 por ciento"
    test_data_ref: DS-007
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "la selección de albaranes de la emisión es una lista sin identificador estable: hay que localizar la fila por el número del albarán, que se asigna en ejecución"
      blocked: false
  - id: TC-073
    external_id: TALLER-FAC-TC-073
    name: "Base, IVA y total se presentan con dos decimales"
    requirement: REQ-051
    priority: Critical
    type: Boundary
    component: factures
    preconditions: "'Garcia Motors SL' tiene un albarán pendiente con una única línea de 3 unidades a 11,11 €"
    steps:
      - input: "Emitir una factura para 'Garcia Motors SL' agrupando ese albarán, sin indicar tipo de IVA"
        expected: "La factura queda emitida"
      - input: "Abrir el detalle de la factura y leer la base"
        expected: "La base se presenta como 33,33 €, con exactamente dos decimales"
      - input: "Leer el IVA y el total, sabiendo que el 21 por ciento de 33,33 € es 6,9993 €"
        expected: "El IVA se presenta como 7,00 € y el total como 40,33 €, ambos con exactamente dos decimales y sin ningún tercer decimal visible"
    test_data_ref: DS-007
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures, albarans.estat]
    restores_state: false
    automation:
      grade: medium
      reason: "el redondeo se comprueba sobre el importe presentado y DOC-04 no fija ni el rótulo de cada importe ni el formato de moneda; además Q-17 sigue abierta sobre el modo de redondeo y el caso se ampliará cuando se conteste"
      blocked: false
  - id: TC-074
    external_id: TALLER-FAC-TC-074
    name: "Listar facturas con número, estado de pago y total"
    requirement: REQ-052
    priority: High
    type: Functional
    component: factures
    preconditions: "Existe al menos una factura emitida con total 114,95 € y pendiente de cobro"
    steps:
      - input: "Abrir la sección Facturas desde el menú"
        expected: "El listado muestra las facturas emitidas"
      - input: "Localizar la fila de la factura emitida"
        expected: "La fila muestra su número con formato año/F-nnnn, el estado pendiente de cobro y el total 114,95 €"
    test_data_ref: DS-006
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el resultado se comprueba por el rótulo del estado en pantalla, y DOC-04/Q-13 sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro"
      blocked: false
  - id: TC-075
    external_id: TALLER-FAC-TC-075
    name: "El detalle de la factura muestra albaranes, base, IVA y total"
    requirement: REQ-053
    priority: High
    type: Functional
    component: factures
    preconditions: "Existe una factura emitida que agrupa un albarán, con base 95,00 €, IVA 19,95 € y total 114,95 €"
    steps:
      - input: "Abrir el detalle de la factura desde el listado"
        expected: "El detalle muestra el albarán que agrupa, con su número"
      - input: "Leer los importes del detalle"
        expected: "El detalle muestra base 95,00 €, IVA 19,95 € y total 114,95 €"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "los importes se leen del detalle de la factura por su rótulo visible, y DOC-04 no fija esos rótulos"
      blocked: false
  - id: TC-076
    external_id: TALLER-FAC-TC-076
    name: "Marcar una factura como pagada"
    requirement: REQ-054
    priority: High
    type: Functional
    component: factures
    preconditions: "Existe una factura emitida en estado pendiente de cobro"
    steps:
      - input: "Abrir la factura pendiente y marcarla como pagada"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Volver al listado de facturas"
        expected: "La factura aparece con el estado pagada y conserva su número y su total"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures.estat_pagament]
    restores_state: false
    automation:
      grade: medium
      reason: "el resultado se comprueba por el rótulo del estado en pantalla, y DOC-04/Q-13 sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro"
      blocked: false
  - id: TC-077
    external_id: TALLER-FAC-TC-077
    name: "Devolver una factura pagada a pendiente de cobro"
    requirement: REQ-054
    priority: Medium
    type: Functional
    component: factures
    preconditions: "Existe una factura marcada como pagada"
    steps:
      - input: "Abrir la factura pagada y devolverla a pendiente de cobro"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Volver al listado de facturas"
        expected: "La factura aparece de nuevo con el estado pendiente de cobro"
    test_data_ref: DS-006
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [factures.estat_pagament]
    restores_state: false
    automation:
      grade: medium
      reason: "el resultado se comprueba por el rótulo del estado en pantalla, y DOC-04/Q-13 sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro"
      blocked: false
  - id: TC-078
    external_id: TALLER-FAC-TC-078
    name: "El estado de pago de la factura solo admite pendiente o pagada"
    requirement: REQ-055
    priority: High
    type: Functional
    component: factures
    preconditions: "Existe al menos una factura emitida"
    steps:
      - input: "Abrir la factura y desplegar las opciones de estado de pago"
        expected: "Se ofrecen exactamente dos valores: pendiente de cobro y pagada, sin ninguna otra opción"
      - input: "Revisar la columna de estado en el listado de facturas"
        expected: "Todas las facturas del listado muestran uno de esos dos valores y ninguna muestra el estado vacío"
    test_data_ref: DS-006
    tags: []
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: low
      reason: "su única comprobación es que el desplegable ofrece exactamente dos valores; depende del rótulo de cada estado (DOC-04/Q-13) y REQ-055 se reescribe con el evolutivo de DOC-04/Q-14, ya respondida: automatizarlo hoy es escribir un test para tirarlo dentro de dos versiones"
      blocked: false
```

### 4.6 Personal

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-079 | REQ-056 | Listar empleados con nombre, cargo y contacto | Medium | Functional | regresion |
| TC-080 | REQ-057 | Dar de alta un empleado del taller | High | Functional | smoke, regresion |
| TC-081 | REQ-058 | Rechazar el alta de un empleado sin nombre | Critical | Negative | regresion |
| TC-082 | REQ-058 | Rechazar la modificación que deja al empleado sin nombre | Critical | Negative | regresion |
| TC-083 | REQ-059 | Consultar la ficha de un empleado con sus nóminas | Medium | Functional | regresion |
| TC-084 | REQ-060 | Modificar los datos de un empleado | Medium | Functional | regresion |
| TC-085 | REQ-061 | Dar de baja un empleado sin nóminas | Medium | Functional | regresion |
| TC-086 | REQ-062 | Impedir la baja de un empleado con nóminas asociadas | Critical | Negative | regresion |

```yaml testcases
version: 1
module: personal
cases:
  - id: TC-079
    external_id: TALLER-PER-TC-079
    name: "Listar empleados con nombre, cargo y contacto"
    requirement: REQ-056
    priority: Medium
    type: Functional
    component: personal
    preconditions: "Existe el empleado 'Marta Vidal' con cargo 'Mecánica' y teléfono 622111333"
    steps:
      - input: "Abrir la sección Personal desde el menú"
        expected: "El listado muestra los empleados registrados"
      - input: "Localizar la fila de 'Marta Vidal'"
        expected: "La fila muestra el nombre 'Marta Vidal', el cargo 'Mecánica' y el teléfono 622111333"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-080
    external_id: TALLER-PER-TC-080
    name: "Dar de alta un empleado del taller"
    requirement: REQ-057
    priority: High
    type: Functional
    component: personal
    preconditions: "No existe ningún empleado llamado 'Joan Serra'"
    steps:
      - input: "Pulsar Nuevo empleado, informar nombre 'Joan Serra', cargo 'Aprendiz' y teléfono 655444222, y guardar"
        expected: "El sistema da de alta el empleado y 'Joan Serra' aparece en el listado de personal"
      - input: "Abrir la ficha de 'Joan Serra'"
        expected: "La ficha muestra cargo 'Aprendiz' y teléfono 655444222"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: [TC-085]
    touches: [personal]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-081
    external_id: TALLER-PER-TC-081
    name: "Rechazar el alta de un empleado sin nombre"
    requirement: REQ-058
    priority: Critical
    type: Negative
    component: personal
    preconditions: "La sección Personal está abierta"
    steps:
      - input: "Pulsar Nuevo empleado, dejar el nombre vacío, informar teléfono 655000000 y guardar"
        expected: "El sistema no da de alta el empleado y avisa de que el nombre es obligatorio"
      - input: "Volver al listado de personal"
        expected: "No existe ningún empleado con teléfono 655000000"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-082
    external_id: TALLER-PER-TC-082
    name: "Rechazar la modificación que deja al empleado sin nombre"
    requirement: REQ-058
    priority: Critical
    type: Negative
    component: personal
    preconditions: "Existe el empleado 'Marta Vidal'"
    steps:
      - input: "Abrir 'Marta Vidal', borrar el contenido del campo Nombre y guardar"
        expected: "El sistema no guarda el cambio y avisa de que el nombre es obligatorio"
      - input: "Volver al listado de personal"
        expected: "El empleado sigue apareciendo con el nombre 'Marta Vidal'"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-083
    external_id: TALLER-PER-TC-083
    name: "Consultar la ficha de un empleado con sus nóminas"
    requirement: REQ-059
    priority: Medium
    type: Functional
    component: personal
    preconditions: "'Marta Vidal' tiene registrada al menos la nómina de marzo de 2026"
    steps:
      - input: "Abrir la ficha del empleado 'Marta Vidal'"
        expected: "La ficha muestra sus datos: nombre, cargo, contacto y fecha de alta"
      - input: "Localizar el apartado de nóminas de la ficha"
        expected: "Aparece la nómina de 03/2026 con su importe y su estado de pago"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-084
    external_id: TALLER-PER-TC-084
    name: "Modificar los datos de un empleado"
    requirement: REQ-060
    priority: Medium
    type: Functional
    component: personal
    preconditions: "Existe el empleado 'Joan Serra' con cargo 'Aprendiz'"
    steps:
      - input: "Abrir 'Joan Serra', cambiar el cargo a 'Oficial de 3ª' y guardar"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Localizar la fila de 'Joan Serra' en el listado de personal"
        expected: "La fila muestra el cargo 'Oficial de 3ª' y el nombre sin cambios"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [personal]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-085
    external_id: TALLER-PER-TC-085
    name: "Dar de baja un empleado sin nóminas"
    requirement: REQ-061
    priority: Medium
    type: Functional
    component: personal
    preconditions: "Existe el empleado 'Joan Serra' sin ninguna nómina registrada"
    steps:
      - input: "Pulsar Borrar en la fila de 'Joan Serra'"
        expected: "El sistema pide confirmación antes de dar de baja al empleado"
      - input: "Confirmar la baja"
        expected: "'Joan Serra' desaparece del listado de personal"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [personal]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-086
    external_id: TALLER-PER-TC-086
    name: "Impedir la baja de un empleado con nóminas asociadas"
    requirement: REQ-062
    priority: Critical
    type: Negative
    component: personal
    preconditions: "'Marta Vidal' tiene registrada al menos una nómina"
    steps:
      - input: "Pulsar Borrar en la fila de 'Marta Vidal' y confirmar la baja"
        expected: "El sistema no da de baja al empleado y avisa de que tiene nóminas asociadas"
      - input: "Abrir la ficha de 'Marta Vidal'"
        expected: "El empleado sigue registrado y sus nóminas siguen apareciendo en la ficha"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
```

### 4.7 Nóminas

El módulo concentra el segundo cálculo con dinero del sistema —el salario neto— y
la segunda regla de unicidad —una nómina por empleado, mes y año—. El mes es el
único campo con rango cerrado de toda la aplicación, y por eso se prueba en sus
cuatro fronteras: 0, 1, 12 y 13.

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-087 | REQ-063 | Listar nóminas de la más reciente a la más antigua | Medium | Functional | regresion |
| TC-088 | REQ-064 | Registrar una nómina desde el módulo de nóminas | Critical | Functional | smoke, regresion |
| TC-089 | REQ-064 | Registrar una nómina desde la ficha del empleado | High | Functional | regresion |
| TC-090 | REQ-065 | Rechazar una nómina sin empleado existente | Critical | Negative | regresion |
| TC-091 | REQ-066 | Rechazar una nómina sin empleado, mes o año | Critical | Negative | regresion |
| TC-092 | REQ-067 | Rechazar una nómina con mes 0 | High | Boundary | regresion |
| TC-093 | REQ-067 | Rechazar una nómina con mes 13 | High | Boundary | regresion |
| TC-094 | REQ-067 | Aceptar nóminas con mes 1 y con mes 12 | Medium | Boundary | regresion |
| TC-095 | REQ-068 | Impedir dos nóminas del mismo empleado, mes y año | Critical | Negative | regresion |
| TC-096 | REQ-068 | Permitir el mismo mes y año para otro empleado | Medium | Functional | regresion |
| TC-097 | REQ-069 | El detalle de la nómina muestra bruto, deducciones y neto | High | Functional | smoke, regresion |
| TC-098 | REQ-070 | El neto es el bruto menos las deducciones | Critical | Functional | smoke, regresion |
| TC-099 | REQ-070 | Al cambiar el bruto, el neto consultado cambia con él | Critical | Functional | regresion |
| TC-100 | REQ-070 | El neto se presenta con dos decimales | High | Boundary | regresion |
| TC-101 | REQ-071 | Modificar los datos de una nómina registrada | Medium | Functional | regresion |
| TC-102 | REQ-072 | Marcar una nómina como pagada y devolverla a pendiente | High | Functional | regresion |
| TC-103 | REQ-073 | El estado de pago de la nómina solo admite pendiente o pagada | High | Functional | — |
| TC-104 | REQ-074 | Borrar una nómina previa confirmación | Medium | Functional | regresion |

```yaml testcases
version: 1
module: nomines
cases:
  - id: TC-087
    external_id: TALLER-NOM-TC-087
    name: "Listar nóminas de la más reciente a la más antigua"
    requirement: REQ-063
    priority: Medium
    type: Functional
    component: nomines
    preconditions: "Existen nóminas de 11/2025, 01/2026 y 03/2026"
    steps:
      - input: "Abrir la sección Nóminas desde el menú"
        expected: "El listado muestra las nóminas registradas con su empleado, su mes y su año"
      - input: "Leer el orden de las tres primeras filas"
        expected: "El orden es 03/2026, 01/2026 y 11/2025: primero el año más reciente y, dentro del año, el mes más reciente"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "el orden esperado depende de qué nóminas existan en el entorno: cualquier alta de otro caso cambia cuáles son las tres primeras filas"
      blocked: false
  - id: TC-088
    external_id: TALLER-NOM-TC-088
    name: "Registrar una nómina desde el módulo de nóminas"
    requirement: REQ-064
    priority: Critical
    type: Functional
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal' y no tiene nómina de 04/2026"
    steps:
      - input: "Abrir Nóminas, pulsar Nueva nómina, elegir 'Marta Vidal', informar mes 4, año 2026, salario bruto 1.850,00 € y deducciones 320,50 €, y guardar"
        expected: "El sistema registra la nómina y aparece en el listado asociada a 'Marta Vidal'"
      - input: "Abrir el detalle de la nómina de 04/2026"
        expected: "El detalle muestra salario bruto 1.850,00 € y deducciones 320,50 €"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-089
    external_id: TALLER-NOM-TC-089
    name: "Registrar una nómina desde la ficha del empleado"
    requirement: REQ-064
    priority: High
    type: Functional
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal' y no tiene nómina de 05/2026"
    steps:
      - input: "Abrir la ficha de 'Marta Vidal' y pulsar Nueva nómina desde su apartado de nóminas"
        expected: "Se abre el formulario de nómina con el empleado 'Marta Vidal' ya asignado"
      - input: "Informar mes 5, año 2026, salario bruto 1.850,00 € y deducciones 320,50 €, y guardar"
        expected: "La nómina de 05/2026 aparece en el apartado de nóminas de la ficha de 'Marta Vidal'"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
  - id: TC-090
    external_id: TALLER-NOM-TC-090
    name: "Rechazar una nómina sin empleado existente"
    requirement: REQ-065
    priority: Critical
    type: Negative
    component: nomines
    preconditions: "La sección Nóminas está abierta"
    steps:
      - input: "Pulsar Nueva nómina, dejar el empleado sin elegir, informar mes 6, año 2026, bruto 1.500,00 € y deducciones 200,00 €, y guardar"
        expected: "El sistema no registra la nómina y avisa de que debe indicarse un empleado existente"
      - input: "Volver al listado de nóminas"
        expected: "No existe ninguna nómina de 06/2026 sin empleado"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-091
    external_id: TALLER-NOM-TC-091
    name: "Rechazar una nómina sin empleado, mes o año"
    requirement: REQ-066
    priority: Critical
    type: Negative
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal'"
    steps:
      - input: "Pulsar Nueva nómina, elegir 'Marta Vidal', dejar el mes vacío, informar año 2026 y guardar"
        expected: "El sistema no registra la nómina y avisa de que el mes es obligatorio"
      - input: "Informar mes 7, dejar el año vacío y guardar"
        expected: "El sistema no registra la nómina y avisa de que el año es obligatorio"
      - input: "Volver al listado de nóminas"
        expected: "No se ha registrado ninguna nómina nueva de 'Marta Vidal'"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-092
    external_id: TALLER-NOM-TC-092
    name: "Rechazar una nómina con mes 0"
    requirement: REQ-067
    priority: High
    type: Boundary
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal'"
    steps:
      - input: "Registrar una nómina de 'Marta Vidal' con mes 0, año 2026, bruto 1.850,00 € y deducciones 320,50 €, y guardar"
        expected: "El sistema no registra la nómina y avisa de que el mes debe estar comprendido entre 1 y 12"
      - input: "Volver al listado de nóminas"
        expected: "No existe ninguna nómina con mes 0"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-093
    external_id: TALLER-NOM-TC-093
    name: "Rechazar una nómina con mes 13"
    requirement: REQ-067
    priority: High
    type: Boundary
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal'"
    steps:
      - input: "Registrar una nómina de 'Marta Vidal' con mes 13, año 2026, bruto 1.850,00 € y deducciones 320,50 €, y guardar"
        expected: "El sistema no registra la nómina y avisa de que el mes debe estar comprendido entre 1 y 12"
      - input: "Volver al listado de nóminas"
        expected: "No existe ninguna nómina con mes 13"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-094
    external_id: TALLER-NOM-TC-094
    name: "Aceptar nóminas con mes 1 y con mes 12"
    requirement: REQ-067
    priority: Medium
    type: Boundary
    component: nomines
    preconditions: "Existe el empleado 'Joan Serra' sin nóminas de 2027"
    steps:
      - input: "Registrar una nómina de 'Joan Serra' con mes 1, año 2027, bruto 1.400,00 € y deducciones 210,00 €, y guardar"
        expected: "El sistema registra la nómina sin ningún aviso y aparece como 01/2027"
      - input: "Registrar otra nómina de 'Joan Serra' con mes 12, año 2027, bruto 1.400,00 € y deducciones 210,00 €, y guardar"
        expected: "El sistema registra la nómina sin ningún aviso y aparece como 12/2027"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-095
    external_id: TALLER-NOM-TC-095
    name: "Impedir dos nóminas del mismo empleado, mes y año"
    requirement: REQ-068
    priority: Critical
    type: Negative
    component: nomines
    preconditions: "'Marta Vidal' ya tiene registrada la nómina de 03/2026"
    steps:
      - input: "Registrar una segunda nómina de 'Marta Vidal' con mes 3, año 2026, bruto 1.900,00 € y deducciones 300,00 €, y guardar"
        expected: "El sistema no registra la nómina y avisa de que ya existe una nómina de ese empleado para ese mes y año"
      - input: "Filtrar el listado por 'Marta Vidal' y 03/2026"
        expected: "Aparece una única nómina de 03/2026, con el bruto original de 1.850,00 €"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que el sistema avisa, y DOC-04 no documenta el literal de ningún mensaje de error: el test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma"
      blocked: false
  - id: TC-096
    external_id: TALLER-NOM-TC-096
    name: "Permitir el mismo mes y año para otro empleado"
    requirement: REQ-068
    priority: Medium
    type: Functional
    component: nomines
    preconditions: "'Marta Vidal' tiene la nómina de 03/2026 y 'Joan Serra' no tiene ninguna nómina de 03/2026"
    steps:
      - input: "Registrar una nómina de 'Joan Serra' con mes 3, año 2026, bruto 1.400,00 € y deducciones 210,00 €, y guardar"
        expected: "El sistema registra la nómina sin ningún aviso"
      - input: "Revisar el listado de nóminas de 03/2026"
        expected: "Aparecen dos nóminas de 03/2026, una de 'Marta Vidal' y otra de 'Joan Serra'"
    test_data_ref: DS-008
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-097
    external_id: TALLER-NOM-TC-097
    name: "El detalle de la nómina muestra bruto, deducciones y neto"
    requirement: REQ-069
    priority: High
    type: Functional
    component: nomines
    preconditions: "'Marta Vidal' tiene la nómina de 03/2026 con bruto 1.850,00 € y deducciones 320,50 €"
    steps:
      - input: "Abrir el detalle de la nómina de 03/2026 de 'Marta Vidal'"
        expected: "El detalle muestra los tres importes con su etiqueta: salario bruto, deducciones y salario neto"
      - input: "Leer los tres importes"
        expected: "Salario bruto 1.850,00 €, deducciones 320,50 € y salario neto 1.529,50 €"
    test_data_ref: DS-009
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "comprueba que cada importe aparece con su etiqueta, y DOC-04 no fija esas etiquetas"
      blocked: false
  - id: TC-098
    external_id: TALLER-NOM-TC-098
    name: "El neto es el bruto menos las deducciones"
    requirement: REQ-070
    priority: Critical
    type: Functional
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal' sin nómina de 06/2026"
    steps:
      - input: "Registrar la nómina de 'Marta Vidal' de 06/2026 con bruto 1.850,00 € y deducciones 320,50 €"
        expected: "El sistema registra la nómina sin pedir el salario neto como dato de entrada"
      - input: "Abrir el detalle de la nómina de 06/2026"
        expected: "El salario neto es 1.529,50 €, resultado de 1.850,00 € menos 320,50 €"
    test_data_ref: DS-009
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-099
    external_id: TALLER-NOM-TC-099
    name: "Al cambiar el bruto, el neto consultado cambia con él"
    requirement: REQ-070
    priority: Critical
    type: Functional
    component: nomines
    preconditions: "Existe una nómina con bruto 1.850,00 €, deducciones 320,50 € y neto 1.529,50 €"
    steps:
      - input: "Abrir esa nómina, cambiar el salario bruto a 2.000,00 € sin tocar las deducciones, y guardar"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Abrir de nuevo el detalle de la nómina"
        expected: "El salario neto es ahora 1.679,50 €, resultado de 2.000,00 € menos 320,50 €"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-100
    external_id: TALLER-NOM-TC-100
    name: "El neto se presenta con dos decimales"
    requirement: REQ-070
    priority: High
    type: Boundary
    component: nomines
    preconditions: "Existe el empleado 'Marta Vidal' sin nómina de 07/2026"
    steps:
      - input: "Registrar la nómina de 'Marta Vidal' de 07/2026 con bruto 2.345,67 € y deducciones 411,11 €"
        expected: "El sistema registra la nómina sin ningún aviso"
      - input: "Abrir el detalle y leer el salario neto"
        expected: "El salario neto se presenta como 1.934,56 €, con exactamente dos decimales y sin ningún decimal adicional"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-101
    external_id: TALLER-NOM-TC-101
    name: "Modificar los datos de una nómina registrada"
    requirement: REQ-071
    priority: Medium
    type: Functional
    component: nomines
    preconditions: "Existe una nómina de 'Marta Vidal' de 03/2026 en estado pendiente de pago, con deducciones 320,50 €"
    steps:
      - input: "Abrir la nómina de 03/2026, cambiar las deducciones a 350,00 € y guardar"
        expected: "El sistema guarda el cambio sin avisos de error"
      - input: "Abrir de nuevo el detalle de la nómina"
        expected: "Las deducciones son 350,00 € y el salario neto es 1.500,00 €"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: high
      reason: null
      blocked: false
  - id: TC-102
    external_id: TALLER-NOM-TC-102
    name: "Marcar una nómina como pagada y devolverla a pendiente"
    requirement: REQ-072
    priority: High
    type: Functional
    component: nomines
    preconditions: "Existe una nómina de 'Marta Vidal' en estado pendiente de pago"
    steps:
      - input: "Abrir la nómina pendiente y marcarla como pagada"
        expected: "El listado muestra la nómina con el estado pagada"
      - input: "Abrir la nómina de nuevo y devolverla a pendiente de pago"
        expected: "El listado muestra la nómina con el estado pendiente de pago"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines.estat_pagament]
    restores_state: false
    automation:
      grade: medium
      reason: "el resultado se comprueba por el rótulo del estado en pantalla, y DOC-04/Q-13 sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro"
      blocked: false
  - id: TC-103
    external_id: TALLER-NOM-TC-103
    name: "El estado de pago de la nómina solo admite pendiente o pagada"
    requirement: REQ-073
    priority: High
    type: Functional
    component: nomines
    preconditions: "Existe al menos una nómina registrada"
    steps:
      - input: "Abrir una nómina y desplegar las opciones de estado de pago"
        expected: "Se ofrecen exactamente dos valores: pendiente de pago y pagada, sin ninguna otra opción"
      - input: "Revisar la columna de estado en el listado de nóminas"
        expected: "Todas las nóminas muestran uno de esos dos valores y ninguna muestra el estado vacío"
    test_data_ref: DS-009
    tags: []
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: low
      reason: "su única comprobación es que el desplegable ofrece exactamente dos valores; depende del rótulo de cada estado (DOC-04/Q-13) y REQ-073 se reescribe con el evolutivo de DOC-04/Q-15, ya respondida: mismo caso que TC-078"
      blocked: false
  - id: TC-104
    external_id: TALLER-NOM-TC-104
    name: "Borrar una nómina previa confirmación"
    requirement: REQ-074
    priority: Medium
    type: Functional
    component: nomines
    preconditions: "Existe una nómina de 'Marta Vidal' de 05/2026 en estado pendiente de pago"
    steps:
      - input: "Pulsar Borrar en la fila de la nómina de 05/2026"
        expected: "El sistema pide confirmación antes de borrar la nómina"
      - input: "Confirmar el borrado"
        expected: "La nómina de 05/2026 desaparece del listado de nóminas"
      - input: "Abrir la ficha de 'Marta Vidal'"
        expected: "El apartado de nóminas ya no muestra la nómina de 05/2026 y el empleado sigue registrado"
    test_data_ref: DS-009
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [nomines]
    restores_state: false
    automation:
      grade: medium
      reason: "el apartado de relación de la ficha se localiza por su rótulo visible y no por identificador estable, a diferencia de los campos de EntityForm, que sí llevan id (DOC-23)"
      blocked: false
```

### 4.8 Marco de la aplicación

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-105 | REQ-075 | Cambiar el idioma sin perder el trabajo en curso | High | Functional | smoke, regresion |
| TC-106 | REQ-076 | La interfaz arranca en castellano sin elección previa | Medium | Functional | regresion |
| TC-107 | REQ-076 | El idioma elegido se conserva en la sesión siguiente | Medium | Functional | regresion |
| TC-108 | REQ-077 | Cambiar entre tema claro y tema oscuro | Medium | Functional | regresion |
| TC-109 | REQ-078 | El tema sigue la preferencia del equipo y la elección se conserva | Low | Functional | — |

```yaml testcases
version: 1
module: shell
cases:
  - id: TC-105
    external_id: TALLER-SHL-TC-105
    name: "Cambiar el idioma sin perder el trabajo en curso"
    requirement: REQ-075
    priority: High
    type: Functional
    component: shell
    preconditions: "La aplicación está en castellano y el formulario de nuevo cliente está abierto"
    steps:
      - input: "Escribir 'Tallers Puig SL' en el campo Nombre del formulario, sin guardar"
        expected: "El campo Nombre contiene 'Tallers Puig SL'"
      - input: "Cambiar el idioma de la interfaz a catalán desde el selector de idioma"
        expected: "Los rótulos del menú y del formulario pasan a catalán, por ejemplo la sección Clientes se muestra como 'Clients'"
      - input: "Revisar el formulario que estaba abierto"
        expected: "El campo Nombre sigue conteniendo 'Tallers Puig SL': el trabajo en curso no se ha perdido"
    test_data_ref: null
    tags: [smoke, regresion]
    verification_path: ui

    depends_on: []
    touches: [preferencies.idioma]
    restores_state: false
    automation:
      grade: medium
      reason: "el paso central compara rótulos traducidos, de modo que el test queda atado al catálogo de textos: cualquier retoque de traducción lo pone en rojo sin que el comportamiento haya cambiado"
      blocked: false
  - id: TC-106
    external_id: TALLER-SHL-TC-106
    name: "La interfaz arranca en castellano sin elección previa"
    requirement: REQ-076
    priority: Medium
    type: Functional
    component: shell
    preconditions: "La aplicación no tiene ninguna preferencia de idioma guardada"
    steps:
      - input: "Abrir la aplicación sin tocar el selector de idioma"
        expected: "La interfaz se presenta en castellano: el menú muestra 'Clientes', 'Vehículos' y 'Facturas'"
    test_data_ref: DS-010
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: medium
      reason: "exige una instalación sin ninguna preferencia guardada: el test tiene que controlar el almacenamiento del navegador y arrancar con perfil limpio, y eso no es parte de la aplicación"
      blocked: false
  - id: TC-107
    external_id: TALLER-SHL-TC-107
    name: "El idioma elegido se conserva en la sesión siguiente"
    requirement: REQ-076
    priority: Medium
    type: Functional
    component: shell
    preconditions: "La aplicación no tiene ninguna preferencia de idioma guardada"
    steps:
      - input: "Cambiar el idioma de la interfaz a catalán"
        expected: "La interfaz pasa a catalán"
      - input: "Cerrar la aplicación y volver a abrirla"
        expected: "La interfaz se presenta en catalán sin que el usuario vuelva a elegir idioma"
    test_data_ref: DS-010
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [preferencies.idioma]
    restores_state: false
    automation:
      grade: medium
      reason: "exige arrancar sin preferencia guardada y volver a abrir la aplicación: el test tiene que controlar el almacenamiento del navegador y reiniciar la sesión, que no son parte de la aplicación"
      blocked: false
  - id: TC-108
    external_id: TALLER-SHL-TC-108
    name: "Cambiar entre tema claro y tema oscuro"
    requirement: REQ-077
    priority: Medium
    type: Functional
    component: shell
    preconditions: "La aplicación está abierta con el tema claro"
    steps:
      - input: "Pulsar el selector de tema y elegir el tema oscuro"
        expected: "La interfaz pasa a tema oscuro de inmediato, sin recargar el trabajo en curso"
      - input: "Volver a pulsar el selector y elegir el tema claro"
        expected: "La interfaz vuelve al tema claro de inmediato"
    test_data_ref: null
    tags: [regresion]
    verification_path: ui

    depends_on: []
    touches: [preferencies.tema]
    restores_state: false
    automation:
      grade: low
      reason: "lo que comprueba es la apariencia; automatizarlo obliga a fijar el nombre de la clase o del atributo de tema, que es detalle de implementación y cambia sin que el comportamiento cambie. Un humano lo ve en dos segundos"
      blocked: false
  - id: TC-109
    external_id: TALLER-SHL-TC-109
    name: "El tema sigue la preferencia del equipo y la elección se conserva"
    requirement: REQ-078
    priority: Low
    type: Functional
    component: shell
    preconditions: "El equipo del usuario tiene configurada la preferencia de tema oscuro y la aplicación no tiene ninguna preferencia de tema guardada"
    steps:
      - input: "Abrir la aplicación sin tocar el selector de tema"
        expected: "La interfaz se presenta con el tema oscuro, siguiendo la preferencia del equipo"
      - input: "Elegir el tema claro, cerrar la aplicación y volver a abrirla"
        expected: "La interfaz se presenta con el tema claro, que es la elección del usuario y no la preferencia del equipo"
    test_data_ref: DS-010
    tags: []
    verification_path: ui

    depends_on: []
    touches: [preferencies.tema]
    restores_state: false
    automation:
      grade: not-recommended
      reason: "depende de la preferencia de tema del equipo, que está fuera de la aplicación y fuera del navegador que conduce la prueba, y lo que verifica es apariencia; forzar prefers-color-scheme desde el driver comprobaría el simulacro, no la preferencia real del usuario"
      blocked: false
```

### 4.9 Configuración

Módulo sin desarrollar. Se prueba el único comportamiento real que existe hoy: el
aviso. Cuando se responda Q-04, este bloque crece.

| TC | REQ | Nombre | Prioridad | Tipo | Tags |
|---|---|---|---|---|---|
| TC-110 | REQ-079 | La sección de Configuración avisa de que está pendiente de desarrollo | Low | Functional | — |

```yaml testcases
version: 1
module: configuracio
cases:
  - id: TC-110
    external_id: TALLER-CFG-TC-110
    name: "La sección de Configuración avisa de que está pendiente de desarrollo"
    requirement: REQ-079
    priority: Low
    type: Functional
    component: configuracio
    preconditions: "La aplicación está abierta y el menú muestra la sección Configuración"
    steps:
      - input: "Pulsar la sección Configuración en el menú"
        expected: "Se abre la sección y muestra un aviso de que el módulo está pendiente de desarrollo"
      - input: "Revisar el contenido de la sección"
        expected: "No se ofrece ninguna opción de configuración editable, solo el aviso"
    test_data_ref: null
    tags: []
    verification_path: ui

    depends_on: []
    touches: []
    restores_state: true
    automation:
      grade: low
      reason: "comprueba el literal de un aviso de módulo no desarrollado; DOC-04/Q-04 está abierta y en cuanto se conteste el módulo entero cambia y el caso desaparece. Verificarlo a mano cuesta cinco segundos"
      blocked: false
```

### 4.10 Plan de ejecución: olas, carriles y cuellos de botella

Este apartado existe para que **quien vaya a ejecutar la suite no tenga que
parsear YAML**. Todo lo que sigue lo deriva `S-14 · Matriz de trazabilidad` de
los campos `depends_on`, `touches` y `restores_state`; aquí solo se cuenta.

Dos definiciones y ya se entiende el resto. Una **ola** es un escalón de
precedencia: la ola 1 no empieza hasta que la ola 0 ha terminado. Un **carril**
es un grupo de casos que comparten al menos un recurso y que por tanto van **en
serie** entre ellos; **los carriles corren en paralelo**. Un caso solo en su
carril es un caso que no estorba a nadie.

| Ola | Casos | Carriles | Carril más largo |
|---|---|---|---|
| 0 | 107 | 67 | 17 casos |
| 1 | 3 | 3 | 1 caso |

**Los 67 carriles de la ola 0 son 9 carriles con varios casos y 58 con uno
solo.** Los nueve que importan:

| Carril | Recursos que se disputan | Casos |
|---|---|---|
| **17 casos** | `albarans`, `albara_linies`, `peces`, `peces.estoc` | TC-029, TC-030, TC-034, TC-035, TC-037, TC-038, TC-039, TC-040, TC-044, TC-046, TC-047, TC-048, TC-050, TC-052, TC-053, TC-055, TC-056 |
| **9 casos** | `factures`, `albarans.estat` | TC-060, TC-065, TC-067, TC-068, TC-069, TC-070, TC-071, TC-072, TC-073 |
| **9 casos** | `nomines` | TC-088, TC-089, TC-094, TC-096, TC-098, TC-099, TC-100, TC-101, TC-104 |
| 3 casos | `clients` | TC-003, TC-007, TC-008 |
| 3 casos | `vehicles` | TC-013, TC-021, TC-022 |
| 2 casos | `factures.estat_pagament` | TC-076, TC-077 |
| 2 casos | `personal` | TC-084, TC-085 |
| 2 casos | `preferencies.idioma` | TC-105, TC-107 |
| 2 casos | `preferencies.tema` | TC-108, TC-109 |

Y los **58 carriles de un solo caso** no son un artificio: **56 de ellos son
casos que no modifican nada** —los que intentan una operación que el sistema
rechaza, y los de solo consulta— y por eso llevan `touches: []` con
`restores_state: true`, que es la combinación ideal. Los otros dos son **TC-054**,
que suma 5 unidades al stock y las devuelve, único caso del plan que restaura
estado tocando un recurso disputado, y **TC-102**, único que toca
`nomines.estat_pagament`.

**Los cuellos de botella, por orden.** El carril de 17 casos es el módulo de
albaranes, y colisiona por una razón concreta: los diecisiete trabajan sobre **el
mismo albarán de DS-005 y la misma pieza FIL-001 de DS-003**. `albara_linies` es
el recurso más disputado del plan, con 10 casos, y `peces.estoc` el segundo, con
8; siete de esos diez modifican los dos a la vez, que es justo la operación doble
que REQ-035 y REQ-039 describen y la que más caro sale equivocar. No
es una limitación del sistema sino del dataset: **en cuanto S-06 dé a cada caso
su propio albarán y su propia pieza, ese carril se parte en varios y la ola 0 se
acerca a los 80 carriles.** Mientras tanto, ejecutar el módulo de albaranes en
paralelo consigo mismo es exactamente lo que produjo el rojo de TC-048.

`factures` y `albarans.estat` van juntos a propósito: emitir una factura cambia
la situación de sus albaranes, que es la operación doble de REQ-047. En cambio
**`albarans` y `albarans.estat` se declaran por separado**, y esa es la razón de
que el carril de facturas y el de albaranes no se fundan en uno de 26: emitir no
toca la cabecera del albarán, y modificar la cabecera no toca su situación.

**Precedencia dura: solo tres casos.** Cada `depends_on` impide paralelizar, así
que se ha usado con cuentagotas y **únicamente donde el caso necesita que otro
haya retirado antes un registro que el dataset siembra**:

| Caso | Depende de | Por qué |
|---|---|---|
| TC-014 | TC-022 | TC-014 exige que **no exista** el vehículo 9012GHI y DS-004 lo siembra; el único caso que lo retira es TC-022 |
| TC-025 | TC-030 | TC-025 exige que **no exista** la pieza PAS-010 y DS-003 la siembra; el único caso que la retira es TC-030 |
| TC-080 | TC-085 | TC-080 exige que **no exista** el empleado 'Joan Serra' y DS-008 lo siembra; el único caso que lo da de baja es TC-085 |

Las tres son la misma situación: un caso de alta cuya precondición contradice al
dataset. **La dependencia es real hoy y es un parche**: la solución correcta es
que S-06 dé a esos tres casos una matrícula, una referencia y un nombre que el
dataset no siembre. El día que lo haga, los tres `depends_on` se vacían, la ola 1
desaparece y el plan queda en **una sola ola**. Queda anotado en el apartado 5.

**Lo que deliberadamente no se ha encadenado.** Media docena de casos tienen
precondiciones que describen, palabra por palabra, el estado que deja otro caso:
**TC-053** espera stock 37 y una línea de 3 unidades, que es justo lo que deja
TC-048; **TC-077** espera una factura pagada, que es lo que deja TC-076;
**TC-099** espera una nómina de 1.850,00 € con neto 1.529,50 €, que es lo que
deja TC-098; y **TC-084, TC-094 y TC-096** dan por hecho un 'Joan Serra' vivo que
TC-085 se lleva por delante. **Ninguno de los seis lleva `depends_on`, y es una
decisión, no un olvido:** ese estado lo puede montar el `setUp` del caso o el
dataset, y encadenarlos convertiría media suite en una fila india. Lo que
necesitan es ser autosuficientes, y eso se arregla en DOC-13, no aquí.

**Un límite honesto de este modelo, porque conviene saberlo antes de fiarse de
él.** `touches` declara lo que un caso **modifica**, nunca lo que lee, de modo
que dos casos que solo consultan jamás colisionan. Pero **hay casos que solo leen
un valor disputado y afirman su cifra exacta**: TC-024 y TC-028 esperan stock 40,
TC-049 espera que siga en 40, TC-031 y TC-059 esperan que no haya variado, y
TC-087 espera un orden concreto de las tres primeras nóminas. Ninguno modifica
nada y todos van en su propio carril, así que **el plan de ejecución los da por
inocuos y no lo son**: cualquier caso del carril de 17 que se ejecute antes les
cambia la respuesta. Además, meterlos en un carril tampoco los curaría: un carril
serializa, y la contaminación de TC-040 sobre TC-048 era **secuencial**, no
concurrente. Lo único que lo cura es que cada caso tenga su propio dato, y por eso
se traslada a S-06 como requisito, no como sugerencia.

### 4.11 Grado de automatización

`automation.grade` es **informativo**: no impide automatizar nada. Solo
`blocked: true` lo impediría, y **`blocked` es `false` en los 110 casos**, porque
nadie ha prohibido automatizar ninguno. El criterio que más pesa no es la
dificultad técnica sino **la tasa de cambio**: un caso que habría que reescribir
en cada release enseña al equipo a ignorar los rojos, y eso cuesta más que no
tenerlo.

| Grado | Casos | Qué significa aquí |
|---|---|---|
| `high` | **25** | Actúan sobre campos de `EntityForm`, que llevan `id={field.name}` y son estables (DOC-23), y comprueban en el listado o en la ficha un dato que el propio caso ha escrito. Se automatizan y se olvidan |
| `medium` | **80** | Automatizables con mantenimiento previsible. Cinco familias, abajo |
| `low` | **4** | TC-078, TC-103, TC-108, TC-110 |
| `not-recommended` | **1** | TC-109 |

**Las cinco familias que degradan a `medium`**, con lo que las causa y cuántos
casos arrastra cada una:

| Familia | Casos | Qué la degrada |
|---|---|---|
| **Literal del aviso** | **25** | El `expected` dice que el sistema avisa, y **DOC-04 no documenta el literal de ningún mensaje de error**. El test tiene que fijar un texto que cambia con cualquier retoque de la interfaz y con el cambio de idioma |
| **Formulario de línea** | **14** | Los formularios de línea de albarán **no llevan `id`** y hay que localizarlos por proximidad de la etiqueta visible, y el desplegable de pieza carga sus opciones por `fetch`. Es el punto exacto donde la prueba acotada de S-10 produjo un flake dependiente del orden (DOC-23) |
| **Apartado de ficha o lista sin identificador** | **19** | Los apartados de relación de una ficha —vehículos del cliente, albaranes del vehículo, nóminas del empleado— y la lista de albaranes de la emisión se localizan por su rótulo visible, no por identificador estable |
| **Rótulo de estado y de importe** | **7** | El resultado se lee por el rótulo de un estado o de un importe, y `DOC-04/Q-13` sigue abierta sobre cómo deben llamarse la situación del albarán y el estado de cobro |
| **Valor vivo del entorno** | **6** | Contadores anuales, volumen y orden del listado: el valor esperado no es fijo y el test debe derivarlo en ejecución |

Cada caso se cuenta en **una sola** familia, la que más lo degrada, y por eso las
cinco suman 71 sin solaparse. Conviene saber que **hay nueve casos que arrastran
dos motivos**: los cinco rechazos sobre línea de albarán —TC-042, TC-043, TC-045,
TC-049, TC-051— y los cuatro rechazos de la emisión —TC-062, TC-063, TC-064,
TC-066— dependen **también** del literal del aviso, de modo que los casos
afectados por el texto de error no son 25 sino **34**.

Los **nueve `medium` restantes** tienen motivo propio: TC-028 (el papel del coste
y la unidad depende de `Q-01` y `Q-03`), TC-041 (su tercer paso no se ejecuta por
la pantalla y necesita la misma llamada directa que TC-900), TC-055 (REQ-040 se
reescribe con la respuesta a `Q-10`), TC-073 (`Q-17` sobre el modo de redondeo),
TC-087 (el orden esperado depende de qué nóminas existan), TC-097 (comprueba las
etiquetas de los tres importes) y los tres del marco, TC-105 a TC-107, que
dependen del catálogo de traducciones y del almacenamiento del navegador.

**Los cuatro `low`, uno a uno.** TC-078 y TC-103 comprueban una sola cosa —que el
desplegable de estado ofrece exactamente dos valores— que depende del rótulo de
cada estado y que **se reescribe entera con el evolutivo** de `Q-14` y `Q-15`, ya
respondidas: automatizarlos hoy es escribir un test para tirarlo. TC-108 verifica
apariencia, y automatizarlo obliga a fijar el nombre de una clase CSS o de un
atributo de tema, detalle de implementación que cambia sin que el comportamiento
cambie; un humano lo ve en dos segundos. TC-110 comprueba el literal del aviso de
un módulo sin desarrollar que desaparecerá en cuanto se conteste `Q-04`.

**El único `not-recommended` es TC-109**, y no por difícil: depende de **la
preferencia de tema del equipo**, que está fuera de la aplicación y fuera del
navegador que conduce la prueba, y lo que verifica es apariencia. Forzar
`prefers-color-scheme` desde el driver comprobaría el simulacro, no la
preferencia real del usuario, de modo que el test daría verde sin haber probado
lo que el requisito dice. **Sigue siendo un caso válido**: se ejecuta a mano y
S-10 lo salta.

**Dónde está la palanca.** No en escribir mejores tests. **34 de los 80 `medium`
lo son, del todo o en parte, por una sola carencia documental** —ningún texto de
error está fijado en DOC-04— y **otros nueve por una sola carencia técnica**: los
formularios de línea de albarán no llevan `id`. Documentar los mensajes de error
y poner un identificador estable en esos formularios subiría **43 de los 80
`medium`**, más de la mitad, sin tocar un solo caso de este plan. Es la
recomendación más rentable que sale de este documento y va dirigida a quien
mantenga la aplicación, no a quien la automatice.

### 4.12 Vía de verificación · la política de cuándo un caso va por servicio

Cada caso declara **`verification_path`**, con vocabulario cerrado de tres
valores: **`ui`**, **`service`** y **`mixed`**. El campo no lo inventa este plan:
lo introdujo `A-06 · Refinamiento` para los criterios de aceptación de `EVO-001`,
y este contrato lo adopta tal cual porque resuelve exactamente el mismo problema
—cada elemento verificable declara por qué vía se prueba— un escalón más abajo,
en el caso en vez de en el criterio.

**Equivalencia con el vocabulario de A-06**, para que nadie la tenga que
adivinar: `interfaz` → `ui`, `servicio` → `service`, `mixta` → `mixed`. La
correspondencia es uno a uno; solo cambia el idioma, porque el contrato de
`testcases` está en inglés y el de `acceptance_criteria` en castellano.

**La política, en una frase:**

> **Un caso va por servicio solo cuando el vector no existe en la interfaz.** No
> es una prueba de contrato de API: es la única vía de ejercer la regla.

No es una política inventada para esta versión: es **la que este plan ya
practicaba**. `TC-041` va por servicio desde 1.3.0 y el motivo escrito entonces
—«el tercer tipo de línea que REQ-031 prohíbe no se puede ni formular desde la
pantalla»— es literalmente el criterio. Lo único que cambia en 1.5.0 es que deja
de ser la excepción de un caso y pasa a ser la regla que decide los 110.

**Las tres consecuencias que se siguen, y conviene decirlas porque son las que
alguien va a querer discutir:**

1. **Ser restrictivo es parte de la política, no un descuido.** Si el vector
   existe en la pantalla, el caso es `ui` **aunque por API también funcionara**.
   Duplicar por las dos vías cada validación multiplicaría la suite por dos para
   comprobar dos veces la misma regla, y la segunda copia se rompería con cada
   cambio del servidor sin aportar cobertura nueva. Los 30 casos `Negative` que
   no son TC-041 se quedan en `ui`.
2. **No se prueba la ausencia de defensa en el servidor.** `DOC-24/BUG-003`
   demostró que la validación de importes **no está en ninguna de las dos capas**.
   Ese hueco no genera casos aquí: escribir hoy «el servicio rechaza el importe
   negativo» produciría un rojo permanente contra el AS-IS, que es exactamente lo
   que `Q-19` cerró que no se hace. Nace con el evolutivo, por la vía normal.
3. **`mixed` existe y hoy está vacío.** Ningún caso del plan lo usa: TC-041 se
   declara `service` porque el campo clasifica **el vector**, no cada paso —los
   pasos 1, 2 y 4 sí se ejecutan por la pantalla, y así queda anotado en su
   `verification_path_note`—. Bajo el criterio de A-06, que clasifica el
   criterio de aceptación completo, ese mismo caso sería `mixta` (compárese con
   `EVO-001/AC-008`). La divergencia es deliberada y se declara: aquí pesa **quién
   lo tiene que automatizar**, y en TC-041 el intento y la comprobación del efecto
   los ejecuta `S-17` de punta a punta. El primer `mixed` real de este plan
   llegará con los casos de EVO-001.

| Vía | Casos | Cuáles | Quién los automatiza |
|---|---|---|---|
| `ui` | **109** | todos menos TC-041 | `S-10 · Automatizador QA` (Selenium + Cucumber, `automation/ui/`) |
| `service` | **1** | TC-041 | `S-17 · Automatizador QA de servicio` (Postman, `automation/api/`) |
| `mixed` | **0** | — | los dos, coordinados |

**Los cuatro dudosos, nombrados.** El campo se ha decidido caso a caso sobre los
110, no puesto a `ui` por defecto y corregido en uno. El barrido se concentró en
los 31 `Negative` y los 9 `Boundary`, que son donde un vector puede no existir en
la pantalla; cuatro casos obligaron a pararse, y los cuatro se quedan en `ui`.
Se listan aquí porque **un caso mal clasificado como `ui` se queda sin cubrir por
ninguna de las dos suites**, y quien tenga el dato que falta debe poder corregirlo
sin releer los 110:

| Caso | Por qué se dudó | Por qué se queda en `ui` | Qué lo movería a `service` |
|---|---|---|---|
| **TC-045** · rechazar una línea de pieza que no existe en el catálogo | El paso dice «indicando la referencia ZZZ-000», pero DOC-23 observó en campo que **el selector de pieza carga sus opciones por `fetch`**: si la pieza solo se puede elegir de una lista, una referencia inexistente no se puede ni teclear | El paso está escrito como acción de pantalla y DOC-04 afirma que el sistema **avisa**, lo que presupone que el intento llega a formularse. Cambiarlo sin comprobarlo sería inventar | Que se confirme que el campo de pieza es un desplegable cerrado. Entonces el vector no existe en la interfaz y el caso es `service`. **Es el dudoso más probable de los cuatro** |
| **TC-015** · alta de vehículo sin cliente existente | El requisito dice «cliente **existente**»; el caso solo ejerce «cliente **vacío**», que sí es formulable. Un cliente *inexistente* —un identificador que no está— no se puede componer desde un desplegable | El caso, tal como está escrito, prueba el vector vacío y ese vector es de pantalla | Nada lo mueve: lo que falta no es cambiar su vía, sino **un caso hermano** que ejerza la referencia inexistente, y ese sí nacería `service` |
| **TC-036** · apertura de albarán sin vehículo existente | Idéntico a TC-015, con el vehículo | Ídem | Ídem |
| **TC-090** · nómina sin empleado existente | Idéntico a TC-015, con el empleado | Ídem | Ídem |

**TC-015, TC-036 y TC-090 son el mismo hueco tres veces**, y conviene verlo como
uno: los tres requisitos hablan de una referencia *existente* y los tres casos
comprueban la mitad vacía. La mitad que falta —la referencia a algo que no está—
**solo se puede ejercer por servicio**, y hoy no está cubierta por nadie. No se
abre pregunta por ello: no es una duda, es un vector no cubierto, y se declara
como tal en el apartado 6 junto a los demás. Los casos que lo cubran nacerán
`service` cuando se escriban.

**Los que se miraron y no dieron duda.** Los tres bloqueos del albarán facturado
—**TC-057, TC-058 y TC-059**— parecían candidatos, porque si la interfaz
escondiera los botones el intento no se podría formular; se quedan en `ui`
**porque DOC-04 afirma que el sistema avisa**, y avisar exige que el intento
llegue. Si alguna vez la implementación pasa a ocultar el control en vez de
rechazar la acción, los tres cambian de vía a la vez. Los límites numéricos
—cantidad negativa en TC-043, mes 0 y mes 13 en TC-092 y TC-093— son `ui` sin
discusión: un campo numérico admite que se le teclee cualquier cosa.

**Por qué esto no es burocracia.** `S-17` genera colecciones que validan datos y
efectos laterales, no solo códigos de respuesta, y **sin `verification_path` no
puede distinguir lo que le toca de lo que ya cubre `S-10`**. Antes de este campo,
la única forma de saber que TC-041 no es automatizable por pantalla era leer un
párrafo de prosa en 4.4 y una frase dentro de un `automation.reason`. Ahora es un
campo, y la respuesta es un filtro.

**Lo que ya se ve venir, dicho aquí para que no sorprenda.** A-06 ha determinado
que **cuatro de los once criterios de `EVO-001` solo son alcanzables por
servicio** —`AC-002`, `AC-004`, `AC-007` y `AC-009`—, incluido el que impide
facturar al cliente equivocado. No es una anomalía: al decidir negocio que el
desplegable **filtre** los vehículos por cliente, desapareció la forma de
intentarlo desde la pantalla, y filtrar no sustituye a comprobar. Cuando esos
casos nazcan en la regeneración de este plan, el reparto de `verification_path`
dejará de ser 109/1/0. **Eso no relaja la política**: esos cuatro criterios van
por servicio precisamente porque su vector ya no existe en la interfaz, que es la
única razón que la política admite.

## 5. Datos de prueba requeridos

Los conjuntos que S-06 debe materializar en DOC-13. Cada uno se referencia desde
el campo `test_data_ref` de los casos que lo consumen. Los casos con
`test_data_ref: null` crean su propio dato dentro de los pasos y no necesitan
preparación previa.

| DS | Nombre | Contenido mínimo | Casos que lo usan |
|---|---|---|---|
| DS-001 | Clientes base | Tres clientes: 'Garcia Motors SL' (NIF B12345678, teléfono 933000111), 'Tallers Puig SL' y 'Motos Rius'; este último sin ninguna dependencia, para poder borrarlo. Volumen suficiente para que el listado pagine | TC-001, TC-002, TC-005, TC-007, TC-008, TC-009, TC-014, TC-016 |
| DS-002 | Cliente con dependencias | 'Garcia Motors SL' con el vehículo 1234ABC y con una factura emitida, para los dos bloqueos de borrado y la ficha completa | TC-006, TC-010, TC-011 |
| DS-003 | Catálogo de piezas con stock conocido | 'Filtro de aceite' FIL-001: precio 12,50 €, coste 7,80 €, unidad 'unitat', proveedor 'Recanvis Vallès', stock 40. 'Pastillas de freno' PAS-010: precio 45,00 €, stock 12, sin uso en albaranes | TC-024, TC-027, TC-028, TC-029, TC-030, TC-042, TC-044, TC-045, TC-049 |
| DS-004 | Vehículos con y sin albaranes | 1234ABC de 'Garcia Motors SL' con un albarán abierto; 5678DEF y 9012GHI sin albaranes. Volumen suficiente para que el listado pagine | TC-012, TC-017, TC-018, TC-019, TC-020, TC-021, TC-022, TC-023 |
| DS-005 | Albarán pendiente con líneas | Albarán del vehículo 1234ABC en situación pendiente de facturar, con una línea de pieza FIL-001 (2 unidades a 12,50 €) y una línea de mano de obra (2 h a 35,00 €). Base resultante 95,00 € | TC-031, TC-032, TC-033, TC-040, TC-041, TC-043, TC-046, TC-047, TC-048, TC-050, TC-051, TC-052, TC-053, TC-054, TC-055, TC-056, TC-060, TC-061, TC-062, TC-064, TC-065, TC-066, TC-067, TC-068 |
| DS-006 | Albarán facturado y su factura | Albarán ya facturado, enlazado a una factura emitida, para los tres bloqueos de REQ-042 y para el rechazo de refacturación | TC-057, TC-058, TC-059, TC-063, TC-074, TC-075, TC-076, TC-077, TC-078 |
| DS-007 | Importes de factura | Tres albaranes pendientes de un mismo cliente con bases 95,00 €, 20,00 € y 33,33 € (este último: 3 unidades a 11,11 €), para base agregada, IVA por defecto, IVA indicado y redondeo | TC-069, TC-070, TC-071, TC-072, TC-073 |
| DS-008 | Empleados con y sin nóminas | 'Joan Serra' sin ninguna nómina, para poder borrarlo; 'Marta Vidal' con al menos una nómina registrada, para el bloqueo de baja | TC-079, TC-082, TC-083, TC-084, TC-085, TC-086, TC-090, TC-095, TC-096 |
| DS-009 | Nóminas con importes de cálculo | Nóminas de 'Marta Vidal': 03/2026 con bruto 1.850,00 € y deducciones 320,50 €; 11/2025 y 01/2026 para comprobar la ordenación; una con bruto 2.345,67 € y deducciones 411,11 € para el redondeo | TC-087, TC-091, TC-097, TC-098, TC-099, TC-100, TC-101, TC-102, TC-103, TC-104 |
| DS-010 | Instalación limpia del marco | Aplicación sin ninguna preferencia de idioma ni de tema guardada, y equipo con preferencia de tema oscuro, para los dos valores por defecto | TC-106, TC-107, TC-109 |

**Nota para S-06.** Los importes de DS-003, DS-005, DS-007 y DS-009 están
elegidos para que los resultados esperados sean exactos y no dependan del modo de
redondeo: 95,00 € + 21 % = 114,95 €; 33,33 € + 21 % = 40,33 € (el IVA de 6,9993 €
se presenta como 7,00 €); 1.850,00 − 320,50 = 1.529,50 €. Si S-06 cambia estas
cifras, hay que rehacer los `expected` de TC-069 a TC-073 y de TC-098 a TC-100.

**Segunda nota para S-06.** DS-005 no cambia de contenido, pero
**TC-041 ha pasado a depender de que sean exactamente esas dos líneas y esa
base**: su resultado esperado es que, tras el rechazo, el albarán siga teniendo
dos líneas de 25,00 € y 70,00 € y una base de 95,00 €. Hasta ahora DS-005 se
usaba como «un albarán con líneas», y un tercer registro de más no habría roto
nada. A partir de ahora sí: si el dataset gana una línea, TC-041 falla por el
dato, no por el sistema. No hace falta un `DS-nnn` nuevo; hace falta que DS-005
sea exacto, y por eso se dice aquí en vez de darlo por supuesto.

**Tercera nota para S-06: tres encargos concretos que salen del
plan de ejecución.** Los campos de aislamiento han dejado a la vista que buena
parte de lo que impide paralelizar esta suite **no está en la aplicación sino en
los datos**, y eso se arregla en DOC-13.

1. **Tres altas cuya precondición contradice al dataset.** TC-014 exige que no
   exista el vehículo **9012GHI**, TC-025 que no exista la pieza **PAS-010** y
   TC-080 que no exista el empleado **'Joan Serra'**, pero DS-004, DS-003 y
   DS-008 los siembran. Hoy eso se sostiene con los únicos tres `depends_on` del
   plan, que encadenan cada alta al caso que da de baja ese mismo registro. **Si
   S-06 les da una matrícula, una referencia y un nombre que ningún dataset
   siembre, los tres `depends_on` se vacían y la suite pasa a tener una sola
   ola.** Es el cambio de mayor efecto y el más barato.
2. **Seis casos que leen un valor disputado y afirman su cifra exacta.** TC-024 y
   TC-028 esperan stock 40, TC-049 que siga en 40, TC-031 y TC-059 que no haya
   variado y TC-087 un orden concreto de nóminas. Como no modifican nada, el plan
   de ejecución los considera inocuos, y **no lo son**: cualquier caso que mueva
   el stock antes les cambia la respuesta. Necesitan **una pieza propia** —o un
   `setUp` que fije el stock justo antes de leerlo—, y ese es el mismo defecto
   que DOC-23 encontró en TC-048.
3. **Un albarán por caso y una pieza por caso donde haya movimiento de stock.**
   Diecisiete casos comparten hoy el albarán de DS-005 y la pieza FIL-001 de
   DS-003, y por eso forman un carril de diecisiete que se ejecuta en serie.
   Repartirlos es lo único que hace falta para que el módulo de albaranes deje de
   ser el cuello de botella de la suite.

Y una advertencia que no es de datos sino de realidad, ya anotada por S-10: **la
pieza FIL-001 con stock 40 no existe en el sistema real**; DOC-23 tuvo que
adaptarse a la pieza del seed. Los `DS-nnn` de este plan son un encargo, no una
descripción de lo que hay hoy en la base de datos.

## 6. Preguntas abiertas

DOC-04 1.2.0 censa **15 preguntas**: 9 abiertas y 6 respondidas por negocio el
2026-08-16, todas ellas con `gap_open_until_implemented: true` y evolutivo
pendiente. Este plan **no resuelve ninguna de esas quince**: A-03 no inventa
comportamiento esperado. Lo que sí hace desde 1.2.0 es **declarar cuáles son
suyas y cuáles solo cita**, en el bloque `open_questions` que cierra el apartado.

De las **cuatro propias**, **dos están respondidas y dos siguen abiertas**:

| ID | Estado | Quién la cerró y por qué se podía cerrar |
|---|---|---|
| `Q-16` | **`open`** | Reinicio del correlativo al cambiar de ejercicio. Es decisión de negocio; A-03 no la inventa |
| `Q-17` | **`open`** | Modo de redondeo en el empate del tercer decimal. Ídem |
| `Q-18` | **`answered`** | Vías de entrada distintas de la interfaz. **Mitad factual** contestada por evidencia reproducible (A-14, `DOC-24/BUG-003`); **mitad de método** decidida por A-03, que es su dueño. Apartado **6.5** |
| `Q-19` | **`answered`** | Cobertura de los defectos confirmados. Decisión de método: A-05 recomendó y el propietario del proyecto decidió. Apartado **6.4** |

La línea que separa las dos columnas de la derecha es la misma siempre: **A-03
cierra lo que es de método y no cierra nada de negocio.** `Q-16` y `Q-17`
preguntan qué debe hacer el sistema; eso no lo decide quien escribe las pruebas.
`Q-18` y `Q-19` preguntan cómo se prueba, y eso sí.

**Por qué un bloque y no solo la tabla.** Hasta 1.1.0 estas preguntas vivían solo
en prosa. Leyendo prosa, S-12 no puede distinguir si un `Q-nnn` ajeno se **cita**
o se **reclama**: sobre 1.1.0 informaba de *11 sospechas y ninguna certeza*. Con
`owner` explícito y la separación entre `questions` (mías) y `cites` (de otro
documento), la distinción pasa a ser decidible y deja de depender de que alguien
lea el párrafo correcto.

### 6.1 Gobierno de la numeración

Las cuatro preguntas propias son **Q-16 a Q-19**, y los cuatro números los dio
S-12 (`next --prefix Q --count 4`), no la intuición. `Q-nnn` es un contador
global del proyecto compartido con A-02, S-01, A-04 y A-15: numerar a mano es
justo lo que produjo la colisión de dos `Q-14` y dos `Q-15` con ocho minutos de
diferencia. **La tabla de equivalencia de aquella renumeración vive en
`DOC-05-PLAN-PRUEBAS-HIST.md`**, no aquí, porque es historial; cada entrada del
bloque de 6.6 conserva además su `previous_id`, que es la forma que una máquina
puede leer.

**Nota de formato, deliberada.** En la tabla de 6.2 los identificadores ajenos se
escriben `DOC-04/Q-nn`, con el documento dueño delante, y en el bloque las
entradas de `cites` llevan `owner` como primera clave. No es estilo: el extractor
de S-12 abre una entrada nueva en cada fila de prosa cuyo primer campo es un
`Q-nnn` a secas y en cada línea `- id: Q-nnn`, y **una cita no debe abrir
entrada**. YAML no da significado al orden de las claves, de modo que el contrato
se cumple igual. Si alguien «arregla» el orden o quita el prefijo, las 13 citas
volverán a contarse como reclamaciones. No reordenar.

Consecuencia buscada: **la tabla no es fuente para ninguna máquina, solo para
personas**; la fuente es el bloque de 6.6. Comprobado ejecutando el extractor
sobre este documento: no encuentra ni una sola reclamación en prosa, y las cuatro
que encuentra vienen del bloque.

### 6.2 Las preguntas y su efecto sobre este plan

| ID | Dueño | Pregunta | Efecto sobre este plan |
|---|---|---|---|
| DOC-04/Q-02 | A-02 | El stock se descuenta sin comprobar existencias y puede quedar negativo. ¿Es deliberado o falta una regla? — **respondida: bloquear** | **Vector no cubierto.** No hay ningún caso que consuma más unidades de las que hay en stock. La respuesta fija el TO-BE, pero el AS-IS no ha cambiado: el caso `Boundary` sobre REQ-035 nace con el evolutivo, no aquí (ver 6.3) |
| DOC-04/Q-09 | A-02 | Ningún vocabulario acota los tipos de IVA admisibles; solo el 21 % por defecto está fijado | TC-072 aplica un 10 % porque DOC-04 afirma que el tipo se puede indicar, pero **no se prueba ningún tipo inválido** (negativo, superior a 100, no numérico): no hay regla que decir que se viola |
| DOC-04/Q-12 | A-02 | Ninguna regla acota a no negativos el precio, el coste, el stock ni el precio por hora — **respondida: siempre positivos** | **Vector no cubierto.** No hay casos con importes negativos en TC-025, TC-029, TC-047 ni TC-050. Los cuatro casos `Negative` que hacen falta nacen con el evolutivo. A-14 ya confirmó el hueco en la aplicación real (BUG-003) |
| DOC-04/Q-11 | A-02 | La nómina pagada se puede modificar y borrar sin restricción, a diferencia del albarán facturado | TC-101 y TC-104 se ejecutan sobre nóminas **pendientes de pago**, no pagadas. El caso de la nómina pagada no se diseña porque el resultado esperado es justo lo que está en duda. La respuesta a `Q-15` de A-02 no cubre esto |
| DOC-04/Q-06 | A-02 | Una factura no se puede modificar ni anular; sus albaranes quedan bloqueados de forma permanente — **respondida: factura rectificativa** | No hay ningún caso de anulación ni de rectificación. Todo el módulo de facturas se prueba en un único sentido: emitir y cobrar. La rectificativa es entidad nueva con numeración propia: su plan de pruebas es del evolutivo |
| DOC-04/Q-10 | A-02 | Se puede cambiar el vehículo de un albarán no facturado, incluso a un vehículo de otro cliente — **respondida: impedirlo entre clientes** | TC-055 cambia el vehículo **dentro del mismo cliente**, que es el caso sin ambigüedad y sigue siendo válido tras la respuesta. El cambio entre clientes queda sin cubrir; A-14 lo reprodujo (BUG-002) |
| DOC-04/Q-13 | A-02 | El término «estado» designa a la vez la situación del albarán y la situación de cobro | Los `expected` de TC-033, TC-037, TC-078 y TC-103 se han escrito nombrando el concepto («pendiente de facturar», «pendiente de cobro», «pendiente de pago») y no la etiqueta literal de la pantalla. Si la interfaz unifica nombres, hay que revisar esos cuatro |
| DOC-04/Q-01 · DOC-04/Q-03 | A-02 | El coste y la unidad de la pieza no intervienen en ningún cálculo | TC-028 solo comprueba que ambos se **muestran**, nunca que se usen. Si el negocio decide que el coste calcula margen, el caso se queda corto |
| DOC-04/Q-04 | A-02 | La sección de Configuración no está desarrollada y nada describe su contenido | TC-110 prueba el único comportamiento real que existe: el aviso. Todo el módulo es 1 caso `Low` |
| DOC-04/Q-05 | A-02 | El salario base del empleado no propone el bruto de la nómina | TC-088 teclea el bruto a mano, tal como DOC-04 lo describe. No se prueba ninguna propuesta automática |
| DOC-04/Q-14 | A-02 | El estado de pago de la factura no condiciona nada: ni recuento ni filtro de pendientes de cobro — **respondida: debe haberlos** | TC-078 comprueba hoy lo único observable: que el estado se muestra y se puede cambiar. El recuento y el filtro son funcionalidad nueva; sus casos son del evolutivo, y entonces habrá que revisar TC-078 |
| DOC-04/Q-15 | A-02 | Lo mismo en nóminas: ni recuento ni filtro de pendientes de pago — **respondida: debe haberlos** | Mismo efecto sobre TC-103. Ojo con la equivalencia: esta `Q-15` es la de A-02, no la que este documento llamaba así en 1.1.0 (ahora `Q-18`) |
| **Q-16** | **A-03** | ¿Qué ocurre con la numeración anual al cambiar de año —REQ-029 y REQ-048—? DOC-04 dice «correlativo anual» pero no describe el reinicio | TC-039 y TC-068 prueban el incremento **dentro del mismo año**. El reinicio en el cambio de ejercicio queda sin cubrir. Desbloquea: un `Boundary` sobre el primer documento del ejercicio siguiente |
| **Q-17** | **A-03** | ¿Cuál es el modo de redondeo cuando el tercer decimal es exactamente 5 —21 % sobre 107,50 € da 22,575 €—? DOC-04 exige dos decimales pero no dice cómo se rompe el empate | Los importes de DS-007 se han elegido para **evitar** el empate, de modo que el plan no depende de la respuesta. Desbloquea: un `Boundary` sobre REQ-051 con base 107,50 € |
| **Q-18** | **A-03** | Sin `DOC-03-API.md`, ¿existe alguna vía de entrada distinta de la interfaz —importación, scripts, API— por la que saltarse las validaciones que aquí se prueban? — **respondida el 2026-08-17, en dos mitades** | **Cerrada.** (a) La vía **existe y está usada**: A-14 ejecutó contra `localhost:3001` sin pasar por la pantalla y `BUG-003` demuestra que la validación no está en ninguna de las dos capas. (b) El plan **no la duplica**: un caso va por servicio solo cuando el vector no existe en la interfaz. Los 110 casos declaran ya `verification_path` —109 `ui`, 1 `service`—. Cero casos nuevos, cero casos modificados. El razonamiento, en 6.5 |
| **Q-19** | **A-03** | Ninguno de los 110 casos detecta los cuatro defectos que A-14 confirmó contra la aplicación real. ¿Se añaden casos-testigo del comportamiento defectuoso de hoy, o esos defectos quedan sin cobertura hasta el evolutivo? — **respondida el 2026-08-16: ni una cosa ni la otra** | **Cerrada.** No se añade ningún caso-testigo a DOC-05 y la vigilancia se traslada a DOC-23, que no exporta a Rally. Cero casos nuevos, cero casos modificados: el plan sigue en 110. El razonamiento, en 6.4 |

### 6.3 Qué hacen aquí las seis respuestas de negocio: nada, todavía

Cinco de los once casos marcados «a revisar» en 1.1.0 —**TC-025, TC-047, TC-048,
TC-050 y TC-055**— dependían de preguntas que negocio ya ha contestado (Q-02,
Q-10 y Q-12 de DOC-04). Podría parecer que toca escribir ya los casos que
faltaban. **No toca, y comparto el criterio de A-05:** el AS-IS no ha cambiado.
Las seis respuestas llevan `gap_open_until_implemented: true` y su evolutivo está
`pending`; un caso que hoy afirmara «el sistema impide dejar el stock negativo»
se pondría en rojo contra la aplicación real, y un caso que falla porque describe
un sistema que aún no existe no es una prueba, es una petición mal colocada. La
secuencia es: evolutivo (A-06, DOC-08) → DOC-04 regenerado → DOC-05 regenerado.
Los casos nuevos nacen en ese tercer paso.

Lo que sí queda anotado es **qué caso desbloquea cada respuesta**, en el campo
`unblocks_case` del bloque, para que A-05 lo calcule en lugar de leerlo aquí.

**Casos que habrá que revisar cuando llegue el evolutivo:** TC-025, TC-028,
TC-047, TC-048, TC-050, TC-055, TC-071, TC-072, TC-078, TC-101, TC-103, TC-104 y
TC-110. Son los once de 1.1.0 más TC-078 y TC-103, que entran por las respuestas
de A-02 sobre los estados de pago.

### 6.4 Lo que A-14 encontró, y dónde vive la vigilancia · `Q-19` cerrada

`DOC-24-BUGS.json` confirma cuatro defectos ejecutando contra la aplicación real,
y una comprobación automatizada demuestra que **ninguno de los 110 casos de este
plan los detecta**. No es un descuido: los cuatro defectos son exactamente el
comportamiento que DOC-04 describe como AS-IS —el stock queda negativo, el
albarán cambia de cliente, el precio negativo se acepta, la factura no se
anula—, y un caso escrito sobre el AS-IS pasa en verde delante del defecto. Un
plan fiel a su fuente no puede detectar los huecos de su fuente.

**`Q-19` queda respondida el 2026-08-16**, y no por omisión: la condición la puso
A-05 en su revisión de coherencia, el propietario del proyecto la ha aceptado tal
cual y le ha añadido la segunda mitad. La respuesta no es ninguna de las dos
salidas que la pregunta planteaba, sino un reparto entre dos documentos.

**(a) No se añaden casos-testigo a DOC-05.** El argumento de A-05 se acepta sin
matices: un testigo que afirme «el stock queda negativo» **pasa en verde mientras
el sistema está roto**, y Rally transporta `PASS`, no razones. Hoy los cuatro
defectos dan verde por omisión —no hay caso que los mire—; con testigos darían
verde por afirmación, que es estrictamente peor, porque convierte evidencia de
defecto en evidencia de conformidad y la métrica de release deja de distinguir
«correcto» de «roto tal como se esperaba». Los casos correctos nacen con el
evolutivo, por la secuencia normal: A-06 → DOC-04 regenerado → DOC-05 regenerado.

**(b) La vigilancia vive en DOC-23, no aquí.** Los casos que afirman el
comportamiento **correcto** —y que por tanto están en **rojo** mientras el
defecto siga abierto— se mantienen en el proyecto de automatización de interfaz,
hoy en **`automation/ui/`**, que **no exporta a Rally**. Ahí un rojo es
información útil: señala un defecto abierto y no contamina ninguna métrica de
release. Ya existe uno, **`TC-900`** en
`automation/ui/src/test/resources/features/albarans.feature`, que falla en rojo
sobre BUG-001 y es justamente lo que demostró el punto ciego de este plan. Cuando
el evolutivo se implemente, ese caso pasa a verde solo y puede migrar a DOC-05
con toda legitimidad.

> **Nota de corrección de ruta · 2026-08-17.** La decisión anterior se tomó el
> 2026-08-16 nombrando la carpeta **`docs/DOC-23-AUTOMATION/`**, que es donde
> vivía entonces el proyecto Selenium + Cucumber. El **2026-08-17**, a petición
> del propietario del proyecto, la automatización se reorganizó: ese proyecto es
> ahora **`automation/ui/`** y nace **`automation/api/`** para la colección
> Postman de S-17 (**DOC-26**). **El documento sigue siendo DOC-23 y la decisión
> sigue siendo la misma**; lo único que cambió es dónde está el código. El
> párrafo de arriba y el front-matter usan ya la ruta nueva. **El texto de la
> `resolution` de `Q-19`, en cambio, no se ha tocado**, y la corrección se anota
> a su lado en el campo `resolution_path_correction`: reescribir el texto de una
> decisión registrada la convierte en otra decisión, y quien vuelva a leerla
> dentro de seis meses debe encontrar lo que se decidió, no una versión
> retocada de lo que se decidió.

**El reparto, dicho de una vez, porque no es evidente y dentro de seis meses
alguien lo va a cuestionar:**

| | DOC-05 (este plan) | DOC-23 (`automation/ui/`) |
|---|---|---|
| Qué afirma | el **AS-IS**: lo que el sistema hace hoy | también el **TO-BE**: lo que debería hacer |
| Exporta a Rally | **sí**, vía S-07 | **no** |
| Qué significa un rojo | una regresión: algo que funcionaba se ha roto | puede ser un defecto abierto ya conocido |
| Numeración | `TC-001` – `TC-110`, gobernada por S-12 | serie `TC-9nn`, deliberadamente fuera del rango del plan |
| Cuándo migra un caso | — | cuando el evolutivo lo pone en verde |

La asimetría es deliberada. **DOC-05 documenta y exporta el AS-IS; DOC-23 puede
además vigilar lo que debería ser.** El motivo no es que un documento sea más
riguroso que el otro, sino que solo uno de los dos alimenta una métrica que
alguien lee como semáforo de entrega. Donde el rojo se interpreta, el rojo puede
significar «defecto conocido»; donde el verde se cuenta, todo caso debe ser verde
por la razón correcta. Por eso la serie `TC-9nn` de DOC-23 no invade el rango del
plan: que un identificador de vigilancia no se pueda confundir nunca con uno
exportable es parte del mismo cuidado.

Lo que queda en pie de la pregunta original: los cuatro defectos **siguen sin
cobertura exportable**, y eso ahora es una decisión registrada con motivo, no un
olvido. Quien mire la matriz de A-05 verá REQ-035, REQ-040, REQ-019 y REQ-043
cubiertos por casos que pasan, y debe saber que esos casos describen el sistema
de hoy, defecto incluido; la lista de defectos vive en `DOC-24-BUGS.json` y su
vigilancia activa, en DOC-23.

### 6.5 `Q-18` cerrada · la vía existe, y cuándo se usa

`Q-18` preguntaba, sin `DOC-03-API.md` sobre la mesa, si existe alguna vía de
entrada distinta de la interfaz por la que se pudieran saltar las validaciones
que este plan prueba. **Eran dos preguntas en una**, y por eso se cierra en dos
mitades con dueños distintos: la primera es un hecho, y los hechos no se opinan;
la segunda es método, y el método de este plan es de A-03.

**(a) La mitad factual: la vía existe, está usada, y no hay defensa detrás.** No
se cierra con un juicio sino con una reproducción:

| Qué | Evidencia |
|---|---|
| La vía existe | `A-14 · Explorador Ejecutor` ejecutó **contra `localhost:3001` directamente**, sin pasar por la interfaz, y registró el resultado en `DOC-24-BUGS.json` |
| Está usada | `BUG-001` y `BUG-002` se reprodujeron por ahí; `BUG-002` dejó el albarán 5 en un vehículo de otro cliente y una factura de 114.835,05 € emitida al cliente equivocado |
| No hay defensa en el servidor | **`BUG-003`**: la validación de importes **no está en ninguna de las dos capas**. No es que la pantalla valide y el servicio no: es que no valida nadie |
| Segundo testigo | `A-15 · Propuestas de funcionalidad` anotó la misma reproducción como `evidence` en DOC-25 |

Conviene decir lo que esto **no** significa. No significa que la interfaz sea una
defensa que alguien pueda esquivar: significa que en `BUG-003` **no hay defensa
que esquivar**. La diferencia importa para lo que se hace después. Si la
validación viviera solo en la pantalla, la respuesta sensata sería duplicar los
casos `Negative` por servicio para demostrar el agujero. Como no vive en ninguna
parte, duplicarlos solo produciría 30 rojos permanentes contra el AS-IS, que es
exactamente lo que `Q-19` acaba de cerrar que no se hace.

**(b) La mitad de método: la política.** Está escrita en el apartado **4.12** y se
resume en una frase —*un caso va por servicio solo cuando el vector no existe en
la interfaz*—. No es una política nueva: es la que este plan **ya practicaba** en
`TC-041` desde 1.3.0, ascendida de excepción documentada a criterio general y
hecha legible por una máquina en el campo `verification_path`.

**Por qué esta mitad sí la cierra A-03, y `Q-16` y `Q-17` no.** Q-16 pregunta qué
debe hacer el sistema al cambiar de ejercicio y Q-17 cómo debe redondear: son
decisiones de negocio, y un plan de pruebas que las conteste está inventando el
comportamiento que dice verificar. Q-18(b) pregunta **cómo se prueba lo que el
sistema ya hace**, que es la única clase de decisión que este documento tiene
derecho a tomar. Es el mismo reparto que en `Q-19`, con una diferencia: allí la
decisión afectaba a lo que se exporta a Rally —una métrica que leen otros— y por
eso la recomendó A-05 y la firmó el propietario; aquí no sale de la mesa de A-03.

**Lo que la respuesta cambia en el plan: nada del contenido.** Cero casos nuevos,
cero casos retirados, cero pasos modificados. Los 110 siguen siendo los mismos y
lo único que ganan es un campo que dice lo que ya era cierto. Que cerrar una
pregunta de método no mueva ni un caso es la señal de que se estaba practicando
bien antes de escribirse, no de que la respuesta sea inocua: lo que cambia es que
`S-17` puede ahora **calcular** su alcance en vez de deducirlo de la prosa.

**Un vector que la respuesta deja a la vista, y se declara aquí.** Al aplicar la
política caso a caso apareció un hueco que no existía como tal antes de tener el
campo: **REQ-011, REQ-027 y REQ-065 hablan de una referencia *existente*** —un
cliente, un vehículo, un empleado— y sus casos **TC-015, TC-036 y TC-090** solo
ejercen la mitad vacía, que es la única formulable desde un desplegable. La otra
mitad —una referencia a algo que **no está**— solo se puede componer por
servicio, y hoy **no la cubre ningún caso**. No se abre pregunta: no hay nada que
preguntar, el comportamiento esperado está enunciado. Es un **vector no cubierto
declarado**, del mismo tipo que los del apartado 6.2, y los tres casos que lo
cubran nacerán `service` cuando se escriban. Queda dicho en vez de descubrirse
cuando `S-17` mire el campo y encuentre un solo caso que automatizar.

**Lo que queda vivo, y no es una pregunta abierta.** `A-06 · Refinamiento`
determinó que cuatro de los once criterios de `EVO-001` solo son alcanzables por
servicio, `AC-002` entre ellos —el que impide facturar al cliente equivocado—.
Eso **no reabre `Q-18`**: es su aplicación. Aquellos criterios van por servicio
por la razón que la política admite, no a pesar de ella, y sus casos nacerán en
la regeneración de este plan cuando A-02 haya regenerado DOC-04. Dejarlo anotado
aquí evita que dentro de tres versiones alguien reabra una pregunta contestada al
descubrir que el reparto de `verification_path` ha dejado de ser 109/1/0.

### 6.6 Bloque estructurado

```yaml open_questions
version: 1
owner: A-03
document: DOC-05-PLAN-PRUEBAS
generated_at: 2026-08-16
numbering:
  source: S-12
  command: registry.js next registro-ids.json --prefix Q --count 4
  granted: [Q-16, Q-17, Q-18, Q-19]
questions:
  - id: Q-16
    owner: A-03
    question: "¿Qué se espera que ocurra con la numeración anual de albarán y factura al cambiar de ejercicio? DOC-04 dice correlativo anual en REQ-029 y REQ-048, pero no describe el reinicio."
    status: open
    created: 2026-08-15
    blocks: REQ-029
    affects_requirements: [REQ-029, REQ-048]
    affects_cases: [TC-039, TC-068]
    unblocks_case: "Boundary sobre REQ-029 y REQ-048: el primer albarán y la primera factura del ejercicio siguiente vuelven a -0001 con el año nuevo"
    previous_id: Q-16
    renumber_note: "Conserva su número. Q-16 estaba libre en el registro, no colisionaba con nadie, y desplazarla habría hecho que Q-16 designase dos preguntas distintas en dos versiones de este documento."
  - id: Q-17
    owner: A-03
    question: "¿Cuál es el modo de redondeo cuando el tercer decimal es exactamente 5? El 21 por ciento sobre 107,50 euros da 22,575 euros. DOC-04 exige dos decimales pero no dice cómo se rompe el empate."
    status: open
    created: 2026-08-15
    blocks: REQ-051
    affects_requirements: [REQ-051, REQ-049, REQ-050]
    affects_cases: [TC-073]
    unblocks_case: "Boundary sobre REQ-051 con base 107,50 euros al 21 por ciento, que hoy no se prueba porque DS-007 elude deliberadamente el empate"
    previous_id: Q-14
    renumber_note: "Era Q-14 en DOC-05 1.1.0. Ese número pertenece a A-02 en DOC-04 1.2.0 (estado de pago de la factura); el reclamante es A-03 y renumera."
  - id: Q-18
    owner: A-03
    question: "Sin DOC-03-API.md, ¿existe alguna vía de entrada al sistema distinta de la interfaz -importación, scripts de datos, API- por la que se pudieran saltar las validaciones que aquí se prueban?"
    status: answered
    created: 2026-08-15
    answered_on: 2026-08-17
    answered_in_two_halves: true
    blocks: REQ-019
    blocks_note: "No condiciona el enunciado de REQ-019, sino la vía por la que se verifica. Se ancla ahí porque es el requisito donde DOC-24 demostró el vector."
    affects_requirements: [REQ-019, REQ-022, REQ-032, REQ-034, REQ-036]
    affects_cases: [TC-025, TC-029, TC-043, TC-047, TC-050]
    affects_scope: "los 31 casos Negative del plan. Treinta se ejecutan por interfaz; TC-041 es el unico que va por servicio, porque el tercer tipo de linea que REQ-031 prohibe no se puede formular desde la pantalla."
    resolution_factual:
      answer: "Si. La via existe, esta usada y detras no hay defensa."
      answered_by: evidencia-reproducible
      evidence: "A-14 · Explorador Ejecutor ejecuto contra localhost:3001 directamente, sin pasar por la interfaz, y lo registro en DOC-24-BUGS.json. BUG-001 y BUG-002 se reprodujeron por esa via; BUG-002 dejo el albaran 5 sobre un vehiculo de otro cliente y una factura de 114.835,05 EUR emitida al cliente equivocado. BUG-003 demuestra ademas que la validacion de importes no esta en ninguna de las dos capas: no es que la pantalla valide y el servicio no, es que no valida nadie."
      corroborated_by: "A-15 anoto la misma reproduccion como evidence en DOC-25-PROPUESTAS-FUNCIONALES.md 1.1.1"
      note: "No se cierra con un juicio sino con una reproduccion. Ver apartado 6.5(a)."
    resolution_policy:
      answer: "Un caso va por servicio SOLO cuando el vector no existe en la interfaz. No es una prueba de contrato de API: es la unica via de ejercer la regla. Si el vector existe en la pantalla, el caso es ui aunque por API tambien funcionara."
      answered_by: A-03
      scope_of_authority: "decision de metodo, no de negocio: Q-18(b) pregunta como se prueba lo que el sistema ya hace, que es lo unico que este documento tiene derecho a decidir. Q-16 y Q-17 siguen open porque preguntan que debe hacer el sistema."
      derived_from: "la practica ya existente en TC-041 desde 1.3.0, ascendida de excepcion documentada a criterio general."
      implemented_as: "campo verification_path en el contrato testcases, vocabulario cerrado ui|service|mixed, informado en los 110 casos. Ver apartado 4.12."
      not_done_and_why: "no se duplican por servicio los otros 30 casos Negative: su vector existe en la pantalla. Y no se escribe ningun caso sobre la ausencia de defensa en el servidor (BUG-003), porque daria rojo permanente contra el AS-IS, que es justo lo que Q-19 cerro que no se hace."
    resolution_effect: "Cero casos nuevos, cero casos retirados y cero pasos modificados. Los 110 siguen siendo los mismos y solo ganan un campo. Reparto: 109 ui, 1 service (TC-041), 0 mixed."
    verification_path_counts:
      ui: 109
      service: 1
      mixed: 0
    residual: "A-06 determino que cuatro de los once criterios de EVO-001 -AC-002, AC-004, AC-007 y AC-009- solo son alcanzables por servicio, incluido el que impide facturar al cliente equivocado. No reabre esta pregunta: es su aplicacion. Esos casos nacen en la regeneracion de este plan, cuando A-02 haya regenerado DOC-04, y entonces el reparto dejara de ser 109/1/0."
    unblocks_case: "Los casos de servicio de EVO-001, que S-17 automatizara: uno por cada criterio de aceptacion con verification_path servicio"
    consumed_by: "S-17 · Automatizador QA de servicio, que sin este campo no puede distinguir lo que le toca de lo que ya cubre S-10"
    previous_id: Q-15
    renumber_note: "Era Q-15 en DOC-05 1.1.0. Ese número pertenece a A-02 en DOC-04 1.2.0 (estado de pago de la nómina); el reclamante es A-03 y renumera."
  - id: Q-19
    owner: A-03
    addressed_to: A-01
    question: "Los cuatro defectos que A-14 confirmó contra la aplicación real no los detecta ningún caso de este plan, porque los casos AS-IS afirman lo que el sistema hace y los defectos son precisamente lo que el sistema hace. ¿Debe DOC-05 incorporar casos-testigo que fijen el comportamiento defectuoso de hoy, o se acepta que esos cuatro defectos no tengan cobertura hasta que el evolutivo llegue y A-02 regenere DOC-04?"
    status: answered
    created: 2026-08-16
    answered_on: 2026-08-16
    answered_by: propietario-del-proyecto
    recommendation_by: A-05
    resolution: "No se anaden casos-testigo a DOC-05, y la vigilancia de los cuatro defectos vive en DOC-23. Se acepta el argumento de A-05: un testigo que afirme que el stock queda negativo PASA mientras el sistema esta roto, y Rally transporta PASS sin matices, de modo que el testigo convertiria evidencia de defecto en evidencia de conformidad. Verde por omision es malo; verde por afirmacion es peor. Los casos correctos nacen con el evolutivo. Anadido del propietario: los casos que afirman el comportamiento correcto -y que por tanto estan en rojo mientras el defecto siga abierto- se mantienen en el proyecto de automatizacion docs/DOC-23-AUTOMATION, que no exporta a Rally; alli un rojo es informacion util y no contamina ninguna metrica de release. Ya existe uno, TC-900 en src/test/resources/features/albarans.feature, en rojo sobre BUG-001."
    resolution_immutable: true
    resolution_path_correction:
      # La `resolution` de arriba es el registro literal de una decision tomada y
      # cerrada el 2026-08-16. NO se reescribe: reescribir el texto de una decision
      # registrada la convierte en otra decision. La ruta que cita se movio DESPUES,
      # y la correccion se anota al lado, nunca dentro.
      applies_to: resolution
      quoted_path: docs/DOC-23-AUTOMATION
      current_path: automation/ui
      moved_on: 2026-08-17
      moved_by: propietario-del-proyecto
      what_changed: "solo la ubicacion del codigo. El documento sigue siendo DOC-23, el proyecto sigue siendo Selenium + Cucumber, sigue sin exportar a Rally y TC-900 sigue siendo suyo."
      what_did_not_change: "la decision. Ni su alcance, ni su motivo, ni quien la tomo, ni la fecha en que se tomo."
      also_moved: "nace automation/api/ para la coleccion Postman de S-17 (DOC-26), que no existia cuando se tomo esta decision."
      full_path_of_tc900: automation/ui/src/test/resources/features/albarans.feature
      prose: "apartado 6.4, nota de correccion de ruta"
    resolution_effect: "Ningun caso nuevo en DOC-05 y ningun caso modificado por esta respuesta. El recuento sigue en 110. Los cuatro defectos siguen sin cobertura exportable, ahora por decision registrada y no por omision."
    blocks: REQ-035
    affects_requirements: [REQ-035, REQ-040, REQ-019, REQ-043]
    affects_cases: [TC-025, TC-048, TC-049, TC-055, TC-060]
    evidence: "DOC-24-BUGS.json · BUG-001 sobre REQ-035, BUG-002 sobre REQ-040, BUG-003 sobre REQ-019, BUG-004 sobre REQ-043. Los cuatro reachable_from_ui true."
    unblocks_case: "Cuando el evolutivo se implemente, el caso correcto de cada defecto nace en DOC-05 por la via normal -evolutivo, DOC-04 regenerado, DOC-05 regenerado- y su gemelo de DOC-23 pasa a verde solo y puede migrar aqui con toda legitimidad."
    watched_in: DOC-23-AUTOMATION
    watched_in_path: automation/ui/        # ruta vigente desde 2026-08-17; ver resolution_path_correction
    watch_cases: [TC-900]
    previous_id: null
cites:
  # Preguntas de OTRO documento que este plan solo menciona. `owner` va primero a
  # propósito: el extractor de S-12 abre una entrada nueva en cada línea que
  # empieza por `- id: Q-nnn`, y una cita no reclama el número. No reordenar.
  - owner: A-02
    id: Q-01
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-028]
  - owner: A-02
    id: Q-02
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    affects_cases: [TC-048, TC-049]
  - owner: A-02
    id: Q-03
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-028]
  - owner: A-02
    id: Q-04
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-110]
  - owner: A-02
    id: Q-05
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-088]
  - owner: A-02
    id: Q-06
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    affects_cases: [TC-060, TC-061]
  - owner: A-02
    id: Q-09
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-071, TC-072]
  - owner: A-02
    id: Q-10
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    affects_cases: [TC-055]
  - owner: A-02
    id: Q-11
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-101, TC-104]
  - owner: A-02
    id: Q-12
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    affects_cases: [TC-025, TC-029, TC-047, TC-050]
  - owner: A-02
    id: Q-13
    document: DOC-04-FUNCIONAL
    status_at_read: open
    affects_cases: [TC-033, TC-037, TC-078, TC-103]
  - owner: A-02
    id: Q-14
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    affects_cases: [TC-078]
    note: "No confundir con la Q-14 que este documento usó en 1.1.0, hoy Q-17."
  - owner: A-02
    id: Q-15
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    affects_cases: [TC-103]
    note: "No confundir con la Q-15 que este documento usó en 1.1.0, hoy Q-18."
not_cited:
  # Del censo de 15 de DOC-04, estas dos no condicionan ningún caso de este plan.
  # Se declaran para que el censo cuadre y la ausencia sea decisión, no olvido.
  - owner: A-02
    id: Q-07
    document: DOC-04-FUNCIONAL
    why: "Situaciones intermedias del albarán. Este plan prueba las dos que existen, pendiente y facturado."
  - owner: A-02
    id: Q-08
    document: DOC-04-FUNCIONAL
    why: "Si el comportamiento real de idioma y tema por defecto coincide con la especificación. TC-106, TC-107 y TC-109 verifican el comportamiento observado, que es la fuente de este plan."
summary:
  own: 4
  own_open: 2          # Q-16, Q-17 — ambas de negocio; A-03 no las cierra
  own_answered: 2      # Q-19 (2026-08-16) y Q-18 (2026-08-17), ambas de metodo
  answered_in_this_revision: [Q-18]
  cited: 13
  not_cited: 2
  doc04_census: 15
  renumbered: [Q-17, Q-18]
  kept: [Q-16]
  new_in_this_revision: []
```

### 6.7 Conciliación con DOC-04 1.2.0

`S-16 · Cascada de obsolescencia` marcó este plan como obsoleto por una razón
correcta: el front-matter declaraba consumir **DOC-04 1.0.0** y DOC-04 está en
**1.2.0**. La tentación es cambiar el número y seguir. **No se ha hecho así**, por
la misma razón por la que este plan existe: una declaración de procedencia que no
se ha comprobado no vale más que no tenerla.

**Qué se ha releído.** El bloque `requirements` de DOC-04 1.2.0 entero, los 79
requisitos, contrastados con lo que dan por supuesto los 110 casos:

| Qué se comprobó | Resultado |
|---|---|
| Número de requisitos | 79, de REQ-001 a REQ-079. Ninguno nuevo, ninguno retirado, ninguno renumerado |
| `statement` de los 79 | Ninguno dice hoy algo distinto de lo que este plan probó al derivar sus casos |
| REQ-031, el único reformulado desde 1.0.0 | El enunciado de 1.2.0 es palabra por palabra el de 1.1.0, contra el que **ya** se reescribió TC-041 en 1.3.0. No queda nada por incorporar |
| REQ-055 y REQ-073 | Se mantienen tal cual, como anunció 1.1.0. TC-078 y TC-103 siguen siendo válidos |
| Campos por requisito | Los seis canónicos (`module`, `source_anchors`, `actors`, `priority`, `confidence`, `status`) en los 79. 1.2.0 no añade ningún campo por requisito del que un caso pudiera colgar |
| Los 16 requisitos de las seis preguntas respondidas | Siguen `status: active` y siguen describiendo el AS-IS. Ninguno pasa a `deprecated` ni a `superseded` |

**Qué cambió de verdad en 1.2.0 y por qué no toca ningún caso.** Seis preguntas
—Q-02, Q-06, Q-10, Q-12, Q-14 y Q-15— pasan de `open` a `answered` con
`resolution: gap_confirmed`. Las seis confirman que el comportamiento actual es un
hueco que debe cambiar; **ninguna dice que sea intencionado**, y por eso ningún
enunciado se reformula. Un caso escrito hoy sobre la decisión respondida —«el
sistema impide dejar el stock negativo»— se pondría en rojo contra la aplicación
real, que sigue dejándolo negativo. Eso ya está razonado en el **apartado 6.3** y
no cambia en esta revisión: los casos nuevos nacen con el evolutivo, en la
secuencia A-06 → DOC-08 → DOC-04 regenerado → DOC-05 regenerado.

Dos matices de 1.2.0 que sí conviene tener anotados aquí, aunque no muevan nada
hoy:

- **Q-14 y Q-15 se contestaron solo en su mitad operativa** (habrá recuento y
  filtro de pendientes), no en la mitad que este plan necesitaría: qué debe verse
  si el estado de pago acabara teniendo un tercer valor. La limitación de prueba
  de TC-078 y TC-103 —que solo pueden comprobar la premisa, no una consecuencia
  observable— **sigue en pie hasta que el evolutivo exista**, y con ella el grado
  de automatización que este plan les asigna.
- **Q-15 no responde a Q-11.** Que el taller quiera ver las nóminas pendientes no
  dice nada sobre si una nómina pagada debe poder modificarse. Q-11 sigue abierta
  y TC-101 y TC-104 siguen marcados «a revisar».

**Cómo queda declarada la procedencia.** La entrada de `inputs` declara
`version: 1.2.0` con su hash real, porque **1.2.0 es la versión con la que este
plan está conciliado**, y conserva en `derived_from_version` y
`derived_from_hash` que 109 de los 110 casos se escribieron mirando 1.0.0. Las dos
cosas son ciertas y dicen cosas distintas: la primera, que no hay nada pendiente
de incorporar; la segunda, contra qué texto se redactó cada caso. Fingir que el
plan se derivó de 1.2.0 sería más cómodo y menos honesto; declarar 1.0.0 como
entrada vigente sería afirmar que queda trabajo por hacer cuando no queda.

**Lo que esta revisión no autoriza.** Que el sello esté al día no convierte este
plan en re-derivado. Cuando llegue el evolutivo, los 110 casos se vuelven a
derivar de verdad contra el DOC-04 de entonces, y ahí sí habrá casos nuevos,
casos retirados y una versión MINOR o MAJOR. Esta es una comprobación de que nada
había quedado atrás, no un atajo para saltársela.

## Anexo · Verificación de las siete validaciones de S-07

Comprobadas una a una sobre el documento entregado, con los bloques YAML
extraídos y parseados por un analizador independiente que los reconstruye como
objetos —no con expresiones regulares—: **9 bloques, 110 casos, 241 pasos, cero
errores**. Se vuelven a pasar enteras en cada versión, también cuando la versión
no toca ningún caso: dar por bueno lo que ya pasó una vez es cómo se cuelan los
desfases que después destapa S-16.

| # | Validación | Resultado |
|---|---|---|
| 1 | IDs de caso duplicados | **PASA.** 110 `id` distintos, TC-001 a TC-110, sin repeticiones ni huecos |
| 2 | Caso sin requisito asociado | **PASA.** Los 110 casos llevan `requirement` informado; ninguno es `null` |
| 3 | Campos obligatorios vacíos | **PASA.** `id`, `external_id`, `name`, `requirement`, `priority`, `type` y `steps` informados en los 110 casos |
| 4 | Step sin `expected` | **PASA.** Los 241 pasos del documento llevan `input` y `expected`, ambos no vacíos. Siguen siendo 241: **1.5.0 no toca ningún paso** |
| 5 | Prioridad fuera del vocabulario | **PASA.** Solo `Critical` (49), `High` (31), `Medium` (28) y `Low` (2) |
| 6 | `REQ-nnn` inexistente en DOC-04 | **PASA.** Los 79 requisitos referenciados existen en `registro-ids.json` con `type: requirement` y `status: active`; no hay ninguna referencia a un REQ fuera del rango REQ-001 – REQ-079 |
| 7 | `external_id` ausente | **PASA.** Los 110 casos llevan `external_id` con formato `TALLER-<MOD>-TC-nnn`, único, y con el código de módulo coherente con el bloque en el que está |

Comprobaciones adicionales exigidas al agente:

- **Prosa y YAML coinciden en los dos sentidos.** Los 110 `TC-nnn` de las tablas
  resumen del apartado 4 y de la tabla de cobertura del apartado 3 son exactamente
  los 110 de los bloques YAML. **Un único identificador `TC-` de la prosa no está
  en ningún bloque: `TC-900`**, y es a propósito: no es un caso de este plan sino
  del proyecto de automatización de interfaz (DOC-23, hoy `automation/ui/`), se
  nombra en 6.4 al explicar el reparto y por eso vive en la serie `TC-9nn`, fuera
  del rango del plan. No lo exporta S-07.
- **Cobertura completa.** Los 79 requisitos de DOC-04 aparecen en la tabla de
  cobertura; ninguno queda como GAP PLAN.
- **`verification_path` informado en los 110 casos.** Vocabulario cerrado
  `ui | service | mixed`, sin ningún valor fuera de él y sin ningún caso sin
  declarar: **109 `ui`, 1 `service` (TC-041), 0 `mixed`**. El reparto y el criterio
  que lo decide están en 4.12, y el criterio se aplicó **caso a caso sobre los
  110**, no por defecto: los cuatro casos dudosos están nombrados ahí mismo con el
  motivo de haberse quedado en `ui`.
- **Las preguntas abiertas cumplen su propio contrato.** Van en el bloque
  `open_questions` de 6.6, con `owner` en cada entrada y con `questions`
  separado de `cites`. La tabla de 6.2 y el bloque contienen exactamente las
  mismas preguntas en los dos sentidos: 4 propias (Q-16 a Q-19) y 13 citadas de
  DOC-04, más las 2 declaradas como no citadas para que el censo de 15 cuadre.
  `unblocks_case` está informado en las cuatro propias, para que A-05 calcule lo
  que se desbloquea en lugar de leerlo en prosa. **Dos están `answered` con
  `resolution` escrita y fecha** —`Q-19` el 2026-08-16 y `Q-18` el 2026-08-17—, y
  **quedan 2 `open`**, `Q-16` y `Q-17`, que son de negocio y no las cierra A-03.
- **La respuesta de `Q-18` va en dos mitades, y cada una declara su fuente.**
  `resolution_factual` se apoya en una reproducción de A-14 contra
  `localhost:3001` registrada en `DOC-24-BUGS.json`, con `BUG-003` como prueba de
  que la validación no está en ninguna de las dos capas y con DOC-25 de A-15 como
  segundo testigo; `resolution_policy` la firma A-03 y declara su
  `scope_of_authority`, porque una decisión de método sin dueño explícito es lo
  que hace que dentro de tres versiones alguien la reabra.
- **La `resolution` de `Q-19` no se ha modificado.** La carpeta que cita —
  `docs/DOC-23-AUTOMATION`— se movió a `automation/ui/` el 2026-08-17, **después**
  de que la decisión se tomara. El texto se conserva palabra por palabra con
  `resolution_immutable: true` y la corrección se anota **al lado**, en
  `resolution_path_correction`, con `quoted_path`, `current_path`, la fecha del
  movimiento y qué cambió y qué no. En prosa, la misma nota cierra el apartado 6.4.
  Reescribir el texto de una decisión registrada la convierte en otra decisión.
- **Numeración de preguntas gobernada por S-12.** Los cuatro números los dio
  `next --prefix Q --count 4`: Q-16 a Q-19. Las de DOC-04 no se han tocado. Esta
  versión **no reclama ningún `Q-nnn` nuevo**, así que no hay colisión posible que
  resolver; la equivalencia de la renumeración histórica vive en el `-HIST.md` y,
  para máquinas, en el `previous_id` de cada entrada.
- **Los seis campos de aislamiento, automatización y vía están en los 110 casos.**
  `depends_on`, `touches`, `restores_state`, el bloque `automation` con `grade`,
  `reason` y `blocked`, y `verification_path`: **cero casos sin declarar**, y S-14
  lo confirma con `cases_without_isolation_declared: 0`. `grade` está dentro del
  vocabulario cerrado en los 110 (25 `high`, 80 `medium`, 4 `low`,
  1 `not-recommended`), `reason` está informado en los **85** que no son `high` y
  es `null` en los 25 que sí lo son, y `blocked` es `false` en los 110: **el
  usuario no ha prohibido automatizar ningún caso**.
- **Las tres reglas bloqueantes de S-14, comprobadas.** Ninguna dependencia apunta
  a un caso inexistente —las tres declaradas son TC-022, TC-030 y TC-085, y las
  tres existen—, ningún caso depende de sí mismo y **no hay ciclos**: el grafo
  tiene dos niveles y `depends_on` solo apunta de un alta a la baja que la precede.
- **Nada de lo que 1.5.0 añade cambia lo que S-07 exporta.** Los siete campos que
  Rally consume —`id`, `external_id`, `name`, `requirement`, `priority`, `type`,
  `steps`— son idénticos byte a byte a los de 1.4.1 en los 110 casos.
  `verification_path` es información para S-10, S-14 y S-17, no una columna de
  Rally: **la reimportación es un no-op**.
- **Equilibrio de prioridad verificado con S-14.** La pasada `pre` sobre este
  documento no reporta ningún aviso `desequilibrio_prioridad`: todo requisito
  `critical` de DOC-04 tiene al menos un caso `Critical` y todo requisito `high`
  tiene al menos un caso `High`.
- **S-14 vuelto a pasar en 1.5.0**, contra DOC-04 1.2.0 y el registro de hoy:
  **110 casos, cobertura 100 % (79/79), GAP PLAN 0 y cero anomalías bloqueantes**,
  y el mismo plan de ejecución de siempre —2 olas, 67 carriles, carril más largo
  de 17 casos— porque `verification_path` no interviene en el aislamiento.
  `DOC-07-MATRIZ.csv` **no cambia**: sus diez columnas —`requirement_id`,
  `requirement_statement`, `module`, `priority`, `test_case_ids`,
  `test_case_count`, `exists_in_rally`, `executed`, `result`, `diagnosis`— no
  transportan ni la vía de verificación ni el grado de automatización. La salida
  se ha escrito en el scratchpad; **este documento no escribe en `docs/`**, que
  DOC-07 es de A-05.
- **`registro-ids.json`: dos ediciones nominales y ningún ancla nueva.** Ningún
  `TC-nnn` se añade, retira, renumera ni cambia de `name`, así que no hay deriva
  de significado que aceptar y **no se ejecuta `sync --block testcases`**. Lo
  único que esta versión escribe son las dos anclas propias que lo necesitan:
  `Q-18` pasa a `status: answered` con su `resolution` en dos mitades, y `Q-19`
  gana la nota de corrección de ruta **junto** a su `resolution`, nunca dentro.
  Se hacen de forma nominal porque `sync` solo añade anclas: no actualiza el
  `status` de una existente, y darlo por hecho habría dejado el registro diciendo
  que `Q-18` sigue abierta.
- **S-16 no marca este documento.** `cascada.js` sobre `docs/` lo da al día: las
  entradas declaradas —DOC-04 1.2.0, DOC-08 2.0.0, DOC-25 1.1.1— coinciden con la
  versión real de cada fichero, con su hash comprobado hoy. Lo que sí marca es la
  **cascada hacia abajo**: **DOC-07, DOC-08 y DOC-16** declaran DOC-05 `1.4.1` y
  quedan obsoletos por el MINOR, en ese orden de regeneración. Es la consecuencia
  esperada de subir MINOR, no un defecto, y **no la arregla este documento**: cada
  uno se resella en su turno.
- **El fichero de historial declara la versión que acompaña.**
  `DOC-05-PLAN-PRUEBAS-HIST.md` lleva `doc_id: DOC-05-HIST` y `version: 1.5.0`, la
  misma que el documento que historia, para que S-16 no lo lea como artefacto sin
  versión ni lo compare consigo mismo. No lleva bloque `inputs` a propósito: la
  procedencia vive aquí y solo aquí.
- **`status: draft`.**

**Aviso a las fases posteriores.** La versión vigente es **1.5.0**, una subida
**MINOR** desde 1.4.1. Por qué esa y no otra, y qué queda obsoleto, en el
apartado siguiente. El detalle de las versiones anteriores está en
**`DOC-05-PLAN-PRUEBAS-HIST.md`**.

## Anexo · Versión 1.5.0 · qué queda obsoleto

**Por qué MINOR.** No es PATCH porque **los consumidores obtienen información que
antes no existía y que cambia lo que hacen**: `verification_path` es el campo con
el que `S-17` decide qué automatiza y con el que `S-10` sabe qué saltar, y una de
las cuatro preguntas propias pasa de `open` a `answered`. No es MAJOR porque el
cambio es **estrictamente aditivo**: los 110 casos ganan un campo y ninguno pierde
ni cambia nada. Un consumidor que solo lea los campos de 1.4.1 obtiene exactamente
el mismo documento.

| Qué | 1.4.1 | 1.5.0 |
|---|---|---|
| Casos | 110 | 110 (ninguno nuevo, retirado ni modificado) |
| Pasos | 241 | 241 |
| Prioridades | 49 C / 31 H / 28 M / 2 L | idéntico |
| Reparto por tipo | 66 F / 31 N / 9 B / 4 I | idéntico |
| Claves por caso | 15 | **16**, más `verification_path_note` en TC-041 |
| Vía de verificación | no declarada | **109 `ui` · 1 `service` · 0 `mixed`** |
| Preguntas propias | 3 `open`, 1 `answered` | **2 `open`, 2 `answered`** (`Q-18` se cierra) |
| Ruta de la automatización de interfaz | `docs/DOC-23-AUTOMATION/` | **`automation/ui/`** |
| Historial | dentro del documento | **`DOC-05-PLAN-PRUEBAS-HIST.md`** |

Qué queda obsoleto, con precisión:

- **DOC-23 / `automation/ui/`** (S-10): **sí, como entrada de decisión, no de
  contenido.** Ningún `step` ha cambiado, así que **ningún escenario generado
  queda inválido**. Lo que cambia es que S-10 puede ahora excluir por campo lo que
  no le toca —hoy solo TC-041— en vez de deducirlo de un `automation.reason`. Y
  cambia su propia ruta, que es lo primero que hay que arreglar en él.
- **DOC-26 / `automation/api/`** (S-17): **nace de aquí.** Es el consumidor para el
  que se ha adoptado el campo. Hoy tiene **un solo caso que generar**, TC-041, y
  ese número crecerá con los criterios de servicio de `EVO-001`.
- **DOC-07** (trazabilidad, A-05): **sí.** Consume el bloque de preguntas y los
  `unblocks_case`, y `Q-18` ha cambiado de estado: el alcance ③ pasa de 3
  preguntas a 2. El JOIN requisito-caso, en cambio, es idéntico y el CSV no cambia.
- **DOC-08** (`EVO-001`, A-06): **sí, y en su parte más útil.** Cita `Q-18` como
  `status: open` en `related_questions` y apoya en ello el apartado 4.2 de su
  documento. La pregunta está cerrada, y cerrada **a favor** de lo que A-06
  necesitaba: sus cuatro criterios de servicio son ahora aplicación de una política
  escrita, no una excepción por justificar.
- **DOC-16** (roadmap, A-12): **sí**, por declarar DOC-05 1.4.1 como entrada. El
  efecto real es pequeño —el roadmap no consume casos uno a uno—, pero la entrada
  hay que resellarla.
- **DOC-13** (S-06): **no queda obsoleto y no recibe encargos nuevos.** Ningún
  `DS-nnn` cambia; los tres encargos del apartado 5 siguen vivos tal cual.
- **DOC-19** (ejecución): **no.** Ningún caso ha cambiado de contenido, así que
  toda ejecución previa sigue siendo válida.
- **Rally / S-07**: **la reimportación es un no-op.** Los siete campos que S-07
  exporta son idénticos en los 110 casos.

## Anexo · Versión 1.6.0 · reclasificación de TC-045, TC-063 y TC-064

**Motivo del salto.** Al automatizar la interfaz de `S-10` sobre los casos
`critical`, tres casos se confirmaron no ejecutables como están escritos.
`DOC-07` 1.6.0 §3.11 (`A-05-11a`) ya había establecido esto para TC-064; la
generación de `FeatureFile` lo reprodujo empíricamente y encontró dos casos más
de la misma familia:

- **TC-063 y TC-064** — `FacturaForm` carga los albaranes seleccionables con
  `albaransService.listByClient(clientId, 'pendent')`, así que la pantalla
  nunca puede mostrar a la vez un albarán ya facturado (TC-063) ni albaranes de
  dos clientes distintos (TC-064).
- **TC-045** — el campo Pieza de la línea de albarán es un `<select>` poblado
  con piezas reales del catálogo; no existe ninguna manera de introducir una
  referencia inexistente («ZZZ-000») desde el formulario.

En los tres, el primer paso del caso describe una acción que la interfaz no
ofrece.

**Qué cambia.**

| Caso | 1.5.0 | 1.6.0 |
|---|---|---|
| TC-045 | `verification_path: ui` | **`verification_path: service`** |
| TC-063 | `verification_path: ui` | **`verification_path: service`** |
| TC-064 | `verification_path: ui` | **`verification_path: service`** |
| `automation.reason` de los tres | genérico (id sin id estable / lista sin id) | **la causa real**: el vector no se puede componer por interfaz |

Ningún otro campo cambia: mismo `id`, `external_id`, `requirement`, `priority`,
`steps`. No son casos nuevos ni retirados — es la vía por la que se verifican,
que pasa de `S-10` (interfaz) a `S-17` (servicio).

**Qué queda obsoleto:** `automation/ui/` no incluye TC-045, TC-063 ni TC-064 —
ninguno llegó a escribirse contra la interfaz, así que no hay nada que retirar
de ahí. `automation/api/` (S-17, DOC-26) pasa a tener estos tres casos entre
sus encargos. DOC-07 no cambia de fondo: ya reflejaba TC-064 como `A-05-11a`;
TC-045 y TC-063 son la misma familia de hallazgo y su fila de matriz no varía
(sigue habiendo un caso por requisito).
