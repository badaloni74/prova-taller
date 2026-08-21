---
doc_id: DOC-07
doc_name: DOC-07-TRAZABILIDAD
version: 1.6.0
status: draft
supersedes: 1.5.0
version_reason: >
  MINOR. Segunda regeneración disparada por `S-16 · Cascada de obsolescencia`: este
  documento declaraba DOC-05 **1.4.1** y A-03 lo ha llevado a **1.5.0**. El salto de
  DOC-05 es aditivo y A-03 lo verificó parseando; A-05 lo confirma con el hecho más duro
  disponible: **el CSV es byte a byte idéntico por cuarta vez consecutiva** (md5
  `087a0377…`). La matriz no se mueve. Lo que se mueve es lo que la matriz significa, y
  cambian cinco cosas que A-11 y S-07 necesitan: (1) DOC-05 1.5.0 declara
  **`verification_path` en los 110 casos** —109 `ui`, 1 `service`— y eso permite por
  primera vez medir la **cobertura monovía**: 78 de 79 requisitos y **35 de 35
  `critical`** tienen toda su cobertura por interfaz; (2) nace **A-05-11 · vector no
  alcanzable por la vía declarada**, con dos formas, a partir de `DOC-09-IMPACTO` de A-07
  y del propio §4.12 de DOC-05: **A-05-11a**, TC-064 (`Critical`) declara `ui` y su
  intento **no se puede componer en `FacturaForm`** —verificado por A-05 en el código—, y
  **A-05-11b**, TC-015, TC-036 y TC-090 ejercen solo la mitad vacía de un vector de
  referencia inexistente; (3) **`critico_caso_unico` se agrava sin cambiar de número**:
  cuatro de sus diecisiete —REQ-011, REQ-027, REQ-046 y REQ-065— tienen un caso único que
  además no ejerce entero su vector; (4) **Q-18 pasa a `answered`** y el alcance ③ baja de
  10 requisitos a 5 y de 8 casos a 3, con lo que la unión ①∪②∪③ pasa de 33 a **32**
  requisitos —sale REQ-032— y la unión total **se queda en 64 (81,0 %)**; (5) se declara
  `DOC-09-IMPACTO` como entrada nueva. **No es MAJOR** porque nada de lo que consumen A-11
  y S-07 queda invalidado: misma cabecera de CSV, mismo mapa requisito → caso, ningún ID
  movido, cobertura en 100 % y **cero anomalías bloqueantes**. **No es PATCH** porque
  A-05-11a es un punto de Go/No-Go nuevo y porque tres cifras del apartado 7 cambian.
generator: A-05 coherencia y trazabilidad
generator_version: "1.2"
generated_at: 2026-08-17T14:05:00+02:00
project: app-taller
project_code: TALLER
pass: pre
history: docs/DOC-07-TRAZABILIDAD-HIST.md   # este documento no lleva historial: solo estado actual
method: >
  JOIN determinista sobre los bloques YAML de DOC-04 y DOC-05, ejecutado por la skill
  S-14 · Matriz de trazabilidad. A-05 no calcula la matriz: la interpreta. El plan de
  ejecución, los grados de automatización y el reparto de `verification_path` se leen del
  `--json` de S-14 y de los bloques YAML, nunca de la prosa de DOC-05.
source:
  repo_path: C:\Claude\appdani
  vcs: git
  branch: master
  commit_sha: 44748fb66d19c5d90106d3bceaaf87dc92c7705b
  working_tree_clean: false   # solo hay sin versionar docs/, automation/ y registro-ids.json, generados por este ciclo
inputs:
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    present: true
    version: 1.2.0
    hash: sha256:7d1844156487a62b8936a0d2164ebec043eb7fdb7043d27afdd649316f9b63a0
    usage: bloque `yaml requirements` (79 requisitos) y `open_questions` anidado (15 preguntas)
    changed_since: "no; mismo hash que en DOC-07 1.5.0, 1.4.0 y 1.3.0"
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    present: true
    version: 1.5.0
    hash: sha256:f2e13dbc75e4a3d78d1ed48288217f2f47a16e1e25262ae08de8488273281e1c
    usage: >
      nueve bloques `yaml testcases` (110 casos, 241 pasos, con `verification_path` nuevo
      en los 110) y bloque `yaml open_questions` (4 propias —2 `open`, 2 `answered`— y 15
      citas)
    changed_since: "sí; 1.4.1 era sha256:81a8895cad8bcf307d241ec63f4e2d4e1bf4e9ec7eb906b6992ed7f05b59e297 — motivo de esta regeneración, señalado por S-16"
    note: >
      cambio **aditivo**: ningún `id`, `external_id`, `requirement`, `priority`, `type`,
      `name`, `preconditions` ni `steps` se ha tocado. A-03 lo afirma tras parsear; A-05 lo
      verifica de forma independiente por el hecho más duro disponible, que el CSV no
      cambia un byte. Lo que 1.5.0 añade es `verification_path` en los 110 casos, el cierre
      de `Q-18` en dos mitades y la corrección de rutas de `automation/`
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    present: true
    version: 1.0.0
    hash: sha256:efcf62b82a986c02d9b838c7e5bbf7142e22ed4b63a6402f3ce92bacd2f39d5c
    usage: >
      **no alimenta el JOIN ni el CSV.** Es el origen de A-05-11a: A-07 verificó en el
      código que `FacturaForm` impide componer el intento de TC-064, y le pide
      explícitamente a A-05 que revise las filas de REQ-040 y REQ-046 (§3.5 de DOC-09).
      A-05 ha repetido esa verificación sobre `FacturaForm.tsx` en vez de creérsela
    changed_since: "nueva; no se declaraba en 1.5.0, cuando DOC-09 no existía"
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    present: true
    version: 1.2.0
    hash: sha256:150240af136497762614c0113c31241d1891dffa62ce5f51c2a5b06cf6b58041
    usage: >
      bloque `yaml open_questions` (11 propias, 19 citas). **No alimenta el JOIN ni el
      CSV.** De aquí sale el alcance ⑤ del apartado 7 y los hallazgos A-05-09 y A-05-10
    changed_since: "no; mismo hash que en DOC-07 1.5.0"
  - id: registro-ids.json
    from: S-01 / A-02 / A-03 / A-04 / A-06 / A-12 / A-15, con S-12 como gobierno
    present: true
    hash: sha256:afca8a7f31c6da308a6c7060e52beda89419727ed4278787b87ab2ea1f232b3f
    usage: verificación de ID fuera de registro, de deriva de significado y del censo de `Q-nnn`
    changed_since: "sí; 1.5.0 era sha256:83064f60… con 310 anclas. Ahora **311**: ACT=1 UC=40 BR=37 REQ=79 TC=110 Q=29 FUN=8 MEJ=6 EVO=1"
  - id: DOC-24-BUGS.json
    from: A-14
    present: true
    version: 1.0.0
    hash: sha256:c4144b06740523db398ba86d851cc6d87fd5f5348eb763f10d17b47243873dd1
    usage: "**no alimenta el JOIN ni el CSV**. Se lee solo para A-05-03"
    changed_since: "no; mismo hash que en DOC-07 1.5.0 y 1.4.0"
  - id: DOC-19-RALLY-TESTCASES.csv
    from: S-07
    present: false
    consequence: no hay exportación a Rally que comprobar; la pasada `post` no se ejecuta
  - id: DOC-20-RALLY-STATE.json
    from: I-01
    present: false
    consequence: no hay estado de ejecución que leer; `exists_in_rally`, `executed` y `result` valen `n/d`
outputs:
  - id: DOC-07-MATRIZ.csv
    md5: 087a03779bd36a00d09f9e87943588c0
    sha256: 1676546ad1473a6401ab8aaa6010e246f2f4b2ef4693da37c75c305ec540efb3
    changed_since_1_5_0: false   # byte a byte idéntico, cuarta vez consecutiva
consumers: [A-11, S-07, A-12]
counts:
  requirements_total: 79
  requirements_covered: 79
  gap_plan: 0
  coverage_pct: 100.0
  test_cases_total: 110
  test_cases_mapped: 110
  test_case_steps: 241
  orphan_cases: 0
  broken_references: 0
  blocking_anomalies: 0
  warnings: 27                    # 17 de S-14 + 10 hallazgos propios de A-05
  findings_closed_this_version: []
  findings_new_this_version: [A-05-11a, A-05-11b]
  findings_open: [A-05-01b, A-05-03, A-05-04, A-05-06, A-05-08, A-05-08b, A-05-09, A-05-10, A-05-11a, A-05-11b]   # 10, enumerados en §3.0
  anchors_total: 311
  open_questions_census: 29       # 15 de DOC-04 + 4 de DOC-05 + 10 de DOC-06 con ancla
  open_questions_claimed_without_anchor: [Q-30]
  open_questions_doc04: 15
  open_questions_doc04_open: 9
  open_questions_doc05_own: 4
  open_questions_doc05_open: 2    # era 3 en 1.5.0; Q-18 pasa a answered
  open_questions_doc06_own: 11
  open_questions_doc06_open: 11
  open_questions_id_collisions: 0
  scope_awaiting_business_req: 16       # ①
  scope_awaiting_business_cases: 21
  scope_gap_until_evolutivo_req: 16     # ②
  scope_gap_until_evolutivo_cases: 23
  scope_method_pending_req: 5           # ③ — era 10 en 1.5.0
  scope_method_pending_cases: 3         # era 8 en 1.5.0
  scope_union_123_req: 32               # era 33; sale REQ-032
  scope_union_123_cases: 44             # era 45; sale TC-043
  scope_union_123_req_pct: 40.5
  scope_undocumented_ui_req: 47         # ⑤ DOC-06
  scope_union_total_req: 64             # sin cambio: REQ-032 sigue en ⑤
  scope_union_total_req_pct: 81.0
  requirements_validated_as_designed: 0
  requirements_with_confirmed_defect: 4
