---
doc_id: DOC-07
doc_name: DOC-07-TRAZABILIDAD
version: 1.9.0
status: draft
generator: A-05 coherencia y trazabilidad
generated_at: 2026-08-24T00:20:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: d9ccd37f346d6c9c64dce9394e171d4fdca22bfc
  working_tree_clean: false   # sin versionar: ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/, infografias/FLUJO-COMPLETO.md, promptDashboard.txt
inputs:
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.2.0
    hash: sha256:626fdb84957ca198001aa3cba40572bf2632d0e9ea1e75136e61c217f2f042e3
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:d338297ae78c318c49887925df52a2399eb725edda29e24ac5d1dffa14d650ba
  - id: registro-ids.json
    from: S-12
    version: 1.6.0
    hash: sha256:bc54df9a531287e953975a311cea55a25297ecba3ce50d403f91dc6106528b97
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    version: 1.3.0
    hash: sha256:c081aea157c978d8ffcfffaed9fa9b33fc10106fa47498277f07c9720ef26067
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 2.0.2
    hash: sha256:c9921bfab17bde391290a3f58f8b3037ec3e78fcfc4bed0608c0b29ee937e1f9
  - id: DOC-14-EXPLORATORIO.md
    from: A-10
    version: 2.0.1
    hash: sha256:5e9ada5afdf97e3a88ff2d67b2ab5ed3a48052cd72ce51eaa640b231e8cb499f
  - id: DOC-23-INFORME.md
    from: S-10
    version: 2.2.0
    hash: sha256:33ac58bcf4188dddccce71aa88bd2f4174af74c1c291032f302ec68fddd84c47
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
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

**La cobertura de requisitos por casos de prueba definidos es del 100,00 % (79 de 79
requisitos cubiertos, 0 GAP PLAN).** Los 110 casos de DOC-05 1.6.0 —241 pasos en nueve
bloques— se reparten sobre los 79 requisitos de DOC-04 1.2.0: 52 requisitos tienen un
caso, 23 tienen dos y 4 tienen tres. No hay ningún requisito sin prueba, ningún caso
huérfano, ninguna referencia rota y **ninguna anomalía bloqueante**: nada de lo
comprobado aquí impide avanzar a la Fase 3.

**La cobertura no se ha movido, y otra vez el motivo no es de DOC-04 o DOC-05.** Esta
regeneración la dispara `DOC-23-INFORME.md`, que ha subido **dos** versiones MINOR en el
mismo día —2.0.0 → 2.1.0 → 2.2.0— desde la última vez que A-05 lo leyó (§2), y `DOC-23` no
es una entrada del JOIN. A-05 lo ha comprobado sobre los bytes, no sobre el número de
versión: el bloque `yaml requirements` de DOC-04 y los nueve `yaml testcases` de DOC-05
son **idénticos, carácter a carácter**, a los que produjeron el CSV de 1.8.0. El CSV sale
igual: md5 `087a03779bd36a00d09f9e87943588c0`, **séptima vez consecutiva** — la quinta,
1.6.0, fue la última vez que DOC-05 sí cambió algo con efecto en el JOIN; van ya dos
regeneraciones seguidas (1.8.0 por `DOC-14`, esta por `DOC-23`) disparadas por una entrada
que nunca ha alimentado el `yaml requirements`/`yaml testcases`.

| Magnitud | Valor | vs 1.8.0 |
|---|---:|---|
| Requisitos en DOC-04 | 79 | = |
| Requisitos con al menos un caso (`Correcto`) | 79 | = |
| Requisitos sin ningún caso (`GAP PLAN`) | 0 | = |
| **Cobertura** | **100,00 %** | **=** |
| Casos en DOC-05 | 110 | = |
| Pasos de prueba | 241 | = |
| Casos mapeados a un requisito existente | 110 | = |
| Casos huérfanos o con referencia rota | 0 | = |
| **Anomalías bloqueantes** | **0** | **=** |
| Avisos | 29 | **−1**: se cierra A-05-13 |
| Casos `verification_path: ui` | **106** | = |
| Casos `verification_path: service` | **4** | = |
| Requisitos con toda su cobertura por interfaz | **75** (94,9 %) | = |
| Requisitos `critical` con toda su cobertura por interfaz | **32 de 35** | = |
| **Requisitos cuyo vector no es alcanzable por la vía declarada** | **5** | = |
| Casos automatizados y ejecutados (DOC-23 2.2.0) | **102 de 110** | = |
| Escenarios en verde (DOC-23 2.2.0) | **107 de 107** | **+18** (TC-048 y los 17 de EXP-027, corregidos) |
| Censo de `Q-nnn` con ancla | 29 | = |
| `Q-nnn` reclamados sin ancla | 1 (`Q-30`) | = |
| ① Requisitos que esperan respuesta de negocio | 16 (20,3 %) | = |
| ② Requisitos con hueco confirmado hasta el evolutivo | 16 (20,3 %) | = |
| ③ Requisitos tocados por una decisión de método sin tomar | 5 (6,3 %) | = |
| **Unión ①∪②∪③** | 32 (40,5 %) | = |
| ⑤ Requisitos cuya escena no está documentada (DOC-06) | 47 (59,5 %) | = |
| **Unión de los cuatro alcances** | **64** (81,0 %) | **=** |
| Requisitos con defecto confirmado en el sistema real | **4** | = |
| Filas de la matriz (`DOC-07-MATRIZ.csv`) | 79 | = |

**Qué mide y qué no mide ese 100 %.** Las advertencias que este documento arrastra siguen
vigentes y no se repiten enteras: no mide **ejecución en Rally ni resultado** (pasada
`post`), no mide que el requisito describa un **sistema sano** (A-05-03), no mide **en qué
orden puede producirse la evidencia** (A-05-08), no mide **si se sabe qué verá el usuario**
(A-05-10) y no mide **si el caso puede ejercer su vector por la vía que declara**
(A-05-11).

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

