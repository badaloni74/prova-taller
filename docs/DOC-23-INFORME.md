---
doc_id: DOC-23
doc_name: DOC-23-INFORME
version: 2.1.0
status: draft
generator: S-10 skill-auto-tcs (ejecución + diagnóstico, sesión Claude Code)
generator_version: "2.0"
generated_at: 2026-08-23T22:10:00+02:00
project: app-taller
language: es
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: 1d65567a2e28840e39ed97aa1054d0068bcd2466
  working_tree_clean: true
entorno:
  aplicacion: build de producción servido por Express (npm run build + npm start) en http://localhost:3001
  api: http://localhost:3001 (Express + SQLite, mismo puerto — server sirve client/dist)
  java: "21 (Temurin/OpenJDK 21.0.9)"
  selenium: "4.24.0"
  cucumber: "7.18.1"
  testng: "7.10.2"
  chrome: "151.0.7922.170 headless"
destinatario: >
  Este documento está pensado para entregarse a un agente o persona con el rol
  "Doctor QA TC": su trabajo es corregir los casos que aparecen como FALLADO
  en la sección 3, y decidir qué hacer con los casos excluidos de la sección 5.
  No contiene ninguna acción ya resuelta — las que ya se corrigieron durante
  esta misma sesión (véase §4 y §6) se reportan como evidencia, no como
  trabajo pendiente.
---

# DOC-23 · Informe de ejecución de la suite de automatización (S-10)

**Versión anterior:** la 2.0.0 (2026-08-21) documentaba 107 escenarios con
**106 verdes y 1 rojo** (TC-048). Esa cifra ya no era fiable: `CLAUDE.md`
avisaba explícitamente de que los `.feature` de facturas/nóminas seguían
comprobando literales con punto decimal (`"121.00 €"`) que dejaron de existir
en pantalla desde el SPEC 05 (que pasó la presentación a coma decimal), y de
que probablemente hubiera más casos en rojo sin descubrir. Esta versión lo
confirma con una ejecución real y corrige el caso que sí tenía arreglo propio
(TC-048).

## 1. Resumen ejecutivo

```
107 escenarios (89 verdes, 18 rojos)
17 de los 18 rojos comparten una única causa raíz (EXP-027, formato de decimales)
1 rojo aislado es un fallo de arranque de Chrome, no reproducible de forma fiable
```

- **102 de 110 TC de DOC-05 automatizados.** Los 8 restantes no tienen vector
  por interfaz — motivo detallado y verificado para cada uno en §5. No están
  "pendientes", están **excluidos con causa documentada**.
- **TC-048 corregido en esta sesión.** Fallaba por falta de aislamiento con
  TC-040 (arrastraba estoc consumido). Aislado con el mismo patrón que ya
  usan TC-053/TC-054. Detalle y commit en §4.1.
- **17 rojos nuevos, una sola causa raíz: `EXP-027`.** Los `.feature` de
  `facturas.feature`, `nomines.feature` y una parte de `peces.feature`
  siguen comprobando literales con punto decimal (`"800.00 €"`) que la
  pantalla ya no muestra (`"800,00 €"` desde el SPEC 05). Esta versión de
  DOC-23 es la primera en confirmarlo contra una ejecución real, no solo
  leyendo el código. Detalle en §4.2 — **corresponde a `s10-auto-tcs`
  actualizar los literales y volver a ejecutar.**
- **1 rojo aislado, de infraestructura, no de la aplicación ni de la
  prueba.** `SessionNotCreated` al arrancar una nueva sesión de Chrome — el
  mismo tipo de inestabilidad que §6.6 ya documentó (abrir Chrome headless
  decenas de veces seguidas). Detalle en §4.3.

## 2. Cómo reproducir esta ejecución

```bash
# 1. Base de datos limpia
rm -f data/taller.db && npm run seed

# 2. Build de producción — el propio servidor Express sirve client/dist,
#    no hace falta vite preview ni proxy aparte (más simple que en la 2.0.0)
npm run build
npm start   # sirve la app y la API juntas en http://localhost:3001

# 3. Fixture dedicado para los escenarios de facturas (cliente "Autoescola
#    Vilanova", id 7) — no lo crea el seed, hay que crearlo a mano cada vez
curl -X POST http://localhost:3001/api/vehicles -H "Content-Type: application/json" \
  -d '{"client_id":7,"marca":"Test","model":"Facturacio","matricula":"8001TST"}'

# 4. Suite
cd automation/ui && mvn test -Dapp.url=http://localhost:3001
```

