---
doc_id: DOC-23-HIST
doc_name: DOC-23-INFORME-HIST
of_document: DOC-23-INFORME.md
version: 2.2.0        # no se versiona por separado: refleja la versión del documento que historia
status: draft
generator: S-10 skill-auto-tcs (ejecución + diagnóstico, sesión Claude Code)
generator_version: "2.0"
generated_at: 2026-08-23T23:30:00+02:00
project: app-taller
purpose: >-
  Historial de versiones de DOC-23. El documento principal refleja solo el estado
  actual (última ejecución); todo lo que cambió de una ejecución a otra —qué se
  corrigió, qué se descubrió, qué ejecuciones se descartaron y por qué— vive aquí.
reconstruction_note: >-
  Este fichero nace en 2.1.0, siguiendo el mismo patrón que DOC-05-HIST, DOC-07-HIST,
  DOC-08-HIST, DOC-16-HIST y DOC-25-HIST. La entrada 2.0.0 está reconstruida a partir
  del propio DOC-23 (su párrafo "Versión anterior") y es fiel a lo que allí consta,
  pero no se escribió en su momento; se señala como reconstruida. La 1.0.0
  (`automation/ui/DOC-23-INFORME.md`, retirada) no se reconstruye: cubría una prueba
  acotada de 5 escenarios sobre 1 módulo, sin relación directa con la suite completa
  que documentan 2.0.0 en adelante.
---

# DOC-23-INFORME · Historial de versiones

Historial del documento `docs/DOC-23-INFORME.md`. Una entrada por versión, de la más
nueva a la más antigua. **El documento principal no reproduce nada de esto**: refleja
solo el estado de la última ejecución, con su `version` en el front-matter.

---

## 2.2.0 — 2026-08-23 — MINOR

**Qué cambia.** Se cierran los 18 casos en rojo de la 2.1.0. 89 verdes + 18 verdes
= 107/107, verificado ejecutando solo los 18 casos que estaban en rojo (no la suite
completa, por indicación expresa) con `-Dcucumber.filter.tags`.

- **Los 17 casos de `EXP-027` corregidos.** Aplicado el cambio mecánico (punto →
  coma) en `factures.feature`, `nomines.feature`, `peces.feature` y
  `albarans.feature`, más dos hallazgos verificados contra la app real antes de
  tocar nada: (a) `formatMoney` inserta un espacio no separable (U+00A0) antes de
  `€`, no un espacio normal — un literal con espacio normal nunca habría
  coincidido, con independencia del separador decimal; (b) `TC-029` y `TC-097`
  usaban la misma columna de `Ejemplos` como valor de entrada (campo numérico) y
  de validación (texto mostrado) — se separaron en columnas nuevas en vez de
  forzar un valor que habría roto el campo del formulario.
- **`TC-103` confirmado transitorio.** Vuelto a ejecutar junto con los 17
  anteriores, pasa. No ha vuelto a fallar.
- **Se corrige un error de la propia 2.1.0:** atribuía el `SessionNotCreated` a
  `TC-029` en vez de a `TC-103` (una lectura por posición en la lista de fallos,
  no por caso). Corregido cruzando cada caso con su clase de excepción real en
  `testng-results.xml`. `TC-029` es, y siempre fue, uno de los 17 casos de
  `EXP-027` (`AssertionError`, no `SessionNotCreatedException`).
- **Nota de alcance:** los 89 casos que ya eran verdes en la 2.1.0 no se han
  vuelto a ejecutar en esta versión — se dan por buenos porque ningún cambio de
  esta sesión toca escenarios fuera de los 18 corregidos. La próxima ejecución
  completa de la suite debe confirmar el 107/107 de forma independiente.

**Por qué MINOR y no PATCH.** Cambia el resultado sustantivo de 17 escenarios
(de rojo a verde) y la atribución de causa de un caso — no es solo texto
reformulado.

## 2.1.0 — 2026-08-23 — MINOR

