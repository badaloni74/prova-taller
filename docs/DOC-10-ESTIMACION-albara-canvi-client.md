---
doc_id: DOC-10
doc_name: DOC-10-ESTIMACION-albara-canvi-client
version: 1.0.0
status: draft
generator: A-08 estimación y coste
generated_at: 2026-08-23T16:27:00+02:00
language: es
project: app-taller
evolutivo_id: EVO-001
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: worktree-agent-a900038f2d91e09a8
  commit_sha: 80163893caf0ff6b2d96b61d77096962ff0339c5
  working_tree_clean: true
inputs:
  - id: DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md
    from: A-06
    version: 2.2.0
    hash: sha256:6f2c2b9d0f62039876c2337f1dc4122d18b16040da8eb219291a39b35b33b3e2
    present: true
    usage: >-
      los once criterios de aceptación (AC-001 a AC-011), las tres precondiciones de datos
      (DP-001 a DP-003), los REQ-nnn en `affects_requirements` y `contradicts`, y el `gate`
      ya aprobado por el peticionario el 2026-08-23
  - id: DOC-09-IMPACTO-albara-canvi-client.md
    from: A-07
    version: 2.0.2
    hash: sha256:a3d28509c4a55392665aaa4e9fb3cc9fb37d38229e445cc410284d8bdb6ae381
    present: true
    usage: >-
      `components_affected` por `effect`, `data_model` (migración y riesgo de datos existentes),
      `silent_risks` (RS-01 a RS-06), `documents_left_stale`, `not_evaluated` y `effort_signal:
      medium` con su razonamiento
  - id: DOC-10-ESTIMACION anteriores
    from: A-08
    present: false
    note: >-
      no existe ningún DOC-10 previo para este evolutivo ni para ningún otro en `docs/`; es la
      primera vez que esta pieza se ejecuta en el proyecto. Sección 5 lo declara y no hay
      histórico con el que comparar
gate_note: >-
  DOC-08 llega con gate.status: approved (2026-08-23, peticionario de negocio). Esta estimación
  se hace, por tanto, sobre un evolutivo ya validado en su contenido de negocio, no sobre un
  borrador. Sigue siendo estimación, no autorización de ejecución: eso es de negocio, con esta
  cifra delante
---

> **Nota de migración (2026-08-23).** La especificación que esta estimación cubre vivía en
> `docs/DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md` (formato retirado); ahora es
> `specs/06-albara-canvi-client.md`. El contenido no cambió en la migración, así que esta
> estimación sigue siendo válida sin regenerar.

# DOC-10 · Estimación y coste — `EVO-001` · Un albarán no puede cambiar de cliente

**3 / 5,5 / 10 jornadas** (optimista / probable / pesimista). Unidad: **jornadas de una
persona** (día completo de trabajo efectivo de implementación + verificación).

> Qué cuesta, no si se hace. La prioridad es de negocio; el alcance ya está cerrado por
> `DOC-08` (`gate: approved`); el diseño de la solución no es de este documento.

## 1. Cifra y rango

| | Jornadas |
|---|---|
| **Optimista** | 3 |
| **Probable** | 5,5 |
| **Pesimista** | 10 |

El pesimista casi duplica el probable (×1,8). No es holgura de cortesía: hay tres fuentes
concretas de incertidumbre real detrás de ese salto, todas nombradas en el apartado 4 —la
más pesada, con diferencia, es que seis de los once criterios solo se pueden comprobar por
una vía (servicio) que este proyecto tiene con cobertura automatizada al 0% y una herramienta
(`S-17`) que nunca se ha usado en serio sobre un caso real como este.

## 2. Desglose por partida

| Partida | Optimista | Probable | Pesimista |
|---|---|---|---|
| Implementación | 0,5 | 1 | 2 |
| Migración de datos | 0 | 0,5 | 1 |
| Actualización documental | 0,5 | 1 | 2 |
| Casos de prueba nuevos | 1,5 | 2 | 3,5 |
| Regresión | 0,5 | 0,5 | 1 |
| Riesgos silenciosos (verificación) | 0 | 0,5 | 0,5 |
| **Total** | **3** | **5,5** | **10** |

### Implementación

`DOC-09` §2.4 localiza el cambio en exactamente dos componentes, los dos a distancia 0 y
marcados `breaks`:

- **`albarans-router`** (`server/routes/albarans.js`, `PUT /:id`, líneas 76-103): una
  comprobación nueva entre las líneas 90-95, apoyada en un `SELECT` que ya casi existe (hoy
  solo trae `id`, hace falta también `client_id` de los dos vehículos). El orden importa
  (`RS-04`) y hay que decidir dónde cae el mensaje nuevo respecto a los tres que ya hay.
