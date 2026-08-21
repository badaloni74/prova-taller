---
doc_id: DOC-23
doc_name: DOC-23-INFORME
version: 2.0.0
status: draft
generator: S-10 skill-auto-tcs (execució + diagnòstic, sessió Claude Code)
generator_version: "2.0"
generated_at: 2026-08-21T16:30:00+02:00
project: app-taller
language: ca
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  working_tree_clean: false
entorn:
  aplicacio: build de producció servit en estàtic (vite preview) a http://localhost:5173
  api: http://localhost:3001 (Express + SQLite, npm run seed abans de cada execució)
  java: "21 (Temurin/OpenJDK 21.0.9)"
  selenium: "4.24.0"
  cucumber: "7.18.1"
  testng: "7.10.2"
  chrome: "151.0.7922.170 headless"
destinatari: >
  Aquest document està pensat per entregar-se a un agent o persona amb el rol
  "Doctor QA TC": el seu treball és corregir els casos que apareixen com a
  FALLAT a la secció 3, i decidir què fer amb els casos exclosos de la
  secció 5. No conté cap acció ja resolta — les que ja es van corregir
  durant aquesta mateixa sessió (vegeu §6) es reporten com a evidència, no
  com a feina pendent.
---

# DOC-23 · Informe d'execució de la suite d'automatització (S-10)

**Versió anterior:** aquest document reemplaça `automation/ui/DOC-23-INFORME.md`
(v1.0.0, 2026-08-16), que documentava una prova acotada de 5 escenaris sobre
1 sol mòdul. Aquesta versió cobreix la suite completa: 102 dels 110 casos de
`DOC-05-PLAN-PRUEBAS.md`, en 7 mòduls. Es reubica a `docs/` perquè és
documentació de projecte, no codi — l'antic fitxer es retira.

## 1. Resum executiu

```
107 escenaris (106 verds, 1 vermell)
0 errors de connexió / infraestructura en l'execució final
```

- **102 de 110 TC de DOC-05 automatitzats.** Els 8 restants no tenen vector
  per interfície — motiu detallat i verificat per a cadascun a §5. No són
  "pendents", són **exclosos amb causa documentada**.
- **1 sol cas en vermell: TC-048.** Root cause identificat, no és un defecte
  de l'aplicació. Detall complet a §4.
- **Zero flakiness a l'execució final.** Es va arribar aquí després de
  diagnosticar i corregir sis classes d'error real durant la mateixa sessió
  (§6) — es documenten perquè són el motiu pel qual la suite és fiable ara,
  i perquè el skill `s10-auto-tcs` ja s'ha actualitzat amb aquestes lliçons
  per a properes execucions.

## 2. Com reproduir aquesta execució

```bash
# 1. Base de dades neta
rm -f data/taller.db && npm run seed

# 2. Build de producció servit en estàtic (no el servidor de dev: veure §6.6)
cd client && npm run build && npx vite preview --port 5173
# cal afegir temporalment `preview: { proxy: { '/api': 'http://localhost:3001' } }`
# a vite.config.ts si el projecte no el té ja

# 3. API
cd server && npm run dev

# 4. Fixture dedicat per als escenaris de factures (client "Autoescola Vilanova", id 7)
curl -X POST http://localhost:3001/api/vehicles -H "Content-Type: application/json" \
  -d '{"client_id":7,"marca":"Test","model":"Facturacio","matricula":"8001TST"}'

# 5. Suite
cd automation/ui && mvn test -Dapp.url=http://localhost:5173
```

## 3. Resultats per mòdul

Un resum d'una línia per cas verd; el detall del cas vermell és a §4, no aquí.

### Clientes (11 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-001 | Listar clientes y buscar por nombre | VERD |
| TC-002 | Ordenar por columna y paginar el listado de clientes | VERD |
| TC-003 | Registrar un cliente nuevo | VERD |
| TC-004 | Rechazar el alta de un cliente sin nombre | VERD |
| TC-005 | Rechazar la modificación que deja al cliente sin nombre | VERD |
| TC-006 | Consultar la ficha de un cliente con vehículos y facturas | VERD |
| TC-007 | Modificar los datos de un cliente registrado | VERD |
| TC-008 | Dar de baja un cliente sin vehículos ni facturas | VERD |
| TC-009 | Cancelar la confirmación de baja deja el cliente registrado | VERD |
| TC-010 | Impedir la baja de un cliente con vehículos asociados | VERD |
| TC-011 | Impedir la baja de un cliente con facturas asociadas | VERD |

