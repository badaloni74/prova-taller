---
doc_id: DOC-14-HIST
doc_name: DOC-14-EXPLORATORIO-HIST
of_document: DOC-14-EXPLORATORIO.md
version: 2.1.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: A-10 explorador QA
generator_version: "1.0"
generated_at: 2026-08-24T10:00:00+02:00
---

# DOC-14-EXPLORATORIO · Historial de versiones

Historial del documento `docs/DOC-14-EXPLORATORIO.md`. Una entrada por
versión, de la más nueva a la más antigua. **El documento principal no
reproduce nada de esto**: refleja solo el estado actual, con su `version`
en el front-matter.

---

## 2.1.0 — 2026-08-24 — MINOR

**Resincronización dirigida contra `DOC-23-INFORME.md` 2.2.0, sin
exploración nueva del navegador.** La cascada de obsolescencia marcó
`DOC-14` 2.0.1 como caducado porque su entrada `inputs` para `DOC-23`
seguía citando `2.0.0`, mientras que la vigente ya es `2.2.0` (dos saltos:
`2.0.0 → 2.1.0` cerró `TC-048` y confirmó 18 casos en rojo por `EXP-027`/
`TC-103`; `2.1.0 → 2.2.0` corrigió los 17 `.feature` de `EXP-027` y
confirmó `TC-103` transitorio, dejando la suite en 107/107).

**Por qué MINOR y no PATCH.** A diferencia de la 2.0.1 (front-matter puro),
esta sí cambia el contenido sustantivo: `EXP-027` es el único hallazgo de
este informe que citaba una cifra de ejecución de la suite en vez de
observación directa, y esa cifra cambió de verdad. Se comprobó, hallazgo
por hallazgo, que ningún otro `EXP-nnn` depende de `DOC-23` de la misma
forma.

**Qué cambia.**

- `EXP-027` pasa de `abierto` a `estado: corregido`, con `corregido_en:
  2026-08-24` y `corregido_en_version: 2.1.0`. Su ficha añade una nota de
  verificación de cierre que cita `DOC-23` 2.2.0 §4.2/§4.3
  (`testng-results.xml`: 18 de 18 casos re-ejecutados en verde) en vez de
  reproducir el defecto a mano — el trabajo de corrección y su prueba son
  de `A-03`/`S-10`, zona que este informe no toca. `deriva_a` pasa de
  `A-03` a `null` (ya no pendiente).
- Resumen ejecutivo actualizado: de 4 a 5 hallazgos corregidos, de 24 a 23
  abiertos, de 3 a 2 `high` abiertos.
- Front-matter: entrada `inputs` de `DOC-23-INFORME.md` de `version: 2.0.0`
  a `version: 2.2.0` con hash recalculado; `commit_sha` de `source`
  actualizado al `HEAD` tras la cascada (`f3b91fb908ce5d118dd8ff47e07eb21b1a2b7d7e`).
- Se anota, sin corregirlo (no es competencia de A-10), que `CLAUDE.md`
  sigue describiendo un estado intermedio de la suite en vez del ya
  cerrado.

## 2.0.1 — 2026-08-23 — PATCH

**Resincronización de front-matter, sin exploración nueva.** La cascada de
obsolescencia (`s16-cascada-obsolescencia`) marcó `DOC-14` 2.0.0 como
caducado únicamente porque su entrada `inputs` para `DOC-16-ROADMAP.md`
seguía citando la versión `2.1.0`, mientras que `DOC-16` ya había avanzado a
`3.0.0`. Verificado que `DOC-16` 3.0.0 cita a su vez `DOC-14` 2.0.0 como
versión vigente en su propia entrada de procedencia: no hay ningún
hallazgo, decisión ni cambio de roadmap posterior a la sesión que generó
`DOC-14` 2.0.0 que obligue a volver a explorar la aplicación.

**Qué cambia.**

