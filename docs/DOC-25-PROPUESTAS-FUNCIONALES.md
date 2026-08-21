---
doc_id: DOC-25
doc_name: DOC-25-PROPUESTAS-FUNCIONALES
version: 1.1.1
status: draft
generator: A-15 propuestas de funcionalidad
generator_version: "1.1"
generated_at: 2026-08-17T12:40:00+02:00
language: es
history_document: docs/DOC-25-PROPUESTAS-FUNCIONALES-HIST.md
history_note: >-
  este documento no lleva historial de cambios. Refleja solo el estado actual, con su version
  en este front-matter. Que cambio en cada version, y por que, esta en el fichero -HIST.md
source:
  repo_path: C:\Claude\appdani
  vcs: git
  branch: master
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  working_tree_clean: false   # sin versionar: docs/, automation/ y registro-ids.json, generados por este ciclo
inputs:
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    version: 1.1.0
    hash: sha256:1041cebf287ac1059e63e857c95107dadceaf429f2cd8ec527ac2b4183dc29f5
    present: true
    usage: >-
      documento anterior. Manda sobre esta ronda: las ocho propuestas FUN-001 a FUN-008 se
      conservan con su numero y su texto, y solo se toca lo que la nueva evidencia obliga a tocar
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    version: 1.0.0
    hash: sha256:4e49485c3ad1529b2eee9d56487e188617011d772fe5908740cbed4114f01097
    present: true
    changed_since_previous_run: false
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.2.0
    hash: sha256:7d1844156487a62b8936a0d2164ebec043eb7fdb7043d27afdd649316f9b63a0
    present: true
    changed_since_previous_run: false
    usage: requisitos REQ-001 a REQ-079, nueve preguntas abiertas y seis respondidas el 2026-08-16
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    version: 1.2.0
    hash: sha256:150240af136497762614c0113c31241d1891dffa62ce5f51c2a5b06cf6b58041
    present: true
    changed_since_previous_run: false
    note: >-
      fuente principal de este documento. Sigue en 1.2.0 con el mismo hash que se releyo entero
      en DOC-25 1.1.0: ninguna de las catorce carencias del apartado 6.1 se ha movido
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
    changed_since_previous_run: false
    note: sigue con BUG-001 a BUG-004; el candidato BUG-005 todavia no esta censado
  - id: DOC-16-ROADMAP.md
    from: A-12
    version: 2.0.0
    hash: sha256:17ab7298e9eb2db441d6d5d5b4b0b8e5b515fe0ddd00fbbc84a004d2bb43991a
    present: true
    changed_since_previous_run: true
    previous_version_declared: 1.0.0
    scope: solo el apartado 6, que contiene los dos hallazgos dirigidos a A-15
    change_note: >-
      motivo de esta ronda. A-12 subio a MAJOR porque el propietario decidio el 2026-08-17:
      MEJ-001, MEJ-003 y MEJ-005 pasan a accepted; MEJ-002, MEJ-004 y MEJ-006 siguen proposed;
      ninguna rechazada. Releidos el apartado 6 entero y las fichas de las tres aceptadas para
      comprobar si alguna cierra una carencia funcional. Ninguna la cierra
    usage: >-
      se lee unicamente por sus hallazgos §6.1, §6.2 y §6.3, y por el estado de las mejoras que
      atienden hallazgos que A-15 dirigio a A-12. El resto del roadmap no es materia de A-15
  - id: registro-ids.json
    from: S-12
    present: true
    hash: sha256:2bf7ab77d6ad3fa562193a8130339e55f6fe4f2ccd1159a600817b3b6b3e3391
    read_at: 2026-08-17
    scope: "FUN-001 a FUN-008 censados y en proposed, dueño A-15. next --prefix FUN devuelve FUN-009, no reclamado en esta ronda"
  - id: contexto-confluence
    from: I-02
    present: false
not_read_by_contract:
  - id: DOC-02-TECNICA.md
    from: S-01
    reason: >-
      prohibido para A-15. Las propuestas nacen de lo que el sistema hace para quien lo usa, no
      de como esta construido. En 1.1.0 figuraba en `inputs` con `used: false` y sin version, y
      S-16 avisaba de que no podia compararlo. No es una entrada sin version: es una entrada que
      no existe, porque este documento no lo consume. Sale de `inputs` y queda aqui declarado
obsolescence_response:
  raised_by: S-16
  round: 1.1.1
  findings:
    - finding: "DOC-25 1.1.0 declaraba DOC-16 en 1.0.0 cuando el roadmap iba por 2.0.0"
      resolved: true
      how: >-
        relectura del apartado 6 de DOC-16 2.0.0 y de las fichas de MEJ-001, MEJ-003 y MEJ-005.
        Verificado que §6.1, §6.2 y §6.3 siguen tratando de lo mismo tras el MAJOR: ninguna cita
        de A-15 apuntaba a otra cosa. Version y hash reales declarados
    - finding: "DOC-25-HIST no declaraba `version` en su front-matter"
      resolved: true
      how: "convencion nueva de A-05 adoptada: el -HIST declara la version del documento que acompaña"
    - finding: "DOC-25 declaraba DOC-02 en `inputs` sin version"
      resolved: true
      how: "la entrada sale de `inputs`: A-15 no lee DOC-02, asi que no es una entrada suya. Ver `not_read_by_contract`"
---

# DOC-25 · Propuestas de funcionalidad — app-taller

> Qué le falta a esta aplicación para servir mejor al taller que la usa. Está
> escrito en lenguaje de negocio y **lo decide negocio, no este documento**: aquí
> solo se propone, se justifica y se ordena.
>
> **No contiene refactorizaciones, deuda técnica ni cobertura de pruebas.** Lo
> que se ha detectado de eso está en el apartado 6, dirigido a `A-12`, `A-03` y
> `A-14`.
>
> **Este documento no lleva historial.** Lo que cambió en cada versión está en
> `DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`.

## 1. Qué ha cambiado desde la ronda anterior

**Esta ronda no hay propuestas nuevas, y tampoco cambia ninguna de las ocho.**
Ni de estado, ni de evidencia, ni de tamaño, ni de confianza. Lo que cambia es
la procedencia y una cita literal. Es la segunda ronda seguida sin propuesta
nueva, y eso no es una ronda perezosa: es lo que hay que escribir cuando es
verdad.

La ha disparado otra vez `S-16 · Cascada de obsolescencia`: este documento
declaraba `DOC-16-ROADMAP` en **1.0.0** y `A-12 · Mejoras/Roadmap` lo ha llevado
a **2.0.0**.

### 1.1 Qué ha pasado en DOC-16, y qué significa para este documento

El 2026-08-17 el propietario del proyecto decidió sobre las seis mejoras
técnicas: **MEJ-001, MEJ-003 y MEJ-005 pasan a `accepted`**; MEJ-002, MEJ-004 y
MEJ-006 siguen `proposed`; **ninguna rechazada**. Ese salto a MAJOR es de A-12 y
lo que decide es trabajo técnico, no producto.

**Lo que hay que decir con todas las letras: que se hayan aceptado tres mejoras
técnicas no resuelve ni una sola carencia funcional de este documento.** Las tres
aceptadas son, en el lenguaje de quien usa la aplicación, invisibles:

| Mejora aceptada | Qué le cambia al taller | ¿Cierra alguna `FUN-nnn`? |
|---|---|---|
| **MEJ-001** · identificadores de prueba en la interfaz | Nada. Su propia ficha dice que «no cambia ni una pantalla, ni un flujo, ni un texto» | No |
| **MEJ-003** · pruebas automáticas del servidor y CI | Nada visible. Cambia lo que el equipo sabe, no lo que el taller puede hacer | No |
| **MEJ-005** · estado de base reproducible entre escenarios | Nada. Es un mecanismo del entorno de pruebas, no una copia de seguridad que el taller pueda usar | **No, y conviene no confundirlo con `FUN-002`** |

La tercera fila merece el aviso porque es la confusión fácil: MEJ-005 sirve para
dejar los datos en un estado conocido antes de cada prueba, y `FUN-002` sirve
para guardar y recuperar el trabajo real del taller. **No son lo mismo.** La
primera repone datos inventados para que el equipo pueda fiarse de sus pruebas;
la segunda protege la facturación de un taller que hoy la tiene en un solo
ordenador. Nadie desde el mostrador puede pedir la primera, y la segunda sigue
sin existir. **`FUN-002` sigue siendo la primera recomendación de este documento,
exactamente igual que ayer.**

### 1.2 Las citas a DOC-16: verificadas una a una, ninguna rota

Era el riesgo real de un MAJOR y por eso se ha comprobado antes que nada. Este
documento cita tres apartados de DOC-16 y **los tres siguen tratando de lo mismo
en 2.0.0**:

| Cita | Qué era en 1.0.0 | Qué es en 2.0.0 | Estado |
|---|---|---|---|
| `DOC-16/§6.1` | Hallazgo a A-15: los mensajes de error llegan siempre en catalán | Lo mismo, ahora marcado **`encaminado`** porque A-12 acepta la lectura de A-15 | **Intacta** |
| `DOC-16/§6.2` | Hallazgo a A-14: candidato a `BUG-005` por el mismo hecho | Lo mismo, y ahora con dos piezas apuntándolo | **Intacta** |
| `DOC-16/§6.3` | Hallazgo a A-15: el módulo de *Configuración* | Lo mismo, marcado **`encaminado`** porque ya es `FUN-003` | **Intacta** |

**Se corrige, eso sí, una cita literal.** La ficha de `FUN-003` reproducía las
palabras de A-12 como «un módulo sin desarrollar no es una mejora, es
funcionalidad», que es como estaban redactadas en 1.0.0. En 2.0.0 la frase es
**«un módulo sin desarrollar es funcionalidad, no una mejora»**. Dice lo mismo y
por eso el fondo de `FUN-003` no se mueve, pero una cita entrecomillada tiene que
decir lo que dice la fuente, y ahora lo dice.

