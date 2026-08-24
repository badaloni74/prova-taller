---
doc_id: DOC-27
doc_name: DOC-27-INFORME-API
version: 1.0.0
status: draft
history: DOC-27-INFORME-API-HIST.md
generator: S-17 s17-api-qa (ejecución newman, sesión Claude Code)
generator_version: "1.1"
generated_at: 2026-08-24T11:05:00+02:00
project: app-taller
language: es
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: f9761ce
  working_tree_clean: false   # .gitignore con la entrada de automation/api/newman/ sin versionar todavía
entorno:
  api: http://localhost:3001/api (Express + better-sqlite3, npm run dev -w server)
  base: data/taller.db sembrada, NO resembrada antes de esta ejecución
  newman: "6.2.2"
  node: "v24.15.0"
  coleccion: automation/api/tallerMecaniccollection.json
  entorno_postman: automation/api/environments/tallerMecanicEnvironmentLocal.json
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.6.0
    hash: sha256:43051f32f13c32da7350e79d3fb92503c695618375cbae82b4950abb734b2688
  - id: automation/api/tallerMecaniccollection.json
    from: S-17
    present: true
---

# DOC-27 · Informe de ejecución de la suite de servicio (S-17)

Contraparte de `DOC-23`, que informa de la suite de navegador. Esta cubre los
casos que **la pantalla no permite ni intentar**: enviar un tipo de línea que
el desplegable no ofrece, facturar un albarán ya facturado, mezclar clientes en
una misma factura.

**Primera ejecución registrada.** La colección existía desde el 2026-08-24 pero
sus resultados no se publicaban en ninguna parte: vivían en la terminal de
quien la lanzaba.

## 1. Resultado global

| | |
|---|---|
| **Casos de servicio (`TCS-nnn`)** | **10 de 10 en verde** |
| Peticiones ejecutadas | 28 (10 casos + 18 de fixture) |
| Assertions | 31 · **0 fallidas** · 0 pendientes |
| Duración | 1,75 s |
| Tiempo medio de respuesta | 10 ms (mín. 4 ms, máx. 89 ms) |

Sin rojos, sin peticiones sin ejecutar y sin ningún `TCS` ausente del JSON de
newman del que sale este informe.

## 2. Resultado caso a caso

Un `TC-nnn` de `DOC-05` necesita varias comprobaciones: la que provoca el
rechazo y la que confirma que el sistema **no se movió**. Por eso hay 10
`TCS-nnn` para 4 `TC-nnn`.

| `TCS` | Cubre | Qué comprueba | Método | HTTP | Assert. | Resultado |
|---|---|---|---|---|---|---|
| `TCS001` | `TC-041` | Rechaza una anotación de tipo inválido enviada directa al servicio | POST | 400 | 2 | ✅ |
| `TCS002` | `TC-041` | El albarán conserva sus líneas y su base tras el rechazo | GET | 200 | 2 | ✅ |
| `TCS003` | `TC-045` | Rechaza una línea de pieza que no existe en el catálogo | POST | 400 | 2 | ✅ |
| `TCS004` | `TC-045` | El albarán no registra ninguna línea | GET | 200 | 1 | ✅ |
| `TCS005` | `TC-063` | Rechaza la emisión con un albarán ya facturado | POST | 400 | 2 | ✅ |
| `TCS006` | `TC-063` | El albarán facturado sigue enlazado solo a su factura | GET | 200 | 1 | ✅ |
| `TCS007` | `TC-063` | No se ha creado ninguna factura nueva | GET | 200 | 1 | ✅ |
| `TCS008` | `TC-064` | Rechaza la emisión con albaranes de dos clientes distintos | POST | 400 | 2 | ✅ |
| `TCS009` | `TC-064` | Los dos albaranes siguen pendientes | GET | 200 | 1 | ✅ |
| `TCS010` | `TC-064` | No se ha creado ninguna factura nueva | GET | 200 | 1 | ✅ |

Los cuatro rechazos (`TCS001`, `TCS003`, `TCS005`, `TCS008`) validan **contrato
y datos**: el `400` y además el mensaje exacto que devuelve el servidor. Las
seis restantes son el **efecto lateral**, consultado en una petición aparte —
que es el nivel que encuentra los defectos de verdad, y el que una comprobación
del código de estado nunca daría.

## 3. Aislamiento verificado

Un verde que deja residuo no es un verde del todo, así que el estado de la base
se midió antes y después:

| | Antes | Después |
|---|---|---|
| Facturas | 12 | 12 |
| Albaranes | 37 | 37 |
| Stock de `FO-100` | 37 | 37 |

**Idéntico.** Las 18 peticiones de fixture (`_setup` / `_teardown`) devuelven la
base exactamente como estaba, y por eso la colección se puede repetir sobre la
misma base sin resembrarla. No llevan `TCS` porque no verifican nada del
sistema bajo prueba: sus assertions son guardas, y si una fallara lo que habría
es un problema de entorno, no un caso en rojo.

Esto no era así hasta hoy. La versión anterior de `TC-063` creaba un albarán y
lo facturaba, y como **el servidor no ofrece ninguna forma de borrar una
factura**, dejaba una factura y un albarán imborrables por ejecución. Ahora
reutiliza un albarán ya facturado de la base sembrada.

## 4. Hallazgos abiertos sobre el servidor

Ninguno de los dos afecta a los resultados de arriba: se esquivan desde la
colección, no se corrigen desde ella. Están detallados en
`automation/api/README.md`.

1. **`DELETE /api/albarans/:id` no restaura el stock** de sus líneas de pieza,
   a diferencia del borrado de una línea suelta. Candidato para `A-12 ·
   Roadmap`.
2. **Una factura emitida no se puede anular por ninguna vía.** No existe
   `DELETE /api/factures/:id`, y `PATCH /:id` solo commuta `estat_pagament`.
   Emitir es, hoy, irreversible. Por su naturaleza parece más una propuesta
   funcional (`A-15`) que una mejora técnica: anular una factura tiene reglas
   de negocio propias, no es un borrado.

## 5. Cobertura y límites de este informe

- Cubre **4 de los 110 casos** de `DOC-05`, los marcados
  `verification_path: service`. Los otros 106 son cosa de `DOC-23` (102
  automatizados en `automation/ui/`) o siguen sin automatizar.
- **La base no se resembró** antes de ejecutar. Es deliberado: comprobar que la
  colección es repetible sobre una base ya usada es parte de lo que se quería
  verificar. Un informe de entrega sí debería partir de `npm run seed`.
- El JSON de newman del que sale todo esto (`automation/api/newman/run.json`)
  **no se versiona**: cambia entero en cada corrida y su contenido útil ya está
  aquí. Se regenera con el comando del `README.md` de la colección.

## 6. Preguntas abiertas

1. **¿Debe la familia `TCS-nnn` darse de alta en `registro-ids.json`?** Hoy los
   identificadores se asignan en la colección y se respeta la regla de no
   reutilizarlos, pero no hay nada que lo impida mecánicamente, a diferencia de
   `REQ`, `TC`, `UC` y `BR`.
2. **¿Entra esta suite en el Go/No-Go?** `DOC-07` cruza cobertura contra
   `DOC-23`; con este documento ya se puede citar también para los 4 casos de
   servicio, pero eso lo decide `A-05`.
