---
doc_id: DOC-04
doc_name: DOC-04-FUNCIONAL
version: 1.3.1
status: draft
generator: A-02 documentación funcional
generator_version: "1.0"
generated_at: 2026-08-29T09:10:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: spec-SPE-06-albara-canvi-client
  commit_sha: 621ea3bb07e316abd203593a4c3be1aaf3c2c138
  working_tree_clean: false   # renumeración Q-16 -> Q-30 sin commitear todavía y ficheros ajenos sin versionar (ApuntsAgentsISkills.txt, dashboard/, promptDashboard.txt, bash.exe.stackdump); el resto del árbol versionado está limpio
inputs:
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    version: 1.2.0
    hash: sha256:e3fb11505afc6253fc801d043871fb8a749b4e618118031e4c9883cb41f79fee
    present: true
  - id: registro-ids.json
    from: S-01
    version: "1"
    hash: sha256:10a49e22b052dc50f9006d5ef533559b0f0602b3ccd35c3b53aef37dc3f7cf09
    present: true
  - id: DOC-03-API.md
    from: S-03
    present: false
  - id: contexto-confluence
    from: I-02
    present: false
  - id: respuestas-de-negocio
    from: humano
    present: true
    received_on: 2026-08-16
---

# DOC-04 · Documentación funcional — app-taller

> Qué debe cumplir la aplicación, en lenguaje de negocio. Cada requisito nace de
> un ancla `UC-nnn` o `BR-nnn` de `DOC-01-BASE-ASIS.md`, que es su única fuente.
> Este documento no describe cómo está construido el sistema ni cómo se prueba.
>
> **Este documento no lleva historial de cambios.** Refleja solo el estado
> actual, con su `version` en el front-matter. El historial está en
> **`docs/DOC-04-FUNCIONAL-HIST.md`**.
>
> `status: draft`. 81 requisitos activos, ninguno deprecado.

## Procedencia

Este apartado explica de dónde sale el documento y cómo se ha usado cada entrada.
El dato en crudo —versión y hash de cada fuente— está en el bloque `inputs` del
front-matter, que es lo que lee `S-16 · Cascada de obsolescencia`.

**Motivo de la versión 1.3.1 (PATCH).** Renumeración de la pregunta abierta
`Q-16` a `Q-30` por colisión de identificador con la `Q-16` de `DOC-05`, que es
anterior. Regla de gobierno de identificadores: ante colisión cede el
reclamante, y el reclamante es A-02. No cambia ningún requisito ni el sentido de
ninguna pregunta; el bloque `requirements` es idéntico al de 1.3.0. Detalle en
el epígrafe «Sobre `Q-30`» del apartado 6.1 y en `DOC-04-FUNCIONAL-HIST.md`.
`DOC-05`, `DOC-06` y `DOC-07` no quedan obsoletos por este cambio. El resto de
este apartado describe el ciclo 1.3.0, que sigue vigente.

**Motivo del ciclo 1.3.0.** `DOC-01-BASE-ASIS.md` ha pasado de **1.1.0** a
**1.2.0** (MINOR). Ese cambio sí toca negocio, a diferencia del ciclo anterior:

- **Regla nueva `BR-ALB-10`** en el módulo `albarans`: al modificar la cabecera
  de un albarán no facturado, su vehículo no puede sustituirse por otro que
  pertenezca a un cliente distinto del actual. El intento se rechaza sin guardar
  ningún cambio de la cabecera, y el selector del formulario de edición solo
  ofrece los vehículos del cliente actual del albarán.
- **`UC-ALB-06 · Modificar la cabecera de un albarán`** gana un flujo detallado
  y una coletilla en su fila («el vehículo solo puede sustituirse por otro del
  mismo cliente»). La misma ancla, el mismo nombre: no se renumera.
- **Pregunta nueva `Q-08` en DOC-01**: `BR-ALB-10` cierra el cambio de cliente
  por la puerta del albarán, pero cambiar el propietario de un vehículo
  (`UC-VEH-04`) sigue arrastrando sus albaranes pendientes al cliente nuevo.
  Recoge `PD-002` de `specs/implemented/SPE-06-albara-canvi-client.md`.
- **La antigua `Q-10` de DOC-01 deja de ser pregunta abierta**: el negocio la
  contestó el 2026-08-16 y la decisión ya está implementada como `BR-ALB-10`
  (SPEC 06, `status: Implemented`).

**Consecuencia sobre los requisitos.** Se añaden **dos** requisitos nuevos
—`REQ-080` y `REQ-081`, ambos del módulo `albarans` y con ancla de origen
`BR-ALB-10`/`UC-ALB-06`— y **ninguno de los 79 anteriores se reformula, se
elimina ni cambia de prioridad, confianza o ancla**. `REQ-040` (permite modificar
la cabecera de un albarán no facturado) se conserva tal cual: sigue siendo cierto
que la cabecera se puede modificar; lo que `BR-ALB-10` acota —que el vehículo
nuevo debe ser del mismo cliente— se enuncia como requisito propio, igual que
`UC-CLI-05` tiene un `REQ` para la acción de borrar y otros dos para las
condiciones que la impiden. En el bloque `open_questions`, la pregunta `Q-10`
—que hasta ahora describía un hueco pendiente de evolutivo— pasa a `implementada`
y deja de contar como evolutivo pendiente; se añade `Q-30` (renumerada desde
`Q-16` por colisión con la `Q-16` de DOC-05, ver 6.1), heredada de la `Q-08`
nueva de DOC-01.

**Por qué MINOR y no PATCH.** El bloque `requirements` gana dos entradas nuevas.
La regla de regeneración manda subir MINOR cuando hay requisitos añadidos.
**Al subir MINOR, `DOC-05` (plan de pruebas), `DOC-06` (manual de usuario) y
`DOC-07` (trazabilidad y cobertura) quedan desfasados** respecto a este bloque y
deben revisarse por sus propietarios (A-03, A-04, A-05). Nota: `DOC-05` ya
incorporó casos para el comportamiento de SPEC 06 en su versión 1.7.0; lo que
falta es que esos casos queden colgados de `REQ-080` y `REQ-081` en vez de solo
de las anclas.

**Qué se ha leído de cada entrada.**

- **`DOC-01-BASE-ASIS.md` 1.2.0** — apartados 1 a 5 (propósito, actores, casos de
  uso con sus flujos detallados, reglas de negocio, glosario), el apartado 8
  (preguntas abiertas) y el bloque `inventory` del apartado 9, que es la semilla
  de todos los `REQ-nnn`. **No se ha leído el apartado 6** (árbol comentado)
  **ni `DOC-02-TECNICA.md`**: la documentación funcional se escribe desde la
  verdad de negocio, no desde la implementación.
- **`registro-ids.json`** — se han leído las 79 anclas `REQ-001` a `REQ-079` ya
  registradas por A-02 y la entrada `BR-ALB-10` que S-01 registró en este mismo
  ciclo. Se han **añadido** `REQ-080` y `REQ-081` con su `text`, `module`,
  `source_anchors`, `created: 2026-08-28` y `status: active`. No se ha deprecado
  ninguna entrada existente. En 1.3.1 se añade además `Q-30` vía
  `s12-registro-ids` (`sync --block questions`); la `Q-16` del registro
  —propiedad de `DOC-05`— no se toca.
- **`DOC-03-API.md`** — no existe en este proyecto (no hay `S-03`). Declarado
  `present: false`.
- **Contexto de Confluence (`I-02`)** — `DOC-18-CONFLUENCE-SYNC.json` no existe.
  Declarado `present: false`.
- **Respuestas de negocio** — el lote de seis respuestas del 2026-08-16. No hay
  respuestas nuevas en este ciclo. Se declara sin `version` porque no es un
  documento versionado sino un registro puntual de decisión, ya incorporado al
  apartado 6.

## 1. Propósito funcional del sistema

**app-taller** es la aplicación con la que un taller mecánico lleva su trabajo
diario. El taller registra a sus **clientes** y los **vehículos** de cada uno.
Cada vez que un vehículo entra al taller se abre un **albarán**, que es la hoja
de trabajo de esa intervención: en él se anotan las piezas que se consumen del
catálogo del taller y las horas de mano de obra dedicadas. Cuando el trabajo está
hecho, uno o varios albaranes pendientes de un mismo cliente se agrupan en una
**factura**, que calcula la base, aplica el IVA y da un total, y que se marca como
pagada cuando el cliente paga. Ese encadenamiento —cliente, vehículo, albarán,
factura— es el ciclo central del negocio y explica la mayor parte de las reglas de
este documento.