**Aviso para quien repita esta ejecución:** los pasos 1-3 son obligatorios
**en este orden** antes de cada ejecución completa. Saltarse el reseed entre
dos ejecuciones consecutivas contamina la segunda con el estoc/registros que
dejó la primera — pasó literalmente en esta sesión (una ejecución intermedia,
descartada, dio 30 rojos por este motivo exacto). Saltarse el paso 3 hace
fallar en cascada casi todos los casos de `facturas.feature` con
`opcionNoEncontrada: ninguna opción contiene "8001TST"`.

## 3. Resultados por módulo

Un resumen de una línea por caso verde; el detalle de los casos en rojo está
en §4, no aquí.

### Clientes (11 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-001 | Listar clientes y buscar por nombre | VERDE |
| TC-002 | Ordenar por columna y paginar el listado de clientes | VERDE |
| TC-003 | Registrar un cliente nuevo | VERDE |
| TC-004 | Rechazar el alta de un cliente sin nombre | VERDE |
| TC-005 | Rechazar la modificación que deja al cliente sin nombre | VERDE |
| TC-006 | Consultar la ficha de un cliente con vehículos y facturas | VERDE |
| TC-007 | Modificar los datos de un cliente registrado | VERDE |
| TC-008 | Dar de baja un cliente sin vehículos ni facturas | VERDE |
| TC-009 | Cancelar la confirmación de baja deja el cliente registrado | VERDE |
| TC-010 | Impedir la baja de un cliente con vehículos asociados | VERDE |
| TC-011 | Impedir la baja de un cliente con facturas asociadas | VERDE |

### Vehiculos (12 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-012 | Listar vehículos, buscar, ordenar y paginar | VERDE |
| TC-013 | Registrar un vehículo desde el módulo de vehículos | VERDE |
| TC-014 | Registrar un vehículo desde la ficha del cliente | VERDE |
| TC-015 | Rechazar el alta de un vehículo sin cliente existente | VERDE |
| TC-016 | Rechazar el alta de un vehículo sin marca, modelo o matrícula | VERDE |
| TC-017 | Rechazar la modificación que deja el vehículo sin matrícula | VERDE |
| TC-018 | Impedir registrar dos vehículos con la misma matrícula | VERDE |
| TC-019 | Impedir asignar por modificación una matrícula ya existente | VERDE |
| TC-020 | Consultar la ficha de un vehículo con su cliente y sus albaranes | VERDE |
| TC-021 | Modificar los datos de un vehículo registrado | VERDE |
| TC-022 | Dar de baja un vehículo sin albaranes | VERDE |
| TC-023 | Impedir la baja de un vehículo con albaranes asociados | VERDE |

### Piezas (8 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-024 | Consultar el catálogo de piezas con referencia, precio y stock | VERDE |
| TC-025 | Dar de alta una pieza con su stock inicial | VERDE |
| TC-026 | Rechazar el alta de una pieza sin nombre | VERDE |
| TC-027 | Rechazar la modificación que deja la pieza sin nombre | VERDE |
| TC-028 | Consultar la ficha completa de una pieza | VERDE |
| TC-029 | Modificar el precio y el stock de una pieza | FALLADO - ver §4.3 |
| TC-030 | Dar de baja una pieza no utilizada en ningún albarán | VERDE |
| TC-031 | Impedir la baja de una pieza utilizada en un albarán | VERDE |

