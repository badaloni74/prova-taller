---
doc_id: DOC-08
doc_name: DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client
version: 2.1.0
status: draft
generator: A-06 refinamiento / intake
generator_version: "1.0"
generated_at: 2026-08-17T13:55:00+02:00
language: es
project: app-taller
evolutivo_id: EVO-001
history_document: docs/DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client-HIST.md
history_note: >-
  este documento no lleva historial de cambios: refleja solo el estado actual, con su version en
  este front-matter. Que cambio en cada version, y por que, esta en el fichero -HIST.md, que
  declara ademas la version del documento que acompana en el campo `version` (asi lo lee S-16;
  corregido en 2.1.0 tras su aviso `sin_version`)
source:
  repo_path: C:\Claude\appdani
  vcs: git
  branch: master
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  working_tree_clean: false   # sin versionar: docs/, automation/ y registro-ids.json, generados por este ciclo
inputs:
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.2.0
    hash: sha256:7d1844156487a62b8936a0d2164ebec043eb7fdb7043d27afdd649316f9b63a0
    present: true
    usage: >-
      pregunta Q-10 respondida el 2026-08-16, requisitos vigentes REQ-040, REQ-046, REQ-042,
      REQ-041, REQ-027, REQ-011 y REQ-015
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    version: 1.0.0
    hash: sha256:4e49485c3ad1529b2eee9d56487e188617011d772fe5908740cbed4114f01097
    present: true
    usage: UC-ALB-06, UC-ALB-07, UC-VEH-04, BR-ALB-01, BR-ALB-03, ACT-01 y el glosario
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
    usage: BUG-002, evidencia de que el hueco existe en el sistema desplegado
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.5.0
    hash: sha256:f2e13dbc75e4a3d78d1ed48288217f2f47a16e1e25262ae08de8488273281e1c
    present: true
    added_in: 2.0.0
    updated_in: 2.1.0
    previous_version: 1.4.1
    usage: >-
      Q-18, cerrada el 2026-08-17 en dos mitades (apartado 6.5 de DOC-05); la politica del
      apartado 4.12 —un caso va por servicio solo cuando el vector no existe en la interfaz—;
      el campo `verification_path` de los 110 casos y el precedente de TC-041. Solo se cita:
      este documento no toca DOC-05
    obsolescence_note: >-
      la 2.0.0 declaraba 1.4.1 cuando DOC-05 ya iba por 1.5.0. Lo detecto S-16 · Cascada de
      obsolescencia y se corrige aqui: el resello no es cosmetico, porque entre 1.4.1 y 1.5.0
      Q-18 paso de `open` a `answered` y eso es justamente lo que sostenia el apartado 4.2
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 1.0.0
    hash: sha256:efcf62b82a986c02d9b838c7e5bbf7142e22ed4b63a6402f3ce92bacd2f39d5c
    present: true
    added_in: 2.1.0
    usage: >-
      tres hallazgos que tocan a este documento: la confirmacion en codigo de que REQ-046 se
      refuerza (factures.js:72-77), los datos de ejemplo que dan un vehiculo por cliente
      (seed.js:33-39) y el dimensionado de PD-002 (vehicles.js:93). Se cita, no se copia
    boundary_note: >-
      DOC-09 es consumidor de este documento y aqui se lee de vuelta. A-06 no toca DOC-09 ni
      asume su analisis tecnico: solo recoge lo que afecta a que sus criterios sean
      verificables y a la procedencia que declara
  - id: registro-ids.json
    from: S-12
    present: true
    hash: sha256:afca8a7f31c6da308a6c7060e52beda89419727ed4278787b87ab2ea1f232b3f
    updated_in: 2.1.0
    usage: >-
      reserva del identificador EVO-001 (`next --prefix EVO`). Desde la 2.0.0 EVO-001 esta
      censado: S-12 ya conoce el bloque `evolutivo` y el registro va por 311 anclas. En 2.1.0
      solo se resella el hash: no se ha pedido ningun identificador nuevo
  - id: contexto-confluence
    from: I-02
    present: false
  - id: entrevista-con-el-peticionario
    from: humano
    present: false
    note: >-
      no se ha podido celebrar: esta ejecucion corre en segundo plano y no admite preguntas
      interactivas. Lo resuelto con documentos va marcado con su apoyo; lo que exige persona
      esta en el apartado 6
  - id: decision-de-negocio-PD-001
    from: humano (peticionario de negocio)
    present: true
    received_on: 2026-08-17
    scope: >-
      resuelve PD-001 y solo PD-001: el desplegable de vehiculos del albaran filtra por el
      cliente actual. No toca PD-002 ni PD-003, que siguen abiertas
gate:
  status: pending
  owner: peticionario de negocio
  required: >-
    el peticionario valida que esta especificacion refleja lo que pidio. A-07 y A-08 pueden
    trabajar sobre el borrador, pero nada se implementa antes de esa validacion
---

# DOC-08 · Especificación de evolutivo — `EVO-001` · Un albarán no puede cambiar de cliente

> Qué debe pasar a hacer la aplicación y cómo se comprueba, en lenguaje de negocio.
> Este documento **no** estima (eso es A-08), **no** analiza el impacto técnico (A-07),
> **no** diseña la solución (S-04) y **no** escribe casos de prueba (A-03).

**Aviso sobre el refinamiento.** El contrato de A-06 es una entrevista, y la ejecución que
escribió la 1.0.0 corría en segundo plano: no hubo con quién hablar. Todo lo que se pudo
resolver leyendo `DOC-04` y `DOC-01` está resuelto **y dice en qué se apoya**; lo que exigía
una decisión humana quedó en el apartado 6 sin inventar la respuesta. Fueron tres puntos.

**Qué ha cambiado en la 2.0.0.** El peticionario de negocio resolvió **PD-001** el
**2026-08-17**: el desplegable de vehículos del albarán **filtra por el cliente actual**. Los
criterios de aceptación ya no valen para las dos formas posibles, sino para esa. **PD-002** y
**PD-003** siguen abiertas y ninguna bloquea. El detalle del salto de versión está en
`DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client-HIST.md`.

**Qué ha cambiado en la 2.1.0.** Nada del comportamiento pedido. Tres cosas de fuera:

1. **`DOC-05/Q-18` está cerrada** (A-03, 2026-08-17) y **a favor de lo que este documento
   necesitaba**. El apartado **4.2** se reescribe para decir cómo quedó —no se borra la
   advertencia, que era correcta y sirvió—. El riesgo que describía, que `AC-002` se quedara
   sin forma de comprobarse, **no se ha materializado**.
2. **Los criterios `AC-010` y `AC-011` no eran distinguibles con los datos que hay.** Lo
   detectó `DOC-09` (A-07). Se corrige donde le toca a A-06: en la **precondición** de
   `AC-010`, y con un apartado nuevo, **4.3**, que declara qué datos hacen falta para que
   estos criterios se puedan verificar. Generar los datos no es de A-06; decir cuáles hacen
   falta, sí.
3. **Se resella la procedencia**: `DOC-05` pasa de 1.4.1 —que era la versión declarada, no la
   vigente: aviso de `S-16 · Cascada de obsolescencia`— a **1.5.0**, y entra `DOC-09` como
   entrada leída de vuelta.

**Lo que no ha cambiado en la 2.1.0.** El comportamiento pedido, los once criterios en lo que
exigen, `affects_requirements`, `contradicts`, `PD-002` y `PD-003` —las dos siguen abiertas— y
el `gate`, que sigue **`pending`**: la validación es del peticionario de negocio.

---

