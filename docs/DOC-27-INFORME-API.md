---
doc_id: DOC-27
doc_name: DOC-27-INFORME-API
version: 1.1.0
status: draft
lifecycle: snapshot   # informe de una corrida concreta de newman (2026-08-29). No se re-ejecuta solo, así que su contenido no "caduca" cuando cambia DOC-05: es un hecho histórico fiel. S-16/cascada.js lo excluye del cálculo de obsolescencia (sale en la sección CONGELADOS). Se descongela solo si S-17 vuelve a ejecutar la suite y publica una versión nueva. Ver DOC-27-INFORME-API-HIST.md.
history: DOC-27-INFORME-API-HIST.md
generator: S-17 s17-api-qa (ejecución newman, sesión Claude Code)
generator_version: "1.1"
generated_at: 2026-08-29T12:20:00+02:00
project: app-taller
language: es
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: 1ba6196
  working_tree_clean: false   # automation/api/tallerMecaniccollection.json y automation/api/README.md ampliados en esta sesión y sin committear; DOC-27 y su -HIST en edición; ajeno: ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/, promptDashboard.txt
entorno:
  api: http://localhost:3001/api (Express + better-sqlite3, npm run start -w server)
  base: data/taller.db RESEMBRADA antes de esta ejecución (rm -f data/taller.db && npm run seed) — 12 clientes, 8 piezas, 7 vehículos, 4 albaranes, 1 factura
  newman: "6.2.2"
  node: "v24.15.0"
  coleccion: automation/api/tallerMecaniccollection.json
  entorno_postman: automation/api/environments/tallerMecanicEnvironmentLocal.json
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.8.0
    hash: sha256:fef49cbc57eec8822b3b5482471ffb205d149bb638bbc76c28f1bf4de6d17cb1
  - id: automation/api/tallerMecaniccollection.json
    from: S-17
    present: true
---

# DOC-27 · Informe de ejecución de la suite de servicio (S-17)

Contraparte de `DOC-23`, que informa de la suite de navegador. Esta cubre los
casos que **la pantalla no permite ni intentar**: enviar un tipo de línea que el
desplegable no ofrece, facturar un albarán ya facturado, mezclar clientes en una
misma factura y —desde esta versión— cambiar por servicio el vehículo de un
albarán a uno de otro cliente, un vector que el selector filtrado de `SPE-06`
sacó de la interfaz.

**Segunda ejecución registrada.** La `1.0.0` (2026-08-24) cubría los 4 casos
`verification_path: service` de `DOC-05` 1.6.0. Esta añade los casos de servicio
de `SPE-06` que llegaron con `DOC-05` 1.8.0.

## 1. Resultado global

| | |
|---|---|
| **Casos de servicio (`TCS-nnn`)** | **22 de 22 en verde** (10 previos + 12 nuevos) |
| Peticiones ejecutadas | 53 (22 casos + 31 de fixture) |
| Assertions | 74 · **0 fallidas** · 0 pendientes |
| Duración | 4,4 s |
| Tiempo medio de respuesta | 6 ms (mín. 2 ms, máx. 75 ms) |

Sin rojos, sin peticiones sin ejecutar y sin ningún `TCS` ausente del JSON de
newman del que sale este informe. Dos corridas seguidas sin resembrar dan el
mismo recuento (53 / 74 / 0).

## 2. Resultado caso a caso

Un `TC-nnn` de `DOC-05` necesita varias comprobaciones: la que provoca el rechazo
y la que confirma que el sistema **no se movió**. Por eso hay 22 `TCS-nnn` para 9
`TC-nnn`.

### 2.1 Casos previos (`1.0.0`, sin cambios)

