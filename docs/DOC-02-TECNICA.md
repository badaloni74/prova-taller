---
doc_id: DOC-02
doc_name: DOC-02-TECNICA
version: 1.2.0
status: draft
history: DOC-02-TECNICA-HIST.md
generator: S-01 skill-doc-base
generator_version: "2.0"
generated_at: 2026-08-28T13:55:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: spec-SPE-06-albara-canvi-client
  commit_sha: 345a3ae762624f2208a520a628b6ab1f7dec51e3
  working_tree_clean: false   # solo ficheros sin versionar y ajenos al ciclo (ApuntsAgentsISkills.txt, dashboard/, promptDashboard.txt, bash.exe.stackdump); el arbol versionado esta limpio
inputs:
  - id: registro-ids.json
    present: true
    hash: sha256:4b25a1a4bc636ef781f149e4a2bddc601a23460ed7f401c3dbd8783a6c0ab5a7
---

# DOC-02 · Documentación técnica — app-taller

> Verdad técnica. Requiere saber programar. Lo que se entiende sin eso está en
> `DOC-01-BASE-ASIS.md` y no se repite aquí. El contrato de API es propiedad de
> DOC-03 (S-03).

## 1. Stack tecnológico y dependencias

Monorepo con **npm workspaces**: dos workspaces (`server`, `client`) bajo un
`package.json` raíz.

### Raíz

| Componente | Tecnología | Versión | Fuente |
|---|---|---|---|
| Gestor de workspaces | npm workspaces | — | `package.json:5-8` |
| Arranque conjunto | concurrently | ^8.2.2 | `package.json:16` |

### Servidor (`server/`, CommonJS)

| Componente | Tecnología | Versión | Fuente |
|---|---|---|---|
| Framework HTTP | Express | ^4.19.2 | `server/package.json:14` |
| Acceso a datos | better-sqlite3 | ^13.0.3 | `server/package.json:13` |
| Recarga en desarrollo | nodemon | ^3.1.4 | `server/package.json:17` |
| Runtime | Node.js | **no fijada** | Sin `engines` ni `.nvmrc` — ver Q-01 |

### Cliente (`client/`, ESM)

| Componente | Tecnología | Versión | Fuente |
|---|---|---|---|
| UI | React + React DOM | ^19.2.8 | `client/package.json:14-15` |
| Enrutado | react-router-dom | ^7.18.2 | `client/package.json:17` |
| i18n | i18next / react-i18next | ^26.3.6 / ^17.0.11 | `client/package.json:13,16` |
| Build y dev server | Vite + @vitejs/plugin-react | ^8.2.0 / ^6.0.4 | `client/package.json:29,23` |
| Tipos | TypeScript | ~6.0.2 | `client/package.json:28` |
| Estilos | Tailwind CSS + PostCSS + autoprefixer | ^3.4.19 / ^8.5.26 / ^10.5.4 | `client/package.json:27,26,24` |
| Linter | oxlint | ^1.75.0 | `client/package.json:25` |

**Sin dependencias de terceros más allá de esto:** no hay ORM, ni librería de
validación, ni cliente HTTP (se usa `fetch` nativo), ni gestor de estado global,
ni librería de componentes.

## 2. Arquitectura y capas

Aplicación monolítica de dos piezas que se despliegan juntas y comparten un solo
puerto en producción.

**Servidor.** `server/index.js` ejecuta las migraciones al arrancar, monta
`express.json()`, registra los siete routers bajo `/api/*`, sirve
`client/dist` como estático y captura el resto de rutas con una expresión
regular `^(?!\/api).*` que devuelve `index.html` (fallback de SPA).

**Capas efectivas del servidor: dos.** Cada router concentra validación, reglas
de negocio y SQL en el mismo handler. **No existe capa de servicio ni de
repositorio**: los routers llaman directamente a `db.prepare(...)`. Es una
observación de hecho, no un juicio.

```
Petición HTTP
  └─ server/index.js         (bootstrap, montaje, estáticos, fallback SPA)
      └─ server/routes/*.js  (validación + reglas de negocio + SQL)
          └─ server/db/index.js  (singleton de better-sqlite3)
              └─ data/taller.db  (SQLite, WAL)
```

El handler `PUT /api/albarans/:id` es un ejemplo de esa concentración: en el
mismo bloque comprueba existencia del albarán, que no esté facturado, que llegue
`vehicle_id`, que el vehículo exista, y —solo si el `vehicle_id` cambia respecto
al actual— que el vehículo nuevo sea del mismo `client_id` que el vehículo actual,
devolviendo `409` en caso contrario (`server/routes/albarans.js:95-104`). El
`UPDATE` es una sola sentencia sin transacción explícita: la atomicidad de
«no guardar nada si el cliente no coincide» se sostiene porque la comprobación
precede al único `UPDATE`.

**Cliente.** SPA de React con enrutado en cliente. Estructura por módulo
funcional, con el mismo patrón repetido siete veces:

