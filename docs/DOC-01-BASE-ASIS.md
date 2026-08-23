---
doc_id: DOC-01
doc_name: DOC-01-BASE-ASIS
version: 1.1.0
status: draft
history: DOC-01-BASE-ASIS-HIST.md
generator: S-01 skill-doc-base
generator_version: "2.0"
generated_at: 2026-08-23T00:38:21+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: 90b24b861bd4d0a366e1dab28308868e7190ae9d
  working_tree_clean: false   # specs/, docs/, TRIATGE-DOC-14.md y ficheros de sesion sin versionar en el ambito de este ciclo
inputs:
  - id: registro-ids.json
    present: true
    hash: sha256:9f5b3679a537ad7e9399ba6ef61d99518a3308957cac29977fae5b3f12a1d1c5
---

# DOC-01 · Base AS-IS — app-taller

> Verdad de negocio. Todo lo que aquí se describe se entiende sin saber
> programar. La verdad técnica está en `DOC-02-TECNICA.md`.

## 1. Propósito y descripción general

**app-taller** es la aplicación de gestión de un taller mecánico. Cubre el ciclo
completo del trabajo del taller, desde que entra un vehículo de un cliente hasta
que se cobra la factura, más la gestión del personal y sus nóminas.

El ciclo central encadena cuatro conceptos:

**Cliente → Vehículo → Albarán → Factura**

Un cliente tiene uno o varios vehículos. Cada intervención sobre un vehículo se
recoge en un **albarán**, donde se anotan las piezas utilizadas y las horas de
mano de obra. Cuando hay uno o varios albaranes pendientes de un mismo cliente,
se agrupan en una **factura**, que calcula la base, el IVA y el total, y que se
marca como pagada cuando el cliente paga.

En paralelo, y sin conexión con el ciclo anterior, la aplicación mantiene el
**catálogo de piezas con su stock** (que se descuenta solo al consumirlas en un
albarán) y el **personal del taller con sus nóminas** mensuales.

Es una aplicación **local, para un único puesto de trabajo**, en catalán y
castellano. No tiene login ni usuarios: es una decisión explícita del proyecto,
no una carencia (SPEC 01, «Fuera de alcance»).

**Estado actual:** siete de los ocho módulos del menú están implementados de
punta a punta. El octavo, *Configuración*, aparece en el menú como pendiente.

## 2. Actores, usuarios y roles

El sistema **no tiene autenticación ni roles**. Es una decisión de diseño
documentada: «l'app és local i sense login» (SPEC 01). Por tanto existe un único
actor, sin distinción de permisos: quien abre la aplicación puede hacer todo.

| Ancla | Actor | Tipo | Qué hace en el sistema | Confianza |
|---|---|---|---|---|
| ACT-01 | Personal del taller | Humano | Único usuario. Gestiona clientes, vehículos, piezas, albaranes, facturas, personal y nóminas sin restricción de permisos. | Alta |

**Consecuencia para las fases siguientes:** no hay ningún caso de uso que dependa
del rol, y no hay ningún vector de prueba de autorización. Si en algún momento se
añade login, todos los casos de uso de este documento cambian de premisa.

## 3. Casos de uso y flujos funcionales

Convención de este apartado: cada módulo abre con una tabla que lista **todos**
sus casos de uso con su ancla estable. Después, solo los casos que tienen
comportamiento de negocio propio (más allá del alta/consulta/modificación/baja
habitual) llevan un flujo detallado. Las anclas `UC-nnn` son la semilla que A-02
usará para crear los `REQ-nnn`: no cambian entre ejecuciones.

### 3.1 Clientes

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-CLI-01 | Consultar el listado de clientes | El usuario entra en *Clientes* | Ve la lista con búsqueda por nombre, ordenación por columna y paginación |
| UC-CLI-02 | Dar de alta un cliente | El usuario pulsa *Nuevo cliente* | Queda registrado un cliente nuevo |
| UC-CLI-03 | Consultar la ficha de un cliente | El usuario abre un cliente del listado | Ve sus datos, sus vehículos y sus facturas |
| UC-CLI-04 | Modificar un cliente | El usuario edita una ficha | Los datos quedan actualizados |
| UC-CLI-05 | Borrar un cliente | El usuario confirma el borrado | El cliente desaparece, salvo que tenga vehículos o facturas asociados |

### 3.2 Vehículos

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-VEH-01 | Consultar el listado de vehículos | El usuario entra en *Vehículos* | Ve la lista con búsqueda, ordenación y paginación |
| UC-VEH-02 | Dar de alta un vehículo de un cliente | El usuario pulsa *Nuevo vehículo*, desde el menú o desde la ficha del cliente | El vehículo queda asociado a un cliente |
| UC-VEH-03 | Consultar la ficha de un vehículo | El usuario abre un vehículo | Ve sus datos, su cliente y sus albaranes |
| UC-VEH-04 | Modificar un vehículo | El usuario edita la ficha | Los datos quedan actualizados |
| UC-VEH-05 | Borrar un vehículo | El usuario confirma el borrado | El vehículo desaparece, salvo que tenga albaranes asociados |

