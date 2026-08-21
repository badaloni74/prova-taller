---
doc_id: DOC-25-HIST
doc_name: DOC-25-PROPUESTAS-FUNCIONALES-HIST
main_document: docs/DOC-25-PROPUESTAS-FUNCIONALES.md
version: 1.1.1
version_note: >-
  este fichero declara la version del documento que acompaña, no una numeracion propia.
  Convencion propuesta por A-05 · Coherencia y trazabilidad y adoptada tras el aviso
  `sin_version` de S-16 sobre DOC-25-HIST. En 1.1.0 la version figuraba como `current_version`,
  que S-16 no lee: el campo se llama `version`
status: draft
generator: A-15 propuestas de funcionalidad
generator_version: "1.1"
generated_at: 2026-08-17T12:40:00+02:00
language: es
purpose: >-
  historial de versiones de DOC-25. El documento principal refleja solo el estado actual y no
  reproduce nada de lo que hay aquí. La procedencia —el bloque `inputs` con version y hash de
  cada entrada, que S-16 necesita— se queda en el documento principal y no se duplica aquí
---

# DOC-25 · Historial de versiones

Una entrada por versión, de la más nueva a la más antigua.

**Qué es cada tipo de salto**, tal como los aplica A-15:

| Tipo | Cuándo |
|---|---|
| **MAJOR** | Una propuesta cambia de estado por decisión de negocio, se retira o se sustituye por otra. Cambia lo que el lector puede dar por decidido |
| **MINOR** | Nacen propuestas nuevas, o cambia la evidencia, el alcance o una señal (`confidence`, `size`, `impact`) de alguna viva. Nada de lo ya leído deja de ser cierto |
| **PATCH** | Correcciones que no tocan el fondo de ninguna propuesta: citas rotas, erratas, procedencia |

---

## 1.1.1 — 2026-08-17 · PATCH

**Puesta al día contra `DOC-16-ROADMAP` 2.0.0 y dos correcciones de procedencia.
Ninguna propuesta cambia: ni de estado, ni de evidencia, ni de señal.**

### Por qué se regenera

Lo detectó otra vez **`S-16 · Cascada de obsolescencia`**: DOC-25 1.1.0 declaraba
`DOC-16` en **1.0.0** y `A-12 · Mejoras/Roadmap` lo había llevado a **2.0.0**. El
salto es MAJOR porque el 2026-08-17 el propietario del proyecto decidió sobre las
seis mejoras técnicas —**MEJ-001, MEJ-003 y MEJ-005 pasan a `accepted`**;
MEJ-002, MEJ-004 y MEJ-006 siguen `proposed`; ninguna rechazada—.

S-16 avisaba además de dos cosas propias de A-15: el `-HIST.md` no declaraba
`version`, y `DOC-02` figuraba en `inputs` sin versión.

### Por qué PATCH y no MINOR ni MAJOR

**No es MAJOR** porque ninguna propuesta ha cambiado de estado: las ocho siguen
en `proposed` y nadie ha decidido sobre ellas. **Que se hayan aceptado tres
mejoras técnicas no decide ninguna `FUN-nnn`.**

**No es MINOR** porque no nace ninguna propuesta y **ninguna de las ocho cambia
de evidencia, de alcance ni de señal**. Se comprobó una a una: ni `confidence`,
ni `size`, ni `impact`, ni `business_value` se mueven. Un MINOR habría que
justificarlo con algo que negocio pudiera leer distinto, y no lo hay.

**Es PATCH** porque lo que cambia es procedencia, una cita literal y el estado de
los hallazgos enviados a otras piezas. Y tiene una consecuencia práctica que
conviene dejar escrita: **DOC-16 2.0.0 declara DOC-25 en 1.1.0, y por la regla de
S-16 un PATCH no invalida a quien lo consume.** Elegir MINOR habría dejado
obsoleto el roadmap por un cambio que no le afecta en nada.

### Qué ha cambiado

**1 · Las citas a DOC-16, verificadas una a una. Ninguna rota.** Era el riesgo
real del MAJOR y por eso se comprobó antes que nada.

| Cita | En 2.0.0 | Estado |
|---|---|---|
| `DOC-16/§6.1` | Sigue siendo el hallazgo a A-15 sobre los avisos en catalán, ahora marcado `encaminado` | Intacta |
| `DOC-16/§6.2` | Sigue siendo el hallazgo a A-14, candidato a `BUG-005`, y sigue abierto | Intacta |
| `DOC-16/§6.3` | Sigue siendo el hallazgo a A-15 sobre *Configuración*, marcado `encaminado` porque ya es `FUN-003` | Intacta |