### Vehiculos (12 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-012 | Listar vehículos, buscar, ordenar y paginar | VERD |
| TC-013 | Registrar un vehículo desde el módulo de vehículos | VERD |
| TC-014 | Registrar un vehículo desde la ficha del cliente | VERD |
| TC-015 | Rechazar el alta de un vehículo sin cliente existente | VERD |
| TC-016 | Rechazar el alta de un vehículo sin marca, modelo o matrícula | VERD |
| TC-017 | Rechazar la modificación que deja el vehículo sin matrícula | VERD |
| TC-018 | Impedir registrar dos vehículos con la misma matrícula | VERD |
| TC-019 | Impedir asignar por modificación una matrícula ya existente | VERD |
| TC-020 | Consultar la ficha de un vehículo con su cliente y sus albaranes | VERD |
| TC-021 | Modificar los datos de un vehículo registrado | VERD |
| TC-022 | Dar de baja un vehículo sin albaranes | VERD |
| TC-023 | Impedir la baja de un vehículo con albaranes asociados | VERD |

### Piezas (8 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-024 | Consultar el catálogo de piezas con referencia, precio y stock | VERD |
| TC-025 | Dar de alta una pieza con su stock inicial | VERD |
| TC-026 | Rechazar el alta de una pieza sin nombre | VERD |
| TC-027 | Rechazar la modificación que deja la pieza sin nombre | VERD |
| TC-028 | Consultar la ficha completa de una pieza | VERD |
| TC-029 | Modificar el precio y el stock de una pieza | VERD |
| TC-030 | Dar de baja una pieza no utilizada en ningún albarán | VERD |
| TC-031 | Impedir la baja de una pieza utilizada en un albarán | VERD |

### Albaranes (23 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-034 | Abrir un albarán y comprobar que no tiene líneas | VERD |
| TC-035 | Abrir un albarán desde la ficha del vehículo | VERD |
| TC-036 | Rechazar la apertura de un albarán sin vehículo existente | VERD |
| TC-037 | Un albarán recién abierto queda pendiente de facturar | VERD |
| TC-038 | El albarán recibe número automático con formato año/A-nnnn | VERD |
| TC-039 | El segundo albarán del año incrementa el correlativo en uno | VERD |
| TC-040 | Añadir una línea de pieza con cantidad y precio | VERD |
| TC-042 | Rechazar una línea con cantidad cero | VERD |
| TC-043 | Rechazar una línea con cantidad negativa | VERD |
| TC-044 | Aceptar una línea con cantidad uno | VERD |
| TC-046 | La línea de pieza sin precio hereda el precio del catálogo | VERD |
| TC-048 | Añadir una línea de pieza descuenta el stock del catálogo | FALLAT - veure S4 |
| TC-049 | Una línea rechazada no mueve el stock | VERD |
| TC-050 | Añadir una línea de mano de obra con horas y precio por hora | VERD |
| TC-051 | Rechazar una línea de mano de obra sin descripción | VERD |
| TC-052 | Retirar una línea de un albarán no facturado | VERD |
| TC-053 | Retirar una línea de pieza devuelve el stock al catálogo | VERD |
| TC-054 | Añadir y retirar la misma línea deja el stock como estaba | VERD |
| TC-055 | Modificar vehículo, fecha y notas de un albarán no facturado | VERD |
| TC-056 | Borrar un albarán no facturado con todas sus líneas | VERD |
| TC-057 | Impedir modificar la cabecera de un albarán facturado | VERD |
| TC-058 | Impedir borrar un albarán facturado | VERD |
| TC-059 | Impedir añadir o retirar líneas en un albarán facturado | VERD |