verification_path:                # nuevo en esta versión; leído del YAML de DOC-05 1.5.0
  cases_ui: 109
  cases_service: 1                # TC-041
  cases_mixed: 0
  cases_undeclared: 0
  requirements_ui_only: 78        # toda su cobertura por interfaz
  requirements_with_service: 1    # REQ-031
  critical_requirements_ui_only: 35   # los 35 de 35
  requirements_with_unreachable_vector: 4   # REQ-046 entero · REQ-011, REQ-027, REQ-065 a medias
execution:                        # derivado por S-14; sin cambios respecto de 1.5.0
  waves: 2
  wave_0_cases: 107
  wave_0_lanes: 67
  wave_1_cases: 3
  wave_1_lanes: 3
  max_parallelism: 67
  longest_lane: 17
  cases_without_isolation_declared: 0
  requirements_fully_in_wave_1: [REQ-019, REQ-057]
  requirements_partly_in_wave_1: [REQ-010]
automation:                       # informativo; `blocked` es false en los 110 casos
  high: 25
  medium: 80
  low: 4
  not_recommended: 1
  blocked: 0
---

# DOC-07 · Coherencia, cobertura y trazabilidad — app-taller

> Este documento refleja **solo el estado actual**. El historial de versiones vive en
> **`docs/DOC-07-TRAZABILIDAD-HIST.md`**.

## 1. Resumen de cobertura

**La cobertura de requisitos por casos de prueba definidos es del 100,00 % (79 de 79
requisitos cubiertos, 0 GAP PLAN).** Los 110 casos de DOC-05 1.5.0 —241 pasos en nueve
bloques— se reparten sobre los 79 requisitos de DOC-04 1.2.0: 52 requisitos tienen un
caso, 23 tienen dos y 4 tienen tres. No hay ningún requisito sin prueba, ningún caso
huérfano, ninguna referencia rota y **ninguna anomalía bloqueante**: nada de lo
comprobado aquí impide avanzar a la Fase 3.

| Magnitud | Valor | vs 1.5.0 |
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
| Avisos | 27 | **−1** con **+2 hallazgos nuevos**: el censo de 1.5.0 contaba de más, corregido y enumerado en §3.0 |
| Casos con `verification_path` declarado | **110 de 110** | **nuevo** |
| Requisitos con toda su cobertura por interfaz | **78** (98,7 %) | **nuevo** |
| Requisitos `critical` con toda su cobertura por interfaz | **35 de 35** | **nuevo** |
| **Requisitos cuyo vector no es alcanzable por la vía declarada** | **4** | **nuevo** |
| Censo de `Q-nnn` con ancla | 29 | = |
| `Q-nnn` reclamados sin ancla | 1 (`Q-30`) | = |
| ① Requisitos que esperan respuesta de negocio | 16 (20,3 %) | = |
| ② Requisitos con hueco confirmado hasta el evolutivo | 16 (20,3 %) | = |
| ③ Requisitos tocados por una decisión de método sin tomar | **5** (6,3 %) | **−5** (era 10) |
| **Unión ①∪②∪③** | **32** (40,5 %) | **−1** (era 33) |
| ⑤ Requisitos cuya escena no está documentada (DOC-06) | 47 (59,5 %) | = |
| **Unión de los cuatro alcances** | **64** (81,0 %) | **=** |
| Requisitos con defecto confirmado en el sistema real | 4 | = |
| Filas de la matriz (`DOC-07-MATRIZ.csv`) | 79 | = |

**Qué mide y qué no mide ese 100 %.** Las advertencias que este documento arrastra siguen
vigentes y no se repiten enteras: no mide **ejecución ni resultado** (pasada `post`), no
mide que el requisito describa un **sistema sano** (A-05-03), no mide **en qué orden
puede producirse la evidencia** (A-05-08) y no mide **si se sabe qué verá el usuario**
(A-05-10).

Esta versión añade una que no estaba, y es la más incómoda de las cinco:

> **El 100 % no mide si el caso puede ejercer su vector por la vía que declara.**

Hasta DOC-05 1.5.0 esa pregunta no era formulable, porque los casos no declaraban vía.
Ahora la declaran, y en cuanto se puede formular aparecen **cuatro requisitos** donde la
respuesta es que no: **REQ-046** entero —su único caso, `TC-064`, es `Critical`, declara
`ui` y su intento no se puede componer en la pantalla contra la que está escrito— y
**REQ-011, REQ-027 y REQ-065** a medias —sus casos ejercen la mitad vacía de un vector
que tiene dos mitades—. Es el hallazgo **A-05-11**, §3.11.

Ninguna de las cinco baja la cobertura ni un punto. Las cinco cambian lo que significa.

## 2. Qué pasada se ha ejecutado y por qué

**Se ha ejecutado únicamente la pasada `pre`.**

| Entrada | Estado | Consecuencia |
|---|---|---|
| `docs/DOC-04-FUNCIONAL.md` | presente, v1.2.0 (mismo hash) | JOIN posible |
| `docs/DOC-05-PLAN-PRUEBAS.md` | presente, **v1.5.0** (era 1.4.1) | JOIN posible; motivo de esta regeneración |
| `docs/DOC-09-IMPACTO-…md` | presente, **v1.0.0, nueva** | **no toca la matriz**; origen de A-05-11a |
| `docs/DOC-06-MANUAL-USUARIO.md` | presente, v1.2.0 (mismo hash) | **no toca la matriz**; alimenta ⑤, A-05-09 y A-05-10 |
| `registro-ids.json` | presente, **311 anclas** (eran 310) | verificación de anclas y del censo de `Q-nnn` |
| `docs/DOC-24-BUGS.json` | presente, v1.0.0 (sin cambios) | **no toca la matriz**; alimenta A-05-03 |
| `docs/DOC-19-RALLY-TESTCASES.csv` | **ausente** | no hay exportación a Rally que comprobar |
| `docs/DOC-20-RALLY-STATE.json` | **ausente** | no hay estado de ejecución que leer |

Al no existir DOC-19 ni DOC-20, las columnas `exists_in_rally`, `executed` y `result`
valen **`n/d`** en las 79 filas del CSV. No valen «No»: «No» afirmaría que el caso no
está en Rally o que no se ha ejecutado, y eso es un dato que nadie ha medido. Por la
misma razón, los únicos diagnósticos emitidos son `Correcto` y `GAP PLAN`; **el CSV no
contiene ni un solo `GAP EXPORT`**, que en esta pasada sería un dato inventado
(verificado: 0 ocurrencias de la cadena en el fichero).

**Quién ha disparado esta regeneración.** Otra vez `S-16 · Cascada de obsolescencia`, y ya
no es novedad sino rutina, que es lo que se quería:

```
DOC-07 1.5.0 (A-05 coherencia y trazabilidad)
   DOC-05: declara 1.4.1, actual 1.5.0  [MINOR]
```

Es el uso exacto para el que existe el bloque `inputs` con versión y hash, y la razón por
la que la procedencia se queda en este documento y **no** se va al fichero de historial.

**Sobre la naturaleza del cambio de DOC-05, que condiciona todo lo demás.** A-03 declara
que 1.5.0 es **aditivo**: ningún `id`, `external_id`, `requirement`, `priority`, `type`,
`name`, `preconditions` ni `steps` se ha tocado, y lo verificó parseando. A-05 no lo da
por bueno por deferencia: lo comprueba con la única prueba que no depende de la palabra
de nadie, que es **volver a ejecutar el JOIN**. El CSV sale **byte a byte idéntico por
cuarta vez consecutiva** (md5 `087a03779bd36a00d09f9e87943588c0`). Confirmado, pues: la
matriz no se mueve.

**Y sin embargo esta versión no es un sello.** Lo que DOC-05 1.5.0 añade —un campo por
caso— no cambia ninguna fila y cambia la lectura de cuatro. Es la diferencia entre
versionar el fichero y versionar lo que un consumidor decidiría distinto.

### Método

La matriz la construye la skill **S-14 · Matriz de trazabilidad**:

```
node scripts/matriz.js --doc04 docs/DOC-04-FUNCIONAL.md --doc05 docs/DOC-05-PLAN-PRUEBAS.md
                       --registro registro-ids.json --out docs/
```

Extrae el bloque ` ```yaml requirements ` de DOC-04 y los nueve bloques
` ```yaml testcases ` de DOC-05, cruza el campo `requirement` de cada caso contra el
`id` de cada requisito y escribe el CSV. No se ha leído prosa para construir ninguna
fila. **Código de salida 0**: sin anomalías bloqueantes.

Del mismo `--json` salen, sin reinterpretación, el bloque `execution` y el bloque
`automation`. Lo que A-05 calcula por su cuenta, con parser propio y siempre sobre
bloques YAML —nunca sobre prosa—: el reparto de `verification_path` y su cruce con la
matriz (§5.6), el censo de `Q-nnn` de los tres documentos, los cinco alcances del
apartado 7 y el cruce entre la matriz y el plan de ejecución del §5.4. La verificación de
identificadores se hace con **S-12 en modo lectura**.

