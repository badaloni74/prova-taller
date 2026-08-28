---
doc_id: DOC-06
doc_name: DOC-06-MANUAL-USUARIO
version: 1.4.0
status: draft
generator: A-04 manual de usuario
generator_version: "1.2"
generated_at: 2026-08-28T00:00:00+02:00
language: es
history: docs/DOC-06-MANUAL-USUARIO-HIST.md
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: spec-SPE-06-albara-canvi-client
  commit_sha: 345a3ae762624f2208a520a628b6ab1f7dec51e3
inputs:
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    version: 1.2.0
    hash: sha256:e3fb11505afc6253fc801d043871fb8a749b4e618118031e4c9883cb41f79fee
    hash_status: taken_from_DOC-04_inputs
    hash_note: >-
      A-04 no dispone de shell en esta ejecución y no calcula el hash. El valor es el que
      DOC-04-FUNCIONAL 1.3.0 declara para DOC-01 1.2.0 en su propio bloque inputs. Que lo
      verifique S-12 al censar o I-02 antes de publicar.
    usage: >-
      fuente del manual junto con DOC-04. De aquí salen el glosario del apartado 7, los nombres de las
      ocho secciones del menú, los flujos detallados y, en 1.2.0, la regla nueva BR-ALB-10 y el caso
      UC-ALB-06 ampliado: el vehículo de un albarán no facturado solo puede cambiarse por otro del
      mismo cliente.
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.3.0
    hash: null
    hash_status: not_computed_by_A-04
    hash_note: >-
      A-04 no dispone de shell en esta ejecución y no inventa un hash. Ningún documento del proyecto
      declara todavía el hash de DOC-04 1.3.0. Que lo rellene S-12 al censar, o I-02 antes de publicar.
    usage: >-
      fuente de las 32 tareas, de las preguntas frecuentes, de los apartados de límites y de la tabla
      de trazabilidad. En 1.3.0 añade REQ-080 y REQ-081 (módulo albarans, ancla BR-ALB-10 / UC-ALB-06):
      reflejados en la tarea A.13 y en los apartados 5, 6, 7 y 8.
regeneration:
  full_regeneration: true
  regenerated_against: DOC-01-BASE-ASIS 1.2.0 + DOC-04-FUNCIONAL 1.3.0
  previous_version_used_as_source: false
  reason: >-
    cascada de obsolescencia: DOC-01 subió de 1.1.0 a 1.2.0 (MINOR, con cambio de negocio) y DOC-04 de
    1.2.0 a 1.3.0 (MINOR). Ambas subidas recogen el mismo cambio, ya en producción (SPEC 06): al editar
    la cabecera de un albarán no facturado, el selector de vehículo solo ofrece los del cliente actual
    del albarán, y cualquier intento de moverlo a un vehículo de otro cliente se rechaza entero, sin
    guardar ni el vehículo, ni la fecha, ni las notas (BR-ALB-10, REQ-080, REQ-081). Se rehace la tarea
    A.13 y se actualizan los apartados 2, 5, 6.1, 6.2, 7, 8 y 9.
  note_on_specs: >-
    El comportamiento de SPEC 06 llega a este manual por sus fuentes canónicas —DOC-01 1.2.0 y DOC-04
    1.3.0—, no por lectura del spec. A-04 no lee specs ni DOC-02-TECNICA.md. La lectura del censo
    registro-ids.json para numerar las preguntas abiertas se explica en el apartado 9.1.
revision_note: >-
  Regeneración contra DOC-01 1.2.0 y DOC-04 1.3.0. Cambio de contenido: la tarea A.13 (corregir la
  cabecera de un albarán) pasa de advertir de un riesgo —mover el albarán a otro cliente estaba
  permitido y sin aviso— a describir que la aplicación lo impide, tanto en el selector como al guardar.
  El apartado 6.2 baja de seis decisiones pendientes a cinco. La tarea A.7 gana un aviso sobre el
  cambio de propietario de un vehículo con albaranes pendientes (DOC-04/Q-16, abierta). Nace la
  pregunta propia Q-31. El historial completo está en docs/DOC-06-MANUAL-USUARIO-HIST.md; este
  documento no lo reproduce.
---

# DOC-06 · Manual de usuario — app-taller

> Manual para quien trabaja con la aplicación. No hace falta saber nada de
> informática para seguirlo. Está ordenado por tareas del día a día, no por el
> orden del menú.

## 1. Qué es esta aplicación

**app-taller** es la aplicación con la que llevas el trabajo diario del taller.

Con ella registras a tus **clientes** y los **vehículos** de cada uno. Cada vez
que entra un vehículo abres un **albarán**, que es la hoja de trabajo de esa
intervención: ahí anotas las piezas que gastas y las horas de mano de obra que
dedicas. Cuando el trabajo está hecho, agrupas uno o varios albaranes de ese
mismo cliente en una **factura**, que calcula la base, aplica el IVA y da el
total, y que marcas como pagada cuando el cliente paga.

Ese encadenamiento es el corazón de la aplicación:

**Cliente → Vehículo → Albarán → Factura**

Alrededor hay dos cosas más, que funcionan por su cuenta y no dependen de ese
ciclo:

- El **catálogo de piezas con su stock**. El stock baja solo cuando anotas una
  pieza en un albarán, y vuelve a subir si retiras esa anotación.
- El **personal del taller y sus nóminas** mensuales, con el salario bruto, las
  deducciones y el neto que sale de restarlas.

Lo que la aplicación **no** hace: no lleva contabilidad, no hace pedidos a
proveedores, no avisa de nada por su cuenta y no guarda un historial de quién
hizo cada cosa. Es un registro de trabajo, no un programa de gestión completo.

## 2. Antes de empezar

**No hay usuario ni contraseña.** Abres la aplicación y ya estás dentro. No es
un olvido: la aplicación se instala en un solo ordenador del taller, se usa
desde ese puesto y no distingue entre personas. Existe un único perfil de uso
—el personal del taller— y ese perfil puede hacer absolutamente todo: dar de
alta, modificar, borrar, facturar y cobrar. No hay permisos que te limiten, y
tampoco hay nada que impida a otra persona del taller hacer lo mismo desde ese
ordenador. Tenlo presente: **cualquiera que se siente delante puede facturar y
borrar**.

**Un solo puesto, un solo sitio.** La aplicación es local: sus datos viven en el
ordenador donde está instalada. No se comparte con otros ordenadores del taller
ni con el móvil.

**Idioma.** La aplicación funciona en **castellano** y en **catalán**. Arranca en
castellano mientras no elijas otra cosa. En la cabecera, presente en todas las
pantallas, tienes el **selector de idioma**: cámbialo cuando quieras, incluso
con un formulario a medio rellenar, porque no pierdes lo que estabas haciendo.
Tu elección se recuerda para la próxima vez que abras la aplicación.

**Tema claro u oscuro.** Junto al selector de idioma está el **conmutador de
tema**. De entrada la aplicación adopta el tema que tenga configurado tu
ordenador; si eliges otro, se recuerda también.

**Los nombres en catalán.** Buena parte de las palabras del taller aparecen en
catalán tanto en la pantalla en catalán como en la conversación diaria: *albarà*,
*peça*, *ma d'obra*, *estoc*, *nòmina*. En este manual las escribimos en
castellano, y tienes la equivalencia completa en el **glosario** del apartado 7.

**Cómo leer los pasos de este manual.** Los nombres que aparecen *en cursiva*
son los que ves en la pantalla: secciones del menú, botones y campos. Cuando un
paso dice «guarda» o «confirma» sin dar el nombre exacto del botón es porque ese
nombre no está recogido en la documentación de la que nace este manual, y
preferimos no inventártelo: lo verás en pantalla, y queda anotado en las
preguntas abiertas del apartado 9.

**Mientras guardas, no hace falta pulsar dos veces.** Cuando confirmas
cualquier formulario, o cuando añades una línea a un albarán, el botón
correspondiente se deshabilita al momento y cambia su texto a *Guardando…* (o
*Desant…* en catalán) mientras la aplicación procesa tu petición. Es la señal
de que ya se ha registrado tu pulsación: no vuelvas a pulsarlo, y espera a que
se reactive o a que la pantalla cambie sola.

**Cómo se muestran los importes y las fechas.** Los importes en euros llevan
coma para los decimales y punto para separar los miles, por ejemplo
`1.360,00 €`. Las fechas se muestran como día/mes/año, por ejemplo
`21/08/2026`.

**Este manual cuenta lo que la aplicación hace hoy.** El taller decidió seis
cambios sobre cómo debe funcionar la aplicación; **uno ya está hecho** (no se
puede mover un albarán al vehículo de otro cliente, tarea A.13) y **cinco
siguen pendientes**. Esos cinco no están en las tareas —buscarlos en la pantalla
sería perder el tiempo— y los tienes reunidos en el apartado 6.2.

## 3. Cómo moverte

El menú tiene ocho secciones. Estas son, y esto es lo que hay en cada una:

| Sección | Qué encuentras |
|---|---|
| *Clientes* | Los clientes del taller. Desde la ficha de cada uno ves también sus vehículos y sus facturas. |
| *Vehículos* | Todos los vehículos, con su cliente propietario. Desde la ficha de cada uno ves sus albaranes. |
| *Piezas* | El catálogo del taller: referencia, precio, coste, unidad, proveedor y stock de cada pieza. |
| *Albaranes* | Las hojas de trabajo, con sus líneas de pieza y de mano de obra. Filtrables por vehículo, por cliente y por situación. |
| *Facturas* | Las facturas emitidas, con su número, su total y si están cobradas. Desde aquí se emiten. |
| *Personal* | Los empleados del taller. Desde la ficha de cada uno ves sus nóminas. |
| *Nóminas* | Las nóminas mensuales, de la más reciente a la más antigua. |
| *Configuración* | **No hace nada todavía.** Al entrar solo verás un aviso de que la sección está pendiente de desarrollo. |

En la **cabecera**, y en todas las pantallas, están el selector de idioma y el
conmutador de tema claro/oscuro.

Los listados de *Clientes* y *Vehículos* tienen **búsqueda**, **ordenación
pulsando en la cabecera de la columna** y **paginación**. El de *Albaranes*
tiene **filtros** por vehículo, cliente y situación. Casi todo se puede hacer
por dos caminos: desde su propia sección del menú, o desde la ficha del elemento
con el que se relaciona (un vehículo desde la ficha de su cliente, un albarán
desde la ficha de su vehículo, una nómina desde la ficha de su empleado). Usa el
que te quede más a mano: el resultado es el mismo.

## 4. Las tareas

### Bloque A · El ciclo del trabajo: cliente, vehículo, albarán, factura

Este bloque va en el orden en que ocurren las cosas en el taller. Si es tu
primer día, léelo seguido: cada tarea deja preparada la siguiente.

---

#### A.1 · Dar de alta un cliente nuevo

**Cuándo se usa.** Llega un cliente que nunca había venido al taller y hay que
registrarlo antes de poder anotarle nada.

**Antes de empezar.** Nada. Es el primer eslabón de la cadena: no hace falta que
exista nada previo.

**Pasos**

1. Entra en *Clientes* desde el menú.
2. Pulsa *Nuevo cliente*.
3. Rellena los datos del cliente. El **nombre es obligatorio**; sin él la
   aplicación no te deja guardar.
4. Guarda el formulario.

**Qué ves al terminar.** El cliente aparece en el listado de *Clientes* y ya
puedes abrir su ficha, registrarle vehículos y, más adelante, facturarle.

**Si algo va mal**

- *Te avisa de que falta el nombre*: has dejado el nombre en blanco. Escríbelo y
  vuelve a guardar. Es el único dato que la aplicación exige.

---

#### A.2 · Buscar un cliente y ver su ficha

**Cuándo se usa.** Alguien llama preguntando por su coche o por una factura y
necesitas ver de un vistazo qué tiene con el taller.

**Antes de empezar.** El cliente tiene que estar dado de alta (tarea A.1).

**Pasos**

1. Entra en *Clientes*.
2. Escribe el nombre, o parte del nombre, en el **buscador** del listado. También
   puedes ordenar por cualquier columna pulsando en su cabecera, o pasar de
   página si la lista es larga.
3. Abre el cliente que buscabas.

**Qué ves al terminar.** La ficha del cliente, con tres cosas: sus **datos**, la
lista de sus **vehículos** y la lista de sus **facturas**. Desde ahí puedes
saltar a cualquiera de ellos.

**Si algo va mal**

- *No aparece en el buscador*: la búsqueda es por nombre. Prueba con menos
  letras, o comprueba que no lo diste de alta con otra grafía. Si sigue sin
  salir, no está registrado: dalo de alta con la tarea A.1.

---

#### A.3 · Corregir los datos de un cliente

**Cuándo se usa.** Cambia un teléfono, una dirección o hay una errata en el
nombre.

**Antes de empezar.** El cliente tiene que existir.

**Pasos**

1. Abre la ficha del cliente (tarea A.2).
2. Entra en la edición de sus datos.
3. Cambia lo que haga falta. El **nombre sigue siendo obligatorio** también al
   modificar: no puedes dejarlo en blanco.
