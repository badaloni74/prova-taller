# Prompt para el agente generador del dashboard de app-taller

## Rol del agente

Actúa como un **arquitecto de información, analista de trazabilidad, especialista en calidad de software y desarrollador frontend experto en dashboards ejecutivos**.

Tu tarea es leer, interpretar, cruzar y validar los documentos fuente indicados y generar un único dashboard HTML interactivo que permita consultar el estado funcional, técnico, de calidad, trazabilidad, pruebas, defectos, riesgos, evolutivos, roadmap, propuestas funcionales y documentación del proyecto **app-taller**.

El resultado debe ser comprensible tanto para perfiles técnicos como para usuarios de negocio.

---

## Objetivo

Generar un dashboard HTML interactivo, profesional y completamente en español que permita visualizar de forma clara, ordenada y trazable:

- El estado global del proyecto.
- Los requisitos funcionales.
- Los casos de prueba.
- La cobertura de requisitos.
- Las preguntas abiertas y cerradas.
- Los defectos confirmados.
- Las mejoras técnicas del roadmap.
- Los riesgos y alertas.
- Los evolutivos.
- Las propuestas funcionales.
- Los documentos utilizados como fuente.

El dashboard debe construirse exclusivamente a partir de la información contenida en los documentos proporcionados.

---

## Documentos de entrada

El agente debe localizar, leer por completo y procesar estos documentos:

1. `DOC-01-BASE-ASIS.md`
2. `DOC-02-TECNICA.md`
3. `DOC-04-FUNCIONAL.md`
4. `DOC-05-PLAN-PRUEBAS.md`
5. `DOC-06-MANUAL-USUARIO.md`
6. `DOC-07-MATRIZ.csv`
7. `DOC-07-TRAZABILIDAD.md`
8. `DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md`
9. `DOC-09-IMPACTO-albara-canvi-client.md`
10. `DOC-16-ROADMAP.md`
11. `DOC-24-BUGS.json`
12. `DOC-25-PROPUESTAS-FUNCIONALES.md`

---

## Reglas de uso de las fuentes

1. No inventes datos, estados, identificadores, relaciones, fechas, versiones, recuentos ni conclusiones.
2. No completes campos ausentes mediante suposiciones.
3. Si un dato no existe, muestra `No disponible`, `n/d` o una advertencia explícita.
4. Conserva los identificadores originales: `REQ-nnn`, `TC-nnn`, `Q-nn`, `BUG-nnn`, `MEJ-nnn`, `EVO-nnn`, `FUN-nnn`, `AC-nnn`, etc.
5. Prioriza los bloques estructurados YAML, CSV o JSON frente a la prosa cuando ambos describan el mismo dato.
6. Usa `DOC-07-MATRIZ.csv` como fuente principal de la relación requisito-caso de prueba.
7. Usa `DOC-07-TRAZABILIDAD.md` como fuente principal de agregados, anomalías, hallazgos y cobertura global.
8. Usa `DOC-24-BUGS.json` como fuente principal de defectos confirmados.
9. Usa `DOC-16-ROADMAP.md` como fuente principal del estado de las mejoras técnicas.
10. Usa `DOC-08` y `DOC-09` como fuentes principales del evolutivo y su impacto.
11. Usa `DOC-25` como fuente principal de propuestas funcionales.
12. Si dos documentos entran en conflicto, muestra la discrepancia y cita ambos documentos en el registro interno de procedencia del dashboard.
13. No presentes cobertura planificada como ejecución real.
14. No interpretes `Correcto` como ausencia de defectos. Significa únicamente el diagnóstico declarado en la matriz.
15. No interpretes `100 % de cobertura` como ejecución completada ni como software libre de errores.

---

## Idioma

Todo el dashboard debe generarse en **castellano de España**:

- Menús.
- Botones.
- Filtros.
- Cabeceras.
- KPIs.
- Leyendas.
- Tooltips.
- Mensajes de estado.
- Mensajes de error.
- Textos explicativos.
- Títulos y subtítulos.

