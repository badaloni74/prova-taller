---
doc_id: DOC-06-HIST
doc_name: DOC-06-MANUAL-USUARIO-HIST
of_document: DOC-06-MANUAL-USUARIO.md
version: 1.4.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-04 manual de usuario
generator_version: "1.2"
generated_at: 2026-08-28T00:00:00+02:00
language: es
---

# DOC-06 · Manual de usuario — historial de versiones

Este documento **no se lee para usar la aplicación**: es el historial de
`docs/DOC-06-MANUAL-USUARIO.md`, que solo refleja su estado actual. Aquí queda
qué cambió en cada versión, por qué, y la tabla de equivalencia de la
renumeración de preguntas de 1.0.0 a 1.1.0, que el documento principal ya no
reproduce.

Una entrada por versión, de la más nueva a la más antigua.

---

## 1.4.0 — 2026-08-28 (MINOR)

**Fuentes.** Regenerado contra `DOC-01-BASE-ASIS.md` **1.2.0** y
`DOC-04-FUNCIONAL.md` **1.3.0**. Las dos subieron de versión MINOR recogiendo el
mismo cambio de negocio, ya en producción (SPEC 06, `status: Implemented`): al
editar la cabecera de un albarán no facturado, el selector de vehículo solo
ofrece los del cliente actual del albarán, y cualquier intento de moverlo a un
vehículo de otro cliente se rechaza entero, sin guardar ni el vehículo, ni la
fecha, ni las notas. En DOC-01 es la regla `BR-ALB-10` y el caso `UC-ALB-06`
ampliado; en DOC-04 son los requisitos nuevos `REQ-080` (rechazo) y `REQ-081`
(selector filtrado).

**Qué cambió**

- **Tarea A.13 (Corregir la cabecera de un albarán), rehecha.** Pasa de advertir
  de un riesgo —«la aplicación te deja mover el albarán a otro cliente sin
  avisar, revísalo»— a describir que la aplicación lo impide: el selector solo
  muestra vehículos del cliente actual (paso 3), el intento de saltárselo se
  rechaza sin guardar nada, y se explica que para facturar a otro cliente hay
  que borrar el albarán y abrir uno nuevo. Nuevo apartado «Si algo va mal» para
  el rechazo al guardar. Cubre ahora `REQ-040`, `REQ-042`, `REQ-080` y `REQ-081`.
- **Tarea A.7 (Corregir los datos de un vehículo), aviso nuevo.** Cambiar el
  propietario de un vehículo se lleva con él sus albaranes pendientes de
  facturar. `BR-ALB-10` cierra la puerta del albarán pero no esta otra; el
  negocio aún no ha decidido qué hacer con ella (`DOC-04/Q-16`, abierta).
- **Apartado 2.** El párrafo «Este manual cuenta lo que la aplicación hace hoy»
  pasa de «seis cambios decididos y no hechos» a «uno hecho, cinco pendientes».
- **Apartado 5 (Preguntas frecuentes).** Dos preguntas nuevas: «Abrí un albarán
  al cliente equivocado, ¿puedo pasárselo a otro?» y «Cambié el propietario de
  un vehículo y sus albaranes pendientes se han ido con él, ¿es normal?». La
  respuesta de «Te dice que los albaranes son de clientes distintos» de A.16 se
  matiza: desde SPEC 06 casi no debería ocurrir.
- **Apartado 6.1.** Se retira el punto «Puedes mover un albarán al vehículo de
  otro cliente» (ya no es cierto) y se sustituye por «Cambiar el propietario de
  un vehículo arrastra sus albaranes pendientes», que sí es un límite actual.
- **Apartado 6.2.** De «seis cambios decididos» a «cinco»: la decisión sobre el
  cambio de cliente se marca como hecha y sale de la tabla. La lista de tareas
  que habrá que revisar el día que se construyan los evolutivos pendientes baja
  de once a diez (sale A.13).
- **Apartado 7 (Glosario).** La entrada «Albarà» añade que el vehículo solo
  puede cambiarse por otro del mismo cliente.
- **Apartado 8 (Trazabilidad).** DOC-04 pasa a 1.3.0; cobertura de 81 requisitos
  (eran 79). A.13 cubre dos requisitos más. `REQ-080` y `REQ-081` se añaden a la
  lista de requisitos que el usuario observa pero no ejecuta como tarea propia.