Alrededor de ese ciclo la aplicación mantiene dos registros que lo apoyan pero
que no dependen de él: el **catálogo de piezas con su stock**, que baja al
consumir una pieza en un albarán y sube al retirar esa anotación, y el
**personal del taller con sus nóminas mensuales**, donde se registra el salario
bruto y las deducciones de cada empleado mes a mes y se muestra el salario neto
resultante. La aplicación es de uso local y de un solo puesto, funciona en catalán
y en castellano, y no distingue usuarios ni permisos: quien la abre puede hacer
todo. Esa ausencia de identificación es una decisión de negocio documentada, no
una carencia, y significa que en este documento no hay ningún requisito de
acceso, rol ni autorización.

## 2. Actores

Heredados de DOC-01. El sistema tiene un único actor porque no distingue usuarios
ni permisos.

| Ancla | Actor | Tipo | Qué hace en el sistema |
|---|---|---|---|
| ACT-01 | Personal del taller | Humano | Único usuario. Gestiona clientes, vehículos, piezas, albaranes, facturas, personal y nóminas sin restricción de permisos. |

Todos los requisitos de este documento tienen a `ACT-01` como actor. Si en el
futuro se añadiera identificación de usuarios, cambiaría la premisa de los 81
requisitos, no solo de algunos.

## 3. Requisitos por módulo

Un apartado por módulo de DOC-01. Aquí solo hay **prosa que comenta**: el censo de
los cinco campos de cada requisito (enunciado, módulo, anclas, prioridad,
confianza) está en el bloque `requirements` del apartado 7 y no se repite.

La **prioridad** es de negocio —qué daño hace al taller que ese requisito no se
cumpla—, no de riesgo de prueba: la prioridad de test la decide A-03 en DOC-05.
La **confianza** es la que DOC-01 declara para las anclas de origen; solo baja
cuando la fuente del ancla no es el comportamiento observado del sistema.

### 3.1 Clientes — `clients`

Gestión de los clientes del taller y de su relación con vehículos y facturas.
**Ocho requisitos** (`REQ-001` a `REQ-008`): el listado con búsqueda y
paginación, el alta, la ficha, la modificación y la baja. La baja se abre en tres
requisitos —la acción (`REQ-006`) y las dos condiciones que la impiden: tener
vehículos (`REQ-007`) o facturas (`REQ-008`)— para que ninguna de las dos
condiciones se quede después sin prueba. El nombre obligatorio (`REQ-003`) cubre
a la vez el alta y la modificación, porque `BR-CLI-01` aplica en los dos.

### 3.2 Vehículos — `vehicles`

Gestión de los vehículos de cada cliente, identificados por su matrícula.
**Nueve requisitos** (`REQ-009` a `REQ-017`). Todo vehículo pertenece a un cliente
que ya existe (`REQ-011`) y su matrícula es única en todo el sistema
(`REQ-013`). La baja se impide si tiene albaranes asociados (`REQ-017`). La
modificación de un vehículo (`REQ-015`) incluye poder cambiar su cliente
propietario; ese cambio está señalado por `Q-30` (ver apartado 6), porque es la
otra vía —además de la cabecera del albarán— por la que el trabajo de un albarán
pendiente puede acabar cargándose a otro cliente.

### 3.3 Piezas — `peces`

Catálogo de piezas del taller, con su precio y su stock. **Siete requisitos**
(`REQ-018` a `REQ-024`). `REQ-021` (la ficha muestra referencia, precio, coste,
unidad, proveedor y stock) tiene confianza `medium` porque dos de esos campos
—`coste` y `unidad`— no intervienen en ningún cálculo ni validación y su sentido
está en duda (`Q-01` y `Q-03`). La baja de una pieza se impide si se ha usado en
algún albarán (`REQ-024`). El alta con stock inicial (`REQ-019`) está señalada
por `Q-02` y `Q-12`: el negocio ya decidió que el stock y los importes no pueden
ser negativos, pero eso todavía no está construido.

### 3.4 Albaranes — `albarans`

Hoja de trabajo de cada intervención, con sus líneas de pieza y de mano de obra.
**Veinte requisitos** (`REQ-025` a `REQ-042`, más `REQ-080` y `REQ-081`), el
módulo con más reglas del documento.

- **Apertura y numeración.** Un albarán se abre para un vehículo existente
  (`REQ-027`), nace sin líneas y en situación de pendiente de facturar
  (`REQ-026`, `REQ-028`), y recibe un número correlativo anual automático
  (`REQ-029`).
- **Líneas.** Solo hay líneas de pieza o de mano de obra (`REQ-031`); la cantidad
  debe ser mayor que cero (`REQ-032`); una línea de pieza exige una pieza del
  catálogo (`REQ-033`) y, si no se informa precio, se toma el de catálogo
  (`REQ-034`); una línea de mano de obra exige descripción (`REQ-037`). Añadir
  una línea de pieza descuenta el stock en la misma operación (`REQ-035`) y
  retirarla lo devuelve (`REQ-039`): son operaciones dobles que, para el negocio,
  o pasan enteras o no pasan.
- **Cabecera y borrado.** Se puede modificar el vehículo, la fecha y las notas de
  un albarán no facturado (`REQ-040`) y borrarlo entero con sus líneas
  (`REQ-041`). Un albarán ya facturado queda bloqueado para cualquier cambio
  (`REQ-042`).
- **Cambio de cliente por la cabecera — `REQ-080` y `REQ-081`, nuevos en 1.3.0.**
  `REQ-080` prohíbe sustituir el vehículo de un albarán no facturado por uno de
  otro cliente: el intento se rechaza por completo, sin guardar ni el vehículo,
  ni la fecha, ni las notas. Es `critical` porque el hueco que cierra provocó una
  factura real emitida al cliente equivocado (`DOC-24/BUG-002`, importe superior a
  114 000 €). `REQ-081` dice que el selector de vehículo del formulario de edición
  solo ofrece los vehículos del cliente actual del albarán; es `high` y actúa como
  barrera previa, no como la garantía —esa es `REQ-080`—. Se enuncian por
  separado a propósito: `BR-ALB-10` agrupa las dos cosas, pero son dos
  comportamientos comprobables de forma independiente (uno en el servidor, otro
  en la pantalla) y, como advierte SPEC 06, este mismo patrón —regla duplicada en
  pantalla y en servidor— ya divergió una vez en el proyecto sin que nada fallara
  (`REQ-046` / `TC-064`). Tenerlos separados hace que esa divergencia se detecte.
- Sobre un albarán ya facturado, cualquier intento de cambiar el vehículo se
  rechaza por estar facturado (`REQ-042`), no por el motivo de `REQ-080`.

### 3.5 Facturas — `factures`

Emisión de facturas agrupando albaranes, con base, IVA y total, y seguimiento del
cobro. **Trece requisitos** (`REQ-043` a `REQ-055`). Una factura agrupa al menos
un albarán (`REQ-044`), todos pendientes de facturar (`REQ-045`) y todos del
mismo cliente (`REQ-046`). Emitirla marca sus albaranes como facturados en la
misma operación (`REQ-047`). La base es la suma de cantidad por precio de las
líneas de sus albaranes y el total es base más IVA (`REQ-049`); el IVA por
defecto es el 21 % (`REQ-050`) y no hay regla que acote qué otros tipos son
admisibles (`Q-09`). `REQ-055` (el estado de pago solo puede ser pendiente o
pagada) se queda a propósito en el vocabulario admisible: DOC-01 no documenta
ninguna consecuencia observable de que ese estado tome un tercer valor, así que
enunciar aquí qué se vería sería inventar comportamiento. El negocio ya pidió
recuento y filtro de facturas pendientes de cobro (`Q-14`), pero es un evolutivo
pendiente; hasta que exista, `REQ-055` describe el sistema actual y su
comprobación sigue limitada. `REQ-052` y `REQ-055` están además señalados por
`Q-13` (el término «estado» es ambiguo).

### 3.6 Personal — `personal`

Registro de los empleados del taller. **Siete requisitos** (`REQ-056` a
`REQ-062`): listado, alta, ficha, modificación y baja. El nombre es obligatorio
en alta y modificación (`REQ-058`). La baja se impide si el empleado tiene
nóminas asociadas (`REQ-062`).

### 3.7 Nóminas — `nomines`

