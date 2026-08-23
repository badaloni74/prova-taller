---
doc_id: DOC-08-HIST
doc_name: DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client-HIST
main_document: docs/DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md
version: 2.2.0
version_note: >-
  este fichero declara la version del documento que acompana, no una numeracion propia.
  Convencion propuesta por A-05 · Coherencia y trazabilidad y adoptada el 2026-08-17. En 2.0.0
  la version figuraba como `document_version` y `current_version`, y **S-16 no lee ninguno de
  los dos**: aviso `sin_version` sobre este fichero. El campo se llama `version`. Es la misma
  correccion que DOC-25-PROPUESTAS-FUNCIONALES-HIST.md aplico antes por el mismo aviso
document_version: 2.2.0     # alias historico de `version`; se mueven juntos
current_version: 2.2.0      # alias historico de `version`; se mueven juntos
evolutivo_id: EVO-001
status: draft
generator: A-06 refinamiento / intake
generator_version: "1.0"
generated_at: 2026-08-23T13:10:00+02:00
language: es
purpose: >-
  historial de versiones de este DOC-08. El documento principal refleja solo el estado actual y no
  reproduce nada de lo que hay aqui. La procedencia —el bloque `inputs` con version y hash de cada
  entrada— se queda en el documento principal y no se duplica aqui
---

# DOC-08 · `EVO-001` · Historial de versiones

Una entrada por versión, de la más nueva a la más antigua.

**Qué es cada tipo de salto** en un documento de refinamiento, donde lo que el lector consume
son los criterios de aceptación:

| Tipo | Cuándo |
|---|---|
| **MAJOR** | Una decisión pendiente se resuelve, o cambia el comportamiento pedido, y con ello **algo de lo ya escrito deja de ser cierto**: un criterio se reformula, cambia de vía de comprobación o deja de ser alcanzable como estaba. Cambia lo que el lector puede dar por decidido |
| **MINOR** | Nacen criterios o bordes nuevos, o se precisa el alcance, **sin que nada de lo anterior deje de valer** |
| **PATCH** | Correcciones que no tocan el fondo: erratas, citas, procedencia, hashes |

La escala es la misma idea que A-15 usa en `DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`, traducida a
lo que aquí manda: allí el disparador de MAJOR es que una propuesta cambie de estado por
decisión de negocio; aquí, que lo haga una decisión pendiente.

---

## 2.2.0 — 2026-08-23

**MINOR.** Ningún comportamiento pedido cambia, ningún criterio se reformula, cambia de vía o
gana o pierde una precondición. `S-16 · Cascada de obsolescencia` marcó la 2.1.0 como caducada
por tres entradas de procedencia; se releyeron las tres antes de tocar nada, siguiendo el
contrato de A-06: **entrevistar solo si algo cambia el `Dado`/`Cuando`/`Entonces` o las
precondiciones**. No hizo falta entrevista.

**Por qué MINOR y no MAJOR.** Ninguna decisión pendiente se resuelve —`PD-002` y `PD-003`
siguen abiertas—, y ningún criterio deja de significar lo que significaba.

**Por qué MINOR y no PATCH.** Porque no es solo resello de hashes: nace un apartado nuevo
(4.5) con información que antes no estaba, y dos afirmaciones del documento —una en el
apartado 3, otra en el 4.1— quedan corregidas porque el hecho que citaban cambió realmente.

**Qué cambia**

