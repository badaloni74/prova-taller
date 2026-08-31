---
spec: SPE-08-factura-rectificativa.md
spec_status: Implemented
commits: [e788063, eff00e1, 106cf11, df1ab05]
generator: A-03 plan de pruebas — revisión post-implementación
generated_at: 2026-08-31T10:00:00+02:00
pending_user_confirmation: true
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    version: 1.10.0
    hash: sha256:a050cca8974802655ff15515c99cde729d7c976d866a9622f30f689398745f32
  - id: DOC-04-FUNCIONAL.md
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
---

# SPE-08-factura-rectificativa — parte de trabajo para `s10-auto-tcs`

> Pendiente de confirmación del usuario. Es una propuesta de lo que hay que
> tocar en `automation/ui/` y `automation/api/`, no un cambio ya hecho — este
> documento no toca esas carpetas (regla de zonas de `CLAUDE.md`).

## 1. Qué se implantó

`server/routes/factures.js` gana `POST /:id/rectificar`: rechaza sin motivo
(400), factura inexistente (404) o ya rectificada (409); en una transacción,
libera los albaranes agrupados a `estat: 'pendent'`/`factura_id: NULL` e
inserta la rectificativa numerada `año/R-nnnu` (`generateNumero('factures',
'R')`, sin cambio de firma). El listado y el detalle exponen el campo
calculado `anuladaPer` (`EXISTS` sobre `factura_rectificada_id`).
`FacturaDetail.tsx`, `FacturesList.tsx` y `ClientDetail.tsx` muestran la marca
«Anulada» y el enlace bidireccional. Cierra `BUG-004` (`DOC-24`) y
`DOC-04/Q-06`. Commits `e788063`..`df1ab05`, rama
`spec-08-factura-rectificativa`.

## 2. Casos de aceptación nuevos

Los seis `TC-nnn` que se acaban de crear en `DOC-05` (1.10.0) para los once
`AC-nnn` del spec (`AC-008` ya estaba cubierto por `TC-078`, sin cambio;
`AC-011` lo cubre el propio `TC-127` contra datos de seed equivalentes). El
detalle completo de cada caso —`steps`, `preconditions`, `test_data_ref`— vive
en `DOC-05`; aquí va solo lo que hace falta para localizarlo y decidir si se
automatiza ya.

| TC | `verification_path` | Módulo | Candidato de automatización |
|---|---|---|---|
| TC-127 | ui | factures | `automation/ui/` — nuevo escenario en `factures.feature`; Page Object candidato `FacturaDetailPO.java` (nuevo o ampliación del existente), con el botón «Rectificar factura», el formulario de motivo y la marca/enlace |
| TC-128 | ui | factures | `automation/ui/` — mismo `FacturaDetailPO.java`; comparación de campos antes/después de rectificar |
| TC-129 | service | factures | `automation/api/` — nueva petición Postman `POST /api/factures/:id/rectificar` sobre una factura con `_setup` que la deja ya rectificada; assert 409 |
| TC-130 | ui | factures | `automation/ui/` — mismo escenario que TC-127 pero sobre una factura marcada pagada antes de empezar |
| TC-131 | service | factures | `automation/api/` — nueva petición `POST /api/factures/:id/rectificar` sin `motiu` (cuerpo vacío y `motiu: ""`); assert 400, sin cleanup necesario |
| TC-132 | ui | factures | `automation/ui/` — escenario en `factures.feature` (marca en listado) y posiblemente `clients.feature` (marca en ficha de cliente), o el mismo escenario con dos aserciones |

## 3. Cambios a la regresión existente

```yaml
crear: []            # ya declarado en DOC-05 como los seis TC-nnn de la sección 2; no hay regresión adicional que no sea ya un TC-nnn de este spec
modificar: []        # ningún TC-nnn existente cambió de steps/expected — TC-078 (AC-008) se revisó y no se reescribió
obsoletas: []        # ningún TC-nnn se retira
```

Nada que crear/modificar/retirar fuera de los seis casos ya listados arriba.

## 4. Qué debe tocar S-10 (y S-17)

- **`automation/ui/src/test/resources/features/factures.feature`**: cuatro
  escenarios nuevos, uno por cada caso `ui` (`TC-127`, `TC-128`, `TC-130`,
  `TC-132`). Los tres primeros comparten la misma acción de fondo (abrir
  detalle, pulsar «Rectificar factura», informar motivo, guardar) con distinta
  precondición o distinta comprobación posterior — candidato natural a un
  único step definition parametrizado, siguiendo el patrón `Tipus: Valor` que
  ya usa el proyecto.
- **Page Object nuevo o ampliado**: `FacturaDetail.tsx` no existía como
  formulario de rectificación antes de este spec, así que probablemente hace
  falta un `FacturaDetailPO.java` nuevo (o ampliar el que gestione el detalle
  de factura si ya existe) con localizadores para el botón «Rectificar
  factura» (visible solo si `anuladaPer === null`, según el propio código —
  ver `client/src/pages/factures/FacturaDetail.tsx:123`), el campo de motivo,
  el botón de confirmar, la marca «Anulada» y los dos enlaces bidireccionales.
  Confirmarlo es trabajo de `s10-auto-tcs`, no de esta revisión.
- **`automation/ui/src/test/resources/features/clients.feature`** (o el mismo
  `factures.feature`): un paso o escenario para la mitad de `TC-132` que
  observa la marca en `ClientDetail.tsx`.
- **`automation/api/tallerMecaniccollection.json`** (S-17): dos peticiones
  nuevas para `TC-129` y `TC-131`, cada una con su `TCS-nnn` propio siguiendo
  la numeración que ya usa la colección. `TC-129` necesita un `_setup` que dé
  de alta un albarán, lo facture y rectifique la factura una vez antes de la
  aserción del caso (la propia petición del `_setup` es la primera
  rectificación válida, no se numera aparte); `TC-131` no necesita
  `_setup`/`_teardown` más allá de una factura emitida cualquiera, porque el
  rechazo no modifica nada.
- **Nota sobre literales.** El texto exacto de los mensajes de error del
  endpoint (`"El motiu és obligatori"`, `"La factura ja ha estat
  rectificada"`) está en catalán en el código (`server/routes/factures.js`),
  y las etiquetas visibles (`"Rectificar factura"`, `"Anulada"`/`"Anul·lada"`,
  `"Motivo de la rectificación"`) dependen del idioma activo
  (`client/src/locales/es.json` / `ca.json`). Ninguno de los dos está fijado
  en `DOC-04`; decidir si el aserto de UI usa el literal o el rótulo por
  `data-testid`/`id` es trabajo de `s10-auto-tcs`.

## 5. Bloque estructurado

```yaml qa-spec
version: 1
spec: SPE-08-factura-rectificativa.md
pending_user_confirmation: true
acceptance_new:
  - tc: TC-127
    verification_path: ui
    module: factures
  - tc: TC-128
    verification_path: ui
    module: factures
  - tc: TC-129
    verification_path: service
    module: factures
  - tc: TC-130
    verification_path: ui
    module: factures
  - tc: TC-131
    verification_path: service
    module: factures
  - tc: TC-132
    verification_path: ui
    module: factures
regression_changes:
  crear: []
  modificar: []
  obsoletas: []
for: s10-auto-tcs
```