```
pages/<modulo>/<Modulo>List.tsx     → listado (DataTable: búsqueda, orden, paginación)
pages/<modulo>/<Modulo>Detail.tsx   → ficha + secciones de entidades relacionadas
pages/<modulo>/<Modulo>Form.tsx     → alta y edición (EntityForm)
        ↓
services/<modulo>.ts                → funciones tipadas por endpoint
        ↓
services/api.ts                     → fetch, conversión de claves, ApiError
        ↓  HTTP /api/*
server/routes/<modulo>.js
```

Algunos formularios y fichas cruzan a más de un servicio cuando necesitan datos
de otra entidad. `AlbaraForm.tsx` es uno de esos casos: al **editar** una
cabecera resuelve el cliente del albarán (`albaransService.get` →
`vehiclesService.get` → `vehiclesService.listByClient`) y con ello limita el
desplegable de vehículo a los del cliente actual; al **crear**, sigue pidiendo la
lista completa con `vehiclesService.list()`. Es la mitad de cliente de la regla
que el servidor también aplica por su cuenta (ver DOC-01 `BR-ALB-10`).

**Frontera de nomenclatura.** El servidor trabaja en `snake_case` (columnas
SQLite) y el cliente en `camelCase`. `services/api.ts` convierte en ambas
direcciones de forma recursiva: `toCamelCase` en las respuestas y `toSnakeCase`
en los cuerpos de petición. Es el único punto donde vive esa traducción.

**Ejecución.** En desarrollo, Vite (puerto por defecto) proxya `/api` a
`http://localhost:3001`. En producción, `npm run build` compila el cliente a
`client/dist` y `npm start` levanta solo Express, que sirve API y estáticos desde
el 3001.

**Migraciones.** `server/db/migrate.js` lee los `.sql` de `migrations/` ordenados
por nombre, aplica los que no constan en la tabla `_migrations` y registra cada
uno dentro de la misma transacción que lo aplica. Se ejecuta en cada arranque.

## 3. Componentes y responsabilidades

| ID | Capa | Módulo | Ruta | Responsabilidad |
|---|---|---|---|---|
| `server-app` | api | shell | `server/index.js` | Bootstrap, montaje de routers, estáticos y fallback SPA |
| `clients-router` | api | clients | `server/routes/clients.js` | CRUD de clientes y bloqueos de borrado |
| `vehicles-router` | api | vehicles | `server/routes/vehicles.js` | CRUD de vehículos, unicidad de matrícula, filtro `?client_id=` |
| `peces-router` | api | peces | `server/routes/peces.js` | CRUD del catálogo de piezas |
| `albarans-router` | api | albarans | `server/routes/albarans.js` | CRUD de albaranes, gestión de líneas y movimiento de stock, rechazo del cambio de vehículo a otro cliente |
| `factures-router` | api | factures | `server/routes/factures.js` | Emisión de facturas, cálculo de base/IVA/total, estado de pago |
| `personal-router` | api | personal | `server/routes/personal.js` | CRUD de empleados |
| `nomines-router` | api | nomines | `server/routes/nomines.js` | CRUD de nóminas, unicidad empleado+mes+año, salario neto |
| `db-connection` | data | shell | `server/db/index.js` | Singleton de better-sqlite3, WAL y claves foráneas activas |
| `db-migrate` | data | shell | `server/db/migrate.js` | Migraciones idempotentes controladas por `_migrations` |
| `db-numbering` | data | shell | `server/db/numbering.js` | Numeración anual `año/PREFIJO-nnnn` |
| `db-seed` | data | shell | `server/db/seed.js` | Carga de datos de ejemplo (`npm run seed`). Incluye un cliente con dos vehículos para poder ejercer `BR-ALB-10` |
| `client-main` | ui | shell | `client/src/main.tsx` | Punto de entrada de React |
| `client-app` | ui | shell | `client/src/App.tsx` | Tabla de rutas de la SPA |
| `layout` | ui | shell | `client/src/components/Layout.tsx` | Barra lateral, cabecera y área de contenido |
| `shared-components` | ui | shell | `client/src/components/` | DataTable, EntityForm, ConfirmDialog, Toast, EmptyState, ErrorState, Spinner, ThemeToggle, LanguageSwitcher |
| `i18n` | infra | shell | `client/src/i18n/index.ts` | Inicialización de i18next y persistencia del idioma |
| `use-theme` | ui | shell | `client/src/hooks/useTheme.ts` | Estado del tema, clase `dark` en `<html>` y persistencia |
| `use-submit-guard` | ui | shell | `client/src/hooks/useSubmitGuard.ts` | Bloquea reenvíos mientras una petición está en vuelo; decide si se rearma en éxito o solo en error |
| `format-utils` | ui | shell | `client/src/utils/format.ts` | `formatMoney`/`formatDate`: único punto de formato de importes y fechas del cliente |
| `api-client` | infra | shell | `client/src/services/api.ts` | `fetch` envuelto, conversión snake↔camel, `ApiError` |
| `clients-service` | infra | clients | `client/src/services/clients.ts` | Llamadas tipadas a `/api/clients` |
| `vehicles-service` | infra | vehicles | `client/src/services/vehicles.ts` | Llamadas tipadas a `/api/vehicles`, incluida `listByClient` (`?client_id=`) |
| `peces-service` | infra | peces | `client/src/services/peces.ts` | Llamadas tipadas a `/api/peces` |
| `albarans-service` | infra | albarans | `client/src/services/albarans.ts` | Llamadas tipadas a `/api/albarans` y sus líneas |
| `factures-service` | infra | factures | `client/src/services/factures.ts` | Llamadas tipadas a `/api/factures` |
| `personal-service` | infra | personal | `client/src/services/personal.ts` | Llamadas tipadas a `/api/personal` |
| `nomines-service` | infra | nomines | `client/src/services/nomines.ts` | Llamadas tipadas a `/api/nomines` |
| `clients-pages` | ui | clients | `client/src/pages/clients/` | Listado, ficha y formulario de clientes |
| `vehicles-pages` | ui | vehicles | `client/src/pages/vehicles/` | Listado, ficha y formulario de vehículos |
| `peces-pages` | ui | peces | `client/src/pages/peces/` | Listado, ficha y formulario de piezas |
| `albarans-pages` | ui | albarans | `client/src/pages/albarans/` | Listado, ficha, formulario y sección de líneas. El formulario de edición filtra el selector de vehículo por el cliente del albarán |
| `factures-pages` | ui | factures | `client/src/pages/factures/` | Listado, ficha y formulario de emisión |
| `personal-pages` | ui | personal | `client/src/pages/personal/` | Listado, ficha y formulario de empleados |
| `nomines-pages` | ui | nomines | `client/src/pages/nomines/` | Listado, ficha y formulario de nóminas |

