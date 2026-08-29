---
doc_id: DOC-07
doc_name: DOC-07-TRAZABILIDAD
version: 1.11.0
status: draft
generator: A-05 coherencia y trazabilidad
generated_at: 2026-08-29T12:00:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: spec-SPE-06-albara-canvi-client
  commit_sha: 6d52c5eaa4c630879dfdd772869c56c2285d553f
  working_tree_clean: false   # sin versionar y ajeno a este documento: ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/, promptDashboard.txt. El resto del árbol versionado está limpio; este documento y su -HIST en edición.
inputs:
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.3.1
    hash: sha256:88315e350dec166c4a187efdad835cddb450c8688c030650daa2c86cafc03f19
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.8.0
    hash: sha256:fef49cbc57eec8822b3b5482471ffb205d149bb638bbc76c28f1bf4de6d17cb1
  - id: registro-ids.json
    from: S-12
    version: 1.6.0
    hash: sha256:10a49e22b052dc50f9006d5ef533559b0f0602b3ccd35c3b53aef37dc3f7cf09
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    version: 1.4.0
    hash: sha256:2bf33fc38e84b32da3d0edea4d0995f37f746aef91ccc232c46cfa1b11b5ad66
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 2.1.0
    hash: sha256:894b67deddc0eb3e9c687dc16aba472c9c771abe09bd3effffa114dcb0e85a8d
  - id: DOC-14-EXPLORATORIO.md
    from: A-10
    version: 2.1.0
    hash: sha256:f1449e133c2eacf224467c55c01d9bcc4fb6bee9443d239fd27867ae1cd5b7ee
  - id: DOC-23-INFORME.md
    from: S-10
    version: 2.2.0
    hash: sha256:33ac58bcf4188dddccce71aa88bd2f4174af74c1c291032f302ec68fddd84c47
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
  - id: DOC-27-INFORME-API.md
    from: S-17
    version: 1.0.0
    hash: sha256:178d4b14e0202ec9f8846b661f1dda465e552cb6d3aa5f563e19d9b9c5b82573
  - id: DOC-19-RALLY-TESTCASES.csv
    from: S-07
    version: n/d
    present: false
  - id: DOC-20-RALLY-STATE.json
    from: I-01
    version: n/d
    present: false
---

# DOC-07 · Coherencia, cobertura y trazabilidad — app-taller

> Este documento refleja **solo el estado actual**. El historial de versiones vive en
> **`docs/DOC-07-TRAZABILIDAD-HIST.md`**.

## 1. Resumen de cobertura

**La cobertura de requisitos por casos de prueba definidos es del 100,00 % (81 de 81
requisitos cubiertos, 0 GAP PLAN).** Los 119 casos de DOC-05 1.8.0 se reparten sobre los
81 requisitos de DOC-04 1.3.1: 50 requisitos tienen un caso, 25 tienen dos, 5 tienen tres
y uno —REQ-042— tiene cuatro. No hay ningún requisito sin prueba, ningún caso huérfano,
ninguna referencia rota y **ninguna anomalía bloqueante**: nada de lo comprobado aquí
impide avanzar a la Fase 3.

### Qué cambia en 1.11.0

**MINOR: dos requisitos nuevos entran en cobertura, la matriz vuelve a cerrar al 100 %.**
`SPE-06 · Albarà canvi de client` está `Implemented`, y con él DOC-04 sube a **1.3.1** y
DOC-05 a **1.8.0**:

- **DOC-04 1.3.1** añade **REQ-080** (`albarans`, `critical`) —el sistema rechaza por
  completo el intento de mover un albarán no facturado a un vehículo de otro cliente— y
  **REQ-081** (`albarans`, `high`) —el selector de vehículo de la cabecera solo ofrece
  vehículos del cliente actual—. Los 79 requisitos anteriores conservan su `id`; sus
  enunciados solo se retocan donde SPE-06 y `BR-ALB-10` los matizan (DOC-04 1.3.0/1.3.1).
  La pregunta emitida en DOC-04 1.3.0 con `id: Q-16` se **renumeró a `Q-30`** en 1.3.1 por
  colisión con la `Q-16` propia de DOC-05 (regla de gobierno de IDs: cede el reclamante);
  este documento no citaba esa `Q-16`, así que no hay ninguna referencia que reescribir —
  pero sí una consecuencia sobre `A-05-09`, ver §3.8.
- **DOC-05 1.8.0** añade **9 casos, TC-111 a TC-119**, todos en `albarans`, repartidos así
  en la matriz que **regeneró S-14** (commit `621ea3b`, determinista): **REQ-080** →
  `TC-111;TC-113;TC-119`; **REQ-081** → `TC-117;TC-118`; **REQ-040** pasa de `TC-055` a
  `TC-055;TC-112;TC-114`; **REQ-042** suma `TC-115` (`TC-057;TC-058;TC-059;TC-115`);
  **REQ-027** suma `TC-116` (`TC-036;TC-116`). Por vía: 4 `service` (TC-111, TC-113,
  TC-115, TC-116), 4 `ui` (TC-112, TC-114, TC-117, TC-118) y 1 `mixed` (TC-119).
- **`DOC-07-MATRIZ.csv` NO lo ha tocado A-05**: lo regeneró S-14 en `621ea3b` y esta
  ejecución solo pone la narrativa a la par. Verificado: 81 filas, suma de
  `test_case_count` = 119, 3 columnas de Rally en `n/d`, 0 `GAP EXPORT`, 0 `GAP PLAN`,
  81 diagnósticos `Correcto`.

**Qué NO cambia en 1.11.0.** Sigue siendo pasada `pre` —no existen `DOC-19-RALLY-TESTCASES.csv`
ni `DOC-20-RALLY-STATE.json`—, la narrativa de riesgos del §6 sigue sin datos de ejecución,
y **el análisis de las anomalías `A-05-nn` abiertas es el de 1.10.0**: ninguna se abre ni se
cierra por SPE-06. Donde este documento arrastra recuentos de 1.10.0 (79 requisitos, 110
casos, repartos por vía, cinco alcances de §7.1) hay que leerlos con los totales nuevos
—81 y 119— hasta la próxima regeneración completa; los apartados que no cambian de fondo lo
dicen con una línea «Sin cambios desde 1.10.0». DOC-06 sube a 1.4.0 y DOC-09 a 2.1.0: se
han releído, ninguno alimenta el JOIN y su efecto se anota en §2 y §3.8.

---

**A partir de aquí, y hasta la tabla de magnitudes, este apartado se conserva de 1.10.0**:
describe la entrada de `DOC-27` y sigue siendo cierto, pero su «esta versión» es la 1.10.0.

**La cobertura no se ha movido, y el motivo vuelve a no ser de DOC-04 ni de DOC-05.** Esta
regeneración la dispara un documento que **antes no existía**: `DOC-27-INFORME-API.md`
1.0.0, de `S-17`, el informe de ejecución de la suite de servicio. No es una entrada del
JOIN, así que A-05 lo ha comprobado sobre los bytes y no sobre el número de versión: el
bloque `yaml requirements` de DOC-04 y los nueve `yaml testcases` de DOC-05 son
**idénticos, carácter a carácter**, a los que produjeron el CSV de 1.8.0. El CSV sale
igual: md5 `087a03779bd36a00d09f9e87943588c0`, **octava vez consecutiva** — la quinta,
1.6.0, fue la última vez que DOC-05 sí cambió algo con efecto en el JOIN.

**Y sin embargo esta versión no es un resello, y conviene decir por qué desde la primera
página.** Hasta hoy este documento solo tenía una fuente de evidencia de ejecución,
`DOC-23`, que informa exclusivamente de la suite de navegador. Los **cuatro casos
`verification_path: service`** del plan —`TC-041`, `TC-045`, `TC-063` y `TC-064`— estaban
correctamente fuera de ella y **no tenían ninguna fuente que dijera si alguna vez se habían
ejecutado**. §5.5 de 1.9.1 los daba por «correcto: los ejecutará **S-17**», en futuro.
`DOC-27` 1.0.0 convierte ese futuro en un hecho datado: 10 comprobaciones `TCS-nnn`, 10 en
verde, sobre esos 4 casos. Tres consecuencias, ninguna sobre el porcentaje:

1. **La cobertura de ejecución publicada pasa de 102 a 106 de los 110 casos**, sumando dos
   informes de dos suites distintas y declarando cuál dice qué (§5.5). No es una cifra
   nueva de cobertura de requisitos: es que ya no hay cuatro casos sobre los que nadie
   informaba.
2. **`verification_path` deja de ser, para esos cuatro casos, un campo puramente
   declarativo.** §5.6 venía diciendo —y lo sigue diciendo para los otros 106— que el campo
   dice por qué vía **se declara** que se ejerce un caso y no si el vector existe en ella.
   Para los cuatro `service` ya existe la comprobación empírica: los cuatro intentos se
   compusieron contra el servicio y los cuatro fueron rechazados con el mensaje esperado
   (§3.11).
3. **Nacen tres avisos nuevos** —`A-05-14`, `A-05-15` y `A-05-16`, §3.14 a §3.16—, los tres
   destapados por leer `DOC-27` y los tres verificados por A-05 en el código o en los
   ficheros de las suites, no dados por buenos de su prosa.

| Magnitud | Valor | vs 1.10.0 |
|---|---:|---|
| Requisitos en DOC-04 | 81 | **+2**: REQ-080 (`critical`), REQ-081 (`high`) |
| Requisitos con al menos un caso (`Correcto`) | 81 | **+2** |
| Requisitos sin ningún caso (`GAP PLAN`) | 0 | = |
| **Cobertura** | **100,00 %** | **=** |
| Casos en DOC-05 | 119 | **+9**: TC-111…TC-119 |
| Casos mapeados a un requisito existente | 119 | **+9** |
| Casos huérfanos o con referencia rota | 0 | = |
| **Anomalías bloqueantes** | **0** | **=** |
| Avisos | 32 | = (ninguna se abre ni se cierra por SPE-06) |
| Casos `verification_path: ui` / `service` / `mixed` | **110 / 8 / 1** | **+4 / +4 / +1** (los 9 nuevos) |
| Casos automatizados y ejecutados por interfaz (DOC-23 2.2.0) | **102 de 119** | denominador +9; los 9 nuevos sin ejecución publicada |
| **Casos ejecutados por servicio (DOC-27 1.0.0)** | **4 de 8** | los 4 `service` nuevos (TC-111/113/115/116) sin fuente todavía |
| **Casos del plan con evidencia de ejecución publicada** | **106 de 119** | denominador +9 |
| Censo de `Q-nnn` con ancla | 30 | **+1**: `Q-30` (DOC-04, desde 1.3.1) |
| `Q-nnn` homónimos sin ancla que colisionan | `Q-30` de DOC-06 | ver **A-05-09**, §3.8 |
| Requisitos con defecto confirmado en el sistema real | **4** | = |
| Filas de la matriz (`DOC-07-MATRIZ.csv`) | 81 | **+2** |

Las filas de magnitud que dependen de un recálculo completo —los cinco alcances de §7.1,
`ui-only`, `A-05-11`, `critical con toda su cobertura por interfaz`— se conservan de 1.10.0
y se re-derivarán en la próxima regeneración; SPE-06 no cierra ninguna pregunta abierta.

**Qué mide y qué no mide ese 100 %.** Las advertencias que este documento arrastra siguen
vigentes y no se repiten enteras: no mide **ejecución en Rally ni resultado** (pasada
`post`), no mide que el requisito describa un **sistema sano** (A-05-03), no mide **en qué
orden puede producirse la evidencia** (A-05-08), no mide **si se sabe qué verá el usuario**
(A-05-10) y no mide **si el caso puede ejercer su vector por la vía que declara**
(A-05-11). De esas cinco, la última acaba de dejar de ser una incógnita para **4 de los
110 casos**: `DOC-27` lo ha comprobado ejecutándolos. Sigue siéndolo para los otros 106,
y para cinco requisitos es un hueco abierto y nombrado (§3.11).

Desde 1.7.0 hay una sexta, y sigue vigente sin cambios en esta versión:

> **El 100 % tampoco mide si un caso verde verifica lo que su título anuncia.**

`EXP-007`, de la exploración libre de A-10, encontró dos casos —**TC-073** y
**TC-075**— que llevan el IVA en el nombre y no comprueban el IVA en ningún paso. El
defecto de sistema que en 1.7.0 tenían detrás está corregido desde 1.8.0 —verificado por
A-05 en `FacturaDetail.tsx` (§3.4)—; **los dos casos siguen sin comprobar el IVA en ningún
paso**, verificado de nuevo sobre `factures.feature` en esta versión. Sigue siendo el
hallazgo **A-05-03b**, §3.4: un verde que no prueba lo que promete sobre un sistema que hoy
sí cumple — riesgo de ceguera ante una regresión futura, no de engaño actual.

**La séptima trampa que 1.8.0 añadió —que el 100 % tampoco caduca cuando la evidencia de
ejecución sí lo hace— deja de tener el ejemplo que la sostenía, y conviene decirlo con la
misma precisión con la que se anunció.** `DOC-23` 2.0.0 era de un día antes de que `SPEC
05` cambiara el separador decimal; esa foto caducada ya no existe como tal, porque `DOC-23`
ha subido dos versiones desde entonces —2.1.0 confirmó los 17 casos afectados contra una
ejecución real, 2.2.0 documenta su corrección y verificación (§2, §3.13, §5.5)—. La trampa
en sí, como advertencia general —una foto de ejecución puede caducar sin que la cobertura
se entere—, sigue siendo cierta y no se retira del catálogo de límites del 100 %; lo que ya
no es cierto es el caso concreto que la ilustraba. Queda un residuo, más pequeño: `DOC-23`
2.2.0 verificó los 18 casos que estaban en rojo con una reejecución dirigida, no con la
suite completa (§5.5), así que el 107 de 107 en verde **tampoco es, todavía, el resultado
de una sola ejecución**.

**Y `DOC-27` estrena su propia trampa, que hay que declarar el mismo día en que se
estrena el documento.** Su ejecución es **una sola**, de 1,75 s, sobre una base que
—deliberadamente— **no se resembró**: el propio informe lo dice y explica por qué (§5 de
`DOC-27`: «comprobar que la colección es repetible sobre una base ya usada es parte de lo
que se quería verificar. Un informe de entrega sí debería partir de `npm run seed`»). Es
una decisión defendible y bien argumentada, y aun así deja el mismo residuo que este
documento le anotó a `DOC-23` 2.2.0 por otro motivo: **el verde de los cuatro casos de
servicio todavía no procede de una ejecución hecha en condiciones de entrega.** No es
motivo para desconfiar de la cifra —el informe mide el estado de la base antes y después y
sale idéntico, 12 facturas, 37 albaranes y stock 37—, es la clase de matiz que aquí no se
calla.

Ninguno de los cuatro requisitos con defecto confirmado baja la cobertura ni un punto, y
tampoco lo hacen los tres avisos nuevos: cambian lo que el 100 % significa, no cuánto
vale.

## 2. Qué pasada se ha ejecutado y por qué

**Se ha ejecutado únicamente la pasada `pre`.** El disparo esta vez es
`SPE-06 · Albarà canvi de client`, ya `Implemented`: DOC-04 y DOC-05 cambian de contenido
—dos requisitos y nueve casos nuevos— y S-16 marcó DOC-07 obsoleto por ambas entradas.

| Entrada | Estado | Consecuencia |
|---|---|---|
| `docs/DOC-04-FUNCIONAL.md` | presente, **v1.3.1** (era 1.2.0; 1.3.0 añadió REQ-080/REQ-081 por SPE-06, 1.3.1 renumeró `Q-16`→`Q-30`) | **alimenta el JOIN**: +2 filas en la matriz |
| `docs/DOC-05-PLAN-PRUEBAS.md` | presente, **v1.8.0** (era 1.6.0; añade TC-111…TC-119, todos `albarans`) | **alimenta el JOIN**: +9 casos |
| `registro-ids.json` | presente, hash nuevo — ahora **81 REQ, 119 TC, 30 Q** (`Q-30` de DOC-04 concedida por S-12 en el ciclo de DOC-04 1.3.1); `FUN`/`MEJ`/`EVO` sin cambios | verificación de anclas: los 81 REQ y los 119 TC están en el registro (0 fuera) |
| `docs/DOC-23-INFORME.md` | presente, v2.2.0 (sin cambios desde 1.10.0) | **no toca la matriz**; alimenta §5.5; los 9 casos nuevos aún no tienen ejecución publicada |
| `docs/DOC-14-EXPLORATORIO.md` | presente, v2.1.0 (sin cambios desde 1.10.0) | **no toca la matriz** |
| `docs/DOC-09-IMPACTO-…md` | presente, **v2.1.0** (era 2.0.4; MINOR de resincronización de A-07 contra DOC-07 1.10.0) | **no toca la matriz**; releída, sus citas a la matriz siguen siendo ciertas |
| `docs/DOC-06-MANUAL-USUARIO.md` | presente, **v1.4.0** (era 1.3.0; documenta REQ-080/REQ-081, añade su pregunta propia `Q-31`) | **no toca la matriz**; alimenta ⑤, A-05-09 y A-05-10; su `Q-30` homónima colisiona ahora con la de DOC-04 (§3.8) |
| `docs/DOC-24-BUGS.json` | presente, v1.0.0 (sin cambios) | **no toca la matriz**; alimenta A-05-03 |
| `docs/DOC-27-INFORME-API.md` | presente, v1.0.0 (sin cambios desde 1.10.0) | **no toca la matriz**; fuente de ejecución de los 4 casos `service` de 1.6.0; no cubre los 4 `service` nuevos |
| `docs/DOC-19-RALLY-TESTCASES.csv` | **ausente** | no hay exportación a Rally que comprobar |
| `docs/DOC-20-RALLY-STATE.json` | **ausente** | no hay estado de ejecución que leer |

Al no existir DOC-19 ni DOC-20, las columnas `exists_in_rally`, `executed` y `result`
valen **`n/d`** en las 81 filas del CSV. No valen «No»: «No» afirmaría que el caso no
está en Rally o que no se ha ejecutado, y eso es un dato que nadie ha medido. Por la
misma razón, los únicos diagnósticos emitidos son `Correcto` y `GAP PLAN`; **el CSV no
contiene ni un solo `GAP EXPORT`**, que en esta pasada sería un dato inventado
(verificado: 0 ocurrencias de la cadena en el fichero).

**`DOC-27` pregunta directamente a A-05 si su suite entra en el Go/No-Go, y la respuesta
va aquí porque es una pregunta de contrato, no de criterio.** La pregunta 2 de su §6 dice:
«`DOC-07` cruza cobertura contra `DOC-23`; con este documento ya se puede citar también
para los 4 casos de servicio, pero eso lo decide `A-05`». **Sí, y por la misma puerta por
la que entra `DOC-23`: como evidencia citada en la prosa, con su procedencia al lado —y no
como columna del CSV.** Las tres columnas `exists_in_rally`, `executed` y `result` tienen
un contrato que nombra **una sola** fuente, `DOC-19` y `DOC-20`; meter en `result` lo que
dice una suite local —de navegador o de servicio, da igual— mezclaría dos fuentes en una
columna que nombra una, y el primer consumidor que hiciera `join` con `DOC-20` encontraría
contradicciones sin saber de dónde vienen. Lo que sí cambia, y no es poco, es que a partir
de esta versión **hay evidencia de ejecución citable para 106 de los 110 casos en vez de
para 102**, y para los 4 que faltaban no había ninguna. Si el Go/No-Go debe **exigir** esa
evidencia antes de aprobar, eso ya no es de A-05: es criterio de **A-11**.

**DOC-23 y DOC-27 son las dos entradas que más cerca están de tentar a escribir la pasada
`post`, y juntas la tentación es mayor todavía: ya no hay ni un caso en rojo en ninguna de
las dos suites.** `DOC-23` 2.2.0 declara 102 casos automatizados y ejecutados y **107 de
107 escenarios en verde**; `DOC-27` 1.0.0 declara **10 de 10 comprobaciones en verde** sobre
los 4 casos restantes (§5.5). Es ejecución real de casos reales del plan —no como DOC-24,
que ejercía la aplicación—, así que la tentación es legítima y hay que contestarla con
precisión: **la pasada `post` no es «¿se ha ejecutado algo?», es «¿qué dice Rally?»**. Las tres columnas del CSV son
`exists_in_rally`, `executed` y `result`, y las tres se llenan desde `DOC-19` y `DOC-20`.
Ninguno de los 110 casos está en Rally, así que la respuesta a la primera columna sigue
siendo que nadie la ha mirado. Rellenar `result` con lo que dice DOC-23 mezclaría dos
fuentes en una columna cuyo contrato nombra una sola, y el primer consumidor que hiciera
`join` con DOC-20 encontraría contradicciones sin saber de dónde vienen. DOC-23 entra en
este documento **como evidencia en la prosa**, que es donde puede ir acompañada de su
procedencia, y no en el CSV.