4. Guarda.

**Qué ves al terminar.** Los datos actualizados en la ficha y en el listado.

**Si algo va mal**

- *Te avisa de que falta el nombre*: lo has borrado sin poner otro. Escribe un
  nombre y guarda.

---

#### A.4 · Dar de baja un cliente

> **Aviso: borrar no tiene vuelta atrás.** Un cliente borrado no se recupera.
> Antes de confirmar, asegúrate de que es el que quieres.

**Cuándo se usa.** Un cliente que se registró por error, o que nunca llegó a
traer un vehículo y quieres quitarlo de en medio.

**Antes de empezar.** El cliente **no** puede tener vehículos ni facturas. Si los
tiene, la aplicación no te va a dejar: es a propósito, para que no se quede un
vehículo o una factura sin dueño.

**Pasos**

1. Abre la ficha del cliente (tarea A.2).
2. Pide borrarlo.
3. **Confirma** el borrado cuando la aplicación te lo pregunte.

**Qué ves al terminar.** El cliente desaparece del listado de *Clientes*.

**Si algo va mal**

- *No te deja borrarlo porque tiene vehículos*: primero tienes que dar de baja
  esos vehículos, o cambiarlos de propietario. Mira las tareas A.7 y A.8. Y ojo:
  un vehículo con albaranes tampoco se puede borrar, así que la cadena puede ser
  larga.
- *No te deja borrarlo porque tiene facturas*: aquí no hay salida. Las facturas
  emitidas no se pueden anular ni borrar, así que **un cliente al que ya has
  facturado alguna vez no se puede dar de baja nunca**. Déjalo en el listado.

---

#### A.5 · Registrar el vehículo de un cliente

**Cuándo se usa.** Un cliente trae un coche que el taller no tenía fichado.

**Antes de empezar.** El cliente tiene que estar dado de alta (tarea A.1). Todo
vehículo pertenece a un cliente: no existen vehículos sueltos.

**Pasos**

1. Entra en *Vehículos* y pulsa *Nuevo vehículo*. También puedes hacerlo desde la
   ficha del cliente, y así el propietario ya viene puesto.
2. Elige el **cliente** propietario, si no viene ya elegido.
3. Rellena **marca**, **modelo** y **matrícula**. Los tres son obligatorios.
4. Guarda.

**Qué ves al terminar.** El vehículo aparece en el listado de *Vehículos* y
también en la ficha de su cliente. Ya puedes abrirle albaranes.

**Si algo va mal**

- *Te avisa de que faltan marca, modelo o matrícula*: los tres son obligatorios,
  rellena el que falte.
- *Te dice que la matrícula ya existe*: esa matrícula está registrada en otro
  vehículo, tal vez de otro cliente. **No puede haber dos vehículos con la misma
  matrícula en todo el taller.** Búscala en *Vehículos* para ver cuál es: puede
  que el coche ya estuviera fichado, o que hayas tecleado mal un carácter.

---

#### A.6 · Buscar un vehículo y ver su historial

**Cuándo se usa.** Entra un coche al taller y quieres saber de quién es y qué se
le ha hecho antes.

**Antes de empezar.** El vehículo tiene que estar registrado (tarea A.5).

**Pasos**

1. Entra en *Vehículos*.
2. Busca en el listado. Puedes ordenar por columna y pasar de página.
3. Abre el vehículo.

**Qué ves al terminar.** La ficha del vehículo con sus **datos**, el **cliente
propietario** y la lista de sus **albaranes**, que es su historial de
intervenciones.

---

#### A.7 · Corregir los datos de un vehículo

**Cuándo se usa.** Te equivocaste al teclear la matrícula, o el coche cambia de
propietario dentro de tus clientes.

**Antes de empezar.** El vehículo tiene que existir.

**Pasos**

1. Abre la ficha del vehículo (tarea A.6).
2. Entra en la edición de sus datos.
3. Cambia lo que necesites. **Marca, modelo y matrícula siguen siendo
   obligatorios**, y la matrícula sigue sin poder repetirse.
4. Guarda.

**Qué ves al terminar.** Los datos actualizados en la ficha y en el listado.

**Cuidado si cambias el propietario.** Si le pones a este vehículo un cliente
distinto, **sus albaranes pendientes de facturar se van con él**: pasarán a ser
trabajo del nuevo propietario y es a ese a quien se los facturarás. Los albaranes
ya facturados no se mueven. Cambiar el propietario de un vehículo con trabajo
pendiente no es lo mismo que corregir una errata: repásalo antes de guardar. (El
taller todavía no ha decidido si esto debería avisarse o impedirse; ver el
apartado 9.)

**Si algo va mal**

- *Te dice que la matrícula ya existe*: otro vehículo la tiene. Comprueba cuál
  antes de seguir.

---

#### A.8 · Dar de baja un vehículo

> **Aviso: borrar no tiene vuelta atrás.** El vehículo desaparece y no se
> recupera.

**Cuándo se usa.** El cliente vendió el coche, o lo registraste por error.

**Antes de empezar.** El vehículo **no** puede tener albaranes. Si alguna vez
pasó por el taller y se le abrió una hoja de trabajo, no se puede borrar.

**Pasos**

1. Abre la ficha del vehículo (tarea A.6).
2. Pide borrarlo.
3. **Confirma** el borrado.

**Qué ves al terminar.** El vehículo desaparece del listado y de la ficha de su
cliente.

**Si algo va mal**

- *No te deja borrarlo porque tiene albaranes*: es lo normal en cualquier coche
  que haya pasado por el taller. Puedes borrar los albaranes que no estén
  facturados (tarea A.15), pero **los facturados no se pueden borrar nunca**, así
  que un vehículo ya facturado se queda en el listado para siempre.

---

#### A.9 · Abrir el albarán de una intervención

**Cuándo se usa.** Entra un vehículo al taller y empiezas a trabajar en él. El
albarán es la hoja donde vas anotando lo que gastas y las horas que echas.

**Antes de empezar.** El vehículo tiene que estar registrado (tarea A.5). Todo
albarán pertenece a un vehículo.

**Pasos**

1. Entra en *Albaranes* y pulsa *Nuevo albarán*. También puedes abrirlo desde la
   ficha del vehículo, y así el vehículo ya viene puesto.
2. Elige el **vehículo**, si no viene ya elegido.
3. Completa la fecha y las notas si te sirven.
4. Guarda.

**Qué ves al terminar.** Un albarán **vacío, sin ninguna línea**, con un **número
puesto por la aplicación** con el formato `año/A-nnnn` —por ejemplo `2026/A-0007`—
y en situación **pendiente de facturar**. El número no lo eliges tú y no se puede
cambiar. Ya puedes empezar a anotar piezas y mano de obra.

---

#### A.10 · Anotar una pieza usada en el albarán

**Cuándo se usa.** Coges una pieza del almacén para el trabajo que estás haciendo.

**Antes de empezar.** El albarán tiene que existir y **no** estar facturado. La
pieza tiene que estar en el catálogo (tarea B.1).

**Pasos**

1. Abre el albarán en *Albaranes*.
2. Añade una línea nueva y elige el tipo **pieza**. Solo hay dos tipos de línea,
   *pieza* y *mano de obra*: no existe ningún otro.
3. Selecciona la **pieza** del catálogo.
4. Indica la **cantidad**. Tiene que ser **mayor que cero**.
5. Si quieres cobrar esa pieza a un precio distinto del habitual, indícalo. **Si
   dejas el precio en blanco, la aplicación aplica el precio que la pieza tiene
   en el catálogo.**
6. Guarda la línea.

**Qué ves al terminar.** La línea aparece en el albarán y, en el mismo momento,
**el stock de esa pieza baja** en la cantidad que has anotado. Las dos cosas van
juntas: o pasan las dos o no pasa ninguna, nunca te quedará la línea sin el
descuento de stock ni al revés.

**Si una anotación no se llega a registrar, el albarán no se queda a medias.**
Cuando la aplicación rechaza una anotación —porque no es de pieza ni de mano de
obra, que son los dos únicos tipos que admite—, esa anotación sencillamente no
entra: **el albarán conserva las líneas y los importes que ya tenía**. No tienes
que revisar si se ha colado media línea ni recalcular nada.

**Si algo va mal**

- *Te avisa de que la cantidad no vale*: has puesto cero o un número negativo.
  Tiene que ser mayor que cero.
- *Te avisa de que la pieza no existe*: solo puedes anotar piezas que estén en el
  catálogo. Si la pieza es nueva, dala de alta primero con la tarea B.1.
- *No te deja tocar el albarán*: mira si ya está facturado. Un albarán facturado
  queda cerrado para siempre.
- *La anotación no se registra*: repítela eligiendo *pieza* o *mano de obra*. El
  albarán sigue como estaba, con sus líneas y sus importes intactos.
- *El stock queda en negativo*: **la aplicación te deja anotar más unidades de
  las que tienes en el catálogo, sin avisarte**. No es un error de la aplicación,
  es que hoy no comprueba las existencias. Si ves un stock negativo, significa
  que el catálogo estaba mal contado. Corrígelo con la tarea B.3. El taller ya ha
  decidido que esto cambie: ver el apartado 6.2.

---

#### A.11 · Anotar las horas de mano de obra

**Cuándo se usa.** Has terminado el trabajo y toca cobrar el tiempo dedicado.

**Antes de empezar.** El albarán tiene que existir y **no** estar facturado.

**Pasos**

1. Abre el albarán en *Albaranes*.
2. Añade una línea nueva y elige el tipo **mano de obra**.
3. Escribe la **descripción** del trabajo. Es obligatoria: sin ella no se guarda.
4. Indica las **horas** trabajadas y el **precio por hora**. Las horas cuentan
   como cantidad, así que también tienen que ser **mayores que cero**.
5. Guarda la línea.

**Qué ves al terminar.** La línea de mano de obra aparece en el albarán junto a
las de pieza. La mano de obra **no toca el stock**: no hay nada que descontar.

**Igual que con las piezas**, una anotación que no sea de uno de los dos tipos
admitidos no llega a registrarse, y el albarán conserva sus líneas y sus importes
tal como estaban.

**Si algo va mal**

- *Te avisa de que falta la descripción*: toda línea de mano de obra necesita que
  digas qué se hizo. Escríbelo aunque sea breve.
- *Te avisa de que la cantidad no vale*: las horas tienen que ser mayores que
  cero.

---

#### A.12 · Retirar una línea equivocada de un albarán

**Cuándo se usa.** Anotaste una pieza que al final no usaste, o te equivocaste de
cantidad y prefieres rehacer la línea.

**Antes de empezar.** El albarán **no** puede estar facturado.

**Pasos**

1. Abre el albarán en *Albaranes*.
2. Localiza la línea que sobra.
3. Elimínala.

**Qué ves al terminar.** La línea desaparece del albarán. Si era una **línea de
pieza**, esa cantidad **vuelve al stock** de la pieza en el mismo momento. Si era
de mano de obra, no hay ningún efecto sobre el stock.

**Si algo va mal**

- *No te deja eliminar la línea*: el albarán ya está facturado. Las líneas de un
  albarán facturado no se tocan, ni para quitar ni para añadir.

---

#### A.13 · Corregir la cabecera de un albarán

**Cuándo se usa.** Abriste el albarán al vehículo equivocado, o quieres cambiar
la fecha o añadir una nota.

**Antes de empezar.** El albarán **no** puede estar facturado.

**Pasos**

1. Abre el albarán en *Albaranes*.
2. Entra en la edición de la cabecera.
3. Cambia el **vehículo**, la **fecha** o las **notas**. En el selector de
   vehículo **solo aparecen los vehículos del cliente actual del albarán**: no
   verás los de ningún otro cliente.
4. Guarda.

**Qué ves al terminar.** El albarán actualizado. Sus líneas no se tocan.

**El albarán no se puede pasar a otro cliente.** Como el selector solo ofrece
vehículos del cliente actual, un albarán se queda siempre con el cliente al que
se le abrió. Si aun así llega a intentarse un cambio a un vehículo de otro
cliente, **la aplicación rechaza la edición entera**: no se guarda ni el
vehículo, ni la fecha, ni las notas. Tendrás que volver a hacer todos los
cambios, esta vez con un vehículo del mismo cliente. Para corregir una errata sí
puedes cambiar el vehículo por otro **del mismo cliente**.

**¿Y si de verdad hay que facturárselo a otro cliente?** Eso no se arregla desde
el albarán. La forma que hay hoy es borrar este albarán (tarea A.15) y abrir uno
nuevo al vehículo correcto (tarea A.9); solo se puede si todavía no está
facturado.

**Si algo va mal**

- *No te deja modificarlo*: el albarán ya está facturado. Un albarán facturado no
  se toca por ningún motivo, tenga que ver o no con el vehículo.
- *Rechaza la edición al guardar y no cambia nada*: el vehículo que has indicado
  es de otro cliente. Vuelve a editar la cabecera y elige uno del cliente actual;
  tus cambios de fecha y de notas también hay que rehacerlos, porque no se guardó
  nada.

