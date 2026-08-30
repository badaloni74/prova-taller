# SPEC 07 — Bloquear precios, costes y estoc negativos

> **Estado:** Implemented
> **Origen:** BUG-003
> **Resuelve:** DOC-04/Q-12 (respondida por negocio el 2026-08-16), BUG-003 (DOC-24, `high`, reproducido)
> **Depende de:** SPEC 02 (núcleo del taller: Peces, Albarans)
> **Fecha:** 2026-08-30
> **Objetivo:** Impedir que el precio, el coste o el estoc de una pieza, el precio de una línea de albarán o el precio por hora de mano de obra se guarden con un valor negativo o —salvo el estoc— igual a cero.

---

## Por qué existe este spec

Ninguna regla acota a valores no negativos el precio, el coste ni el estoc de una pieza, ni el precio de una línea de albarán o el precio por hora de la mano de obra: ni en el servidor ni en el cliente. `PecaForm.tsx` no lleva ningún atributo `min` en sus campos numéricos, y el servidor (`server/routes/peces.js`, `server/routes/albarans.js`) los guarda tal cual llegan.

**Confirmado en el sistema desplegado.** `DOC-24/BUG-003`, `high`: vía API, `POST /api/peces` con `preu:-50, cost:-10, estoc:-5` devuelve `201`; vía interfaz, Piezas > Nueva pieza con precio `-99` se guarda sin ningún aviso.

**Desviación deliberada de idioma.** Los mensajes de rechazo que introduce este spec van en **castellano** (con los términos de dominio en catalán: `estoc`, `peça`), a petición explícita del propietario del proyecto — aunque los mensajes de rechazo ya existentes en los mismos ficheros (`"Estoc insuficient..."`, `"L'albarà ja està facturat..."`) están en catalán. No se retraducen los existentes, solo nacen así los nuevos.

---

## Alcance

**Dentro:**

- Al dar de alta o modificar una pieza (`POST`/`PUT /api/peces`), el sistema rechaza la operación si `preu` o `cost` (cuando se informa) es menor o igual a cero, o si `estoc` es negativo. `estoc` en `0` es válido.
- Al añadir una línea a un albarán (`POST /api/albarans/:id/linies`), el sistema rechaza la operación si el `preu` informado —tanto el de una línea de pieza que sobreescribe el precio de catálogo, como el de una línea de mano de obra— es menor o igual a cero. No aplica cuando no se informa `preu` en una línea de pieza (se usa el del catálogo, ya validado al darla de alta).
- El formulario de pieza (`PecaForm.tsx`) y el de línea de albarán (`AlbaraLiniesSection.tsx`) añaden `min` a los campos numéricos afectados (`0` para estoc, un valor por encima de `0` para el resto) y repiten la validación antes de enviar, con el mismo texto de error que el servidor.
- Los textos de rechazo, **en castellano** (con los términos de dominio en catalán, `estoc`/`peça`/`albarà`, tal como fija `CLAUDE.md`): "El precio debe ser mayor que cero", "El coste debe ser mayor que cero", "El estoc no puede ser negativo".

**Fuera de alcance (para specs futuros):**

- Corregir datos ya guardados con un valor negativo. No se ha encontrado ninguno en `server/db/seed.js` ni en los datos de prueba que dejó la exploración de `BUG-003` (las piezas de prueba de esa sesión ya se eliminaron). Si algún día apareciera un dato así en una base real, este spec no lo toca — solo impide que se guarde uno nuevo.
- Acotar `quantitat` de una línea de albarán — ya está validado (`> 0`, `server/routes/albarans.js:148`), no forma parte de este bug.
- Acotar cualquier otro importe del sistema no citado por `Q-12` (salario de nómina, importes de factura calculados, etc.).
- Permitir un precio o coste igual a cero como excepción de negocio (mano de obra de cortesía, promociones) — si el taller lo necesita algún día, es una decisión de negocio nueva y un spec propio.

---

## Modelo de datos

Este spec no introduce ninguna estructura de datos nueva. Reutiliza el modelo existente de `peces` y `albara_linies` (SPEC 02).

---

## Plan de implementación

