# Triatge dels 26 hallazgos de DOC-14 en specs

Agrupació proposada dels hallazgos de `docs/DOC-14-INFORME-EXPLORADOR-QA.md` per
lliurar-los a `/spec` → `/spec-impl`. **És una proposta, no una imposició**: qui
decideix en quants trossos es parteix ets tu.

Criteri d'agrupació: **causa arrel**, no pantalla. Un spec ha de poder compartir
un objectiu d'una frase, uns criteris d'acceptació i una branca.

> **Recorda la regla del projecte:** l'app (`client/`, `server/`) la canvia
> `/spec-impl`; les proves (`automation/ui/`) les canvia `s10-auto-tcs`. Mai el
> mateix actor. Veure `CLAUDE.md`.

## Nivell 1 — Bloquegen l'entrega

| Spec | Hallazgos | Estat |
|---|---|---|
| **04 · Protecció contra enviaments duplicats** | EXP-002 🔴, EXP-001 🟠 | ✅ Implemented. Tancat i verificat en viu a `DOC-14` 2.0.0 |
| **05 · Presentació de xifres i dates** | EXP-007 🟠, EXP-009, EXP-014 | ✅ Implemented. EXP-007/014 tancats; EXP-009 **parcial** — la presentació és correcta, però guardar l'albarà encara reescriu la data a mitjanit UTC i perd l'hora (fora d'abast del spec, mai atès) |
| **10 · Control de concurrència** | EXP-003 🟠 | Pendent. **Compte:** `A-15` també ha derivat `FUN-012` del mateix `EXP-003` a `DOC-25` 1.2.0 — mateixa causa arrel vista com a defecte (aquí) i com a proposta funcional (allà). Cal decidir quin dels dos camins es fa servir abans d'obrir cap dels dos |

**A-12 ha marcat `MEJ-007` i `MEJ-008` com a `implemented`** a `docs/DOC-16-ROADMAP.md` 3.0.0, amb els SPECs 04 i 05 com a evidència de tancament.

## Nivell 2 — Qualitat percebuda

| Spec | Hallazgos | Objectiu en una frase | Mida |
|---|---|---|---|
| **06 · Context als llistats i desplegables** | EXP-010, EXP-022, EXP-023, EXP-024 | Mostrar la informació necessària per triar bé on avui només hi ha un identificador | Petit-mitjà |
| **07 · Missatges i confirmacions** | EXP-008, EXP-018 | Que l'aplicació digui sempre què passa quan una ruta no existeix o es retira una línia | Petit |
| **08 · Coherència visual i accessibilitat** | EXP-011, EXP-012, EXP-013, EXP-020, EXP-021 | Que l'aplicació es llegeixi bé en tema fosc, en mòbil i amb lector de pantalla | Mitjà |
| **09 · Idioma dels avisos del servidor** | EXP-006 | Que els avisos d'error surtin en l'idioma triat per l'usuari | Mitjà — servidor + i18n, 5 mòduls |

SPEC 09 confirma el candidat a **BUG-005** que `DOC-16` §6.2 només havia deduït
llegint codi. A-12 ha recomptat: **71 literals d'error** al servidor.

**Dues troballes noves de `DOC-14` 2.0.0, sorgides de verificar el tancament
dels SPECs 04/05, no encaixen a cap spec d'aquesta taula:**

| Troballa | On va | Per què |
|---|---|---|
| **EXP-027** (`high`) | **`s10-auto-tcs`** | Els `.feature` de `factures`/`nomines` validen literals amb punt decimal que ja no coincideixen amb la pantalla des del SPEC 05 (coma decimal). `DOC-23` 2.0.0 («106 verds») ja no és fiable — cal actualitzar els `.feature` i re-executar. Confirmat per `A-05` a `DOC-07` 1.8.0 (`A-05-13`) |
| **EXP-028** (`low`) | **Ja resolt com a `MEJ-009`** | `Personal.dataAlta` sense formatar mentre l'albarà ja usa `DD/MM/AAAA`. A-12 l'ha convertit directament en millora a `DOC-16` 3.0.0, `proposed`, trivial |

## Nivell 3 — Bloquejat per negoci

| Spec | Hallazgos | Per què espera |
|---|---|---|
| **11 · Validació de dades de negoci** | EXP-004 🟠, EXP-005, EXP-015, EXP-016 | DOC-14 marca EXP-004/005/015 com a **no tocar fins que negoci contesti P-01 i P-02** |

**EXP-016** (correu sense arrova) **no està bloquejat** i es pot separar. Aquí
encaixa també **BUG-003** de `docs/DOC-24-BUGS.json`, encara obert.

## Fora de `spec-impl`

| Element | On va | Per què |
|---|---|---|
| **EXP-025** | **A-04** (manual) | El manual descriu comportament d'stock ja corregit. És documentació, no codi |
| **TC-048** | **s10-auto-tcs** | La causa és TC-040, que no neteja. És la prova, no l'app |
| **TC-073, TC-075** | **s10-auto-tcs** | SPEC 05 ja mostra l'IVA (`EXP-007` tancat), però encara no comproven l'import — a més, ara també cauen sota `EXP-027` (literal amb punt decimal) |
| EXP-017, EXP-019, EXP-026 | **Fet: `FUN-009`, `FUN-011`, `FUN-010`** | Ja convertides a propostes funcionals a `docs/DOC-25-PROPUESTAS-FUNCIONALES.md` 1.2.0. Pendents de decisió, no de triatge |

## Ordre suggerit

~~`04`~~ → ~~`05`~~ → `08` → `07` → `06` → `09` → `10`, i `11` quan negoci
contesti. **04 i 05 ja implantats i tancats.**

Següent pas: **08** (coherència visual i accessibilitat).
