# SPEC 03 — Personal i Nòmines del taller

> **Estat:** Implemented
> **Depèn de:** SPEC 01 (esquelet de l'app, components genèrics, base de dades, i18n, tema)
> **Data:** 2026-08-13
> **Objectiu:** Implementar les entitats Personal i Nòmines del taller, amb el mateix patró CRUD i components genèrics dels SPECs 01/02.

---

## Per què existeix aquest spec

Els SPECs 01 i 02 van cobrir el flux operatiu del taller (Clients, Vehicles, Peces, Albarans, Factures). Aquest tercer i últim spec hi afegeix la gestió interna de personal: els empleats del taller i les seves nòmines mensuals, com a àmbit totalment independent de la resta.

Depèn només del SPEC 01 (esquelet, components genèrics, base de dades, i18n, tema), no del SPEC 02: Personal i Nòmines no tenen cap vincle amb Clients, Vehicles, Albarans ni Factures.

---

## Abast

**Dins:**

- Entitat **Personal**: nom, telèfon, email, DNI/NIE, càrrec/ofici, data d'alta, salari brut mensual (base). CRUD complet.
- Entitat **Nòmines**: vinculades a un empleat de Personal. Camps: mes (1-12), any, salari brut, deduccions, salari net (calculat automàticament: brut − deduccions, només de lectura), estat de pagament (`pendent` / `pagada`, marcable manualment). Única per empleat + mes + any (no es poden duplicar). CRUD complet, sense edició del salari net directament.
- Navegació encreuada: fitxa de detall de Personal mostra la llista de les seves Nòmines (enllaçades); fitxa de detall de Nòmina enllaça de tornada al seu empleat.
- Ampliació del `seed` amb Personal i Nòmines d'exemple.
- Traducció completa (català/castellà) de totes les pantalles noves, seguint el mateix sistema de claus dels SPECs 01/02.

**Fora d'abast (per a specs futurs):**

- Qualsevol vincle entre Personal/Nòmines i Clients, Vehicles, Albarans o Factures (per exemple, "mecànic assignat" a un Albarà). Decisió reafirmada en aquest spec.
- Data de baixa o estat actiu/inactiu de Personal. Només es registra la data d'alta.
- Càlcul fiscal real (IRPF, Seguretat Social desglossada, cotitzacions). Les "deduccions" són un import únic introduït a mà, sense desglossar.
- Pagues extres o conceptes salarials addicionals (plusos, hores extres) com a camps separats.
- Generació de PDF o impressió de nòmines.
- Historial de canvis de salari base de Personal (només es guarda el valor actual).
- Multi-moneda (sempre EUR).

---

## Model de dades

```sql
-- server/db/migrations/003_personal_i_nomines.sql

CREATE TABLE personal (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  telefon        TEXT,
  email          TEXT,
  dni            TEXT,
  carrec         TEXT,
  data_alta      TEXT,
  salari_base    REAL,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE nomines (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  personal_id    INTEGER NOT NULL REFERENCES personal(id),
  mes            INTEGER NOT NULL,
  any_nomina     INTEGER NOT NULL,
  salari_brut    REAL NOT NULL DEFAULT 0,
  deduccions     REAL NOT NULL DEFAULT 0,
  estat_pagament TEXT NOT NULL DEFAULT 'pendent',
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (personal_id, mes, any_nomina)
);
```

```ts
// client/src/types/personal.ts
interface Personal {
  id: number;
  nom: string;
  telefon: string | null;
  email: string | null;
  dni: string | null;
  carrec: string | null;
  dataAlta: string | null;
  salariBase: number | null;
  creatEl: string;
  actualitzatEl: string;
}

// client/src/types/nomina.ts
interface Nomina {
  id: number;
  personalId: number;
  mes: number;
  anyNomina: number;
  salariBrut: number;
  deduccions: number;
  salariNet: number; // calculat: salariBrut - deduccions, no s'emmagatzema
  estatPagament: 'pendent' | 'pagada';
  creatEl: string;
  actualitzatEl: string;
}
```

**Convencions:**

- Segueix exactament les convencions dels SPECs 01/02: `snake_case` a SQLite/API, `camelCase` a TypeScript (conversió automàtica via `services/api.ts`), `id INTEGER PRIMARY KEY AUTOINCREMENT`, `creat_el`/`actualitzat_el`.
- `salariNet` es calcula a l'API (com `base`/`iva_import`/`total` a Factures) i no s'emmagatzema a la taula.
- `UNIQUE (personal_id, mes, any_nomina)` impedeix més d'una nòmina pel mateix empleat i mes; l'API retorna `409` si es viola.
- Migració numerada `003_...`, seguint el mecanisme existent de `server/db/migrate.js`.

---

## Pla d'implementació

1. **Migració SQL.** Crear `server/db/migrations/003_personal_i_nomines.sql` amb les taules `personal` i `nomines`. Prova manual: arrencar el servidor aplica la migració i les 2 taules existeixen.

2. **API de Personal.** Crear `server/routes/personal.js` amb CRUD complet (`GET`/`POST`/`PUT`/`DELETE`), validant `nom` obligatori. `DELETE` retorna `409` si l'empleat té nòmines associades. Muntar-lo a `/api/personal`. Prova manual: `curl` sobre cada verb retorna la resposta esperada, incloent el bloqueig d'esborrat.

3. **Frontend de Personal.** Crear `client/src/types/personal.ts`, `services/personal.ts`, `pages/personal/PersonalList.tsx`, `PersonalDetail.tsx`, `PersonalForm.tsx`, connectar rutes, marcar `implemented: true` a `nav.ts`, afegir claus `ca.json`/`es.json`. Prova manual: CRUD complet de Personal des del navegador, seguint el mateix patró que Clients/Peces.

4. **API de Nòmines.** Crear `server/routes/nomines.js` amb CRUD: `personal_id`, `mes` i `any_nomina` obligatoris, retorna `409` si ja existeix una nòmina per aquell empleat+mes+any, calcula `salariNet` a la resposta. Muntar-lo a `/api/nomines`. Prova manual: `curl` CRUD + una segona nòmina pel mateix empleat/mes/any retorna `409`.

5. **Frontend de Nòmines.** `types/nomina.ts`, `services/nomines.ts`, llistat, fitxa de detall (amb Personal enllaçat i salari net calculat), formulari de creació (seleccionar empleat, mes, any, brut, deduccions), commutador d'estat de pagament. Afegir secció "Nòmines" a la fitxa de Personal (enllaçada). Prova manual: crear una nòmina des del navegador, veure el net calculat, i navegar Personal → Nòmina → Personal.

6. **Seed ampliat.** Ampliar `server/db/seed.js` amb Personal i Nòmines d'exemple. Prova manual: `npm run seed` afegeix les dades noves sense duplicar-les si es torna a executar.

---

## Criteris d'acceptació

- [x] Arrencar el servidor amb la migració `003` pendent crea les taules `personal` i `nomines` sense errors.
- [x] `POST /api/personal` sense `nom` retorna `400`; amb dades vàlides retorna `201`.
- [x] `GET /api/personal/:id` amb un id inexistent retorna `404`.
- [x] Esborrar un empleat de Personal que té nòmines associades retorna `409` i no l'esborra.
- [x] Crear, editar i esborrar un empleat des del navegador funciona de punta a punta.
- [x] `POST /api/nomines` sense `personal_id`, `mes` o `any_nomina` retorna `400`.
- [x] `POST /api/nomines` amb un `personal_id` inexistent retorna `400`.
- [x] Crear una segona nòmina pel mateix empleat, mes i any retorna `409` i no la crea.
- [x] El `salariNet` retornat per l'API coincideix amb `salariBrut - deduccions`.
- [x] Canviar l'estat de pagament d'una Nòmina de `pendent` a `pagada` es reflecteix immediatament a la fitxa.
- [x] La fitxa de Personal mostra les seves Nòmines (enllaçades); la fitxa d'una Nòmina enllaça de tornada al seu empleat.
- [x] Al menú lateral, Personal i Nòmines ja no mostren "mòdul pendent".
- [x] `npm run seed` afegeix Personal i Nòmines d'exemple; executar-lo dues vegades no duplica cap registre nou.
- [x] No queda cap text literal en castellà o català incrustat als components nous; tots passen per claus de traducció, i `ca.json`/`es.json` mantenen el mateix conjunt de claus.
- [x] Els components genèrics (`DataTable`, `EntityForm`, `ConfirmDialog`, `Toast`, `EmptyState`, `ErrorState`) segueixen sense cap referència específica a Personal o Nòmines.

---

## Decisions

- **Sí:** una Nòmina és un registre mensual complet per empleat (brut/deduccions/net/estat), no un simple historial de pagaments. Aporta més valor real per fer seguiment de nòmines mes a mes.
- **Sí:** salari net calculat automàticament (`brut - deduccions`), no editable directament. Evita inconsistències entre els tres imports.
- **Sí:** període com a mes + any (selectors), amb restricció d'unicitat per empleat. Reflecteix com funcionen les nòmines reals i evita duplicats accidentals.
- **No:** vincle entre Personal/Nòmines i la resta del taller (Clients/Vehicles/Albarans/Factures). Mantenen els dos mons completament separats, tal com es va confirmar; cap camp "mecànic assignat" en aquest spec.
- **No:** data de baixa o estat actiu/inactiu de Personal. Només data d'alta, per mantenir l'abast reduït.
- **No:** càlcul fiscal real (IRPF, Seguretat Social desglossada) ni pagues extres com a concepte separat. Les deduccions són un import únic introduït a mà.
- **No:** generació de PDF ni impressió de nòmines. Coherent amb la mateixa decisió presa per a Factures i Albarans al SPEC 02.
- **Sí:** bloqueig d'esborrat d'un empleat amb nòmines associades (`409`), seguint el mateix patró ja establert per a Clients/Vehicles/Peces.

---

## Riscos identificats

| Risc | Mitigació |
| --- | --- |
| Esborrar un empleat de Personal que té nòmines associades trencaria l'historial | L'API de `DELETE /api/personal/:id` retorna `409` si l'empleat té alguna nòmina associada. |
| Editar el mes o l'any d'una nòmina existent podria xocar amb la restricció d'unicitat empleat+mes+any | La validació de `PUT /api/nomines/:id` comprova la unicitat excloent el propi registre, igual que la matrícula a Vehicles. |

---

## Què **no** hi ha en aquest spec

- Vincle amb Clients, Vehicles, Albarans o Factures (per exemple, mecànic assignat a un Albarà).
- Data de baixa o estat actiu/inactiu de Personal.
- Càlcul fiscal real (IRPF, Seguretat Social desglossada) i pagues extres com a concepte separat.
- Generació de PDF o impressió de nòmines.
- Historial de canvis de salari base.
- Multi-moneda.

Cadascun d'aquests punts, si arriba, va en un spec futur.