- **Apartado 9 (Preguntas abiertas).**
  - Pregunta propia nueva **Q-31**: qué ve el usuario cuando la aplicación
    rechaza el cambio de albarán a otro cliente, y si puede provocarlo desde la
    pantalla con el selector ya filtrado. Afecta a la tarea A.13 y a S-10
    (nombre del selector de vehículo; posible prueba negativa solo en servicio).
  - `DOC-04/Q-10` pasa de citada *(respondida)* a *(respondida e implementada)*:
    su hueco ya no existe y la tarea A.13 se ha rehecho por ella.
  - Se cita por primera vez `DOC-04/Q-16` (la fuga por la puerta del vehículo),
    desde la tarea A.7. Las citas suben de 17 a 18.
  - `Q-30` (nacida en 1.2.0) **sigue reclamada sin ancla**: A-04 no dispone de
    la herramienta `registry.js` de S-12. `Q-30` y `Q-31` quedan en
    `pending_registry_confirmation`.

**Por qué el salto es MINOR y no MAJOR.** Ninguna tarea se elimina ni se parte en
dos, y la operación de A.13 conserva sus pantallas y su secuencia (abrir el
albarán → editar la cabecera → guardar). Lo que cambia es que una advertencia se
convierte en una restricción real descrita, y que una fila del apartado 6.2 se
marca como hecha. Es el mismo criterio con el que DOC-01 y DOC-04 trataron este
cambio: MINOR.

**Por qué no es PATCH.** Cambia lo que la aplicación hace en una tarea y nace una
pregunta abierta nueva; no es solo redacción.

---

## 1.3.0 — 2026-08-23 (MINOR)

**Qué cambió**

- Front-matter regenerado contra `DOC-01-BASE-ASIS.md` 1.1.0. El contenido de
  negocio de DOC-01 no cambió (cierre de una pregunta ya resuelta y corrección de
  un comentario del árbol de carpetas), así que ninguna tarea se reescribe por
  esta subida.