**Quién ha disparado esta regeneración, y por qué esta vez no ha sido S-16.** Las cinco
anteriores las disparó `S-16 · Cascada de obsolescencia` comparando la versión declarada en
el bloque `inputs` con la vigente en el repositorio. **Esta no ha podido dispararla S-16, y
es estructural, no un descuido**: `DOC-27` es un documento **nuevo**, ningún `inputs` de
ningún documento lo declaraba —no podía declararlo, no existía— y la cascada solo compara
lo declarado. Un documento que nace es invisible para el control de obsolescencia hasta que
alguien lo declara por primera vez. El disparo, por tanto, ha sido humano.

**Esa es la segunda razón por la que `DOC-27` se declara en `inputs` y no solo se cita en
la prosa.** La primera es la de siempre —declarar de dónde viene lo que se afirma—; la
segunda es que a partir de ahora **S-16 sí vigilará** que este documento no se quede atrás
cuando `S-17` vuelva a ejecutar la suite. La foto de una ejecución caduca, y este documento
lleva dos versiones diciéndolo de `DOC-23`; sería incoherente no ponerle el mismo control a
`DOC-27` el día que nace.

`DOC-23` subió dos veces el mismo día —2.0.0 → 2.1.0 (TC-048 corregido, 17 rojos nuevos
diagnosticados con causa única `EXP-027`, un rojo aislado de infraestructura) y 2.1.0 →
2.2.0 (los 18 corregidos y verificados, y una atribución de la propia 2.1.0 corregida:
el rojo de infraestructura era `TC-103`, no `TC-029` como decía esa versión)—, y A-05 ha
leído la 2.2.0 completa, no un resumen de la 2.1.0 que el prompt que dispara este ciclo
citaba: **S-16 y el propio repositorio son la fuente de verdad sobre qué versión es la
vigente, no la descripción con la que empieza la tarea.** Es el uso exacto para el que
existe el bloque `inputs` con versión y hash, y la razón por la que la procedencia se
queda en este documento y **no** se va al fichero de historial.

**Qué cambió DOC-05, por qué no mueve la matriz, y un error de 1.9.1 que se corrige aquí.**
Nada en el contenido: los dos únicos movimientos son resellos de procedencia —«Resync DOC-05
procedencia against DOC-23 2.1.0» (`e23348b`) y **«Resincronizar DOC-05 contra DOC-23 2.2.0»
(`7f2000f`)**—, que actualizan la entrada `DOC-23` de su propio bloque `inputs` y su
`commit_sha`, sin tocar ningún `id`, `external_id`, `requirement`, `priority` ni `steps` de
los 110 casos. A-05 no se lo cree por deferencia —lo comprueba volviendo a ejecutar el
JOIN— y el CSV sale **byte a byte idéntico por octava vez consecutiva**.

**El error que se corrige: 1.9.1 declaró de DOC-05 el hash `sha256:d338297a…`, que es el
del primer resello, cuando en el árbol ya estaba el segundo, `sha256:43051f32…`.** Es el
hash lo que S-16 compara, así que un hash desfasado en `inputs` es exactamente el fallo
silencioso que este documento persigue en otros: mientras estuvo así, S-16 habría avisado
por una diferencia que ya se había resuelto. Se corrige en el bloque `inputs` de esta
versión, y la comprobación que lo destapó es la de siempre —recalcular el hash de cada
entrada en vez de arrastrarlo—. Con esto, además, **queda sin objeto el matiz que 1.9.1
anotaba**: A-05 escribió entonces que DOC-05 «sigue citando la 2.1.0» de DOC-23; A-03 ya lo
resincronizó contra la 2.2.0, y lo hizo antes de que 1.9.1 se publicara. La cita era
correcta en el momento de escribirse y dejó de serlo antes de imprimirse; se retira.

**Qué cambió DOC-14 y DOC-09, y por qué no obliga a recalcular la matriz.** Los dos son
resellos de PATCH sin exploración ni análisis nuevos, y ninguno toca `REQ-nnn` ni `TC-nnn`.
**`DOC-09` ha recibido dos resellos desde que 1.9.1 lo leyó**, no uno: `3606266`
(2.0.2 → 2.0.3, resincronización contra `DOC-07` 1.9.0 y `DOC-23` 2.2.0) y `2bbd4fe`
(2.0.3 → 2.0.4, tras el cierre de `EXP-027` en `DOC-14` 2.1.0). **A-05 no se ha fiado de que
los dos sean «solo front-matter»: ha extraído el cuerpo de las tres versiones —todo lo que
va después del segundo `---`— y ha comparado los bytes.** Las tres dan el mismo
`sha256:a3d63770…` sobre 917 líneas: **el cuerpo de 2.0.4 es idéntico al de 2.0.2**, así que
los dos pasajes que este documento cita de `DOC-09` —las tres aristas ausentes de §2.3 (§7.2)
y el enunciado de REQ-040 de §3.1 (fila de REQ-040 en §4)— siguen diciendo exactamente lo
mismo. `S-16` ya avisa de que un PATCH «no invalida» (§ salida de la herramienta), y aquí
está comprobado en vez de supuesto: mismo `test_case_count` por requisito, mismo CSV.

**Por qué el hash de DOC-05, `registro-ids.json` y DOC-06 ha cambiado sin que su `version`
se mueva, y por qué no es una anomalía.** Además del resello de DOC-05 ya descrito, un
commit ajeno a A-05 —«Prefixar 'SPE-' als fitxers d'especificacio»— renombra los ficheros
de `specs/` con el prefijo `SPE-` y actualiza las referencias cruzadas a esas rutas en
`registro-ids.json` y en varios `DOC-nn`, incluido `DOC-06`. Ninguno de los dos toca un
`REQ-nnn`, un `TC-nnn` ni el recuento de anclas: A-05 ha vuelto a contar `registro-ids.json`
y sigue en `ACT=1 UC=40 BR=37 REQ=79 TC=110 Q=29 FUN=12 MEJ=8 EVO=1`, exactamente lo que
1.8.0 ya declaraba. El `version` de cada documento —el número que gobierna si hay que
rehacer el JOIN— no se mueve porque no hay contenido de requisito o caso que haya cambiado;
el hash sí, porque incluye cada byte del fichero, y por eso el bloque `inputs` de este
documento lo declara actualizado: es exactamente la garantía por la que existe el hash, y
la razón por la que A-05 no se fía del número de versión en solitario cuando puede
comprobar el contenido.

### Método

La matriz la construye la skill **S-14 · Matriz de trazabilidad**:

```
node scripts/matriz.js --doc04 docs/DOC-04-FUNCIONAL.md --doc05 docs/DOC-05-PLAN-PRUEBAS.md
                       --registro registro-ids.json --out docs/ --json
```

Extrae el bloque `yaml requirements` de DOC-04 y los nueve bloques `yaml testcases` de
DOC-05, cruza el campo `requirement` de cada caso contra el `id` de cada requisito y
escribe el CSV. No se ha leído prosa para construir ninguna fila. **Código de salida 0**:
sin anomalías bloqueantes.

Del mismo `--json` salen, sin reinterpretación, el bloque `execution` y el bloque
`automation`. Lo que A-05 calcula por su cuenta, con parser propio y siempre sobre
bloques YAML —nunca sobre prosa—: el reparto de `verification_path` y su cruce con la
matriz (§5.6), el censo de `Q-nnn` de los tres documentos, los cinco alcances del
apartado 7 y el cruce entre la matriz y el plan de ejecución del §5.4. La verificación de
identificadores se hace con **S-12 en modo lectura**.

**Las verificaciones que A-05 ha hecho fuera de todo YAML, y por qué.** Este documento se
permite afirmar que casos concretos no pueden ejecutarse por la vía que declaran, o que un
comportamiento del sistema no está enunciado en ningún requisito, y una afirmación de ese
peso no se sostiene en la lectura de otro agente. Así que las veces que la hace, la
comprueba él mismo: `DataTable.tsx` y `AlbaraLiniesSection.tsx` para A-05-11c (§3.11),
`FacturaForm.tsx` para A-05-11a, `FacturaDetail.tsx` y los `.feature` para A-05-03b y
A-05-13. **En esta versión se añaden tres, todas nacidas de leer `DOC-27`**:
`server/routes/albarans.js` para A-05-15 (§3.15), el fichero de la colección Postman para
las aserciones que A-05-14 discute (§3.14) y `automation/ui/…/albarans.feature` para el
escenario de TC-056. Lo que se cita es lo que esos ficheros hacen, no una interpretación de
lo que hacen.

**Ni DOC-23, ni DOC-27, ni DOC-14, ni DOC-09, ni DOC-24, ni DOC-06 convierten esto en una
pasada `post`.** S-10 ha ejecutado una **suite de navegador** contra un entorno local, S-17
ha ejecutado una **colección de servicio** contra ese mismo entorno local, A-10 ha explorado
*la aplicación* a mano, A-07 ha analizado un *impacto* leyendo código, A-14 ha ejercido *la
aplicación* por servicio y A-04 ha escrito *un manual*. Ninguno de los 110 casos está en
Rally y ninguno tiene resultado **en Rally**, que es lo que las tres columnas `n/d`
preguntan.

### Procedencia

El bloque `inputs` declara el dato; aquí van los matices, que es donde se pueden leer como
prosa y no inflan lo que todos los parsers leen primero.

**`DOC-27-INFORME-API.md` 1.0.0 es la entrada nueva de esta versión y la que la dispara.**
Se declara con `version: 1.0.0` y su hash porque es un documento versionado con historial
propio (`DOC-27-INFORME-API-HIST.md`, leído también: registra su 1.0.0 como MAJOR por ser
la primera y fija el esquema para las siguientes). Qué aporta que no aportara nadie: **la
única fuente de evidencia de ejecución de los 4 casos `verification_path: service`**. Cómo
se ha usado: como se usa `DOC-23` —evidencia citada en la prosa de §3 y §5, nunca dato de
una columna del CSV—. Qué **no** se ha hecho con él: no se ha usado para derivar ninguna
fila, ningún `test_case_count` ni ningún diagnóstico, porque no es una entrada del JOIN.

**Y una nota de procedencia sobre el propio DOC-27 que conviene dejar escrita.** Su bloque
`inputs` declara `DOC-05-PLAN-PRUEBAS.md` 1.6.0 con hash `sha256:43051f32…` — **el mismo
que A-05 verifica hoy en el árbol**, y el que este documento corrige respecto de 1.9.1.
Dicho de otro modo: `DOC-27` y `DOC-07` 1.10.0 leen exactamente los mismos bytes del plan
de pruebas, y por eso sus recuentos de casos `service` coinciden sin necesidad de
conciliarlos (§3.12).

**DOC-05 1.6.0 y DOC-14 2.0.0 fueron las entradas que dispararon 1.7.0 y 1.8.0
respectivamente.** Sus saltos están descritos en esas versiones y en el `-HIST.md`. Sigue
mereciendo recordarse que el anexo de DOC-05 cita a este documento como origen de
A-05-11a, y que `DOC-14` 2.0.0 confirmó en vivo el cierre de `EXP-007` que sostenía media
`A-05-03b`.

**DOC-23 es, con esta, la tercera vez que dispara una regeneración de este documento sin
alimentar nunca el JOIN**, y las tres veces ha aportado algo que ningún otro documento
tenía: en 1.7.0, qué casos se pudieron automatizar y cuáles no (A-05-11c); en 1.8.0, junto
con `DOC-14`, la fecha de caducidad de su propia foto de ejecución (A-05-13); en esta,
**la corrección de las dos cosas anteriores**. `DOC-23` 2.1.0 confirmó con una ejecución
real —no con la lectura de código que sostenía A-05-13 hasta entonces— los 17 casos exactos
afectados por el formato de decimales, más un caso aislado de infraestructura y el
aislamiento TC-040/TC-048 ya diagnosticado en 1.8.0 (§3.7). `DOC-23` 2.2.0, el mismo día,
documenta que los 18 quedaron corregidos y reverificados —con una reejecución dirigida a
esos 18 casos, no con la suite completa, matiz que se arrastra a §5.5— y corrige una
atribución errónea de su propia versión anterior (el rojo de infraestructura era `TC-103`,
no `TC-029`). A-05 no ha dado ese cierre por bueno por venir declarado: ha verificado
directamente en `client/src/utils/format.ts` y en los cuatro `.feature` afectados
(`factures.feature`, `nomines.feature`, `peces.feature`, `albarans.feature`, commit
`5366e18`) que los literales que antes citaban punto decimal ahora citan coma decimal y el
espacio no separable (`U+00A0`) que produce `Intl.NumberFormat('es-ES', …)` — mismo método
que ya usó para A-05-11c y A-05-13: no se afirma nada de este peso sobre la lectura de otro
agente sin comprobarlo en el código.

**`DOC-09` 2.0.4 y `DOC-14` 2.1.0 son resellos de PATCH sin contenido nuevo relevante para
A-05**: se han vuelto a leer para comprobarlo, no se han dado por buenos por inercia. En el
caso de `DOC-09` hay además un error propio que se corrige aquí y conviene nombrar sin
adornos: **el borrador de esta versión actualizó el hash de esa entrada y heredó el número
de versión de 1.9.1**, de modo que `version: 2.0.2` y el hash describían dos estados
distintos del mismo fichero — la declaración decía haber leído la 2.0.2 y el hash probaba
que se había leído la 2.0.4. Para `cascada.js` no era bloqueante, porque el salto es PATCH;
como declaración de procedencia era falsa, que es peor. **Es exactamente la deriva que §3.12
persigue en el front-matter de otro documento**: un dato derivado que deja de derivarse. Se
declara 2.0.4, que es lo que corresponde al hash.
`DOC-06` 1.3.0 y `DOC-24` 1.0.0 cambian de hash o se mantienen por motivos ya descritos en
§2 (renombrado de rutas `SPE-` el primero; sin cambios el segundo).

**`DOC-14` 2.1.0 es la versión vigente y este documento no apoya en ella ninguna
afirmación.** Su único cambio de contenido —`EXP-027` pasa a `estado: corregido`— es la
misma evidencia que A-05 ya había verificado por su cuenta, código en mano, al cerrar
`A-05-13` (§3.13). Se declara en `inputs` porque es una entrada real; el análisis de por qué
no movió nada está en `DOC-07-TRAZABILIDAD-HIST.md`, entrada 1.9.1, y no se repite aquí.

**`registro-ids.json`** no lleva versión propia como fichero de datos que es; se declara
con la del ciclo (1.6.0) y con su hash, que es lo que S-16 compara. Su hash cambia desde
1.8.0 por el mismo renombrado de rutas `SPE-`, no por contenido de anclas: `ACT=1 UC=40
BR=37 REQ=79 TC=110 Q=29 FUN=12 MEJ=8 EVO=1` —**317 anclas, exactamente las mismas que en
1.8.0**—. El hash se declara actualizado porque cambió; la versión del ciclo (1.6.0) no,
porque ningún `REQ-nnn` ni `TC-nnn` se ha tocado.

**DOC-19 y DOC-20** se declaran con `present: false` y `version: n/d`. No es un descuido:
no existen, y una versión inventada para un fichero ausente haría que S-16 empezara a
comparar contra un número que nadie ha escrito.

**Por qué el front-matter de este documento ha adelgazado de 184 líneas a 55.** Hasta
1.6.0 el bloque llevaba `version_reason`, `counts`, `execution`, `automation`,
`verification_path` y una nota `usage` por entrada: el 12 % del fichero, y buena parte
duplicaba cifras que el cuerpo ya daba con su contexto. El contrato de A-05 dice que el
front-matter declara **de dónde viene** el documento y nada más. Las cifras están en §1 y
§5, donde se pueden leer; el motivo del salto de versión, en `DOC-07-TRAZABILIDAD-HIST.md`,
que es su sitio; y los matices de cada entrada, en esta «Procedencia». **No se ha perdido
ningún dato: se ha movido cada uno a donde se lee.**

## 3. Anomalías

**Sin cambios de fondo desde 1.10.0.** SPE-06 no abre ni cierra ningún hallazgo `A-05-nn`:
el censo sigue en **32 avisos** y **0 bloqueantes**. Los dos requisitos y los nueve casos
nuevos pasaron las reglas de S-14 sin novedad (§3.1). La única anomalía que SPE-06 toca es
`A-05-09`: la renumeración `Q-16`→`Q-30` en DOC-04 1.3.1 hace que ese `Q-30` colisione con
el `Q-30` homónimo y sin ancla de DOC-06 (§3.8). El resto de subapartados de §3 conserva su
análisis de 1.10.0; donde citan «79 requisitos» o «110 casos», léase 81 y 119.

### 3.0 El censo de avisos, enumerado

Este documento declara **32 avisos**: los 17 de una sola regla de S-14 (§3.2) y **15
hallazgos propios de A-05 abiertos**. `A-05-11a` y `A-05-13`, cerrados y mostrados por
última vez en 1.9.x, **salen ya del censo**; su historia vive en
`DOC-07-TRAZABILIDAD-HIST.md`:

| Hallazgo | Qué dice | Estado en 1.10.0 | Corrección de |
|---|---|---|---|
| **A-05-01b** | REQ-055 y REQ-073 no tienen consecuencia observable que verificar | abierto, sin cambios | A-06 → A-03 |
| **A-05-03** | Cuatro requisitos con cobertura verde y defecto confirmado | abierto, decidido y vigilado | decidido (Q-19) |
| **A-05-03b** | TC-073 y TC-075 anuncian el IVA en su nombre, están verdes y no lo comprueban | abierto, sin cambios de fondo; reverificado en verde tras la corrección de A-05-13 | **A-03** (solo; el mantenedor ya no tiene nada pendiente aquí) |
| **A-05-04** | Una regla afirmada que nunca llegó a ser requisito | abierto por la mitad de DOC-04 | A-02 |
| **A-05-06** | El censo de `Q-nnn` depende del orden de las claves | abierto, exposición sin cambios: 34 | S-12 |
| **A-05-08** | Dos requisitos `high` con toda su evidencia en la ola 1 | abierto, sin cambios | S-06 / DOC-13 |
| **A-05-08b** | Tres `critical` de caso único dentro del carril serial de 17 | abierto: el riesgo estructural sigue sin corregirse aunque su único caso materializado (TC-040/TC-048) ya esté parcheado | S-06 / DOC-13 |
| **A-05-09** | `Q-30` vive en DOC-06 y no tiene ancla | abierto, sin cambios | quien tenga shell → A-04 |
| **A-05-10** | Una superficie de interfaz no documentada, medida por tres agentes | abierto, sin cambios | A-02 + mantenedor |
| **A-05-11b** | Tres casos ejercen solo una mitad de un vector de dos | abierto, sin cambios | A-03 |
| **A-05-11c** | TC-032, TC-033 y TC-047 declaran `ui` y no tienen vector en la interfaz | abierto, sin cambios desde 1.7.0 | **A-03** (vía) + producto (funcionalidad) |
| **A-05-12** | El resumen `verification_path` del front-matter de DOC-05 no coincide con su propio YAML | abierto, sin cambios desde 1.7.0 | **A-03** |
| **A-05-14** | `TC-041` ya se ejecuta, pero 3 de sus 4 pasos describen la pantalla y se han ejecutado por servicio; el paso 2 no lo ejerce nadie | **nuevo**, origen `DOC-27` §2 | **A-03** (el paso), S-10 si se separa |
| **A-05-15** | Borrar un albarán no devuelve al stock las piezas de sus líneas; ningún requisito dice si debe hacerlo y ningún caso lo comprueba | **nuevo**, origen `DOC-27` §4.1, verificado en el servidor | **producto / A-02** (enunciado) + **A-03** (`touches` y precondición) |
| **A-05-16** | La familia `TCS-nnn` nace fuera de `registro-ids.json` | **nuevo**, origen `DOC-27` §6.1 | **S-12** + decisión de proyecto |

1.6.0 declaró **27** (17 + 10); 1.7.0 declaró **29** (17 + 12); 1.8.0 declaró **30**
(17 + 13); 1.9.0 y 1.9.1 declararon **29** (17 + 12). **1.10.0 declara 32** (17 + 15): no
se cierra ninguno y nacen tres.

**Los tres nacen del mismo sitio, y eso es lo que más dice de ellos.** No los ha encontrado
un barrido del YAML ni una relectura de DOC-04: los ha encontrado **leer el informe de una
suite que se ejecutó**. Es la tercera vez que ocurre lo mismo —`DOC-23` 2.0.0 destapó
A-05-11c, `DOC-23` 2.1.0 convirtió A-05-08b en un hecho, y ahora `DOC-27` 1.0.0 destapa
tres—, y refuerza sin proponérselo la respuesta a la pregunta 4 de §7.3: **ejecutar es hoy
el único método que ha demostrado encontrar estas cosas.** Un plan de pruebas se puede leer
mil veces sin que aparezca ninguno de los tres.

### 3.1 Bloqueantes — **ninguna**

Las seis reglas bloqueantes de S-14 se han ejecutado sobre DOC-05 1.8.0 (matriz regenerada
por S-14 en `621ea3b`, código de salida 0) y todas pasan:

| Regla | Qué comprueba | Resultado |
|---|---|---|
| `caso_huerfano` | Caso sin `requirement` | 0 de 119 |
| `referencia_rota` | `requirement` → `REQ-nnn` inexistente en DOC-04 | 0 de 119 |
| `sin_external_id` | Caso sin `external_id` (la reimportación duplicaría) | 0 de 119 |
| `external_id_duplicado` | Dos casos con el mismo `external_id` | 0 (119 valores distintos) |
| `id_duplicado` | Dos casos con el mismo `TC-nnn` | 0 (119 IDs distintos) |
| `fuera_de_registro` | REQ o TC ausente de `registro-ids.json` | 0 de 81 REQ, 0 de 119 TC (REQ-080/081 y TC-111…119 verificados en el registro) |

Las cuatro reglas de aislamiento y automatización:

| Regla | Qué comprueba | Resultado |
|---|---|---|
| `dependencia_inexistente` | `depends_on` → `TC-nnn` que no existe | 0 |
| `dependencia_propia` | Caso dependiente de sí mismo | 0 |
| `ciclo_dependencias` | Casos que se esperan entre sí | 0 (sin ciclo) |
| `grado_automatizacion_invalido` | `grade` fuera del vocabulario | 0 de 119 |

Comprobaciones adicionales de A-05, fuera del alcance de la skill:

| Comprobación | Resultado |
|---|---|
| Anclas del registro sin contrapartida en documento | 0 de las 218 que A-05 vigila (79 REQ, 110 TC, 29 Q) |
| `text` del ancla ≠ `statement` del requisito en DOC-04 | 0 de 79 |
| `text`, `requirement` y `external_id` del ancla ≠ los del caso en DOC-05 | 0 de 110 |
| `text` del ancla ≠ enunciado de la pregunta | 0 de 29 |
| **`verification_path` ausente o fuera del vocabulario `ui` / `service` / `mixed`** | **0 de 110** — nueva |
| **Reparto de `verification_path` declarado por DOC-05 ≠ el que A-05 cuenta** | **DISCREPA** — el front-matter dice 109/1/0 y el YAML dice 106/4/0 · **A-05-12** |
| Módulo del caso distinto del módulo de su requisito | 0 de 110 |
| `external_id` que no sigue el patrón `TALLER-XXX-TC-nnn` | 0 de 110 |
| Requisitos con `status: deprecated` | 0 (los 79 son `active`) |
| Requisitos `critical` cubiertos solo por casos `Low` | 0 de 35 |
| Requisitos `critical` sin ningún caso `Critical` | 0 de 35 |
| Requisitos alcanzados por una pregunta con `resolution: as_designed` | **0 de 79** |
| Cifras de aislamiento declaradas por DOC-05 ≠ las que deriva S-14 | 0 (las once coinciden) |

**Nada impide avanzar a la Fase 3 por motivos de trazabilidad.** El salto de DOC-05 de
1.5.0 a 1.6.0 no ha introducido ninguna bloqueante, y era previsible: cambiar el valor de
`verification_path` en tres casos no puede romper un JOIN que no mira ese campo.

**Y `DOC-27` tampoco introduce ninguna, incluida la que más se le parece.** La regla
`fuera_de_registro` es bloqueante y `DOC-27` estrena una familia de identificadores,
`TCS-nnn`, que **no está en `registro-ids.json`** (verificado: 0 ocurrencias de la cadena
`TCS` en el fichero). No es una bloqueante y conviene decir exactamente por qué, para que
nadie lo lea como una excepción de conveniencia: la regla se aplica a los `REQ-nnn` y
`TC-nnn` **que viajan a Rally**, un `TCS-nnn` no genera fila, no aparece en ninguna columna
del CSV y no puede romper una exportación. Es el mismo criterio con el que `Q-30` es aviso
y no bloqueante desde 1.4.0. Que no sea bloqueante no significa que dé igual: es
**A-05-16**, §3.16.

**Que no haya bloqueantes no significa que no haya nada que decidir antes de exportar.**
Lo que en 1.6.0 era **A-05-11a** ya está resuelto —A-03 reclasificó TC-064 a `service`— y
`DOC-27` acaba de demostrarlo ejecutándolo (§3.11), pero quedan dos cosas en §3.11, una en
§3.4 y una nueva en §3.14, ninguna bloqueante y las cuatro recomendadas antes de que los
casos lleguen a Rally: **A-05-11b** (tres `critical` de caso único que ejercen media mitad
de su vector), **A-05-11c** (tres casos que declaran `ui` sobre una interfaz que no ofrece
su vector), **A-05-03b** (dos casos verdes que no comprueban lo que su nombre anuncia) y
**A-05-14** (un caso verde cuyo paso 2 no lo ejecuta ninguna de las dos suites).

**Y una comprobación de coherencia que esta vez no pasa.** La penúltima fila de la tabla
—el reparto de `verification_path` que DOC-05 declara frente al que A-05 cuenta— **discrepa
por primera vez**: el front-matter de DOC-05 1.6.0 sigue diciendo `ui: 109, service: 1`
mientras su propio YAML dice 106 y 4. No es bloqueante y no toca la matriz, porque A-05
cuenta sobre los datos y nunca sobre el resumen, pero es un dato derivado que ha dejado de
derivarse y hay que corregirlo. Es **A-05-12**, §3.12, corrección de A-03.

La fila que más pesa en el Go/No-Go sigue valiendo cero: **ninguna de las seis respuestas
de negocio ha validado un comportamiento como intencionado.** Las seis son
`gap_confirmed`, en ocho versiones consecutivas.


### 3.2 Avisos de la skill — 17, todos de la misma regla

| Regla | Alcance | vs 1.8.0 | Corrección de |
|---|---:|---|---|
| `critico_caso_unico` | 17 requisitos | = 17 | A-03 (o criterio de A-11) |
| `desequilibrio_prioridad` | 0 | = | — |
| `gap_plan` | 0 | = | — |
| `deprecado_con_casos` | 0 | = | — |
| `automatizacion_sin_motivo` | 0 de 85 casos con `grade` ≠ `high` | = | — |
| Deriva de significado (`anchor_conflict`) | 0 | = | — |

Los 17 requisitos, sin cambios en número ni en composición:

| Módulo | Requisitos |
|---|---|
| albarans (5) | REQ-027, REQ-028, REQ-030, REQ-033, REQ-036 |
| clients (3) | REQ-002, REQ-007, REQ-008 |
| factures (3) | REQ-044, REQ-045, REQ-046 |
| vehicles (2) | REQ-011, REQ-017 |
| nomines (2) | REQ-065, REQ-066 |
| peces (1) | REQ-024 |
| personal (1) | REQ-062 |

**Lo que sí cambia es lo que le pasa a esos casos únicos, y esta vez a mejor.** En 1.6.0,
cuatro de los diecisiete tenían un caso único que además no ejercía entero su vector. Hoy
son tres, y los tres que salen lo hacen porque DOC-05 1.6.0 los reclasificó:

| Requisito | Caso único | En 1.6.0 | En 1.10.0 |
|---|---|---|---|
| **REQ-046** | TC-064 | no podía componer su intento por `ui` (A-05-11a) | **resuelto y ejecutado**: `service`, verde en `DOC-27` (`TCS008`–`TCS010`) |
| **REQ-045** | TC-063 | `ui`, no señalado entonces | **resuelto y ejecutado**: `service`, verde en `DOC-27` (`TCS005`–`TCS007`) |
| **REQ-033** | TC-045 | `ui`, no señalado entonces | **resuelto y ejecutado**: `service`, verde en `DOC-27` (`TCS003`–`TCS004`) |
| **REQ-011** | TC-015 | ejerce la mitad *vacía*; la *inexistente* no la cubre nadie | igual (A-05-11b) |
| **REQ-027** | TC-036 | ídem, con el vehículo | igual (A-05-11b) |
| **REQ-065** | TC-090 | ídem, con el empleado | igual (A-05-11b) |

**La columna de la derecha ha ganado dos palabras y las dos importan.** Hasta 1.9.1 decía
«resuelto», y «resuelto» quería decir *A-03 cambió el campo y A-05 verificó en el código que
la vía nueva existe*. Ahora dice «resuelto **y ejecutado**», y eso ya no lo sostiene ninguna
lectura: los tres intentos se compusieron de verdad contra el servicio y los tres fueron
rechazados. Es la diferencia entre creer que una puerta se abre y haberla abierto.

REQ-045 y REQ-033 merecen una nota, porque el mérito no es de este documento: **A-05 no los
había señalado.** §3.11 de 1.6.0 nombró a TC-064 y dejó escrito que el barrido de A-03
debía repetirse buscando un segundo modo de fallo. A-03 lo repitió por su cuenta —con la
ayuda empírica de la generación de escenarios de S-10— y encontró dos más de la misma
familia. Es el resultado que se pedía, obtenido por la vía que se recomendaba.

Los 17 casos únicos son de prioridad `Critical` y 13 de los 17 son `Negative`. Esa
proporción se lee hoy con el mismo matiz que en 1.6.0, y con un dato más a favor: **los
casos `Negative` son exactamente donde vive el riesgo de que el vector no exista en la
pantalla**, y de los trece, tres ya han pasado a `service` por ese motivo. La pregunta
para los diecisiete sigue siendo «¿basta un caso?»; para tres de ellos —REQ-011, REQ-027 y
REQ-065— sigue siendo «¿basta *medio* caso?». Ninguna de las dos la contesta A-05: son
criterio de A-11 y trabajo de A-03.

### 3.3 A-05-01 · cobertura nominal — sin cambios

| Sub-aviso | Requisitos | Estado en 1.7.0 | Corrección de |
|---|---|---|---|
| A-05-01a | REQ-031 | **CERRADO en 1.5.0**; no se reabre | — |
| **A-05-01b** | REQ-055, REQ-073 | abierto; sigue esperando el evolutivo de Q-14 y Q-15 | A-06 (evolutivo), luego A-03 |

Nada de lo que DOC-05 1.6.0 cambia toca a TC-078 ni a TC-103: siguen siendo los dos casos
que se reescriben enteros cuando el evolutivo llegue, y siguen siendo dos de los cuatro
`low` de automatización por ese mismo motivo. Los dos declaran `verification_path: ui`, y
es correcto: lo que les falta no es una vía, es un enunciado que verificar.

**TC-041 ha dejado de ser el único `service` del plan, y eso cambia lo que ilustraba.**
Hasta 1.6.0, TC-041 —el caso que cerró A-05-01a— era el único caso por servicio y servía
como ejemplo aislado de la política de A-03 aplicada a tiempo. Hoy son cuatro (TC-041,
TC-045, TC-063, TC-064) y la política ha dejado de tener una sola excepción para tener una
familia. Es la señal de salud que faltaba: **un criterio que se aplica una sola vez es
indistinguible de una excepción; uno que se aplica cuatro veces es una regla.**

**Y desde hoy hay una segunda señal, que es la que faltaba de verdad: la regla tiene
ejecutor y tiene informe.** Una familia de cuatro casos asignada a un automatizador que
nunca publicaba resultados era, en la práctica, una familia de cuatro casos sobre los que
nadie podía decir nada. `DOC-27` 1.0.0 cierra ese hueco con 10 comprobaciones sobre los
cuatro, todas en verde. El dato relevante para la cobertura no es el verde —este documento
no puntúa verdes—, es que **los cuatro casos han dejado de ser un punto ciego de la
evidencia**: hasta ayer, la única respuesta honesta a «¿se ha ejecutado TC-063 alguna vez?»
era «no consta».

### 3.4 A-05-03 · cobertura verde sobre defecto confirmado — 4 requisitos, sin cambios

Los cuatro de siempre no han cambiado y A-05 los ha vuelto a verificar sobre el YAML de
1.6.0:

| Bug | Sev. | Requisito | Prio. req | Casos | Vía | Diagnóstico | ¿Algún caso lo detecta? |
|---|---|---|---|---|---|---|---|
| BUG-001 | critical | REQ-035 | critical | TC-048, TC-049 | `ui` | `Correcto` | **No** |
| BUG-002 | critical | REQ-040 | **medium** | TC-055 | `ui` | `Correcto` | **No** |
| BUG-003 | high | REQ-019 | high | TC-025 | `ui` | `Correcto` | **No** |
| BUG-004 | high | REQ-043 | critical | TC-060, TC-061 | `ui` | `Correcto` | **No** |

Sigue siendo un hueco **decidido, registrado y con vigilante** (Q-19, TC-900 en rojo sobre
BUG-001), no un hueco por omisión. Las dos precisiones de 1.6.0 siguen valiendo: los siete
casos son `ui` y los cuatro defectos se reprodujeron por servicio; y REQ-046 no entra en
este censo porque el censo se define contra `DOC-24-BUGS.json` y REQ-046 no tiene entrada
allí.

#### A-05-03b · dos casos verdes que anunciaban el IVA y aún no lo comprueban — **REQ-051, REQ-053** — el defecto se corrige, el hallazgo cambia de forma

**Este hallazgo nació en 1.7.0 por el lado del sistema, con `EXP-007` de
`DOC-14-EXPLORATORIO` 1.0.0 abierto. `DOC-14` 2.0.0 ha vuelto a reproducirlo en una ronda
de verificación de cierre y lo marca `CORREGIDO`: la aplicación ya presenta el importe del
IVA. A-05 no se lo cree por deferencia y lo verifica dos veces por su cuenta, en el código
que hace cada mitad de la afirmación —el que faltaba y el que sigue faltando.**

| | En 1.7.0 | En 1.8.0 |
|---|---|---|
| Requisitos | REQ-051 · `factures`, `high` · REQ-053 · `factures`, `high` | sin cambios |
| Casos | TC-073 (`Critical`, `Boundary`) y TC-075 (`High`, `Functional`), uno por requisito | sin cambios |
| Vía declarada | `ui` los dos, la vía correcta | sin cambios |
| **¿Muestra la pantalla el importe del IVA?** | **No** | **Sí, verificado** |
| **¿Comprueban TC-073 y TC-075 el IVA en algún paso?** | No | **Sigue sin comprobarlo** |
| Estado de ejecución | verde los dos en `DOC-23-INFORME` 2.0.0 | rojo en `DOC-23` 2.1.0, **verde y verificado en `DOC-23` 2.2.0** — ver nota |
| Diagnóstico en el CSV | `Correcto` los dos | sin cambios |
| Corrección | A-03 (el paso que falta) + mantenedor (el defecto) | **A-03 solo**: el mantenedor ya no tiene nada pendiente aquí |

**Nota sobre el «verde» de la fila anterior — ya no es dudoso, y conviene decir cómo se
ha resuelto la duda.** `DOC-23` 2.0.0 se generó el 2026-08-21, un día antes de que `SPEC
05` —que cambió el separador decimal de punto a coma— entrara en `Implemented`; `TC-073` y
`TC-075` comparaban literales con punto (`33.33 €`, `40.33 €`, `98.40 €`, `119.06 €`)
contra una pantalla que ya escribía coma. Era el hallazgo **A-05-13** (§3.13), y su
duda —¿siguen pasando estos dos casos en absoluto?— ya tiene respuesta: `DOC-23` 2.1.0
confirmó con una ejecución real que **no pasaban** (los dos están en la lista de los 17
rojos de `EXP-027`), y `DOC-23` 2.2.0 documenta que los literales se corrigieron —commit
`5366e18`— y que los 18 casos afectados, TC-073 y TC-075 incluidos, volvieron a pasar en la
reejecución dirigida. A-05 lo ha verificado él mismo sobre el `.feature` actual, no solo
sobre la declaración de DOC-23: ver la nota de §3.13. Los dos problemas siguen siendo
independientes y no se deben fundir: arreglar el separador decimal no añadió el paso que
falta, y añadir el paso que falta no arreglará el separador si algún día vuelve a
desalinearse.

**Lo que dicen los requisitos, citado, porque es lo que sigue sosteniendo el hallazgo.**
REQ-051: «El sistema presenta la base, **el IVA** y el total de una factura redondeados a
dos decimales.» REQ-053: «El detalle de una factura muestra los albaranes que agrupa, la
base, **el IVA** y el total.»

**Lo que hace la aplicación hoy, verificado por A-05 en el código y no solo citado de
`DOC-14`.** `client/src/pages/factures/FacturaDetail.tsx` pinta, además de la línea del
tipo de IVA (`{factura.ivaPercentatge}%`, línea 101), una segunda línea propia para el
importe:

```tsx
{t('factures.detail.ivaImport')}
...
<dd ...>{formatMoney(factura.ivaImport)}</dd>
```

(`FacturaDetail.tsx:99-107`). `DOC-14` 2.0.0 reprodujo `/factures/1` y vio en pantalla
«IMPORTE DEL IVA · 20,66 €», exacto al `iva_import: 20.66` de la API. **El requisito ya se
cumple.** El defecto de sistema que sostenía la mitad «engaño sobre el sistema» de este
hallazgo está cerrado, y no es una lectura de otro agente: es código que A-05 ha leído él
mismo.

**Y lo que siguen haciendo los dos casos, verificado por A-05 sobre el `.feature`
actual, no solo sobre la cita de `DOC-14`.** En
`automation/ui/src/test/resources/features/factures.feature`, TC-073 (líneas 357-385)
valida `Literal: <baseEsperada> €` y `Literal: <totalEsperado> €`; TC-075 (líneas 403-415)
valida `Literal: <albaran>`, `Literal: <base> €` y `Literal: <total> €`. **Ninguno de los
dos pasos incluye un `Literal:` para el importe del IVA.** Los dos escenarios están en
verde en `DOC-23` 2.2.0 —tras pasar por rojo en la 2.1.0 y corregirse por un motivo ajeno al
IVA, §3.13—. La mitad «engaño sobre el caso» del hallazgo original **no se ha movido ni una
línea**.

**Por qué esto deja de ser A-05-03 y qué es ahora.** La familia A-05-03 es «cobertura
formal correcta sobre un requisito que el sistema **no cumple**, con el caso en verde». Ya
no encaja: el sistema cumple. Lo que queda es más estrecho y, en cierto sentido, más
insidioso porque no hay nada que reproducir para verlo:

| | En 1.7.0 (EXP-007 abierto) | En 1.8.0 (EXP-007 corregido) |
|---|---|---|
| El caso, ¿verifica lo que su nombre dice? | No | **Sigue sin hacerlo** |
| El requisito, ¿lo cumple la aplicación? | No | **Sí** |
| Un `PASS` **registrado en `DOC-23`**, ¿era una afirmación falsa sobre el sistema? | Sí | **No: en el momento en que se registró, era cierto por casualidad de calendario, no porque el caso lo demostrara** |
| Un `PASS`, ¿es una afirmación falsa sobre el caso? | Sí | **Sigue siéndolo: el `PASS` de `DOC-23` 2.2.0 no dice nada del IVA** |
| Si mañana una regresión quita el importe de pantalla, ¿lo vería la suite? | — | **No: ninguno de los dos casos mira el IVA, y ahora sí se ejecutan y pasan sin mirarlo** |

**Es, en la terminología de este documento, un riesgo de regresión silenciosa, no ya un
verde engañoso sobre un defecto vivo.** El defecto vivo del IVA ya no existe. Lo que queda
es que dos casos con «IVA» en el nombre no lo comprueban, y **eso no depende de qué haga
hoy la pantalla**: seguiría siendo cierto aunque el IVA desapareciera de nuevo. Es la misma
distinción que separa A-05-01a del resto —un caso que no verifica lo que anuncia—, con la
diferencia de que aquí, hoy, no hay un defecto de negocio que lo agrave. La duda que A-05-13
sostenía sobre si estos dos casos **llegan siquiera a pasar** ya está resuelta —sí pasan,
verificado en código, §3.13—, así que el riesgo queda reducido a su forma más pura: un
verde legítimo que no comprueba lo que anuncia.

**Por qué el recuento del §1 baja de 6 a 4.** «Requisitos con defecto confirmado en el
sistema real» cuenta **hechos verificados sobre el sistema**, y A-05 acaba de verificar que
REQ-051 y REQ-053 ya no tienen uno. El censo de la tabla de A-05-03 —contra
`DOC-24-BUGS.json`— nunca los incluyó, así que no se mueve: seguía y sigue en 4. Las dos
cifras, que en 1.7.0 divergían (4 y 6) por una razón explicada entonces, **vuelven a
coincidir en 4**, y no por casualidad sino porque la razón de la divergencia —un defecto
real sin entrada en DOC-24— ha dejado de existir.

**Severidad: aviso, un solo destinatario.** El paso de validación que falta en TC-073 y
TC-075 sigue siendo de **A-03**: hasta que exista, un caso llamado «Base, IVA y total…» no
comprobará el IVA, con sistema sano o no. Ya no hay nada pendiente del **mantenedor de la
aplicación** en este hallazgo.

**Qué necesita saber A-11.** Cuatro requisitos —los de siempre, `A-05-03`— siguen teniendo
cobertura formal correcta y defecto confirmado: un verde en ellos significa «el caso pasó y
el defecto sigue ahí». REQ-051 y REQ-053 ya no están en ese grupo: el sistema **sí** los
cumple hoy, sus casos ya vuelven a pasar de forma fiable (A-05-13 cerrado, §3.13), y lo que
queda pendiente es solo **incompleto sobre lo que dicen comprobar**: no miran el IVA. Es
más barato de cerrar que cualquiera de los cuatro de A-05-03 —un paso de IVA por caso,
pregunta 2 de §7.3— y es de **A-03** en solitario.