## 1. Qué se pide y por qué

Hoy, cuando un albarán está todavía pendiente de facturar, se le puede cambiar el vehículo
sin ninguna restricción. Si el vehículo nuevo es de **otro cliente**, el trabajo anotado en
ese albarán pasa a ser, a todos los efectos, trabajo de ese otro cliente: la aplicación
resuelve a quién se factura mirando de quién es el vehículo **en el momento de emitir la
factura**, no en el momento de abrir el albarán. Nadie avisa de nada, ni al elegir el
vehículo ni al guardar ni al facturar. El manual de usuario llega a documentarlo como una
advertencia al usuario (`DOC-06`, tarea A.13, «Cuidado con cambiar el vehículo»), que es
tanto como reconocer que la única defensa que hay hoy es que el usuario se acuerde.

El taller pide que la aplicación lo impida. Lo que se protege no es la comodidad del
usuario: es **a quién se le cobra el trabajo**. El resultado de un cambio equivocado no es
un aviso ni una pantalla rara, sino una factura numerada y válida emitida a un cliente que
no pidió ese trabajo, indistinguible de una correcta, y que hoy además no se puede anular.
Corregir el vehículo dentro del mismo cliente —abrir el albarán al coche equivocado de una
familia con dos coches es el error normal del día a día— **sigue permitido**, porque ahí no
cambia quién paga.

## 2. De dónde viene

Este evolutivo **no es una petición espontánea**: nace de una pregunta abierta ya
contestada.

| Campo | Valor |
|---|---|
| Pregunta | `DOC-04/Q-10` |
| Enunciado | «Se puede cambiar el vehículo de un albarán no facturado. Si el vehículo nuevo pertenece a otro cliente, cambia el cliente al que acabará facturándose el trabajo. ¿Es un cambio admisible o debe impedirse?» |
| Estado | `answered`, `resolution: gap_confirmed` |
| Respondida por | Negocio, el **2026-08-16** |
| Respuesta | «**Impedir el cambio de cliente.** Se podrá corregir el vehículo de un albarán no facturado dentro del mismo cliente, pero no mover el albarán a otro cliente.» |
| Alcance declarado en DOC-04 | Pequeño |

**Lo que la respuesta ya decide y aquí no se vuelve a preguntar:** que el cambio a un
vehículo de otro cliente debe impedirse, y que el cambio dentro del mismo cliente sigue
permitido. Esa parte está cerrada. La entrevista —la que no se ha podido celebrar— era para
lo que la respuesta no cubre: qué ve el usuario, qué pasa con las líneas ya cargadas, y qué
ocurre cuando un vehículo cambia de dueño de verdad.

**Confirmado en el sistema desplegado.** `DOC-24/BUG-002`, severidad `critical`: el albarán
5, abierto sobre el vehículo 6 (cliente 12), se movió al vehículo 4 (cliente 8) con respuesta
correcta y sin aviso, y la factura resultante —**114.835,05 €**— se emitió al cliente 8. No
es un riesgo teórico: está ejecutado, y la factura sigue en el sistema porque tampoco se
puede anular (`BUG-004`, que es otro evolutivo, el de `Q-06`).

## 3. Requisitos vigentes afectados

Los enunciados van copiados de `DOC-04` 1.2.0 para que A-07 pueda medir el impacto sin
releerlo.

| REQ | Enunciado vigente | Qué le pasa con este evolutivo |
|---|---|---|
| **REQ-040** | «El sistema permite modificar el vehículo, la fecha y las notas de un albarán no facturado.» | **Contradicho en parte.** Deja de ser cierto sin matiz: el vehículo solo se podrá cambiar por otro del **mismo cliente**. Fecha y notas no se tocan. Cuando el evolutivo se implemente, A-02 debe reformularlo |
| **REQ-046** | «El sistema exige que todos los albaranes de una misma factura pertenezcan al mismo cliente.» | **Ampliado en su alcance real, no contradicho.** Hoy la regla se comprueba solo al emitir la factura, y por eso no detecta nada: el albarán movido ya «pertenece» al cliente nuevo cuando se factura. Con el evolutivo, la pertenencia del albarán a un cliente deja de poder cambiar sola |

**Este análisis está confirmado en el código, y por A-07, no por A-06.** `DOC-09` 1.0.0
apartados 3.2 y RS-02 lo verificó en `factures.js`: la comprobación de REQ-046 reúne los
clientes de la factura **resolviéndolos a través del vehículo en el momento de emitir**, y
**la línea inmediatamente siguiente usa ese mismo cliente como destinatario**. Es decir: la
comprobación de REQ-046 es, literalmente, la que escribe a quién se cobra. De ahí que se
refuerce sin que cambie ni una línea suya: hoy el albarán movido llega ya con el cliente
nuevo y la regla lo da por bueno; con el evolutivo, no puede llegar así.

Queda escrito aquí porque **cambia el peso de la afirmación, no la afirmación**: lo que en la
1.0.0 era una lectura funcional de A-06 tiene ahora una línea de código detrás. Lo demás de
ese hallazgo —que el único caso de REQ-046, `TC-064`, declara una vía que no puede
ejecutar— es de A-03 y de A-07, y **no se recoge aquí como si fuera un efecto de este
evolutivo**: no lo es, es estado actual.

**Requisitos vigentes que este evolutivo NO cambia, pero que condicionan su comportamiento**
—van aquí porque A-07 los va a encontrar en el mismo recorrido y conviene que sepa que están
mirados:

| REQ | Enunciado vigente | Por qué importa |
|---|---|---|
| REQ-042 | «El sistema impide modificar, borrar o alterar las líneas de un albarán que ya ha sido facturado.» (`BR-ALB-03`) | Sigue mandando y **manda antes**. Sobre un albarán facturado no cambia nada: ya está bloqueado entero, y `DOC-24` lo verificó funcionando (rechazo explícito). La regla nueva solo actúa donde hoy no hay ninguna: el albarán pendiente |
| REQ-041 | «El sistema permite borrar un albarán no facturado junto con todas sus líneas, previa confirmación del usuario.» | Es el camino que le queda al usuario cuando el albarán se abrió al vehículo de otro cliente: borrarlo y volver a abrirlo. Ver PD-003 |
| REQ-027 | Un albarán pertenece siempre a un vehículo existente (`BR-ALB-01`) | Ya se comprueba hoy. La regla nueva se suma, no la sustituye, y su mensaje debe seguir siendo distinguible (AC-009) |
| REQ-011 / REQ-015 | «Todo vehículo queda asociado a un cliente que ya existe» / «El sistema permite modificar los datos de un vehículo ya registrado» | Cambiar de dueño un vehículo se hace **aquí**, no en el albarán, y este evolutivo no lo toca. Es la fuga que queda abierta: ver PD-002 y el apartado 5 |

## 4. Criterios de aceptación

Uno por comportamiento observable. Alguien tiene que poder decir sí o no mirando la
aplicación.

**La forma está decidida** (PD-001, negocio, 2026-08-17): el desplegable de vehículos del
albarán **filtra** y muestra solo los del cliente actual. No se muestran todos para rechazar
después.

**Filtrar no es comprobar, y esto no admite lectura suave.** La decisión resuelve lo que el
usuario ve; **no** sustituye el rechazo al guardar. `BUG-002` no entró por un desplegable:
entró por el servicio, con el formulario fuera de la ecuación, y un filtro de pantalla no
habría cambiado absolutamente nada. Un desplegable filtrado sin comprobación detrás deja el
defecto crítico exactamente donde está y además lo hace más difícil de ver, porque la pantalla
parece correcta. **Las dos cosas son exigibles**: AC-010 comprueba el filtro, AC-002 comprueba
el rechazo, y ninguna de las dos da por buena a la otra. Si al implementarlo hubiera que elegir
—que no hay que elegir—, la que protege el dinero es AC-002.