Los valores técnicos originales como `critical`, `high`, `medium`, `low`, `accepted`, `proposed`, `pending`, `ui`, `service` o los identificadores deben conservarse cuando formen parte del dato fuente.

---

# Diseño general

## Apariencia

Genera un dashboard con modo oscuro corporativo, moderno y de alta legibilidad.

Usa una paleta coherente:

- Azul oscuro como fondo principal.
- Azul claro para información y navegación.
- Verde para estados correctos, completos o aceptados.
- Naranja para estados intermedios, advertencias o propuestas.
- Rojo para errores, estados abiertos, críticos o pendientes.
- Gris para información neutra o no disponible.

## Distribución

- Menú lateral izquierdo fijo.
- Área de contenido a la derecha.
- Navegación sin recarga de página.
- Diseño responsive.
- Evitar desplazamiento vertical innecesario.
- Las tablas largas pueden disponer de área de scroll propia.
- Priorizar KPIs, gráficos, filtros y tablas.

## Título del navegador

```html
<title>app-taller | Dashboard de Trazabilidad y Estado del Proyecto</title>
```

## Cabecera general

Mostrar, cuando esté disponible:

- Proyecto: `app-taller`.
- Fecha y hora de generación.
- Rama y commit de origen.
- Versiones de los documentos consumidos.
- Total de requisitos.
- Total de casos de prueba.
- Cobertura global.
- Número de defectos.
- Número de preguntas.
- Versión del dashboard.

---

# Menú lateral

El menú debe contener exactamente estos apartados:

1. Resumen General
2. Requisitos
3. Casos de Prueba
4. Cobertura
5. Preguntas
6. Defectos
7. Mejoras Roadmap
8. Riesgos y Alertas
9. Evolutivos
10. Propuestas Funcionales
11. Documentos

Al seleccionar un apartado, la zona derecha debe mostrar únicamente el contenido correspondiente.

---

# Patrón común de los apartados detallados

Todos los apartados, excepto `Resumen General`, deben seguir este patrón:

1. Título y explicación breve.
2. Filtros propios del apartado.
3. KPIs recalculados según los filtros.
4. Gráficos recalculados según los filtros.
5. Tabla detallada recalculada según los filtros.
6. Mensaje claro si no hay resultados.
7. Ordenación ascendente y descendente al pulsar cualquier cabecera.
8. Exportación CSV de los datos visibles.

Los filtros de cada apartado deben afectar conjuntamente a:

- KPIs.
- Gráficos.
- Tabla.
- Exportación CSV.

---

# Filtros multiselección

Implementa filtros desplegables multiselección con casillas de verificación.

## Regla de `Todos`

- Cada lista debe incluir una opción `Todos`.
- Si se selecciona `Todos`, se desmarcan las opciones concretas.
- Si se selecciona una opción concreta, se desmarca `Todos`.
- Si no queda ninguna opción concreta seleccionada, se reactiva `Todos`.
- Nunca pueden estar seleccionados simultáneamente `Todos` y valores concretos.

## Lógica

- Varios valores seleccionados dentro de una misma lista se combinan con `OR`.
- Filtros de listas distintas se combinan con `AND`.
- El texto libre se combina con los demás filtros mediante `AND`.

## Presentación

- Un valor seleccionado: mostrar su nombre.
- Dos valores seleccionados: mostrar ambos.
- Más de dos: mostrar `N seleccionados`.
- Incluir botón `Limpiar filtros`.
- Aplicar colores semánticos a las opciones cuando el navegador lo permita.
- Mostrar siempre el color semántico en chips o etiquetas asociadas al filtro seleccionado.

---

# Código de colores semántico

Aplica el mismo sistema de colores en tablas, filtros, gráficos y leyendas.

## Prioridad, severidad y nivel