1. **Servidor: piezas.** Files: `server/routes/peces.js` (POST ~L19, PUT ~L44).
   Añade, antes del INSERT/UPDATE: `preu <= 0` → 400 "El precio debe ser mayor que cero";
   `cost` informado y `<= 0` → 400 "El coste debe ser mayor que cero"; `estoc < 0` → 400
   "El estoc no puede ser negativo". `estoc === 0` pasa.
   Verification: `POST /api/peces` con `preu:-50` → 400; con `estoc:0` → 201.

2. **Servidor: línea de albarán.** Files: `server/routes/albarans.js` (POST `/:id/linies`, ~L134-168).
   Si `preu` viene informado (línea `peca` con override, o `ma_obra`) y `Number(preu) <= 0` → 400
   "El precio debe ser mayor que cero". Sin `preu` en una línea `peca` sigue igual (usa catálogo).
   Verification: `POST .../linies` con `tipus:'ma_obra', preu:-10` → 400; con `preu:0` → 400;
   línea `peca` sin `preu` → 201 como hoy.

3. **Cliente: formulario de pieza.** Files: `client/src/components/EntityForm.tsx` (añadir
   `min?: number` a `FormField` y pasarlo al `<input>`), `client/src/pages/peces/PecaForm.tsx`
   (`estoc`: min 0; `preu`/`cost`: min 0.01; validación explícita en `handleSubmit`, mismo
   patrón que la de `nom` ya existente).
   Verification: en el formulario, precio `-1` o `0` muestra el error sin llamar al servidor;
   estoc `0` se guarda con normalidad.

4. **Cliente: línea de albarán.** File: `client/src/pages/albarans/AlbaraLiniesSection.tsx`.
   Cambia `min="0"` por `min="0.01"` en el input de `preuHora` (~L222); sustituye el check
   `!preu` de `handleAdd` (~L70) por `Number(preu) <= 0` cuando `tipus === 'ma_obra'`.
   Verification: precio `0` o vacío en mano de obra muestra el error; un precio positivo se añade.

Ningún paso tiene punto de no retorno — es validación pura, totalmente reversible.

---

## Criterios de aceptación

- [x] **AC-001** — Crear una pieza (`POST /api/peces`) con `preu` negativo se rechaza (`400`) con el mensaje de precio, y la pieza no se crea.
- [x] **AC-002** — Crear una pieza con `cost` negativo (informado) se rechaza (`400`) con el mensaje de coste.
- [x] **AC-003** — Crear una pieza con `estoc` negativo se rechaza (`400`) con el mensaje de estoc; con `estoc: 0` se crea con normalidad.
- [x] **AC-004** (borde) — Modificar (`PUT`) una pieza existente para ponerle `preu`, `cost` o `estoc` negativo se rechaza igual que al crearla; la pieza conserva sus valores anteriores.
- [x] **AC-005** — Añadir una línea de mano de obra con `preu` negativo o igual a cero se rechaza (`400`); el albarán no registra la línea.
- [x] **AC-006** (borde) — Añadir una línea de pieza sin informar `preu` (usa el del catálogo) sigue funcionando exactamente igual que hoy.
- [x] **AC-007** (borde) — Añadir una línea de pieza informando explícitamente un `preu` negativo se rechaza igual que una de mano de obra.
- [x] **AC-008** — En el formulario de pieza, un precio, coste (≤ 0) o estoc negativo muestra el error en pantalla sin llegar a llamar al servidor.
- [x] **AC-009** — En el formulario de añadir línea de mano de obra, un precio ≤ 0 o vacío muestra el error sin llamar al servidor.
- [x] **AC-010** (`BUG-003`) — Reproducir exactamente los pasos de `DOC-24/BUG-003` (API con `preu:-50, cost:-10, estoc:-5`; interfaz con precio `-99`) ya no se acepta en ninguno de los dos casos.

**Vía de comprobación.** AC-008 y AC-009 se comprueban por interfaz. AC-001, AC-002, AC-003, AC-005 son alcanzables por interfaz pero se comprueban por servicio para aislar el servidor — AC-008/009 ya cubren la capa de pantalla para el mismo escenario. AC-004 y AC-007 solo son alcanzables por servicio: la edición no se retesta por pantalla (mismo formulario que AC-008) y el formulario nunca compone un `preu` de línea de pieza. AC-010 es mixto, igual que el propio `BUG-003`.

---

## Evolutivo

