---
doc_id: DOC-04
doc_name: DOC-04-FUNCIONAL
version: 1.2.0
status: draft
generator: A-02 documentación funcional
generator_version: "1.0"
generated_at: 2026-08-23T08:48:39+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: 88af6e74a8873ea07ee44a149bdb51f77a2319ba
  working_tree_clean: false   # ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/ y promptDashboard.txt sin versionar, fuera del alcance de este ciclo
inputs:
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    version: 1.1.0
    hash: sha256:0f074e686a5fb700286e8de28f0210a204380423a6a797e7a9e8f3a96384200a
    present: true
  - id: registro-ids.json
    from: S-01
    version: "1"
    hash: sha256:9f5b3679a537ad7e9399ba6ef61d99518a3308957cac29977fae5b3f12a1d1c5
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
> `status: draft`. 79 requisitos activos, ninguno deprecado.

## Procedencia

Cómo se ha usado cada entrada en este ciclo, y por qué la versión del documento
no cambia aunque se haya regenerado.

**Motivo del ciclo.** `DOC-01-BASE-ASIS.md` pasó de **1.0.0** a **1.1.0**
(commit `7c5c39f`). Antes de escribir una sola línea se ha comprobado si ese
cambio afecta a algo que este documento declare:

- **Diff de anclas.** Las 77 anclas `UC-nnn`/`BR-nnn` de DOC-01 1.1.0 son
  exactamente las mismas 77 de 1.0.0, mismo texto, mismo módulo — comprobado
  ancla a ancla, no solo por recuento.
- **Diff completo de fichero.** DOC-01 1.1.0 difiere de 1.0.0 en 39 líneas y
  ninguna es de negocio: (1) su propio front-matter (`commit_sha`,
  `generated_at`, el hash de `registro-ids.json` que declara como entrada);
  (2) el árbol comentado de la sección 6, que pasa de citar tres
  especificaciones a cinco porque se implementaron `SPEC 04
  use-submit-guard` y `SPEC 05 format-utils`; (3) el cierre de su antigua
  `Q-02` («¿el stock puede quedar negativo?»), resuelta por negocio el
  2026-08-16 y ya recogida en este documento desde la versión 1.2.0 como
  `Q-02` (bloquea REQ-035) y `Q-12` (bloquea REQ-019 y el resto de importes),
  pendiente de implementación como `BUG-003` en `docs/DOC-24-BUGS.json`.
  Ningún actor, caso de uso, regla de negocio ni término de glosario cambia
  de texto.
- **Consecuencia.** Ningún `REQ-nnn` se añade, se elimina ni cambia de
  enunciado, prioridad, confianza o ancla de origen. El bloque `requirements`
  del apartado 7 es idéntico byte a byte al de la versión 1.2.0 publicada el
  2026-08-16. Se aplica la regla de regeneración: *bloques de negocio
  idénticos y prosa equivalente → ninguna versión de contenido nueva*. Este
  ciclo actualiza solo la procedencia: `inputs[DOC-01-BASE-ASIS.md].version`
  1.0.0 → 1.1.0, su `hash`, el `commit_sha` de `source` y `generated_at`.
  Detalle completo del porqué en `docs/DOC-04-FUNCIONAL-HIST.md`, nota del
  2026-08-23.

**Qué se ha leído de cada entrada, y qué falta.**

- **`DOC-01-BASE-ASIS.md` 1.1.0** — secciones 1 a 5 (propósito, actores, casos
  de uso, reglas de negocio, glosario) y el bloque `inventory` de la sección
  9, que es la semilla de todos los `REQ-nnn`. **No se ha leído la sección 6**
  (árbol) **ni `DOC-02-TECNICA.md`**: la documentación funcional se escribe
  desde la verdad de negocio, no desde la implementación.
- **`registro-ids.json`** — 79 anclas `REQ-001` a `REQ-079` ya registradas por
  A-02, con `text`, `module` y `source_anchors` idénticos a los de este
  documento. No se ha añadido ni deprecado ninguna: no había nada que
  registrar en este ciclo.
- **`DOC-03-API.md`** — no existe en este proyecto (no hay `S-03`). Declarado
  `present: false`.
- **Contexto de Confluence (`I-02`)** — `DOC-18-CONFLUENCE-SYNC.json` no
  existe. Declarado `present: false`.
- **Respuestas de negocio** — el lote de seis respuestas del 2026-08-16 que
  produjo la versión 1.2.0. No hay respuestas nuevas en este ciclo; se declara
  sin `version` porque no es un documento versionado sino un registro puntual
  de decisión, ya íntegramente incorporado al apartado 6.

## 1. Propósito funcional del sistema

