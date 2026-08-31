---
doc_id: DOC-07
doc_name: DOC-07-TRAZABILIDAD
version: 1.13.0
status: draft
generator: A-05 coherencia y trazabilidad
generated_at: 2026-08-31T19:00:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: spec-08-factura-rectificativa
  commit_sha: 4495e0135385f762af9fcc06e595ba971f1d6332
  working_tree_clean: false   # sin versionar y ajeno a este documento: ApuntsAgentsISkills.txt, bash.exe.stackdump, dashboard/, promptDashboard.txt, docs/DOC-09-IMPACTO-factura-rectificativa.md (nuevo, de A-07, sin comprometer). El resto del árbol versionado está limpio; este documento y su -HIST en edición; docs/DOC-07-MATRIZ.csv modificado por S-14 en esta misma sesión.
inputs:
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.10.0
    hash: sha256:a050cca8974802655ff15515c99cde729d7c976d866a9622f30f689398745f32
  - id: registro-ids.json
    from: S-12
    version: 1.7.0   # convención propia de A-05 para vigilar este fichero de datos, que no lleva semver de contenido; ver «Procedencia»
    hash: sha256:529dd2de5fdb0ef45f7853b7500043592828fc468d67db5ad19100b5cece6715
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    version: 1.4.1
    hash: sha256:c48e7fa2c8977382a7267cb0e511fd68e5667f386946883282720b2f48fb301b
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 2.1.0
    hash: sha256:894b67deddc0eb3e9c687dc16aba472c9c771abe09bd3effffa114dcb0e85a8d
  - id: DOC-09-IMPACTO-factura-rectificativa.md
    from: A-07
    version: 1.0.0
    hash: sha256:b5645095e62ee66ce042141c5c67f5cedd10424514f3324e06c0cb7d06f66ee7
  - id: DOC-14-INFORME-EXPLORADOR-QA.md
    from: A-10
    version: 2.1.1
    hash: sha256:a2cab059f14b636d17e64de995afa6f95463d168c22651ddc26cea6fe62f6c4c
  - id: DOC-23-INFORME-EJECUCION-TCS-UI.md
    from: S-10
    version: 2.2.0
    hash: sha256:75e80c36d754eaeb771b2adccc039c93f0824699a7def8301445b3be7adbfd04
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.1.2
    hash: sha256:d62b236309a76e6e01b7f4fcf7962e8553ef70bbd569ac499da7c069f340f84b
  - id: DOC-27-INFORME-EJECUCION-TCS-API.md
    from: S-17
    version: 1.1.0
    hash: sha256:66cb2e295b98c46e242d24ed7837df46f8a4ad130e4275f2cbee9439d0dc8d72
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
requisitos cubiertos, 0 GAP PLAN).** Los **132 casos** de DOC-05 1.10.0 se reparten sobre
los **81 requisitos** de DOC-04 1.3.2. No hay ningún requisito sin prueba, ningún caso
huérfano, ninguna referencia rota y **ninguna anomalía bloqueante**: nada de lo comprobado
aquí impide avanzar a la Fase 3.

**Qué dispara esta versión.** DOC-05 subió de 1.8.0 a 1.10.0 en dos revisiones
post-implementación de A-03, una por cada spec cerrado desde la última regeneración:

- **`SPE-07-importes-negativos`** (`Origen: BUG-003`, `Implemented` 2026-08-30) añade
  **TC-120 a TC-126** (7 casos) sobre requisitos que ya existían: `REQ-019` (+3),
  `REQ-022` (+1), `REQ-034` (+1) y `REQ-036` (+2).
- **`SPE-08-factura-rectificativa`** (`Origen: BUG-004`, `Implemented` 2026-08-31) añade
  **TC-127 a TC-132** (6 casos), también sobre requisitos existentes: `REQ-047` (+4),
  `REQ-042` (+1) y `REQ-052` (+1).

**Ningún requisito nuevo entra en DOC-04 por estas dos revisiones**: los 81 son los mismos
que en la versión anterior de este documento. DOC-04 sí se movió, de 1.3.1 a 1.3.2, pero es
un PATCH de metadatos de seguimiento (corrección de atribución de bug y de referencias
muertas en `Q-02`, `Q-06` y `Q-12`) verificado byte a byte idéntico en su bloque
`requirements`; no toca el JOIN.

**Precisión sobre el disparo de esta tarea, verificada contra el YAML y no asumida.** El
encargo que abre este ciclo cita ocho requisitos como destino de los casos nuevos —incluye
`REQ-035` y excluye `REQ-052`—. Leído el campo `requirement` de los 13 casos nuevos
directamente en `docs/DOC-05-PLAN-PRUEBAS.md`, el reparto real es el de arriba: **`REQ-035`
no recibe ningún caso nuevo** (sigue con `TC-048;TC-049`, sin cambios) y **`REQ-052` sí
recibe uno** (`TC-127` cuelga de `REQ-047`, no de `REQ-043` como también podría suponerse
por `DOC-24`; ver §3.4). Se declara aquí porque este documento no da por buena la
descripción de su propio disparador sin comprobarla — es el mismo criterio con el que
versiones anteriores prefirieron el repositorio a la nota del prompt que las abría.

## 2. Qué pasada se ha ejecutado y por qué

**Se ha ejecutado únicamente la pasada `pre`.** No existen `docs/DOC-19-RALLY-TESTCASES.csv`
ni `docs/DOC-20-RALLY-STATE.json`; las columnas `exists_in_rally`, `executed` y `result`
valen `n/d` en las 81 filas del CSV, nunca «No» —eso afirmaría un hecho que nadie ha
medido—, y los únicos diagnósticos posibles son `Correcto` y `GAP PLAN`. Verificado: 0
ocurrencias de la cadena `GAP EXPORT` en `docs/DOC-07-MATRIZ.csv`.

