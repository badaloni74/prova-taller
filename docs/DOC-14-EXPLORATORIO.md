---
id: DOC-14
version: 1.0.0
hash: null
status: draft
generator: A-10 explorador QA
from:
  - id: DOC-05-PLAN-PRUEBAS.md
    version: 1.6.0
    present: true
  - id: automation/ui/**/*.feature
    version: null
    present: true
  - id: DOC-23-INFORME.md
    version: null
    present: true
  - id: DOC-04-FUNCIONAL.md
    version: 1.1.0
    present: true
  - id: DOC-06-MANUAL-USUARIO.md
    version: 1.0.0
    present: true
  - id: DOC-24-BUGS.json
    version: 1.0.0
    present: true
  - id: DOC-16-ROADMAP.md
    version: null
    present: true
  - id: DOC-14-EXPLORATORIO.md
    version: null
    present: false
---

# DOC-14 · Informe de exploración QA · app-taller

## Procedencia

**Contra qué se ha explorado.** Repositorio `C:\Claude\AppDani`, rama `master`,
commit `83a95c5623a68ffd4cb2082c7d6c1edd2e111633`. El árbol de trabajo no tiene
ningún fichero de la aplicación modificado: los cuatro ficheros sin versionar
(`ApuntsAgentsISkills.txt`, `bash.exe.stackdump`, `dashboard/`,
`promptDashboard.txt`) son notas y material ajeno a `client/`, `server/` y
`docs/`. **No se ha tocado ni un fichero de la aplicación durante la sesión**;
lo único que se ha escrito es este informe y su fichero de historial.

**Entorno.** Interfaz en `http://localhost:5173` (Vite dev server, proxy `/api`),
API en `http://localhost:3001` (Express + SQLite, `data/taller.db`). Navegador
Chromium controlado por herramientas, en ventana de escritorio 1280×900 salvo
cuando se indica otra anchura. La aplicación no tiene autenticación.

**Estado de los datos al empezar.** Base **recién sembrada** con `npm run seed`
justo antes de la sesión: 12 clientes, 8 piezas, 6 vehículos, 4 albaranes, 1
factura (`2026/F-0001`), 5 empleados y 5 nóminas. Sin residuos de ejecuciones
anteriores: todos los registros llevaban `creat_el` a las 15:16:55 del
2026-08-21. Esto importa para leer los hallazgos de stock: cualquier desviación
del stock que se cite en este informe la ha producido esta sesión y no arrastra
nada de antes. **No se ha regenerado la base en ningún momento.**

**Nota sobre el navegador.** La primera carga trajo `taller:lang:v1=ca` y
`taller:theme:v1=dark` en `localStorage`, residuo del perfil del navegador y no
de la aplicación. Se limpió `localStorage` y se recargó para observar el arranque
de fábrica, que es **castellano y tema claro** —coherente con REQ-076 y con
TC-106—. Todas las observaciones de idioma de este informe parten de ahí.

**Cómo se ha usado el plan de pruebas.** `DOC-05` y los ocho `.feature` de
`automation/ui/` se han leído **para decidir por dónde no ir**. Los 102 casos
automatizados cubren a fondo el alta, la modificación, la baja, las validaciones
de campo obligatorio y las reglas de negocio de cada módulo. Esta sesión ha ido
deliberadamente a lo que ese cuerpo no toca: dobles pulsaciones, concurrencia
entre pestañas, navegación por URL, idioma de los avisos del servidor, aspecto
en tema oscuro y en anchura móvil, y coherencia del mismo dato entre pantallas.
**No se ha ejecutado la suite automatizada ni se ha repasado ningún `TC-nnn`.**

**Qué se ha dejado fuera a propósito.** BUG-003 (importes negativos en piezas y
líneas) y BUG-004 (factura no anulable) siguen abiertos en `DOC-24` y no se
vuelven a levantar. La ausencia de filtro por vehículo y cliente en el listado de
albaranes (REQ-025, TC-032, TC-033) ya está censada en `DOC-23` apartado 5 como
carencia real de la interfaz y tampoco recibe número nuevo aquí.

**Dónde se quedó corta la sesión.** El panel del navegador no permitió llevar el
área visible por debajo de unos 258 px CSS de ancho, de modo que el peor caso
móvil real (320 px) no se ha observado; las medidas de EXP-012 están tomadas a
375 px exactos, que sí se pudo fijar. Una segunda pestaña dejó de aceptar clics a
mitad de la carta de concurrencia sobre facturas y hubo que rehacerla con una
tercera; el resultado es el mismo, pero conviene saberlo si alguien intenta
repetir los pasos tal cual.

---

## 1 · Resumen ejecutivo

Once cartas. **26 hallazgos**: 20 `defecto`, 5 `mejora` y 1 `duda` que además
arrastra dos preguntas subordinadas. Por severidad: **1 `critical`**, **4
`high`**, **17 `medium`** y **4 `low`**.

**La frase que resume el estado: esto todavía no se puede entregar, y lo que lo
impide no es una lista larga de defectos sino tres cosas concretas.** Primera, la
aplicación no se defiende de la doble pulsación: dos clics seguidos en «Añadir
línea» duplican la línea de un albarán y descuentan el stock dos veces, y ese
albarán se convierte en factura sin que nadie lo note (EXP-002). Segunda, no hay
ningún control de concurrencia sobre los registros: dos personas editando la
misma ficha pierden trabajo en silencio (EXP-003). Tercera, la ficha de la
factura —el único documento de cobro del sistema— **no muestra el importe del
IVA en ninguna parte**, y hay dos casos de prueba verdes que dicen que sí
(EXP-007).

Ese tercer punto merece atención aparte: **TC-073 y TC-075 están en verde y
verifican menos de lo que sus títulos anuncian**. Que la suite dé por cubierto
un requisito que el sistema no cumple es más grave que el defecto en sí, porque
significa que nadie va a volver a mirar ahí.

El camino del dinero, por lo demás, aguanta bien: los totales cuadran, la
numeración es correcta, la emisión de factura resiste la concurrencia y las dos
correcciones recientes (BUG-001 y BUG-002) **funcionan**, verificadas en vivo.

---

## 2 · Qué se ha explorado

| Carta | Misión | Resultado |
|---|---|---|
| CH-01 | Recorrer el flujo real de punta a punta —alta de cliente, vehículo, albarán, líneas y factura— sin atajos, buscando fricción | 5 hallazgos de fricción (EXP-017, EXP-022, EXP-023, EXP-024, EXP-026) |
| CH-02 | Buscar valores que el sistema acepte y no debería en los campos de Clientes, Vehículos y Nóminas | 4 hallazgos (EXP-004, EXP-005, EXP-015, EXP-016) |
| CH-03 | Doble pulsación, botón atrás, recarga, URL directa a un id inexistente y a una ruta que no existe | 4 hallazgos (EXP-001, EXP-002, EXP-008, EXP-017) |
| CH-04 | Concurrencia: dos pestañas sobre la misma ficha de cliente, editando y borrando | 1 hallazgo (EXP-003); el caso «borrado en una, guardado en la otra» se comporta razonablemente |
| CH-05 | Concurrencia en el camino del dinero: dos pestañas emitiendo factura del mismo albarán | **Sin hallazgos.** El servidor rechaza la segunda emisión y no se duplica la factura |
| CH-06 | Confirmar empíricamente el candidato a BUG-005 (avisos del servidor en catalán) y medir su alcance real | 1 hallazgo (EXP-006), confirmado en 5 módulos distintos |
| CH-07 | Recorrer las pantallas en tema oscuro buscando texto ilegible o elementos que desaparecen | 1 hallazgo (EXP-011); el resto del tema oscuro está bien resuelto |
| CH-08 | Anchura móvil (375 px), tablet (768 px) y desbordamiento por contenido largo | 2 hallazgos (EXP-012, EXP-013) |
| CH-09 | Consola y red tras cada acción, buscando errores que no llegan a la pantalla | **Sin hallazgos propios.** Ni una promesa rechazada, ni un aviso de React, ni un 5xx. Los únicos 4xx de la sesión fueron los provocados a propósito, y todos se muestran en pantalla |
| CH-10 | Coherencia del mismo dato entre pantallas: stock, precios, fechas y totales | 4 hallazgos (EXP-007, EXP-009, EXP-010, EXP-014) |
| CH-11 | Volver sobre lo corregido: comprobar en vivo que BUG-001 y BUG-002 están cerrados | **Ambos cierran.** Como efecto colateral, 1 hallazgo de documentación desactualizada (EXP-025) |

---

## 3 · Qué funciona bien

No es un apartado de cortesía: acota dónde está el riesgo y dónde no hace falta
volver a mirar.

- **La aritmética del dinero es correcta en todo lo comprobado.** Albarán
  `2026/A-0005`: dos líneas de 17,00 € y 95,00 € dan 112,00 €; la factura
  `2026/F-0002` emitida sobre él da base 112,00 €, 21 % y total 135,52 €. La
  ficha del cliente muestra el mismo 135,52 €. Albarán `2026/A-0006`: línea de
  40,00 €, factura `2026/F-0003` con total 48,40 €. Ningún descuadre.
- **La numeración funciona.** `2026/A-0005`, `2026/A-0006`, `2026/F-0002`,
  `2026/F-0003`: correlativos y con el formato de BR-ALB-09 y BR-FAC-09.
- **BUG-001 está corregido y verificado en vivo.** Con 8 unidades de «Corretja de
  distribució» en catálogo, pedir 999 devuelve HTTP 409, el mensaje sale en
  pantalla y el stock se queda en 8. No hay stock negativo por esta vía.
- **BUG-002 está corregido y verificado en vivo.** Cambiar el albarán
  `2026/A-0005` (vehículo 7, cliente 14) al vehículo «Ford Focus — 2345FGH», que
  es de otro cliente, se rechaza y el albarán no se mueve.
- **La emisión de factura resiste la concurrencia.** Dos pestañas con el mismo
  albarán pendiente marcado: la primera emite `2026/F-0003`, la segunda recibe un
  rechazo y no se crea nada. Al terminar hay exactamente tres facturas.
- **Los acentos y los apóstrofos se guardan y se muestran bien de punta a punta.**
  «Núria O'Brien Sant Martí», «Carrer d'Aragó 12», «Citroën», «Revisió dels
  100.000 km — exploració QA» sobreviven al alta, a la lista, a la ficha, a la
  edición y a la factura, con el guion largo y todo. No hay ni un rastro de
  codificación rota.
- **Consola y red limpias.** En toda la sesión no ha aparecido ninguna promesa
  rechazada sin capturar, ningún aviso de React, ningún 5xx y ninguna petición
  duplicada que no fuera el doble efecto de `StrictMode` en desarrollo.
- **Todos los textos que se muestran tienen traducción.** No apareció ni una sola
  clave cruda tipo `nav.clients` en pantalla, ni en castellano ni en catalán.
- **El conmutador de cobro está protegido contra la doble pulsación.** Dos clics
  rápidos en «Marcar como pagada» disparan un solo `PATCH` y la factura queda
  `pagada`, no vuelve a `pendiente`.
- **El borrado de una línea devuelve el stock correctamente.** Retirar una línea
  de 2 unidades devolvió el catálogo de 35 a 37.
- **El arranque de fábrica es el prometido.** Con `localStorage` vacío, la
  interfaz sale en castellano y en tema claro.

---

## 4 · Hallazgos

Ordenados por severidad. Cada ficha se lee sola: no hay referencias del tipo
«igual que el anterior».

---

### EXP-002 · `critical` · `defecto` · Un doble clic en «Añadir línea» duplica la línea y descuenta el stock dos veces

**Qué pasa.** Pulsar dos veces seguidas «Añadir línea» en un albarán crea dos
líneas idénticas, duplica el importe del albarán y descuenta el stock de la
pieza por partida doble, sin ningún aviso.

**Dónde.** Detalle del albarán, `/albarans/5` (cualquier albarán pendiente
sirve).

**Reproducción.**

1. Anotar el stock de la pieza «Filtre d'oli» (`/peces`, columna Stock). En la
   sesión era **39**.
2. Ir a `/albarans/5` (albarán `2026/A-0005`, pendiente).
3. En el formulario de línea dejar Tipo = «Pieza», elegir «Filtre d'oli (39)» y
   escribir Cantidad = `2`.
4. Hacer **doble clic** sobre el botón «Añadir línea».
5. Mirar la tabla de líneas y volver a `/peces`.

**Observado.** Dos líneas «Filtre d'oli · 2 · 8.50 € · 17.00 €» y un total de
**34,00 €**. El stock del catálogo baja de 39 a **35**, es decir cuatro unidades
por dos pulsaciones de una línea de dos. La pantalla no distingue las dos líneas
de un albarán donde legítimamente hubiera dos entradas de la misma pieza, así que
el error es invisible salvo que alguien recuente.

**Esperado.** Una sola línea de 2 unidades, total 17,00 €, stock 37. **Por qué se
espera eso:** criterio del explorador, no documentado —`DOC-04` no habla de
reenvíos—, pero el resultado contradice de plano REQ-035, que hace del albarán el
único movimiento de stock, y BR-ALB-05, que ata la línea a lo que el usuario
anota. Anotar una vez y consumir el doble no es lo que describe ningún requisito.

**Por qué es `critical`.** El albarán se convierte en factura. En la sesión, el
albarán `2026/A-0005` acabó en la factura `2026/F-0002`, que ya no se puede
anular (BUG-004). Un albarán inflado por un doble clic produce un documento de
cobro incorrecto e irreversible.

**Evidencia técnica.** Panel de red, dos peticiones consecutivas:

```
POST http://localhost:5173/api/albarans/5/linies → 201 Created
POST http://localhost:5173/api/albarans/5/linies → 201 Created
```

Respuesta de `GET /api/albarans/5` inmediatamente después:

```json
"linies": [
  {"id": 8, "albara_id": 5, "tipus": "peca", "peca_id": 1, "quantitat": 2, "preu": 8.5},
  {"id": 9, "albara_id": 5, "tipus": "peca", "peca_id": 1, "quantitat": 2, "preu": 8.5}
]
```