**app-taller** es la aplicación con la que un taller mecánico lleva su trabajo
diario. El taller registra a sus **clientes** y los **vehículos** de cada uno.
Cada vez que un vehículo entra al taller se abre un **albarán**, que es la hoja
de trabajo de esa intervención: en ella se anotan las piezas consumidas del
catálogo del taller y las horas de mano de obra dedicadas. Cuando el trabajo
está hecho, uno o varios albaranes pendientes de un mismo cliente se agrupan en
una **factura**, que calcula la base, aplica el IVA y da un total, y que se marca
como pagada cuando el cliente paga. Ese encadenamiento —cliente, vehículo,
albarán, factura— es el ciclo central del negocio y explica la mayor parte de las
reglas de este documento.

Alrededor de ese ciclo la aplicación mantiene dos registros que lo apoyan pero
que no dependen de él: el **catálogo de piezas con su stock**, que baja al
consumir una pieza en un albarán y sube al retirar esa anotación, y el
**personal del taller con sus nóminas mensuales**, donde se registra el salario
bruto y las deducciones de cada empleado mes a mes y se muestra el neto
resultante. La aplicación es de uso local y de un solo puesto, funciona en
catalán y en castellano, y no distingue usuarios ni permisos: quien la abre
puede hacer todo. Esta ausencia de identificación es una decisión de negocio
documentada, no una carencia, y significa que en este documento no hay ningún
requisito de acceso, rol ni autorización.

## 2. Actores

Heredados de DOC-01. El sistema tiene un único actor porque no distingue
usuarios ni permisos.

| Ancla | Actor | Tipo | Qué hace en el sistema |
|---|---|---|---|
| ACT-01 | Personal del taller | Humano | Único usuario. Gestiona clientes, vehículos, piezas, albaranes, facturas, personal y nóminas sin restricción de permisos. |

Todos los requisitos de este documento tienen a `ACT-01` como actor. Si en el
futuro se añadiera identificación de usuarios, cambiaría la premisa de los 79
requisitos, no solo de algunos.

## 3. Requisitos por módulo

Un apartado por módulo de DOC-01. La **prioridad** es de negocio —qué daño hace
al taller que ese requisito no se cumpla—, no de riesgo de prueba: la prioridad
de test la decide A-03 en DOC-05. La **confianza** es la que DOC-01 declara para
las anclas de origen; solo baja cuando la fuente del ancla no es el
comportamiento observado del sistema.

### 3.1 Clientes

Gestión de los clientes del taller y de su relación con vehículos y facturas.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-001 | El sistema ofrece un listado de clientes con búsqueda por nombre, ordenación por columna y paginación. | UC-CLI-01 | high | high |
| REQ-002 | El sistema permite registrar un cliente nuevo. | UC-CLI-02 | critical | high |
| REQ-003 | El sistema exige el nombre del cliente tanto al registrarlo como al modificarlo. | BR-CLI-01, UC-CLI-02, UC-CLI-04 | critical | high |
| REQ-004 | La ficha de un cliente muestra sus datos, sus vehículos y sus facturas. | UC-CLI-03 | high | high |
| REQ-005 | El sistema permite modificar los datos de un cliente ya registrado. | UC-CLI-04 | high | high |
| REQ-006 | El sistema permite dar de baja un cliente previa confirmación del usuario. | UC-CLI-05 | medium | high |
| REQ-007 | El sistema impide dar de baja un cliente que tenga vehículos asociados. | BR-CLI-02, UC-CLI-05 | critical | high |
| REQ-008 | El sistema impide dar de baja un cliente que tenga facturas asociadas. | BR-CLI-03, UC-CLI-05 | critical | high |

### 3.2 Vehículos

Gestión de los vehículos de cada cliente, identificados por su matrícula.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-009 | El sistema ofrece un listado de vehículos con búsqueda, ordenación por columna y paginación. | UC-VEH-01 | high | high |
| REQ-010 | El sistema permite registrar un vehículo, tanto desde el módulo de vehículos como desde la ficha del cliente. | UC-VEH-02 | critical | high |
| REQ-011 | Todo vehículo queda asociado a un cliente que ya existe en el sistema. | BR-VEH-01, UC-VEH-02 | critical | high |
| REQ-012 | El sistema exige marca, modelo y matrícula para registrar o modificar un vehículo. | BR-VEH-02 | critical | high |
| REQ-013 | El sistema impide que dos vehículos compartan la misma matrícula. | BR-VEH-03 | critical | high |
| REQ-014 | La ficha de un vehículo muestra sus datos, el cliente propietario y sus albaranes. | UC-VEH-03 | high | high |
| REQ-015 | El sistema permite modificar los datos de un vehículo ya registrado. | UC-VEH-04 | high | high |
| REQ-016 | El sistema permite dar de baja un vehículo previa confirmación del usuario. | UC-VEH-05 | medium | high |
| REQ-017 | El sistema impide dar de baja un vehículo que tenga albaranes asociados. | BR-VEH-04, UC-VEH-05 | critical | high |