**Una verificación que A-05 ha hecho fuera de todo YAML, y conviene decir por qué.**
A-05-11a se apoya en una afirmación sobre el código: que `FacturaForm` obliga a elegir
cliente antes de listar albaranes. A-07 la verificó y la dejó escrita; A-05 **la ha
repetido** sobre `client/src/pages/factures/FacturaForm.tsx` en vez de citarla. El motivo
es de contrato: este documento se permite decir que un caso `Critical` no puede
ejecutarse, y una afirmación de ese peso no se sostiene en la lectura de otro agente.
Lo que se lee allí es que la lista de albaranes se pide con
`albaransService.listByClient(Number(clientId), 'pendent')` y que las casillas que se
pintan salen de esa lista: sólo pueden ser de un cliente. **No es una interpretación del
código, es lo que hace.**

**Ni DOC-09 ni DOC-24 ni DOC-06 convierten esto en una pasada `post`.** A-07 ha analizado
un impacto, A-14 ha ejecutado *la aplicación* y A-04 ha escrito *un manual*. Ninguno de
los 110 casos se ha ejecutado, ninguno tiene resultado y ninguno está en Rally.

## 3. Anomalías

### 3.0 El censo de avisos, enumerado

Este documento declara **27 avisos**: los 17 de una sola regla de S-14 (§3.2) y **10
hallazgos propios de A-05**, que son estos y no hay más:

| Hallazgo | Qué dice | Estado en 1.6.0 | Corrección de |
|---|---|---|---|
| **A-05-01b** | REQ-055 y REQ-073 no tienen consecuencia observable que verificar | abierto, sin cambios | A-06 → A-03 |
| **A-05-03** | Cuatro requisitos con cobertura verde y defecto confirmado | abierto, decidido y vigilado | decidido (Q-19) |
| **A-05-04** | Una regla afirmada que nunca llegó a ser requisito | abierto por la mitad de DOC-04 | A-02 |
| **A-05-06** | El censo de `Q-nnn` depende del orden de las claves | abierto, **exposición sin cambios: 34** | S-12 |
| **A-05-08** | Dos requisitos `high` con toda su evidencia en la ola 1 | abierto, sin cambios | S-06 / DOC-13 |
| **A-05-08b** | Tres `critical` de caso único dentro del carril serial de 17 | abierto, sin cambios | S-06 / DOC-13 |
| **A-05-09** | `Q-30` vive en DOC-06 y no tiene ancla | abierto, **reverificado hoy** | quien tenga shell → A-04 |
| **A-05-10** | Una superficie de interfaz no documentada, medida por tres agentes | abierto, **con un síntoma nuevo** | A-02 + mantenedor |
| **A-05-11a** | `TC-064` no puede componer su intento por la vía que declara | **nuevo** | **A-03** |
| **A-05-11b** | Tres casos ejercen solo una mitad de un vector de dos | **nuevo** | **A-03** |

1.5.0 declaró **28** (17 + 11) y esta versión declara **27** (17 + 10) con dos hallazgos
nuevos, lo que sólo cuadra si el censo anterior contaba de más. Contaba de más: arrastraba
en el número un hallazgo que su propio apartado daba por **CERRADO**. Se corrige avisando
y no en silencio, por la misma razón por la que 1.5.0 corrigió su medición de A-05-06: un
documento que corrige callando enseña a no fiarse de sus versiones anteriores. Los
hallazgos cerrados —**A-05-01a, A-05-02, A-05-05 y A-05-07**— no vuelven a este censo y su
historia vive en `DOC-07-TRAZABILIDAD-HIST.md`.

### 3.1 Bloqueantes — **ninguna**

Las seis reglas bloqueantes de S-14 se han ejecutado sobre DOC-05 1.5.0 y todas pasan:

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
| **Reparto de `verification_path` declarado por DOC-05 ≠ el que A-05 cuenta** | **0** — 109/1/0 en ambos |
| Módulo del caso distinto del módulo de su requisito | 0 de 110 |
| `external_id` que no sigue el patrón `TALLER-XXX-TC-nnn` | 0 de 110 |
| Requisitos con `status: deprecated` | 0 (los 79 son `active`) |
| Requisitos `critical` cubiertos solo por casos `Low` | 0 de 35 |
| Requisitos `critical` sin ningún caso `Critical` | 0 de 35 |
| Requisitos alcanzados por una pregunta con `resolution: as_designed` | **0 de 79** |
| Cifras de aislamiento declaradas por DOC-05 ≠ las que deriva S-14 | 0 (las once coinciden) |

**Nada impide avanzar a la Fase 3 por motivos de trazabilidad.** El salto de DOC-05 de
1.4.1 a 1.5.0 no ha introducido ninguna bloqueante, y era previsible: un campo nuevo con
vocabulario cerrado, informado en los 110 casos, no puede romper un JOIN que no lo mira.

**Que no haya bloqueantes no significa que no haya nada que decidir antes de exportar.**
Hay una cosa, es nueva y está en §3.11: **A-05-11a**. No es bloqueante bajo el contrato
—y allí se explica por qué no se le fuerza a serlo— pero A-05 recomienda resolverla antes
de que TC-064 llegue a Rally.

La fila que más pesa en el Go/No-Go sigue valiendo cero: **ninguna de las seis respuestas
de negocio ha validado un comportamiento como intencionado.** Las seis son
`gap_confirmed`, en cuatro versiones consecutivas.

### 3.2 Avisos de la skill — 17, todos de la misma regla

| Regla | Alcance | vs 1.5.0 | Corrección de |
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

**Y aquí está el efecto más importante de esta versión sobre un aviso viejo.** La lista no
cambia, el número no cambia, y sin embargo `critico_caso_unico` **se agrava**, porque
`verification_path` permite por primera vez mirar dentro del caso único:

| Requisito | Caso único | Qué le pasa a ese caso |
|---|---|---|
| **REQ-046** | TC-064 | **no puede componer su intento** por la vía que declara (A-05-11a) |
| **REQ-011** | TC-015 | ejerce la mitad *vacía*; la mitad *inexistente* no la cubre nadie (A-05-11b) |
| **REQ-027** | TC-036 | ídem, con el vehículo (A-05-11b) |
| **REQ-065** | TC-090 | ídem, con el empleado (A-05-11b) |

**Cuatro de los diecisiete requisitos `critical` de caso único tienen además un caso único
que no ejerce entero su vector.** Hasta hoy la pregunta sobre estos diecisiete era «¿basta
un caso?»; para cuatro de ellos ha dejado de ser esa y es «¿basta *medio* caso?». Ninguna
de las dos la contesta A-05: son criterio de A-11 y trabajo de A-03. Lo que A-05 aporta es
que **ya no son diecisiete iguales**.

Los 17 casos únicos son de prioridad `Critical` y 13 de los 17 son `Negative`. Esa
proporción, que en versiones anteriores se leía como tranquilizadora —para una regla de
protección un caso negativo es la prueba natural—, hay que leerla hoy con un matiz: **los
casos `Negative` son exactamente donde vive el riesgo de que el vector no exista en la
pantalla**, porque son los que intentan lo que el sistema debe impedir. Los cuatro de
arriba son cuatro de esos trece.

### 3.3 A-05-01 · cobertura nominal — sin cambios

| Sub-aviso | Requisitos | Estado en 1.6.0 | Corrección de |
|---|---|---|---|
| A-05-01a | REQ-031 | **CERRADO en 1.5.0**; no se reabre | — |
| **A-05-01b** | REQ-055, REQ-073 | abierto; sigue esperando el evolutivo de Q-14 y Q-15 | A-06 (evolutivo), luego A-03 |

Nada de lo que DOC-05 1.5.0 añade toca a TC-078 ni a TC-103: siguen siendo los dos casos
que se reescriben enteros cuando el evolutivo llegue, y siguen siendo dos de los cuatro
`low` de automatización por ese mismo motivo. Los dos declaran `verification_path: ui`, y
es correcto: lo que les falta no es una vía, es un enunciado que verificar.

**A-05-01a no se reabre, y conviene decirlo porque A-05-11 se le parece.** El caso que
cerró A-05-01a, TC-041, es precisamente **el único `service` del plan**, y lo es por el
mismo criterio que A-05-11 aplica: su vector no existe en la pantalla. TC-041 es el
ejemplo de lo que pasa cuando ese criterio se aplica a tiempo; TC-064, de lo que pasa
cuando no.

### 3.4 A-05-03 · cobertura verde sobre defecto confirmado — 4 requisitos, sin cambio de recuento

Los hechos no han cambiado y A-05 los ha vuelto a verificar sobre el YAML de 1.5.0:

| Bug | Sev. | Requisito | Prio. req | Casos | Vía | Diagnóstico | ¿Algún caso lo detecta? |
|---|---|---|---|---|---|---|---|
| BUG-001 | critical | REQ-035 | critical | TC-048, TC-049 | `ui` | `Correcto` | **No** |
| BUG-002 | critical | REQ-040 | **medium** | TC-055 | `ui` | `Correcto` | **No** |
| BUG-003 | high | REQ-019 | high | TC-025 | `ui` | `Correcto` | **No** |
| BUG-004 | high | REQ-043 | critical | TC-060, TC-061 | `ui` | `Correcto` | **No** |