Respuesta de `GET /api/peces/1`: `"estoc": 35`.

**Hipótesis de causa** (marcada como hipótesis). El botón de envío no se
deshabilita mientras la petición está en vuelo. El propio proyecto ya sabe que
esta clase de carrera existe: `DOC-23` apartado 6.1 la describe del lado del
test. Aquí es del lado de la aplicación. No se ha localizado la línea exacta
porque el hallazgo no lo necesita.

**Sugerencia para Doctor QA** (marcada como sugerencia). Empezar por deshabilitar
el botón de envío mientras hay una petición pendiente, en el formulario de línea
de `AlbaraLiniesSection.tsx`. Conviene decidir a la vez si el arreglo debe ser
transversal —el mismo patrón afecta a EXP-001— o local. La protección definitiva
del importe probablemente exija idempotencia en el servidor, pero eso es una
decisión de diseño que no corresponde a este informe.

---

### EXP-003 · `high` · `defecto` · Dos pestañas sobre la misma ficha: la última que guarda pisa a la otra sin avisar

**Qué pasa.** No hay ningún control de concurrencia. Si dos personas abren la
misma ficha y guardan, la segunda escribe encima de los cambios de la primera y
ninguna de las dos se entera.

**Dónde.** Formulario de edición de cliente, `/clients/14/editar`. El patrón es
el mismo en el resto de formularios de entidad, que comparten componente.

**Reproducción.**

1. Abrir `/clients/14/editar` en la pestaña A y **la misma URL** en la pestaña B.
   (Vale cualquier cliente; en la sesión el 14 tenía Teléfono `600999888` y
   Notas vacío.)
2. En la pestaña A, cambiar Teléfono a `611111111` y pulsar «Guardar».
3. Comprobar que se ha guardado: `GET /api/clients/14` devuelve
   `"telefon": "611111111"`.
4. Volver a la pestaña B **sin recargarla**. Sigue mostrando el teléfono viejo.
   Escribir en Notas `Nota escrita en la pestana B` y pulsar «Guardar».
5. Volver a consultar `GET /api/clients/14`.

**Observado.** El teléfono ha vuelto a `600999888`. El cambio de la pestaña A ha
desaparecido. Ninguna de las dos pestañas muestra aviso, error ni marca de
conflicto: la pestaña B navega a la ficha como si todo hubiera ido bien.

**Esperado.** O bien el sistema detecta que el registro cambió desde que la
pestaña B lo leyó y avisa, o bien guarda solo los campos que la pestaña B tocó.
Perder el trabajo de la otra persona en silencio no es aceptable. **Por qué se
espera eso:** criterio del explorador, no documentado. `DOC-04` no menciona
concurrencia en ningún requisito; `DOC-06` tampoco advierte al usuario de que
esto pueda pasar. Es precisamente el vacío lo que hace el hallazgo relevante: el
taller que use esto desde dos puestos perderá datos sin saberlo.

**Evidencia técnica.** Estado del registro tras el paso 3 y tras el paso 5, mismo
campo:

```
15:39:50  "telefon":"611111111","notes":null
15:40:39  "telefon":"600999888","notes":"Nota escrita en la pestana B"
```

Ambas peticiones `PUT /api/clients/14` devolvieron `200 OK`.

**Hipótesis de causa** (marcada como hipótesis). El formulario envía el objeto
completo con los valores que leyó al cargarse, y el `PUT` sobrescribe todas las
columnas sin comparar versión ni marca de tiempo. No hay `If-Match`, `version` ni
`actualitzat_el` en el cuerpo de la petición.

**Sugerencia para Doctor QA** (marcada como sugerencia). Antes de tocar código,
esto necesita una decisión: bloqueo optimista con rechazo y aviso, o fusión por
campos. Si se opta por lo primero, el camino más corto es enviar el
`actualitzat_el` que se leyó y que el servidor devuelva 409 si no coincide;
`actualitzat_el` ya existe en todas las tablas. **No es una orden**: la elección
es del propietario del proyecto.

**Nota de alcance.** El caso hermano —borrar el registro en una pestaña y guardar
en la otra— **sí está bien resuelto**: `PUT /api/clients/13` sobre un cliente ya
borrado devuelve `404` y la pantalla muestra el error. Lo que falta es la
detección de modificación concurrente, no la de borrado.

---

### EXP-007 · `high` · `defecto` · La ficha de la factura no muestra el importe del IVA en ninguna parte, y dos casos verdes dicen que sí

**Qué pasa.** El detalle de una factura muestra la base imponible, el tipo de IVA
en porcentaje y el total, pero **nunca la cuota de IVA en euros**. El usuario
tiene que restar mentalmente para saber cuánto impuesto lleva el documento.

**Dónde.** Detalle de factura, `/factures/1` (y `/factures/2`, `/factures/3`:
todas iguales).

**Reproducción.**

1. Ir a `/factures/1`, la factura `2026/F-0001` del seed.
2. Leer todo el contenido de la pantalla.

**Observado.** El texto completo de la pantalla es:

```
2026/F-0001 · Marcar como pagada
Cliente: Marc Vidal Soler
ESTADO DE PAGO  Pendiente
IVA             21%
BASE IMPONIBLE  98.40 €
TOTAL           119.06 €
Albaranes incluidos
2026/A-0002
```

En la etiqueta «IVA» aparece `21%`, que es el tipo, no el importe. El importe
—**20,66 €**— no está en ningún sitio de la pantalla.

**Esperado.** Que aparezca la cuota de IVA en euros junto a la base y al total.
**Por qué se espera eso, citado:** REQ-051 dice que «El sistema presenta la base,
**el IVA** y el total de una factura **redondeados a dos decimales**» —un
porcentaje entero no se redondea a dos decimales, así que el requisito habla del
importe—. REQ-053 dice que «El detalle de una factura muestra los albaranes que
agrupa, la base, **el IVA** y el total». Y `DOC-06` línea 626 lo cierra sin
ambigüedad: «los **tres importes** redondeados a dos decimales», enumerando base,
IVA y total. El manual promete al usuario un dato que la pantalla no da.

**El agravante, y es lo que sube este hallazgo de categoría.** Dos casos del plan
dicen cubrir exactamente esto y están **en verde**:

- **TC-073** «Base, IVA y total se presentan con dos decimales». Su escenario en
  `automation/ui/src/test/resources/features/factures.feature` valida
  `Literal: <baseEsperada> €` y `Literal: <totalEsperado> €`. **No valida el IVA
  en ningún paso.**
- **TC-075** «El detalle de la factura muestra albaranes, base, IVA y total».
  Valida `Literal: <albaran>`, `Literal: <base> €` y `Literal: <total> €`.
  **Tampoco valida el IVA.**

Es decir: dos casos con el IVA en el título que no lo comprueban, cubriendo un
requisito que el sistema no cumple.

**Evidencia técnica.** La API sí calcula el dato y lo devuelve; es solo la
pantalla la que no lo pinta. `GET /api/factures/1`:

```json
{"numero":"2026/F-0001","iva_percentatge":21,"base":98.4,"iva_import":20.66,"total":119.06}
```

**Hipótesis de causa** (marcada como hipótesis). `client/src/pages/factures/FacturaDetail.tsx`
líneas 98-100 renderizan `{factura.ivaPercentatge}%` bajo la etiqueta
`factures.detail.iva`. El campo `ivaImport` no se usa en el componente.

**Sugerencia para Doctor QA** (marcada como sugerencia). Dos frentes distintos y
conviene no mezclarlos. En la aplicación, mostrar el importe del IVA además del
tipo. En el plan, TC-073 y TC-075 necesitan un paso de validación del importe;
eso es trabajo de A-03 y no de Doctor QA, y hasta que se haga la suite seguirá
declarando verde un requisito incumplido.

---

### EXP-001 · `high` · `defecto` · Un doble clic en «Guardar» da de alta el registro dos veces

**Qué pasa.** Pulsar dos veces seguidas «Guardar» en el alta de un cliente crea
dos clientes idénticos. La aplicación lleva al usuario a la ficha de uno de ellos
y el duplicado queda ahí sin que nada lo señale.

**Dónde.** Alta de cliente, `/clients/nou`.

**Reproducción.**

1. Ir a `/clients` y pulsar «Nuevo cliente».
2. Rellenar Nombre = `Núria O'Brien Sant Martí`, NIF = `99999999Z`, Teléfono =
   `600999888`, Email = `nuria.obrien@example.com`, Dirección =
   `Carrer d'Aragó 12, Barcelona`.
3. Hacer **doble clic** sobre «Guardar».
4. Ir a `/clients` y buscar «Núria».

**Observado.** Dos clientes, ids 13 y 14, con exactamente los mismos datos. En el
listado y en todos los desplegables de cliente aparecen dos entradas
indistinguibles «Núria O'Brien Sant Martí». La aplicación no avisa de nada.

**Esperado.** Un solo cliente. **Por qué se espera eso:** criterio del explorador,
no documentado. `DOC-04` no impone unicidad de cliente por NIF ni por nombre, y
seguramente hace bien —dos personas pueden llamarse igual—, pero eso no justifica
que **una sola acción del usuario** produzca dos altas.

**Un efecto colateral observado que conviene documentar.** Las dos navegaciones
que dispara el doble envío compiten entre sí y la pantalla queda descuadrada
respecto a la URL. Tras el paso 3 la barra de direcciones marcaba
`/clients/14`, y sin embargo el botón «Nuevo vehículo» de esa misma ficha llevaba
a `/vehicles/nou?clientId=**13**`. Se comprobó que **no es un fallo de la ficha
de cliente**: cargando `/clients/14` de cero, el mismo botón lleva correctamente a
`?clientId=14`. El descuadre solo aparece cuando hay dos navegaciones en vuelo, y
en ese estado el usuario puede colgar un vehículo del cliente equivocado.

**Evidencia técnica.** Panel de red:

```
POST http://localhost:5173/api/clients → 201 Created
POST http://localhost:5173/api/clients → 201 Created
GET  http://localhost:5173/api/clients/13 → 200 OK
GET  http://localhost:5173/api/clients/14 → 200 OK
```

`GET /api/clients` después:

```
13 | Núria O'Brien Sant Martí | 99999999Z | Carrer d'Aragó 12, Barcelona
14 | Núria O'Brien Sant Martí | 99999999Z | Carrer d'Aragó 12, Barcelona
```

**Hipótesis de causa** (marcada como hipótesis). Mismo mecanismo que EXP-002: el
botón de envío no se bloquea mientras la petición está en vuelo. El componente de
formulario es compartido (`client/src/components/EntityForm.tsx`), así que es
razonable esperar el mismo comportamiento en el alta de vehículos, piezas,
empleados y nóminas —**esto último no se ha verificado en esta sesión** y se
señala como suposición, no como hecho.

**Sugerencia para Doctor QA** (marcada como sugerencia). Si se decide arreglar
EXP-002, mirar si el mismo cambio cabe en `EntityForm.tsx` y cubre este de paso.

---

### EXP-004 · `high` · `defecto` · Una nómina admite deducciones mayores que el bruto y presenta un salario neto negativo

**Qué pasa.** El sistema acepta registrar una nómina cuyas deducciones superan el
salario bruto, y muestra al empleado un salario neto negativo, sin aviso ni
validación en ningún punto.

**Dónde.** Alta de nómina, `/nomines/nova`; detalle en `/nomines/6`; listado en
`/nomines`.

**Reproducción.**

1. Ir a `/nomines` y pulsar «Nueva nómina».
2. Empleado = `Xavier Torres Bou`, Mes = `7`, Año = `2026`, Salario bruto =
   `1000`, Deducciones = `1500`.
3. Pulsar «Guardar».

**Observado.** La nómina se crea sin ninguna objeción. Su ficha muestra:

```
07/2026
SALARIO BRUTO  1000.00 €
DEDUCCIONES    1500.00 €
SALARIO NETO   -500.00 €
```

Y el listado `/nomines` la muestra como `07/2026 · Pendiente · -500.00 €`. La
nómina se puede además marcar como pagada.

**Esperado.** Que el sistema rechace unas deducciones superiores al bruto, o como
mínimo avise. **Por qué se espera eso:** REQ-070 define el neto como bruto menos
deducciones y no prohíbe el negativo, así que no hay contradicción literal con
`DOC-04`. Lo que sí hay es una **incoherencia con la decisión de negocio del
2026-08-16 sobre Q-12**, que ordenó bloquear los importes negativos en piezas y
en líneas de albarán precisamente porque no tienen sentido. Un salario neto
negativo es el mismo problema en el módulo que el alcance de Q-12 no nombró.
Véase la pregunta P-01 del apartado 6: la decisión final es de negocio.

**Por qué es `high` y no `medium`.** El resultado es un documento laboral que dice
que el trabajador debe dinero a la empresa, y el sistema lo emite y lo deja
marcar como pagado sin una sola señal.

**Evidencia técnica.** Ninguna petición de error. `POST /api/nomines` devolvió
`201 Created`, y el detalle sirve el neto calculado en negativo. La consola quedó
limpia.

**Cobertura del plan.** TC-098 «El neto es el bruto menos las deducciones» está en
verde y lo seguirá estando: aritméticamente 1000 − 1500 = −500 es correcto. El
caso comprueba la fórmula, no el dominio de los valores. No es un caso mal
escrito, es un caso que no cubre esto.

**Hipótesis de causa** (marcada como hipótesis). `server/routes/nomines.js` valida
empleado, mes y año, y el rango 1-12 del mes, pero no impone signo ni relación
entre bruto y deducciones. En el cliente, los campos son `<input type="number">`
sin `min`.

**Sugerencia para Doctor QA** (marcada como sugerencia). No tocar nada hasta que
negocio conteste P-01. Si la respuesta es bloquear, el sitio natural es la misma
validación de servidor donde se resuelva Q-12, para que la regla quede escrita una
sola vez.

---

### EXP-006 · `medium` · `defecto` · Todos los avisos de error del servidor salen en catalán aunque la interfaz esté en castellano

**Qué pasa.** La interfaz arranca de fábrica en castellano, pero **los 71 mensajes
de error que produce el servidor están escritos en catalán y no pasan por el
sistema de traducción**. El resultado son pantallas con dos idiomas a la vez.

