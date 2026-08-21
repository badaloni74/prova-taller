# DOC-23 · Informe de la prueba acotada de S-10

**Fecha:** 2026-08-16 · **Alcance:** 4 casos de DOC-05 (módulo `albarans`) + 1 caso ausente
**Entorno:** local (`localhost:5173` / `localhost:3001`), Java 21, Selenium 4.24, Cucumber 7.18.1, TestNG 7.10.2

## Resultado

```
5 Scenarios (3 passed, 2 failed)
69 Steps  (52 passed, 2 failed, 15 skipped)
```

| Caso | Origen | Resultado | Significado |
|---|---|---|---|
| TC-034 | DOC-05 | **verde** | — |
| TC-040 | DOC-05 | **verde** | — |
| TC-042 | DOC-05 | **verde** | — |
| TC-048 | DOC-05 | **rojo** | Contaminación entre escenarios, no defecto de la aplicación. Verde en ejecución aislada. |
| TC-900 | **no existe en DOC-05** | **rojo** | **BUG-001 confirmado por prueba automatizada.** |

**Estado del catálogo al terminar la suite: stock −966.** La propia ejecución de las pruebas dejó el sistema en un estado imposible, porque TC-900 consume 999 unidades de una pieza que tiene 35 y nada lo impide.

## Hallazgo principal: el plan de pruebas no puede detectar los defectos del sistema que documenta

Los cuatro casos que vienen de DOC-05 pasan —o fallan por motivos ajenos al defecto— sobre una aplicación con dos bugs críticos confirmados. El único caso que se pone rojo es el que **no existe en DOC-05**.

La cadena es fiel y ninguna pieza se equivocó:

1. **S-01** leyó `albarans.js:168` y documentó que el stock se descuenta. Es lo que el código hace.
2. **A-02** derivó REQ-035 de esa lectura y **levantó Q-02** preguntando si la ausencia de comprobación era intencionada.
3. **A-03** escribió casos de REQ-035: TC-048 comprueba el descuento (35→32) y TC-049 el rechazo por cantidad cero. Ninguno prueba existencias insuficientes, porque el requisito no lo enuncia.

**La documentación AS-IS no puede generar pruebas que encuentren defectos en el AS-IS.** El defecto solo es visible como pregunta abierta, nunca como caso en rojo. Búsqueda en todo DOC-05: cero casos sobre estoc insuficiente.

**Consecuencia para el despliegue:** la cobertura al 100 % y la métrica «% de requisitos con prueba ejecutada y verde» pueden estar ambas al máximo sobre un sistema lleno de defectos. Presentar ese dato a un comité sin este matiz sería engañoso.

## Sobre la afirmación de que S-10 es transformación y no interpretación

El PDF sostiene que el bloque YAML de DOC-05 «es literalmente la estructura de un escenario Cucumber» y que generar los `.feature` es transformación. **No se cumple.**

```
DOC-05  input: Abrir la ficha del vehículo 5678DEF y pulsar Nuevo albarán
               desde su apartado de albaranes
```

Un solo `input` contiene tres acciones atómicas y ningún tipo de elemento. Convertirlo exige descomponer la prosa, inferir si `5678DEF` es enlace o botón, y deducir las transiciones de pantalla. La estructura coincide al nivel de la lista (steps ↔ When/Then), no al del contenido de cada paso.

Esto **no invalida S-10**, que el registro ya clasifica como SKILL —IA acotada— y no como SCRIPT. Lo que sobra es la frase justificativa y la casilla «decisión que resuelve: ninguna desde el bloque YAML». Sí resuelve una: cómo descomponer prosa en acciones tipadas.

Tampoco se arregla subiendo el contrato aguas arriba como se hizo con S-07: exigir a A-03 que emita `Tipo: Valor` acoplaría el plan de pruebas a la interfaz, y DOC-05 va a Rally, donde lo ejecutan personas. `Boton: Añadir línea` es ruido para un QA humano.

**Lo que falta es una pieza que el registro no prevé:** un diccionario de mapeo por proyecto (nombre funcional de pantalla y elemento → localizador real). Sin él, cada regeneración vuelve a interpretar la prosa desde cero y puede producir features distintos.

## Defectos encontrados en el código generado

Los cuatro aparecieron ejecutando contra la aplicación real, no revisando el código.

| # | Defecto | Causa |
|---|---|---|
| 1 | `DuplicateStepDefinition` | Se anotó cada método con `@Cuando` **y** `@Entonces`. En Gherkin las palabras clave son intercambiables: un patrón se anota una sola vez. |
| 2 | `TimeoutException` en «Nuevo albarán» | Se asumió `<a>` y es `<button>`. Suposición sobre el DOM sin verificar. |
| 3 | `InvalidSelectorException` en `Filtre d'aire` | El apóstrofo cierra la cadena XPath. Resuelto con un helper `xq()` que usa comillas dobles o `concat()`. |
| 4 | Flake al seleccionar pieza | Se esperaba al `<select>` pero no a sus opciones, que llegan de un `fetch`. Pasaba en suite completa y fallaba en ejecución aislada. |

El 2 y el 3 son exactamente el «problema duro de los selectores» que el registro anuncia. El 4 es peor que un fallo: es un fallo intermitente que depende del orden de ejecución.

## Datos de prueba: DOC-05 referencia lo que no existe

TC-048 dice `FIL-001` con stock 40. **Esa pieza no existe.** Los datos concretos de DOC-05 deberían anclarse en DOC-13, que genera S-06 — y S-06 nunca se ha ejecutado. Se adaptó a la pieza real del seed.

Además, **los escenarios no son independientes**: TC-040 consume 2 unidades antes de que TC-048 compruebe el stock inicial. No hay setup ni teardown, y el plan asume un estado inicial que nada garantiza.

## Convención adoptada: `Esquema del escenario` para todo dato concreto

Todo valor a pinyón fijo —matrícula, nombre de pieza, cantidad, stock, NIF— va como variable en la tabla `Ejemplos`, nunca incrustado en el paso. Un escenario sin dato propio puede seguir siendo `Escenario`; en cuanto tiene uno, pasa a `Esquema del escenario`.

Ventajas comprobadas aquí: cambiar de dataset es cambiar una fila y no reescribir el escenario, los datos quedan visibles en un solo sitio al final del caso, y añadir una variante es añadir una línea. Es también lo que permitirá enganchar DOC-13 cuando S-06 se ejecute: la tabla `Ejemplos` es el punto de anclaje natural.

## Qué queda pendiente

1. **Aislar los escenarios** — setup y teardown por escenario, o datos propios por caso.
2. **Los 23 casos restantes** de `albarans`, ahora que el framework está validado.
3. **El diccionario de mapeo** pantalla/elemento → localizador, hoy repartido por las PO.
4. **Ejecutar S-06** para que DOC-13 ancle los datos de las tablas `Ejemplos`.
5. **I-03** — subir los resultados a Rally. Sin entorno Rally, no aplicable hoy.