| `TCS` | Cubre | Qué comprueba | Método | HTTP | Assert. | Resultado |
|---|---|---|---|---|---|---|
| `TCS001` | `TC-041` | Rechaza una anotación de tipo inválido enviada directa al servicio | POST | 400 | 2 | ✅ |
| `TCS002` | `TC-041` | El albarán conserva sus líneas y su base tras el rechazo | GET | 200 | 2 | ✅ |
| `TCS003` | `TC-045` | Rechaza una línea de pieza que no existe en el catálogo | POST | 400 | 2 | ✅ |
| `TCS004` | `TC-045` | El albarán no registra ninguna línea | GET | 200 | 1 | ✅ |
| `TCS005` | `TC-063` | Rechaza la emisión con un albarán ya facturado | POST | 400 | 2 | ✅ |
| `TCS006` | `TC-063` | El albarán facturado sigue enlazado solo a su factura | GET | 200 | 1 | ✅ |
| `TCS007` | `TC-063` | No se ha creado ninguna factura nueva | GET | 200 | 1 | ✅ |
| `TCS008` | `TC-064` | Rechaza la emisión con albaranes de dos clientes distintos | POST | 400 | 2 | ✅ |
| `TCS009` | `TC-064` | Los dos albaranes siguen pendientes | GET | 200 | 1 | ✅ |
| `TCS010` | `TC-064` | No se ha creado ninguna factura nueva | GET | 200 | 1 | ✅ |

### 2.2 Casos nuevos de `SPE-06` (`1.1.0`)

| `TCS` | Cubre | AC | Qué comprueba | Método | HTTP | Assert. | Resultado |
|---|---|---|---|---|---|---|---|
| `TCS011` | `TC-111` | AC-002 / AC-007 | `PUT` que cambia el vehículo del albarán pendiente a uno de otro cliente → 409 con el mensaje de "otro cliente" | PUT | 409 | 2 | ✅ |
| `TCS012` | `TC-111` | AC-002 / AC-007 | El albarán sigue sobre su vehículo, pendiente, con sus 2 líneas y su base intactas | GET | 200 | 3 | ✅ |
| `TCS013` | `TC-113` | AC-004 | `PUT` simultáneo de vehículo-de-otro-cliente + fecha + nota → 409 | PUT | 409 | 2 | ✅ |
| `TCS014` | `TC-113` | AC-004 | Atomicidad: ni el vehículo, ni la fecha, ni la nota se han guardado | GET | 200 | 3 | ✅ |
| `TCS015` | `TC-115` | AC-006 | Sobre un albarán **ya facturado**, el `PUT` con vehículo de otro cliente → 409 con el mensaje de "ya facturado", **no** el de cambio de cliente | PUT | 409 | 3 | ✅ |
| `TCS016` | `TC-115` | AC-006 | El albarán sigue facturado, sobre su vehículo y enlazado a la misma factura | GET | 200 | 3 | ✅ |
| `TCS017` | `TC-115` | AC-006 | La factura sigue mostrando el albarán entre los que agrupa | GET | 200 | 1 | ✅ |
| `TCS018` | `TC-116` | AC-009 | `PUT` sin `vehicle_id` → 400 "campo obligatorio", no el de cambio de cliente | PUT | 400 | 3 | ✅ |
| `TCS019` | `TC-116` | AC-009 | `PUT` con `vehicle_id` inexistente (9999) → 400 "el vehículo no existe", no el de cambio de cliente | PUT | 400 | 3 | ✅ |
| `TCS020` | `TC-116` | AC-009 | El albarán sigue sobre su vehículo, sin cambios | GET | 200 | 2 | ✅ |
| `TCS021` | `TC-119` | AC-008 | El `PUT` a un vehículo de otro cliente que **precede** a la emisión UI se rechaza con 409 | PUT | 409 | 2 | ✅ |
| `TCS022` | `TC-119` | AC-008 | Tras el 409 el albarán sigue sobre su vehículo original y pendiente (garantiza que la factura UI salga al cliente correcto) | GET | 200 | 2 | ✅ |

Los siete rechazos de esta versión (`TCS011`, `TCS013`, `TCS015`, `TCS018`,
`TCS019`, `TCS021`) validan **contrato y datos**: el código y además el literal
exacto del servidor. `TCS015`, `TCS018` y `TCS019` añaden una assertion negativa
—que el mensaje **no** sea el de cambio de cliente— porque el caso es
precisamente sobre qué mensaje gana. Los `GET` restantes son el **efecto
lateral**, consultado en petición aparte.

### 2.3 Los dos literales que `TC-115` fija y que no estaban en `DOC-04`

`server/routes/albarans.js`, ruta `PUT /:id`, los comprueba en este orden:

1. **`L'albarà ja està facturat i no es pot modificar`** — 409, línea ~82, la
   primera comprobación de la ruta, antes incluso de mirar el cuerpo.
2. **`No es pot canviar el vehicle a un que pertany a un altre client`** — 409,
   línea ~101, solo si el albarán no está facturado y el vehículo nuevo es de
   otro cliente.