### 3.3 Piezas

Catálogo de piezas del taller, con su precio y su stock.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-018 | El sistema ofrece un catálogo de piezas en el que cada pieza muestra su referencia, su precio y su stock actual. | UC-PEC-01 | high | high |
| REQ-019 | El sistema permite dar de alta una pieza en el catálogo con su stock inicial. | UC-PEC-02 | high | high |
| REQ-020 | El sistema exige el nombre de la pieza tanto al darla de alta como al modificarla. | BR-PEC-01 | critical | high |
| REQ-021 | La ficha de una pieza muestra su referencia, precio, coste, unidad, proveedor y stock. | UC-PEC-03 | medium | medium |
| REQ-022 | El sistema permite modificar los datos de una pieza del catálogo. | UC-PEC-04 | high | high |
| REQ-023 | El sistema permite dar de baja una pieza del catálogo previa confirmación del usuario. | UC-PEC-05 | medium | high |
| REQ-024 | El sistema impide dar de baja una pieza que se haya utilizado en algún albarán. | BR-PEC-02, UC-PEC-05 | critical | high |

### 3.4 Albaranes

Hoja de trabajo de cada intervención, con sus líneas de pieza y de mano de obra.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-025 | El sistema ofrece un listado de albaranes filtrable por vehículo, por cliente y por situación del albarán. | UC-ALB-01 | high | high |
| REQ-026 | El sistema permite abrir un albarán para un vehículo, tanto desde el módulo de albaranes como desde la ficha del vehículo, y el albarán nace sin líneas. | UC-ALB-02 | critical | high |
| REQ-027 | Todo albarán queda asociado a un vehículo que ya existe en el sistema. | BR-ALB-01, UC-ALB-02 | critical | high |
| REQ-028 | Un albarán recién abierto queda en situación de pendiente de facturar. | BR-ALB-02, UC-ALB-02 | critical | high |
| REQ-029 | El sistema asigna a cada albarán un número correlativo anual sin intervención del usuario, con el formato año/A-nnnn. | BR-ALB-09 | high | high |
| REQ-030 | El sistema permite añadir a un albarán una línea de pieza indicando la pieza y la cantidad consumida. | UC-ALB-03 | critical | high |
| REQ-031 | El sistema solo admite en un albarán líneas de pieza o de mano de obra: una anotación que no sea de ninguno de esos dos tipos no llega a registrarse, de modo que el albarán mantiene las líneas y los importes que ya tenía. | BR-ALB-04 | high | high |
| REQ-032 | El sistema exige que la cantidad de una línea de albarán sea mayor que cero. | BR-ALB-05 | critical | high |
| REQ-033 | El sistema exige que la pieza de una línea de pieza exista en el catálogo. | BR-ALB-06 | critical | high |
| REQ-034 | Cuando el usuario no indica el precio de una línea de pieza, el sistema aplica el precio que la pieza tiene en el catálogo. | BR-ALB-06, UC-ALB-03 | high | high |
| REQ-035 | Al añadir una línea de pieza, el sistema descuenta del stock de esa pieza la cantidad consumida, en la misma operación que registra la línea. | BR-ALB-08, UC-ALB-03 | critical | high |
| REQ-036 | El sistema permite añadir a un albarán una línea de mano de obra con las horas trabajadas y su precio por hora. | UC-ALB-04 | critical | high |
| REQ-037 | El sistema exige una descripción del trabajo en toda línea de mano de obra. | BR-ALB-07, UC-ALB-04 | high | high |
| REQ-038 | El sistema permite retirar una línea de un albarán no facturado. | UC-ALB-05 | high | high |
| REQ-039 | Al retirar una línea de pieza, el sistema devuelve al stock de esa pieza la cantidad que se había consumido, en la misma operación que elimina la línea. | BR-ALB-08, UC-ALB-05 | critical | high |
| REQ-040 | El sistema permite modificar el vehículo, la fecha y las notas de un albarán no facturado. | UC-ALB-06 | medium | high |
| REQ-041 | El sistema permite borrar un albarán no facturado junto con todas sus líneas, previa confirmación del usuario. | UC-ALB-07 | medium | high |
| REQ-042 | El sistema impide modificar, borrar o alterar las líneas de un albarán que ya ha sido facturado. | BR-ALB-03, UC-ALB-06, UC-ALB-07 | critical | high |

### 3.5 Facturas