**Nota de contrato.** No se ha añadido ninguna columna al CSV ni se ha tocado ningún
diagnóstico: las cuatro filas de A-05-03 y las dos de A-05-03b siguen diciendo `Correcto` y
S-07 consume exactamente el mismo formato.

### 3.5 A-05-04 · regla afirmada fuera del censo de requisitos — sin cambios de estado, con una corroboración nueva

La imposibilidad de modificar o anular una factura **no está enunciada en ninguno de los
79 requisitos**; A-05 ha vuelto a revisar los trece de `factures` (REQ-043 a REQ-055) y
ninguno la menciona. La mitad de DOC-05 se cerró en 1.4.0. La mitad de **DOC-04
(DISC-001) sigue abierta y es corrección de A-02.**

**Lo que aporta `DOC-27`: una segunda fuente, medida desde la capa de servicio, de que la
regla existe de verdad.** Hasta ahora este hallazgo se apoyaba en `DOC-01`/`DOC-02` y en la
interfaz. `DOC-27` §4.2 lo dice desde el otro lado —«No existe `DELETE /api/factures/:id`, y
`PATCH /:id` solo commuta `estat_pagament`. Emitir es, hoy, irreversible»— y **A-05 lo ha
verificado él mismo en `server/routes/factures.js`**, que expone exactamente cuatro rutas
—`GET /`, `GET /:id`, `POST /` y `PATCH /:id`— y cuyo `PATCH` rechaza con `400` cualquier
cuerpo que no sea `estat_pagament` en `{pendent, pagada}`. La regla más severa del ciclo del
dinero —lo que se emite no se deshace— **sigue sin ser un requisito**, ahora con evidencia
por dos vías independientes. No cambia la severidad ni el destinatario: **aviso, A-02**. Sí
cambia lo que se le puede responder a quien pregunte si es una interpretación: no lo es.

Las dos consecuencias siguen vivas: **no es un GAP PLAN y la matriz no puede verlo** —una
regla que nunca llegó a ser requisito no entra en el censo, no genera fila y no puede
generar hueco—, y **afecta al dimensionado del evolutivo de Q-06**, el único `large`.

### 3.6 A-05-06 · el censo de `Q-nnn` depende del orden de las claves — sin cambios, remedido

La exposición **no ha crecido y no ha bajado**. A-05 la ha vuelto a contar sobre los
bloques YAML de esta versión, sin repetir el experimento destructivo:

| Documento | Entradas de cita protegidas solo por el orden de claves | vs 1.8.0 |
|---|---:|---|
| DOC-05 1.6.0 | 15 | = |
| DOC-06 1.2.0 | 19 | = |
| **Total** | **34** | **=** |

El control sigue limpio, verificado hoy con S-12 en lectura sobre los documentos reales:
`sync --dry-run` sobre DOC-05 devuelve `encontrados 4 · anadidos 0 · ya presentes 4`, y
`validate` sale en **código 0, sin bloqueantes**. **Severidad: aviso**, por la razón de
siempre: es un riesgo de regresión, no un defecto. La corrección preferente sigue siendo
que el extractor de S-12 reconozca una cita por su `owner` y no por dónde esté la clave,
porque **YAML no da significado al orden de las claves** y una convención que pide
respetar una restricción que el formato declara irrelevante se acaba perdiendo.

Un detalle de DOC-05 1.5.0 —que 1.6.0 conserva— merece elogio explícito, porque es lo
contrario de la deriva
que este documento persigue: al moverse la carpeta de automatización, A-03 **no reescribió**
la `resolution` ya cerrada de Q-19 —que citaba la ruta vieja— sino que anotó la corrección
**al lado**, en `resolution_path_correction`. Reescribir el texto de una decisión
registrada la convierte en otra decisión. Es el mismo criterio que este documento exige
para las anclas, aplicado a las respuestas.

### 3.7 A-05-08 · cobertura condicionada — sin cambios en las cifras, con evidencia empírica nueva

Las cifras de ejecución son idénticas a las de 1.6.0 y se han vuelto a leer del `--json`
de S-14, no de la prosa: **2 olas**, 107 casos en 67 carriles en la ola 0, **3 casos en la
ola 1** —TC-014, TC-025 y TC-080—, paralelismo máximo 67, carril más largo 17, y **0 de
110 casos sin aislamiento declarado**. El detalle está en §5.4 y la corrección sigue
siendo de **S-06 / DOC-13**, no de A-03.

**Lo que aportó DOC-23 2.1.0: A-05-08b dejó de ser una hipótesis, y DOC-23 2.2.0 confirma
que el síntoma se ha parcheado sin que el riesgo estructural se haya corregido.** Este
documento venía diciendo desde 1.4.0 que el carril serial de 17 casos de `albarans` es
donde el aislamiento entre casos puede morder, razonando sobre el grafo de dependencias que
deriva S-14. `DOC-23` 2.1.0 lo confirmó con una ejecución real —el único rojo de 107
escenarios en esa versión fue exactamente esto—:

> **TC-048** fallaba porque asumía que la pieza «Filtre d'aire» tenía stock 35, y **TC-040**
> —que lo precede en el mismo fichero y consume 2 unidades de esa misma pieza— lo dejaba en
> 33. Ejecutado en solitario, TC-048 pasaba.

No era un defecto de la aplicación y `DOC-23` lo dijo sin rodeos; tampoco era un defecto de
la matriz, que ni mira el orden ni debe mirarlo. **Fue la confirmación de que el riesgo que
A-05-08b describía existe y se materializa en el primer intento de ejecutar la suite
entera.** Los dos casos implicados, TC-040 (REQ-030) y TC-048 (REQ-035), son de `albarans`
y los dos están en el carril de 17.

**`DOC-23` 2.2.0 documenta la corrección —commit `735ded8`, aislar TC-040 retirando la
línea que añade, verificado en dos ejecuciones limpias— y A-05 la da por buena.** Pero
conviene fijar el matiz que ya se apuntaba en 1.8.0, porque sigue siendo cierto y ahora
importa más: lo que se ha corregido es **el escenario concreto**, no **el mecanismo que
permitió que ocurriera**. TC-040 y TC-048 **declaraban** sus campos de aislamiento
—`touches`, `depends_on`, `restores_state`— y los declaraban bien: eran 2 de los 110 con
aislamiento declarado, no un hueco de DOC-05. Lo que fallaba —y **sigue fallando para
cualquier otro par de casos en la misma situación**— es que **nadie hace cumplir esa
declaración en tiempo de ejecución**: la suite los corre en el orden del fichero, no en el
orden que deriva S-14. Parchear `TC-040` cierra este caso concreto; no cierra `A-05-08b`,
que sigue siendo sobre el carril entero y sobre los otros dos `critical` de caso único que
viven en él (REQ-028/TC-037, REQ-036/TC-050), ninguno de los cuales se ha visto sometido
todavía a la prueba de una ejecución completa que falle antes de llegar a ellos. La
corrección de fondo sigue siendo de **S-06 / DOC-13** —producir los datos de prueba y
hacer cumplir el orden—, no de quien mantenga la suite de S-10, cuyo parche de esta sesión
es correcto pero no sustituye esa corrección estructural.

### 3.8 A-05-09 · `Q-30` — de «sin ancla» a **colisión de identificador** — empeora con SPE-06

Hasta 1.10.0: DOC-06 publicaba una pregunta propia con `id: Q-30` en estado
`pending_confirmation` y el registro no tenía el ancla. Aviso, no bloqueante.

**En 1.11.0 el número `Q-30` ya está concedido — pero a otra pregunta.** DOC-04 1.3.0
emitió una pregunta con `id: Q-16` que colisionaba con la `Q-16` propia de DOC-05; la regla
de gobierno de IDs hace ceder al reclamante posterior (A-02), así que DOC-04 1.3.1 la
renumeró a **`Q-30`** y `s12-registro-ids` la dio de alta en `registro-ids.json`
(`"Q-30"` → `document: DOC-04-FUNCIONAL.md`, `blocks: REQ-015`, sobre arrastrar trabajo al
cambiar el propietario de un vehículo). Verificado en el registro: **30 `Q-nnn` con ancla,
máximo `Q-30`, y ese `Q-30` es el de DOC-04.**

**Consecuencia:** el `Q-30` que DOC-06 1.4.0 sigue trayendo como pregunta propia —sobre qué
ve el usuario cuando REQ-031 rechaza una anotación— **designa ahora una pregunta distinta de
la que el registro llama `Q-30`**. Ya no es solo «falta el ancla»: es el mismo número para
dos preguntas. DOC-06 1.4.0 además añade su propia `Q-31` (sobre REQ-080/REQ-081) numerada
«a partir del censo» porque A-04 no tenía `registry.js`, y hereda el mismo problema.

**Aviso, no bloqueante** —`Q-nnn` no viaja a Rally, no genera fila ni columna del CSV—,
pero la corrección ya no es «un comando»: **S-12** tiene que asignar a las dos preguntas
propias de DOC-06 los siguientes números libres (`Q-31`, `Q-32` a la vista del registro
actual) y **A-04** renumerarlas en DOC-06, deshaciendo la `Q-31` provisional. Es
`s12-registro-ids` + A-04.

### 3.9 A-05-10 · una superficie de interfaz no documentada — abierto, con la mitad medida

El hallazgo no cambia de naturaleza: **la aplicación no tiene su superficie descrita ni
identificada**, DOC-04 no documenta el literal de ningún mensaje de error, y eso degrada
43 de los 80 casos `medium` a la vez que deja 47 requisitos señalados por una pregunta de
DOC-06 sobre lo que el usuario ve. Sigue siendo **la palanca más rentable del proyecto** y
sigue teniendo dos dueños: **A-02** para los literales y **quien mantenga la aplicación**
—vía A-06 / DOC-08— para los identificadores estables.

**Lo que 1.7.0 añadió y sigue valiendo: la mitad de los identificadores ya está medida, y
costó menos de lo que este documento temía.** DOC-23 2.0.0 automatizó 102 de los 110 casos y
llegó a **cero flakiness** en la ejecución final, después de diagnosticar y corregir seis
clases de error durante la sesión. Es decir: la falta de identificadores estables **encarece
la automatización pero no la impide**, y el coste ya está pagado para 102 casos. Eso baja
la urgencia de la mitad «identificadores» y **no baja la de la mitad «literales»**, que
sigue entera y sigue siendo de A-02: 43 casos `medium` esperan saber qué texto exacto debe
comprobar su aserción, y ninguna suite verde responde esa pregunta.

**Y el argumento sobre TC-064 sigue en pie aunque su otro hallazgo se haya cerrado.** La
razón de automatización que TC-064 declaraba era literalmente esta carencia: *«la selección
de albaranes de la emisión es una lista sin identificador estable, y además DOC-04 no
documenta el literal del aviso que el caso espera»*. A-03 le ha cambiado la vía a `service`
y con eso ha cerrado A-05-11a; **su grado de automatización sigue degradado por la mitad
documental**, que no depende de la vía. Eran dos hallazgos distintos sobre el mismo caso,
uno está corregido y el otro no.

**Y `DOC-27` enseña exactamente qué pasa cuando nadie ha documentado el literal: el oráculo
se lo pide al código.** Las cuatro comprobaciones de rechazo de la colección no se
conforman con el código de estado —eso es una virtud, y `DOC-27` la reivindica con razón—:
fijan el mensaje exacto. Pero el mensaje exacto que fijan es el que devuelve hoy el
servidor, en catalán, y ningún requisito lo enuncia. Así, literalmente:

```js
pm.expect(pm.response.json().error).to.eql('El camp tipus ha de ser "peca" o "ma_obra"');
```

Frente al `expected` que DOC-05 escribe para ese mismo paso de TC-041 —«El sistema rechaza
la anotación avisando de que el tipo debe ser pieza o mano de obra»—, la aserción es más
precisa y a la vez **circular**: comprueba que el sistema sigue diciendo lo que dice, no que
diga lo que debía decir. Si el literal estuviera mal redactado, o no estuviera traducido, la
comprobación seguiría en verde. **No es un defecto de la colección** —quien la escribe no
tiene otro sitio de donde sacar el oráculo— y por eso este párrafo va aquí, en A-05-10, y no
en un hallazgo contra S-17: es la misma carencia documental de siempre, ahora visible
también en la suite de servicio. **Corrección: A-02**, la mitad «literales» de este
hallazgo, que sigue entera.

### 3.10 Procedencia del registro

El registro ha crecido a **317 anclas** (eran 311 en 1.7.0): `ACT=1 UC=40 BR=37 REQ=79
TC=110 Q=29` sin cambios, y suben `FUN` (8 → 12) y `MEJ` (6 → 8), gobernadas por DOC-16 y
DOC-25 y ajenas al alcance de A-05. `validate` sale en **código 0, sin bloqueantes**.

Los 79 `REQ-nnn` y los 110 `TC-nnn` siguen exactamente donde estaban, con el mismo `text`,
el mismo `requirement` y el mismo `external_id`. **Ninguna de esas 189 anclas ha cambiado
en este ciclo**, y era lo que tenía que pasar: ni la reclasificación de vía de 1.6.0 ni la
verificación de cierre de `DOC-14` 2.0.0 tocan un campo que el registro gobierne.
`anchor_conflict` sigue en **0**, confirmado por S-14 y por la comparación que A-05 hace de
`text` contra `statement` en los 79 requisitos, contra `name`/`requirement`/`external_id`
en los 110 casos y contra `question` en las 29 preguntas.

**Y esa comparación merece una nota esta vez, porque A-05-03b la roza sin serlo.** TC-073
se llama «Base, IVA y total se presentan con dos decimales» y no comprueba el IVA. Es
tentador leerlo como deriva de significado, y no lo es: **el `text` del ancla y el `name`
del caso coinciden exactamente**, y coinciden con el enunciado del requisito. Lo que no
coincide con el nombre son **los pasos** del caso, y ni el registro ni `anchor_conflict`
miran los pasos. Es un límite real del control de deriva y conviene tenerlo escrito: el
registro protege los identificadores y los títulos, no la correspondencia entre un título
y lo que se hace debajo.

**Un aviso de S-12 que no es de A-05 y que se recoge aquí porque nadie más lo va a ver:**

```
AVISO [sin_texto] EVO-001: ancla sin texto
```

El ancla nueva se registró con `text: null`. No afecta a la matriz ni a la exportación
—`EVO-001` no es un `REQ` ni un `TC`— pero un ancla sin texto es un ancla contra la que no
se puede detectar deriva de significado nunca, que es justo para lo que existe el campo.
**Corrección de A-06**, de una línea.

### 3.11 A-05-11 · vector no alcanzable por la vía de verificación declarada — *una forma cerrada, dos abiertas*

El enunciado del hallazgo no cambia:

> Un caso declara una vía de verificación por la que **su vector no se puede componer**,
> entero o a medias. La matriz lo cuenta como cobertura correcta porque hay caso, y lo
> hay; lo que no hay es forma de ejercerlo por donde el caso dice que se ejerce.

El reparto que cambió en 1.7.0 —**11a se cierra, 11b sigue igual y nace 11c**— tampoco se
mueve aquí; lo que cambia es la calidad de la prueba del cierre:

| Sub-hallazgo | Casos | Estado en 1.10.0 |
|---|---|---|
| **A-05-11a** | TC-064 | **CERRADO y ahora confirmado por ejecución** — `DOC-27` 1.0.0 |
| **A-05-11b** | TC-015, TC-036, TC-090 | **abierto, sin cambios** |
| **A-05-11c** | TC-032, TC-033, TC-047 | **abierto, sin cambios desde 1.7.0** |

`A-05-11a` ya salió del censo de avisos (§3.0) y su ficha se conserva **solo esta vez** por
una razón concreta: hay evidencia nueva sobre él y este documento no da por sabido lo que
no ha dicho. A partir de 1.11.0 vivirá únicamente en el `-HIST.md`.

#### A-05-11a · `TC-064` no puede componer su intento — **CERRADO**

**Qué decía.** REQ-046 —«El sistema exige que todos los albaranes de una misma factura
pertenezcan al mismo cliente», `factures`, `critical`— tenía como único caso TC-064, que
declaraba `verification_path: ui` y cuyo primer paso pedía *«Iniciar la emisión de una
factura incluyendo el albarán pendiente de 'Garcia Motors SL' y el de 'Tallers Puig SL'»*.
A-05 verificó en `client/src/pages/factures/FacturaForm.tsx` que la lista de albaranes se
carga con `albaransService.listByClient(Number(clientId), 'pendent')`, de modo que la
pantalla nunca puede ofrecer a la vez albaranes de dos clientes distintos: el primer paso
describía una acción que la interfaz no ofrece.

**Qué ha hecho A-03.** DOC-05 1.6.0 reclasifica **TC-064 a `verification_path: service`**,
y su `automation.reason` pasa de un motivo genérico a la causa real. Es exactamente la
corrección que §3.11 de 1.6.0 recomendaba —la que manda la propia política de §4.12 de
DOC-05— y llegó **antes de exportar a Rally**, que era la condición que hacía útil el
hallazgo. Verificado sobre el YAML de 1.6.0, no sobre su prosa: TC-064 declara `service`.

**Y A-03 encontró dos más que A-05 no había visto.** El mismo anexo reclasifica **TC-063**
(REQ-045, «todos los albaranes de una factura están pendientes de facturar»: `FacturaForm`
nunca muestra uno ya facturado, por el mismo `listByClient(..., 'pendent')`) y **TC-045**
(REQ-033, «la pieza de una línea existe en el catálogo»: el campo Pieza es un `<select>`
poblado con piezas reales, y no hay forma de teclear «ZZZ-000»). Los tres son `Critical`,
`Negative` y caso único de su requisito.

**Lo que este cierre enseña sobre el método, y merece anotarse una vez.** 1.6.0 recomendó
*«rebarrer los 40 `Negative` y `Boundary` con el segundo modo de fallo en la mano»*, el
modo *de composición* frente al modo *de campo*. El rebarrido se hizo, y encontró un caso
de cada modo: **TC-063 es de composición** —como TC-064— y **TC-045 es de campo**, que es
precisamente el modo que el barrido original de §4.12 sí buscaba y aun así se le pasó. La
lección no es que faltara un criterio: es que el rebarrido lo destapó porque **se apoyó en
la generación empírica de escenarios de S-10**, no en releer el YAML. Escribir el
automatismo es lo que obliga a comprobar que el vector existe.

**Qué NO cambia en el CSV por este cierre: nada.** REQ-046 sigue diciendo
`test_case_ids: TC-064`, `test_case_count: 1`, `diagnosis: Correcto`. Igual REQ-045 y
REQ-033. Era lo previsto y es la comprobación que sostiene todo lo demás: **la vía por la
que se verifica un caso no es una propiedad de la cobertura.** Lo que cambia es quién
ejecuta esos tres casos —pasan de `S-10` a `S-17`— y eso vive en §5.5, no en la matriz.

**Y lo que `DOC-27` añade hoy: el cierre deja de ser una predicción bien fundada y pasa a
ser un hecho.** Esta es la parte que merece decirse despacio, porque toca el límite que este
documento lleva versiones declarando (§5.6): `verification_path` es **un campo declarativo,
no verificado**, y reclasificar un caso a `service` es afirmar que el vector existe por esa
vía —una afirmación que hasta hoy solo estaba respaldada por leer `FacturaForm.tsx` y
`AlbaraLiniesSection.tsx`—. `DOC-27` la ha puesto a prueba componiendo los tres intentos
contra el servicio:

| Caso | Comprobación que ejerce el vector | Qué hizo el sistema |
|---|---|---|
| **TC-064** (REQ-046) | `TCS008` · `POST /api/factures` con albaranes de dos clientes | `400` · `Tots els albarans han de ser del mateix client` |
| **TC-063** (REQ-045) | `TCS005` · `POST /api/factures` con un albarán ya facturado | `400` · `Tots els albarans han d'estar pendents de facturar` |
| **TC-045** (REQ-033) | `TCS003` · `POST /api/albarans/:id/linies` con una pieza inexistente | `400` |

Los tres intentos **se pudieron formular**, que era exactamente lo que la vía `ui` no
permitía. Y los tres llevan además la comprobación del efecto lateral en una petición
aparte —`TCS009`/`TCS010`, `TCS006`/`TCS007`, `TCS004`—, que es la mitad del caso que el
plan escribe como «Revisar el listado de albaranes» y que sin ella dejaría el rechazo sin
demostrar que el sistema no se movió. **A-05 respalda esa forma de escribirlo sin
reservas**: es el segundo paso de los `expected` de DOC-05, no un extra.

**El precedente que esto fija, y que vale más que el cierre.** La recomendación de §5.6
—«el único método que ha demostrado encontrar estas cosas es intentar automatizarlas»— se
completa por el otro extremo: **automatizar también es el único método que ha demostrado
confirmar que una reclasificación era correcta.** A-03 reclasificó tres casos leyendo
código; alguien podría haber leído mal. Ya no hay que fiarse: se intentó y funcionó.

#### A-05-11b · media mitad de un vector de dos — **REQ-011, REQ-027, REQ-065** — abierto

