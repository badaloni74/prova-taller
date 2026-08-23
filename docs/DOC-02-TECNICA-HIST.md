# DOC-02-TECNICA · Historial de versiones

Historial del documento `docs/DOC-02-TECNICA.md`. Una entrada por versión, de la más nueva
a la más antigua. **El documento principal no reproduce nada de esto**: refleja solo el
estado actual, con su `version` en el front-matter.

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