### 3.3 Piezas

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-PEC-01 | Consultar el catálogo de piezas | El usuario entra en *Piezas* | Ve el catálogo con referencia, precio y stock actual |
| UC-PEC-02 | Dar de alta una pieza | El usuario pulsa *Nueva pieza* | La pieza entra en el catálogo con su stock inicial |
| UC-PEC-03 | Consultar la ficha de una pieza | El usuario abre una pieza | Ve referencia, precio, coste, unidad, proveedor y stock |
| UC-PEC-04 | Modificar una pieza | El usuario edita la ficha | Los datos quedan actualizados |
| UC-PEC-05 | Borrar una pieza | El usuario confirma el borrado | La pieza desaparece, salvo que se haya usado en algún albarán |

### 3.4 Albaranes

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-ALB-01 | Consultar el listado de albaranes | El usuario entra en *Albaranes* | Ve la lista, filtrable por vehículo, cliente y estado |
| UC-ALB-02 | Abrir un albarán para un vehículo | El usuario pulsa *Nuevo albarán*, desde el menú o desde la ficha del vehículo | Se crea un albarán numerado, en estado *pendiente*, sin líneas |
| UC-ALB-03 | Añadir una línea de pieza | El usuario elige una pieza y una cantidad | La línea se añade y el stock de la pieza baja |
| UC-ALB-04 | Añadir una línea de mano de obra | El usuario describe el trabajo y las horas | La línea se añade con su precio por hora |
| UC-ALB-05 | Retirar una línea | El usuario elimina una línea | La línea desaparece y, si era de pieza, el stock se devuelve |
| UC-ALB-06 | Modificar la cabecera de un albarán | El usuario edita vehículo, fecha o notas | Los datos quedan actualizados, salvo que ya esté facturado |
| UC-ALB-07 | Borrar un albarán | El usuario confirma el borrado | El albarán y sus líneas desaparecen, salvo que ya esté facturado |

**Flujo detallado — UC-ALB-03 · Añadir una línea de pieza**

1. El usuario abre un albarán que **no** esté facturado.
2. Elige *pieza* como tipo de línea y selecciona una pieza del catálogo.
3. Indica la cantidad. Debe ser mayor que cero.
4. Si no informa precio, el sistema toma el precio de catálogo de la pieza.
5. La línea queda registrada y **el stock de la pieza se descuenta en la misma
   operación**: o se hacen las dos cosas o no se hace ninguna.

**Flujo detallado — UC-ALB-05 · Retirar una línea**

1. El usuario abre un albarán que **no** esté facturado.
2. Elimina una línea concreta.
3. Si la línea era de pieza, la cantidad **vuelve al stock** en la misma
   operación. Si era de mano de obra, no hay efecto sobre el stock.

### 3.5 Facturas

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-FAC-01 | Emitir una factura agrupando albaranes | El usuario pulsa *Nueva factura* y elige albaranes pendientes | Se emite una factura numerada y los albaranes pasan a *facturado* |
| UC-FAC-02 | Consultar el listado de facturas | El usuario entra en *Facturas* | Ve la lista con número, estado de pago y total |
| UC-FAC-03 | Consultar el detalle de una factura | El usuario abre una factura | Ve los albaranes agrupados, la base, el IVA y el total |
| UC-FAC-04 | Marcar una factura como pagada o pendiente | El usuario acciona el conmutador de pago | El estado de pago queda actualizado |

**Flujo detallado — UC-FAC-01 · Emitir una factura agrupando albaranes**

1. El usuario elige un cliente y ve sus albaranes en estado *pendiente*.
2. Selecciona uno o más. Al menos uno es obligatorio.
3. El sistema comprueba que todos existen, que todos están pendientes y que
   **todos pertenecen al mismo cliente**.
4. Asigna un número de factura y aplica el IVA indicado; si no se indica, el 21%.
5. En una sola operación, crea la factura y marca todos los albaranes como
   *facturado*, enlazándolos a ella.
6. A partir de ese momento esos albaranes ya no se pueden modificar ni borrar.

**Nota sobre la vida de la factura:** el sistema permite emitir una factura y
cambiar su estado de pago, pero **no permite modificarla ni anularla**. Una vez
emitida, sus albaranes quedan bloqueados de forma permanente. Ver Q-06.

### 3.6 Personal

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-PER-01 | Consultar el listado de empleados | El usuario entra en *Personal* | Ve la lista con nombre, cargo y contacto |
| UC-PER-02 | Dar de alta un empleado | El usuario pulsa *Nuevo empleado* | El empleado queda registrado |
| UC-PER-03 | Consultar la ficha de un empleado | El usuario abre un empleado | Ve sus datos y sus nóminas |
| UC-PER-04 | Modificar un empleado | El usuario edita la ficha | Los datos quedan actualizados |
| UC-PER-05 | Borrar un empleado | El usuario confirma el borrado | El empleado desaparece, salvo que tenga nóminas asociadas |

