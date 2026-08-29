---
doc_id: DOC-02-HIST
doc_name: DOC-02-TECNICA-HIST
of_document: DOC-02-TECNICA.md
version: 1.2.0        # no se versiona por separado: refleja la versión del documento que historia, para que S-16 no lo lea como artefacto sin versión
status: draft
generator: S-01 skill-doc-base
generator_version: "2.0"
generated_at: 2026-08-28T13:55:00+02:00
---

# DOC-02-TECNICA · Historial de versiones

Historial del documento `docs/DOC-02-TECNICA.md`. Una entrada por versión, de la más nueva
a la más antigua. **El documento principal no reproduce nada de esto**: refleja solo el
estado actual, con su `version` en el front-matter.

---

## 1.2.0 — 2026-08-28 — MINOR

**Misma causa que `DOC-01` 1.2.0:** el `commit_sha` declarado (`90b24b8`) ya no es `HEAD`
(`345a3ae`), con los dos commits de **SPEC 06** sobre `client/`/`server/` de por medio
(`65b23a2` en `server/db/seed.js`, `e6ecc5b` en
`client/src/pages/albarans/AlbaraForm.tsx`).

**Qué cambia en el bloque `graph`:**

- **Una arista nueva:** `albarans-pages → vehicles-service` (`calls`). `AlbaraForm.tsx`
  la ejerce con fuerza desde SPEC 06 (`vehiclesService.get` + `listByClient` para resolver
  el cliente y filtrar el desplegable); `AlbaraDetail.tsx` ya la usaba. La arista existía
  en el código antes de SPEC 06 y la v1.1.0 no la recogió — se corrige aquí.
- **`open_questions` gana `Q-07`:** el grafo enumera `pages→service` de cada módulo y
  ahora `albarans-pages→vehicles-service`, pero no todas las llamadas de una página al
  servicio de otro módulo (fichas de entidades relacionadas, `FacturaForm→clients/albarans`,
  `NominaForm→personal`, etc.). Un escaneo dirigido las completaría; quedó fuera de esta
  regeneración, centrada en SPEC 06.

**Qué cambia en la prosa (sin efecto sobre el bloque `graph`):**

- §2 y §3: el rechazo `409` de `PUT /api/albarans/:id` cuando el vehículo nuevo es de otro
  cliente (`albarans.js:95-104`), y el filtrado del selector en `AlbaraForm` al editar.
- §3: `db-seed` ahora siembra un cliente con dos vehículos (dato, no estructura).
- §5, §6: SPEC 06 no añade migración ni endpoint — `GET /api/vehicles?client_id=` ya
  existía; el recuento sigue en **38**.
- §9: se aclara que el «0% de cobertura» y el «sin tests» se refieren al código de
  `client/`/`server/`; las suites E2E de `automation/` (ya existentes) se mencionan pero
  no son parte de este documento. El bloque `testing` del YAML **no cambia**.

**Qué NO cambia.** Stack, capas, componentes, modelo de datos, entidades, integraciones,
`api_surface` (38), `testing`, configuración. El esquema del bloque `graph` es el mismo →
`MINOR`, no `MAJOR`.

**Documentos derivados que quedan obsoletos por este salto:** `DOC-09` y, si existieran,
`DOC-11` y `DOC-17`. `S-16` debe recalcular el grafo S-08.

---

## 1.1.0 — 2026-08-23 — MINOR

**Primera regeneración desde la creación del documento.** Misma causa que `DOC-01` 1.1.0:
`cascada.js` detecta código desincronizado — `commit_sha` declarado (`44748fb`) ya no es
`HEAD` (`90b24b8`), con 12 commits sobre `client/`/`server/` de por medio (SPECs 04 y 05).

**Qué cambia — dos componentes nuevos, ambos en `client/src`, capa `ui`, módulo `shell`:**

- **`use-submit-guard`** (`client/src/hooks/useSubmitGuard.ts`). Hook que bloquea reenvíos
  mientras una petición está en vuelo. Lo consumen los siete módulos de páginas: los seis
  que usan `EntityForm` (clientes, vehículos, piezas, personal, nóminas, cabecera de
  albarán) más `AlbaraLiniesSection.tsx` y `FacturaForm.tsx` directamente.
- **`format-utils`** (`client/src/utils/format.ts`). `formatMoney`/`formatDate` sobre
  `Intl.NumberFormat`/`Intl.DateTimeFormat`. Lo consumen seis de los siete módulos de
  páginas — todos salvo `vehicles-pages`, que no presenta ningún importe.

Quince aristas nuevas en el grafo (7 hacia `use-submit-guard`, 6 hacia `format-utils`),
todas de tipo `calls`, verificadas contra el código real, no inferidas.

**Qué NO cambia.** Stack, arquitectura, capas del servidor, modelo de datos, superficie de
API (siguen 38 endpoints — SPEC 04 y SPEC 05 son cambios de cliente puro, ningún endpoint
nuevo ni modificado), configuración, testing (sigue en 0%). El salto es `MINOR`, no `MAJOR`:
se añaden elementos al bloque `graph`, pero no cambia su esquema.

**Documentos derivados que quedan obsoletos por este salto:** `DOC-09`, `DOC-11` (si
existiera) y `DOC-17` (si existiera). `S-16` debe recalcularlo en la próxima ejecución de
`cascada.js`.

---

## 1.0.0 — 2026-08-15 — inicial

Primera generación. Ver `docs/DOC-02-TECNICA.md` en el commit `44748fb` para el contenido
íntegro de esta versión — no se reconstruye aquí porque no hubo versión anterior con la que
compararla.