Emisión de facturas agrupando albaranes, con base, IVA y total, y seguimiento del cobro.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-043 | El sistema permite emitir una factura a partir de los albaranes pendientes de facturar de un cliente. | UC-FAC-01 | critical | high |
| REQ-044 | El sistema exige que toda factura agrupe al menos un albarán. | BR-FAC-01, UC-FAC-01 | critical | high |
| REQ-045 | El sistema exige que todos los albaranes de una factura estén pendientes de facturar en el momento de emitirla. | BR-FAC-02, UC-FAC-01 | critical | high |
| REQ-046 | El sistema exige que todos los albaranes de una misma factura pertenezcan al mismo cliente. | BR-FAC-03, UC-FAC-01 | critical | high |
| REQ-047 | Al emitir una factura, el sistema marca sus albaranes como facturados y los enlaza a ella en la misma operación. | BR-FAC-04, UC-FAC-01 | critical | high |
| REQ-048 | El sistema asigna a cada factura un número correlativo anual sin intervención del usuario, con el formato año/F-nnnn. | BR-FAC-09 | high | high |
| REQ-049 | La base de una factura es la suma de la cantidad por el precio de todas las líneas de los albaranes que agrupa, y su total es la base más el IVA. | BR-FAC-05 | critical | high |
| REQ-050 | Cuando el usuario no indica un tipo de IVA al emitir la factura, el sistema aplica el 21 por ciento. | BR-FAC-06, UC-FAC-01 | critical | high |
| REQ-051 | El sistema presenta la base, el IVA y el total de una factura redondeados a dos decimales. | BR-FAC-07 | high | high |
| REQ-052 | El sistema ofrece un listado de facturas en el que cada factura muestra su número, su estado de pago y su total. | UC-FAC-02 | high | high |
| REQ-053 | El detalle de una factura muestra los albaranes que agrupa, la base, el IVA y el total. | UC-FAC-03 | high | high |
| REQ-054 | El sistema permite marcar una factura como pagada o devolverla a pendiente de cobro. | UC-FAC-04 | high | high |
| REQ-055 | El estado de pago de una factura solo puede ser pendiente o pagada. | BR-FAC-08 | high | high |

**Nota sobre REQ-055.** El enunciado se queda en el vocabulario admisible porque
DOC-01 no documenta ninguna consecuencia de que el estado de pago sea otro valor:
BR-FAC-08 solo acota los dos valores posibles, UC-FAC-02 y UC-FAC-03 se limitan a
mostrarlo y ninguna otra regla de facturas decide nada en función de él —no hay
recuento de pendientes de cobro, ni filtro por estado de pago, ni acción que
quede condicionada—. Enunciar aquí qué se vería si el estado fuera un tercer
valor sería inventar comportamiento. Se trasladó al negocio como **Q-14**. La
prioridad sigue siendo `high` por su peso de negocio, que no depende de lo
cómodo que resulte comprobarlo.

**Q-14 ya tiene respuesta (2026-08-16), y aun así este enunciado no cambia.** El
negocio quiere recuento y filtro de facturas pendientes de cobro, pero eso es un
evolutivo pendiente de construir, no algo que el sistema haga hoy. REQ-055 sigue
describiendo el sistema actual y por tanto se queda como está. Lo que la
respuesta sí adelanta es que, **cuando el evolutivo se implemente**, el estado de
pago pasará a tener una consecuencia observable —el recuento y el filtro— y
REQ-055 dejará de ser un requisito de vocabulario sin efecto. Hasta entonces, la
limitación de prueba descrita arriba sigue vigente tal cual.

### 3.6 Personal

Registro de los empleados del taller.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-056 | El sistema ofrece un listado de empleados en el que cada empleado muestra su nombre, su cargo y su contacto. | UC-PER-01 | medium | high |
| REQ-057 | El sistema permite dar de alta un empleado del taller. | UC-PER-02 | high | high |
| REQ-058 | El sistema exige el nombre del empleado tanto al darlo de alta como al modificarlo. | BR-PER-01 | critical | high |
| REQ-059 | La ficha de un empleado muestra sus datos y sus nóminas. | UC-PER-03 | medium | high |
| REQ-060 | El sistema permite modificar los datos de un empleado. | UC-PER-04 | medium | high |
| REQ-061 | El sistema permite dar de baja un empleado previa confirmación del usuario. | UC-PER-05 | medium | high |
| REQ-062 | El sistema impide dar de baja un empleado que tenga nóminas asociadas. | BR-PER-02, UC-PER-05 | critical | high |

### 3.7 Nóminas