**2 · Una cita literal corregida, la única de esta versión.** La ficha de
`FUN-003` reproducía a A-12 como «un módulo sin desarrollar **no es una mejora,
es funcionalidad**», que es la redacción de DOC-16 1.0.0. En 2.0.0 la frase es
«un módulo sin desarrollar **es funcionalidad, no una mejora**». Mismo sentido,
mismo fondo de la propuesta, cita ahora exacta.

**3 · Las tres mejoras aceptadas, valoradas una a una. Ninguna cierra una
`FUN-nnn`.** Nuevo apartado **5.5** del documento principal, escrito porque en la
próxima ronda alguien se lo volverá a preguntar:

| Aceptada | Conclusión |
|---|---|
| `MEJ-001` · identificadores de prueba | Va a abrir las pantallas donde vive `FUN-001`, pero no cambia ninguna pantalla, flujo ni texto. **No se propone nada por aprovechar el viaje**: eso es calendario y lo valora `A-07` |
| `MEJ-003` · pruebas del servidor y CI | Cambia lo que el equipo sabe, no lo que el taller puede hacer |
| `MEJ-005` · estado de base reproducible | **No cubre `FUN-002`**, y es la confusión más fácil del documento: repone datos de prueba, no el trabajo real del taller |

**4 · Los cuatro hallazgos dirigidos a `A-12`, contrastados contra DOC-16 2.0.0.**
Se comprobó si habían aterrizado, que es lo que hay que hacer con un hallazgo
enviado. Los cuatro tienen dueño técnico: tres en `MEJ-004` —que sigue sin
decidir— y uno en `MEJ-005`, **ya aceptado**, que queda cerrado por parte de
A-15. Ninguno se reenvía como novedad y **no hay hallazgos nuevos para A-12**.

**5 · Dos correcciones de procedencia.**

- **El `-HIST.md` declara `version`.** Convención de A-05 adoptada: este fichero
  declara la versión del documento que acompaña. En 1.1.0 el dato estaba, pero
  bajo `current_version`, que S-16 no lee.
- **`DOC-02-TECNICA` sale de `inputs`.** No era una entrada sin versión: era una
  entrada que no debía existir. **A-15 tiene prohibido leer DOC-02**, así que
  declararlo como entrada afirmaba consumir algo que no se consume. Pasa a
  `not_read_by_contract`, donde queda constancia de por qué no está.

**6 · El documento principal deja de reproducir su propio historial.** Los
apartados 1.1 y 1.2 de 1.1.0 eran un changelog dentro del documento de estado: la
tabla de equivalencia de la renumeración de DOC-06 y el detalle de qué cambió en
cada propuesta. Todo eso **ya vivía aquí**, en la entrada 1.1.0, y allí se
remite. Los apartados «Qué ha cambiado en esta ronda» de cada ficha pasan a
llamarse **«Estado de la evidencia»** y describen de qué está respaldada hoy la
propuesta, no qué pasó en una ronda concreta.

### Qué no ha cambiado

Las **ocho propuestas**, con su número, su texto, su estado `proposed` y todas
sus señales. La **recomendación**: `FUN-002`, `FUN-001`, `FUN-005`, tercer
documento seguido con el mismo orden. `DOC-06` en 1.2.0, `DOC-04` en 1.2.0,
`DOC-01` y `DOC-24` en 1.0.0, **los cuatro con el mismo hash**. El registro de
identificadores en FUN-008: **no se pidió `FUN-009`**, porque no había nada que
numerar.

**Segunda ronda consecutiva sin propuestas nuevas.** No es un descuido: ninguna
fuente de carencias ha cambiado. Lo que cambió fue el roadmap técnico, que no lo
es.

---

## 1.1.0 — 2026-08-17 · MINOR

**Regeneración contra `DOC-06-MANUAL-USUARIO` 1.2.0. Sin propuestas nuevas.**

### Por qué se regenera

Lo detectó **`S-16 · Cascada de obsolescencia`**, pieza nueva que compara las
versiones que un documento declara contra las reales: DOC-25 1.0.0 declaraba
haberse escrito sobre DOC-06 **1.0.0**, y el manual iba por **1.2.0**. No era un
descuido de procedencia: DOC-06 es la fuente principal de este documento y había
cambiado dos veces, una de ellas renumerando preguntas que aquí se citan.

