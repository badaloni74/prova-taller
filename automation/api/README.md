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
  stock, primer albarán ya facturado) en vez de asumir esos nombres
  literales. Cuando exista DOC-13, sus `DS-nnn` deberían sustituir esta
  resolución dinámica por fixtures fijas.

## Cómo ejecutar

Requiere el servidor arrancado (`npm run dev -w server` o `npm start`, puerto
`3001`) contra una base sembrada (`npm run seed`).

```bash
cd automation/api
newman run tallerMecaniccollection.json -e environments/tallerMecanicEnvironmentLocal.json
```

Verificado en este entorno: **28 peticiones, 31 assertions, 0 fallos**, y —lo
que más importa— con la base **exactamente igual antes y después**: 12 facturas
y 37 albaranes en las dos medidas, y el stock de la pieza usada (`FO-100`) de
vuelta en 37. Dos ejecuciones seguidas dan el mismo recuento, así que la
colección se puede repetir indefinidamente sobre la misma base sin resembrarla.

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
   ├─ _setup · Localizar un albarán ya facturado de la base sembrada
   ├─ _setup · Crear un albarán pendiente sobre el mismo vehículo, para TC-063
   ├─ TC-063 · Rechazar la emisión con un albarán ya facturado
   ├─ TC-063 · Verificar que el albarán ya facturado sigue enlazado solo a su factura
   ├─ TC-063 · Verificar que no se ha creado ninguna factura nueva
   ├─ _teardown · Borrar el albarán pendiente de TC-063
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

`restores_state: true` está declarado en los 4 casos de `DOC-05`, y se cumple
en los 4: cada `_teardown` borra exactamente lo que su `_setup` creó, y el
recuento de facturas y albaranes es idéntico antes y después de ejecutar.

Dos cosas hubo que resolver para llegar ahí, y las dos son hallazgos sobre el
servidor, no detalles de implementación de esta colección:

- **`DELETE /api/albarans/:id` no restaura el stock de sus líneas de pieza**,
  a diferencia de `DELETE /api/albarans/:id/linies/:lineaId`, que sí lo hace.
  Borrar un albarán con líneas de pieza directamente dejaría el estoc
  decrementado de forma permanente. Por eso el `_teardown` de `TC-041` borra
  primero cada línea individualmente (lo que restaura el estoc) y solo
  entonces borra el albarán ya vacío. **Esto es un hallazgo para `A-12 ·
  Roadmap`, no una corrección de esta pieza**: el borrado de un albarán
  debería restaurar el stock igual que ya hace el de una línea suelta.

- **Una factura no se puede borrar por ninguna vía.** No existe
  `DELETE /api/factures/:id` —las únicas rutas son `GET /`, `GET /:id`,
  `POST /` y un `PATCH /:id` que solo commuta `estat_pagament`— y
  `DELETE /api/albarans/:id` responde `409` sobre un albarán ya facturado.
  Emitir una factura es, hoy, irreversible.

  `TC-063` necesita un albarán ya facturado para probar el rechazo. La
  versión inicial de esta colección lo **creaba y lo facturaba**, y por eso
  dejaba una factura y un albarán imborrables por cada ejecución. Ahora
  **reutiliza uno de los que ya trae la base sembrada** (`GET
  /albarans?estat=facturat`) y crea sobre **el mismo vehículo** el albarán
  pendiente que le hace falta —mismo vehículo garantiza mismo cliente, así
  que el rechazo que salta es el de «todos pendientes» y no el de «mismo
  cliente»—, que sí es borrable. Residuo: ninguno.

  El hallazgo sigue en pie de todas formas: que un caso de prueba tuviera que
  esquivarlo no lo arregla, y una aplicación real necesita poder anular una
  factura emitida por error. **Candidato para `A-12 · Roadmap`, o para
  `A-15 · Funcionalidad` si se decide que anular es una operación de negocio
  y no solo un borrado.**

## Peticiones reutilizadas vs. creadas

- **Primera generación** (2026-08-24): 0 reutilizadas, 29 creadas — no había
  colección previa.
- **Retirada del residuo de `TC-063`** (2026-08-24): 27 reutilizadas (4 de
  ellas con el script de test ajustado), 1 creada, 2 retiradas. Total: 28.
