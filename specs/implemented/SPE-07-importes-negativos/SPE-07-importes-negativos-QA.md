---
spec: SPE-07-importes-negativos.md
spec_status: Implemented
commits: [969edf9, e7ab829, 2b841e3, 29371fd, 6499474]
generator: A-03 plan de pruebas — revisión post-implementación
generated_at: 2026-08-30T20:15:00+02:00
pending_user_confirmation: true
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    version: 1.9.0
    hash: sha256:9cea84a7f8804d357a6b69498bf9ece90eb437ca681cb8181996cee1788d36f9
  - id: DOC-04-FUNCIONAL.md
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
---

# SPE-07-importes-negativos — parte de trabajo para `s10-auto-tcs`

> Pendiente de confirmación del usuario. Es una propuesta de lo que hay que
> tocar en `automation/ui/` y `automation/api/`, no un cambio ya hecho — este
> documento no toca esas carpetas (regla de zonas de `CLAUDE.md`).

## 1. Qué se implantó

`server/routes/peces.js` (POST/PUT) y `server/routes/albarans.js` (POST
`/:id/linies`) rechazan ahora `preu`/`cost` ≤ 0 y `estoc` < 0 (`estoc: 0` sigue
siendo válido); `PecaForm.tsx` y `AlbaraLiniesSection.tsx` repiten la misma
validación en pantalla, con mensajes fijos en castellano. Cierra `BUG-003`
(`DOC-24`) y `DOC-04/Q-12`. Commits `969edf9`..`6499474`, rama
`spec-07-importes-negativos`.

## 2. Casos de aceptación nuevos

Los siete `TC-nnn` que se acaban de crear en `DOC-05` (1.9.0) para los diez
`AC-nnn` del spec (`AC-006` ya estaba cubierto por `TC-046`, sin cambio). El
detalle completo de cada caso —`steps`, `preconditions`, `test_data_ref`— vive
en `DOC-05`; aquí va solo lo que hace falta para localizarlo y decidir si se
automatiza ya.

| TC | `verification_path` | Módulo | Candidato de automatización |
|---|---|---|---|
| TC-120 | service | peces | `automation/api/` — nueva petición Postman `POST /api/peces` con `preu`/`cost`/`estoc` inválidos (4 asserts) + `estoc: 0` válido + cleanup. Ningún Page Object de UI: es puramente de servicio |
| TC-121 | service | peces | `automation/api/` — nueva petición `PUT /api/peces/:id` con los tres valores inválidos, sin cleanup necesario (todo se rechaza) |
| TC-122 | service | albarans | `automation/api/` — nueva petición `POST /api/albarans/:id/linies` con `tipus: ma_obra` y `preu` negativo/cero/omitido (3 asserts) |
| TC-123 | service | albarans | `automation/api/` — nueva petición `POST /api/albarans/:id/linies` con `tipus: peca` y `preu` override negativo |
| TC-124 | ui | peces | `automation/ui/` — nuevo escenario en `peces.feature`; Page Object candidato `PecaFormPO.java` (ya existe, ver campos `preu`/`cost`/`estoc`) |
| TC-125 | ui | albarans | `automation/ui/` — nuevo escenario en `albarans.feature`; Page Object candidato `AlbaraFormPO.java` o el que gestione la sección de líneas (ver `AlbaraDetallPO.java`) |
| TC-126 | mixed | peces | Igual que `TC-041`/`TC-119`: requiere coordinar `automation/api/` (paso de servicio) y `automation/ui/` (paso de pantalla). Candidato: escenario nuevo en `peces.feature` que invoca la API directamente en su primer paso |

## 3. Cambios a la regresión existente

```yaml
crear: []            # ya declarado en DOC-05 como los siete TC-nnn de la sección 2; no hay regresión adicional que no sea ya un TC-nnn de este spec
modificar: []        # ningún TC-nnn existente cambió de steps/expected — TC-046 (AC-006) se revisó y no se reescribió
obsoletas: []        # ningún TC-nnn se retira
```

Nada que crear/modificar/retirar fuera de los siete casos ya listados arriba.

## 4. Qué debe tocar S-10 (y S-17)

- **`automation/api/tallerMecaniccollection.json`** (S-17): añadir las cuatro
  peticiones de `TC-120` a `TC-123`, cada una con su `TCS-nnn` propio siguiendo
  la numeración que ya usa la colección. Ninguna de las cuatro necesita
  `_setup`/`_teardown` nuevo más allá de reutilizar la pieza `FIL-001` (DS-003)
  y el albarán de `DS-005` que ya siembra el proyecto — `TC-120` crea y borra su
  propia pieza (`NEG-001`) dentro de la misma petición/carpeta.
- **`automation/ui/src/test/resources/features/peces.feature`**: dos
  escenarios nuevos, uno para `TC-124` (formulario de pieza) y otro para
  `TC-126` (mixto, cierra `BUG-003`; ver nota sobre `TC-900` más abajo).
- **`automation/ui/src/test/resources/features/albarans.feature`**: un
  escenario nuevo para `TC-125` (formulario de línea de mano de obra).
- **Nota sobre `TC-900`.** `TC-900` (en `albarans.feature`, serie `TC-9nn`,
  fuera del rango del plan) vigila `BUG-001`, no `BUG-003`: no hay ningún
  caso-testigo equivalente para `BUG-003` que haya que retirar o migrar. `Q-19`
  decidió no crear testigos para `BUG-003` en su momento (apartado 6.4 de
  `DOC-05`), así que `TC-126` nace limpio, sin nada que sustituir.
- Ningún Page Object nuevo parece necesario: `PecaFormPO.java` y
  `AlbaraFormPO.java`/`AlbaraDetallPO.java` ya existen y cubren los campos que
  estos casos ejercen. Confirmarlo es trabajo de `s10-auto-tcs`, no de esta
  revisión.

## 5. Bloque estructurado

```yaml qa-spec
version: 1
spec: SPE-07-importes-negativos.md
pending_user_confirmation: true
acceptance_new:
  - tc: TC-120
    verification_path: service
    module: peces
  - tc: TC-121
    verification_path: service
    module: peces
  - tc: TC-122
    verification_path: service
    module: albarans
  - tc: TC-123
    verification_path: service
    module: albarans
  - tc: TC-124
    verification_path: ui
    module: peces
  - tc: TC-125
    verification_path: ui
    module: albarans
  - tc: TC-126
    verification_path: mixed
    module: peces
regression_changes:
  crear: []
  modificar: []
  obsoletas: []
for: s10-auto-tcs
```