| Dónde | Cambio |
|---|---|
| Front-matter, `DOC-01` | 1.0.0 → 1.1.0. **Resello sin efecto sobre el fondo**: A-02 confirma que ningún actor, caso de uso, regla de negocio ni entrada del glosario cambia de enunciado; el salto cierra una pregunta ya recogida en `DOC-04` y corrige el árbol de documentos de `DOC-01` §6 |
| Front-matter, `DOC-04` | Mismo `version` (1.2.0), hash distinto: se resincronizó tras el resello de `DOC-01`, sin cambio de contenido de negocio |
| Front-matter, `DOC-05` | 1.5.0 → 1.6.0. **Este sí toca contenido citado.** El Anexo de la 1.6.0 reclasifica `TC-045`, `TC-063` y `TC-064` de `verification_path: ui` a `service`, confirmado empíricamente por `S-10` |
| **Apartado 3** (corregido) | La nota sobre `TC-064` («declara una vía que no puede ejecutar») pasa a pretérito y se añade que `DOC-05` 1.6.0 ya lo reclasificó a `service` el 2026-08-21, antes de esta versión. La clasificación está corregida; que exista cobertura automatizada real es otra cosa y sigue sin ser competencia de A-06 |
| **Apartado 4.1** (corregido) | La frase «`TC-041`, hoy el único caso de `DOC-05` que no se ejecuta entero por la interfaz» deja de ser cierta: desde `DOC-05` 1.6.0 le acompañan `TC-045`, `TC-063` y `TC-064`. Ninguno es caso de `EVO-001`; son precedente y contexto, no cambia ningún criterio |
| **Apartado 4.5** (nuevo) | Cita los cuatro riesgos silenciosos nuevos de `DOC-09` 2.0.0 —`RS-03` a `RS-06`— y dice, uno por uno, por qué ninguno reformula un criterio: lo que describen ya está exigido por el comportamiento observable que los criterios ya piden. Son avisos de implementación para S-04 y de fiabilidad para A-08, no ambigüedad de negocio |
| Apartado 5, punto 1 | Se añade una frase citando `RS-03` (el formulario de alta y el de edición son el mismo componente): precisa por qué la frontera «crear ≠ editar» importa, no cambia el alcance |
| Apartado 6.1 | Se añade una frase citando `RS-06` (el mensaje heredará catalán fijo y se mostrará bajo el campo de vehículo si no se decide nada): precisa el pendiente ya declarado, no abre uno nuevo ni lo bloquea |
| Front-matter, `DOC-09` | 1.0.0 → 2.0.0. Los hallazgos de la 1.0.0 ya estaban incorporados desde la 2.1.0; se añade `accuracy_caveat`: la 2.0.0 de `DOC-09` declara consumir `DOC-05` 1.6.0 pero su propio cuerpo sigue citando cifras de la 1.5.0 (109 `ui` / 1 `service`). No se hereda esa cifra: se verificó directamente contra `DOC-05` 1.6.0 |
| Bloque `evolutivo` (yaml), `related_questions.Q-18.still_true` | Se añade que `DOC-05` 1.6.0 ya corrigió la clasificación de `TC-064` |
| Bloque `evolutivo` (yaml) | Nuevo `doc09_v2_review`: conclusión explícita de por qué no hizo falta entrevista, la corrección de `DOC-05`, los cuatro `RS-nn` citados y el `accuracy_caveat` sobre `DOC-09` |
| `consumers.A-07` | `consumed_version` pasa de 2.0.0 a 2.1.0 —era un dato desactualizado: `DOC-09` 2.0.0 declara haber leído la 2.1.0 de este documento, no la 2.0.0—, y el `revisit` se reescribe para la 2.2.0 |
| Front-matter, `registro-ids.json` | Se resella el hash tras la actividad de otros agentes. No se ha pedido ningún identificador nuevo a S-12 |

**Qué NO cambia.** El comportamiento pedido, los once criterios en lo que exigen, sus vías de
comprobación, sus precondiciones de datos (`DP-001` a `DP-003`), `affects_requirements`,
`contradicts`, `scope`, `PD-002` y `PD-003` —siguen abiertas y sin bloquear— y el `gate`, que
sigue **`pending`**.

---

## 2.1.0 — 2026-08-17

**MINOR.** Ningún comportamiento pedido cambia. Se recogen tres hechos de fuera: `Q-18` se
cerró, `DOC-09` existe, y `S-16` señaló dos declaraciones de procedencia caducadas.

**Por qué MINOR y no MAJOR.** La escala de este documento reserva MAJOR para cuando una
decisión pendiente se resuelve o cambia el comportamiento pedido, **y con ello algo de lo ya
escrito deja de ser cierto**. Aquí no se ha resuelto ninguna decisión pendiente —`PD-002` y
`PD-003` siguen abiertas—, el comportamiento exigido por los once criterios es exactamente el
mismo, ninguno cambia de vía de comprobación y ninguno deja de ser alcanzable. Lo que cambia
en `AC-010` es su **precondición**: gana el «al menos dos vehículos» que hacía falta para
poder afirmarlo. Nadie que leyera la 2.0.0 y lo implementara así ha construido nada
equivocado; lo que no podía era demostrarlo con los datos de ejemplo.