### 3.7 Nóminas

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-NOM-01 | Consultar el listado de nóminas | El usuario entra en *Nóminas* | Ve la lista ordenada por año y mes descendente |
| UC-NOM-02 | Registrar la nómina de un empleado | El usuario pulsa *Nueva nómina*, desde el menú o desde la ficha del empleado | Queda registrada la nómina de ese empleado para ese mes y año |
| UC-NOM-03 | Consultar el detalle de una nómina | El usuario abre una nómina | Ve bruto, deducciones y el **salario neto calculado** |
| UC-NOM-04 | Modificar una nómina | El usuario edita la ficha | Los datos quedan actualizados |
| UC-NOM-05 | Marcar una nómina como pagada o pendiente | El usuario acciona el conmutador de pago | El estado de pago queda actualizado |
| UC-NOM-06 | Borrar una nómina | El usuario confirma el borrado | La nómina desaparece, sin restricciones |

**Flujo detallado — UC-NOM-02 · Registrar la nómina de un empleado**

1. El usuario elige un empleado existente, un mes (1–12) y un año.
2. El sistema comprueba que **no exista ya** una nómina de ese empleado para ese
   mes y año. Si existe, la rechaza.
3. Informa el salario bruto y las deducciones.
4. El sistema muestra el **salario neto** como bruto menos deducciones. No lo
   almacena: lo calcula cada vez que se consulta.

### 3.8 Marco de la aplicación

| Ancla | Caso de uso | Disparador | Resultado |
|---|---|---|---|
| UC-SHL-01 | Cambiar el idioma de la interfaz | El usuario usa el selector de idioma | La interfaz pasa a catalán o castellano sin recargar, y la elección se recuerda |
| UC-SHL-02 | Cambiar el tema claro/oscuro | El usuario usa el conmutador de tema | La interfaz cambia de tema y la elección se recuerda |
| UC-SHL-03 | Acceder a Configuración | El usuario entra en *Configuración* | Ve un aviso de «módulo pendiente». **No implementado.** |

## 4. Reglas de negocio

Todas las reglas de esta tabla están leídas del código o de las restricciones de
la base de datos. Ninguna es una suposición.

### Clientes

| Ancla | Regla | Fuente |
|---|---|---|
| BR-CLI-01 | El nombre del cliente es obligatorio | `server/routes/clients.js:24`, `:50` |
| BR-CLI-02 | No se puede borrar un cliente que tenga vehículos asociados | `server/routes/clients.js:78` |
| BR-CLI-03 | No se puede borrar un cliente que tenga facturas asociadas | `server/routes/clients.js:85` |

### Vehículos

| Ancla | Regla | Fuente |
|---|---|---|
| BR-VEH-01 | Un vehículo pertenece siempre a un cliente existente | `server/routes/vehicles.js:29`, `:37` |
| BR-VEH-02 | Marca, modelo y matrícula son obligatorios | `server/routes/vehicles.js:32` |
| BR-VEH-03 | La matrícula es única en todo el sistema | `server/routes/vehicles.js:42` + `002_*.sql:19` |
| BR-VEH-04 | No se puede borrar un vehículo que tenga albaranes asociados | `server/routes/vehicles.js:124` |

### Piezas

| Ancla | Regla | Fuente |
|---|---|---|
| BR-PEC-01 | El nombre de la pieza es obligatorio | `server/routes/peces.js:22`, `:52` |
| BR-PEC-02 | No se puede borrar una pieza usada en algún albarán | `server/routes/peces.js:85` |

### Albaranes

| Ancla | Regla | Fuente |
|---|---|---|
| BR-ALB-01 | Un albarán pertenece siempre a un vehículo existente | `server/routes/albarans.js:55`, `:60` |
| BR-ALB-02 | Un albarán nace en estado *pendiente* | `server/routes/albarans.js:68` |
| BR-ALB-03 | Un albarán facturado no se puede modificar ni borrar, ni tocar sus líneas | `server/routes/albarans.js:81`, `:110`, `:128`, `:186` |
| BR-ALB-04 | Una línea es de *pieza* o de *mano de obra*, sin más opciones | `002_*.sql:53` + `server/routes/albarans.js:134` |
| BR-ALB-05 | La cantidad de una línea debe ser mayor que cero | `server/routes/albarans.js:137` |
| BR-ALB-06 | Una línea de pieza exige una pieza existente; si no se informa precio, se toma el de catálogo | `server/routes/albarans.js:146`, `:150`, `:152` |
| BR-ALB-07 | Una línea de mano de obra exige descripción | `server/routes/albarans.js:155` |
| BR-ALB-08 | Añadir una línea de pieza descuenta el stock; retirarla lo devuelve | `server/routes/albarans.js:168`, `:200` |
| BR-ALB-09 | El número de albarán se genera solo, con formato `año/A-nnnn` | `server/db/numbering.js:16` |

### Facturas