Sigue siendo un hueco **decidido, registrado y con vigilante** (Q-19, `DOC-23` en
`automation/ui/`, TC-900 en rojo sobre BUG-001), no un hueco por omisión. Dos precisiones
que esta versión sí puede añadir:

1. **Los siete casos de los cuatro defectos son `ui`, y los cuatro defectos se
   reprodujeron por servicio.** A-14 los ejerció contra `localhost:3001` sin pasar por la
   pantalla. No es una contradicción —los casos son correctos contra el AS-IS y la
   política de A-03 prohíbe con razón duplicarlos— pero deja la simetría a la vista: **la
   vía por la que se encontraron los defectos no es la vía por la que se prueban los
   requisitos.**
2. **REQ-046 no entra en este censo, y hay que decir por qué no.** `DOC-09/RS-02` describe
   para REQ-046 una mecánica idéntica a la de BUG-002: la comprobación de
   `factures.js:72-78` resuelve el cliente atravesando el vehículo en el instante de
   emitir, no puede detectar un albarán movido, y la línea siguiente usa ese mismo cliente
   como destinatario. Es materia de A-05-03 por naturaleza. **No entra porque este censo
   se define contra `DOC-24-BUGS.json` y REQ-046 no tiene entrada allí.** Si A-14 la abre,
   serán cinco. Mientras tanto el problema de REQ-046 se reporta donde sí es medible con
   lo que hay hoy: **A-05-11a**.

**Qué necesita saber A-11, y no ha cambiado.** Cuatro requisitos —dos `critical`— tienen
cobertura formal correcta y defecto confirmado en el sistema real: si estos 110 casos se
exportan y se ejecutan, saldrán en verde y los cuatro defectos seguirán ahí.

**Nota de contrato.** No se ha añadido ninguna columna al CSV ni se ha tocado ningún
diagnóstico: las cuatro filas siguen diciendo `Correcto` y S-07 consume exactamente el
mismo formato.

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

| Documento | Entradas de cita protegidas solo por el orden de claves | vs 1.5.0 |
|---|---:|---|
| DOC-05 1.5.0 | 15 | = |
| DOC-06 1.2.0 | 19 | = |
| **Total** | **34** | **=** |

El control sigue limpio, verificado hoy con S-12 en lectura sobre los documentos reales:
`sync --dry-run` sobre DOC-05 devuelve `encontrados 4 · anadidos 0 · ya presentes 4`, y
`validate` sale en **código 0, sin bloqueantes**. **Severidad: aviso**, por la razón de
siempre: es un riesgo de regresión, no un defecto. La corrección preferente sigue siendo
que el extractor de S-12 reconozca una cita por su `owner` y no por dónde esté la clave,
porque **YAML no da significado al orden de las claves** y una convención que pide
respetar una restricción que el formato declara irrelevante se acaba perdiendo.

Un detalle de DOC-05 1.5.0 merece elogio explícito, porque es lo contrario de la deriva
que este documento persigue: al moverse la carpeta de automatización, A-03 **no reescribió**
la `resolution` ya cerrada de Q-19 —que citaba la ruta vieja— sino que anotó la corrección
**al lado**, en `resolution_path_correction`. Reescribir el texto de una decisión
registrada la convierte en otra decisión. Es el mismo criterio que este documento exige
para las anclas, aplicado a las respuestas.

### 3.7 A-05-08 · cobertura condicionada — sin cambios

Las cifras de ejecución son idénticas a las de 1.5.0 y se han vuelto a leer del `--json`
de S-14, no de la prosa: **2 olas**, 107 casos en 67 carriles en la ola 0, **3 casos en la
ola 1** —TC-014, TC-025 y TC-080—, paralelismo máximo 67, carril más largo 17, y **0 de
110 casos sin aislamiento declarado**. El detalle está en §5.4 y la corrección sigue
siendo de **S-06 / DOC-13**, no de A-03.

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

### 3.9 A-05-10 · una superficie de interfaz no documentada — abierto, con un síntoma nuevo

El hallazgo no cambia de naturaleza: **la aplicación no tiene su superficie descrita ni
identificada**, DOC-04 no documenta el literal de ningún mensaje de error, y eso degrada
43 de los 80 casos `medium` a la vez que deja 47 requisitos señalados por una pregunta de
DOC-06 sobre lo que el usuario ve. Sigue siendo **la palanca más rentable del proyecto** y
sigue teniendo dos dueños: **A-02** para los literales y **quien mantenga la aplicación**
—vía A-06 / DOC-08— para los identificadores estables.

**Lo que esta versión añade es un cuarto síntoma, y es el que cierra el argumento.** La
razón de automatización que TC-064 declara es literalmente esta carencia: *«la selección
de albaranes de la emisión es una lista sin identificador estable, y además DOC-04 no
documenta el literal del aviso que el caso espera»*. Es decir: el caso de A-05-11a **ya
estaba degradado por A-05-10 antes de que se supiera que no puede ejecutarse**. Cambiarle
la vía a `service` resolvería A-05-11a y **no** resolvería su grado de automatización,
porque la mitad documental del problema —qué avisa el sistema— no depende de la vía. Son
dos hallazgos distintos sobre el mismo caso y hay que corregir los dos.

### 3.10 Procedencia del registro

El registro pasa de 310 a **311 anclas**: `ACT=1 UC=40 BR=37 REQ=79 TC=110 Q=29 FUN=8
MEJ=6 EVO=1`. **La única nueva es `EVO-001`**, de A-06 en DOC-08, y no toca la matriz.
`validate` sale en **código 0, sin bloqueantes**.

Los 79 `REQ-nnn` y los 110 `TC-nnn` siguen exactamente donde estaban, con el mismo `text`,
el mismo `requirement` y el mismo `external_id`. De las 310 anclas anteriores solo una
cambió, y por la vía correcta: **`Q-18` pasa a `answered`**, con su `resolution` en dos
mitades. `Q-19` recibió una nota de corrección de ruta **junto** a su `resolution`, nunca
dentro. Ninguna de las dos es una deriva de significado y por eso `anchor_conflict` sigue
en **0**, confirmado por S-14 y por la comparación que A-05 hace de `text` contra
`statement` en los 79 requisitos, contra `name`/`requirement`/`external_id` en los 110
casos y contra `question` en las 29 preguntas.

**Un aviso de S-12 que no es de A-05 y que se recoge aquí porque nadie más lo va a ver:**

```
AVISO [sin_texto] EVO-001: ancla sin texto
```

El ancla nueva se registró con `text: null`. No afecta a la matriz ni a la exportación
—`EVO-001` no es un `REQ` ni un `TC`— pero un ancla sin texto es un ancla contra la que no
se puede detectar deriva de significado nunca, que es justo para lo que existe el campo.
**Corrección de A-06**, de una línea.

### 3.11 A-05-11 · vector no alcanzable por la vía de verificación declarada — *nuevo, dos formas*

Este es el hallazgo de esta versión y **no existía la posibilidad de formularlo hasta
hoy**: nace de cruzar el campo `verification_path`, que DOC-05 1.5.0 estrena en los 110
casos, con la matriz. Sin ese campo, la pregunta «¿por qué vía se ejerce este caso?» no
tenía respuesta escrita en ningún sitio y por tanto no se podía contrastar con nada.

**El enunciado, en una frase:**

> Un caso declara una vía de verificación por la que **su vector no se puede componer**,
> entero o a medias. La matriz lo cuenta como cobertura correcta porque hay caso, y lo
> hay; lo que no hay es forma de ejercerlo por donde el caso dice que se ejerce.

#### A-05-11a · `TC-064` no puede componer su intento — **REQ-046**

| | |
|---|---|
| Requisito | **REQ-046** · «El sistema exige que todos los albaranes de una misma factura pertenezcan al mismo cliente.» · `factures`, **`critical`**, ancla `BR-FAC-03` |
| Caso | **TC-064** · `Critical`, `Negative`, **`verification_path: ui`**, y **único caso del requisito** |
| Primer paso | *«Iniciar la emisión de una factura incluyendo el albarán pendiente de 'Garcia Motors SL' y el de 'Tallers Puig SL'»* |
| Problema | **Ese intento no se puede componer en `FacturaForm`** |
| Diagnóstico en el CSV | `Correcto` — y sigue siendo `Correcto`, ver más abajo |
| Origen | `DOC-09-IMPACTO` §RS-01 y §3.2, de A-07 |
| Corrección | **A-03** |

**Verificado por A-05, no citado.** En `client/src/pages/factures/FacturaForm.tsx` la
lista de albaranes se carga con `albaransService.listByClient(Number(clientId),
'pendent')` cuando el usuario elige cliente, y las casillas que se pintan salen de esa
lista. Los albaranes de dos clientes distintos **no pueden aparecer a la vez** en ese
formulario, así que no pueden seleccionarse a la vez. El primer paso de TC-064 describe
una acción que la pantalla no ofrece.

**Por qué esto es peor que A-05-03, y no una variante suya.** La pregunta estaba
explícitamente planteada y la respuesta es que **merece identificador propio**. Las tres
familias de este documento se distinguen por *qué es exactamente lo que falla*:

| Hallazgo | El caso, ¿se ejecuta? | ¿Verifica lo que dice? | Qué significa un `PASS` |
|---|---|---|---|
| **A-05-01a** (cerrado) | Sí | **No** — verificaba otra cosa | verdad sobre el caso, silencio sobre el requisito |
| **A-05-03** | Sí | Sí | verdad sobre el caso, **engaño sobre el sistema** |
| **A-05-11a** | **No, tal como está escrito** | — | **mentira sobre el caso mismo** |