- Se leyeron, por instrucción explícita de la cascada de obsolescencia,
  `specs/implemented/SPE-04-proteccio-enviaments-duplicats.md` y
  `specs/implemented/SPE-05-presentacio-imports-i-dates.md` — ya implementados, aunque no son
  fuente contractual habitual de este manual. Aportan tres comportamientos
  visibles para el usuario:
  - el botón de guardar se deshabilita y cambia a *Guardando…*/*Desant…*
    mientras la petición está en vuelo;
  - los importes se muestran con coma decimal y separador de miles (por
    ejemplo `1.360,00 €`);
  - la ficha de la factura muestra ahora el importe del IVA en euros, además
    del porcentaje, y la fecha del albarán se muestra como `DD/MM/AAAA`.
- Apartado 2: dos avisos nuevos (protección de doble envío al guardar; formato
  de importes y fechas).
- Tarea A.16, «Qué ves al terminar»: ahora menciona el importe del IVA en euros
  y el formato de importe con coma decimal y separador de miles.
- Tarea A.17, «Qué ves al terminar»: mismo tratamiento que A.16 — el importe
  del IVA en euros junto al tipo aplicado, y el formato de los tres importes.
- Pregunta frecuente «¿Qué IVA me va a aplicar?»: se añade que la factura ya
  muestra el importe del IVA en euros, así que no hace falta calcularlo a mano
  restando la base del total.
- El historial de versiones se separa a este fichero. El documento principal ya
  no reproduce la saga de renumeración de preguntas ni las tablas de
  equivalencia; queda solo aquí (ver 1.1.0 más abajo).

**Por qué el salto es MINOR y no PATCH.** Añade información nueva y observable
para el usuario (el importe del IVA en euros, el aviso de guardado en curso, el
formato de importes y fechas) que antes no estaba en el manual. No es solo una
corrección de redacción.

**Por qué no es MAJOR.** Ninguna tarea cambia de significado ni de pasos: los
botones, los campos y el orden de la operación siguen siendo los mismos. Es
información añadida, no un flujo rehecho.

---

## 1.2.0 — 2026-08-16 (MINOR)

**Qué cambió**

- Regenerado contra `DOC-04-FUNCIONAL.md` 1.1.0. REQ-031 se reformuló: ya no
  solo dice que una línea de albarán es de pieza o de mano de obra, sino qué
  pasa cuando la anotación no es de ninguno de los dos tipos — no llega a
  registrarse y el albarán conserva sus líneas y sus importes. Es información
  visible para el usuario, así que se incorporó a las tareas A.10 y A.11.
- Se añadió el apartado 6.2, «Seis cambios ya decididos que todavía no están
  hechos», recogiendo las seis respuestas de negocio del 2026-08-16 sobre
  preguntas abiertas de DOC-04 (`Q-02`, `Q-06`, `Q-10`, `Q-12`, `Q-14`, `Q-15`).
  Ninguna tarea se reescribió por estas respuestas: describen hacia dónde va la
  aplicación, no lo que hace hoy.
- `DOC-04/Q-14` y `DOC-04/Q-15` (recuento y filtro de pendientes de cobro y de
  pago) pasaron de *no citadas* a *citadas*, porque el nuevo apartado 6.2 sí
  tiene algo que decir sobre ellas.
- Pregunta nueva propia: `Q-30`, sobre qué ve el usuario cuando una anotación
  de línea es rechazada por no ser de pieza ni de mano de obra. Solicitada al
  registro y pendiente de confirmación en el momento de cerrar esta versión.
- La tabla de trazabilidad no cambió de forma (mismos 79 requisitos, mismas 32
  tareas): cambió cómo se explica REQ-031 dentro de A.10 y A.11.

**Por qué MINOR.** Información nueva y una pregunta nueva, sin reescribir
ninguna tarea existente ni cambiar el mapa de trazabilidad.

---

## 1.1.0 — 2026-08-15 (PATCH — renumeración, sin cambio de contenido)

**Qué cambió**

La versión 1.0.0 numeró sus preguntas abiertas del 1 al 23 por su cuenta, sin
pedir números libres al registro. Al sincronizar con `S-12 · s12-registro-ids`,
**19 de esos 23 números colisionaron** con preguntas ya reclamadas por otros
documentos del proyecto: `DOC-06/Q-14` eran los nombres de los botones de este
manual y `DOC-04/Q-14` era, para A-02, el recuento de cobros — mismo
identificador, dos preguntas distintas.

Como reclamante de la colisión, correspondía a DOC-06 renumerar y conservar el
número anterior en `previous_id`, sin tocar los identificadores de los demás
documentos.

**Tabla de equivalencia**, para quien haya citado los números de 1.0.0:

| En 1.0.0 | Desde 1.1.0 | De qué trata |
|---|---|---|
| `DOC-06/Q-01` … `DOC-06/Q-13` | `DOC-04/Q-01` … `DOC-04/Q-13`, **mismo número, otro dueño** | Trece de las preguntas «propias» de 1.0.0 en realidad no eran propias: eran citas mal formateadas de preguntas de DOC-04. Dejaron de reclamar número propio y pasaron a citarse con el número **de su dueño real**, A-02 |
| `DOC-06/Q-14` | `Q-24` | Nombres de los botones de guardar, cancelar y confirmar |
| `DOC-06/Q-15` | `Q-25` | Textos de los mensajes de error |
| `DOC-06/Q-16` | `Q-26` | Cómo se editan y se borran las fichas |
| `DOC-06/Q-17` | `Q-27` | La pantalla de emisión de factura |
| `DOC-06/Q-18` | `Q-28` | Dónde está el conmutador de pago |
| `DOC-06/Q-19` | `Q-29` | La lista completa de datos de cliente y de empleado |
| `DOC-06/Q-20` … `DOC-06/Q-23` | `Q-20` … `Q-23` | Sin colisión: conservan su número. `Q-21` y `Q-22` son hoy la evidencia de `FUN-001` y `FUN-002` en DOC-25 |

**Aviso para quien cite versiones anteriores de este manual.** `DOC-25` cita en
su apartado de descartes el rango `DOC-06/Q-14` a `DOC-06/Q-20`, que es
numeración de 1.0.0: corresponde hoy a `Q-24` a `Q-29` más `Q-20`. Las citas de
`DOC-06/Q-21` y `DOC-06/Q-22` de ese mismo documento no cambiaron: ya eran
correctas.

**Por qué el tipo es PATCH y no MINOR.** No cambió ninguna tarea, ningún
requisito cubierto ni ningún contenido de negocio: solo la numeración de las
preguntas abiertas propias, para deshacer una colisión de identificadores.

---

## 1.0.0 — 2026-08-15 (creación)

Primera versión del manual, regenerada contra `DOC-01-BASE-ASIS.md` 1.0.0 y
`DOC-04-FUNCIONAL.md` 1.0.0. Estableció las 32 tareas de los bloques A
(cliente → vehículo → albarán → factura), B (catálogo de piezas) y C (personal
y nóminas), más el bloque D de ajustes de interfaz.

Numeró sus preguntas abiertas del 1 al 23 sin pedir números libres al registro
central, lo que causó la colisión resuelta en 1.1.0 (ver arriba).
