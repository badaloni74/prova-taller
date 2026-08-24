---
doc_id: DOC-27-HIST
doc_name: DOC-27-INFORME-API-HIST
of_document: DOC-27-INFORME-API.md
version: 1.0.0        # no se versiona por separado: refleja la versión del documento que historia
status: draft
generator: S-17 s17-api-qa (ejecución newman, sesión Claude Code)
generator_version: "1.1"
generated_at: 2026-08-24T11:05:00+02:00
project: app-taller
purpose: >-
  Historial de versiones de DOC-27. El documento principal refleja solo la
  última ejecución; qué cambió de una a otra —qué se corrigió, qué TCS se
  añadieron o retiraron, qué corridas se descartaron y por qué— vive aquí.
---

# DOC-27 · Historial de versiones

## 1.0.0 — 2026-08-24 — MAJOR (primera versión)

Primera ejecución registrada de la suite de servicio. La colección (`DOC-26`,
`automation/api/`) existía desde el 2026-08-24, pero sus resultados no se
publicaban: vivían en la terminal de quien la lanzaba, y no había forma de
responder si los casos de servicio pasaban en una entrega concreta. `S-10`
tenía su informe (`DOC-23`) desde el principio; esta asimetría no tenía
justificación.

**Resultado:** 10 `TCS-nnn` de 10 en verde, 28 peticiones, 31 assertions, 0
fallos, 1,75 s. Base idéntica antes y después (12 facturas, 37 albaranes, stock
de `FO-100` en 37).

**Procedencia:** derivado de `automation/api/newman/run.json`, la salida del
reporter JSON de newman 6.2.2 — no de leer la consola. Es la fuente
determinista que hace para esta suite lo que `testng-results.xml` hace para
`DOC-23`.

**Notas de esta primera versión:**

- Se estrena la nomenclatura `TCS-nnn`: un identificador por comprobación,
  delante del `TC-nnn` de `DOC-05` que cubre. Los 4 casos de servicio del plan
  necesitan 10 comprobaciones, porque cada rechazo lleva aparte la verificación
  de que el sistema no se movió.
- Los `_setup` y `_teardown` (18 peticiones) quedan fuera de la numeración: no
  verifican nada del sistema bajo prueba.
- La base **no** se resembró antes de ejecutar, deliberadamente: comprobar que
  la colección es repetible sobre una base ya usada era parte del objetivo.

**Versión MAJOR** por ser la primera: no hay documento anterior con el que
comparar, y el esquema —front-matter con `inputs` hacia `DOC-05`, tabla por
`TCS`, bloque de aislamiento medido— queda fijado aquí para las siguientes.