**Qué cambia.** Contenido y cifras actualizados con una ejecución real nueva: 89
verdes, 18 rojos (antes: 106 verdes, 1 rojo — cifra que `CLAUDE.md` ya advertía como
no fiable). No cambia la estructura del documento ni su esquema.

- **`TC-048` corregido y verificado en verde.** Causa raíz: falta de aislamiento con
  `TC-040` (arrastraba estoc consumido). Corrección aplicada en
  `automation/ui/src/test/resources/features/albarans.feature` (commit `735ded8`),
  aislando `TC-040` con el mismo patrón que ya usan `TC-053`/`TC-054`. Verificado en
  dos ejecuciones limpias posteriores.
- **17 casos nuevos en rojo, una sola causa raíz: `EXP-027`.** Los `.feature` de
  `factures`/`nomines` (y una parte de `peces`) siguen comprobando literales con punto
  decimal (`"800.00 €"`) que la pantalla ya no muestra (`"800,00 €"` desde el
  SPEC 05). Ya estaba anotado como riesgo conocido; esta es la primera ejecución
  completa que lo confirma con los 17 casos exactos que afecta. No se corrige en esta
  versión — queda para una sesión propia de `s10-auto-tcs`.
- **1 caso aislado, `TC-029`, fallo de infraestructura** (`SessionNotCreated` al
  arrancar Chrome), no reproducido de forma fiable — mismo patrón que §6.6
  (inestabilidad de Chrome/servidor bajo carga sostenida), aquí sobre el propio
  navegador.
- **Dos ejecuciones completas se descartaron como no fiables** antes de llegar a esta
  versión: una sin el fixture `8001TST` (27 rojos, la mayoría por
  `opcionNoEncontrada`) y otra sin reseed previo que arrastró el estoc consumido por
  la anterior (30 rojos, incluyendo `TC-048` de vuelta). Documentado en §7 del
  documento principal como aviso para quien repita la ejecución.
- **§2 simplificada:** la reproducción ya no necesita `vite preview` con proxy aparte
  — el propio servidor Express sirve `client/dist` en el mismo puerto que la API
  (`npm run build && npm start`, todo en `http://localhost:3001`).
- **Documento traducido al castellano.** Hasta esta versión estaba en catalán
  (`language: ca`); pasa a `language: es`, siguiendo la convención del proyecto de que
  todo material generado para app-taller se escribe en castellano.
- **Se crea este fichero de historial**, que hasta ahora no existía.

**Por qué MINOR y no MAJOR.** No cambia el esquema del documento ni su estructura de
secciones. Cambian las cifras, se añade el detalle de 3 casos nuevos en §4 y se
reescribe la sección 2, pero el formato en el que los consumidores leen este
documento (tabla de resultados por módulo, sección 4 de detalle) sigue siendo el
mismo.

---

## 2.0.0 — 2026-08-21 — MAJOR *(reconstruida)*

**Qué cambia** *(según el propio DOC-23 2.0.0/2.1.0, no verificado contra una fuente
independiente de esta versión)*. Reemplaza `automation/ui/DOC-23-INFORME.md` (1.0.0,
2026-08-16), que documentaba una prueba acotada de 5 escenarios sobre 1 solo módulo.
Esta versión cubre la suite completa: 102 de los 110 casos de `DOC-05-PLAN-PRUEBAS.md`,
en 7 módulos, con 106 verdes y 1 rojo (`TC-048`). Se reubica a `docs/` porque es
documentación de proyecto, no código — el fichero antiguo se retira. Documenta además
6 errores reales corregidos durante esa sesión (carreras contra React, `clear()` sin
`onChange`, `normalize-space`, paginación, valor de `<input>`, estabilidad del
servidor de desarrollo, un `Tipus:` sin implementar) — ver §6 del documento principal.

**Por qué MAJOR.** Cambia el alcance de forma estructural: de una prueba acotada a la
suite completa, con una cifra de casos y una estructura de secciones muy distintas a
la 1.0.0.