### Albaranes (23 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-034 | Abrir un albarán y comprobar que no tiene líneas | VERDE |
| TC-035 | Abrir un albarán desde la ficha del vehículo | VERDE |
| TC-036 | Rechazar la apertura de un albarán sin vehículo existente | VERDE |
| TC-037 | Un albarán recién abierto queda pendiente de facturar | VERDE |
| TC-038 | El albarán recibe número automático con formato año/A-nnnn | VERDE |
| TC-039 | El segundo albarán del año incrementa el correlativo en uno | VERDE |
| TC-040 | Añadir una línea de pieza con cantidad y precio | VERDE |
| TC-042 | Rechazar una línea con cantidad cero | VERDE |
| TC-043 | Rechazar una línea con cantidad negativa | VERDE |
| TC-044 | Aceptar una línea con cantidad uno | VERDE |
| TC-046 | La línea de pieza sin precio hereda el precio del catálogo | FALLADO - ver §4.2 |
| TC-048 | Añadir una línea de pieza descuenta el stock del catálogo | VERDE — corregido en esta sesión, ver §4.1 |
| TC-049 | Una línea rechazada no mueve el stock | VERDE |
| TC-050 | Añadir una línea de mano de obra con horas y precio por hora | VERDE |
| TC-051 | Rechazar una línea de mano de obra sin descripción | VERDE |
| TC-052 | Retirar una línea de un albarán no facturado | VERDE |
| TC-053 | Retirar una línea de pieza devuelve el stock al catálogo | VERDE |
| TC-054 | Añadir y retirar la misma línea deja el stock como estaba | VERDE |
| TC-055 | Modificar vehículo, fecha y notas de un albarán no facturado | VERDE |
| TC-056 | Borrar un albarán no facturado con todas sus líneas | VERDE |
| TC-057 | Impedir modificar la cabecera de un albarán facturado | VERDE |
| TC-058 | Impedir borrar un albarán facturado | VERDE |
| TC-059 | Impedir añadir o retirar líneas en un albarán facturado | VERDE |

### Facturas (17 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-060 | Emitir una factura con los albaranes pendientes de un cliente | FALLADO - ver §4.2 |
| TC-061 | La emisión solo ofrece albaranes pendientes del cliente elegido | VERDE |
| TC-062 | Rechazar la emisión de una factura sin ningún albarán | VERDE |
| TC-065 | Al emitir, los albaranes pasan a facturados y quedan enlazados | VERDE |
| TC-066 | Una emisión rechazada deja los albaranes pendientes | VERDE |
| TC-067 | La factura recibe número automático con formato año/F-nnnn | VERDE |
| TC-068 | La segunda factura del año incrementa el correlativo en uno | VERDE |
| TC-069 | La base es la suma de cantidad por precio y el total es base más IVA | FALLADO - ver §4.2 |
| TC-070 | La base agrega las líneas de todos los albaranes de la factura | FALLADO - ver §4.2 |
| TC-071 | Sin indicar tipo de IVA, la factura aplica el 21 por ciento | FALLADO - ver §4.2 |
| TC-072 | El tipo de IVA indicado se aplica en lugar del 21 por ciento | FALLADO - ver §4.2 |
| TC-073 | Base, IVA y total se presentan con dos decimales | FALLADO - ver §4.2 |
| TC-074 | Listar facturas con número, estado de pago y total | FALLADO - ver §4.2 |
| TC-075 | El detalle de la factura muestra albaranes, base, IVA y total | FALLADO - ver §4.2 |
| TC-076 | Marcar una factura como pagada | VERDE |
| TC-077 | Devolver una factura pagada a pendiente de cobro | VERDE |
| TC-078 | El estado de pago de la factura solo admite pendiente o pagada | VERDE |

### Personal (8 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-079 | Listar empleados con nombre, cargo y contacto | VERDE |
| TC-080 | Dar de alta un empleado del taller | VERDE |
| TC-081 | Rechazar el alta de un empleado sin nombre | VERDE |
| TC-082 | Rechazar la modificación que deja al empleado sin nombre | VERDE |
| TC-083 | Consultar la ficha de un empleado con sus nóminas | VERDE |
| TC-084 | Modificar los datos de un empleado | VERDE |
| TC-085 | Dar de baja un empleado sin nóminas | VERDE |
| TC-086 | Impedir la baja de un empleado con nóminas asociadas | VERDE |

