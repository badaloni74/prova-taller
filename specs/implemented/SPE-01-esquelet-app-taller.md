# SPEC 01 — Esquelet de l'app de taller: navegació, idioma i tema

> **Estat:** Implemented
> **Origen:** USER
> **Depèn de:** cap (spec inicial del projecte)
> **Data:** 2026-08-12
> **Objectiu:** Muntar l'aplicació local Node+Express+React+SQLite amb navegació lateral, canvi d'idioma català/castellà, tema fosc/clar i el mòdul de Clients complet com a patró CRUD de referència.

---

## Per què existeix aquest spec

L'aplicació de manteniment del taller cobreix vuit entitats (clients, vehicles, peces, albarans, factures, personal, nòmines i configuració) que repeteixen sempre el mateix patró: llistat, fitxa de detall i CRUD, amb enllaços entre entitats relacionades.

Aquest spec no implementa aquestes vuit entitats. Munta l'esquelet on encaixaran i deixa **una** d'elles implementada de punta a punta com a referència executable del patró.

El treball es reparteix en tres specs:

- **SPEC 01** (aquest): esquelet, idioma, tema i Clients com a entitat pilot.
- **SPEC 02**: Vehicles, Peces, Albarans i Factures.
- **SPEC 03**: Personal i Nòmines.

---

## Abast

**Dins:**

