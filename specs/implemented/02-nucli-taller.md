# SPEC 02 — Nucli operatiu del taller: Vehicles, Peces, Albarans i Factures

> **Estat:** Implemented
> **Depèn de:** SPEC 01 (esquelet de l'app, components genèrics, base de dades, i18n, tema)
> **Data:** 2026-08-13
> **Objectiu:** Implementar Vehicles, Peces (amb estoc), Albarans (amb línies de peces i mà d'obra) i Factures (que agrupen albarans amb IVA i numeració correlativa), reutilitzant el patró CRUD i els components genèrics del SPEC 01.

---

## Per què existeix aquest spec

El SPEC 01 va deixar l'esquelet de l'app i Clients com a entitat pilot del patró CRUD. Aquest spec hi afegeix el nucli operatiu diari d'un taller: els vehicles dels clients, el catàleg de peces amb estoc, els albarans que registren la feina feta, i les factures que agrupen albarans.

Es manté com un sol spec (en lloc de dividir-lo més) perquè ja es va decidir a l'inici del projecte limitar-se a 3 specs en total: SPEC 01 (esquelet + Clients), SPEC 02 (aquest), SPEC 03 (Personal i Nòmines).

---

## Abast

**Dins:**

- Entitat **Peces**: catàleg amb nom, referència/SKU, preu de venda, cost de compra, unitat de mesura, proveïdor (text lliure) i quantitat en estoc. CRUD complet.
- Entitat **Vehicles**: marca, model, matrícula (única a tot el sistema), número de bastidor (VIN), any de matriculació, quilometratge, color, vinculat a un **Client**. CRUD complet.
- Entitat **Albarans**: vinculats a un Vehicle (i, a través seu, al Client). Contenen línies de dos tipus: **peça** (referència al catàleg, quantitat, preu; en afegir-se descompta l'estoc immediatament, i en esborrar-se el restaura) i **mà d'obra** (descripció lliure, hores, preu/hora manual). Numeració pròpia correlativa per any (`AAAA/A-NNNN`). Estat `pendent` / `facturat`: un cop inclòs en una factura, l'albarà queda bloquejat (no editable ni esborrable).
- Entitat **Factures**: agrupen un o més albarans en estat `pendent`. Numeració pròpia correlativa per any (`AAAA/F-NNNN`). Camps fiscals: NIF del client (heretat), dades fiscals del taller (configurades com a constants a nivell d'aplicació, sense pantalla de configuració), tipus d'IVA únic per factura (21% per defecte, editable), càlcul de base imposable + IVA + total a partir de les línies dels albarans inclosos. Estat de pagament: `pendent` / `pagada`, marcable manualment.
- Navegació encreuada des dels llistats i fitxes de detall: Client → els seus Vehicles i les seves Factures; Vehicle → el seu Client i els seus Albarans; Albarà → el seu Vehicle, el seu Client, i la Factura que l'inclou (si n'hi ha); Factura → els Albarans inclosos.
- Ampliació del `seed` amb Peces, Vehicles, Albarans i Factures d'exemple, coherents amb els Clients ja sembrats al SPEC 01.
- Traducció completa (català/castellà) de totes les pantalles noves, seguint el mateix sistema de claus del SPEC 01.

**Fora d'abast (per a specs futurs):**

- Entitats Personal i Nòmines → **SPEC 03**.
- Generació de PDF i impressió de factures i albarans. Decisió reafirmada en aquest spec.
- IVA per línia (tipus múltiples dins la mateixa factura).
- Preu/hora de mà d'obra configurable globalment; es introdueix manualment a cada línia.
- Pantalla de configuració de dades fiscals del taller (nom, NIF, adreça): es defineixen com a constants al codi en aquest spec.
- Historial de canvis de preu o de moviments d'estoc (entrades/sortides de magatzem més enllà del descompte per albarà).
- Edició o anul·lació d'una factura ja creada (només es pot marcar com a pagada/pendent). Anul·lar o rectificar factures queda fora d'abast.
- Recordatoris o alertes d'estoc mínim.
- Multi-moneda i multi-idioma per als imports (sempre EUR).

---

## Model de dades

```sql
-- server/db/migrations/002_vehicles_peces_albarans_factures.sql

CREATE TABLE peces (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  referencia     TEXT,
  preu           REAL NOT NULL DEFAULT 0,
  cost           REAL,
  unitat         TEXT NOT NULL DEFAULT 'unitat',
  proveidor      TEXT,
  estoc          INTEGER NOT NULL DEFAULT 0,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE vehicles (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id         INTEGER NOT NULL REFERENCES clients(id),
  marca             TEXT NOT NULL,
  model             TEXT NOT NULL,
  matricula         TEXT NOT NULL UNIQUE,
  bastidor          TEXT,
  any_matriculacio  INTEGER,
  quilometratge     INTEGER,
  color             TEXT,
  creat_el          TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE factures (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  numero          TEXT NOT NULL UNIQUE,
  client_id       INTEGER NOT NULL REFERENCES clients(id),
  iva_percentatge REAL NOT NULL DEFAULT 21,
  estat_pagament  TEXT NOT NULL DEFAULT 'pendent',
  creat_el        TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE albarans (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  numero         TEXT NOT NULL UNIQUE,
  vehicle_id     INTEGER NOT NULL REFERENCES vehicles(id),
  factura_id     INTEGER REFERENCES factures(id),
  estat          TEXT NOT NULL DEFAULT 'pendent',
  data           TEXT NOT NULL DEFAULT (datetime('now')),
  notes          TEXT,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE albara_linies (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  albara_id  INTEGER NOT NULL REFERENCES albarans(id),
  tipus      TEXT NOT NULL CHECK (tipus IN ('peca', 'ma_obra')),
  peca_id    INTEGER REFERENCES peces(id),
  descripcio TEXT,
  quantitat  REAL NOT NULL DEFAULT 1,
  preu       REAL NOT NULL DEFAULT 0
);
```

```ts
// client/src/types/*.ts (un fitxer per entitat, seguint el patró de client.ts)
interface Vehicle {
  id: number;
  clientId: number;
  marca: string;
  model: string;
  matricula: string;
  bastidor: string | null;
  anyMatriculacio: number | null;
  quilometratge: number | null;
  color: string | null;
  creatEl: string;
  actualitzatEl: string;
}

interface Peca {
  id: number;
  nom: string;
  referencia: string | null;
  preu: number;
  cost: number | null;
  unitat: string;
  proveidor: string | null;
  estoc: number;
  creatEl: string;
  actualitzatEl: string;
}

interface AlbaraLinia {
  id: number;
  albaraId: number;
  tipus: 'peca' | 'ma_obra';
  pecaId: number | null;
  descripcio: string | null;
  quantitat: number;
  preu: number;
}

interface Albara {
  id: number;
  numero: string;
  vehicleId: number;
  facturaId: number | null;
  estat: 'pendent' | 'facturat';
  data: string;
  notes: string | null;
  linies: AlbaraLinia[];
  creatEl: string;
  actualitzatEl: string;
}

interface Factura {
  id: number;
  numero: string;
  clientId: number;
  ivaPercentatge: number;
  estatPagament: 'pendent' | 'pagada';
  albarans: Albara[];
  creatEl: string;
  actualitzatEl: string;
}
```

**Convencions:**

- Segueix exactament les convencions del SPEC 01: `snake_case` a SQLite/API, `camelCase` a TypeScript (conversió automàtica via `services/api.ts`), `id INTEGER PRIMARY KEY AUTOINCREMENT`, `creat_el`/`actualitzat_el`.
- Numeració de negoci (`numero` a `albarans` i `factures`): format `AAAA/A-NNNN` i `AAAA/F-NNNN` respectivament, generada al servidor amb una transacció que llegeix l'últim número de l'any en curs.
- `albara_linies.peca_id` és `NOT NULL` quan `tipus = 'peca'` i `NULL` quan `tipus = 'ma_obra'` (validat a l'API, no a SQLite).
- `albarans.factura_id` és `NULL` mentre l'albarà està `pendent`; s'omple en incloure'l a una factura, moment en què l'albarà passa a `estat = 'facturat'` i l'API rebutja qualsevol `PUT`/`DELETE` posterior sobre ell.
- Migració numerada seqüencialment com a `002_...` seguint el mecanisme ja existent de `server/db/migrate.js`.

---

## Pla d'implementació

1. **Migració SQL.** Crear `server/db/migrations/002_vehicles_peces_albarans_factures.sql` amb les taules `peces`, `vehicles`, `factures`, `albarans` i `albara_linies`. Prova manual: arrencar el servidor aplica la migració i les 5 taules existeixen.

2. **API de Peces.** Crear `server/routes/peces.js` amb CRUD complet (`GET`/`POST`/`PUT`/`DELETE`), validant `nom` obligatori. Muntar-lo a `/api/peces`. Prova manual: `curl` sobre cada verb retorna la resposta esperada.

3. **Frontend de Peces.** Crear `client/src/types/peca.ts`, `services/peces.ts`, `pages/peces/PecesList.tsx`, `PecaDetail.tsx`, `PecaForm.tsx`, connectar rutes, marcar `implemented: true` a `nav.ts`, afegir claus `ca.json`/`es.json`. Prova manual: CRUD complet de Peces des del navegador, seguint el mateix patró que Clients.

4. **API de Vehicles.** Crear `server/routes/vehicles.js` amb CRUD, validant `matricula` única (retorna `409` si ja existeix) i `client_id` obligatori. Muntar-lo a `/api/vehicles`. Prova manual: `curl` CRUD + una segona matrícula igual retorna `409`.

5. **Frontend de Vehicles.** Mateix patró que Peces (`types/vehicle.ts`, `services/vehicles.ts`, llistat/detall/formulari), amb selector de Client al formulari. Afegir secció "Vehicles" a la fitxa de detall de Client (llistat enllaçat) i enllaç del Vehicle cap al seu Client. Prova manual: crear un vehicle des d'un Client i navegar Client → Vehicle → Client.

6. **API d'Albarans (capçalera).** Crear `server/routes/albarans.js` amb CRUD bàsic: `vehicle_id` obligatori, numeració automàtica `AAAA/A-NNNN` en crear, `estat` inicial `pendent`. Prova manual: crear un albarà per `curl` i comprovar el format del número generat.

7. **API de línies d'albarà.** Afegir `POST /api/albarans/:id/linies` i `DELETE /api/albarans/:id/linies/:lineaId`. Línies de tipus `peca` descompten/restauren l'estoc de la Peça dins una transacció; qualsevol operació sobre un albarà `facturat` retorna `409`. Prova manual: afegir una línia de peça descompta l'estoc; eliminar-la el restaura.

8. **Frontend d'Albarans (capçalera).** `types/albara.ts`, `services/albarans.ts`, llistat, fitxa de detall (amb Vehicle i Client enllaçats), formulari de creació (seleccionar Vehicle). Prova manual: crear un albarà des del navegador i veure'l al llistat.

9. **Frontend de línies d'albarà.** Dins la fitxa de detall de l'Albarà: formulari per afegir línia de Peça (seleccionable del catàleg + quantitat) o de mà d'obra (descripció + hores + preu/hora), i botó per eliminar-ne. Prova manual: afegir una peça des del navegador i comprovar que el seu estoc baixa a la fitxa de la Peça.

10. **API de Factures.** Crear `server/routes/factures.js`: `POST` rep una llista d'ids d'albarans `pendent` (tots del mateix client), els marca `facturat` i els vincula, genera numeració `AAAA/F-NNNN`, calcula base/IVA/total. `GET` llistat/detall. `PATCH` només per canviar `estat_pagament`. Prova manual: crear una factura per `curl` a partir de 2 albarans pendents i comprovar que queden bloquejats.

11. **Frontend de Factures.** `types/factura.ts`, `services/factures.ts`, llistat, fitxa de detall (albarans inclosos + totals), formulari de creació (Client → els seus albarans pendents marcables), commutador d'estat de pagament. Prova manual: crear una factura des del navegador seleccionant 2 albarans i veure el total calculat.

12. **Enllaços encreuats restants.** Des de Client → llistat de les seves Factures; des de Factura → cada Albarà inclòs (clicable); des d'Albarà → la Factura que l'inclou (si n'hi ha). Prova manual: navegar tot el cicle Client → Vehicle → Albarà → Factura i tornar sense cap enllaç trencat.

13. **Seed ampliat.** Ampliar `server/db/seed.js` amb peces, vehicles (vinculats als clients ja sembrats), albarans amb línies, i una factura d'exemple. Prova manual: `npm run seed` afegeix les dades noves sense duplicar-les si es torna a executar.

---

## Criteris d'acceptació

- [x] Arrencar el servidor amb la migració `002` pendent crea les taules `peces`, `vehicles`, `factures`, `albarans` i `albara_linies` sense errors.
- [x] `POST /api/peces` sense `nom` retorna `400`; amb dades vàlides retorna `201`.
- [x] `GET /api/peces/:id` amb un id inexistent retorna `404`.
- [x] El llistat de Peces permet cercar, ordenar per columna i es pagina igual que el de Clients.
- [x] Crear, editar i esborrar una Peça des del navegador funciona de punta a punta.
- [x] `POST /api/vehicles` amb una matrícula ja existent retorna `409` i no crea el vehicle.
- [x] Crear un Vehicle des de la fitxa d'un Client el vincula correctament; la fitxa del Client mostra els seus Vehicles i la del Vehicle enllaça de tornada al Client.
- [x] Crear un Albarà genera un número amb el format `AAAA/A-NNNN` i el deixa en estat `pendent`.
- [x] Afegir una línia de tipus peça a un Albarà descompta la quantitat corresponent de l'estoc de la Peça.
- [x] Eliminar aquesta línia restaura l'estoc de la Peça al valor anterior.
- [x] Afegir una línia de mà d'obra no toca cap estoc i accepta descripció, hores i preu/hora.
- [x] Intentar modificar o esborrar un Albarà amb `estat = facturat` retorna `409` tant per API com bloquejat a la interfície.
- [x] Crear una Factura a partir de 2 Albarans `pendent` del mateix client els marca `facturat`, els vincula, i genera un número amb el format `AAAA/F-NNNN`.
- [x] El total de la Factura (base + IVA) coincideix amb la suma de les línies dels Albarans inclosos al percentatge d'IVA indicat.
- [x] Canviar l'estat de pagament d'una Factura de `pendent` a `pagada` es reflecteix immediatament a la fitxa.
- [x] La fitxa d'un Client mostra les seves Factures; la fitxa d'una Factura mostra els Albarans inclosos (clicables); la fitxa d'un Albarà facturat enllaça a la seva Factura.
- [x] Al menú lateral, Vehicles, Peces, Albarans i Factures ja no mostren "mòdul pendent".
- [x] `npm run seed` afegeix Peces, Vehicles, Albarans i una Factura d'exemple; executar-lo dues vegades no duplica cap registre nou.
- [x] No queda cap text literal en castellà o català incrustat als components nous; tots passen per claus de traducció, i `ca.json`/`es.json` mantenen el mateix conjunt de claus.
- [x] Els components genèrics (`DataTable`, `EntityForm`, `ConfirmDialog`, `Toast`, `EmptyState`, `ErrorState`) segueixen sense cap referència específica a Vehicles, Peces, Albarans o Factures.

---

## Decisions

- **Sí:** línies d'albarà de dos tipus (peça i mà d'obra). Reflecteix com treballa un taller real; les peces venen del catàleg i descompten estoc, la mà d'obra és sempre text lliure amb preu manual.
- **No:** IVA per línia. Un sol tipus per factura cobreix la pràctica totalitat de casos i evita complicar el formulari i el càlcul.
- **Sí:** descompte d'estoc immediat en afegir la línia de peça (i restauració en eliminar-la). Més senzill d'implementar i d'entendre que descomptar només en facturar.
- **Sí:** estat `pendent`/`facturat` a l'Albarà, amb bloqueig un cop facturat. Preserva la integritat d'una factura ja emesa: si es pogués editar l'albarà després, el total de la factura deixaria de quadrar.
- **Sí:** numeració automàtica correlativa per any per a Albarans (`AAAA/A-NNNN`) i Factures (`AAAA/F-NNNN`). Estàndard en un taller real i evita duplicats o buits manuals.
- **Sí:** preu/hora de mà d'obra manual a cada línia, sense pantalla de configuració global. Menys abast per a aquest spec; es pot afegir més endavant si cal.
- **Sí:** estat de pagament (`pendent`/`pagada`) a la Factura, marcable manualment. Aporta valor immediat (saber qui deu diners) sense muntar comptabilitat completa.
- **Sí:** matrícula única a tot el sistema. Evita duplicats accidentals; un canvi de propietari s'edita al vehicle existent.
- **Sí:** dades fiscals del taller (nom, NIF, adreça) com a constants al codi, no editables des de l'app. No es va demanar una pantalla de configuració i n'hi ha prou per ara.
- **No:** generació de PDF i impressió. Reafirmat com a fora d'abast (decisió original del SPEC 01).
- **Sí:** `albarans.factura_id` com a clau forana directa (relació 1:N) en lloc d'una taula d'unió N:M. Un albarà només pot pertànyer a una factura com a molt, així que la relació és sempre d'un a molts.
- **No:** historial de moviments d'estoc més enllà del descompte per línia d'albarà. Suficient per a aquest spec; un mòdul d'inventari complet seria un spec futur.

---

## Riscos identificats

| Risc | Mitigació |
| --- | --- |
| Esborrar una Peça que ja s'ha fet servir en línies d'Albarans existents trencaria l'historial | L'API de `DELETE /api/peces/:id` retorna `409` si la Peça té alguna línia d'Albarà associada. |
| Esborrar un Vehicle amb Albarans vinculats deixaria Albarans orfes | L'API de `DELETE /api/vehicles/:id` retorna `409` si el Vehicle té algun Albarà associat. |
| Esborrar un Client amb Vehicles o Factures vinculats (el SPEC 01 no ho impedia perquè encara no hi havia cap entitat que en depengués) | L'API de `DELETE /api/clients/:id` s'amplia en aquest spec per retornar `409` si el Client té Vehicles o Factures associats. |
| Dos Albarans o Factures creats gairebé alhora podrien rebre el mateix número correlatiu | La generació del número es fa dins la mateixa transacció SQLite que insereix el registre; `better-sqlite3` és síncron i d'un sol fil, així que no hi ha condició de carrera real. |

---

## Què **no** hi ha en aquest spec

- Personal i Nòmines → SPEC 03.
- Generació de PDF i impressió de factures i albarans.
- IVA per línia (múltiples tipus dins la mateixa factura).
- Preu/hora de mà d'obra configurable globalment.
- Pantalla de configuració de dades fiscals del taller.
- Historial de moviments d'estoc més enllà del descompte per albarà.
- Edició o anul·lació d'una factura ja creada (només es pot canviar l'estat de pagament).
- Alertes d'estoc mínim.

Cadascun d'aquests punts, si arriba, va en un spec propi.