| Entrada | Estado | Consecuencia |
|---|---|---|
| `docs/DOC-04-FUNCIONAL.md` | v1.3.2 | **alimenta el JOIN**; bloque `requirements` idéntico byte a byte al de 1.3.1 (verificado) |
| `docs/DOC-05-PLAN-PRUEBAS.md` | v1.10.0 | **alimenta el JOIN**: +13 casos sobre 7 requisitos existentes |
| `registro-ids.json` | hash actualizado — 81 REQ, 132 TC, 32 Q, 41 UC, 43 BR | verificación de anclas: 0 fuera de registro |
| `docs/DOC-06-MANUAL-USUARIO.md` | v1.4.1 | no alimenta el JOIN; cierra la colisión de `Q-30` (§3.8) |
| `docs/DOC-09-IMPACTO-albara-canvi-client.md` | v2.1.0, sin cambios desde 1.12.0 | no alimenta el JOIN |
| `docs/DOC-09-IMPACTO-factura-rectificativa.md` | v1.0.0, nuevo | no alimenta el JOIN; declara como entrada un DOC-05 **1.8.0** ya superado — no es corrección de A-05 (§ Procedencia) |
| `docs/DOC-14-INFORME-EXPLORADOR-QA.md` | v2.1.1, resello de procedencia sin exploración nueva | no alimenta el JOIN |
| `docs/DOC-23-INFORME-EJECUCION-TCS-UI.md` | v2.2.0, sin cambios desde 1.12.0 | no alimenta el JOIN; no cubre los 13 casos nuevos (§5.5) |
| `docs/DOC-24-BUGS.json` | v1.1.2 — **los 4 bugs censados constan `fixed`** | no alimenta el JOIN; alimenta §3.4 |
| `docs/DOC-27-INFORME-EJECUCION-TCS-API.md` | v1.1.0, sin cambios desde 1.12.0 | no alimenta el JOIN; no cubre los 13 casos nuevos (§5.5) |
| `docs/DOC-19-RALLY-TESTCASES.csv` | **ausente** | no hay exportación a Rally que comprobar |
| `docs/DOC-20-RALLY-STATE.json` | **ausente** | no hay estado de ejecución que leer |

### Método

La matriz la calcula **S-14 · Matriz de trazabilidad**:

```
node scripts/matriz.js --doc04 docs/DOC-04-FUNCIONAL.md --doc05 docs/DOC-05-PLAN-PRUEBAS.md \
                       --registro registro-ids.json --out docs/ --json
```

Código de salida **0**. Extrae el bloque `yaml requirements` de DOC-04 y los nueve bloques
`yaml testcases` de DOC-05, cruza `requirement` de cada caso contra `id` de cada requisito y
escribe `docs/DOC-07-MATRIZ.csv`. No se ha leído prosa para construir ninguna fila. Del mismo
`--json` salen `summary`, `blocking`, `warnings`, `execution` y `automation`, sin
reinterpretación. La deriva de significado se pide a `S-12 · Gobierno de identificadores` en
modo `validate`:

```
node scripts/registry.js validate registro-ids.json --doc docs/DOC-04-FUNCIONAL.md --block requirements
node scripts/registry.js validate registro-ids.json --doc docs/DOC-05-PLAN-PRUEBAS.md --block testcases
```

Las dos salen en **código 0, sin bloqueantes** (`REQ`: 0 faltan, 0 huérfanas; `TC`: 0 faltan,
0 huérfanas; único aviso, `EVO-001` sin `text`, ajeno a este ciclo).

Lo que A-05 calcula por su cuenta, siempre sobre bloques YAML —nunca sobre prosa ni sobre
resúmenes de otro documento—: el censo de `Q-nnn` de los tres documentos y sus
`affects_requirements`/`affects_cases` (§7.1), el reparto real de `verification_path`
(§5.6) y las verificaciones de código que sostienen los hallazgos que afirman que un vector
no se puede componer (§3).

### Procedencia

**`DOC-09-IMPACTO-factura-rectificativa.md` 1.0.0 declara en su propio `inputs` un DOC-05
en versión 1.8.0**, ya superada por la 1.10.0 que este documento consume. No es un error que
A-05 deba corregir: es la entrada de A-07, no la de A-05, y el desfase es del propio A-07 al
haber analizado el impacto de SPE-08 contra el estado del plan justo antes de que A-03 lo
revisara. Se declara aquí para que quede escrito y no se lea como una inconsistencia sin
explicar.

**`DOC-05` 1.10.0 declaraba a su vez, en su ciclo de revisión, que `DOC-24-BUGS.json` v1.1.1
seguía marcando `BUG-004` como `open`** pese a que `SPE-08` ya lo corregía —lo dice su propio
`staleness_note`, verificado leyendo `server/routes/factures.js`—. Esa nota de A-03 ya no
describe el estado del árbol: `DOC-24` subió a **1.1.2** el mismo 2026-08-31 («Actualización
manual, a petición del propietario del proyecto») y marca `BUG-004` `fixed`, con
`fixed_commit` apuntando a los cuatro commits de `SPE-08`. A-05 lo confirma leyendo el
fichero vigente, no la nota de DOC-05: hoy los cuatro bugs censados en `DOC-24` constan
`fixed` (§3.4).

**`registro-ids.json` no lleva versión semántica de contenido** (su campo `version` interno
es `1`, un número de esquema). Se declara con una convención propia de A-05, incrementada
cada vez que el conjunto de anclas cambia de forma relevante para este documento: pasa de
**1.6.0** (81 REQ, 119 TC, 30 Q) a **1.7.0** (81 REQ, **132** TC, **32** Q, 41 UC, 43 BR). El
salto de `UC`/`BR` no lo gobierna A-05 —vienen de `DOC-01`/`DOC-02`, regenerados 1.2.0→1.3.0
por el mismo par de specs— y no afecta al JOIN, que solo cruza `REQ` y `TC`.

## 3. Anomalías

### 3.0 El censo de avisos, enumerado

Este documento declara **29 avisos**: **15** de la regla `critico_caso_unico` de S-14
(§3.2) y **14 hallazgos propios de A-05** abiertos. Eran 17 + 15 = 32 en la versión anterior.
El descenso no es una limpieza cosmética: son cierres y estrechamientos verificados en esta
misma pasada, no arrastrados de una prosa anterior.

