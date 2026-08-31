# SPEC 08 — Factura rectificativa

> **Estado:** Implemented
> **Origen:** BUG-004
> **Resuelve:** DOC-04/Q-06 (respondida por negocio el 2026-08-16), BUG-004 (DOC-24, `high`, reproducido)
> **Depende de:** SPEC 02 (núcleo del taller: Albarans, Factures)
> **Fecha:** 2026-08-30
> **Objetivo:** Permitir anular una factura ya emitida mediante una factura rectificativa que la referencia y que libera sus albaranes a `pendent` para poder refacturarlos correctamente, sin alterar la inmutabilidad de la factura original.

---

## Alcance

**Dentro:**

- Nuevo endpoint `POST /api/factures/:id/rectificar` que emite una factura rectificativa: una fila nueva en la misma tabla `factures`, con su propia numeración (`año/R-nnnu`, reutilizando `generateNumero('factures', 'R')` sin cambios) y un enlace (`factura_rectificada_id`) a la factura que anula.
- Al emitir la rectificativa, en una única operación transaccional:
  - Los albaranes que agrupaba la factura original vuelven a `estat: 'pendent'` y `factura_id` a `NULL`, quedando disponibles para refacturarse. Esta escritura se hace desde `factures.js` (igual que hoy `POST /api/factures` ya escribe en sentido contrario sobre `albarans`); `server/routes/albarans.js` no gana ninguna línea.
  - La factura original queda marcada como anulada implícitamente por la propia existencia del enlace — ninguna rectificativa apuntándola significa vigente, una apuntándola significa anulada. `estat_pagament` no se toca ni gana un tercer valor.
  - Se exige un motivo (texto libre, obligatorio) que queda guardado en la rectificativa, para auditoría.
- Puede rectificarse una factura en cualquier estado de pago (`pendent` o `pagada`).
- No puede rectificarse una factura que ya ha sido rectificada (rechazo explícito, mismo patrón que ya existe para un albarán ya facturado).
- `FacturesList.tsx`, `ClientDetail.tsx` y `FacturaDetail.tsx` muestran una marca visual explícita de «anulada» en las facturas que tienen una rectificativa; `FacturaDetail.tsx` muestra además el enlace bidireccional (original ↔ rectificativa).
- La rectificativa anula siempre el importe íntegro de la original — es una sustitución completa, no un abono parcial.

**Fuera:**

- Abono parcial o rectificativa por un importe distinto al total de la original. Si negocio lo necesita más adelante, es un spec propio.
- Cualquier operación que revierta un albarán de `facturat` a `pendent` fuera de este flujo — no se introduce una función genérica de «desfacturar».
- Cambios en `computeTotals`/`withDetails`: al ser sustitución completa y no abono, esta lógica de cálculo no se toca.
- Una tabla separada para las rectificativas — se quedan en la misma tabla `factures`, distinguidas por el prefijo de numeración y el enlace.
- Definir una superficie de API formal (`DOC-03`) — sigue sin existir; no es objeto de este spec.

---

## Modelo de datos

No se crea ninguna tabla nueva. La rectificativa es una fila más de `factures`
(mismo esquema, misma serie de identidad), distinguida por dos columnas nuevas
y su propio prefijo de numeración.

**Migración sobre `factures`** (`server/db/migrations/`, aditiva, nullable en
ambas columnas — ninguna fila existente deja de ser válida):

| Columna | Tipo | Regla |
|---|---|---|
| `factura_rectificada_id` | `INTEGER REFERENCES factures(id)`, nullable | Solo la rectificativa la informa: apunta a la factura que anula. En una factura normal vale `NULL`. |
| `motiu_rectificacio` | `TEXT`, nullable | Obligatorio solo cuando `factura_rectificada_id` no es `NULL` (validado en el endpoint, no en el esquema). |

**Concepto derivado, no almacenado: «factura anulada».** Una factura está
anulada si y solo si existe otra fila de `factures` cuyo `factura_rectificada_id`
la referencia. No se añade ninguna columna de estado para esto —ni se reutiliza
`estat_pagament`, que sigue con su vocabulario cerrado (`pendent`/`pagada`) tal
como exige `REQ-055`—: `factures-service` lo resuelve con una subconsulta
(`EXISTS (SELECT 1 FROM factures r WHERE r.factura_rectificada_id = f.id)`) y lo
expone en la respuesta de la API como un campo calculado (p. ej. `anuladaPer:
<id> | null`), que es lo que consumen las tres pantallas para la marca visual.

**Numeración.** La rectificativa reutiliza `generateNumero('factures', 'R')`
sin ningún cambio de firma — la misma tabla, un prefijo distinto (`año/R-nnnu`
en vez de `año/F-nnnu`); el `LIKE` que ya aísla series por prefijo separa las
dos numeraciones sin ninguna lógica nueva.