- **`albarans-pages`** (`client/src/pages/albarans/AlbaraForm.tsx:34-36,53-64`): cambiar
  `vehiclesService.list()` por `vehiclesService.listByClient()`, que **ya existe**
  (`vehicles.ts:6`), y confirmar que `EntityForm` sigue resolviendo el borde de AC-011 con su
  opción inicial vacía, que según `DOC-09` §2.4 ya está parcialmente resuelta.

Es deliberadamente barato: no hay endpoint nuevo, no hay componente nuevo, y las dos piezas
que hacen falta (`listByClient`, `GET /api/vehicles?client_id=`) ya están escritas y en uso
para otra cosa. El rango sube si al tocar `AlbaraForm` hiciera falta entrar en
`shared-components` (`EntityForm`, compartido por los siete módulos) para resolver AC-011 de
otra forma —`DOC-09` lo señala como el componente que define el radio de explosión real.

### Migración de datos

`data_model.migration_required: false` y `existing_data_at_risk: false` (`DOC-09` §4,
razonado: la regla restringe una transición, no un estado; ninguna fila almacenada la
incumple; el esquema no cambia). No hay partida de migración real.

Lo que sí hay, y que no es lo mismo, es **datos de ejemplo insuficientes**: el seed
(`server/db/seed.js:33-39`) da un vehículo por cliente, y sin ampliarlo **AC-001 no es
reproducible y AC-010 es indistinguible de AC-011** (`DOC-08` §4.3, `DOC-09` §4.3). El propio
`DOC-08` fija tres precondiciones —`DP-001`, `DP-002`, `DP-003`— con dueño declarado:
**`S-06` en `DOC-13`**, no A-08 ni quien implemente el código. Se deja aquí una partida
pequeña por si ese trabajo, aunque de otro dueño, cae dentro de este ciclo de entrega antes
de poder cerrar los criterios; si `DOC-13` ya lo tiene presupuestado por su cuenta, el coste
real de esta partida para `EVO-001` es 0.

### Actualización documental

`DOC-09` §3.5 (`documents_left_stale`) enumera cinco documentos que quedan desactualizados,
cada uno con dueño distinto:

| Documento | Qué cambia | Dueño |
|---|---|---|
| `DOC-04-FUNCIONAL.md` | Reformular `REQ-040` (está en `contradicts`), cerrar `Q-10`, abrir pregunta nueva para `PD-002` | A-02 |
| `DOC-05-PLAN-PRUEBAS.md` | Enunciado de `TC-055`, casos nuevos del lado negativo (se cuentan aparte, ver «Casos de prueba nuevos») | A-03 |
| `DOC-06-MANUAL-USUARIO.md` | Tarea A.13 («Cuidado con cambiar el vehículo», línea 528), §6.1 y §6.2 | A-04 |
| `DOC-07-TRAZABILIDAD` / matriz | Filas de `REQ-040` y `REQ-046`, el estado `Correcto` de `REQ-040` con un solo caso positivo | A-05 |
| `DOC-02-TECNICA.md` | Las tres aristas del grafo que faltan (§2.3 de `DOC-09`) — deuda anterior a este evolutivo, no estrictamente bloqueante | S-01 |

`REQ-040` es el único requisito en `DOC-08/contradicts`; `REQ-046` va en `affects_requirements`
pero como `modified` (reforzado, no contradicho), así que su actualización en `DOC-07` es más
ligera. En este proyecto la regeneración de estos documentos corre en buena parte por skills
(`s16-cascada-obsolescencia` y los propios generadores A-02/A-03/A-04/A-05), lo que abarata la
redacción; el coste que queda es de revisión humana y de la reformulación en sí, que sigue
siendo trabajo de una persona con criterio. La actualización de `DOC-02` (S-01) es deuda
preexistente que `DOC-09` señala pero no depende de este evolutivo: no la sumo al pesimista más
allá de un margen menor.

### Casos de prueba nuevos

Es la partida más cara y la razón principal del rango. De los once criterios de `DOC-08` §4:

- **Cuatro** (AC-003, AC-005, AC-010, AC-011) son nuevos o no tienen caso hoy y se comprueban
  por **interfaz**, con el patrón `BasePO`/`StepDef` ya existente y usado en 102 de 110 casos:
  coste bajo por caso.