| Hallazgo | Qué dice | Estado | Corrección de |
|---|---|---|---|
| A-05-01b | REQ-055 y REQ-073 no tienen consecuencia observable que verificar | abierto, sin cambios | A-02 (evolutivo pendiente) |
| **A-05-03** | Cobertura verde sobre defecto confirmado | **el defecto vivo ya no existe en ninguno de los 4 casos originales; queda un residuo documental, ver §3.4** | A-02 / A-14 |
| A-05-03b | TC-073 y TC-075 anuncian el IVA en su nombre y no lo comprueban | abierto, sin cambios | A-03 |
| **A-05-04** | Una regla afirmada que nunca llegó a ser requisito | **abierto, con un segundo ejemplo nacido de SPE-08** | A-02 |
| A-05-06 | El censo de `Q-nnn` depende del orden de las claves | abierto, exposición sin cambios: 34 | S-12 |
| A-05-08 | Dos requisitos `high` con toda su evidencia en la ola 1 | abierto, sin cambios | S-06 / DOC-13 |
| **A-05-08b** | `critical` de caso único dentro del carril serial | **de 3 a 2**: REQ-036 deja de ser caso único | S-06 / DOC-13 |
| ~~A-05-09~~ | `Q-30`/colisión de identificador en DOC-06 | **CERRADO** (§3.8) | — |
| A-05-10 | Una superficie de interfaz no documentada | abierto, sin cambios | A-02 + mantenedor |
| **A-05-11b** | Media mitad de un vector de dos | **de 3 a 2 requisitos**: REQ-027 se cierra (§3.11) | A-03 |
| A-05-11c | Tres casos declaran `ui` sobre una interfaz que no ofrece su vector | abierto, sin cambios | A-03 (vía) + producto (funcionalidad) |
| ~~A-05-12~~ | El resumen de `verification_path` de DOC-05 no coincidía con su YAML | **CERRADO** (§3.12) | — |
| A-05-14 | El paso 2 de TC-041 no lo ejerce ninguna suite | abierto, sin cambios | A-03 |
| A-05-15 | Borrar un albarán no devuelve el stock; nadie lo decide ni lo comprueba | abierto, sin cambios | producto / A-02 + A-03 |
| A-05-16 | La familia `TCS-nnn` nace fuera del registro | abierto, sin cambios | S-12 + decisión de proyecto |
| **A-05-17** | El propio DOC-04 no ha resincronizado `Q-06`/`Q-12` tras implementarse los specs que las cierran | **nuevo** | A-02 |

### 3.1 Bloqueantes — **ninguna**

Las seis reglas bloqueantes de S-14 sobre DOC-04 1.3.2 / DOC-05 1.10.0 (matriz regenerada
por S-14, código de salida 0):

| Regla | Qué comprueba | Resultado |
|---|---|---|
| `caso_huerfano` | Caso sin `requirement` | 0 de 132 |
| `referencia_rota` | `requirement` → `REQ-nnn` inexistente | 0 de 132 |
| `sin_external_id` | Caso sin `external_id` | 0 de 132 |
| `external_id_duplicado` | Dos casos con el mismo `external_id` | 0 (132 valores distintos) |
| `id_duplicado` | Dos casos con el mismo `TC-nnn` | 0 (132 IDs distintos) |
| `fuera_de_registro` | REQ o TC ausente de `registro-ids.json` | 0 de 81 REQ, 0 de 132 TC |

Reglas de aislamiento y automatización: `dependencia_inexistente` 0, `dependencia_propia` 0,
`ciclo_dependencias` 0, `grado_automatizacion_invalido` 0 de 132. Comprobaciones adicionales
de A-05 (anclas sin contrapartida, `text` de ancla ≠ enunciado, `verification_path` fuera de
vocabulario, módulo del caso ≠ módulo del requisito, `external_id` fuera de patrón,
`status: deprecated`, `critical` cubierto solo por `Low`): **0 en las ocho**.

**Nada impide avanzar a la Fase 3.** Los 13 casos nuevos no introducen ninguna bloqueante:
todos referencian requisitos existentes con `external_id` propio y sin colisión.

### 3.2 Avisos de la skill — `critico_caso_unico`, 15 requisitos

| Regla | Alcance | vs versión anterior |
|---|---:|---|
| `critico_caso_unico` | 15 requisitos | **−2**: REQ-027 y REQ-036 salen |
| `desequilibrio_prioridad` | 0 | = |
| `gap_plan` | 0 | = |
| `deprecado_con_casos` | 0 | = |
| `automatizacion_sin_motivo` | 0 de 98 casos con `grade` ≠ `high` | = |
| Deriva de significado (`anchor_conflict`) | 0 | = |

| Módulo | Requisitos |
|---|---|
| albarans (4) | REQ-028, REQ-030, REQ-033, REQ-011 |
| clients (3) | REQ-002, REQ-007, REQ-008 |
| factures (3) | REQ-044, REQ-045, REQ-046 |
| vehicles (2) | REQ-017, REQ-024\* |
| nomines (2) | REQ-065, REQ-066 |
| personal (1) | REQ-062 |

\* `REQ-024` es de `peces`, no de `vehicles`; se corrige aquí la agrupación de la versión
anterior, que también incluía por error `REQ-027` en `albarans` (ya tenía 2 casos,
`TC-036;TC-116`, desde la versión 1.11.0 de este documento — verificado releyendo la salida
de S-14 en vez de arrastrar la tabla previa).

**Por qué bajan a 15.** `REQ-036` gana `TC-122` y `TC-125` (SPE-07): 3 casos, sale de la
regla. `REQ-027` no cambia en este ciclo —ya tenía 2 casos desde 1.11.0— pero la versión
anterior de este documento lo listaba por error entre los `critico_caso_unico`; queda
corregido, no es un efecto de SPE-07/08.

### 3.3 A-05-01 · cobertura nominal — sin cambios

`A-05-01a` sigue cerrado (TC-041, desde 1.5.0). `A-05-01b` sigue abierto: REQ-055 (TC-078) y
REQ-073 (TC-103) no tienen consecuencia observable mientras `Q-14`/`Q-15` no se implementen.
Ninguno de los 13 casos nuevos los toca.

### 3.4 A-05-03 · cobertura verde sobre defecto confirmado — **la familia original queda vacía; verificado bug por bug**

`docs/DOC-24-BUGS.json` sube a **v1.1.2** y, por primera vez desde que existe este censo,
**los cuatro defectos que lo alimentaban constan `fixed`**:

| Bug | Requisito (DOC-24) | Fijado el | Vía del fix | ¿Un caso del plan lo detecta hoy? |
|---|---|---|---|---|
| BUG-001 | REQ-035 | 2026-08-21 (`ed61c24`) | commit directo, sin spec | **No** — REQ-035 sigue sin describir el bloqueo (residuo, ver abajo) |
| BUG-002 | REQ-040 | 2026-08-21 (`ed61c24`) | commit directo, sin spec | **No por REQ-040** (TC-055/112/114 solo prueban el cambio *permitido*); **sí por REQ-080** (TC-111 rechaza el cambio de cliente, `service`, 409 — SPE-06) |
| **BUG-003** | REQ-019 | **2026-08-30** (`SPE-07`) | `/spec` | **Sí**: `TC-126`, `type: Regression`, `verification_path: mixed`, reproduce y cierra BUG-003 por API y por interfaz |
| **BUG-004** | REQ-043 | **2026-08-31** (`SPE-08`) | `/spec` | **No por REQ-043** (TC-060/061 no tocan rectificación); **sí por REQ-047/042/052** (TC-127, TC-129, TC-131 verifican el mecanismo que resuelve exactamente el caso que reportó BUG-004; TC-128 verifica la inmutabilidad de la original) |