**`albarans` no cambia de esquema.** El endpoint nuevo escribe sobre las
columnas que ya existen (`estat`, `factura_id`), igual que `POST /api/factures`
ya escribe hoy en sentido contrario.

---

## Plan de implementación

1. **Migración de esquema.** Nueva migración en `server/db/migrations/`: añade
   `factura_rectificada_id` y `motiu_rectificacio` (nullable) a `factures`. No
   cambia ningún comportamiento existente — es aditivo y no se toca ninguna
   fila.

2. **Endpoint de rectificación** (`server/routes/factures.js`), `POST
   /api/factures/:id/rectificar`, con `{ motiu }` en el cuerpo:
   - Rechaza si la factura no existe (`404`), si ya está rectificada —otra
     fila ya la referencia en `factura_rectificada_id`— (`409`, mensaje
     explícito) o si `motiu` viene vacío (`400`).
   - En una única transacción: revierte cada albarán agrupado por la factura
     original a `estat: 'pendent'` y `factura_id: NULL`; inserta la
     rectificativa (`numero` vía `generateNumero('factures', 'R')`,
     `client_id`/`iva_percentatge` copiados de la original,
     `factura_rectificada_id` apuntando a ella, `motiu_rectificacio` con el
     motivo recibido). No se toca `computeTotals`/`withDetails`: al agrupar
     cero albaranes, la rectificativa calcula un total de `0` por el camino ya
     existente — es la sustitución, no un abono con importe propio.
   - `GET`/lista de facturas añade el campo calculado `anuladaPer` (id de su
     rectificativa, o `null`) vía la subconsulta `EXISTS` descrita en el
     modelo de datos.

3. **Cliente — detalle de factura** (`client/src/services/factures.ts`,
   `client/src/types/factura.ts`, `FacturaDetail.tsx`): método `rectify` en el
   servicio, campos `facturaRectificadaId`/`anuladaPer` en el tipo, acción
   «Rectificar factura» con formulario de motivo (obligatorio), enlace
   bidireccional entre original y rectificativa, y marca visual «Anul·lada» en
   la que corresponda.

4. **Cliente — listados** (`FacturesList.tsx`, `client/src/pages/clients/ClientDetail.tsx`):
   misma marca visual «Anul·lada» para toda factura con `anuladaPer` no nulo,
   consistente con la de `FacturaDetail.tsx`.

---

## Criterios de aceptación

- [x] AC-001 — Existe `POST /api/factures/:id/rectificar`, que acepta `{ motiu }` en el cuerpo.
- [x] AC-002 — Al rectificar, cada albarán que agrupaba la factura original vuelve a `estat: 'pendent'` y `factura_id: NULL`, en la misma operación.
- [x] AC-003 — La rectificativa se numera con su propio prefijo (`año/R-nnnu`), reutilizando `generateNumero('factures', 'R')` sin cambiar su firma.
- [x] AC-004 — La factura original no cambia ningún campo propio al rectificarse: su inmutabilidad (`BUG-004`) se mantiene; solo se deriva su condición de «anulada» a partir de la existencia de la rectificativa que la referencia.
- [x] AC-005 — No se puede rectificar una factura que ya tiene una rectificativa (`409`, mensaje explícito).
- [x] AC-006 — Se puede rectificar una factura en cualquier `estat_pagament` (`pendent` o `pagada`).
- [x] AC-007 — Rectificar sin `motiu` (vacío o ausente) devuelve `400`.
- [x] AC-008 — `estat_pagament` conserva su vocabulario cerrado (`pendent`/`pagada`): `REQ-055` y su caso `TC-078` siguen en verde sin cambios.
- [x] AC-009 — `FacturaDetail.tsx` muestra la acción «Rectificar factura», el enlace bidireccional (original ↔ rectificativa) y la marca visual «Anul·lada» en la que corresponda.
- [x] AC-010 — `FacturesList.tsx` y `ClientDetail.tsx` muestran la misma marca «Anul·lada» para toda factura con rectificativa.
- [x] AC-011 — El caso real que motivó `BUG-004` (factura `2026/F-0002`, 114.835,05 €, cliente 8, `DOC-24`) puede rectificarse: su albarán vuelve a `pendent` y queda disponible para refacturarse al cliente correcto. **Salvedad:** esos datos concretos ya no existen en la base (`npm run seed` genera una base limpia; los datos de aquella exploración quedaron sobrescritos). Verificado el mecanismo genérico que resuelve exactamente ese caso (Pasos 2 y 3) contra datos de seed equivalentes, no la fila original.

---

## Evolutivo

