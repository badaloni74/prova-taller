# app-taller

Aplicació de gestió d'un taller mecànic. El cicle central encadena
**Client → Vehicle → Albarà → Factura**, i en paral·lel manté el catàleg de
peces amb el seu estoc i el personal amb les seves nòmines.

Local, monolloc, sense autenticació — és una decisió explícita del projecte
(SPEC 01, «Fora d'abast»), no una carència.

## Stack i com s'arrenca

- **Client:** React + TypeScript + Vite + Tailwind (`client/`)
- **Servidor:** Express + better-sqlite3 (`server/`), base a `data/taller.db`
- **Workspaces npm** des de l'arrel

```bash
npm run dev     # servidor (3001) + client (5173) alhora
npm run seed    # sembra la base; per refer-la: rm -f data/taller.db && npm run seed
```

El domini està en català (`albarà`, `peça`, `estoc`, `nòmina`) perquè és el que
apareix a la interfície, a la base de dades i al codi. La interfície es pot
veure en castellà i en català.

## La regla que no es negocia: l'app i les seves proves són coses diferents

| Zona | Qui la toca | Qui NO la toca |
|---|---|---|
| `client/`, `server/` — **l'aplicació** | `/spec` → `/spec-impl` | el mantenidor de proves |
| `automation/ui/` — **les proves** | skill `s10-auto-tcs` | qui implanta canvis a l'app |

**Per què importa:** si un mateix agent pot tocar totes dues zones, el camí més
barat per posar un test vermell en verd és **afluixar el test**. No cal mala fe,
és literalment menys feina. Separar-ho ho fa estructuralment impossible.

I la decisió *«el dolent és l'app o la prova?»* no és de cap dels dos: la pren
una persona després de llegir l'informe.

## Com es canvia l'aplicació

Amb `/spec` i `/spec-impl`. Els tres specs existents (`specs/01`, `02`, `03`)
van construir l'app sencera així.

1. `/spec` — entrevista, agrupa la feina en un o més specs, els desa a `specs/`
   en estat **Draft**
2. **Tu** els rellegeixes i canvies l'estat a `Approved`. `/spec-impl` es nega a
   arrencar si no ho està
3. `/spec-impl NN-slug` — branca pròpia, implantació pas a pas amb pausa per
   revisar cada diff

Format de la capçalera d'un spec: veure `specs/implemented/SPE-03-personal-i-nomines.md`. Els
estats es fan servir **en anglès** (`Draft`, `Approved`, `Implemented`), tot i
que el cos del document està en català.

## Documentació: el cànon DOC-nn

`docs/` no és documentació informal: cada fitxer té un propietari (un agent o
skill) i un contracte. **No editis un DOC-nn a mà** — el regenera qui el té
assignat.

| Document | Què és | Propietari |
|---|---|---|
| DOC-01 / DOC-02 | Base AS-IS i veritat tècnica | `skill-doc-base` (S-01) |
| DOC-04 | Requisits `REQ-nnn` | A-02 |
| DOC-05 | Pla de proves `TC-nnn` | A-03 |
| DOC-06 | Manual d'usuari | A-04 |
| DOC-07 | Traçabilitat i cobertura | A-05 |
| DOC-14 | Informe d'exploració QA `EXP-nnn` | A-10 |
| DOC-16 | Roadmap tècnic `MEJ-nnn` | A-12 |
| DOC-23 | Informe d'execució de la suite (UI) | S-10 |
| DOC-24 | Defectes confirmats `BUG-nnn` | A-14 |
| DOC-26 | Col·lecció Postman de capa de servei (`automation/api/`) | S-17 |
| DOC-25 | Propostes funcionals `FUN-nnn` | A-15 |

`registro-ids.json` governa els identificadors (`REQ`, `TC`, `UC`, `BR`) i el
gestiona la skill `s12-registro-ids`. **Els IDs només s'afegeixen: mai es
renumeren ni es reutilitzen.**

Quan un canvi a l'app toca comportament documentat, hi ha documents que queden
desfasats. La skill `s16-cascada-obsolescencia` calcula quins.

## Proves automatitzades

`automation/ui/` — Selenium + Cucumber + TestNG, patró BasePO / StepDef genèric
/ arguments `Tipus: Valor`. Cobreix **102 dels 110 casos de DOC-05**.

`automation/api/` — col·lecció Postman (S-17, DOC-26) que valida la capa de
servei: regles de negoci que la interfície no permet ni intentar (línies amb
un tipus que el desplegable no ofereix, facturar un albarà ja facturat,
barrejar clients en una factura). Cobreix 4 dels 110 casos de DOC-05
(`verification_path: service`). S'executa amb `newman`, no duplica cap cas
de `automation/ui/`.

```bash
cd automation/api && newman run collection.json -e environments/local.json
```

```bash
export JAVA_HOME="C:\Program Files\Java\jdk-21.0.9.10-hotspot"
cd automation/ui && mvn test -Dapp.url=http://localhost:5173
```

Dues coses apreses executant-la, i que costen hores si es redescobreixen:

- **El `JAVA_HOME` cal exportar-lo.** El Maven d'aquesta màquina arrenca amb
  Java 11 i el `pom.xml` demana 21; sense això falla amb `invalid target
  release: 21`, que no diu enlloc que el problema sigui el JAVA_HOME de Maven.
- **Per a la suite sencera, fes servir un build de producció servit en estàtic**
  (`vite preview`), no `npm run dev`. El servidor de desenvolupament ha caigut a
  mitja execució diverses vegades sota la càrrega d'obrir Chrome headless
  desenes de cops. Per iterar un sol escenari, `npm run dev` va bé.

**Reseed abans de cada execució completa.** Hi ha escenaris que consumeixen
estoc o creen registres sense desfer-los, perquè és el comportament que
verifiquen.

## Estat conegut

- **TC-048 ja no és vermell** — corregit i verificat (2026-08-23, commit
  `735ded8`): manca d'aïllament amb TC-040, era la prova, no l'app.
  **`DOC-23` 2.1.0 confirma 17 vermells nous, tots la mateixa causa
  (`EXP-027`)**: `factures.feature`/`nomines.feature` encara validen
  literals amb punt decimal (p. ex. `121.00 €`) que ja no coincideixen amb
  la pantalla des del SPEC 05 (coma decimal). Correspon a `s10-auto-tcs`
  actualitzar-los i re-executar. Un cas més (`TC-029`) és una fallada
  puntual d'infraestructura (Chrome no arrenca), no reproduïda de forma
  fiable — veure `DOC-23` §4.3.
- Documentació regenerada i al dia amb el codi (2026-08-23): `DOC-01` a
  `DOC-09`, `DOC-14`, `DOC-16` i `DOC-25`. Segueixen totes en `status: draft`
  — cap ha creuat el gate humà d'aprovació.
- **26 troballes originals de `DOC-14`**: 4 tancades i verificades en viu
  (`EXP-001/002/007/014`), 1 parcial (`EXP-009` — presentació corregida,
  el bug de pèrdua d'hora en guardar segueix obert), 2 noves (`EXP-027`,
  `EXP-028`). Tres (`EXP-004`, `EXP-005`, `EXP-015`) esperen resposta de
  negoci i **no s'han de tocar** fins llavors.
- **BUG-003 i BUG-004** de `docs/DOC-24-BUGS.json` segueixen oberts.
  `BUG-003` ja té decisió de negoci (2026-08-16, Q-12), pendent d'implantar.