Nóminas mensuales por empleado, con el salario neto calculado. **Doce requisitos**
(`REQ-063` a `REQ-074`). Cada nómina pertenece a un empleado existente
(`REQ-065`), exige empleado, mes y año (`REQ-066`), el mes entre 1 y 12
(`REQ-067`), y no puede haber dos del mismo empleado para el mismo mes y año
(`REQ-068`). El salario neto es bruto menos deducciones, redondeado a dos
decimales, y se calcula en cada consulta sin almacenarse (`REQ-070`). `REQ-073`
(el estado de pago solo puede ser pendiente o pagada) se queda en el vocabulario
admisible por el mismo motivo que `REQ-055`, y aquí el caso es más claro: una
nómina pagada se puede modificar y borrar igual que una pendiente (`REQ-071`,
`REQ-074`, `Q-11`), así que el estado de pago no condiciona nada. El negocio pidió
recuento y filtro de nóminas pendientes (`Q-15`), pendiente de evolutivo.

### 3.8 Marco de la aplicación — `shell`

Idioma y tema de la interfaz, presentes en todas las pantallas. **Cuatro
requisitos** (`REQ-075` a `REQ-078`). El usuario cambia idioma (catalán o
castellano) y tema (claro u oscuro) en cualquier momento sin perder el trabajo en
curso. `REQ-076` y `REQ-078` tienen confianza `medium`: son las dos únicas reglas
de DOC-01 (`BR-SHL-01`, `BR-SHL-02`) que proceden de una especificación y no del
comportamiento observado, lo que abre `Q-08`.

### 3.9 Configuración — `configuracio`

Sección prevista en el menú y todavía sin desarrollar. **Un requisito**
(`REQ-079`): la sección informa al usuario de que el módulo está pendiente de
desarrollo. Ese comportamiento es real y verificable; lo que falta —qué debe
contener el módulo— es `Q-04`.

## 4. Reglas transversales

No hay ningún requisito huérfano de módulo: todos tienen un módulo propietario. Sí
hay requisitos cuyo cumplimiento **cruza la frontera de su módulo**, porque su
efecto se observa en otro. Se listan aquí para que quien cambie uno de los dos
módulos implicados sepa que el otro le afecta.

| REQ | Módulo propietario | Módulos que también quedan afectados | Naturaleza del cruce |
|---|---|---|---|
| REQ-007 | clients | vehicles | La existencia de vehículos condiciona la baja del cliente |
| REQ-008 | clients | factures | La existencia de facturas condiciona la baja del cliente |
| REQ-017 | vehicles | albarans | La existencia de albaranes condiciona la baja del vehículo |
| REQ-024 | peces | albarans | El consumo previo en un albarán condiciona la baja de la pieza |
| REQ-033 | albarans | peces | La línea de pieza exige una pieza del catálogo |
| REQ-034 | albarans | peces | El precio de la línea se hereda del catálogo de piezas |
| REQ-035 | albarans | peces | Anotar el consumo mueve el stock del catálogo |
| REQ-039 | albarans | peces | Retirar la anotación devuelve el stock al catálogo |
| REQ-042 | albarans | factures | Es la facturación lo que bloquea el albarán |
| REQ-046 | factures | clients, albarans | La factura no puede mezclar albaranes de clientes distintos |
| REQ-047 | factures | albarans | Emitir la factura cambia la situación de los albaranes |
| REQ-049 | factures | albarans | El importe de la factura se obtiene de las líneas de sus albaranes |
| REQ-080 | albarans | clients, vehicles | Cambiar el vehículo de un albarán no puede cambiar el cliente al que se factura |
| REQ-081 | albarans | clients, vehicles | El selector de vehículo se acota al cliente actual del albarán |
| REQ-062 | personal | nomines | La existencia de nóminas condiciona la baja del empleado |
| REQ-075 a REQ-078 | shell | todos | Idioma y tema afectan a todas las pantallas de la aplicación |

Dos comportamientos transversales merecen una nota adicional:

- **Integridad de las operaciones dobles.** `REQ-035`, `REQ-039`, `REQ-047` y
  `REQ-080` exigen que dos efectos ocurran —o no ocurran— juntos: registrar la
  línea y mover el stock; emitir la factura y marcar sus albaranes; y, en
  `REQ-080`, o se guarda toda la cabecera válida o no se guarda ni el vehículo, ni
  la fecha, ni las notas. Para el negocio, la mitad de esas operaciones no es un
  resultado aceptable.
- **Ausencia de requisitos de acceso.** El sistema no identifica a quien lo usa
  (DOC-01, apartado 2). No se emite ningún requisito de autenticación,
  autorización ni traza de quién hizo qué, porque ninguna ancla de DOC-01 lo
  sostiene. Si el negocio lo espera, es un hueco de DOC-01 y no un requisito que
  A-02 pueda inventar.

## 5. Trazabilidad de anclas

Las **78 anclas** `UC-nnn` (40) y `BR-nnn` (38) de DOC-01 1.2.0 y los requisitos
que han generado.