### Facturas (17 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-060 | Emitir una factura con los albaranes pendientes de un cliente | VERD |
| TC-061 | La emisión solo ofrece albaranes pendientes del cliente elegido | VERD |
| TC-062 | Rechazar la emisión de una factura sin ningún albarán | VERD |
| TC-065 | Al emitir, los albaranes pasan a facturados y quedan enlazados | VERD |
| TC-066 | Una emisión rechazada deja los albaranes pendientes | VERD |
| TC-067 | La factura recibe número automático con formato año/F-nnnn | VERD |
| TC-068 | La segunda factura del año incrementa el correlativo en uno | VERD |
| TC-069 | La base es la suma de cantidad por precio y el total es base más IVA | VERD |
| TC-070 | La base agrega las líneas de todos los albaranes de la factura | VERD |
| TC-071 | Sin indicar tipo de IVA, la factura aplica el 21 por ciento | VERD |
| TC-072 | El tipo de IVA indicado se aplica en lugar del 21 por ciento | VERD |
| TC-073 | Base, IVA y total se presentan con dos decimales | VERD |
| TC-074 | Listar facturas con número, estado de pago y total | VERD |
| TC-075 | El detalle de la factura muestra albaranes, base, IVA y total | VERD |
| TC-076 | Marcar una factura como pagada | VERD |
| TC-077 | Devolver una factura pagada a pendiente de cobro | VERD |
| TC-078 | El estado de pago de la factura solo admite pendiente o pagada | VERD |

### Personal (8 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-079 | Listar empleados con nombre, cargo y contacto | VERD |
| TC-080 | Dar de alta un empleado del taller | VERD |
| TC-081 | Rechazar el alta de un empleado sin nombre | VERD |
| TC-082 | Rechazar la modificación que deja al empleado sin nombre | VERD |
| TC-083 | Consultar la ficha de un empleado con sus nóminas | VERD |
| TC-084 | Modificar los datos de un empleado | VERD |
| TC-085 | Dar de baja un empleado sin nóminas | VERD |
| TC-086 | Impedir la baja de un empleado con nóminas asociadas | VERD |

### Nominas (18 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-087 | Listar nóminas de la más reciente a la más antigua | VERD |
| TC-088 | Registrar una nómina desde el módulo de nóminas | VERD |
| TC-089 | Registrar una nómina desde la ficha del empleado | VERD |
| TC-090 | Rechazar una nómina sin empleado existente | VERD |
| TC-091 | Rechazar una nómina sin empleado, mes o año | VERD |
| TC-092 | Rechazar una nómina con mes 0 | VERD |
| TC-093 | Rechazar una nómina con mes 13 | VERD |
| TC-094 | Aceptar nóminas con mes 1 y con mes 12 | VERD |
| TC-095 | Impedir dos nóminas del mismo empleado, mes y año | VERD |
| TC-096 | Permitir el mismo mes y año para otro empleado | VERD |
| TC-097 | El detalle de la nómina muestra bruto, deducciones y neto | VERD |
| TC-098 | El neto es el bruto menos las deducciones | VERD |
| TC-099 | Al cambiar el bruto, el neto consultado cambia con él | VERD |
| TC-100 | El neto se presenta con dos decimales | VERD |
| TC-101 | Modificar los datos de una nómina registrada | VERD |
| TC-102 | Marcar una nómina como pagada y devolverla a pendiente | VERD |
| TC-103 | El estado de pago de la nómina solo admite pendiente o pagada | VERD |
| TC-104 | Borrar una nómina previa confirmación | VERD |

### Esquelet / Configuracio (5 casos)

| TC | Descripcion | Resultat |
|---|---|---|
| TC-105 | Cambiar el idioma sin perder el trabajo en curso | VERD |
| TC-106 | La interfaz arranca en castellano sin elección previa | VERD |
| TC-107 | El idioma elegido se conserva en la sesión siguiente | VERD |
| TC-108 | Cambiar entre tema claro y tema oscuro | VERD |
| TC-110 | La sección de Configuración avisa de que está pendiente de desarrollo | VERD |

## 4. Cas en vermell — detall per a "Doctor QA TC"

### TC-048 · Añadir una línea de pieza descuenta el stock del catálogo