Nóminas mensuales por empleado, con el salario neto calculado.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-063 | El sistema ofrece un listado de nóminas ordenado de la más reciente a la más antigua por año y mes. | UC-NOM-01 | medium | high |
| REQ-064 | El sistema permite registrar la nómina de un empleado para un mes y un año, indicando el salario bruto y las deducciones, tanto desde el módulo de nóminas como desde la ficha del empleado. | UC-NOM-02 | critical | high |
| REQ-065 | Toda nómina queda asociada a un empleado que ya existe en el sistema. | BR-NOM-01, UC-NOM-02 | critical | high |
| REQ-066 | El sistema exige empleado, mes y año para registrar o modificar una nómina. | BR-NOM-02 | critical | high |
| REQ-067 | El sistema exige que el mes de una nómina esté comprendido entre 1 y 12. | BR-NOM-03 | high | high |
| REQ-068 | El sistema impide que un empleado tenga más de una nómina para el mismo mes y año. | BR-NOM-04, UC-NOM-02 | critical | high |
| REQ-069 | El detalle de una nómina muestra el salario bruto, las deducciones y el salario neto. | UC-NOM-03 | high | high |
| REQ-070 | El salario neto de una nómina es el salario bruto menos las deducciones, redondeado a dos decimales, y se obtiene en cada consulta a partir de esos dos importes. | BR-NOM-05, UC-NOM-03 | critical | high |
| REQ-071 | El sistema permite modificar los datos de una nómina registrada. | UC-NOM-04 | medium | high |
| REQ-072 | El sistema permite marcar una nómina como pagada o devolverla a pendiente de pago. | UC-NOM-05 | high | high |
| REQ-073 | El estado de pago de una nómina solo puede ser pendiente o pagada. | BR-NOM-06 | high | high |
| REQ-074 | El sistema permite borrar una nómina previa confirmación del usuario, sin ninguna restricción adicional. | UC-NOM-06 | medium | high |

**Nota sobre REQ-073.** Igual que en facturas, el enunciado se queda en el
vocabulario admisible. En nóminas el caso es aún más claro: DOC-01 no solo deja
de documentar recuentos o filtros por estado de pago —UC-NOM-01 ordena el listado
por año y mes, nada más—, sino que además el estado de pago no condiciona ninguna
otra regla, hasta el punto de que una nómina pagada se puede modificar y borrar
igual que una pendiente (REQ-071, REQ-074, Q-11). No hay, por tanto, ninguna
consecuencia observable que arrastre un valor fuera de los dos admitidos. Se
trasladó al negocio como **Q-15**.

**Q-15 ya tiene respuesta (2026-08-16), en el mismo sentido que Q-14**: el taller
quiere recuento y filtro de nóminas pendientes de pago. Vale aquí lo mismo que en
REQ-055: la decisión describe el sistema que se quiere, no el que hay, así que
REQ-073 no cambia. La respuesta a Q-15 **no toca Q-11**, que sigue abierta: que
el taller quiera ver qué nóminas están pendientes no dice nada sobre si una
nómina ya pagada debe poder modificarse o borrarse.

### 3.8 Marco de la aplicación

Idioma y tema de la interfaz, presentes en todas las pantallas.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-075 | El sistema permite al usuario cambiar el idioma de la interfaz entre catalán y castellano en cualquier momento, sin perder el trabajo en curso. | UC-SHL-01 | high | high |
| REQ-076 | La interfaz se presenta en castellano mientras el usuario no elija otro idioma, y su elección se conserva para las siguientes sesiones. | BR-SHL-01, UC-SHL-01 | medium | medium |
| REQ-077 | El sistema permite al usuario cambiar entre tema claro y tema oscuro en cualquier momento. | UC-SHL-02 | medium | high |
| REQ-078 | La interfaz adopta el tema que prefiere el equipo del usuario mientras este no elija otro, y su elección se conserva para las siguientes sesiones. | BR-SHL-02, UC-SHL-02 | low | medium |

### 3.9 Configuración

Sección prevista en el menú y todavía sin desarrollar.

| REQ | Enunciado | Anclas origen | Prioridad | Confianza |
|---|---|---|---|---|
| REQ-079 | La sección de Configuración informa al usuario de que el módulo está pendiente de desarrollo. | UC-SHL-03 | low | high |

## 4. Reglas transversales

No hay ningún requisito huérfano de módulo: todos los de este documento tienen un
módulo propietario. Sí hay requisitos cuyo cumplimiento **cruza la frontera de su
módulo**, porque su efecto se observa en otro. Se listan aquí para que quien
cambie uno de los dos módulos implicados sepa que el otro le afecta.

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
| REQ-062 | personal | nomines | La existencia de nóminas condiciona la baja del empleado |
| REQ-075 a REQ-078 | shell | todos | Idioma y tema afectan a todas las pantallas de la aplicación |

Dos comportamientos transversales merecen una nota adicional:

- **Integridad de las operaciones dobles.** REQ-035, REQ-039 y REQ-047 exigen que
  dos efectos ocurran juntos: registrar la línea y mover el stock, o emitir la
  factura y marcar sus albaranes. Para el negocio, la mitad de esas operaciones
  no es un resultado aceptable: o pasan las dos cosas o no pasa ninguna.