---

#### A.14 · Encontrar los albaranes de un vehículo o de un cliente

**Cuándo se usa.** Antes de facturar, para ver qué trabajos hay pendientes de
cobrar. O cuando buscas una intervención concreta.

**Antes de empezar.** Nada especial.

**Pasos**

1. Entra en *Albaranes*.
2. Filtra por **vehículo**, por **cliente** o por **situación del albarán**
   (pendiente de facturar o ya facturado). Puedes combinarlos.

**Qué ves al terminar.** La lista de albaranes que cumplen el filtro. Los que
están **pendientes** son los que podrás llevar a una factura.

**Ojo con la palabra «estado».** En un albarán, el estado dice si está
*pendiente de facturar* o ya *facturado*. En una factura o en una nómina, el
estado parecido dice si está *pendiente de cobro* o *pagada*. **Son dos cosas
distintas**: un albarán nunca se «paga», y una factura nunca se «factura».

---

#### A.15 · Borrar un albarán entero

> **Aviso: borrar no tiene vuelta atrás.** Se van el albarán y todas sus líneas.

**Cuándo se usa.** Abriste un albarán por error o el trabajo al final no se hizo.

**Antes de empezar.** El albarán **no** puede estar facturado.

**Pasos**

1. Abre el albarán en *Albaranes*.
2. Pide borrarlo.
3. **Confirma** el borrado.

**Qué ves al terminar.** El albarán y todas sus líneas desaparecen.

**Si algo va mal**

- *No te deja borrarlo*: está facturado. Un albarán facturado no se borra nunca,
  porque es el respaldo de una factura ya emitida.

---

#### A.16 · Cobrar el trabajo hecho: emitir la factura

> **Aviso muy importante: emitir una factura no se puede deshacer.**
> Una vez emitida, **la factura no se puede modificar ni anular**, y **todos los
> albaranes que agrupa quedan bloqueados para siempre**: no podrás cambiarlos,
> borrarlos ni tocar sus líneas nunca más. Lo único que podrás cambiar es si está
> pagada o pendiente de cobro.
> **Revisa los albaranes antes de emitir.** Comprueba que las piezas, las
> cantidades y las horas son las correctas, y que el tipo de IVA es el que toca.
> Si te equivocas, hoy la aplicación no te ofrece ninguna forma de corregirlo.

**Cuándo se usa.** El trabajo está terminado y hay que pasarle la cuenta al
cliente.

**Antes de empezar.**

- El cliente tiene que tener **al menos un albarán pendiente de facturar**. Sin
  ninguno no hay factura posible.
- Todos los albaranes que agrupes tienen que ser **del mismo cliente**. No se
  puede mezclar el trabajo de dos clientes en una misma factura.
- Todos tienen que estar **pendientes**: uno ya facturado no se puede volver a
  facturar.

**Pasos**

1. Entra en *Facturas* y pulsa *Nueva factura*.
2. Elige el **cliente** al que vas a facturar. Verás sus albaranes pendientes.
3. **Selecciona uno o varios albaranes**. Al menos uno.
4. Indica el **tipo de IVA** si quieres uno distinto del habitual. **Si lo dejas
   en blanco, la aplicación aplica el 21 %.**
5. Repasa una última vez lo que vas a emitir.
6. Emite la factura.

**Qué ves al terminar.** La factura emitida, con:

- un **número puesto por la aplicación** con el formato `año/F-nnnn` —por ejemplo
  `2026/F-0012`—, que no eliges tú;
- la **base**, que es la suma de cantidad × precio de todas las líneas de todos
  los albaranes que has agrupado;
- el **IVA**: el tipo que has aplicado y, además, su importe en euros;
- el **total**, que es la base más el IVA;
- los importes **redondeados a dos decimales**, con coma decimal y separador de
  miles —por ejemplo `1.360,00 €`.

Y, en el mismo momento, **todos esos albaranes pasan a facturado** y quedan
enlazados a la factura. Emitir la factura y marcar los albaranes van juntos: o
pasan las dos cosas o no pasa ninguna.

**Si algo va mal**

- *Te dice que tienes que seleccionar al menos un albarán*: no has marcado
  ninguno. Una factura sin albaranes no existe.
- *Te dice que algún albarán ya está facturado*: alguien lo facturó antes, o lo
  has incluido dos veces. Quítalo de la selección; el trabajo ya está cobrado en
  otra factura.
- *Te dice que los albaranes son de clientes distintos*: se ha colado el albarán
  de otro cliente. Repasa la selección. Desde que la aplicación impide mover un
  albarán a otro cliente (tarea A.13) esto casi no debería ocurrir, pero la
  comprobación sigue ahí por si acaso.
- *La has emitido con un error*: la aplicación no ofrece hoy forma de anularla ni
  de corregirla, y los albaranes quedan bloqueados. Es una limitación conocida, y
  el taller ya ha decidido cómo se resolverá el día que se construya: ver el
  apartado 6.2.

---

#### A.17 · Consultar una factura y sus importes

**Cuándo se usa.** El cliente pregunta qué le has cobrado, o necesitas repasar
una factura antes de cobrarla.

**Antes de empezar.** La factura tiene que estar emitida (tarea A.16).

**Pasos**

1. Entra en *Facturas*. El listado te muestra cada factura con su **número**, su
   **estado de pago** y su **total**.
2. Abre la factura que buscas.

**Qué ves al terminar.** El detalle de la factura: los **albaranes que agrupa**,
la **base**, el **IVA** —el tipo que se aplicó y, además, su importe en euros— y
el **total**. Los tres importes están redondeados a dos decimales, con coma
decimal y separador de miles —por ejemplo `1.360,00 €`. También llegas a la
factura desde la ficha del cliente, donde aparecen todas las suyas.

**Si los importes no te cuadran.** La base sale de sumar cantidad × precio de
todas las líneas de todos los albaranes agrupados. El precio que cuenta es el que
quedó anotado en cada línea del albarán, que puede no ser el precio actual del
catálogo si la pieza ha subido desde entonces, o si en su día pusiste otro precio
a mano. Y el coste de la pieza no interviene: la aplicación lo guarda, pero no lo
usa para nada.

**Para saber qué tienes sin cobrar** tienes que ir mirando el estado de pago
factura por factura en el listado. Hoy no hay ningún recuento ni ningún filtro
que te lo dé de una vez; está decidido que lo haya (apartado 6.2).

---

#### A.18 · Marcar una factura como cobrada

**Cuándo se usa.** El cliente paga. O te confundiste al darla por cobrada y hay
que volver atrás.

**Antes de empezar.** La factura tiene que estar emitida.

**Pasos**

1. Abre la factura (tarea A.17).
2. Acciona el **conmutador de pago**.

**Qué ves al terminar.** La factura pasa a **pagada**, y así se ve también en el
listado de *Facturas*. Solo hay dos situaciones posibles: **pendiente** o
**pagada**; no hay pagos parciales ni «pagada a medias».

**Esto sí se puede deshacer.** El estado de pago es lo **único** que se puede
cambiar en una factura emitida: puedes devolverla a pendiente accionando otra vez
el conmutador. Los importes, los albaranes y el número no se tocan.

---

### Bloque B · El catálogo de piezas y su stock

Este bloque funciona por su cuenta: no depende del ciclo anterior. Lo único que
lo conecta es que anotar piezas en un albarán mueve el stock.

---

#### B.1 · Dar de alta una pieza en el catálogo

**Cuándo se usa.** Entra material nuevo al almacén, o vas a anotar en un albarán
una pieza que todavía no está fichada.

**Antes de empezar.** Nada.

**Pasos**

1. Entra en *Piezas* desde el menú.
2. Pulsa *Nueva pieza*.
3. Rellena los datos: el **nombre es obligatorio**. Puedes informar además
   **referencia**, **precio**, **coste**, **unidad**, **proveedor** y el **stock
   inicial**.
4. Guarda.

**Qué ves al terminar.** La pieza aparece en el catálogo con su stock inicial y
ya se puede anotar en un albarán.

**Dos avisos sobre los datos de la pieza**

- El **precio** es el que la aplicación aplica sola cuando anotas la pieza en un
  albarán sin indicar otro. Es el dato que acaba en la factura del cliente.
- El **coste** y la **unidad** se guardan pero **no se usan para nada**: no
  intervienen en ningún cálculo ni en ninguna comprobación. Anótalos si te sirven
  como información, sabiendo que la aplicación no hará nada con ellos.

**Si algo va mal**

- *Te avisa de que falta el nombre*: es el único dato obligatorio.

---

#### B.2 · Consultar el catálogo y ver el stock

**Cuándo se usa.** Quieres saber si te queda una pieza, a cuánto la tienes o
quién te la sirve.

**Antes de empezar.** La pieza tiene que estar en el catálogo.

**Pasos**

1. Entra en *Piezas*. El catálogo muestra de cada pieza su **referencia**, su
   **precio** y su **stock actual**.
2. Abre una pieza para ver el resto.

**Qué ves al terminar.** La ficha de la pieza con su **referencia**, **precio**,
**coste**, **unidad**, **proveedor** y **stock**.

**Cómo se mueve el stock.** El stock sube y baja **solo** por los albaranes: baja
cuando anotas la pieza en una línea y vuelve a subir si retiras esa línea. Nada
más lo mueve automáticamente. Si has recibido material del proveedor, tienes que
ponerlo tú a mano modificando la pieza (tarea B.3).

**Si el stock está en negativo.** Significa que se han anotado en albaranes más
unidades de las que constaban. La aplicación no lo impide ni te avisa. Cuenta las
que tienes de verdad y corrige el número con la tarea B.3.

---

#### B.3 · Cambiar el precio o el stock de una pieza

**Cuándo se usa.** El proveedor te sube el precio, recibes material nuevo o has
contado el almacén y el número no cuadra.

**Antes de empezar.** La pieza tiene que existir.

**Pasos**

1. Abre la pieza en *Piezas* (tarea B.2).
2. Entra en la edición de sus datos.
3. Cambia lo que necesites. El **nombre sigue siendo obligatorio** al modificar.
4. Guarda.

**Qué ves al terminar.** Los datos actualizados en la ficha y en el catálogo.

**Lo que no cambia.** Cambiar el precio del catálogo **no cambia** el precio de
las líneas de albarán que ya están anotadas, ni el importe de las facturas ya
emitidas. Cada línea guarda el precio que tenía en el momento de anotarla. Es lo
correcto: una factura emitida no puede cambiar de importe porque hoy la pieza
cueste más.

**Si algo va mal**

- *Te avisa de que falta el nombre*: no puedes dejarlo en blanco.

---

#### B.4 · Quitar una pieza del catálogo

> **Aviso: borrar no tiene vuelta atrás.**

**Cuándo se usa.** Diste de alta una pieza por error, o dejas de trabajar con
ella y nunca la has usado.

**Antes de empezar.** La pieza **no** puede haberse usado en ningún albarán.

**Pasos**

1. Abre la pieza en *Piezas*.
2. Pide borrarla.
3. **Confirma** el borrado.

**Qué ves al terminar.** La pieza desaparece del catálogo.

**Si algo va mal**

- *No te deja borrarla porque se ha usado en algún albarán*: es a propósito, para
  que los albaranes y las facturas antiguas sigan diciendo qué se montó. Si la
  pieza ya no se usa, déjala en el catálogo: dejar su stock a cero es la forma
  práctica de retirarla.

---

### Bloque C · El personal del taller y sus nóminas

Este bloque también va por su cuenta: no tiene ninguna relación con clientes,
vehículos, albaranes ni facturas.

---

#### C.1 · Dar de alta un empleado

**Cuándo se usa.** Entra alguien nuevo a trabajar en el taller.

**Antes de empezar.** Nada.

**Pasos**

1. Entra en *Personal* desde el menú.
2. Pulsa *Nuevo empleado*.
3. Rellena sus datos: el **nombre es obligatorio**. Puedes informar además su
   **cargo** y su **contacto**.
4. Guarda.

**Qué ves al terminar.** El empleado aparece en el listado de *Personal* y ya se
le pueden registrar nóminas.

**Si algo va mal**

- *Te avisa de que falta el nombre*: es el único dato obligatorio.

---

#### C.2 · Consultar la plantilla y la ficha de un empleado

**Cuándo se usa.** Buscas un teléfono, o quieres ver las nóminas que le has
registrado a alguien.

**Antes de empezar.** El empleado tiene que estar dado de alta.

**Pasos**

1. Entra en *Personal*. El listado muestra el **nombre**, el **cargo** y el
   **contacto** de cada empleado.
2. Abre el empleado.

**Qué ves al terminar.** La ficha del empleado con sus **datos** y la lista de
sus **nóminas**. Desde aquí también puedes registrarle una nómina nueva.

---

#### C.3 · Corregir los datos de un empleado

**Cuándo se usa.** Cambia un teléfono, un cargo o hay una errata.

**Antes de empezar.** El empleado tiene que existir.