`TC-115` confirma que sobre un albarán facturado gana (1); `TC-116` confirma que
`El camp vehicle_id és obligatori` (400, línea ~87) y `El vehicle indicat no
existeix` (400, línea ~92) ganan a (2) cuando aplican.

## 3. Aislamiento verificado

Base **resembrada** antes de ejecutar (a diferencia de la `1.0.0`). Estado medido
antes y después de la corrida:

| | Antes | Después |
|---|---|---|
| Facturas | 1 | 1 |
| Albaranes | 4 | 4 |
| Líneas de albarán | 7 | 7 |
| Stock total del catálogo | 167 | 167 |

**Idéntico.** Las 31 peticiones de fixture (`_setup` / `_teardown`) devuelven la
base como estaba. Los 12 casos nuevos:

- **TC-111, TC-113, TC-116, TC-119** crean un albarán pendiente (con líneas de
  mano de obra, nunca de pieza, para no tocar stock) y lo borran en `_teardown`.
- **TC-115** no crea nada: reutiliza el albarán facturado de la base sembrada y
  su `PUT` se rechaza, así que no hay nada que deshacer.

`restores_state: true` en los 5 casos de `DOC-05`, y se cumple en los 5.

## 4. La mitad de servicio de TC-119 (`verification_path: mixed`)

`TC-119` es el primer caso `mixed` del plan. Se reparte:

- **Mitad de pantalla** — emitir la factura para el cliente original y comprobar
  que sale a su nombre con base 95,00 €. Ya la cubre
  `automation/ui/factures.feature` (commit `1ba6196`, S-10).
- **Mitad de servicio** (aquí, `TCS021` + `TCS022`) — el `PUT` rechazado con 409
  que precede a la emisión, y la comprobación de que tras el 409 el albarán sigue
  sobre su vehículo original. Eso es lo que garantiza que la emisión UI salga
  bien.

**No se emite la factura por API.** Hacerlo duplicaría exactamente lo que la
suite UI ya verifica (que la factura sale al cliente correcto), con el coste de
mantener la misma aserción en dos sitios. Se aplica el criterio "no dupliques lo
que S-10 ya cubre" de la skill. La coordinación es por el tag `TC-119`, igual que
se hizo con `TC-041`.

## 5. Hallazgos abiertos sobre el servidor

Sin novedad respecto a la `1.0.0`. Ninguno afecta a los resultados; se esquivan
desde la colección, no se corrigen desde ella. Detallados en
`automation/api/README.md`.

1. **`DELETE /api/albarans/:id` no restaura el stock** de sus líneas de pieza, a
   diferencia del borrado de una línea suelta. Los casos nuevos lo evitan usando
   solo líneas de mano de obra. Candidato para `A-12 · Roadmap`.
2. **Una factura emitida no se puede anular por ninguna vía.** Emitir es, hoy,
   irreversible. Parece más una propuesta funcional (`A-15`) que una mejora
   técnica.

## 6. Cobertura y límites de este informe

- Cubre **8 de los 119 casos** de `DOC-05` 1.8.0 marcados
  `verification_path: service` (TC-041, TC-045, TC-063, TC-064, TC-111, TC-113,
  TC-115, TC-116) **más la mitad de servicio del único `mixed`** (TC-119). Los
  demás son cosa de `DOC-23` (`automation/ui/`, 102 automatizados incluida la
  mitad de pantalla de TC-119) o siguen sin automatizar.
- **La base sí se resembró** antes de ejecutar. Esta es una corrida de entrega,
  no de repetibilidad; aun así se comprobó (sección 1) que dos pasadas seguidas
  sin resembrar dan el mismo recuento.
- El JSON de newman del que sale todo esto (`automation/api/newman/run.json`)
  **no se versiona**.

## 7. Preguntas abiertas

1. **¿Debe la familia `TCS-nnn` darse de alta en `registro-ids.json`?** Sigue sin
   resolver desde la `1.0.0`. Ahora hay 22 identificadores y la regla de no
   reutilizarlos se respeta a mano, sin nada que lo impida mecánicamente.
2. **¿Entra esta suite en el Go/No-Go?** Con este documento `A-05` puede citar la
   cobertura de servicio para 8 casos + medio; lo decide `A-05`.
