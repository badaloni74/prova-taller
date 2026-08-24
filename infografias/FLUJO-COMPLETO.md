# Flujo completo del sistema — app-taller

Este documento explica cómo funciona todo el ecosistema de agentes, skills,
commands y documentos que construye, documenta y prueba la aplicación
**app-taller**. Está escrito para que otra IA (por ejemplo, un agente de
Copilot Studio) pueda leerlo sin contexto previo y generar sus propias
infografías o resúmenes a partir de él.

No es un documento del canon `DOC-nn` del proyecto — es una referencia sobre
el propio proceso, no sobre la aplicación en sí.

## 1. Qué es este proyecto

app-taller es una aplicación de gestión de un taller mecánico (React +
Express + SQLite). Lo importante para este documento no es la aplicación en
sí, sino **cómo se construye, se documenta y se prueba**: mediante un
conjunto de agentes de IA, skills (procesos deterministas) y dos comandos
(`/spec`, `/spec-impl`), todos ejecutados dentro de Claude Code, que
colaboran siguiendo un flujo fijo con puntos de decisión humana explícitos.

## 2. Los tres tipos de pieza

| Tipo | Qué es | Ícono usado en las infografías |
|---|---|---|
| **Agente** (`A-nn`) | Pieza conversacional con IA — interpreta, redacta, decide con criterio | 🤖 |
| **Skill** (`S-nn`) | Proceso o script — a menudo determinista, sin IA, o con reglas fijas | 🛠️ |
| **Command** | Slash-command que ejecuta directamente Claude Code (`/spec`, `/spec-impl`) | 💻 |

Cada pieza tiene **una entrada** (lo que lee) y **una salida** (lo que
produce), casi siempre un documento con un identificador `DOC-nn`.

## 3. Regla estructural más importante: dos zonas que nunca se mezclan

| Zona | Quién la toca |
|---|---|
| **La aplicación** (`client/`, `server/`) | Solo `/spec` → `/spec-impl` |
| **Las pruebas automatizadas** (`automation/ui/`) | Solo la skill `s10-auto-tcs` |

Ningún agente ni skill cruza esta frontera. La razón: si la misma pieza
pudiera tocar la app y sus pruebas, el camino más barato para "arreglar" un
test en rojo sería aflojar el test en vez de corregir la causa real. Cuando
un caso de prueba falla, una persona ("Doctor QA TC") decide si el
culpable es la aplicación o la prueba, y dirige el arreglo a la zona
correspondiente — nunca lo decide la misma pieza que podría tocar ambas.

## 4. Los cuatro procesos principales

### 4.1 · Base documental (Fase 0 y Fase 1)

Se ejecuta una vez por proyecto (y de nuevo tras cambios estructurales).

```
Repositorio (client/, server/)
   → S-01 · skill-doc-base (escanea una sola vez, sin tocar código)
      → DOC-01 (Base AS-IS, lenguaje de negocio)
      → DOC-02 (Técnica, lenguaje de desarrollador)

A-01 · Orquestador coordina, en este orden:
   DOC-01 → A-02 · Funcional → DOC-04 (requisitos REQ-nnn)
   DOC-04 → A-03 · Pruebas → DOC-05 (plan de pruebas TC-nnn)
   DOC-01 + DOC-04 → A-04 · Manual → DOC-06 (manual de usuario)
   DOC-04 + DOC-05 → S-14 · matriz-trazabilidad (sin IA) → DOC-07-MATRIZ.csv
   DOC-04 + DOC-05 + MATRIZ → A-05 · Trazabilidad → DOC-07 (narrativa)
```

`A-01` no escribe ningún documento — solo decide el orden y despacha.

### 4.2 · Cómo se crea o cambia la aplicación

```
Origen del cambio: idea directa del usuario (Origen: USER),
o un elemento ya catalogado (BUG-nnn / MEJ-nnn / FUN-nnn)
   → /spec (command — nunca escribe código)
      → specs/SPE-NN-slug.md, estado Draft
      → [decisión humana] Draft → Approved

Si la spec formaliza un cambio contra un requisito ya existente
(bloque "yaml evolutivo"), tramo opcional de análisis:
   spec Approved + DOC-02/DOC-04 → A-07 · Impacto → DOC-09
   spec + DOC-09 → A-08 · Estimación → DOC-10
   spec + DOC-09 → S-04 · plan-implementacion → DOC-11 (sus pasos se
                    copian a la sección "Plan" de la propia spec)
   DOC-09 + DOC-05 → A-09 · Regresión → DOC-12

Implementación:
   spec Approved → /spec-impl (command)
      → implementa paso a paso, con pausa para revisar cada diff
      → cambios en client/ y server/, un commit por paso
      → al terminar: marca la spec como Implemented,
        la mueve a specs/implemented/,
        añade una línea a specs/subidas.log
        (fecha, spec, Origen, resumen, commits),
        y comprueba si docs/ quedó desactualizado (S-16)
```

### 4.3 · QA exploratoria y triaje

