---
doc_id: DOC-27-HIST
doc_name: DOC-27-INFORME-API-HIST
of_document: DOC-27-INFORME-API.md
version: 1.0.0        # no se versiona por separado: refleja la versión del documento que historia
status: draft
generator: S-17 s17-api-qa (ejecución newman, sesión Claude Code)
generator_version: "1.1"
generated_at: 2026-08-29T12:20:00+02:00
project: app-taller
purpose: >-
  Historial de versiones de DOC-27. El documento principal refleja solo la
  última ejecución; qué cambió de una a otra —qué se corrigió, qué TCS se
  añadieron o retiraron, qué corridas se descartaron y por qué— vive aquí.
---

# DOC-27 · Historial de versiones

## 1.1.0 — 2026-08-29 — MINOR (casos de servicio de SPE-06)

Segunda ejecución registrada de la suite. Amplía la colección (`DOC-26`,
`automation/api/`) con la mitad de servicio de los casos de `SPE-06` que el
selector de vehículo filtrado (`REQ-081` / `TC-117`) sacó de la interfaz, y
vuelve a correrla entera.

**Qué se añade — 12 `TCS-nnn` nuevos, `TCS011`…`TCS022`, para 5 `TC-nnn`:**

| `TC-nnn` | REQ | `TCS` nuevos | Qué cubren |
|---|---|---|---|
| `TC-111` | `REQ-080` | `TCS011`, `TCS012` | `PUT` de cambio de vehículo a otro cliente → 409; albarán intacto. AC-002 + AC-007 |
| `TC-113` | `REQ-080` | `TCS013`, `TCS014` | `PUT` simultáneo vehículo-otro-cliente + fecha + nota → 409; atomicidad (nada se guarda). AC-004 |
| `TC-115` | `REQ-042` | `TCS015`, `TCS016`, `TCS017` | Sobre albarán facturado, el mensaje de "facturat" gana al de "otro cliente". AC-006 |
| `TC-116` | `REQ-027` | `TCS018`, `TCS019`, `TCS020` | `PUT` sin `vehicle_id` → 400 obligatorio; con `vehicle_id` 9999 → 400 no existe. AC-009 |
| `TC-119` | `REQ-080` | `TCS021`, `TCS022` | Mitad de servicio del único `mixed`: el `PUT` rechazado que precede a la emisión UI. AC-008 |

**Peticiones:** 25 creadas, 1 reutilizada (la fixture compartida `_setup ·
Obtener dos vehículos de clientes distintos`, de la que dependen los cinco casos
nuevos sin duplicarla). La colección pasa de 28 a 53 peticiones y de 10 a 22
`TCS`.

**Decisión sobre `TC-119`:** no se emite la factura por API. La mitad de pantalla
(emitir y ver que sale al cliente original) ya la cubre
`automation/ui/factures.feature` (commit `1ba6196`); emitirla también por API
duplicaría esa aserción. La mitad de servicio se limita al `PUT` rechazado y a
verificar que el albarán no se movió. Coordinación por el tag `TC-119`, igual que
`TC-041`.

**Decisión sobre `TC-115`:** los dos literales de rechazo (`L'albarà ja està
facturat i no es pot modificar` y `No es pot canviar el vehicle a un que pertany a
un altre client`) no están en `DOC-04`; se declaran tal como los devuelve
`server/routes/albarans.js`, y `TCS015` añade una assertion negativa que fija la
prioridad (gana el de facturado).

**Resultado:** 22 `TCS` de 22 en verde, 53 peticiones, 74 assertions, 0 fallos,
4,4 s. Base **resembrada** antes de ejecutar (1 factura, 4 albaranes, 7 líneas,
stock total 167) e **idéntica** después. Dos pasadas seguidas sin resembrar dan
el mismo recuento.

**Procedencia:** derivado de `automation/api/newman/run.json` (reporter JSON de
newman 6.2.2), no de leer la consola.

**Ciclo de vida:** el documento conserva `lifecycle: snapshot`. Esta versión trae
sus `inputs` al día (`DOC-05` 1.8.0,
`sha256:fef49cbc57eec8822b3b5482471ffb205d149bb638bbc76c28f1bf4de6d17cb1`), con
lo que la nota de 2026-08-29 de más abajo —que anunciaba esta descongelación—
queda cumplida.

## Nota — 2026-08-29 — declaración de ciclo de vida, sin cambio de versión

No es una entrada de versión: no ha habido nueva ejecución de la suite y ni un
resultado `TCS-nnn` cambia. Se añade al front-matter del documento principal el
campo `lifecycle: snapshot`.

**Motivo.** DOC-27 es el informe de **una corrida concreta** de newman (la del
2026-08-24). `S-16 · Cascada de obsolescencia` lo marcaba obsoleto cada vez que
`DOC-05-PLAN-PRUEBAS.md` subía de versión —lo hizo al pasar de 1.6.0 a 1.8.0 con
los 9 casos nuevos de SPE-06, TC-111…TC-119—, pero un informe de ejecución que no
se ha vuelto a ejecutar no tiene una versión «desfasada»: dice la verdad de lo que
pasó aquel día. `cascada.js` reconoce `lifecycle: snapshot` y saca el documento
del cálculo de forma **visible** (aparece en la sección `CONGELADOS`, sigue
contando en `scanned`, nunca desaparece en silencio). Mismo tratamiento que da
`DOC-23` a la suite de navegador cuando no se re-ejecuta.

**Qué lo descongela.** Que S-17 vuelva a correr la suite —previsiblemente cuando
`automation/api/` cubra los 4 casos `service` nuevos de DOC-05 1.8.0 (TC-111,
TC-113, TC-115, TC-116)— y publique una versión nueva de este informe. Esa
versión llevará sus `inputs` al día y volverá a entrar en el cálculo.

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