En A-05-03 el caso hace su trabajo y el problema está fuera de él: el defecto vive en una
parte del sistema que el caso no visita. En A-05-11a el problema está **dentro del caso**:
su primer paso no es ejecutable. Y la consecuencia práctica es de otra naturaleza. Un
tester que ejecute TC-064 a mano se encontrará con que no puede seleccionar los dos
albaranes, comprobará que efectivamente no se ha emitido ninguna factura con albaranes de
dos clientes —que es lo que el `expected` pide— y **marcará PASS**. Rally transportará ese
PASS sin matices. Es exactamente el mecanismo que A-05 argumentó en Q-19 para rechazar los
casos-testigo: *verde por omisión es malo; verde por afirmación es peor*. Aquí es verde
sobre un intento que nunca se hizo, que es la tercera variante y la más difícil de
detectar, porque **nada falla**.

**Es también, y esto es lo que lo hace accionable, un caso mal clasificado más que un caso
mal escrito.** La política de A-03 —§4.12 de DOC-05— dice que *un caso va por servicio
solo cuando el vector no existe en la interfaz*. Aplicada a TC-064, esa política manda
`service`. El intento sí se puede componer contra `factures.js`, que es donde vive la
comprobación de `REQ-046` y donde `BUG-002` demostró que se llega. **La política de A-03
resuelve este caso; lo que no lo detectó fue el barrido.**

**Por qué el barrido no lo vio, que es el hallazgo útil para A-03.** El barrido de §4.12 se
concentró en los 31 `Negative` y los 9 `Boundary` —TC-064 es `Negative`, estaba dentro— y
nombró cuatro dudosos. Los cuatro fallan por el **mismo modo**: *un campo no admite el
valor* (un desplegable cerrado, un selector que carga por `fetch`, una referencia que no
se puede teclear). TC-064 falla por **otro modo**:

| Modo | Qué impide el vector | Ejemplo |
|---|---|---|
| **De campo** | El control no admite el valor que el caso quiere introducir | TC-045 (referencia inexistente en un selector que carga por `fetch`) |
| **De composición** | Cada campo admite su valor, pero **la carga de datos del propio formulario** hace imposible la combinación | **TC-064** (`FacturaForm` sólo lista los albaranes de un cliente) |

Un barrido que busca campos no encuentra composiciones. No es un descuido de A-03: es que
el criterio con el que se barrió sólo cubría la mitad del espacio. **La recomendación
concreta es rebarrer los 40 `Negative` y `Boundary` con el segundo modo en la mano**, y
mirar en particular los casos cuyo vector necesita *dos registros a la vez*.

**Severidad: aviso, y se explica por qué no se le fuerza a bloqueante.** La lista de
bloqueantes del contrato cubre lo que rompe el JOIN o la exportación —caso huérfano,
referencia rota, `external_id` duplicado, ID fuera de registro—, y TC-064 no rompe
ninguna de esas cosas: se exporta perfectamente. Inventar una categoría bloqueante nueva
detendría la Fase 3 por algo que no la afecta, y desgastaría la lista hasta hacerla
inútil, que es el mismo argumento con el que A-05-09 se dejó en aviso. **Pero A-05
recomienda corregirlo antes de exportar**, con el precedente exacto a la vista: A-05-01a
se recomendó cerrar antes de exportar, se cerró antes de exportar, y el coste de
sincronización que se habría pagado exportando primero no se pagó.

**Qué NO cambia en el CSV, y es importante.** La fila de REQ-046 sigue diciendo
`test_case_ids: TC-064`, `test_case_count: 1` y `diagnosis: Correcto`. No se le añade
columna, no se le cambia el diagnóstico y no se le inventa un `GAP` que el contrato no
tiene. **La columna `diagnosis` responde a «¿hay caso?», y lo hay.** Que ese caso no pueda
ejercer su vector es información de este documento, no del fichero que consume S-07.

#### A-05-11b · media mitad de un vector de dos — **REQ-011, REQ-027, REQ-065**

| Requisito | Prio. | Caso único | Vía | Mitad que ejerce | Mitad que falta |
|---|---|---|---|---|---|
| **REQ-011** | `critical` | TC-015 | `ui` | cliente **vacío** | cliente **inexistente** |
| **REQ-027** | `critical` | TC-036 | `ui` | vehículo **vacío** | vehículo **inexistente** |
| **REQ-065** | `critical` | TC-090 | `ui` | empleado **vacío** | empleado **inexistente** |

Los tres requisitos hablan de una referencia **existente**; los tres casos comprueban qué
pasa cuando el campo se deja **vacío**. La otra mitad —una referencia a algo que no está—
no se puede componer desde un desplegable y **hoy no la cubre nadie**.

**Esto no lo descubre A-05: lo declara A-03**, en §4.12 de DOC-05 1.5.0, con estas
palabras: *«TC-015, TC-036 y TC-090 son el mismo hueco tres veces […] la mitad que falta
solo se puede ejercer por servicio, y hoy no está cubierta por nadie»*. A-05 lo recoge por
tres razones que A-03 no podía cubrir desde su documento:

1. **Para que quede en el censo de cobertura y no sólo en una tabla de dudosos.** Un
   vector declarado no cubierto dentro del documento que decide qué se prueba es una nota
   metodológica; el mismo vector cruzado con la matriz es un dato de Go/No-Go.
2. **Porque los tres requisitos son `critical` y los tres son de caso único.** A-03 lo
   declaró por caso; visto por requisito, la consecuencia es que **tres de los diecisiete
   `critico_caso_unico` tienen su única prueba a medias** (§3.2).
3. **Porque no es un GAP PLAN y conviene decir exactamente qué es.** GAP PLAN es un
   requisito sin ningún caso. Aquí hay caso, hay fila y el diagnóstico es `Correcto`. Es
   **cobertura parcial de vector**, una categoría que el CSV no distingue y que no se va a
   añadir a él: el contrato de S-07 no se toca por esto.

**Diferencia de gravedad con A-05-11a, que es real y hay que decirla.** TC-015, TC-036 y
TC-090 **se ejecutan y son verdad**: su `PASS` afirma correctamente que el sistema rechaza
el campo vacío. No mienten sobre sí mismos; simplemente cubren menos de lo que el
requisito enuncia. TC-064 sí miente sobre sí mismo. Por eso son dos sub-avisos del mismo
hallazgo y no el mismo: **11b es un hueco, 11a es un espejismo.**

**Corrección: A-03, y no es la misma para los dos.**

| Sub-aviso | Qué hay que hacer | Coste |
|---|---|---|
| **A-05-11a** | Reclasificar TC-064 a `service` y reescribir sus dos pasos contra la comprobación de `factures.js`, o bien dejarlo `ui` y **decir explícitamente qué vector cubre entonces** | un caso |
| **A-05-11b** | Tres casos hermanos nuevos, que **nacen `service`** por la propia política de §4.12 | tres casos |

Ninguna de las dos es de A-05: este documento no es propietario de DOC-05 y no toca ni un
caso. Y ninguna de las dos exige esperar a nadie: **no dependen de un evolutivo, ni de una
respuesta de negocio, ni de una decisión de A-11.** Son de las pocas cosas de todo este
documento que se pueden arreglar hoy.

## 4. La matriz

La matriz completa está en **`docs/DOC-07-MATRIZ.csv`** — 79 filas, una por requisito,
con la cabecera canónica:

```
requirement_id,requirement_statement,module,priority,test_case_ids,test_case_count,exists_in_rally,executed,result,diagnosis
```

**No hay ninguna fila con diagnóstico distinto de `Correcto`**, así que la tabla de
excepciones que normalmente ocuparía esta sección está vacía. Se remite al CSV para el
detalle requisito a requisito. Las filas con reserva en este documento son **veinte**,
cuatro más que en 1.5.0:

| requirement_id | module | priority | test_case_ids | count | diagnosis | Reserva |
|---|---|---|---:|---|---|---|
| REQ-010 | vehicles | critical | TC-013;TC-014 | 2 | Correcto | A-05-08 (TC-014 en ola 1) · ⑤ Q-24 |
| **REQ-011** | vehicles | critical | TC-015 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-019 | peces | high | TC-025 | 1 | Correcto | A-05-08 (toda la cobertura en ola 1) · A-05-03 BUG-003 · ② |
| **REQ-027** | albarans | critical | TC-036 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-028 | albarans | critical | TC-037 | 1 | Correcto | A-05-08b (caso único en el carril de 17) · ① |
| REQ-029 | albarans | high | TC-038;TC-039 | 2 | Correcto | ③ Q-16 |
| REQ-030 | albarans | critical | TC-040 | 1 | Correcto | A-05-08b (caso único en el carril de 17) |
| REQ-031 | albarans | high | TC-041 | 1 | Correcto | A-05-01a **cerrado**; queda ⑤ Q-30. **Único `service` del plan** |
| REQ-032 | albarans | critical | TC-042;TC-043;TC-044 | 3 | Correcto | **sale de ③** al cerrarse Q-18; queda ⑤ |
| REQ-035 | albarans | critical | TC-048;TC-049 | 2 | Correcto | A-05-03 · BUG-001 · ② |
| REQ-036 | albarans | critical | TC-050 | 1 | Correcto | A-05-08b (caso único en el carril de 17) · ② |
| REQ-040 | albarans | medium | TC-055 | 1 | Correcto | A-05-03 · BUG-002 · ② · **DOC-09 §3.1**, ver abajo |
| REQ-043 | factures | critical | TC-060;TC-061 | 2 | Correcto | A-05-03 · BUG-004 · ② · ⑤ Q-24, Q-27 |
| **REQ-046** | factures | critical | TC-064 | 1 | Correcto | **A-05-11a** (el caso no se puede componer) · ② · `critico_caso_unico` |
| REQ-048 | factures | high | TC-067;TC-068 | 2 | Correcto | ③ Q-16 |
| REQ-051 | factures | high | TC-073 | 1 | Correcto | ③ Q-17 |
| REQ-055 | factures | high | TC-078 | 1 | Correcto | A-05-01b · ① · ② |
| REQ-057 | personal | high | TC-080 | 1 | Correcto | A-05-08 (toda la cobertura en ola 1) |
| **REQ-065** | nomines | critical | TC-090 | 1 | Correcto | **A-05-11b** (mitad del vector) · `critico_caso_unico` |
| REQ-073 | nomines | high | TC-103 | 1 | Correcto | A-05-01b · ① · ② |

