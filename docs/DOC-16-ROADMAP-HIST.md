# DOC-16-ROADMAP · Historial de versiones

Historial del documento `docs/DOC-16-ROADMAP.md`. Una entrada por versión, de la más nueva
a la más antigua. **El documento principal no reproduce nada de esto**: refleja solo el
estado actual, con su `version` en el front-matter.

**Nota sobre este fichero.** Lo crea A-12 en la versión 2.1.0. Las versiones 2.0.0 y 1.0.0
lo declaraban como fichero hermano y **no llegó a escribirse**; sus entradas están
reconstruidas a partir del propio documento y son fieles a lo que allí consta, pero se
señalan como reconstruidas para que nadie las tome por notas escritas en su momento.

---

## 2.1.0 — 2026-08-22 — MINOR

**Ronda de análisis con evidencia nueva.** Se ejecuta porque `S-16` marca DOC-16 como
obsoleto por DOC-07 (1.5.0 → 1.7.0) y DOC-05 (1.4.1 → 1.6.0), y porque aparecen dos
entradas que no existían: `DOC-23-INFORME` 2.0.0 y `DOC-14-EXPLORATORIO` 1.0.0.

**Qué cambia.**

- **Dos mejoras nuevas**, con identificadores pedidos a `S-12`:
  - `MEJ-007` · Una sola guarda contra el reenvío en los tres puntos de escritura del
    cliente (de `DOC-14/EXP-002` `critical` y `EXP-001` `high`).
  - `MEJ-008` · Un único sitio donde se dé formato a importes y fechas (de
    `DOC-14/EXP-014` y `EXP-009`, con 15 `toFixed` en 8 ficheros contados en código).
- **Ninguna mejora cambia de estado.** Siguen `accepted` MEJ-001, MEJ-003 y MEJ-005;
  siguen `proposed` MEJ-002, MEJ-004 y MEJ-006. **Ninguna decisión nueva: A-12 no decide.**
- **Se responde a la pregunta de si MEJ-003 ha dejado de hacer falta**: no. Verificado en
  `b2a8d77` que no hay pruebas de servidor, ni CI, ni script `test`. Lo aparecido es una
  suite de interfaz que `A-05-03` y el nuevo `A-05-03b` demuestran insuficiente para lo que
  MEJ-003 compraba. Apartado 1.1, nuevo.
- **Evidencia crecida en cuatro mejoras**: MEJ-001 y MEJ-005 (aceptadas, apartado 1.2),
  MEJ-002 y MEJ-004. Sube la urgencia de MEJ-002 (`low` → `medium`), MEJ-004
  (`medium` → `high`) y MEJ-006 (`low` → `medium`). **Ninguna evidencia ha menguado.**
- **El patrón del apartado 3.0 se recuenta: de 4 defectos de escritura a 8.**
- **Tres hallazgos que `DOC-14` dirigió a A-12 (`EXP-017`, `EXP-019`, `EXP-026`) NO se
  convierten en mejora**: son funcionalidad y van a `A-15`. Apartados 5.6 y 6.1.
- **Se corrige una premisa propia de 1.0.0**: «no hay concurrencia por diseño», usada para
  descartar la carrera de `generateNumero`, queda parcialmente falsada por `DOC-14/EXP-003`.
  La conclusión se mantiene; el argumento, no. Apartado 5.1.
- **Correcciones de cifras** por cambio de commit (`44748fb` → `b2a8d77`): literales de
  error 70 → **71**; `server/routes/` 877 → **893** líneas y 84 → **86** `res.status`.
- **Front-matter reescrito.** Se retiran `counts`, `decision`, `project`, `language`,
  `history` y los `usage` por entrada, y bajan al cuerpo, a un apartado «Procedencia». El
  motivo está tomado de `DOC-07/A-05-12`: un resumen en el front-matter es un caché que
  nadie invalida. **Se corrige el aviso de `S-16`**: `DOC-23` se declaraba sin versión y
  ahora va como 2.0.0 con hash y con su ruta nueva en `docs/`.
- **Hallazgo nuevo para `S-01`** (apartado 6.8): las tres aristas ausentes del grafo de
  DOC-02 afectan al cálculo de impacto de MEJ-007.
- **Se crea este fichero de historial.**

**Por qué MINOR y no MAJOR.** No se renumera ni se retira ningún `MEJ-nnn`, no se revoca
ninguna decisión y no cambia la estructura de identificadores. Se añade contenido y se
actualizan evidencias.

---

## 2.0.0 — 2026-08-17 — MAJOR *(entrada reconstruida)*

**Registro de decisión, no ronda de análisis.** El propietario del proyecto decidió sobre
las seis propuestas de 1.0.0.

- **Aceptadas**: `MEJ-001`, `MEJ-003`, `MEJ-005`.
- **Sin decidir**: `MEJ-002`, `MEJ-004`, `MEJ-006`.
- **Rechazadas**: ninguna.
- **No se propuso ninguna mejora nueva** y no se pidió ningún identificador a `S-12`.
- Se documentó por qué la aceptación de `MEJ-003` **contradice `specs/01:48`**, que excluía
  la suite de tests, y por qué se aceptó igual: el sistema sobre el que se tomó aquella
  decisión ya no es éste.
- Se corrigieron tres cifras que 1.0.0 citaba de `DOC-07` 1.4.0 y que su autor rectificó en
  1.5.0 (alcance de A-05-01, y las colisiones de A-05-06: 15 en DOC-05 y 19 en DOC-06).
- Se unificó la declaración de `DOC-07` en `inputs`, con la matriz como `companion_file`.

**Por qué MAJOR.** Cambia el estado de tres mejoras de `proposed` a `accepted`, que es un
cambio de significado del documento para sus consumidores.

---

## 1.0.0 — 2026-08-16 — primera versión *(entrada reconstruida)*

Primera ejecución de A-12 sobre `app-taller`. Sin histórico previo, sin `DOC-17` y sin
entorno Rally: toda la evidencia salió de cobertura (`DOC-07`), defectos (`DOC-24`),
automatización (`DOC-23` 1.0.0), verdad técnica (`DOC-02`) y lectura directa de código en
el commit `44748fb`.

- **Seis mejoras propuestas**, `MEJ-001` a `MEJ-006`, cinco de `evidence` y una de
  `opinion`.
- **El hallazgo central**: los cuatro defectos confirmados de `DOC-24` son el mismo
  defecto —una comprobación ausente en el punto de escritura—, del que salen MEJ-004 y,
  como condición previa, MEJ-003.
- **Cuatro cosas consideradas y no propuestas**, con su motivo escrito, entre ellas la
  carrera de `generateNumero` y las correcciones de BUG-001 a BUG-004.
- **Cinco hallazgos dirigidos a otras piezas** (A-15, A-14, S-12, A-03).