| Ancla | Enunciado en DOC-01 | Requisitos derivados |
|---|---|---|
| UC-CLI-01 | Consultar el listado de clientes | REQ-001 |
| UC-CLI-02 | Dar de alta un cliente | REQ-002, REQ-003 |
| UC-CLI-03 | Consultar la ficha de un cliente | REQ-004 |
| UC-CLI-04 | Modificar un cliente | REQ-003, REQ-005 |
| UC-CLI-05 | Borrar un cliente | REQ-006, REQ-007, REQ-008 |
| UC-VEH-01 | Consultar el listado de vehículos | REQ-009 |
| UC-VEH-02 | Dar de alta un vehículo de un cliente | REQ-010, REQ-011 |
| UC-VEH-03 | Consultar la ficha de un vehículo | REQ-014 |
| UC-VEH-04 | Modificar un vehículo | REQ-015 |
| UC-VEH-05 | Borrar un vehículo | REQ-016, REQ-017 |
| UC-PEC-01 | Consultar el catálogo de piezas | REQ-018 |
| UC-PEC-02 | Dar de alta una pieza | REQ-019 |
| UC-PEC-03 | Consultar la ficha de una pieza | REQ-021 |
| UC-PEC-04 | Modificar una pieza | REQ-022 |
| UC-PEC-05 | Borrar una pieza | REQ-023, REQ-024 |
| UC-ALB-01 | Consultar el listado de albaranes | REQ-025 |
| UC-ALB-02 | Abrir un albarán para un vehículo | REQ-026, REQ-027, REQ-028 |
| UC-ALB-03 | Añadir una línea de pieza | REQ-030, REQ-034, REQ-035 |
| UC-ALB-04 | Añadir una línea de mano de obra | REQ-036, REQ-037 |
| UC-ALB-05 | Retirar una línea | REQ-038, REQ-039 |
| UC-ALB-06 | Modificar la cabecera de un albarán | REQ-040, REQ-042, REQ-080, REQ-081 |
| UC-ALB-07 | Borrar un albarán | REQ-041, REQ-042 |
| UC-FAC-01 | Emitir una factura agrupando albaranes | REQ-043, REQ-044, REQ-045, REQ-046, REQ-047, REQ-050 |
| UC-FAC-02 | Consultar el listado de facturas | REQ-052 |
| UC-FAC-03 | Consultar el detalle de una factura | REQ-053 |
| UC-FAC-04 | Marcar una factura como pagada o pendiente | REQ-054 |
| UC-PER-01 | Consultar el listado de empleados | REQ-056 |
| UC-PER-02 | Dar de alta un empleado | REQ-057 |
| UC-PER-03 | Consultar la ficha de un empleado | REQ-059 |
| UC-PER-04 | Modificar un empleado | REQ-060 |
| UC-PER-05 | Borrar un empleado | REQ-061, REQ-062 |
| UC-NOM-01 | Consultar el listado de nóminas | REQ-063 |
| UC-NOM-02 | Registrar la nómina de un empleado | REQ-064, REQ-065, REQ-068 |
| UC-NOM-03 | Consultar el detalle de una nómina | REQ-069, REQ-070 |
| UC-NOM-04 | Modificar una nómina | REQ-071 |
| UC-NOM-05 | Marcar una nómina como pagada o pendiente | REQ-072 |
| UC-NOM-06 | Borrar una nómina | REQ-074 |
| UC-SHL-01 | Cambiar el idioma de la interfaz | REQ-075, REQ-076 |
| UC-SHL-02 | Cambiar el tema claro/oscuro | REQ-077, REQ-078 |
| UC-SHL-03 | Acceder a Configuración | REQ-079 |
| BR-CLI-01 | El nombre del cliente es obligatorio | REQ-003 |
| BR-CLI-02 | No se puede borrar un cliente que tenga vehículos asociados | REQ-007 |
| BR-CLI-03 | No se puede borrar un cliente que tenga facturas asociadas | REQ-008 |
| BR-VEH-01 | Un vehículo pertenece siempre a un cliente existente | REQ-011 |
| BR-VEH-02 | Marca, modelo y matrícula son obligatorios | REQ-012 |
| BR-VEH-03 | La matrícula es única en todo el sistema | REQ-013 |
| BR-VEH-04 | No se puede borrar un vehículo que tenga albaranes asociados | REQ-017 |
| BR-PEC-01 | El nombre de la pieza es obligatorio | REQ-020 |
| BR-PEC-02 | No se puede borrar una pieza usada en algún albarán | REQ-024 |
| BR-ALB-01 | Un albarán pertenece siempre a un vehículo existente | REQ-027 |
| BR-ALB-02 | Un albarán nace en estado pendiente | REQ-028 |
| BR-ALB-03 | Un albarán facturado no se puede modificar ni borrar, ni tocar sus líneas | REQ-042 |
| BR-ALB-04 | Una línea es de pieza o de mano de obra, sin más opciones | REQ-031 |
| BR-ALB-05 | La cantidad de una línea debe ser mayor que cero | REQ-032 |
| BR-ALB-06 | Una línea de pieza exige una pieza existente; si no se informa precio, se toma el de catálogo | REQ-033, REQ-034 |
| BR-ALB-07 | Una línea de mano de obra exige descripción | REQ-037 |
| BR-ALB-08 | Añadir una línea de pieza descuenta el stock; retirarla lo devuelve | REQ-035, REQ-039 |
| BR-ALB-09 | El número de albarán se genera solo, con formato año/A-nnnn | REQ-029 |
| BR-ALB-10 | Al modificar la cabecera de un albarán no facturado no se puede sustituir su vehículo por otro de un cliente distinto; el intento se rechaza sin guardar la cabecera, y el selector solo ofrece los vehículos del cliente actual | REQ-080, REQ-081 |
| BR-FAC-01 | Una factura agrupa al menos un albarán | REQ-044 |
| BR-FAC-02 | Todos los albaranes de una factura deben estar pendientes de facturar | REQ-045 |
| BR-FAC-03 | Todos los albaranes de una factura deben ser del mismo cliente | REQ-046 |
| BR-FAC-04 | Al facturar, los albaranes pasan a estado facturado y quedan enlazados a la factura | REQ-047 |
| BR-FAC-05 | La base es la suma de cantidad por precio de todas las líneas de sus albaranes; el total es base más IVA | REQ-049 |
| BR-FAC-06 | El IVA por defecto es el 21 por ciento | REQ-050 |
| BR-FAC-07 | Base, IVA y total se presentan redondeados a dos decimales | REQ-051 |
| BR-FAC-08 | El estado de pago solo puede ser pendiente o pagada | REQ-055 |
| BR-FAC-09 | El número de factura se genera solo, con formato año/F-nnnn | REQ-048 |
| BR-PER-01 | El nombre del empleado es obligatorio | REQ-058 |
| BR-PER-02 | No se puede borrar un empleado que tenga nóminas asociadas | REQ-062 |
| BR-NOM-01 | Una nómina pertenece a un empleado existente | REQ-065 |
| BR-NOM-02 | Empleado, mes y año son obligatorios | REQ-066 |
| BR-NOM-03 | El mes debe estar entre 1 y 12 | REQ-067 |
| BR-NOM-04 | Solo puede existir una nómina por empleado, mes y año | REQ-068 |
| BR-NOM-05 | El salario neto es el bruto menos las deducciones, redondeado a dos decimales, y se calcula sin almacenarse | REQ-070 |
| BR-NOM-06 | El estado de pago solo puede ser pendiente o pagada | REQ-073 |
| BR-SHL-01 | El idioma por defecto es el castellano y la elección del usuario se recuerda entre sesiones | REQ-076 |
| BR-SHL-02 | El tema por defecto sigue la preferencia del sistema operativo y la elección del usuario se recuerda | REQ-078 |

**Anclas sin requisito derivado: ninguna.** Las 40 anclas `UC-nnn` y las 38
`BR-nnn` de DOC-01 1.2.0 han producido al menos un requisito. La cobertura total
se explica igual que en versiones anteriores: DOC-01 documenta un sistema **ya
construido**, así que ninguna ancla se queda fuera por «no aplicable». La única
ancla discutible sigue siendo `UC-SHL-03` (módulo no desarrollado), para la que
se emite `REQ-079` porque el comportamiento actual —avisar de que la sección está
pendiente— es real y verificable. Cobertura total **no significa sistema
completo**: los huecos detectados aparecen en el apartado 6 como preguntas, no
como requisitos, porque A-02 no inventa requisitos.

`BR-ALB-10` genera **dos** requisitos porque agrupa dos comportamientos —el
rechazo en servidor y el filtrado del selector— que conviene poder probar por
separado.

## 6. Preguntas abiertas y respuestas del negocio

Este documento arrastra **dieciséis preguntas** en total: ocho heredadas de
DOC-01 y ocho nacidas en A-02. El 2026-08-16 el negocio contestó a **seis**.
Ninguna pregunta se borra nunca de este apartado: cambia de estado y conserva su
ID.

**Nota de numeración.** La serie `Q-nnn` es un contador de proyecto que
comparten DOC-04 y DOC-05 a través de `registro-ids.json`, y **no** coincide con
la numeración de preguntas de DOC-01. Por eso los IDs de este documento no son
contiguos: `Q-16` a `Q-29` pertenecen a DOC-05. La `Q-08` de este documento
(idioma y tema por defecto) es nativa de A-02 y **no** tiene relación con la
`Q-08` de DOC-01 1.2.0 (cambio de propietario de vehículo), que aquí se recoge
como `Q-30` (renumerada desde `Q-16` por colisión con la `Q-16` de DOC-05; ver
6.1).

**Los tres estados posibles:**

| Estado | Qué significa | ¿Cuenta como pregunta abierta? | ¿Genera evolutivo? |
|---|---|---|---|
| `open` | El negocio todavía no ha contestado. | Sí | Se desconoce |
| `answered` + `resolution: gap_confirmed`, evolutivo pendiente | El negocio confirma que el comportamiento actual es un hueco y debe cambiar; el cambio aún no está construido. | No | Sí, pendiente |
| `answered` + `resolution: gap_confirmed`, evolutivo **implementado** | El negocio lo confirmó como hueco y el cambio **ya está en el sistema**. | No | Ya entregado |

Hoy no hay ninguna pregunta `as_designed`. De las seis respondidas, **cinco
siguen pendientes de evolutivo** y **una (`Q-10`) ya está implementada** —como
`BR-ALB-10`, `REQ-080` y `REQ-081`, entregada por SPEC 06—.

### 6.1 Preguntas abiertas — 10

Siguen sin respuesta del negocio y cuentan para el Go/No-Go.

| ID | Pregunta | Origen | Requisitos afectados |
|---|---|---|---|
| Q-01 | La pieza guarda un coste además del precio, pero el coste no interviene en ningún cálculo del taller. ¿Es un margen previsto o un dato solo informativo? | Heredada de DOC-01/Q-01 | REQ-021, REQ-049 |
| Q-03 | La unidad de medida de la pieza no interviene en ningún cálculo ni validación. ¿Qué uso se le quiere dar? | Heredada de DOC-01/Q-03 | REQ-021, REQ-018 |
| Q-04 | La sección de Configuración aparece en el menú pero no está desarrollada y ninguna especificación describe su contenido. ¿Qué debe contener? | Heredada de DOC-01/Q-04 | REQ-079 |
| Q-05 | El empleado guarda fecha de alta y salario base, pero la nómina no los usa: el bruto se teclea a mano cada mes. ¿Se espera que el salario base proponga el bruto? | Heredada de DOC-01/Q-05 | REQ-064, REQ-069 |
| Q-07 | Los albaranes no tienen ninguna situación intermedia entre pendiente y facturado. ¿El taller trabaja así o falta reflejar un paso real del trabajo? | Heredada de DOC-01/Q-07 | REQ-028, REQ-025 |
| Q-08 | El idioma y el tema por defecto son las dos únicas reglas de DOC-01 que proceden de una especificación y no del comportamiento observado. ¿El comportamiento real coincide con lo que describe la especificación? | Nueva (A-02) | REQ-076, REQ-078 |
| Q-09 | El tipo de IVA de una factura se puede indicar al emitirla y solo el valor por defecto está fijado. Ninguna regla acota qué tipos son admisibles. ¿Qué tipos puede aplicar el taller y quién los autoriza? | Nueva (A-02) | REQ-050, REQ-049 |
| Q-11 | Una nómina se puede modificar y borrar sin restricción, incluso después de marcarla como pagada, a diferencia del albarán facturado, que queda bloqueado. ¿Debe bloquearse la nómina pagada? | Nueva (A-02) | REQ-071, REQ-074 |
| Q-13 | El término «estado» designa a la vez la situación del albarán (pendiente o facturado) y la situación de cobro de facturas y nóminas (pendiente o pagada). El glosario lo marca como ambiguo. ¿Con qué nombres deben aparecer ambos conceptos en la interfaz y en los filtros? | Nueva (A-02) | REQ-025, REQ-052, REQ-055, REQ-073 |
| Q-30 | `BR-ALB-10` impide mover un albarán a otro cliente por la puerta de la cabecera del albarán, pero cambiar el cliente propietario de un vehículo que tiene albaranes pendientes sigue arrastrando ese trabajo al cliente nuevo. ¿Debe impedirse también, avisarse, o permitirse dejar el trabajo ya hecho con el propietario anterior? | Heredada de DOC-01/Q-08 (recoge `PD-002` de SPE-06) | REQ-015, REQ-080 |

