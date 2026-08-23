# SPEC 06 — Un albarán no puede cambiar de cliente

> **Estado:** Approved
> **Origen:** BUG-002
> **Resuelve:** DOC-04/Q-10 (respondida por negocio el 2026-08-16), BUG-002 (DOC-24, `critical`, reproducido)
> **Depende de:** SPEC 02 (núcleo del taller: albaranes, vehículos, facturas)
> **Fecha:** 2026-08-23
> **Objetivo:** Impedir que cambiar el vehículo de un albarán pendiente lo mueva al cliente de otro vehículo, para que la factura no acabe a nombre de quien no encargó el trabajo.

---

## Por qué existe este spec

Hoy, cuando un albarán está pendiente de facturar, se le puede cambiar el vehículo sin ninguna restricción. Si el vehículo nuevo es de **otro cliente**, el trabajo anotado en ese albarán pasa a ser, a todos los efectos, trabajo de ese otro cliente: la aplicación resuelve a quién se factura mirando de quién es el vehículo **en el momento de emitir la factura**, no en el momento de abrir el albarán. Nadie avisa de nada. Corregir el vehículo dentro del mismo cliente sigue permitido, porque ahí no cambia quién paga.

**Confirmado en el sistema desplegado.** `DOC-24/BUG-002`, `critical`: el albarán 5, abierto sobre el vehículo 6 (cliente 12), se movió al vehículo 4 (cliente 8) sin aviso, y la factura resultante —114.835,05 €— se emitió al cliente 8.

**Migrado desde `docs/DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md`** (v2.2.0, `status: approved`), que usaba un formato propio fuera de `specs/`. El contenido no cambia en la migración; el historial completo de versiones (2.0.0 → 2.2.0) queda en ese fichero, conservado como registro.

---

## Alcance

**Dentro:**

- Al guardar la cabecera de un albarán pendiente, si el vehículo nuevo pertenece a un cliente distinto del actual, la operación se rechaza — vehículo, fecha y notas quedan como estaban, sin guardar nada a medias.
- El selector de vehículo del formulario de edición de la cabecera muestra solo los vehículos del cliente actual del albarán (decisión de negocio, 2026-08-17).
- Corregir el vehículo por otro **del mismo cliente** sigue funcionando exactamente igual que hoy, líneas y stock incluidos.
- Sobre un albarán ya facturado, el rechazo sigue siendo el de siempre («está facturado»), no el nuevo.

**Fuera de alcance (para specs futuros):**

- Elegir el vehículo al **crear** un albarán (`UC-ALB-02`) — no hay cliente del que mover el trabajo.
- Cambiar el cliente propietario de un vehículo (`UC-VEH-04`, REQ-015) — sigue permitido tal cual; es la misma fuga por otra puerta (ver PD-002 en Decisiones).
- Corregir el albarán 5 y la factura 114.835,05 € que dejó `BUG-002` en el sistema.
- Factura rectificativa o cualquier corrección de facturas ya emitidas (`Q-06`, `BUG-004`).
- Los evolutivos de `Q-02` (stock negativo, `BUG-001`) y `Q-12` (importes negativos, `BUG-003`) — mismo patrón, criterios de aceptación distintos, specs propios.
- Perfiles o permisos que permitan una excepción autorizada — la aplicación tiene un único actor sin restricciones (`ACT-01`).
- Registrar o auditar los intentos rechazados.

---

## Modelo de datos

Este spec no introduce ninguna estructura de datos nueva. Reutiliza el modelo existente de `albarans`, `vehicles` y `clients` (SPEC 02).

---

## Plan de implementación

*(Copiado de `docs/DOC-11-PLAN-IMPL-albara-canvi-client.md`, elaborado por `s04-plan-implementacion`. Sin punto de no retorno.)*

1. **Confirmar que la comprobación de servidor ya existe — no se escribe código.** `server/routes/albarans.js:95-104` ya rechaza con `409` un `PUT` que mueve el albarán al vehículo de un cliente distinto, en el orden correcto (después de comprobar existencia del albarán, que no esté facturado, y que el vehículo exista). Prueba manual: reproducir `DOC-24/BUG-002` contra el servidor en marcha — `PUT` a un vehículo de otro cliente devuelve `409`, no `200`; el resto de rechazos (vehículo inexistente, albarán facturado, cambio simultáneo de fecha/notas) siguen dando su motivo de siempre. Implementa AC-002, AC-004, AC-005, AC-006, AC-008, AC-009 y la mitad de servicio de AC-007.