| Requisito | Prio. | Caso único | Vía | Mitad que ejerce | Mitad que falta |
|---|---|---|---|---|---|
| **REQ-011** | `critical` | TC-015 | `ui` | cliente **vacío** | cliente **inexistente** |
| **REQ-027** | `critical` | TC-036 | `ui` | vehículo **vacío** | vehículo **inexistente** |
| **REQ-065** | `critical` | TC-090 | `ui` | empleado **vacío** | empleado **inexistente** |

Sin cambios respecto de 1.6.0: los tres siguen declarando `ui` y los tres siguen cubriendo
la mitad *vacía* de un vector que tiene dos mitades. Los tres requisitos hablan de una
referencia **existente**; la otra mitad —una referencia a algo que no está— no se puede
componer desde un desplegable y **hoy no la cubre nadie**.

**Y ahora hay un precedente exacto para resolverlo, que en 1.6.0 no había.** TC-045 tenía
el mismo problema de fondo —un `<select>` no admite una referencia inexistente— y A-03 lo
ha resuelto reclasificándolo a `service`. Ese es el camino: TC-015, TC-036 y TC-090 no se
reclasifican, porque la mitad que sí ejercen es correcta por `ui` y hay que conservarla;
lo que necesitan son **tres casos hermanos que nacen `service`** por la propia política de
§4.12. Coste: tres casos. Corrección de **A-03**.

**Sigue sin ser un GAP PLAN y conviene repetir por qué.** GAP PLAN es un requisito sin
ningún caso. Aquí hay caso, hay fila y el diagnóstico es `Correcto`. Es **cobertura parcial
de vector**, una categoría que el CSV no distingue y que no se va a añadir a él: el
contrato de S-07 no se toca por esto.

#### A-05-11c · tres casos declaran `ui` sobre una interfaz que no ofrece su vector — **REQ-025, REQ-034** — nacido en 1.7.0, sin cambios

**Origen: `DOC-23-INFORME` 2.0.0, §5.** Al automatizar la suite completa, S-10 dejó ocho
casos sin escenario. Cuatro de los ocho son los `service` de DOC-05 1.6.0 y uno es TC-109,
que el propio plan marca `not-recommended`. **Los tres restantes son el hallazgo**: casos
que siguen declarando `verification_path: ui` y para los que DOC-23 afirma, con la causa
leída en el código fuente, que no existe vector en la interfaz.

| Caso | Requisito | Prio. req | Vía declarada | Qué dice DOC-23 que falta en la interfaz |
|---|---|---|---|---|
| **TC-032** | REQ-025 | `high` | `ui` | `AlbaransList.tsx` no expone filtro por `vehicle_id` ni por `client_id` |
| **TC-033** | REQ-025 | `high` | `ui` | el mismo |
| **TC-047** | REQ-034 | `high` | `ui` | `AlbaraLiniesSection.tsx` no renderiza campo de precio para las líneas de tipo pieza |

**Verificado por A-05, no citado**, por la misma razón que en A-05-11a: este documento no
afirma que un caso no puede ejecutarse apoyándose en la lectura de otro agente.

*Para TC-032 y TC-033.* `AlbaransList.tsx` pinta un `DataTable` con exactamente tres
columnas —`numero`, `estat` y `data`— y le pasa un `searchPlaceholder`, sin más. El filtro
que ofrece `DataTable.tsx` es este:

```ts
return rows.filter((row) =>
  columns.some((column) =>
    String((row as Record<string, unknown>)[column.key] ?? '')
      .toLowerCase()
      .includes(term),
  ),
);
```

Busca **solo sobre las claves de las columnas declaradas**. Ni vehículo ni cliente son
columnas del listado de albaranes, así que no hay forma de filtrar por ellos: el buscador
no los mira aunque el dato viaje en la fila.

*Para TC-047.* En `AlbaraLiniesSection.tsx` el campo de precio se renderiza dentro de un
`{tipus === 'ma_obra' && (…)}`. Para las líneas de tipo `peca` **no se pinta ningún campo
de precio**; el `preu` que se envía solo puede venir del catálogo. TC-047 se llama «El
precio informado a mano prevalece sobre el del catálogo» y **no hay dónde informarlo a
mano**.

**Y aquí está la diferencia que hace este sub-hallazgo más grave que 11a, no menos.** En
TC-064 el vector existía en el servidor y solo faltaba llegar por la vía correcta:
reclasificar el caso lo resolvía entero. Aquí hay que preguntar antes otra cosa, y la
respuesta no la tiene A-03:

> **REQ-025 dice: «El sistema ofrece un listado de albaranes filtrable por vehículo, por
> cliente y por situación del albarán.»** De las tres, la interfaz solo ofrece la tercera.

Eso no es un caso mal clasificado: **es un requisito que la aplicación no cumple.**
Reclasificar TC-032 y TC-033 a `service` los haría ejecutables contra la API y los pondría
en verde, y el usuario seguiría sin poder filtrar por vehículo ni por cliente. **Sería la
peor de las correcciones posibles: la que hace desaparecer el síntoma.** REQ-034 está en
el mismo caso por la mitad: TC-046 —«se aplica el precio del catálogo»— es ejercible y
correcto; TC-047 describe una capacidad que la pantalla no tiene.

**Por eso este sub-hallazgo tiene dos destinatarios y hay que no mezclarlos:**

| Quién | Qué le toca |
|---|---|
| **Producto / negocio** | Decidir si REQ-025 y REQ-034 describen lo que se quiere. Si sí, es un hueco de la aplicación y le corresponde una entrada de defecto o un evolutivo. Si no, el que hay que corregir es el enunciado, y eso es de **A-02** |
| **A-03** | Solo **después** de esa decisión: reclasificar, reescribir o retirar TC-032, TC-033 y TC-047. Hoy no puede hacer nada correcto sin ella |

DOC-23 llega a la misma conclusión desde el otro lado —*«són carències reals de la
interfície […] cal que abans existeixi la funcionalitat a l'aplicació […] decisió que no
correspon a QA sinó a producte»*— y este documento la recoge porque es donde se cruza con
la cobertura: **REQ-025 es el único requisito del proyecto cuya cobertura entera es
inejecutable por la vía que declara.** REQ-046 lo fue durante una versión y ya no lo es.

**Severidad: aviso**, por el mismo criterio de siempre: no rompe el JOIN ni la exportación
y la lista de bloqueantes no se estira para acomodar hallazgos nuevos. Pero a diferencia
de 11a, **A-05 no recomienda resolverlo antes de exportar**, y la razón es que no se puede:
la corrección empieza por una decisión de producto, no por un cambio en DOC-05. Lo que sí
recomienda es que **A-11 lo tenga delante en el Go/No-Go**, porque es lo más parecido a un
GAP PLAN que este proyecto tiene sin que la matriz pueda verlo.

**Qué NO cambia en el CSV: nada.** REQ-025 sigue diciendo `TC-032;TC-033`, `2`,
`Correcto`; REQ-034 sigue diciendo `TC-046;TC-047`, `2`, `Correcto`. **La columna
`diagnosis` responde a «¿hay caso?», y lo hay.** Que ninguno de los dos casos de REQ-025
pueda ejercerse es información de este documento.

### 3.12 A-05-12 · el resumen de DOC-05 no coincide con los datos de DOC-05 — nacido en 1.7.0, sin corregir

**Este es el hallazgo que la comprobación de coherencia del §3.1 ha destapado, y es de los
que sólo se ven volviendo a contar.**

DOC-05 lleva desde 1.5.0 un bloque de resumen en su front-matter que declara el reparto de
vías. En 1.6.0 sigue diciendo esto:

```yaml
verification_path:            # nuevo en 1.5.0; los 110 casos lo declaran, ninguno sin informar
  ui: 109
  service: 1                  # TC-041
  mixed: 0
```

Y sus nueve bloques ` ```yaml testcases ` dicen esto otro, contado por A-05 sobre el YAML:
**106 `ui`, 4 `service`, 0 `mixed`** —los cuatro `service` son TC-041, TC-045, TC-063 y
TC-064—. **El documento se contradice a sí mismo dentro del mismo fichero y de la misma
versión.**

**Qué ha pasado, y no es un misterio.** El anexo de 1.6.0 reclasificó tres casos en el
YAML y actualizó el comentario de cada uno, pero **no actualizó el bloque de resumen del
front-matter**, que sigue siendo el de 1.5.0 —el comentario incluso lo delata: «nuevo en
1.5.0»—, ni la anotación `service: 1 # TC-041`, que era cierta cuando TC-041 era el único.

**Por qué esto importa más de lo que parece, y por qué se reporta aquí.** No rompe nada
hoy: A-05 lee el YAML y nunca la prosa ni los resúmenes, así que la matriz, el reparto de
§5.6 y todos los recuentos de este documento salen de los datos y son correctos. El
problema es de quien no haga eso. **Un resumen en el front-matter es exactamente lo que un
consumidor apresurado lee en vez de contar**, y hoy ese resumen diría que S-10 tiene 109
casos y S-17 tiene uno, cuando el reparto real es 106 y 4. Tres casos `Critical` acabarían
en la cola equivocada, y los tres son precisamente los que se reclasificaron para que no
pasara eso.

Es, además, el mismo modo de fallo que este documento persigue desde 1.3.0 con otro
nombre: **un dato derivado que deja de derivarse.** La diferencia con la deriva de
significado de las anclas es que aquí no hay ningún control automático que lo cace —S-12
vigila anclas, S-14 vigila el JOIN, y el front-matter de DOC-05 no lo vigila nadie—, y por
eso la comprobación manual del §3.1 es la única red que hay. 1.7.0 fue la primera versión
en que esa comprobación falló, y **sigue fallando en 1.10.0**: DOC-05 no ha cambiado y
nadie ha corregido el resumen todavía.

**Y ya no es la única red: `DOC-27` acaba de contradecir ese resumen con una ejecución.**
Su §5 declara que cubre «**4 de los 110 casos** de `DOC-05`, los marcados
`verification_path: service`», y su tabla de resultados nombra los cuatro: `TC-041`,
`TC-045`, `TC-063` y `TC-064`. Es exactamente el recuento que A-05 hace sobre el YAML y
exactamente lo contrario de lo que dice el resumen del front-matter de DOC-05 (`service: 1
# TC-041`). Dos agentes independientes, leyendo los datos y no el resumen, llegan al mismo
4; el resumen sigue diciendo 1. **El hallazgo no cambia de severidad, pero pierde su última
excusa**: ya no hay que imaginar al consumidor apresurado que mandaría tres casos
`Critical` a la cola equivocada, porque ya existe el documento que demuestra que la cola
correcta tenía cuatro.

**Severidad: aviso.** No rompe el JOIN, no rompe la exportación y no altera ninguna fila
del CSV. **Corrección: A-03**, de tres líneas —`ui: 106`, `service: 4` y retirar o ampliar
el comentario `# TC-041`—. A-05 no la aplica: no es propietario de DOC-05, y corregir el
resumen de otro documento es exactamente la clase de arreglo silencioso que este proyecto
ha decidido no hacer.

**Y una recomendación de método, que vale para todos los documentos del ciclo.** Un
resumen de datos en el front-matter tiene el mismo problema que cualquier caché: hay que
invalidarlo. Si el bloque no se puede generar automáticamente, la alternativa honesta es
**no tenerlo**, y remitir al recuento. Este documento acaba de mover 129 líneas de su
propio front-matter al cuerpo por una razón muy parecida.

### 3.13 A-05-13 · el plan citaba literales de importe que la aplicación ya no producía — **CERRADO en 1.9.0, fuera del censo desde 1.10.0**

**Cerrado y retirado del censo de avisos** (§3.0). Su historia completa —origen en `EXP-027`
de `DOC-14` 2.0.0, la lista exacta de los 17 casos que `DOC-23` 2.1.0 confirmó en rojo con
una ejecución real, y su corrección— vive en `DOC-07-TRAZABILIDAD-HIST.md`, entradas 1.8.0 y
1.9.0. No se reproduce aquí.

**Se conserva solo el hecho verificado, porque §3.4 y §5.5 se apoyan en él.** El commit
`5366e18` sustituyó en `factures.feature`, `nomines.feature`, `peces.feature` y
`albarans.feature` los literales de importe con punto decimal por su equivalente con coma, y
**A-05 lo comprobó sobre los ficheros, no sobre la declaración de `DOC-23`**: `TC-073` fija
hoy `baseEsperada: 33,33` y `totalEsperado: 40,33`, `TC-075` fija `base: 98,40` y
`total: 119,06` (`factures.feature`, líneas 385 y 415), y el literal lleva el espacio no
separable (`U+00A0`) que produce `Intl.NumberFormat('es-ES', …)`, confirmado con `cat -A`.
El único residuo abierto no es de este hallazgo sino de método: los 18 casos se
reverificaron con una reejecución dirigida, no con la suite completa (§5.5).

### 3.14 A-05-14 · `TC-041` ya tiene evidencia de ejecución, y su paso 2 no lo ejerce nadie — **REQ-031** — nuevo

**Origen: `DOC-27` §2, leído contra el propio `TC-041` de DOC-05.** Es un hallazgo que solo
podía aparecer hoy: hasta que alguien no publicó **cómo** se había ejecutado el caso, no
había con qué comparar lo que el caso dice que hay que hacer.

`TC-041` es el más antiguo de los cuatro `service` y el único que declara, en un campo
propio, que su clasificación no es homogénea. Su `verification_path_note`, citado con las
dos mitades porque las dos importan:

> «clasifica el vector, no cada paso: **los pasos 1, 2 y 4 se ejecutan por la pantalla** y
> solo el 3 -el intento- va por servicio. […] aqui pesa mas quien tiene que automatizarlo:
> **el intento y la comprobacion del efecto los ejecuta S-17 de punta a punta**.»

Las dos frases no dicen lo mismo, y hasta hoy daba igual cuál se cumpliera porque el caso no
se ejecutaba. Ya se ejecuta, y se ha cumplido la segunda: `DOC-27` lo cubre con **`TCS001`**
(el intento, `POST /api/albarans/:id/linies`) y **`TCS002`** (el efecto, `GET`). Dos
peticiones, ninguna pantalla.

**Para tres de los cuatro pasos eso no tiene consecuencias, y para uno sí.** Los pasos 1 y 4
piden observar las líneas y la base del albarán antes y después; `TCS002` lo comprueba por
`GET` sobre el mismo dato, y es una sustitución legítima —lo que el paso quiere saber es el
estado, no el píxel—. El paso 2 es de otra naturaleza:

> **input:** «Desplegar el selector de tipo del formulario de añadir línea»
>
> **expected:** «El selector ofrece exactamente dos tipos, pieza y mano de obra, y ninguna
> otra opción»

**Eso no lo comprueba `TCS001` ni puede comprobarlo.** Que la API rechace un tercer tipo y
que el desplegable no lo ofrezca son dos afirmaciones independientes: un desplegable puede
ofrecer una opción que el servidor rechace, y es precisamente el modo de fallo que un paso
así existe para cazar. Y **no lo comprueba tampoco S-10**: `TC-041` no tiene escenario en
`automation/ui/` —A-05 lo ha verificado, no aparece en ningún `.feature`— porque `DOC-23` lo
excluye, con razón, por ser `service`.

**Resultado: el paso 2 de TC-041 no lo ejecuta ninguna de las dos suites.** El caso figura
hoy como ejecutado y en verde, y lo está; lo que no está es ese paso.

**Dos matices que bajan la gravedad, y que hay que dar porque son ciertos.** El primero: el
paso 2 **no lo pide el requisito**. `REQ-031` dice que «una anotación que no sea de ninguno
de esos dos tipos **no llega a registrarse**, de modo que el albarán mantiene las líneas y
los importes que ya tenía» — habla del rechazo y del efecto, no del contenido del
desplegable. Lo que se pierde es una comprobación **de más** que el caso se autoimpuso, no
una parte del enunciado. El segundo: es un solo paso de un solo caso, y `REQ-031` tiene su
vector cubierto y ejercido.

**Por qué se reporta igualmente.** Porque es la primera vez que este documento puede medir
la distancia entre *lo que un caso dice que hay que hacer* y *lo que la suite hace*, y la
respuesta ha sido «no coinciden» en la primera comparación posible. Es la misma familia que
`A-05-03b` —un verde que no comprueba todo lo que su ficha anuncia— con la diferencia de que
aquí la ficha lo dice explícitamente y en un campo propio.

**Severidad: aviso.** No toca la matriz, no cambia ningún diagnóstico y no rompe la
exportación. **Corrección: de A-03**, por dos caminos legítimos entre los que A-05 no elige
porque no le toca: (a) aceptar que `TC-041` es `service` de punta a punta y reescribir los
pasos 1, 2 y 4 para que ninguno prometa una observación de pantalla que nadie hará; o (b)
conservar el paso 2 sacándolo a un caso hermano `ui` que ejecute S-10, como ya se hizo con
la familia inversa en 1.6.0. La (a) es más barata y la (b) cubre más. **Qué se quiere probar
es de A-03**; si hace falta cubrirlo, criterio de A-11.

### 3.15 A-05-15 · borrar un albarán no devuelve el stock: ningún requisito dice si debe, ningún caso lo comprueba — **REQ-041, REQ-039** — nuevo

**Origen: `DOC-27` §4.1**, que lo reporta como hallazgo abierto sobre el servidor y lo
propone como candidato para `A-12 · Roadmap`. A-05 no lo recoge para repetirlo —eso sería
duplicar el trabajo de otro documento— sino porque **al cruzarlo con la matriz aparece algo
que `DOC-27` no podía ver desde donde está**: que no hay ningún requisito que decida si eso
es un defecto, y que el único caso que pasa por ahí está en verde sin haberlo mirado.

**Primero el hecho, verificado por A-05 en el servidor y no citado de `DOC-27`.** Las dos
rutas hacen cosas distintas con el stock. Al retirar **una línea**
(`server/routes/albarans.js:197-224`):

```js
db.prepare('DELETE FROM albara_linies WHERE id = ?').run(linia.id);
if (linia.tipus === 'peca') {
  db.prepare('UPDATE peces SET estoc = estoc + ? WHERE id = ?').run(linia.quantitat, linia.peca_id);
}
```

Al borrar **el albarán entero** (`server/routes/albarans.js:116-132`):

```js
db.prepare('DELETE FROM albara_linies WHERE albara_id = ?').run(req.params.id);
db.prepare('DELETE FROM albarans WHERE id = ?').run(req.params.id);
```

**No hay ningún `UPDATE peces`.** Las líneas de pieza desaparecen y el stock que
descontaron no vuelve.

**Ahora el cruce con DOC-04, que es lo que aporta este documento.** Los dos requisitos que
tocan el asunto dicen esto:

> **REQ-039** (`critical`): «**Al retirar una línea de pieza**, el sistema devuelve al stock
> de esa pieza la cantidad que se había consumido, en la misma operación que elimina la
> línea.»
>
> **REQ-041** (`medium`): «El sistema permite borrar un albarán no facturado **junto con
> todas sus líneas**, previa confirmación del usuario.»

Borrar el albarán retira todas sus líneas. ¿Cae eso bajo REQ-039, y entonces la aplicación
lo incumple? ¿O REQ-039 habla solo del caso de uso de retirar una línea suelta —`UC-ALB-05`,
su ancla— y lo que falta es un requisito que diga qué pasa con el stock por la otra vía?
**DOC-04 no lo decide, y A-05 no puede decidirlo por él**: es la forma exacta de `A-05-04`
—una consecuencia real del sistema que ningún enunciado gobierna—, con la diferencia de que
aquí hay dos requisitos que casi se tocan y ninguno se pronuncia.

**Y el caso que pasa por ahí no lo comprueba.** `REQ-041` tiene un solo caso, `TC-056`, que
no menciona el stock en ningún paso; su diagnóstico en la matriz es `Correcto` y su
resultado en `DOC-23` 2.2.0 es **VERDE**. Hay además una segunda cosa, y es de aislamiento:

| | `TC-056` en DOC-05 | El escenario que ejecuta S-10 |
|---|---|---|
| Precondición | «un albarán pendiente de facturar con **dos líneas: una de pieza** y una de mano de obra» (`DS-005`) | crea un albarán nuevo y le añade **solo una línea de mano de obra** |
| `touches` | `[albarans, albara_linies]` | — |
| `restores_state` | `false` | — |

Verificado por A-05 en `automation/ui/…/features/albarans.feature:509-531`: el escenario
rellena «Lista: Tipo» con «Mano de obra», añade la línea, borra el albarán y valida el
literal de confirmación. **Nunca crea una línea de pieza.** Dos consecuencias, y conviene no
confundirlas:

1. **El verde de `TC-056` no atraviesa el camino donde vive la diferencia.** Es un verde
   legítimo de lo que ejecuta, y no dice nada sobre el stock — ni podría, porque no hay
   pieza. Aunque mañana el escenario se alineara con su precondición, seguiría en verde: el
   caso tampoco tiene un paso que mire el stock.