**Pasos**

1. Abre la ficha del empleado (tarea C.2).
2. Entra en la edición de sus datos.
3. Cambia lo que haga falta. El **nombre sigue siendo obligatorio**.
4. Guarda.

**Qué ves al terminar.** Los datos actualizados.

**Si algo va mal**

- *Te avisa de que falta el nombre*: escríbelo y guarda.

---

#### C.4 · Dar de baja un empleado

> **Aviso: borrar no tiene vuelta atrás.**

**Cuándo se usa.** Registraste a alguien por error. Ojo: para alguien que ya no
trabaja en el taller pero tuvo nóminas, esto **no** va a funcionar, y es lo
correcto.

**Antes de empezar.** El empleado **no** puede tener nóminas registradas.

**Pasos**

1. Abre la ficha del empleado (tarea C.2).
2. Pide borrarlo.
3. **Confirma** el borrado.

**Qué ves al terminar.** El empleado desaparece del listado de *Personal*.

**Si algo va mal**

- *No te deja borrarlo porque tiene nóminas*: cualquier empleado al que hayas
  pagado alguna vez tiene nóminas, así que no se puede borrar. Es a propósito:
  borrarlo dejaría nóminas sin dueño. Déjalo en el listado.

---

#### C.5 · Registrar la nómina del mes de un empleado

**Cuándo se usa.** Cierras el mes y anotas lo que le pagas a cada empleado.

**Antes de empezar.** El empleado tiene que estar dado de alta (tarea C.1). Y no
puede tener ya una nómina de ese mismo mes y año.

**Pasos**

1. Entra en *Nóminas* y pulsa *Nueva nómina*. También puedes hacerlo desde la
   ficha del empleado, y así el empleado ya viene puesto.
2. Elige el **empleado**, si no viene ya elegido. Es obligatorio.
3. Indica el **mes** (de 1 a 12) y el **año**. Los dos son obligatorios.
4. Escribe el **salario bruto** y las **deducciones**.
5. Guarda.

**Qué ves al terminar.** La nómina queda registrada y aparece en el listado de
*Nóminas* y en la ficha del empleado. La aplicación te muestra el **salario
neto**, que es el bruto menos las deducciones, redondeado a dos decimales.

**El bruto lo escribes tú cada mes.** Aunque el empleado tenga un salario base
guardado en su ficha, la aplicación **no** lo trae solo a la nómina: el bruto se
teclea a mano todos los meses.

**Si algo va mal**

- *Te avisa de que faltan el empleado, el mes o el año*: los tres son
  obligatorios.
- *Te dice que el mes no vale*: tiene que ser un número **entre 1 y 12**.
- *Te dice que ya existe una nómina de ese empleado para ese mes y año*: solo
  puede haber una. Si necesitas cambiar algo, busca la que ya existe y modifícala
  con la tarea C.8.

---

#### C.6 · Consultar las nóminas y el salario neto

**Cuándo se usa.** Repasas lo pagado, o el empleado pregunta por un mes concreto.

**Antes de empezar.** Tiene que haber nóminas registradas.

**Pasos**

1. Entra en *Nóminas*. El listado sale ordenado **de la más reciente a la más
   antigua**, por año y mes.
2. Abre la nómina que buscas. También puedes llegar desde la ficha del empleado.

**Qué ves al terminar.** El detalle de la nómina con el **salario bruto**, las
**deducciones** y el **salario neto**.

**El neto no se guarda, se calcula.** Cada vez que abres una nómina, la
aplicación resta las deducciones al bruto y redondea a dos decimales. Por eso, si
corriges el bruto o las deducciones, el neto cambia solo: no tienes que
recalcular nada.

**Para saber qué nóminas te quedan por pagar** tienes que abrirlas una a una: el
listado se ordena por año y mes, y hoy no ofrece ningún recuento ni filtro por
estado de pago. Está decidido que lo ofrezca (apartado 6.2).

---

#### C.7 · Marcar una nómina como pagada

**Cuándo se usa.** Has hecho la transferencia o has pagado en mano.

**Antes de empezar.** La nómina tiene que estar registrada.

**Pasos**

1. Abre la nómina (tarea C.6).
2. Acciona el **conmutador de pago**.

**Qué ves al terminar.** La nómina pasa a **pagada**. Solo hay dos situaciones:
**pendiente** o **pagada**. Puedes devolverla a pendiente accionando otra vez el
conmutador.

---

#### C.8 · Corregir o borrar una nómina

> **Aviso: borrar no tiene vuelta atrás.** Y aquí, a diferencia de las facturas,
> la aplicación **no te pone ningún freno**: una nómina se puede modificar y
> borrar incluso después de haberla marcado como pagada, y no queda rastro de lo
> que decía antes. Ten cuidado con las nóminas cerradas de meses anteriores.

**Cuándo se usa.** Te equivocaste al teclear el bruto o las deducciones, o
registraste una nómina que no tocaba.

**Antes de empezar.** La nómina tiene que existir. No hay ninguna otra condición.

**Pasos para corregirla**

1. Abre la nómina (tarea C.6).
2. Entra en la edición.
3. Cambia lo que necesites. **Empleado, mes y año siguen siendo obligatorios** y
   el mes sigue teniendo que estar entre 1 y 12.
4. Guarda.

**Pasos para borrarla**

1. Abre la nómina.
2. Pide borrarla.
3. **Confirma** el borrado.

**Qué ves al terminar.** La nómina corregida, con el neto recalculado; o la
nómina desaparecida del listado y de la ficha del empleado.

**Si algo va mal**

- *Te avisa de que faltan empleado, mes o año, o de que el mes no vale*: las
  mismas condiciones que al registrarla.
- *Te dice que ya existe una nómina de ese empleado para ese mes y año*: has
  cambiado el mes o el año a uno que ya está ocupado por otra nómina de ese mismo
  empleado.

---

### Bloque D · Ajustar la aplicación a tu gusto

---

#### D.1 · Cambiar el idioma de la interfaz

**Cuándo se usa.** Prefieres trabajar en catalán, o al revés.

**Antes de empezar.** Nada. Se puede hacer en cualquier momento y desde cualquier
pantalla.

**Pasos**

1. Ve al **selector de idioma** de la cabecera.
2. Elige **catalán** o **castellano**.

**Qué ves al terminar.** Los textos cambian al momento, sin recargar y **sin que
pierdas el trabajo en curso**: puedes cambiar de idioma con un formulario a medio
rellenar y no se te borra nada. La elección se recuerda para las próximas veces
que abras la aplicación.

**Lo que no cambia de idioma.** Lo que has escrito tú —nombres de clientes,
descripciones de mano de obra, notas de albaranes— se queda tal cual lo
escribiste. El idioma solo afecta a los textos de la propia aplicación.

---

#### D.2 · Cambiar entre tema claro y tema oscuro

**Cuándo se usa.** El taller está a oscuras y el fondo blanco molesta, o al
contrario.

**Antes de empezar.** Nada.

**Pasos**

1. Ve al **conmutador de tema** de la cabecera.
2. Cambia entre **claro** y **oscuro**.

**Qué ves al terminar.** La aplicación cambia de aspecto al momento. De entrada
sigue lo que tenga configurado tu ordenador; en cuanto eliges tú, se recuerda tu
elección para las próximas veces.

---

## 5. Preguntas frecuentes

**No me deja borrar un cliente. ¿Por qué?**
Porque tiene vehículos o facturas. Si tiene vehículos, dalos de baja o
reasígnalos primero. Si tiene facturas, no hay forma: las facturas no se borran,
así que un cliente ya facturado se queda en el listado para siempre.

**He anotado una pieza en un albarán y el stock ha bajado solo. ¿Está bien?**
Sí. Anotar una pieza en un albarán descuenta esa cantidad del catálogo en el
mismo momento. Si retiras la línea, vuelve a subir.

**El stock de una pieza me sale en negativo.**
La aplicación deja anotar más unidades de las que constan, sin avisar. No es un
fallo que puedas arreglar desde el albarán: cuenta las piezas reales y corrige el
stock modificando la pieza (tarea B.3). El taller ya ha decidido que la
aplicación pase a impedirlo, pero ese cambio todavía no está hecho: apartado 6.2.

**Se ha quedado a medias una anotación en un albarán. ¿Tengo que revisar los
importes?**
No. Si una anotación no llega a registrarse, el albarán conserva las líneas y los
importes que ya tenía. No se queda nada a medio guardar.

**He facturado un albarán por error. ¿Cómo lo deshago?**
Hoy no se puede. Una factura emitida no se modifica ni se anula, y sus albaranes
quedan bloqueados de forma permanente. Por eso conviene revisar antes de emitir.
El taller ya ha decidido cómo se corregirá el día que se construya —emitiendo una
factura que rectifique a la anterior—, pero hoy esa opción no existe: apartado 6.2.

**¿Puedo ver de una vez qué facturas tengo pendientes de cobro?**
Hoy no. El listado de *Facturas* te enseña el estado de pago de cada una, pero no
hay ningún recuento ni ningún filtro que te dé el total de lo pendiente. Está
decidido que lo haya, y lo mismo para las nóminas pendientes de pago: apartado 6.2.

**¿Qué IVA me va a aplicar?**
El que indiques al emitir la factura. Si no indicas ninguno, el **21 %**. La
factura te muestra el tipo aplicado y, además, su importe en euros: no hace
falta que lo calcules tú restando la base del total.

**¿Puedo juntar en una factura los albaranes de dos clientes?**
No. Todos los albaranes de una misma factura tienen que ser del mismo cliente.

**Abrí un albarán al cliente equivocado. ¿Puedo pasárselo a otro?**
No directamente. Al editar la cabecera, el selector de vehículo solo te muestra
los del cliente actual, y si por otra vía se intenta el cambio a un vehículo de
otro cliente, la aplicación rechaza la edición entera sin guardar nada. Si el
albarán todavía no está facturado, la salida es borrarlo (tarea A.15) y abrir uno
nuevo al vehículo correcto (tarea A.9).

**Cambié el propietario de un vehículo y ahora sus albaranes pendientes están en
el cliente nuevo. ¿Es normal?**
Sí, hoy funciona así: cambiar el propietario de un vehículo se lleva con él los
albaranes que aún no están facturados. Los facturados no se mueven. El taller
todavía no ha decidido si esto debería avisarse o impedirse (apartado 9).

**¿Puedo elegir el número de factura o de albarán?**
No. Los pone la aplicación sola, correlativos por año: `año/A-nnnn` para los
albaranes y `año/F-nnnn` para las facturas.

**He cambiado el precio de una pieza en el catálogo. ¿Cambian mis facturas
antiguas?**
No. Cada línea de albarán guarda el precio que tenía en el momento de anotarla, y
las facturas emitidas no cambian de importe.

**¿Para qué sirven el coste y la unidad de una pieza?**
Hoy, para nada más que para tu información: la aplicación los guarda pero no los
usa en ningún cálculo ni en ninguna comprobación.

**¿Por qué no me deja registrar dos nóminas del mismo mes?**
Porque solo puede haber una nómina por empleado, mes y año. Si hay que cambiar
algo, modifica la que ya existe.

**El salario neto, ¿lo tengo que calcular yo?**
No. La aplicación resta las deducciones al bruto cada vez que abres la nómina, y
redondea a dos decimales. Si corriges el bruto, el neto cambia solo.

**¿Puedo cambiar de idioma con un formulario a medio rellenar?**
Sí. No pierdes lo que estabas escribiendo.

**Cuando dice «estado», ¿de qué me habla?**
Depende de dónde lo veas. En un **albarán**, el estado dice si está pendiente de
facturar o ya facturado. En una **factura** o en una **nómina**, dice si está
pendiente de cobro o pagada. Son dos cosas distintas.

**¿Hace falta usuario y contraseña?**
No. La aplicación no pide identificación y quien la abre puede hacerlo todo.

## 6. Qué no puede hacer la aplicación todavía

Este apartado tiene dos partes y conviene no confundirlas. La **6.1** es lo que
hoy no puedes hacer. La **6.2** son cinco cambios que el taller **ya ha decidido**
y que todavía **no están construidos**: no los busques en la pantalla, porque no
están.

### 6.1 Lo que hoy no puedes hacer

Dicho sin rodeos, para que no pierdas tiempo buscándolo:

- **La sección *Configuración* no funciona.** Está en el menú, pero al entrar solo
  verás un aviso de que el módulo está pendiente de desarrollo. No hay nada que
  configurar ahí, y de momento no está decidido qué contendrá.
- **Una factura emitida no se puede modificar ni anular.** No hay factura
  rectificativa, ni abono, ni forma de deshacer la emisión. Lo único que puedes
  cambiar es si está pagada o pendiente. → *decidido que cambie, ver 6.2*
- **Los albaranes de una factura quedan bloqueados para siempre.** No se pueden
  modificar, ni borrar, ni tocar sus líneas, ni siquiera para corregir una
  errata.
- **El stock puede quedar en negativo.** La aplicación no comprueba que tengas
  existencias antes de anotar una pieza en un albarán, y no te avisa.
  → *decidido que cambie, ver 6.2*