- **Ausencia de requisitos de acceso.** El sistema no identifica a quien lo usa
  (DOC-01, apartado 2). No se emite ningún requisito de autenticación,
  autorización ni traza de quién hizo qué, porque ninguna ancla de DOC-01 lo
  sostiene. Si el negocio lo espera, es un hueco de DOC-01 y no un requisito que
  A-02 pueda inventar.

## 5. Trazabilidad de anclas

Las 77 anclas `UC-nnn` y `BR-nnn` de DOC-01 y los requisitos que han generado.

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
| UC-ALB-06 | Modificar la cabecera de un albarán | REQ-040, REQ-042 |
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

**Anclas sin requisito derivado: ninguna.** Las 40 anclas `UC-nnn` y las 37
`BR-nnn` de DOC-01 han producido al menos un requisito. Conviene entender por qué
la cobertura es total y qué significa, porque una cobertura del 100 % puede
esconder tanto como una incompleta:

- DOC-01 documenta un sistema **ya construido**, no un catálogo de intenciones.
  Cada ancla describe un comportamiento que hoy existe, así que ninguna se queda
  fuera por «no aplicable» o «aún no decidido».
- El único caso discutible es **UC-SHL-03 · Acceder a Configuración**, cuyo módulo
  no está desarrollado. Se ha emitido igualmente REQ-079 porque el comportamiento
  actual —avisar de que la sección está pendiente— es real y verificable. Lo que
  falta no es el requisito, sino saber qué debe contener el módulo: eso es Q-04.
- La cobertura total **no significa que el sistema esté completo**. Significa que
  todo lo que DOC-01 vio está enunciado como requisito. Los huecos detectados
  —importes sin acotar, nóminas pagadas modificables, facturas no anulables— no
  aparecen aquí como requisitos, porque A-02 no inventa requisitos: aparecen en el
  apartado 6 como preguntas, unas todavía abiertas y otras ya respondidas y
  pendientes de evolutivo. Que el negocio haya contestado a una pregunta **no
  añade ni cambia ningún requisito de este documento**: el requisito nuevo, si lo
  hay, nacerá en DOC-08 cuando A-06 recoja la decisión.
- Varias anclas generan **más de un requisito** porque agrupaban dos ideas. Es el
  caso de BR-ALB-06 (pieza existente y precio heredado del catálogo, REQ-033 y
  REQ-034), BR-ALB-08 (descuento y devolución de stock, REQ-035 y REQ-039) o
  UC-CLI-05 (la acción de borrar y las dos condiciones que la impiden, REQ-006 a
  REQ-008). Separarlas evita que uno de los dos comportamientos se quede después
  sin prueba.

## 6. Preguntas abiertas y respuestas del negocio

Este documento arrastra **quince preguntas** en total: siete heredadas de DOC-01 y
ocho nacidas en A-02 de contradicciones entre reglas, de comportamientos sin regla
que los gobierne y de términos del glosario marcados como ambiguos. El
2026-08-16 el negocio ha contestado a **seis** de ellas. Ninguna pregunta se borra
nunca de este apartado: cambia de estado y conserva su ID.

**Los tres estados posibles**, y por qué la distinción importa:

| Estado | Qué significa | ¿Cuenta como pregunta abierta? | ¿Genera evolutivo? |
|---|---|---|---|
| `open` | El negocio todavía no ha contestado. No se puede responder leyendo el sistema. | Sí | Se desconoce |
| `answered` + `resolution: gap_confirmed` | El negocio ha contestado y confirma que **el comportamiento actual es un hueco y debe cambiar**. | No | **Sí**, pendiente de A-06 → DOC-08 |
| `answered` + `resolution: as_designed` | El negocio ha contestado y confirma que **el comportamiento actual es intencionado**. El requisito queda validado tal cual. | No | No |

Hoy **no hay ninguna pregunta `as_designed`**: las seis respuestas recibidas son
las seis `gap_confirmed`. Esto tiene una consecuencia práctica que A-05 y A-11
deben leer con cuidado: una pregunta respondida **deja de contar como duda
pendiente de negocio**, pero **el hueco que describe sigue estando en el sistema**
hasta que el evolutivo se implemente. Una respuesta no arregla nada por sí sola;
solo dice hacia dónde hay que ir.

### 6.1 Preguntas abiertas — 9

Siguen sin respuesta del negocio y siguen contando para el Go/No-Go.