Esto confirma empíricamente el candidato a BUG-005 que `DOC-16` apartado 6.2
describía por lectura de código y declaraba no ejecutado. **Sí ocurre**, y su
alcance es mayor que el ejemplo que allí se proponía.

**Dónde.** Los siete módulos. Verificado en pantalla en cinco de ellos.

**Reproducción** (el caso más limpio, porque deja los dos idiomas a la vez en una
pantalla de dos líneas):

1. Con `localStorage` vacío —o pulsando «Castellano» en la cabecera—, comprobar
   que la interfaz está en castellano.
2. Crear una nómina cualquiera desde `/nomines/nova` y abrir su ficha.
3. Borrarla con «Eliminar» y confirmar. La aplicación vuelve a `/nomines`.
4. Pulsar el botón **atrás** del navegador.

**Observado.** La pantalla entera dice, una línea encima de la otra:

```
Nòmina no trobada          ← catalán, viene del servidor
Volver a intentarlo        ← castellano, viene del sistema de traducción
```

**Otros cuatro casos verificados en pantalla, todos con la interfaz en
castellano:**

| Acción | Mensaje en pantalla | HTTP |
|---|---|---|
| Alta de vehículo con matrícula `1234ABC`, ya existente | `Ja existeix un vehicle amb aquesta matrícula` | 409 |
| Borrar el cliente 14, que tiene un vehículo | `El client té vehicles associats i no es pot esborrar` | 409 |
| Pedir 999 unidades de una pieza con 8 en catálogo | `Estoc insuficient: hi ha 8 unitats de "Corretja de distribució"` | 409 |
| Cambiar el vehículo de un albarán al de otro cliente | `No es pot canviar el vehicle a un que pertany a un altre client` | 409 |
| Navegar a `/clients/99999` | `Client no trobat` | 404 |

**Alcance medido.** Recuento de los literales de error en `server/routes/`:
`albarans.js` 20, `nomines.js` 13, `vehicles.js` 12, `clients.js` 7,
`factures.js` 7, `peces.js` 6, `personal.js` 6. **Total 71, todos en catalán, en
los siete módulos.** No es un descuido aislado: es que la capa de servidor no
tiene idioma.

**Detalle que conviene registrar.** Los dos últimos mensajes de la tabla
—«Estoc insuficient…» y «No es pot canviar el vehicle…»— son **nuevos**: los
introdujeron las correcciones de BUG-001 y BUG-002. El patrón se sigue
extendiendo con cada arreglo.

**Esperado.** Que el aviso salga en el idioma elegido. **Por qué se espera eso,
citado:** REQ-075 dice que el usuario puede cambiar el idioma «en cualquier
momento», y REQ-076 que «La interfaz se presenta en castellano mientras el
usuario no elija otro idioma». Una pantalla en la que el título está en castellano
y el aviso en catalán no es una interfaz en castellano.

**Por qué `medium` y no más.** El error **sí se muestra** —no se pierde
información y no hay riesgo para los datos—, solo se muestra en el idioma
equivocado. Se deja constancia del razonamiento para que quien priorice pueda
discrepar con criterio.

**Asimetría que importa para decidir el alcance.** Con la interfaz en catalán la
aplicación es coherente. **El defecto solo afecta al usuario castellanohablante,
que es el usuario por defecto.**

**Hipótesis de causa** (marcada como hipótesis). Los `res.status(...).json({error:
'…'})` de `server/routes/*.js` llevan el texto literal incrustado. El cliente lo
muestra tal cual, sin pasarlo por `i18next`.

**Sugerencia para Doctor QA** (marcada como sugerencia). El arreglo barato
—traducir los 71 literales al castellano— solo cambia de sitio el problema.
Lo que resuelve de verdad es que el servidor devuelva un código de error estable
y que el cliente lo traduzca; eso son 71 claves nuevas en los dos ficheros de
`client/src/locales/` y un contrato de error en la API. Es un cambio de tamaño
medio y **debe decidirlo el propietario del proyecto antes de empezar**.

---

### EXP-005 · `medium` · `defecto` · El mes de una nómina admite decimales y el año no tiene ningún límite

**Qué pasa.** Una nómina se puede registrar con mes `7.5` y año `999999`. El
período se presenta al usuario como `7.5/999999` y la nómina encabeza el listado
para siempre.

**Dónde.** Edición de nómina, `/nomines/6/editar`; listado `/nomines`.

**Reproducción.**

1. Crear una nómina cualquiera desde `/nomines/nova` (por ejemplo empleado
   `Xavier Torres Bou`, mes `7`, año `2026`, bruto `1000`, deducciones `0`).
2. Abrir su ficha y pulsar «Editar».
3. Poner Mes = `7.5` y Año = `999999`.
4. Pulsar «Guardar».

**Observado.** Se guarda sin objeción. El título de la ficha pasa a ser
`7.5/999999` y el listado `/nomines` muestra la fila `7.5/999999 · Pendiente ·
… €` **por encima** de `02/2026`, es decir en primera posición, y ahí se queda.

**Esperado.** Que el mes sea un entero de 1 a 12 y que el año esté acotado a un
rango razonable. **Por qué se espera eso, citado:** REQ-067 dice que «El sistema
exige que el mes de una nómina esté comprendido entre 1 y 12». `7.5` está
numéricamente entre 1 y 12 y por eso pasa la comprobación, pero un mes con
decimales no es un mes: el requisito habla de un mes del calendario. Sobre el
año, `DOC-04` **no dice nada**, así que ese trozo del hallazgo va acompañado de la
pregunta P-02 del apartado 6.

**Efecto secundario observado.** REQ-063 pide el listado ordenado de la nómina
más reciente a la más antigua. Con un año 999999 en la base, ese orden deja de
tener sentido para siempre.

**Cobertura del plan.** TC-092 (mes 0) y TC-093 (mes 13) están en verde y cubren
los extremos del rango; TC-094 acepta 1 y 12. Ninguno prueba un mes fraccionario.
No es un caso mal escrito: es un hueco del plan.

**Evidencia técnica.** Ambos campos son `<input type="number">` sin `min`, `max`
ni `step` —comprobado en el DOM: `{"min":"","max":"","step":""}`— y el formulario
lleva `noValidate`, así que ni siquiera actúa la validación nativa del navegador.
`PUT /api/nomines/6` devolvió `200 OK`.

**Hipótesis de causa** (marcada como hipótesis). La comprobación de servidor
verifica el intervalo pero no la integralidad, y sobre el año no hay
comprobación.

**Sugerencia para Doctor QA** (marcada como sugerencia). El mes se arregla
exigiendo entero además del intervalo. El año no se toca hasta tener respuesta a
P-02.

---

### EXP-008 · `medium` · `defecto` · Una ruta que no existe deja una página completamente en blanco, sin siquiera el menú

**Qué pasa.** Cualquier URL que no corresponda a una ruta declarada muestra una
pantalla totalmente vacía: ni contenido, ni mensaje, ni barra lateral. El usuario
queda sin ninguna forma de volver que no sea reescribir la dirección a mano.

**Dónde.** Cualquier ruta desconocida. Probado con
`http://localhost:5173/ruta-que-no-existe`.

**Reproducción.**

1. Escribir `http://localhost:5173/ruta-que-no-existe` en la barra de direcciones.

**Observado.** Página en blanco absoluto. No es que falte el contenido: **no se
renderiza nada**. Comprobado en el DOM que `document.getElementById('root').innerHTML`
tiene longitud `0`. Ni siquiera aparece el menú lateral, que sí está presente en
todas las demás pantallas, incluidos los estados de error. La consola no registra
ningún error.

**Esperado.** Una pantalla de «página no encontrada» con el menú disponible, o una
redirección al listado de clientes como la que ya hace la raíz. **Por qué se
espera eso:** criterio del explorador, no documentado. `DOC-04` no tiene ningún
requisito sobre rutas desconocidas. El argumento es que una URL mal copiada o un
marcador viejo son sucesos normales, y el sistema ya sabe redirigir —la raíz `/`
va a `/clients`—, así que el comportamiento es incoherente consigo mismo.

**Hipótesis de causa** (marcada como hipótesis). `client/src/App.tsx` declara las
rutas dentro de un `<Route element={<Layout />}>` y **no declara ninguna ruta
comodín `path="*"`**. Al no casar ninguna, no se monta el `Layout` y el árbol
queda vacío. Verificado leyendo `client/src/App.tsx` líneas 29-31 y 62-78, y
confirmado por el `innerHTML` vacío observado en la pantalla.

**Sugerencia para Doctor QA** (marcada como sugerencia). Una ruta comodín dentro
del `Layout` con una pantalla de no encontrado, reutilizando el componente de
estado de error que ya existe. Conviene decidir a la vez si esa pantalla debe
llevar un enlace de vuelta, porque el problema de EXP-019 es el mismo.

---

### EXP-009 · `medium` · `defecto` · La fecha del albarán se muestra como una marca de tiempo cruda, y al editar el albarán se pierde la hora

**Qué pasa.** El listado y la ficha de albaranes presentan la fecha como
`2026-08-21T15:25:05.101Z`, una cadena técnica con milisegundos y zona horaria.
Además, editar cualquier campo del albarán reescribe esa fecha a medianoche UTC y
la hora original desaparece.

**Dónde.** Listado `/albarans` y ficha `/albarans/5`. Afecta también a los cuatro
albaranes del seed, no solo a los creados en la sesión.

**Reproducción, parte 1 (la presentación).**

1. Ir a `/albarans`.

Se ve, tal cual, en la columna Fecha:

```
2026/A-0005  Pendiente  2026-08-21T15:25:05.101Z
2026/A-0004  Pendiente  2026-08-21T15:16:55.032Z
2026/A-0003  Pendiente  2026-08-21T15:16:55.032Z
2026/A-0002  Facturado  2026-08-21T15:16:55.032Z
2026/A-0001  Pendiente  2026-08-21T15:16:55.031Z
```

**Reproducción, parte 2 (la pérdida de la hora).**

1. Abrir `/albarans/5`. La ficha muestra `FECHA 2026-08-21T15:25:05.101Z`.
2. Pulsar «Editar». El selector de fecha se rellena con `2026-08-21`.
3. **Sin cambiar nada**, pulsar «Guardar».
4. Volver a mirar la ficha.

**Observado.** La fecha pasa a `2026-08-21T00:00:00.000Z`. La hora a la que se
abrió el albarán se ha perdido por el mero hecho de guardar el formulario, por
ejemplo para corregir una errata en las notas.

**Esperado.** Una fecha legible —`21/08/2026` o el formato que decida el
proyecto— y que editar las notas no altere la fecha. **Por qué se espera eso:**
criterio del explorador, no documentado. `DOC-04` y `DOC-06` no fijan formato de
fecha. Los dos argumentos son internos al propio sistema: primero, la misma
pantalla presenta `CREADO EL 2026-08-21 15:25:05` con un formato distinto del de
`FECHA`, así que la aplicación ya se contradice a sí misma; segundo, REQ-040
permite modificar «el vehículo, la fecha y las notas» de un albarán no facturado,
pero no dice que modificar las notas deba modificar la fecha.

**Riesgo adicional, marcado como hipótesis y no verificado.** La fecha se guarda
en UTC y se muestra en crudo. Un albarán abierto a las 00:30 hora peninsular
—`22:30Z` del día anterior— se mostraría con la fecha del día anterior. **No se
ha reproducido**, porque exigiría manipular la hora del sistema; se anota para que
quien lo arregle lo tenga presente.

**Evidencia técnica.** `GET /api/albarans` antes y después de la edición del paso
3, misma fila:

```
antes:   "numero":"2026/A-0005", "data":"2026-08-21T15:25:05.101Z"
después: "numero":"2026/A-0005", "data":"2026-08-21T00:00:00.000Z"
```

**Sugerencia para Doctor QA** (marcada como sugerencia). Son dos arreglos
independientes y conviene no confundirlos: dar formato a la fecha al presentarla,
y decidir si el albarán guarda fecha con hora o solo fecha. Lo segundo es una
decisión de modelo, no de maquetación.

---

### EXP-010 · `medium` · `defecto` · El desplegable de piezas del albarán sigue ofreciendo el stock viejo después de añadir una línea

**Qué pasa.** El desplegable de piezas del formulario de línea muestra el stock
entre paréntesis. Tras añadir una línea, ese número no se actualiza: el catálogo
ya ha bajado, pero la pantalla sigue enseñando el valor anterior hasta que se
recarga.

**Dónde.** Detalle del albarán, `/albarans/5`, formulario «Añadir línea».

**Reproducción.**

1. Abrir `/albarans/5` **recién cargado** y anotar lo que dice el desplegable. En
   la sesión decía `Bateria 60Ah (10)`.
2. Elegir esa pieza, Cantidad = `1`, y pulsar **una sola vez** «Añadir línea».
3. Sin recargar, volver a abrir el desplegable.
4. Consultar el catálogo real en `GET /api/peces/7`.

**Observado.** El desplegable sigue diciendo `Bateria 60Ah (10)`. El catálogo
dice `"estoc": 9`. Recargando la página, el desplegable pasa a `(9)`.

**Esperado.** Que el número del desplegable coincida con el catálogo tras cada
línea añadida. **Por qué se espera eso:** criterio del explorador, no
documentado. El argumento es concreto y ha ganado peso desde que se corrigió
BUG-001: ahora el sistema **rechaza** la línea si no hay existencias, de modo que
un operario que confíe en el número del desplegable puede pedir una cantidad que
el servidor le va a denegar. La pantalla le está diciendo que hay unidades que ya
no hay.

**Reproducción alternativa, más llamativa.** Con el mismo albarán, tras el doble
clic de EXP-002 el desplegable seguía ofreciendo `Filtre d'oli (39)` cuando el
catálogo estaba en 35.

**Evidencia técnica.** Contenido literal del desplegable leído del DOM tras el
paso 2:

```
Selecciona una pieza | Bateria 60Ah (10) | Bugies (joc de 4) (14) | ...
```

y respuesta simultánea de la API:

```json
{"id":7,"nom":"Bateria 60Ah","preu":95,"estoc":9}
```

**Sugerencia para Doctor QA** (marcada como sugerencia). Recargar el catálogo de
piezas cuando se añade o se retira una línea, no solo al montar el componente.

---

### EXP-011 · `medium` · `defecto` · En tema oscuro los enlaces de las fichas quedan por debajo del contraste mínimo legible

**Qué pasa.** Con el tema oscuro activo, los enlaces del contenido —la vuelta al
listado, el cliente, el vehículo, el albarán, la factura— se pintan con el mismo
azul del tema claro sobre fondo oscuro. El contraste resultante es **3,45:1**,
por debajo del 4,5:1 que exige WCAG AA para texto de 14 px.

**Dónde.** Verificado en pantalla en tres fichas distintas: `/albarans/5`,
`/factures/1` y `/nomines/6`.

**Reproducción.**

1. Activar el tema oscuro con el botón de la cabecera.
2. Abrir `/factures/1`.
3. Mirar «← Volver al listado», «Marc Vidal Soler» y «2026/A-0002».

**Observado.** Los tres se pintan en `rgb(37, 99, 235)` sobre un fondo
`rgb(15, 23, 42)`. Ratio de contraste **3,45:1**. Visualmente se leen apagados y
cuesta distinguirlos del texto normal, que en la misma pantalla llega a 9:1.

**Esperado.** Un tono más claro en tema oscuro, como el que sí tienen los enlaces
del menú lateral. **Por qué se espera eso:** criterio del explorador apoyado en
un umbral objetivo (WCAG 2.1 AA, 4,5:1 para texto normal); no está documentado en
`DOC-04` ni en `DOC-06`. Refuerza el argumento que la propia aplicación ya lo
hace bien en otro sitio: los enlaces del menú declaran una variante oscura y
alcanzan 12:1 en el mismo fondo.

**Alcance.** El defecto es exclusivo del tema oscuro: en tema claro el mismo azul
sobre blanco da 5,17:1 y cumple. Un barrido de contraste sobre el listado de
clientes, sobre los formularios y sobre los estados de error en tema oscuro no
encontró **ningún otro** texto por debajo de 4,5:1. Es decir, el tema oscuro está
bien resuelto salvo en este punto.

**Evidencia técnica.** Medición sobre la página renderizada, `/albarans/5` en
tema oscuro:

```json
[{"t":"← Volver al listado","cr":3.45,"color":"rgb(37, 99, 235)","bg":"rgb(15,23,42)","size":"14px"},
 {"t":"Citroën C4 Picasso — 7788 QAX","cr":3.45,"color":"rgb(37, 99, 235)","bg":"rgb(15,23,42)","size":"14px"},
 {"t":"Núria O'Brien Sant Martí","cr":3.45,"color":"rgb(37, 99, 235)","bg":"rgb(15,23,42)","size":"14px"}]
```

Clases aplicadas, leídas del DOM: enlace de contenido
`text-primary-600 hover:underline`; enlace del menú
`text-slate-700 … dark:text-slate-300 dark:hover:bg-slate-800`.

**Hipótesis de causa** (marcada como hipótesis). Los enlaces de contenido usan
`text-primary-600` sin variante `dark:`. Una búsqueda dirigida encuentra **18
apariciones** del patrón repartidas por las siete pantallas de detalle:
`AlbaraDetail.tsx` (4), `ClientDetail.tsx` (3), `FacturaDetail.tsx` (3),
`VehicleDetail.tsx` (3), `PersonalDetail.tsx` (2), `NominaDetail.tsx` (2),
`PecaDetail.tsx` (1).

**Sugerencia para Doctor QA** (marcada como sugerencia). Como son 18 sitios con
la misma clase, probablemente compense extraer un componente o una clase de
utilidad en vez de parchear uno a uno.

---

### EXP-012 · `medium` · `defecto` · En anchura de móvil la barra lateral no se repliega y todos los botones de acción quedan fuera de la pantalla

**Qué pasa.** El menú lateral ocupa 240 px fijos a cualquier anchura. En un móvil
de 375 px eso deja 135 px de contenido visible y desplaza el resto fuera de la
pantalla: en la ficha de un albarán, **todos** los botones de acción quedan a la
derecha del borde.

**Dónde.** Toda la aplicación. Medido en `/clients` y `/albarans/5`.

**Reproducción.**

1. Poner la ventana del navegador en 375 px de ancho (iPhone estándar).
2. Abrir `/albarans/5`.
3. Intentar pulsar «Editar», «Eliminar» o «Añadir línea».

**Observado, con las medidas tomadas sobre la página renderizada:**

| Pantalla | Ancho visible | Ancho del documento | Desbordamiento |
|---|---|---|---|
| `/clients` a 375 px | 375 px | 835 px | **460 px** |
| `/albarans/5` a 375 px | 375 px | 641 px | **266 px** |
| `/clients` a 768 px (tablet) | 753 px | 835 px | **82 px** |
| `/albarans/5` a 768 px | 768 px | 768 px | 0 |

En `/albarans/5` a 375 px, los elementos que quedan **enteramente** a la derecha
del borde visible son: el conmutador «Castellano», el conmutador «Catalán», el
botón de tema, «Editar», «Eliminar» del albarán, los dos «Eliminar» de las líneas
y «Añadir línea». Es decir, todos los controles de la pantalla. En `/clients` a
375 px solo se ve parte de la columna Nombre; NIF, Teléfono y Email exigen
desplazar horizontalmente.

**Esperado.** Que el menú se repliegue por debajo de cierto ancho, o que el
contenido se reordene. **Por qué se espera eso:** criterio del explorador, no
documentado. `DOC-04` no tiene requisitos de responsive y `DOC-06` no promete uso
en móvil, así que **si el proyecto ha decidido que esto es una aplicación de
escritorio, este hallazgo no es un defecto sino una confirmación de esa decisión**.
Se reporta porque el encargo incluía explícitamente validar el aspecto, y porque
un taller es un sitio donde la tableta se usa junto al coche. La decisión es de
producto.

**Hipótesis de causa** (marcada como hipótesis). `client/src/components/Layout.tsx`
línea 12 declara el menú como `className="w-60 shrink-0 …"`, un ancho fijo sin
ninguna variante de punto de ruptura.

**Sugerencia para Doctor QA** (marcada como sugerencia). No tocar hasta que
producto diga si el móvil está en alcance. Si lo está, el cambio menor es
replegar el menú por debajo de un punto de ruptura; el cambio mayor —tablas que
se reorganizan en tarjetas— es otro tamaño de trabajo.

**Limitación de la observación.** El panel del navegador no permitió bajar de
unos 258 px CSS, así que el peor caso real de 320 px no se ha medido. Las cifras
de la tabla son a 375 px y 768 px exactos.

---

### EXP-013 · `medium` · `defecto` · Un nombre largo ensancha la columna y expulsa el resto de la tabla fuera de la pantalla

**Qué pasa.** El listado no acota el ancho de sus columnas. Un solo registro con
un valor largo estira su columna hasta desplazar las demás fuera del área
visible, y esconde los datos **de todas las filas de esa página**, no solo de la
que causa el problema.

**Dónde.** Listado de clientes, `/clients`, página 2. El componente de tabla es
compartido, así que es razonable esperar lo mismo en los demás listados —**no
verificado en esta sesión**, se señala como suposición.

**Reproducción.**

1. Abrir `/clients`, pulsar «Nuevo cliente» y guardar un cliente cuyo Nombre
   tenga 281 caracteres. En la sesión se usó
   `XXXX…(120 equis)… NOMBRE-MUY-LARGO-DE-PRUEBA-EXPLORATORIA-…(120 íes griegas)…`.
2. Volver a `/clients` y pasar a la página 2 con el botón «›».

**Observado.** En una ventana de 1265 px de ancho visible, la columna Nombre pasa
a medir **1023 px**, la tabla entera **1426 px** y el documento se desborda
**449 px**. La columna NIF empieza en x=1287, es decir fuera de la pantalla. Las
otras dos filas de esa página —«Taxis Costa Brava SL» y «Transports Bages SL»—
quedan reducidas a su nombre: su NIF, su teléfono y su correo dejan de verse.
Aparece una barra de desplazamiento horizontal en toda la página.

**Esperado.** Que el nombre se trunque con puntos suspensivos, o se reparta en
varias líneas dentro de un ancho máximo, sin arrastrar al resto de columnas.
**Por qué se espera eso:** criterio del explorador, no documentado. `DOC-04` no
limita la longitud del nombre y REQ-001 pide que el listado muestre nombre, NIF,
teléfono y correo: si tres de esas cuatro columnas quedan fuera de la pantalla, el
requisito deja de cumplirse para todas las filas de la página.

**Relación con EXP-016.** El nombre de 281 caracteres es posible porque no hay
límite de longitud en ninguna capa; ese es un hallazgo aparte. Aunque se pusiera
un límite razonable, un nombre legítimo de empresa larga produciría el mismo
efecto en menor grado.

**Evidencia técnica.** Medición sobre la página renderizada:

```json
{"vw":1265,"docSW":1714,"overflow":449,"tableW":1426,
 "cols":[{"t":"Nombre","x":264,"w":1023},{"t":"NIF","x":1287,"w":100},
         {"t":"Teléfono","x":1387,"w":100},{"t":"Email","x":1487,"w":203}]}
```

**Hipótesis de causa** (marcada como hipótesis).
`client/src/components/DataTable.tsx` línea 84 declara la tabla como
`className="w-full border-collapse text-left text-sm"`, sin `table-fixed`, sin
contenedor con desplazamiento propio y sin truncado en las celdas (línea 113).

**Sugerencia para Doctor QA** (marcada como sugerencia). Como es un componente
único, un cambio ahí cubre los siete listados de golpe.

---

### EXP-014 · `medium` · `defecto` · El mismo precio se presenta de tres formas distintas según la pantalla

**Qué pasa. ** El precio de una pieza aparece como `8.5` en el catálogo, como
`8.50 €` en su ficha y como `8.50 €` en la línea del albarán. Además, todos los
importes de la aplicación usan el punto como separador decimal, no la coma que
corresponde al castellano y al catalán.

**Dónde.** `/peces`, `/peces/1`, `/albarans/5`, `/factures/1`, `/nomines`.

**Reproducción.**

1. Abrir `/peces`. La fila «Filtre d'oli / FO-100» muestra en Precio: `8.5`.
   «Pastilles de fre davanteres» muestra `45.9`; «Bateria 60Ah» muestra `95`.
2. Abrir `/peces/1`. Muestra `PRECIO 8.50 €` y `COSTE 3.50 €`.
3. Abrir `/albarans/5`. La línea de esa pieza muestra `8.50 €`.

**Observado.** Tres presentaciones del mismo dato: sin símbolo y sin decimales
fijos en el listado, con símbolo y dos decimales en la ficha y en el albarán. En
ningún sitio se usa la coma decimal. Y en cifras de cuatro dígitos no hay
separador de miles: la nómina se presenta como `1360.00 €`.

**Esperado.** Un solo formato de importe en toda la aplicación, con la coma
decimal del idioma de la interfaz. **Por qué se espera eso:** el formato concreto
no está documentado —`DOC-04` solo exige dos decimales en base, IVA y total de la
factura (REQ-051) y en el neto de la nómina (REQ-070)—, así que la elección coma o
punto es criterio del explorador y va acompañada de la pregunta P-03 del apartado
6. Lo que **no** es opinable es la incoherencia interna: el catálogo incumple lo
que la ficha sí hace, y ambos son la misma aplicación.

**Detalle a favor de que el listado es el que está mal.** REQ-018 pide que el
catálogo muestre «su referencia, su precio y su stock actual». Un precio de `95`
sin unidad monetaria en una columna llamada «Precio» es ambiguo cuando la columna
de al lado, «Stock», también es un número pelado.

**Sugerencia para Doctor QA** (marcada como sugerencia). Una función única de
formato de importe, usada desde todas las pantallas. Antes de escribirla conviene
tener la respuesta a P-03, porque si hay que pasar a coma decimal el cambio afecta
también a los ficheros `.feature`, que hoy validan literales como `119.06 €`.
**Ese impacto sobre la suite es de A-03 y de S-10, no de Doctor QA.**

---

### EXP-015 · `medium` · `defecto` · Un vehículo admite año de matriculación futuro y kilometraje negativo

**Qué pasa.** El alta de vehículo acepta un año de matriculación de 2099 y un
kilometraje de −500, y los presenta tal cual en la ficha, sin ninguna validación
ni aviso.

**Dónde.** Alta de vehículo, `/vehicles/nou`; ficha `/vehicles/7`.

**Reproducción.**

1. Ir a `/vehicles/nou`.
2. Cliente = cualquiera; Marca = `Citroën`; Modelo = `C4 Picasso`; Matrícula =
   `7788 QAX`; **Año de matriculación = `2099`**; **Kilometraje = `-500`**.
3. Pulsar «Guardar».

**Observado.** El vehículo se crea. `HTTP 201`. La ficha muestra:

```
AÑO DE MATRICULACIÓN  2099
KILOMETRAJE           -500
```

**Esperado.** Rechazo o al menos aviso: un vehículo no se matricula dentro de 73
años y no acumula kilómetros negativos. **Por qué se espera eso:** criterio del
explorador, no documentado. `DOC-04` describe los datos del vehículo (REQ-013,
REQ-020) pero no acota ni el año ni el kilometraje.

**Por qué no es un duplicado de BUG-003.** BUG-003 recoge la decisión de negocio
sobre Q-12, cuyo alcance escrito es «el precio, el coste y el stock de una pieza,
el precio de una línea de albarán y el precio por hora de la mano de obra». **El
kilometraje y el año del vehículo no están en esa lista**, así que quedarían fuera
del evolutivo de Q-12 tal como está redactado hoy. Véase la pregunta P-02 del
apartado 6.

**Evidencia técnica.** `GET /api/vehicles/7`:

```json
{"id":7,"client_id":14,"marca":"Citroën","model":"C4 Picasso","matricula":"7788 QAX",
 "bastidor":null,"any_matriculacio":2099,"quilometratge":-500,"color":null}
```

