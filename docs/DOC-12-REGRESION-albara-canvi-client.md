---
doc_id: DOC-12
doc_name: DOC-12-REGRESION-albara-canvi-client
version: 1.0.0
status: draft
generator: A-09 regresión inteligente
generated_at: 2026-08-23T17:32:00+00:00
project: app-taller
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: worktree-agent-a479b252487473048
  commit_sha: b325248946c22fd06c9d1afdac65c56560a2b8bf
  working_tree_clean: true
inputs:
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 2.0.2
    hash: sha256:25a8475707e073adf5ab6bd681cb01131118843ecc78f454a60381bf66f17f41
    present: true
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:7258c6a31b47b321c28dd6753d74950fc4159d316219a3cfe74fafd76edbfe58
    present: true
    note: >-
      El hash declarado por DOC-09 para esta misma versión 1.6.0 no coincide con el que da
      esta lectura directa. No lo interpreto como cambio de contenido -el bloque `testcases`
      de 1.6.0 está confirmado byte a byte estable por la propia procedencia de DOC-05 (ver
      su "Resello del 2026-08-22")-, sino como una discrepancia de cómputo de hash entre
      ejecuciones. Se declara para que quien audite sepa que no se ha recalculado a mano.
  - id: DOC-07-MATRIZ.csv
    from: A-05
    version: 1.7.0
    hash: sha256:1676546ad1473a6401ab8aaa6010e246f2f4b2ef4693da37c75c305ec540efb3
    present: true
    usage: contraste de REQ->TC y de prioridad requisito/caso, no sustituye a DOC-05
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    version: 1.8.0
    hash: sha256:095c6baf223b634dc80d00e91b907017166853622df49ce3f9192f5e476ad247
    present: true
    usage: >-
      evidencia de BUG-002 (§1 de este documento) y de la ausencia del patrón
      "critical cubierto solo por High" en el alcance de este evolutivo
  - id: DOC-20-RALLY-STATE.json
    from: I-01
    present: false
    note: no existe ningún fichero DOC-20 ni equivalente en docs/. Ver §6.
---

# DOC-12 · Regresión inteligente — `EVO-001` · Un albarán no puede cambiar de cliente

## 1. La cifra

**30 de 110 casos** (27 %). 9 por impacto directo, 21 por ser `smoke` de toda la
aplicación. **La regla de vecindad no añade ningún caso más** de los que ya
entran por impacto directo o por smoke — la razón se explica en el apartado 2 y
no es un descuido, es la misma disciplina que `DOC-09` §2.2 aplicó al grafo de
componentes: extender la selección a todo lo que comparte el campo `component`
de `DOC-05` (28 casos de `albarans`, 12 de `vehicles`, 19 de `factures` = 59)
repetiría el cierre transitivo ciego que `DOC-09` rechazó explícitamente, porque
`EVO-001` no toca esos módulos entero: toca dos ficheros y unas líneas
concretas (`DOC-09` §2.1, §2.4).

**Sin `DOC-20-RALLY-STATE.json`** (no existe en `docs/`, comprobado): esta
selección es **teórica**. No sé si estos 30 casos existen hoy en Rally, ni si
alguna vez se ejecutaron, ni con qué resultado. Ver §6.

**Un hallazgo que sostiene el recorte más que cualquier argumento teórico.**
`DOC-07-TRAZABILIDAD.md` 1.8.0 §"Bugs y su detección" (línea 498) registra:

| Bug | Sev. | Requisito | Prio. req | Casos | Vía | Diagnóstico | ¿Algún caso lo detecta? |
|---|---|---|---|---|---|---|---|
| BUG-002 | critical | REQ-040 | medium | TC-055 | `ui` | `Correcto` | **No** |

`BUG-002` es la factura de 114.835,05 € emitida al cliente equivocado
(`DOC-24`, citada también por `DOC-09` §3.2 y RS-02). Es la prueba de que el
único caso existente de `REQ-040` (`TC-055`, y por herencia todo lo que hoy
cubre el camino feliz de cambiar el vehículo) **ya falló una vez en no detectar
exactamente el daño que `EVO-001` corrige**. Eso no es una hipótesis de A-07:
es un incidente real, registrado y con caso testigo que lo dejó pasar.

## 2. Criterio de selección