### Por qué MINOR y no MAJOR ni PATCH

**No es MAJOR** porque ninguna propuesta ha cambiado de estado: las ocho siguen
en `proposed`, ninguna ha sido aceptada, rechazada, implementada ni sustituida.
Nada de lo que el lector de 1.0.0 daba por decidido ha dejado de serlo, entre
otras cosas porque no había nada decidido.

**No es PATCH** porque no se limita a arreglar citas. Tres propuestas cambian de
fondo aunque no de texto: `FUN-001` baja de confianza, `FUN-007` estrecha su
alcance y `FUN-002` y `FUN-003` incorporan evidencia que antes no tenían. Un
PATCH no debería mover una señal que negocio usa para priorizar.

### Qué ha cambiado

**1 · Citas corregidas — siete.** DOC-06 1.1.0 reclasificó trece de sus
veintitrés preguntas como citas de DOC-04 y renumeró seis. El apartado 5.2 de
este documento citaba el rango movido.

| Cita en 1.0.0 | Cita en 1.1.0 | De qué trata |
|---|---|---|
| `DOC-06/Q-14` | `DOC-06/Q-24` | Nombres de los botones de guardar, cancelar y confirmar |
| `DOC-06/Q-15` | `DOC-06/Q-25` | Textos de los mensajes de error |
| `DOC-06/Q-16` | `DOC-06/Q-26` | Cómo se editan y se borran las fichas |
| `DOC-06/Q-17` | `DOC-06/Q-27` | La pantalla de emisión de factura |
| `DOC-06/Q-18` | `DOC-06/Q-28` | Dónde está el conmutador de pago |
| `DOC-06/Q-19` | `DOC-06/Q-29` | La lista completa de datos de cliente y de empleado |
| `DOC-06/§6` | `DOC-06/§6.1` | El apartado 6 del manual se partió en 6.1 (carencias vivas) y 6.2 (cambios ya decididos). Todas las citas de A-15 se refieren a 6.1 |

**Citas verificadas y no movidas — cuatro.** `DOC-06/Q-20`, `Q-21`, `Q-22` y
`Q-23` conservan su número. Las dos importantes son `Q-21` y `Q-22`, evidencia de
`FUN-001` y `FUN-002`: A-04 las mantuvo a propósito y lo dejó escrito en
`DOC-06/§9.1` —«están citadas fuera por A-15 y moverlas rompería DOC-25»—.

**Citas añadidas — cinco.** `DOC-06/Q-30` (nueva en el manual, entra en 5.2 como
hueco de documentación), `DOC-06/§3`, `DOC-06/§5`, `DOC-16/§6.1` y `DOC-16/§6.3`.

**2 · Ninguna propuesta nueva.** Las catorce viñetas de `DOC-06/§6.1` —eran once
en 1.0.0— se repasaron una a una y ninguna quedó sin dueño: cinco remiten a los
evolutivos ya decididos, cinco son propuestas vivas, dos son decisiones de regla
y dos son decisiones de negocio documentadas. **No se pidió `FUN-009` a `S-12`.**
El registro sigue en FUN-008.

**3 · Cambios en las propuestas vivas.** Ninguna cambia de estado; cinco cambian
de evidencia.

| Propuesta | Cambio |
|---|---|
| `FUN-001` | `confidence` **high → medium**. DOC-06 1.2.0 convierte el apartado 6 en una lista explícita de carencias y la impresión no está en ella, porque `Q-21` dice que no se sabe si no existe o si solo no se documentó. 1.0.0 la dio por carencia cierta, en contra del mismo criterio con el que rechazó proponer la búsqueda en los listados. Se mantiene la propuesta porque el documento entregable no existe en ningún caso —falta la identidad fiscal del taller—, y la comprobación se pide a `A-03` |
| `FUN-002` | Evidencia reforzada. `DOC-06/§6.1` añade «ni de recuperarlo» a la viñeta de la ausencia de identificación |
| `FUN-003` | Evidencia reforzada por dos vías: `DOC-06/§6.1` añade «no está decidido qué contendrá», y `A-12` la deriva aquí en `DOC-16/§6.3` sin proponer nada él |
| `FUN-006` | Dos citas nuevas: la tarea A.17 y las preguntas frecuentes del apartado 5 |
| `FUN-007` | Alcance estrechado. El filtro por situación del listado de albaranes **ya existe** (`DOC-06/§3`, REQ-025); lo que faltaría son las situaciones. En 1.0.0 se pedía construir también el filtro |
| `FUN-004`, `FUN-005`, `FUN-008` | Sin cambios. Verificadas contra 1.2.0 |