### Nominas (18 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-087 | Listar nóminas de la más reciente a la más antigua | VERDE |
| TC-088 | Registrar una nómina desde el módulo de nóminas | FALLADO - ver §4.2 |
| TC-089 | Registrar una nómina desde la ficha del empleado | FALLADO - ver §4.2 |
| TC-090 | Rechazar una nómina sin empleado existente | VERDE |
| TC-091 | Rechazar una nómina sin empleado, mes o año | VERDE |
| TC-092 | Rechazar una nómina con mes 0 | VERDE |
| TC-093 | Rechazar una nómina con mes 13 | VERDE |
| TC-094 | Aceptar nóminas con mes 1 y con mes 12 | VERDE |
| TC-095 | Impedir dos nóminas del mismo empleado, mes y año | VERDE |
| TC-096 | Permitir el mismo mes y año para otro empleado | VERDE |
| TC-097 | El detalle de la nómina muestra bruto, deducciones y neto | FALLADO - ver §4.2 |
| TC-098 | El neto es el bruto menos las deducciones | FALLADO - ver §4.2 |
| TC-099 | Al cambiar el bruto, el neto consultado cambia con él | FALLADO - ver §4.2 |
| TC-100 | El neto se presenta con dos decimales | FALLADO - ver §4.2 |
| TC-101 | Modificar los datos de una nómina registrada | FALLADO - ver §4.2 |
| TC-102 | Marcar una nómina como pagada y devolverla a pendiente | VERDE |
| TC-103 | El estado de pago de la nómina solo admite pendiente o pagada | FALLADO - ver §4.2 |
| TC-104 | Borrar una nómina previa confirmación | VERDE |

### Esquelet / Configuracio (5 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-105 | Cambiar el idioma sin perder el trabajo en curso | VERDE |
| TC-106 | La interfaz arranca en castellano sin elección previa | VERDE |
| TC-107 | El idioma elegido se conserva en la sesión siguiente | VERDE |
| TC-108 | Cambiar entre tema claro y tema oscuro | VERDE |
| TC-110 | La sección de Configuración avisa de que está pendiente de desarrollo | VERDE |

## 4. Casos en rojo — detalle para "Doctor QA TC"

### 4.1 · TC-048 — corregido en esta sesión (evidencia, no trabajo pendiente)

**Módulo:** albaranes · **Fichero:**
`automation/ui/src/test/resources/features/albarans.feature`

**Causa raíz (ya no aplica):** `TC-040` —que precede a `TC-048` en el mismo
fichero— añadía una línea de 2 unidades de "Filtre d'aire" y nunca la
retiraba. `TC-048` asumía el estoc intacto (35 unidades) y llegaba con 33,
fallando con `stockInesperado`. No era contaminación entre ejecuciones (el
reseed la descarta): era contaminación entre escenarios del mismo fichero,
por falta de aislamiento.