| ID | Pregunta | Origen | Requisitos afectados |
|---|---|---|---|
| Q-01 | La pieza guarda un coste además del precio, pero el coste no interviene en ningún cálculo del taller. ¿Es un margen previsto para más adelante o un dato solo informativo? | Heredada de DOC-01/Q-01 | REQ-021, REQ-049 |
| Q-03 | La unidad de medida de la pieza no interviene en ningún cálculo ni validación. ¿Qué uso se le quiere dar? | Heredada de DOC-01/Q-03 | REQ-021, REQ-018 |
| Q-04 | La sección de Configuración aparece en el menú pero no está desarrollada y ninguna especificación describe su contenido. ¿Qué debe contener? | Heredada de DOC-01/Q-04 | REQ-079 |
| Q-05 | El empleado guarda fecha de alta y salario base, pero la nómina no los usa: el bruto se teclea a mano cada mes. ¿Se espera que el salario base proponga el bruto? | Heredada de DOC-01/Q-05 | REQ-064, REQ-069 |
| Q-07 | Los albaranes no tienen ninguna situación intermedia entre pendiente y facturado. ¿El taller trabaja así o falta reflejar un paso real del trabajo? | Heredada de DOC-01/Q-07 | REQ-028, REQ-025 |
| Q-08 | El idioma y el tema por defecto son las dos únicas reglas de DOC-01 que proceden de una especificación y no del comportamiento observado, pese a que DOC-01 declara que todas sus reglas están leídas del sistema. ¿El comportamiento real coincide con lo que describe la especificación? | Nueva (A-02) | REQ-076, REQ-078 |
| Q-09 | El tipo de IVA de una factura se puede indicar al emitirla y solo el valor por defecto está fijado. Ninguna regla acota qué tipos son admisibles. ¿Qué tipos puede aplicar el taller y quién los autoriza? | Nueva (A-02) | REQ-050, REQ-049 |
| Q-11 | Una nómina se puede modificar y borrar sin restricción, incluso después de marcarla como pagada, a diferencia del albarán facturado, que queda bloqueado. ¿Debe bloquearse la nómina pagada? | Nueva (A-02) | REQ-071, REQ-074 |
| Q-13 | El término estado designa a la vez la situación del albarán (pendiente o facturado) y la situación de cobro de facturas y nóminas (pendiente o pagada). El glosario lo marca como ambiguo. ¿Con qué nombres deben aparecer ambos conceptos en la interfaz y en los filtros? | Nueva (A-02) | REQ-025, REQ-052, REQ-055, REQ-073 |

Estas nueve preguntas afectan a **16 requisitos**: REQ-018, REQ-021, REQ-025,
REQ-028, REQ-049, REQ-050, REQ-052, REQ-055, REQ-064, REQ-069, REQ-071, REQ-073,
REQ-074, REQ-076, REQ-078 y REQ-079.

### 6.2 Preguntas respondidas, pendientes de evolutivo — 6

El negocio contestó las seis el **2026-08-16**. Las seis respuestas van en el
mismo sentido: **el comportamiento actual es un hueco y debe cambiar**. Ninguna
declara intencionado lo que hoy hace el sistema, y por eso **ningún requisito de
este documento se ha reformulado**: los requisitos de la columna «Requisitos que
describen el hueco» siguen siendo la descripción correcta del sistema tal como
está hoy, y lo seguirán siendo hasta que el evolutivo se implemente.

| ID | Requisitos que describen el hueco | Decisión de negocio (2026-08-16) | Alcance del evolutivo |
|---|---|---|---|
| Q-02 | REQ-035, REQ-019 | **Bloquear.** No se puede añadir una línea de pieza si no hay existencias suficientes. El stock deja de poder quedar negativo. | Medio |
| Q-06 | REQ-043, REQ-047, REQ-042 | **Factura rectificativa.** Para corregir una factura emitida por error se emite una factura nueva que anula la anterior; ambas quedan en el histórico. La inmutabilidad de la factura original no se toca. | **Grande** — entidad nueva, numeración propia, afecta al cálculo de totales |
| Q-10 | REQ-040, REQ-046 | **Impedir cambiar de cliente.** Se podrá corregir el vehículo de un albarán no facturado dentro del mismo cliente, pero no mover el albarán a otro cliente. | Pequeño |
| Q-12 | REQ-019, REQ-022, REQ-034, REQ-036 | **Bloquear los importes negativos.** El precio, el coste y el stock de una pieza, el precio de una línea de albarán y el precio por hora de la mano de obra deben ser siempre positivos. | Medio |
| Q-14 | REQ-055, REQ-052, REQ-054 | **Debe haber recuento y filtro de facturas pendientes de cobro.** El taller quiere ver qué tiene pendiente de cobrar. | Medio |
| Q-15 | REQ-073, REQ-063, REQ-072 | **Igual que Q-14 en nóminas**: recuento y filtro de nóminas pendientes de pago. | Medio |

Estas seis preguntas afectan a **16 requisitos**: REQ-019, REQ-022, REQ-034,
REQ-035, REQ-036, REQ-040, REQ-042, REQ-043, REQ-046, REQ-047, REQ-052, REQ-054,
REQ-055, REQ-063, REQ-072 y REQ-073. Tres de ellos —REQ-052, REQ-055 y REQ-073—
siguen además señalados por Q-13, que continúa abierta, así que **no quedan
libres de duda**.