2. **Ampliar el seed con un segundo vehículo (`DP-001`).** `server/db/seed.js` da hoy un vehículo por cliente. Añadir una segunda entrada en el array `vehicles` para `Anna Puig Ferrer` (`nif: '12345671A'`), cuyo primer vehículo ya abre un albarán pendiente en el seed — así no hace falta crear también el albarán. Prueba manual: `rm -f data/taller.db && npm run seed`; `SELECT client_id, COUNT(*) FROM vehicles GROUP BY client_id HAVING COUNT(*) > 1` devuelve exactamente una fila. Implementa AC-001 y AC-003 (el comportamiento ya existe; faltaba el dato para poder afirmarlo).

3. **Filtrar el selector de vehículo al editar un albarán.** Solo en la rama `isEdit === true` de `AlbaraForm.tsx` (la de creación no cambia — no hay cliente del que mover el trabajo): resolver el `client_id` del vehículo actual (patrón ya usado en `AlbaraDetail.tsx:32-42`) y sustituir `vehiclesService.list()` por `vehiclesService.listByClient(clientId)`, que ya existe en el servicio y en `GET /api/vehicles?client_id=`. Prueba manual: editar el albarán de Anna Puig Ferrer (del paso 2) muestra sus dos vehículos y ninguno más; editar un albarán de un cliente con un solo vehículo lo muestra ya seleccionado; el formulario de creación sigue ofreciendo la lista completa. Implementa AC-010, AC-011 y cierra la mitad de pantalla de AC-007.

---

## Criterios de aceptación

- [ ] **AC-001** — Con un cliente que tiene al menos dos vehículos: cambiar el vehículo de un albarán pendiente por otro del mismo cliente y guardar deja el albarán sobre el vehículo nuevo, pendiente de facturar, con fecha y notas intactas.
- [ ] **AC-010** — Con un cliente con al menos dos vehículos (y existiendo vehículos de otros clientes en el sistema): al editar la cabecera, el selector de vehículo muestra todos los del cliente actual y ninguno de otro cliente.
- [ ] **AC-011** (borde) — Con un cliente con exactamente un vehículo: el selector lo muestra seleccionado, no queda vacío, y guardar sigue funcionando.
- [ ] **AC-002** — Una petición que mueve el albarán al vehículo de otro cliente, aunque no se pueda componer desde el desplegable (vía servicio), se rechaza: el albarán sigue sobre su vehículo original y la respuesta explica el motivo.
- [ ] **AC-003** (borde) — Con líneas de pieza y mano de obra ya anotadas: cambiar el vehículo por otro del mismo cliente no toca ninguna línea, ni el stock, ni el importe.
- [ ] **AC-004** (borde) — Una petición que cambia el vehículo a otro cliente **y a la vez** la fecha o las notas no guarda nada de lo tres: ni vehículo, ni fecha, ni notas.
- [ ] **AC-005** (borde) — Guardar sin tocar el vehículo (o reseleccionando el mismo) funciona con normalidad, sin que aparezca el rechazo nuevo.
- [ ] **AC-006** (borde) — Sobre un albarán ya facturado, el intento de cambiar el vehículo se rechaza por estar facturado, con el mensaje de siempre — no con el mensaje nuevo de cambio de cliente.
- [ ] **AC-007** (borde) — Aun con el selector ya filtrando (AC-010), un cambio a vehículo de otro cliente que llegue sin pasar por el formulario se rechaza igual.
- [ ] **AC-008** (borde) — Tras un intento rechazado de mover el albarán a otro cliente, la factura que se emita después sale al cliente original.
- [ ] **AC-009** (borde) — Asignar un vehículo inexistente, o no informar ninguno, se rechaza por el motivo de siempre (REQ-027) — no por el motivo nuevo.