| Ancla | Regla | Fuente |
|---|---|---|
| BR-FAC-01 | Una factura agrupa al menos un albarán | `server/routes/factures.js:57` |
| BR-FAC-02 | Todos los albaranes de una factura deben estar pendientes de facturar | `server/routes/factures.js:68` |
| BR-FAC-03 | Todos los albaranes de una factura deben ser del mismo cliente | `server/routes/factures.js:75` |
| BR-FAC-04 | Al facturar, los albaranes pasan a estado *facturado* y quedan enlazados a la factura | `server/routes/factures.js:93` |
| BR-FAC-05 | La base es la suma de cantidad × precio de todas las líneas de todos sus albaranes; el total es base + IVA | `server/routes/factures.js:8`, `:26`, `:27` |
| BR-FAC-06 | El IVA por defecto es el 21% | `server/routes/factures.js:88` + `002_*.sql:32` |
| BR-FAC-07 | Base, IVA y total se presentan redondeados a dos decimales | `server/routes/factures.js:32-34` |
| BR-FAC-08 | El estado de pago solo puede ser *pendiente* o *pagada* | `server/routes/factures.js:114` |
| BR-FAC-09 | El número de factura se genera solo, con formato `año/F-nnnn` | `server/db/numbering.js:16` |

### Personal

| Ancla | Regla | Fuente |
|---|---|---|
| BR-PER-01 | El nombre del empleado es obligatorio | `server/routes/personal.js:22`, `:52` |
| BR-PER-02 | No se puede borrar un empleado que tenga nóminas asociadas | `server/routes/personal.js:85` |

### Nóminas

| Ancla | Regla | Fuente |
|---|---|---|
| BR-NOM-01 | Una nómina pertenece a un empleado existente | `server/routes/nomines.js:42`, `:79` |
| BR-NOM-02 | Empleado, mes y año son obligatorios | `server/routes/nomines.js:35`, `:72` |
| BR-NOM-03 | El mes debe estar entre 1 y 12 | `server/routes/nomines.js:38`, `:75` |
| BR-NOM-04 | Solo puede existir una nómina por empleado, mes y año | `server/routes/nomines.js:50`, `:89` + `003_*.sql:24` |
| BR-NOM-05 | El salario neto es el bruto menos las deducciones, redondeado a dos decimales. Se calcula, no se almacena | `server/routes/nomines.js:10` |
| BR-NOM-06 | El estado de pago solo puede ser *pendiente* o *pagada* | `server/routes/nomines.js:111` |

### Marco de la aplicación

| Ancla | Regla | Fuente |
|---|---|---|
| BR-SHL-01 | El idioma por defecto es el castellano y la elección del usuario se recuerda entre sesiones | `specs/implemented/SPE-01-esquelet-app-taller.md:33`, `:101` |
| BR-SHL-02 | El tema por defecto sigue la preferencia del sistema operativo, y la elección del usuario se recuerda | `specs/implemented/SPE-01-esquelet-app-taller.md:34`, `:101` |

## 5. Glosario de dominio

El dominio está escrito en catalán. Se conserva el término original porque es el
que aparece en la interfaz, en la base de datos y en el código.

| Término | Definición | ¿Ambiguo? |
|---|---|---|
| Client | Persona o empresa propietaria de uno o más vehículos y destinataria de las facturas | No |
| Vehicle | Vehículo de un cliente, identificado de forma única por su matrícula | No |
| Peça | Artículo del catálogo del taller, con precio, coste y stock | No |
| Albarà | Hoja de trabajo de una intervención sobre un vehículo. Recoge las piezas usadas y la mano de obra. Es el documento previo a la factura | No |
| Línia d'albarà | Cada apunte de un albarán. Es de tipo *peça* o de tipo *ma d'obra* | No |
| Ma d'obra | Trabajo humano facturado por horas, con descripción libre y precio por hora | No |
| Estoc | Unidades disponibles de una pieza. Baja al consumirla en un albarán y sube al retirar la línea | No |
| Factura | Documento de cobro que agrupa uno o más albaranes de un mismo cliente y aplica el IVA | No |
| Base | Suma de cantidad × precio de todas las líneas de los albaranes de una factura, antes de IVA | No |
| Personal / Empleat | Trabajador del taller | No |
| Nòmina | Retribución de un empleado para un mes y año concretos | No |
| Salari brut / Deduccions / Salari net | Importe antes de descuentos / descuentos aplicados / bruto menos deducciones | No |
| **Estat** | En un albarán significa *pendiente / facturado* (situación del documento). En una factura o nómina, el campo con nombre parecido (*estat de pagament*) significa *pendiente / pagada* (situación del cobro). **Son dos conceptos distintos** | **Sí** |
| **Preu vs Cost** (de una pieza) | La aplicación guarda ambos, pero solo *preu* interviene en los cálculos. *Cost* nunca se usa | **Sí** — ver Q-01 |
| **Unitat** (de una pieza) | Campo de texto con valor por defecto `unitat`. No interviene en ningún cálculo ni validación | **Sí** — ver Q-03 |

## 6. Árbol comentado