- **Seis** (AC-002, AC-004, AC-006 en su mitad de servicio, AC-007, AC-008, AC-009) solo se
  pueden ejercer por **servicio**, y el proyecto tiene **0% de cobertura automatizada** en esa
  vía salvo el precedente `TC-041` (`DOC-09` coverage_note, `DOC-05` §4.1 de `DOC-08`). `DOC-08`
  §4.2 confía esta parte a `S-17 · Automatizador QA de servicio`, que genera colecciones Postman
  validando datos y efectos laterales, no solo códigos de respuesta. Es exactamente lo que
  exigen estos criterios (que el albarán siga sobre su vehículo, que no se guarde nada a
  medias), pero **es la primera vez que esta herramienta se usa en serio sobre criterios reales
  de este tipo en el proyecto**. Si cumple lo que promete, el coste por caso es bajo; si no, se
  escriben a mano y el coste sube de forma notable — de ahí que esta sub-partida sea la que más
  empuja el pesimista.
- **AC-001** ya tiene caso (`TC-055`): cambia de enunciado, no de pasos (`DOC-09` §3.1). No
  cuenta aquí, cuenta en documental.

### Regresión

`DOC-09` liga explícitamente `test_cases` existentes a los requisitos que revisa sin
cambiarlos: `TC-055` (cambio de enunciado, re-verificar), `TC-057`/`TC-058`/`TC-059`
(`REQ-042`, que AC-006 exige que siga mandando primero), `TC-036` (`REQ-027`, apertura, AC-009
exige distinguir el motivo), `TC-056` (`REQ-041`, la salida que le queda al usuario mientras
`PD-003` esté abierta) y `TC-064` (`REQ-046`, ya reclasificado a `service` en `DOC-05` 1.6.0).
Son siete casos existentes, ya automatizados en su mayoría, que hay que re-ejecutar con reseed
(convención del proyecto) y revisar, no reescribir. No se activa una regresión de suite
completa: `shared-components` está marcado `review`, no `breaks`, y ningún otro componente
pasa de dos saltos (`DOC-09` §2.4).

### Riesgos silenciosos (verificación)

`DOC-09` §5 declara seis, `RS-01` a `RS-06`. La mayoría queda cubierta por las partidas
anteriores sin coste añadido:

- `RS-01` (la regla vive dos veces) y `RS-02` (`factures-router` cambia de garantía sin
  tocarse) se verifican con los propios casos de servicio de AC-002/AC-004/AC-007/AC-008/AC-009
  — ya contados en «Casos de prueba nuevos».
- `RS-04` (orden de las comprobaciones) y `RS-05` (atomicidad accidental) se verifican con
  AC-006/AC-009 y AC-004 respectivamente — mismo caso, coste ya contado.
- `RS-03` (el mismo formulario sirve para alta y edición, y solo una filtra) **no tiene caso
  que lo cubra hoy**: pide una comprobación explícita de que el alta sigue mostrando todos los
  vehículos tras el cambio. Es barata pero es trabajo nuevo, no derivado de otro.
- `RS-06` (idioma y ubicación del mensaje) no exige nada nuevo por contrato —`DOC-08` §6.1 lo
  deja decidido que no se decide—, pero si al implementar se quiere dejar constancia explícita
  de que se hereda la convención existente (catalán fijo, bajo el campo de vehículo), es una
  línea de documentación menor, no de prueba.

## 3. Qué sostiene la estimación

1. **El alcance de código no crece.** `DOC-09` fija el punto de entrada real en dos
   componentes a distancia 0, ambos reutilizando funciones que ya existen
   (`listByClient`, `GET /api/vehicles?client_id=`). Si al implementar hiciera falta tocar
   `shared-components` (`EntityForm`) para resolver AC-011, esto deja de sostenerse: el radio
   pasa de dos componentes a los siete módulos que lo comparten.
2. **`S-17` cubre los seis criterios de servicio al coste que promete `DOC-08` §4.2** —generar
   colecciones Postman que validan datos y efectos laterales, no solo código de respuesta—.
   Es la hipótesis que más pesa en el rango: si no se sostiene, la partida más cara del
   desglose (casos de prueba nuevos) se dobla.
3. **No hay migración de datos de producción.** `existing_data_at_risk: false` está razonado
   en `DOC-09` §4.2, no solo declarado: la regla nueva restringe una transición, no valida
   filas ya guardadas. Si el diseño (`S-04`) eligiera materializar `client_id` en `albarans`
   en vez de seguir resolviéndolo por el vehículo, esta hipótesis cae y aparece una migración
   real con relleno de filas — `DOC-09` §4.2 lo llama explícitamente «bifurcación» y no la
   descarta, solo dice que la especificación actual no obliga a ella.