Las veinte dicen `Correcto` y las veinte tienen reserva. **No es una contradicción, es el
alcance del fichero**: la columna `diagnosis` responde a «¿hay caso?», no a «¿sirve el
caso?», ni a «¿está sano el requisito?», ni a «¿se ha decidido ya qué probar?», ni a
«¿puede ejecutarse ese caso por sí solo?», ni —desde hoy— a «**¿puede ese caso componer su
vector por la vía que declara?**». La columna «Reserva» es de esta tabla y **no existe en
el CSV**: añadirla rompería el contrato que consume S-07.

**REQ-040 merece una respuesta explícita, porque A-07 la ha pedido.** `DOC-09` §3.5 lista
«las filas de REQ-040 y REQ-046, y el estado `Correcto` de REQ-040 con un solo caso
positivo» como algo que A-05 debe revisar. Revisado, y la respuesta es que **la fila de
REQ-040 no cambia y no se convierte en A-05-11**:

- Es cierto que TC-055 es el caso positivo y que no hay caso del lado negativo. Pero **hoy
  no existe un lado negativo que probar**: el enunciado vigente de REQ-040 permite cambiar
  el vehículo de un albarán no facturado sin restricción de cliente, y `TC-055` lo ejerce
  palabra por palabra. El rechazo que A-07 echa en falta **nace con `EVO-001`**, junto con
  el enunciado que lo justifica.
- Por eso su reserva correcta es **②** —hueco confirmado, vivo hasta el evolutivo, ya
  contabilizado desde que Q-10 se respondió `gap_confirmed`— y no A-05-11. La diferencia
  con TC-064 es exacta y vale la pena fijarla: **TC-064 declara una vía por la que su
  vector no se puede componer hoy; TC-055 no tiene todavía ningún vector que componer.**
  El primero es un defecto del plan; el segundo es el plan esperando a que el sistema
  crezca.
- Lo que sí conviene anotar es que, cuando `EVO-001` se implemente, **el caso nuevo de
  REQ-040 nacerá `service`** por la política de §4.12: A-06 ya determinó que AC-002 sólo
  es alcanzable por servicio. Y que hasta entonces la fila de REQ-040 dirá `Correcto`
  aunque la parte que protege el dinero esté sin cubrir. **A-11 debe saberlo**, y es
  exactamente lo que A-07 quería que quedara escrito.

**Qué NO cambia en el CSV respecto de 1.5.0: nada.** Es **byte a byte idéntico** (md5
`087a03779bd36a00d09f9e87943588c0`, sha256 `1676546a…`), por **cuarta vez consecutiva**. Es
la prueba más dura de que el salto de DOC-05 de 1.4.1 a 1.5.0 —110 campos nuevos, una
pregunta cerrada, cuatro rutas corregidas— no ha movido ni un identificador, ni un
`requirement`, ni una prioridad, ni un módulo. No es una afirmación de A-03 que A-05 se
crea; es el resultado de volver a ejecutar el JOIN.

**Y es también, dicho sin adorno, una advertencia sobre esta matriz.** Cuatro versiones de
CSV idéntico y, en la última, cuatro filas cuya lectura cambia. **La estabilidad del
fichero no es evidencia de que nada relevante haya cambiado**: es evidencia de que este
fichero mide una sola cosa —¿hay caso?— y la mide bien. Todo lo demás vive en la prosa de
este documento, y por eso este documento existe.

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
| albarans | 18 | 18 | 0 | 28 | 1,56 | **8** | **6** | **14** | **17** |
| factures | 13 | 13 | 0 | 19 | 1,46 | 10 | 3 | **13** | 13 |
| personal | 7 | 7 | 0 | 8 | 1,14 | 0 | 6 | **6** | 7 |
| nomines | 12 | 12 | 0 | 18 | 1,50 | 7 | 3 | **10** | 12 |
| shell | 4 | 4 | 0 | 5 | 1,25 | 2 | 0 | **2** | 4 |
| configuracio | 1 | 1 | 0 | 1 | 1,00 | 1 | 0 | **1** | 1 |
| **Total** | **79** | **79** | **0** | **110** | **1,39** | **32** | **32** | **64** | **78** |

No hay huecos de cobertura que localizar por módulo. La concentración se mantiene:
**`factures` (10 de 13) y `albarans` (8 de 18) reúnen 18 de los 32 requisitos con algo
pendiente** —el ciclo del dinero, donde además están los cuatro defectos de A-14—. Con
`factures` hay que seguir siendo preciso: sumando el quinto alcance, **los 13 de 13 tienen
algo pendiente**. Es el módulo donde menos se puede decir que esté todo claro y el que
produce dinero.

**El único cambio de esta tabla es de `albarans`**, y es una buena noticia bien medida:
pierde un requisito en ①∪②∪③ —**REQ-032**, que sale al cerrarse Q-18— y lo gana en «⑤
solo». No ha mejorado ni ha empeorado: se ha movido de un tipo de reserva a otro. Ver
§7.1.

### 5.2 Por prioridad del requisito

| Prioridad (DOC-04) | Requisitos | Cubiertos | GAP PLAN | Casos | ①∪②∪③ | ⑤ solo | **Unión** | Defecto confirmado | ui-only | **A-05-11** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| critical | 35 | 35 | 0 | 56 | **10** | **16** | **26** | **2** | **35** | **4** |
| high | 27 | 27 | 0 | 35 | 14 | 8 | **22** | 1 | 26 | 0 |
| medium | 15 | 15 | 0 | 17 | 6 | 8 | **14** | **1** | 15 | 0 |
| low | 2 | 2 | 0 | 2 | 2 | 0 | **2** | 0 | 2 | 0 |

Diez de los 35 `critical` (29 %) y catorce de los 27 `high` (52 %) tienen algo pendiente
en los tres alcances clásicos. El quinto alcance golpea distinto: **16 de los 35
`critical` entran en él y en ningún otro**, lo que los lleva a 26 de 35 (74 %).

**La columna nueva es la última, y es la que hay que mirar: los cuatro requisitos de
A-05-11 son los cuatro `critical`.** No hay ninguno `high`, ninguno `medium` y ninguno
`low`. No es casualidad ni mala suerte: los requisitos `critical` son los que enuncian
reglas de protección, las reglas de protección se prueban con casos `Negative`, y un caso
`Negative` es precisamente el que intenta hacer lo que el sistema impide —que es donde un
vector puede no existir en la pantalla, porque a menudo la pantalla lo impide antes—.
**El riesgo de A-05-11 se concentra estructuralmente en lo más importante del plan**, y
esa es la frase que A-11 debería llevarse de este apartado.

### 5.3 Por prioridad y por tipo del caso

| Prioridad (DOC-05) | Casos | vs 1.5.0 |
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

| | Valor | vs 1.5.0 |
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

**A-05-08b**, sin cambios: tres de los 17 `critical` de caso único —**REQ-028 (TC-037),
REQ-030 (TC-040) y REQ-036 (TC-050)**— tienen su única prueba dentro del carril serial de
17 casos, que es donde un fallo temprano deja sin ejecutar todo lo que viene detrás.

**Corrección:** de **S-06 / DOC-13**, no de A-03. Coste: tres datos de prueba.

### 5.5 Grados de automatización — contexto, no cobertura

| Grado | Casos | Qué significa |
|---|---:|---|
| `high` | 25 | Actúan sobre campos de `EntityForm`, que llevan `id={field.name}` y son estables |
| `medium` | **80** | Automatizables con mantenimiento previsible |
| `low` | 4 | TC-078, TC-103, TC-108, TC-110 |
| `not-recommended` | 1 | TC-109 |
| **`blocked: true`** | **0** | **nadie ha prohibido automatizar ningún caso** |

**Estas cifras no entran en la matriz y no deben entrar.** El grado de automatización no
mide cobertura: un caso `medium` cubre su requisito exactamente igual que uno `high`. Se
recogen porque `blocked: 0` es el dato que S-10 necesita y porque **el reparto tiene una
causa medida** (A-05-10, §3.9).

**Lo que cambia esta versión es a quién apunta cada grado.** Con `verification_path`
declarado, el reparto deja de ser una lista para S-10 y pasa a ser un reparto entre dos
automatizadores: **109 casos son de `S-10`** (Selenium + Cucumber, `automation/ui/`) y
**uno, TC-041, es de `S-17`** (Postman, `automation/api/`). Si A-05-11 se corrigiera
entero, ese reparto pasaría a 105/5 —TC-064 reclasificado y tres casos hermanos nuevos—.
No es una previsión: es la consecuencia aritmética de aplicar la política de §4.12 a los
cuatro requisitos del §3.11.