2. **`touches` no declara `peces.estoc`, y con la precondición escrita debería.** Ocho casos
   del plan sí lo declaran (`TC-029`, `TC-040`, `TC-044`, `TC-046`, `TC-047`, `TC-048`,
   `TC-053`, `TC-054`). `S-14` deriva los carriles de ese campo, y hoy coloca a `TC-056` en
   el carril serial de 17 de todos modos —por `albarans`, no por el stock—, así que **no hay
   colisión real hoy**. Lo que hay es una declaración incompleta que protege por accidente:
   justo el terreno de `A-05-08b`, donde el par `TC-040`/`TC-048` ya demostró qué ocurre
   cuando el orden real y el declarado no coinciden.

**Severidad: aviso**, y **tres destinatarios que no hay que mezclar**:

| Quién | Qué le toca |
|---|---|
| **Producto / A-02** | Decidir si borrar un albarán debe devolver el stock. Si sí, hay un defecto de aplicación y le corresponde entrada en `DOC-24` o evolutivo; si no, falta un requisito que lo diga, y es de **A-02** |
| **A-03** | Después de esa decisión: añadir `peces.estoc` a `touches` de `TC-056` —eso ya, es independiente— y, si procede, el paso que mire el stock |
| **`s10-auto-tcs`** | Alinear el escenario con la precondición `DS-005` del caso, o pedir a A-03 que la precondición cambie. Hoy no coinciden |

**A-05 no arregla ninguna de las tres**, y en particular no toca `automation/ui/`: la regla
de este proyecto es que quien mantiene las pruebas y quien las analiza no son el mismo, y esa
regla es lo que hace que este apartado valga algo.

### 3.16 A-05-16 · la familia `TCS-nnn` nace fuera de `registro-ids.json` — nuevo

**Origen: la pregunta 1 de `DOC-27` §6**, que la plantea sin resolverla: «¿Debe la familia
`TCS-nnn` darse de alta en `registro-ids.json`? Hoy los identificadores se asignan en la
colección y se respeta la regla de no reutilizarlos, pero **no hay nada que lo impida
mecánicamente**, a diferencia de `REQ`, `TC`, `UC` y `BR`.»

**El hecho, verificado:** `registro-ids.json` tiene 317 anclas y **ninguna** contiene la
cadena `TCS`. Los diez identificadores viven en el `name` de cada petición de
`automation/api/tallerMecaniccollection.json`, con el formato
`TCS005 · TC-063 · Rechazar la emisión con un albarán ya facturado`.

**Por qué esto es de A-05 y no de nadie más.** Este documento existe para vigilar que la
cadena `REQ-nnn → TC-nnn` no derive, y una de sus seis reglas bloqueantes es precisamente
`fuera_de_registro`. `DOC-27` acaba de añadir un eslabón nuevo por debajo —`TC-nnn →
TCS-nnn`— y ese eslabón **no lo vigila nadie**: ni S-12, que no conoce la familia; ni este
documento, cuyo JOIN no baja de `TC-nnn`; ni S-14. Hoy lo único que impide que `TCS005`
signifique mañana otra comprobación es el cuidado de quien edite el fichero de la colección,
que es exactamente la situación en la que estaban los `TC-nnn` antes de que existiera el
registro.

**Qué se arriesga, en concreto.** La correspondencia `TCS-nnn → TC-nnn` solo está escrita en
dos sitios: el `name` de la petición y la tabla de `DOC-27` §2. Si una petición se renombra o
se retira, su número queda libre en silencio y el `DOC-27` de la ejecución siguiente puede
reutilizarlo para otra cosa sin que ningún control se entere. El daño no llega a la matriz
—un `TCS` no viaja a Rally, §3.1— pero sí a la posibilidad de comparar dos informes de
ejecución entre sí, que es para lo que sirve numerar las comprobaciones.

**Severidad: aviso.** **La decisión no es de A-05**: dar de alta una familia nueva cambia el
contrato de `registro-ids.json`, y eso es de **S-12** y de quien gobierne el canon `DOC-nn`.
Lo que A-05 sí puede decir, porque es su terreno, es que **el argumento que hizo que valiera
la pena registrar los `TC-nnn` se aplica sin cambios a los `TCS-nnn`**, y que si la respuesta
es que no se registran, conviene que quede escrita como decisión y no como omisión — que es
la diferencia entre un riesgo aceptado y un descuido.

## 4. La matriz

La matriz completa está en **`docs/DOC-07-MATRIZ.csv`** — 81 filas, una por requisito,
con la cabecera canónica:

```
requirement_id,requirement_statement,module,priority,test_case_ids,test_case_count,exists_in_rally,executed,result,diagnosis
```

**No hay ninguna fila con diagnóstico distinto de `Correcto`**, así que la tabla de
excepciones que normalmente ocuparía esta sección está vacía. Se remite al CSV para el
detalle requisito a requisito. Las filas con reserva en este documento son **veintisiete**,
una más que en 1.10.0: entra **REQ-080** porque la pregunta `Q-30` de DOC-04 (`open`) lo
alcanza junto a REQ-015. Los **9 casos nuevos** (TC-111…TC-119) no crean ninguna otra
reserva: los cinco requisitos que los reciben ya la tenían o cierran limpio (REQ-042,
REQ-081). El texto de 1.10.0 sobre `A-05-14` y la confirmación por ejecución de REQ-033 /
REQ-045 / REQ-046 se conserva sin cambios.

| requirement_id | module | priority | test_case_ids | count | diagnosis | Reserva |
|---|---|---|---:|---|---|---|
| REQ-010 | vehicles | critical | TC-013;TC-014 | 2 | Correcto | A-05-08 (TC-014 en ola 1) · ⑤ Q-24 |
| **REQ-011** | vehicles | critical | TC-015 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-019 | peces | high | TC-025 | 1 | Correcto | A-05-08 (toda la cobertura en ola 1) · A-05-03 BUG-003 · ② |
| **REQ-025** | albarans | high | TC-032;TC-033 | 2 | Correcto | **A-05-11c** — **los dos casos son inejecutables**; decisión de producto |
| **REQ-027** | albarans | critical | TC-036;TC-116 | 2 | Correcto | **A-05-11b** (mitad del vector; TC-116 `service` nuevo — ¿la cierra? pendiente de §3.11) · `critico_caso_unico` |
| REQ-028 | albarans | critical | TC-037 | 1 | Correcto | A-05-08b (caso único en el carril de 17) · ① |
| REQ-029 | albarans | high | TC-038;TC-039 | 2 | Correcto | ③ Q-16 (de DOC-05, sin cambios) |
| REQ-030 | albarans | critical | TC-040 | 1 | Correcto | A-05-08b · TC-040 causó el rojo de TC-048 en `DOC-23` 2.1.0; **aislado y corregido en 2.2.0** — el riesgo estructural del carril sigue abierto |
| **REQ-031** | albarans | high | TC-041 | 1 | Correcto | A-05-01a **cerrado**; queda ⑤ `Q-30` **de DOC-06** (ahora en colisión con la `Q-30` de DOC-04, §3.8). `service`, **ejecutado y verde** (`DOC-27`) · **A-05-14**: su paso 2 no lo ejerce ninguna suite |
| REQ-032 | albarans | critical | TC-042;TC-043;TC-044 | 3 | Correcto | ⑤ |
| REQ-033 | albarans | critical | TC-045 | 1 | Correcto | `critico_caso_unico`; **A-05-11 resuelto y confirmado**: `service`, ejercido en `DOC-27` (`TCS003`–`TCS004`) |
| **REQ-034** | albarans | high | TC-046;TC-047 | 2 | Correcto | **A-05-11c** (TC-047 inejecutable; TC-046 sí) |
| REQ-035 | albarans | critical | TC-048;TC-049 | 2 | Correcto | A-05-03 · BUG-001 · ② · TC-048 fue el rojo por aislamiento de `DOC-23` 2.1.0, **corregido y verde en 2.2.0** |
| REQ-036 | albarans | critical | TC-050 | 1 | Correcto | A-05-08b (caso único en el carril de 17) · ② |
| REQ-040 | albarans | medium | TC-055;TC-112;TC-114 | 3 | Correcto | A-05-03 · BUG-002 · ② · DOC-09 §3.1 (SPE-06 suma TC-112/TC-114: el cambio de vehículo **dentro** del mismo cliente) |
| **REQ-041** | albarans | medium | TC-056 | 1 | Correcto | **A-05-15** — borrar el albarán no devuelve el stock; ni DOC-04 lo decide ni TC-056 lo mira |
| **REQ-080** | albarans | critical | TC-111;TC-113;TC-119 | 3 | Correcto | **nuevo (SPE-06)** · ① `Q-30` de DOC-04 (`open`, alcanza REQ-015 y REQ-080) · cobertura mixta: TC-111/TC-113 `service`, TC-119 `mixed` |
| REQ-043 | factures | critical | TC-060;TC-061 | 2 | Correcto | A-05-03 · BUG-004 · ② · ⑤ Q-24, Q-27 |
| REQ-045 | factures | critical | TC-063 | 1 | Correcto | `critico_caso_unico`; **A-05-11 resuelto y confirmado**: `service`, ejercido en `DOC-27` (`TCS005`–`TCS007`) |
| REQ-046 | factures | critical | TC-064 | 1 | Correcto | **A-05-11a CERRADO y confirmado por ejecución** (`DOC-27`, `TCS008`–`TCS010`); quedan ② y `critico_caso_unico` |
| REQ-048 | factures | high | TC-067;TC-068 | 2 | Correcto | ③ Q-16 (de DOC-05, sin cambios) |
| **REQ-051** | factures | high | TC-073 | 1 | Correcto | **A-05-03b** (defecto corregido; el caso sigue sin comprobar el IVA) · ③ Q-17 |
| **REQ-053** | factures | high | TC-075 | 1 | Correcto | **A-05-03b** (defecto corregido; el caso sigue sin comprobar el IVA) |
| REQ-055 | factures | high | TC-078 | 1 | Correcto | A-05-01b · ① · ② |
| REQ-057 | personal | high | TC-080 | 1 | Correcto | A-05-08 (toda la cobertura en ola 1) |
| **REQ-065** | nomines | critical | TC-090 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-073 | nomines | high | TC-103 | 1 | Correcto | A-05-01b · ① · ② |

Las veintisiete filas de arriba dicen `Correcto` y las veintisiete tienen reserva. **No es
una contradicción, es el alcance del fichero**: la columna `diagnosis` responde a «¿hay
caso?», no a «¿sirve el caso?», ni a «¿está sano el requisito?», ni a «¿se ha decidido ya
qué probar?», ni a «¿puede ejecutarse ese caso por sí solo?», ni a «¿puede ese caso
componer su vector por la vía que declara?», ni —desde hoy— a «**¿comprueba el caso lo que
su nombre anuncia?**». La columna «Reserva» es de esta tabla y **no existe en el CSV**:
añadirla rompería el contrato que consume S-07.

**Qué cambia en el CSV respecto de 1.10.0.** Tras ocho versiones byte a byte idéntico, el
fichero **sí cambia**: +2 filas (REQ-080, REQ-081) y +9 casos, porque esta vez sí han
cambiado de contenido las dos entradas del JOIN. **No lo ha regenerado A-05**: lo hizo S-14
en el commit `621ea3b` (`matriz.js`, determinista); esta ejecución de A-05 solo verifica su
salida y pone la prosa a la par. La cabecera, las 10 columnas y los diagnósticos posibles
(`Correcto`, `GAP PLAN`) no cambian; sigue sin haber ni un `GAP EXPORT`.

**La advertencia de 1.7.0 se mantiene**: la columna `diagnosis` mide una sola cosa —¿hay
caso?— y la mide bien. Todo lo demás —vía de verificación, evidencia de ejecución, salud
del requisito— vive en la prosa de este documento, y por eso este documento existe.

**Verificaciones hechas sobre el CSV (salida de S-14) antes de citarlo.** Las 81 filas
parsean con 10 columnas cada una según RFC 4180; los enunciados con coma van entrecomillados
y sobreviven al ida y vuelta de parseo; los **119** `TC-nnn` de DOC-05 aparecen en alguna
fila y ninguna fila cita un `TC-nnn` inexistente; cada `REQ-nnn` de DOC-04 aparece en
**exactamente una** fila (81 IDs distintos); la suma de `test_case_count` es **119**; las
tres columnas de Rally valen `n/d` en **las 81**; el fichero **no contiene la cadena
`GAP EXPORT`** (0 ocurrencias); los 81 diagnósticos son `Correcto` y **ninguno es
`GAP PLAN`**.

## 5. Cobertura por módulo, por prioridad, por orden de ejecución y por vía

### 5.1 Por módulo

| Módulo | Requisitos | Cubiertos | GAP PLAN | Casos | Casos/req | ①∪②∪③ | ⑤ solo | **Unión** | ui-only |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| clients | 8 | 8 | 0 | 11 | 1,38 | 0 | 5 | **5** | 8 |
| vehicles | 9 | 9 | 0 | 12 | 1,33 | 0 | 6 | **6** | 9 |
| peces | 7 | 7 | 0 | 8 | 1,14 | 4 | 3 | **7** | 7 |
| albarans | **20** | **20** | 0 | **37** | **1,85** | 9 \* | 6 \* | 15 \* | 16 \* |
| factures | 13 | 13 | 0 | 19 | 1,46 | 10 \* | 3 \* | 13 \* | 11 \* |
| personal | 7 | 7 | 0 | 8 | 1,14 | 0 | 6 | **6** | 7 |
| nomines | 12 | 12 | 0 | 18 | 1,50 | 7 | 3 | **10** | 12 |
| shell | 4 | 4 | 0 | 5 | 1,25 | 2 | 0 | **2** | 4 |
| configuracio | 1 | 1 | 0 | 1 | 1,00 | 1 | 0 | **1** | 1 |
| **Total** | **81** | **81** | **0** | **119** | **1,47** | 33 \* | 32 \* | 65 \* | 75 \* |

No hay huecos de cobertura que localizar por módulo: **los dos requisitos nuevos de SPE-06,
REQ-080 y REQ-081, entran cubiertos**, y con ellos `albarans` pasa a 20 de 20 y a 37 casos
(1,85 por requisito, el módulo más denso). La concentración de trabajo pendiente sigue en el
ciclo del dinero, `factures` y `albarans`.

**Columnas marcadas `\*`:** los alcances `①∪②∪③`, `⑤ solo`, `Unión` y `ui-only` se
conservan de 1.10.0 con el único ajuste seguro —REQ-080 entra en `①` por `Q-30`, lo que
sube `albarans` y el total en una unidad—; el reparto fino por vía de los 9 casos nuevos y
su efecto en `ui-only` se re-derivará en la próxima regeneración completa (§5.6).

### 5.2 Por prioridad del requisito

| Prioridad (DOC-04) | Requisitos | Cubiertos | GAP PLAN | Casos | ①∪②∪③ \* | ⑤ solo \* | Unión \* | Defecto confirmado | ui-only \* | A-05-11 \* |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| critical | **36** | **36** | 0 | **61** | 11 | 16 | 27 | 2 | 32 | 3 |
| high | **28** | **28** | 0 | **37** | 14 | 8 | 22 | 1 | 26 | 2 |
| medium | 15 | 15 | 0 | **19** | 6 | 8 | 14 | 1 | 15 | 0 |
| low | 2 | 2 | 0 | 2 | 2 | 0 | 2 | 0 | 2 | 0 |

**REQ-080 (`critical`) y REQ-081 (`high`) entran cubiertos.** Las columnas `\*` se
conservan de 1.10.0 con el único ajuste seguro: REQ-080 entra en `①` vía `Q-30`, así que
los `critical` con algo pendiente pasan de 10 a 11 y su unión de 26 a 27. El resto —el
reparto por vía y `ui-only` de los 9 casos nuevos, y si REQ-027 sale de `A-05-11` al ganar
TC-116— se re-derivará en la próxima regeneración completa (§5.6, §3.11).

**A-05-11: pendiente de recuento.** En 1.10.0 eran 5 requisitos (3 `critical` de A-05-11b +
2 `high` de A-05-11c). SPE-06 no crea ninguno nuevo, pero TC-116 (`service`) podría cerrar
la mitad de vector que le faltaba a REQ-027; queda para §3.11 de la próxima regeneración.

**A-05-11 en 1.10.0 —análisis que se conserva—:** En 1.6.0 los cuatro eran
`critical`; hoy son **tres `critical`** —REQ-011, REQ-027 y REQ-065, los de A-05-11b— y
**dos `high`** —REQ-025 y REQ-034, los nuevos de A-05-11c—. El argumento estructural de
1.6.0 se mantiene para la mitad `critical` y hay que corregirlo para la otra: los
`critical` caen en A-05-11 porque enuncian reglas de protección, se prueban con casos
`Negative` y un `Negative` intenta lo que el sistema impide. **Los dos `high` nuevos caen
por el motivo contrario**: TC-032, TC-033 y TC-047 son `Functional` y describen lo que el
sistema *debe permitir*. Su vector no existe en la pantalla no porque la pantalla lo
impida, sino porque **la funcionalidad no está construida**. 1.6.0 dio por seguro que los
70 casos `Functional` e `Integration` «no son el riesgo, porque fallarían de forma ruidosa
el primer día». Fallaron el primer día, en efecto —al automatizarlos—, pero **no
ruidosamente: se quedaron sin escribir**, y un caso que no llega a existir no sale rojo en
ningún informe. Esa suposición queda corregida.

**Defecto confirmado vuelve a 4 tras haber subido a 6 en 1.7.0.** REQ-051 y REQ-053
entraron entonces por `EXP-007`; `DOC-14` 2.0.0 lo reproduce y lo marca corregido, así que
los dos salen de este recuento (§3.4). No es que el hallazgo desaparezca —`A-05-03b` sigue
abierto—, es que deja de ser un defecto de sistema confirmado.

### 5.3 Por prioridad y por tipo del caso

| Prioridad (DOC-05) | Casos | vs 1.10.0 |
|---|---:|---|
| Critical | 55 | **+6** (TC-111/112/113/115/116/119) |
| High | 32 | **+1** (TC-117) |
| Medium | 30 | **+2** (TC-114, TC-118) |
| Low | 2 | = |
| **Total** | **119** | **+9** |

Por tipo: **68 `Functional`, 34 `Negative`, 10 `Boundary` y 7 `Integration`** (SPE-06 suma
2 · 3 · 1 · 3). Los 36 requisitos `critical` reciben 61 casos y **los 36 tienen al menos un
caso `Critical`** (REQ-080, el único nuevo, con TC-111).

### 5.4 Por orden de ejecución — A-05-08, sin cambios

Este apartado **no reproduce el plan de ejecución**: está en **DOC-05 §4.10**, escrito por
su dueño y con más detalle del que cabría aquí, y copiarlo crearía una segunda fuente de
verdad que derivaría en silencio. Lo que sí es de A-05 es la intersección entre el plan y
la matriz, porque hay una pregunta que sólo se puede contestar con los dos delante: **¿puede
producirse la evidencia de este requisito por sí sola?**

**El plan de ejecución de DOC-05 para los 9 casos nuevos no se ha vuelto a derivar en esta
pasada** (§ «Qué cambia en 1.11.0»): la tabla siguiente es la de 1.10.0. Lo único seguro es
que `Casos sin aislamiento declarado` sigue en 0 —DOC-05 1.8.0 declara `touches` y
precondiciones en los 119—.

| | Valor | vs 1.10.0 |
|---|---:|---|
| Olas | 2 | = (recuento por confirmar) |
| Ola 0 | 107 casos en 67 carriles | 1.10.0; +9 casos por ubicar |
| Ola 1 | 3 casos en 3 carriles | = |
| Paralelismo máximo | 67 | 1.10.0 |
| Carril más largo | 17 casos | 1.10.0 |
| Casos sin aislamiento declarado | **0 de 119** | = |

**A-05-08 · cobertura condicionada**, sin cambios:

| Requisito | Prio. | Casos | En ola 1 | Depende de | …que prueba | Prio. |
|---|---|---|---|---|---|---|
| **REQ-019** | high | TC-025 | **1 de 1** | TC-030 | REQ-023 | medium |
| **REQ-057** | high | TC-080 | **1 de 1** | TC-085 | REQ-061 | medium |
| REQ-010 | critical | TC-013, TC-014 | 1 de 2 | TC-022 | REQ-016 | medium |

**Dos requisitos `high` tienen toda su evidencia colgando de que pase antes el caso de un
requisito `medium`.** La precedencia va del requisito menos importante al más importante,
que es la dirección incómoda. **REQ-019 sigue siendo el requisito más cargado del
proyecto**: un solo caso, ese caso en la ola 1, un defecto confirmado que ese caso no
detecta (BUG-003), y presencia en dos alcances de preguntas abiertas.

**A-05-08b**, sin cambios en las cifras: tres de los 17 `critical` de caso único —**REQ-028
(TC-037), REQ-030 (TC-040) y REQ-036 (TC-050)**— tienen su única prueba dentro del carril
serial de 17 casos, que es donde un fallo temprano deja sin ejecutar todo lo que viene
detrás. Uno de los tres, TC-040, ya protagonizó el escenario que lo demostró (§3.7); el
parche de esa sesión no cubre a los otros dos.

**Corrección:** de **S-06 / DOC-13**, no de A-03. Coste: tres datos de prueba.

