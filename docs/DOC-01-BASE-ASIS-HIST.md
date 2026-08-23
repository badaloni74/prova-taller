---
doc_id: DOC-01-HIST
doc_name: DOC-01-BASE-ASIS-HIST
of_document: DOC-01-BASE-ASIS.md
version: 1.1.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: S-01 skill-doc-base
generator_version: "2.0"
generated_at: 2026-08-23T00:38:21+02:00
---

# DOC-01-BASE-ASIS · Historial de versiones

Historial del documento `docs/DOC-01-BASE-ASIS.md`. Una entrada por versión, de la más nueva
a la más antigua. **El documento principal no reproduce nada de esto**: refleja solo el
estado actual, con su `version` en el front-matter.

---

## 1.1.0 — 2026-08-23 — MINOR

**Primera regeneración desde la creación del documento.** Se ejecuta porque `cascada.js`
(extendido en esta misma sesión) detecta código desincronizado: el `commit_sha` declarado
(`44748fb`) ya no es `HEAD` (`90b24b8`), con 12 commits sobre `client/`/`server/` de por
medio — los SPECs 04 (protección contra enviamientos duplicados) y 05 (presentación de
importes y fechas).

**Qué cambia.**

- **Se cierra `Q-02`** («¿stock negativo es decisión consciente o falta una regla?»).
  Negocio ya la había resuelto el 2026-08-16, un día después de generarse la v1.0.0 de
  este documento: censada como `Q-12` en `DOC-04` («precio, coste y stock siempre
  positivos»), pendiente de implementación como `BUG-003` en `DOC-24`. Repetirla como
  pregunta abierta habría sido volver a preguntar lo que un humano ya contestó.
- **Se corrige el árbol comentado** (§6): «las tres especificaciones» → «las cinco
  especificaciones» — SPEC 04 y SPEC 05 se sumaron a las tres originales.
- **`registro-ids.json` pasa de `present: false` a `present: true`** en el front-matter:
  no existía todavía cuando se generó la v1.0.0 (nació al día siguiente, con `DOC-04`).

**Qué NO cambia.** Actores, casos de uso, reglas de negocio y glosario: ninguno de los dos
specs implementados desde la v1.0.0 introduce un caso de uso nuevo, cambia una regla de
negocio, ni toca los nueve módulos censados. SPEC 04 es una guarda de reenvío puramente
técnica (sin regla de negocio nueva) y SPEC 05 es presentación (los cálculos de `BR-FAC-05`
a `BR-FAC-07` no cambian, solo cómo se muestran). Por eso el salto es `MINOR`, no `MAJOR`:
el bloque `inventory` pierde una entrada de `open_questions`, pero no cambia su esquema.

**Documentos derivados que quedan obsoletos por este salto:** `DOC-04`, `DOC-06` (directos)
y, por transitividad vía `DOC-04`, `DOC-05`. `S-16` debe recalcularlo en la próxima
ejecución de `cascada.js`.

---

## 1.0.0 — 2026-08-15 — inicial

Primera generación. Ver `docs/DOC-01-BASE-ASIS.md` en el commit `44748fb` para el contenido
íntegro de esta versión — no se reconstruye aquí porque no hubo versión anterior con la que
compararla.