4. **`PD-002` y `PD-003` no entran en esta cifra.** Ambas están declaradas `no bloquea` en
   `DOC-08` §6.2, y si alguna se resuelve «por el lado caro» durante este ciclo, `DOC-08` es
   explícito en que eso es **otra historia, con otro `DOC-08`** — no una ampliación de
   `EVO-001`. Esta estimación asume que esa frontera se respeta.

## 4. Incertidumbre

**Decisiones pendientes de `DOC-08` §6.2 — ninguna bloquea, pero conviene decir qué pasaría:**

| ID | Qué falta | Si sale por el lado caro |
|---|---|---|
| `PD-002` | Qué pasa cuando un vehículo cambia de dueño de verdad con albaranes pendientes | No amplía esta cifra —es otro `DOC-08`—, pero si negocio pide, en medio de este ciclo, que se resuelva a la vez «porque ya se está tocando esto», el coste real deja de ser el de este documento. `DOC-09` §3.4 ya la dimensiona: componente vecino (`vehicles-router`), a un salto, con el acoplamiento necesario ya escrito en el mismo fichero — si se decide abordar junta, el salto de coste es de una partida de implementación entera más, no un ajuste menor |
| `PD-003` | Si borrar y rehacer el albarán (`REQ-041`) le vale al taller o hace falta un camino que conserve las líneas | Igual que `PD-002`: fuera de esta cifra por declaración expresa de `DOC-08`. Si la respuesta exige conservar líneas, es una historia con su propio análisis de impacto y su propia estimación |

**Lo que `DOC-09` declara como no evaluado, y que esta estimación no puede despejar:**

- **§6.1, superficie de API.** `DOC-03` no existe: no hay contrato que diga si el rechazo
  nuevo debe ser `400` o `409`, ni quién más consume `PUT /api/albarans/:id` fuera de la SPA.
  `DOC-24`/`Q-18` ya confirman que **hay al menos un consumidor fuera de la interfaz**. Si
  apareciera alguno con expectativa de `200` siempre, gestionar esa ruptura no está en esta
  cifra — no es una duda de esfuerzo de construcción, es una duda de a quién avisar.
- **§6.2, contexto de negocio (`I-02` no disponible).** Si existiera una decisión de negocio
  anterior sobre el cambio de propietario de un vehículo, `PD-002` podría no ser tan abierta
  como parece. No cambia el coste de `EVO-001`, pero sí la probabilidad de que negocio la
  reabra durante este ciclo.

**Sobre `effort_signal: medium` de `DOC-09`.** No me aparto de la señal, la confirmo: 5,5
jornadas probables para un evolutivo cuyo *código* es pequeño (`DOC-08 scope: small`,
confirmado en `DOC-09 §2.4`) mapea razonablemente a «medio» en un proyecto sin suite de
servicio ni CI de por medio. La distancia entre lo que cuesta el código y lo que cuesta
creérselo —la razón que da `DOC-09` para no bajar la señal a `small`— es la misma razón por
la que la partida de «casos de prueba nuevos» es aquí la más cara y la más incierta.

## 5. Comparación con el histórico

No hay ningún `DOC-10` anterior en `docs/` —ni de este evolutivo ni de ningún otro—: es la
primera vez que esta pieza se ejecuta en el proyecto. No hay con qué comparar esta cifra
todavía; queda esta versión como primer punto de referencia para el próximo evolutivo que se
estime.

## 6. Bloque estructurado