**Mòdul:** albarans · **Fitxer:** `automation/ui/src/test/resources/features/albarans.feature`
**Origen:** cas **preexistent** a aquesta sessió (no forma part dels 102
automatitzats ara) — ja hi era el 2026-08-16.

**Error observat:**
```
java.lang.AssertionError: stockInesperado: Filtre d'aire tiene 33 y se esperaba 35
	at com.qa.taller.PecesPO.seValida(PecesPO.java:39)
```

**Causa arrel:** `TC-048` assumeix que la peça "Filtre d'aire" té estoc 35
en començar. Aquesta assumpció era certa quan el cas es va escriure en
aïllament, però **`TC-040`** —que precedeix `TC-048` en el mateix fitxer,
també preexistent— afegeix una línia de 2 unitats de la mateixa peça **i mai
la retira**. Amb els dos casos executant-se en seqüència dins la mateixa
suite, `TC-048` arriba amb l'estoc ja a 33, no a 35.

No és contaminació entre execucions diferents (el reseed abans de cada
execució ho descarta): és **contaminació entre escenaris del mateix fitxer**,
per manca d'aïllament — exactament el que la secció «Aïllament dels
escenaris» del skill `s10-auto-tcs` avisa d'evitar.

**Per què no s'ha corregit en aquesta sessió:** `TC-034`, `TC-040`, `TC-042` i
`TC-048` són els quatre casos que ja existien abans d'aquesta feina, i la
instrucció rebuda va ser explícitament no tocar els casos ja automatitzats.
La correcció li correspon a qui tingui mandat sobre aquests quatre.

**Correcció recomanada** (triar-ne una):
1. **Aïllar `TC-040`**: que retiri la línia que afegeix al final de
   l'escenari (`Cuando se pulsa en "Linea: <descripcion>"`), deixant l'estoc
   com el va trobar. És el patró que ja fan servir `TC-053`/`TC-054`.
2. **Fer `TC-048` autosuficient**: que comprovi l'estoc *abans* d'afegir la
   seva pròpia línia i calculi `stockFinal` relatiu a aquest valor llegit,
   en lloc d'un `stockInicial` fix a la taula `Ejemplos`.
3. **Separar-los en fitxers/tags diferents** que no s'executin junts — més
   feble que les dues anteriors, no ataca la causa.

Es recomana l'opció 1: és el mateix patró ja provat i en verd a
`TC-053`/`TC-054`, i beneficia qualsevol altre cas futur que faci servir la
mateixa peça.

## 5. Casos de DOC-05 sense automatitzar (8)

Cap d'aquests és un "fallat": són casos **estructuralment inabastables** per
la interfície actual, verificats llegint el codi font i (quan calia) en viu
contra l'aplicació — no assumits.

| TC | Mòdul | Motiu verificat |
|---|---|---|
| TC-041 | albarans | Reclassificat a `verification_path: service` a `DOC-05` 1.6.0 |
| TC-045 | albarans | El `<select>` de peça només ofereix peces reals; no hi ha manera d'introduir una referència inexistent |
| TC-063 | factures | `FacturaForm` només llista albarans pendents del client triat — mai en mostra un ja facturat |
| TC-064 | factures | El mateix mecanisme que TC-063 impedeix mai veure albarans de dos clients alhora |
| TC-032 | albarans | `AlbaransList.tsx` no exposa cap filtre per vehicle_id ni client_id, només el cercador genèric sobre numero/estat/data |
| TC-033 | albarans | Mateix motiu que TC-032 |
| TC-047 | albarans | `AlbaraLiniesSection.tsx` no renderitza cap camp de preu per a línies de tipus "peça" — sempre hereta el del catàleg |
| TC-109 | shell | El propi `DOC-05` el marca `automation.grade: not-recommended`; depèn de la preferència de color del SO, no controlable des de l'escenari |

**Per a "Doctor QA TC":** cap d'aquests 8 necessita una correcció de test.
TC-041/045/063/064 ja estan reclassificats a `DOC-05`. TC-032/033/047 són
carències reals de la interfície (no hi ha cap manera d'exercir-les, ni amb
un test més ben escrit) — si es volen cobrir algun dia, cal que abans
existeixi la funcionalitat a l'aplicació (filtre per vehicle/client al
llistat d'albarans, camp de preu manual a la línia de peça), decisió que no
correspon a QA sinó a producte. TC-109 s'executa a mà, tal com indica el
propi pla.