Estas diez preguntas afectan a **18 requisitos**: REQ-015, REQ-018, REQ-021,
REQ-025, REQ-028, REQ-049, REQ-050, REQ-052, REQ-055, REQ-064, REQ-069, REQ-071,
REQ-073, REQ-074, REQ-076, REQ-078, REQ-079 y REQ-080.

**Sobre `Q-30`.** Esta pregunta se emitió en DOC-04 1.3.0 con el `id: Q-16`, pero
ese número ya estaba ocupado por una pregunta anterior de DOC-05 (creada el
2026-08-16, sobre la numeración anual de albarán y factura al cambiar de
ejercicio). Por la regla de gobierno de identificadores —ante colisión, cede el
reclamante, y el reclamante aquí es A-02 por ser su `Q-16` posterior— se renumera
a `Q-30`, el siguiente `Q-nnn` libre del registro. Solo cambia el número: el
texto, las anclas, `blocks`, `affects_requirements` y el `inherited_from` se
conservan.

En cuanto al fondo: es la continuación natural de `Q-10`, ya resuelta. `Q-10`
preguntaba por el cambio de cliente a través de la cabecera del albarán; el
negocio decidió impedirlo y ya está implementado (`REQ-080`). `Q-30` pregunta por
**la misma fuga por la otra puerta**: `REQ-015` permite cambiar el cliente
propietario de un vehículo sin ninguna comprobación sobre los albaranes
pendientes de ese vehículo. Mientras `Q-30` esté abierta, «un albarán ya no puede
cambiar de cliente» es cierto solo por la puerta del albarán, no por la del
vehículo. A-02 no reformula `REQ-015` ni emite un requisito nuevo: el sentido del
cambio lo tiene que fijar el negocio.

### 6.2 Preguntas respondidas — 6

El negocio contestó las seis el **2026-08-16**, todas en el sentido de que el
comportamiento actual es un hueco que debe cambiar. Ningún requisito AS-IS de este
documento se ha reformulado por ello: siguen describiendo el sistema tal como está
hoy.

| ID | Requisitos que describen el hueco | Decisión de negocio (2026-08-16) | Estado del evolutivo |
|---|---|---|---|
| Q-02 | REQ-035, REQ-019 | **Bloquear.** No se puede añadir una línea de pieza si no hay existencias suficientes. El stock deja de poder quedar negativo. | Pendiente (medio). Censado como `BUG-003` en `DOC-24`. |
| Q-06 | REQ-042, REQ-047 | **Factura rectificativa.** Para corregir una factura emitida por error se emite una factura nueva que anula la anterior; ambas quedan en el histórico. La inmutabilidad de la factura original no se toca. | Pendiente (grande). Entidad nueva, numeración propia, afecta al cálculo de totales. |
| Q-10 | REQ-040, REQ-046 | **Impedir el cambio de cliente.** Se puede corregir el vehículo de un albarán no facturado dentro del mismo cliente, pero no mover el albarán a otro cliente. | **Implementado.** Entregado como SPEC 06 (`status: Implemented`), realizado en `BR-ALB-10`, `REQ-080` y `REQ-081`. No pasó por DOC-08. |
| Q-12 | REQ-019, REQ-022, REQ-034, REQ-036 | **Bloquear los importes negativos.** Precio, coste y stock de una pieza, precio de una línea de albarán y precio por hora de la mano de obra deben ser siempre positivos. | Pendiente (medio). |
| Q-14 | REQ-052, REQ-055 | **Recuento y filtro de facturas pendientes de cobro.** | Pendiente (medio). |
| Q-15 | REQ-063, REQ-073 | **Igual que Q-14 en nóminas:** recuento y filtro de nóminas pendientes de pago. | Pendiente (medio). |

Estas seis preguntas afectan a **16 requisitos**: REQ-019, REQ-022, REQ-034,
REQ-035, REQ-036, REQ-040, REQ-042, REQ-043, REQ-046, REQ-047, REQ-052, REQ-054,
REQ-055, REQ-063, REQ-072 y REQ-073. Tres de ellos —REQ-052, REQ-055 y REQ-073—
siguen además señalados por `Q-13`, que continúa abierta.

**Sobre `Q-10`, ahora implementada.** Su decisión describía un hueco en `REQ-040`
(la cabecera se podía cambiar sin restricción de cliente). Ese hueco **ya no
existe**: el sistema lo cierra mediante `REQ-080` (rechazo del cambio de cliente)
y `REQ-081` (selector filtrado). `Q-10` se conserva en el censo por la regla de
que ninguna pregunta se borra, pero deja de contar como evolutivo pendiente y sus
requisitos ya no son un hueco por describir. Lo que queda abierto del mismo asunto
—la puerta del vehículo— es `Q-30`.

**Matices sobre `Q-14` y `Q-15`.** Se contestaron en su parte operativa (qué
recuento o filtro espera el negocio), no en qué debería verse si el estado de pago
acabara con un valor fuera de los dos admitidos. Esa segunda mitad deja de ser un
problema práctico en cuanto exista el recuento: el estado de pago tendrá por fin
una consecuencia observable y `REQ-055` y `REQ-073` serán verificables de verdad.
`Q-15` **no responde a `Q-11`**: que el taller quiera ver qué nóminas están
pendientes no dice nada sobre si una nómina pagada debe poder modificarse o
borrarse.

**Quién recoge las decisiones pendientes.** Las cinco que siguen pendientes
generan una petición de evolutivo de Fase 2: A-06 las convierte en requisitos
TO-BE en **DOC-08**. A-02 no escribe DOC-08 ni inventa aquí el requisito futuro.

### 6.3 Cómo leer este apartado en las fases siguientes

En el bloque estructurado cada pregunta declara un único requisito en `blocks`
—por compatibilidad de contrato— y la lista completa en `affects_requirements`,
que es la que debe usar A-05 al montar la matriz de trazabilidad.

Un requisito señalado por una pregunta, abierta o respondida, **no es un requisito
inválido**: describe lo que el sistema hace hoy y se puede probar tal cual. La
diferencia es el tipo de aviso:

- Los requisitos señalados solo por preguntas **abiertas** pueden cambiar en
  cualquier dirección, o no cambiar, cuando el negocio conteste.
- Los señalados por preguntas **respondidas pero pendientes de evolutivo** van a
  cambiar en un sentido ya conocido, pero no todavía: hoy siguen siendo verdad.
  Cuando A-06 publique DOC-08, las pruebas que cuelgan de ellos habrá que
  revisarlas.
- Los señalados por `Q-10`, **respondida e implementada**, ya reflejan la
  decisión de negocio: `REQ-080` y `REQ-081` son el estado deseado y el estado
  actual a la vez.

## 7. Bloque estructurado