- **Se aceptan importes negativos.** Nada impide teclear un precio, un coste, un
  stock o un precio por hora por debajo de cero. → *decidido que cambie, ver 6.2*
- **Cambiar el propietario de un vehículo arrastra sus albaranes pendientes.** Si
  a un vehículo con trabajo sin facturar le cambias el cliente, ese trabajo pasa
  al nuevo propietario, y sin ningún aviso. La aplicación impide mover un albarán
  a otro cliente por la puerta de su cabecera (tarea A.13), pero no por esta
  otra. El taller aún no ha decidido qué hacer con ella: ver el apartado 9.
- **No hay recuento ni filtro de facturas pendientes de cobro**, ni de **nóminas
  pendientes de pago**. Ves el estado de pago de cada una por separado, pero no
  el conjunto de lo que te deben o de lo que debes. → *decidido que cambie, ver 6.2*
- **El coste y la unidad de una pieza no se usan.** No hay cálculo de margen ni de
  beneficio en ninguna pantalla.
- **La nómina no propone el salario base del empleado.** Aunque la ficha del
  empleado guarde un salario base, el bruto se teclea a mano cada mes.
- **Una nómina pagada no queda protegida.** Se puede modificar y borrar sin
  ninguna traba, a diferencia de los albaranes facturados.
- **No hay estados intermedios en un albarán.** Solo hay «pendiente de facturar»
  y «facturado»: no puedes marcar un trabajo como «en curso», «acabado» o
  «pendiente de aprobación por el cliente».
- **No hay usuarios ni registro de quién hizo qué.** La aplicación no identifica a
  nadie y no guarda un historial de cambios. Si algo se borra, no hay forma de
  saber quién fue ni de recuperarlo.
- **No hay avisos ni recordatorios.** La aplicación no te avisa de facturas
  vencidas, de stock bajo ni de nóminas sin registrar.
- **Es de un solo puesto.** Sus datos están en el ordenador donde está instalada.
  No se consulta desde otro ordenador ni desde el móvil.

### 6.2 Cinco cambios ya decididos que todavía no están hechos

El **16 de agosto de 2026** el taller decidió seis cosas sobre el funcionamiento
de la aplicación. Las seis van en la misma dirección: lo que hoy hace la
aplicación no es lo que el taller quiere. **Una ya está hecha** —no se puede
mover un albarán al vehículo de otro cliente, y así lo cuenta la tarea A.13— y
**las otras cinco siguen pendientes**.

> **Nada de esto existe todavía.** Mientras no se construya, la aplicación se
> comporta exactamente como cuentan las tareas del apartado 4. Si esperas alguno
> de estos comportamientos y no lo ves, no es que lo estés haciendo mal: es que
> aún no está.

| Lo que pasa hoy | Lo que se ha decidido |
|---|---|
| Puedes anotar en un albarán más unidades de las que tienes, y el stock queda en negativo. | **Se bloqueará.** No se podrá anotar una pieza si no hay existencias suficientes, y el stock dejará de poder quedar en negativo. |
| Una factura emitida por error no se puede corregir de ninguna forma. | **Habrá factura rectificativa.** Se emitirá una factura nueva que anule la anterior, y las dos quedarán en el histórico. La factura original seguirá sin poder modificarse. |
| Se aceptan precios, costes, stocks y precios por hora negativos. | **Se bloquearán.** Todos esos importes tendrán que ser positivos. |
| No hay forma de ver de una vez qué facturas están pendientes de cobro. | **Habrá recuento y filtro** de facturas pendientes de cobro. |
| No hay forma de ver de una vez qué nóminas están pendientes de pago. | **Habrá recuento y filtro** de nóminas pendientes de pago. |

**Ya hecho.** La sexta decisión —que un albarán no facturado no se pueda mover al
vehículo de otro cliente— **ya está en la aplicación**: el selector de vehículo
al editar la cabecera solo ofrece los del cliente actual, y cualquier intento de
saltárselo se rechaza sin guardar nada. Está contado en la tarea A.13. Lo que
sigue abierto de este mismo asunto es la otra puerta: cambiar el propietario de
un vehículo (tarea A.7) todavía arrastra sus albaranes pendientes al cliente
nuevo. Ver el apartado 9.

**Qué significa esto para este manual.** El día que los cinco cambios pendientes
se construyan, diez tareas dejarán de ser exactas y habrá que rehacer el manual:
**A.10, A.11, A.16, A.17, A.18, B.1, B.2, B.3, C.6 y C.7**. Hasta ese día, lo que
leas en ellas es lo que la aplicación hace.

**Lo que estas decisiones no resuelven.** Siguen sin decidirse, entre otras
cosas, si una nómina pagada debería quedar protegida, qué tipos de IVA puede
aplicar el taller, qué debe contener la sección *Configuración*, para qué sirven
el coste y la unidad de una pieza y qué hacer con el cambio de propietario de un
vehículo con albaranes pendientes. Están en el apartado 9.

## 7. Glosario

Los términos del taller, tal como aparecen en la pantalla en catalán, y qué
significan.

| En pantalla (catalán) | En castellano | Qué es |
|---|---|---|
| Client | Cliente | La persona o la empresa dueña de uno o más vehículos, y a quien se le hacen las facturas. |
| Vehicle | Vehículo | El coche de un cliente. Su matrícula es única: no puede repetirse en el taller. |
| Peça | Pieza | Un artículo del catálogo del taller, con su precio y su stock. |
| Albarà | Albarán | La hoja de trabajo de una intervención sobre un vehículo. Ahí se anotan las piezas usadas y las horas. Es el paso previo a la factura. Mientras no esté facturado se le puede cambiar el vehículo, pero solo por otro **del mismo cliente**: un albarán no se puede pasar a otro cliente. |
| Línia d'albarà | Línea de albarán | Cada apunte de un albarán. O es de pieza, o es de mano de obra; no hay más opciones, y lo que no sea una de las dos cosas no llega a registrarse. |
| Ma d'obra | Mano de obra | El trabajo de las personas, cobrado por horas, con una descripción de lo que se hizo y un precio por hora. |
| Estoc | Stock | Las unidades que te quedan de una pieza. Baja al anotarla en un albarán y sube al retirar esa anotación. |
| Factura | Factura | El documento de cobro. Agrupa uno o varios albaranes de un mismo cliente y le aplica el IVA. |
| Base | Base | La suma de cantidad × precio de todas las líneas de los albaranes de la factura, antes del IVA. |
| Personal / Empleat | Personal / Empleado | Quien trabaja en el taller. |
| Nòmina | Nómina | Lo que se le paga a un empleado en un mes y año concretos. |
| Salari brut | Salario bruto | El importe antes de descuentos. Lo escribes tú cada mes. |
| Deduccions | Deducciones | Los descuentos que se aplican al bruto. |
| Salari net | Salario neto | El bruto menos las deducciones. Lo calcula la aplicación; no lo escribes tú. |
| **Estat** | **Estado** | **Cuidado, significa dos cosas distintas.** En un **albarán**: si está *pendiente de facturar* o *facturado*. En una **factura** o una **nómina** (donde aparece como *estat de pagament*): si está *pendiente de cobro* o *pagada*. En este manual decimos «situación del albarán» para lo primero y «estado de pago» para lo segundo. |
| **Preu / Cost** | **Precio / Coste** | El **precio** es lo que le cobras al cliente, y es el que la aplicación aplica sola en los albaranes. El **coste** es lo que te cuesta a ti: se guarda, pero **la aplicación no lo usa en ningún cálculo**. |
| **Unitat** | **Unidad** | La unidad de medida de la pieza. Se guarda, pero **no interviene en ningún cálculo ni en ninguna comprobación**. |

## 8. Trazabilidad

Cada tarea de este manual y los requisitos de `DOC-04-FUNCIONAL.md` **1.3.0** que
cubre. Sirve para que A-05 y el responsable documental comprueben la cobertura.

| Tarea | Requisitos cubiertos |
|---|---|
| A.1 · Dar de alta un cliente nuevo | REQ-002, REQ-003 |
| A.2 · Buscar un cliente y ver su ficha | REQ-001, REQ-004 |
| A.3 · Corregir los datos de un cliente | REQ-005, REQ-003 |
| A.4 · Dar de baja un cliente | REQ-006, REQ-007, REQ-008 |
| A.5 · Registrar el vehículo de un cliente | REQ-010, REQ-011, REQ-012, REQ-013 |
| A.6 · Buscar un vehículo y ver su historial | REQ-009, REQ-014 |
| A.7 · Corregir los datos de un vehículo | REQ-015, REQ-012, REQ-013 |
| A.8 · Dar de baja un vehículo | REQ-016, REQ-017 |
| A.9 · Abrir el albarán de una intervención | REQ-026, REQ-027, REQ-028, REQ-029 |
| A.10 · Anotar una pieza usada en el albarán | REQ-030, REQ-031, REQ-032, REQ-033, REQ-034, REQ-035 |
| A.11 · Anotar las horas de mano de obra | REQ-036, REQ-037, REQ-031, REQ-032 |
| A.12 · Retirar una línea equivocada | REQ-038, REQ-039, REQ-042 |
| A.13 · Corregir la cabecera de un albarán | REQ-040, REQ-042, REQ-080, REQ-081 |
| A.14 · Encontrar los albaranes de un vehículo o cliente | REQ-025 |
| A.15 · Borrar un albarán entero | REQ-041, REQ-042 |
| A.16 · Cobrar el trabajo: emitir la factura | REQ-043, REQ-044, REQ-045, REQ-046, REQ-047, REQ-048, REQ-050 |
| A.17 · Consultar una factura y sus importes | REQ-052, REQ-053, REQ-049, REQ-051 |
| A.18 · Marcar una factura como cobrada | REQ-054, REQ-055 |
| B.1 · Dar de alta una pieza en el catálogo | REQ-019, REQ-020 |
| B.2 · Consultar el catálogo y ver el stock | REQ-018, REQ-021 |
| B.3 · Cambiar el precio o el stock de una pieza | REQ-022, REQ-020 |
| B.4 · Quitar una pieza del catálogo | REQ-023, REQ-024 |
| C.1 · Dar de alta un empleado | REQ-057, REQ-058 |
| C.2 · Consultar la plantilla y la ficha de un empleado | REQ-056, REQ-059 |
| C.3 · Corregir los datos de un empleado | REQ-060, REQ-058 |
| C.4 · Dar de baja un empleado | REQ-061, REQ-062 |
| C.5 · Registrar la nómina del mes | REQ-064, REQ-065, REQ-066, REQ-067, REQ-068 |
| C.6 · Consultar las nóminas y el salario neto | REQ-063, REQ-069, REQ-070 |
| C.7 · Marcar una nómina como pagada | REQ-072, REQ-073 |
| C.8 · Corregir o borrar una nómina | REQ-071, REQ-074, REQ-066 |
| D.1 · Cambiar el idioma de la interfaz | REQ-075, REQ-076 |
| D.2 · Cambiar entre tema claro y tema oscuro | REQ-077, REQ-078 |
| *(sin tarea)* Apartado 6.1 · Qué no puedes hacer hoy | REQ-079 |

**Cobertura: 32 tareas, los 81 requisitos de DOC-04 1.3.0 reflejados.**

**Requisitos sin tarea propia y por qué**

| REQ | Motivo |
|---|---|
| REQ-079 | La sección *Configuración* no hace nada: no hay ninguna tarea que el usuario pueda ejecutar ahí. Se cubre en el apartado 6.1, que es donde el usuario lo va a buscar. |

**Requisitos que el usuario no ejecuta pero sí observa.** Estos no describen una
acción, sino un comportamiento de la aplicación. Aparecen dentro del apartado
«Qué ves al terminar» o «Si algo va mal» de la tarea que los provoca, no como
tarea propia: REQ-011, REQ-013, REQ-027, REQ-028, REQ-029, REQ-031, REQ-032,
REQ-033, REQ-034, REQ-035, REQ-039, REQ-042, REQ-044, REQ-045, REQ-046, REQ-047,
REQ-048, REQ-049, REQ-050, REQ-051, REQ-055, REQ-065, REQ-070, REQ-073, REQ-076,
REQ-078, REQ-080, REQ-081.

**Qué ha cambiado en la trazabilidad respecto a 1.3.0.** DOC-04 subió a 1.3.0
con **dos requisitos nuevos**, `REQ-080` y `REQ-081` (módulo albarans, ancla
`BR-ALB-10` / `UC-ALB-06`), y ninguno de los 79 anteriores se ha tocado. Los dos
tienen cara visible para el usuario y se reflejan en la tarea **A.13**: `REQ-081`
—el selector de vehículo solo ofrece los del cliente actual— dentro de los pasos,
y `REQ-080` —el intento de cambio a otro cliente se rechaza entero, sin guardar
ni el vehículo, ni la fecha, ni las notas— en «El albarán no se puede pasar a
otro cliente» y en «Si algo va mal». Por eso A.13 pasa a cubrir cuatro requisitos
en vez de dos. El resto del mapa no cambia.

