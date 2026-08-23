---
doc_id: DOC-06-HIST
doc_name: DOC-06-MANUAL-USUARIO-HIST
of_document: DOC-06-MANUAL-USUARIO.md
version: 1.3.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-04 manual de usuario
generator_version: "1.2"
generated_at: 2026-08-23T00:00:00+02:00
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

## 1.3.0 — 2026-08-23 (MINOR)

**Qué cambió**

- Front-matter regenerado contra `DOC-01-BASE-ASIS.md` 1.1.0. El contenido de
  negocio de DOC-01 no cambió (cierre de una pregunta ya resuelta y corrección de
  un comentario del árbol de carpetas), así que ninguna tarea se reescribe por
  esta subida.
- Se leyeron, por instrucción explícita de la cascada de obsolescencia,
  `specs/04-proteccio-enviaments-duplicats.md` y
  `specs/05-presentacio-imports-i-dates.md` — ya implementados, aunque no son
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