**Vía de comprobación.** AC-001, AC-010, AC-011, AC-003, AC-005 se comprueban por interfaz. AC-002, AC-004, AC-007, AC-009 solo son alcanzables por servicio — el selector filtrado ya no permite componer el intento desde pantalla. AC-006 y AC-008 son mixtos. Es una decisión ya tomada por `A-03` (`DOC-05/Q-18`, cerrada 2026-08-17): un caso va por servicio solo cuando el vector no existe en la interfaz.

**Datos que exigen los criterios.** El seed actual (`server/db/seed.js`) da un vehículo por cliente, lo que deja AC-001 no reproducible y AC-010 indistinguible de AC-011. Antes de implementar hace falta: un cliente con **al menos dos** vehículos, uno con un albarán pendiente (para AC-001, AC-003, AC-005, AC-010); vehículos de **otro cliente** distinto, existentes a la vez (para AC-010, AC-002, AC-004, AC-006, AC-007, AC-008); y un cliente con **exactamente un** vehículo, que ya lo da el seed de hoy (para AC-011).

---

## Decisiones

- **Sí:** el selector de vehículo **filtra** — solo muestra los del cliente actual del albarán. No se muestran todos para rechazar después. *(Negocio, 2026-08-17)*
- **Sí:** el rechazo al guardar existe **además** del filtro, no en su lugar. `BUG-002` no entró por el desplegable — entró por el servicio, con el formulario fuera de la ecuación — y un filtro de pantalla sin comprobación detrás deja el defecto exactamente donde está.
- **No:** ningún camino para conservar las líneas de un albarán abierto por error al vehículo de otro cliente. Hoy la única corrección es borrar el albarán y volver a abrirlo (REQ-041). Si el taller necesita conservarlas, es otro spec.
- **No:** tocar qué pasa cuando un vehículo cambia de propietario de verdad (venta del coche). Es la misma fuga por otra puerta, pero con criterios de aceptación distintos.

**Pendiente — no bloquea `Approved`:**

- **PD-002** — Qué debe pasar cuando un vehículo cambia de dueño de verdad y tiene albaranes pendientes: ¿se impide también, se avisa, o hay que poder dejar el trabajo ya hecho con el dueño anterior? Dueño: negocio, vía pregunta abierta nueva en `DOC-04`. Mientras esté abierta, «un albarán ya no puede cambiar de cliente» es cierto solo por la puerta del albarán, no por la del vehículo.
- **PD-003** — ¿Le vale al taller borrar y volver a abrir el albarán cuando se equivoca de cliente, o quiere un camino que conserve las líneas? Dueño: peticionario de negocio. Si la respuesta es conservar las líneas, es otro spec.

---

## Riesgos identificados

| Riesgo | Mitigación |
| --- | --- |
| `AlbaraForm` sirve a la vez para crear y editar; el filtro de AC-010 solo debe aplicarse al editar | Crear un albarán queda fuera de alcance — no hay cliente del que mover el trabajo. Cuidado al implementar: extender el filtro al alta, o retirarlo de la edición, no daría ningún error visible |
| Si la comprobación se coloca en el orden equivocado dentro del `PUT`, el cambio se rechaza igual pero con el motivo equivocado | AC-006 y AC-009 exigen explícitamente el motivo correcto, no solo el rechazo — verificarlo cierra este riesgo |
| La atomicidad que exige AC-004 depende hoy de que el guardado sea un único `UPDATE` sin transacción explícita | Si el guardado deja de ser una sola sentencia, hace falta una transacción real para seguir cumpliendo AC-004 |
| El mensaje de rechazo heredará la convención ya existente: literales en catalán fijo, bajo el campo de vehículo sea cual sea el motivo real | Aceptado como decidido-por-omisión; no bloquea ningún criterio |
| El mismo patrón (regla duplicada en pantalla y en servidor) ya ha divergido una vez en este proyecto (REQ-046 / TC-064) sin que nada fallara | AC-007 existe específicamente para que filtrar el desplegable no se dé por implementación terminada |

---

## Qué **no** hay en este spec

- Elegir vehículo al crear un albarán.
- Cambiar el propietario de un vehículo.
- Corrección de datos ya viciados por `BUG-002`.
- Factura rectificativa.
- Los evolutivos de stock e importes negativos (`Q-02`, `Q-12`).
- Excepciones por perfil o registro de intentos rechazados.

Cada uno de estos puntos, si llega, va en un spec futuro.