## 4. Acoplamientos

Dependencias reales leídas de los `require`/`import` y de las llamadas. Son las
aristas que S-08 usa sin inferencia.

| Origen | Destino | Tipo | Evidencia |
|---|---|---|---|
| `server-app` | `db-migrate` | calls | `server/index.js:3,12` |
| `server-app` | `clients-router` | imports | `server/index.js:4,24` |
| `server-app` | `peces-router` | imports | `server/index.js:5,25` |
| `server-app` | `vehicles-router` | imports | `server/index.js:6,26` |
| `server-app` | `albarans-router` | imports | `server/index.js:7,27` |
| `server-app` | `factures-router` | imports | `server/index.js:8,28` |
| `server-app` | `personal-router` | imports | `server/index.js:9,29` |
| `server-app` | `nomines-router` | imports | `server/index.js:10,30` |
| `clients-router` | `db-connection` | reads | `server/routes/clients.js:2` |
| `vehicles-router` | `db-connection` | reads | `server/routes/vehicles.js:2` |
| `peces-router` | `db-connection` | reads | `server/routes/peces.js:2` |
| `albarans-router` | `db-connection` | writes | `server/routes/albarans.js:2` |
| `albarans-router` | `db-numbering` | calls | `server/routes/albarans.js:3,63` |
| `factures-router` | `db-connection` | writes | `server/routes/factures.js:2` |
| `factures-router` | `db-numbering` | calls | `server/routes/factures.js:3,80` |
| `personal-router` | `db-connection` | reads | `server/routes/personal.js:2` |
| `nomines-router` | `db-connection` | reads | `server/routes/nomines.js:2` |
| `db-migrate` | `db-connection` | writes | `server/db/migrate.js:3` |
| `db-numbering` | `db-connection` | reads | `server/db/numbering.js:1` |
| `db-seed` | `db-connection` | writes | `server/db/seed.js` |
| `client-main` | `client-app` | imports | `client/src/main.tsx` |
| `client-main` | `i18n` | imports | `client/src/main.tsx` |
| `client-app` | `layout` | imports | `client/src/App.tsx:2,31` |
| `client-app` | `clients-pages` | imports | `client/src/App.tsx:4-6` |
| `client-app` | `peces-pages` | imports | `client/src/App.tsx:7-9` |
| `client-app` | `vehicles-pages` | imports | `client/src/App.tsx:10-12` |
| `client-app` | `albarans-pages` | imports | `client/src/App.tsx:13-15` |
| `client-app` | `factures-pages` | imports | `client/src/App.tsx:16-18` |
| `client-app` | `personal-pages` | imports | `client/src/App.tsx:19-21` |
| `client-app` | `nomines-pages` | imports | `client/src/App.tsx:22-24` |
| `layout` | `shared-components` | imports | `client/src/components/Layout.tsx` |
| `layout` | `use-theme` | calls | `client/src/components/Layout.tsx` |
| `clients-pages` | `clients-service` | calls | `client/src/pages/clients/` |
| `vehicles-pages` | `vehicles-service` | calls | `client/src/pages/vehicles/` |
| `peces-pages` | `peces-service` | calls | `client/src/pages/peces/` |
| `albarans-pages` | `albarans-service` | calls | `client/src/pages/albarans/` |
| `albarans-pages` | `vehicles-service` | calls | `client/src/pages/albarans/AlbaraForm.tsx:9,37,53,55`, `AlbaraDetail.tsx:5` |
| `factures-pages` | `factures-service` | calls | `client/src/pages/factures/` |
| `personal-pages` | `personal-service` | calls | `client/src/pages/personal/` |
| `nomines-pages` | `nomines-service` | calls | `client/src/pages/nomines/` |
| `clients-service` | `api-client` | calls | `client/src/services/clients.ts` |
| `vehicles-service` | `api-client` | calls | `client/src/services/vehicles.ts` |
| `peces-service` | `api-client` | calls | `client/src/services/peces.ts` |
| `albarans-service` | `api-client` | calls | `client/src/services/albarans.ts` |
| `factures-service` | `api-client` | calls | `client/src/services/factures.ts` |
| `personal-service` | `api-client` | calls | `client/src/services/personal.ts` |
| `nomines-service` | `api-client` | calls | `client/src/services/nomines.ts` |
| `api-client` | `server-app` | calls | `client/src/services/api.ts:43` (HTTP `/api/*`) |
| `clients-pages` | `use-submit-guard` | calls | `client/src/pages/clients/ClientForm.tsx` |
| `vehicles-pages` | `use-submit-guard` | calls | `client/src/pages/vehicles/VehicleForm.tsx` |
| `peces-pages` | `use-submit-guard` | calls | `client/src/pages/peces/PecaForm.tsx` |
| `personal-pages` | `use-submit-guard` | calls | `client/src/pages/personal/PersonalForm.tsx` |
| `nomines-pages` | `use-submit-guard` | calls | `client/src/pages/nomines/NominaForm.tsx` |
| `albarans-pages` | `use-submit-guard` | calls | `client/src/pages/albarans/AlbaraForm.tsx`, `AlbaraLiniesSection.tsx` |
| `factures-pages` | `use-submit-guard` | calls | `client/src/pages/factures/FacturaForm.tsx` |
| `clients-pages` | `format-utils` | calls | `client/src/pages/clients/ClientDetail.tsx` |
| `albarans-pages` | `format-utils` | calls | `client/src/pages/albarans/AlbaraLiniesSection.tsx`, `AlbaraDetail.tsx`, `AlbaransList.tsx` |
| `factures-pages` | `format-utils` | calls | `client/src/pages/factures/FacturaDetail.tsx`, `FacturesList.tsx` |
| `nomines-pages` | `format-utils` | calls | `client/src/pages/nomines/NominaDetail.tsx`, `NominesList.tsx` |
| `peces-pages` | `format-utils` | calls | `client/src/pages/peces/PecaDetail.tsx`, `PecesList.tsx` |
| `personal-pages` | `format-utils` | calls | `client/src/pages/personal/PersonalDetail.tsx` |