```yaml estimacion
version: 1
evolutivo: EVO-001
unit: jornadas
total: { optimistic: 3, likely: 5.5, pessimistic: 10 }
breakdown:
  - item: implementacion
    optimistic: 0.5
    likely: 1
    pessimistic: 2
    reasoning: >-
      dos componentes a distancia 0 (albarans-router, albarans-pages), ambos marcados `breaks`
      en DOC-09 2.4, reutilizando funciones ya existentes (listByClient, GET
      /api/vehicles?client_id=). Sube si hace falta tocar shared-components (EntityForm) para
      AC-011
  - item: migracion_datos
    optimistic: 0
    likely: 0.5
    pessimistic: 1
    reasoning: >-
      data_model.migration_required: false y existing_data_at_risk: false (DOC-09 4). No hay
      migracion real; lo que hay es ampliacion de seed para DP-001/DP-002/DP-003, con dueno
      declarado S-06/DOC-13, no necesariamente de este ciclo
  - item: actualizacion_documental
    optimistic: 0.5
    likely: 1
    pessimistic: 2
    affects: [DOC-04, DOC-05, DOC-06, DOC-07, DOC-02]
    reasoning: >-
      DOC-09 3.5 (documents_left_stale) enumera los cinco. REQ-040 esta en DOC-08/contradicts
      (reformulacion obligada en DOC-04); REQ-046 es modified, actualizacion mas ligera en
      DOC-07. DOC-02 es deuda preexistente, no depende de EVO-001
  - item: casos_prueba_nuevos
    optimistic: 1.5
    likely: 2
    pessimistic: 3.5
    criteria: [AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011]
    reasoning: >-
      cuatro por interfaz con patron BasePO/StepDef ya existente (coste bajo); seis por
      servicio con cobertura automatizada 0% y primera vez que se usa S-17 en serio sobre
      criterios reales -es la sub-partida que mas empuja el pesimista. AC-001 no cuenta aqui:
      ya tiene caso (TC-055), solo cambia de enunciado
  - item: regresion
    optimistic: 0.5
    likely: 0.5
    pessimistic: 1
    test_cases: [TC-055, TC-057, TC-058, TC-059, TC-036, TC-056, TC-064]
    reasoning: >-
      siete casos existentes, mayoritariamente automatizados, a re-ejecutar con reseed y
      revisar, no reescribir. Ningun componente pasa de dos saltos (DOC-09 2.4); no se activa
      regresion de suite completa
  - item: riesgos_silenciosos_verificacion
    optimistic: 0
    likely: 0.5
    pessimistic: 0.5
    reasoning: >-
      RS-01, RS-02, RS-04 y RS-05 se verifican con casos ya contados en casos_prueba_nuevos.
      RS-03 (alta vs edicion del mismo formulario) no tiene caso hoy y es coste nuevo pero
      barato. RS-06 no exige nada por contrato (DOC-08 6.1 lo deja decidido que no se decide)
confidence: medium
confidence_note: >-
  no es alta porque dos hipotesis de las que depende la cifra (S-17 cubre los seis criterios de
  servicio al coste que promete DOC-08 4.2; la implementacion no toca shared-components) no
  estan probadas todavia en este proyecto -son la primera vez-. No es baja porque el alcance de
  codigo esta muy acotado (DOC-09: dos componentes, distancia 0, sin migracion), los once
  criterios son inequivocos y el gate de DOC-08 ya esta approved. Subiria a alta si se ejecutara
  un caso de servicio real con S-17 antes de comprometer la cifra completa, o si se confirmara
  que shared-components no hace falta tocarlo para AC-011
assumptions:
  - >-
    la implementacion reutiliza listByClient() y GET /api/vehicles?client_id=, que ya existen
    (DOC-09 2.4); no se toca shared-components (EntityForm)
  - >-
    S-17 · Automatizador QA de servicio cubre los seis criterios de via servicio al coste que
    DOC-08 4.2 le asume: validar datos y efectos laterales, no solo codigos de respuesta
  - >-
    la ampliacion del seed para DP-001/DP-002/DP-003 no arrastra cambios a tests existentes que
    hoy asuman implicitamente un vehiculo por cliente
  - >-
    PD-002 y PD-003 permanecen fuera de esta cifra tal como DOC-08 6.2 las declara -no bloquean,
    y si se resuelven se abre otro DOC-08, no una ampliacion de EVO-001
uncertainty:
  - source: pending_decision
    id: PD-002
    impact: >-
      no bloquea ni amplia esta cifra por si sola. Si negocio pide resolverla dentro de este
      mismo ciclo de implementacion, el salto de coste es de una partida de implementacion
      entera mas -el componente vecino, vehicles-router, ya esta dimensionado por DOC-09 3.4-,
      no un ajuste menor de este documento
  - source: pending_decision
    id: PD-003
    impact: >-
      no bloquea. Si la respuesta exige conservar las lineas del albaran al corregir el error,
      es una historia nueva con su propio DOC-08, DOC-09 y DOC-10, no una desviacion de esta
      cifra
  - source: not_evaluated
    id: DOC-09_6.1_api_surface
    impact: >-
      no hay DOC-03 ni contrato de codigo de estado (400 vs 409). Si aparece un consumidor
      externo del PUT con expectativa de 200 siempre -DOC-24/Q-18 ya confirman que hay al menos
      uno fuera de la interfaz-, gestionar esa ruptura no esta contado en esta cifra
  - source: effort_signal
    value: medium
    agreement: consistent
    note: >-
      5.5 jornadas probables para un codigo pequeno (DOC-08 scope: small) es coherente con una
      senal medium en un proyecto sin suite de servicio automatizada; no diverjo de DOC-09
```