### 1.3 Por qué sigue sin nacer ninguna propuesta

Porque no hay evidencia nueva de la clase que produce propuestas. `DOC-06` sigue
en **1.2.0** con el mismo hash, y sus catorce carencias del apartado 6.1 —las que
se repasaron una a una en la ronda anterior— siguen enunciadas igual y siguen
todas con dueño. `DOC-04` sigue en **1.2.0** con los mismos 79 requisitos y las
mismas nueve preguntas abiertas. `DOC-24` sigue en **1.0.0** con cuatro defectos.
**Ninguna fuente de carencias ha cambiado.**

Se ha valorado expresamente la única aceptación que podía rozar este documento,
porque conviene decir por qué no lo roza. **`MEJ-001` va a abrir las pantallas de
facturas y de albaranes** para ponerles identificadores de prueba, y `FUN-001`
—entregar la factura— vive en esas mismas pantallas. La tentación sería decir
«ya que se abren, que salga de ahí la exportación». **No se propone nada por ese
motivo, y no se propondrá:** aprovechar que alguien va a tocar un fichero no es
un problema de negocio, es una conveniencia de calendario, y quien la valore es
`A-07 · Impacto`, no este documento. `FUN-001` se mantiene tal cual, con la misma
confianza `medium` y el mismo tamaño.

Lo único que sí merece apuntarse de ese cruce es una oportunidad barata que ya
estaba pedida: quien ejecute MEJ-001 tendrá delante la pantalla de facturas, que
es exactamente donde `DOC-06/Q-21` pregunta si hoy se puede imprimir o exportar.
Eso **no cambia nada aquí**; queda anotado en el apartado 6, dirigido a `A-03`,
que es de quien era esa comprobación desde la ronda anterior.

### 1.4 Dos correcciones de procedencia

1. **El fichero `-HIST.md` no declaraba su versión.** Convención nueva, propuesta
   por `A-05 · Coherencia y trazabilidad` y adoptada: el `-HIST` declara la
   versión del documento que acompaña. Ya la declara.
2. **`DOC-02-TECNICA` figuraba en `inputs` sin versión.** Sale de `inputs`, y no
   por comodidad: **A-15 tiene prohibido leer DOC-02**, así que declararlo como
   entrada era decir que se consume algo que no se consume. Queda declarado
   aparte, en `not_read_by_contract`, que es lo que de verdad es.

### 1.5 Lo que no ha cambiado

Las **ocho propuestas**, con su número, su texto, su estado `proposed` y sus
señales. La **recomendación** del apartado 2, en el mismo orden. Los `REQ-nnn`
citados, que existen todos y dicen lo mismo. Y el registro de identificadores:
`FUN-001` a `FUN-008` censados y en `proposed`, sin pedir `FUN-009`.

Para el detalle de qué cambió en cada versión y por qué,
**`docs/DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`**.

## 2. Recomendación

Las tres primeras por relación entre lo que aportan y lo que cuestan. No es una
decisión, es un orden de lectura sugerido, y **es el mismo por segunda ronda**:
nada de lo leído este ciclo lo altera. Que se hayan decidido tres mejoras
técnicas no reordena esta tabla, porque ninguna de las tres toca lo que el taller
puede hacer (5.5).

| # | Propuesta | Por qué esta y no otra |
|---|---|---|
| 1 | **FUN-002 · Poder guardar una copia de los datos del taller y recuperarla** | Sigue siendo la única propuesta cuyo coste de no hacerla es **perderlo todo**. Toda la facturación vive en un solo ordenador (`DOC-06/§2`) y ningún requisito habla de respaldarla. El manual lo dice sin rodeos: si algo se borra, «no hay forma de saber quién fue ni de recuperarlo». Ninguna de las otras siete sirve de nada si eso pasa, y es la que menos toca lo que ya funciona. **Y no la cubre `MEJ-005`**, la mejora técnica aceptada el 2026-08-17: eso repone datos de prueba, no el trabajo de una mañana del taller (5.5). |
| 2 | **FUN-001 · Llevarse la factura en papel o en un archivo para dárselo al cliente** | Sigue siendo el hueco más grande del uso diario: la factura se calcula bien y **solo se puede mirar en la pantalla del taller**. **Con un matiz que hay que leer:** `DOC-06/Q-21` deja abierto si hoy existe alguna forma rudimentaria de imprimir, y conviene comprobarlo antes de dimensionar nada. La comprobación está pedida a `A-03` desde hace dos rondas y sigue sin respuesta (apartado 6). Aun así se mantiene la segunda, porque el documento **entregable** no existe en ningún caso: sin los datos fiscales del taller —que es **FUN-003**— no hay factura que dar. Conviene refinarlas juntas. |
| 3 | **FUN-005 · Que la nómina proponga el salario bruto del empleado** | Sigue siendo la mejor relación valor/tamaño: es **pequeña**, no toca el ciclo del dinero de los clientes y elimina un tecleo manual que se repite cada mes por cada empleado, con su riesgo de errata (`DOC-06/§4/C.5`). El dato ya está en la ficha del empleado y no se usa para nada (`DOC-04/Q-05`). La que antes se nota y menos cuesta. |

## 3. Propuestas nuevas de esta ronda

**Ninguna. Es la segunda ronda seguida, y por un motivo más simple que la
anterior: ninguna fuente de carencias ha cambiado.**

En la ronda anterior el manual se había regenerado entero y hubo que repasar
catorce carencias una a una para concluir que ninguna quedaba sin dueño. Esta vez
lo que ha cambiado es el roadmap técnico, que **no es fuente de carencias
funcionales**: registra que tres mejoras técnicas se han decidido. `DOC-06`,
`DOC-04` y `DOC-24` están donde estaban, con el mismo hash. El apartado 1.3 lo
detalla.

Conviene decir por qué esto se escribe así en lugar de rellenar el hueco. Este
documento lo consume negocio y **su utilidad depende de que nadie sospeche que
está inflado**. Siempre se puede imaginar una funcionalidad más —un panel de
inicio, un aviso de nóminas sin registrar, un histórico de precios—, y cada una
de esas invenciones haría más caro leer las ocho que sí tienen detrás a alguien a
quien le pasa algo. Con ocho propuestas esperando decisión desde hace dos rondas,
lo que hace falta no es una novena: es que se decidan.

Los identificadores siguen en FUN-008. `S-12` devolvería FUN-009 y **no se le ha
pedido**, porque no hay nada que numerar.

## 4. Propuestas vivas de rondas anteriores

Las ocho, **las ocho en `proposed`** y ninguna decidida. Ninguna ha sido
aceptada, rechazada, implementada ni sustituida, así que no hay ningún motivo de
rechazo que respetar ni ningún rastro que seguir hasta `DOC-08`.

Van con su ficha completa porque este documento refleja **el estado actual**:
quien lo lea hoy tiene que poder decidir sin abrir la versión anterior. El
apartado **Estado de la evidencia** de cada ficha dice de dónde viene hoy su
respaldo y si ha crecido o menguado desde que se propuso; el orden en que fue
cambiando está en el `-HIST.md`.

---

### FUN-001 · Llevarse la factura en papel o en un archivo para dárselo al cliente

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** El cliente paga y pide su factura. Hoy la factura
existe dentro de la aplicación —con su número `año/F-nnnn`, su base, su IVA y su
total— pero **solo se puede mirar en la pantalla del ordenador del taller**. La
tarea A.17 del manual, que es la que describe qué ve el usuario en una factura,
termina en la pantalla y no menciona ninguna forma de sacarla de ahí. Le pasa a
quien está en el mostrador, cada vez que cobra un trabajo. Lo mismo con el
albarán, que es lo que el taller enseña al cliente para explicarle qué se ha
hecho antes de cobrarle.

**En qué consiste.** Poder obtener la factura como documento entregable —papel o
archivo— con el número, la fecha, los datos del cliente, el detalle de los
albaranes que agrupa, la base, el IVA y el total. Lo mismo para el albarán, como
hoja de trabajo que se le enseña al cliente.

**Qué aporta.** Cierra el ciclo del negocio: hoy el taller hace todo el trabajo
de calcular bien la factura y luego tiene que copiarla a mano en otro sitio para
entregarla. Ahorra ese doble trabajo y elimina el riesgo de que el papel que ve
el cliente diga algo distinto de lo que dice la aplicación.

**Qué pasa si no se hace.** El taller sigue emitiendo facturas que no puede
entregar, y sigue rehaciéndolas fuera de la aplicación. Es el único punto donde
el sistema obliga a duplicar el trabajo en otra herramienta.

**Estado de la evidencia — su confianza es `medium`, y hay que saber por qué.**
Bajó de `high` a `medium` al releer el manual regenerado, por un matiz que la
primera versión de este documento pasó por alto: `DOC-06/§6.1` es una lista
explícita y enumerada de lo que la aplicación no puede hacer, y **la impresión no
está en ella**. No es un olvido de
A-04: es que `DOC-06/Q-21` dice literalmente que «no se sabe si no existe o si no
se documentó», y un manual honesto no declara carencia lo que no ha verificado.
Este documento sí lo dio por carencia cierta, y con el mismo criterio con el que
en 5.3 se niega a proponer la búsqueda en los listados. **La propuesta se
mantiene igualmente**, y por una razón que no depende de la comprobación: aunque
existiera hoy alguna forma rudimentaria de imprimir, seguiría sin haber factura
entregable, porque el documento que se le da a un cliente lleva los datos
fiscales del taller y **esos no se guardan en ninguna parte** —eso es FUN-003—.
La comprobación de `Q-21` sigue pedida a `A-03` y sigue sin respuesta (apartado
6).