**Cada criterio dice por qué vía se comprueba**, porque el filtro cambia lo que el usuario
puede siquiera intentar y A-03 lo necesita para escribir el caso. Ver el resumen en 4.1.

---

**AC-001 · Corregir el vehículo dentro del mismo cliente sigue funcionando** *(camino feliz)*

- **Dado** un albarán pendiente de facturar, abierto sobre el vehículo V1 del cliente C,
- **cuando** el usuario cambia el vehículo a V2, que también pertenece al cliente C, y guarda,
- **entonces** el albarán queda registrado sobre V2, sigue pendiente de facturar, y su fecha
  y sus notas conservan lo que el usuario haya dejado.

*Vía de comprobación:* **interfaz.**

*Datos que exige:* **DP-001** — el cliente C debe tener **al menos dos vehículos**. Sin V2 no
hay criterio que comprobar. Ver 4.3.

*Apoyo:* REQ-040 y la respuesta de negocio a Q-10, que declaran expresamente que esta
corrección sigue permitida.

---

**AC-010 · El desplegable solo ofrece vehículos del cliente del albarán** *(camino feliz de la forma decidida)*

- **Dado** un albarán pendiente de facturar, del cliente C1, **que tiene al menos dos
  vehículos**, y un sistema donde además existen vehículos de otros clientes,
- **cuando** el usuario abre la edición de la cabecera y despliega el selector de vehículo,
- **entonces** aparecen **todos** los vehículos de C1 —el actual y los demás, más de uno— y
  **ninguno** de otro cliente.

*Vía de comprobación:* **interfaz.**

*Datos que exige:* **DP-001** y **DP-002**. Ver 4.3.

*Por qué el «al menos dos» está en el Dado y no se da por supuesto* **(cambio de la 2.1.0)**:
si C1 tiene un solo vehículo, el desplegable filtrado muestra exactamente una opción, y eso
es **indistinguible** de AC-011 y también de una implementación que no filtre nada y se
limite a ofrecer el vehículo actual. Con un solo vehículo, las tres cosas dan el mismo
resultado observable y el criterio deja de ser verificable: se puede decir «sí» mirando la
aplicación sin que el filtro exista. Lo detectó `DOC-09` 4.3 sobre los datos de ejemplo
reales. La exigencia de comportamiento **no cambia**; lo que cambia es que ahora el criterio
declara el escenario en el que se puede afirmar.

*Apoyo:* decisión de negocio de PD-001, 2026-08-17.

---

**AC-011 · Un cliente con un solo vehículo no se queda sin opción** *(borde de la forma decidida)*

- **Dado** un albarán pendiente de un cliente que solo tiene un vehículo, el del propio
  albarán,
- **cuando** el usuario abre la edición de la cabecera y despliega el selector,
- **entonces** el selector muestra ese vehículo y sigue seleccionado; no queda vacío, no
  permite dejar el albarán sin vehículo, y guardar sigue funcionando con normalidad.

*Vía de comprobación:* **interfaz.**

*Datos que exige:* un cliente con **exactamente un** vehículo. Es el escenario contrario al de
AC-010, y los datos de ejemplo de hoy solo dan este. Ver 4.3.

*Por qué está:* filtrar una lista es la forma más fácil de dejarla vacía. Un albarán sin
vehículo rompería REQ-027 / `BR-ALB-01`, que este evolutivo no toca.

*Y por qué AC-010 y AC-011 tienen que convivir con datos distintos:* son el mismo selector en
los dos únicos escenarios que lo distinguen —cliente con varios vehículos y cliente con uno—.
Comprobados los dos sobre el mismo cliente de un solo coche, el par no prueba nada.

---

**AC-002 · El rechazo al guardar existe aunque el desplegable filtre** *(comportamiento pedido — el que protege el dinero)*

- **Dado** un albarán pendiente de facturar, abierto sobre el vehículo V1 del cliente C1,
- **cuando** llega una petición de dejarlo sobre el vehículo V2, que pertenece al cliente C2,
  distinto de C1 —lo que ya no se puede formular desde el desplegable, pero sí por el camino
  que usó `DOC-24/BUG-002`—,
- **entonces** el cambio no se guarda, el albarán sigue sobre V1, y la respuesta explica que
  un albarán no se puede mover a un vehículo de otro cliente.

*Vía de comprobación:* **servicio.** Desde la interfaz el intento ya no se puede ni formular
(AC-010), igual que le pasa a `TC-041` con el tercer tipo de línea: un caso que solo mire el
desplegable comprueba la premisa, no la consecuencia.

*Nota:* el rechazo tiene que ser **explicado**, no un guardado que no hace nada. Es el
precedente del propio sistema: el bloqueo del albarán facturado (REQ-042) ya rechaza con
mensaje, y `DOC-24` lo verificó funcionando así.

---

**AC-003 · Las líneas ya cargadas no estorban la corrección dentro del mismo cliente** *(borde)*

- **Dado** un albarán pendiente con líneas de pieza y de mano de obra ya anotadas,
- **cuando** el usuario cambia el vehículo por otro del mismo cliente y guarda,
- **entonces** las líneas siguen siendo exactamente las mismas —ninguna se pierde, ninguna
  cambia de precio ni de cantidad—, el stock de las piezas no se mueve, y el importe del
  albarán es el mismo que antes del cambio.

*Vía de comprobación:* **interfaz.**

*Apoyo:* DOC-06 tarea A.13 («Sus líneas no se tocan») y REQ-039, que hace depender el
movimiento de stock de retirar una línea, no de tocar la cabecera. Es decir: **tener líneas
no es motivo para impedir nada**, y esa fue una de las dudas planteadas.

---

**AC-004 · El rechazo no deja el albarán a medias** *(borde)*

- **Dado** un albarán pendiente con líneas anotadas, del cliente C1,
- **cuando** llega una petición que cambia el vehículo a uno del cliente C2 **y a la vez**
  modifica la fecha o las notas, todo en la misma operación de guardado,
- **entonces** no se guarda nada: ni el vehículo, ni la fecha, ni las notas. El albarán queda
  tal cual estaba, con sus líneas intactas y sin ningún movimiento de stock.

*Vía de comprobación:* **servicio.** Con el desplegable filtrado, la interfaz no puede
componer este intento.

*Por qué está:* un rechazo que guarda la mitad de los campos es peor que no rechazar, porque
el usuario cree que no ha pasado nada.

---

**AC-005 · Guardar sin tocar el vehículo no cambia** *(borde)*

- **Dado** un albarán pendiente,
- **cuando** el usuario modifica solo la fecha o las notas, dejando el mismo vehículo —o lo
  vuelve a seleccionar sin cambiarlo—,
- **entonces** se guarda con normalidad y la regla nueva no aparece por ningún lado: ni
  mensaje, ni bloqueo.

*Vía de comprobación:* **interfaz.**

---

**AC-006 · Sobre un albarán facturado no cambia nada** *(borde)*

- **Dado** un albarán **ya facturado**,
- **cuando** se intenta cambiarle el vehículo, sea por uno del mismo cliente o por uno de
  otro,
- **entonces** el sistema lo rechaza **por estar facturado**, con el mismo mensaje que da hoy,
  y no con el mensaje nuevo de cambio de cliente.