### 5.5 Grados de automatización y ejecución real — contexto, no cobertura, y por primera vez con dos fuentes

**Análisis sin cambios desde 1.10.0** salvo por los denominadores. Los 9 casos nuevos de
SPE-06 (4 `service`, 4 `ui`, 1 `mixed`) **aún no tienen ejecución publicada** en ninguna de
las dos suites: ni `DOC-23` 2.2.0 ni `DOC-27` 1.0.0 los cubren. La evidencia de ejecución
publicada sigue siendo de **106 casos, ahora sobre 119** (era sobre 110); la brecha pasa de
4 a 13. Las cifras de grado de automatización de abajo son las de 1.10.0.

| Grado | Casos | Qué significa |
|---|---:|---|
| `high` | 25 | Actúan sobre campos de `EntityForm`, que llevan `id={field.name}` y son estables |
| `medium` | **80** | Automatizables con mantenimiento previsible |
| `low` | 4 | TC-078, TC-103, TC-108, TC-110 |
| `not-recommended` | 1 | TC-109 |
| **`blocked: true`** | **0** | **nadie ha prohibido automatizar ningún caso** |

**Estas cifras no entran en la matriz y no deben entrar.** El grado de automatización no
mide cobertura: un caso `medium` cubre su requisito exactamente igual que uno `high`. Se
recogen porque `blocked: 0` es el dato que S-10 necesita y porque el reparto tiene una
causa medida (A-05-10, §3.9).

**Desde 1.7.0 ya no hay que estimar el reparto entre automatizadores: está medido, y sigue
igual.** DOC-05 1.6.0 deja el plan en **106 casos `ui`** —de `S-10`, Selenium + Cucumber,
`automation/ui/`— y **4 casos `service`** —de `S-17`, `automation/api/`—. 1.6.0 predijo
que corregir A-05-11 entero llevaría el reparto a 105/5; el reparto real es 106/4, y la
diferencia se explica sola: se corrigieron tres casos en vez de uno, y los tres hermanos
de A-05-11b siguen sin escribirse.

**Lo que cambia en 1.10.0 no es el reparto: es que los dos lados del reparto ya informan.**
Hasta ayer, la cola de `S-10` tenía informe versionado —`DOC-23`, desde el principio— y la
de `S-17` no tenía ninguno. Cuatro casos asignados a un automatizador que no publicaba
resultados equivalían, para este documento, a cuatro casos sin evidencia. `DOC-27` 1.0.0
—que su propio historial describe como el fin de una asimetría «sin justificación»— cierra
ese hueco.

**Lo que DOC-23 añade encima, sin cambios desde 1.9.1:**

| Magnitud | 2.0.0 (1.8.0) | 2.2.0 (esta versión) |
|---|---:|---:|
| Casos de DOC-05 con escenario automatizado | 102 de 110 | **102 de 110** (=) |
| Escenarios ejecutados | 107 | 107 |
| En verde | 106 | **107** |
| En rojo | 1 (TC-048) | **0** |
| Excluidos con causa verificada | 8 | 8 |

**La fecha ya no es el problema que era en 1.8.0, y conviene decir con precisión por qué,
sin perder el residuo que queda.** `DOC-23` 2.0.0 se generó el 2026-08-21, un día antes de
que `SPEC 05` cambiara el separador decimal y entrara en `Implemented` (2026-08-22): su
«106 en verde» era una fotografía de antes del cambio. Ya no hay una foto así de vieja: la
2.1.0, del 2026-08-23, confirmó con ejecución real —no con la lectura de código que
sostenía A-05-13 hasta entonces— los 17 casos exactos afectados por `EXP-027`, más el
aislamiento TC-040/TC-048 (§3.7) y un rojo aislado de infraestructura; la 2.2.0, el mismo
día, documenta que los 18 se corrigieron —commits `735ded8` y `5366e18`— y volvieron a
pasar. A-05 ha verificado la corrección directamente en el código (§2, §3.4, §3.13), no
solo leído la declaración de DOC-23. **El residuo que queda, y que sí hay que declarar**:
la verificación de los 18 casos corregidos en 2.2.0 fue una **reejecución dirigida** a esos
18, con `-Dcucumber.filter.tags` —no la suite completa—; los 89 que ya eran verdes en 2.1.0
no se han vuelto a ejecutar desde entonces. El propio `DOC-23` 2.2.0 lo dice sin rodeos: «la
próxima ejecución completa de la suite es la que debe confirmar el 107/107 de forma
independiente». El 107 de 107 de la tabla de arriba es, por tanto, un 107/107 **por
composición de dos ejecuciones parciales**, no de una sola pasada íntegra. No es un motivo
para desconfiar de la cifra —los 18 casos corregidos se verificaron exactamente sobre lo
que había fallado, con la causa raíz identificada y corregida en la fuente, no
adivinada—, pero es la clase de matiz que este documento no calla cuando lo encuentra.

Los 8 excluidos merecen desglose porque **no son todos la misma cosa**, y confundirlos
sería perder el hallazgo de §3.11. Esta es la tabla que más cambia en 1.10.0:

| Excluidos de la suite de navegador | Casos | Qué son | vs 1.9.1 |
|---|---|---|---|
| Ejecutados por la suite de servicio | TC-041, TC-045, TC-063, TC-064 | **correcto, y ya no es una promesa**: `DOC-27` 1.0.0 los ejecuta, 10 `TCS-nnn` en verde | **eran «los ejecutará S-17»** |
| Marcados `not-recommended` por el propio plan | TC-109 | **correcto**: se ejecuta a mano; **sigue sin constar ejecutado por nadie** | = |
| **Declaran `ui` y no tienen vector en la interfaz** | **TC-032, TC-033, TC-047** | **A-05-11c**, §3.11 | = |

**La primera fila decía «los ejecutará S-17, no S-10», en futuro, y llevaba así desde
1.7.0.** Era una atribución de responsabilidad, no un dato de ejecución, y este documento
la daba por buena porque no tenía nada mejor. La distinción importa: durante tres versiones,
`DOC-07` presentó como «correcto» el hecho de que cuatro casos —tres de ellos `Critical`,
`Negative` y caso único de un requisito `critical`— **no constaran ejecutados por nadie**.
Correcto lo era, en el sentido de que estaban en la cola adecuada; lo que no había era
ninguna forma de saber si esa cola se vaciaba alguna vez. Ahora la hay.

**Cómo queda la evidencia de ejecución del plan, sumando las dos fuentes:**

| | Casos | Fuente | Estado |
|---|---:|---|---|
| Ejecutados por interfaz | **102** | `DOC-23` 2.2.0 (S-10, Selenium + Cucumber) | 107 de 107 escenarios en verde |
| Ejecutados por servicio | **4** | `DOC-27` 1.0.0 (S-17, colección Postman) | 10 de 10 `TCS-nnn` en verde |
| **Con evidencia publicada** | **106 de 110** | — | — |
| Sin evidencia de ejecución | **4** | — | TC-032, TC-033, TC-047 (`A-05-11c`) y TC-109 (`not-recommended`) |

**Y hay que leer ese 106 con el mismo cuidado con el que se lee el 100 % de cobertura.** No
son 106 casos «que pasan»: son 106 casos **de los que alguien ha publicado un resultado**.
Los cuatro que faltan no son un descuido de nadie —tres esperan una decisión de producto y
el cuarto se ejecuta a mano por decisión del plan—, pero siguen siendo cuatro casos de los
que, si mañana se pregunta en el Go/No-Go «¿esto se ha probado?», la respuesta honesta es
que no consta.

**Nada de esto entra en el CSV ni cambia un diagnóstico.** 106 de 119 con evidencia de
ejecución es una cifra de madurez de las suites, no de cobertura de requisitos: la cobertura
sigue siendo 100 % porque los 119 casos existen y los 81 requisitos tienen el suyo. Un caso
sin escenario automatizado sigue cubriendo su requisito; lo que no hace es producir
evidencia sin que alguien se siente a ejecutarlo.

### 5.6 Por vía de verificación

DOC-05 1.8.0 declara `verification_path` en los 119 casos. Contado sobre el YAML por A-05:
**110 `ui`, 8 `service`, 1 `mixed`, 0 sin declarar** (eran 106/4/0 en 1.6.0). Los 9 casos
nuevos aportan 4 `service` (TC-111, TC-113, TC-115, TC-116), 4 `ui` (TC-112, TC-114,
TC-117, TC-118) y el **primer `mixed` del plan**, TC-119.

**A-05-12 (§3.12) — pendiente de re-verificar contra DOC-05 1.8.0.** El resumen del
front-matter de DOC-05 llevaba desde 1.6.0 sin cuadrar con su propio YAML; la nota de DOC-05
1.8.0 sugiere que A-03 lo ha tocado en este ciclo. La comprobación de coherencia entre
resumen y datos se rehará en la próxima regeneración completa.

**El análisis por requisito de abajo es el de 1.10.0** (`ui-only` 75, `service` 4,
`critical` ui-only 32/35); SPE-06 añade a `albarans` requisitos con cobertura por servicio
y el primero con cobertura `mixed` (REQ-080, por TC-119), lo que baja `ui-only` — el nuevo
recuento exacto queda para la regeneración completa.

| | Requisitos | % | Nota |
|---|---:|---:|---|
| Cobertura enteramente por interfaz (`ui`) | 75 \* | — | 1.10.0; baja con SPE-06 |
| Cobertura enteramente por servicio | 4 \* (REQ-031, REQ-033, REQ-045, REQ-046) | — | + los nuevos de `albarans` (REQ-080/081/027/042 tienen casos `service`) |
| Cobertura mixta (casos por las dos vías) | **1** | — | **REQ-080**, por TC-119 — primera del plan |
| **`critical` con cobertura enteramente por interfaz** | 32 de 36 \* | — | 1.10.0, denominador +1 |

**Cómo NO hay que leer este 94,9 %.** No es un hueco de cobertura y no se presenta como
tal. La política de A-03 —*un caso va por servicio sólo cuando el vector no existe en la
interfaz*— es deliberadamente restrictiva y **A-05 la respalda sin reservas**: duplicar
cada validación por las dos vías multiplicaría la suite por dos para comprobar dos veces
la misma regla, y la segunda copia se rompería con cada cambio del servidor sin aportar
cobertura nueva. Que 106 casos sean `ui` significa que 106 vectores existen en la
pantalla, y eso es exactamente lo que debe pasar.

**Cómo sí hay que leerlo.** El dato que importa no es cuántos requisitos son `ui-only`,
sino **la intersección entre «toda su cobertura es `ui`» y «su vector no se puede componer
por `ui`»**. Esa intersección tenía cuatro requisitos en 1.6.0; hoy tiene **cinco**, y no
porque el problema haya crecido sino porque se ha mirado mejor: salen los tres que A-03
reclasificó y entran los dos que la automatización destapó.

| | 1.6.0 | 1.10.0 |
|---|---|---|
| REQ-046 (TC-064) | en la intersección | **fuera**: el caso es `service`, y `DOC-27` lo ha ejercido por esa vía |
| REQ-011, REQ-027, REQ-065 | dentro, a medias | dentro, a medias, sin cambios |
| REQ-025 (TC-032, TC-033) | no detectado | **dentro, entero** |
| REQ-034 (TC-047) | no detectado | **dentro, a medias** |

**Y aquí sigue el límite honesto de esta medición, ahora con una excepción de tamaño
conocido.** `verification_path` dice **por qué vía se declara** que se ejerce un caso; **no
dice si el vector existe en esa vía**. Es un campo declarativo, no verificado, y nada en el
contrato, ni en S-14, ni en este documento puede comprobarlo automáticamente.

**La excepción: para los 4 casos `service`, desde hoy sí está verificado, y no por este
documento.** `DOC-27` compuso los cuatro intentos contra el servicio y los cuatro fueron
rechazados con el mensaje esperado (§3.11). Es exactamente lo que el campo declaraba, y es
la primera vez que la declaración se contrasta con un hecho en vez de con una lectura de
código. Conviene medir bien el alcance de esa buena noticia: **4 de 110**. Para los otros
106 el campo sigue siendo una promesa, y de esos, cinco requisitos tienen una promesa que
ya sabemos que no se cumple (`A-05-11b` y `A-05-11c`). La forma de reducir esa cifra es la
de siempre y no ha cambiado: intentar ejecutarlos. Lo que 1.6.0 añadía a
continuación —que el espacio donde esconderse eran los 40 `Negative` y `Boundary`, porque
los `Functional` fallarían ruidosamente el primer día— **era falso, y esta versión lo
sabe**. TC-032, TC-033 y TC-047 son `Functional`. No fallaron ruidosamente: **nunca
llegaron a escribirse**, y un caso que no se escribe no aparece en rojo en ningún sitio.
Solo aparece en una lista de exclusiones, si alguien la escribe. S-10 la escribió.

En consecuencia, y ahora con la corrección hecha:

- Los cinco requisitos de A-05-11 son **los que se han encontrado**, no necesariamente
  todos los que hay.
- **El único método que ha demostrado encontrarlos es intentar automatizarlos.** El
  barrido de §4.12 sobre el YAML encontró cuatro dudosos; A-07 encontró uno leyendo
  código; la generación de escenarios de S-10 encontró **cinco de una vez** —los tres
  reclasificados y los tres de A-05-11c, con TC-064 solapado—. Escribir el automatismo
  obliga a comprobar que el vector existe, y ninguna revisión documental sustituye eso.
- Quedan **8 casos sin automatizar**, y de esos, los tres de A-05-11c ya están
  diagnosticados. Los `Functional` que sí se automatizaron y salieron verdes son, por
  construcción, casos cuyo vector existe.

## 6. Narrativa de riesgos

**Sin cambios de fondo desde 1.10.0.** SPE-06 no cambia ningún riesgo de este apartado;
solo añade que los **9 casos nuevos** de albaranes se exportarán sin evidencia de ejecución
—ninguna de las dos suites los cubre todavía (§5.5)— y que **4 de ellos son `service`**, así
que su vía dependerá de que S-17 amplíe la colección. El resto de la narrativa es la de
1.10.0.

**Aún no hay datos de ejecución en Rally.** Esta sección es propia de la pasada `post` y
no puede escribirse ahora: no existen `DOC-19-RALLY-TESTCASES.csv` ni
`DOC-20-RALLY-STATE.json`, es decir, los 119 casos no se han exportado, no constan
ejecutados en Rally y no tienen resultado registrado allí. Cualquier afirmación sobre qué
diría esa ejecución sería especulación, no trazabilidad.

**Y la tentación crece otra vez, ahora por partida doble.** `DOC-23` 2.2.0 trae 102 casos
del plan ejecutados y **107 de 107 escenarios en verde**; `DOC-27` 1.0.0 trae los **4 que
faltaban, con 10 comprobaciones en verde**. Entre las dos, 106 de los 110 casos del plan
tienen hoy un resultado publicado y **ninguno de los dos informes tiene un solo rojo**. Es
lo más cerca que este proyecto ha estado nunca de tener resultados, y aun así no llena este
hueco: **una suite local no es Rally**, `exists_in_rally` sigue sin haber sido mirado por
nadie, y las tres columnas del CSV preguntan por Rally. Que ahora haya dos fuentes en vez de
una hace la tentación mayor y el error idéntico: **dos fuentes distintas en una columna que
nombra una tercera es peor, no mejor, que una sola fuente equivocada.** Escribir aquí la narrativa de riesgos con los datos de DOC-23 sería
exactamente el mismo error que escribir «No» donde toca `n/d`: dar por medido lo que se ha
medido en otro sitio y con otro alcance. Lo que sí se puede hacer —y se ha hecho a lo largo
de §3 y §5— es usar DOC-23 **como evidencia citada, con su procedencia al lado**, para
sostener hallazgos concretos.

Lo que sí puede afirmarse hoy, y sólo esto:

- el plan no deja ningún requisito sin caso definido, ni ningún requisito crítico sin un
  caso crítico;
- **el hallazgo más grave de 1.6.0 no solo sigue corregido: se ha comprobado ejecutándolo.**
  TC-064 —y con él TC-063 y TC-045— ya no declara una vía por la que su vector no se puede
  componer, y esta vez no es una inferencia sobre el código: los tres intentos se
  formularon contra el servicio y los tres fueron rechazados (§3.11);
- **cuatro casos del plan han dejado de ser un punto ciego de la evidencia.** Hasta ayer,
  `TC-041`, `TC-045`, `TC-063` y `TC-064` estaban correctamente asignados a S-17 y **no
  constaban ejecutados por nadie**; hoy constan, en un informe versionado y con historial
  (§5.5). Quedan cuatro casos sin evidencia —TC-032, TC-033, TC-047 y TC-109—, y de esos,
  tres esperan una decisión de producto;
- **hay un camino por el que la aplicación pierde stock y ningún requisito dice si eso está
  bien**: borrar un albarán no devuelve al catálogo las piezas de sus líneas (verificado en
  el servidor, `A-05-15`, §3.15). El único caso de REQ-041 está en verde y no mira el stock,
  y el escenario que lo ejecuta ni siquiera crea una línea de pieza. No es un GAP PLAN
  —REQ-041 tiene caso— y la matriz no puede verlo, igual que no puede ver `A-05-04`;
- **un paso de `TC-041` no lo ejecuta ninguna de las dos suites** (`A-05-14`, §3.14): el que
  comprueba que el desplegable de tipo ofrece exactamente dos opciones. El caso figura como
  ejecutado y en verde, y lo está; ese paso, no;
- **quedan cinco requisitos cuyo vector no es alcanzable por la vía declarada**: tres a
  medias por un desplegable (A-05-11b) y dos —REQ-025 entero y REQ-034 a medias— porque la
  funcionalidad que el requisito enuncia no está en la pantalla (A-05-11c);
- hay **cuatro** requisitos donde un verde no significará ausencia de defecto (A-05-03),
  los cuatro decididos y vigilados desde Q-19; **dos requisitos más** —REQ-051 y REQ-053—
  tuvieron un defecto de sistema hasta 1.8.0 y ya no lo tienen, y sus casos, TC-073 y
  TC-075, vuelven a pasar de forma fiable (A-05-13 cerrado) — pero **siguen sin haber
  comprobado nunca el IVA** que anuncian: el riesgo ahí ya no es «verde que oculta un
  defecto», es «verde legítimo que no probaría una regresión si ocurriera»;
- **el registro de ejecución más reciente, `DOC-23` 2.2.0, ya no tiene la fecha de
  caducidad que tenía la 2.0.0**: confirma con ejecución real, tras el cambio de `SPEC 05`,
  que los 17 casos afectados por el formato de decimales están corregidos (A-05-13
  cerrado, §3.13), y que el único rojo por aislamiento (TC-048/TC-040, A-05-08b) también lo
  está (§3.7). El residuo que queda no es de fecha, es de **método de verificación**: los
  18 casos corregidos se reejecutaron dirigidos, no como parte de una suite completa, así
  que el 107/107 todavía no es el resultado de una sola pasada íntegra (§5.5);
- hay cinco requisitos sobre los que todavía no se ha decidido qué se quiere probar (③);
- hay dos requisitos `high` cuya única evidencia no se puede producir por sí sola
  (A-05-08), y el riesgo de aislamiento que A-05-08b describía **se materializó y se ha
  parcheado en el caso que lo demostró** (TC-040/TC-048), pero el mecanismo que lo permitió
  —nadie hace cumplir el orden de ejecución que declaran los campos de aislamiento— sigue
  sin corregirse, y dos `critical` de caso único más viven en el mismo carril sin haber
  sido puestos a prueba todavía;
- y el propio DOC-05 se contradice en un resumen de su front-matter (A-05-12), lo que no
  afecta a nada de lo anterior pero sí a quien lo lea en vez de contar.

**La predicción de 1.6.0, y qué ha pasado con ella.** 1.6.0 escribió que en la pasada
`post` *«TC-064 aparecerá muy probablemente como `PASS`»* sin que nadie hubiera compuesto
el intento, y que **la única oportunidad de cazarlo era la pasada `pre`**. La predicción no
llegó a comprobarse porque el caso se corrigió antes de exportar, que era la recomendación.
Sigue siendo el mejor resultado posible para una predicción de este tipo: **queda falsada
por haber sido atendida.**

**La predicción de 1.7.0 sobre TC-073 y TC-075, y en qué ha terminado.** 1.7.0 escribió que,
si se exportaban así, «la pasada `post` no podrá distinguirlos de un verde legítimo» porque
el verde **ya era falso sobre el sistema**. Esa mitad quedó sin objeto en 1.8.0, cuando
`DOC-14` confirmó que la aplicación ya muestra el importe del IVA. Lo que 1.8.0 añadió —que
la corrección había llegado por el lado equivocado, arreglando la aplicación sin que nadie
tocara los casos, el mismo día en que `SPEC 05` desalineó el literal que esos casos
buscaban en pantalla— **ya se ha resuelto también, y exactamente por el lado que 1.8.0
recomendaba vigilar**: `DOC-23` 2.1.0 capturó los dos casos en rojo por el literal, y 2.2.0
documenta su corrección (A-05-13, §3.13). El riesgo no ha desaparecido, sigue siendo el
mismo que describe §3.4: **TC-073 y TC-075 vuelven a dar verde sin haber mirado nunca el
IVA**, que es exactamente el riesgo de regresión silenciosa. La pasada `post`, cuando
exista, tampoco podrá distinguir ese verde de uno que sí prueba el IVA: la cadena que viaja
a Rally es la misma. La única manera de cerrar esto de verdad sigue siendo que A-03 añada
el paso que falta (§3.4, pregunta 2 de §7.3) — el literal, que era el otro problema, ya no
hace falta corregirlo aparte.

