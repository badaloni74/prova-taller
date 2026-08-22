# Triatge dels 26 hallazgos de DOC-14 en specs

Agrupació proposada dels hallazgos de `docs/DOC-14-EXPLORATORIO.md` per
lliurar-los a `/spec` → `/spec-impl`. **És una proposta, no una imposició**: qui
decideix en quants trossos es parteix ets tu.

Criteri d'agrupació: **causa arrel**, no pantalla. Un spec ha de poder compartir
un objectiu d'una frase, uns criteris d'acceptació i una branca.

> **Recorda la regla del projecte:** l'app (`client/`, `server/`) la canvia
> `/spec-impl`; les proves (`automation/ui/`) les canvia `s10-auto-tcs`. Mai el
> mateix actor. Veure `CLAUDE.md`.

## Nivell 1 — Bloquegen l'entrega

| Spec | Hallazgos | Objectiu en una frase | Mida |
|---|---|---|---|
| **04 · Protecció contra enviaments duplicats** | EXP-002 🔴, EXP-001 🟠 | Impedir que una doble pulsació creï dos registres o dues línies idèntiques | Petit — guarda al client |
| **05 · Presentació de xifres i dates** | EXP-007 🟠, EXP-009, EXP-014 | Presentar imports i dates de forma única i completa a tota l'aplicació, inclòs l'import de l'IVA a la factura | Mitjà |
| **10 · Control de concurrència** | EXP-003 🟠 | Impedir que dues edicions simultànies del mateix registre es trepitgin sense avís | **Gran** — migració + API + UI |

EXP-001 i EXP-002 comparteixen mecanisme. EXP-003 va a part tot i ser
concurrència: necessita columna de versió i migració, mida i risc diferents.

**A-12 ja ha censat part d'això**: `MEJ-007` (guarda contra reenviament, de
EXP-002+EXP-001) i `MEJ-008` (format únic d'imports i dates, de EXP-014+EXP-009)
a `docs/DOC-16-ROADMAP.md` 2.1.0.

## Nivell 2 — Qualitat percebuda

| Spec | Hallazgos | Objectiu en una frase | Mida |
|---|---|---|---|
| **06 · Context als llistats i desplegables** | EXP-010, EXP-022, EXP-023, EXP-024 | Mostrar la informació necessària per triar bé on avui només hi ha un identificador | Petit-mitjà |
| **07 · Missatges, confirmacions i rutes desconegudes** | EXP-008, EXP-017, EXP-018, EXP-019, EXP-026 | Que l'aplicació digui sempre què passa, què s'esborrarà i com sortir-ne | Mitjà |
| **08 · Coherència visual i accessibilitat** | EXP-011, EXP-012, EXP-013, EXP-020, EXP-021 | Que l'aplicació es llegeixi bé en tema fosc, en mòbil i amb lector de pantalla | Mitjà |
| **09 · Idioma dels avisos del servidor** | EXP-006 | Que els avisos d'error surtin en l'idioma triat per l'usuari | Mitjà — servidor + i18n, 5 mòduls |

SPEC 09 confirma el candidat a **BUG-005** que `DOC-16` §6.2 només havia deduït
llegint codi. A-12 ha recomptat: **71 literals d'error** al servidor.

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
| **TC-073, TC-075** | **s10-auto-tcs** | Han de reforçar-se quan SPEC 05 mostri l'IVA. Ara passen sense comprovar-lo (`EXP-007`, i `A-05-03b` a DOC-07 1.7.0) |
| EXP-017, EXP-019, EXP-026 | **A-15** | A-12 els ha revisat i són funcionalitat, no deute tècnic |

## Ordre suggerit

`04` → `05` → `08` → `07` → `06` → `09` → `10`, i `11` quan negoci contesti.

Començar pel **04**: és petit, és l'única troballa crítica, i tanca la porta a
factures inflades per un doble clic.