*Vía de comprobación:* **interfaz** para el intento del usuario; **servicio** para el intento
con un vehículo de otro cliente, que la pantalla ya no permite componer.

*Apoyo:* REQ-042 / `BR-ALB-03`, verificado como correcto en `DOC-24` (`validated_ok`, «Bloqueo
de albarán facturado»). Este evolutivo **no toca ese bloqueo**: solo importa que el usuario
siga entendiendo cuál de las dos reglas le ha parado. Y que el orden no se invierta: primero
manda que está facturado.

---

**AC-007 · El filtro de pantalla no es la protección** *(borde)*

- **Dado** un albarán pendiente del cliente C1 y un desplegable que ya filtra correctamente
  (AC-010),
- **cuando** el cambio a un vehículo del cliente C2 llega sin pasar por el formulario, por el
  mismo camino que usó la exploración de `DOC-24/BUG-002`,
- **entonces** el resultado es el mismo que en AC-002: el cambio se rechaza y el albarán sigue
  sobre su vehículo original.

*Vía de comprobación:* **servicio.**

*Por qué sigue estando, ahora que el desplegable filtra:* precisamente por eso. `BUG-002` se
reprodujo por esta vía, con el formulario fuera de juego. Este criterio es el que impide que
«el desplegable ya filtra» se acepte como implementación terminada.

---

**AC-008 · La factura acaba en el cliente correcto** *(borde — es el daño que se quiere evitar)*

- **Dado** un albarán pendiente del cliente C1 sobre el que se ha intentado, y se ha
  rechazado, el cambio a un vehículo del cliente C2,
- **cuando** después se emite la factura de ese albarán,
- **entonces** la factura se emite a **C1**.

*Vía de comprobación:* **mixta.** El intento rechazado se provoca por el servicio; que la
factura salga a C1 se comprueba por la interfaz, como cualquier factura.

*Por qué está aparte:* AC-002 comprueba que el sistema dice que no; este comprueba que el
dinero acaba donde debe, que es lo que falló en `BUG-002`.

---

**AC-009 · El vehículo inexistente sigue teniendo su propio motivo** *(borde)*

- **Dado** un albarán pendiente,
- **cuando** se intenta asignarle un vehículo que no existe o no se informa vehículo alguno,
- **entonces** el sistema lo rechaza por el motivo de siempre —el vehículo no existe
  (REQ-027, `BR-ALB-01`)— y no por el motivo nuevo.

*Vía de comprobación:* **servicio.** Con el desplegable filtrado, la pantalla no ofrece
vehículos inexistentes ni deja el campo sin informar (AC-011).

*Por qué está:* dos rechazos con el mismo mensaje son un mensaje inútil. Distinguirlos es lo
que permite a A-03 escribir dos casos y no uno.

---

**Cobertura de bordes.** Hay dos criterios de camino feliz y los dos tienen bordes propios:
AC-001 (corregir dentro del mismo cliente) los tiene en AC-003, AC-005 y AC-006; AC-010 (el
desplegable filtra) lo tiene en AC-011. AC-002, el comportamiento pedido, tiene los suyos en
AC-004, AC-007, AC-008 y AC-009.

### 4.1 Por qué vía se comprueba cada criterio

Filtrar el desplegable **cambia lo que el usuario puede intentar**, y con ello cambia por
dónde se puede probar cada cosa. **Cuatro criterios dejan de ser alcanzables desde la
interfaz** —AC-002, AC-004, AC-007 y AC-009— y otros dos solo lo son en parte —AC-006 y
AC-008—. No es que hayan dejado de importar: es que el intento ya no se puede ni formular en
pantalla. Es la misma situación de `TC-041`, hoy el único caso de `DOC-05` que no se ejecuta
entero por la interfaz.

| AC | Qué comprueba | Vía | ¿Alcanzable desde la interfaz? |
|---|---|---|---|
| AC-001 | Corregir dentro del mismo cliente | interfaz | Sí |
| AC-010 | El desplegable filtra | interfaz | Sí — solo se ve ahí |
| AC-011 | Cliente con un solo vehículo | interfaz | Sí |
| AC-003 | Las líneas se conservan | interfaz | Sí |
| AC-005 | Guardar sin tocar el vehículo | interfaz | Sí |
| AC-006 | Albarán facturado | interfaz + servicio | En parte: el intento con vehículo de otro cliente, no |
| **AC-002** | **El rechazo al guardar** | **servicio** | **No** — el desplegable ya no lo ofrece |
| AC-004 | El rechazo no guarda nada a medias | servicio | No |
| AC-007 | El filtro no es la protección | servicio | No, por definición |
| AC-008 | La factura sale al cliente correcto | mixta | El intento no; la factura sí |
| AC-009 | Vehículo inexistente o sin informar | servicio | No |

**Lo que esto le pide a A-03.** Seis criterios necesitan la vía de servicio: cuatro por
completo y dos en parte. No es una preferencia de A-06 ni una prueba de contrato de API —no se
pide comprobar ruta, verbo ni código de respuesta—: es que el vector no existe en la pantalla,
exactamente el mismo razonamiento con el que `TC-041` justifica su tercer paso. Cómo se cubran
—y si se cubren— es decisión de A-03.

**Y desde el 2026-08-17, es una decisión ya tomada.** A-03 cerró `Q-18` estableciendo esa
misma regla como política del plan y la hizo legible por máquina en el campo
`verification_path`. Estos seis criterios no son una excepción que A-06 tenga que justificar:
son la aplicación de una política escrita, y sus casos nacerán cuando el plan se regenere.
El detalle, en 4.2.

### 4.2 `DOC-05/Q-18`, cerrada · cómo quedó

**Este apartado se escribió con `Q-18` abierta y advertía de un riesgo. La pregunta se cerró
el 2026-08-17 y el riesgo no se materializó. Se deja la advertencia y se dice cómo quedó,
porque una advertencia que acierta y luego desaparece del documento no le sirve a nadie.**

**Lo que decía este apartado, y sigue siendo cierto.** `Q-18` preguntaba si existe alguna vía
de entrada al sistema distinta de la interfaz. Con `PD-001` decidido —el desplegable filtra—,
cuatro criterios de una historia crítica solo se pueden ejercer por ahí y otros dos la
necesitan en parte, cuando hasta entonces la vía de servicio era en este plan la excepción de
un solo caso (`TC-041`). Y se advertía de que **si `Q-18` se cerraba diciendo que el plan no
cubre esa vía, `AC-002` —el criterio que protege a quién se factura— se quedaría sin forma de
comprobarse**.

**Cómo se cerró.** `A-03 · Plan de pruebas`, dueño de la pregunta, la respondió el
**2026-08-17** en dos mitades (`DOC-05` 1.5.0, apartados 4.12 y 6.5):

| Mitad | Respuesta | Quién la firma |
|---|---|---|
| **Factual** | La vía **existe, está usada y detrás no hay defensa**. No se cierra con un juicio sino con una reproducción: `A-14 · Explorador Ejecutor` ejecutó contra `localhost:3001` sin pasar por la pantalla, y `BUG-003` demuestra que la validación de importes **no está en ninguna de las dos capas** | Evidencia reproducible (`DOC-24`), corroborada por A-15 |
| **De método** | **Un caso va por servicio solo cuando el vector no existe en la interfaz.** No es una prueba de contrato de API: es la única vía de ejercer la regla | A-03, como decisión de método sobre su propio plan |