### 5.6 Por vía de verificación — **nuevo**

DOC-05 1.5.0 declara `verification_path` en los 110 casos. A-05 lo ha contado sobre el
YAML y coincide con lo que DOC-05 declara en su front-matter: **109 `ui`, 1 `service`, 0
`mixed`, 0 sin declarar.**

Llevado a la matriz, requisito a requisito:

| | Requisitos | % |
|---|---:|---:|
| Cobertura enteramente por interfaz (`ui`) | **78** | 98,7 % |
| Cobertura con algún caso por servicio | **1** (REQ-031) | 1,3 % |
| Cobertura mixta (casos por las dos vías) | 0 | 0 % |
| **`critical` con cobertura enteramente por interfaz** | **35 de 35** | **100 %** |

**Cómo NO hay que leer este 98,7 %.** No es un hueco de cobertura y no se presenta como
tal. La política de A-03 —*un caso va por servicio sólo cuando el vector no existe en la
interfaz*— es deliberadamente restrictiva y **A-05 la respalda sin reservas**: duplicar
cada validación por las dos vías multiplicaría la suite por dos para comprobar dos veces
la misma regla, y la segunda copia se rompería con cada cambio del servidor sin aportar
cobertura nueva. Que 109 casos sean `ui` significa que 109 vectores existen en la
pantalla, y eso es exactamente lo que debe pasar.

**Cómo sí hay que leerlo.** El dato que importa no es cuántos requisitos son `ui-only`,
sino **la intersección entre «toda su cobertura es `ui`» y «su vector no se puede componer
por `ui`»**. Hoy esa intersección tiene **cuatro requisitos**, los cuatro `critical`:
REQ-046 entero y REQ-011, REQ-027 y REQ-065 a medias. Son A-05-11 y están en §3.11.

**Y aquí está el límite honesto de esta medición, que hay que declarar porque nadie más lo
va a hacer.** `verification_path` dice **por qué vía se declara** que se ejerce un caso.
**No dice si el vector existe en esa vía.** Es un campo declarativo, no verificado: nada
en el contrato, ni en S-14, ni en este documento puede comprobar automáticamente que el
vector de TC-064 se pueda componer en `FacturaForm`. Eso lo comprobó A-07 leyendo código,
y A-05 lo ha repetido leyendo el mismo código. En consecuencia:

- Los cuatro requisitos de A-05-11 son **los que se han encontrado**, no necesariamente
  todos los que hay.
- El espacio donde pueden esconderse más está acotado y es pequeño: los **31 `Negative` y
  9 `Boundary`** son los casos que intentan lo que el sistema impide y por tanto los
  únicos donde un vector puede no existir en la pantalla. A-03 barrió esos 40 y nombró
  cuatro dudosos; A-07 encontró un quinto que el barrido no vio, y §3.11 explica por qué
  no lo vio.
- **Los 70 casos restantes son `Functional` o `Integration`**: describen lo que el sistema
  sí debe permitir, y si su vector no existiera en la pantalla el caso fallaría de forma
  ruidosa y visible el primer día. No son el riesgo.

**La ceguera doble de REQ-046**, en los términos en que A-07 la enuncia y A-05 la
confirma: el sistema no detecta el albarán movido —la comprobación resuelve el cliente
atravesando el vehículo en el instante de emitir— **y** el plan no lo ejerce por la vía
que declara. Ni la máquina ni la prueba. Es el único requisito del proyecto del que hoy se
puede decir eso, y es `critical`.

## 6. Narrativa de riesgos

**Aún no hay datos de ejecución del plan de pruebas.** Esta sección es propia de la
pasada `post` y no puede escribirse ahora: no existen `DOC-19-RALLY-TESTCASES.csv` ni
`DOC-20-RALLY-STATE.json`, es decir, los 110 casos no se han exportado a Rally, no se han
ejecutado y no tienen resultado. Cualquier afirmación sobre qué diría una ejecución sería
especulación, no trazabilidad.

**Tres tentaciones distintas, y ninguna llena este hueco.** A-14 ejecutó la *aplicación*,
no el plan: sus cuatro bugs son evidencia sobre el *sistema*, no sobre los *casos*. A-07
analizó el *impacto* de un evolutivo leyendo *código*: por eso puede decir que TC-064 no
se puede componer, y por eso mismo **no** puede decir qué habría pasado al ejecutarlo. Y
el plan de ejecución del §5.4 dice en qué **orden** podrían ejecutarse los casos, no que
se hayan ejecutado: una ola no es una corrida. Confundir cualquiera de las tres con una
ejecución sería el mismo error que escribir «No» donde toca `n/d`.

Lo que sí puede afirmarse hoy, y sólo esto:

- el plan no deja ningún requisito sin caso definido, ni ningún requisito crítico sin un
  caso crítico;
- no hay ningún caso del que se sepa que **verifica algo distinto** de lo que su requisito
  enuncia: el único que hubo, TC-041, se cerró en 1.5.0;
- **hay un caso del que se sabe que no puede ejecutarse tal como está escrito** —TC-064,
  `Critical`, único caso de un requisito `critical`— y **tres que sólo ejercen la mitad de
  su vector** (A-05-11);
- hay cuatro requisitos donde una ejecución verde no significará ausencia de defecto
  (A-05-03), y esa es hoy una decisión registrada con vigilante, no una omisión;
- hay cinco requisitos sobre los que todavía no se ha decidido qué se quiere probar (③),
  la mitad que en 1.5.0;
- hay dos requisitos `high` cuya única evidencia no se puede producir por sí sola
  (A-05-08).

**Una advertencia concreta para cuando esta sección sí se escriba**, porque es la única
predicción que este documento se permite y no es una especulación sino una consecuencia
del método: en la pasada `post`, **TC-064 aparecerá muy probablemente como `PASS`**. No
porque el sistema haya rechazado nada, sino porque quien lo ejecute no podrá formular el
intento y observará —correctamente— que no se ha emitido ninguna factura con albaranes de
dos clientes. Ese `PASS` viajará a la matriz, se contará como evidencia de REQ-046 y no lo
será. **Si A-05-11a no se corrige antes de exportar, la pasada `post` no podrá detectarlo:
la única oportunidad de cazarlo es ahora, en `pre`, y por eso está escrito aquí.**

El riesgo abierto sigue siendo de las dos etapas siguientes: que los casos se exporten
íntegros —donde aparecerán los `GAP EXPORT` si los hay— y que se ejecuten. Cuando exista
DOC-20, A-05 se ejecutará de nuevo, rellenará las tres columnas hoy en `n/d` y esta
sección se escribirá con datos.

## 7. Preguntas abiertas

### 7.1 El alcance recalculado: ③ baja a la mitad y la unión total no se mueve

Es el dato que A-11 usa para el Go/No-Go. A-05 lo ha recalculado desde los bloques YAML de
los tres documentos —`open_questions` de DOC-04 vía `status` y `affects_requirements`,
`open_questions.questions` de DOC-05 vía `affects_requirements` y `affects_cases`, y
`open_questions.questions` de DOC-06 vía `affects_requirements`— sin leer ninguna tabla de
prosa.

| | Preguntas | Requisitos | Casos | Quién debe actuar | vs 1.5.0 |
|---|---:|---:|---:|---|---|
| **① Esperan respuesta de negocio** (DOC-04, `open`) | 9 | 16 (20,3 %) | 21 | negocio → A-02 | = |
| **② Hueco confirmado, vivo hasta el evolutivo** (DOC-04, `answered` + `gap_confirmed`) | 6 | 16 (20,3 %) | 23 | A-06 → DOC-08 | = |
| **③ Decisión de método sin tomar** (DOC-05, propias y `open`) | **2** | **5** (6,3 %) | **3** | A-01 y A-03 | **−1 pregunta, −5 req, −5 casos** |
| **④ Validados como intencionados** (`as_designed`) | 0 | 0 | 0 | nadie | = |
| **⑤ No consta qué ve el usuario** (DOC-06, propias y `open`) | 11 | 47 (59,5 %) | — | **A-02**, no A-04 | = |
| **Unión ①∪②∪③** | 17 | **32** (40,5 %) | **44** (40,0 %) | — | **−1 req, −1 caso** |
| **Unión de los cuatro alcances vivos** | 28 | **64** (81,0 %) | — | — | **=** |

**Lo que ha bajado, y esta vez sí mueve la unión.** ③ pierde una pregunta —**Q-18 está
respondida**, en dos mitades y por dos dueños distintos— y con ella cinco requisitos
(REQ-019, REQ-022, REQ-032, REQ-034, REQ-036) y cinco casos. Cuatro de esos cinco
requisitos ya estaban en ① o en ②, así que se quedan. **El quinto, REQ-032, sale de la
unión ①∪②∪③, que pasa de 33 a 32**; con él sale **TC-043**, y los casos pasan de 45 a 44.

Es la primera vez en cuatro versiones que esa unión se mueve, y conviene decir exactamente
cuánto vale el movimiento: **un requisito**. En 1.5.0, cerrar Q-19 no movió la unión ni un
punto porque sus cuatro requisitos ya estaban dentro; cerrar Q-18 la mueve en uno. Es una
buena noticia pequeña y medida, que es la única clase de buena noticia que este documento
publica.

