# DOC-04-FUNCIONAL · Historial de versiones

Historial del documento `docs/DOC-04-FUNCIONAL.md`. Una entrada por versión, de
la más nueva a la más antigua. **El documento principal no reproduce nada de
esto**: refleja solo el estado actual, con su `version` en el front-matter.

**Nota sobre este fichero.** Lo crea A-02 en el ciclo del 2026-08-23. Las
versiones 1.0.0, 1.1.0 y 1.2.0 no llegaron a declarar un fichero de historial
propio; sus entradas están reconstruidas a partir de los avisos de cambio
(«Qué cambia en X.Y.Z») que el propio documento llevaba en el cuerpo hasta
esta regeneración, y son fieles a lo que allí constaba. Se señalan como
reconstruidas. Las fechas de 1.0.0 y 1.1.0 son aproximadas, tomadas de
`registro-ids.json` (anclas `REQ-*` creadas el 2026-08-15, preguntas `Q-*`
creadas el 2026-08-16).

---

## Nota — 2026-08-23 — resincronización de procedencia, sin cambio de versión

No es una entrada de versión: el bloque `requirements` y el bloque
`open_questions` de este ciclo son idénticos byte a byte a los de 1.2.0. Se
documenta aquí porque es la regeneración que crea este fichero de historial.

**Motivo.** `DOC-01-BASE-ASIS.md` pasó de 1.0.0 a 1.1.0 (commit `7c5c39f`).
Verificado por diff de anclas (las 77 `UC-nnn`/`BR-nnn` de 1.1.0 son las
mismas 77 de 1.0.0, mismo texto y módulo) y por diff completo del fichero (39
líneas de diferencia): (1) front-matter propio de DOC-01, (2) el árbol
comentado de su sección 6, que pasa de citar tres especificaciones a cinco
porque se implementaron `SPEC 04 use-submit-guard` y `SPEC 05 format-utils`,
y (3) el cierre de su antigua `Q-02` («¿el stock puede quedar negativo?»),
resuelta por negocio el 2026-08-16 y ya recogida en DOC-04 desde 1.2.0 como
`Q-02` y `Q-12`, pendiente de implementación como `BUG-003`
(`docs/DOC-24-BUGS.json`). Ningún actor, caso de uso, regla de negocio ni
término de glosario cambia de texto.

**Consecuencia.** Ningún `REQ-nnn` se añade, se elimina ni cambia de
enunciado, módulo, ancla, prioridad o confianza. Se aplica la regla de
regeneración: *bloques de negocio idénticos y prosa equivalente → ninguna
versión de contenido nueva*. Se actualiza solo el front-matter: la versión de
`DOC-01-BASE-ASIS.md` declarada en `inputs` (1.0.0 → 1.1.0), su `hash`, el
`commit_sha` de `source` (`44748fb` → `88af6e7`) y `generated_at`. También se
adelgaza el cuerpo: los avisos «Qué cambia en 1.1.0 / 1.2.0» que vivían en la
introducción del documento se trasladan a este fichero y se sustituyen por un
apartado «Procedencia», siguiendo el mismo criterio que `DOC-16/A-12` aplicó
el 2026-08-22: un resumen narrativo en el cuerpo es más fácil de mantener
sincronizado que uno repetido en dos sitios.

**`registro-ids.json` no se toca.** Las 79 anclas `REQ-001` a `REQ-079` ya
registradas coinciden en texto, módulo y anclas de origen con este documento;
no hay nada que añadir ni que deprecar.

---

## 1.2.0 — 2026-08-16 — MINOR *(entrada reconstruida)*

El negocio respondió a **seis** de las quince preguntas abiertas (`Q-02`,
`Q-06`, `Q-10`, `Q-12`, `Q-14` y `Q-15`) el 2026-08-16. Las seis respuestas
confirman que el comportamiento actual es un **hueco que debe cambiar**;
ninguna declara intencionado lo que hoy hace el sistema.

- **Ningún `REQ-nnn` se reformula, se añade ni se elimina.** Los 79
  requisitos siguen describiendo el sistema tal como está hoy.
- Cambia solo el **estado de esas seis preguntas**, de `open` a `answered`
  con `resolution: gap_confirmed`, la decisión de negocio registrada
  (`answer`, `answered_on: 2026-08-16`) y una petición de evolutivo asociada
  (`evolutivo.target_doc: DOC-08`, propietario `A-06`, Fase 2). Las nueve
  preguntas restantes siguen abiertas.
- Se amplía el esquema de `open_questions` con los campos `resolution`,
  `answer`, `answered_on`, `answered_by`, `describes_gap_in`,
  `affects_requirements`, `gap_open_until_implemented` y `evolutivo`,
  compatible hacia atrás con `blocks`.

**Por qué MINOR.** No se renumera ni se retira ningún `REQ-nnn`, pero el
bloque `open_questions` —que forma parte del bloque estructurado— cambia de
estado y de esquema para seis entradas y añade información nueva que
consumen A-05 y A-06.

---

## 1.1.0 — 2026-08-16 — MINOR *(entrada reconstruida, fecha aproximada)*

A petición de A-03, se revisan los tres requisitos de vocabulario cerrado que
solo se podían comprobar mirando una lista de opciones (`REQ-031`,
`REQ-055`, `REQ-073`).

- **`REQ-031` se reformula**: DOC-01 sí sostiene qué ocurre cuando la regla
  se rompe (la anotación no llega a registrarse y el albarán mantiene las
  líneas e importes que ya tenía), así que el enunciado deja de ser un mero
  «solo se admiten estos dos tipos» y declara la consecuencia observable.
- **`REQ-055` y `REQ-073` se mantienen tal cual**: DOC-01 no documenta
  ninguna consecuencia observable de que el estado de pago tome un tercer
  valor, y enunciarla sería inventar comportamiento. Quedan bloqueados por
  dos preguntas nuevas dirigidas al negocio: `Q-14` (facturas) y `Q-15`
  (nóminas).
- Los otros 76 requisitos no se tocan y ningún identificador se renumera.

**Por qué MINOR.** Un requisito activo (`REQ-031`) cambia de semántica
observable, no solo de redacción, y se añaden dos preguntas nuevas al bloque
estructurado.

---

## 1.0.0 — 2026-08-15 — MAJOR *(entrada reconstruida)* — primera versión

Primera extracción de requisitos funcionales desde `DOC-01-BASE-ASIS.md`
1.0.0.

- **79 requisitos** (`REQ-001` a `REQ-079`) derivados de las 77 anclas
  `UC-nnn`/`BR-nnn` de DOC-01 (40 casos de uso, 37 reglas de negocio),
  agrupados en 9 módulos: clients, vehicles, peces, albarans, factures,
  personal, nomines, shell y configuracio.
- **Cobertura total de anclas**: las 77 anclas de DOC-01 producen al menos un
  requisito; ninguna queda sin requisito derivado.
- **Quince preguntas abiertas**: siete heredadas de DOC-01 (`Q-01`, `Q-03` a
  `Q-07` tal como venían numeradas allí) y ocho nacidas en A-02 de
  contradicciones entre reglas, casos de uso sin regla que los gobierne y
  términos del glosario marcados como ambiguos.
- Un único actor, `ACT-01 · Personal del taller`, heredado de DOC-01: el
  sistema no distingue usuarios ni permisos.