Ninguno de los cuatro requisitos con defecto confirmado baja la cobertura ni un punto, y
tampoco lo hace el cierre de A-05-13: cambian lo que el 100 % significa, no cuánto vale.

## 2. Qué pasada se ha ejecutado y por qué

**Se ha ejecutado únicamente la pasada `pre`.**

| Entrada | Estado | Consecuencia |
|---|---|---|
| `docs/DOC-04-FUNCIONAL.md` | presente, **v1.2.0** (mismo número, mismo hash que 1.8.0) | JOIN posible; sin cambio de contenido versionado |
| `docs/DOC-05-PLAN-PRUEBAS.md` | presente, **v1.6.0** (mismo número; **hash resincronizado** contra `DOC-23` 2.1.0, ver abajo) | JOIN posible; sin cambio de contenido versionado |
| `registro-ids.json` | presente, 317 anclas — 79 REQ, 110 TC, 29 Q, 12 FUN, 8 MEJ, 1 EVO, todas sin cambios desde 1.8.0; hash resincronizado por el renombrado `SPE-` de los specs | verificación de anclas y del censo de `Q-nnn` |
| `docs/DOC-23-INFORME.md` | presente, **v2.2.0** (era 2.0.0; pasó por 2.1.0 el mismo día) | **no toca la matriz**; motivo de esta regeneración; cierra TC-048 y los 17 de `EXP-027`, corrige una atribución de la propia 2.1.0 |
| `docs/DOC-14-EXPLORATORIO.md` | presente, v2.0.1 (era 2.0.0; **resello de patch**, cita a `DOC-16` 3.0.0, sin nueva exploración) | **no toca la matriz** |
| `docs/DOC-09-IMPACTO-…md` | presente, v2.0.2 (era 2.0.0; **resello de patch**) | **no toca la matriz**; A-05-11a sigue cerrado |
| `docs/DOC-06-MANUAL-USUARIO.md` | presente, v1.3.0 (mismo número; **hash resincronizado**, renombrado `SPE-` de los specs que cita) | **no toca la matriz**; alimenta ⑤, A-05-09 y A-05-10 |
| `docs/DOC-24-BUGS.json` | presente, v1.0.0 (mismo hash) | **no toca la matriz**; alimenta A-05-03 |
| `docs/DOC-19-RALLY-TESTCASES.csv` | **ausente** | no hay exportación a Rally que comprobar |
| `docs/DOC-20-RALLY-STATE.json` | **ausente** | no hay estado de ejecución que leer |

Al no existir DOC-19 ni DOC-20, las columnas `exists_in_rally`, `executed` y `result`
valen **`n/d`** en las 79 filas del CSV. No valen «No»: «No» afirmaría que el caso no
está en Rally o que no se ha ejecutado, y eso es un dato que nadie ha medido. Por la
misma razón, los únicos diagnósticos emitidos son `Correcto` y `GAP PLAN`; **el CSV no
contiene ni un solo `GAP EXPORT`**, que en esta pasada sería un dato inventado
(verificado: 0 ocurrencias de la cadena en el fichero).

**DOC-23 es la entrada que más cerca está de tentar a escribir la pasada `post`, y esta
vez la tentación es mayor todavía: ya no hay ni un caso en rojo.** `DOC-23` 2.2.0 declara
102 casos automatizados y ejecutados y **107 de 107 escenarios en verde** (§5.5). Es
ejecución real de casos reales del plan —no como DOC-24, que ejercía la aplicación—,
así que la tentación es legítima y hay que contestarla con precisión: **la pasada `post`
no es «¿se ha ejecutado algo?», es «¿qué dice Rally?»**. Las tres columnas del CSV son
`exists_in_rally`, `executed` y `result`, y las tres se llenan desde `DOC-19` y `DOC-20`.
Ninguno de los 110 casos está en Rally, así que la respuesta a la primera columna sigue
siendo que nadie la ha mirado. Rellenar `result` con lo que dice DOC-23 mezclaría dos
fuentes en una columna cuyo contrato nombra una sola, y el primer consumidor que hiciera
`join` con DOC-20 encontraría contradicciones sin saber de dónde vienen. DOC-23 entra en
este documento **como evidencia en la prosa**, que es donde puede ir acompañada de su
procedencia, y no en el CSV.

**Quién ha disparado esta regeneración.** `S-16 · Cascada de obsolescencia`, por quinta vez
consecutiva y ya sin ninguna intervención humana en el disparo:

```
DOC-07 1.8.0 — por DOC-23: declara 2.0.0, actual 2.2.0  [MINOR]
```

`DOC-23` subió dos veces el mismo día —2.0.0 → 2.1.0 (TC-048 corregido, 17 rojos nuevos
diagnosticados con causa única `EXP-027`, un rojo aislado de infraestructura) y 2.1.0 →
2.2.0 (los 18 corregidos y verificados, y una atribución de la propia 2.1.0 corregida:
el rojo de infraestructura era `TC-103`, no `TC-029` como decía esa versión)—, y A-05 ha
leído la 2.2.0 completa, no un resumen de la 2.1.0 que el prompt que dispara este ciclo
citaba: **S-16 y el propio repositorio son la fuente de verdad sobre qué versión es la
vigente, no la descripción con la que empieza la tarea.** Es el uso exacto para el que
existe el bloque `inputs` con versión y hash, y la razón por la que la procedencia se
queda en este documento y **no** se va al fichero de historial.

