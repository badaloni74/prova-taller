---
doc_id: DOC-23-HIST
doc_name: DOC-23-INFORME-HIST
of_document: DOC-23-INFORME.md
version: 2.1.0        # no se versiona por separado: refleja la versión del documento que historia
status: draft
generator: S-10 skill-auto-tcs (ejecución + diagnóstico, sesión Claude Code)
generator_version: "2.0"
generated_at: 2026-08-23T22:10:00+02:00
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
