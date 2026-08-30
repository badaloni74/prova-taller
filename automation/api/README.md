# Taller API · Casos de servicio (DOC-26)

Colección Postman generada por **S-17 · api-qa**, contraparte de `S-10 ·
Automatizador QA` (`automation/ui/`): esta prueba lo que la pantalla no
permite ni intentar, no lo que se ve.

## Procedencia

- **Generado:** 2026-08-24, primera ejecución de esta skill en el proyecto —
  `automation/api/` estaba vacío.
- **Ampliado:** 2026-08-29 con los casos de servicio de `SPE-06`
  (`TC-111`, `TC-113`, `TC-115`, `TC-116` y la mitad de servicio del `mixed`
  `TC-119`), fuente `docs/DOC-05-PLAN-PRUEBAS.md` versión `1.8.0`
  (`sha256:fef49cbc57eec8822b3b5482471ffb205d149bb638bbc76c28f1bf4de6d17cb1`).
- **Fuente de los casos (primera generación):** `docs/DOC-05-PLAN-PRUEBAS.md`
  versión `1.6.0`
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

Última corrida verificada (2026-08-29, base recién sembrada): **53 peticiones,
74 assertions, 0 fallos**, y —lo que más importa— con la base **exactamente
igual antes y después**: 1 factura, 4 albaranes, 7 líneas y stock total del
catálogo 167 en las dos medidas. Dos ejecuciones seguidas sin resembrar dan el
mismo recuento, así que la colección se puede repetir indefinidamente sobre la
misma base sin resembrarla. Resultado TCS a TCS en
[`docs/DOC-27-INFORME-EJECUCION-TCS-API.md`](../../docs/DOC-27-INFORME-EJECUCION-TCS-API.md) `1.1.0`.

## Estructura y orden de ejecución

Una carpeta por módulo, con `_setup` y `_teardown` explícitos — nunca
escondidos en scripts de carpeta. Ejecutar de arriba a abajo:

```
Taller API · Casos de servicio (DOC-26)
├─ _setup (fixtures compartidas)
│  ├─ _setup · Obtener dos vehículos de clientes distintos   ← usada por TC-041/045/064/111/113/115/116/119
│  └─ _setup · Obtener una pieza con stock (Filtre d'oli)     ← usada por TC-041
├─ Albarans
│  ├─ … TC-041 (TCS001–TCS002) …
│  ├─ … TC-045 (TCS003–TCS004) …
│  ├─ _setup · Crear albarán pendiente sobre vehículo del cliente A, para TC-111
│  ├─ _setup · Añadir primera línea de mano de obra al albarán de TC-111
│  ├─ _setup · Añadir segunda línea de mano de obra al albarán de TC-111
│  ├─ TCS011 · TC-111 · Rechazar por servicio el cambio de vehículo a otro cliente (AC-002 y AC-007)
│  ├─ TCS012 · TC-111 · El albarán sigue sobre su vehículo, pendiente, con líneas y base intactas
│  ├─ _teardown · Borrar el albarán de TC-111
│  ├─ _setup · Crear albarán pendiente con fecha y nota, para TC-113
│  ├─ TCS013 · TC-113 · Rechazar un PUT que cambia a la vez vehículo (otro cliente), fecha y nota (AC-004)
│  ├─ TCS014 · TC-113 · Atomicidad: ni vehículo, ni fecha, ni nota se han guardado
│  ├─ _teardown · Borrar el albarán de TC-113
│  ├─ _setup · Localizar un albarán ya facturado de la base sembrada, para TC-115
│  ├─ _setup · Elegir un vehículo de un cliente distinto al del albarán facturado
│  ├─ TCS015 · TC-115 · El PUT se rechaza con el mensaje de facturado, no el de cambio de cliente (AC-006)
│  ├─ TCS016 · TC-115 · El albarán sigue facturado sobre su vehículo original
│  ├─ TCS017 · TC-115 · La factura sigue agrupando el albarán
│  ├─ _setup · Crear albarán pendiente, para TC-116
│  ├─ TCS018 · TC-116 · Un PUT sin vehicle_id se rechaza por campo obligatorio (AC-009)
│  ├─ TCS019 · TC-116 · Un PUT con vehicle_id inexistente (9999) se rechaza porque el vehículo no existe
│  ├─ TCS020 · TC-116 · El albarán sigue sobre su vehículo, sin cambios
│  └─ _teardown · Borrar el albarán de TC-116
└─ Factures
   ├─ … TC-063 (TCS005–TCS007) …
   ├─ … TC-064 (TCS008–TCS010) …
   ├─ _setup · Crear albarán pendiente del cliente A, para TC-119
   ├─ _setup · Añadir una línea de mano de obra al albarán de TC-119
   ├─ TCS021 · TC-119 · El PUT que cambia el albarán a un vehículo de otro cliente se rechaza (AC-008)
   ├─ TCS022 · TC-119 · Tras el 409 el albarán sigue sobre su vehículo original y pendiente
   └─ _teardown · Borrar el albarán de TC-119
```

Ningún caso de `DOC-05` de los cubiertos aquí declara `depends_on` ni un
`touches` compartido, así que en teoría son paralelizables — pero esta colección
los encadena **secuencialmente** porque comparten la fixture `_setup · Obtener
dos vehículos de clientes distintos` (`vehicleAId`/`vehicleBId`,
`clientAId`/`clientBId`) y newman no paraleliza carpetas de una misma colección
por defecto.