Campos declarados en el DOM como `<input type="number">` sin `min` ni `max`.

**Sugerencia para Doctor QA** (marcada como sugerencia). Esperar a P-02. El
vehículo 7 sigue en la base con estos valores; se puede corregir desde la propia
pantalla de edición.

---

### EXP-016 · `medium` · `defecto` · Los formularios llevan la validación del navegador desactivada: pasa un correo sin arroba y un nombre de 281 caracteres

**Qué pasa.** Los formularios de entidad declaran `noValidate`, de modo que la
validación nativa del navegador nunca actúa. Un campo declarado como
`type="email"` acepta cualquier cosa, y no hay límite de longitud en ningún campo
de texto.

**Dónde.** Todos los formularios de entidad. Reproducido en la edición de
cliente, `/clients/14/editar`.

**Reproducción.**

1. Abrir `/clients/14/editar`.
2. Poner en Email el texto `esto-no-es-un-email` (sin arroba y sin dominio).
3. Poner en Nombre una cadena de 281 caracteres.
4. Pulsar «Guardar».

**Observado.** Se guarda sin ninguna objeción. Ni el navegador ni el servidor
dicen nada. La ficha del cliente muestra después `EMAIL esto-no-es-un-email`.

**Esperado.** Que un campo declarado como correo electrónico exija al menos la
forma de un correo. **Por qué se espera eso:** `DOC-04` no impone formato de
correo, así que el argumento no viene de ahí sino de la propia aplicación: el
campo **está declarado** `type="email"`, es decir el proyecto ya expresó la
intención de validarlo, y luego el atributo `noValidate` del formulario la anula.
Un campo que declara una restricción y no la aplica es peor que uno que no la
declara.

**Consecuencia práctica.** `DOC-06` describe el correo del cliente como dato de
contacto. Un cliente con un correo inválido se descubre el día que hay que
mandarle la factura.

**Evidencia técnica.** Estado del formulario leído del DOM antes de guardar:

```json
{"nomLen":281,"email":"esto-no-es-un-email","emailType":"email","formNoValidate":true,"maxlen":-1}
```

Estado del registro después de guardar, `GET /api/clients/14`:

```
len nom: 281
email: esto-no-es-un-email
```

**Hipótesis de causa** (marcada como hipótesis).
`client/src/components/EntityForm.tsx` línea 39 declara
`<form onSubmit={onSubmit} className="…" noValidate>`. Como es el componente
compartido por todos los formularios de entidad, el efecto es general.

**Sugerencia para Doctor QA** (marcada como sugerencia). Quitar `noValidate` sin
más probablemente traiga mensajes del navegador en el idioma del sistema
operativo, que chocarían con lo que ya se describe en EXP-006. Conviene decidir
antes si la validación de formato la hace el navegador, el cliente o el servidor.

---

### EXP-017 · `medium` · `mejora` · Se puede abandonar un formulario a medio rellenar sin ningún aviso, y lo escrito se pierde

**Qué pasa.** Si el usuario escribe en un formulario y navega a otra sección, o
recarga la página, lo escrito desaparece sin que nada le advierta y sin forma de
recuperarlo.

**Dónde.** Todos los formularios. Reproducido en `/clients/3/editar` y en
`/peces/nou`.

**Reproducción, navegando fuera.**

1. Abrir `/clients/3/editar`. El campo Nombre trae `Anna Puig Ferrer`.
2. Cambiarlo a `Anna Puig Ferrer MODIFICADO SIN GUARDAR`.
3. Pulsar «Piezas» en el menú lateral.
4. Pulsar el botón **atrás** del navegador.

**Observado.** El paso 3 navega sin ningún diálogo. Tras el paso 4, el campo
Nombre vuelve a `Anna Puig Ferrer`: lo escrito se ha perdido y nada indica que
haya pasado.

**Reproducción, recargando.**

1. Abrir `/peces/nou` y escribir `Pieza a medio escribir` en el campo Nombre.
2. Recargar la página.

**Observado.** El campo queda vacío. No aparece el diálogo del navegador de
«¿seguro que quieres salir?»: se comprobó en el DOM que no hay ningún manejador
de `beforeunload`.

**Coste para el usuario.** El campo Notas del albarán y el del cliente son de
texto libre y ahí es donde se escribe la descripción de un trabajo. Perder ese
párrafo por un clic en el menú es la clase de cosa que se paga en tiempo real de
taller.

**Por qué es `mejora` y no `defecto`.** Es el comportamiento por omisión de
cualquier aplicación web, no contradice nada de `DOC-04` ni de `DOC-06`, y hay
formas de trabajar que lo evitan. Se reporta porque el coste es real y porque
avisar es barato.

**Sugerencia para Doctor QA** (marcada como sugerencia). Un aviso de cambios sin
guardar al abandonar el formulario cubre los dos casos si se engancha tanto a la
navegación interna como a `beforeunload`.

---

### EXP-018 · `medium` · `defecto` · Retirar una línea de albarán no pide confirmación, a diferencia de todos los demás borrados

**Qué pasa.** El botón «Eliminar» de una línea de albarán borra la línea en el
acto, con un solo clic y sin diálogo. Es el único borrado de la aplicación que no
pregunta, y además mueve stock y dinero.

**Dónde.** Detalle del albarán, `/albarans/5`, columna de acciones de la tabla de
líneas.

**Reproducción.**

1. Abrir un albarán pendiente con al menos una línea de pieza. En la sesión,
   `/albarans/5` con dos líneas de «Filtre d'oli» de 2 unidades y total 34,00 €.
2. Pulsar «Eliminar» en una de las filas.

**Observado.** La línea desaparece inmediatamente. No hay diálogo, no hay
posibilidad de cancelar y no hay forma de deshacer. El total baja y el stock del
catálogo sube en las unidades de esa línea.

**Contraste dentro de la misma aplicación.** Borrar un cliente sí abre un diálogo
«Confirmar eliminación · ¿Seguro que quieres eliminar este cliente? Esta acción no
se puede deshacer», con botones Cancelar y Eliminar. Borrar una nómina, un
vehículo, una pieza y el propio albarán también preguntan.

**Esperado.** La misma confirmación que el resto. **Por qué se espera eso,
citado:** `DOC-04` pide confirmación explícita para dar de baja cliente (REQ-008),
vehículo (REQ-016), pieza (REQ-023), empleado (REQ-061), nómina (REQ-074) y
albarán (REQ-041). Sobre la línea de albarán, REQ-039 permite retirarla y **no
menciona confirmación**, así que literalmente el sistema cumple. El argumento es
de coherencia: la línea es lo único que mueve el stock y el importe, y es lo único
que se borra sin preguntar.

**Sugerencia para Doctor QA** (marcada como sugerencia). Reutilizar el
`ConfirmDialog` que ya existe. Conviene consultar antes a negocio si esto añade
fricción indeseada en un flujo donde se corrigen líneas a menudo: es una decisión
de producto, no un arreglo evidente.

---

### EXP-022 · `medium` · `mejora` · El desplegable de vehículos no dice de qué cliente es cada vehículo, y ahora eso hace fallar la operación

**Qué pasa.** Al abrir o editar un albarán, el desplegable de vehículo lista
marca, modelo y matrícula, pero no el cliente. Como desde la corrección de
BUG-002 el sistema **rechaza** mover un albarán al vehículo de otro cliente, el
usuario elige a ciegas y descubre el error después de guardar.

**Dónde.** `/albarans/nou` y `/albarans/:id/editar`.

**Reproducción.**

1. Abrir `/albarans/5/editar`. El albarán es del vehículo 7, del cliente
   «Núria O'Brien Sant Martí».
2. Desplegar la lista de vehículos.

**Observado.** Las opciones son:

```
Citroën C4 Picasso — 7788 QAX
Ford Focus — 2345FGH
Peugeot 308 — 3456DEF
Renault Clio — 9012CDE
Seat Ibiza — 1234ABC
Toyota Corolla — 7890EFG
Volkswagen Golf — 5678BCD
```

Nada indica de quién es cada uno. Eligiendo «Ford Focus — 2345FGH» y guardando,
la operación se rechaza. Con seis vehículos es un inconveniente; con los
cientos que tiene un taller real es adivinar.

**Coste para el usuario.** Un ciclo completo de elegir, guardar y ser rechazado
por cada intento, sin ninguna información que le ayude a acertar a la siguiente.

**Esperado.** O bien mostrar el cliente junto a cada vehículo, o bien listar solo
los vehículos del cliente del albarán. **Por qué se espera eso:** criterio del
explorador, no documentado; `DOC-04` no describe el contenido de los desplegables.
El argumento es que la restricción existe desde que se corrigió BUG-002 y la
pantalla no la refleja.

**Sugerencia para Doctor QA** (marcada como sugerencia). Filtrar la lista por el
cliente del albarán al **editar** es lo que mejor casa con la decisión de Q-10;
al **crear**, en cambio, hay que poder elegir cualquier vehículo. Son dos casos
distintos y conviene no unificarlos sin pensar.

---

### EXP-023 · `medium` · `mejora` · El listado de nóminas no dice de qué empleado es cada nómina

**Qué pasa.** El listado de nóminas tiene tres columnas —Período, Pago, Neto— y
ninguna identifica al empleado. Con varias nóminas del mismo mes es imposible
saber cuál es cuál sin abrirlas una a una.

**Dónde.** `/nomines`.

**Reproducción.**

1. Abrir `/nomines` con los datos de siembra.

**Observado.** El listado es exactamente:

```
Período   Pago       Neto
02/2026   Pendiente  1360.00 €
01/2026   Pagada     1360.00 €
01/2026   Pagada     1200.00 €
01/2026   Pagada     1720.00 €
01/2026   Pendiente  1400.00 €
```

Tres filas de `01/2026` sin nada que las distinga salvo el importe. Dos de ellas
comparten además el neto `1360.00 €` con la de febrero.

**Coste para el usuario.** `DOC-06` línea 962 instruye literalmente al usuario a
«Abre la nómina que buscas» desde este listado. Con esta pantalla, encontrarla
exige abrir y cerrar hasta acertar.

**Esperado.** Una columna con el nombre del empleado. **Por qué se espera eso:**
REQ-063 solo exige que el listado esté ordenado de la más reciente a la más
antigua y **no obliga** a mostrar el empleado, así que esto es una `mejora` y no
un incumplimiento. Se compara a propósito con REQ-056, que para el listado de
empleados sí exige nombre, cargo y contacto: la asimetría llama la atención.

**Discrepancia menor de documentación observada de paso.** `DOC-06` línea 972 dice
que «Para saber qué nóminas te quedan por pagar tienes que abrirlas una a una».
No es cierto: la columna «Pago» está en el listado y muestra Pendiente o Pagada.
Lo que no hay es recuento ni filtro, que es lo que decidió Q-15.

**Sugerencia para Doctor QA** (marcada como sugerencia). Añadir la columna es
trivial; el dato ya viaja en la respuesta de la API. Conviene mirarlo junto al
evolutivo de Q-15, que va a tocar esta misma pantalla.

---

### EXP-024 · `medium` · `mejora` · Al emitir una factura, la lista de albaranes pendientes solo muestra el número: ni fecha ni importe

**Qué pasa.** El formulario de emisión de factura presenta los albaranes
pendientes del cliente como casillas con el número del albarán y nada más. El
usuario marca sin saber cuánto va a facturar.

**Dónde.** `/factures/nova`.

**Reproducción.**

1. Abrir `/factures/nova`.
2. Elegir el cliente `Anna Puig Ferrer`.

**Observado.** La sección «Albaranes pendientes de este cliente» muestra:

```
☐ 2026/A-0006
☐ 2026/A-0001
```

Sin fecha, sin vehículo, sin importe. La base y el total solo aparecen **después**
de emitir, y emitir es irreversible: `DOC-06` línea 588 lo advierte en negrita
—«emitir una factura no se puede deshacer»— y BUG-004 confirma que no hay forma
de anularla.

**Coste para el usuario.** Para saber qué está marcando, tiene que abrir cada
albarán en otra pestaña, anotarlo y volver. Y si se equivoca, no hay vuelta atrás.

**Esperado.** Fecha, vehículo e importe de cada albarán junto a su casilla, y un
total previsto antes de confirmar. **Por qué se espera eso:** criterio del
explorador, no documentado. REQ-043 solo describe que se emita a partir de los
albaranes pendientes. El argumento es la asimetría entre lo poco que se ve y lo
irreversible que es la acción.

**Sugerencia para Doctor QA** (marcada como sugerencia). El importe por albarán
requiere sumar sus líneas; comprobar si la respuesta que ya alimenta esta pantalla
lo trae antes de decidir el tamaño del cambio.

---

### EXP-025 · `medium` · `defecto` · El manual describe como vigente el comportamiento de stock que ya se corrigió

**Qué pasa.** `DOC-06` dice al usuario, en dos sitios y en negrita, que la
aplicación permite consumir más unidades de las que hay en catálogo sin avisar.
Eso ya no es cierto: la corrección de BUG-001 lo bloquea. Un usuario que siga el
manual no entiende el error que le sale.

**Dónde.** `docs/DOC-06-MANUAL-USUARIO.md`, líneas 449-453 y 763-766.

**Reproducción.**

1. Leer `DOC-06` líneas 449-451: «*El stock queda en negativo*: **la aplicación te
   deja anotar más unidades de las que tienes en el catálogo, sin avisarte**. No
   es un error de la aplicación, es que hoy no comprueba las existencias.»
2. Leer `DOC-06` líneas 764-765: «La aplicación no lo impide ni te avisa.»
3. Abrir `/albarans/5`, elegir la pieza «Corretja de distribució (8)» y pedir
   cantidad `999`.
4. Pulsar «Añadir línea».

**Observado.** La aplicación **sí** lo impide y **sí** avisa. Aparece en rojo bajo
el formulario:

```
Estoc insuficient: hi ha 8 unitats de "Corretja de distribució"
```

`POST /api/albarans/5/linies` devuelve `409 Conflict`, la línea no se crea y
`GET /api/peces/6` sigue diciendo `"estoc": 8`.

