---
doc_id: DOC-16
doc_name: DOC-16-ROADMAP
version: 3.0.0
status: draft
generator: A-12 mejoras/roadmap
generator_version: "1.1"
generated_at: 2026-08-23T15:10:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: 35e07c8001184f36be61963d648231451db6a8b4
  working_tree_clean: true
inputs:
  - id: DOC-16-ROADMAP.md
    from: A-12
    version: 2.1.0
    hash: sha256:467fe9dfceb63ecec0f8af13626519d5ff5ba2647e24ab3f93b6e4e5e71a1169
    present: true
  - id: DOC-02-TECNICA.md
    from: S-01
    version: 1.1.0
    hash: sha256:32639b3f515f4780fdaf962513f02abf6f01fa2854b2418c2ef1f2ef864a44ca
    present: true
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:a88ca2aac68a4b976650ce10fa70832a800568cf4b8efd1e390785a63282674c
    present: true
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    version: 1.8.0
    hash: sha256:095c6baf223b634dc80d00e91b907017166853622df49ce3f9192f5e476ad247
    present: true
  - id: DOC-14-EXPLORATORIO.md
    from: A-10
    version: 2.0.0
    hash: sha256:4aad4cc90f497f97122a67d75fdabdda6d43e118e6ea139cbc9616c2bfafeb36
    present: true
  - id: DOC-23-INFORME.md
    from: S-10
    version: 2.0.0
    hash: sha256:1ba0743c9461ac60f35a00ccc42f12dbaeac25f40d99992bd469d6efe968208e
    present: true
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    present: true
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    version: 1.2.0
    hash: sha256:b4f26c8f2ae7d8f944917bd6770ac52680c3690ee66fbd85b77f8304aef86349
    present: true
  - id: registro-ids.json
    from: S-12
    version: "1"
    hash: sha256:9f5b3679a537ad7e9399ba6ef61d99518a3308957cac29977fae5b3f12a1d1c5
    present: true
  - id: DOC-17-DEUDA-TECNICA.md
    from: S-05
    present: false
  - id: DOC-20-RALLY-STATE.json
    from: I-01
    present: false
  - id: DOC-19-RALLY-TESTCASES.csv
    from: S-07
    present: false
---

# DOC-16 · Mejoras y roadmap técnico — app-taller

> Qué patrón hay detrás de los defectos de este sistema y dónde conviene invertir
> esfuerzo técnico. **Solo mejoras sobre lo que ya existe.** Ninguna propuesta de este
> documento añade funcionalidad: lo que hay de esa clase está en el apartado 6, dirigido
> a `A-15`.
>
> **Este documento no lleva historial de cambios.** Refleja solo el estado actual, con su
> `version` en el front-matter. El historial está en **`docs/DOC-16-ROADMAP-HIST.md`**.
>
> `status: draft`. **Dos mejoras se han implementado y verificado en vivo desde la ronda
> anterior** (`MEJ-007`, `MEJ-008`). Tres siguen `accepted` sin haber entrado en `A-07`.
> Cuatro esperan decisión, una de ellas nueva. **Las decide una persona, no A-12.**

## Procedencia

Cómo se han usado las entradas, por qué la versión es la que es y qué se ha decidido en
esta ronda sobre la forma del propio documento.

**El worktree de esta ronda estaba desactualizado respecto a `master` y se ha adelantado
en avance rápido antes de leer nada.** Al empezar, `HEAD` era `90b24b8` (el commit
inmediatamente posterior a la fusión de `SPEC 05`) mientras `master` tenía doce commits
más: la regeneración de `DOC-01`/`DOC-02` por `S-01`, la de `DOC-04`, `DOC-05`, `DOC-06`,
`DOC-07`, `DOC-08` por sus respectivos dueños, y la verificación en vivo de `DOC-14` por
`A-10`. El worktree no tenía ningún commit propio (`git merge-base master
worktree-agent-ab87d461132e63a07` = `90b24b8` = la propia `HEAD`), así que avanzar con
`git merge --ff-only master` no descarta nada: es estrictamente ponerse al día. Sin ese
paso, este documento habría regenerado sobre `DOC-02` 1.0.0 y `DOC-14` 1.0.0, que ya no
son las verdades vigentes.

**Qué se ha leído de cada entrada.**

- **`DOC-02` 1.1.0** (era 1.0.0, **MINOR**) — bloque `graph`: **51 componentes y 71
  aristas** (eran 33 y 58). Los dos componentes nuevos son exactamente la infraestructura
  que `MEJ-007` y `MEJ-008` pedían: `use-submit-guard`
  (`client/src/hooks/useSubmitGuard.ts`) y `format-utils`
  (`client/src/utils/format.ts`), con 7 y 6 aristas entrantes respectivamente (13 de las
  14 aristas nuevas; la 14ª no existe — se ha recontado a mano, ver más abajo). **Las tres
  aristas que `DOC-07/7.2` señaló como ausentes siguen ausentes**: `albarans-pages →
  vehicles-service`, `albarans-pages → shared-components` y `factures-pages →
  albarans-service` no están en 1.1.0 tampoco. `S-01` regeneró el documento por otro
  motivo (los dos componentes de SPEC 04/05) y no tocó esa carencia; consta en el
  apartado 6.
- **`DOC-05` 1.6.0** — mismo hash que la ronda anterior. Sin cambios que citar.
- **`DOC-07` 1.7.0** — **mismo número de versión, hash distinto.** El commit
  `8c4086c` («Resincronizar DOC-07 con DOC-06 1.3.0 sin cambio de contenido») explica por
  qué: el front-matter actualizó la referencia a `DOC-06`, el archivo cambió de bytes, el
  contenido sustantivo no. Se ha comprobado leyendo `§3.4`, `§5` y `§7.2`: son el mismo
  texto que citó la versión 2.1.0 de este documento. **Y por el mismo motivo `DOC-07`
  1.7.0 ya está obsoleto según `S16`**: declara `DOC-14` 1.0.0 y la actual es 2.0.0. No es
  un problema de este documento — es de `A-05` — pero significa que la cobertura que cita
  este roadmap no ha incorporado todavía lo que `DOC-14` 2.0.0 cerró. Se anota en el
  apartado 6.
- **`DOC-14` 2.0.0** (era 1.0.0, **MAJOR**) — sesión de verificación de cierre, no
  exploración nueva. Cuatro hallazgos se cierran verificados con red y base de datos
  (`EXP-001`, `EXP-002`, `EXP-007`, `EXP-014`), uno se cierra a medias (`EXP-009`) y nacen
  dos (`EXP-027`, `EXP-028`). Es la entrada que más mueve esta ronda; ver apartado 1.
- **`DOC-24` 1.0.0** — mismo hash. Sigue con los cuatro defectos «abiertos» en su propio
  texto mientras `DOC-14` verificó dos como corregidos. Consta otra vez en el apartado 6:
  es la tercera ronda que lo señala.
- **`DOC-25` 1.1.1** — mismo hash. Comprobado de nuevo que ninguno de los hallazgos que
  este documento manda a `A-15` está ya cubierto: `FUN-001` a `FUN-008` no cambian.
- **`registro-ids.json`** — 8 anclas `MEJ` antes de esta ronda. Pedido a `S-12`
  (`registry.js next registro-ids.json --prefix MEJ --count 2` → «8 existentes, máximo 8;
  siguientes libres: **MEJ-009**, MEJ-010»). Se usa el primero. **A-12 no ha tocado el
  registro.**
