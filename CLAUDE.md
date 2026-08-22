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

Format de la capçalera d'un spec: veure `specs/03-personal-i-nomines.md`. Els
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
| DOC-23 | Informe d'execució de la suite | S-10 |
| DOC-24 | Defectes confirmats `BUG-nnn` | A-14 |
| DOC-25 | Propostes funcionals `FUN-nnn` | A-15 |

`registro-ids.json` governa els identificadors (`REQ`, `TC`, `UC`, `BR`) i el
gestiona la skill `s12-registro-ids`. **Els IDs només s'afegeixen: mai es
renumeren ni es reutilitzen.**

Quan un canvi a l'app toca comportament documentat, hi ha documents que queden
desfasats. La skill `s16-cascada-obsolescencia` calcula quins.

## Proves automatitzades

`automation/ui/` — Selenium + Cucumber + TestNG, patró BasePO / StepDef genèric
/ arguments `Tipus: Valor`. Cobreix **102 dels 110 casos de DOC-05**.

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

- **1 cas vermell:** TC-048, per manca d'aïllament amb TC-040 (és la prova, no
  l'app). Detall a `docs/DOC-23-INFORME.md` §4.
- **26 troballes obertes** a `docs/DOC-14-EXPLORATORIO.md`, en estat `draft`, a
  l'espera de revisió humana. Tres d'elles (EXP-004, EXP-005, EXP-015) esperen
  resposta de negoci i **no s'han de tocar** fins llavors.
- **BUG-003 i BUG-004** de `docs/DOC-24-BUGS.json` segueixen oberts.
