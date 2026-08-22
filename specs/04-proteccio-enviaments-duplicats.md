# SPEC 04 — Protecció contra enviaments duplicats

> **Estat:** Implemented
> **Depèn de:** SPEC 01 (EntityForm i components genèrics), SPEC 02 (línies d'albarà i emissió de factura), SPEC 03 (formularis de Personal i Nòmines)
> **Data:** 2026-08-22
> **Objectiu:** Impedir que una segona pulsació del botó d'enviament, mentre la primera petició encara és en vol, creï un registre o una línia duplicats.

---

## Per què existeix aquest spec

Ve del triatge de `docs/DOC-14-EXPLORATORIO.md` (`TRIATGE-DOC-14.md`, grup «04»),
que agrupa **EXP-002** (`critical`: doble clic a «Afegir línia» duplica la línia
i descompta l'estoc dues vegades) i **EXP-001** (`high`: doble clic a «Guardar»
dona d'alta el mateix client dues vegades). `docs/DOC-16-ROADMAP.md` ja ho havia
censat com **MEJ-007** i hi havia comptat exactament tres punts d'enviament a
tot el client: `EntityForm.tsx` (el fan servir sis mòduls de pàgina),
`AlbaraLiniesSection.tsx` i `FacturaForm.tsx`.

El patró de la solució ja existeix, provat, en aquesta mateixa aplicació:
`FacturaDetail.tsx` i `NominaDetail.tsx` deshabiliten el seu commutador d'estat
amb `disabled={updating}`. Aquest spec generalitza el mateix principi als tres
punts on es **creen** registres, que és on avui no hi ha cap guarda.

---

## Abast

**Dins:**

- Un hook compartit `useSubmitGuard`, a `client/src/hooks/useSubmitGuard.ts`,
  que embolcalla una funció d'enviament asíncrona i bloqueja qualsevol crida
  mentre l'anterior encara no ha tornat.
- Aplicar-lo als **tres punts d'enviament** que `DOC-16` ha censat:
  - `EntityForm.tsx:90`, consumit pels sis formularis d'entitat (Client,
    Vehicle, Peça, Personal, Nòmina, capçalera d'Albarà).
  - `AlbaraLiniesSection.tsx:221` (afegir línia a un albarà).
  - `FacturaForm.tsx:142` (emissió de factura).
- Mentre l'enviament és en vol: el botó queda deshabilitat i la seva etiqueta
  canvia a un text d'espera («Desant…» / «Guardando…»).
- Clau de traducció nova `common.saving` a `ca.json` i `es.json`.
- Criteri d'acceptació que verifiqui que l'efecte col·lateral d'EXP-001 (la
  fitxa de client queda descoordinada respecte a la URL després del doble
  enviament) ja no es pot produir, com a conseqüència directa de no haver-hi
  segona petició.

**Fora d'abast (per a specs futurs):**

- Clau d'idempotència al servidor o qualsevol protecció definitiva de l'import.
  `DOC-14/EXP-002` ho assenyala explícitament com una decisió de disseny a part
  («la protecció definitiva de l'import probablement exigeixi idempotència en
  el servidor, però això és una decisió de disseny que no correspon a aquest
  informe»).
- Guardes de domini al servidor (unicitat per NIF, per matrícula, etc.).
  `DOC-04` no imposa unicitat i el mateix `EXP-001` diu explícitament que dues
  persones es poden dir igual: no és el problema que es resol aquí.
- Botons d'esborrat (`ConfirmDialog`) i «Treure línia» d'un albarà. El diàleg
  de confirmació ja es tanca abans de fer la crida, i un segon `DELETE` sobre
  la mateixa línia ja rebota amb `404`: el doble clic no hi té efecte visible
  avui.
- Els commutadors d'estat de pagament de Factura i Nòmina
  (`disabled={updating}`). Ja tenen la seva pròpia guarda escrita a mà; no es
  toquen ni es migren a `useSubmitGuard` en aquest spec.
- El cas de prova de doble pulsació a `automation/ui`. Correspon a
  `s10-auto-tcs`, no a aquest spec — veure nota final.

---

## Model de dades

Aquest spec no introdueix cap estructura de dades nova, ni al servidor ni
persistida al client. El mecanisme viu només com a estat de React
(`submitting: boolean`) dins de cada component que l'utilitza.

---

## Pla d'implementació

1. **Hook `useSubmitGuard`.** Crear `client/src/hooks/useSubmitGuard.ts`:

   ```ts
   function useSubmitGuard<Args extends unknown[]>(
     onSubmit: (...args: Args) => Promise<void>,
     options?: { resetOnSuccess?: boolean }, // per defecte false
   ): { submitting: boolean; guardedSubmit: (...args: Args) => Promise<void> }
   ```

   `guardedSubmit` ignora la crida si `submitting` ja és `true` (guarda lògica,
   no només visual: cobreix la finestra entre dos clics dins del mateix cicle
   de React, abans que el `disabled` es pinti). En error, torna `submitting` a
   `false`. En èxit, només el torna a `false` si `resetOnSuccess` és `true`.
   Cap consumidor encara el crida, així que aquest pas no canvia cap pantalla.
   Prova manual: `npm run build -w client` compila sense errors.

2. **Clau de traducció `common.saving`.** Afegir a `client/src/locales/ca.json`
   (`"Desant…"`) i `client/src/locales/es.json` (`"Guardando…"`), al costat de
   `common.save`. Prova manual: `npm run build -w client` compila; cap pantalla
   la fa servir encara.

3. **Suport a `EntityForm` per a l'estat d'enviament.** Afegir-hi dues props
   opcionals, `submitting?: boolean` i `submittingLabel?: string`: quan
   `submitting` és `true`, el botó de `type="submit"` queda `disabled` i
   mostra `submittingLabel` en lloc de `submitLabel`. Com que són opcionals,
   els sis consumidors actuals no canvien de comportament. Prova manual: els
   sis formularis d'entitat es veuen exactament igual que abans.

4. **Aplicar el hook als sis formularis d'`EntityForm`.** A `ClientForm.tsx`,
   `VehicleForm.tsx`, `PecaForm.tsx`, `PersonalForm.tsx`, `NominaForm.tsx` i
   `AlbaraForm.tsx`: embolcallar el `handleSubmit` existent amb
   `useSubmitGuard` (`resetOnSuccess` per defecte, és a dir `false` — cada un
   d'aquests navega a la fitxa de detall en acabar) i passar `submitting` i
   `submittingLabel={t('common.saving')}` a `EntityForm`. Prova manual: doble
   clic a «Guardar» en l'alta d'un client (repetint els passos de
   `DOC-14/EXP-001`) crea **un sol** client, i la URL no queda descoordinada
   respecte a la fitxa mostrada.

5. **Aplicar el hook a `AlbaraLiniesSection.tsx`.** Embolcallar `handleAdd`
   amb `useSubmitGuard({ resetOnSuccess: true })`: a diferència dels sis
   formularis anteriors, «Afegir línia» **no navega** en acabar — l'usuari
   n'ha de poder prémer una segona vegada de seguida per afegir la línia
   següent, així que aquí sí cal rearmar el botó també en èxit. Deshabilitar
   el botó i mostrar `t('common.saving')` mentre `submitting`. Prova manual:
   doble clic a «Afegir línia» (repetint `DOC-14/EXP-002`) crea **una sola**
   línia i descompta l'estoc **una sola vegada**; prémer «Afegir línia» una
   segona vegada, ja resolta la primera petició, hi afegeix una segona línia
   amb normalitat.

6. **Aplicar el hook a `FacturaForm.tsx`.** Embolcallar `handleSubmit` amb
   `useSubmitGuard` (`resetOnSuccess` per defecte, `false` — navega a la
   fitxa de la factura creada). Deshabilitar el botó i mostrar
   `t('common.saving')` mentre `submitting`. Prova manual: doble clic a
   «Crear factura» crea **una sola** factura amb els albarans seleccionats.

---

## Criteris d'acceptació

- [x] Doble clic a «Guardar» en l'alta d'un client (`/clients/nou`) crea un
      sol client, no dos.
- [x] Després del doble clic anterior, la URL de la fitxa resultant i el
      contingut mostrat corresponen al mateix registre (l'efecte col·lateral
      de navegació descoordinada d'`EXP-001` no es reprodueix).
- [x] Doble clic a «Afegir línia» en un albarà pendent crea una sola línia,
      amb la quantitat anotada una sola vegada i l'estoc de la peça descomptat
      una sola vegada.
- [x] Després que una línia s'ha afegit amb èxit, el botó «Afegir línia» torna
      a estar habilitat i es pot fer servir per afegir una segona línia sense
      recarregar la pàgina.
- [x] Doble clic a «Crear factura» crea una sola factura.
- [x] Mentre una petició d'enviament és en vol, el botó corresponent mostra
      `common.saving` («Desant…» / «Guardando…») i no respon a clics
      addicionals.
- [x] Si una petició d'enviament falla (per exemple, resposta `409` o `400`
      del servidor), el botó torna a estar habilitat i l'usuari pot reintentar
      sense recarregar la pàgina.
- [x] Els commutadors d'estat de pagament de `FacturaDetail.tsx` i
      `NominaDetail.tsx` seguixen funcionant exactament igual que abans (no es
      toquen en aquest spec).
- [x] Esborrar un registre des de qualsevol `ConfirmDialog` de l'aplicació
      segueix funcionant igual que abans (no es toca en aquest spec).
- [x] `npm run build -w client` compila sense errors després de tots els
      passos.
- [x] No queda cap text literal en castellà o català incrustat als canvis
      nous; `common.saving` existeix amb el mateix valor de clau a `ca.json` i
      `es.json`.

---

## Decisions

- **Sí:** el mecanisme viu en un únic hook compartit (`useSubmitGuard`), no
  repetit a cada formulari. És literalment el que `MEJ-007` demana («que el
  bloqueig visqui en un sol lloc») i evita que EXP-001 i EXP-002 s'arreglin
  amb tres implementacions diferents.
- **Sí:** la guarda és lògica (un flag comprovat dins de `guardedSubmit`), no
  només visual (l'atribut `disabled` del botó). Un `disabled` que depèn d'un
  re-render de React pot arribar tard respecte a un segon clic molt ràpid; el
  flag intern tanca aquesta finestra sense dependre del cicle de pintat.
- **Sí, amb una excepció trobada durant la implementació:** per defecte el
  botó **no** es rearma en èxit, només en error — és la lectura que tanca la
  finestra de navegació d'`EXP-001`. Però `AlbaraLiniesSection` és l'únic dels
  tres punts que **no navega** en acabar: l'usuari hi torna per afegir la
  línia següent. Rearmar-lo sempre en aquell punt concret no reobre cap
  finestra de navegació —no n'hi ha— i sense fer-ho el formulari quedaria
  inutilitzat després de la primera línia. Per això `resetOnSuccess` és un
  paràmetre del hook amb `false` per defecte, i `AlbaraLiniesSection` és
  l'únic dels tres punts que el passa a `true`.
- **Sí:** una sola clau de traducció (`common.saving`) reutilitzada als tres
  punts, en lloc d'un text diferent per context («Desant…», «Afegint…»,
  «Emetent…»). Coherent amb el mateix principi d'«un sol lloc» de `MEJ-007`,
  i evita tres claus noves per a la mateixa idea.
- **No:** clau d'idempotència al servidor. `EXP-002` ja la marca com a decisió
  de disseny separada, de mida i risc diferents (migració o taula de claus).
  Aquest spec és la protecció visible i barata; la protecció definitiva de
  l'import queda per a un spec futur si es decideix necessària.
- **No:** guardes de domini al servidor (unicitat de NIF, de nom). `DOC-04` no
  ho exigeix i `EXP-001` adverteix explícitament que dues persones es poden
  dir igual — imposar-ho seria canviar una regla de negoci no demanada per
  aquest triatge.
- **No:** tocar els botons d'esborrat ni els commutadors d'estat existents.
  Els primers ja tanquen el diàleg abans de la crida; els segons ja tenen
  guarda pròpia funcionant. Ampliar l'abast aquí no aporta res i eixampla el
  diff sense necessitat.

---

## Riscos identificats

| Risc | Mitigació |
| --- | --- |
| Afegir `resetOnSuccess` com a excepció d'un sol punt pot passar per alt en revisions futures i algú «uniformitzar-ho» sense entendre per què hi és | Queda documentat aquí i com a comentari al costat de la crida a `useSubmitGuard` dins d'`AlbaraLiniesSection.tsx` |
| Cap cas de `DOC-05`/`automation/ui` prova el doble clic; la suite no detectarà una regressió futura d'aquest arranjament | Es deixa constància explícita a la nota final perquè `s10-auto-tcs` afegeixi el cas quan correspongui — no és feina d'aquest spec |
| `EntityForm` el consumeixen sis mòduls; un error al pas 3 afectaria tots alhora | Les props noves són opcionals i no canvien cap comportament fins que un consumidor concret les passa (pas 4); el pas 3 es pot verificar sol abans d'arriscar els sis formularis |

---

## Nota per a `s10-auto-tcs` (fora d'aquest spec)

`DOC-05` no té cap cas de prova de doble pulsació, així que la suite
automatitzada no verificarà aquest arranjament ni detectarà si es trenca en
el futur. Un cop implementat aquest spec, val la pena que `s10-auto-tcs`
afegeixi almenys un escenari per als tres punts (client, línia d'albarà,
factura) que faci doble clic i comprovi que només s'ha creat un registre.
Aquest spec no ho fa perquè `automation/ui/` no el toca qui implanta l'app
(`CLAUDE.md`).

---

## Què **no** hi ha en aquest spec

- Clau d'idempotència ni cap altra protecció al servidor.
- Guardes de domini (unicitat de NIF, de matrícula, de nom).
- Canvis als botons d'esborrat ni als commutadors d'estat de pagament.
- El cas de prova automatitzat del doble clic (correspon a `s10-auto-tcs`).

Cadascun d'aquests punts, si arriba, va en un spec o una tasca futurs.