```yaml requirements
version: 1
project: app-taller
requirements:
  - id: REQ-001
    statement: "El sistema ofrece un listado de clientes con búsqueda por nombre, ordenación por columna y paginación."
    module: clients
    source_anchors: [UC-CLI-01]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-002
    statement: "El sistema permite registrar un cliente nuevo."
    module: clients
    source_anchors: [UC-CLI-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-003
    statement: "El sistema exige el nombre del cliente tanto al registrarlo como al modificarlo."
    module: clients
    source_anchors: [BR-CLI-01, UC-CLI-02, UC-CLI-04]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-004
    statement: "La ficha de un cliente muestra sus datos, sus vehículos y sus facturas."
    module: clients
    source_anchors: [UC-CLI-03]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-005
    statement: "El sistema permite modificar los datos de un cliente ya registrado."
    module: clients
    source_anchors: [UC-CLI-04]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-006
    statement: "El sistema permite dar de baja un cliente previa confirmación del usuario."
    module: clients
    source_anchors: [UC-CLI-05]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-007
    statement: "El sistema impide dar de baja un cliente que tenga vehículos asociados."
    module: clients
    source_anchors: [BR-CLI-02, UC-CLI-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-008
    statement: "El sistema impide dar de baja un cliente que tenga facturas asociadas."
    module: clients
    source_anchors: [BR-CLI-03, UC-CLI-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-009
    statement: "El sistema ofrece un listado de vehículos con búsqueda, ordenación por columna y paginación."
    module: vehicles
    source_anchors: [UC-VEH-01]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-010
    statement: "El sistema permite registrar un vehículo, tanto desde el módulo de vehículos como desde la ficha del cliente."
    module: vehicles
    source_anchors: [UC-VEH-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-011
    statement: "Todo vehículo queda asociado a un cliente que ya existe en el sistema."
    module: vehicles
    source_anchors: [BR-VEH-01, UC-VEH-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-012
    statement: "El sistema exige marca, modelo y matrícula para registrar o modificar un vehículo."
    module: vehicles
    source_anchors: [BR-VEH-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-013
    statement: "El sistema impide que dos vehículos compartan la misma matrícula."
    module: vehicles
    source_anchors: [BR-VEH-03]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-014
    statement: "La ficha de un vehículo muestra sus datos, el cliente propietario y sus albaranes."
    module: vehicles
    source_anchors: [UC-VEH-03]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-015
    statement: "El sistema permite modificar los datos de un vehículo ya registrado."
    module: vehicles
    source_anchors: [UC-VEH-04]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-016
    statement: "El sistema permite dar de baja un vehículo previa confirmación del usuario."
    module: vehicles
    source_anchors: [UC-VEH-05]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-017
    statement: "El sistema impide dar de baja un vehículo que tenga albaranes asociados."
    module: vehicles
    source_anchors: [BR-VEH-04, UC-VEH-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-018
    statement: "El sistema ofrece un catálogo de piezas en el que cada pieza muestra su referencia, su precio y su stock actual."
    module: peces
    source_anchors: [UC-PEC-01]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-019
    statement: "El sistema permite dar de alta una pieza en el catálogo con su stock inicial."
    module: peces
    source_anchors: [UC-PEC-02]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-020
    statement: "El sistema exige el nombre de la pieza tanto al darla de alta como al modificarla."
    module: peces
    source_anchors: [BR-PEC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-021
    statement: "La ficha de una pieza muestra su referencia, precio, coste, unidad, proveedor y stock."
    module: peces
    source_anchors: [UC-PEC-03]
    actors: [ACT-01]
    priority: medium
    confidence: medium
    status: active
  - id: REQ-022
    statement: "El sistema permite modificar los datos de una pieza del catálogo."
    module: peces
    source_anchors: [UC-PEC-04]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-023
    statement: "El sistema permite dar de baja una pieza del catálogo previa confirmación del usuario."
    module: peces
    source_anchors: [UC-PEC-05]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-024
    statement: "El sistema impide dar de baja una pieza que se haya utilizado en algún albarán."
    module: peces
    source_anchors: [BR-PEC-02, UC-PEC-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-025
    statement: "El sistema ofrece un listado de albaranes filtrable por vehículo, por cliente y por situación del albarán."
    module: albarans
    source_anchors: [UC-ALB-01]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-026
    statement: "El sistema permite abrir un albarán para un vehículo, tanto desde el módulo de albaranes como desde la ficha del vehículo, y el albarán nace sin líneas."
    module: albarans
    source_anchors: [UC-ALB-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-027
    statement: "Todo albarán queda asociado a un vehículo que ya existe en el sistema."
    module: albarans
    source_anchors: [BR-ALB-01, UC-ALB-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-028
    statement: "Un albarán recién abierto queda en situación de pendiente de facturar."
    module: albarans
    source_anchors: [BR-ALB-02, UC-ALB-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-029
    statement: "El sistema asigna a cada albarán un número correlativo anual sin intervención del usuario, con el formato año/A-nnnn."
    module: albarans
    source_anchors: [BR-ALB-09]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-030
    statement: "El sistema permite añadir a un albarán una línea de pieza indicando la pieza y la cantidad consumida."
    module: albarans
    source_anchors: [UC-ALB-03]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-031
    statement: "El sistema solo admite en un albarán líneas de pieza o de mano de obra: una anotación que no sea de ninguno de esos dos tipos no llega a registrarse, de modo que el albarán mantiene las líneas y los importes que ya tenía."
    module: albarans
    source_anchors: [BR-ALB-04]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-032
    statement: "El sistema exige que la cantidad de una línea de albarán sea mayor que cero."
    module: albarans
    source_anchors: [BR-ALB-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-033
    statement: "El sistema exige que la pieza de una línea de pieza exista en el catálogo."
    module: albarans
    source_anchors: [BR-ALB-06]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-034
    statement: "Cuando el usuario no indica el precio de una línea de pieza, el sistema aplica el precio que la pieza tiene en el catálogo."
    module: albarans
    source_anchors: [BR-ALB-06, UC-ALB-03]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-035
    statement: "Al añadir una línea de pieza, el sistema descuenta del stock de esa pieza la cantidad consumida, en la misma operación que registra la línea."
    module: albarans
    source_anchors: [BR-ALB-08, UC-ALB-03]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-036
    statement: "El sistema permite añadir a un albarán una línea de mano de obra con las horas trabajadas y su precio por hora."
    module: albarans
    source_anchors: [UC-ALB-04]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-037
    statement: "El sistema exige una descripción del trabajo en toda línea de mano de obra."
    module: albarans
    source_anchors: [BR-ALB-07, UC-ALB-04]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-038
    statement: "El sistema permite retirar una línea de un albarán no facturado."
    module: albarans
    source_anchors: [UC-ALB-05]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-039
    statement: "Al retirar una línea de pieza, el sistema devuelve al stock de esa pieza la cantidad que se había consumido, en la misma operación que elimina la línea."
    module: albarans
    source_anchors: [BR-ALB-08, UC-ALB-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-040
    statement: "El sistema permite modificar el vehículo, la fecha y las notas de un albarán no facturado."
    module: albarans
    source_anchors: [UC-ALB-06]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-041
    statement: "El sistema permite borrar un albarán no facturado junto con todas sus líneas, previa confirmación del usuario."
    module: albarans
    source_anchors: [UC-ALB-07]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-042
    statement: "El sistema impide modificar, borrar o alterar las líneas de un albarán que ya ha sido facturado."
    module: albarans
    source_anchors: [BR-ALB-03, UC-ALB-06, UC-ALB-07]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-043
    statement: "El sistema permite emitir una factura a partir de los albaranes pendientes de facturar de un cliente."
    module: factures
    source_anchors: [UC-FAC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-044
    statement: "El sistema exige que toda factura agrupe al menos un albarán."
    module: factures
    source_anchors: [BR-FAC-01, UC-FAC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-045
    statement: "El sistema exige que todos los albaranes de una factura estén pendientes de facturar en el momento de emitirla."
    module: factures
    source_anchors: [BR-FAC-02, UC-FAC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-046
    statement: "El sistema exige que todos los albaranes de una misma factura pertenezcan al mismo cliente."
    module: factures
    source_anchors: [BR-FAC-03, UC-FAC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-047
    statement: "Al emitir una factura, el sistema marca sus albaranes como facturados y los enlaza a ella en la misma operación."
    module: factures
    source_anchors: [BR-FAC-04, UC-FAC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-048
    statement: "El sistema asigna a cada factura un número correlativo anual sin intervención del usuario, con el formato año/F-nnnn."
    module: factures
    source_anchors: [BR-FAC-09]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-049
    statement: "La base de una factura es la suma de la cantidad por el precio de todas las líneas de los albaranes que agrupa, y su total es la base más el IVA."
    module: factures
    source_anchors: [BR-FAC-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-050
    statement: "Cuando el usuario no indica un tipo de IVA al emitir la factura, el sistema aplica el 21 por ciento."
    module: factures
    source_anchors: [BR-FAC-06, UC-FAC-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-051
    statement: "El sistema presenta la base, el IVA y el total de una factura redondeados a dos decimales."
    module: factures
    source_anchors: [BR-FAC-07]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-052
    statement: "El sistema ofrece un listado de facturas en el que cada factura muestra su número, su estado de pago y su total."
    module: factures
    source_anchors: [UC-FAC-02]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-053
    statement: "El detalle de una factura muestra los albaranes que agrupa, la base, el IVA y el total."
    module: factures
    source_anchors: [UC-FAC-03]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-054
    statement: "El sistema permite marcar una factura como pagada o devolverla a pendiente de cobro."
    module: factures
    source_anchors: [UC-FAC-04]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-055
    statement: "El estado de pago de una factura solo puede ser pendiente o pagada."
    module: factures
    source_anchors: [BR-FAC-08]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-056
    statement: "El sistema ofrece un listado de empleados en el que cada empleado muestra su nombre, su cargo y su contacto."
    module: personal
    source_anchors: [UC-PER-01]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-057
    statement: "El sistema permite dar de alta un empleado del taller."
    module: personal
    source_anchors: [UC-PER-02]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-058
    statement: "El sistema exige el nombre del empleado tanto al darlo de alta como al modificarlo."
    module: personal
    source_anchors: [BR-PER-01]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-059
    statement: "La ficha de un empleado muestra sus datos y sus nóminas."
    module: personal
    source_anchors: [UC-PER-03]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-060
    statement: "El sistema permite modificar los datos de un empleado."
    module: personal
    source_anchors: [UC-PER-04]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-061
    statement: "El sistema permite dar de baja un empleado previa confirmación del usuario."
    module: personal
    source_anchors: [UC-PER-05]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-062
    statement: "El sistema impide dar de baja un empleado que tenga nóminas asociadas."
    module: personal
    source_anchors: [BR-PER-02, UC-PER-05]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-063
    statement: "El sistema ofrece un listado de nóminas ordenado de la más reciente a la más antigua por año y mes."
    module: nomines
    source_anchors: [UC-NOM-01]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-064
    statement: "El sistema permite registrar la nómina de un empleado para un mes y un año, indicando el salario bruto y las deducciones, tanto desde el módulo de nóminas como desde la ficha del empleado."
    module: nomines
    source_anchors: [UC-NOM-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-065
    statement: "Toda nómina queda asociada a un empleado que ya existe en el sistema."
    module: nomines
    source_anchors: [BR-NOM-01, UC-NOM-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-066
    statement: "El sistema exige empleado, mes y año para registrar o modificar una nómina."
    module: nomines
    source_anchors: [BR-NOM-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-067
    statement: "El sistema exige que el mes de una nómina esté comprendido entre 1 y 12."
    module: nomines
    source_anchors: [BR-NOM-03]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-068
    statement: "El sistema impide que un empleado tenga más de una nómina para el mismo mes y año."
    module: nomines
    source_anchors: [BR-NOM-04, UC-NOM-02]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-069
    statement: "El detalle de una nómina muestra el salario bruto, las deducciones y el salario neto."
    module: nomines
    source_anchors: [UC-NOM-03]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-070
    statement: "El salario neto de una nómina es el salario bruto menos las deducciones, redondeado a dos decimales, y se obtiene en cada consulta a partir de esos dos importes."
    module: nomines
    source_anchors: [BR-NOM-05, UC-NOM-03]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-071
    statement: "El sistema permite modificar los datos de una nómina registrada."
    module: nomines
    source_anchors: [UC-NOM-04]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-072
    statement: "El sistema permite marcar una nómina como pagada o devolverla a pendiente de pago."
    module: nomines
    source_anchors: [UC-NOM-05]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-073
    statement: "El estado de pago de una nómina solo puede ser pendiente o pagada."
    module: nomines
    source_anchors: [BR-NOM-06]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-074
    statement: "El sistema permite borrar una nómina previa confirmación del usuario, sin ninguna restricción adicional."
    module: nomines
    source_anchors: [UC-NOM-06]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-075
    statement: "El sistema permite al usuario cambiar el idioma de la interfaz entre catalán y castellano en cualquier momento, sin perder el trabajo en curso."
    module: shell
    source_anchors: [UC-SHL-01]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
  - id: REQ-076
    statement: "La interfaz se presenta en castellano mientras el usuario no elija otro idioma, y su elección se conserva para las siguientes sesiones."
    module: shell
    source_anchors: [BR-SHL-01, UC-SHL-01]
    actors: [ACT-01]
    priority: medium
    confidence: medium
    status: active
  - id: REQ-077
    statement: "El sistema permite al usuario cambiar entre tema claro y tema oscuro en cualquier momento."
    module: shell
    source_anchors: [UC-SHL-02]
    actors: [ACT-01]
    priority: medium
    confidence: high
    status: active
  - id: REQ-078
    statement: "La interfaz adopta el tema que prefiere el equipo del usuario mientras este no elija otro, y su elección se conserva para las siguientes sesiones."
    module: shell
    source_anchors: [BR-SHL-02, UC-SHL-02]
    actors: [ACT-01]
    priority: low
    confidence: medium
    status: active
  - id: REQ-079
    statement: "La sección de Configuración informa al usuario de que el módulo está pendiente de desarrollo."
    module: configuracio
    source_anchors: [UC-SHL-03]
    actors: [ACT-01]
    priority: low
    confidence: high
    status: active
  - id: REQ-080
    statement: "El sistema impide que, al modificar la cabecera de un albarán no facturado, su vehículo se sustituya por uno perteneciente a un cliente distinto del actual; el intento se rechaza por completo y ni el vehículo, ni la fecha, ni las notas quedan modificados."
    module: albarans
    source_anchors: [BR-ALB-10, UC-ALB-06]
    actors: [ACT-01]
    priority: critical
    confidence: high
    status: active
  - id: REQ-081
    statement: "Al modificar la cabecera de un albarán no facturado, el selector de vehículo solo ofrece los vehículos del cliente actual del albarán."
    module: albarans
    source_anchors: [BR-ALB-10, UC-ALB-06]
    actors: [ACT-01]
    priority: high
    confidence: high
    status: active
# Esquema de open_questions, ampliado en 1.2.0 y compatible hacia atrás:
#   status  : open | answered           -> solo `open` cuenta como pregunta abierta
#   resolution (solo si answered):
#             gap_confirmed             -> el negocio confirma que es un hueco y debe cambiar
#             as_designed               -> el negocio confirma que es intencionado
#   answer, answered_on, answered_by    -> la decisión de negocio y su fecha
#   describes_gap_in                    -> requisitos AS-IS que describen el hueco
#   affects_requirements               -> lista completa de requisitos tocados (`blocks` sigue
#                                          siendo uno solo, por compatibilidad)
#   gap_open_until_implemented          -> true mientras el evolutivo no esté construido;
#                                          false cuando ya está en el sistema
#   evolutivo                           -> alcance y destino de la petición derivada;
#                                          status: pending | implemented
#   realised_in                         -> anclas/requisitos que materializan la decisión (si implemented)
open_questions:
  - id: Q-01
    question: "La pieza guarda un coste además del precio, pero el coste no interviene en ningún cálculo del taller. ¿Es un margen previsto para más adelante o un dato solo informativo?"
    blocks: REQ-021
    affects_requirements: [REQ-021, REQ-049]
    inherited_from: DOC-01/Q-01
    status: open
  - id: Q-02
    question: "Al añadir una línea de pieza el stock se descuenta sin comprobar que haya existencias suficientes, por lo que puede quedar negativo. ¿Es una decisión consciente del taller o falta una regla?"
    blocks: REQ-035
    affects_requirements: [REQ-035, REQ-019]
    inherited_from: DOC-01/Q-02
    status: answered
    resolution: gap_confirmed
    answered_on: 2026-08-16
    answered_by: negocio
    answer: "Bloquear. No se puede añadir una línea de pieza si no hay existencias suficientes; el stock no puede quedar negativo."
    describes_gap_in: [REQ-035]
    gap_open_until_implemented: true
    evolutivo:
      scope: medium
      status: pending
      owner: A-06
      target_doc: DOC-08
      note: "Censado como BUG-003 en docs/DOC-24-BUGS.json, abierto."
  - id: Q-03
    question: "La unidad de medida de la pieza no interviene en ningún cálculo ni validación. ¿Qué uso se le quiere dar?"
    blocks: REQ-021
    affects_requirements: [REQ-021, REQ-018]
    inherited_from: DOC-01/Q-03
    status: open
  - id: Q-04
    question: "La sección de Configuración aparece en el menú pero no está desarrollada y ninguna especificación describe su contenido. ¿Qué debe contener?"
    blocks: REQ-079
    affects_requirements: [REQ-079]
    inherited_from: DOC-01/Q-04
    status: open
  - id: Q-05
    question: "El empleado guarda fecha de alta y salario base, pero la nómina no los usa: el bruto se teclea a mano cada mes. ¿Se espera que el salario base proponga el bruto?"
    blocks: REQ-064
    affects_requirements: [REQ-064, REQ-069]
    inherited_from: DOC-01/Q-05
    status: open
  - id: Q-06
    question: "Una factura no se puede modificar ni anular y sus albaranes quedan bloqueados de forma permanente. ¿Cómo corrige el taller una factura emitida por error?"
    blocks: REQ-043
    affects_requirements: [REQ-043, REQ-047, REQ-042]
    inherited_from: DOC-01/Q-06
    status: answered
    resolution: gap_confirmed
    answered_on: 2026-08-16
    answered_by: negocio
    answer: "Factura rectificativa. Para corregir una factura emitida por error se emite una factura nueva que anula la anterior; ambas quedan en el histórico. La inmutabilidad de la factura original no se toca."
    describes_gap_in: [REQ-042, REQ-047]
    gap_open_until_implemented: true
    evolutivo:
      scope: large
      status: pending
      owner: A-06
      target_doc: DOC-08
      note: "Entidad nueva con numeración propia; afecta al cálculo de totales."
  - id: Q-07
    question: "Los albaranes no tienen ninguna situación intermedia entre pendiente y facturado. ¿El taller trabaja así o falta reflejar un paso real del trabajo?"
    blocks: REQ-028
    affects_requirements: [REQ-028, REQ-025]
    inherited_from: DOC-01/Q-07
    status: open
  - id: Q-08
    question: "El idioma y el tema por defecto son las dos únicas reglas de DOC-01 que proceden de una especificación y no del comportamiento observado, pese a que DOC-01 declara que todas sus reglas están leídas del sistema. ¿El comportamiento real coincide con lo que describe la especificación?"
    blocks: REQ-076
    affects_requirements: [REQ-076, REQ-078]
    status: open
  - id: Q-09
    question: "El tipo de IVA de una factura se puede indicar al emitirla y solo el valor por defecto está fijado. Ninguna regla acota qué tipos son admisibles. ¿Qué tipos puede aplicar el taller y quién los autoriza?"
    blocks: REQ-050
    affects_requirements: [REQ-050, REQ-049]
    status: open
  - id: Q-10
    question: "Se puede cambiar el vehículo de un albarán no facturado. Si el vehículo nuevo pertenece a otro cliente, cambia el cliente al que acabará facturándose el trabajo. ¿Es un cambio admisible o debe impedirse?"
    blocks: REQ-040
    affects_requirements: [REQ-040, REQ-046]
    status: answered
    resolution: gap_confirmed
    answered_on: 2026-08-16
    answered_by: negocio
    answer: "Impedir el cambio de cliente. Se podrá corregir el vehículo de un albarán no facturado dentro del mismo cliente, pero no mover el albarán a otro cliente."
    describes_gap_in: [REQ-040]
    gap_open_until_implemented: false
    implemented_on: 2026-08-27
    implemented_by: "SPEC 06 (specs/implemented/SPE-06-albara-canvi-client.md, status: Implemented)"
    realised_in: [BR-ALB-10, REQ-080, REQ-081]
    evolutivo:
      scope: small
      status: implemented
      note: "Entregado directamente como SPEC 06, sin pasar por A-06 ni DOC-08. La puerta del vehículo (UC-VEH-04) sigue abierta: ver Q-30."
  - id: Q-11
    question: "Una nómina se puede modificar y borrar sin restricción, incluso después de marcarla como pagada, a diferencia del albarán facturado, que queda bloqueado. ¿Debe bloquearse la nómina pagada?"
    blocks: REQ-071
    affects_requirements: [REQ-071, REQ-074]
    status: open
  - id: Q-12
    question: "Ninguna regla acota a valores no negativos el precio, el coste ni el stock de una pieza, ni el precio de una línea de albarán o el precio por hora de la mano de obra. ¿Qué importes debe rechazar el sistema?"
    blocks: REQ-019
    affects_requirements: [REQ-019, REQ-022, REQ-034, REQ-036]
    status: answered
    resolution: gap_confirmed
    answered_on: 2026-08-16
    answered_by: negocio
    answer: "Bloquear los importes negativos. El precio, el coste y el stock de una pieza, el precio de una línea de albarán y el precio por hora de la mano de obra deben ser siempre positivos."
    describes_gap_in: [REQ-019, REQ-022, REQ-034, REQ-036]
    gap_open_until_implemented: true
    evolutivo:
      scope: medium
      status: pending
      owner: A-06
      target_doc: DOC-08
  - id: Q-13
    question: "El término estado designa a la vez la situación del albarán (pendiente o facturado) y la situación de cobro de facturas y nóminas (pendiente o pagada). El glosario lo marca como ambiguo. ¿Con qué nombres deben aparecer ambos conceptos en la interfaz y en los filtros?"
    blocks: REQ-025
    affects_requirements: [REQ-025, REQ-052, REQ-055, REQ-073]
    status: open
  - id: Q-14
    question: "El estado de pago de una factura solo sirve hoy para mostrarse: ninguna regla del taller depende de él y no hay ningún recuento de facturas pendientes de cobro ni ningún filtro por estado de pago. ¿Qué debe ver el taller si una factura acaba con un estado de pago que no sea ni pendiente ni pagada, y qué recuento o filtro de pendientes de cobro espera el negocio?"
    blocks: REQ-055
    affects_requirements: [REQ-055, REQ-052, REQ-054]
    status: answered
    resolution: gap_confirmed
    answered_on: 2026-08-16
    answered_by: negocio
    answer: "Debe haber recuento y filtro de facturas pendientes de cobro: el taller quiere ver qué tiene pendiente de cobrar."
    describes_gap_in: [REQ-052, REQ-055]
    gap_open_until_implemented: true
    residual: "El negocio contestó la parte operativa (recuento y filtro), no qué se mostraría ante un estado de pago fuera de los dos valores admitidos. Con el recuento y el filtro implementados, ese estado pasará a tener consecuencia observable y REQ-055 será verificable; hasta entonces sigue la limitación del apartado 3.5."
    evolutivo:
      scope: medium
      status: pending
      owner: A-06
      target_doc: DOC-08
  - id: Q-15
    question: "El estado de pago de una nómina tampoco condiciona nada: no hay recuento ni filtro de nóminas pendientes de pago, y una nómina pagada se puede modificar y borrar igual que una pendiente. ¿Qué debe ver el taller si una nómina acaba con un estado de pago que no sea ni pendiente ni pagada, y qué recuento o filtro de pendientes de pago espera el negocio?"
    blocks: REQ-073
    affects_requirements: [REQ-073, REQ-063, REQ-072]
    status: answered
    resolution: gap_confirmed
    answered_on: 2026-08-16
    answered_by: negocio
    answer: "Igual que Q-14 en nóminas: debe haber recuento y filtro de nóminas pendientes de pago."
    describes_gap_in: [REQ-063, REQ-073]
    gap_open_until_implemented: true
    residual: "Mismo matiz que Q-14 sobre el valor fuera de los dos admitidos. La respuesta no cubre Q-11: no dice nada sobre si una nómina pagada debe poder modificarse o borrarse."
    evolutivo:
      scope: medium
      status: pending
      owner: A-06
      target_doc: DOC-08
  - id: Q-30
    question: "BR-ALB-10 impide mover un albarán a otro cliente por la puerta de la cabecera del albarán, pero cambiar el cliente propietario de un vehículo (UC-VEH-04) que tiene albaranes pendientes sigue arrastrando ese trabajo al cliente nuevo, sin aviso. ¿Debe impedirse también, avisarse, o permitirse dejar el trabajo ya hecho con el propietario anterior?"
    blocks: REQ-015
    affects_requirements: [REQ-015, REQ-080]
    inherited_from: DOC-01/Q-08
    origin_note: "Recoge PD-002 de specs/implemented/SPE-06-albara-canvi-client.md. Continuación de Q-10, ya implementada. Emitida en DOC-04 1.3.0 como Q-16; renumerada a Q-30 en 1.3.1 por colisión con la Q-16 anterior de DOC-05 (regla de gobierno de IDs: cede el reclamante)."
    status: open
open_questions_summary:
  total: 16
  open: 10
  answered: 6
  answered_gap_confirmed: 6
  answered_as_designed: 0
  pending_evolutivo: 5
  implemented_evolutivo: 1
  last_answered_on: 2026-08-16
  requirements_affected_by_open: 18
  requirements_affected_by_answered: 16
  requirements_affected_total: 31
```