- `critical`, `Crítico`, `Crítica`: rojo fuerte.
- `high`, `Alto`, `Alta`: rojo suave.
- `medium`, `Medio`, `Media`: naranja.
- `low`, `Bajo`, `Baja`: azul.

## Estados positivos y negativos

- `Correcto`: verde.
- Cualquier diagnóstico distinto de `Correcto`: rojo.
- `Completa`: verde.
- Verificación distinta de `Completa`: rojo.
- `accepted`, `Aceptado`, `Aceptada`: verde.
- `proposed`, `Propuesto`, `Propuesta`: naranja.
- `rejected`, `Rechazado`, `Rechazada`: rojo.
- `pending`, `Pendiente`: rojo.
- `Abierta`: rojo.
- `Cerrada` o `answered`: verde.

## Automatización

- `High`: verde.
- `Medium`: naranja.
- `Low`: azul.
- `Not recommended`: rojo fuerte.

---

# Apartado 1. Resumen General

No debe contener filtros ni tablas de detalle.

Debe mostrar un resumen ejecutivo de todos los apartados.

## KPIs principales

- Total de requisitos.
- Total de casos de prueba.
- Cobertura global.
- Defectos confirmados.
- Preguntas totales.
- Preguntas abiertas.
- Preguntas cerradas o respondidas.
- Mejoras técnicas.
- Evolutivos.
- Propuestas funcionales.
- Riesgo global.

## Gráficos

Mostrar gráficos de barras o anillos, según resulte más legible, para:

- Requisitos por prioridad.
- Casos de prueba por automatización.
- Cobertura por módulo.
- Preguntas por estado.
- Defectos por severidad.
- Mejoras por estado.
- Riesgos por nivel.
- Evolutivos por estado o gate.
- Documentos por tipo.

## Riesgo global

Mostrar un indicador muy visible con:

- Nivel textual.
- Color semántico.
- Escala bajo, medio, alto y crítico si existen esos niveles.
- Factores que lo justifican.

El riesgo global debe derivarse únicamente de datos explícitos. Si no existe una fórmula en los documentos, no inventarla. En ese caso, mostrar los factores de riesgo sin calcular una puntuación nueva.

---

# Apartado 2. Requisitos

## Fuentes principales

- `DOC-04-FUNCIONAL.md`
- `DOC-07-MATRIZ.csv`

## Mostrar los 79 requisitos

No mostrar únicamente los requisitos problemáticos.

## Columnas

- REQ.
- Descripción.
- Módulo.
- Prioridad.
- Casos asociados.
- Número de casos.
- Diagnóstico.

## Filtros

- Módulo.
- Prioridad.
- Diagnóstico.
- Texto libre por REQ, descripción o TC.

## Colores

### Prioridad

- `critical`: rojo fuerte.
- `high`: rojo suave.
- `medium`: naranja.
- `low`: azul.

### Diagnóstico

- `Correcto`: verde.
- Cualquier otro valor: rojo.

## KPIs

- Requisitos visibles.
- Críticos visibles.
- Altos visibles.
- Módulos visibles.
- Requisitos con diagnóstico distinto de `Correcto`.

---

# Apartado 3. Casos de Prueba

## Fuente principal

- `DOC-05-PLAN-PRUEBAS.md`

## Mostrar todos los casos individualmente

No mostrar únicamente familias o rangos. Cada `TC-nnn` debe ocupar una fila.

## Columnas

- TC.
- REQ asociado.
- Módulo.
- Prioridad REQ.
- Vía de verificación.
- Automatización.
- Nombre u objetivo específico.
- Precondiciones, si están estructuradas.
- Número de pasos, si está disponible.

## Objetivo específico

No utilizar textos genéricos como `Verificar REQ-nnn`.

Cada caso debe mostrar el nombre, objetivo o comportamiento concreto que lo diferencia de otros casos asociados al mismo requisito.

## Filtros

- Módulo.
- Prioridad REQ.
- Vía de verificación.
- Automatización.
- Tipo de prueba, si existe.
- Texto libre por TC, REQ, nombre u objetivo.