- Estructura del projecte en un sol repositori: `server/` (Node + Express), `client/` (React + TypeScript + Vite), `data/` (fitxer SQLite).
- Arrencada amb una comanda única: `npm run dev` per a desenvolupament, `npm start` per a ús real (Express serveix el React ja compilat des d'un sol port).
- Connexió a SQLite amb un mecanisme d'esquema versionat (`server/db/migrations/`) que crea les taules si no existeixen.
- Layout general: barra lateral de navegació amb totes les seccions del taller, capçalera amb selector d'idioma i selector de tema, i àrea de contingut.
- Pàgines marcador de posició per a les seccions que implementaran els specs 02 i 03 (Vehicles, Peces, Albarans, Factures, Personal, Nòmines): apareixen al menú i mostren un avís "mòdul pendent".
- Internacionalització català/castellà amb `react-i18next`. Castellà per defecte. La tria es desa a `localStorage` amb la clau `taller:lang:v1`.
- Tema fosc/clar amb Tailwind (classe `dark`). Per defecte segueix la preferència del sistema operatiu. La tria es desa a `localStorage` amb la clau `taller:theme:v1`.
- Components genèrics reutilitzables que els specs 02 i 03 faran servir tal qual: `DataTable` (llistat amb cerca, ordenació i paginació), `EntityForm`, `ConfirmDialog`, `Toast`, `EmptyState`, `ErrorState`.
- Mòdul **Clients** complet com a entitat pilot: taula SQLite, API REST (`GET`/`POST`/`PUT`/`DELETE`), llistat, fitxa de detall, creació, edició i esborrat amb confirmació.
- Comanda `npm run seed` que carrega clients d'exemple coherents (noms, NIF, adreces i telèfons inventats però versemblants).
- Estats visuals de càrrega, buit i error a totes les vistes de Clients.

**Fora d'abast (per a specs futurs):**

- Entitats Vehicles, Peces, Albarans i Factures → **SPEC 02**.
- Entitats Personal i Nòmines → **SPEC 03**.
- Autenticació, usuaris i rols. Decidit: l'app és local i sense login.
- Generació de PDF de factures i albarans, i impressió.
- Exportació/importació de dades (CSV, Excel) i còpies de seguretat automàtiques.
- Quadre de comandament amb gràfiques i indicadors.
- Suite de tests automatitzats. La verificació d'aquest spec és manual, segons els criteris d'acceptació.
- Disseny per a mòbil i tauleta, i qualsevol adaptació responsive. L'app es dissenya exclusivament per a navegador d'escriptori a partir de 1280 px d'amplada. No s'hi accedirà mai des de mòbil.
- Desplegament fora de la màquina local, sincronització al núvol i accés multiusuari simultani.

---

## Model de dades

```sql
-- server/db/migrations/001_init.sql

CREATE TABLE clients (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  nif            TEXT,
  telefon        TEXT,
  email          TEXT,
  adreca         TEXT,
  notes          TEXT,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);
```

```ts
// client/src/types/client.ts
interface Client {
  id: number;
  nom: string;
  nif: string | null;
  telefon: string | null;
  email: string | null;
  adreca: string | null;
  notes: string | null;
  creatEl: string;
  actualitzatEl: string;
}
```

```json
// client/src/locales/ca.json i client/src/locales/es.json
{
  "nav.clients": "Clients",
  "nav.vehicles": "Vehicles",
  "common.save": "Desa",
  "common.cancel": "Cancel·la"
}
```

**Convencions:**

- Totes les taules SQLite fan servir `id INTEGER PRIMARY KEY AUTOINCREMENT`, camps en `snake_case`, i `creat_el` / `actualitzat_el` amb marca de temps ISO.
- El client REST tradueix `snake_case` (BD i API) a `camelCase` (TypeScript) a la capa de servei del frontend.
- Claus de `localStorage`: `taller:lang:v1` (`"ca"` | `"es"`) i `taller:theme:v1` (`"light"` | `"dark"`).
- Claus de traducció en anglès pla amb punts (`secció.element`), mai el text final incrustat al codi.
- Migracions numerades seqüencialment (`001_init.sql`, `002_...`) i aplicades automàticament en arrencar si encara no s'han executat, amb control a la taula `_migrations`.

---

## Pla d'implementació

1. **Esquelet del projecte.** Crear `package.json` a l'arrel amb `concurrently`, i els subprojectes `server/` (Express + `nodemon`) i `client/` (Vite + React + TypeScript). Prova manual: `npm run dev` aixeca Express a `:3001` i Vite a `:5173`; `http://localhost:5173` mostra la pàgina per defecte de Vite.

2. **Tailwind i estils base.** Instal·lar Tailwind a `client/`, configurar `darkMode: 'class'` a `client/tailwind.config.js` i definir la paleta i tipografia base a `client/src/index.css`. Prova manual: una classe Tailwind qualsevol s'aplica a la pàgina.

3. **Enrutador i layout.** Instal·lar `react-router-dom`. Crear `client/src/components/Layout.tsx` amb barra lateral i capçalera, i `client/src/pages/Placeholder.tsx`. Registrar les rutes de tots els mòduls a `client/src/App.tsx`. Prova manual: clicar cada element del menú canvia l'URL i mostra l'avís "mòdul pendent".

4. **Internacionalització.** Instal·lar `react-i18next`. Crear `client/src/i18n/index.ts`, `client/src/locales/es.json` i `client/src/locales/ca.json` amb les claus del layout. Crear `client/src/components/LanguageSwitcher.tsx` i muntar-lo a la capçalera. Substituir els textos literals del layout per claus. Prova manual: canviar l'idioma tradueix el menú a l'instant i recarregar la pàgina manté la tria.

5. **Tema fosc/clar.** Crear `client/src/hooks/useTheme.ts` (llegeix `taller:theme:v1`, cau a `prefers-color-scheme`, aplica la classe `dark` a `<html>`) i `client/src/components/ThemeToggle.tsx` a la capçalera. Prova manual: el commutador canvia el tema i la tria sobreviu a una recàrrega.

6. **Base de dades.** Instal·lar `better-sqlite3`. Crear `server/db/index.js` (connexió a `data/taller.db`), `server/db/migrate.js` (taula `_migrations` i aplicació seqüencial) i `server/db/migrations/001_init.sql` amb la taula `clients`. Prova manual: arrencar el servidor crea `data/taller.db` amb la taula `clients`.

7. **API de Clients.** Crear `server/routes/clients.js` amb `GET /api/clients`, `GET /api/clients/:id`, `POST`, `PUT /:id` i `DELETE /:id`, amb validació de `nom` obligatori i codis d'error `400` i `404`. Muntar-lo a `server/index.js`. Prova manual: `curl` sobre cada verb retorna la resposta esperada.

8. **Capa d'accés a l'API al frontend.** Crear `client/src/services/api.ts` (embolcall de `fetch` amb gestió d'errors i conversió `snake_case` ↔ `camelCase`) i `client/src/services/clients.ts`. Prova manual: cridar el servei des de la consola del navegador retorna la llista de clients.

9. **Taula genèrica.** Crear `client/src/components/DataTable.tsx` amb columnes configurables i files clicables. Prova manual: renderitzada amb dades fixes, mostra les columnes i el clic dispara l'acció.

10. **Cerca, ordenació i paginació.** Ampliar `DataTable.tsx` amb camp de cerca, ordenació per columna i paginació. Prova manual: les tres funcions operen sobre les dades fixes.

11. **Estats de càrrega, buit i error.** Crear `client/src/components/EmptyState.tsx`, `client/src/components/ErrorState.tsx` i `client/src/components/Spinner.tsx`. Prova manual: es rendereixen correctament en tots dos temes.

12. **Llistat de Clients.** Crear `client/src/pages/clients/ClientsList.tsx` que consumeix el servei i pinta la `DataTable` amb els tres estats. Prova manual: amb la BD buida mostra `EmptyState`; amb el servidor aturat mostra `ErrorState`.

13. **Fitxa de detall.** Crear `client/src/pages/clients/ClientDetail.tsx` a la ruta `/clients/:id`, amb totes les dades del client i botons d'editar i esborrar. Prova manual: clicar una fila del llistat obre la fitxa corresponent.

14. **Formulari de creació i edició.** Crear `client/src/components/EntityForm.tsx` (camps configurables i validació) i `client/src/pages/clients/ClientForm.tsx` per a `/clients/nou` i `/clients/:id/editar`. Prova manual: crear un client l'afegeix al llistat; editar-lo en desa els canvis.

15. **Esborrat amb confirmació i avisos.** Crear `client/src/components/ConfirmDialog.tsx` i `client/src/components/Toast.tsx`, i connectar-los a l'esborrat i al desat. Prova manual: esborrar demana confirmació i mostra un avís d'èxit.

16. **Dades d'exemple.** Crear `server/db/seed.js` amb clients inventats coherents i la comanda `npm run seed`. Prova manual: executar-la omple el llistat de clients.

17. **Compilació per a ús real.** Afegir `npm run build` (compila `client/`) i `npm start` (Express serveix `client/dist` i l'API des del port `3001`). Prova manual: `npm start` i `http://localhost:3001` mostra l'app sencera funcionant.

---

## Criteris d'acceptació

- [x] `npm run dev` arrenca backend i frontend amb una sola comanda i `http://localhost:5173` carrega l'app sense errors a la consola del navegador.
- [x] `npm start` serveix l'app compilada i l'API des de `http://localhost:3001`.
- [x] La barra lateral mostra les vuit seccions: Clients, Vehicles, Peces, Albarans, Factures, Personal, Nòmines i Configuració.
- [x] Les set seccions no implementades mostren l'avís "mòdul pendent" i no provoquen cap error.
- [x] En obrir l'app per primer cop, la interfície està en castellà.
- [x] El selector d'idioma canvia entre català i castellà i tots els textos visibles es tradueixen sense recarregar la pàgina.
- [x] Després de canviar l'idioma i recarregar la pàgina, l'idioma escollit es manté.
- [x] No queda cap text literal en castellà o català incrustat als components; tots passen per claus de traducció.
- [x] Els fitxers `ca.json` i `es.json` tenen exactament el mateix conjunt de claus.
- [x] En obrir l'app per primer cop en un sistema configurat en fosc, l'app arrenca en tema fosc.
- [x] El commutador de tema canvia entre clar i fosc i la tria es manté després de recarregar.
- [x] Cap text queda il·legible per contrast en cap dels dos temes a les pàgines de Clients.
- [x] Arrencar el servidor amb `data/taller.db` inexistent crea el fitxer i la taula `clients` sense errors.
- [x] Arrencar el servidor dues vegades seguides no torna a aplicar les migracions ja executades.
- [x] `GET /api/clients` retorna `200` amb un array JSON.
- [x] `POST /api/clients` sense el camp `nom` retorna `400`.
- [x] `GET /api/clients/9999` amb un id inexistent retorna `404`.
- [x] `npm run seed` omple la taula `clients` amb almenys 10 clients d'exemple.
- [x] Executar `npm run seed` dues vegades no duplica els clients d'exemple.
- [x] El llistat de Clients mostra els clients de la base de dades en una taula.
- [x] El camp de cerca del llistat filtra els clients per nom.
- [x] Clicar la capçalera d'una columna ordena el llistat per aquella columna.
- [x] Amb més de 20 clients, el llistat es pagina i els controls de pàgina funcionen.
- [x] Amb la taula `clients` buida, el llistat mostra l'estat buit amb un botó per crear el primer client.
- [x] Amb el servidor aturat, el llistat mostra l'estat d'error i no una pantalla en blanc.
- [x] Clicar una fila del llistat obre la fitxa de detall d'aquell client.
- [x] Crear un client des del formulari l'afegeix al llistat sense recarregar la pàgina.
- [x] Desar el formulari amb el camp `nom` buit mostra un error de validació i no envia la petició.
- [x] Editar un client i desar-lo actualitza les dades a la fitxa de detall.
- [x] Esborrar un client demana confirmació en un diàleg abans d'executar l'acció.
- [x] Cancel·lar el diàleg de confirmació no esborra el client.
- [x] Confirmar l'esborrat elimina el client del llistat i mostra un avís d'èxit.
- [x] Els components `DataTable`, `EntityForm`, `ConfirmDialog`, `Toast`, `EmptyState` i `ErrorState` no contenen cap referència específica a Clients.

---

## Decisions

- **Sí:** Node + Express al backend. Un sol llenguatge a tot el projecte i cap dependència externa a instal·lar més enllà de Node.
- **No:** Python + FastAPI ni .NET. Cap avantatge que compensi tenir dos ecosistemes en una app local.
- **Sí:** React + TypeScript. L'app repeteix el mateix patró llistat/detall/formulari en vuit entitats; els components genèrics tipats eviten reescriure'l vuit vegades.
- **No:** HTML/CSS/JS pur. Sense build step, però obligaria a repetir manualment tot el patró CRUD a cada entitat.
- **Sí:** SQLite en fitxer local (`data/taller.db`) amb `better-sqlite3`. Relacions reals entre client, vehicle, albarà i factura amb integritat referencial, i cap servidor de base de dades a instal·lar.
- **No:** fitxers JSON al disc. Les relacions entre sis entitats es tornarien fràgils de mantenir a mà.
- **No:** PostgreSQL o MySQL. Instal·lació i manteniment injustificats per a un ús local d'un sol taller.
- **Sí:** migracions numerades amb taula de control `_migrations`. Els specs 02 i 03 afegiran taules sense tocar les existents ni perdre dades.
- **Sí:** Tailwind amb `darkMode: 'class'`. El tema fosc surt gairebé de franc i el commutador és un canvi de classe a `<html>`.
- **No:** MUI o shadcn/ui. Components ja fets, però menys control sobre l'aspecte i més dependències per a un guany petit en aquesta app.
- **Sí:** `react-i18next`. Estàndard consolidat, canvi d'idioma sense recarregar i fitxers JSON de traducció fàcils de revisar.
- **Sí:** castellà per defecte i tema segons la preferència del sistema. Respon a la petició original i evita imposar un tema.
- **Sí:** preferències a `localStorage` amb claus versionades (`taller:lang:v1`, `taller:theme:v1`). Són preferències de qui mira la pantalla, no dades del negoci.
- **No:** preferències a SQLite. Obligaria a una petició al servidor abans de pintar res i provocaria un parpelleig de tema.
- **Sí:** Clients com a entitat pilot en aquest spec. Fa que el patró CRUD quedi provat i executable, no només descrit.
- **Sí:** el seed s'amplia a cada spec amb les seves entitats. Les dades d'exemple queden coherents entre mòduls: els mateixos clients tindran vehicles al SPEC 02.
- **No:** seed automàtic en arrencar amb la base de dades buida. Barrejaria dades inventades amb les reals el dia que el taller comenci a fer-la servir.
- **No:** autenticació. App local d'un sol lloc de treball; el login afegiria fricció diària sense protegir res que el sistema de fitxers no protegeixi ja.
- **No:** tests automatitzats en aquest spec. Muntar Vitest i Playwright mereix un spec propi que ho faci una sola vegada per a tota l'app.
- **No:** disseny responsive. L'app s'executarà sempre des d'un navegador d'escriptori al taller i mai des d'un mòbil; adaptar vuit llistats a pantalla petita seria feina sense ús. Els components es dissenyen per a 1280 px o més.
- **Sí:** dividir el treball en tres specs. Vuit entitats i tres dominis en un sol spec farien la implementació difícil de revisar i de tornar enrere.

---

## Riscos identificats

| Risc | Mitigació |
| --- | --- |
| `better-sqlite3` és un mòdul natiu i pot fallar en compilar a Windows si falten les eines de build | Documentar-ho al `README.md`. Si falla, alternativa `node:sqlite` (Node 22+) o `sql.js`, decidida durant la implementació i registrada al spec. |
| Els ports `3001` o `5173` poden estar ocupats per una altra aplicació | Ports configurables per variable d'entorn a `.env`, amb els valors actuals com a defecte. |
| Parpelleig de tema clar en carregar abans que React apliqui la classe `dark` | Script curt inline a `client/index.html` que llegeix `taller:theme:v1` i posa la classe a `<html>` abans de pintar res. |
| Les claus de traducció es desincronitzen entre `ca.json` i `es.json` a mesura que creix l'app | Criteri d'acceptació explícit de paritat de claus, i `react-i18next` configurat perquè avisi per consola de les claus que falten. |
| El fitxer `data/taller.db` conté les dades reals del taller i es pot perdre o pujar per error a un repositori | `data/` a `.gitignore`. Les còpies de seguretat queden fora d'abast i s'anoten com a spec futur. |
| La conversió `snake_case` ↔ `camelCase` es fa a mà a cada servei i acaba divergint | Es fa un sol cop a l'embolcall de `client/src/services/api.ts`; cap servei d'entitat la repeteix. |

---

## Què **no** hi ha en aquest spec

- Vehicles, Peces, Albarans i Factures → SPEC 02.
- Personal i Nòmines → SPEC 03.
- Autenticació, usuaris i rols.
- Generació de PDF i impressió de factures i albarans.
- Exportació, importació i còpies de seguretat.
- Quadre de comandament amb gràfiques.
- Tests automatitzats.
- Disseny responsive, per a mòbil o per a tauleta.
- Accés remot, núvol i multiusuari.

Cadascun d'aquests punts, si arriba, va en un spec propi.