**Las respuestas de negocio de 2026-08-16 siguen sin añadir ni quitar
trazabilidad.** De las seis, una (la del cambio de cliente por la cabecera del
albarán) ya está implementada y **sí** genera requisitos: son `REQ-080` y
`REQ-081`, cubiertos por A.13. Las otras cinco no cambian ningún enunciado y su
único reflejo es el apartado 6.2, que es informativo y no cubre requisitos.

## 9. Preguntas abiertas

Nunca vacía. Aquí está todo lo que no se ha podido escribir en el manual sin
suponer, más lo que el usuario preguntará y hoy no tiene respuesta documentada.

Hay **dos clases de pregunta**, y conviene no mezclarlas: las que este manual
solo **cita**, porque son de DOC-04 o de DOC-05 y condicionan lo que aquí se le
puede prometer al usuario, y las que son **propias**, porque nacieron al escribir
el manual —un manual necesita nombrar cosas que la documentación no nombra—.

### 9.1 Cómo están numeradas

`Q-nnn` es **un contador único de todo el proyecto**, compartido con S-01, A-02 y
A-03. Las preguntas propias de este manual son `Q-20` a `Q-31`.

**La renumeración de 1.0.0 a 1.1.0, la tabla de equivalencia y el aviso a quien
cite versiones anteriores de este manual están en el histórico**, no aquí:
`docs/DOC-06-MANUAL-USUARIO-HIST.md`. Este documento refleja solo el estado
actual y no reproduce esa saga.

**A-04 no dispone en esta ejecución de la herramienta `registry.js` de S-12**, de
modo que no ha podido pedir número libre. Se ha leído `registro-ids.json` como
censo: su máximo `Q-nnn` ocupado sigue siendo `Q-29`. `Q-30` (nacida en 1.2.0,
de la reformulación de REQ-031) **todavía está reclamada sin ancla**, pendiente
de que S-12 la registre —lo confirma `DOC-07` en su hallazgo A-05-09—. Esta
versión añade `Q-31`, sobre lo que ve el usuario cuando la aplicación rechaza el
cambio de albarán a otro cliente. **Las dos, `Q-30` y `Q-31`, quedan en estado
`pending_registry_confirmation`**: si S-12 concede otros números, se renumera
solo la afectada y se conserva el anterior en `previous_id`. La orden está en el
bloque de 9.5.

**Nota de formato, deliberada. No reordenar.** En las tablas de 9.2 los
identificadores ajenos se escriben `DOC-04/Q-nn` y `DOC-05/Q-nn`, con el
documento dueño delante, y en el bloque de 9.5 las entradas de `cites` llevan
`owner` como primera clave. No es estilo: el extractor de S-12 abre una entrada
nueva por cada fila de tabla cuyo primer campo sea un `Q-nnn` a secas y por cada
línea que empiece por `- id: Q-nnn`, y **una cita no debe abrir entrada**. Si
alguien quita el prefijo o «ordena» las claves, las citas vuelven a contarse como
reclamaciones y la colisión de 1.0.0 reaparece.

### 9.2 Las preguntas que este manual cita — 18

No son de A-04 y aquí no se renumeran nunca. Afectan a lo que el manual puede
prometer al usuario: mientras no se respondan, o mientras lo respondido no se
construya, el manual describe lo que la aplicación hace hoy, no lo que debería
hacer.

**Dieciséis son de DOC-04.** Una, `DOC-04/Q-10`, **ya está respondida e
implementada** —el cambio está en la aplicación desde SPEC 06— y por eso la tarea
A.13 sí cambia por ella. Cinco más *(respondida)* tienen respuesta del negocio
del 2026-08-16 pero todavía **no están construidas**, así que ninguna tarea
cambia por ellas y su reflejo está solo en el apartado 6.2. `DOC-04/Q-16` es
nueva en esta versión: nace de la misma decisión de Q-10, pero por la otra
puerta.

| ID | Pregunta | Qué le impide decir al manual |
|---|---|---|
| `DOC-04/Q-01` | La pieza guarda un coste además del precio, pero el coste no interviene en ningún cálculo. ¿Margen previsto o dato informativo? | El manual tiene que decirle al usuario que rellena un dato que no sirve para nada (tarea B.1, apartado 6.1). |
| `DOC-04/Q-02` *(respondida)* | El stock se descuenta sin comprobar existencias y puede quedar negativo. | El manual describe el stock negativo como comportamiento normal, porque hoy lo es. La decisión de bloquearlo está en 6.2, no en las tareas A.10 y B.2. |
| `DOC-04/Q-03` | La unidad de medida de la pieza no se usa en ningún cálculo ni validación. ¿Qué uso se le quiere dar? | No se le puede explicar al usuario qué escribir en ese campo ni con qué criterio. |
| `DOC-04/Q-04` | La sección *Configuración* no está desarrollada y ninguna especificación describe su contenido. | El apartado 6.1 solo puede decir que no hace nada; no se puede anticipar qué contendrá. |
| `DOC-04/Q-05` | El empleado guarda un salario base que la nómina no usa: el bruto se teclea a mano cada mes. ¿Debería proponerlo? | La tarea C.5 tiene que advertir de que hay que teclear el bruto aunque exista el salario base. |
| `DOC-04/Q-06` *(respondida)* | Una factura no se puede modificar ni anular y sus albaranes quedan bloqueados. | **Es la que más impacto tiene para el usuario.** Ya se sabe hacia dónde va —factura rectificativa—, pero hoy el manual solo puede avisar antes de emitir y decir que después no hay salida. Sigue sin constar qué hace el taller mientras tanto con una factura mal emitida. |
| `DOC-04/Q-07` | Los albaranes no tienen situación intermedia entre pendiente y facturado. ¿El taller trabaja así? | No se puede explicar cómo marcar un trabajo «en curso» o «acabado pero sin facturar». |
| `DOC-04/Q-08` | El idioma y el tema por defecto vienen de una especificación, no del comportamiento observado. ¿Coincide lo que hace la aplicación con lo descrito? | El apartado 2 y las tareas D.1 y D.2 describen un comportamiento no verificado. |
| `DOC-04/Q-09` | Ninguna regla acota qué tipos de IVA son admisibles al emitir una factura. | La tarea A.16 no puede decirle al usuario qué tipos puede poner ni cuáles rechazará la aplicación. |
| `DOC-04/Q-10` *(respondida e implementada)* | Se podía cambiar el vehículo de un albarán no facturado a uno de otro cliente, cambiando a quién se le factura. | **Ya no bloquea nada.** El negocio decidió impedirlo y está en la aplicación (`REQ-080`, `REQ-081`). La tarea A.13 pasa de avisar de un riesgo a describir que la aplicación lo impide: selector filtrado y rechazo entero al guardar. |
| `DOC-04/Q-16` | `BR-ALB-10` cierra el cambio de cliente por la cabecera del albarán, pero cambiar el cliente propietario de un vehículo con albaranes pendientes sigue arrastrando ese trabajo al cliente nuevo. ¿Debe impedirse, avisarse o permitirse? | La tarea A.7 tiene que avisar de que cambiar el propietario de un vehículo se lleva sus albaranes pendientes, sin poder decir si eso es lo querido. El apartado 6.1 lo lista como límite actual. |
| `DOC-04/Q-11` | Una nómina pagada se puede modificar y borrar sin restricción. ¿Debe bloquearse? | La tarea C.8 avisa del riesgo, pero no puede decir si el taller debe hacerlo o no. DOC-04 avisa de que la respuesta a Q-15 **no** contesta a esta. |
| `DOC-04/Q-12` *(respondida)* | Ninguna regla acota a valores no negativos los precios, el coste, el stock ni el precio por hora. | Las tareas A.10, A.11, B.1 y B.3 siguen sin poder decir qué importes rechaza la aplicación, porque hoy no rechaza ninguno. Lo decidido está en 6.2. |
| `DOC-04/Q-13` | «Estado» designa a la vez la situación del albarán y la de cobro de facturas y nóminas. ¿Con qué nombres deben aparecer en la interfaz y en los filtros? | El manual ha tenido que inventarse la distinción («situación del albarán» / «estado de pago») porque la pantalla usa la misma palabra para las dos cosas. Si la interfaz se aclara, cambian el glosario y las tareas A.14, A.18 y C.7. |
| `DOC-04/Q-14` *(respondida)* | No hay recuento ni filtro de facturas pendientes de cobro. | **Se cita desde esta versión.** Las tareas A.17 y A.18 tienen que decirle al usuario que mire factura por factura, y 6.2 anuncia el recuento y el filtro decididos. |
| `DOC-04/Q-15` *(respondida)* | Lo mismo en nóminas: no hay recuento ni filtro de pendientes de pago. | **Se cita desde esta versión.** Igual que la anterior, en las tareas C.6 y C.7 y en 6.2. |

**Dos son de DOC-05.** No las levantó este manual y no cambian ninguna tarea,
pero acotan lo que aquí se le puede prometer al usuario sobre dos cosas que él sí
ve: el número del documento y el céntimo del total.

| ID | Pregunta | Qué le impide decir al manual |
|---|---|---|
| `DOC-05/Q-16` | ¿Qué pasa con la numeración de albarán y de factura al cambiar de año? DOC-04 dice «correlativo anual» pero no describe el reinicio | Las tareas A.9 y A.16 dicen que el número lo pone la aplicación con el formato `año/A-nnnn` y `año/F-nnnn`, pero no pueden decirle al usuario si en enero se vuelve a empezar por el 0001 o si la cuenta sigue. |
| `DOC-05/Q-17` | ¿Cómo se redondea cuando el tercer decimal es exactamente 5? DOC-04 exige dos decimales pero no dice cómo se rompe el empate | Las tareas A.16 y A.17 prometen importes redondeados a dos decimales. Si el usuario compara con su propia cuenta a mano, un céntimo de diferencia hoy no tiene explicación en el manual. |

**Dos preguntas ajenas no se citan, y es decisión, no olvido.** `DOC-05/Q-18` y
`DOC-05/Q-19` son de método de prueba y no llegan al usuario.

**Qué ha cambiado aquí respecto a 1.3.0.** `DOC-04/Q-10` pasa de *(respondida)* a
*(respondida e implementada)*: su decisión ya está en la aplicación y la tarea
A.13 se ha rehecho para contarlo. Aparece la nueva `DOC-04/Q-16`, la fuga por la
puerta del vehículo, citada desde la tarea A.7. Las citas suben de 17 a 18 (16
de DOC-04, 2 de DOC-05); las no citadas de DOC-05 siguen en 2.

### 9.3 Las preguntas propias de este manual — 12

Nacen de cosas que un manual necesita nombrar y que ni DOC-01 ni DOC-04 recogen.
Ocho de ellas —`Q-24` a `Q-31`— afectan directamente a **S-10**, que necesita
nombres reales de pantalla, campo y botón para construir los Page Objects: donde
falta el nombre, S-10 no puede más que dejar el hueco pendiente.