**Sobre las páginas y los servicios de otros módulos.** La tabla recoge la
relación `<módulo>-pages → <módulo>-service` de cada módulo y, explícitamente, la
de `albarans-pages → vehicles-service`, que `AlbaraForm.tsx` ejerce con fuerza
desde SPEC 06. Hay más llamadas de una página al servicio de otro módulo
(fichas que muestran entidades relacionadas: `AlbaraDetail` también usa
`clients-service`, `FacturaForm` usa `clients-service` y `albarans-service`,
`NominaForm` usa `personal-service`, etc.). No están todas enumeradas todavía
— ver Q-07.

**`vehicles-pages` es el único módulo de páginas que no llama a `format-utils`**:
no presenta ningún importe, así que no había ningún `toFixed` que sustituir.
Sí usa `use-submit-guard`, como los otros seis.

**Acoplamientos entre módulos de negocio.** Los routers cruzan la frontera de su
propio módulo para aplicar reglas de integridad:

| Origen | Destino | Motivo | Evidencia |
|---|---|---|---|
| `clients-router` | tabla `vehicles`, `factures` | Bloqueo de borrado | `clients.js:75,82` |
| `vehicles-router` | tabla `clients`, `albarans` | Validación de existencia y bloqueo de borrado | `vehicles.js:37,121` |
| `peces-router` | tabla `albara_linies` | Bloqueo de borrado | `peces.js:82` |
| `albarans-router` | tabla `vehicles`, `peces` | Validación del vehículo, impedir que la cabecera cambie a un vehículo de otro cliente, y movimiento de stock | `albarans.js:58,90,96,159,184,216` |
| `factures-router` | tabla `albarans`, `vehicles`, `albara_linies` | Agrupación, resolución del cliente y cálculo de totales | `factures.js:18,22,62,73` |
| `personal-router` | tabla `nomines` | Bloqueo de borrado | `personal.js:82` |
| `nomines-router` | tabla `personal` | Validación de existencia | `nomines.js:42` |

## 5. Modelo de datos y entidades

SQLite, fichero único `data/taller.db`, con `journal_mode = WAL` y
`foreign_keys = ON` (`server/db/index.js:11-12`).