**Por qué esto es exactamente lo que hacía falta.** La política que A-03 ha escrito es
**literalmente el criterio con el que están clasificados los once criterios de este
documento**: en 4.1 ninguno va por servicio por preferencia ni por probar la API, sino porque
el desplegable filtrado ha eliminado el vector de la pantalla. La consecuencia práctica:

- **El riesgo advertido no se ha materializado.** `Q-18` no se cerró excluyendo la vía de
  servicio, sino admitiéndola con una regla. `AC-002` **tiene forma de comprobarse**.
- **Los criterios de servicio dejan de ser una excepción por justificar** y pasan a ser
  aplicación de una política escrita. El propio `DOC-05` 6.5 lo dice así, y añade que esto
  **no reabre `Q-18`**: es su aplicación.
- **Han dejado de ser inautomatizables.** Ha entrado en servicio `S-17 · Automatizador QA de
  servicio`, que genera colecciones Postman (`automation/api/`) validando **datos y efectos
  laterales**, no solo códigos de respuesta. Es justo lo que exigen AC-002, AC-004, AC-007 y
  AC-009, que no piden un código de estado sino que **el albarán siga sobre su vehículo** y
  que **no se haya guardado nada a medias**.

**Lo que sigue siendo verdad, y no lo resuelve haber cerrado `Q-18`.** La regla queda
implementada **dos veces**, una en pantalla y otra en el servidor, y el día que divergan
ningún caso que solo mire la pantalla lo detectará. `DOC-09` (A-07) fue a comprobarlo y trae
la peor confirmación posible: **ese patrón ya ha divergido en este mismo repositorio**, con
`REQ-046` y su caso `TC-064`, y nadie lo había notado porque nada falla. Por eso `AC-007`
sigue siendo el criterio que impide dar por terminada la implementación con solo filtrar.

**Una diferencia de vocabulario, declarada para que nadie la lea como desacuerdo.** A-03
clasifica el **vector** y A-06 el **criterio completo**: por eso `TC-041` es `service` en
`DOC-05` y su equivalente sería `mixta` aquí, como `AC-008`. La divergencia está declarada en
ambos lados (`DOC-05` 4.12) y no cambia ni un criterio: cuando A-03 escriba los casos de
`EVO-001`, manda su vocabulario, que es el que consumen S-10 y S-17.

No abro decisión pendiente por nada de esto. `Q-18` tenía dueño, lo ejerció, y la respuesta
está escrita.

### 4.3 Qué datos hacen falta para que estos criterios sean verificables *(nuevo en 2.1.0)*

**Por qué existe este apartado.** `DOC-09` 4.3 fue a mirar los datos de ejemplo del proyecto
(`server/db/seed.js`) y encontró **seis clientes y seis vehículos, uno por cliente**. Sobre
esos datos, dos criterios de este documento **no se pueden verificar**:

| Criterio | Qué le pasa con los datos de hoy |
|---|---|
| **AC-001** | **No es reproducible.** No hay ningún segundo vehículo del mismo cliente al que cambiar, así que el camino feliz que este evolutivo promete conservar no se puede ejercer |
| **AC-010** | **Es indistinguible de AC-011.** Con un solo vehículo por cliente, el desplegable filtrado muestra siempre una opción: el escenario general y el borde dan el mismo resultado observable, y una implementación que **no filtre nada** y devuelva solo el vehículo actual pasaría los dos |

**Un criterio que no se puede distinguir de otro no está terminado**, y eso sí es
responsabilidad de A-06. Generar los datos no lo es. La corrección va por tanto en dos
movimientos: la precondición entra en el `Dado` de AC-010 —hecho en esta versión— y **aquí se
declara qué hace falta**, con dueño, para que quien prepare el entorno no lo deduzca.

**Precondiciones de datos.** Los identificadores `DP-nnn` son **locales de este documento**:
no son anclas de `registro-ids.json` y A-06 no acuña identificadores fuera del prefijo `EVO`.

| ID | Qué hace falta | Para qué criterios | Quién lo materializa |
|---|---|---|---|
| **DP-001** | Un cliente con **al menos dos vehículos**, uno de ellos con un albarán pendiente de facturar | AC-001 (imprescindible), AC-003, AC-005, AC-010 | `S-06` en `DOC-13`, que es quien materializa los conjuntos `DS-nnn` de `DOC-05` |
| **DP-002** | Vehículos de **otro cliente distinto**, existentes a la vez que los de DP-001 | AC-010 (que no aparezcan), AC-002, AC-004, AC-006, AC-007, AC-008 (para poder intentar el cambio) | `S-06`, ídem |
| **DP-003** | Un cliente con **exactamente un** vehículo, el del propio albarán | AC-011 | `S-06`, ídem. Es lo único que los datos de hoy sí dan |

**Esto no es una pregunta abierta ni una decisión pendiente, y conviene decir por qué.** No
hay nada que decidir: no se le pregunta a negocio cuántos coches tiene un cliente de prueba.
Es un **requisito de entorno**, y va aquí en vez de en el apartado 6 para no ensuciar una
lista cuyo valor es que todo lo que hay dentro necesita a una persona.

**Lo que ya lo suponía sin decirlo.** `DOC-05` cita `DS-004` y `DS-005`, y la precondición de
`TC-055` **dice expresamente** que hace falta un cliente con dos vehículos. Es decir: el plan
de pruebas ya daba por hecho DP-001 y el seed no lo proporciona. El hueco es anterior a
`EVO-001`; lo que hace este evolutivo es que **deje de poder ignorarse**, porque ahora hay un
criterio de aceptación que sin él no se puede afirmar.

### 4.4 Sobre el `scope: small` de este documento y el `effort_signal: medium` de `DOC-09`

**No hay desacuerdo, y se declara para que A-08 no tenga que arbitrar uno inexistente.** El
`scope: small` de este documento **no es una estimación de A-06** —estimar es de A-08—: es el
alcance que `DOC-04` 6.2 declaró para el evolutivo de `Q-10`, y va con su `scope_source`
desde la 1.0.0. `DOC-09` coincide en que **el código sería `small`** y sitúa la señal en
`medium` por lo que cuesta creerse el resultado: seis criterios por vía de servicio con
cobertura automatizada 0 %, los datos de ejemplo del apartado 4.3 y la protección partida en
dos componentes.

Las dos cifras miden cosas distintas —el cambio y su verificación— y **ninguna de las dos es
la estimación**. A-06 no toca su `scope` por esto: cambiarlo sería estimar, y además borraría
de dónde viene el número. Quien traduzca esto a esfuerzo es A-08, leyendo las dos.

## 5. Fuera de alcance

Lo que se ha mirado y **no** entra en `EVO-001`, para no discutirlo la semana que viene:

1. **Abrir el albarán ya no se toca.** Elegir el vehículo al crear un albarán (`UC-ALB-02`)
   no es un cambio de cliente: no hay nada de lo que mover el trabajo. La regla nueva actúa
   solo sobre la modificación de un albarán que ya existe.
2. **Cambiar el cliente propietario de un vehículo** (`UC-VEH-04`, REQ-015) sigue permitido
   tal como está hoy. Este evolutivo **no lo toca**, aunque por ahí se llega al mismo
   resultado: si un vehículo con albaranes pendientes cambia de dueño, esos albaranes se
   facturarán al dueño nuevo. Es la misma fuga por otra puerta y está en **PD-002**; si
   negocio decide cerrarla, será otra historia y otro DOC-08, porque los criterios de
   aceptación son distintos.
   **Sigue fuera de alcance, y desde la 2.1.0 se puede dimensionar** (`DOC-09` 3.4): el
   `UPDATE` que cambia el propietario de un vehículo escribe el cliente nuevo **sin mirar los
   albaranes pendientes**, ese componente está **a un salto** del que este evolutivo toca, y
   la consulta a la tabla de albaranes que haría falta **ya existe en ese mismo fichero**,
   usada para otro bloqueo. Que esté cerca no lo mete dentro: lo que cambia es que quien
   decida sobre PD-002 ya no decide a ciegas.