**Dos matices sobre el alcance de lo respondido**, para que nadie lea de más:

- **Q-14 y Q-15 se contestaron en su parte operativa**, no en toda su extensión.
  La pregunta tenía dos mitades: qué recuento o filtro espera el negocio —eso
  está contestado— y qué debería ver el taller si el estado de pago acabara
  teniendo un valor que no sea ni pendiente ni pagada —eso no se ha contestado
  literalmente—. La segunda mitad, sin embargo, deja de ser un problema práctico
  con la decisión tomada: en cuanto exista un recuento y un filtro de pendientes,
  el estado de pago tendrá por fin una consecuencia observable y REQ-055 y
  REQ-073 se podrán comprobar de verdad. Hasta que el evolutivo no exista, la
  limitación de prueba descrita en los apartados 3.5 y 3.7 sigue en pie.
- **Q-15 no responde a Q-11.** Que el taller quiera ver qué nóminas tiene
  pendientes de pagar no dice nada sobre si una nómina ya pagada debe poder
  modificarse o borrarse. Q-11 sigue abierta y hay que preguntarla aparte.

**Quién recoge estas decisiones.** Las seis generan una petición de evolutivo que
entra por la **Fase 2**: A-06 las recoge y las convierte en requisitos TO-BE en
**DOC-08**. A-02 no escribe DOC-08 ni inventa aquí el requisito futuro; su trabajo
es dejar la decisión trazada, con su alcance y con los requisitos AS-IS a los que
sustituirá. En el bloque estructurado eso está en los campos `answer`,
`evolutivo` y `describes_gap_in` de cada pregunta respondida.

### 6.3 Cómo leer este apartado en las fases siguientes

En el bloque estructurado cada pregunta sigue declarando un único requisito en
`blocks` —el más directamente afectado, para no romper el contrato de salida— y
ahora declara además la lista completa en `affects_requirements`, que es la que
debe usar A-05 al montar la matriz de trazabilidad. La columna «Requisitos
afectados» de las tablas de arriba es esa misma lista.

**Un requisito señalado por una pregunta, abierta o respondida, no es un requisito
inválido.** Describe lo que el sistema hace hoy y se puede probar tal cual; lo que
está en duda, o ya decidido pero no construido, es si eso es lo que el negocio
quiere. A-03 puede seguir diseñando pruebas sobre todos ellos. La diferencia
entre los dos grupos es el tipo de aviso:

- Los requisitos señalados solo por preguntas **abiertas** —los 13 siguientes:
  REQ-018, REQ-021, REQ-025, REQ-028, REQ-049, REQ-050, REQ-064, REQ-069,
  REQ-071, REQ-074, REQ-076, REQ-078 y REQ-079— pueden cambiar de enunciado en
  cualquier dirección, o no cambiar en absoluto, en cuanto el negocio conteste.
- Los requisitos señalados por preguntas **respondidas** —los 16 del apartado
  6.2— van a cambiar en un sentido **ya conocido**, pero no todavía: hoy siguen
  siendo verdad y sus pruebas siguen siendo válidas. Cuando A-06 publique DOC-08,
  las pruebas que cuelgan de ellos dejarán de describir el comportamiento
  esperado y habrá que revisarlas. Vale la pena que A-03 lo sepa ahora, porque es
  trabajo previsible y no una sorpresa.

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
# Esquema de open_questions, ampliado en 1.2.0 y compatible hacia atrás:
#   status  : open | answered           -> solo `open` cuenta como pregunta abierta
#   resolution (solo si answered):
#             gap_confirmed             -> el negocio confirma que es un hueco y debe cambiar
#             as_designed               -> el negocio confirma que es intencionado
#   answer, answered_on, answered_by    -> la decisión de negocio y su fecha
#   describes_gap_in                    -> requisitos AS-IS que describen el hueco
#   affects_requirements                -> lista completa de requisitos tocados (`blocks` sigue
#                                          siendo uno solo, por compatibilidad)
#   gap_open_until_implemented          -> true mientras el evolutivo no esté construido
#   evolutivo                           -> alcance y destino de la petición derivada
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
    gap_open_until_implemented: true
    evolutivo:
      scope: small
      status: pending
      owner: A-06
      target_doc: DOC-08
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
open_questions_summary:
  total: 15
  open: 9
  answered: 6
  answered_gap_confirmed: 6
  answered_as_designed: 0
  pending_evolutivo: 6
  last_answered_on: 2026-08-16
  requirements_affected_by_open: 16
  requirements_affected_by_answered: 16
  requirements_affected_total: 29
```