Todas las tablas de negocio usan `id INTEGER PRIMARY KEY AUTOINCREMENT` y, salvo
`albara_linies` y `_migrations`, llevan `creat_el` y `actualitzat_el` con
`datetime('now')` por defecto.

| Entidad | Tabla | Módulo | Persistida | Relaciones |
|---|---|---|---|---|
| Client | `clients` | clients | Sí | Referenciada por `vehicles.client_id` y `factures.client_id` |
| Peca | `peces` | peces | Sí | Referenciada por `albara_linies.peca_id` |
| Vehicle | `vehicles` | vehicles | Sí | → `clients.id`. `matricula` **UNIQUE** |
| Factura | `factures` | factures | Sí | → `clients.id`. `numero` **UNIQUE** |
| Albara | `albarans` | albarans | Sí | → `vehicles.id`, → `factures.id` (nullable). `numero` **UNIQUE** |
| AlbaraLinia | `albara_linies` | albarans | Sí | → `albarans.id`, → `peces.id` (nullable). `CHECK (tipus IN ('peca','ma_obra'))` |
| Personal | `personal` | personal | Sí | Referenciada por `nomines.personal_id` |
| Nomina | `nomines` | nomines | Sí | → `personal.id`. **UNIQUE (personal_id, mes, any_nomina)** |
| Migration | `_migrations` | shell | Sí | Control de migraciones aplicadas. `filename` **UNIQUE** |

**Migraciones aplicadas, en orden:**

| Fichero | Crea |
|---|---|
| `001_init.sql` | `clients` |
| `002_vehicles_peces_albarans_factures.sql` | `peces`, `vehicles`, `factures`, `albarans`, `albara_linies` |
| `003_personal_i_nomines.sql` | `personal`, `nomines` |

SPEC 06 no añade ninguna migración: la relación albarán→vehículo→cliente que
sostiene `BR-ALB-10` ya existía en el esquema `002`.

**Campos calculados, no almacenados:**

| Campo | Dónde se calcula | Fórmula |
|---|---|---|
| `base`, `iva_import`, `total` de una factura | `server/routes/factures.js:25-27` | `Σ(quantitat × preu)` de las líneas de sus albaranes; IVA sobre la base |
| `salari_net` de una nómina | `server/routes/nomines.js:10` | `salari_brut − deduccions` |

**Sin índices adicionales** más allá de las claves primarias y las restricciones
`UNIQUE` declaradas. No hay `ON DELETE CASCADE`: el borrado en cascada de las
líneas de un albarán se hace en código, dentro de una transacción
(`albarans.js:125-129`).

**Transacciones.** Se usan en cinco puntos, todos con `db.transaction(...)` de
better-sqlite3: aplicación de una migración, borrado de albarán con sus líneas,
alta de línea con descuento de stock, baja de línea con devolución de stock, y
emisión de factura con el marcado de sus albaranes. El rechazo de cambio de
cliente en `PUT /api/albarans/:id` **no** usa transacción: es una comprobación
previa a un `UPDATE` de una sola sentencia.

## 6. Superficie de API

- **Endpoints detectados:** 38
- **Estilo:** REST sobre JSON, bajo el prefijo `/api`
- **Especificación publicada:** ninguna. El proyecto **no expone OpenAPI** ni
  equivalente
- **Propietario del contrato:** DOC-03

Reparto por router (`server/routes/`): albaranes 7, nóminas 6, clientes 5,
piezas 5, personal 5, vehículos 5, facturas 4, más `GET /api/health` en
`server/index.js:20`. La ruta `GET ^(?!\/api).*` es el fallback de SPA y no
cuenta como endpoint de API.

SPEC 06 no cambia el recuento: el filtro `GET /api/vehicles?client_id=` ya
existía (`vehicles.js:6-13`) y `PUT /api/albarans/:id` solo gana una rama de
validación dentro del mismo handler.

**Nota para S-03:** al no haber springdoc ni ningún generador de OpenAPI, DOC-03
no se puede obtener con un `curl` a `/v3/api-docs`. Habrá que derivarlo del
código o introducir un generador. Ver Q-05.

**Convenciones observadas:** los errores viajan como `{ "error": "<mensaje>" }`
en catalán; `400` para validación, `404` para no encontrado, `409` para conflicto
de estado o integridad (incluido el cambio de vehículo a otro cliente), `201` en
creación y `204` sin cuerpo en borrado.

## 7. Integraciones externas

**Ninguna.** La aplicación no llama a ningún servicio externo, no envía correo,
no genera PDF y no se sincroniza con nada. Es coherente con su naturaleza de
aplicación local de un solo puesto.

| ID | Dirección | Protocolo | Qué intercambia |
|---|---|---|---|
| `sqlite-local` | outbound | file / SQL | Único almacén: `data/taller.db`, accedido en proceso por better-sqlite3 |

## 8. Configuración y entornos

No existe fichero `.env` ni sistema de perfiles. La configuración se reduce a una
variable de entorno y a valores en código.