```
appdani/
├─ client/                 # Todo lo que ve y usa el personal del taller
│  └─ src/
│     ├─ pages/            # Una carpeta por módulo del menú, con listado, ficha y formulario
│     │  ├─ clients/       #   Clientes
│     │  ├─ vehicles/      #   Vehículos
│     │  ├─ peces/         #   Piezas y su stock
│     │  ├─ albarans/      #   Albaranes y sus líneas de pieza y mano de obra
│     │  ├─ factures/      #   Facturas: emisión, totales y estado de pago
│     │  ├─ personal/      #   Empleados del taller
│     │  └─ nomines/       #   Nóminas mensuales
│     ├─ components/       # Piezas visuales comunes: tabla, formulario, confirmación, avisos
│     ├─ locales/          # Los textos de la interfaz en catalán y castellano
│     └─ nav.ts            # Las ocho secciones del menú y cuáles están disponibles
├─ server/
│  ├─ routes/              # Las reglas de negocio de cada módulo
│  └─ db/
│     ├─ migrations/       # Cómo ha ido creciendo el almacén de datos, paso a paso
│     ├─ numbering.js      # La numeración anual de albaranes y facturas
│     └─ seed.js           # Datos de ejemplo para probar la aplicación
├─ data/                   # El fichero con todos los datos reales del taller
└─ specs/                  # Las cinco especificaciones con las que se construyó y se ha ido corrigiendo la aplicación
```

## 7. Cobertura y exclusiones

- **Módulos en el repositorio:** 9
- **Módulos documentados:** 9

Ocho corresponden a las ocho secciones del menú (`client/src/nav.ts`).
*Configuración* está documentado como no implementado, que es su estado real. El
noveno, `shell`, es el marco común de la aplicación: menú, selector de idioma y
conmutador de tema. No es una sección del menú, pero está presente en todas las
pantallas y tiene casos de uso y reglas propias, así que se cuenta como módulo.

| Ruta excluida | Motivo |
|---|---|
| `node_modules/` | Dependencias de terceros. Ignorada en `.gitignore` |
| `client/dist/` | Salida de compilación, regenerable. Ignorada en `.gitignore` |
| `data/` | Datos reales del taller. Ignorada en `.gitignore` |
| `.git/` | Metadatos de control de versiones |
| `package-lock.json` | Bloqueo de versiones. Su contenido relevante está en DOC-02 |

## 8. Suposiciones y preguntas abiertas

| ID | Pregunta o suposición | Bloquea | A quién preguntar |
|---|---|---|---|
| Q-01 | La pieza guarda `cost` además de `preu`, pero `cost` no interviene en ningún cálculo. ¿Es margen previsto para más adelante, o un dato solo informativo? | Glosario, BR-FAC-05 | Negocio |
| Q-03 | El campo `unitat` de la pieza no se usa en ningún cálculo ni validación. ¿Qué uso se le quiere dar? | Glosario | Negocio |
| Q-04 | *Configuración* aparece en el menú pero no está implementado y ningún spec describe su contenido. ¿Qué debe contener? | UC-SHL-03 | Negocio |
| Q-05 | El empleado guarda `data_alta` y `salari_base`, pero la nómina no los usa: el bruto se teclea a mano cada mes. ¿Se espera que el salario base proponga el bruto? | UC-NOM-02, BR-NOM-05 | Negocio |
| Q-06 | Una factura no se puede modificar ni anular, y sus albaranes quedan bloqueados para siempre. ¿Cómo se corrige en el taller una factura emitida por error? | UC-FAC-01, BR-ALB-03 | Negocio |
| Q-07 | Los albaranes no tienen ningún estado intermedio entre *pendiente* y *facturado* (por ejemplo, «en curso» o «cerrado»). ¿El taller trabaja así, o falta reflejar un paso real? | UC-ALB-02, BR-ALB-02 | Negocio |

**La antigua Q-02** («¿stock negativo es decisión consciente o falta una regla?») **ya no es una pregunta abierta**: negocio la resolvió el 2026-08-16 (recogida como `Q-12` en `DOC-04`, alcance «precio, coste y stock de pieza, precio de línea de albarán y precio por hora de mano de obra deben ser siempre positivos»). La decisión existe; su implementación todavía no —está censada como `BUG-003`, abierto, en `docs/DOC-24-BUGS.json`—. No se repite aquí porque repetir una pregunta ya contestada es el error que esta regeneración existe para evitar.

## 9. Bloque estructurado