3. **Arreglar los datos que ya están mal.** El albarán 5 y la factura 2026/F-0002 de
   114.835,05 € que dejó la exploración siguen donde están. Limpiarlos no depende de este
   evolutivo, sino de `Q-06` (factura rectificativa) y de la decisión del propietario del
   proyecto sobre la base de datos de pruebas (`DOC-24`, `test_data_left_behind`).
4. **La factura rectificativa y cualquier corrección de facturas emitidas** (`Q-06`,
   `BUG-004`). Alcance grande, entidad nueva, historia aparte.
5. **Los otros evolutivos decididos el mismo día**: `Q-02` (stock negativo, `BUG-001`) y
   `Q-12` (importes negativos, `BUG-003`). Comparten patrón —falta de comprobación— pero
   cada uno tiene sus propios criterios de aceptación y su propio DOC-08. Agruparlos es
   exactamente como se pierden criterios por el camino.
6. **Cómo se construye la comprobación**, y si conviene o no una validación común para los
   tres evolutivos de validación. Es decisión de diseño (S-04) y está apuntada como tal en
   `DOC-25`.
7. **Excepciones autorizadas.** No se contempla ningún «salvo que un responsable lo apruebe»:
   la aplicación tiene un único actor sin restricción de permisos (`ACT-01`) y no tiene
   autenticación, así que no hay a quién dar esa excepción. Si algún día hay perfiles, se
   replantea.
8. **Dejar rastro de los intentos rechazados.** Nadie ha pedido registrar quién intentó mover
   un albarán de cliente. No entra.

## 6. Decisiones

### 6.1 Resueltas

| ID | Qué se decidió | Quién decidió | Cuándo |
|---|---|---|---|
| **PD-001** | **El desplegable filtra.** El selector de vehículo de un albarán muestra **solo** los vehículos del cliente actual del albarán. No se muestran todos para rechazar después | Peticionario de negocio | 2026-08-17 |

**Qué arrastró esta decisión.** Nace AC-010 (el filtro) y con él su borde AC-011 (el cliente
con un solo vehículo, que es la forma fácil de dejar una lista filtrada vacía). AC-002 y
AC-004 se reformulan: siguen exigiendo el rechazo al guardar, pero ya no se pueden ejercer
desde la pantalla, y AC-007 pasa de ser un borde más a ser **el criterio que impide dar por
terminada la implementación con solo filtrar**. El reparto por vías está en 4.1 y su
consecuencia sobre `DOC-05/Q-18` en 4.2.

**Lo que la decisión no dice, y aquí no se ha inventado:** el texto exacto del mensaje de
rechazo, y si el desplegable filtrado debe explicar de algún modo por qué no están los demás
vehículos. Ninguna de las dos cosas hace falta para comprobar ningún criterio: si alguna
importa, se pide y se refina en otra pasada.

### 6.2 Pendientes

Quedan dos, y **ninguna bloquea**. Las dos siguen sin poder deducirse de ningún documento sin
inventarlas.

| ID | Qué falta decidir | Quién decide | ¿Bloquea? |
|---|---|---|---|
| **PD-002** | **Qué pasa cuando un vehículo cambia de dueño de verdad** (se vende el coche) y tiene albaranes pendientes de facturar. Hoy el cambio se hace sobre el vehículo (REQ-015) y arrastra esos albaranes al dueño nuevo, con el mismo efecto que este evolutivo impide por la otra puerta. ¿Debe impedirse también? ¿Debe avisarse? ¿Debe existir un camino para dejar el trabajo ya hecho con el dueño anterior? | Negocio. Requiere **pregunta abierta nueva** en `DOC-04` vía A-02: no es una duda de esta historia, es una que esta historia destapa | No bloquea `EVO-001`. Sí condiciona si la protección queda completa o solo tapa la puerta principal |

**PD-002 no ha cambiado de estado, ha cambiado de precisión** *(2.1.0)*. `DOC-09` 3.4 aportó
los tres datos que le faltaban a quien tenga que decidirla: **(1)** el cambio de propietario
se escribe hoy sin comprobar si el vehículo tiene albaranes pendientes; **(2)** el componente
está a un salto del que este evolutivo toca, no en la otra punta de la aplicación; **(3)** el
acoplamiento necesario para consultarlo **ya existe en ese mismo fichero**, usado para
bloquear el borrado de un vehículo con albaranes. Sigue **abierta**, sigue **fuera de
alcance** y sigue **sin bloquear**. Lo que ya no se puede decir es que no se sabe lo que
costaría mirarla.

**Consecuencia que conviene no perder de vista:** mientras PD-002 esté abierta, la frase «un
albarán ya no puede cambiar de cliente» es cierta **solo por la puerta del albarán**. Quien
lea este documento como si cerrara la fuga entera, la lee mal.
| **PD-003** | **Qué hace el usuario cuando ya se equivocó.** Con la regla puesta, un albarán abierto al vehículo de otro cliente y con trabajo ya anotado solo se puede arreglar borrándolo y volviéndolo a abrir, rehaciendo las líneas a mano (REQ-041, mientras no esté facturado). ¿Le vale al taller, o quiere algún camino que conserve las líneas? | Peticionario de negocio | No bloquea. Si la respuesta es «quiero conservar las líneas», eso es **otra historia**, no una ampliación de esta |

## 7. Bloque estructurado