```yaml evolutivo
affects_requirements: [REQ-042, REQ-043, REQ-047]
contradicts: []
acceptance_criteria:
  - id: AC-001
    given: factura existente sin rectificar
    when: POST /api/factures/:id/rectificar con motiu válido
    then: 201, se crea la rectificativa
    edge: false
  - id: AC-002
    given: factura con albaranes agrupados
    when: se rectifica
    then: cada albarán vuelve a estat pendent y factura_id a NULL
    edge: false
  - id: AC-003
    given: rectificativa emitida
    when: se consulta su numero
    then: formato año/R-nnnu, serie propia dentro de la misma tabla factures
    edge: false
  - id: AC-004
    given: factura original con rectificativa emitida
    when: se consulta la original
    then: ningún campo propio cambia; su condición anulada es derivada, no almacenada
    edge: true
  - id: AC-005
    given: factura ya rectificada
    when: se intenta rectificar de nuevo
    then: 409, mensaje explícito
    edge: true
  - id: AC-006
    given: factura con estat_pagament pagada
    when: se rectifica
    then: 201, igual que si estuviera pendent
    edge: true
  - id: AC-007
    given: petición de rectificación sin motiu
    when: POST /api/factures/:id/rectificar
    then: 400, no se crea nada
    edge: true
  - id: AC-008
    given: cualquier rectificación emitida
    when: se inspecciona estat_pagament de cualquier fila de factures
    then: solo pendent o pagada; REQ-055/TC-078 sin cambios
    edge: false
  - id: AC-009
    given: factura con rectificativa
    when: se abre FacturaDetail.tsx (de cualquiera de las dos)
    then: acción de rectificar (si aplica), enlace bidireccional, marca anulada visible
    edge: false
  - id: AC-010
    given: listado de facturas o ficha de cliente
    when: una factura tiene rectificativa
    then: aparece marcada anulada en FacturesList.tsx y ClientDetail.tsx
    edge: false
  - id: AC-011
    given: sistema con los datos reales de BUG-004 (factura 2026/F-0002)
    when: se rectifica esa factura
    then: el albarán 5 vuelve a pendent, disponible para refacturarse al cliente correcto
    edge: false
pending_decisions: []
```

---

## Decisiones

- **Sí:** los albaranes de la factura original se liberan a `pendent` al rectificarla (rama B de `DOC-09-IMPACTO-factura-rectificativa.md`) — es lo único que resuelve el caso real de `BUG-002` que motivó `BUG-004`; la alternativa puramente financiera lo dejaba sin remedio.
- **Sí:** `factura_id` se limpia a `NULL` en la misma operación que libera el albarán — evita el riesgo de un albarán editable que siga enlazando a una factura marcada como anulada.
- **Sí:** la condición «anulada» se deriva de la existencia del enlace (`EXISTS` sobre `factura_rectificada_id`), sin tocar `estat_pagament` — mantiene `REQ-055`/`TC-078` intactos en vez de abrir un vocabulario cerrado.
- **Sí:** numeración propia con prefijo `R`, en la misma tabla `factures` — reutiliza `generateNumero` sin ningún cambio de firma; más barato que una tabla separada y sin el riesgo de que `REQ-008` deje de contar rectificativas.
- **Sí:** la rectificativa anula siempre el importe íntegro — es sustitución, no abono parcial; `computeTotals`/`withDetails` no se tocan.
- **Sí:** el motivo es obligatorio y queda guardado — es una acción delicada sobre una factura ya emitida, posiblemente pagada.
- **Sí:** puede rectificarse una factura en cualquier estado de pago — el caso de negocio es corregir un error de facturación, independiente de si ya se cobró.
- **No:** puede rectificarse una factura que ya tiene una rectificativa — bloqueado explícitamente, evita cadenas sin resolver sobre la misma original.
- **No:** se crea una tabla separada para las rectificativas — se quedan en `factures`, distinguidas por el prefijo y el enlace.

---

## Riesgos identificados

| Riesgo | Mitigación |
| --- | --- |
| `REQ-042` deja de ser un invariante absoluto sin que `albarans.js` gane ninguna línea (mismo patrón silencioso que `REQ-046`, ya documentado en el proyecto) | Se declara explícitamente en este spec y en el bloque `Evolutivo` — no es un descuido, es la decisión de negocio (`Q-06`) llevada a sus consecuencias |
| Una factura anulada se vería igual que una válida en los listados si la marca visual no se implementa | `AC-009`/`AC-010` la exigen explícitamente en las tres pantallas |
| `factura_id` de un albarán liberado podría quedar apuntando a una factura ya anulada si no se limpia en la misma transacción | `AC-002` exige limpiarlo junto con el `estat`, en la misma operación |