```yaml evolutivo
affects_requirements: [REQ-019, REQ-022, REQ-034, REQ-035, REQ-036]
contradicts: []
acceptance_criteria:
  - id: AC-001
    given: pieza sin crear
    when: POST /api/peces con preu negativo
    then: 400, no se crea la pieza
    edge: false
  - id: AC-002
    given: pieza sin crear
    when: POST /api/peces con cost negativo informado
    then: 400, no se crea la pieza
    edge: false
  - id: AC-003
    given: pieza sin crear
    when: POST /api/peces con estoc negativo
    then: 400; con estoc 0, 201
    edge: false
  - id: AC-004
    given: pieza existente
    when: PUT /api/peces/:id con preu, cost o estoc negativo
    then: 400, la pieza conserva sus valores anteriores
    edge: true
  - id: AC-005
    given: albarán pendiente
    when: POST .../linies con tipus ma_obra y preu <= 0
    then: 400, no se registra la línea
    edge: false
  - id: AC-006
    given: albarán pendiente, pieza con estoc suficiente
    when: POST .../linies con tipus peca sin informar preu
    then: 201, usa el precio del catálogo (sin cambios respecto a hoy)
    edge: true
  - id: AC-007
    given: albarán pendiente
    when: POST .../linies con tipus peca y preu negativo informado explícitamente
    then: 400
    edge: true
  - id: AC-008
    given: formulario de pieza abierto
    when: preu, cost o estoc inválido y pulsar Guardar
    then: error en pantalla, ninguna petición al servidor
    edge: false
  - id: AC-009
    given: formulario de línea de albarán, tipo mano de obra
    when: preu <= 0 o vacío y pulsar Añadir
    then: error en pantalla, ninguna petición al servidor
    edge: false
  - id: AC-010
    given: sistema recién sembrado
    when: se reproducen exactamente los pasos de DOC-24/BUG-003 (API y UI)
    then: ambos casos rechazados
    edge: false
pending_decisions: []
```

---

## Decisiones

- **Sí:** `estoc` admite `0` — una pieza puede agotarse, es su estado normal. El resto (`preu`, `cost`, precio de línea, precio/hora) exige estrictamente `> 0`, siguiendo la letra literal de la decisión de negocio (`Q-12`).
- **Sí:** validación en las dos capas (cliente y servidor), con el servidor mandando siempre — mismo patrón que `BUG-001`/`BUG-002`, que ya demostraron que un filtro de pantalla sin comprobación detrás deja el defecto donde está.
- **Sí, y es una desviación deliberada:** los mensajes de este spec van en **castellano** (con los términos de dominio en catalán), aunque los mensajes de rechazo ya existentes en los mismos ficheros (`"Estoc insuficient..."`, `"L'albarà ja està facturat..."`) están en catalán. Decisión explícita del propietario del proyecto para este spec — no se retraducen los mensajes existentes, solo los nuevos nacen en castellano.
- **No:** migrar datos ya guardados — no se ha encontrado ningún valor negativo ni en el seed ni en los datos de prueba que dejó la exploración de `BUG-003`.
- **No:** tocar la validación de `quantitat` de una línea — ya existe (`> 0`), no forma parte de este bug.
- **No:** permitir precio o coste igual a cero como excepción de negocio (mano de obra de cortesía, promociones). Si el taller lo necesita algún día, es una decisión de negocio nueva y un spec propio.

---

## Riesgos identificados

| Riesgo | Mitigación |
| --- | --- |
| `PecaForm.tsx` sirve a la vez para alta y edición (`isEdit`); la validación debe aplicar a los dos casos, no solo a la creación | `AC-004` lo exige explícitamente para la edición |
| `EntityForm.tsx` es un componente genérico que usan otros formularios (Vehicles, Personal...); añadir `min` a `FormField` no debe afectar a campos numéricos de otras entidades | El prop es opcional — si un campo no lo informa, su comportamiento no cambia |
| Cambiar `min="0"` a `min="0.01"` en el input de mano de obra es solo ayuda visual del navegador, no la protección real | La validación JS explícita (`Number(preu) <= 0`) es la que de verdad bloquea el envío — el paso 4 del plan ya lo contempla, no solo el atributo HTML |

---

## Qué **no** hay en este spec

- Corrección de datos ya viciados por un valor negativo previo (no se ha encontrado ninguno).
- Validación de `quantitat` de una línea de albarán.
- Acotar otros importes del sistema (nóminas, totales de factura).
- Excepción de negocio para permitir precio o coste igual a cero.

Cada uno de estos puntos, si llega, va en un spec futuro.