```yaml evolutivo
version: 1
id: EVO-001
project: app-taller
title: Un albarán no puede cambiar de cliente al cambiarle el vehículo
status: draft
origin:
  type: question
  question: Q-10
  source_document: DOC-04-FUNCIONAL.md
  answered_on: 2026-08-16
  answered_by: negocio
  resolution: gap_confirmed
  answer: >-
    Impedir el cambio de cliente. Se podra corregir el vehiculo de un albaran no facturado
    dentro del mismo cliente, pero no mover el albaran a otro cliente.
evidence:
  - document: DOC-24-BUGS.json
    id: BUG-002
    severity: critical
    note: >-
      reproducido en el sistema desplegado. El albaran 5 paso del vehiculo 6 (cliente 12) al
      vehiculo 4 (cliente 8) sin aviso, y la factura resultante de 114.835,05 EUR se emitio al
      cliente 8
scope: small
scope_source: >-
  declarado por A-02 en DOC-04 6.2 para el evolutivo de Q-10. No es una estimacion de A-06;
  estimar es de A-08
scope_vs_impact_note: >-
  DOC-09 1.0.0 declara effort_signal: medium y NO contradice este scope. A-07 dice que el
  codigo por si solo seria small y coincide con lo declarado aqui; lo que empuja a medium es el
  coste de verificarlo (seis criterios por via de servicio con cobertura automatizada 0%, los
  datos de ejemplo del apartado 4.3 y la proteccion partida en dos componentes). Miden cosas
  distintas -el cambio y su verificacion- y ninguna de las dos es la estimacion, que es de A-08
affects_requirements: [REQ-040, REQ-046]
contradicts: [REQ-040]
related_requirements_unchanged: [REQ-042, REQ-041, REQ-027, REQ-011, REQ-015]
related_questions:
  - id: Q-18
    document: DOC-05-PLAN-PRUEBAS.md
    document_version: 1.5.0
    owner: A-03
    status: answered
    answered_on: 2026-08-17
    status_changed_in: 2.1.0
    previous_status: open
    resolution_factual: >-
      la via de servicio existe, esta usada y detras no hay defensa. Cerrada con reproduccion:
      A-14 ejecuto contra localhost:3001 sin pasar por la pantalla, y BUG-003 demuestra que la
      validacion de importes no esta en ninguna de las dos capas
    resolution_policy: >-
      un caso va por servicio SOLO cuando el vector no existe en la interfaz. Decision de metodo
      firmada por A-03, dueno del plan
    effect_on_this_document: >-
      favorable y sin cambio de criterios. El riesgo advertido en 4.2 -que AC-002 se quedara sin
      forma de comprobarse- NO se materializo: la politica es el mismo criterio con el que estan
      clasificados los once criterios de este documento, de modo que los seis de servicio (cuatro
      completos y dos en parte) pasan de excepcion por justificar a aplicacion de una politica
      escrita. Ademas S-17 · Automatizador QA de servicio genera colecciones Postman que validan
      datos y efectos laterales: dejan de ser inautomatizables
    still_true: >-
      la regla sigue implementada dos veces (filtro de pantalla y comprobacion al guardar). DOC-09
      confirma que ese patron YA divergio en este repositorio con REQ-046 y TC-064. AC-007 sigue
      siendo el criterio que lo impide dar por terminado con solo filtrar
    vocabulary_note: >-
      A-03 clasifica el vector y A-06 el criterio completo: TC-041 es service alli y seria mixta
      aqui (cf. AC-008). Divergencia declarada en ambos lados; manda el vocabulario de A-03 cuando
      se escriban los casos
acceptance_criteria:
  - id: AC-001
    given: un albaran pendiente de facturar, abierto sobre el vehiculo V1 del cliente C
    when: el usuario cambia el vehiculo a V2, que tambien pertenece al cliente C, y guarda
    then: >-
      el albaran queda sobre V2, sigue pendiente de facturar, y su fecha y sus notas conservan
      lo que el usuario haya dejado
    edge: false
    verification_path: interfaz
    data_preconditions: [DP-001]
    data_note: >-
      sin un segundo vehiculo del mismo cliente este criterio no es reproducible. Los datos de
      ejemplo de hoy no lo dan (DOC-09 4.3)
  - id: AC-010
    given: >-
      un albaran pendiente de facturar del cliente C1, que tiene al menos dos vehiculos, en un
      sistema donde ademas existen vehiculos de otros clientes
    when: el usuario abre la edicion de la cabecera y despliega el selector de vehiculo
    then: >-
      aparecen todos los vehiculos de C1 -el actual y los demas, mas de uno- y ninguno de otro
      cliente
    edge: false
    verification_path: interfaz
    added_in: 2.0.0
    source: PD-001
    changed_in: 2.1.0
    data_preconditions: [DP-001, DP-002]
    change_note: >-
      el `given` gana la precondicion "al menos dos vehiculos". Lo exigido no cambia; lo que
      cambia es que antes el criterio no era verificable: con un solo vehiculo por cliente el
      resultado observable es identico al de AC-011 y tambien al de una implementacion que no
      filtre y devuelva solo el vehiculo actual. Detectado por DOC-09 4.3
  - id: AC-011
    given: un albaran pendiente de un cliente que solo tiene un vehiculo, el del propio albaran
    when: el usuario abre la edicion de la cabecera y despliega el selector
    then: >-
      el selector muestra ese vehiculo y sigue seleccionado; no queda vacio, no permite dejar el
      albaran sin vehiculo, y guardar sigue funcionando
    edge: true
    verification_path: interfaz
    added_in: 2.0.0
    source: PD-001
    data_preconditions: [DP-003]
    data_note: >-
      exige un cliente con EXACTAMENTE un vehiculo. Es el escenario contrario al de AC-010 y el
      unico que los datos de ejemplo de hoy si dan; comprobar los dos sobre el mismo cliente de
      un solo coche no prueba nada
  - id: AC-002
    given: un albaran pendiente de facturar, abierto sobre el vehiculo V1 del cliente C1
    when: >-
      llega una peticion de dejarlo sobre el vehiculo V2, del cliente C2, distinto de C1; ya no
      se puede formular desde el desplegable, pero si por el camino que uso DOC-24/BUG-002
    then: >-
      el cambio no se guarda, el albaran sigue sobre V1 y la respuesta explica que un albaran no
      se puede mover a un vehiculo de otro cliente
    edge: false
    verification_path: servicio
    reachable_from_ui: false
    changed_in: 2.0.0
    change_note: >-
      reformulado tras PD-001. El comportamiento exigido es el mismo; lo que cambia es que el
      intento ya no se puede componer desde la pantalla. Filtrar no sustituye a comprobar
  - id: AC-003
    given: un albaran pendiente con lineas de pieza y de mano de obra ya anotadas
    when: el usuario cambia el vehiculo por otro del mismo cliente y guarda
    then: >-
      las lineas siguen siendo las mismas, el stock de las piezas no se mueve y el importe del
      albaran no cambia
    edge: true
    verification_path: interfaz
  - id: AC-004
    given: un albaran pendiente con lineas anotadas, del cliente C1
    when: >-
      llega una peticion que cambia el vehiculo a uno del cliente C2 y a la vez modifica la fecha
      o las notas, en la misma operacion de guardado
    then: >-
      no se guarda nada: ni el vehiculo, ni la fecha, ni las notas. Las lineas quedan intactas y
      no hay ningun movimiento de stock
    verification_path: servicio
    reachable_from_ui: false
    changed_in: 2.0.0
    edge: true
  - id: AC-005
    given: un albaran pendiente
    when: >-
      el usuario modifica solo la fecha o las notas, dejando el mismo vehiculo o volviendolo a
      seleccionar sin cambiarlo
    then: se guarda con normalidad y la regla nueva no aparece ni como mensaje ni como bloqueo
    edge: true
    verification_path: interfaz
  - id: AC-006
    given: un albaran ya facturado
    when: se intenta cambiarle el vehiculo, sea por uno del mismo cliente o por uno de otro
    then: >-
      el sistema lo rechaza por estar facturado, con el mensaje que da hoy, y no con el mensaje
      nuevo de cambio de cliente
    edge: true
    verification_path: interfaz y servicio
    reachable_from_ui: parcial
    note: >-
      el intento con un vehiculo del mismo cliente se comprueba por pantalla; el intento con un
      vehiculo de otro cliente, no: el desplegable ya no lo ofrece
  - id: AC-007
    given: >-
      un albaran pendiente del cliente C1 y un desplegable que ya filtra correctamente (AC-010)
    when: >-
      el cambio a un vehiculo del cliente C2 llega sin pasar por el formulario, por el mismo
      camino que uso la exploracion de DOC-24/BUG-002
    then: el cambio se rechaza igual y el albaran sigue sobre su vehiculo original
    edge: true
    verification_path: servicio
    reachable_from_ui: false
    changed_in: 2.0.0
    change_note: >-
      es el criterio que impide dar por terminada la implementacion con solo filtrar el
      desplegable
  - id: AC-008
    given: >-
      un albaran pendiente del cliente C1 sobre el que se ha intentado, y se ha rechazado, el
      cambio a un vehiculo del cliente C2
    when: despues se emite la factura de ese albaran
    then: la factura se emite al cliente C1
    edge: true
    verification_path: mixta
    note: el intento rechazado se provoca por servicio; la factura se comprueba por interfaz
  - id: AC-009
    given: un albaran pendiente
    when: se intenta asignarle un vehiculo que no existe, o no se informa vehiculo alguno
    then: >-
      el sistema lo rechaza por el motivo de siempre, que el vehiculo no existe (REQ-027,
      BR-ALB-01), y no por el motivo nuevo
    edge: true
    verification_path: servicio
    reachable_from_ui: false
data_preconditions:
  added_in: 2.1.0
  id_scope: >-
    los DP-nnn son locales de este documento. No son anclas de registro-ids.json; A-06 solo acuna
    identificadores con prefijo EVO y los pide a S-12
  reason: >-
    DOC-09 4.3 encontro que los datos de ejemplo del proyecto dan un vehiculo por cliente
    (seed.js:33-39): sobre ellos AC-001 no es reproducible y AC-010 es indistinguible de AC-011.
    Generar los datos no es de A-06; declarar que hacen falta para que sus criterios sean
    verificables, si
  not_a_pending_decision: >-
    no van al apartado 6 porque no hay nada que decidir ni nadie a quien preguntar: es un
    requisito de entorno, no una duda de negocio
  items:
    - id: DP-001
      need: >-
        un cliente con al menos dos vehiculos, uno de ellos con un albaran pendiente de facturar
      required_by: [AC-001, AC-003, AC-005, AC-010]
      owner: S-06 (DOC-13), que materializa los conjuntos DS-nnn de DOC-05
      already_assumed_by: >-
        DS-004 y DS-005 de DOC-05, y la precondicion de TC-055, que lo dice expresamente. El
        hueco es anterior a EVO-001; lo que cambia es que ya no se puede ignorar
    - id: DP-002
      need: vehiculos de otro cliente distinto, existentes a la vez que los de DP-001
      required_by: [AC-010, AC-002, AC-004, AC-006, AC-007, AC-008]
      owner: S-06 (DOC-13)
    - id: DP-003
      need: un cliente con exactamente un vehiculo, el del propio albaran
      required_by: [AC-011]
      owner: S-06 (DOC-13)
      note: es lo unico que los datos de ejemplo de hoy si proporcionan
out_of_scope:
  - Elegir el vehiculo al crear un albaran (UC-ALB-02); no hay cambio de cliente que impedir
  - Cambiar el cliente propietario de un vehiculo (UC-VEH-04, REQ-015), que sigue igual que hoy
  - Corregir el albaran 5 y la factura 2026/F-0002 que dejo la exploracion de DOC-24
  - La factura rectificativa y cualquier correccion de facturas emitidas (Q-06, BUG-004)
  - Los evolutivos de Q-02 (stock negativo) y Q-12 (importes negativos), que van en su propio DOC-08
  - Como se construye la comprobacion y si conviene una validacion comun; es diseno, de S-04
  - Excepciones autorizadas por perfil: la aplicacion tiene un unico actor sin permisos (ACT-01)
  - Registrar o auditar los intentos de cambio rechazados
pending_decisions:
  - id: PD-001
    question: >-
      El vehiculo de otro cliente no se puede ni seleccionar (el desplegable muestra solo los del
      cliente actual), o se puede seleccionar y el sistema rechaza al guardar con un mensaje?
    owner: peticionario de negocio (propietario de app-taller); no hay persona nombrada en los documentos
    status: resolved
    resolved_on: 2026-08-17
    resolved_by: peticionario de negocio
    decision: >-
      El desplegable filtra. Solo muestra los vehiculos del cliente actual del albaran; no se
      muestran todos para rechazar despues
    blocks: []
    consequences:
      new_criteria: [AC-010, AC-011]
      reformulated_criteria: [AC-002, AC-004, AC-007]
      note: >-
        no sustituye la comprobacion al guardar. Cuatro criterios pasan a ser alcanzables solo
        por la via de servicio y otros dos solo en parte; ver apartados 4.1 y 4.2
    still_undecided: >-
      el texto exacto del mensaje de rechazo y si el desplegable debe explicar por que faltan los
      demas vehiculos. No hace falta para comprobar ningun criterio; no se ha inventado
  - id: PD-002
    question: >-
      Que debe pasar cuando un vehiculo cambia de dueno de verdad y tiene albaranes pendientes:
      se impide, se avisa, o hay que poder dejar el trabajo ya hecho con el dueno anterior?
    owner: negocio, via pregunta abierta nueva en DOC-04 (A-02)
    status: open
    blocks: []
    note: >-
      misma fuga por otra puerta. No bloquea EVO-001, pero condiciona si la proteccion queda
      completa
    sizing_data:
      added_in: 2.1.0
      source: DOC-09 3.4 (A-07)
      facts:
        - el cambio de propietario de un vehiculo se escribe hoy sin comprobar si tiene albaranes
          pendientes (vehicles.js:93)
        - el componente esta a un salto del que EVO-001 toca, no en la otra punta de la aplicacion
        - el acoplamiento necesario ya existe en ese mismo fichero, usado para bloquear el borrado
          de un vehiculo con albaranes
      note: >-
        sigue abierta, fuera de alcance y sin bloquear. Lo que cambia es que quien la decida ya no
        decide a ciegas. Mientras siga abierta, "un albaran ya no puede cambiar de cliente" es
        cierto solo por la puerta del albaran
  - id: PD-003
    question: >-
      Le vale al taller borrar el albaran y volver a abrirlo (REQ-041) cuando descubre que esta
      sobre el vehiculo de otro cliente, o quiere un camino que conserve las lineas?
    owner: peticionario de negocio
    status: open
    blocks: []
    note: si la respuesta es conservar las lineas, es otra historia y otro DOC-08
gate:
  status: pending
  owner: peticionario de negocio
  required: el peticionario valida que esta especificacion refleja lo que pidio
consumers:
  - agent: A-07
    doc: DOC-09
    note: >-
      analisis de impacto. YA ESCRITO: DOC-09 1.0.0, sobre la 2.0.0 de este documento. Sus
      hallazgos que tocan a A-06 estan recogidos en 3 (REQ-046 confirmado en codigo), 4.3 (datos
      de ejemplo) y 5.2 / PD-002 (dimensionado). Su effort_signal: medium no contradice el scope
      declarado aqui: ver scope_vs_impact_note
    consumed_version: 2.0.0
    consumed_hash: sha256:5f46a07a585dbdb991bb5c42f66bec909d43bfe062fbb5c4fb4b0ad1eb3c2634
    revisit: >-
      2.1.0 no cambia ningun comportamiento exigido ni el reparto de vias, asi que el analisis de
      DOC-09 sigue siendo valido. Lo unico que le afecta es que AC-010 lleva ahora en su `given`
      la precondicion de datos que el propio DOC-09 pedia
  - agent: A-08
    doc: DOC-10
    note: >-
      estimacion. Debe leer este documento y DOC-09 juntos: aqui esta el comportamiento y el
      alcance declarado por DOC-04, alli la senal de esfuerzo. A-06 no estima
```

---

**Nota de contrato, primera ejecución de la Fase 2 — resuelta en la 2.0.0.** En la 1.0.0,
`S-12` reservaba `EVO-001` con `next --prefix EVO` pero **no lo podía escribir** en
`registro-ids.json`: `sync --block evolutivo` respondía `ERROR bloque desconocido`, y el
identificador quedaba usado pero fuera del registro canónico. El esquema del bloque
`evolutivo` se añadió a S-12 tras ese aviso: **`EVO-001` está censado** y el registro va por
311 anclas. Queda escrito porque explica por qué la 1.0.0 declaraba un identificador que el
registro no conocía.