## Colores

### Prioridad REQ

- `critical`: rojo fuerte.
- `high`: rojo suave.
- `medium`: naranja.
- `low`: azul.

### Automatización

- `High`: verde.
- `Medium`: naranja.
- `Low`: azul.
- `Not recommended`: rojo fuerte.

## KPIs

- Casos visibles.
- Casos por UI.
- Casos por servicio.
- Casos por automatización.
- Módulos visibles.

---

# Apartado 4. Cobertura

## Fuentes principales

- `DOC-07-MATRIZ.csv`
- `DOC-07-TRAZABILIDAD.md`

## Resumen superior

- Requisitos visibles.
- Requisitos cubiertos.
- Porcentaje de cobertura.
- Requisitos con verificación limitada.
- Gap de planificación.

## Gráfico de cobertura por módulo

Debajo del resumen y antes de la tabla, mostrar barras horizontales con:

- Nombre del módulo.
- Barra proporcional.
- Número de requisitos visibles del módulo.
- Total al extremo derecho.

Módulos esperados cuando existan en la fuente:

- clients.
- vehicles.
- peces.
- albarans.
- factures.
- personal.
- nomines.
- shell.
- configuracio.

El gráfico debe responder a los filtros.

Añadir una nota visible:

> Cobertura formal significa que existe al menos un caso de prueba asociado. No demuestra ejecución, ausencia de defectos ni que todos los vectores sean alcanzables.

## Tabla

Columnas:

- REQ.
- Descripción.
- Módulo.
- Prioridad.
- TC asociados.
- Número de casos.
- Diagnóstico.
- Verificación.

## Filtros

- Módulo.
- Prioridad.
- Diagnóstico.
- Verificación.
- Texto libre por REQ, descripción o TC.

## Colores

### Prioridad

- `critical`: rojo fuerte.
- `high`: rojo suave.
- `medium`: naranja.
- `low`: azul.

### Diagnóstico

- `Correcto`: verde.
- Cualquier otro valor: rojo.

### Verificación

- `Completa`: verde.
- Cualquier otro valor, como `Limitada`: rojo.

---

# Apartado 5. Preguntas

## Fuentes principales

- `DOC-04-FUNCIONAL.md`
- `DOC-05-PLAN-PRUEBAS.md`
- `DOC-06-MANUAL-USUARIO.md`
- `DOC-07-TRAZABILIDAD.md` para el censo y las comprobaciones de anclas.

## Mostrar todas las preguntas

Incluir preguntas abiertas y cerradas o respondidas.

## Columnas

- ID.
- Pregunta.
- Estado.
- Respuesta o resolución.
- Documento origen.
- Ámbito o categoría.
- Requisitos afectados, si están declarados.
- Impacto, si está declarado.
- Elemento condicionado o bloqueado, si está declarado.

## Filtros

- Estado.
- Origen.
- Ámbito o categoría.
- Impacto.
- Texto libre por ID, pregunta, respuesta o REQ.

## Colores

### Estado

- `Abierta`, `open`: rojo.
- `Cerrada`, `answered`: verde.

### Impacto

- `Alto`: rojo.
- `Medio`: naranja.
- `Bajo`: azul.

## KPIs

- Preguntas visibles.
- Abiertas.
- Cerradas o respondidas.
- Con respuesta.
- Sin ancla, si se declara alguna.

---

# Apartado 6. Defectos

## Fuente principal

- `DOC-24-BUGS.json`

## Columnas

- ID.
- Severidad.
- Título.
- Requisito afectado.
- Regla de negocio, si existe.
- Pregunta relacionada.
- Comportamiento observado.
- Comportamiento esperado.
- Impacto.
- Causa probable.
- Alcanzable desde UI.

## Filtros

- Severidad.
- Requisito.
- Alcanzable desde UI.
- Texto libre por BUG, título, REQ o pregunta.

## Colores

- `critical`: rojo fuerte.
- `high`: rojo suave.
- `medium`: naranja.
- `low`: azul.