| Clave | Fichero | Obligatoria | Valor por defecto | Para qué |
|---|---|---|---|---|
| `PORT` | `server/index.js:15` | No | `3001` | Puerto de Express |
| Ruta de la BD | `server/db/index.js:5-6` | — | `<raíz>/data/taller.db` | **Codificada en el fuente.** No configurable — ver Q-02 |
| Proxy de desarrollo | `client/vite.config.ts:9` | — | `/api → http://localhost:3001` | Solo en `npm run dev` |
| `taller:lang:v1` | `client/src/i18n/index.ts:6` | No | `es` | Idioma elegido, en `localStorage` |
| `taller:theme:v1` | `client/src/hooks/useTheme.ts:3` | No | Preferencia del sistema | Tema elegido, en `localStorage` |
| `darkMode` | `client/tailwind.config.js` | — | `class` | El tema oscuro se activa con la clase `dark` en `<html>` |

**Scripts disponibles:**

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta servidor y cliente en paralelo con `concurrently` |
| `npm run build` | Compila el cliente (`tsc -b && vite build`) a `client/dist` |
| `npm start` | Levanta solo Express, que sirve API y cliente compilado |
| `npm run seed` | Carga datos de ejemplo en la base de datos |
| `npm run lint -w client` | oxlint sobre el cliente |

**No versionado** (`.gitignore`): `node_modules/`, `data/`, `dist/`, `.env`,
`*.log`. Verificado: ni `client/dist` ni `data/` están bajo control de versiones.

## 9. Testing existente

**Dentro del código de la aplicación (`client/`, `server/`) no hay ninguna prueba
automatizada.** No existen ficheros de test en esas carpetas, ni framework de
test declarado en sus `package.json`, ni configuración de CI.

| Framework | Tipo | Ubicación | Qué cubre |
|---|---|---|---|
| — | — | — | Nada dentro de `client/` ni `server/` |

Lo único que existe en materia de calidad automática **en el código** es
**oxlint** en el cliente (`npm run lint -w client`, configurado en
`client/.oxlintrc.json`). No hay linter en el servidor.

**Cobertura de código observada: 0%.** Es medible sin ejecutar nada: no hay
ficheros de test que ejecutar en `client/` ni `server/`.

Es una omisión **deliberada y documentada**, no un descuido: SPEC 01 declara
«No: tests automatitzats en aquest spec. Muntar Vitest i Playwright mereix un
spec propi que ho faci una sola vegada per a tota l'app»
(`specs/implemented/SPE-01-esquelet-app-taller.md:203`).

Aparte del código de la aplicación, el repositorio contiene en `automation/` dos
suites E2E que ejercen la aplicación **desplegada** (Selenium+Cucumber+TestNG en
`automation/ui/`, colección Postman en `automation/api/`). No son parte de
`client/`/`server/`, las mantiene otro actor (CLAUDE.md) y su alcance y resultado
los llevan DOC-05, DOC-07, DOC-23 y DOC-27 — no este documento.

## 10. Suposiciones y preguntas abiertas

| ID | Pregunta o suposición | Bloquea | A quién preguntar |
|---|---|---|---|
| Q-01 | No hay versión de Node fijada: ni `engines` en los `package.json` ni `.nvmrc`. ¿Cuál es la versión de referencia? Afecta a la reproducibilidad de `better-sqlite3`, que compila binarios nativos | Stack, despliegue | Técnico |
| Q-02 | La ruta de la base de datos está codificada en `server/db/index.js`. ¿Se quiere hacer configurable por entorno, o el uso monopuesto lo hace innecesario? | Configuración | Técnico |
| Q-03 | `generateNumero` ordena por `numero` como texto y consulta el último número fuera de la transacción que hace el `INSERT`. ¿Existe algún requisito de concurrencia, o el uso de un solo puesto lo hace irrelevante? | `db-numbering` | Técnico |
| Q-04 | No hay ninguna suite de pruebas dentro de `client/`/`server/` ni CI, por decisión explícita de SPEC 01. ¿Está previsto el spec que las monte, y con qué alcance? Las suites de `automation/` son E2E externas, no de código | Testing | Técnico |
| Q-05 | Al no exponerse OpenAPI, DOC-03 no se puede generar con un `curl`. ¿Se prefiere introducir un generador en el servidor, o derivar DOC-03 del código? | DOC-03 (S-03) | Técnico / Arquitectura |
| Q-06 | Los routers concentran validación, negocio y SQL sin capa intermedia. ¿Es una decisión asumida para el tamaño actual del proyecto? Condiciona el alcance de DOC-11 y DOC-17 | Arquitectura | Arquitectura |
| Q-07 | El bloque `graph` recoge la arista `<módulo>-pages → <módulo>-service` de cada módulo y la de `albarans-pages → vehicles-service`, pero no todas las llamadas de una página al servicio de otro módulo (fichas de entidades relacionadas, formularios que resuelven el cliente, etc.). Un escaneo dirigido las completaría; quedó fuera de esta regeneración, centrada en SPEC 06 | grafo S-08 | Técnico |