**Y una cosa que no la cambia, dicha a propósito.** La mejora técnica `MEJ-001`,
aceptada el 2026-08-17, va a tocar las pantallas de facturas y de albaranes para
ponerles identificadores de prueba. Eso **no acerca ni un paso esta propuesta** y
no altera ninguna de sus señales: no cambia ninguna pantalla, ningún flujo ni
ningún texto, y sobre todo no hace aparecer el documento entregable que aquí se
pide. Se deja escrito para que nadie lo lea como un avance que no es.

- **Evidencia:** `DOC-06/Q-21` («No consta si se puede imprimir o exportar un
  albarán o una factura. Es la primera pregunta que hará quien tenga que
  entregarle algo en papel al cliente»), `DOC-06/§4/A.16`, `DOC-06/§4/A.17`.
- **Requisitos que tocaría:** REQ-048, REQ-049, REQ-051, REQ-052, REQ-053.
- **Contradice:** ninguno. El documento entregable muestra los mismos importes
  que ya calcula REQ-049 y presenta REQ-051; no cambia ningún cálculo.
- **Depende de:** FUN-003, para los datos del taller que van en la cabecera.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** high · **confianza** medium.

---

### FUN-002 · Poder guardar una copia de los datos del taller y recuperarla

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** Todos los datos del taller —clientes, vehículos,
albaranes, facturas emitidas, piezas, personal y nóminas— viven en un único
ordenador (`DOC-06/§2`). Si ese ordenador se estropea, se lo llevan o alguien
borra algo por error, **no hay ninguna forma de recuperarlo**: la aplicación no
ofrece nada y ningún requisito de DOC-04 habla de respaldar los datos. Le pasa al
dueño del taller el día que falla el disco, y para entonces ya es tarde.

**En qué consiste.** Que el taller pueda guardar una copia completa de sus datos
donde quiera —un disco externo, una carpeta— y volver a cargarla si hace falta,
sin depender de nadie técnico.

**Qué aporta.** Protege la facturación del taller, que es su contabilidad de
cobros. También hace reversible lo que hoy no lo es: `DOC-24/BUG-004` deja
constancia de que una factura emitida por error **no se puede eliminar por
ningún medio**, y sin copia de seguridad tampoco hay a dónde volver.

**Qué pasa si no se hace.** El taller sigue con toda su facturación en un solo
sitio y sin red. La probabilidad es baja cualquier día concreto, y el daño el día
que ocurra es total.

**Estado de la evidencia — la más sólida del documento.** `DOC-06/§6.1` cierra la
viñeta de la ausencia de identificación diciendo que «si algo se borra, no hay
forma de saber quién fue **ni de recuperarlo**». Ese «ni de recuperarlo» es
exactamente lo que esta propuesta cubre, y llega desde una viñeta que este
documento había clasificado como decisión de negocio y no como carencia. La
decisión de no tener usuarios sigue siendo respetable y no se discute (5.3); la
imposibilidad de recuperar lo borrado no es parte de esa decisión.

**No la cubre `MEJ-005`, y la confusión es fácil.** La mejora técnica aceptada el
2026-08-17 sirve para que el equipo pueda dejar los datos en un estado conocido
antes de cada prueba. Eso no es una copia de seguridad del taller: repone unos
datos inventados, no el trabajo real de una mañana, y no hay ninguna forma de
pedirlo desde la aplicación. **Esta propuesta sigue entera y sigue siendo la
primera recomendada.**

- **Evidencia:** `DOC-06/Q-22` («No consta ningún procedimiento de copia de
  seguridad. Un manual honesto debería decirle al taller cómo proteger su
  facturación, y hoy no puede»), `DOC-06/§2`, `DOC-06/§6.1`, `DOC-24/BUG-004`.
- **Requisitos que tocaría:** ninguno de los 79. **Y eso es justamente el
  hallazgo**: no existe ningún requisito que hable de conservar los datos, así
  que no hay nada que reformular, hay algo que añadir.
- **Contradice:** ninguno.
- **Tamaño** medium · **impacto** high · **dificultad** medium ·
  **valor de negocio** high · **confianza** high.

---

### FUN-003 · Dar contenido a la sección *Configuración*

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** *Configuración* está en el menú desde el principio y
al entrar solo dice que está pendiente de desarrollo (REQ-079). Le pasa a
cualquiera que la abra esperando encontrar algo. Pero el problema de fondo no es
la pantalla vacía: es que **hay datos del taller que hoy no se guardan en ningún
sitio** —el nombre del taller, su dirección, su identificación fiscal, el IVA
que aplica habitualmente— y que hacen falta en cuanto se quiera entregar un
documento al cliente.

**En qué consiste.** Decidir qué necesita el taller tener configurado y
construirlo en esa sección. Los candidatos que se deducen de lo que hoy falta:
los datos del propio taller que van en la cabecera de una factura, el tipo de IVA
habitual, y el idioma y el tema por defecto que hoy solo se cambian desde la
cabecera de la pantalla.

**Qué aporta.** Es lo que hace posible FUN-001: sin los datos del taller no hay
factura entregable. Y da un lugar a las decisiones que hoy están fijas dentro de
la aplicación, como el 21 % de IVA.

**Qué pasa si no se hace.** La sección sigue en el menú sin hacer nada, que es
una promesa incumplida delante del usuario todos los días, y FUN-001 se queda sin
la información que necesita.

**Estado de la evidencia — dos piezas independientes señalando el mismo hueco.**
El manual no se limita a decir que la sección no funciona: añade que «de momento
**no está decidido qué contendrá**», que es literalmente el enunciado de esta
propuesta visto desde el usuario. Y `A-12` la ha mirado desde el lado técnico y
**ha decidido no proponer nada**, derivándola aquí con estas palabras: «un módulo
sin desarrollar es funcionalidad, no una mejora» (`DOC-16/§6.3`, verificado
contra 2.0.0). En esa versión A-12 marca además su hallazgo como `encaminado`,
que en su lenguaje quiere decir que lo da por cerrado del lado técnico **porque
el número ya existe aquí**. Lo que no existe es la decisión.

- **Evidencia:** `DOC-04/Q-04` («La sección de Configuración aparece en el menú
  pero no está desarrollada y ninguna especificación describe su contenido. ¿Qué
  debe contener?»), REQ-079, `DOC-06/§3`, `DOC-06/§6.1`, `DOC-16/§6.3`.
- **Requisitos que tocaría:** REQ-079, REQ-050, REQ-076, REQ-078.
- **Contradice:** **REQ-050**, pero solo en un caso concreto: si el negocio
  decide que el IVA habitual se configure aquí, dejará de ser cierto que «el
  sistema aplica el 21 por ciento» cuando el usuario no indique tipo, porque
  aplicará el que esté configurado. Si el IVA no entra en esta sección, no
  contradice nada. **Esto lo tiene que resolver `A-06`, no este documento.**
- **Relación con lo abierto:** `DOC-04/Q-09` (qué tipos de IVA son admisibles)
  sigue abierta y es una decisión de negocio, no una propuesta; si se contesta,
  su respuesta encaja aquí de forma natural.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** medium.

---

### FUN-004 · Avisar de qué piezas se están acabando

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** El taller no se entera de que se le acaba una pieza
hasta que la necesita y no la tiene. La aplicación conoce el stock de cada pieza
y lo mueve sola al anotarla en un albarán, pero **no avisa de nada**: hay que
entrar en el catálogo y mirarlo pieza a pieza. Le pasa a quien hace el pedido al
proveedor, que hoy lo hace de memoria.

**En qué consiste.** Que cada pieza pueda tener un mínimo por debajo del cual el
taller quiere reponer, y que la aplicación muestre en un sitio la lista de las
piezas que están en ese caso o por debajo.

**Qué aporta.** Convierte un dato que ya existe —el stock— en una decisión de
compra. Evita el trabajo parado por no tener una pieza y las compras de urgencia.

**Qué pasa si no se hace.** El taller sigue comprando de memoria. No se rompe
nada; simplemente el dato de stock sigue sirviendo solo para consultarlo.

**No confundir con lo ya decidido.** El negocio ya decidió en `DOC-04/Q-02`
bloquear el consumo de una pieza sin existencias suficientes. **Eso es otra
cosa:** impide anotar lo que no hay, en el momento de anotarlo. Esta propuesta
avisa **antes** de llegar a cero, para poder comprar a tiempo. Una no sustituye a
la otra, y de hecho la decisión de Q-02 aumenta el valor de esta: cuando el
sistema bloquee el consumo sin existencias, quedarse sin stock dejará de ser un
número raro en pantalla y pasará a ser trabajo que no se puede anotar.

**Estado de la evidencia — sin cambios y verificada.** La viñeta de
`DOC-06/§6.1` sigue enunciada igual y la tarea B.2 sigue diciendo que el stock
solo se mueve por los albaranes y que nada más lo mueve automáticamente.

- **Evidencia:** `DOC-06/§6.1` («No hay avisos ni recordatorios. La aplicación no
  te avisa de facturas vencidas, de stock bajo ni de nóminas sin registrar»),
  `DOC-06/§4/B.2`.
- **Requisitos que tocaría:** REQ-018, REQ-021, REQ-022.
- **Contradice:** ninguno.
- **Tamaño** small · **impacto** medium · **dificultad** low ·
  **valor de negocio** medium · **confianza** high.

---

### FUN-005 · Que la nómina proponga el salario bruto del empleado

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** Cada mes, al registrar la nómina de cada empleado, hay
que **teclear el salario bruto a mano**, aunque la ficha del empleado ya guarde su
salario base. El dato está ahí y la aplicación no lo usa. Le pasa a quien cierra
el mes, tantas veces como empleados tenga el taller, y cada tecleo es una
oportunidad de errata en un importe que luego se paga.