He trabajado sobre los bloques `impacto` de `DOC-09` (§7) y `testcases` de
`DOC-05` (§4.1-4.12), no sobre su prosa, salvo para citar la evidencia de
`BUG-002` de `DOC-07-TRAZABILIDAD`.

1. **Impacto directo** — todo `TC-nnn` que `DOC-09` lista en
   `requirements_affected[].test_cases`. Entran sin discusión: 8 casos
   declarados por `DOC-09`, más uno que `DOC-09` declaró vacío por error (ver
   nota siguiente) = 9.

   **Corrección sobre `DOC-09`.** Su bloque `requirements_affected` da
   `REQ-011: test_cases: []`, y su tabla §3.3 lo confirma con un guion. Pero
   `DOC-07-MATRIZ.csv` (fila `REQ-011`) y `DOC-07-TRAZABILIDAD.md` (línea 826,
   familia `A-05-11c`) dan los dos `TC-015` como el único caso de `REQ-011`, y
   `DOC-05` §4.2 lo confirma (`TC-015 | REQ-011 | Rechazar el alta de un
   vehículo sin cliente existente | Critical`). El propio `DOC-09` §3.3
   explica por qué `REQ-011` está en el alcance: *"la regla nueva se apoya en
   que todo vehículo tiene cliente; si REQ-011 cayera, EVO-001 se queda sin
   criterio de comparación"* — así que el caso que lo protege debe entrar, y
   `TC-015` es ese caso. Se selecciona por `impacto_directo`, citando la
   corrección.

2. **Vecindad** — módulos de los `components_affected` con `distance: 0` o
   `1`: `albarans-router`/`albarans-pages` (0), `vehicles-router`/
   `vehicles-service`/`albarans-service`/`shared-components`/`factures-router`/
   `db-connection`/`server-app`/`db-numbering` (1). De estos, solo
   `albarans-router`, `albarans-pages`, `vehicles-router`, `vehicles-service` y
   `factures-router` tienen un módulo de prueba reconocible en `DOC-05`
   (`albarans`, `vehicles`, `factures`); `shared-components`, `db-connection`,
   `server-app` y `db-numbering` no son un módulo de negocio con casos propios.

   **Por qué no añado nada.** `DOC-09` §2.1 y §2.4 acotan el cambio real a
   `PUT /:id` (líneas 76-103 de `albarans.js`) y al selector de
   `AlbaraForm.tsx`; explícitamente descarta el resto del router de albaranes
   (`POST /linies`, alta de albarán) por estar fuera de alcance (`DOC-08` §5.1,
   citado en `DOC-09` §2.4 fila `db-numbering`). `vehicles-router` y
   `vehicles-service` están marcados `review` porque **no necesitan cambio**
   (`GET /api/vehicles?client_id=` y `listByClient()` ya existen). Y
   `factures-router` está marcado `behaviour`, no `breaks`: cambia de
   significado sin que ninguna línea se toque, y su caso ya está cubierto por
   impacto directo (`TC-064`, `REQ-046`). Tomar por vecindad *todo* lo que
   `DOC-05` etiqueta `component: albarans` (28 casos, incluida la gestión de
   líneas y el numerador, que `EVO-001` no toca) sería exactamente el error de
   granularidad que `DOC-09` §2.2 nombra y evita para el grafo de componentes.
   Aplico la misma disciplina al plan de pruebas. El detalle de qué queda
   fuera por este motivo, y qué se acepta al dejarlo fuera, está en §4.