```
Aplicación en vivo
   → A-10 · Explorador QA (navega sin guion, no modifica nada)
      → DOC-14 (hallazgos EXP-nnn)

Triaje (una persona + Claude, registrado en TRIATGE-DOC-14.md):
cada EXP-nnn se dirige a uno de estos cuatro destinos:

   Es un bug          → A-14 (reproduce y confirma) → DOC-24-BUGS.json (BUG-nnn)
   Es deuda técnica    → A-12 · Roadmap               → DOC-16-ROADMAP.md (MEJ-nnn)
   Es funcionalidad    → A-15 · Funcionalidad          → DOC-25-PROPUESTAS.md (FUN-nnn)
   Ya está muy claro   → directo a /spec (sección 4.2)

Cualquier BUG-nnn / MEJ-nnn / FUN-nnn puede convertirse después en el
Origen de una nueva spec (vuelve a la sección 4.2) — así se cierra el
ciclo.
```

### 4.4 · Pruebas automatizadas

```
DOC-05 (plan de pruebas) + la aplicación real
   → s10-auto-tcs (S-10) genera o amplía automation/ui/
      (Java 21, Selenium, Cucumber, TestNG — patrón BasePO/StepDef genérico)

Ejecución completa (reseed antes, build de producción, nunca dev server):
   → DOC-23-INFORME.md (verdes/rojos por módulo, causa raíz de cada rojo)

Un caso en rojo NUNCA se corrige solo:
   "Doctor QA TC" (persona) decide:
      Es la prueba → s10-auto-tcs corrige el .feature
      Es la app    → /spec → /spec-impl (nunca s10-auto-tcs)
```

## 5. El hub que sostiene todo

Dos piezas transversales, sin las que el resto no sería fiable:

- **`A-01` · Orquestador** — coordina qué agente se llama y en qué orden
  durante la Fase 1. No escribe documentos.
- **Registro central** — dos ficheros de datos, no de prosa:
  - `registro-ids.json`: todos los identificadores asignados (`REQ-nnn`,
    `TC-nnn`, `UC-nnn`, `BR-nnn`). Gobernado por `S-12`. **Los
    identificadores solo se añaden, nunca se renumeran ni se reutilizan** —
    si algo desaparece, se marca `deprecated`, el número no vuelve a usarse.
  - `specs/subidas.log`: una línea por spec implementada (fecha, spec,
    Origen, resumen, commits). Lo mantiene solo `/spec-impl`.
- **`S-16` · Cascada de obsolescencia** — compara la versión que cada
  documento declaró haber consumido contra la versión real de esa entrada
  (y el `commit_sha` de DOC-01/DOC-02 contra el HEAD real del código). Es
  quien detecta que "algo cambió y esto ya no es fiable" y da el orden en
  que hay que regenerar. No regenera nada por sí misma — es un script sin
  IA (determinista), pensado para ser rápido y siempre correcto.

## 6. Catálogo de documentos (`DOC-nn`)

| Doc | Qué contiene | Lo genera |
|---|---|---|
| DOC-01 | Base AS-IS (negocio) | S-01 |
| DOC-02 | Técnica | S-01 |
| DOC-04 | Requisitos REQ-nnn | A-02 |
| DOC-05 | Plan de pruebas TC-nnn | A-03 |
| DOC-06 | Manual de usuario | A-04 |
| DOC-07 (.md + .csv) | Trazabilidad y cobertura | A-05 (.md), S-14 (.csv) |
| DOC-09 | Impacto de un cambio | A-07 |
| DOC-10 | Estimación de un cambio | A-08 |
| DOC-11 | Plan de implementación de un cambio | S-04 |
| DOC-12 | Selección de regresión | A-09 |
| DOC-14 | Hallazgos de exploración EXP-nnn | A-10 |
| DOC-16 | Roadmap técnico MEJ-nnn | A-12 |
| DOC-23 | Informe de ejecución de pruebas | S-10 |
| DOC-24 | Bugs confirmados BUG-nnn | A-14 |
| DOC-25 | Propuestas funcionales FUN-nnn | A-15 |
| `specs/SPE-NN-slug.md` | Especificación de un cambio (Draft→Approved→Implemented) | `/spec` |

Cada documento nace en `status: draft` — **ninguno se marca aprobado por un
agente**, ese cruce ("gate humano") lo hace siempre una persona.

`DOC-08` existió como formato antiguo de especificación de evolutivos
(propiedad de un agente hoy retirado, `A-06`); su función la cubre ahora
`/spec` con un bloque `yaml evolutivo` opcional en la propia spec.

## 7. Sugerencia para una nueva infografía

Con este material, una infografía nueva podría, por ejemplo:

- Mostrar los **4 procesos de la sección 4** como carriles paralelos que
  convergen en el hub (`A-01` + registro central) y se realimentan entre sí
  (la sección 4.3 alimenta a la 4.2; la 4.2 dispara a veces a la 4.4 vía
  `S-16`).
- Usar **una sola fila cronológica** por spec real (columnas: Origen →
  spec → implementación → documentación regenerada → pruebas → resultado),
  tomando como ejemplo `SPE-04`/`SPE-05`/`SPE-06` de este mismo proyecto.
- Representar el **registro central** como el único punto por el que pasan
  todos los identificadores (`REQ`, `TC`, `BUG`, `MEJ`, `FUN`), remarcando
  que nunca se renumeran.

Los iconos usados en este proyecto (para mantener coherencia si se genera
una infografía nueva): 🤖 agente, 🛠️ skill, 💻 command, 📄 documento,
🗄️ almacén de datos, 🙋 decisión humana, 📦 aplicación o código de pruebas.