## 6. Errors reals corregits durant aquesta sessió

Cap d'aquests queda pendent — es documenten com a evidència de per què la
suite és fiable, i perquè "Doctor QA TC" reconegui el patró si torna a
aparèixer en ampliar la suite. Tots estan incorporats al skill
`s10-auto-tcs` perquè no calgui redescobrir-los.

### 6.1 Carreres contra el re-render de React

**Símptoma:** un escenari falla una vegada i passa en tornar-lo a executar
sol, sense tocar res. `BasePO.seValida` feia lectures instantànies del DOM
(`driver.findElements(...)` sense esperar) just després d'accions que
disparen un `await` a l'API abans d'actualitzar l'estat — bloqueig
d'esborrat, comptador de línies, `aria-pressed` d'un toggle. Corregit fent
`wait.until(...)` a `case "Literal"`, `case "Lineas"`, `case "Titulo"` i
`case "Activo"`.

### 6.2 `WebElement.clear()` no dispara sempre l'`onChange` de React

El DOM es veia buit però l'estat de React conservava el valor anterior — una
validació de "camp obligatori" no saltava mai en editar un camp ja
emplenat, i en un cas un `sendKeys` posterior es va acabar **afegint** al
valor vell ("1" + "1" tecleat = "11"), inflant un total de factura de 200,00€
a 1.200,00€ sense cap error visible. Corregit netejant amb tecles reals
(Ctrl+A + Supr) a `BasePO.escribir()`.

### 6.3 `normalize-space(text())` ignora nodes de text germans

`esperarLiteral`/`existeLiteral` no trobaven mai «Volver al listado» perquè
al JSX va precedit d'un «← » com a node de text germà, i `text()` només
mira el primer. Corregit amb `normalize-space(.)` i una clàusula que
descarta ancestres que també casen, per no tornar `<body>` sencer.

### 6.4 Paginació i acumulació de dades entre escenaris

Els llistats de clients i factures ordenen i paginen de 10 en 10; a mesura
que la suite creix, un registre que "sempre era a la primera pàgina" hi deixa
d'estar. Corregit filtrant amb el cercador abans de clicar la fila, o
navegant directament per URL quan l'id és determinista (surt d'un seed que
no canvia).

### 6.5 El valor d'un `<input>` no és text de pàgina

Comprovar que un formulari conserva el que s'hi ha teclejat (TC-105, canvi
d'idioma) amb `Literal:` no pot funcionar mai: el valor d'un input no és cap
node de text del DOM. Calia un check dedicat que llegeixi
`element.getAttribute("value")`.

### 6.6 El servidor de desenvolupament no aguanta una suite llarga

`vite dev` va petar tres vegades diferents durant execucions completes (un
cop amb una violació d'accés natiu, codi de sortida `3221226505`), sempre a
partir d'un punt concret i no abans — símptoma de `ERR_CONNECTION_REFUSED`
en cascada, no d'un bug dels tests. Es va resoldre servint un **build de
producció en estàtic** (`vite preview`) per a l'execució completa: sense
recàrrega en calent ni vigilància de fitxers, no ha tornat a caure en cap de
les execucions posteriors.

### 6.7 Un `Tipus:` planificat però mai implementat

`TC-066` feia servir `"Pendientes: 1"` a `FacturaFormPO`, un tipus de
validació que es va decidir però no es va arribar a escriure al codi —
`UnsupportedOperationException` en compilar i córrer. Detectat només en
executar, no en revisar el codi.

## 7. Estat de l'entorn en tancar aquest informe

- Base de dades reseeded just abans de l'última execució (§2).
- El vehicle fixture `8001TST` (client "Autoescola Vilanova") i les dades
  que generen els escenaris de factures/albarans/nòmines **es queden a la
  base de dades** — és el comportament esperat dels casos que no fan
  teardown explícit (creació, no eliminació). Si cal un entorn net, reseed.
- El servidor API i el build estàtic poden seguir actius en segon pla;
  aturar-los no és necessari per llegir aquest informe.
