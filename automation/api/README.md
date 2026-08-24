# Taller API · Casos de servicio (DOC-26)

Colección Postman generada por **S-17 · api-qa**, contraparte de `S-10 ·
Automatizador QA` (`automation/ui/`): esta prueba lo que la pantalla no
permite ni intentar, no lo que se ve.

## Procedencia

- **Generado:** 2026-08-24, primera ejecución de esta skill en el proyecto —
  `automation/api/` estaba vacío.
- **Fuente de los casos:** `docs/DOC-05-PLAN-PRUEBAS.md` versión `1.6.0`
  (`sha256:43051f32f13c32da7350e79d3fb92503c695618375cbae82b4950abb734b2688`),
  los 4 casos marcados `verification_path: service`.
- **`docs/DOC-03-API.md` no existe** — los endpoints se han verificado leyendo
  directamente `server/routes/*.js`, tal como prevé el `SKILL.md` de S-17
  cuando falta el contrato.
- **`docs/DOC-13-DATOS-PRUEBA.md` tampoco existe** — los `test_data_ref`
  (`DS-003`, `DS-005`, `DS-006`) que citan los casos no están formalizados
  todavía. Los nombres ilustrativos de `DOC-05` (cliente "Garcia Motors SL",
  vehículo `1234ABC`, pieza `FIL-001`) **no existen tal cual en
  `server/db/seed.js`** — la base sembrada usa otros nombres y referencias.
  Esta colección resuelve las entidades **dinámicamente** contra la base
  real (primer par de vehículos de clientes distintos, primera pieza con
  stock) en vez de asumir esos nombres literales. Cuando exista DOC-13, sus
  `DS-nnn` deberían sustituir esta resolución dinámica por fixtures fijas.

## Cómo ejecutar

Requiere el servidor arrancado (`npm run dev -w server` o `npm start`, puerto
`3001`) contra una base sembrada (`npm run seed`).

```bash
cd automation/api
newman run collection.json -e environments/local.json
```

Verificado en este entorno: **3 ejecuciones consecutivas, 29 peticiones, 31
assertions, 0 fallos** cada vez — incluida la comprobación de que el stock de
la pieza usada (`FO-100`) vuelve exactamente a su valor de partida después de
cada ejecución (ver «Aislamiento» más abajo).

## Estructura y orden de ejecución

Una carpeta por módulo, con `_setup` y `_teardown` explícitos — nunca
escondidos en scripts de carpeta. Ejecutar de arriba a abajo:

```
Taller API · Casos de servicio (DOC-26)
├─ _setup (fixtures compartidas)
│  ├─ Obtener dos vehículos de clientes distintos
│  └─ Obtener una pieza con stock (Filtre d'oli)
├─ Albarans
│  ├─ _setup · Crear albarán pendiente para TC-041
│  ├─ _setup · Añadir línea de pieza al albarán de TC-041
│  ├─ _setup · Añadir línea de mano de obra al albarán de TC-041
│  ├─ TC-041 · Rechazar anotación de tipo inválido enviada directamente al servicio
│  ├─ TC-041 · Verificar que el albarán conserva sus líneas y su base tras el rechazo
│  ├─ _teardown · Borrar las líneas y el albarán de TC-041 (restaura el stock)
│  ├─ _teardown · Borrar la línea de mano de obra y el albarán vacío de TC-041
│  ├─ _teardown · Borrar el albarán vacío de TC-041
│  ├─ _setup · Crear albarán pendiente vacío para TC-045
│  ├─ TC-045 · Rechazar línea de pieza que no existe en el catálogo
│  ├─ TC-045 · Verificar que el albarán no registra ninguna línea
│  └─ _teardown · Borrar el albarán de TC-045
└─ Factures
   ├─ _setup · Obtener el número de facturas existentes
   ├─ _setup · Crear un albarán del cliente A y facturarlo, para TC-063
   ├─ _setup · Emitir la factura del albarán anterior
   ├─ _setup · Crear un segundo albarán pendiente del mismo cliente A, para TC-063
   ├─ TC-063 · Rechazar la emisión con un albarán ya facturado
   ├─ TC-063 · Verificar que el albarán ya facturado sigue enlazado solo a su factura
   ├─ TC-063 · Verificar que no se ha creado ninguna factura nueva
   ├─ _teardown · Borrar el segundo albarán del cliente A (sigue pendiente)
   ├─ _setup · Crear un albarán pendiente del cliente A, para TC-064
   ├─ _setup · Crear un albarán pendiente del cliente B, para TC-064
   ├─ TC-064 · Rechazar la emisión con albaranes de dos clientes distintos
   ├─ TC-064 · Verificar que los dos albaranes siguen pendientes
   ├─ TC-064 · Verificar que no se ha creado ninguna factura nueva
   ├─ _teardown · Borrar el albarán pendiente del cliente A de TC-064
   └─ _teardown · Borrar el albarán pendiente del cliente B de TC-064
```