```yaml inventory
version: 1
project: app-taller

modules:
  - id: clients
    path: client/src/pages/clients
    purpose: Gestión de los clientes del taller y de su relación con vehículos y facturas
    confidence: high
  - id: vehicles
    path: client/src/pages/vehicles
    purpose: Gestión de los vehículos de cada cliente, identificados por matrícula
    confidence: high
  - id: peces
    path: client/src/pages/peces
    purpose: Catálogo de piezas con precio y control de stock
    confidence: high
  - id: albarans
    path: client/src/pages/albarans
    purpose: Hojas de trabajo de cada intervención, con líneas de pieza y de mano de obra
    confidence: high
  - id: factures
    path: client/src/pages/factures
    purpose: Emisión de facturas agrupando albaranes, con cálculo de base, IVA y total
    confidence: high
  - id: personal
    path: client/src/pages/personal
    purpose: Registro de los empleados del taller
    confidence: high
  - id: nomines
    path: client/src/pages/nomines
    purpose: Nóminas mensuales por empleado, con salario neto calculado
    confidence: high
  - id: configuracio
    path: client/src/pages/Placeholder.tsx
    purpose: Sección de configuración prevista en el menú, aún no implementada
    confidence: high
  - id: shell
    path: client/src/components
    purpose: Marco común de la aplicación - menú, idioma y tema - presente en todas las pantallas
    confidence: high

actors:
  - id: ACT-01
    name: Personal del taller
    type: human

use_cases:
  - anchor: UC-CLI-01
    name: Consultar el listado de clientes
    module: clients
    actors: [ACT-01]
    confidence: high
  - anchor: UC-CLI-02
    name: Dar de alta un cliente
    module: clients
    actors: [ACT-01]
    confidence: high
  - anchor: UC-CLI-03
    name: Consultar la ficha de un cliente
    module: clients
    actors: [ACT-01]
    confidence: high
  - anchor: UC-CLI-04
    name: Modificar un cliente
    module: clients
    actors: [ACT-01]
    confidence: high
  - anchor: UC-CLI-05
    name: Borrar un cliente
    module: clients
    actors: [ACT-01]
    confidence: high
  - anchor: UC-VEH-01
    name: Consultar el listado de vehículos
    module: vehicles
    actors: [ACT-01]
    confidence: high
  - anchor: UC-VEH-02
    name: Dar de alta un vehículo de un cliente
    module: vehicles
    actors: [ACT-01]
    confidence: high
  - anchor: UC-VEH-03
    name: Consultar la ficha de un vehículo
    module: vehicles
    actors: [ACT-01]
    confidence: high
  - anchor: UC-VEH-04
    name: Modificar un vehículo
    module: vehicles
    actors: [ACT-01]
    confidence: high
  - anchor: UC-VEH-05
    name: Borrar un vehículo
    module: vehicles
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PEC-01
    name: Consultar el catálogo de piezas
    module: peces
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PEC-02
    name: Dar de alta una pieza
    module: peces
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PEC-03
    name: Consultar la ficha de una pieza
    module: peces
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PEC-04
    name: Modificar una pieza
    module: peces
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PEC-05
    name: Borrar una pieza
    module: peces
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-01
    name: Consultar el listado de albaranes
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-02
    name: Abrir un albarán para un vehículo
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-03
    name: Añadir una línea de pieza
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-04
    name: Añadir una línea de mano de obra
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-05
    name: Retirar una línea
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-06
    name: Modificar la cabecera de un albarán
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-ALB-07
    name: Borrar un albarán
    module: albarans
    actors: [ACT-01]
    confidence: high
  - anchor: UC-FAC-01
    name: Emitir una factura agrupando albaranes
    module: factures
    actors: [ACT-01]
    confidence: high
  - anchor: UC-FAC-02
    name: Consultar el listado de facturas
    module: factures
    actors: [ACT-01]
    confidence: high
  - anchor: UC-FAC-03
    name: Consultar el detalle de una factura
    module: factures
    actors: [ACT-01]
    confidence: high
  - anchor: UC-FAC-04
    name: Marcar una factura como pagada o pendiente
    module: factures
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PER-01
    name: Consultar el listado de empleados
    module: personal
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PER-02
    name: Dar de alta un empleado
    module: personal
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PER-03
    name: Consultar la ficha de un empleado
    module: personal
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PER-04
    name: Modificar un empleado
    module: personal
    actors: [ACT-01]
    confidence: high
  - anchor: UC-PER-05
    name: Borrar un empleado
    module: personal
    actors: [ACT-01]
    confidence: high
  - anchor: UC-NOM-01
    name: Consultar el listado de nóminas
    module: nomines
    actors: [ACT-01]
    confidence: high
  - anchor: UC-NOM-02
    name: Registrar la nómina de un empleado
    module: nomines
    actors: [ACT-01]
    confidence: high
  - anchor: UC-NOM-03
    name: Consultar el detalle de una nómina
    module: nomines
    actors: [ACT-01]
    confidence: high
  - anchor: UC-NOM-04
    name: Modificar una nómina
    module: nomines
    actors: [ACT-01]
    confidence: high
  - anchor: UC-NOM-05
    name: Marcar una nómina como pagada o pendiente
    module: nomines
    actors: [ACT-01]
    confidence: high
  - anchor: UC-NOM-06
    name: Borrar una nómina
    module: nomines
    actors: [ACT-01]
    confidence: high
  - anchor: UC-SHL-01
    name: Cambiar el idioma de la interfaz
    module: shell
    actors: [ACT-01]
    confidence: high
  - anchor: UC-SHL-02
    name: Cambiar el tema claro/oscuro
    module: shell
    actors: [ACT-01]
    confidence: high
  - anchor: UC-SHL-03
    name: Acceder a Configuración
    module: configuracio
    actors: [ACT-01]
    confidence: high
    implemented: false

business_rules:
  - anchor: BR-CLI-01
    statement: El nombre del cliente es obligatorio
    module: clients
    source: server/routes/clients.js:24
    confidence: high
  - anchor: BR-CLI-02
    statement: No se puede borrar un cliente que tenga vehículos asociados
    module: clients
    source: server/routes/clients.js:78
    confidence: high
  - anchor: BR-CLI-03
    statement: No se puede borrar un cliente que tenga facturas asociadas
    module: clients
    source: server/routes/clients.js:85
    confidence: high
  - anchor: BR-VEH-01
    statement: Un vehículo pertenece siempre a un cliente existente
    module: vehicles
    source: server/routes/vehicles.js:37
    confidence: high
  - anchor: BR-VEH-02
    statement: Marca, modelo y matrícula son obligatorios
    module: vehicles
    source: server/routes/vehicles.js:32
    confidence: high
  - anchor: BR-VEH-03
    statement: La matrícula es única en todo el sistema
    module: vehicles
    source: server/db/migrations/002_vehicles_peces_albarans_factures.sql:19
    confidence: high
  - anchor: BR-VEH-04
    statement: No se puede borrar un vehículo que tenga albaranes asociados
    module: vehicles
    source: server/routes/vehicles.js:124
    confidence: high
  - anchor: BR-PEC-01
    statement: El nombre de la pieza es obligatorio
    module: peces
    source: server/routes/peces.js:22
    confidence: high
  - anchor: BR-PEC-02
    statement: No se puede borrar una pieza usada en algún albarán
    module: peces
    source: server/routes/peces.js:85
    confidence: high
  - anchor: BR-ALB-01
    statement: Un albarán pertenece siempre a un vehículo existente
    module: albarans
    source: server/routes/albarans.js:60
    confidence: high
  - anchor: BR-ALB-02
    statement: Un albarán nace en estado pendiente
    module: albarans
    source: server/routes/albarans.js:68
    confidence: high
  - anchor: BR-ALB-03
    statement: Un albarán facturado no se puede modificar ni borrar, ni tocar sus líneas
    module: albarans
    source: server/routes/albarans.js:81
    confidence: high
  - anchor: BR-ALB-04
    statement: Una línea es de pieza o de mano de obra, sin más opciones
    module: albarans
    source: server/db/migrations/002_vehicles_peces_albarans_factures.sql:53
    confidence: high
  - anchor: BR-ALB-05
    statement: La cantidad de una línea debe ser mayor que cero
    module: albarans
    source: server/routes/albarans.js:137
    confidence: high
  - anchor: BR-ALB-06
    statement: Una línea de pieza exige una pieza existente; si no se informa precio, se toma el de catálogo
    module: albarans
    source: server/routes/albarans.js:152
    confidence: high
  - anchor: BR-ALB-07
    statement: Una línea de mano de obra exige descripción
    module: albarans
    source: server/routes/albarans.js:155
    confidence: high
  - anchor: BR-ALB-08
    statement: Añadir una línea de pieza descuenta el stock; retirarla lo devuelve
    module: albarans
    source: server/routes/albarans.js:168
    confidence: high
  - anchor: BR-ALB-09
    statement: El número de albarán se genera solo, con formato año/A-nnnn
    module: albarans
    source: server/db/numbering.js:16
    confidence: high
  - anchor: BR-FAC-01
    statement: Una factura agrupa al menos un albarán
    module: factures
    source: server/routes/factures.js:57
    confidence: high
  - anchor: BR-FAC-02
    statement: Todos los albaranes de una factura deben estar pendientes de facturar
    module: factures
    source: server/routes/factures.js:68
    confidence: high
  - anchor: BR-FAC-03
    statement: Todos los albaranes de una factura deben ser del mismo cliente
    module: factures
    source: server/routes/factures.js:75
    confidence: high
  - anchor: BR-FAC-04
    statement: Al facturar, los albaranes pasan a estado facturado y quedan enlazados a la factura
    module: factures
    source: server/routes/factures.js:93
    confidence: high
  - anchor: BR-FAC-05
    statement: La base es la suma de cantidad por precio de todas las líneas de sus albaranes; el total es base más IVA
    module: factures
    source: server/routes/factures.js:26
    confidence: high
  - anchor: BR-FAC-06
    statement: El IVA por defecto es el 21 por ciento
    module: factures
    source: server/routes/factures.js:88
    confidence: high
  - anchor: BR-FAC-07
    statement: Base, IVA y total se presentan redondeados a dos decimales
    module: factures
    source: server/routes/factures.js:32
    confidence: high
  - anchor: BR-FAC-08
    statement: El estado de pago solo puede ser pendiente o pagada
    module: factures
    source: server/routes/factures.js:114
    confidence: high
  - anchor: BR-FAC-09
    statement: El número de factura se genera solo, con formato año/F-nnnn
    module: factures
    source: server/db/numbering.js:16
    confidence: high
  - anchor: BR-PER-01
    statement: El nombre del empleado es obligatorio
    module: personal
    source: server/routes/personal.js:22
    confidence: high
  - anchor: BR-PER-02
    statement: No se puede borrar un empleado que tenga nóminas asociadas
    module: personal
    source: server/routes/personal.js:85
    confidence: high
  - anchor: BR-NOM-01
    statement: Una nómina pertenece a un empleado existente
    module: nomines
    source: server/routes/nomines.js:42
    confidence: high
  - anchor: BR-NOM-02
    statement: Empleado, mes y año son obligatorios
    module: nomines
    source: server/routes/nomines.js:35
    confidence: high
  - anchor: BR-NOM-03
    statement: El mes debe estar entre 1 y 12
    module: nomines
    source: server/routes/nomines.js:38
    confidence: high
  - anchor: BR-NOM-04
    statement: Solo puede existir una nómina por empleado, mes y año
    module: nomines
    source: server/db/migrations/003_personal_i_nomines.sql:24
    confidence: high
  - anchor: BR-NOM-05
    statement: El salario neto es el bruto menos las deducciones, redondeado a dos decimales, y se calcula sin almacenarse
    module: nomines
    source: server/routes/nomines.js:10
    confidence: high
  - anchor: BR-NOM-06
    statement: El estado de pago solo puede ser pendiente o pagada
    module: nomines
    source: server/routes/nomines.js:111
    confidence: high
  - anchor: BR-SHL-01
    statement: El idioma por defecto es el castellano y la elección del usuario se recuerda entre sesiones
    module: shell
    source: specs/implemented/SPE-01-esquelet-app-taller.md:33
    confidence: high
  - anchor: BR-SHL-02
    statement: El tema por defecto sigue la preferencia del sistema operativo y la elección del usuario se recuerda
    module: shell
    source: specs/implemented/SPE-01-esquelet-app-taller.md:34
    confidence: high

glossary:
  - term: Client
    definition: Persona o empresa propietaria de uno o más vehículos y destinataria de las facturas
    ambiguous: false
  - term: Vehicle
    definition: Vehículo de un cliente, identificado de forma única por su matrícula
    ambiguous: false
  - term: Peça
    definition: Artículo del catálogo del taller, con precio, coste y stock
    ambiguous: false
  - term: Albarà
    definition: Hoja de trabajo de una intervención sobre un vehículo, con las piezas usadas y la mano de obra
    ambiguous: false
  - term: Línia d'albarà
    definition: Cada apunte de un albarán, de tipo peça o de tipo ma d'obra
    ambiguous: false
  - term: Ma d'obra
    definition: Trabajo humano facturado por horas, con descripción libre y precio por hora
    ambiguous: false
  - term: Estoc
    definition: Unidades disponibles de una pieza; baja al consumirla en un albarán y sube al retirar la línea
    ambiguous: false
  - term: Factura
    definition: Documento de cobro que agrupa uno o más albaranes de un mismo cliente y aplica el IVA
    ambiguous: false
  - term: Base
    definition: Suma de cantidad por precio de todas las líneas de los albaranes de una factura, antes de IVA
    ambiguous: false
  - term: Personal
    definition: Trabajador del taller
    ambiguous: false
  - term: Nòmina
    definition: Retribución de un empleado para un mes y año concretos
    ambiguous: false
  - term: Salari net
    definition: Salario bruto menos las deducciones
    ambiguous: false
  - term: Estat
    definition: En el albarán significa pendiente o facturado; en factura y nómina el campo parecido (estat de pagament) significa pendiente o pagada. Son dos conceptos distintos
    ambiguous: true
  - term: Cost
    definition: Coste de la pieza, guardado pero nunca usado en ningún cálculo
    ambiguous: true
  - term: Unitat
    definition: Unidad de medida de la pieza, con valor por defecto unitat; no interviene en cálculos ni validaciones
    ambiguous: true

excluded_paths:
  - path: node_modules/
    reason: Dependencias de terceros, ignoradas en .gitignore
  - path: client/dist/
    reason: Salida de compilación regenerable, ignorada en .gitignore
  - path: data/
    reason: Datos reales del taller, ignorados en .gitignore
  - path: .git/
    reason: Metadatos de control de versiones
  - path: package-lock.json
    reason: Bloqueo de versiones; el contenido relevante está en DOC-02

coverage:
  modules_in_repo: 9
  modules_documented: 9

open_questions:
  - id: Q-01
    question: La pieza guarda cost además de preu, pero cost no interviene en ningún cálculo. ¿Es margen previsto o dato informativo?
    blocks: BR-FAC-05
  - id: Q-03
    question: El campo unitat de la pieza no se usa en ningún cálculo ni validación. ¿Qué uso se le quiere dar?
    blocks: glossary.Unitat
  - id: Q-04
    question: Configuración aparece en el menú pero no está implementado y ningún spec describe su contenido. ¿Qué debe contener?
    blocks: UC-SHL-03
  - id: Q-05
    question: El empleado guarda data_alta y salari_base, pero la nómina no los usa. ¿Se espera que el salario base proponga el bruto?
    blocks: UC-NOM-02
  - id: Q-06
    question: Una factura no se puede modificar ni anular y sus albaranes quedan bloqueados para siempre. ¿Cómo se corrige una factura emitida por error?
    blocks: UC-FAC-01
  - id: Q-07
    question: Los albaranes no tienen estado intermedio entre pendiente y facturado. ¿El taller trabaja así o falta reflejar un paso real?
    blocks: UC-ALB-02
```