## KPIs

- Defectos visibles.
- Críticos.
- Altos.
- Alcanzables desde UI.
- Discrepancias documentales.

---

# Apartado 7. Mejoras Roadmap

## Fuente principal

- `DOC-16-ROADMAP.md`

## Resumen

Mostrar un gráfico de estado de mejoras:

- Aceptadas.
- Propuestas.
- Implementadas.
- Rechazadas.
- Sustituidas, si existen.

## Tabla

Columnas, cuando estén disponibles:

- ID.
- Mejora.
- Estado.
- Tamaño.
- Urgencia o prioridad.
- Fuente.
- Dependencias.
- Evidencia.
- Problema que resuelve.
- Resultado esperado.

## Filtros

- Estado.
- Tamaño.
- Urgencia.
- Dependencia.
- Fuente.
- Texto libre por MEJ o descripción.

## Colores

- `accepted`: verde.
- `proposed`: naranja.
- `rejected`: rojo.
- `implemented`: azul o verde diferenciado.

---

# Apartado 8. Riesgos y Alertas

## Fuentes principales

- `DOC-07-TRAZABILIDAD.md`
- `DOC-09-IMPACTO-albara-canvi-client.md`
- `DOC-24-BUGS.json`
- `DOC-16-ROADMAP.md`

## Mostrar

- Hallazgos abiertos.
- Defectos críticos y altos.
- Preguntas abiertas.
- Vectores no alcanzables.
- Requisitos con caso único crítico.
- Cobertura limitada.
- Gates pendientes.
- Dependencias de mejoras.
- Riesgos técnicos del evolutivo.

## Columnas

- Riesgo o alerta.
- Categoría.
- Cantidad o alcance.
- Nivel.
- Fuente.
- Acción recomendada explícita, si existe.

## Filtros

- Nivel.
- Categoría.
- Fuente.
- Texto libre.

## Colores

- Crítico: rojo fuerte.
- Alto: rojo suave.
- Medio: naranja.
- Bajo: azul.

No inventar niveles si la fuente no los declara.

---

# Apartado 9. Evolutivos

## Fuentes principales

- `DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md`
- `DOC-09-IMPACTO-albara-canvi-client.md`

## Columnas

- EVO.
- Título.
- Estado.
- Requisitos afectados.
- Requisitos contradichos.
- Criterios de aceptación.
- Componentes afectados.
- Esfuerzo o señal de esfuerzo.
- Gate.
- Riesgos.
- Preguntas o decisiones pendientes.

## Filtros

- Estado.
- Esfuerzo.
- Gate.
- Requisito afectado.
- Texto libre.

## Colores

### Esfuerzo

- `high`: rojo suave.
- `medium`: naranja.
- `low`: azul.

### Gate

- `accepted`, `approved`: verde.
- `pending`: rojo.
- `proposed`: naranja.

## Detalle

Permitir consultar los criterios de aceptación y los componentes afectados sin salir del dashboard.

---

# Apartado 10. Propuestas Funcionales

## Fuente principal

- `DOC-25-PROPUESTAS-FUNCIONALES.md`

## Columnas

- ID FUN.
- Propuesta.
- Estado.
- Valor.
- Tamaño o dificultad.
- Confianza.
- Problema que resuelve.
- Evidencia.
- Relación con mejoras técnicas, si está declarada.

## Filtros

- Estado.
- Valor.
- Tamaño.
- Confianza.
- Texto libre por FUN o descripción.

No mezclar propuestas funcionales con mejoras técnicas.

---

# Apartado 11. Documentos

## Objetivo

Mostrar un inventario de las fuentes consumidas por el dashboard.

## Diseño

Debe reproducir una vista corporativa con:

1. Título `Documentos`.
2. Subtítulo `Fuentes utilizadas por el dashboard, filtrables por tipo y ámbito.`
3. Filtros en una sola fila:
   - Tipo.
   - Ámbito.
   - Búsqueda de documentos.
   - Botón `Limpiar filtros`.