| ID | Pregunta | Bloquea |
|---|---|---|
| Q-24 | **No están documentados los nombres de los botones de guardar, cancelar y confirmar.** DOC-01 y DOC-04 solo nombran los botones de creación (*Nuevo cliente*, *Nuevo vehículo*, *Nueva pieza*, *Nuevo albarán*, *Nueva factura*, *Nuevo empleado*, *Nueva nómina*) y las secciones del menú. Los pasos de este manual dicen «guarda» y «confirma» sin nombre exacto. ¿Cuáles son las etiquetas reales, y son las mismas en todas las pantallas? | Todas las tareas con formulario. S-10: botón de envío de todos los formularios. |
| Q-25 | **No están documentados los textos de los mensajes de error ni dónde aparecen.** DOC-04 enuncia las reglas (nombre obligatorio, matrícula única, cantidad mayor que cero…), pero no qué le dice la aplicación al usuario ni si el aviso sale junto al campo o en la cabecera del formulario. El apartado «Si algo va mal» de cada tarea describe la causa y la solución, no el texto literal. | Todos los apartados «Si algo va mal». S-10: comprobación de mensajes de error. |
| Q-26 | **No está documentado cómo se editan y se borran las fichas.** DOC-04 dice que se puede modificar y dar de baja, pero no si se hace con un botón en el listado, en la ficha o en un menú, ni cómo se llama. Tampoco cómo es la confirmación de borrado. | Las 11 tareas de modificación y baja. S-10: acciones de fila y diálogo de confirmación. |
| Q-27 | **No está documentada la pantalla de emisión de factura.** No consta cómo se elige el cliente, cómo se seleccionan los albaranes pendientes, cómo se llama el campo del tipo de IVA ni el botón que emite. Es la operación irreversible de la aplicación y es la peor descrita. | Tarea A.16. S-10: el flujo crítico de facturación. |
| Q-28 | **No está documentado dónde está el conmutador de pago** de facturas y nóminas: si en el listado, en el detalle o en ambos, ni cómo se llama. | Tareas A.18 y C.7. S-10: cambio de estado de pago. |
| Q-29 | **No está documentada la lista completa de datos de cliente y de empleado.** De cliente solo consta que el nombre es obligatorio; de empleado, el nombre, el cargo y el contacto. ¿Hay teléfono, dirección, NIF, correo? El manual no puede enumerar lo que se rellena. | Tareas A.1, A.3, C.1, C.3. S-10: campos de los formularios de cliente y empleado. |
| Q-30 | REQ-031 dice que una anotación que no sea de pieza ni de mano de obra no llega a registrarse y que el albarán conserva sus líneas y sus importes, pero **no consta qué ve el usuario cuando eso pasa**: si la aplicación muestra un aviso, si la pantalla sencillamente no ofrece más tipos que esos dos —en cuyo caso la situación nunca se le presenta a quien usa la aplicación— o si puede llegar por otro camino. El manual ha tenido que describir la consecuencia sin poder describir la escena. | Tareas A.10 y A.11, y su apartado «Si algo va mal». S-10: si no hay forma de intentarlo desde la pantalla, no hay prueba negativa que construir aquí. |
| Q-31 | **Nueva.** `REQ-081` filtra el selector de vehículo al cliente actual del albarán y `REQ-080` rechaza entero el intento de cambio a otro cliente, pero **no consta qué ve el usuario cuando el rechazo ocurre** ni si puede llegar a provocarlo desde la pantalla: si con el selector filtrado la situación es inalcanzable por interfaz, si hay un mensaje de error y qué dice, y si al rechazarse la edición la pantalla se lo indica o simplemente no guarda. El manual describe el rechazo y sus consecuencias sin poder describir la escena. | Tarea A.13, «El albarán no se puede pasar a otro cliente» y «Si algo va mal». S-10: nombre del selector de vehículo del formulario de cabecera de albarán y, si el rechazo no es alcanzable por interfaz, no hay prueba negativa que construir en pantalla (queda para la capa de servicio, como REQ-080 en DOC-05). |
| Q-20 | **No está documentado si los listados de piezas, albaranes, facturas, personal y nóminas tienen búsqueda, ordenación y paginación.** DOC-04 solo se lo atribuye a los de clientes (REQ-001) y vehículos (REQ-009), y al de albaranes le atribuye filtros (REQ-025). ¿Los demás no las tienen, o simplemente no se documentaron? | Tareas A.14, A.17, B.2, C.2, C.6. |
| Q-21 | **No consta si se puede imprimir o exportar un albarán o una factura.** Es la primera pregunta que hará quien tenga que entregarle algo en papel al cliente. Ningún requisito lo menciona: no se sabe si no existe o si no se documentó. | Tareas A.16 y A.17, apartado 6.1. |
| Q-22 | **No consta ningún procedimiento de copia de seguridad.** Los datos viven en un solo ordenador y no hay requisito que hable de respaldarlos. Un manual honesto debería decirle al taller cómo proteger su facturación, y hoy no puede. | Apartado 2 y apartado 6.1. |
| Q-23 | **No consta cómo se arranca la aplicación** ni qué ve el usuario al abrirla (pantalla de inicio, resumen, listado por defecto). El apartado «Antes de empezar» solo puede decir que no hay contraseña. | Apartado 2. S-10: punto de entrada de la automatización. |

**Ninguna de las preguntas propias anteriores se cierra con DOC-04 1.3.0.** Todas
preguntan por nombres de pantalla, de campo, de botón y de mensaje, y DOC-04
1.3.0 añade dos requisitos de comportamiento pero no nombra ninguna etiqueta de
interfaz. `Q-31` nace por lo mismo: DOC-04 dice qué hace la aplicación al
rechazar el cambio de cliente, no qué texto muestra ni si el usuario puede
provocarlo.

### 9.4 Dos de estas preguntas ya han salido del manual

Vale la pena que quien lea esto lo sepa, porque cambia lo que se puede esperar de
este apartado. **A-15 ha convertido `Q-21` y `Q-22` en propuestas de producto**:
`FUN-001`, entregarle al cliente la factura en papel o en un archivo, y
`FUN-002`, poder guardar una copia de los datos del taller y recuperarla. Es la
primera vez que una pregunta nacida aquí alimenta directamente el catálogo de
producto.

No es casualidad, y explica para qué sirve este apartado además de para pedir
información: **las dos nacieron de no poder explicarle al usuario algo que no
existe**. Un manual que se escribe con honestidad choca contra los huecos del
producto antes que nadie, porque tiene que contarle a una persona real cómo
termina su trabajo, y el trabajo del taller termina entregando un papel y
durmiendo tranquilo con sus datos. Ninguna de las dos preguntas se cierra por
haberse convertido en propuesta: siguen abiertas aquí hasta que el producto las
responda.

### 9.5 Bloque estructurado

Las preguntas de este manual, y las ajenas que cita, en la forma que S-12 puede
leer. La prosa de 9.1 a 9.4 es para personas; **la fuente para cualquier máquina
es este bloque**.