- Front-matter: la entrada `inputs` de `DOC-16-ROADMAP.md` pasa de
  `version: 2.1.0` a `version: 3.0.0`, con el `hash` recalculado sobre el
  fichero actual (`sha256:e70c3786b5dfe8e4f60e5adc0e02ab302cfcc85e657281da2af4b689423604de`).
  `commit_sha` de `source` se actualiza al `HEAD` tras incorporar los
  commits de la cascada (`d861654e535d6835b44b263dd24f4ef03b2e5801`).
- Cuerpo: se añade una nota breve en «Procedencia» explicando que esta
  versión es una resincronización, no una sesión de exploración.
- **Nada más cambia.** Ningún `EXP-nnn` se abre, se cierra ni se
  renumera; ningún hallazgo cambia de severidad, tipo o estado; el bloque
  estructurado (`cartas`, `hallazgos`, `datos_dejados`) es idéntico al de
  la versión 2.0.0.
- No se ha abierto el navegador ni se ha tocado la aplicación durante esta
  actualización. No se ha creado ni destruido ningún dato.

**Por qué PATCH y no MINOR.** No nace ningún hallazgo, no se cierra
ninguno, y ningún consumidor obtiene información distinta sobre el estado
de la aplicación: solo cambia de qué versión de `DOC-16` depende
formalmente este documento. Es exactamente el caso de «resello de hashes»
que la propia convención de versionado del proyecto marca como `PATCH`.

---

## 2.0.0 — 2026-08-23 — MAJOR

**Ronda de verificación de cierre**, no una exploración desde cero. Se
ejecuta para comprobar en vivo si `SPEC 04` (protección contra envíos
duplicados) y `SPEC 05` (presentación de importes y fechas) —ambos con
`Estado: Implemented` desde 2026-08-22— cierran de verdad los hallazgos de
`DOC-14` 1.0.0 de los que nacieron, siguiendo el triaje de
`TRIATGE-DOC-14.md`.

**Qué cambia.**

- **Cuatro hallazgos se cierran, verificados en vivo, con red y base de
  datos comprobadas antes y después de cada reproducción**: `EXP-001`
  (doble alta de cliente), `EXP-002` (doble línea de albarán), `EXP-007`
  (IVA ausente en factura), `EXP-014` (formato de importe inconsistente).
  Los cuatro quedan marcados `estado: corregido` con la fecha y la versión,
  y conservan su ficha original con un aviso de cierre al principio.
- **Un hallazgo se cierra solo a medias**: `EXP-009`. La presentación de la
  fecha del albarán ya es `DD/MM/AAAA`, verificado en listado y ficha. El
  defecto de fondo —guardar el albarán reescribe la fecha a medianoche UTC
  y pierde la hora— se ha reproducido de nuevo, exactamente igual, porque
  `SPEC 05` lo declaró fuera de su alcance de forma explícita. Queda
  `abierto`, con la evidencia de ambas partes documentada.
- **La verificación de `EXP-001`/`EXP-002` se extiende a un formulario no
  probado en la sesión original** (alta de vehículo), porque `DOC-14`
  1.0.0 dejó la generalización a los demás formularios de `EntityForm`
  como hipótesis «no verificada». Queda confirmada: la guarda también
  protege el alta de vehículo.
- **`EXP-004`, `EXP-005` y `EXP-015` se reverifican en vivo sin tocarse**,
  tal como exige el mandato de esta sesión: los tres se reproducen
  exactamente igual que en `DOC-14` 1.0.0. Ninguna decisión de negocio ha
  llegado sobre `P-01`/`P-02`.
- **`P-03` (coma o punto decimal) queda respondida**: la propia decisión
  incorporada a `SPEC 05` responde que sí, coma decimal. Se retira de la
  lista de preguntas abiertas.