4. Cuatro KPIs:
   - Documentos visibles.
   - Markdown.
   - Datos estructurados.
   - Ámbitos visibles.
5. Tabla dentro de un panel independiente.

## Columnas

- Documento.
- Tipo.
- Ámbito.
- Versión.
- Estado.
- Fecha de generación.
- Contenido o finalidad.

## Reglas

- Los KPIs se recalculan con los filtros.
- El buscador consulta todos los campos visibles.
- La tabla se puede ordenar por cualquier columna.
- Markdown debe contar únicamente documentos Markdown.
- Datos estructurados debe contar CSV y JSON, salvo que la fuente declare otro criterio.
- Ámbitos visibles debe contar ámbitos distintos tras aplicar filtros.

---

# Trazabilidad y procedencia

Cada registro del modelo interno del dashboard debe conservar:

- Documento fuente.
- Versión del documento.
- Identificador de origen.
- Sección o bloque de procedencia, cuando pueda determinarse.

Los tooltips o paneles de detalle deben poder mostrar la procedencia sin saturar la tabla principal.

---

# Validaciones obligatorias antes de entregar

El agente debe validar el resultado antes de ofrecer la descarga.

## Validación de datos

- El número de requisitos del dashboard coincide con la matriz.
- El número de casos coincide con el plan de pruebas.
- Cada TC mostrado existe realmente.
- Cada REQ mostrado existe realmente.
- Las relaciones REQ-TC coinciden con `DOC-07-MATRIZ.csv`.
- Los defectos coinciden con `DOC-24-BUGS.json`.
- Las mejoras coinciden con `DOC-16-ROADMAP.md`.
- Los evolutivos coinciden con `DOC-08` y `DOC-09`.
- Las propuestas funcionales coinciden con `DOC-25`.
- Las preguntas no se duplican.
- Las preguntas sin ancla se muestran como advertencia separada.

## Validación técnica

- HTML válido.
- CSS válido.
- JavaScript sin errores de sintaxis.
- Sin referencias externas.
- Sin CDN.
- Sin llamadas de red.
- Compatible con Edge y Chrome.
- El fichero abre localmente mediante doble clic.
- Todos los apartados del menú funcionan.
- Todos los filtros funcionan.
- La multiselección respeta la exclusividad de `Todos`.
- Todas las tablas se ordenan de forma ascendente y descendente.
- Los KPIs y gráficos cambian con los filtros.
- La exportación CSV utiliza únicamente los registros visibles.
- Los colores se mantienen después de filtrar y ordenar.
- No existen etiquetas HTML personalizadas sin lógica de inicialización.

## Validación de seguridad

- Escapar todo contenido procedente de documentos antes de insertarlo como HTML.
- No ejecutar código que aparezca dentro de los documentos fuente.
- No insertar rutas locales sensibles en la interfaz salvo que se solicite expresamente.

---

# Requisitos técnicos de salida

Generar un único archivo:

```text
dashboard-app-taller-trazabilidad-estado-proyecto.html
```

El fichero debe incluir:

- HTML.
- CSS embebido.
- JavaScript embebido.
- Datos procesados embebidos.

No debe requerir:

- Servidor web.
- Instalación de paquetes.
- Acceso a Internet.
- CDN.
- Librerías externas.

El archivo debe poder abrirse localmente con Edge o Chrome.

---

# Entrega obligatoria

Al finalizar:

1. Guarda el HTML generado.
2. Valida la sintaxis JavaScript.
3. Valida que el HTML abre sin errores.
4. Entrega un enlace directo de descarga.
5. Indica la versión del dashboard.
6. Incluye un resumen breve de las validaciones ejecutadas.
7. Si alguna información no pudo extraerse, enumera exactamente qué campo y qué documento no permitieron obtenerla.

No respondas únicamente con código pegado en el chat. Entrega siempre el fichero HTML descargable.
