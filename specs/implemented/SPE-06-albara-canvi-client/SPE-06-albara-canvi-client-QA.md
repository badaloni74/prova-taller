---
spec: SPE-06-albara-canvi-client.md
spec_status: Implemented
generator: A-03 (extraído de TS-SPE-06 original de A-09 al migrar a carpeta por spec, 2026-08-28)
generated_at: 2026-08-28T12:30:00+02:00
commit_range: 65b23a2..dc53dbf
pending_user_confirmation: true
inputs:
  - id: SPE-06-albara-canvi-client
    path: specs/implemented/SPE-06-albara-canvi-client/SPE-06-albara-canvi-client.md
    spec_status: Implemented
    present: true
  - id: DOC-05-PLAN-PRUEBAS
    version: 1.8.0
    present: true
for: s10-auto-tcs
---

# SPE-06-albara-canvi-client — Parte de cambios a las pruebas (`-QA`)

**Pendiente de confirmación del usuario.** Es una propuesta de trabajo para
`s10-auto-tcs` (y para `S-17` en la capa de servicio), no algo ya hecho.

El detalle completo de cada `TC-nnn` está en `docs/DOC-05-PLAN-PRUEBAS.md`
(1.8.0). Aquí va solo qué tocar y qué debe pasar con cada caso.

## 1. Qué se implantó

`SPE-06` (origen `BUG-002`) impide que cambiar el vehículo de un albarán
pendiente mueva el trabajo al cliente de otro vehículo. Commits
`65b23a2..dc53dbf`:

- `65b23a2` — `server/db/seed.js`: segundo vehículo (`6789GHI`) para `Anna Puig
  Ferrer` (NIF `12345671A`), dato imprescindible para probar "cambiar de
  vehículo dentro del mismo cliente".
- `e6ecc5b` — `client/src/pages/albarans/AlbaraForm.tsx`: en la rama de edición,
  el selector de vehículo pasa de `vehiclesService.list()` a
  `vehiclesService.listByClient(clientId)`. La rama de creación no se toca
  (guardia `if (isEdit) return;`).
- `dc53dbf` — cierre administrativo, sin diff funcional.

El rechazo `409` de servidor (`server/routes/albarans.js:95-104`) ya existía de
antes (`ed61c24`); este spec solo lo confirmó por prueba manual.

## 2. Casos de aceptación nuevos

`A-03` (`DOC-05` 1.7.0, commit `e0d6629`) ya creó los 9 casos que cubren los 11
criterios de `SPE-06`. En 1.8.0 quedaron colgados de su requisito real
(`REQ-080` / `REQ-081`). **Ninguno está automatizado todavía.**

| TC-nnn | `verification_path` | Módulo | Destino de automatización |
|---|---|---|---|
| `TC-112` | ui | albarans | `s10-auto-tcs` → `automation/ui/` (`albarans.feature`, rama de edición) |
| `TC-114` | ui | albarans | `s10-auto-tcs` → `automation/ui/` (`albarans.feature`) |
| `TC-117` | ui | albarans | `s10-auto-tcs` → `automation/ui/` (selector filtrado al editar) |
| `TC-118` | ui | albarans | `s10-auto-tcs` → `automation/ui/` (`Boundary`: cliente con un solo vehículo) |
| `TC-111` | service | albarans | `S-17` → `automation/api/` (Negative, 409) |
| `TC-113` | service | albarans | `S-17` → `automation/api/` (Integration, atomicidad: ni fecha ni notas) |
| `TC-115` | service | albarans | `S-17` → `automation/api/` (rechazo "ya facturado" tiene prioridad) |
| `TC-116` | service | albarans | `S-17` → `automation/api/` (vehículo inexistente → motivo `REQ-027`) |
| `TC-119` | mixed | factures | mitad servicio (`S-17`) + mitad pantalla (`s10-auto-tcs`) |

## 3. Cambios a la regresión existente

- **`crear`**: ninguno. La regresión de este cierre se cubre con `TC-nnn` que ya
  existen (ver el `-TS.md`, apartado 4).
- **`modificar`**: ninguno. Ningún `TC-nnn` existente cambió sus `steps` ni su
  `expected` con este spec. `TC-055` sigue con el mismo escenario (solo se
  revisó su `automation.reason` en `DOC-05` 1.7.0).
- **`obsoletas`**: ninguna. Nada se marcó `deprecated` en `DOC-05`.

## 4. Qué debe tocar S-10 / S-17

- **`s10-auto-tcs`** (`automation/ui/`): añadir escenarios para `TC-112`,
  `TC-114`, `TC-117`, `TC-118` en `albarans.feature` (rama de edición de
  cabecera). La PO de `AlbaraForm` ya existe; comprobar si el selector de
  vehículo ya tiene su argumento `Lista: Vehículo` y reutilizarlo. La parte de
  pantalla de `TC-119` (que la factura resultante sale al cliente original) va
  en `factures.feature`.
- **`S-17`** (`automation/api/`, `DOC-26`): `TC-111`, `TC-113`, `TC-115`,
  `TC-116` y la mitad de servicio de `TC-119`. Son reglas que la interfaz con el
  selector ya filtrado no deja ni intentar (`DOC-06/Q-31`), así que la capa de
  servicio es su sitio natural. La colección hoy solo trae `TC-041`, `TC-045`,
  `TC-063`, `TC-064`.

## 5. Riesgo conocido para quien automatice

`TC-055` (cambio de vehículo dentro del mismo cliente, ya automatizado): su
`automation.reason` en `DOC-05` avisa de que el selector ahora carga por `fetch`
(`listByClient`) — el mismo tipo de punto que ya produjo un flake dependiente
del orden en el desplegable de pieza (`DOC-23`). Si `TC-055` sale rojo tras
estos cambios, revisar primero si es ese patrón de flake antes de abrir un
`BUG-nnn`.

## 6. Bloque estructurado

```yaml qa-spec
version: 1
spec: SPE-06-albara-canvi-client.md
pending_user_confirmation: true
acceptance_new:
  - tc: TC-111
    verification_path: service
    module: albarans
  - tc: TC-112
    verification_path: ui
    module: albarans
  - tc: TC-113
    verification_path: service
    module: albarans
  - tc: TC-114
    verification_path: ui
    module: albarans
  - tc: TC-115
    verification_path: service
    module: albarans
  - tc: TC-116
    verification_path: service
    module: albarans
  - tc: TC-117
    verification_path: ui
    module: albarans
  - tc: TC-118
    verification_path: ui
    module: albarans
  - tc: TC-119
    verification_path: mixed
    module: factures
regression_changes:
  crear: []
  modificar: []
  obsoletas: []
for: s10-auto-tcs
also_for: S-17
```