**Qué cambió DOC-05 desde 1.8.0, y por qué no mueve la matriz.** Nada en el contenido: el
único movimiento es un resello de procedencia —«Resync DOC-05 procedencia against DOC-23
2.1.0, no version bump»— que actualiza la entrada `DOC-23` de su propio bloque `inputs`
(versión, hash y el resumen de qué aporta) y su `commit_sha`, sin tocar ningún `id`,
`external_id`, `requirement`, `priority` ni `steps` de los 110 casos. A-05 no se lo cree
por deferencia —lo comprueba volviendo a ejecutar el JOIN— y el CSV sale **byte a byte
idéntico por séptima vez consecutiva**. Un matiz que sí hay que anotar: **ese resello de
DOC-05 es del 23-08 a las 23:41, y `DOC-23` volvió a subir a 2.2.0 después, a las 23:30 del
mismo día según su propio `generated_at`** — los relojes de sesión no son estrictamente
monótonos entre documentos generados por agentes distintos en la misma tanda, así que DOC-05
**sigue citando la 2.1.0** y `S-16` lo marca obsoleto por ello (orden de regeneración:
DOC-05 → DOC-07 → …). No es tarea de A-05 corregirlo —DOC-05 es de A-03—, y no bloquea esta
regeneración: A-05 ha verificado que ninguno de los dos saltos de DOC-23 (2.1.0 y 2.2.0)
toca un `REQ-nnn` o `TC-nnn`, así que el JOIN es válido con independencia de cuál de las
dos cite el front-matter de DOC-05.

**Qué cambió DOC-14 y DOC-09 desde 1.8.0, y por qué el disparo de S-16 no obliga a
recalcular la matriz.** Los dos son resellos de PATCH sin exploración ni análisis nuevos
—`DOC-14` 2.0.1 solo referencia la subida de `DOC-16` a 3.0.0; `DOC-09` 2.0.2 es un
resello equivalente—, y ninguno de los dos toca `REQ-nnn` ni `TC-nnn`. `S-16` ya avisa de
que un PATCH «no invalida» (§ salida de la herramienta), y A-05 lo confirma sobre los
bytes: mismo `test_case_count` por requisito, mismo CSV.

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

**Las dos verificaciones que A-05 ha hecho fuera de todo YAML, y por qué.** Este documento
se permite afirmar que casos concretos no pueden ejecutarse por la vía que declaran, y una
afirmación de ese peso no se sostiene en la lectura de otro agente. Así que las veces que
la hace, la comprueba en el código él mismo: `DataTable.tsx` y `AlbaraLiniesSection.tsx`
para A-05-11c (§3.11), y en su día `FacturaForm.tsx` para A-05-11a. Lo que se cita en
§3.11 es lo que esos ficheros hacen, no una interpretación de lo que hacen.

**Ni DOC-23, ni DOC-14, ni DOC-09, ni DOC-24, ni DOC-06 convierten esto en una pasada
`post`.** S-10 ha ejecutado una **suite de automatización** contra un entorno local, A-10
ha explorado *la aplicación* a mano, A-07 ha analizado un *impacto* leyendo código, A-14
ha ejercido *la aplicación* por servicio y A-04 ha escrito *un manual*. Ninguno de los 110
casos está en Rally y ninguno tiene resultado **en Rally**, que es lo que las tres columnas
`n/d` preguntan.

### Procedencia

El bloque `inputs` declara el dato; aquí van los matices, que es donde se pueden leer como
prosa y no inflan lo que todos los parsers leen primero.

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

**`DOC-09` 2.0.2 y `DOC-14` 2.0.1 son resellos de PATCH sin contenido nuevo relevante para
A-05**: se han vuelto a leer para comprobarlo, no se han dado por buenos por inercia.
`DOC-06` 1.3.0 y `DOC-24` 1.0.0 cambian de hash o se mantienen por motivos ya descritos en
§2 (renombrado de rutas `SPE-` el primero; sin cambios el segundo).

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

### 3.0 El censo de avisos, enumerado

Este documento declara **29 avisos**: los 17 de una sola regla de S-14 (§3.2) y **12
hallazgos propios de A-05 abiertos**, más dos ya cerrados que se muestran aquí por última
vez (así se hizo con A-05-11a en 1.7.0 y 1.8.0):

| Hallazgo | Qué dice | Estado en 1.9.0 | Corrección de |
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
| **A-05-11a** | `TC-064` no puede componer su intento por la vía que declara | CERRADO en DOC-05 1.6.0; se muestra por última vez | — |
| **A-05-11b** | Tres casos ejercen solo una mitad de un vector de dos | abierto, sin cambios | A-03 |
| **A-05-11c** | TC-032, TC-033 y TC-047 declaran `ui` y no tienen vector en la interfaz | abierto, sin cambios desde 1.7.0 | **A-03** (vía) + producto (funcionalidad) |
| **A-05-12** | El resumen `verification_path` del front-matter de DOC-05 no coincide con su propio YAML | abierto, sin cambios desde 1.7.0 | **A-03** |
| **A-05-13** | 17 casos citaban literales de importe con punto decimal que la aplicación ya no produce; `DOC-23` 2.0.0 los daba por verdes desde antes de ese cambio | **CERRADO**: `DOC-23` 2.1.0 confirmó los 17 exactos contra ejecución real, 2.2.0 documenta su corrección y A-05 la ha verificado en el código (§3.13); se muestra por última vez | — |

1.6.0 declaró **27** (17 + 10); 1.7.0 declaró **29** (17 + 12), con la salida de A-05-11a y
la entrada de A-05-03b, A-05-11c y A-05-12; 1.8.0 declaró **30** (17 + 13), con la entrada
de A-05-13. **1.9.0 vuelve a 29** (17 + 12): se cierra A-05-13 y ningún hallazgo nuevo nace.
Es la primera versión en la que la línea de avisos propios baja desde que existe el
censo.

**A-05-13 se cierra por el mismo motivo que A-05-11a: su destinatario lo corrigió y A-05 lo
verificó sobre el código, no sobre la declaración de otro documento.** Los hallazgos
cerrados no vuelven a este censo pasada la versión en la que se anuncia su cierre; su
historia vive en `DOC-07-TRAZABILIDAD-HIST.md`.

### 3.1 Bloqueantes — **ninguna**

Las seis reglas bloqueantes de S-14 se han ejecutado sobre DOC-05 1.6.0 y todas pasan:

| Regla | Qué comprueba | Resultado |
|---|---|---|
| `caso_huerfano` | Caso sin `requirement` | 0 de 110 |
| `referencia_rota` | `requirement` → `REQ-nnn` inexistente en DOC-04 | 0 de 110 |
| `sin_external_id` | Caso sin `external_id` (la reimportación duplicaría) | 0 de 110 |
| `external_id_duplicado` | Dos casos con el mismo `external_id` | 0 (110 valores distintos) |
| `id_duplicado` | Dos casos con el mismo `TC-nnn` | 0 (110 IDs distintos) |
| `fuera_de_registro` | REQ o TC ausente de `registro-ids.json` | 0 de 79 REQ, 0 de 110 TC |

Las cuatro reglas de aislamiento y automatización:

| Regla | Qué comprueba | Resultado |
|---|---|---|
| `dependencia_inexistente` | `depends_on` → `TC-nnn` que no existe | 0 de 3 dependencias |
| `dependencia_propia` | Caso dependiente de sí mismo | 0 |
| `ciclo_dependencias` | Casos que se esperan entre sí | 0 (2 olas, sin ciclo) |
| `grado_automatizacion_invalido` | `grade` fuera del vocabulario | 0 de 110 |

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

**Que no haya bloqueantes no significa que no haya nada que decidir antes de exportar.**
Lo que en 1.6.0 era **A-05-11a** ya está resuelto —A-03 reclasificó TC-064 a `service`—,
pero quedan dos cosas en §3.11 y una en §3.4, ninguna bloqueante y las tres recomendadas
antes de que los casos lleguen a Rally: **A-05-11b** (tres `critical` de caso único que
ejercen media mitad de su vector), **A-05-11c** (tres casos que declaran `ui` sobre una
interfaz que no ofrece su vector) y **A-05-03b** (dos casos verdes que no comprueban lo
que su nombre anuncia).

**Y una comprobación de coherencia que esta vez no pasa.** La penúltima fila de la tabla
—el reparto de `verification_path` que DOC-05 declara frente al que A-05 cuenta— **discrepa
por primera vez**: el front-matter de DOC-05 1.6.0 sigue diciendo `ui: 109, service: 1`
mientras su propio YAML dice 106 y 4. No es bloqueante y no toca la matriz, porque A-05
cuenta sobre los datos y nunca sobre el resumen, pero es un dato derivado que ha dejado de
derivarse y hay que corregirlo. Es **A-05-12**, §3.12, corrección de A-03.

La fila que más pesa en el Go/No-Go sigue valiendo cero: **ninguna de las seis respuestas
de negocio ha validado un comportamiento como intencionado.** Las seis son
`gap_confirmed`, en siete versiones consecutivas.


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

| Requisito | Caso único | En 1.6.0 | En 1.7.0 |
|---|---|---|---|
| **REQ-046** | TC-064 | no podía componer su intento por `ui` (A-05-11a) | **resuelto**: el caso es `service` |
| **REQ-045** | TC-063 | `ui`, no señalado entonces | **resuelto de antemano**: el caso es `service` |
| **REQ-033** | TC-045 | `ui`, no señalado entonces | **resuelto de antemano**: el caso es `service` |
| **REQ-011** | TC-015 | ejerce la mitad *vacía*; la *inexistente* no la cubre nadie | igual (A-05-11b) |
| **REQ-027** | TC-036 | ídem, con el vehículo | igual (A-05-11b) |
| **REQ-065** | TC-090 | ídem, con el empleado | igual (A-05-11b) |

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

### 3.5 A-05-04 · regla afirmada fuera del censo de requisitos — sin cambios

La imposibilidad de modificar o anular una factura **no está enunciada en ninguno de los
79 requisitos**; A-05 ha vuelto a revisar los trece de `factures` (REQ-043 a REQ-055) y
ninguno la menciona. La mitad de DOC-05 se cerró en 1.4.0. La mitad de **DOC-04
(DISC-001) sigue abierta y es corrección de A-02.**

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

### 3.8 A-05-09 · `Q-30` vive en DOC-06 y no tiene ancla — abierto, reverificado

Sigue exactamente igual, y se ha comprobado hoy en vez de arrastrarse:

```
sync registro-ids.json --doc docs/DOC-06-MANUAL-USUARIO.md --block questions --dry-run
  encontrados 11 · anadidos 1 · ya presentes 10
  nuevos: Q-30
```

El registro censa 29 `Q-nnn` y su máximo sigue siendo Q-29. **Aviso, no bloqueante**, por
la razón de siempre: la regla bloqueante cubre `REQ-nnn` y `TC-nnn`, que son los
identificadores que viajan a Rally; `Q-30` no genera fila, no altera ninguna columna del
CSV y no puede romper una exportación. **Corrección**, de un comando: quien tenga shell
ejecuta `registry.js sync --doc docs/DOC-06-MANUAL-USUARIO.md --block questions`; si S-12
devolviera otro número, **A-04** renumera solo esa pregunta.

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

El reparto que cambió en 1.7.0 —**11a se cierra, 11b sigue igual y nace 11c**— no vuelve a
moverse en 1.8.0:

| Sub-hallazgo | Casos | Estado en 1.8.0 |
|---|---|---|
| **A-05-11a** | TC-064 | **CERRADO** — DOC-05 1.6.0 lo reclasificó a `service`; sin cambios |
| **A-05-11b** | TC-015, TC-036, TC-090 | **abierto, sin cambios** |
| **A-05-11c** | TC-032, TC-033, TC-047 | **abierto, sin cambios desde 1.7.0** |

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
en que esa comprobación falló, y **sigue fallando en 1.8.0**: DOC-05 no ha cambiado y nadie
ha corregido el resumen todavía.

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

### 3.13 A-05-13 · el plan citaba literales de importe que la aplicación ya no producía — **CERRADO en 1.9.0**