- **Código fuente** — releído en el commit `4526cf0`, `HEAD` de este ciclo.
  `git diff --stat b2a8d77 HEAD -- server/routes/` **no devuelve nada**: `server/routes/`
  no se ha tocado desde la verificación de la ronda anterior. Por eso las tres cifras que
  2.1.0 citó —893 líneas, 86 `res.status`, 71 literales de error— **no se recorrigen: ya
  son correctas**, y así se anota en vez de fingir un recuento que no aportaría nada
  nuevo. Donde sí ha cambiado el código es en `client/src`: `grep -rl useSubmitGuard
  client/src` devuelve **9 ficheros** (los 7 formularios más el propio hook y su
  consumidor indirecto en `AlbaraLiniesSection.tsx`), y `grep -rl toFixed client/src`
  **no devuelve ninguno** (eran 15 llamadas en 8 ficheros). Ambas cifras se citan en las
  fichas de `MEJ-007` y `MEJ-008`.
- **`specs/implemented/SPE-04-proteccio-enviaments-duplicats.md` y `specs/implemented/SPE-05-presentacio-imports-i-dates.md`**
  — los dos con `Estado: Implemented`, y los dos citan a este documento por su nombre:
  «`docs/DOC-16-ROADMAP.md` ja ho havia censat com **MEJ-007**» y «com **MEJ-008**». Es la
  primera vez que una mejora de este roadmap se ve citada de vuelta desde la
  implementación que la ejecuta, y se usa como evidencia de cierre en el apartado 3.1.
- **`DOC-17` (S-05) sigue sin existir.** Cuarta versión consecutiva de este roadmap
  escrita sin que nadie haya analizado la deuda técnica del proyecto como tal.

## 1. Qué ha cambiado desde el roadmap anterior

| Entrada | Qué cambió | Qué aporta a este documento |
|---|---|---|
| **`DOC-02` 1.1.0** | +18 componentes, +13 aristas | El impacto de `MEJ-007`/`MEJ-008` deja de ser una estimación: es lo que el grafo ya declara construido |
| **`DOC-14` 2.0.0** | 4 hallazgos cerrados, 1 a medias, 2 nuevos | Verificación en vivo de si los problemas que `MEJ-007` y `MEJ-008` atacaban han desaparecido de verdad |

### 1.1 MEJ-007 y MEJ-008 pasan a `implemented`, y es la primera vez que ocurre en este documento

**Las dos nacieron en la ronda 2.1.0 y las dos se han construido a través de `SPEC 04` y
`SPEC 05`, que citan sus identificadores por nombre.** No es una coincidencia de
calendario: los dos specs enumeran explícitamente los hallazgos de `DOC-14` de los que
parten y dicen, en su cabecera, que este roadmap ya los había censado. Verificar si el
problema desapareció, y no solo si el código cambió, es la comprobación que corresponde
antes de marcarlas `implemented`.

**MEJ-007 — la guarda de reenvío.**

| Lo que pedía la ficha de 2.1.0 | Verificado ahora |
|---|---|
| Un solo sitio, no tres implementaciones distintas | `client/src/hooks/useSubmitGuard.ts`, un hook de 27 líneas. **9 ficheros lo importan**: los 7 formularios (`ClientForm`, `VehicleForm`, `PecaForm`, `PersonalForm`, `NominaForm`, `AlbaraForm`, `FacturaForm`) más `AlbaraLiniesSection.tsx` |
| Cerrar `EXP-002` (`critical`) | **Cierra.** `DOC-14/EXP-002`, verificación 2026-08-23: doble clic en «Añadir línea» sobre el albarán `2026/A-0003` produce **un solo** `POST /api/albarans/3/linies → 201`, una sola línea (id 14), stock de 37 a 35 (dos unidades, no cuatro) |
| Cerrar `EXP-001` (`high`) | **Cierra.** `DOC-14/EXP-001`: doble clic en «Guardar» en alta de cliente produce **un solo** `POST → 201`, cliente id 19 único; **extendido y confirmado también en el alta de vehículo**, que la ficha original de `DOC-14` 1.0.0 dejaba como generalización «no verificada» |
| El tercer punto de envío, `FacturaForm.tsx:142`, no reproducido — inferencia de código, no evidencia | **Ya no es inferencia.** `FacturaForm.tsx` importa `useSubmitGuard` igual que los otros seis; el mecanismo cubre los tres puntos que la ficha identificó, con o sin reproducción específica de cada uno |

**MEJ-008 — el formato único de importe y fecha.**

| Lo que pedía la ficha de 2.1.0 | Verificado ahora |
|---|---|
| Un módulo único, no 15 llamadas repartidas | `client/src/utils/format.ts`: `formatMoney` (`Intl.NumberFormat`, `es-ES`, `EUR`) y `formatDate` (`Intl.DateTimeFormat`, `es-ES`). `grep -rl toFixed client/src` **devuelve 0 ficheros** (eran 15 llamadas en 8) |
| Cerrar `EXP-014` (precio en tres formatos distintos) | **Cierra.** `DOC-14/EXP-014`, verificación 2026-08-23: catálogo, ficha de pieza, línea de albarán, factura y nómina muestran las cinco coma decimal, separador de miles y `€` |
| Cerrar la parte de presentación de `EXP-009` (fecha en crudo) | **Cierra.** `/albarans` y la ficha de cada albarán muestran `21/08/2026` donde antes había `2026-08-21T15:16:55.032Z` |
| Responder `P-03` (coma o punto decimal) | **Respondida** por la propia decisión de `SPEC 05`: coma decimal. Se retira de las preguntas abiertas de `DOC-14` |

**Lo que queda fuera, y por qué no invalida `implemented`.**

1. **El defecto de fondo de `EXP-009` no cierra, y no es de esta mejora.** Editar el
   albarán reescribe su fecha a medianoche UTC y pierde la hora original —reproducido de
   nuevo, idéntico a 1.0.0—. `SPEC 05` lo declaró fuera de su alcance explícitamente
   porque es una decisión de modelo de datos (¿el albarán guarda fecha o fecha y hora?),
   no de presentación: **exactamente la frontera que la ficha 2.1.0 de MEJ-008 ya
   marcaba** («la corrección de EXP-009 y EXP-014 como defectos sigue siendo de A-14»).
   Sigue abierto, sigue siendo de `A-14`.
2. **La propia cautela que la ficha 2.1.0 escribió se ha cumplido, y tiene nombre:
   `EXP-027`.** «Los `.feature` de `automation/ui/` validan literales como `119.06 €`»
   dejó de ser un riesgo y pasó a ser un hecho confirmado: `factures.feature` y
   `nomines.feature` siguen escritos con punto decimal —`TC-060` espera `121.00 €`, la
   pantalla real muestra `121,00 €`— y afecta al menos a nueve casos contados a mano
   (`TC-060`, `TC-061`, `TC-069` a `TC-073`, `TC-075`, `TC-098` a `TC-100`). **`deriva_a:
   A-03`, no `A-12`**: es trabajo sobre el plan de pruebas, no sobre la aplicación. Va al
   apartado 6.