El riesgo abierto sigue siendo de las dos etapas siguientes: que los casos se exporten
íntegros —donde aparecerán los `GAP EXPORT` si los hay— y que se ejecuten. Cuando exista
DOC-20, A-05 se ejecutará de nuevo, rellenará las tres columnas hoy en `n/d` y esta
sección se escribirá con datos.

## 7. Preguntas abiertas

### 7.1 El alcance — pendiente de recálculo completo

**Este apartado NO se ha vuelto a derivar en la pasada de 1.11.0.** La tabla es la de
1.10.0. SPE-06 la mueve en al menos tres sitios que hay que recalcular en la próxima
regeneración: `Q-30` de DOC-04 (`open`) entra en `①` y alcanza REQ-015 y **REQ-080**;
DOC-06 1.4.0 añade su pregunta propia `Q-31` (sobre REQ-080/REQ-081) a `⑤`; y los 9 casos
nuevos cambian los denominadores de casos de `①`, `②` y `③`. Ninguna pregunta se cierra:
SPE-06 fue entregada directamente como spec sin pasar por A-06, y `Q-30` sigue `open`.

| | Preguntas | Requisitos | Casos | Quién debe actuar | vs 1.8.0 |
|---|---:|---:|---:|---|---|
| **① Esperan respuesta de negocio** (DOC-04, `open`) | 9 | 16 (20,3 %) | 21 | negocio → A-02 | = |
| **② Hueco confirmado, vivo hasta el evolutivo** (DOC-04, `answered` + `gap_confirmed`) | 6 | 16 (20,3 %) | 23 | A-06 → DOC-08 | = |
| **③ Decisión de método sin tomar** (DOC-05, propias y `open`) | 2 | 5 (6,3 %) | 3 | A-01 y A-03 | = |
| **④ Validados como intencionados** (`as_designed`) | 0 | 0 | 0 | nadie | = |
| **⑤ No consta qué ve el usuario** (DOC-06, propias y `open`) | 11 | 47 (59,5 %) | — | **A-02**, no A-04 | = |
| **Unión ①∪②∪③** | 17 | **32** (40,5 %) | **44** (40,0 %) | — | **=** |
| **Unión de los cuatro alcances vivos** | 28 | **64** (81,0 %) | — | — | **=** |

**Ninguna de las cinco cifras se mueve, y hay que decir por qué no.** DOC-05 1.6.0 no
abre ni cierra ninguna `open_question`: su cambio es la reclasificación de tres casos, y
una vía de verificación no es un alcance. Las dos preguntas de ③ siguen abiertas, las
nueve de ① siguen esperando a negocio y las once de ⑤ siguen esperando a A-02. El
recuento se ha vuelto a derivar de los bloques YAML de los tres documentos, no se ha
copiado de 1.6.0.

**Que las cifras no se muevan no significa que la versión no haya avanzado**, y este
apartado es el sitio donde la distinción se ve mejor. Nada de lo que ha avanzado desde
1.7.0 —A-05-11a cerrado y ahora confirmado por ejecución, A-05-11c y A-05-03b abiertos,
A-05-13 cerrado, y los tres avisos que nacen en 1.10.0— **vive en ninguno de los cinco
alcances**, porque los cinco miden preguntas sin responder y esto son hechos verificados.
Un requisito puede estar fuera de los cinco alcances y aun así no ser verificable: REQ-025
lo demuestra. Y puede estar fuera de los cinco y aun así esconder una consecuencia que
nadie ha decidido: REQ-041 lo demuestra desde hoy (§3.15).

**Cómo se ha cerrado Q-18 merece una nota, porque es el mejor cierre de pregunta de este
proyecto hasta hoy.** Se ha respondido en dos mitades con dueños distintos y declarados:
la **factual** —¿existe una vía distinta de la interfaz?— cerrada con una **reproducción
ejecutada** por A-14 y corroborada por A-15, no con un juicio; y la de **política** —¿qué
se hace con eso?— firmada por A-03, que es quien tiene autoridad para decidir método y
sólo método. Separar las dos mitades es lo que impide que una decisión de método se
disfrace de hecho o al revés. A-05 lo recoge como precedente, no como observación de paso.

**Cómo leer cada cifra, en una línea:**

- **①** mide cuánto trabajo documental depende del negocio. No se ha movido en cinco
  versiones.
- **②** mide cuánto del sistema descrito tiene un hueco vivo, decidido pero no construido.
  No se moverá hasta que A-06 publique DOC-08 y alguien lo implemente.
- **③** es la única que se puede reducir sin esperar a un tercero, y **se ha vuelto a
  reducir**: de tres preguntas a dos, y a la mitad de requisitos — sin cambios desde 1.7.0.
- **④ sigue valiendo cero**, y es la única que mediría una reducción real del riesgo. Ni
  un solo requisito ha quedado validado como intencionado en siete versiones consecutivas.
- **⑤** es la más grande y su corrección **no es de A-04**: es de A-02, porque el hueco
  está en DOC-04 (§3.9).

**Dos precisiones metodológicas, para que la cifra sea auditable:** (1) para ① y ② los
casos se derivan de los requisitos afectados, porque DOC-04 no declara casos; para ③ se
usan los `affects_cases` que A-03 declara, que son más precisos —si ③ se derivara igual
que ① y ② daría 9 casos en vez de 3—; para ⑤ **no se publica cifra de casos**, porque
DOC-06 no declara `affects_cases` y derivarla daría un número técnicamente correcto y
prácticamente inútil. (2) La intersección ①∩② sigue siendo la de siempre: tres requisitos
—REQ-052, REQ-055 y REQ-073, señalados por Q-13, que sigue abierta— más los casos TC-074,
TC-078 y TC-103.

Los seis evolutivos pendientes no se han movido, todos `owner: A-06`, `target_doc:
DOC-08`: Q-06 (**large**, REQ-042/043/047), Q-02 (medium, REQ-019/035), Q-12 (medium,
REQ-019/022/034/036), Q-14 (medium, REQ-052/054/055), Q-15 (medium, REQ-063/072/073) y
Q-10 (**small**, REQ-040/046). Sigue siendo cierto que **el evolutivo más pequeño corrige
el defecto que A-14 califica de peor**, y Q-10 sigue siendo el que alcanza a los dos
requisitos que A-07 analiza. Coste y gravedad no van juntos.

### 7.2 Tres aristas que faltan en el grafo de DOC-02 — no es de A-05, y sin embargo consta

`DOC-09` §2.3 documenta **tres aristas reales que faltan en el bloque `graph` de
`DOC-02-TECNICA.md`**, verificadas en el código por A-07:

| Origen | Destino | Evidencia |
|---|---|---|
| `albarans-pages` | `vehicles-service` | `AlbaraForm.tsx:9`, `AlbaraDetail.tsx:5` |
| `albarans-pages` | `shared-components` | `AlbaraForm.tsx:5-7` |
| **`factures-pages`** | **`albarans-service`** | **`FacturaForm.tsx:7`** |

**No es de A-05 y no se corrige aquí: es de S-01.** Se hace constar de todos modos, y no
por cortesía, sino por tres razones que sí son de este documento:

1. **La tercera arista es la que sostuvo A-05-11a, y sigue sin estar.**
   `factures-pages → albarans-service` es exactamente la llamada que hace que
   `FacturaForm` liste los albaranes de un solo cliente, y por tanto la que explicaba por
   qué TC-064 y TC-063 no podían componer su intento. Ese hallazgo ya está corregido en
   DOC-05, **y la arista sigue ausente del grafo**: lo que se arregló fue la consecuencia,
   no el modelo. Si estuviera, la pregunta «¿de qué depende la pantalla de emisión?» se
   contestaría consultando, no leyendo código.
2. **Afecta a quien calcule impacto, que es el consumidor natural del grafo.** A-07 hizo
   el cierre transitivo **a mano sobre 58 aristas** porque `DOC-21-GRAPH.json` no existe, y
   lo hizo sobre un grafo que él mismo sabe incompleto. Cualquier cálculo de impacto futuro
   heredará las tres ausencias mientras no se corrijan.
3. **Porque toca directamente a la pregunta 15 de §7.3.** Si DOC-07 va a convertirse algún
   día en una vista de `DOC-21-GRAPH.json`, importa mucho de qué se construya ese grafo.
   **Un grafo derivado hoy de DOC-02 nacería con tres aristas menos, y una de ellas es la
   que sostuvo el hallazgo principal de la versión anterior.** No es un argumento contra el
   grafo: es un argumento a favor de arreglar DOC-02 **antes** de generarlo.

El grafo modela `<modulo>-pages → <modulo>-service` como si cada módulo hablara sólo con el
suyo, y en el código las páginas de albaranes llaman a tres servicios y las de facturas a
tres. **Corrección de S-01**, independiente de `EVO-001`.

### 7.3 Preguntas propiamente abiertas

**Los números de esta lista son posicionales dentro de cada versión, no identificadores
permanentes**; los identificadores estables son los `A-05-nn` de §3. La pregunta 1 de 1.6.0
—«¿se corrige TC-064 antes de exportar?»— está contestada, y la respuesta fue sí; `DOC-27`
añade ahora la comprobación de que la corrección funciona (§3.11). La pregunta 16 de 1.8.0
—«¿se actualizan los literales de importe al separador decimal vigente?»— también está
contestada, y también sí: commit `5366e18`, verificado por A-05 en el código.

**1.10.0 añade tres preguntas nuevas —16, 17 y 18—, las tres nacidas de leer `DOC-27`.** Las
tres son baratas de contestar y ninguna es de A-05: una es de S-12, otra de producto y la
tercera de A-03. La lista pasa de 15 a **18**.

**1.11.0 añade una —19—, de SPE-06.** Ver al final de la lista. La pregunta 12 (`Q-30`)
cambia de contenido: ya no es «¿se concede?», sino la colisión de §3.8.

1. **¿Describen REQ-025 y REQ-034 lo que se quiere que haga la aplicación?** Nacida en
   1.7.0, sigue sin respuesta y **no es de QA**. REQ-025 promete un listado de
   albaranes filtrable por vehículo, por cliente y por situación; la interfaz solo ofrece
   la tercera. REQ-034 tiene un caso —TC-047— que describe informar el precio a mano, y no
   hay campo donde informarlo. Si los enunciados son correctos, la aplicación tiene un
   hueco y hace falta un defecto o un evolutivo; si no lo son, hay que corregir DOC-04 y
   eso es de **A-02**. **Hasta que se conteste, A-03 no puede hacer nada correcto con
   TC-032, TC-033 y TC-047**: reclasificarlos a `service` los pondría en verde y haría
   desaparecer el síntoma sin resolver nada (§3.11). Decisión de **producto**.
2. **¿Se añade a TC-073 y TC-075 el paso que comprueba el importe del IVA?** Cuesta **un
   paso en cada caso** y es de **A-03**, ya en solitario: `DOC-14` 2.0.0 confirma que la
   aplicación ya muestra el importe, así que el dueño de la mitad «defecto» de este
   hallazgo ha terminado su parte. Sigue siendo la corrección más barata de todo este
   documento, y la urgencia cambia de motivo: ya no es que el verde sea falso hoy —no lo
   es—, es que **nada impediría que ese verde sobreviviera a una regresión real** (§3.4,
   §6). Si se exportan sin el paso, la pasada `post` no podrá distinguir ese verde de uno
   que sí prueba el IVA.
3. **¿Se escriben los tres casos hermanos de A-05-11b?** REQ-011, REQ-027 y REQ-065 son
   `critical` y de caso único, y ese caso único cubre la mitad de su vector. Cuesta **tres
   casos**, que **nacen `service`** por la política de §4.12 y con el precedente exacto de
   TC-045 a la vista. Corrección de **A-03**. No depende de ningún evolutivo ni de ninguna
   respuesta de negocio: es de lo poco de este documento que se puede arreglar hoy.
4. **¿Se automatizan los casos antes de exportarlos, como método y no como excepción?** Es
   la pregunta de método que dejó 1.7.0 y sigue abierta, con un argumento más a favor cada
   vez que alguien ejecuta algo. El barrido documental de §4.12 encontró cuatro dudosos; la
   generación de escenarios de S-10 encontró cinco casos sin vector —tres que A-03 ya
   reclasificó y los tres de A-05-11c— y destapó el aislamiento TC-040/TC-048 que este
   documento venía anunciando en abstracto desde 1.4.0; **y la ejecución de la colección de
   servicio ha destapado en una sola sesión los tres hallazgos nuevos de esta versión**
   (§3.0). **Escribir y ejecutar el automatismo es hoy el único método que ha demostrado
   encontrar estas cosas** (§5.6). Decisión de **A-01 / A-11** sobre el orden de las fases.
5. **¿Se corrige, a nivel de S-06 / DOC-13, el mecanismo que permitió el aislamiento entre
   TC-040 y TC-048?** Ya no es un riesgo teórico —fue el único rojo de 107 escenarios en
   `DOC-23` 2.1.0, con causa diagnosticada (§3.7)— y el propio escenario ya está parcheado
   (`DOC-23` 2.2.0, commit `735ded8`). Lo que sigue abierto es lo que el parche no toca:
   **nadie hace cumplir en tiempo de ejecución el orden que los campos de aislamiento
   declaran**, y dos `critical` de caso único más (REQ-028, REQ-036) viven en el mismo
   carril sin haber sido puestos a prueba. Es de **S-06 / DOC-13**, no de quien mantenga la
   suite de S-10, cuyo trabajo en esta sesión fue correcto pero no sustituye la corrección
   estructural.
6. **¿Se exportan a Rally los casos que cuelgan de requisitos con algo pendiente?** Son
   **44 de los 110 (40,0 %)** bajo el criterio ①∪②∪③, sin cambios. Los 21 del grupo ①
   pueden ver cambiar su enunciado; los 23 del ② tendrán que revisarse cuando el evolutivo
   se construya; los 3 del ③ dependen de una decisión nuestra. Decisión de **A-11**.
7. **¿Se exporta el plan sabiendo que no puede detectar los cuatro defectos ya
   confirmados?** Vuelve a ser cuatro, no seis: `EXP-007` se corrigió y REQ-051/REQ-053
   salen del recuento de defecto confirmado (§3.4, §5.2). A-05 no recomienda retrasar la
   exportación por esos cuatro de DOC-24 —los casos son correctos contra el AS-IS y la
   decisión está registrada en Q-19— pero sí que el Go/No-Go **no interprete el verde de
   esas cuatro filas como ausencia de defecto**. REQ-051 y REQ-053 ya no viven aquí: su
   pendiente es otro, más barato y de otro dueño (pregunta 2).
8. **¿Se corrige la cobertura condicionada de REQ-019 y REQ-057 antes de exportar, o se
   acepta?** Cuesta tres datos de prueba y es de **S-06 / DOC-13**. A-05 recomienda
   corregirlo antes de la primera ejecución, no antes de la exportación: no afecta a lo que
   S-07 sube, afecta a lo que I-01 leerá después.
9. **¿Quién documenta los literales de los mensajes de error?** Sigue siendo la palanca más
   rentable del proyecto (§3.9): 43 de los 80 `medium` esperan saber qué texto exacto debe
   comprobar su aserción, y ninguna suite verde responde esa pregunta. Corrección de
   **A-02**, o decisión explícita de no documentarlos.
10. **¿Se corrige el resumen `verification_path` del front-matter de DOC-05?** Tres líneas,
    de **A-03** (§3.12). Es la más barata de la lista y la que más fácilmente se olvida,
    porque no rompe nada: solo hace que quien lea el resumen en vez de contar mande tres
    casos `Critical` a la cola de automatización equivocada.
11. **¿Se endurece el extractor de S-12 para que no dependa del orden de las claves?** La
    exposición sigue en **34 entradas repartidas entre dos documentos** (§3.6). Mientras la
    convención sólo la sostenga un comentario, el modo de fallo sigue disponible. Corrección
    de **S-12**.
12. **¿Cómo se resuelve la colisión de `Q-30`?** DOC-04 1.3.1 renumeró su `Q-16` a `Q-30`
    y S-12 la registró; DOC-06 1.4.0 sigue trayendo un `Q-30` propio —otra pregunta— más un
    `Q-31` numerado a mano. **S-12** asigna a las dos de DOC-06 los siguientes libres y
    **A-04** las renumera en el manual (§3.8).
13. **¿Basta un solo caso para los 17 requisitos críticos de `critico_caso_unico`?** La
    pregunta mejoró en 1.7.0 y no se ha movido desde entonces: para catorce sigue siendo
    «¿basta un caso?» y para **tres —REQ-011, REQ-027 y REQ-065— sigue siendo «¿basta medio
    caso?»**, uno menos que en 1.6.0 (§3.2). Criterio de **A-11**, trabajo de **A-03**.
14. **¿Se corrige el grafo de DOC-02 antes de que alguien lo convierta en
    `DOC-21-GRAPH.json`?** Tres aristas, verificadas en código por A-07 (§7.2). Corrección
    de **S-01**.
15. **¿Se mantendrá este documento cuando exista `DOC-21-GRAPH.json`?** Si el proyecto
    llega a tener el grafo de S-08, DOC-07 deja de ser un artefacto que mantener y pasa a
    ser una **vista del grafo**: un artefacto menos. Hoy no existe, así que se mantiene, y
    esta versión vuelve a reforzar el argumento en contra con un disparador todavía más
    ajeno al grafo que el de 1.9.0: aquel vino de `DOC-23` y este viene de **`DOC-27`, un
    documento que no existía**. Ni las entradas del JOIN se han movido —DOC-04 y DOC-05
    son las únicas que un grafo modelaría— ni ha cambiado una sola arista: lo que ha
    cambiado es que cuatro casos han pasado de no tener evidencia a tenerla, que un cierre
    ha pasado de inferido a comprobado y que han aparecido tres avisos. **Nada de eso es
    una relación entre nodos**, y octava versión consecutiva con el CSV byte a byte idéntico
    —la tercera sin que ni DOC-04 ni DOC-05 cambiaran de versión— lo enseña sin necesidad
    de argumentarlo. **Lo que queda como artefacto propio de A-05 es cada vez más sólo la
    interpretación**, y esta versión es el mejor ejemplo: su valor entero está en prosa.
16. **¿Se da de alta la familia `TCS-nnn` en `registro-ids.json`?** Nace en 1.10.0 con
    `A-05-16` (§3.16) y la plantea el propio `DOC-27` en su §6.1. Hoy los diez `TCS-nnn`
    viven solo en el `name` de las peticiones de la colección y en la tabla de `DOC-27`;
    nada impide mecánicamente que un número se reutilice. **No es de A-05**: cambia el
    contrato de `registro-ids.json`, así que es de **S-12** y de quien gobierne el canon
    `DOC-nn`. Si la respuesta es que no se registran, que quede escrita como decisión.
17. **¿Debe borrar un albarán devolver al catálogo el stock de sus líneas de pieza?** Nace
    en 1.10.0 con `A-05-15` (§3.15). El hecho está verificado en el servidor: retirar una
    línea lo devuelve, borrar el albarán entero no. Lo que no existe es un requisito que
    diga cuál de las dos cosas es la correcta —REQ-039 habla de la línea, REQ-041 del
    albarán y ninguno del stock por esa vía—. **Decisión de producto**; si la respuesta es
    que sí, hay un defecto de aplicación y le toca entrada en `DOC-24` o evolutivo; si es
    que no, falta un requisito y es de **A-02**. Por debajo cuelgan dos correcciones
    baratas e independientes de la decisión: `peces.estoc` en el `touches` de TC-056
    (**A-03**) y el escenario que no cumple su propia precondición (**`s10-auto-tcs`**).
18. **¿Qué se hace con el paso 2 de `TC-041`?** Nace en 1.10.0 con `A-05-14` (§3.14).
    Ninguna de las dos suites comprueba que el desplegable de tipo ofrezca exactamente dos
    opciones, y el propio caso dice que ese paso «se ejecuta por la pantalla». O se
    reescribe el caso para que no prometa lo que nadie hará, o el paso sale a un caso
    hermano `ui`. **Es de A-03**, y cuesta menos que cualquiera de las otras diecisiete
    preguntas de esta lista.
19. **¿Se exportan a Rally los 4 casos `service` nuevos de SPE-06 sin evidencia de
    ejecución?** TC-111, TC-113, TC-115 y TC-116 nacen `verification_path: service` y hoy
    **ninguna suite los cubre**: `automation/api/` (DOC-26/DOC-27) no los tiene. Igual que
    los 4 `service` de 1.6.0 antes de `DOC-27`, quedan correctamente asignados a **S-17**
    pero sin fuente que diga si se han ejecutado. Decisión de **A-11** sobre si el Go/No-Go
    exige esa evidencia; trabajo de **S-17** para producirla.