**Esperado.** Que el manual describa el comportamiento actual. **Por qué se espera
eso:** es la función declarada de `DOC-06`, que se presenta como lo que se le ha
prometido al usuario.

**Nota positiva que conviene no perder.** Este hallazgo es el subproducto de una
buena noticia: la corrección de BUG-001 funciona, verificada en vivo. Lo que ha
quedado obsoleto es la documentación, no el código.

**Sugerencia para Doctor QA** (marcada como sugerencia). **Esto no es trabajo de
Doctor QA.** Es de A-04, que mantiene `DOC-06`. Se incluye aquí porque se
descubrió explorando y porque hay que decidir quién lo recoge.

---

### EXP-026 · `medium` · `mejora` · El diálogo de confirmación de borrado no dice qué registro se va a borrar

**Qué pasa.** El diálogo de confirmación es genérico y no identifica el registro.
Cuando hay dos registros con el mismo nombre —cosa que EXP-001 hace fácil— el
usuario no puede saber cuál está a punto de borrar.

**Dónde.** Diálogo de confirmación de borrado, verificado en `/clients/13` y en
`/nomines/6`.

**Reproducción.**

1. Provocar la situación de EXP-001: dos clientes «Núria O'Brien Sant Martí»,
   ids 13 y 14.
2. Abrir `/clients/13` y pulsar «Eliminar».

**Observado.** El diálogo dice:

```
Confirmar eliminación
¿Seguro que quieres eliminar este cliente? Esta acción no se puede deshacer.
[Cancelar]  [Eliminar]
```

«Este cliente» no basta: los dos se llaman igual y el diálogo tapa parcialmente la
ficha que hay detrás. Además el diálogo no oscurece el fondo, lo que dificulta
distinguir qué pertenece al diálogo y qué a la pantalla.

**Coste para el usuario.** `DOC-06` línea 256 advierte: «**Aviso: borrar no tiene
vuelta atrás.** Un cliente borrado no se recupera.» Una acción irreversible cuya
confirmación no identifica el objeto.

**Esperado.** El nombre del registro en el texto del diálogo. **Por qué se espera
eso:** criterio del explorador, no documentado. REQ-008 exige «previa confirmación
del usuario» y no detalla el contenido del mensaje.

**Sugerencia para Doctor QA** (marcada como sugerencia). `ConfirmDialog.tsx` es un
componente único; pasarle el nombre del registro cubre todos los borrados a la
vez. El oscurecimiento del fondo es un cambio independiente.

---

### EXP-019 · `low` · `mejora` · Las pantallas de error no ofrecen salida: solo «Volver a intentarlo», que vuelve a fallar

**Qué pasa.** Cuando un registro no existe, la pantalla se reduce a un mensaje de
error y un botón «Volver a intentarlo». Ese botón repite la misma petición, que
vuelve a fallar. No hay enlace al listado ni ninguna otra salida.

**Dónde.** Cualquier ficha con un id inexistente. Verificado en `/clients/99999`
y al pulsar atrás tras borrar `/nomines/6`.

**Reproducción.**

1. Escribir `http://localhost:5173/clients/99999`.
2. Pulsar «Volver a intentarlo» un par de veces.

**Observado.** El contenido completo de la pantalla es `Client no trobat` y
`Volver a intentarlo`. Cada pulsación dispara otro `GET /api/clients/99999` que
devuelve `404`. El menú lateral sí está, así que el usuario no queda atrapado
—a diferencia de EXP-008—, pero el botón que se le ofrece no le sirve de nada.

**Esperado.** Un enlace de vuelta al listado, además o en lugar del reintento.
**Por qué se espera eso:** criterio del explorador, no documentado. Reintentar
tiene sentido cuando el error es de red; para un 404 no lo tiene.

**Sugerencia para Doctor QA** (marcada como sugerencia). Distinguir en
`ErrorState.tsx` entre error recuperable y registro inexistente, y ofrecer la
acción que corresponda. Va bien junto con EXP-008.

---

### EXP-020 · `low` · `defecto` · El atributo de idioma del documento se queda en «en» en los dos idiomas

**Qué pasa.** El elemento `<html>` declara `lang="en"` y no cambia nunca, ni al
arrancar en castellano ni al conmutar a catalán.

**Dónde.** Toda la aplicación.

**Reproducción.**

1. Abrir cualquier pantalla con la interfaz en castellano y leer
   `document.documentElement.lang`.
2. Pulsar «Catalán» en la cabecera y volver a leerlo.

**Observado.**

```
antes:   {"htmlLang":"en","storedLang":null,   nav:["Clientes","Vehículos",...]}
después: {"htmlLang":"en","storedLang":"ca",   nav:["Clients","Vehicles","Peces",...]}
```

La preferencia sí se guarda y los textos sí cambian; lo único que no cambia es la
declaración de idioma del documento.

**Esperado.** `lang="es"` o `lang="ca"` según la elección. **Por qué se espera
eso:** criterio del explorador apoyado en el estándar HTML, no documentado en
`DOC-04`. Las consecuencias prácticas son que un lector de pantalla pronuncia el
contenido con fonética inglesa y que el navegador puede ofrecer traducir una
página que ya está en el idioma del usuario.

**Sugerencia para Doctor QA** (marcada como sugerencia). Ajustar
`document.documentElement.lang` en el mismo sitio donde se aplica el cambio de
idioma, junto a la escritura de `taller:lang:v1`.

---

### EXP-021 · `low` · `defecto` · Campos sin etiqueta asociada en el alta de líneas de albarán y en la emisión de factura

**Qué pasa.** En dos formularios las etiquetas se muestran como texto pero no
están asociadas a su campo, de modo que el árbol de accesibilidad expone campos
sin nombre.

**Dónde.** Formulario de línea en `/albarans/5` y formulario de `/factures/nova`.

**Reproducción.**

1. Abrir `/albarans/5` y poner Tipo = «Mano de obra».
2. Leer el árbol de accesibilidad del formulario.

**Observado.** Los campos aparecen como `textbox [ref]` sin nombre, mientras que
en los formularios de entidad aparecen correctamente como `textbox "Nombre"`,
`textbox "NIF"`. Inspeccionando el DOM del formulario de línea:

```json
[{"tag":"LABEL","html":"Tipo","htmlFor":""},   {"tag":"SELECT","id":"","name":""},
 {"tag":"LABEL","html":"Descripción","htmlFor":""},{"tag":"INPUT","id":"","name":""},
 {"tag":"LABEL","html":"Horas","htmlFor":""},  {"tag":"INPUT","id":"","name":""},
 {"tag":"LABEL","html":"Precio/hora","htmlFor":""},{"tag":"INPUT","id":"","name":""}]
```

Ninguna etiqueta tiene `htmlFor`, ningún campo tiene `id`, y los campos no están
anidados dentro de su etiqueta. En `/factures/nova` ocurre lo mismo con Cliente e
IVA (%): el árbol les da como nombre el valor que contienen, no su etiqueta.

**Esperado.** Etiquetas asociadas, como en el resto. **Por qué se espera eso:**
criterio del explorador, no documentado. Refuerza el argumento que la aplicación
ya lo hace bien donde usa su componente compartido:
`client/src/components/EntityForm.tsx` línea 43 usa `htmlFor={field.name}`, y
`FacturaForm.tsx` línea 114 lo usa para las casillas de albarán. Son solo estos
dos formularios los que se salen del patrón.

**Nota de alcance.** El formulario de línea de albarán es el que más se usa en un
taller: es donde se anota cada trabajo.

**Sugerencia para Doctor QA** (marcada como sugerencia). Dar `id` a los campos y
`htmlFor` a las etiquetas en `AlbaraLiniesSection.tsx` y en los dos campos
sueltos de `FacturaForm.tsx`.

---

## 5 · Aspecto y presentación

Agrupados aquí porque se corrigen juntos y los mira la misma persona. El detalle
completo de cada uno está en el apartado 4.

| Hallazgo | Qué se ve | Dónde se corrige |
|---|---|---|
| **EXP-011** | En tema oscuro, los enlaces de las fichas quedan a 3,45:1 de contraste, por debajo del mínimo legible | 18 apariciones de `text-primary-600` sin variante oscura, en las 7 pantallas de detalle |
| **EXP-012** | Menú lateral de 240 px fijos: a 375 px el documento se desborda 460 px y todos los botones de la ficha de albarán quedan fuera | `Layout.tsx:12` |
| **EXP-013** | Un nombre largo estira su columna y expulsa NIF, Teléfono y Email fuera de la pantalla, en todas las filas de la página | `DataTable.tsx:84` y `:113` |
| **EXP-014** | El mismo precio se ve como `8.5`, como `8.50 €` y con punto decimal en vez de coma | Transversal: hace falta una función única de formato |
| **EXP-009** | La fecha del albarán se muestra como `2026-08-21T15:25:05.101Z` | Listado y ficha de albaranes |
| **EXP-026** | El diálogo de borrado no dice qué se borra y no oscurece el fondo | `ConfirmDialog.tsx` |
| **EXP-021** | Campos sin etiqueta asociada en dos formularios | `AlbaraLiniesSection.tsx`, `FacturaForm.tsx` |
| **EXP-020** | El documento se declara en inglés en los dos idiomas | Donde se aplica el cambio de idioma |

**Lo que se revisó en aspecto y salió limpio**, para acotar el riesgo:

- El tema oscuro está bien resuelto en todo lo demás. Un barrido de contraste
  sobre el listado de clientes, los formularios de alta, el diálogo de
  confirmación y las pantallas de error en tema oscuro no encontró **ningún**
  texto por debajo de 4,5:1 fuera de EXP-011.
- El conmutador de tema y el de idioma funcionan y su elección persiste entre
  sesiones.
- No hay ni una clave de traducción cruda en pantalla, en ninguno de los dos
  idiomas.
- Los textos catalanes, más largos que los castellanos, no rompen la maquetación
  en ninguna de las pantallas recorridas.
- La ficha de la factura absorbe sin desbordarse un nombre de cliente de 281
  caracteres: el problema de EXP-013 es específico de las tablas, no general.
- La codificación de acentos, apóstrofos y guiones largos es correcta de punta a
  punta.

---

## 6 · Preguntas para negocio

Tres preguntas. Ninguna tiene respuesta escrita en `DOC-04` ni en `DOC-06`; se han
buscado antes de formularlas. Las tres se responden con un sí o un no.

**P-01 · ¿La decisión de bloquear importes negativos (Q-12) debe alcanzar también
al salario bruto, a las deducciones y al salario neto de una nómina?**

Contexto: el 2026-08-16 negocio decidió bloquear los importes negativos, y el
alcance escrito de esa decisión son el precio, el coste y el stock de una pieza,
el precio de una línea y el precio por hora. La nómina quedó fuera. Hoy el sistema
acepta unas deducciones de 1.500 € sobre un bruto de 1.000 € y muestra un salario
neto de **−500,00 €** (EXP-004). Si la respuesta es sí, EXP-004 entra en el mismo
evolutivo de Q-12 y no necesita uno propio.

**P-02 · ¿Debe el sistema acotar los valores de calendario y de medida que hoy no
tienen límite: el año de una nómina, el año de matriculación y el kilometraje de
un vehículo?**

Contexto: hoy se aceptan una nómina del año `999999` y un vehículo matriculado en
`2099` con `−500` kilómetros (EXP-005, EXP-015). El año de la nómina además
descoloca de forma permanente el orden que exige REQ-063. Si la respuesta es sí,
hace falta que negocio diga qué rangos considera válidos.

**P-03 · ¿Los importes deben presentarse con la coma decimal del castellano y del
catalán, en lugar del punto que se usa hoy?**

Contexto: la aplicación muestra `119.06 €`, `8.50 €` y `1360.00 €` (EXP-014).
`DOC-04` solo exige dos decimales y no dice nada del separador. **Esta pregunta
tiene una consecuencia que conviene conocer antes de contestar:** si la respuesta
es sí, los ficheros `.feature` de `automation/ui/` validan hoy literales como
`119.06 €` y `98.40 €`, y habría que actualizarlos. Eso es trabajo de A-03 y de
S-10, no del arreglo en sí.

---

## 7 · Datos dejados en el sistema

**Reversible: nada pendiente de revertir.** Lo que se pudo deshacer se deshizo
durante la sesión, usando la propia aplicación:

- El cliente duplicado id 13 (consecuencia de EXP-001) se borró desde la interfaz.
- La línea duplicada del albarán `2026/A-0005` (consecuencia de EXP-002) se retiró
  desde la interfaz, y el stock de «Filtre d'oli» volvió de 35 a 37 correctamente.
- La nómina de prueba id 6 (`7.5/999999`, neto −500,00 €) se borró desde la
  interfaz.
- Al cliente id 14 se le restauraron el nombre `Núria O'Brien Sant Martí` y el
  correo `nuria.obrien@example.com`, que se habían dejado en un nombre de 281
  caracteres y `esto-no-es-un-email` para EXP-013 y EXP-016. Su campo Notas queda
  con el texto `Cliente creado por la exploración A-10 del 2026-08-21`.
- **No se ha borrado ningún dato del seed ni ningún dato ajeno**, y no se ha
  regenerado la base.

**Permanente:**

| Qué queda | Por qué no se puede deshacer |
|---|---|
| Cliente id **14**, «Núria O'Brien Sant Martí», NIF `99999999Z` | Tiene un vehículo y una factura asociados; el sistema impide borrarlo, y con razón |
| Vehículo id **7**, «Citroën C4 Picasso — 7788 QAX» | Tiene un albarán asociado. **Conserva a propósito `any_matriculacio: 2099` y `quilometratge: -500`**, que son la evidencia viva de EXP-015; se pueden corregir desde `/vehicles/7/editar` cuando se quiera |
| Albarán **2026/A-0005** (id 5), 112,00 € | Ya facturado: BR-ALB-03 lo bloquea |
| Albarán **2026/A-0006** (id 6), 40,00 € | Ya facturado: BR-ALB-03 lo bloquea |
| Factura **2026/F-0002**, 135,52 €, cliente 14 | **BUG-004**: no existe endpoint de borrado ni de modificación de factura |
| Factura **2026/F-0003**, 48,40 €, cliente 3 (Anna Puig Ferrer) | **BUG-004**, mismo motivo |
| Stock: «Filtre d'oli» 39 → **37**, «Bateria 60Ah» 10 → **9** | Consumido por el albarán `2026/A-0005`, que ya está facturado y no se puede tocar. Se puede reponer a mano desde `/peces/:id/editar`, tal como describe `DOC-06` tarea B.3 |

