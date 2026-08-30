# SPEC 05 — Presentació d'imports i dates

> **Estat:** Implemented
> **Origen:** MEJ-008
> **Depèn de:** SPEC 01 (components genèrics, i18n), SPEC 02 (Peces, Albarans, Factures), SPEC 03 (Personal, Nòmines)
> **Data:** 2026-08-22
> **Objectiu:** Unificar la presentació d'imports (coma decimal, milers, símbol €, incloent l'IVA de la factura) i de la data de l'albarà (format llegible) amb un mòdul de format compartit.

---

## Per què existeix aquest spec

Ve del triatge de `docs/DOC-14-INFORME-EXPLORADOR-QA.md` (`TRIATGE-DOC-14.md`, grup «05»),
que agrupa **EXP-007** (`high`: la fitxa de la factura no mostra l'import de
l'IVA, malgrat que dos casos de prova diuen cobrir-ho), **EXP-009** (`medium`:
la data de l'albarà es mostra com una marca de temps ISO en cru) i **EXP-014**
(`medium`: el mateix preu es presenta de tres formes diferents segons la
pantalla, sempre amb punt decimal). `docs/DOC-16-ROADMAP.md` ja ho havia
censat com **MEJ-008**, amb **15 crides a `toFixed` repartides en 8 fitxers,
zero usos d'`Intl`, i cap funció de format de data en tot el client**.

`DOC-14` deixa oberta la pregunta de negoci **P-03** —coma o punt decimal—,
sense resposta fins ara. Aquest spec la respon: **coma**, la convenció nativa
dels dos idiomes de la interfície.

---

## Abast

**Dins:**

- Mòdul nou `client/src/utils/format.ts` amb dues funcions:
  `formatMoney(value: number): string` i `formatDate(isoString: string): string`.
- `formatMoney`: `Intl.NumberFormat` amb `style: 'currency', currency: 'EUR',
  useGrouping: true` (explícit — sense això `es-ES` no sempre afegeix el
  separador de milers). Resultat: `8,50 €`, `1.360,00 €`.
- `formatDate`: `Intl.DateTimeFormat` amb `day: '2-digit', month: '2-digit',
  year: 'numeric'` (explícit — sense això `21/8/2026` en lloc de
  `21/08/2026`). Resultat: `21/08/2026`.
- Aplicar `formatMoney` als **15 usos de `toFixed`** repartits en 8 fitxers:
  `AlbaraLiniesSection.tsx` (3), `ClientDetail.tsx` (1), `FacturaDetail.tsx`
  (2), `FacturesList.tsx` (1), `NominaDetail.tsx` (3), `NominesList.tsx` (1),
  `PecaDetail.tsx` (2), `PersonalDetail.tsx` (2).
- Aplicar `formatMoney` a la columna «Preu» de `PecesList.tsx`, que avui no
  té cap `render` i mostra el número en cru (`8.5`, `45.9`, `95`) — el costat
  que `EXP-014` assenyala com a incorrecte.
- Afegir a `FacturaDetail.tsx` un bloc nou amb l'import de l'IVA
  (`factura.ivaImport`, ja existent al tipus `Factura`, formatat amb
  `formatMoney`), al costat de la base i el total — tanca `EXP-007`.
- Aplicar `formatDate` a la data de l'albarà: `AlbaraDetail.tsx` (fitxa) i
  `AlbaransList.tsx` (columna «Data») — tanca la part de presentació
  d'`EXP-009`.

**Fora d'abast (per a specs futurs):**

- El bug de pèrdua d'hora d'`EXP-009` (guardar l'albarà, encara que només es
  toquin les notes, reescriu la data a mitjanit UTC). És una decisió de
  model —si l'albarà guarda data o data+hora—, no de presentació.
- `Personal.dataAlta` i els `creatEl`/`actualitzatEl` de qualsevol entitat.
  Cap hallazgo de `DOC-14` els reprodueix; `formatDate` no s'hi aplica en
  aquest spec, tot i que en pateixen el mateix defecte de fons.
- Mostrar l'hora de l'albarà a cap pantalla. Es mostra només el dia; l'hora
  que ja emmagatzema l'API no es perd ni es toca, només no es renderitza.
- Actualitzar els fitxers `.feature` d'`automation/ui/` que validen literals
  com `119.06 €`. Correspon a `s10-auto-tcs`, no a qui implanta l'app
  (`CLAUDE.md`) — igual que va quedar declarat a SPEC 04.
- Qualsevol canvi de moneda: sempre EUR.
- Format de mes/any de la nòmina (ja es mostren com a números simples; no és
  el defecte que reprodueix cap hallazgo).

---

## Model de dades

Aquest spec no introdueix cap estructura de dades nova, ni al servidor ni
persistida al client. `formatMoney` i `formatDate` són funcions pures de
presentació: reben el valor que l'API ja retorna (`number` o `string` ISO) i
en tornen una representació textual. Cap tipus TypeScript existent canvia.

---

## Pla d'implementació

1. **Mòdul de format.** Crear `client/src/utils/format.ts` amb:
   - `formatMoney(value: number): string` — `Intl.NumberFormat('es-ES', {
     style: 'currency', currency: 'EUR', useGrouping: true,
     minimumFractionDigits: 2, maximumFractionDigits: 2 })`.
     `formatMoney(1360)` → `"1.360,00 €"`, `formatMoney(8.5)` → `"8,50 €"`.
   - `formatDate(isoString: string): string` — `Intl.DateTimeFormat('es-ES',
     { day: '2-digit', month: '2-digit', year: 'numeric' })` sobre
     `new Date(isoString)`. `formatDate('2026-08-21T15:25:05.101Z')` →
     `"21/08/2026"`.
   Prova manual: `npm run build -w client` compila; cap consumidor encara.

2. **Aplicar `formatMoney` als 8 fitxers amb `toFixed` (15 crides).**
   `AlbaraLiniesSection.tsx` (3), `ClientDetail.tsx` (1), `FacturaDetail.tsx`
   (2: base, total), `FacturesList.tsx` (1), `NominaDetail.tsx` (3),
   `NominesList.tsx` (1), `PecaDetail.tsx` (2), `PersonalDetail.tsx` (2).
   Substitueix `{valor.toFixed(2)} €` per `{formatMoney(valor)}`. Reformata,
   no canvia cap dada. Prova manual: cada pantalla mostra l'import amb coma
   decimal i separador de milers (p. ex. una nòmina de 1360 mostra
   `1.360,00 €`).

3. **Aplicar `formatMoney` al catàleg de peces.** `PecesList.tsx`: afegir
   `render: (peca) => formatMoney(peca.preu)` a la columna `preu`, que avui
   no en té cap. Prova manual: `/peces` mostra `8,50 €` en lloc de `8.5`.

4. **Mostrar l'import de l'IVA a la factura.** `FacturaDetail.tsx`: afegir un
   bloc `dt`/`dd` nou amb `formatMoney(factura.ivaImport)`, entre el tipus
   d'IVA i la base. Clau de traducció nova `factures.detail.ivaImport` a
   `ca.json`/`es.json`. Prova manual: `/factures/1` mostra la quota d'IVA en
   euros (20,66 € per a la factura del seed), no només el `21%`.

5. **Aplicar `formatDate` a la data de l'albarà.** `AlbaraDetail.tsx`
   (fitxa) i `AlbaransList.tsx` (columna «Data», que avui no té `render`).
   Prova manual: `/albarans` i `/albarans/5` mostren `21/08/2026` en lloc de
   `2026-08-21T15:25:05.101Z`.

---

## Criteris d'acceptació

- [x] `formatMoney(1360)` retorna `"1.360,00 €"` (coma decimal, separador de
      milers, símbol €, 2 decimals).
- [x] `formatMoney(8.5)` retorna `"8,50 €"`.
- [x] `formatDate('2026-08-21T15:25:05.101Z')` retorna `"21/08/2026"`.
- [x] Cap de les 15 crides originals a `toFixed` dels 8 fitxers hi és; cap
      pantalla mostra un import amb punt decimal.
- [x] `/peces` mostra el preu de cada peça amb símbol € i 2 decimals (p. ex.
      «Filtre d'oli» mostra `8,50 €`, no `8.5`).
- [x] `/factures/1` mostra l'import de l'IVA en euros (`20,66 €` per a la
      factura del seed), a més del percentatge que ja mostrava.
- [x] `/albarans` mostra la data de cada albarà com `DD/MM/AAAA`, no com a
      marca de temps ISO.
- [x] `/albarans/5` (fitxa) mostra la data com `DD/MM/AAAA`.
- [x] `Personal.dataAlta` i els camps `creatEl`/`actualitzatEl` de qualsevol
      entitat no canvien de format (fora d'abast d'aquest spec).
- [x] `npm run build -w client` compila sense errors després de tots els
      passos.
- [x] No queda cap text literal en castellà o català incrustat als canvis
      nous; `factures.detail.ivaImport` existeix amb el mateix valor de clau
      a `ca.json` i `es.json`.

---

## Decisions

- **Sí:** el spec cobreix el mòdul de format **i** els tres defectes que hi
  donen origen (`EXP-007`, la part de presentació d'`EXP-009`, `EXP-014`), no
  només el mòdul aïllat que proposa `MEJ-008`. Coincideix amb l'objectiu que
  ja tenia el grup «05» a `TRIATGE-DOC-14.md`.
- **No:** el bug de pèrdua d'hora d'`EXP-009` (guardar l'albarà reescriu
  sempre la data a mitjanit UTC). És una decisió de model —si l'albarà guarda
  data o data+hora—, no de presentació; barrejar-ho aquí trencaria l'objectiu
  d'una frase del spec.
- **Sí:** coma decimal, responent ara `P-03` de negoci. És la convenció
  nativa dels dos idiomes de la interfície (només ca/es). Cost conegut i
  acceptat: els `.feature` d'`automation/ui/` que validen literals com
  `119.06 €` quedaran vermells fins que `s10-auto-tcs` els actualitzi —fora
  d'abast d'aquest spec, igual que a SPEC 04.
- **Sí:** separador de milers, junt amb la coma. Cost gairebé nul amb
  `Intl.NumberFormat` i `useGrouping` explícit; sense ell, `1360` es seguiria
  mostrant sense separar.
- **No:** unificar `Personal.dataAlta` ni `creatEl`/`actualitzatEl` de cap
  entitat. Cap hallazgo de `DOC-14` els reprodueix; queda l'abast cenyit al
  que hi ha evidència.
- **Sí:** mostrar només el dia a la data de l'albarà, no l'hora, encara que
  l'API la segueixi retornant. Coincideix amb l'«esperat» que el propi
  `EXP-009` suggereix, i no obliga a decidir ara el model de dades.
- **Sí:** locale fixat `'es-ES'` per a
  `Intl.NumberFormat`/`Intl.DateTimeFormat`, no dinàmic segons l'idioma
  triat a la interfície. Verificat que `es-ES` i `ca-ES` donen exactament el
  mateix resultat un cop `useGrouping` i `day`/`month` en 2 dígits són
  explícits; fixar-lo evita dependre d'una coincidència que podria deixar de
  ser certa si l'aplicació afegeix un tercer idioma.
- **No:** canviar el símbol o la moneda. Sempre `€`, sense abast per a
  multi-moneda en aquest projecte.

---

## Riscos identificats

| Risc | Mitigació |
| --- | --- |
| Els fitxers `.feature` d'`automation/ui/` que validen literals com `119.06 €` deixaran de passar en canviar el separador decimal | Queda anotat com a fora d'abast per a `s10-auto-tcs`; no es corregeix en aquest spec, tal com ja va quedar establert amb SPEC 04 |
| El bloc nou de l'IVA a `FacturaDetail.tsx` passa la graella `dl` de 4 a 5 elements en un `grid-cols-2`, deixant una cel·la buida a l'última fila | Visualment inofensiu, però es verifica al navegador durant la implantació, no només per codi |
| `Personal.dataAlta` es queda amb un format diferent del de l'albarà, ja que l'un usarà `formatDate` i l'altre no | Decisió explícita d'abast (veure Decisions); si es vol coherència total, és un spec futur, no un afegit d'última hora aquí |

---

## Què **no** hi ha en aquest spec

- El bug de pèrdua d'hora d'`EXP-009`.
- Format de `Personal.dataAlta` ni de cap `creatEl`/`actualitzatEl`.
- L'hora de l'albarà a cap pantalla.
- Actualització dels `.feature` d'`automation/ui/`.
- Multi-moneda.

Cadascun d'aquests punts, si arriba, va en un spec futur.