### Los casos de servicio de SPE-06 (TC-111, TC-113, TC-115, TC-116, TC-119)

Los cinco ejercen `PUT /api/albarans/:id`, que **la interfaz ya no permite
componer**: desde `SPE-06` el selector de vehículo en edición solo ofrece los
vehículos del cliente actual (`REQ-081` / `TC-117`), así que un vehículo de otro
cliente no se puede seleccionar desde el formulario. El rechazo `409` que
comprueban vive en `server/routes/albarans.js` (~línea 95-104) y es anterior a
`SPE-06`.

- **`TC-115`** — sobre un albarán **ya facturado**, el servidor comprueba
  primero `estat === 'facturat'` (~línea 82) y devuelve `L'albarà ja està
  facturat i no es pot modificar` **antes** de mirar el vehículo. `TCS015` fija
  esa prioridad con una assertion positiva (es ese literal) y otra negativa (no
  es el de cambio de cliente). Ninguno de los dos literales está en `DOC-04`.
- **`TC-116`** — `El camp vehicle_id és obligatori` (400, ~línea 87) y `El
  vehicle indicat no existeix` (400, ~línea 92) ganan al de cambio de cliente
  cuando aplican. Cierra sobre la vía `PUT` el vector de `REQ-027` que `TC-036`
  solo tocaba en creación.
- **`TC-119`** es `verification_path: mixed`, el primero del plan. La **mitad de
  pantalla** (emitir la factura, ver que sale al cliente original) la cubre
  `automation/ui/factures.feature` (commit `1ba6196`). Aquí se ejerce solo la
  **mitad de servicio**: el `PUT` rechazado que precede a la emisión y la
  comprobación de que el albarán no se movió. **No se emite la factura por API**
  para no duplicar lo que la suite UI ya verifica. Coordinación por el tag
  `TC-119`, igual que `TC-041`.
- **`_teardown`**: TC-111/113/116/119 crean un albarán pendiente con líneas de
  **mano de obra** (nunca de pieza, para no tocar stock) y lo borran. `TC-115`
  no crea nada — reutiliza el albarán facturado de la base y su `PUT` se rechaza.
- **`_setup · Localizar un albarán ya facturado` de la carpeta Albarans** es una
  petición propia y no se comparte con la homónima de la carpeta Factures:
  newman ejecuta Albarans antes que Factures, así que las variables de entorno de
  aquella todavía no existen aquí. Es duplicación forzada por el orden de
  ejecución, no gratuita.

## Nomenclatura: `TCS-nnn`

Cada petición que **es** un caso de prueba lleva un identificador propio
`TCSnnn` al principio del nombre, delante del `TC-nnn` de `DOC-05` que
cubre:

```
TCS005 · TC-063 · Rechazar la emisión con un albarán ya facturado
```

Los dos identificadores dicen cosas distintas y por eso van los dos. El
`TC-nnn` es el caso de negocio tal como lo diseñó `A-03`; el `TCS-nnn` es
**una comprobación concreta contra el servicio**, y un mismo `TC-nnn` suele
necesitar varias: una para el rechazo y otra para el efecto lateral que
confirma que el sistema no se movió. Sin el `TCS`, un resultado en rojo
diría «falla TC-063» sin decir si lo que falló fue el rechazo o la limpieza.

**Los `_setup` y `_teardown` no llevan `TCS`.** Preparan y limpian estado;
no verifican nada del sistema bajo prueba. Sus assertions son guardas —
comprueban que la fixture se construyó— y si una falla, lo que hay es un
problema de entorno, no un caso en rojo.

**Los `TCS-nnn` solo se añaden.** Si una comprobación desaparece, su número
se retira pero no se reutiliza ni se renumera el resto: los informes viejos
seguirían apuntando a él. Misma regla que `registro-ids.json` aplica a
`REQ`, `TC`, `UC` y `BR`, aunque la familia `TCS` todavía no esté dada
de alta ahí.

Los resultados de cada ejecución, TCS a TCS, van a
[`docs/DOC-27-INFORME-EJECUCION-TCS-API.md`](../../docs/DOC-27-INFORME-EJECUCION-TCS-API.md).

## Los tres niveles de validación

Cada `TC-nnn` valida **contrato** (código de estado), **datos** (el mensaje
de error exacto que devuelve el servidor) y **efecto lateral** (una petición
GET aparte que confirma que el sistema no cambió: mismas líneas, misma base,
mismo número de facturas, mismo estado del albarán).

## Aislamiento

`restores_state: true` está declarado en los 9 casos de `DOC-05` cubiertos, y se
cumple en los 9: cada `_teardown` borra exactamente lo que su `_setup` creó
(`TC-115` no crea nada), y el recuento de facturas, albaranes, líneas y stock es
idéntico antes y después de ejecutar.

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
- **Casos de servicio de `SPE-06`** (2026-08-29): 1 reutilizada (la fixture
  compartida `_setup · Obtener dos vehículos de clientes distintos`, de la que
  dependen los cinco casos nuevos, sin duplicarla), 25 creadas. Total: 53.