**Consecuencia: la familia que definía A-05-03 —«cobertura verde y defecto confirmado
vivo»— queda vacía por primera vez.** No hay hoy ningún requisito con caso en verde y
defecto real detrás. Eso no cierra el hallazgo del todo: dos residuos distintos sobreviven,
y no hay que confundirlos.

**Residuo 1 — BUG-001/REQ-035, verificado en `docs/DOC-04-FUNCIONAL-HIST.md` 1.3.2 y en el
código.** El fix de `server/routes/albarans.js:163` (rechazar la línea si supera el stock)
llegó por commit directo, sin pasar por `/spec`, y **REQ-035 sigue enunciando solo que el
sistema descuenta stock, no que impide dejarlo negativo**. Cita literal del propio
`DOC-04-HIST`: *«el fix llegó por un commit directo, sin pasar por /spec, y REQ-035 sigue
describiendo el sistema sin ese bloqueo»*. Ningún caso del plan lo verifica porque no hay
requisito que lo pida verificar. Es la forma exacta de `A-05-04` aplicada a este requisito,
no una repetición de `A-05-03`: el sistema ya no tiene el defecto, lo que falta es el
enunciado.

**Residuo 2 — la atribución de `DOC-24` a `REQ-040`/`REQ-043` no es donde vive hoy la
detección del fix, y conviene decirlo para que nadie busque ahí.** BUG-002 se detecta por
`REQ-080` (formalizado en SPE-06), no por `REQ-040`, que sigue probando solo el vector que
nunca fue defectuoso. BUG-004 se detecta por `REQ-047`/`042`/`052`, no por `REQ-043`. En los
dos casos, `DOC-24` archivó el bug bajo el requisito más cercano en el momento del reporte;
el requisito que de verdad lo resuelve nació o se enriqueció después. No es un error de
`DOC-24` que A-05 deba corregir —es de quien mantenga ese fichero, si decide alinearlo—, es
una nota de trazabilidad para quien lea la tabla de arriba y busque el caso equivocado.

#### A-05-03b · TC-073 y TC-075 anuncian el IVA y no lo comprueban — sin cambios

REQ-051 (TC-073) y REQ-053 (TC-075) siguen `Correcto` en la matriz; el defecto de sistema
que motivó el hallazgo sigue cerrado desde 1.8.0 (`FacturaDetail.tsx:99-107` pinta el
importe del IVA); los dos casos siguen sin un paso que lo compruebe, verificado sobre
`factures.feature` (líneas 357-385 y 403-415: ningún `Literal:` para el IVA). Ninguno de los
13 casos nuevos toca `factures`/IVA. **Corrección: A-03**, un paso por caso.

### 3.5 A-05-04 · regla afirmada fuera del censo de requisitos — **un segundo ejemplo, nacido de SPE-08**

La inmutabilidad de una factura emitida seguía sin estar enunciada en ningún requisito
(§ versión anterior, verificado en `server/routes/factures.js`). **SPE-08 añade un segundo
ejemplo de la misma familia, y esta vez es una capacidad nueva, no una prohibición.**

El servidor expone hoy `POST /api/factures/:id/rectificar` (verificado en
`server/routes/factures.js`: rechaza sin `motiu` con 400, factura inexistente con 404,
factura ya rectificada con 409; libera los albaranes de la original a `pendent`/
`factura_id: NULL`; no toca ningún campo propio de la original). DOC-05 lo verifica con seis
casos (`TC-127` a `TC-132`, §1). **Ningún requisito de DOC-04 describe el mecanismo de
factura rectificativa** —ni su existencia, ni el enlace bidireccional, ni la regla de
«una sola rectificación por factura»—: los tres requisitos a los que A-03 cuelga los casos
nuevos (`REQ-047`, `REQ-042`, `REQ-052`) hablan de emisión, de bloqueo de líneas facturadas y
de listado, respectivamente, no de rectificación. `DOC-04/Q-06`, `answered` con
`resolution: gap_confirmed`, describe la decisión de negocio pero **no se ha traducido
todavía en un requisito propio** (§3.16 de A-05-17, relacionado).

**Consecuencia práctica, la misma que para BUG-003/BUG-004 en §3.4**: la matriz no puede ver
este hueco —hay caso, hay fila, el diagnóstico es `Correcto`— y el evolutivo de `Q-06` sigue
siendo el más grande de los seis pendientes (§7.1). **Severidad: aviso. Corrección: A-02**,
formalizar `REQ-nnn` para la rectificación cuando regenere DOC-04.

### 3.6 A-05-06 · el censo de `Q-nnn` depende del orden de las claves — sin cambios

Exposición sin cambios: 34 entradas de cita protegidas solo por el orden de claves (DOC-05:
15, DOC-06: 19). `validate` sale en código 0. **Corrección: S-12.**

### 3.7 A-05-08 / A-05-08b · cobertura condicionada y carril serial — **08b se estrecha de 3 a 2**

**A-05-08, sin cambios**: REQ-019 (TC-025) y REQ-057 (TC-080) siguen con toda su evidencia en
la ola 1 del plan de ejecución, dependiendo de que pase antes un caso de un requisito de
prioridad inferior. Ninguno de los 13 casos nuevos altera esto: TC-120, TC-121, TC-124,
TC-126 (los otros de REQ-019) caen en la ola 0, en carriles propios o compartidos —no
sustituyen a TC-025 como evidencia de REQ-019, que sigue siendo el único caso en ola 1—.

**A-05-08b se estrecha.** El carril serial más largo del plan —donde un fallo temprano deja
sin ejecutar todo lo que viene detrás— ha crecido de 17 a **20 casos** (se le suman TC-112,
TC-114 y TC-118, de SPE-06, pendientes de contar desde la versión 1.11.0 de este documento;
verificado sobre la salida de `execution` de S-14). De los `critical` de caso único que
vivían en él:

| Requisito | Caso | En el carril | Sigue de caso único |
|---|---|---|---|
| REQ-028 | TC-037 | sí | sí |
| REQ-030 | TC-040 | sí | sí (ya protagonizó el incidente TC-040/TC-048, corregido en `DOC-23` 2.2.0) |
| ~~REQ-036~~ | TC-050 | sí | **no** — gana TC-122 y TC-125, fuera del carril, por servicio y por interfaz respectivamente |