**Por qué MINOR y no PATCH.** Porque no es errata ni resello: un criterio gana una
precondición sin la cual no era verificable, y nace un apartado nuevo (4.3) con requisitos de
entorno que antes no estaban escritos en ninguna parte.

**Qué cambia**

| Dónde | Cambio |
|---|---|
| **Apartado 4.2** (reescrito) | `Q-18` está **cerrada** (A-03, 2026-08-17), en dos mitades: la factual —la vía de servicio existe, está usada y detrás no hay defensa, con reproducción de A-14 y `BUG-003`— y la de método —*un caso va por servicio solo cuando el vector no existe en la interfaz*—. **La advertencia no se borra**: era correcta, y ahora dice cómo quedó. El riesgo que anunciaba, que `AC-002` se quedara sin forma de comprobarse, **no se ha materializado**. Se añade que `S-17 · Automatizador QA de servicio` (Postman, `automation/api/`) valida datos y efectos laterales: los criterios de solo-servicio dejan de ser inautomatizables. Y se declara la divergencia de vocabulario con A-03 (vector frente a criterio completo) para que no se lea como desacuerdo |
| Apartado 4.1 | Nota final: los seis criterios de servicio ya no son una excepción por justificar, sino aplicación de una política escrita |
| **AC-010** (precondición) | El `Dado` exige ahora que C1 tenga **al menos dos vehículos**, y el `Entonces` que aparezca **más de uno**. Con un vehículo por cliente, AC-010 era indistinguible de AC-011 y también de una implementación que no filtrara nada. Lo detectó `DOC-09` 4.3 |
| AC-001, AC-011 | Declaran la precondición de datos que exigen (`DP-001`, `DP-003`). Su enunciado no cambia |
| **Apartado 4.3** (nuevo) | Qué datos hacen falta para que estos criterios se puedan verificar: `DP-001`, `DP-002` y `DP-003`, con dueño (S-06, vía `DOC-13`). Identificadores **locales**, no anclas de `registro-ids.json`. No van al apartado 6 porque no hay nada que decidir: es entorno, no negocio |
| **Apartado 4.4** (nuevo) | El `scope: small` de este documento y el `effort_signal: medium` de `DOC-09` **no se contradicen**: A-07 dice que el código sería `small`; lo que empuja a `medium` es el coste de verificarlo. A-06 no cambia su `scope`, que viene declarado de `DOC-04` y no es una estimación |
| Apartado 3 | `REQ-046` gana la confirmación en código que aporta `DOC-09`: la comprobación resuelve el cliente atravesando el vehículo al emitir y **la línea siguiente escribe con él el destinatario**. Cambia el peso de la afirmación, no la afirmación |
| Apartado 5.2 y `PD-002` | Se puede **dimensionar**: el cambio de propietario se escribe sin mirar albaranes pendientes, el componente está a un salto y el acoplamiento ya existe en ese mismo fichero. Sigue abierta, fuera de alcance y sin bloquear |
| Front-matter | `DOC-05` pasa de **1.4.1 a 1.5.0** —aviso de `S-16 · Cascada de obsolescencia`; el resello no es cosmético, porque en medio `Q-18` cambió de estado—, entra **`DOC-09` 1.0.0** como entrada leída de vuelta, y se resella `registro-ids.json`. No se ha pedido ningún identificador nuevo a S-12 |
| Este fichero | Declara **`version`**, que es el campo que `S-16` lee. En 2.0.0 solo declaraba `document_version` y `current_version`; el aviso `sin_version` era correcto |

**Qué NO cambia.** El comportamiento pedido, los once criterios en lo que exigen, el reparto
de vías de 4.1, `affects_requirements`, `contradicts`, el `scope` declarado, y `PD-002` y
`PD-003`, que siguen abiertas y sin bloquear. `status` sigue `draft` y el `gate` sigue
`pending`: es del peticionario de negocio y no se ha ejercido.

---

## 2.0.0 — 2026-08-17

**MAJOR.** El peticionario de negocio resolvió **PD-001**: el desplegable de vehículos del
albarán **filtra** y muestra solo los del cliente actual del albarán. No se muestran todos para
rechazar después.