- **Dos hallazgos nuevos**, numerados `EXP-027` y `EXP-028`, continuando la
  numeración de `DOC-14` 1.0.0 sin renumerar nada:
  - `EXP-027` (`high`, `defecto`): los `.feature` de `factures` y `nomines`
    validan literales de importe con punto decimal que ya no coinciden con
    la pantalla, tras el cambio de `SPEC 05`. Confirmado en vivo (sin
    ejecutar la suite) que al menos `TC-060` falla por esta causa; contados
    a mano otros diez casos con el mismo patrón. Ya estaba anotado como
    coste aceptado en el propio `SPEC 05`, pero no consta en `CLAUDE.md`,
    que sigue anunciando «1 caso rojo».
  - `EXP-028` (`low`, `mejora`): `Personal.dataAlta` se queda en formato
    ISO crudo mientras la fecha del albarán ya usa `DD/MM/AAAA`,
    inconsistencia que el propio `SPEC 05` ya anotaba como riesgo conocido
    y aceptado.
- **Se corrige una discrepancia aritmética heredada de 1.0.0**: el resumen
  ejecutivo de 1.0.0 decía «20 defecto, 5 mejora, 1 duda» pero el recuento
  real de su propio bloque estructurado daba 20 defecto, 6 mejora, 0 duda.
  Esta versión recalcula los totales directamente sobre el bloque
  estructurado y no arrastra el error.
- **Se crea este fichero de historial**, que no existía.
- **Datos de la sesión**: se crearon y se deshicieron desde la interfaz un
  cliente, un vehículo, una nómina y una línea de albarán de prueba. Queda
  un efecto permanente nuevo: el albarán `2026/A-0003` perdió la hora de
  su fecha al reproducir `EXP-009`, evidencia irreversible del defecto que
  sigue abierto.

**Por qué MAJOR y no MINOR.** Cuatro hallazgos cambian de significado —de
abiertos a corregidos—, que es exactamente el caso que la propia guía de
regeneración señala como invalidante: «hallazgos eliminados o con
semántica modificada». No se elimina ningún `EXP-nnn`, pero cuatro dejan
de significar «esto falla» y pasan a significar «esto ya no falla, aquí
está la prueba».

---

## 1.0.0 — 2026-08-21 — primera versión

Primera sesión de exploración de A-10 sobre `app-taller`. Base recién
sembrada con `npm run seed`. Once cartas, 26 hallazgos: 20 `defecto`, 6
`mejora`, 0 `duda` (el resumen ejecutivo de esa versión decía 5 `mejora` y
1 `duda`; ver la nota de corrección en la entrada 2.0.0). Por severidad: 1
`critical`, 4 `high`, 18 `medium`, 3 `low` (el resumen ejecutivo de esa
versión decía 17 `medium` y 4 `low`; mismo motivo).

- **El hallazgo central**: la aplicación no se defiende de la doble
  pulsación (`EXP-001`, `EXP-002`), no hay control de concurrencia entre
  pestañas (`EXP-003`), y la factura no muestra el importe del IVA pese a
  que dos casos de prueba dicen cubrirlo (`EXP-007`).
- **Dos correcciones previas verificadas en vivo**: `BUG-001` (stock
  negativo) y `BUG-002` (cambio de vehículo a otro cliente), ambas
  cerradas y confirmadas.
- **Tres hallazgos marcados explícitamente «no tocar hasta que negocio
  conteste»**: `EXP-004`, `EXP-005`, `EXP-015`, con las preguntas `P-01` y
  `P-02`.
- **Una pregunta de formato**, `P-03` (coma o punto decimal), sin
  respuesta en esa versión.
- Aspecto y presentación: tema oscuro, anchura móvil, coherencia de
  formato de importes y fechas — de aquí nacen, entre otros, `EXP-009`,
  `EXP-011`, `EXP-012`, `EXP-013`, `EXP-014`.
- Once hallazgos dirigidos a otras piezas del proceso (`A-14`, `A-15`,
  `A-12`, `A-04`), sin número de trazabilidad todavía porque `EXP-*` no
  estaba gobernado por el registro global.