**4 · Dos hallazgos de `A-12` valorados, ninguno convertido en propuesta.**
Los avisos de error que llegan siempre en catalán se descartan como funcionalidad
y se devuelven a `A-14`: `REQ-076` ya exige la interfaz en castellano por
defecto, así que es defecto y no hueco de producto. El módulo de Configuración ya
era `FUN-003` desde 1.0.0 y no necesita identificador nuevo.

**5 · Un hallazgo nuevo para `A-14`** —confirmación del candidato a `BUG-005`
desde el lado del usuario— y **uno nuevo para `A-03`**, marcado de prioridad
alta: comprobar `DOC-06/Q-21` antes de refinar `FUN-001`.

**6 · Se descarta explícitamente una candidata más**, el aviso de nóminas del mes
sin registrar, por salir de la misma viñeta que `FUN-004`. Las no propuestas por
criterio pasan de cinco a seis.

**7 · El historial sale del documento principal.** Cambio de contrato de A-15:
DOC-25 refleja solo el estado actual con su `version`, y todo el historial pasa a
este fichero. La procedencia —el bloque `inputs` con versión y hash— **se queda
en el documento principal**, porque es lo que `S-16` necesita para calcular qué
ha quedado obsoleto. Esta es la primera versión de este fichero y recoge también
la entrada de 1.0.0.

### Qué no ha cambiado

`DOC-04-FUNCIONAL` sigue en 1.2.0 con los mismos 79 requisitos y las mismas nueve
preguntas abiertas; `DOC-01` en 1.0.0; `DOC-24` en 1.0.0 con cuatro defectos. La
recomendación del apartado 2 mantiene el mismo orden: `FUN-002`, `FUN-001`,
`FUN-005`. Ningún `FUN-nnn` se renumera, y ninguno se renumerará nunca.

---

## 1.0.0 — 2026-08-16 · Primera versión

**Primera ronda de A-15 sobre app-taller.** No había documento anterior: ninguna
propuesta viva que arrastrar, ninguna aceptada que seguir hasta `DOC-08` y
ningún rechazo cuyo motivo respetar.

**Ocho propuestas, `FUN-001` a `FUN-008`**, numeradas por `S-12` con
`--prefix FUN` sobre un registro que hasta entonces no tenía ninguna. Siete
nacidas de evidencia citable y una —`FUN-008`— de criterio propio, marcada como
tal.

| ID | Título |
|---|---|
| `FUN-001` | Llevarse la factura en papel o en un archivo para dárselo al cliente |
| `FUN-002` | Poder guardar una copia de los datos del taller y recuperarla |
| `FUN-003` | Dar contenido a la sección *Configuración* |
| `FUN-004` | Avisar de qué piezas se están acabando |
| `FUN-005` | Que la nómina proponga el salario bruto del empleado |
| `FUN-006` | Saber cuánto gana el taller en cada trabajo |
| `FUN-007` | Poder decir en qué punto está un trabajo |
| `FUN-008` | Anotar el material que entra, en vez de recontar el stock entero |

**Dos reglas explícitas para no proponer de más**, en ausencia del filtro que dan
las rondas anteriores: no reproponer lo que el negocio ya decidió el 2026-08-16
—las seis respuestas de `DOC-04/§6.2` y los cuatro defectos de `DOC-24`—, y
distinguir «falta decidir una regla» de «falta construir algo», dejando lo
primero fuera del documento.

**Escrito sobre** `DOC-01` 1.0.0, `DOC-04` 1.2.0, `DOC-06` **1.0.0** y `DOC-24`
1.0.0, en el commit `44748fb`. Esa declaración de DOC-06 quedó obsoleta y es lo
que motivó la versión 1.1.0.

**Diecisiete descartes documentados con motivo**: seis carencias ya encaminadas,
seis preguntas abiertas que no eran de A-15 y cinco candidatas no propuestas por
criterio. **Seis hallazgos** para otras piezas: cuatro a `A-12` y dos a `A-03`.