**En qué consiste.** Que al registrar una nómina el bruto venga propuesto a
partir del salario base del empleado, y que se pueda cambiar cuando ese mes no
coincida —una paga extra, unas horas de más—.

**Qué aporta.** Quita un tecleo repetitivo al mes por empleado y el error que lo
acompaña. Y le da por fin un uso al salario base, que hoy es un dato que se
rellena para nada.

**Qué pasa si no se hace.** Se sigue tecleando el bruto cada mes. Es la propuesta
cuyo «no hacerla» duele menos, y por eso está aquí por tamaño, no por urgencia.

**Estado de la evidencia — sin cambios.** Las tres citas siguen exactas.

- **Evidencia:** `DOC-04/Q-05` («El empleado guarda fecha de alta y salario base,
  pero la nómina no los usa: el bruto se teclea a mano cada mes»),
  `DOC-06/§6.1` («La nómina no propone el salario base del empleado»),
  `DOC-06/§4/C.5`.
- **Requisitos que tocaría:** REQ-064, REQ-069.
- **Contradice:** ninguno. REQ-064 exige que se indique el salario bruto y eso
  sigue siendo verdad: proponerlo no es imponerlo, el usuario lo sigue pudiendo
  cambiar antes de guardar.
- **Tamaño** small · **impacto** low · **dificultad** low ·
  **valor de negocio** medium · **confianza** high.

---

### FUN-006 · Saber cuánto gana el taller en cada trabajo

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** El taller apunta en cada pieza lo que le cuesta a él
además de lo que le cobra al cliente, pero **ese coste no se usa para nada**: no
hay ninguna pantalla que diga cuánto se ha ganado en un albarán o en una factura.
Le pasa al dueño cuando quiere saber si un trabajo ha salido a cuenta, y hoy
tiene que hacerlo con una calculadora al lado.

**En qué consiste.** Mostrar, junto a lo que se le cobra al cliente, lo que le ha
costado al taller el material, y la diferencia entre ambos. En el albarán, en la
factura y, si se quiere, como resumen del catálogo.

**Qué aporta.** Da al taller la única cifra de negocio que hoy no tiene: si gana
o no gana. También convierte en útil un dato que ya se está rellenando.

**Qué pasa si no se hace.** El taller sigue facturando sin saber su margen, y el
campo *coste* sigue siendo, en palabras del manual, un dato que se rellena
sabiendo que la aplicación no hará nada con él.

**Una advertencia de alcance.** `DOC-04/Q-01` pregunta si el coste es un margen
previsto o un dato informativo, y **esa parte la decide negocio**. Lo que esta
propuesta aporta es que, si la respuesta es «margen», hay algo que construir; si
es «dato informativo», esta propuesta se rechaza y el manual dejará de tener que
avisar de un campo inútil.

**Estado de la evidencia — la mejor cita es la del propio manual.** La tarea A.17
se lo dice al usuario en su propia cara, dentro del apartado «si los importes no
te cuadran» —«el coste de la pieza no interviene: la aplicación lo guarda, pero
no lo usa para nada»—. Y la lista de preguntas frecuentes recoge la pregunta tal
cual la haría alguien del taller: «¿Para qué sirven el coste y la unidad de una
pieza?».

- **Evidencia:** `DOC-04/Q-01`, `DOC-06/§6.1` («El coste y la unidad de una pieza
  no se usan. No hay cálculo de margen ni de beneficio en ninguna pantalla»),
  `DOC-06/§4/B.1`, `DOC-06/§4/A.17`, `DOC-06/§5`, `DOC-06/§7` (glosario, entrada
  *Preu / Cost*).
- **Requisitos que tocaría:** REQ-018, REQ-021, REQ-053.
- **Contradice:** ninguno. La base de la factura se sigue calculando igual
  (REQ-049): el margen se **muestra aparte**, no entra en lo que se le cobra al
  cliente.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** medium.

---

### FUN-007 · Poder decir en qué punto está un trabajo

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** Un albarán solo puede estar *pendiente de facturar* o
*facturado*. No hay forma de distinguir un coche que se está reparando ahora
mismo de uno que ya está acabado y esperando a que el cliente lo recoja, o de uno
que espera el visto bueno del cliente para empezar. Le pasa a quien mira el
listado de albaranes para saber qué hay en el taller hoy: los ve todos iguales.

**En qué consiste.** Que el albarán pueda reflejar el punto real del trabajo
—cuáles y cuántos los decide el taller— y que el listado se pueda filtrar por
ese punto.

**Qué aporta.** Convierte el listado de albaranes en la foto del taller de hoy, y
no solo en la lista de lo que queda por cobrar.

**Qué pasa si no se hace.** Puede que no pase nada: es posible que el taller
trabaje de verdad con dos situaciones y no eche en falta ninguna más. **Esta es
la propuesta con la que más fácil es equivocarse**, y se marca con confianza baja
a propósito.

**Cómo se decide si esto es un hueco o no.** `DOC-04/Q-07` pregunta exactamente
eso —«¿El taller trabaja así o falta reflejar un paso real del trabajo?»— y sigue
sin respuesta. Si la respuesta es que el taller trabaja así, esta propuesta se
rechaza y no vuelve. `A-06` es donde se sabrá, preguntando.

**Estado de la evidencia — acotada, y a mejor.** Esta propuesta nació pidiendo
también que el listado se pudiera filtrar por ese punto, dando a entender que el
filtro habría que construirlo. El apartado 3 del manual deja claro que **el
filtro por situación ya existe** —«el de *Albaranes* tiene filtros por vehículo,
cliente y situación»—, y REQ-025 lo confirma. Lo que faltaría, entonces, son las
situaciones: el sitio donde enseñarlas ya está.