**Y la unión total no se mueve: sigue en 64 (81,0 %).** REQ-032 no sale del cuadro, se
cambia de casilla: sigue alcanzado por una pregunta de DOC-06 sobre qué ve el usuario, así
que pasa de «①∪②∪③» a «⑤ solo». El requisito no ha mejorado; ha cambiado de tipo de
reserva, de una que impide decidir qué probar a una que impide describir la pantalla.
Publicar sólo la unión total lo habría ocultado; publicar sólo ③ lo habría exagerado.

**Cómo se ha cerrado Q-18 merece una nota, porque es el mejor cierre de pregunta de este
proyecto hasta hoy.** Se ha respondido en dos mitades con dueños distintos y declarados:
la **factual** —¿existe una vía distinta de la interfaz?— cerrada con una **reproducción
ejecutada** por A-14 y corroborada por A-15, no con un juicio; y la de **política** —¿qué
se hace con eso?— firmada por A-03, que es quien tiene autoridad para decidir método y
sólo método. Separar las dos mitades es lo que impide que una decisión de método se
disfrace de hecho o al revés. A-05 lo recoge como precedente, no como observación de paso.

**Cómo leer cada cifra, en una línea:**

- **①** mide cuánto trabajo documental depende del negocio. No se ha movido en cuatro
  versiones.
- **②** mide cuánto del sistema descrito tiene un hueco vivo, decidido pero no construido.
  No se moverá hasta que A-06 publique DOC-08 y alguien lo implemente.
- **③** es la única que se puede reducir sin esperar a un tercero, y **se ha vuelto a
  reducir**: de tres preguntas a dos, y a la mitad de requisitos.
- **④ sigue valiendo cero**, y es la única que mediría una reducción real del riesgo. Ni
  un solo requisito ha quedado validado como intencionado en cinco versiones consecutivas.
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
el defecto que A-14 califica de peor**, y hoy se puede añadir algo: Q-10 es también el que
alcanza a los dos requisitos que A-07 analiza y uno de ellos, REQ-046, es el de A-05-11a.
Coste y gravedad no van juntos.

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

1. **La tercera arista es la evidencia de A-05-11a.** `factures-pages → albarans-service`
   es exactamente la llamada que hace que `FacturaForm` liste los albaranes de un solo
   cliente, y por tanto la que explica por qué TC-064 no puede componer su intento. El
   hallazgo principal de esta versión de DOC-07 se apoya en una arista que el grafo del
   proyecto no tiene. Si estuviera, la pregunta «¿de qué depende la pantalla de emisión?»
   se contestaría consultando, no leyendo código.
2. **Afecta a quien calcule impacto, que es el consumidor natural del grafo.** A-07 hizo
   el cierre transitivo **a mano sobre 58 aristas** porque `DOC-21-GRAPH.json` no existe, y
   lo hizo sobre un grafo que él mismo sabe incompleto. Cualquier cálculo de impacto futuro
   heredará las tres ausencias mientras no se corrijan.
3. **Porque toca directamente a la pregunta 8 de este apartado.** Si DOC-07 va a
   convertirse algún día en una vista de `DOC-21-GRAPH.json`, importa mucho de qué se
   construya ese grafo. **Un grafo derivado hoy de DOC-02 nacería con tres aristas menos, y
   una de ellas es la que sostiene el hallazgo principal de esta versión.** No es un
   argumento contra el grafo: es un argumento a favor de arreglar DOC-02 **antes** de
   generarlo.

El grafo modela `<modulo>-pages → <modulo>-service` como si cada módulo hablara sólo con el
suyo, y en el código las páginas de albaranes llaman a tres servicios y las de facturas a
tres. **Corrección de S-01**, independiente de `EVO-001`.

### 7.3 Preguntas propiamente abiertas

1. **¿Se corrige `TC-064` antes de exportar?** Es la pregunta nueva de esta versión y la
   única con fecha de caducidad: **se puede contestar ahora o no se podrá contestar
   nunca**, porque en la pasada `post` TC-064 dará `PASS` y ese `PASS` será indistinguible
   de uno legítimo (§6). Cuesta **un caso**: reclasificarlo a `service` —que es lo que
   manda la propia política de A-03— y reescribir sus dos pasos contra la comprobación de
   `factures.js`. Corrección de **A-03**; decisión de exportar o no con él, de **A-11**.
   A-05 recomienda corregir antes de exportar, con el precedente de A-05-01a a la vista.
2. **¿Se escriben los tres casos hermanos de A-05-11b?** REQ-011, REQ-027 y REQ-065 son
   `critical` y de caso único, y ese caso único cubre la mitad de su vector. Cuesta **tres
   casos**, que **nacen `service`** por la política de §4.12. Corrección de **A-03**. No
   depende de ningún evolutivo ni de ninguna respuesta de negocio: es de lo poco de este
   documento que se puede arreglar hoy.
3. **¿Se rebarren los 40 casos `Negative` y `Boundary` con el segundo modo de fallo?** El
   barrido de §4.12 buscó vectores que **un campo** no admite; TC-064 falla porque **una
   composición** no se puede formar (§3.11). Es la pregunta de método que se deriva de las
   dos anteriores, y contestarla es lo que evita que aparezca un sexto caso dentro de tres
   versiones. Corrección de **A-03**.
4. **¿Se exportan a Rally los casos que cuelgan de requisitos con algo pendiente?** Son
   **44 de los 110 (40,0 %)** bajo el criterio ①∪②∪③, uno menos que en 1.5.0. Los 21 del
   grupo ① pueden ver cambiar su enunciado; los 23 del ② tendrán que revisarse cuando el
   evolutivo se construya; los 3 del ③ dependen de una decisión nuestra. Decisión de
   **A-11**.
5. **¿Se exporta el plan sabiendo que no puede detectar los cuatro defectos ya
   confirmados?** A-05 no recomienda retrasar la exportación por esto —los casos son
   correctos contra el AS-IS— pero sí que el Go/No-Go **no interprete el verde de esas
   cuatro filas como ausencia de defecto**. La decisión está tomada y registrada (Q-19); lo
   que queda es que A-11 la lea.
6. **¿Se corrige la cobertura condicionada de REQ-019 y REQ-057 antes de exportar, o se
   acepta?** Cuesta tres datos de prueba y es de **S-06 / DOC-13**. A-05 recomienda
   corregirlo antes de la primera ejecución, no antes de la exportación: no afecta a lo que
   S-07 sube, afecta a lo que I-01 leerá después.
7. **¿Quién documenta los literales de los mensajes de error?** Sigue siendo la palanca más
   rentable del proyecto (§3.9): movería 43 de los 80 `medium` y respondería de raíz Q-25,
   la mayor del censo. Corrección de **A-02**, o decisión explícita de no documentarlos.
8. **¿Se endurece el extractor de S-12 para que no dependa del orden de las claves?** La
   exposición sigue en **34 entradas repartidas entre dos documentos** (§3.6). Mientras la
   convención sólo la sostenga un comentario, el modo de fallo sigue disponible. Corrección
   de **S-12**.
9. **¿Se concede formalmente `Q-30`?** Un comando de S-12 y, si el número concedido fuera
   otro, una renumeración de una sola pregunta por parte de **A-04** (§3.8).
10. **¿Basta un solo caso para los 17 requisitos críticos de `critico_caso_unico`?** La
    pregunta cambia de forma esta versión y ya no es una sola: para trece de ellos sigue
    siendo «¿basta un caso?»; para **cuatro —REQ-011, REQ-027, REQ-046 y REQ-065— la
    pregunta es si basta medio caso**, y la respuesta parece más fácil (§3.2). Criterio de
    **A-11**, trabajo de **A-03**.
11. **¿Se corrige el grafo de DOC-02 antes de que alguien lo convierta en
    `DOC-21-GRAPH.json`?** Tres aristas, verificadas en código por A-07, y una de ellas
    sostiene el hallazgo principal de esta versión (§7.2). Corrección de **S-01**.
12. **¿Se mantendrá este documento cuando exista `DOC-21-GRAPH.json`?** Si el proyecto
    llega a tener el grafo de S-08, DOC-07 deja de ser un artefacto que mantener y pasa a
    ser una **vista del grafo**: un artefacto menos. Hoy no existe, así que se mantiene.
    Esta versión da un argumento a favor y uno en contra, y los dos son nuevos.
    **A favor:** las preguntas «¿qué requisitos toca Q-25?», «¿en qué ola cae el único caso
    de REQ-019?» y «¿qué componentes toca `factures-pages`?» son la misma consulta sobre
    aristas, y hoy hacen falta tres parsers, dos skills y un agente leyendo código para
    contestarlas. **En contra, y es el que pesa más hoy:** el hallazgo principal de esta
    versión —A-05-11a— **no es una consulta sobre aristas**. Se ha encontrado porque un
    agente leyó `FacturaForm.tsx` y comparó lo que hace con lo que un caso declara. Un
    grafo habría dado la arista `factures-pages → albarans-service` —si estuviera, que no
    está— pero no la conclusión de que un caso `Critical` no puede ejecutarse. **Lo que
    queda como artefacto propio de A-05 es cada vez más sólo la interpretación**, y esta
    versión, cuarta consecutiva con el CSV idéntico y la primera con un hallazgo que ningún
    JOIN podía producir, lo enseña mejor que ninguna.