Ninguna otra pieza cambió de stock. El resto del seed —los 12 clientes
originales, los 6 vehículos, los 4 albaranes, la factura `2026/F-0001`, los 5
empleados y las 5 nóminas— está intacto.

Si se prefiere el entorno limpio, `rm -f data/taller.db && npm run seed` lo
devuelve al estado inicial. **No se ha hecho**, porque destruiría también el
escenario de cualquier otro que esté trabajando sobre esta base.

---

## 8 · Pistas descartadas

Se registran para que Doctor QA no gaste tiempo en ellas.

**Las peticiones duplicadas no son un defecto.** Casi todas las cargas disparan
dos `GET` idénticos —por ejemplo dos `GET /api/clients` seguidos al abrir el
listado—. Es el doble efecto de `React.StrictMode` en desarrollo, confirmado en
`client/src/main.tsx` líneas 1 y 8-10. En una compilación de producción no
ocurre. **No es una petición duplicada de la aplicación.**

**«Crea la factura» no es un texto sin traducir.** El botón de emisión dice «Crea
la factura» tanto en castellano como en catalán, y el primer vistazo sugiere una
clave sin traducir. No lo es: la clave `factures.form.submit` vale lo mismo en los
dos ficheros de `client/src/locales/` porque la frase coincide en ambos idiomas,
igual que ocurre con `factures.empty.action` y `nomines.empty.action`. Un cotejo
de los 247 pares de claves encontró 28 valores idénticos y **todos** son
legítimos: `NIF`, `Email`, `Marca`, `Color`, `Total`, `IVA`, `Mes`, `Subtotal`,
`Bastidor (VIN)`, `DNI/NIE` y similares. **No hay ninguna clave sin traducir.**
Lo único que queda es una inconsistencia cosmética menor: ese botón dice «Crea la
factura» mientras todos los demás formularios dicen «Guardar». No se le ha dado
número por no inflar el informe.

**La ficha de cliente no llevaba al cliente equivocado.** Tras el doble alta de
EXP-001, el botón «Nuevo vehículo» de `/clients/14` apuntaba a `?clientId=13`.
Parecía un defecto de la ficha. Se descartó cargando `/clients/14` de cero: el
botón apunta correctamente a `?clientId=14`. El descuadre solo existe mientras hay
dos navegaciones compitiendo, y por eso se ha documentado como efecto de EXP-001 y
no como hallazgo propio.

**Los acentos y apóstrofos no están rotos.** Una primera lectura de la API por
línea de órdenes mostró `RevisiÃ³ dels 100.000 km â€" exploraciÃ³ QA` y parecía
una corrupción de codificación. Se descartó: era la consola de Windows
interpretando bytes UTF-8 como cp1252. Releído forzando UTF-8, el valor es
`Revisió dels 100.000 km — exploració QA`, y la interfaz lo muestra bien. **No es
un defecto de la aplicación.**

---

## 9 · Bloque estructurado