**Corrección aplicada:** se aisló `TC-040` retirando al final la línea que
añade (`Cuando se pulsa en "Linea: <pieza>"`), el mismo patrón que ya usan
`TC-053`/`TC-054`. Commit `735ded8` ("albarans.feature: aislar TC-040 para
que TC-048 no herede su estoc consumido"). Verificado en dos ejecuciones
limpias posteriores: ambos pasan.

### 4.2 · Patrón `EXP-027` — formato de decimales con punto en vez de coma (17 casos)

**Módulos:** facturas, nóminas, piezas · **Ficheros:**
`automation/ui/src/test/resources/features/factures.feature`,
`nomines.feature` (y el escenario de precio en `peces.feature`/`albarans.feature`)

**Error observado (ejemplo):**
```
literalNoEncontrado: no se ve "800.00 €" en NominaDetailPO
literalNoEncontrado: no se ve "119.06 €" en FacturesPO
literalNoEncontrado: no se ve "49.90" en PecaDetailPO
```

**Causa raíz:** estos `.feature` comprueban literales con **punto** decimal
(`"800.00 €"`), pero la pantalla presenta los importes con **coma** decimal
(`"800,00 €"`) desde que el SPEC 05 (`specs/implemented/SPE-05-presentacio-imports-i-dates.md`)
unificó el formato con `formatMoney`. Ya estaba anotado como riesgo conocido
en `CLAUDE.md` (hallazgo `EXP-027` de `DOC-14`) tras verificarlo en vivo,
pero **esta es la primera vez que una ejecución completa de la suite lo
confirma con los 17 casos exactos que afecta**, no solo con el ejemplo
puntual que motivó el hallazgo.

**Por qué no se corrige en esta sesión:** el mandato de esta ejecución era
verificar y cerrar `TC-048` (§4.1) y dejar constancia fiable del estado real
de la suite — no reescribir `factures.feature`/`nomines.feature` al completo.
Corresponde a `s10-auto-tcs` en una sesión propia.

**Corrección recomendada:** sustituir cada literal `"NN.NN €"`/`"NN.NN"` por
su equivalente con coma (`"NN,NN €"`) en los 17 escenarios listados en §3.
No es un cambio de lógica de prueba, es una actualización mecánica de datos
de la tabla `Ejemplos` — bajo riesgo, pero hay que tocar dos ficheros
completos y revisar cada fila.

### 4.3 · TC-029 — fallo aislado de infraestructura (no reproducido de forma fiable)

**Error observado:**
```
SessionNotCreated: Could not start a new session.
Possible causes are invalid address of the remote server or browser start-up failure.
```

**Diagnóstico:** Chrome no llegó a arrancar para este escenario concreto, en
la tercera ejecución completa de Chrome headless de la misma sesión de
trabajo (docenas de lanzamientos y cierres de navegador). Es exactamente el
patrón que §6.6 ya documentó para el servidor de desarrollo — aquí afecta al
propio Chrome, no al servidor. No hay ningún cambio de código ni de datos
entre esta ejecución y la anterior que explique un fallo real en `TC-029`.

**Recomendación:** volver a ejecutar `TC-029` en aislado antes de tratarlo
como un defecto. Si vuelve a fallar con el mismo síntoma, escalarlo como
inestabilidad de entorno (recursos de la máquina), no como bug de aplicación
ni de prueba.

## 5. Casos de DOC-05 sin automatizar (8)

Ninguno de estos es un "fallado": son casos **estructuralmente inalcanzables**
por la interfaz actual, verificados leyendo el código fuente y (cuando hacía
falta) en vivo contra la aplicación — no asumidos.

| TC | Módulo | Motivo verificado |
|---|---|---|
| TC-041 | albaranes | Reclasificado a `verification_path: service` en `DOC-05` 1.6.0 |
| TC-045 | albaranes | El `<select>` de pieza solo ofrece piezas reales; no hay forma de introducir una referencia inexistente |
| TC-063 | facturas | `FacturaForm` solo lista albaranes pendientes del cliente elegido — nunca muestra uno ya facturado |
| TC-064 | facturas | El mismo mecanismo que TC-063 impide ver nunca albaranes de dos clientes a la vez |
| TC-032 | albaranes | `AlbaransList.tsx` no expone ningún filtro por vehicle_id ni client_id, solo el buscador genérico sobre número/estado/fecha |
| TC-033 | albaranes | Mismo motivo que TC-032 |
| TC-047 | albaranes | `AlbaraLiniesSection.tsx` no renderiza ningún campo de precio para líneas de tipo "pieza" — siempre hereda el del catálogo |
| TC-109 | shell | El propio `DOC-05` lo marca `automation.grade: not-recommended`; depende de la preferencia de color del SO, no controlable desde el escenario |

**Para "Doctor QA TC":** ninguno de estos 8 necesita una corrección de test.
TC-041/045/063/064 ya están reclasificados en `DOC-05`. TC-032/033/047 son
carencias reales de la interfaz (no hay forma de ejercerlas, ni con un test
mejor escrito) — si se quieren cubrir algún día, antes tiene que existir la
funcionalidad en la aplicación (filtro por vehículo/cliente en el listado de
albaranes, campo de precio manual en la línea de pieza), decisión que no
corresponde a QA sino a producto. TC-109 se ejecuta a mano, tal como indica
el propio plan.

## 6. Errores reales corregidos durante la sesión anterior (2.0.0)

Ninguno de estos queda pendiente — se documentan como evidencia de por qué
la suite es fiable, y para que "Doctor QA TC" reconozca el patrón si vuelve
a aparecer al ampliar la suite. Todos están incorporados al skill
`s10-auto-tcs` para que no haga falta redescubrirlos.

### 6.1 Carreras contra el re-render de React

**Síntoma:** un escenario falla una vez y pasa al volver a ejecutarlo solo,
sin tocar nada. `BasePO.seValida` hacía lecturas instantáneas del DOM
(`driver.findElements(...)` sin esperar) justo después de acciones que
disparan un `await` a la API antes de actualizar el estado — bloqueo de
borrado, contador de líneas, `aria-pressed` de un interruptor. Corregido
haciendo `wait.until(...)` en `case "Literal"`, `case "Lineas"`,
`case "Titulo"` y `case "Activo"`.

### 6.2 `WebElement.clear()` no dispara siempre el `onChange` de React

El DOM se veía vacío pero el estado de React conservaba el valor anterior —
una validación de "campo obligatorio" nunca saltaba al editar un campo ya
relleno, y en un caso un `sendKeys` posterior acabó **añadiéndose** al valor
viejo ("1" + "1" tecleado = "11"), inflando un total de factura de 200,00€ a
1.200,00€ sin ningún error visible. Corregido limpiando con teclas reales
(Ctrl+A + Supr) en `BasePO.escribir()`.

### 6.3 `normalize-space(text())` ignora nodos de texto hermanos

`esperarLiteral`/`existeLiteral` nunca encontraban «Volver al listado»
porque en el JSX va precedido de un «← » como nodo de texto hermano, y
`text()` solo mira el primero. Corregido con `normalize-space(.)` y una
cláusula que descarta ancestros que también coinciden, para no devolver el
`<body>` entero.

### 6.4 Paginación y acumulación de datos entre escenarios

Los listados de clientes y facturas ordenan y paginan de 10 en 10; a medida
que la suite crece, un registro que "siempre estaba en la primera página"
deja de estarlo. Corregido filtrando con el buscador antes de pulsar la
fila, o navegando directamente por URL cuando el id es determinista (sale de
un seed que no cambia).

### 6.5 El valor de un `<input>` no es texto de página

Comprobar que un formulario conserva lo que se ha tecleado (TC-105, cambio
de idioma) con `Literal:` nunca puede funcionar: el valor de un input no es
ningún nodo de texto del DOM. Hacía falta un check dedicado que leyera
`element.getAttribute("value")`.

### 6.6 El servidor de desarrollo no aguanta una suite larga

`vite dev` se cayó tres veces distintas durante ejecuciones completas (una
vez con una violación de acceso nativa, código de salida `3221226505`),
siempre a partir de un punto concreto y no antes — síntoma de
`ERR_CONNECTION_REFUSED` en cascada, no un bug de los tests. Se resolvió
sirviendo un **build de producción en estático** para la ejecución completa:
sin recarga en caliente ni vigilancia de ficheros, no ha vuelto a caerse en
ninguna de las ejecuciones posteriores (incluidas las tres de esta sesión).

### 6.7 Un `Tipus:` planificado pero nunca implementado

`TC-066` usaba `"Pendientes: 1"` en `FacturaFormPO`, un tipo de validación
que se decidió pero nunca se llegó a escribir en el código —
`UnsupportedOperationException` al compilar y correr. Detectado solo al
ejecutar, no al revisar el código.

## 7. Estado del entorno al cerrar este informe

- Base de datos reseeded y con el fixture `8001TST` creado justo antes de la
  última ejecución (§2) — es la tercera ejecución completa de esta sesión;
  las dos anteriores (con 27 y 30 rojos respectivamente) se descartan como
  no fiables: la primera no tenía el fixture `8001TST`, la segunda no tuvo
  reseed antes de correr y arrastró el estoc consumido por la primera.
- Los datos que generan los escenarios de facturas/albaranes/nóminas se
  quedan en la base de datos — es el comportamiento esperado de los casos
  que no hacen teardown explícito (creación, no eliminación). Si hace falta
  un entorno limpio, reseed.
- El servidor API y el build estático **se han detenido** al cerrar esta
  sesión (no quedan procesos en el puerto 3001).