No hay `depends_on` ni `touches` compartido entre `TC-041`, `TC-045`, `TC-063`
y `TC-064` en `DOC-05` (los cuatro llevan `touches: []`), así que en teoría
son paralelizables — pero esta colección los encadena **secuencialmente**
porque comparten las fixtures de `_setup` (mismo `vehicleAId`/`vehicleBId`) y
Postman/newman no paraleliza carpetas de una misma colección por defecto.

## Los tres niveles de validación

Cada `TC-nnn` valida **contrato** (código de estado), **datos** (el mensaje
de error exacto que devuelve el servidor) y **efecto lateral** (una petición
GET aparte que confirma que el sistema no cambió: mismas líneas, misma base,
mismo número de facturas, mismo estado del albarán).

## Aislamiento

- **`restores_state: true`** está declarado en los 4 casos de `DOC-05`, y se
  cumple para `TC-041`, `TC-045` y `TC-064`: cada `_teardown` borra
  exactamente lo que su `_setup` creó.
- **Hallazgo durante la generación — `DELETE /api/albarans/:id` no restaura
  el stock de sus líneas de pieza** (a diferencia de
  `DELETE /api/albarans/:id/linies/:lineaId`, que sí lo hace). Borrar un
  albarán con líneas de pieza directamente dejaría el estoc decrementado de
  forma permanente. Por eso el `_teardown` de `TC-041` borra primero cada
  línea individualmente (lo que restaura el estoc) y solo entonces borra el
  albarán ya vacío — nunca `DELETE /albarans/:id` sobre un albarán con
  líneas de pieza todavía dentro. **Esto es un hallazgo para `A-12 ·
  Roadmap`, no una corrección de esta pieza**: `DELETE /api/albarans/:id`
  debería restaurar el stock de sus líneas de pieza igual que ya hace el
  borrado de una línea individual.
- **`TC-063` no se puede limpiar del todo.** Su `_setup` factura
  deliberadamente un albarán para poder probar el rechazo. Una vez
  facturado: `DELETE /api/albarans/:id` lo rechaza (`409`, «ja està
  facturat»), y **no existe ningún `DELETE /api/factures/:id`** en el
  servidor. El albarán facturado y su factura quedan en la base
  permanentemente — uno de cada por ejecución de la colección. Las
  aserciones de «no se ha creado ninguna factura nueva» son relativas al
  recuento capturado al principio de cada ejecución (`facturaCountInicial`),
  así que la colección sigue siendo correcta y repetible a pesar de este
  residuo — pero quien la ejecute muchas veces en un entorno que no se
  resiembre acumulará una factura y un albarán facturado por cada corrida.

## Peticiones reutilizadas vs. creadas

Primera ejecución de S-17 en este proyecto: **0 reutilizadas, 29 creadas**
(todas nuevas — no había colección previa).