```yaml hallazgos
version: 1
project: app-taller
explorado_en: 2026-08-21T16:05:00+02:00
entorno:
  ui: http://localhost:5173
  api: http://localhost:3001
  navegador: Chromium controlado por herramientas, 1280x900 salvo indicación
  datos: base recién sembrada con npm run seed, sin residuos previos
  commit: 83a95c5623a68ffd4cb2082c7d6c1edd2e111633
  rama: master
  arbol_limpio: true
cartas:
  - id: CH-01
    mision: Recorrer el flujo real de punta a punta sin atajos, buscando fricción
    resultado: hallazgos encontrados
  - id: CH-02
    mision: Buscar valores que el sistema acepte y no debería en Clientes, Vehículos y Nóminas
    resultado: hallazgos encontrados
  - id: CH-03
    mision: Doble pulsación, atrás, recarga, URL directa a id inexistente y a ruta inexistente
    resultado: hallazgos encontrados
  - id: CH-04
    mision: Concurrencia con dos pestañas sobre la misma ficha de cliente
    resultado: hallazgos encontrados
  - id: CH-05
    mision: Concurrencia en el camino del dinero, dos pestañas emitiendo factura del mismo albarán
    resultado: sin hallazgos
  - id: CH-06
    mision: Confirmar el candidato a BUG-005 y medir su alcance real
    resultado: hallazgos encontrados
  - id: CH-07
    mision: Recorrer las pantallas en tema oscuro buscando texto ilegible
    resultado: hallazgos encontrados
  - id: CH-08
    mision: Anchura móvil 375 px, tablet 768 px y desbordamiento por contenido largo
    resultado: hallazgos encontrados
  - id: CH-09
    mision: Consola y red tras cada acción, buscando errores que no llegan a la pantalla
    resultado: sin hallazgos
  - id: CH-10
    mision: Coherencia del mismo dato entre pantallas — stock, precios, fechas y totales
    resultado: hallazgos encontrados
  - id: CH-11
    mision: Volver sobre lo corregido y comprobar en vivo que BUG-001 y BUG-002 están cerrados
    resultado: sin hallazgos sobre las correcciones; 1 hallazgo de documentación desactualizada
hallazgos:
  - id: EXP-002
    titulo: Un doble clic en «Añadir línea» duplica la línea y descuenta el stock dos veces
    tipo: defecto
    severidad: critical
    pantalla: Detalle de albarán
    ruta: /albarans/5
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Dos POST /api/albarans/5/linies → 201 Created; GET /api/albarans/5 devuelve dos líneas id 8 e id 9 con quantitat 2 y preu 8.5; GET /api/peces/1 pasa de "estoc":39 a "estoc":35'
    hipotesis_causa: 'El botón de envío no se deshabilita mientras la petición está en vuelo (AlbaraLiniesSection.tsx); no se ha localizado la línea exacta'
    sugerencia: Deshabilitar el botón durante la petición; decidir si el arreglo es transversal con EXP-001 o local
    deriva_a: A-14
  - id: EXP-003
    titulo: 'Dos pestañas sobre la misma ficha: la última que guarda pisa a la otra sin avisar'
    tipo: defecto
    severidad: high
    pantalla: Edición de cliente
    ruta: /clients/14/editar
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'PUT /api/clients/14 → 200 OK deja "telefon":"611111111" a las 15:39:50; un segundo PUT desde la pestaña estancada → 200 OK lo devuelve a "telefon":"600999888" a las 15:40:39, sin aviso'
    hipotesis_causa: El PUT envía el objeto completo leído al cargar el formulario y sobrescribe sin comparar versión; no hay If-Match ni actualitzat_el en el cuerpo
    sugerencia: Decidir primero entre bloqueo optimista y fusión por campos; actualitzat_el ya existe en todas las tablas
    deriva_a: null
  - id: EXP-007
    titulo: La ficha de la factura no muestra el importe del IVA, y TC-073 y TC-075 están verdes
    tipo: defecto
    severidad: high
    pantalla: Detalle de factura
    ruta: /factures/1
    reproducible: si
    cubierto_por_tc: TC-073, TC-075
    evidencia: 'La pantalla muestra IVA 21%, BASE IMPONIBLE 98.40 €, TOTAL 119.06 € y ningún importe de IVA. GET /api/factures/1 sí devuelve "iva_import":20.66. TC-073 valida solo baseEsperada y totalEsperado; TC-075 valida solo albaran, base y total'
    hipotesis_causa: client/src/pages/factures/FacturaDetail.tsx:98-100 renderiza {factura.ivaPercentatge}% y no usa ivaImport
    sugerencia: Mostrar el importe además del tipo; el refuerzo de TC-073 y TC-075 es trabajo de A-03, no de Doctor QA
    deriva_a: A-14
  - id: EXP-001
    titulo: Un doble clic en «Guardar» da de alta el registro dos veces
    tipo: defecto
    severidad: high
    pantalla: Alta de cliente
    ruta: /clients/nou
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Dos POST /api/clients → 201 Created; GET /api/clients devuelve los ids 13 y 14 con nom, nif y adreca idénticos. La URL quedó en /clients/14 mientras «Nuevo vehículo» apuntaba a /vehicles/nou?clientId=13'
    hipotesis_causa: El botón de envío no se bloquea durante la petición; EntityForm.tsx es compartido, así que se espera lo mismo en los demás altas (no verificado)
    sugerencia: Comprobar si el arreglo de EXP-002 cabe en EntityForm.tsx y cubre este de paso
    deriva_a: A-14
  - id: EXP-004
    titulo: Una nómina admite deducciones mayores que el bruto y presenta un salario neto negativo
    tipo: defecto
    severidad: high
    pantalla: Detalle de nómina
    ruta: /nomines/nova
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'POST /api/nomines → 201 Created con brut 1000 y deduccions 1500. La ficha muestra SALARIO NETO -500.00 € y el listado la fila 07/2026 · Pendiente · -500.00 €. Consola limpia'
    hipotesis_causa: server/routes/nomines.js valida empleado, mes, año y el rango 1-12, pero no el signo ni la relación bruto/deducciones; los campos del cliente son input type=number sin min
    sugerencia: No tocar hasta que negocio conteste P-01; si procede, resolverlo en la misma validación que Q-12
    deriva_a: null
  - id: EXP-006
    titulo: Todos los avisos de error del servidor salen en catalán aunque la interfaz esté en castellano
    tipo: defecto
    severidad: medium
    pantalla: Transversal, los 7 módulos
    ruta: /nomines, /vehicles/nou, /clients/14, /albarans/5, /clients/99999
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Pantalla con los dos idiomas a la vez: «Nòmina no trobada» sobre «Volver a intentarlo». Además, con interfaz en castellano: «Ja existeix un vehicle amb aquesta matrícula» (409), «El client té vehicles associats i no es pot esborrar» (409), «Estoc insuficient: hi ha 8 unitats de "Corretja de distribució"» (409), «No es pot canviar el vehicle a un que pertany a un altre client» (409), «Client no trobat» (404). Recuento en server/routes: albarans 20, nomines 13, vehicles 12, clients 7, factures 7, peces 6, personal 6 — total 71, todos en catalán'
    hipotesis_causa: Los res.status(...).json({error:'…'}) de server/routes/*.js llevan el texto incrustado y el cliente lo muestra sin pasarlo por i18next
    sugerencia: 'Devolver un código de error estable desde la API y traducirlo en el cliente: 71 claves nuevas en client/src/locales/ y un contrato de error. Decisión previa del propietario'
    deriva_a: A-14
  - id: EXP-005
    titulo: El mes de una nómina admite decimales y el año no tiene ningún límite
    tipo: defecto
    severidad: medium
    pantalla: Edición de nómina
    ruta: /nomines/6/editar
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'PUT /api/nomines/6 → 200 OK con mes 7.5 y any_nomina 999999. La ficha titula «7.5/999999» y el listado la coloca en primera posición por encima de 02/2026. Campos leídos del DOM: {"min":"","max":"","step":""}'
    hipotesis_causa: La validación de servidor comprueba el intervalo 1-12 pero no la integralidad; sobre el año no hay comprobación
    sugerencia: Exigir entero en el mes; el año, pendiente de P-02
    deriva_a: null
  - id: EXP-008
    titulo: Una ruta que no existe deja una página completamente en blanco, sin siquiera el menú
    tipo: defecto
    severidad: medium
    pantalla: Ruta desconocida
    ruta: /ruta-que-no-existe
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'document.getElementById("root").innerHTML tiene longitud 0. Ni contenido, ni menú, ni mensaje. La consola no registra ningún error'
    hipotesis_causa: client/src/App.tsx no declara ninguna ruta comodín path="*"; verificado en las líneas 29-31 y 62-78
    sugerencia: Ruta comodín dentro del Layout reutilizando el componente de estado de error; decidir a la vez el enlace de vuelta de EXP-019
    deriva_a: A-15
  - id: EXP-009
    titulo: La fecha del albarán se muestra como marca de tiempo cruda y al editar se pierde la hora
    tipo: defecto
    severidad: medium
    pantalla: Listado y detalle de albarán
    ruta: /albarans
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'La columna Fecha muestra 2026-08-21T15:25:05.101Z en las cinco filas. Tras abrir Editar y pulsar Guardar sin cambiar nada, GET /api/albarans devuelve "data":"2026-08-21T00:00:00.000Z" para el mismo albarán'
    hipotesis_causa: null
    sugerencia: Dar formato a la fecha al presentarla, y decidir aparte si el albarán guarda fecha con hora o solo fecha
    deriva_a: A-14
  - id: EXP-010
    titulo: El desplegable de piezas del albarán sigue ofreciendo el stock viejo después de añadir una línea
    tipo: defecto
    severidad: medium
    pantalla: Detalle de albarán
    ruta: /albarans/5
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Tras añadir una línea de 1 unidad con un solo clic, el desplegable sigue diciendo «Bateria 60Ah (10)» mientras GET /api/peces/7 devuelve "estoc":9. Recargando la página pasa a (9)'
    hipotesis_causa: El catálogo de piezas solo se carga al montar el componente, no tras añadir o retirar línea
    sugerencia: Recargar el catálogo al añadir y al retirar línea
    deriva_a: A-14
  - id: EXP-011
    titulo: En tema oscuro los enlaces de las fichas quedan por debajo del contraste mínimo legible
    tipo: defecto
    severidad: medium
    pantalla: Fichas de detalle, tema oscuro
    ruta: /factures/1
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Medición sobre la página renderizada: color rgb(37, 99, 235) sobre fondo rgb(15, 23, 42), ratio 3.45 con texto de 14px, en «← Volver al listado», «Marc Vidal Soler» y «2026/A-0002». Los enlaces del menú, con variante oscura, llegan a 12:1 en el mismo fondo'
    hipotesis_causa: 'Clase text-primary-600 sin variante dark:, en 18 apariciones: AlbaraDetail 4, ClientDetail 3, FacturaDetail 3, VehicleDetail 3, PersonalDetail 2, NominaDetail 2, PecaDetail 1'
    sugerencia: Extraer un componente o clase de utilidad en vez de parchear los 18 sitios
    deriva_a: A-14
  - id: EXP-012
    titulo: En anchura de móvil la barra lateral no se repliega y todos los botones de acción quedan fuera
    tipo: defecto
    severidad: medium
    pantalla: Transversal
    ruta: /albarans/5
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'A 375 px de ancho visible, /clients desborda 460 px y /albarans/5 desborda 266 px. En /albarans/5 quedan enteramente fuera del borde: Castellano, Catalán, el botón de tema, Editar, Eliminar del albarán, los dos Eliminar de línea y Añadir línea. A 768 px, /clients aún desborda 82 px'
    hipotesis_causa: client/src/components/Layout.tsx:12 declara el menú como w-60 shrink-0, ancho fijo sin punto de ruptura
    sugerencia: No tocar hasta que producto diga si el móvil está en alcance; el peor caso de 320 px no se ha podido medir
    deriva_a: null
  - id: EXP-013
    titulo: Un nombre largo ensancha la columna y expulsa el resto de la tabla fuera de la pantalla
    tipo: defecto
    severidad: medium
    pantalla: Listado de clientes
    ruta: /clients
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Con un nombre de 281 caracteres y 1265 px visibles: columna Nombre 1023 px, tabla 1426 px, desbordamiento 449 px, columna NIF empezando en x=1287. Las otras dos filas de la página pierden NIF, Teléfono y Email'
    hipotesis_causa: client/src/components/DataTable.tsx:84 declara la tabla sin table-fixed, sin contenedor con desplazamiento propio y sin truncado en las celdas (línea 113)
    sugerencia: Es un componente único; el arreglo cubre los siete listados de golpe
    deriva_a: A-14
  - id: EXP-014
    titulo: El mismo precio se presenta de tres formas distintas según la pantalla
    tipo: defecto
    severidad: medium
    pantalla: Catálogo de piezas y fichas
    ruta: /peces
    reproducible: si
    cubierto_por_tc: null
    evidencia: '«Filtre d''oli» se muestra como 8.5 en /peces, como 8.50 € en /peces/1 y como 8.50 € en la línea de /albarans/5. Todos los importes usan punto decimal: 119.06 €, 1360.00 €. Sin separador de miles'
    hipotesis_causa: null
    sugerencia: Función única de formato de importe. Antes de escribirla, respuesta a P-03, porque el cambio a coma afectaría a los literales de los .feature
    deriva_a: A-14
  - id: EXP-015
    titulo: Un vehículo admite año de matriculación futuro y kilometraje negativo
    tipo: defecto
    severidad: medium
    pantalla: Alta de vehículo
    ruta: /vehicles/nou
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'POST /api/vehicles → 201 Created. GET /api/vehicles/7 devuelve "any_matriculacio":2099 y "quilometratge":-500. La ficha los muestra tal cual. Campos input type=number sin min ni max'
    hipotesis_causa: null
    sugerencia: Esperar a P-02. El vehículo 7 conserva estos valores como evidencia y se corrige desde /vehicles/7/editar
    deriva_a: null
  - id: EXP-016
    titulo: Los formularios llevan la validación del navegador desactivada, pasa un correo sin arroba y un nombre de 281 caracteres
    tipo: defecto
    severidad: medium
    pantalla: Edición de cliente
    ruta: /clients/14/editar
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Estado del formulario antes de guardar: {"nomLen":281,"email":"esto-no-es-un-email","emailType":"email","formNoValidate":true,"maxlen":-1}. Tras guardar, GET /api/clients/14 confirma len nom 281 y email esto-no-es-un-email'
    hipotesis_causa: client/src/components/EntityForm.tsx:39 declara el formulario con noValidate; es el componente compartido por todos los formularios de entidad
    sugerencia: Decidir antes si la validación de formato la hace el navegador, el cliente o el servidor; quitar noValidate traería mensajes en el idioma del sistema y chocaría con EXP-006
    deriva_a: A-14
  - id: EXP-017
    titulo: Se puede abandonar un formulario a medio rellenar sin ningún aviso y lo escrito se pierde
    tipo: mejora
    severidad: medium
    pantalla: Todos los formularios
    ruta: /clients/3/editar
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Cambiar el Nombre y pulsar «Piezas» navega sin diálogo; el botón atrás devuelve el valor original. En /peces/nou, recargar vacía el campo y no hay ningún manejador de beforeunload'
    hipotesis_causa: null
    sugerencia: Un aviso de cambios sin guardar enganchado a la navegación interna y a beforeunload cubre los dos casos
    deriva_a: A-12
  - id: EXP-018
    titulo: Retirar una línea de albarán no pide confirmación, a diferencia de todos los demás borrados
    tipo: defecto
    severidad: medium
    pantalla: Detalle de albarán
    ruta: /albarans/5
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Un clic en «Eliminar» de la fila borra la línea al instante, sin diálogo. En la misma aplicación, borrar cliente, vehículo, pieza, empleado, nómina y albarán sí abren «Confirmar eliminación». REQ-039 no menciona confirmación; REQ-008, 016, 023, 041, 061 y 074 sí'
    hipotesis_causa: null
    sugerencia: Reutilizar ConfirmDialog; consultar antes a negocio si añade fricción indeseada
    deriva_a: null
  - id: EXP-022
    titulo: El desplegable de vehículos no dice de qué cliente es cada vehículo y ahora eso hace fallar la operación
    tipo: mejora
    severidad: medium
    pantalla: Edición de albarán
    ruta: /albarans/5/editar
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Las siete opciones son del tipo «Ford Focus — 2345FGH», sin cliente. Elegir una de otro cliente y guardar se rechaza con «No es pot canviar el vehicle a un que pertany a un altre client»'
    hipotesis_causa: null
    sugerencia: Filtrar por cliente al editar; al crear hay que poder elegir cualquiera. Son dos casos distintos
    deriva_a: A-15
  - id: EXP-023
    titulo: El listado de nóminas no dice de qué empleado es cada nómina
    tipo: mejora
    severidad: medium
    pantalla: Listado de nóminas
    ruta: /nomines
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Columnas Período, Pago y Neto. Tres filas 01/2026 indistinguibles salvo por el importe, dos de ellas con el mismo neto 1360.00 € que la de febrero. DOC-06:962 instruye a «Abre la nómina que buscas» desde este listado'
    hipotesis_causa: null
    sugerencia: El dato ya viaja en la respuesta de la API. Mirarlo junto al evolutivo de Q-15, que toca esta misma pantalla
    deriva_a: A-15
  - id: EXP-024
    titulo: Al emitir una factura la lista de albaranes pendientes solo muestra el número
    tipo: mejora
    severidad: medium
    pantalla: Emisión de factura
    ruta: /factures/nova
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'La sección «Albaranes pendientes de este cliente» muestra solo «2026/A-0006» y «2026/A-0001», sin fecha, vehículo ni importe. La base y el total solo aparecen tras emitir, y emitir es irreversible (DOC-06:588 y BUG-004)'
    hipotesis_causa: null
    sugerencia: Comprobar si la respuesta que ya alimenta la pantalla trae el importe por albarán antes de dimensionar el cambio
    deriva_a: A-15
  - id: EXP-025
    titulo: El manual describe como vigente el comportamiento de stock que ya se corrigió
    tipo: defecto
    severidad: medium
    pantalla: Documentación
    ruta: docs/DOC-06-MANUAL-USUARIO.md
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'DOC-06:449-451 dice «la aplicación te deja anotar más unidades de las que tienes en el catálogo, sin avisarte» y DOC-06:764-765 «La aplicación no lo impide ni te avisa». En vivo, pedir 999 unidades de una pieza con 8 devuelve 409 con «Estoc insuficient: hi ha 8 unitats de "Corretja de distribució"», la línea no se crea y GET /api/peces/6 mantiene "estoc":8'
    hipotesis_causa: Documentación no actualizada tras la corrección de BUG-001
    sugerencia: No es trabajo de Doctor QA sino de A-04, que mantiene DOC-06
    deriva_a: null
  - id: EXP-026
    titulo: El diálogo de confirmación de borrado no dice qué registro se va a borrar
    tipo: mejora
    severidad: medium
    pantalla: Diálogo de confirmación
    ruta: /clients/13
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'El diálogo dice «¿Seguro que quieres eliminar este cliente? Esta acción no se puede deshacer», sin nombre, con dos clientes homónimos en pantalla. No oscurece el fondo. DOC-06:256 advierte que borrar no tiene vuelta atrás'
    hipotesis_causa: null
    sugerencia: ConfirmDialog.tsx es único; pasarle el nombre cubre todos los borrados. El oscurecimiento del fondo es cambio aparte
    deriva_a: A-12
  - id: EXP-019
    titulo: Las pantallas de error no ofrecen salida, solo «Volver a intentarlo», que vuelve a fallar
    tipo: mejora
    severidad: low
    pantalla: Estado de error de ficha
    ruta: /clients/99999
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'El contenido completo de la pantalla es «Client no trobat» y «Volver a intentarlo». Cada pulsación dispara otro GET /api/clients/99999 → 404. El menú lateral sí está presente'
    hipotesis_causa: null
    sugerencia: Distinguir en ErrorState.tsx entre error recuperable y registro inexistente; va bien junto con EXP-008
    deriva_a: A-12
  - id: EXP-020
    titulo: El atributo de idioma del documento se queda en «en» en los dos idiomas
    tipo: defecto
    severidad: low
    pantalla: Transversal
    ruta: /clients
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Antes: {"htmlLang":"en","storedLang":null} con el menú en castellano. Después de pulsar Catalán: {"htmlLang":"en","storedLang":"ca"} con el menú en catalán'
    hipotesis_causa: null
    sugerencia: Ajustar document.documentElement.lang donde se aplica el cambio de idioma, junto a la escritura de taller:lang:v1
    deriva_a: A-14
  - id: EXP-021
    titulo: Campos sin etiqueta asociada en el alta de líneas de albarán y en la emisión de factura
    tipo: defecto
    severidad: low
    pantalla: Formulario de línea de albarán y emisión de factura
    ruta: /albarans/5
    reproducible: si
    cubierto_por_tc: null
    evidencia: 'Las cuatro etiquetas del formulario de línea tienen htmlFor vacío y sus campos no tienen id ni están anidados; el árbol de accesibilidad los expone sin nombre. En /factures/nova, Cliente e IVA (%) reciben como nombre su valor. En cambio EntityForm.tsx:43 usa htmlFor={field.name} y FacturaForm.tsx:114 lo usa en las casillas de albarán'
    hipotesis_causa: AlbaraLiniesSection.tsx y los dos campos sueltos de FacturaForm.tsx se salen del patrón del componente compartido
    sugerencia: Dar id a los campos y htmlFor a las etiquetas en esos dos formularios
    deriva_a: A-14
preguntas_negocio:
  - id: P-01
    pregunta: ¿La decisión de bloquear importes negativos (Q-12) debe alcanzar también al salario bruto, las deducciones y el neto de una nómina?
    relacionada_con: EXP-004
  - id: P-02
    pregunta: ¿Debe el sistema acotar el año de una nómina, y el año de matriculación y el kilometraje de un vehículo?
    relacionada_con: EXP-005, EXP-015
  - id: P-03
    pregunta: ¿Los importes deben presentarse con la coma decimal del castellano y del catalán en lugar del punto que se usa hoy?
    relacionada_con: EXP-014
verificacion_de_correcciones:
  - bug: BUG-001
    estado: cerrado
    comprobado_el: 2026-08-21
    evidencia: 'Pedir 999 unidades de una pieza con 8 en catálogo devuelve 409 «Estoc insuficient: hi ha 8 unitats de "Corretja de distribució"»; la línea no se crea y el stock queda en 8'
  - bug: BUG-002
    estado: cerrado
    comprobado_el: 2026-08-21
    evidencia: Cambiar el albarán 2026/A-0005 al vehículo Ford Focus — 2345FGH, de otro cliente, se rechaza con «No es pot canviar el vehicle a un que pertany a un altre client» y el albarán no se mueve
datos_dejados:
  reversibles: 'Nada pendiente. Durante la sesión se deshicieron desde la propia interfaz: el cliente duplicado id 13, la línea duplicada del albarán 2026/A-0005 (el stock de Filtre d''oli volvió de 35 a 37), la nómina de prueba id 6, y el nombre y el correo del cliente id 14, restaurados a «Núria O''Brien Sant Martí» y nuria.obrien@example.com. No se borró ningún dato del seed ni ajeno, y no se regeneró la base'
  permanentes: 'Cliente id 14 (tiene vehículo y factura, el sistema impide borrarlo). Vehículo id 7 «Citroën C4 Picasso — 7788 QAX», que conserva a propósito any_matriculacio 2099 y quilometratge -500 como evidencia viva de EXP-015 y se puede corregir desde /vehicles/7/editar. Albaranes 2026/A-0005 (112,00 €) y 2026/A-0006 (40,00 €), bloqueados por BR-ALB-03 al estar facturados. Facturas 2026/F-0002 (135,52 €, cliente 14) y 2026/F-0003 (48,40 €, cliente 3), irreversibles por BUG-004. Stock consumido por el albarán 2026/A-0005: Filtre d''oli 39→37 y Bateria 60Ah 10→9, reponible a mano según DOC-06 tarea B.3. El resto del seed está intacto'
```

---

**Nota final para quien apruebe este informe.** Nada de lo que hay aquí es una
orden. Son 26 observaciones con su reproducción y una sugerencia de por dónde
empezar; qué se toca y en qué orden lo decide el propietario del proyecto. Tres
de ellas —EXP-004, EXP-005 y EXP-015— **no deberían tocarse hasta que negocio
conteste** las preguntas P-01 y P-02, y EXP-014 arrastra un impacto sobre la
suite automatizada que corresponde a A-03 y a S-10, no a Doctor QA.