**Consecuencia real, no cosmética**: si el carril serial se detiene antes de llegar a
`TC-050`, `REQ-036` conserva evidencia independiente por otras dos vías; `REQ-028` y
`REQ-030` no. El riesgo estructural —nadie hace cumplir en tiempo de ejecución el orden que
declaran `touches`/`depends_on`— sigue sin corregirse. **Corrección: S-06 / DOC-13.** (El
detalle completo del plan de olas y paralelismo se entrega aparte a quien vaya a ejecutar la
suite, no en este documento — ver cierre de esta tarea.)

### 3.8 A-05-09 · `Q-30` — **CERRADO**

**Cerrado en esta versión, verificado en el registro.** DOC-06 1.4.1 renumera sus dos
preguntas propias —`Q-30`→`Q-31`, `Q-31`→`Q-32`— por la regla de gobierno de identificadores
(cede quien no había registrado). `registro-ids.json` confirma: `Q-30` → `DOC-04-FUNCIONAL.md`
(«BR-ALB-10 impide mover un albarán…»), `Q-31` y `Q-32` → `DOC-06-MANUAL-USUARIO.md` («REQ-031
dice que…» y «REQ-081 filtra…», respectivamente). **32 `Q-nnn` con ancla, sin colisión, sin
homónimos.** No queda ningún dato de este hallazgo por vigilar en versiones futuras; su
historia completa vive en `DOC-07-TRAZABILIDAD-HIST.md`.

### 3.9 A-05-10 · una superficie de interfaz no documentada — abierto, sin cambios

DOC-04 sigue sin documentar el literal de ningún mensaje de error; sigue degradando 43 casos
`medium` a la vez que 49 requisitos (§7.1, alcance ⑤) esperan saber qué ve el usuario. Nada
de SPE-07/SPE-08 lo toca. **Corrección: A-02** (literales) + mantenedor (identificadores).

### 3.10 Procedencia del registro

`registro-ids.json` tiene hoy **351 anclas**: `ACT=1 UC=41 BR=43 REQ=81 TC=132 Q=32 FUN=12
MEJ=8 EVO=1`. Los 81 `REQ-nnn` y los 132 `TC-nnn` conservan `text`/`requirement`/
`external_id` verificados contra DOC-04 y DOC-05 (`validate`, 0 bloqueantes). El único aviso
de S-12 sigue siendo `EVO-001` sin `text` (§3.6 de la versión anterior; corrección de A-06,
una línea, sin relación con este ciclo).

### 3.11 A-05-11 · vector no alcanzable por la vía declarada — **11b se estrecha a 2 requisitos**

| Sub-hallazgo | Requisitos | Estado |
|---|---|---|
| A-05-11a | TC-064 | cerrado desde 1.9.0, confirmado por ejecución (`DOC-27`) |
| **A-05-11b** | **REQ-011, REQ-065** | **REQ-027 se cierra en esta versión** |
| A-05-11c | REQ-025, REQ-034 (TC-032, TC-033, TC-047) | abierto, sin cambios |

**REQ-027 se cierra, verificado en el YAML, no en la prosa de 1.7.0/1.11.0 que lo daba por
pendiente.** `TC-116` (`service`, nacido en la revisión post-implementación de SPE-06)
ejerce las **dos** mitades del vector en la misma secuencia de pasos: paso 1, `vehicle_id`
vacío → 400; paso 2, `vehicle_id: 9999` inexistente → 400; paso 3, el albarán no cambia. Su
propio `automation.reason` lo dice: *«cierra además, sobre la vía de modificación, el vector
declarado […] para REQ-027: TC-036 solo ejercía la mitad vacía desde la creación»*
(`docs/DOC-05-PLAN-PRUEBAS.md`, bloque `TC-116`). La versión anterior de este documento
seguía listando REQ-027 como abierto en A-05-11b pese a que TC-116 ya existía desde 1.11.0;
queda corregido aquí, sobre la lectura directa del caso.

**REQ-011 (TC-015) y REQ-065 (TC-090) siguen sin cambios**: cada uno cubre solo la mitad
*vacía* de su vector (cliente / empleado) y ninguno de los 13 casos nuevos los toca. El
camino de cierre sigue siendo el que ya demostró TC-116: un caso hermano `service` por
requisito. **Corrección: A-03**, coste dos casos.

**A-05-11c, sin cambios**: TC-032/TC-033 (REQ-025, filtro de listado inexistente en
`AlbaransList.tsx`) y TC-047 (REQ-034, sin campo de precio para líneas `peca` en
`AlbaraLiniesSection.tsx`). El nuevo `TC-123` (REQ-034, SPE-07, «Override de precio negativo
en línea de pieza se rechaza») **no cierra este hallazgo**: declara `verification_path:
service` y ejerce el override contra la API directamente, sin pasar por el campo de
pantalla que TC-047 seguiría necesitando. Las dos afirmaciones —«la API valida el override»
y «la pantalla no ofrece dónde escribirlo»— son independientes y las dos son ciertas a la
vez. **Corrección: decisión de producto primero, A-03 después.**

### 3.12 A-05-12 · el resumen de DOC-05 vs sus datos — **CERRADO**

**Cerrado en esta versión, recontado sobre los nueve bloques `yaml testcases`, no sobre el
resumen.** DOC-05 1.10.0 declara en su front-matter `verification_path: {ui: 116, service:
14, mixed: 2}`. A-05 ha extraído los 132 casos de los nueve bloques y cuenta **exactamente
lo mismo: 116 `ui`, 14 `service`, 2 `mixed`**. El resumen y los datos coinciden por primera
vez desde que se abrió este hallazgo en 1.7.0. Su historia completa —el desfase de 1.7.0 a
1.9.0 y quién lo mantuvo desalineado— vive en `DOC-07-TRAZABILIDAD-HIST.md`.

### 3.13 A-05-13 · literales de importe caducados — cerrado, fuera del censo

Sin novedad. Cerrado desde 1.9.0; ver `DOC-07-TRAZABILIDAD-HIST.md`.

### 3.14 A-05-14 · el paso 2 de TC-041 no lo ejerce ninguna suite — sin cambios

Sin novedad: `TC-041` sigue verde y ejecutado por servicio (`TCS001`/`TCS002` de `DOC-27`
1.1.0), y su paso 2 —«el selector de tipo ofrece exactamente dos opciones»— sigue sin
ejercerlo ni la suite de servicio ni la de navegador. **Corrección: A-03.**

### 3.15 A-05-15 · borrar un albarán no devuelve el stock — sin cambios

Sin novedad: verificado en `server/routes/albarans.js`, el `DELETE` de un albarán no ejecuta
ningún `UPDATE peces`; ni REQ-039 ni REQ-041 se pronuncian sobre ese camino; TC-056 sigue en
verde sin mirar el stock y su escenario en `automation/ui/…/albarans.feature` sigue sin crear
línea de pieza. **Tres destinatarios: producto/A-02, A-03, `s10-auto-tcs`.**