3. **Un hueco que la ficha 2.1.0 no pudo prever, porque no estaba en su alcance:
   `EXP-028`.** `Personal.dataAlta` se sigue mostrando como `2020-01-15` en
   `/personal/1`, sin pasar por `formatDate`, mientras el «Salario base» de la misma
   ficha ya usa `formatMoney`. Verificado en código: `PersonalDetail.tsx:68` imprime
   `persona.dataAlta` en crudo; la línea 71, dos más abajo, sí envuelve `salariBase` en
   `formatMoney`. El propio `SPEC 05` lo declaró fuera de su alcance por escrito («Cap
   hallazgo de DOC-14 els reprodueix; formatDate no s'hi aplica en aquest spec»). Es
   `deriva_a: A-12`, `low`, y dispara **MEJ-009** — ver 3.2.

**Una observación de proceso, sin juicio.** Las dos mejoras se han implementado
directamente vía `/spec` → `/spec-impl`, sin pasar formalmente por `A-07 · Impacto` como
prescribe el ciclo nominal para las `accepted`. El resultado técnico es correcto y
verificado; se deja constancia porque es un dato para quien revise el propio ciclo, no
porque afecte a la calidad de lo construido.

### 1.2 Las tres aceptadas el 2026-08-17 siguen sin pasar por A-07

**Seis días después, MEJ-001, MEJ-003 y MEJ-005 siguen `accepted` y ninguna ha entrado en
`A-07`.** No hay evidencia nueva sobre ellas esta ronda —nada en `DOC-14` 2.0.0 toca sus
áreas— así que se mantienen tal como las dejó 2.1.0, con la nota de que el reloj sigue
corriendo: la suite de interfaz sigue creciendo (ahora con dos hallazgos más pendientes de
que `A-03` la actualice, `EXP-027`), y cuanto más tarde `MEJ-001` más Page Objects habrá
escritos contra rótulos.

### 1.3 Los defectos de `DOC-24`: sin novedad documental, y ya van tres rondas señalándolo

`DOC-24` sigue en 1.0.0 con los cuatro defectos «abiertos» en su propio texto. `DOC-14`
1.0.0 ya había verificado en vivo que `BUG-001` y `BUG-002` funcionan, y esta ronda no
tenía motivo para repetir esa verificación (ni `SPEC 04` ni `SPEC 05` tocan
`albarans-router` ni `peces-router`). `BUG-003` y `BUG-004` siguen abiertos, sin cambios,
tal como los deja `DOC-14` 2.0.0 explícitamente («siguen abiertos y no se vuelven a
levantar»).

### 1.4 La cobertura: mismo contenido, pero la fuente ya está desactualizada

`DOC-07` 1.7.0 no cambia de contenido, así que las cifras que cita este roadmap —100,00 %,
0 GAP PLAN, `A-05-03` con 6 requisitos, `A-05-03b` con `TC-073`/`TC-075`— son las mismas
de la ronda anterior. Lo que sí cambia es que **esa fuente ya no refleja `DOC-14` 2.0.0**:
`A-05-03` sigue contando los cuatro defectos de `DOC-24` como no detectados por ningún
caso, sin saber que dos de las cinco brechas que motivaron `SPEC 04`/`SPEC 05` ya se han
cerrado por otra vía. No es una discrepancia que corresponda corregir aquí; consta en el
apartado 6 para `A-05`.

### 1.5 Lo nuevo de esta ronda

**Dos mejoras cambian a `implemented`** (`MEJ-007`, `MEJ-008`, ver 1.1 y 3.1) **y nace
una**, pequeña y de coste trivial: `MEJ-009`, de `DOC-14/EXP-028`. Es el único hallazgo
que `DOC-14` dirigió explícitamente a `A-12` en esta ronda; los otros dos con `deriva_a`
histórico hacia `A-12` (`EXP-017`, `EXP-019`) no se han vuelto a revisar esta sesión y
siguen tal como los dejó 2.1.0 en el apartado 6.

## 2. Recomendación

Las tres primeras por relación valor/dificultad **entre las cuatro que esperan decisión**.
Las tres aceptadas y las dos implementadas quedan fuera: recomendar lo ya decidido o lo ya
hecho no ayuda a nadie.

| # | Mejora | Por qué ésta |
|---|---|---|
| 1 | **MEJ-009 · Aplicar `formatDate` a `Personal.dataAlta`** | Coste casi nulo: el módulo de formato ya existe, probado y usado en seis páginas; falta una línea en `PersonalDetail.tsx`. Cierra la única inconsistencia de presentación que queda documentada tras `MEJ-008` |
| 2 | **MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base** | Sigue siendo la más barata de las de mayor alcance y **sigue bloqueando parcialmente a dos aceptadas**, ahora seis días paradas. Sigue siendo `opinion` y sigue sin un incidente medido que la respalde: se recomienda por lo que desbloquea |
| 3 | **MEJ-002 · Catálogo único de los literales de error del servidor** | Evidencia reproducida en vivo (`DOC-14/EXP-006`, sin cambios esta ronda pero tampoco desmentida), 102 casos automatizados anclados a los mismos 71 literales, coste bajo, contrato de API aditivo que ya está acotado en su propia ficha |

**MEJ-004 sigue siendo la de más valor absoluto del documento y no está en el podio**, por
el mismo motivo que en la ronda anterior: dificultad `high`, toca los ocho componentes por
los que pasa toda escritura, y depende de `MEJ-003`, que sigue aceptada sin haber entrado
en `A-07`. Nada ha cambiado en su evidencia esta ronda porque nada de lo tocado por `SPEC
04`/`SPEC 05` afecta a los routers del servidor.

## 3. Mejoras

Nueve en total: seis heredadas, dos que pasan a `implemented` esta ronda y una nueva.
Ocho de nueve salen de evidencia con fuente citable; una (`MEJ-006`) es de criterio,
marcada como `opinion` para poder filtrarse de un vistazo. Ninguna añade funcionalidad.

### 3.0 El patrón, recontado: la mitad del cliente se cierra, la del servidor sigue igual

La versión 1.0.0 sostuvo que los defectos confirmados eran, todos, la misma ausencia: una
comprobación que falta en el punto exacto donde el dato se escribe. `DOC-14` había
encontrado ocho casos de esa clase, todos en el servidor:

| Origen | Qué falta | Dónde | Estado |
|---|---|---|---|
| `DOC-24/BUG-001` | comprobar existencias antes de descontar stock | `albarans-router` | `critical` · corregido, verificado en vivo |
| `DOC-24/BUG-002` | comprobar que el vehículo nuevo es del mismo cliente | `albarans-router` | `critical` · corregido, verificado en vivo |
| `DOC-24/BUG-003` | precio, coste y stock no negativos | `peces-router` | `high` · abierto |
| `DOC-24/BUG-004` | no hay camino para anular o rectificar una factura | `factures-router` | `high` · abierto |
| `DOC-14/EXP-004` | deducciones mayores que el bruto: neto negativo aceptado | `nomines-router` | `high` · abierto, bloqueado por P-01 |
| `DOC-14/EXP-005` | mes con decimales y año sin límite | `nomines-router` | `medium` · abierto, bloqueado por P-02 |
| `DOC-14/EXP-015` | año de matriculación 2099 y kilometraje negativo | `vehicles-router` | `medium` · abierto, bloqueado por P-02 |
| `DOC-14/EXP-016` | validación de navegador desactivada: correo sin arroba, nombre de 281 caracteres | `clients-router` + `shared-components` | `medium` · abierto |

**Sin cambios esta ronda: seis abiertos, dos corregidos, los ocho del servidor.** Ninguno
de los dos specs implementados toca `server/routes/`, así que el patrón que sostiene
`MEJ-004` no se mueve. `albarans` (18 requisitos, 28 casos) y `factures` (13 requisitos,
19 casos) siguen siendo, según `DOC-07` §5, el 39 % de los requisitos y el 43 % de los
casos, y ahí caen tres de los cuatro defectos de `DOC-24`.

**La segunda mitad, la del cliente, sí se ha movido, y es la novedad de esta ronda.** Los
dos defectos de doble envío que `DOC-14` había encontrado fuera de los routers —`EXP-002`
(`critical`) y `EXP-001` (`high`)— **están cerrados**, verificados con red y base de
datos. La tercera clase, de presentación (`EXP-014`, `EXP-009`), también se cierra en su
mayor parte. Lo que queda de esa familia es lo residual: la pérdida de hora al editar un
albarán (`EXP-009`, fuera de alcance por decisión de modelo) y la fecha de alta de
personal (`EXP-028`, `MEJ-009`).

---

### 3.1 Implementadas esta ronda

#### MEJ-007 · Una sola guarda contra el reenvío en los tres puntos de escritura del cliente

| | |
|---|---|
| **Estado** | `implemented` — verificado en vivo el 2026-08-23 |
| **Construida por** | `specs/implemented/SPE-04-proteccio-enviaments-duplicats.md`, `Estado: Implemented`, que cita esta mejora por nombre |
| **Verificación de que el problema desapareció** | `DOC-14/EXP-001` y `DOC-14/EXP-002`, ambos `CORREGIDO en v2.0.0`, con panel de red y `GET` de comprobación antes/después |

**Qué se construyó.** `client/src/hooks/useSubmitGuard.ts`, un único hook que bloquea el
reenvío mientras la petición está en vuelo. Lo consumen **9 ficheros**: los siete
formularios de entidad (`ClientForm`, `VehicleForm`, `PecaForm`, `PersonalForm`,
`NominaForm`, `AlbaraForm`, `FacturaForm`) y `AlbaraLiniesSection.tsx`. Es exactamente el
«un solo sitio en vez de tres implementaciones» que pedía la ficha original.

**Lo que la evidencia de cierre añade sobre la ficha original.** La ficha 2.1.0 dejaba
`FacturaForm.tsx:142` como «inferencia de lectura de código, no dato»: nadie lo había
reproducido. Ahora **sí está cubierto por el mismo mecanismo que los otros seis**, aunque
`DOC-14` no haya reproducido específicamente un doble envío de factura. Y la
generalización a un formulario no probado en la sesión original —alta de vehículo— **se
verificó y se confirmó**: un solo `POST /api/vehicles → 201`, un solo registro.

**Riesgo si no se hubiera hecho, y por qué ya no aplica.** La ficha 2.1.0 avisaba de que,
sin un sitio único, `EXP-002` se corregiría donde se reprodujo y quedarían vivos el alta
de cliente y la emisión de factura. No ha ocurrido: los tres puntos comparten el mismo
hook.

**Frontera respetada.** Esta mejora no fue la corrección de `EXP-001` ni de `EXP-002` en
sí —esas son de `A-14`—; lo que aportaba era la decisión de dónde vive el mecanismo. Esa
decisión se tomó y se ejecutó como se propuso: un hook, no tres parches.

---

#### MEJ-008 · Un único sitio donde se dé formato a importes y fechas

| | |
|---|---|
| **Estado** | `implemented` — verificado en vivo el 2026-08-23, con un residual pequeño (ver `MEJ-009`) |
| **Construida por** | `specs/implemented/SPE-05-presentacio-imports-i-dates.md`, `Estado: Implemented`, que cita esta mejora por nombre |
| **Verificación de que el problema desapareció** | `DOC-14/EXP-014` `CORREGIDO en v2.0.0`; `DOC-14/EXP-009` `PARCIALMENTE CORREGIDO en v2.0.0` (presentación cierra, el defecto de fondo no, y no era de esta mejora) |

**Qué se construyó.** `client/src/utils/format.ts`: `formatMoney` sobre
`Intl.NumberFormat('es-ES', {style:'currency', currency:'EUR'})` y `formatDate` sobre
`Intl.DateTimeFormat('es-ES', ...)`. Recuento sobre el código en `HEAD` (`4526cf0`): **0
llamadas a `toFixed` en todo `client/src`**, frente a las 15 en 8 ficheros que motivaron
la mejora.

**Lo que cierra.** El precio de una pieza se presenta igual en catálogo, ficha, línea de
albarán, factura y nómina —coma decimal, separador de miles, símbolo €—, verificado en las
cinco pantallas. La fecha del albarán se presenta como `21/08/2026` en listado y ficha,
donde antes había una marca de tiempo ISO cruda. `P-03`, la pregunta de negocio sobre coma
o punto decimal, queda respondida por la propia decisión del spec.

**Lo que no cierra, y por qué no invalida el estado.** El defecto de fondo de `EXP-009`
—editar el albarán reescribe la fecha a medianoche UTC y pierde la hora— sigue
reproduciéndose exactamente igual. **No es un fallo de esta mejora**: es una decisión de
modelo de datos que la propia ficha original de `MEJ-008` ya dejaba fuera («la corrección
de EXP-009 y EXP-014 como defectos sigue siendo de A-14»), y que `SPEC 05` declaró fuera
de su alcance por el mismo motivo, por escrito.

**La cautela que la ficha original escribió se ha cumplido.** Avisaba de que unificar el
formato «cambia lo que se ve en pantalla» y que «los `.feature` de `automation/ui/`
validan literales como `119.06 €`». Es exactamente lo que confirma `DOC-14/EXP-027`:
`factures.feature` y `nomines.feature` siguen con punto decimal y ya no coinciden con la
pantalla, con al menos nueve casos afectados contados a mano. Es trabajo de `A-03`, no de
esta mejora ni de `A-12`; consta en el apartado 6.

**Un hueco que la ficha original no pudo prever.** `Personal.dataAlta` no entraba en el
alcance de `SPEC 05` —lo dice el propio spec— y sigue sin `formatDate`. Es
`DOC-14/EXP-028`, y de ahí nace `MEJ-009`.

---

### 3.2 Nueva esta ronda

#### MEJ-009 · Aplicar `formatDate` a `Personal.dataAlta`

| | |
|---|---|
| **Estado** | `proposed` — **nueva**, identificador dado por S-12 |
| **Origen** | `evidence` |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `low` |

**En qué consiste.** Envolver `persona.dataAlta` con el `formatDate` de
`client/src/utils/format.ts` en `PersonalDetail.tsx`, tal como ya se hace con
`salariBase` y `formatMoney` dos líneas más abajo en el mismo fichero. **No decide ningún
formato nuevo**: usa el que `MEJ-008` ya construyó y que el resto de la aplicación ya
consume.

**Qué aporta.** Cierra la única inconsistencia de presentación que queda documentada tras
`MEJ-008`: hoy la ficha de un empleado muestra `FECHA DE ALTA 2020-01-15` junto a
`SALARIO BASE 1.650,00 €`, dos datos destacados de la misma ficha con dos niveles de
cuidado distintos.

**Evidencia.**

- **`DOC-14/EXP-028`**, severidad `low`, reproducido: `/personal/1` muestra `FECHA DE
  ALTA 2020-01-15`; `/albarans/3` muestra `FECHA 21/08/2026` con el mismo tipo de dato
  —una fecha destacada de ficha, no una marca de auditoría—. El propio `SPEC 05` ya
  declaraba esta inconsistencia como riesgo conocido y aceptado por escrito: «si es vol
  coherència total, és un spec futur».
- **Verificado en código** (A-12, commit `4526cf0`): `PersonalDetail.tsx:68` imprime
  `persona.dataAlta || '—'` en crudo; la línea 71 envuelve `persona.salariBase` en
  `formatMoney(...)`. El propio fichero ya importa `formatMoney` de
  `../../utils/format`; añadir `formatDate` al mismo `import` es el cambio.

**Distinción a propósito.** `EXP-028` distingue explícitamente esta fecha de negocio de
los campos de auditoría `creatEl`/`actualitzatEl`, que siguen sin tocar en toda la
aplicación y que nadie espera que `MEJ-008` ni esta mejora toquen: no son el mismo tipo de
dato y no están en su alcance.

**Componentes afectados** (bloque `graph` de `DOC-02`): `personal-pages`. **Uno de 51.**

**Riesgo de no hacerla.** Ninguno grave: es la inconsistencia visual más pequeña del
documento. El motivo para hacerla no es el riesgo de dejarla, es que el coste de hacerla
es casi nulo y el mecanismo ya existe, probado, en el mismo fichero.

**Entra por** `A-07`, aunque por su tamaño es candidata razonable a agruparse con
cualquier otro cambio menor que toque `personal-pages`.

---

### 3.3 Decididas · `accepted` el 2026-08-17, sin ejecutar

**No son propuestas. A-12 no las repropone, ni con este número ni reformuladas.** Su
siguiente paso es `A-07`, y seis días después no ha ocurrido con ninguna de las tres. Sin
evidencia nueva esta ronda porque nada de lo implementado por `SPEC 04`/`SPEC 05` toca sus
áreas.

| Mejora | Estado | Nota de esta ronda |
|---|---|---|
| **MEJ-001 · Identificadores estables de prueba en la interfaz** | `accepted`, sin ejecutar | Sin cambios en su evidencia (26 POs, 20 `By.xpath` frente a 1 `By.id`). El reloj sigue corriendo: la suite ahora tiene además `EXP-027` pendiente de que `A-03` la actualice, otro motivo para que cada ronda sin ejecutar cueste más |
| **MEJ-003 · Suite de pruebas del servidor y CI mínima** | `accepted`, sin ejecutar | Sin cambios: 0 ficheros de prueba en `server/`, 0 CI, 0 script `test`. `SPEC 04`/`SPEC 05` no tocan esto |
| **MEJ-005 · Estado de base reproducible entre escenarios** | `accepted`, sin ejecutar | Sin cambios. `DOC-23` sigue en 2.0.0: el único rojo de la suite (`TC-048`) sigue siendo el mismo caso de contaminación de `TC-040` |

**Las dependencias siguen sin resolverse.** `MEJ-003` y `MEJ-005` dependen de `MEJ-006`,
que sigue sin decidir seis días después.

---

### 3.4 Esperando decisión · sin evidencia nueva esta ronda

**Ninguna de estas tres está descartada: están sin decidir.** No hay evidencia nueva que
citar en ninguna de ellas —nada de lo que ha cambiado esta ronda (`DOC-02`, `DOC-14`) toca
las áreas que sostienen su ficha—, así que se mantienen tal como las dejó 2.1.0 y se dice
con esas palabras en vez de fabricar movimiento donde no lo hay.

#### MEJ-002 · Catálogo único de los literales de error del servidor

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, sin evidencia nueva |
| **Origen** | `evidence` |
| **Tamaño** | `medium` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `medium` / `low` / `medium` |

**En qué consiste.** Extraer los 71 mensajes de error hoy incrustados en las rutas a un
módulo único, con un código estable por mensaje. No traduce ni reescribe ningún literal.

**Evidencia, sin cambios desde 2.1.0.** `DOC-14/EXP-006` (reproducido en los siete
módulos con la interfaz en castellano, recuento por fichero: albarans 20, nomines 13,
vehicles 12, clients 7, factures 7, peces 6, personal 6 = 71); `DOC-05/4.11` («Literal del
aviso», 25 casos); `client/src/services/api.ts` propaga `body.error` tal cual;
`specs/01:102` fija la convención de claves de traducción que las 71 incumplen.
**Recontado en `HEAD` (`4526cf0`): `server/routes/` no ha cambiado desde `b2a8d77`, así
que los 71 siguen siendo 71.**

**Componentes afectados:** los siete routers y, si se decide devolver un código,
`api-client`.

**Riesgo de no hacerla.** La corrección del idioma (`EXP-006`, `deriva_a: A-14`) se
escribirá router a router si llega antes que el catálogo.

**Entra por** `A-07`.

---

#### MEJ-004 · Un sitio donde vivan las reglas de escritura

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, sin evidencia nueva |
| **Origen** | `evidence` |
| **Tamaño** | `large` · confianza `medium` |
| **Impacto / dificultad / urgencia** | `high` / `high` / `high` |

**En qué consiste.** Extraer de los routers la validación y las reglas de negocio a un
módulo por dominio. No añade ni cambia ninguna regla: mueve las que ya existen.

**Evidencia, sin cambios desde 2.1.0.** Los ocho defectos de escritura del apartado 3.0
(`DOC-24/BUG-001` a `BUG-004`, `DOC-14/EXP-004`, `EXP-005`, `EXP-015`, `EXP-016`);
`DOC-02/Q-06`; 893 líneas y 86 `res.status` en `server/routes/`, recontados en `HEAD` y
sin cambios desde la ronda anterior porque `server/routes/` no se ha tocado.

**Componentes afectados:** los siete routers más `db-connection`.

**Riesgo de no hacerla.** El noveno defecto de la misma familia.

**Sigue recomendándose la tercera vía**, no antes: hacerla con el primer evolutivo,
acotada al dominio que ese evolutivo toque, porque `MEJ-003` —de la que depende para tener
red— sigue aceptada y parada.

**Entra por** `A-07`.

---

#### MEJ-006 · Fijar la versión de Node y hacer configurable la ruta de la base

| | |
|---|---|
| **Estado** | `proposed` — sin decidir, y bloquea parcialmente a dos aceptadas desde hace seis días |
| **Origen** | **`opinion`** |
| **Tamaño** | `small` · confianza `high` |
| **Impacto / dificultad / urgencia** | `low` / `low` / `medium` |

**En qué consiste.** Declarar `engines` y `.nvmrc`, y leer la ruta de la base de una
variable de entorno con el valor actual como valor por defecto.

**Por qué sigue marcada `opinion`.** Verificado de nuevo en `DOC-02` 1.1.0: ningún
`package.json` declara `engines`, no hay `.nvmrc`, `Q-01` y `Q-02` siguen abiertas. Sigue
sin haber un solo dato que mida que esto haya causado un incidente.

**Componentes afectados:** `db-connection` y `server-app`.

**Riesgo de no hacerla.** `MEJ-003` (CI reproducible) y la mitad de `MEJ-005` que apunta a
otra base no se pueden hacer sin esto, y las dos siguen aceptadas.

**Entra por** `A-07`.

## 4. Vivas de rondas anteriores

Las cuatro `proposed` —tres heredadas, sin evidencia nueva, y una nacida esta ronda—.

| Mejora | Evidencia | Qué ha pasado |
|---|---|---|
| **MEJ-002** | Sin cambios | `server/routes/` no se ha tocado; los 71 literales se recontaron y coinciden |
| **MEJ-004** | Sin cambios | Los ocho defectos de escritura siguen igual; sigue dependiendo de `MEJ-003` |
| **MEJ-006** | Sin cambios en datos | Sigue `opinion`, sigue sin incidente medido; sigue bloqueando parcialmente a dos aceptadas, ahora seis días |
| **MEJ-009** | Nueva | Nace de `DOC-14/EXP-028`, coste trivial |

**MEJ-007 y MEJ-008 salen de esta lista porque están `implemented`**, no porque se hayan
descartado. Su verificación de cierre está en el apartado 3.1.

## 5. Descartadas

**Ninguna, y sigue siendo importante decirlo con todas las letras.** El propietario del
proyecto no ha rechazado ninguna mejora desde el 2026-08-17. `MEJ-002`, `MEJ-004` y
`MEJ-006` **no están descartadas: están esperando decisión desde hace seis días.**

Lo que se conserva, sin cambios esta ronda porque nada de lo que trajo `DOC-14` 2.0.0
toca estos temas:

### 5.1 El control de concurrencia (`DOC-14/EXP-003`) · sin cambios

`DOC-14` 2.0.0 lo confirma explícitamente: «no revisado de nuevo en esta sesión […] se da
por vigente». Sigue sin proponerse: la decisión —bloqueo optimista o fusión por campos— es
de producto, no técnica (`specs/01:50` excluye el acceso multiusuario simultáneo; `EXP-003`
ocurre con un solo usuario y dos pestañas, que el spec no excluye). Va al apartado 6.

### 5.2 La numeración de albaranes y facturas (`generateNumero`) · sin cambios

Sigue sin proponerse. `better-sqlite3` es síncrono; `DOC-24` y `DOC-14` (ambas versiones)
verificaron la numeración como correcta.

### 5.3 Las correcciones de los defectos, los ocho · sin cambios

No son mías: `BUG-003`/`BUG-004` son evolutivos decididos por negocio; los defectos de
`DOC-14` van a `A-14`. Lo que hago con ellos es leerlos como patrón (3.0) y proponer dónde
aterrizan: `MEJ-004` en el servidor.

### 5.4 La fragilidad del extractor de S-12 (`DOC-07/A-05-06`) · sin cambios

No existe en el grafo de `DOC-02` y no es código de `app-taller`. Va al apartado 6.

### 5.5 Los huecos de cobertura · sin cambios

`DOC-07` 1.7.0, mismo contenido que 2.1.0 citó: 100,00 %, 0 GAP PLAN, 0 anomalías
bloqueantes. Los avisos vivos siguen siendo correcciones de otros agentes o
funcionalidad para `A-15`.

### 5.6 EXP-017 y EXP-019 (`deriva_a: A-12`, no revisados esta sesión) · sin cambios

`DOC-14` 2.0.0 los marca «sin cambios, no revisado de nuevo» para los dos. Siguen sin
proponerse por el mismo motivo que en 2.1.0: cambian lo que el usuario ve y decide —un
aviso de cambios sin guardar, una salida en la pantalla de error—, y eso es funcionalidad,
no deuda técnica. Van al apartado 6. **`EXP-026` (diálogo de borrado) tampoco se ha vuelto
a revisar esta sesión** y sigue por el mismo motivo en el apartado 6.

## 6. Hallazgos para otras piezas

Ninguno se desarrolla aquí y ninguno se registra editando el documento de su dueño.

### 6.1 → `A-15` · Tres hallazgos que son funcionalidad, no deuda

Sin cambios respecto a 2.1.0: `EXP-017` (aviso al abandonar un formulario con cambios sin
guardar), `EXP-026` (el diálogo de borrado no dice qué registro se borra) y `EXP-019` (las
pantallas de error no ofrecen salida). Ninguno se ha vuelto a revisar esta sesión; ninguno
está en `DOC-25` 1.1.1 (comprobado contra `FUN-001` a `FUN-008`, mismo hash que la ronda
anterior).

### 6.2 → `A-15` (y a través suyo, a negocio) · Si la concurrencia está o no en el alcance

Sin cambios: `DOC-14/EXP-003` sigue sin destinatario, sigue demostrando que dos ventanas
del mismo usuario pierden trabajo en silencio, y `A-12` no lo propondrá mientras no haya
respuesta sobre si el sistema debe defenderse de ello.

### 6.3 → `A-15` · Funcionalidad ausente que la automatización topó

Sin cambios: `DOC-07/A-05-11c` (`TC-032`, `TC-033`, `TC-047` sin vector porque no existe
filtro por vehículo/cliente en albaranes ni campo de precio manual en la línea de pieza).

### 6.4 → `A-14` · El censo de defectos sigue sin reflejar lo verificado, tercera ronda que lo señala

`DOC-24` sigue en 1.0.0 con los cuatro defectos «abiertos», mientras `DOC-14` verificó en
vivo —ya en su versión 1.0.0, y sin necesidad de repetirlo en la 2.0.0 porque nada tocó
esa zona— que `BUG-001` y `BUG-002` funcionan. Es la tercera versión de este roadmap que
tiene que cruzar dos documentos para saberlo.

### 6.5 → `A-03` y `S-10` · Cuatro cosas, dos de ellas nuevas y con severidad `high`

1. **Nuevo — `DOC-14/EXP-027`, `high`.** Los `.feature` de `factures` y `nomines` validan
   literales de importe con punto decimal (`121.00 €`, `1299.50 €`) que ya no coinciden
   con lo que la pantalla muestra tras `SPEC 05` (`121,00 €`, `1.299,50 €`). Confirmado en
   vivo sobre `TC-060`; contados a mano otros ocho casos con el mismo patrón
   (`TC-061`, `TC-069` a `TC-073`, `TC-075`, `TC-098` a `TC-100`). No es un defecto de la
   aplicación: es la consecuencia, ya anticipada por escrito en el propio `SPEC 05`, de
   que los `.feature` no se actualizaron con el cambio de formato.
2. **Nuevo — el estado documentado del proyecto ya no es exacto.** `CLAUDE.md` sigue
   anunciando «1 caso vermell: TC-048» y ya no lo es si se ejecutara la suite hoy —aunque
   no se ha vuelto a lanzar `mvn test` para confirmar el número exacto—. No es un DOC-nn y
   `A-12` no lo edita; se deja constancia para que quien mantenga `CLAUDE.md` lo sepa.
3. **`A-05-12` sigue sin corregir** (sin cambios desde 2.1.0): el resumen del front-matter
   de `DOC-05` dice `ui:109/service:1`, su YAML dice `106/4`.
4. **`TC-073` y `TC-075` siguen sin comprobar el IVA** (`A-05-03b`, sin cambios): están en
   verde y no validan `Literal: <ivaEsperado> €` en ningún paso, sobre un requisito que la
   aplicación ya cumple mejor que ellos lo comprueban.

### 6.6 → `S-12` · Cuatro cosas del registro, una nueva

1. **`MEJ-009` necesita censo.** El número lo ha dado `registry.js next`; **A-12 no ha
   escrito en el registro**, que sigue con 8 anclas `MEJ` antes de esta ronda.
2. **La divergencia de estado sigue**: `MEJ-001`, `MEJ-003` y `MEJ-005` deberían figurar
   `accepted` y `MEJ-007`/`MEJ-008` `implemented`; si el registro no lo refleja, sigue
   siendo `proposed` allí. La fuente de verdad del estado es `DOC-16`.
3. **`A-05-06` sigue abierta**, sin cambios.

### 6.7 → `S-05` · Cuarta versión consecutiva sin `DOC-17`

Este roadmap sigue supliendo la ausencia con evidencia de defectos, exploración,
cobertura y lectura de código, y no puede ver la deuda que todavía no ha producido ningún
defecto.

### 6.8 → `S-01` · El grafo sigue sin las tres aristas que `DOC-07/7.2` documentó, pese a la regeneración

`DOC-02` subió a 1.1.0 para añadir `use-submit-guard` y `format-utils`, motivo ajeno a
esta carencia, y las tres aristas que `DOC-07/7.2` señaló como faltantes en 2.1.0
—`albarans-pages → vehicles-service`, `albarans-pages → shared-components`,
`factures-pages → albarans-service`— **siguen sin estar en el grafo**. Verificado a mano
sobre el bloque `edges` de `DOC-02` 1.1.0. Segunda ronda que lo señala.

## 7. Bloque estructurado

```yaml roadmap
version: 1
project: app-taller
run:
  date: 2026-08-23
  kind: analysis_round
  first_run: false
  previous_doc_version: 2.1.0
  commit_sha: 4526cf0589ba5666e9c897510e4c41dea987d442
  new_inputs_this_run: []
  inputs_changed_this_run: [DOC-02-TECNICA.md, DOC-14-EXPLORATORIO.md]
  inputs_absent: [DOC-17-DEUDA-TECNICA.md, DOC-20-RALLY-STATE.json, DOC-19-RALLY-TESTCASES.csv]
  ids_granted_by: S-12
  ids_requested_this_run: 1
  ids_granted: [MEJ-009]
  worktree_note: >-
    El worktree estaba 12 commits detrás de master al empezar (mismo merge-base que HEAD,
    cero commits propios); se avanzó en fast-forward antes de leer nada. Sin ese paso este
    documento habria regenerado sobre DOC-02 1.0.0 y DOC-14 1.0.0, ya superadas.
decision_of_record:
  date: 2026-08-17
  by: propietario del proyecto
  accepted: [MEJ-001, MEJ-003, MEJ-005]
  rejected: []
  a07_done_for_accepted: false
  note: >-
    Sin decision nueva esta ronda: A-12 propone, decide una persona. MEJ-007 y MEJ-008
    pasaron a implemented por via de /spec, no por una decision de aceptacion formal de
    A-07/A-08.
improvements:
  - id: MEJ-001
    title: Identificadores estables de prueba en la interfaz
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    evidence_change_since_2_1_0: sin cambios
    components: [albarans-pages, clients-pages, vehicles-pages, factures-pages, personal-pages, shared-components]
    impact: low
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer en ninguna ronda.
  - id: MEJ-002
    title: Catálogo único de los literales de error del servidor
    status: proposed
    what: >-
      Extraer los 71 mensajes de error incrustados en las rutas a un módulo único con un
      código estable por mensaje, y devolver ese código junto al texto. No traduce ni
      reescribe ningún literal.
    value: >-
      Un ancla que no se mueve al retocar la redacción de un aviso para los casos
      automatizados, y el punto único desde el que corregir el idioma una vez en lugar de 71.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-006
      - DOC-05/4.11/familia-literal-del-aviso-25-casos
      - codigo/71-literales-en-server-routes-recontados-en-4526cf0-sin-cambios
      - specs/implemented/SPE-01-esquelet-app-taller.md:102
    evidence_change_since_2_1_0: sin cambios
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, api-client]
    impact: medium
    difficulty: low
    urgency: medium
    size: medium
    confidence: medium
    risk_if_not_done: >-
      La corrección del idioma (EXP-006, deriva_a A-14) se escribirá router a router si
      llega antes que el catálogo.
    enters_cycle_via: A-07
  - id: MEJ-003
    title: Suite de pruebas automáticas del servidor y CI mínima
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    implemented: false
    evidence_change_since_2_1_0: sin cambios
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection, db-migrate, db-numbering]
    impact: low
    difficulty: medium
    urgency: high
    size: large
    confidence: medium
    depends_on: [MEJ-006]
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer, ni entera ni troceada.
  - id: MEJ-004
    title: Un sitio donde vivan las reglas de escritura
    status: proposed
    what: >-
      Extraer de los routers la validación de entrada y las reglas de negocio a un módulo
      por dominio. No añade ni cambia ninguna regla; mueve las que ya existen.
    value: >-
      Ataca la causa común de los ocho defectos de escritura y hace que los evolutivos
      aterricen en un sitio con dueño en vez de en ocho parches.
    source: evidence
    evidence_refs:
      - DOC-24/BUG-001
      - DOC-24/BUG-002
      - DOC-24/BUG-003
      - DOC-24/BUG-004
      - DOC-14/EXP-004
      - DOC-14/EXP-005
      - DOC-14/EXP-015
      - DOC-14/EXP-016
      - DOC-02/Q-06
      - codigo/893-lineas-y-86-res.status-en-server-routes-sin-cambios-desde-b2a8d77
    evidence_change_since_2_1_0: sin cambios
    components: [clients-router, vehicles-router, peces-router, albarans-router, factures-router, personal-router, nomines-router, db-connection]
    impact: high
    difficulty: high
    urgency: high
    size: large
    confidence: medium
    risk_if_not_done: El noveno defecto de la misma familia.
    depends_on: [MEJ-003]
    note: >-
      Recomendación de A-12: hacerla con el primer evolutivo, acotada a su dominio, después
      de MEJ-003.
    enters_cycle_via: A-07
  - id: MEJ-005
    title: Estado de base reproducible entre escenarios
    status: accepted
    decided_on: 2026-08-17
    decided_by: propietario del proyecto
    next_step: A-07
    next_step_done: false
    evidence_change_since_2_1_0: sin cambios
    components: [db-seed, db-migrate, db-connection]
    impact: low
    difficulty: low
    urgency: high
    size: small
    confidence: high
    depends_on: [MEJ-006]
    enters_cycle_via: A-07
    note: A-12 no la volverá a proponer en ninguna ronda.
  - id: MEJ-006
    title: Fijar la versión de Node y hacer configurable la ruta de la base
    status: proposed
    what: >-
      Declarar `engines` y `.nvmrc`, y leer la ruta de la base de una variable de entorno
      con el valor actual como valor por defecto.
    value: Habilitador de MEJ-003 y MEJ-005, las dos aceptadas y las dos paradas.
    source: opinion
    evidence_refs:
      - DOC-02/Q-01
      - DOC-02/Q-02
      - codigo/ningun-package.json-declara-engines-y-no-hay-.nvmrc
    evidence_change_since_2_1_0: sin cambios en datos; seis días bloqueando en vez de cinco
    components: [db-connection, server-app]
    impact: low
    difficulty: low
    urgency: medium
    size: small
    confidence: high
    risk_if_not_done: >-
      La CI reproducible de MEJ-003 y la parte de MEJ-005 que apunta a otra base no se
      pueden hacer sin esto.
    blocks: [MEJ-003, MEJ-005]
    enters_cycle_via: A-07
  - id: MEJ-007
    title: Una sola guarda contra el reenvío en los tres puntos de escritura del cliente
    status: implemented
    implemented_via: specs/implemented/SPE-04-proteccio-enviaments-duplicats.md
    implemented_verified_on: 2026-08-23
    what: >-
      Bloquear el envío mientras la petición está en vuelo, en un solo sitio:
      client/src/hooks/useSubmitGuard.ts, consumido por 9 ficheros.
    value: >-
      Cierra EXP-002 (critical) y EXP-001 (high), verificados con red y base de datos, y
      evita que el mecanismo se escribiera tres veces distinto.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-002
      - DOC-14/EXP-001
      - specs/implemented/SPE-04-proteccio-enviaments-duplicats.md
      - codigo/9-ficheros-importan-useSubmitGuard-en-4526cf0
    components: [shared-components, albarans-pages, factures-pages, clients-pages, vehicles-pages, peces-pages, personal-pages, nomines-pages]
    problem_verified_gone: true
    residual_note: >-
      FacturaForm.tsx no tiene reproducción específica de doble envío pero usa el mismo
      hook que los demás; no es una brecha, es ausencia de reproducción puntual.
    enters_cycle_via: n/a (implementada vía /spec, no via A-07 formal)
    note: A-12 no la volverá a proponer.
  - id: MEJ-008
    title: Un único sitio donde se dé formato a importes y fechas
    status: implemented
    implemented_via: specs/implemented/SPE-05-presentacio-imports-i-dates.md
    implemented_verified_on: 2026-08-23
    what: >-
      client/src/utils/format.ts: formatMoney (Intl.NumberFormat) y formatDate
      (Intl.DateTimeFormat), consumidos desde las pantallas que antes formateaban cada una
      por su cuenta.
    value: >-
      0 llamadas a toFixed en client/src (eran 15 en 8 ficheros). Cierra EXP-014 y la parte
      de presentación de EXP-009. Responde P-03.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-014
      - DOC-14/EXP-009
      - specs/implemented/SPE-05-presentacio-imports-i-dates.md
      - codigo/0-toFixed-en-client-src-en-4526cf0
    components: [albarans-pages, clients-pages, factures-pages, nomines-pages, peces-pages, personal-pages, shared-components]
    problem_verified_gone: true
    residual_note: >-
      El defecto de fondo de EXP-009 (pérdida de hora al editar el albarán) sigue abierto;
      es de A-14, fuera del alcance de esta mejora por decisión explícita de SPEC 05.
      EXP-028 (Personal.dataAlta sin formatDate) queda fuera del alcance original y da
      lugar a MEJ-009. La cautela sobre los .feature de automation/ui se ha cumplido:
      EXP-027, dirigido a A-03.
    enters_cycle_via: n/a (implementada vía /spec, no via A-07 formal)
    note: A-12 no la volverá a proponer.
  - id: MEJ-009
    title: Aplicar formatDate a Personal.dataAlta
    status: proposed
    new_this_round: true
    what: >-
      Envolver persona.dataAlta con formatDate en PersonalDetail.tsx, igual que ya se hace
      con salariBase y formatMoney dos líneas más abajo en el mismo fichero.
    value: >-
      Cierra la única inconsistencia de presentación que queda documentada tras MEJ-008,
      con un cambio de una línea sobre un mecanismo ya construido y probado.
    source: evidence
    evidence_refs:
      - DOC-14/EXP-028
      - codigo/PersonalDetail.tsx:68-dataAlta-sin-formatDate
      - codigo/PersonalDetail.tsx:71-salariBase-con-formatMoney
    components: [personal-pages]
    impact: low
    difficulty: low
    urgency: low
    size: small
    confidence: high
    risk_if_not_done: >-
      Ninguno grave: es la inconsistencia visual más pequeña del documento. Se propone por
      el coste casi nulo, no por el riesgo de dejarla.
    enters_cycle_via: A-07
considered_not_proposed:
  - what: Control de concurrencia / bloqueo optimista (DOC-14/EXP-003)
    why: >-
      Decisión de producto, no técnica; sin cambios esta ronda (DOC-14 2.0.0: "no revisado
      de nuevo, se da por vigente"). Va a findings_for_others.
  - what: Condición de carrera y orden textual en generateNumero (DOC-02/Q-03)
    why: better-sqlite3 es síncrono; verificado correcto por DOC-24 y ambas versiones de DOC-14.
  - what: Las correcciones de los ocho defectos de escritura
    why: Son de A-14 (BUG-nnn, EXP-nnn); A-12 los lee como patrón y propone dónde aterrizan.
  - what: Fragilidad del extractor de S-12 (DOC-07/A-05-06)
    why: No es código de app-taller, no existe en el grafo de DOC-02.
  - what: Huecos de cobertura
    why: "DOC-07 1.7.0, sin cambios: 100%, 0 GAP PLAN, 0 bloqueantes."
  - what: EXP-017, EXP-019 y EXP-026 (deriva_a A-12, no revisados esta sesión)
    why: >-
      Cambian lo que el usuario ve o puede hacer; es funcionalidad y la decide negocio. Van
      a findings_for_others.
corrections_to_previous_version:
  - what: ninguna cifra de código requirió corrección esta ronda
    detail: >-
      git diff --stat b2a8d77 HEAD -- server/routes/ no devuelve nada: 893 líneas, 86
      res.status y 71 literales de 2.1.0 siguen siendo correctos.
findings_for_others:
  - target: A-15
    status: sin cambios
    note: >-
      EXP-017 (aviso al abandonar formulario), EXP-026 (diálogo de borrado sin nombre del
      registro) y EXP-019 (pantallas de error sin salida). Ninguno revisado de nuevo esta
      sesión; ninguno en DOC-25 1.1.1.
  - target: A-15
    status: sin cambios
    note: Si la concurrencia (EXP-003) está en el alcance del producto.
  - target: A-15
    status: sin cambios
    note: "Funcionalidad ausente topada por automatización: DOC-07/A-05-11c."
  - target: A-14
    status: sin cambios
    note: >-
      DOC-24 sigue en 1.0.0 con BUG-001/BUG-002 "abiertos" pese a que DOC-14 verificó en
      vivo que funcionan. Tercera ronda que lo señala.
  - target: A-03
    status: nuevo
    note: >-
      DOC-14/EXP-027 (high): los .feature de factures y nomines validan literales con punto
      decimal que ya no coinciden con la pantalla tras SPEC 05. Confirmado sobre TC-060;
      contados a mano 8 casos más. No es defecto de la app.
  - target: A-03
    status: nuevo
    note: >-
      El estado documentado del proyecto ("1 caso vermell: TC-048" en CLAUDE.md) ya no es
      exacto si EXP-027 se materializa al ejecutar la suite. No es un DOC-nn; se deja
      constancia para quien mantenga CLAUDE.md.
  - target: A-03
    status: sin cambios
    note: "A-05-12 (resumen de front-matter de DOC-05 no coincide con su YAML) sigue sin corregir."
  - target: A-03
    status: sin cambios
    note: "TC-073 y TC-075 (A-05-03b) siguen sin comprobar el IVA en su literal."
  - target: S-12
    status: nuevo
    note: "MEJ-009 necesita censo. A-12 no ha escrito en el registro."
  - target: S-12
    status: sin cambios
    note: >-
      Divergencia de estado: MEJ-001/003/005 deberían ser accepted y MEJ-007/008
      implemented en el registro. A-05-06 sigue abierta.
  - target: S-05
    status: sin cambios
    note: Cuarta versión consecutiva sin DOC-17.
  - target: S-01
    status: sin cambios
    note: >-
      Las tres aristas que DOC-07/7.2 señaló como ausentes siguen ausentes en DOC-02 1.1.0
      pese a la regeneración por otro motivo. Segunda ronda que lo señala.
registry_check:
  command: registry.js next registro-ids.json --prefix MEJ --count 2
  result: "8 existentes, máximo 8; siguientes libres: MEJ-009, MEJ-010"
  used: [MEJ-009]
  written_by_a12: false
summary:
  total: 9
  new: 1
  implemented_this_round: 2
  still_open: 4
  accepted_not_started: 3
  implemented: 2
  rejected_respected: 0
  rejected_total: 0
  evidence_grown: []
  evidence_shrunk: []
  by_source: { evidence: 8, opinion: 1 }
  considered_not_proposed: 6
  findings_for_others: 12
  recommended_top3_among_undecided: [MEJ-009, MEJ-006, MEJ-002]
  never_propose_again: [MEJ-001, MEJ-003, MEJ-005, MEJ-007, MEJ-008]
```