## 11. Bloque estructurado

```yaml graph
version: 1
project: app-taller

components:
  - id: server-app
    layer: api
    module: shell
    path: server/index.js
  - id: clients-router
    layer: api
    module: clients
    path: server/routes/clients.js
  - id: vehicles-router
    layer: api
    module: vehicles
    path: server/routes/vehicles.js
  - id: peces-router
    layer: api
    module: peces
    path: server/routes/peces.js
  - id: albarans-router
    layer: api
    module: albarans
    path: server/routes/albarans.js
  - id: factures-router
    layer: api
    module: factures
    path: server/routes/factures.js
  - id: personal-router
    layer: api
    module: personal
    path: server/routes/personal.js
  - id: nomines-router
    layer: api
    module: nomines
    path: server/routes/nomines.js
  - id: db-connection
    layer: data
    module: shell
    path: server/db/index.js
  - id: db-migrate
    layer: data
    module: shell
    path: server/db/migrate.js
  - id: db-numbering
    layer: data
    module: shell
    path: server/db/numbering.js
  - id: db-seed
    layer: data
    module: shell
    path: server/db/seed.js
  - id: client-main
    layer: ui
    module: shell
    path: client/src/main.tsx
  - id: client-app
    layer: ui
    module: shell
    path: client/src/App.tsx
  - id: layout
    layer: ui
    module: shell
    path: client/src/components/Layout.tsx
  - id: shared-components
    layer: ui
    module: shell
    path: client/src/components
  - id: i18n
    layer: infra
    module: shell
    path: client/src/i18n/index.ts
  - id: use-theme
    layer: ui
    module: shell
    path: client/src/hooks/useTheme.ts
  - id: use-submit-guard
    layer: ui
    module: shell
    path: client/src/hooks/useSubmitGuard.ts
  - id: format-utils
    layer: ui
    module: shell
    path: client/src/utils/format.ts
  - id: api-client
    layer: infra
    module: shell
    path: client/src/services/api.ts
  - id: clients-service
    layer: infra
    module: clients
    path: client/src/services/clients.ts
  - id: vehicles-service
    layer: infra
    module: vehicles
    path: client/src/services/vehicles.ts
  - id: peces-service
    layer: infra
    module: peces
    path: client/src/services/peces.ts
  - id: albarans-service
    layer: infra
    module: albarans
    path: client/src/services/albarans.ts
  - id: factures-service
    layer: infra
    module: factures
    path: client/src/services/factures.ts
  - id: personal-service
    layer: infra
    module: personal
    path: client/src/services/personal.ts
  - id: nomines-service
    layer: infra
    module: nomines
    path: client/src/services/nomines.ts
  - id: clients-pages
    layer: ui
    module: clients
    path: client/src/pages/clients
  - id: vehicles-pages
    layer: ui
    module: vehicles
    path: client/src/pages/vehicles
  - id: peces-pages
    layer: ui
    module: peces
    path: client/src/pages/peces
  - id: albarans-pages
    layer: ui
    module: albarans
    path: client/src/pages/albarans
  - id: factures-pages
    layer: ui
    module: factures
    path: client/src/pages/factures
  - id: personal-pages
    layer: ui
    module: personal
    path: client/src/pages/personal
  - id: nomines-pages
    layer: ui
    module: nomines
    path: client/src/pages/nomines

edges:
  - from: server-app
    to: db-migrate
    type: calls
  - from: server-app
    to: clients-router
    type: imports
  - from: server-app
    to: vehicles-router
    type: imports
  - from: server-app
    to: peces-router
    type: imports
  - from: server-app
    to: albarans-router
    type: imports
  - from: server-app
    to: factures-router
    type: imports
  - from: server-app
    to: personal-router
    type: imports
  - from: server-app
    to: nomines-router
    type: imports
  - from: clients-router
    to: db-connection
    type: reads
  - from: vehicles-router
    to: db-connection
    type: reads
  - from: peces-router
    to: db-connection
    type: reads
  - from: albarans-router
    to: db-connection
    type: writes
  - from: albarans-router
    to: db-numbering
    type: calls
  - from: factures-router
    to: db-connection
    type: writes
  - from: factures-router
    to: db-numbering
    type: calls
  - from: personal-router
    to: db-connection
    type: reads
  - from: nomines-router
    to: db-connection
    type: reads
  - from: db-migrate
    to: db-connection
    type: writes
  - from: db-numbering
    to: db-connection
    type: reads
  - from: db-seed
    to: db-connection
    type: writes
  - from: client-main
    to: client-app
    type: imports
  - from: client-main
    to: i18n
    type: imports
  - from: client-app
    to: layout
    type: imports
  - from: client-app
    to: clients-pages
    type: imports
  - from: client-app
    to: vehicles-pages
    type: imports
  - from: client-app
    to: peces-pages
    type: imports
  - from: client-app
    to: albarans-pages
    type: imports
  - from: client-app
    to: factures-pages
    type: imports
  - from: client-app
    to: personal-pages
    type: imports
  - from: client-app
    to: nomines-pages
    type: imports
  - from: layout
    to: shared-components
    type: imports
  - from: layout
    to: use-theme
    type: calls
  - from: clients-pages
    to: clients-service
    type: calls
  - from: vehicles-pages
    to: vehicles-service
    type: calls
  - from: peces-pages
    to: peces-service
    type: calls
  - from: albarans-pages
    to: albarans-service
    type: calls
  - from: albarans-pages
    to: vehicles-service
    type: calls
  - from: factures-pages
    to: factures-service
    type: calls
  - from: personal-pages
    to: personal-service
    type: calls
  - from: nomines-pages
    to: nomines-service
    type: calls
  - from: clients-service
    to: api-client
    type: calls
  - from: vehicles-service
    to: api-client
    type: calls
  - from: peces-service
    to: api-client
    type: calls
  - from: albarans-service
    to: api-client
    type: calls
  - from: factures-service
    to: api-client
    type: calls
  - from: personal-service
    to: api-client
    type: calls
  - from: nomines-service
    to: api-client
    type: calls
  - from: api-client
    to: server-app
    type: calls
  - from: clients-router
    to: vehicles-router
    type: reads
  - from: clients-router
    to: factures-router
    type: reads
  - from: vehicles-router
    to: clients-router
    type: reads
  - from: vehicles-router
    to: albarans-router
    type: reads
  - from: peces-router
    to: albarans-router
    type: reads
  - from: albarans-router
    to: vehicles-router
    type: reads
  - from: albarans-router
    to: peces-router
    type: writes
  - from: factures-router
    to: albarans-router
    type: writes
  - from: factures-router
    to: vehicles-router
    type: reads
  - from: personal-router
    to: nomines-router
    type: reads
  - from: nomines-router
    to: personal-router
    type: reads
  - from: clients-pages
    to: use-submit-guard
    type: calls
  - from: vehicles-pages
    to: use-submit-guard
    type: calls
  - from: peces-pages
    to: use-submit-guard
    type: calls
  - from: personal-pages
    to: use-submit-guard
    type: calls
  - from: nomines-pages
    to: use-submit-guard
    type: calls
  - from: albarans-pages
    to: use-submit-guard
    type: calls
  - from: factures-pages
    to: use-submit-guard
    type: calls
  - from: clients-pages
    to: format-utils
    type: calls
  - from: albarans-pages
    to: format-utils
    type: calls
  - from: factures-pages
    to: format-utils
    type: calls
  - from: nomines-pages
    to: format-utils
    type: calls
  - from: peces-pages
    to: format-utils
    type: calls
  - from: personal-pages
    to: format-utils
    type: calls

entities:
  - id: Client
    module: clients
    persisted: true
  - id: Vehicle
    module: vehicles
    persisted: true
  - id: Peca
    module: peces
    persisted: true
  - id: Albara
    module: albarans
    persisted: true
  - id: AlbaraLinia
    module: albarans
    persisted: true
  - id: Factura
    module: factures
    persisted: true
  - id: Personal
    module: personal
    persisted: true
  - id: Nomina
    module: nomines
    persisted: true
  - id: Migration
    module: shell
    persisted: true

integrations:
  - id: sqlite-local
    direction: outbound
    protocol: file

api_surface:
  endpoints_detected: 38
  style: rest
  spec_path: null
  contract_owner: DOC-03

testing:
  frameworks: []
  test_files: 0
  coverage_percent: 0
  linter: oxlint (solo client)
  ci: none

open_questions:
  - id: Q-01
    question: No hay versión de Node fijada (ni engines ni .nvmrc). ¿Cuál es la versión de referencia? Afecta a la reproducibilidad de better-sqlite3
    blocks: stack
  - id: Q-02
    question: La ruta de la base de datos está codificada en server/db/index.js. ¿Se quiere hacer configurable por entorno?
    blocks: db-connection
  - id: Q-03
    question: generateNumero ordena por numero como texto y consulta fuera de la transacción del INSERT. ¿Hay requisito de concurrencia?
    blocks: db-numbering
  - id: Q-04
    question: No hay suite de pruebas dentro de client/server ni CI, por decisión explícita de SPEC 01. Las suites de automation/ son E2E externas. ¿Está previsto el spec que monte pruebas de código?
    blocks: testing
  - id: Q-05
    question: Al no exponerse OpenAPI, DOC-03 no se puede generar con un curl. ¿Introducir un generador o derivar DOC-03 del código?
    blocks: api_surface
  - id: Q-06
    question: Los routers concentran validación, negocio y SQL sin capa intermedia. ¿Es una decisión asumida para el tamaño actual?
    blocks: architecture
  - id: Q-07
    question: El grafo enumera la arista pages→service de cada módulo y albarans-pages→vehicles-service, pero no todas las llamadas de una página al servicio de otro módulo. ¿Se completa con un escaneo dirigido?
    blocks: graph
```