### 3.16 A-05-16 · la familia `TCS-nnn` nace fuera del registro — sin cambios

Sin novedad: 351 anclas en `registro-ids.json`, ninguna con la cadena `TCS`. **Corrección:
S-12** + decisión de proyecto.

### 3.17 A-05-17 · DOC-04 no ha resincronizado `Q-06` y `Q-12` tras implementarse los specs que las cierran — **nuevo**

**Origen: cruzar `DOC-04-FUNCIONAL.md` 1.3.2 contra `specs/implemented/` y `DOC-24-BUGS.json`
v1.1.2.** No es un hallazgo de S-14 —ninguna de sus reglas mira el bloque `open_questions`—;
es del tipo que solo aparece leyendo tres documentos a la vez, que es para lo que existe
A-05.

**El hecho, citado literalmente porque es la prueba del hallazgo.** `DOC-04-FUNCIONAL.md`,
bloque `open_questions`, vigente hoy:

```yaml
  - id: Q-06
    status: answered
    resolution: gap_confirmed
    gap_open_until_implemented: true
    evolutivo:
      status: pending
      spec_ref: "SPE-08, previsto a continuación de SPE-07; no redactado todavía, no existe
                 ningún fichero SPE-08 en specs/ a fecha de esta corrección (2026-08-30)"
  - id: Q-12
    status: answered
    resolution: gap_confirmed
    gap_open_until_implemented: true
    evolutivo:
      status: pending
      spec_ref: "SPE-07, en redacción (Draft) a fecha de esta corrección (2026-08-30);
                 no existe todavía ningún fichero SPE-07 en specs/"
```

**Lo que es verdad hoy, verificado en el repositorio y no en la fecha del texto anterior:**
`specs/implemented/SPE-07-importes-negativos/SPE-07-importes-negativos.md` está
`Implemented` desde 2026-08-30; `specs/implemented/SPE-08-factura-rectificativa/
SPE-08-factura-rectificativa.md` está `Implemented` desde 2026-08-31; `DOC-24-BUGS.json`
v1.1.2 marca `BUG-003` y `BUG-004` `fixed`, con los mismos commits. **`Q-06` y `Q-12` siguen
declarando `gap_open_until_implemented: true` y `evolutivo.status: pending`, con un
`spec_ref` que describe un fichero que a día de hoy ya existe, está implementado y tiene seis
y siete casos de prueba verificándolo respectivamente** (§1, §3.4). El propio DOC-04 ya sabe
hacerlo bien: `Q-10` (mismo patrón, SPE-06) sí lleva `status: implemented`,
`gap_open_until_implemented: false`, `implemented_on` y `realised_in`. Es el precedente
exacto que a `Q-06`/`Q-12` les falta aplicar.

**Por qué esto no es un hueco que A-05 pueda ver por la matriz.** `S-14` no lee
`open_questions`; el CSV no tiene columna para el estado de un evolutivo. Un consumidor que
solo mirara la matriz vería 100 % de cobertura y no tendría forma de saber que el propio
documento de requisitos aún describe como pendientes dos huecos que ya están cerrados en el
código y probados en el plan.

**Severidad: aviso, no bloqueante** — no toca el JOIN ni ningún diagnóstico del CSV.
**Corrección: A-02**, la próxima vez que regenere DOC-04: actualizar `Q-06` y `Q-12` con el
mismo patrón que ya usó para `Q-10`, y considerar si el gap que describen merece por fin un
`REQ-nnn` propio (§3.5, `A-05-04`).

## 4. La matriz

La matriz completa está en **`docs/DOC-07-MATRIZ.csv`** — 81 filas, una por requisito,
cabecera canónica `requirement_id,requirement_statement,module,priority,test_case_ids,
test_case_count,exists_in_rally,executed,result,diagnosis`. **No hay ninguna fila con
diagnóstico distinto de `Correcto`.**

**Qué cambia en el CSV respecto de la versión anterior.** Ninguna fila nueva —los 81
requisitos ya existían—; **7 filas cambian su `test_case_ids`/`test_case_count`**:

| Requisito | Antes | Ahora | Casos nuevos |
|---|---|---|---|
| REQ-019 | TC-025 (1) | TC-025;TC-120;TC-124;TC-126 (4) | +3 |
| REQ-022 | TC-029 (1) | TC-029;TC-121 (2) | +1 |
| REQ-034 | TC-046;TC-047 (2) | TC-046;TC-047;TC-123 (3) | +1 |
| REQ-036 | TC-050 (1) | TC-050;TC-122;TC-125 (3) | +2 |
| REQ-042 | TC-057;TC-058;TC-059;TC-115 (4) | +TC-128 (5) | +1 |
| REQ-047 | TC-065;TC-066 (2) | +TC-127;TC-129;TC-130;TC-131 (6) | +4 |
| REQ-052 | TC-074 (1) | TC-074;TC-132 (2) | +1 |

Las 74 filas restantes no cambian. Verificado sobre el CSV: 81 filas, suma de
`test_case_count` = **132**, 81 diagnósticos `Correcto`, 0 `GAP PLAN`, 0 `GAP EXPORT`, las
tres columnas de Rally en `n/d` en las 81 filas, RFC 4180 respetado (enunciados con coma
entrecomillados y verificados en el ida y vuelta del parseo).

**Filas con reserva.** De las 7 filas que cambian, todas conservan o ganan una reserva:

- **REQ-019**: sigue en A-05-08 (toda su cobertura original en ola 1, vía TC-025) y ya no
  arrastra `A-05-03`/BUG-003 como defecto vivo: TC-126 lo cierra (§3.4).
- **REQ-034**: sigue en A-05-11c por TC-047 (§3.11); el nuevo TC-123 no la resuelve.
- **REQ-036**: sale de `critico_caso_unico` y de la mitad estructural de A-05-08b (§3.7,
  §3.2).
- **REQ-042**: sin reserva nueva; TC-128 confirma por ejecución la inmutabilidad de la
  factura original que exigía el spec.
- **REQ-047**: nueva evidencia de la capacidad de rectificación (§3.4, §3.5); ninguna
  reserva de trazabilidad — la reserva de fondo es de `A-05-04` sobre el requisito, no sobre
  esta fila.
- **REQ-022, REQ-052**: sin reserva.