**Origen: `EXP-027` de `DOC-14-EXPLORATORIO` 2.0.0, nacido como hallazgo en 1.8.0.**
`SPEC 05` cambió el separador decimal de toda la aplicación de punto a coma (`EXP-014`,
cerrado); los `.feature` de `automation/ui/` que comprobaban esos importes por su texto
literal en pantalla —`factures.feature`, `nomines.feature` y, se supo después, también
`peces.feature` y `albarans.feature`— **seguían escritos con punto**. 1.8.0 lo verificó
sobre el código (`client/src/utils/format.ts`, `Intl.NumberFormat('es-ES', …)`) y sobre dos
casos citados por A-05-03b (TC-073, TC-075), y dejó constancia de que `DOC-14` citaba «al
menos nueve» sin cerrar la cuenta completa.

**`DOC-23` 2.1.0 cerró esa cuenta con una ejecución real, no con más lectura de código.**
De 107 escenarios, **17 fallaron exactamente por este patrón**: `TC-046`, `TC-060`,
`TC-069` a `TC-075`, `TC-088`, `TC-089`, `TC-097` a `TC-101` y `TC-103` — el conjunto que
citaba `DOC-14`, más algunos que no había llegado a nombrar (entre ellos `TC-046`, de
`albarans.feature`, y `TC-101`), más un caso aislado de infraestructura sin relación con
`EXP-027`. Confirma, con la lista exacta en la mano, lo que 1.8.0 solo podía acotar por
abajo con «al menos nueve».

**`DOC-23` 2.2.0 documenta la corrección, y A-05 la ha verificado él mismo, no solo
leído.** El commit `5366e18` («factures/nomines/peces/albarans.feature: EXP-027, coma
decimal + NBSP») sustituye los literales con punto por su equivalente con coma en los
cuatro `.feature` afectados. A-05 ha comprobado directamente sobre el fichero actual —no
sobre la declaración de DOC-23— que **TC-073** ahora fija `baseEsperada: 33,33` y
`totalEsperado: 40,33`, y **TC-075** fija `base: 98,40` y `total: 119,06`
(`factures.feature`, líneas 385 y 415), y que el propio literal `Literal: <…> €` lleva el
espacio no separable (`U+00A0`, no un espacio normal) que produce
`Intl.NumberFormat('es-ES', …)` — un detalle que el commit señala haber verificado contra
el DOM real antes de escribir ningún literal, y que A-05 ha confirmado con `cat -A` sobre
el fichero. `DOC-23` 2.2.0 reporta los 18 casos afectados en verde tras una reejecución
dirigida a esos 18 (no la suite completa, matiz que se traslada a §5.5).

**Qué NO cambia por esto: nada en el CSV ni en el diagnóstico de A-05-03b.** TC-073 y
TC-075 seguían —y siguen— sin comprobar el IVA, con independencia de este hallazgo (§3.4):
arreglar el literal del importe no añadió el paso que falta, y añadirlo no habría arreglado
el literal. Son y eran dos problemas independientes sobre los mismos dos casos.

**Severidad: cerrado.** No era bloqueante, no tocaba la matriz y no era responsabilidad de
la aplicación. **Corregido por `s10-auto-tcs`**, verificado por A-05 en el código. El único
residuo es metodológico, no de este hallazgo: la confirmación de los 18 casos fue una
reejecución dirigida, no una pasada completa de los 107 (§5.5).

## 4. La matriz

La matriz completa está en **`docs/DOC-07-MATRIZ.csv`** — 79 filas, una por requisito,
con la cabecera canónica:

```
requirement_id,requirement_statement,module,priority,test_case_ids,test_case_count,exists_in_rally,executed,result,diagnosis
```

**No hay ninguna fila con diagnóstico distinto de `Correcto`**, así que la tabla de
excepciones que normalmente ocuparía esta sección está vacía. Se remite al CSV para el
detalle requisito a requisito. Las filas con reserva en este documento son **veinticinco**,
cinco más que en 1.6.0: entran REQ-025 y REQ-034 por A-05-11c, entra REQ-053 y REQ-051
gana una reserva nueva por A-05-03b, y entran REQ-033 y REQ-045 para dejar constancia de
que su vía ya está corregida. REQ-046 conserva la suya por otro motivo tras cerrarse
A-05-11a.