**Por qué MAJOR y no MINOR.** La 1.0.0 decía expresamente que sus criterios estaban escritos
«sin fijar si el vehículo de otro cliente se puede llegar a seleccionar o no» y que valían para
las dos formas. Eso ha dejado de ser cierto: ahora describen una sola, y **AC-002 —el criterio
principal, el que protege a quién se factura— ya no se puede ejercer desde la interfaz**. Quien
leyó la 1.0.0 y dio por hecho que el rechazo se comprobaría en pantalla leyó algo que hoy no
vale. Ese es exactamente el caso que la escala reserva para MAJOR.

**Qué cambia**

| Dónde | Cambio |
|---|---|
| Apartado 4, preámbulo | Se sustituye la advertencia de «vale para las dos formas» por la forma decidida, más el aviso de que **filtrar no es comprobar**: el filtro resuelve la experiencia de uso, no el defecto. `BUG-002` entró por el servicio, con el formulario fuera de juego |
| **AC-010** (nuevo) | El desplegable solo ofrece vehículos del cliente del albarán. Camino feliz de la forma decidida |
| **AC-011** (nuevo) | Borde de AC-010: un cliente con un solo vehículo no se queda con el selector vacío ni permite dejar el albarán sin vehículo. Filtrar una lista es la forma fácil de vaciarla, y eso rompería REQ-027 |
| **AC-002** (reformulado) | El comportamiento exigido no cambia: el rechazo al guardar sigue siendo obligatorio. Lo que cambia es la vía: el intento ya no se puede componer desde la pantalla, así que se comprueba por el servicio |
| **AC-004** (reformulado) | Igual: el rechazo que no guarda nada a medias pasa a comprobarse por el servicio |
| **AC-007** (reformulado) | Deja de ser «un borde más» y pasa a ser el criterio que **impide dar por terminada la implementación con solo filtrar** |
| Apartado 4.1 (nuevo) | Tabla de vías: qué se comprueba por interfaz, qué por servicio y qué es mixto. Cuatro criterios quedan solo por servicio y otros dos lo están en parte. A-03 lo necesita para escribir los casos |
| Apartado 4.2 (nuevo) | Efecto sobre `DOC-05/Q-18`: no la responde, pero la hace más urgente, y dice por qué en lugar de darlo por hecho |
| Apartado 6 | Se parte en 6.1 resueltas y 6.2 pendientes. PD-001 pasa a resuelta con fecha y quién decidió; se deja escrito lo que la decisión **no** dice y no se ha inventado (el texto del mensaje) |
| Front-matter | `inputs` gana `DOC-05-PLAN-PRUEBAS.md` 1.4.1 —solo citado, para Q-18 y el precedente de TC-041— y la decisión de negocio del 2026-08-17. Se resella el hash de `registro-ids.json` |
| Nota de contrato final | La limitación de S-12 queda resuelta: el bloque `evolutivo` existe y `EVO-001` está censado. El registro va por 311 anclas |

**Qué NO cambia.** El comportamiento pedido —impedir que un albarán cambie de cliente— es el
mismo. `affects_requirements` sigue en REQ-040 y REQ-046, `contradicts` sigue en REQ-040, y el
alcance declarado sigue siendo el de `DOC-04` (`small`), que no es una estimación de A-06.
**PD-002** y **PD-003** siguen abiertas y ninguna bloquea. `status` sigue en `draft`: el gate es
del peticionario de negocio y no se ha ejercido.

---

## 1.0.0 — 2026-08-17

**Versión inicial.** Refinamiento de `DOC-04/Q-10`, respondida por negocio el 2026-08-16 con
`resolution: gap_confirmed`, y confirmada en el sistema desplegado por `DOC-24/BUG-002`
(`critical`). Identificador `EVO-001`, pedido a S-12 con `next --prefix EVO`.

Nueve criterios de aceptación (AC-001 a AC-009), ocho puntos fuera de alcance y tres decisiones
pendientes. Escrita **sin entrevista**: la ejecución corría en segundo plano y no admitía
preguntas, de modo que todo lo resoluble con `DOC-01` y `DOC-04` se resolvió declarando su
apoyo, y lo que exigía una persona quedó en decisiones pendientes sin inventar la respuesta.

Se dejó constancia de dos límites del contrato: la entrevista no celebrada y que S-12 no sabía
escribir `EVO-001` en el registro. El segundo está resuelto desde la 2.0.0.