- **Evidencia:** `DOC-04/Q-07`, `DOC-06/§6.1` («No hay estados intermedios en un
  albarán. Solo hay "pendiente de facturar" y "facturado": no puedes marcar un
  trabajo como "en curso", "acabado" o "pendiente de aprobación por el
  cliente"»), `DOC-06/§3`.
- **Requisitos que tocaría:** REQ-025, REQ-028, REQ-045.
- **Contradice:** **REQ-028** («Un albarán recién abierto queda en situación de
  pendiente de facturar») si el albarán pasara a nacer en otra situación. Y
  obligaría a reformular **REQ-045**, que hoy exige que todos los albaranes de
  una factura estén *pendientes de facturar*: habría que decir cuáles de las
  situaciones nuevas permiten facturar.
- **Relación con lo abierto:** `DOC-04/Q-13` (el término *estado* significa dos
  cosas distintas) empeora si se añaden situaciones sin resolverla antes. El
  manual ha tenido que inventarse la distinción entre «situación del albarán» y
  «estado de pago» precisamente por eso.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** low.

---

### FUN-008 · Anotar el material que entra, en vez de recontar el stock entero

`status: proposed` · viva desde la ronda de 2026-08-16

> **Esta propuesta es de criterio propio, no de evidencia.** Nace de una fricción
> que el manual describe, pero **ningún documento la declara una carencia**.
> Fíltrala como opinión.

**Qué problema resuelve.** Cuando llega material del proveedor, la única forma de
reflejarlo es abrir la pieza y **escribir a mano el stock total resultante**, es
decir, sumar mentalmente lo que había y lo que ha llegado. Le pasa a quien recibe
el pedido. Si mientras tanto alguien ha anotado esa pieza en un albarán, la
cuenta mental ya no sale, y no queda ningún rastro de cuánto entró ni cuándo.

**En qué consiste.** Poder anotar «han entrado N unidades de esta pieza» y que la
aplicación sume, en lugar de tener que teclear el total.

**Qué aporta.** Quita una cuenta mental que se hace con el albarán a medias y
evita que un descuadre de stock se arrastre. Es el complemento natural de
FUN-004: primero avisa de que falta, luego se anota lo que llega.

**Qué pasa si no se hace.** Se sigue recontando a mano, que es lo que se hace hoy
y funciona mientras el taller sea pequeño.

**Estado de la evidencia — no tiene, y merece repetirse.** Sigue siendo la única
propuesta que este documento no puede respaldar con una carencia declarada por
nadie. Se ha vuelto a comprobar contra el apartado 6.1 del manual y sigue sin
aparecer. Si el negocio la descarta, se descarta sin discusión.

- **Fuente:** criterio propio. Lo citable es la fricción, no la carencia:
  `DOC-06/§4/B.2` («Si has recibido material del proveedor, tienes que ponerlo tú
  a mano modificando la pieza»), `DOC-06/§4/B.3`.
- **Requisitos que tocaría:** REQ-018, REQ-022.
- **Contradice:** ninguno. Modificar el stock a mano (REQ-022) seguiría estando
  disponible para el recuento del almacén.
- **Tamaño** small · **impacto** low · **dificultad** low ·
  **valor de negocio** low · **confianza** medium.

## 5. Descartadas y no propuestas, con motivo

Sigue sin haber nada rechazado por negocio: **ninguna `FUN-nnn` ha sido decidida
todavía**, ni como `not-now` ni como `not-wanted`. Lo de este apartado son cosas
que **A-15 ha decidido no proponer**, y el motivo importa tanto como la propuesta.

### 5.1 Carencias reales que ya van a entrar en el ciclo — no se reproponen

Las seis decisiones de negocio del 2026-08-16 (`DOC-04/§6.2`) ya tienen evolutivo
asignado. Se listan para que quede constancia de que se han visto y de por qué no
están en el apartado 3 ni en el 4.

| Origen | Carencia | Por qué no se propone |
|---|---|---|
| `DOC-04/Q-02` · `DOC-24/BUG-001` | El stock queda negativo al anotar más piezas de las que hay | Decidido: bloquear. Alcance medio |
| `DOC-04/Q-06` · `DOC-24/BUG-004` | Una factura emitida no se puede anular ni corregir, y sus albaranes quedan bloqueados para siempre | Decidido: factura rectificativa. **Alcance grande** |
| `DOC-04/Q-10` · `DOC-24/BUG-002` | Cambiar el vehículo de un albarán cambia a quién se factura | Decidido: impedirlo. Alcance pequeño |
| `DOC-04/Q-12` · `DOC-24/BUG-003` | Se aceptan precios, costes y stocks negativos | Decidido: bloquear. Alcance medio |
| `DOC-04/Q-14` | No se puede ver qué facturas están pendientes de cobro | Decidido: recuento y filtro. Alcance medio |
| `DOC-04/Q-15` | No se puede ver qué nóminas están pendientes de pago | Decidido: recuento y filtro. Alcance medio |

**Dónde está la frontera, y quién la dibuja.** DOC-06 1.2.0 dio a estas seis
decisiones un apartado propio y visible para el usuario, el **6.2**, con la
advertencia de que «nada de esto existe todavía». Eso la hace fácil de respetar:
lo que remite a 6.2 no es mío. De las **catorce** viñetas del apartado 6.1,
**cinco** remiten expresamente a 6.2.

Una de esas viñetas merece mención aparte porque es nueva y podría confundirse
con una propuesta: **«los albaranes de una factura quedan bloqueados para
siempre, ni siquiera para corregir una errata»**. No se propone nada sobre ella.
Corregir lo que va dentro de una factura emitida es exactamente el problema que
resuelve la factura rectificativa ya decidida en `DOC-04/Q-06`, cuyo alcance
DOC-04 marca como grande. Proponer aparte «poder corregir una errata de un
albarán facturado» sería trocear con otro nombre algo ya encargado.

### 5.2 Preguntas abiertas que no son mías — falta decidir una regla, o falta documentar

| Pregunta | Por qué no genera propuesta |
|---|---|
| `DOC-04/Q-03` · La unidad de medida no se usa | Es una pregunta de qué significa un dato, no de qué falta construir. Según la respuesta, lo que hay que hacer es acotar la regla —o quitar el campo—, y ninguna de las dos cosas es funcionalidad nueva. |
| `DOC-04/Q-08` · ¿El idioma y el tema por defecto se comportan como dice la especificación? | Es una comprobación, no un hueco. Va a `A-03` (apartado 6). |
| `DOC-04/Q-09` · Qué tipos de IVA son admisibles | Falta acotar una regla sobre un campo que ya existe y ya funciona. Si la respuesta obliga a configurarlos en algún sitio, ese sitio es FUN-003. |
| `DOC-04/Q-11` · ¿Debe bloquearse una nómina pagada? | Falta decidir una regla sobre una operación que ya existe. Si se decide bloquear, es una restricción, no funcionalidad nueva. Sigue abierta y `DOC-04` avisa de que la respuesta a Q-15 **no** la contesta. |
| `DOC-04/Q-13` · *Estado* significa dos cosas distintas | Falta decidir con qué nombres aparece cada concepto. Es vocabulario de interfaz sobre pantallas que ya existen. Afecta a FUN-007, que la empeoraría si se resolviera después. |
| `DOC-06/Q-23` y `DOC-06/Q-24` a `DOC-06/Q-30` | Son huecos de **documentación**, no de producto: cómo arranca la aplicación, nombres de botones, textos de error, cómo se edita una ficha, la pantalla de emisión, dónde está el conmutador de pago, qué campos tiene el formulario de cliente y qué ve el usuario cuando una anotación no llega a registrarse. Lo que falta es escribirlos, y en varios casos bloquean a `S-10`, no al taller. |

**Nota para quien venga de DOC-25 1.0.0.** La última fila usaba la numeración de
DOC-06 1.0.0, que el manual cambió en su 1.1.0. **La tabla de equivalencia
completa está en el `-HIST.md`**, entrada 1.1.0. Lo que hay que saber para leer
esta tabla es que `Q-20` no está en ella: no es un hueco de documentación sino
una comprobación pendiente, y se trata en 5.3 y en el apartado 6.

### 5.3 Candidatas consideradas y no propuestas

| Candidata | Motivo de no proponerla |
|---|---|
| **Usuarios, contraseña y registro de quién hizo qué** | `DOC-06/§6.1` lo lista como carencia, pero `DOC-04/§1` y `DOC-04/§4` declaran que la ausencia de identificación es **una decisión de negocio documentada, no una carencia**, y `DOC-06/§2` se la explica al usuario sin disculparse. Proponer lo contrario sería contradecir una decisión ya tomada, y además cambiaría la premisa de los 79 requisitos, no de unos pocos. Si el negocio quiere reabrirlo, que lo pida; A-15 no lo propone. **La parte recuperable de esa viñeta —«ni de recuperarlo»— sí está propuesta, y es FUN-002.** |
| **Consultar la aplicación desde otro ordenador o desde el móvil** | Mismo motivo: `DOC-06/§2` describe el puesto único como decisión de instalación, no como falta. FUN-002 cubre la parte de esa situación que sí es un riesgo real —perder los datos—, que es lo que se puede proponer sin discutir la decisión. |
| **Una pantalla de inicio con el resumen del día** | Solaparía con el recuento de pendientes de cobro y de pago ya decidido en `DOC-04/Q-14` y `DOC-04/Q-15`. Volver a proponerlo con otro nombre es exactamente lo que este documento no debe hacer. Cuando esos evolutivos existan, se podrá valorar si además hace falta reunirlos en una pantalla. Hay una pregunta abierta relacionada, `DOC-06/Q-23`, pero pregunta qué se ve hoy al abrir la aplicación, no qué debería verse. |
| **Búsqueda, ordenación y paginación en el resto de listados** | `DOC-06/Q-20` sigue abierta y sigue avisando de que **no se sabe si no existen o solo no se documentaron**. El apartado 3 del manual solo se las atribuye a *Clientes* y *Vehículos*, y lo hace citando REQ-001 y REQ-009, no habiéndolo verificado. Proponer construir algo que quizá ya está construido es fabricar producto. Va a `A-03` como comprobación (apartado 6); si se confirma que no existen, entra en la próxima ronda con evidencia de verdad. |
| **Un aviso de nóminas del mes sin registrar** | Sale de la misma viñeta que FUN-004 —«no te avisa de facturas vencidas, de stock bajo ni de nóminas sin registrar»—. Se ha valorado separarlo y no se hace: nadie ha declarado que al taller se le olviden las nóminas, y trocear una viñeta en tres propuestas para engordar el documento es precisamente lo que lo haría inútil. Si `A-06` ve que el taller lo echa en falta al refinar FUN-004, que salga de ahí. |
| **Pedidos a proveedores y contabilidad** | `DOC-06/§1` dice que la aplicación no lo hace y no pretende hacerlo. Nada en la documentación indica que el taller lo espere. Sería inventar producto. |

### 5.4 Los dos hallazgos que `A-12` dejó dirigidos aquí

`A-12 · Mejoras/Roadmap` dejó dos cosas a nombre de A-15. Se han valorado las dos
y **ninguna produce propuesta nueva**. El motivo importa más que la conclusión.
En DOC-16 **2.0.0** A-12 marca los dos como `encaminado` y acepta expresamente
esta lectura: «me parece bien y no lo discuto». **Quedan cerrados por ambas
partes.**

**Los avisos que salen en catalán no son una funcionalidad ausente: son un
defecto.** El hecho, tal como lo describe `DOC-16/§6.1`, es que los setenta
mensajes de error que la aplicación devuelve están escritos en catalán fijo y se
muestran tal cual, independientemente del idioma elegido. Visto desde quien usa
la aplicación: alguien que trabaja con la interfaz en castellano guarda un
cliente sin nombre y recibe el aviso en catalán. **Y `REQ-076` ya dice que la
interfaz se presenta en castellano mientras el usuario no elija otro idioma.**
Ahí está la frontera: cuando existe un requisito vigente que dice cómo debe
comportarse el sistema y el sistema se comporta de otra manera, eso no es algo
que falte por construir —es algo que no cumple lo que ya se pidió—, y el
documento que le corresponde es `DOC-24-BUGS`, no este. **A-15 confirma esa
lectura desde el lado del usuario y no propone nada**; el apartado 6 lo devuelve
a `A-14`, donde sigue siendo candidato a `BUG-005` y **sigue sin censar** en
DOC-24 1.0.0. Si al reproducirlo resultara que REQ-076 nunca pretendió alcanzar a
los avisos, entonces sí habría un hueco de producto que proponer, y volvería aquí
con evidencia de verdad.

**El módulo de Configuración ya es FUN-003.** `A-12` lo derivó aquí con el
argumento correcto —«un módulo sin desarrollar es funcionalidad, no una mejora»—
y con la constancia expresa de no haber propuesto nada sobre él. No hace falta un
`FUN-nnn` nuevo: hace falta que el que existe se decida. El hallazgo está
incorporado como evidencia adicional de FUN-003, que es lo que corresponde hacer
con él.

### 5.5 Las tres mejoras técnicas aceptadas — ninguna produce propuesta

Se ha mirado si alguna de las tres decisiones del 2026-08-17 abre un hueco
funcional o cierra uno. **Ninguna de las dos cosas.** Queda escrito porque en la
próxima ronda alguien se lo volverá a preguntar.

| Decidida | Qué se ha valorado | Conclusión |
|---|---|---|
| **MEJ-001** · identificadores de prueba | Va a abrir las pantallas de facturas y albaranes, donde vive `FUN-001`. ¿Aprovechar el viaje? | **No se propone nada.** Aprovechar que alguien va a tocar algo no es un problema de negocio; es calendario, y lo valora `A-07`. La única nota útil —comprobar de paso `DOC-06/Q-21`— va a `A-03` |
| **MEJ-003** · pruebas del servidor y CI | ¿Cambia algo que el taller pueda hacer? | **No.** Cambia lo que el equipo sabe. No toca ninguna carencia del apartado 6.1 del manual |
| **MEJ-005** · estado de base reproducible | ¿Cubre `FUN-002`, la copia de seguridad? | **No, y es la confusión más fácil de este documento.** Repone datos de prueba para el entorno de pruebas; no guarda ni recupera el trabajo real del taller, y no hay forma de pedirlo desde la aplicación |

## 6. Hallazgos para otras piezas

Esto **no son propuestas** y no debe tratarse como tal. Pertenece a otras piezas.

### Para `A-14 · Defectos` — sigue abierto

**El candidato a `BUG-005` se confirma desde el lado del usuario.** Los mensajes
de error llegan siempre en catalán, elija el usuario el idioma que elija, mientras
REQ-076 dice que la interfaz se presenta en castellano por defecto. A-15 lo ha
valorado como posible funcionalidad y **concluye que no lo es**: hay un requisito
vigente que el comportamiento no cumple. **`DOC-24` 1.0.0 sigue sin censarlo**, y
ahora son dos piezas las que lo señalan: `DOC-16/§6.2` lo mantiene abierto y
`DOC-16/§6.1` da por buena esta lectura. Origen del hecho: lectura de código en
`44748fb`, sin reproducir por ninguna de las dos.

### Para `A-12 · Mejoras/Roadmap` — deuda técnica y fragilidad

Los cuatro de la ronda anterior se han contrastado contra DOC-16 **2.0.0**, que
es lo que corresponde hacer con un hallazgo enviado: comprobar si ha aterrizado.
**Los cuatro tienen ya dueño técnico**, así que aquí quedan solo para no perder
el rastro, no para pedir nada nuevo.

| Hallazgo de A-15 | Dónde ha aterrizado | Estado |
|---|---|---|
| 1. **No hay una comprobación común de los datos que se guardan.** `DOC-24` documenta que BUG-001, BUG-002 y BUG-003 son el mismo patrón: cada operación comprueba lo suyo y varias no comprueban nada. Los evolutivos de Q-02 y Q-12 van a añadir más sobre esa misma base | `DOC-16/§3.0` lo eleva a patrón medido y `MEJ-004` es la respuesta | **Recogido**, pero `MEJ-004` sigue **sin decidir** |
| 2. **Hay reglas que solo se cumplen porque la operación no existe.** `DOC-24/DISC-001` y la nota de `BUG-004`: la inmutabilidad de la factura no está implementada como regla; sencillamente no hay forma de modificarla, y la factura rectificativa de Q-06 va a construir esa forma | `DOC-16/§3.0` clasifica BUG-004 en la misma familia; la protección la daría `MEJ-004` | **Recogido en parte.** El matiz —que la protección se evapora el día que exista la operación— no consta escrito en DOC-16, y es lo que lo hace urgente |
| 3. **El entorno de pruebas no se puede dejar limpio desde la aplicación.** `DOC-24/test_data_left_behind`: una factura de 114.835,05 € y su albarán imposibles de eliminar por ningún camino | `MEJ-005`, que cita esa misma factura | **Recogido y decidido**: `MEJ-005` está `accepted` desde el 2026-08-17 |
| 4. **La comprobación de importes falta en las dos capas a la vez**, verificado deliberadamente en `DOC-24/BUG-003`. Relevante para dimensionar el evolutivo de Q-12 | Evidencia de `MEJ-004` | **Recogido**, `MEJ-004` sin decidir |

**Nada nuevo para `A-12` en esta ronda.** Y conviene decir lo que A-15 no hace
con la decisión del 2026-08-17: **no opina sobre ella**. Que `MEJ-004` siga sin
decidirse es una lectura técnica y le corresponde a A-12 defenderla, no a este
documento presionar desde el lado de negocio.

### Para `A-03 · Plan de pruebas` — comprobaciones pendientes

1. **`DOC-06/Q-21`, la más urgente de las tres y sigue sin respuesta.** No consta
   si hoy se puede imprimir o exportar un albarán o una factura, y de esa
   respuesta depende cómo se refine `FUN-001`, que es la segunda propuesta
   recomendada del documento. Si existiera alguna forma de sacar la factura de la
   pantalla, la propuesta se estrecharía a darle el formato entregable que le
   falta. Afecta a REQ-052 y REQ-053. **Nota de oportunidad, no de prioridad:**
   `MEJ-001`, aceptada el 2026-08-17, va a abrir esas mismas pantallas. Quien
   coordine el trabajo decide si vale la pena mirarlo de paso; **quién lo decide
   es `A-07`, no A-15.**
2. **`DOC-06/Q-20`**: no se sabe si los listados de piezas, albaranes, facturas,
   personal y nóminas tienen búsqueda, ordenación y paginación. El apartado 3 del
   manual solo se las atribuye a *Clientes* y *Vehículos*, y por herencia de
   REQ-001 y REQ-009, no por haberlo mirado. Si no las tienen, es una propuesta
   con evidencia para la próxima ronda; si las tienen, es un hueco de DOC-04.
   Afecta a REQ-018, REQ-025, REQ-052, REQ-056 y REQ-063.
3. **`DOC-04/Q-08`**: el idioma y el tema por defecto son las dos únicas reglas
   que vienen de una especificación y no del comportamiento observado. No es una
   duda de negocio: se comprueba mirando la aplicación. Afecta a REQ-076 y
   REQ-078. Gana interés porque el candidato a BUG-005 toca el mismo requisito
   desde otro ángulo.

**Las tres siguen sin respuesta**, y la primera lleva dos rondas pedida. No es un
reproche: es el dato que explica por qué `FUN-001` conserva confianza `medium`.

## 7. Bloque estructurado

```yaml propuestas
version: 1
project: app-taller
run:
  date: 2026-08-17
  previous_doc_version: 1.1.0
  version_bump: PATCH
  version_bump_reason: >-
    Ninguna propuesta cambia de estado (no es MAJOR) y ninguna cambia de evidencia, de alcance
    ni de señal (no es MINOR). Lo que cambia es procedencia, una cita literal y el estado de
    los hallazgos enviados a otras piezas. Un PATCH además no invalida a quien me consuma:
    DOC-16 2.0.0 me declara en 1.1.0 y por la regla de S-16 un PATCH no obliga a regenerarlo.
  trigger: "S-16 · cascada de obsolescencia: DOC-25 1.1.0 declaraba DOC-16 1.0.0 y el roadmap iba por 2.0.0"
  new_proposals_this_round: 0
  new_proposals_note: >-
    Ninguna, por segunda ronda consecutiva. Ninguna fuente de carencias ha cambiado: DOC-06
    sigue en 1.2.0, DOC-04 en 1.2.0 y DOC-24 en 1.0.0, los tres con el mismo hash. Lo que ha
    cambiado es el roadmap técnico, que no es fuente de carencias funcionales. No se ha pedido
    FUN-009.
  upstream_change:
    doc: DOC-16
    from: 1.0.0
    to: 2.0.0
    level: MAJOR
    what: >-
      decisión del propietario el 2026-08-17: MEJ-001, MEJ-003 y MEJ-005 pasan a accepted;
      MEJ-002, MEJ-004 y MEJ-006 siguen proposed; ninguna rechazada
    effect_on_this_doc: >-
      ninguno sobre las propuestas. Las tres mejoras aceptadas son trabajo técnico invisible
      para quien usa la aplicación y no cierran ninguna FUN-nnn. Se ha valorado una a una en 5.5
citation_fixes:
  - from: "DOC-16/§6.3 citado como «un módulo sin desarrollar no es una mejora, es funcionalidad»"
    to: "«un módulo sin desarrollar es funcionalidad, no una mejora»"
    reason: >-
      es la redacción literal en DOC-16 2.0.0. Dice lo mismo y no mueve el fondo de FUN-003,
      pero una cita entrecomillada tiene que decir lo que dice la fuente
citations_verified_unchanged:
  - ref: DOC-16/§6.1
    note: "hallazgo a A-15 sobre los avisos en catalán; en 2.0.0 sigue en §6.1, ahora marcado `encaminado`"
  - ref: DOC-16/§6.2
    note: "hallazgo a A-14, candidato a BUG-005; en 2.0.0 sigue en §6.2 y sigue abierto"
  - ref: DOC-16/§6.3
    note: "hallazgo a A-15 sobre el módulo de Configuración; en 2.0.0 sigue en §6.3, marcado `encaminado` porque ya es FUN-003"
  - ref: "DOC-06/Q-20, Q-21, Q-22, Q-23 y §6.1"
    note: "DOC-06 no se ha movido de 1.2.0 ni de hash; verificado por hash, no releído entero"
provenance_fixes:
  - what: "el fichero -HIST.md no declaraba `version` en su front-matter"
    fixed: true
    how: "declara `version: 1.1.1`, la del documento que acompaña. Convención propuesta por A-05 y adoptada"
  - what: "DOC-02-TECNICA figuraba en `inputs` con `used: false` y sin versión"
    fixed: true
    how: >-
      sale de `inputs` y pasa a `not_read_by_contract`. No era una entrada sin versión: era una
      entrada que no debía existir, porque A-15 tiene prohibido leer DOC-02
proposals_note: >-
  Las ocho conservan su número, su texto, su estado y todas sus señales. `evidence_status`
  describe de qué está respaldada hoy cada una; ninguna ha cambiado en la ronda 1.1.1.
proposals:
  - id: FUN-001
    title: "Llevarse la factura en papel o en un archivo para dárselo al cliente"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "El taller emite la factura y solo puede verla en su pantalla: no hay forma de imprimirla, guardarla ni enviarla, así que quien está en el mostrador la rehace fuera de la aplicación cada vez que cobra."
    what: "Obtener la factura como documento entregable con número, fecha, cliente, detalle de los albaranes, base, IVA y total. Lo mismo para el albarán que se le enseña al cliente antes de cobrar."
    value: "Cierra el ciclo del negocio y elimina el trabajo duplicado en otra herramienta, además del riesgo de que el papel diga algo distinto de la aplicación."
    source: evidence
    evidence_refs: [DOC-06/Q-21, DOC-06/§4/A.16, DOC-06/§4/A.17]
    affects_requirements: [REQ-048, REQ-049, REQ-051, REQ-052, REQ-053]
    contradicts: []
    depends_on: [FUN-003]
    impact: medium
    difficulty: medium
    business_value: high
    size: medium
    confidence: medium
    confidence_lowered_from: high
    confidence_lowered_in: 1.1.0
    confidence_reason: >-
      DOC-06 1.2.0 convierte su apartado 6 en una lista explícita de lo que la aplicación no
      puede hacer, y la impresión NO está en ella: Q-21 dice que no se sabe si no existe o si
      solo no se documentó, y A-04 no declara carencia lo no verificado. La propuesta se mantiene
      porque el documento entregable no existe en ningún caso —falta la identidad fiscal del
      taller, que es FUN-003—, pero la comprobación va a A-03 antes de refinar, y sigue sin
      respuesta.
    not_affected_by: >-
      MEJ-001 (accepted el 2026-08-17) va a tocar factures-pages y albarans-pages para ponerles
      identificadores de prueba. No cambia ninguna pantalla, flujo ni texto y no hace aparecer el
      documento entregable: esta propuesta no avanza ni un paso por esa aceptación, y ninguna de
      sus señales se mueve. Aprovechar el viaje es calendario y lo valora A-07, no A-15.
    if_not_done: "El taller sigue emitiendo facturas que no puede entregar y las copia a mano fuera de la aplicación."
    enters_cycle_via: A-06
  - id: FUN-002
    title: "Poder guardar una copia de los datos del taller y recuperarla"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Clientes, albaranes, facturas, piezas y nóminas viven en un único ordenador y no hay ninguna forma de respaldarlos. Le pasa al dueño del taller el día que falle el disco, y para entonces ya es tarde."
    what: "Guardar una copia completa de los datos donde el taller quiera y volver a cargarla si hace falta, sin depender de nadie técnico."
    value: "Protege toda la facturación del taller. Es lo único que da marcha atrás en un sistema donde una factura emitida no se puede deshacer."
    source: evidence
    evidence_refs: [DOC-06/Q-22, DOC-06/§2, DOC-06/§6.1, DOC-24/BUG-004]
    evidence_status: >-
      reforzada. DOC-06 1.2.0 §6.1 cierra la viñeta de la ausencia de identificación con «si algo
      se borra, no hay forma de saber quién fue ni de recuperarlo». La parte de recuperar es esta
      propuesta, y no forma parte de la decisión de negocio de no tener usuarios.
    affects_requirements: []
    contradicts: []
    impact: high
    difficulty: medium
    business_value: high
    size: medium
    confidence: high
    not_covered_by: >-
      MEJ-005 (accepted el 2026-08-17) NO cubre esta propuesta, y es la confusión más fácil de
      este documento. Sirve para que el equipo deje los datos en un estado conocido antes de
      cada prueba: repone unos datos inventados, no el trabajo real del taller, y no hay forma
      de pedirlo desde la aplicación. FUN-002 sigue entera.
    if_not_done: "Toda la facturación del taller sigue en un solo sitio y sin red; el día que falle, el daño es total."
    enters_cycle_via: A-06
  - id: FUN-003
    title: "Dar contenido a la sección Configuración"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Configuración está en el menú y solo avisa de que está pendiente. Detrás hay un hueco real: los datos del propio taller y el IVA habitual no se guardan en ninguna parte."
    what: "Decidir qué necesita el taller tener configurado y construirlo: datos del taller para la cabecera de una factura, tipo de IVA habitual, idioma y tema por defecto."
    value: "Hace posible FUN-001 y da un sitio a decisiones que hoy están fijas dentro de la aplicación."
    source: evidence
    evidence_refs: [DOC-04/Q-04, DOC-06/§3, DOC-06/§6.1, DOC-16/§6.3]
    evidence_status: >-
      reforzada por dos vías. DOC-06 1.2.0 §6.1 añade que «de momento no está decidido qué
      contendrá», y A-12 la deriva expresamente a A-15 en DOC-16 §6.3 sin proponer nada él.
      Verificado contra DOC-16 2.0.0: el hallazgo sigue en §6.3 y A-12 lo marca `encaminado`
      porque el número ya existe aquí. Lo que no existe es la decisión.
    citation_corrected_in_1_1_1: >-
      la cita literal de A-12 era «un módulo sin desarrollar no es una mejora, es funcionalidad»
      (redacción de DOC-16 1.0.0) y es «un módulo sin desarrollar es funcionalidad, no una
      mejora» (redacción de 2.0.0). Mismo sentido, cita ahora exacta.
    affects_requirements: [REQ-079, REQ-050, REQ-076, REQ-078]
    contradicts: [REQ-050]
    contradicts_note: "Solo si el negocio decide configurar aquí el IVA habitual: entonces dejaría de ser cierto que se aplica siempre el 21 por ciento por defecto. Lo resuelve A-06."
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: medium
    if_not_done: "La sección sigue prometiendo algo que no hace, y FUN-001 se queda sin los datos del taller."
    enters_cycle_via: A-06
  - id: FUN-004
    title: "Avisar de qué piezas se están acabando"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "El taller no sabe que se le acaba una pieza hasta que la necesita y no la tiene. Quien hace el pedido al proveedor lo hace de memoria."
    what: "Que cada pieza tenga un mínimo por debajo del cual se quiere reponer, y que la aplicación muestre la lista de las que están en ese caso."
    value: "Convierte el stock, que ya se conoce, en una decisión de compra. Evita el trabajo parado y las compras de urgencia."
    source: evidence
    evidence_refs: [DOC-06/§6.1, DOC-06/§4/B.2]
    evidence_status: "sin cambios; la viñeta de DOC-06 1.2.0 está enunciada igual que en 1.0.0"
    affects_requirements: [REQ-018, REQ-021, REQ-022]
    contradicts: []
    impact: medium
    difficulty: low
    business_value: medium
    size: small
    confidence: high
    if_not_done: "El taller sigue comprando de memoria; el stock sigue sirviendo solo para consultarlo."
    not_to_confuse_with: "La decisión de DOC-04/Q-02 bloquea el consumo sin existencias en el momento de anotarlo; esta propuesta avisa antes de llegar a cero. Son complementarias, no la misma."
    enters_cycle_via: A-06
  - id: FUN-005
    title: "Que la nómina proponga el salario bruto del empleado"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Cada mes hay que teclear a mano el salario bruto de cada empleado aunque su ficha guarde el salario base. Le pasa a quien cierra el mes, una vez por empleado, y cada tecleo es una posible errata en un importe que se paga."
    what: "Que el bruto venga propuesto a partir del salario base del empleado y se pueda cambiar cuando ese mes no coincida."
    value: "Quita un tecleo repetitivo al mes por empleado y su error asociado, y le da uso a un dato que hoy se rellena para nada."
    source: evidence
    evidence_refs: [DOC-04/Q-05, DOC-06/§6.1, DOC-06/§4/C.5]
    evidence_status: "sin cambios; las tres citas siguen exactas en DOC-06 1.2.0"
    affects_requirements: [REQ-064, REQ-069]
    contradicts: []
    impact: low
    difficulty: low
    business_value: medium
    size: small
    confidence: high
    if_not_done: "Se sigue tecleando el bruto cada mes. Es la propuesta cuyo no hacerla duele menos."
    enters_cycle_via: A-06
  - id: FUN-006
    title: "Saber cuánto gana el taller en cada trabajo"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "El taller apunta lo que le cuesta cada pieza además de lo que cobra, pero ninguna pantalla dice cuánto se ha ganado en un albarán o en una factura. El dueño lo calcula con una calculadora al lado."
    what: "Mostrar junto a lo que se cobra al cliente lo que ha costado el material y la diferencia entre ambos, en el albarán y en la factura."
    value: "Da al taller la única cifra de negocio que hoy no tiene: si gana o no gana. Y convierte en útil un dato que ya se rellena."
    source: evidence
    evidence_refs: [DOC-04/Q-01, DOC-06/§6.1, DOC-06/§4/B.1, DOC-06/§4/A.17, DOC-06/§5, DOC-06/§7]
    evidence_status: >-
      gana dos citas. La tarea A.17 de DOC-06 1.2.0 se lo dice ya al usuario dentro de «si los
      importes no te cuadran», y el apartado 5 recoge la pregunta frecuente «¿para qué sirven el
      coste y la unidad de una pieza?».
    affects_requirements: [REQ-018, REQ-021, REQ-053]
    contradicts: []
    contradicts_note: "El margen se muestra aparte y no entra en la base de la factura, así que REQ-049 sigue siendo cierto tal cual."
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: medium
    if_not_done: "El taller sigue facturando sin saber su margen y el coste sigue siendo un campo que se rellena para nada."
    enters_cycle_via: A-06
  - id: FUN-007
    title: "Poder decir en qué punto está un trabajo"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Un albarán solo puede estar pendiente de facturar o facturado. Quien mira el listado para saber qué hay hoy en el taller no distingue un coche que se está reparando de uno acabado esperando a que lo recojan."
    what: "Que el albarán refleje el punto real del trabajo, con las situaciones que decida el taller. El listado de albaranes ya se filtra por situación, así que el sitio donde enseñarlas existe."
    value: "Convierte el listado de albaranes en la foto del taller de hoy y no solo en la lista de lo que queda por cobrar."
    source: evidence
    evidence_refs: [DOC-04/Q-07, DOC-06/§6.1, DOC-06/§3]
    evidence_status: >-
      se acota. DOC-06 1.2.0 §3 y REQ-025 confirman que el listado de albaranes ya tiene filtro
      por situación. En 1.0.0 la propuesta pedía construir ese filtro; ahora solo pide las
      situaciones. El alcance se estrecha.
    affects_requirements: [REQ-025, REQ-028, REQ-045]
    contradicts: [REQ-028, REQ-045]
    contradicts_note: "REQ-028 dejaría de ser cierto si el albarán naciera en otra situación, y REQ-045 habría que reformularlo diciendo desde qué situaciones se puede facturar."
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: low
    if_not_done: "Puede que no pase nada: es posible que el taller trabaje de verdad con dos situaciones. DOC-04/Q-07 sigue sin respuesta y es lo primero que A-06 debe preguntar."
    enters_cycle_via: A-06
  - id: FUN-008
    title: "Anotar el material que entra, en vez de recontar el stock entero"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Cuando llega material del proveedor hay que escribir a mano el stock total resultante, sumando mentalmente lo que había y lo que llega. Si entretanto alguien anota esa pieza en un albarán, la cuenta ya no sale."
    what: "Poder anotar las unidades que entran y que la aplicación sume, en lugar de teclear el total."
    value: "Quita una cuenta mental hecha con el albarán a medias y evita que un descuadre de stock se arrastre. Complementa FUN-004."
    source: opinion
    evidence_refs: [DOC-06/§4/B.2, DOC-06/§4/B.3]
    opinion_note: "Ningún documento declara esto una carencia, y se ha vuelto a comprobar contra DOC-06 1.2.0: no aparece en la lista del apartado 6.1. Lo citado es la fricción descrita en el manual. Fíltrala como opinión."
    evidence_status: "sin cambios; sigue sin respaldo documental y sigue siendo la única de criterio propio"
    affects_requirements: [REQ-018, REQ-022]
    contradicts: []
    impact: low
    difficulty: low
    business_value: low
    size: small
    confidence: medium
    if_not_done: "Se sigue recontando a mano, que es lo que se hace hoy y funciona mientras el taller sea pequeño."
    enters_cycle_via: A-06
considered_and_not_proposed:
  - what: "Los avisos de error llegan siempre en catalán aunque la interfaz esté en castellano"
    origin: DOC-16/§6.1
    decision: no_proposal
    why: >-
      REQ-076 ya exige que la interfaz se presente en castellano mientras el usuario no elija
      otro idioma. Cuando existe requisito vigente y el sistema no lo cumple, es defecto y no
      funcionalidad ausente. Va a A-14 como confirmación del candidato BUG-005.
  - what: "Corregir una errata de un albarán ya facturado"
    origin: DOC-06/§6.1
    decision: no_proposal
    why: >-
      Es la cara operativa del evolutivo de factura rectificativa ya decidido en DOC-04/Q-06,
      de alcance grande. Proponerlo aparte sería trocear con otro nombre algo ya encargado.
  - what: "Un aviso de nóminas del mes sin registrar"
    origin: DOC-06/§6.1
    decision: no_proposal
    why: >-
      Sale de la misma viñeta que FUN-004 y nadie ha declarado que al taller se le olviden las
      nóminas. Si A-06 ve que se echa en falta al refinar FUN-004, que salga de ahí.
findings_for_others:
  - target: A-14
    status: abierto
    note: >-
      Confirmado desde el lado del usuario que el candidato a BUG-005 es defecto y no
      funcionalidad: los avisos de error llegan siempre en catalán y REQ-076 dice que la interfaz
      se presenta en castellano mientras el usuario no elija otro idioma. A-15 lo ha valorado como
      posible propuesta y no lo propone. DOC-24 1.0.0 sigue sin censarlo. Ahora lo señalan dos
      piezas: DOC-16 2.0.0 §6.2 lo mantiene abierto y §6.1 da por buena esta lectura. Lectura de
      código en 44748fb, sin reproducir por ninguna de las dos.
  - target: A-12
    status: recogido_sin_decidir
    landed_in: DOC-16/§3.0, MEJ-004
    note: "No hay comprobación común de los datos que se guardan: DOC-24 documenta que BUG-001, BUG-002 y BUG-003 son el mismo patrón repetido. DOC-16 2.0.0 lo eleva a patrón medido en §3.0 y responde con MEJ-004, que sigue proposed. A-15 no opina sobre esa decisión: es técnica y es de A-12."
  - target: A-12
    status: recogido_en_parte
    landed_in: DOC-16/§3.0, MEJ-004
    note: "Hay reglas que solo se cumplen porque la operación no existe. DOC-24/DISC-001 y la nota de BUG-004: la inmutabilidad de la factura no está implementada, simplemente no hay forma de modificarla, y el evolutivo de factura rectificativa (Q-06) va a construir esa forma. DOC-16 clasifica BUG-004 en la misma familia, pero el matiz —la protección se evapora el día que exista la operación— no consta escrito allí, y es lo que lo hace urgente."
  - target: A-12
    status: recogido_y_decidido
    landed_in: MEJ-005
    note: "El entorno de pruebas no se puede dejar limpio desde la aplicación: DOC-24/test_data_left_behind documenta una factura de 114.835,05 € y su albarán imposibles de eliminar por ningún camino. MEJ-005 lo recoge citando esa misma factura y está accepted desde el 2026-08-17. Hallazgo cerrado por parte de A-15."
  - target: A-12
    status: recogido_sin_decidir
    landed_in: MEJ-004
    note: "La comprobación de importes no negativos falta a la vez en pantalla y en servidor, verificado deliberadamente en DOC-24/BUG-003. No es una validación de pantalla sorteable: no existe en ningún sitio. Es evidencia de MEJ-004, que sigue proposed."
  - target: A-03
    status: abierto
    priority: alta
    note: "DOC-06/Q-21 lleva dos rondas pedida y sigue sin respuesta: no consta si hoy se puede imprimir o exportar un albarán o una factura. De ello depende cómo se refine FUN-001, segunda propuesta recomendada, y es lo que explica su confianza medium. Si existiera alguna forma de sacar la factura de la pantalla, la propuesta se estrecharía al formato entregable. Afecta a REQ-052 y REQ-053. Nota de oportunidad, no de prioridad: MEJ-001 (accepted) va a abrir esas mismas pantallas; si vale la pena mirarlo de paso lo decide A-07, no A-15."
  - target: A-03
    status: abierto
    note: "DOC-06/Q-20 pregunta si los listados de piezas, albaranes, facturas, personal y nóminas tienen búsqueda, ordenación y paginación. El apartado 3 de DOC-06 1.2.0 solo se las atribuye a Clientes y Vehículos, y por herencia de REQ-001 y REQ-009, no por haberlo verificado. Si no las tienen, es propuesta con evidencia para la próxima ronda de DOC-25; si las tienen, es un hueco de DOC-04. Afecta a REQ-018, REQ-025, REQ-052, REQ-056 y REQ-063."
  - target: A-03
    status: abierto
    note: "DOC-04/Q-08 no es una duda de negocio sino una comprobación: el idioma y el tema por defecto son las dos únicas reglas que vienen de una especificación y no del comportamiento observado. Afecta a REQ-076 y REQ-078, y gana interés porque el candidato a BUG-005 toca REQ-076 desde otro ángulo."
summary:
  new: 0
  still_open: 8
  rejected_respected: 0
  by_source: { evidence: 7, opinion: 1 }
  by_status: { proposed: 8, accepted: 0, rejected: 0, implemented: 0, superseded: 0 }
  proposals_changed_this_round: 0
  evidence_changed_this_round: 0
  citations_verified: 5
  citations_fixed: 1
  ids_requested_from_S12: 0
  not_proposed_already_in_cycle: 6
  not_proposed_not_mine: 6
  not_proposed_by_judgement: 6
  upstream_decisions_evaluated: 3        # MEJ-001, MEJ-003 y MEJ-005; ninguna cierra una FUN-nnn
  provenance_fixes: 3
  rounds_without_new_proposals: 2
```

---

**Nota de vigencia.** Este documento se ha escrito sobre `DOC-06-MANUAL-USUARIO`
**1.2.0**, `DOC-04-FUNCIONAL` **1.2.0**, `DOC-01-BASE-ASIS` **1.0.0**,
`DOC-24-BUGS` **1.0.0** y el apartado 6 de `DOC-16-ROADMAP` **2.0.0**, en el
commit `44748fb`. **No se ha leído `DOC-02-TECNICA`**, y no por descuido: el
contrato de A-15 lo prohíbe. Las versiones y los hashes están en el front-matter
para que `S-16` pueda comprobarlos sin leer esta línea.

**Nada de esto está decidido.** `status: draft`. Las ocho propuestas llevan **dos
rondas esperando** y **ninguna decisión de negocio ha recaído sobre ellas
todavía**. El 2026-08-17 se decidieron tres mejoras técnicas; ese mismo día, aquí
no se decidió nada. Mientras eso no cambie, las próximas rondas de A-15 solo
podrán repetir lo mismo con la procedencia más fresca, y **un documento que se
repite deja de leerse**. Prioriza negocio; A-15 solo propone y ordena, y cada
propuesta entra en el ciclo por `A-06 · Refinamiento`, que es donde se resuelve
hablando lo que aquí queda ambiguo.