| requirement_id | module | priority | test_case_ids | count | diagnosis | Reserva |
|---|---|---|---:|---|---|---|
| REQ-010 | vehicles | critical | TC-013;TC-014 | 2 | Correcto | A-05-08 (TC-014 en ola 1) · ⑤ Q-24 |
| **REQ-011** | vehicles | critical | TC-015 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-019 | peces | high | TC-025 | 1 | Correcto | A-05-08 (toda la cobertura en ola 1) · A-05-03 BUG-003 · ② |
| **REQ-025** | albarans | high | TC-032;TC-033 | 2 | Correcto | **A-05-11c** — **los dos casos son inejecutables**; decisión de producto |
| **REQ-027** | albarans | critical | TC-036 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-028 | albarans | critical | TC-037 | 1 | Correcto | A-05-08b (caso único en el carril de 17) · ① |
| REQ-029 | albarans | high | TC-038;TC-039 | 2 | Correcto | ③ Q-16 |
| REQ-030 | albarans | critical | TC-040 | 1 | Correcto | A-05-08b · TC-040 causó el rojo de TC-048 en `DOC-23` 2.1.0; **aislado y corregido en 2.2.0** — el riesgo estructural del carril sigue abierto |
| REQ-031 | albarans | high | TC-041 | 1 | Correcto | A-05-01a **cerrado**; queda ⑤ Q-30. `service` |
| REQ-032 | albarans | critical | TC-042;TC-043;TC-044 | 3 | Correcto | ⑤ |
| REQ-033 | albarans | critical | TC-045 | 1 | Correcto | `critico_caso_unico`; **A-05-11 resuelto**: el caso es `service` |
| **REQ-034** | albarans | high | TC-046;TC-047 | 2 | Correcto | **A-05-11c** (TC-047 inejecutable; TC-046 sí) |
| REQ-035 | albarans | critical | TC-048;TC-049 | 2 | Correcto | A-05-03 · BUG-001 · ② · TC-048 fue el rojo por aislamiento de `DOC-23` 2.1.0, **corregido y verde en 2.2.0** |
| REQ-036 | albarans | critical | TC-050 | 1 | Correcto | A-05-08b (caso único en el carril de 17) · ② |
| REQ-040 | albarans | medium | TC-055 | 1 | Correcto | A-05-03 · BUG-002 · ② · DOC-09 §3.1 |
| REQ-043 | factures | critical | TC-060;TC-061 | 2 | Correcto | A-05-03 · BUG-004 · ② · ⑤ Q-24, Q-27 |
| REQ-045 | factures | critical | TC-063 | 1 | Correcto | `critico_caso_unico`; **A-05-11 resuelto**: el caso es `service` |
| REQ-046 | factures | critical | TC-064 | 1 | Correcto | **A-05-11a CERRADO** (el caso es `service`); quedan ② y `critico_caso_unico` |
| REQ-048 | factures | high | TC-067;TC-068 | 2 | Correcto | ③ Q-16 |
| **REQ-051** | factures | high | TC-073 | 1 | Correcto | **A-05-03b** (defecto corregido; el caso sigue sin comprobar el IVA) · ③ Q-17 |
| **REQ-053** | factures | high | TC-075 | 1 | Correcto | **A-05-03b** (defecto corregido; el caso sigue sin comprobar el IVA) |
| REQ-055 | factures | high | TC-078 | 1 | Correcto | A-05-01b · ① · ② |
| REQ-057 | personal | high | TC-080 | 1 | Correcto | A-05-08 (toda la cobertura en ola 1) |
| **REQ-065** | nomines | critical | TC-090 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-073 | nomines | high | TC-103 | 1 | Correcto | A-05-01b · ① · ② |

Las veinticinco filas de arriba dicen `Correcto` y las veinticinco tienen reserva. **No es
una contradicción, es el alcance del fichero**: la columna `diagnosis` responde a «¿hay
caso?», no a «¿sirve el caso?», ni a «¿está sano el requisito?», ni a «¿se ha decidido ya
qué probar?», ni a «¿puede ejecutarse ese caso por sí solo?», ni a «¿puede ese caso
componer su vector por la vía que declara?», ni —desde hoy— a «**¿comprueba el caso lo que
su nombre anuncia?**». La columna «Reserva» es de esta tabla y **no existe en el CSV**:
añadirla rompería el contrato que consume S-07.

**Qué NO cambia en el CSV respecto de 1.8.0: nada.** Es **byte a byte idéntico** (md5
`087a03779bd36a00d09f9e87943588c0`, sha256 `1676546a…`), por **séptima vez consecutiva**, y
esta vez, igual que en 1.8.0, ni siquiera había un cambio de versión que comprobar en DOC-04
o DOC-05: el disparo fue `DOC-23`, que no es una entrada del JOIN (§2).

**Y la advertencia de 1.7.0 se mantiene, con el mismo matiz a favor que en 1.8.0, ahora
completo.** Siete versiones de CSV idéntico, y en esta: dos hallazgos que estaban abiertos
—el aislamiento TC-040/TC-048 (A-05-08b) y el literal de decimales (A-05-13)— se corrigen y
verifican, y su reflejo en este documento cambia de naturaleza sin que el CSV lo note.
**La estabilidad del fichero sigue sin ser evidencia de que nada relevante haya cambiado**:
es evidencia de que este fichero mide una sola cosa —¿hay caso?— y la mide bien. Todo lo
demás vive en la prosa de este documento, y por eso este documento existe.

**Verificaciones hechas sobre el CSV antes de entregarlo.** Las 79 filas parsean con 10
columnas cada una según RFC 4180; los enunciados que contienen coma van entrecomillados y
sobreviven al ida y vuelta de parseo; los **110** `TC-nnn` de DOC-05 aparecen en alguna
fila y ninguna fila cita un `TC-nnn` inexistente; cada `REQ-nnn` de DOC-04 aparece en
**exactamente una** fila (79 IDs distintos); la suma de `test_case_count` es **110**; las
tres columnas de Rally valen `n/d` en **las 79**; el fichero **no contiene la cadena
`GAP EXPORT`** (0 ocurrencias); los 79 diagnósticos son `Correcto` y **ninguno es
`GAP PLAN`**; y los 110 casos del CSV son exactamente los 110 que S-14 coloca en alguna
ola.

## 5. Cobertura por módulo, por prioridad, por orden de ejecución y por vía

### 5.1 Por módulo

| Módulo | Requisitos | Cubiertos | GAP PLAN | Casos | Casos/req | ①∪②∪③ | ⑤ solo | **Unión** | ui-only |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| clients | 8 | 8 | 0 | 11 | 1,38 | 0 | 5 | **5** | 8 |
| vehicles | 9 | 9 | 0 | 12 | 1,33 | 0 | 6 | **6** | 9 |
| peces | 7 | 7 | 0 | 8 | 1,14 | 4 | 3 | **7** | 7 |
| albarans | 18 | 18 | 0 | 28 | 1,56 | **8** | **6** | **14** | **16** |
| factures | 13 | 13 | 0 | 19 | 1,46 | 10 | 3 | **13** | **11** |
| personal | 7 | 7 | 0 | 8 | 1,14 | 0 | 6 | **6** | 7 |
| nomines | 12 | 12 | 0 | 18 | 1,50 | 7 | 3 | **10** | 12 |
| shell | 4 | 4 | 0 | 5 | 1,25 | 2 | 0 | **2** | 4 |
| configuracio | 1 | 1 | 0 | 1 | 1,00 | 1 | 0 | **1** | 1 |
| **Total** | **79** | **79** | **0** | **110** | **1,39** | **32** | **32** | **64** | **75** |

