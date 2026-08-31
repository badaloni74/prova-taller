---
doc_id: DOC-01-HIST
doc_name: DOC-01-BASE-ASIS-HIST
of_document: DOC-01-BASE-ASIS.md
version: 1.3.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: S-01 skill-doc-base
generator_version: "2.0"
generated_at: 2026-08-31T17:10:00+02:00
---

# DOC-01-BASE-ASIS · Historial de versiones

Historial del documento `docs/DOC-01-BASE-ASIS.md`. Una entrada por versión, de la más nueva
a la más antigua. **El documento principal no reproduce nada de esto**: refleja solo el
estado actual, con su `version` en el front-matter.

---

## 1.3.0 — 2026-08-31 — MINOR

**Regeneración disparada por deriva de código.** El `commit_sha` declarado en la v1.2.0
(`345a3ae`) ya no es `HEAD` (`ecbf7e4`), con 8 commits sobre `client/`/`server/` de por
medio: **SPEC 07 — «Bloquear precios, costes y estoc negativos»** (`status: Implemented`,
origen `BUG-003`) y **SPEC 08 — «Factura rectificativa»** (`status: Implemented`, origen
`BUG-004`).

**Qué cambia.**

- **Nuevo caso de uso `UC-FAC-05`** — Rectificar una factura emitida.
- **Cinco reglas de negocio nuevas:** `BR-PEC-03`/`BR-PEC-04` (precio, coste y estoc de
  pieza siempre positivos, salvo estoc en cero), `BR-ALB-11` (precio de línea siempre
  positivo), `BR-FAC-10`/`BR-FAC-11` (rectificación libera albaranes; no se puede
  rectificar dos veces).
- **Se añade la subsección `### Piezas` que faltaba en §4** (Reglas de negocio):
  `BR-PEC-01`/`BR-PEC-02` ya existían en el bloque `inventory` desde la v1.0.0 pero nunca
  tuvieron tabla de prosa propia — omisión de una regeneración anterior, corregida de
  paso al añadir `BR-PEC-03`/`BR-PEC-04`.
- **Se cierra `Q-06`** («¿cómo se corrige una factura emitida por error?»). Negocio ya la
  había resuelto el 2026-08-16 (misma fecha que `Q-02`/`Q-10`): censada como `BUG-004` en
  `DOC-24`, implementada ahora como `BR-FAC-10`/`BR-FAC-11` y `UC-FAC-05`.
- **Nuevo término de glosario:** «Factura rectificativa».
- Reescrita la nota «sobre la vida de la factura» en §3.5: ya no es cierto que una factura
  no se pueda corregir — la única vía sigue siendo indirecta (rectificar, no modificar ni
  borrar directamente).

**Qué NO cambia.** Actores, y el resto de módulos (clientes, vehículos, personal,
nóminas, marco de la aplicación): ninguno de los dos specs los toca.

**Documentos derivados que quedan obsoletos por este salto:** `DOC-04`, `DOC-06`
(directos) y, por transitividad vía `DOC-04`, `DOC-05`. `S-16` debe recalcularlo en la
próxima ejecución de `cascada.js`.

---

## 1.2.0 — 2026-08-28 — MINOR

**Regeneración disparada por deriva de código.** El `commit_sha` declarado en la v1.1.0
(`90b24b8`) ya no es `HEAD` (`345a3ae`), con dos commits sobre `client/`/`server/` de por
medio, ambos de **SPEC 06 — «Un albarán no puede cambiar de cliente»** (`status:
Implemented`, origen `BUG-002`):

- `65b23a2` — `server/db/seed.js`: un segundo vehículo para «Anna Puig Ferrer», para que
  el seed permita reproducir un cambio de vehículo dentro del mismo cliente.
- `e6ecc5b` — `client/src/pages/albarans/AlbaraForm.tsx`: al **editar** una cabecera, el
  selector de vehículo se filtra a los del cliente actual del albarán.

**Qué cambia en el bloque `inventory`.**

- **Nace `BR-ALB-10`** (`business_rules`): al modificar la cabecera de un albarán no
  facturado no se puede sustituir su vehículo por otro de un cliente distinto; el intento
  se rechaza sin guardar nada, y el selector del formulario solo ofrece los vehículos del
  cliente actual. Fuente: `server/routes/albarans.js:95-104` (rechazo `409`, ya presente
  en el árbol desde antes de la v1.1.0 — la v1.1.0 no lo recogió; esta regeneración lo
  corrige) y `client/src/pages/albarans/AlbaraForm.tsx:40-60` (filtro del selector, nuevo
  en `e6ecc5b`). Registrada en `registro-ids.json` vía S-12.
- **`open_questions` gana `Q-08`**: `BR-ALB-10` cierra el cambio de cliente por la puerta
  del albarán, pero cambiar el propietario de un vehículo (`UC-VEH-04`) sigue arrastrando
  sus albaranes pendientes. Recoge `PD-002` del spec. La antigua `Q-10` de `DOC-04`
  («¿se puede cambiar el vehículo a otro cliente?») queda **contestada** por negocio e
  implementada, y se retira como duda abierta.
- Las `source:` de `BR-ALB-05..08` suben ~10-16 líneas: el nuevo bloque de rechazo en
  `PUT /api/albarans/:id` desplazó el resto del fichero.
- `excluded_paths` se completa con `automation/`, `docs/` y `dashboard/`, que ya se
  omitían de hecho.

**Qué NO cambia.** Los nueve módulos, los cuarenta casos de uso (solo se matiza la prosa
de `UC-ALB-06`, sin tocar su ancla ni su nombre), el actor único, el glosario y el resto
de reglas. El esquema del bloque `inventory` es el mismo → el salto es `MINOR`, no `MAJOR`.

**Documentos derivados que quedan obsoletos por este salto:** `DOC-04` y `DOC-06`
(directos) y, por transitividad vía `DOC-04`, `DOC-05`. `S-16` debe recalcularlo.

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