```yaml open_questions
version: 1
owner: A-04
document: DOC-06-MANUAL-USUARIO
document_version: 1.4.0
generated_at: 2026-08-28
numbering:
  source: S-12
  registry: registro-ids.json
  registry_state_read: "2026-08-28 · registro-ids.json leido como censo. Q-01 a Q-16 de DOC-04-FUNCIONAL (Q-16 nueva en DOC-04 1.3.0), Q-16 a Q-19 de DOC-05-PLAN-PRUEBAS (colision de numero entre documentos distintos, no de identidad: cada Q-nn lleva su documento delante), Q-20 a Q-29 de este documento con ancla. Maximo Q-nnn con ancla en el registro: Q-29"
  tool_available: false
  tool_note: "A-04 no dispone en esta ejecucion de la herramienta registry.js de S-12; no ha podido ejecutar `next`. Se numera Q-31 a partir del censo (Q-30 ya reclamada sin ancla, Q-29 ultimo con ancla)."
  kept: [Q-20, Q-21, Q-22, Q-23, Q-24, Q-25, Q-26, Q-27, Q-28, Q-29]
  kept_note: "Ninguna se mueve en esta regeneracion. Q-21 y Q-22 estan citadas fuera por A-15 y moverlas romperia DOC-25"
  requested: [Q-30, Q-31]
  requested_status: pending_registry_confirmation
  requested_command: "registry.js sync registro-ids.json --doc docs/DOC-06-MANUAL-USUARIO.md --block questions"
  requested_note: "Q-30 se reclamo en 1.2.0 y sigue sin ancla (DOC-07, hallazgo A-05-09). Q-31 es nueva en 1.4.0. Si S-12 concede otros numeros al sincronizar, renumerar solo la afectada y conservar el anterior en previous_id."
questions:
  - id: Q-20
    owner: A-04
    question: "¿Los listados de piezas, albaranes, facturas, personal y nóminas tienen búsqueda, ordenación por columna y paginación? DOC-04 solo se lo atribuye a los de clientes y vehículos, así que no se sabe si los demás no las tienen o si solo no se documentaron."
    status: open
    created: 2026-08-15
    blocks: "§4/A.14, §4/A.17, §4/B.2, §4/C.2 y §4/C.6 — no se puede decir como se busca en esos listados"
    affects_tasks: [A.14, A.17, B.2, C.2, C.6]
    affects_requirements: [REQ-018, REQ-025, REQ-052, REQ-056, REQ-063]
    previous_id: Q-20
    also_raised_in: "DOC-25 apartado 6, como comprobacion pedida a A-03 antes de proponer producto"
  - id: Q-21
    owner: A-04
    question: "¿Se puede imprimir o exportar un albarán o una factura para entregársela al cliente? Ningún requisito lo menciona, de modo que no se sabe si no existe o si no se documentó."
    status: open
    created: 2026-08-15
    blocks: "§4/A.16 y §4/A.17 — el manual no puede explicar como se le entrega la factura al cliente"
    affects_tasks: [A.16, A.17]
    affects_requirements: [REQ-052, REQ-053]
    previous_id: Q-21
    used_as_evidence_by: "A-15 · FUN-001 en DOC-25-PROPUESTAS-FUNCIONALES"
  - id: Q-22
    owner: A-04
    question: "¿Existe algún procedimiento de copia de seguridad de los datos del taller? Viven en un solo ordenador y ningún requisito habla de respaldarlos."
    status: open
    created: 2026-08-15
    blocks: "§2 y §6.1 — el manual no puede decirle al taller como proteger su facturacion"
    affects_tasks: []
    affects_requirements: []
    affects_requirements_note: "ningun requisito de DOC-04 habla de respaldo de datos, y esa ausencia es justo la pregunta"
    previous_id: Q-22
    used_as_evidence_by: "A-15 · FUN-002 en DOC-25-PROPUESTAS-FUNCIONALES"
  - id: Q-23
    owner: A-04
    question: "¿Cómo se arranca la aplicación y qué ve el usuario al abrirla, pantalla de inicio, resumen o listado por defecto? El apartado 2 solo puede decir que no hay contraseña."
    status: open
    created: 2026-08-15
    blocks: "§2 — el manual no puede describir el primer minuto de uso"
    affects_tasks: []
    affects_requirements: []
    blocks_automation: "S-10 · punto de entrada de la automatizacion"
    previous_id: Q-23
  - id: Q-24
    owner: A-04
    question: "¿Cuáles son las etiquetas reales de los botones de guardar, cancelar y confirmar, y son las mismas en todas las pantallas? DOC-01 y DOC-04 solo nombran los botones de creación y las secciones del menú."
    status: open
    created: 2026-08-15
    blocks: "todas las tareas con formulario o confirmacion — sus pasos dicen guarda y confirma sin nombre exacto"
    affects_tasks: [A.1, A.3, A.4, A.5, A.7, A.8, A.9, A.10, A.11, A.12, A.13, A.15, A.16, B.1, B.3, B.4, C.1, C.3, C.4, C.5, C.8]
    affects_requirements: [REQ-002, REQ-010, REQ-019, REQ-026, REQ-043, REQ-057, REQ-064]
    blocks_automation: "S-10 · boton de envio de todos los formularios"
    previous_id: Q-14
    renumber_note: "Era Q-14 en DOC-06 1.0.0. Ese numero pertenece a A-02 en DOC-04. Renumerada en 1.1.0 y estable desde entonces."
  - id: Q-25
    owner: A-04
    question: "¿Qué texto muestra la aplicación en cada error y dónde aparece, junto al campo o en la cabecera del formulario? DOC-04 enuncia las reglas pero no lo que el usuario acaba leyendo."
    status: open
    created: 2026-08-15
    blocks: "todos los apartados Si algo va mal — describen la causa y la solucion, no el texto literal"
    affects_tasks: [A.1, A.3, A.4, A.5, A.7, A.8, A.10, A.11, A.12, A.13, A.15, A.16, B.1, B.3, B.4, C.1, C.3, C.4, C.5, C.8]
    affects_requirements: [REQ-003, REQ-012, REQ-013, REQ-017, REQ-020, REQ-024, REQ-032, REQ-033, REQ-037, REQ-044, REQ-045, REQ-046, REQ-062, REQ-066, REQ-067, REQ-068]
    blocks_automation: "S-10 · comprobacion de mensajes de error"
    previous_id: Q-15
    renumber_note: "Era Q-15 en DOC-06 1.0.0. Ese numero pertenece a A-02 en DOC-04. Renumerada en 1.1.0 y estable desde entonces."
  - id: Q-26
    owner: A-04
    question: "¿Cómo se edita y cómo se borra una ficha, con un botón en el listado, en la ficha o en un menú, cómo se llama y cómo es la confirmación de borrado? DOC-04 dice que se puede, no cómo."
    status: open
    created: 2026-08-15
    blocks: "las once tareas de modificacion y de baja"
    affects_tasks: [A.3, A.4, A.7, A.8, A.13, A.15, B.3, B.4, C.3, C.4, C.8]
    affects_requirements: [REQ-005, REQ-006, REQ-015, REQ-016, REQ-022, REQ-023, REQ-040, REQ-041, REQ-060, REQ-061, REQ-071, REQ-074]
    blocks_automation: "S-10 · acciones de fila y dialogo de confirmacion"
    previous_id: Q-16
    renumber_note: "Era Q-16 en DOC-06 1.0.0. Ese numero pertenece a A-03 en DOC-05. Renumerada en 1.1.0 y estable desde entonces."
  - id: Q-27
    owner: A-04
    question: "¿Cómo es la pantalla de emisión de factura, cómo se elige el cliente, cómo se seleccionan los albaranes pendientes, cómo se llama el campo del tipo de IVA y cuál es el botón que emite? Es la operación irreversible de la aplicación y es la peor descrita."
    status: open
    created: 2026-08-15
    blocks: "§4/A.16 · Cobrar el trabajo hecho, emitir la factura"
    affects_tasks: [A.16]
    affects_requirements: [REQ-043, REQ-044, REQ-045, REQ-046, REQ-050]
    blocks_automation: "S-10 · el flujo critico de facturacion"
    previous_id: Q-17
    renumber_note: "Era Q-17 en DOC-06 1.0.0. Ese numero pertenece a A-03 en DOC-05. Renumerada en 1.1.0 y estable desde entonces."
  - id: Q-28
    owner: A-04
    question: "¿Dónde está el conmutador de pago de facturas y de nóminas, en el listado, en el detalle o en ambos, y cómo se llama?"
    status: open
    created: 2026-08-15
    blocks: "§4/A.18 y §4/C.7 — el paso dice acciona el conmutador de pago sin decir donde esta"
    affects_tasks: [A.18, C.7]
    affects_requirements: [REQ-054, REQ-072]
    blocks_automation: "S-10 · cambio de estado de pago"
    previous_id: Q-18
    renumber_note: "Era Q-18 en DOC-06 1.0.0. Ese numero pertenece a A-03 en DOC-05. Renumerada en 1.1.0 y estable desde entonces."
  - id: Q-29
    owner: A-04
    question: "¿Cuál es la lista completa de datos de un cliente y de un empleado, hay teléfono, dirección, NIF, correo? De cliente solo consta que el nombre es obligatorio y de empleado el nombre, el cargo y el contacto."
    status: open
    created: 2026-08-15
    blocks: "§4/A.1, §4/A.3, §4/C.1 y §4/C.3 — el paso dice rellena los datos sin poder enumerarlos"
    affects_tasks: [A.1, A.3, C.1, C.3]
    affects_requirements: [REQ-002, REQ-004, REQ-005, REQ-056, REQ-057, REQ-059, REQ-060]
    blocks_automation: "S-10 · campos de los formularios de cliente y de empleado"
    previous_id: Q-19
    renumber_note: "Era Q-19 en DOC-06 1.0.0. Ese numero pertenece a A-03 en DOC-05. Renumerada en 1.1.0 y estable desde entonces."
  - id: Q-30
    owner: A-04
    question: "REQ-031 dice que una anotación que no sea de pieza ni de mano de obra no llega a registrarse y que el albarán conserva sus líneas y sus importes, pero no consta qué ve el usuario cuando eso ocurre: ¿hay un aviso, la pantalla sencillamente no ofrece más tipos que esos dos, o se puede llegar por otro camino?"
    status: open
    created: 2026-08-16
    new_in_version: 1.2.0
    origin: "reformulacion de REQ-031 en DOC-04 1.1.0, incorporada a este manual en 1.2.0"
    blocks: "§4/A.10 y §4/A.11 — el manual describe la consecuencia sin poder describir la escena"
    affects_tasks: [A.10, A.11]
    affects_requirements: [REQ-031]
    blocks_automation: "S-10 · si la pantalla no permite intentarlo, no hay prueba negativa que construir en el formulario de linea"
    registry_status: pending_confirmation
  - id: Q-31
    owner: A-04
    question: "REQ-081 filtra el selector de vehículo del formulario de cabecera de albarán al cliente actual, y REQ-080 rechaza entero el intento de cambio a un vehículo de otro cliente sin guardar ni el vehículo, ni la fecha, ni las notas. No consta qué ve el usuario cuando el rechazo ocurre ni si puede provocarlo desde la pantalla: ¿con el selector filtrado la situación es inalcanzable por interfaz? Si es alcanzable, ¿hay mensaje de error y qué dice? ¿La pantalla indica que no se ha guardado nada o simplemente no guarda?"
    status: open
    created: 2026-08-28
    new_in_version: 1.4.0
    origin: "requisitos nuevos REQ-080 y REQ-081 de DOC-04 1.3.0 (ancla BR-ALB-10 / UC-ALB-06), entregados por SPEC 06 e incorporados a este manual en 1.4.0"
    blocks: "§4/A.13 — «El albarán no se puede pasar a otro cliente» y «Si algo va mal»: el manual describe el rechazo y sus consecuencias sin poder describir la escena"
    affects_tasks: [A.13]
    affects_requirements: [REQ-080, REQ-081]
    blocks_automation: "S-10 · nombre real del selector de vehículo del formulario de cabecera de albarán; si el rechazo no es alcanzable por interfaz, la prueba negativa de REQ-080 queda para la capa de servicio, como ya ocurre con otros casos de DOC-05"
    registry_status: pending_confirmation
cites:
  # Preguntas de OTRO documento que este manual solo menciona. `owner` va primero
  # a proposito: el extractor de S-12 abre una entrada nueva en cada linea que
  # empieza por `- id: Q-nnn`, y una cita no reclama el numero. No reordenar.
  - owner: A-02
    id: Q-01
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-01
    affects_manual: "§4/B.1 y §6.1 — el manual tiene que decirle al usuario que rellena un dato que no sirve para nada"
  - owner: A-02
    id: Q-02
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    resolution_at_read: gap_confirmed
    cited_as_in_1_0_0: DOC-06/Q-02
    affects_manual: "§4/A.10, §4/B.2, §5 y §6.2 — el manual describe el stock negativo como comportamiento normal porque hoy lo es; la decision de bloquearlo esta en 6.2"
  - owner: A-02
    id: Q-03
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-03
    affects_manual: "§4/B.1 y §7 — no se le puede explicar al usuario con que criterio rellenar la unidad"
  - owner: A-02
    id: Q-04
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-04
    affects_manual: "§3 y §6.1 — solo se puede decir que Configuracion no hace nada, no que contendra"
  - owner: A-02
    id: Q-05
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-05
    affects_manual: "§4/C.5 y §6.1 — hay que avisar de que el bruto se teclea a mano aunque exista el salario base"
  - owner: A-02
    id: Q-06
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    resolution_at_read: gap_confirmed
    cited_as_in_1_0_0: DOC-06/Q-06
    affects_manual: "§4/A.16, §5, §6.1 y §6.2 — es la de mas impacto para el usuario; hoy el manual solo puede avisar antes de emitir y decir que despues no hay salida"
  - owner: A-02
    id: Q-07
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-07
    affects_manual: "§4/A.14 y §6.1 — no se puede explicar como marcar un trabajo en curso o acabado sin facturar"
  - owner: A-02
    id: Q-08
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-08
    affects_manual: "§2, §4/D.1 y §4/D.2 — describen un comportamiento que no se ha verificado contra la aplicacion"
  - owner: A-02
    id: Q-09
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-09
    affects_manual: "§4/A.16 y §5 — no se puede decir que tipos de IVA admite ni cuales rechaza"
  - owner: A-02
    id: Q-10
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    resolution_at_read: gap_confirmed_and_implemented
    implemented_by: "SPEC 06 · realizada en BR-ALB-10, REQ-080, REQ-081"
    cited_as_in_1_0_0: DOC-06/Q-10
    affects_manual: "§4/A.13 y §6.2 — la tarea A.13 pasa de avisar de un riesgo a describir que la aplicacion impide mover el albaran a otro cliente; ya no es un hueco"
  - owner: A-02
    id: Q-11
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-11
    affects_manual: "§4/C.8 y §6.1 — el manual avisa de que una nomina pagada no queda protegida, sin poder decir si debe estarlo"
    note: "DOC-04 declara que la respuesta a Q-15 no contesta a esta"
  - owner: A-02
    id: Q-12
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    resolution_at_read: gap_confirmed
    cited_as_in_1_0_0: DOC-06/Q-12
    affects_manual: "§4/A.10, §4/A.11, §4/B.1, §4/B.3, §6.1 y §6.2 — hoy la aplicacion no rechaza ningun importe"
  - owner: A-02
    id: Q-13
    document: DOC-04-FUNCIONAL
    status_at_read: open
    cited_as_in_1_0_0: DOC-06/Q-13
    affects_manual: "§4/A.14, §4/A.18, §4/C.7 y §7 — el manual ha tenido que inventarse la distincion entre situacion del albaran y estado de pago porque la pantalla usa la misma palabra para las dos cosas"
  - owner: A-02
    id: Q-14
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    resolution_at_read: gap_confirmed
    newly_cited_in: 1.2.0
    previously: not_cited
    affects_manual: "§4/A.17, §4/A.18, §5 y §6.2 — hoy hay que mirar factura por factura; el recuento y el filtro estan decididos y no construidos"
  - owner: A-02
    id: Q-15
    document: DOC-04-FUNCIONAL
    status_at_read: answered
    resolution_at_read: gap_confirmed
    newly_cited_in: 1.2.0
    previously: not_cited
    affects_manual: "§4/C.6, §4/C.7, §5 y §6.2 — lo mismo en nominas"
  - owner: A-02
    id: Q-16
    document: DOC-04-FUNCIONAL
    status_at_read: open
    newly_cited_in: 1.4.0
    previously: did_not_exist
    affects_manual: "§4/A.7 y §6.1 — cambiar el cliente propietario de un vehiculo con albaranes pendientes arrastra ese trabajo al cliente nuevo; la tarea A.7 avisa, sin poder decir si es lo querido"
    note: "DOC-04/Q-16, la fuga por la puerta del vehiculo. Continuacion de DOC-04/Q-10, ya implementada. NO confundir con DOC-05/Q-16 (numeracion anual), que este manual tambien cita mas abajo, ni con la Q-16 que este documento uso en 1.0.0, hoy Q-26."
  - owner: A-03
    id: Q-16
    document: DOC-05-PLAN-PRUEBAS
    status_at_read: open
    affects_manual: "§4/A.9 y §4/A.16 — no se puede decir si la numeracion vuelve a empezar en enero"
    note: "DOC-05/Q-16. No confundir con DOC-04/Q-16 (arriba) ni con la Q-16 que este documento uso en 1.0.0, hoy Q-26."
  - owner: A-03
    id: Q-17
    document: DOC-05-PLAN-PRUEBAS
    status_at_read: open
    affects_manual: "§4/A.16 y §4/A.17 — no se puede explicar un centimo de diferencia al redondear"
    note: "No confundir con la Q-17 que este documento uso en 1.0.0, hoy Q-27."
not_cited:
  # Preguntas ajenas que este manual NO cita. Se declaran para que el censo
  # cuadre y la ausencia sea decision, no olvido.
  - owner: A-03
    id: Q-18
    document: DOC-05-PLAN-PRUEBAS
    why: "Vias de entrada distintas de la interfaz. Es materia de prueba y no llega al usuario."
  - owner: A-03
    id: Q-19
    document: DOC-05-PLAN-PRUEBAS
    why: "Cobertura de los defectos confirmados por A-14. Es materia de metodo de prueba, ya respondida en DOC-05 1.3.0."
summary:
  own: 12
  own_open: 12
  own_answered: 0
  own_closed_this_revision: 0
  new_in_this_revision: [Q-31]
  kept: [Q-20, Q-21, Q-22, Q-23, Q-24, Q-25, Q-26, Q-27, Q-28, Q-29, Q-30]
  renumbered_this_revision: []
  pending_registry_confirmation: [Q-30, Q-31]
  cited: 18
  cited_new_this_revision: ["DOC-04/Q-16"]
  cited_status_changed_this_revision:
    - id: "DOC-04/Q-10"
      change: "answered → answered+implemented; deja de ser hueco y A.13 se rehace"
  not_cited: 2
  doc04_census: 16
  doc05_census: 4
  used_as_evidence_by_a15: [Q-21, Q-22]
```

---

**Nota de vigencia.** Este manual está derivado de `DOC-04-FUNCIONAL.md`
**1.3.0** y de `DOC-01-BASE-ASIS.md` **1.2.0**, que son sus dos únicas fuentes de
contenido. Las dos subieron de versión MINOR con un cambio de negocio real —el
mismo, entregado por SPEC 06—: un albarán no facturado ya no se puede mover al
vehículo de otro cliente (`BR-ALB-10`, `REQ-080`, `REQ-081`). Esta regeneración
rehace la tarea A.13 para contarlo y ajusta los apartados 2, 5, 6 y 7. Del ciclo
anterior siguen vivos dos comportamientos sin requisito propio en DOC-04 —la
protección de doble envío al guardar y el formato de importes y fechas—, ya
descritos en el apartado 2.

**Cuándo vuelve a quedar obsoleto.** Si DOC-01 o DOC-04 suben de versión MINOR o
MAJOR, hay que rehacerlo entero: la versión anterior no es fuente de nada. Si para
entonces ya está publicado en Confluence, I-02 lo marcará `OUTDATED` hasta que se
vuelva a publicar.

**Lo que va a obligar a rehacerlo, y ya se sabe.** Las cinco decisiones del
2026-08-16 que siguen pendientes se convertirán en requisitos nuevos cuando A-06
escriba DOC-08, y esos requisitos entrarán en DOC-04. Ese día dejan de ser
exactas diez tareas —**A.10, A.11, A.16, A.17, A.18, B.1, B.2, B.3, C.6 y
C.7**— y cuatro puntos del apartado 6.1. El apartado 6.2 está escrito para que
ese día se vea de un vistazo qué hay que tocar. La sexta decisión ya está hecha
(tarea A.13); lo que queda abierto de ese asunto es `DOC-04/Q-16`, la puerta del
vehículo, que afecta a la tarea A.7.