No hay huecos de cobertura que localizar por módulo. La concentración se mantiene:
**`factures` (10 de 13) y `albarans` (8 de 18) reúnen 18 de los 32 requisitos con algo
pendiente** —el ciclo del dinero, donde además están los cuatro defectos de A-14—. Con
`factures` hay que seguir siendo preciso: sumando el quinto alcance, **los 13 de 13 tienen
algo pendiente**. Es el módulo donde menos se puede decir que esté todo claro y el que
produce dinero.

**El único cambio de esta tabla está en la columna `ui-only`**, y es consecuencia directa
de DOC-05 1.6.0: `albarans` baja de 17 a 16 (sale REQ-033, cuyo TC-045 pasa a `service`) y
`factures` de 13 a 11 (salen REQ-045 y REQ-046). El total pasa de 78 a **75**. Ninguna
columna de cobertura se mueve, que es exactamente lo que debía ocurrir.

### 5.2 Por prioridad del requisito

| Prioridad (DOC-04) | Requisitos | Cubiertos | GAP PLAN | Casos | ①∪②∪③ | ⑤ solo | **Unión** | Defecto confirmado | ui-only | **A-05-11** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| critical | 35 | 35 | 0 | 56 | **10** | **16** | **26** | **2** | **32** | **3** |
| high | 27 | 27 | 0 | 35 | 14 | 8 | **22** | **1** | 26 | **2** |
| medium | 15 | 15 | 0 | 17 | 6 | 8 | **14** | **1** | 15 | 0 |
| low | 2 | 2 | 0 | 2 | 2 | 0 | **2** | 0 | 2 | 0 |

Diez de los 35 `critical` (29 %) y catorce de los 27 `high` (52 %) tienen algo pendiente
en los tres alcances clásicos. El quinto alcance golpea distinto: **16 de los 35
`critical` entran en él y en ningún otro**, lo que los lleva a 26 de 35 (74 %).

**Las dos últimas columnas se movieron en direcciones opuestas en 1.7.0 y no se han vuelto
a mover.** `ui-only` bajó de 78 a **75** porque A-03 llevó tres casos `critical` a
`service`: los `critical` con toda su cobertura por interfaz pasaron de 35 de 35 a **32 de
35**, y esa bajada fue una mejora, no un deterioro. Sigue en 75 y en 32.

**A-05-11 pasa de 4 requisitos a 5, y cambia de forma.** En 1.6.0 los cuatro eran
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

| Prioridad (DOC-05) | Casos | vs 1.8.0 |
|---|---:|---|
| Critical | 49 | = |
| High | 31 | = |
| Medium | 28 | = |
| Low | 2 | = |
| **Total** | **110** | **=** |

Por tipo: **66 `Functional`, 31 `Negative`, 9 `Boundary` y 4 `Integration`**, sin cambios.
Los 35 requisitos críticos reciben 56 casos y **los 35 tienen al menos un caso `Critical`**
(verificado: 0 excepciones).

### 5.4 Por orden de ejecución — A-05-08, sin cambios

Este apartado **no reproduce el plan de ejecución**: está en **DOC-05 §4.10**, escrito por
su dueño y con más detalle del que cabría aquí, y copiarlo crearía una segunda fuente de
verdad que derivaría en silencio. Lo que sí es de A-05 es la intersección entre el plan y
la matriz, porque hay una pregunta que sólo se puede contestar con los dos delante: **¿puede
producirse la evidencia de este requisito por sí sola?**

| | Valor | vs 1.8.0 |
|---|---:|---|
| Olas | 2 | = |
| Ola 0 | 107 casos en 67 carriles | = |
| Ola 1 | 3 casos en 3 carriles | = |
| Paralelismo máximo | 67 | = |
| Carril más largo | 17 casos | = |
| Casos sin aislamiento declarado | **0 de 110** | = |

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

### 5.5 Grados de automatización y ejecución real — contexto, no cobertura

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

**Lo que DOC-23 añade encima, y cómo ha cambiado entre 2.0.0 y 2.2.0:**

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
sería perder el hallazgo de §3.11:

| Excluidos | Casos | Qué son |
|---|---|---|
| Ya reclasificados a `service` | TC-041, TC-045, TC-063, TC-064 | **correcto**: los ejecutará S-17, no S-10 |
| Marcados `not-recommended` por el propio plan | TC-109 | **correcto**: se ejecuta a mano |
| **Declaran `ui` y no tienen vector en la interfaz** | **TC-032, TC-033, TC-047** | **A-05-11c**, §3.11 |

**Nada de esto entra en el CSV ni cambia un diagnóstico.** 102 de 110 automatizados es una
cifra de madurez de la suite, no de cobertura de requisitos: la cobertura sigue siendo
100 % porque los 110 casos existen y los 79 requisitos tienen el suyo. Un caso sin
escenario automatizado sigue cubriendo su requisito; lo que no hace es producir evidencia
sin que alguien se siente a ejecutarlo.

### 5.6 Por vía de verificación

DOC-05 1.6.0 declara `verification_path` en los 110 casos. A-05 lo ha contado sobre el
YAML: **106 `ui`, 4 `service`, 0 `mixed`, 0 sin declarar** (eran 109/1 en 1.5.0).

**Estas cifras salen de los bloques `testcases`, no del resumen del front-matter de
DOC-05**, que sigue declarando el reparto de 1.5.0 y por tanto ya no es cierto. Ver
**A-05-12**, §3.12. Es una de las pocas ocasiones en que la regla «nunca leas la prosa,
lee el YAML» cambia el resultado en vez de solo garantizarlo.

Llevado a la matriz, requisito a requisito:

| | Requisitos | % | vs 1.8.0 |
|---|---:|---:|---|
| Cobertura enteramente por interfaz (`ui`) | **75** | 94,9 % | = |
| Cobertura enteramente por servicio | **4** (REQ-031, REQ-033, REQ-045, REQ-046) | 5,1 % | = |
| Cobertura mixta (casos por las dos vías) | 0 | 0 % | = |
| **`critical` con cobertura enteramente por interfaz** | **32 de 35** | 91,4 % | = |

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