3. **Riesgos silenciosos** — los 6 `silent_risks` de `DOC-09` (`RS-01` a
   `RS-06`). **Ninguno tiene un caso que lo vigile.** No es una omisión de este
   documento: es lo que dice `DOC-09` de cada uno, y lo confirma `DOC-05` por
   partida doble (§4.12: *"cuatro de los once criterios de EVO-001 solo son
   alcanzables por servicio [...] los casos nacerán en la regeneración de este
   plan"*, y el `Anexo · 1.6.0` para la familia `TC-045/063/064`). Van a §5
   como huecos, no como selección.

4. **Smoke** — los 21 casos con tag `smoke` en todo `DOC-05`, sin filtrar por
   módulo, tal como pide el contrato. Ninguno coincide con los 9 de impacto
   directo.

5. **Histórico de fallos** — no aplicable. `DOC-20-RALLY-STATE.json` no
   existe; no hay ejecución anterior de la que extraer candidatos. Ver §6.

**Comprobación del patrón "critical cubierto solo por High".** El encargo pide
vigilar específicamente que un requisito `critical` no dependa solo de casos
`High`. Lo he comprobado para los siete requisitos del alcance
(`REQ-011/015/027/040/041/042/046`): sus prioridades de requisito y de caso
coinciden en todos (`REQ-011` critical → `TC-015` Critical; `REQ-046` critical
→ `TC-064` Critical; `REQ-042` critical → `TC-057/058/059` Critical; `REQ-027`
critical → `TC-036` Critical; `REQ-015` high → `TC-021` High; `REQ-040` y
`REQ-041` medium → `TC-055`/`TC-056` Medium). `DOC-07-TRAZABILIDAD.md` línea
393 lo confirma también a nivel de proyecto: *"Requisitos critical sin ningún
caso Critical: 0 de 35"*. El patrón que se pidió vigilar no aparece en este
alcance ni en el proyecto hoy.

## 3. Casos seleccionados

### 3.1 Por impacto directo (9)

| TC | Módulo | Prioridad | Requisito | Motivo |
|---|---|---|---|---|
| TC-015 | vehicles | Critical | REQ-011 | `EVO-001` se apoya en que todo vehículo tiene cliente (`DOC-09` §3.3); caso corregido, ver §2.1 |
| TC-021 | vehicles | High | REQ-015 | La otra puerta de la misma fuga, `PD-002` (`DOC-09` §3.4); fuera de alcance de implementación pero dentro de vigilancia |
| TC-036 | albarans | Critical | REQ-027 | AC-009 exige distinguir el motivo del rechazo; mismo router, `DOC-09` §3.3 |
| TC-055 | albarans | Medium | REQ-040 | Camino feliz de AC-001; contradicho en parte por `EVO-001` (`DOC-09` §3.1). Es el caso que no detectó `BUG-002` (§1) |
| TC-056 | albarans | Medium | REQ-041 | Única salida del usuario ante un cambio ya hecho; `PD-003` (`DOC-09` §3.3) |
| TC-057 | albarans | Critical | REQ-042 | AC-006: el bloqueo por facturado debe seguir mandando antes que la regla nueva (`DOC-09` §3.3) |
| TC-058 | albarans | Critical | REQ-042 | Ídem, sobre el borrado |
| TC-059 | albarans | Critical | REQ-042 | Ídem, sobre líneas |
| TC-064 | factures | Critical | REQ-046 | El requisito que se refuerza (`DOC-09` §3.2/RS-02); ver nota de vía en §1 |

**Nota sobre `TC-064` y la vía de verificación.** `DOC-09` (leído "en caliente"
sobre `DOC-05` 1.5.0, caveat propio en su §3) cita `TC-064` con
`verification_path: ui` y dice que no puede componerse desde `FacturaForm`. La
versión actual de `DOC-05`, **1.6.0**, ya lo corrigió: `TC-064` (y `TC-063` y
`TC-045`) están reclasificados a `verification_path: service` desde el
`Anexo · Versión 1.6.0`. El caso sigue existiendo y sigue siendo el único de
`REQ-046`; lo que cambió es la vía por la que hay que ejecutarlo, de `S-10`
(interfaz) a `S-17` (servicio, `automation/api`). `automation/ui/` no lo
incluye — confirmado en `DOC-23-INFORME.md` §5, que lo lista entre los 8 casos
sin vector por interfaz.

### 3.2 Por smoke (21)

| TC | Módulo | Prioridad |
|---|---|---|
| TC-001 | clients | High |
| TC-003 | clients | Critical |
| TC-006 | clients | High |
| TC-013 | vehicles | Critical |
| TC-020 | vehicles | High |
| TC-024 | peces | High |
| TC-034 | albarans | Critical |
| TC-037 | albarans | Critical |
| TC-040 | albarans | Critical |
| TC-048 | albarans | Critical |
| TC-050 | albarans | Critical |
| TC-060 | factures | Critical |
| TC-065 | factures | Critical |
| TC-069 | factures | Critical |
| TC-071 | factures | Critical |
| TC-074 | factures | High |
| TC-080 | personal | High |
| TC-088 | nomines | Critical |
| TC-097 | nomines | High |
| TC-098 | nomines | Critical |
| TC-105 | shell | High |

Motivo único para los 21: tag `smoke` en `DOC-05`, aplicado sin filtrar por
módulo, tal como pide el contrato de este documento. Confirman que la
aplicación arranca y que los flujos base de cada módulo no se han roto por
efecto colateral — no ejercitan la regla de `EVO-001`, salvo `TC-034` (crea un
albarán con `AlbaraForm.tsx` en modo alta, el mismo componente que
`AC-010`/`AC-011` tocan en modo edición) y `TC-060`/`TC-065` (emisión de
factura, el flujo que `factures-router` protege).

**Nota sobre `TC-048`.** Está seleccionado por smoke. `CLAUDE.md` y `DOC-23`
§4 lo declaran hoy en rojo por falta de aislamiento con `TC-040` (defecto de
la prueba, no de la aplicación). No cambio su selección por eso — es el
propio contrato de S-10/Jenkins decidir el orden de ejecución que evita el
choque — pero lo señalo para que quien ejecute no lo lea como una sorpresa.

### 3.3 Estimación de ejecución

| Prioridad | Nº casos |
|---|---|
| Critical | 19 |
| High | 9 |
| Medium | 2 |
| Low | 0 |
| **Total** | **30** |

| Módulo | Nº casos |
|---|---|
| albarans | 8 |
| factures | 6 |
| vehicles | 4 |
| clients | 3 |
| nomines | 3 |
| peces | 1 |
| personal | 1 |
| shell | 1 |

**Automatizable vs. manual.** De los 30, **29 tienen vector por interfaz y
están hoy en `automation/ui/`** (confirmado contra la lista de 8 excluidos de
`DOC-23-INFORME.md` §5: ninguno de los 8 —`TC-032, TC-033, TC-041, TC-045,
TC-047, TC-063, TC-064, TC-109`— coincide con esta selección salvo `TC-064`).
**`TC-064` es el único de los 30 que no tiene automatización hoy**: su vía es
`service` y su automatización es encargo de `S-17`/`automation/api`
(`DOC-05` Anexo 1.6.0), no de `automation/ui`. Es, además, precisamente el
caso que protege `REQ-046` — el requisito money-critical del alcance —, así
que su ausencia de automatización no es un detalle menor: es el hueco de
automatización más caro de los 30.

## 4. Lo que queda fuera y el riesgo aceptado

**80 casos de 110 no entran.** Se agrupan así:

1. **51 casos de otros módulos** (`peces` salvo `TC-024`, `personal` salvo
   `TC-080`, `nomines` salvo `TC-088/097/098`, `configuracio`) — `DOC-09` no
   los toca en ningún grado, ni siquiera `review`. **Riesgo aceptado:** ninguno
   específico de `EVO-001`; el riesgo genérico de regresión de la aplicación
   completa se acepta y queda cubierto por la ejecución completa periódica, no
   por esta selección.

2. **20 casos de `albarans` fuera del alcance de la vecindad** (`TC-032,
   033, 035, 038, 039, 041, 042, 043, 044, 045, 046, 047, 049, 051, 052, 053,
   054`, más los tres ya excluidos por tag: ninguno) — cubren numeración,
   gestión de líneas, herencia de precio y movimiento de stock. `DOC-09` §2.4
   marca el router de albaranes como afectado solo en las líneas 76-103 del
   `PUT /:id`; estos casos ejercen `POST /linies` y `DELETE /linies`, que
   `EVO-001` no toca. **Riesgo aceptado:** que un efecto colateral no previsto
   del cambio (por ejemplo, una regresión accidental en la misma transacción
   de guardado, señalada por `RS-05`) afecte a estas rutas sin que este
   subconjunto lo detecte antes de la ejecución completa.

3. **8 casos de `vehicles` fuera de vecindad** (`TC-012, 014, 016, 017, 018,
   019, 022, 023`) — alta, baja y validación de matrícula del vehículo, no la
   pertenencia a cliente. **Riesgo aceptado:** ninguno directo; `vehicles-router`
   está marcado `review` por `DOC-09` precisamente porque no cambia.

4. **13 casos de `factures` fuera de vecindad** (`TC-061, 062, 063, 066, 067,
   068, 070, 072, 073, 075, 076, 077, 078`) — cálculo de IVA, numeración,
   estado de pago, y las dos negativas ya reclasificadas a `service` que no
   son `REQ-046`. **Riesgo aceptado, y el más discutible de los cuatro:**
   `TC-061` («La emisión solo ofrece albaranes pendientes del cliente
   elegido») es el caso que hoy confirma el filtro de pantalla que `DOC-09`
   RS-01 señala como «la mitad que puede pudrirse sin ruido» del mismo patrón
   que protege `REQ-046`. No lo incluyo porque `factures-pages` está a
   distancia 2 y `DOC-09` la marca `review` sin cambio, pero **si A-11 quiere
   más margen de red en el punto exacto que RS-01 nombra como precedente,
   `TC-061` es el primer candidato a añadir**, no una elección arbitraria.

**Total con riesgo aceptado explícito y no genérico:** los grupos 2 y 4;
`accepted_risk` en el bloque estructurado los resume.

## 5. Huecos

Los 6 `silent_risks` de `DOC-09`, **ninguno con caso que lo vigile**:

| RS | Descripción (resumen) | Cubierto por |
|---|---|---|
| RS-01 | La regla vive dos veces (filtro de pantalla + comprobación de servidor); si se pudre la comprobación, nada falla y el dinero se va. Precedente ya ocurrido en `factures-router`/`REQ-046` | `null` — nace cuando A-02 regenere `DOC-04` y A-03 escriba los casos `service` de AC-002/004/007/009 (`DOC-05` §4.12) |
| RS-02 | `factures-router` cambia de garantía sin cambiar de código: hoy no detecta el albarán movido y usa ese cliente para emitir | `null` — ningún caso combina "cambiar vehículo" + "emitir factura y comprobar el cliente resultante" |
| RS-03 | `AlbaraForm` sirve para alta y edición; tras el cambio, un mismo componente filtra al editar y no al crear | `null` — `TC-034` (alta) y `TC-055` (edición, seleccionado) existen por separado, pero ninguno compara ambos modos entre sí |
| RS-04 | Si la comprobación nueva se coloca en el orden equivocado, el rechazo es correcto pero el motivo es el equivocado | `null` — cobertura automatizada 0 %, literales de aviso sin documentar (`DOC-09` cita la propia nota de `TC-064`) |
| RS-05 | La atomicidad de AC-004 se cumple hoy por accidente (un único `UPDATE` sin transacción) | `null` — nadie prueba atomicidad de este `UPDATE` |
| RS-06 | El mensaje de rechazo saldrá en catalán en interfaz castellana y se pintará bajo el campo de vehículo sea cual sea el motivo | `null` — ningún caso fija idioma de interfaz + literal de error de este endpoint |

Estos seis huecos no son responsabilidad de esta selección: son responsabilidad
de A-03 cuando escriba los casos nuevos que `DOC-09` §3.5 y `DOC-05` §4.12 dan
por nacidos-pero-no-escritos-todavía. Este documento se limita a declararlos
para que A-11 no los lea como cubiertos por omisión.

## 6. Estado en Rally

**No se conoce.** `docs/DOC-20-RALLY-STATE.json` no existe — comprobado
directamente en `docs/`, no solo asumido por falta de mención en el encargo.
Consecuencias:

- No sé si alguno de los 30 casos seleccionados existe hoy como caso en Rally.
- No sé si se ejecutaron antes ni con qué resultado; `last_result: n/d` en los
  30, sin excepción, en el bloque estructurado.
- Lo único parecido a un historial de ejecución que existe es
  `DOC-23-INFORME.md` (suite de `automation/ui/`, no Rally): 106 verds, 1
  vermell (`TC-048`, defecto de la prueba), y **es anterior al SPEC 05**
  (`CLAUDE.md`, estado conocido): sus literales de importe pueden estar
  comparando con punto decimal donde la pantalla ya usa coma
  (`EXP-027`), lo que probablemente afecta a `TC-069`, `TC-071`, `TC-074`,
  `TC-097` y `TC-098` de esta selección — los cinco son `smoke` y llevan cifra
  o total en pantalla. No lo cuento como `last_result` porque no es estado de
  Rally y porque `DOC-23` mismo advierte que su "106 verds" ya no es fiable;
  lo señalo aquí para que S-10 lo tenga presente al re-ejecutar antes de que
  A-11 decida sobre esta selección.

Esta selección es, por tanto, **teórica**: responde a «qué deberíamos
ejecutar», no a «qué existe ya en Rally y con qué resultado». Cuando exista
`DOC-20`, este documento debe regenerarse.

## 7. Bloque estructurado

```yaml regresion
version: 1
evolutivo: EVO-001
rally_state_known: false
selected:
  - id: TC-015
    module: vehicles
    priority: Critical
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-021
    module: vehicles
    priority: High
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-036
    module: albarans
    priority: Critical
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-055
    module: albarans
    priority: Medium
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-056
    module: albarans
    priority: Medium
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-057
    module: albarans
    priority: Critical
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-058
    module: albarans
    priority: Critical
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-059
    module: albarans
    priority: Critical
    reason: impacto_directo
    automated: true
    last_result: n/d
  - id: TC-064
    module: factures
    priority: Critical
    reason: impacto_directo
    automated: false
    last_result: n/d
  - id: TC-001
    module: clients
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-003
    module: clients
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-006
    module: clients
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-013
    module: vehicles
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-020
    module: vehicles
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-024
    module: peces
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-034
    module: albarans
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-037
    module: albarans
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-040
    module: albarans
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-048
    module: albarans
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
    note: rojo hoy en DOC-23 §4 por falta de aislamiento con TC-040, defecto de la prueba
  - id: TC-050
    module: albarans
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-060
    module: factures
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-065
    module: factures
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-069
    module: factures
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-071
    module: factures
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-074
    module: factures
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-080
    module: personal
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-088
    module: nomines
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-097
    module: nomines
    priority: High
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-098
    module: nomines
    priority: Critical
    reason: smoke
    automated: true
    last_result: n/d
  - id: TC-105
    module: shell
    priority: High
    reason: smoke
    automated: true
    last_result: n/d

excluded_summary:
  total: 80
  groups:
    - group: otros_modulos_no_tocados
      count: 51
      accepted_risk: >-
        ninguno especifico de EVO-001; riesgo generico de regresion de la aplicacion completa,
        cubierto por la ejecucion completa periodica, no por este subconjunto
    - group: albarans_fuera_de_vecindad
      count: 17
      ids: [TC-032, TC-033, TC-035, TC-038, TC-039, TC-041, TC-042, TC-043, TC-044, TC-045, TC-046, TC-047, TC-049, TC-051, TC-052, TC-053, TC-054]
      accepted_risk: >-
        gestion de lineas, numeracion e inheritance de precio, no tocadas por PUT /:id
        (DOC-09 2.4). Riesgo aceptado: efecto colateral no previsto en la misma transaccion
        de guardado (RS-05) no se detecta antes de la ejecucion completa
    - group: vehicles_fuera_de_vecindad
      count: 8
      ids: [TC-012, TC-014, TC-016, TC-017, TC-018, TC-019, TC-022, TC-023]
      accepted_risk: ninguno directo; vehicles-router esta en review sin cambio segun DOC-09
    - group: factures_fuera_de_vecindad
      count: 13
      ids: [TC-061, TC-062, TC-063, TC-066, TC-067, TC-068, TC-070, TC-072, TC-073, TC-075, TC-076, TC-077, TC-078]
      accepted_risk: >-
        TC-061 es el mas discutible: confirma el filtro de pantalla que RS-01 senala como la
        mitad fragil del patron de doble proteccion. Se acepta el riesgo de no vigilarlo aqui;
        es el primer candidato a anadir si A-11 pide mas margen

gaps:
  - silent_risk: "RS-01 · la regla vive dos veces (filtro de pantalla + comprobacion de servidor); si se pudre la comprobacion, nada falla y el dinero se va"
    covered_by: null
  - silent_risk: "RS-02 · factures-router cambia de garantia sin cambiar de codigo; hoy no detecta el albaran movido"
    covered_by: null
  - silent_risk: "RS-03 · AlbaraForm filtra al editar y no al crear, sin error en ninguno de los dos casos"
    covered_by: null
  - silent_risk: "RS-04 · la comprobacion nueva en el orden equivocado da un rechazo correcto con el motivo equivocado"
    covered_by: null
  - silent_risk: "RS-05 · la atomicidad de AC-004 se cumple hoy por accidente estructural (un unico UPDATE sin transaccion)"
    covered_by: null
  - silent_risk: "RS-06 · el mensaje de rechazo saldra en catalan en interfaz castellana y bajo el campo equivocado"
    covered_by: null

totals:
  selected: 30
  of: 110
  by_priority: { Critical: 19, High: 9, Medium: 2, Low: 0 }
  by_module: { albarans: 8, factures: 6, vehicles: 4, clients: 3, nomines: 3, peces: 1, personal: 1, shell: 1 }
  automated: 29
  manual_or_service_only: 1
```