El resto de filas con reserva de la versión anterior (REQ-011, REQ-025, REQ-027 —que ahora
se cierra, §3.11—, REQ-028, REQ-030, REQ-031, REQ-033, REQ-035, REQ-040, REQ-041, REQ-043,
REQ-045, REQ-046, REQ-051, REQ-053, REQ-055, REQ-057, REQ-065, REQ-073, REQ-080) no cambia de
contenido en este ciclo; se remite al CSV y a §3 para el detalle de cada una en vez de
reproducir de nuevo la tabla completa.

## 5. Cobertura por módulo y por prioridad

### 5.1 Por módulo

| Módulo | Requisitos | Cubiertos | GAP PLAN | Casos |
|---|---:|---:|---:|---:|
| clients | 8 | 8 | 0 | 11 |
| vehicles | 9 | 9 | 0 | 12 |
| peces | 7 | 7 | 0 | 12 |
| **albarans** | **20** | **20** | 0 | **41** |
| **factures** | **13** | **13** | 0 | **24** |
| personal | 7 | 7 | 0 | 8 |
| nomines | 12 | 12 | 0 | 18 |
| shell | 4 | 4 | 0 | 5 |
| configuracio | 1 | 1 | 0 | 1 |
| **Total** | **81** | **81** | **0** | **132** |

Directo de `summary.per_module` de S-14. Sin huecos de cobertura por módulo. Los 13 casos
nuevos se reparten 6 en `peces`/`albarans` (SPE-07: REQ-019, REQ-022, REQ-034, REQ-036, los
cuatro de `albarans` o `peces`) y 6 en `factures`/`albarans` (SPE-08: REQ-047, REQ-052 de
`factures`, REQ-042 de `albarans`) más el caso de REQ-034 arriba contado; el ciclo del
dinero —`albarans` y `factures`— sigue siendo el más denso del proyecto.

### 5.2 Por prioridad del requisito

| Prioridad | Requisitos | Cubiertos | GAP PLAN | Casos |
|---|---:|---:|---:|---:|
| critical | 36 | 36 | 0 | 68 |
| high | 28 | 28 | 0 | 43 |
| medium | 15 | 15 | 0 | 19 |
| low | 2 | 2 | 0 | 2 |

Directo de `summary.per_priority` de S-14. **Defecto confirmado en el sistema real: 0** —
por primera vez desde que existe este censo, tras el cierre de BUG-003 y BUG-004 (§3.4); el
residuo documental de REQ-035/BUG-001 no cuenta aquí porque no hay defecto vivo que
confirmar, hay un requisito que no describe lo que el sistema ya hace bien.

### 5.3 Grados de automatización

| Grado | Casos |
|---|---:|
| `high` | 33 |
| `medium` | 94 |
| `low` | 4 |
| `not-recommended` | 1 |
| `blocked: true` | 0 |

Directo de `automation.by_grade` de S-14; ningún caso bloqueado para S-10. Estas cifras no
entran en la matriz: el grado de automatización no mide cobertura.

### 5.4 Evidencia de ejecución publicada — los 13 casos nuevos aún no tienen ninguna

`docs/DOC-23-INFORME-EJECUCION-TCS-UI.md` (v2.2.0) y `docs/DOC-27-INFORME-EJECUCION-TCS-API.md`
(v1.1.0) no se han regenerado en este ciclo y **no cubren ninguno de los 13 casos nuevos**
(`TC-120` a `TC-132`): ni `automation/ui/` tiene escenario para ellos —no forman parte del
`-QA.md` que `s10-auto-tcs` aún tiene pendiente de confirmar—, ni la colección de
`automation/api/` tiene petición `TCS-nnn` que los ejerza.

| | Casos | Fuente |
|---|---:|---|
| Con evidencia de ejecución publicada (heredada, sin cambios) | 111 de 119 anteriores \* | `DOC-23` 2.2.0 + `DOC-27` 1.1.0 |
| **Sin evidencia de ejecución, nuevos de este ciclo** | **13 de 13** (TC-120…TC-132) | — |
| **Total con evidencia / total del plan** | **111 de 132 (84,1 %)** | baja del 93,3 % anterior porque crece el denominador, no porque se pierda evidencia |

**Esto no es un defecto: es el orden natural del ciclo.** Los specs se acaban de implementar;
`s10-auto-tcs` tiene el `-QA.md` de cada uno pendiente de confirmación y S-17 no ha vuelto a
ejecutar la colección. La cobertura de requisitos (100 %, §1) no depende de esto —un caso
sin ejecutar sigue cubriendo su requisito—; lo que sí hay que decir con precisión es que,
hoy, **si alguien preguntara «¿se ha ejecutado TC-126 (el que reproduce y cierra BUG-003)
alguna vez?», la respuesta honesta es que no consta**, pese a que su fixed_commit ya está en
`DOC-24`.

## 6. Narrativa de riesgos

**Aún no hay datos de ejecución en Rally.** No existen `DOC-19-RALLY-TESTCASES.csv` ni
`DOC-20-RALLY-STATE.json`: los 132 casos no se han exportado, no constan ejecutados en Rally
y no tienen resultado registrado allí. Esta sección es propia de la pasada `post` y no puede
escribirse con datos ahora; cualquier afirmación sobre qué diría esa ejecución sería
especulación.

Lo que sí puede afirmarse hoy:

- el plan no deja ningún requisito sin caso definido, ni ningún requisito crítico sin un
  caso crítico;
- **por primera vez, ninguno de los defectos históricamente censados en `DOC-24` sigue vivo
  en el sistema** (§3.4, §5.2); dos de los cuatro (BUG-003, BUG-004) se cerraron por los
  specs que disparan esta regeneración, y uno de ellos —BUG-003— tiene además un caso de
  tipo `Regression` que lo reproduce y confirma cerrado (`TC-126`);
- **queda un residuo documental, no de sistema**: `REQ-035` sigue sin describir el bloqueo
  de stock insuficiente que el código ya aplica desde 2026-08-21, y ningún caso lo verifica
  porque ningún requisito lo pide (§3.4);
- **hay una capacidad nueva y probada —la factura rectificativa— sin requisito propio que la
  enuncie** (§3.5); el evolutivo que la origina, `Q-06`, sigue marcado como pendiente en
  DOC-04 pese a estar implementado (§3.17);
- **13 casos nuevos no tienen todavía ninguna evidencia de ejecución publicada** (§5.4): ni
  `automation/ui/` ni `automation/api/` los cubren aún;
- el carril serial de ejecución más largo del plan creció de 17 a 20 casos, y dos
  requisitos `critical` de caso único siguen dependiendo enteramente de que ese carril
  llegue completo hasta ellos (§3.7);