| | 1.6.0 | 1.7.0 |
|---|---|---|
| REQ-046 (TC-064) | en la intersección | **fuera**: el caso es `service` |
| REQ-011, REQ-027, REQ-065 | dentro, a medias | dentro, a medias, sin cambios |
| REQ-025 (TC-032, TC-033) | no detectado | **dentro, entero** |
| REQ-034 (TC-047) | no detectado | **dentro, a medias** |

**Y aquí sigue el límite honesto de esta medición, corregido en un punto.**
`verification_path` dice **por qué vía se declara** que se ejerce un caso; **no dice si el
vector existe en esa vía**. Es un campo declarativo, no verificado, y nada en el contrato,
ni en S-14, ni en este documento puede comprobarlo automáticamente. Lo que 1.6.0 añadía a
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

**Aún no hay datos de ejecución en Rally.** Esta sección es propia de la pasada `post` y
no puede escribirse ahora: no existen `DOC-19-RALLY-TESTCASES.csv` ni
`DOC-20-RALLY-STATE.json`, es decir, los 110 casos no se han exportado, no constan
ejecutados en Rally y no tienen resultado registrado allí. Cualquier afirmación sobre qué
diría esa ejecución sería especulación, no trazabilidad.

**Y desde 1.7.0 hay una tentación todavía mayor en esta versión, y sigue mereciendo
nombrarse.** `DOC-23` 2.2.0 trae 102 casos del plan ejecutados y **107 de 107 escenarios en
verde**: ya no queda ni un rojo que discutir. Es lo más cerca que este proyecto ha estado
nunca de tener resultados, y aun así no llena este hueco: **una suite local no es Rally**,
`exists_in_rally` sigue sin haber sido mirado por nadie, y las tres columnas del CSV
preguntan por Rally. Escribir aquí la narrativa de riesgos con los datos de DOC-23 sería
exactamente el mismo error que escribir «No» donde toca `n/d`: dar por medido lo que se ha
medido en otro sitio y con otro alcance. Lo que sí se puede hacer —y se ha hecho a lo largo
de §3 y §5— es usar DOC-23 **como evidencia citada, con su procedencia al lado**, para
sostener hallazgos concretos.

Lo que sí puede afirmarse hoy, y sólo esto:

- el plan no deja ningún requisito sin caso definido, ni ningún requisito crítico sin un
  caso crítico;
- **el hallazgo más grave de 1.6.0 sigue corregido**: TC-064 —y con él TC-063 y TC-045— ya
  no declara una vía por la que su vector no se puede componer;
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

### 7.1 El alcance, recalculado y sin cambios

Es el dato que A-11 usa para el Go/No-Go. A-05 lo ha recalculado desde los bloques YAML de
los tres documentos —`open_questions` de DOC-04 vía `status` y `affects_requirements`,
`open_questions.questions` de DOC-05 vía `affects_requirements` y `affects_cases`, y
`open_questions.questions` de DOC-06 vía `affects_requirements`— sin leer ninguna tabla de
prosa.

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
apartado es el sitio donde la distinción se ve mejor. Lo que ha avanzado a lo largo de
1.7.0 y 1.8.0 —A-05-11a cerrado, A-05-11c y A-05-03b abiertos, A-05-03b cambiando de
naturaleza y A-05-13 naciendo— **no vive en ninguno de los cinco alcances**, porque los
cinco miden preguntas sin responder y esto son hechos verificados. Un
requisito puede estar fuera de los cinco alcances y aun así no ser verificable: REQ-025 lo
demuestra.

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
  un solo requisito ha quedado validado como intencionado en seis versiones consecutivas.
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

**La pregunta 1 de 1.6.0 —«¿se corrige TC-064 antes de exportar?»— está contestada, y la
respuesta fue sí.** Se retiró en 1.7.0. **La pregunta 16 de 1.8.0 —«¿se actualizan los
literales de importe al separador decimal vigente?»— también está contestada, y también
sí**: commit `5366e18`, verificado por A-05 en el código (A-05-13, §3.13). Se retira de
esta lista sin dejar hueco: no hay pregunta nueva que ocupe su número.

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
   la pregunta de método que dejó 1.7.0 y sigue abierta. El barrido documental de §4.12 encontró
   cuatro dudosos; la generación de escenarios de S-10 encontró cinco casos sin vector
   —tres que A-03 ya reclasificó y los tres de A-05-11c— y además destapó el problema de
   aislamiento TC-040/TC-048 que este documento venía anunciando en abstracto desde 1.4.0.
   **Escribir el automatismo es hoy el único método que ha demostrado encontrar estas
   cosas** (§5.6). Decisión de **A-01 / A-11** sobre el orden de las fases.
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
12. **¿Se concede formalmente `Q-30`?** Un comando de S-12 y, si el número concedido fuera
    otro, una renumeración de una sola pregunta por parte de **A-04** (§3.8).
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
    esta versión vuelve a reforzar el argumento en contra, con la misma vía que 1.8.0 y un
    disparador distinto: el de 1.9.0 no vino de DOC-04 ni de DOC-05 —las dos entradas del
    JOIN, las únicas que un grafo modelaría— sino de `DOC-23`, un informe de ejecución que
    ningún grafo de dependencias técnicas va a contener nunca. Lo único que ha cambiado en
    esta versión —que se cierre A-05-13, que TC-048 quede corregido y verificado, que
    A-05-08b pase de hipótesis a caso concreto parcheado— es una lectura de un documento de
    ejecución y de cuatro `.feature`, no una arista. **Lo que queda como artefacto propio de
    A-05 es cada vez más sólo la interpretación**, y séptima versión consecutiva con el CSV
    byte a byte idéntico —la segunda sin que ni DOC-04 ni DOC-05 cambiaran de versión— lo
    enseña sin necesidad de argumentarlo.