- quedan dos requisitos con solo media mitad de su vector cubierta (A-05-11b) y dos con un
  vector que la interfaz no ofrece en absoluto o solo a medias (A-05-11c), sin cambios en
  este ciclo;
- dos casos verdes (TC-073, TC-075) siguen sin comprobar el IVA que anuncian, aunque el
  sistema ya lo cumple: riesgo de regresión silenciosa, no de defecto actual.

El riesgo abierto sigue siendo el de las dos etapas siguientes: que los 132 casos se
exporten íntegros —donde aparecerán los `GAP EXPORT` si los hay— y que se ejecuten. Cuando
exista `DOC-20`, A-05 se ejecutará de nuevo, rellenará las tres columnas hoy en `n/d` y esta
sección se escribirá con datos.

## 7. Preguntas abiertas

### 7.1 El alcance — recalculado sobre los bloques YAML vigentes

Recontado desde cero sobre `open_questions` de DOC-04, DOC-05 y DOC-06, no arrastrado de la
versión anterior (que llevaba dos versiones marcando estas cifras como «pendientes de
recálculo completo»):

| | Preguntas | Requisitos | % | Casos | Quién debe actuar |
|---|---:|---:|---:|---:|---|
| **① Esperan respuesta de negocio** (DOC-04, `open`) | 10 | 18 | 22,2 % | 26 | negocio → A-02 |
| **② Hueco confirmado, vivo hasta el evolutivo** (DOC-04, `answered`+`gap_confirmed`) | 6 | 16 | 19,8 % | 39 | A-02 (dos de los seis, `Q-06`/`Q-12`, ya implementados de facto — §3.17) |
| **③ Decisión de método sin tomar** (DOC-05, propias, `open`) | 2 | 5 | 6,2 % | 3 | A-01 y A-03 |
| **④ Validados como intencionados** (`as_designed`) | 0 | 0 | 0 % | 0 | nadie |
| **⑤ No consta qué ve el usuario** (DOC-06, propias, `open`) | 12 | 49 | 60,5 % | — | A-02, no A-04 |
| **Unión ①∪②∪③** | 18 | **34** | **42,0 %** | **64** | — |
| **Unión de los cuatro alcances vivos** | 30 | **66** | **81,5 %** | — | — |

Casos de ① y ② derivados de los requisitos que afectan (DOC-04 no declara `affects_cases`);
casos de ③ tomados directamente del `affects_cases` que declara A-03, más preciso. ⑤ no
publica cifra de casos: DOC-06 no declara `affects_cases` y derivarla por requisito daría un
número técnicamente correcto y prácticamente inútil.

**Por qué las cifras suben respecto de lo que la versión anterior tenía sin recalcular.**
`Q-30` (DOC-04, `open`, alcanza REQ-015 y REQ-080) llevaba dos versiones sin entrar en el
recuento de ①; ya entra. `Q-32` (DOC-06, alcanza REQ-080/REQ-081) es nueva desde que se cerró
la colisión de `Q-30` (§3.8) y ya entra en ⑤. Ninguna pregunta cambia de fondo: es la primera
vez desde 1.11.0 que el alcance se deriva de nuevo en vez de conservarse con un `*`.

**Los seis evolutivos pendientes de DOC-04**, con su estado real y no solo el declarado:

| Q | Requisitos que alcanza | `evolutivo.status` en DOC-04 | Estado real |
|---|---|---|---|
| Q-02 | REQ-019, REQ-035 | `pending`, sin `spec_ref` | fix en código (2026-08-21, commit directo); sin requisito que lo describa (§3.4) |
| **Q-06** | REQ-042, REQ-043, REQ-047 | `pending` | **implementado (`SPE-08`, 2026-08-31); DOC-04 no resincronizado (§3.17)** |
| **Q-12** | REQ-019, REQ-022, REQ-034, REQ-036 | `pending` | **implementado (`SPE-07`, 2026-08-30); DOC-04 no resincronizado (§3.17)** |
| Q-14 | REQ-052, REQ-054, REQ-055 | `pending`, `owner: A-06` | sin mover |
| Q-15 | REQ-063, REQ-072, REQ-073 | `pending`, `owner: A-06` | sin mover |
| Q-10 | REQ-040, REQ-046 | `implemented` | correcto: es el patrón que Q-06/Q-12 deberían seguir |

### 7.2 Tres aristas que faltan en el grafo de DOC-02 — no es de A-05, sin cambios

Sigue sin corregirse: `albarans-pages → vehicles-service`, `albarans-pages →
shared-components` y `factures-pages → albarans-service` faltan en el bloque `graph` de
`DOC-02-TECNICA.md` (verificadas por A-07 en el código; ver `DOC-09-IMPACTO-albara-canvi-client.md`
§2.3). **Corrección: S-01**, independiente de este ciclo.

### 7.3 Preguntas propiamente abiertas

Los números son posicionales de esta versión, no identificadores permanentes; los
identificadores estables son los `A-05-nn` de §3.

1. **¿Formaliza DOC-04 un requisito propio para la factura rectificativa?** Nacida en esta
   versión (§3.5, `A-05-04`). De A-02.
2. **¿Se añade el paso de IVA que faltan TC-073 y TC-075?** Sigue abierta desde 1.7.0. De
   A-03.
3. **¿Se resincronizan `Q-06` y `Q-12` de DOC-04 con el patrón que ya usa `Q-10`?** Nacida en
   esta versión (§3.17). De A-02.
4. **¿Se escriben los dos casos hermanos `service` que cerrarían A-05-11b (REQ-011,
   REQ-065)?** Sigue abierta. De A-03.
5. **¿Describen REQ-025 y REQ-034 lo que se quiere que haga la aplicación?** Sigue abierta
   desde 1.7.0 (`A-05-11c`). De producto, luego de A-02/A-03.
6. **¿Debe borrar un albarán devolver el stock de sus líneas de pieza?** Sigue abierta
   (`A-05-15`). De producto/A-02.
7. **¿Se da de alta la familia `TCS-nnn` en `registro-ids.json`?** Sigue abierta
   (`A-05-16`). De S-12 y de quien gobierne el canon `DOC-nn`.
8. **¿Se resincroniza `DOC-09-IMPACTO-factura-rectificativa.md` contra DOC-05 1.10.0?**
   Nacida en esta versión (§ Procedencia). De A-07.

Las preguntas ya contestadas de versiones anteriores —TC-064 antes de exportar, el separador
decimal, la reclasificación de TC-045/TC-063 a `service`— no se repiten aquí; su historia
está en `DOC-07-TRAZABILIDAD-HIST.md`.
