# Resumen de `docs/`

Qué es cada fichero de esta carpeta, en una explicación breve y sin
jerga, y qué agente o skill lo genera. Ordenado por nombre de fichero.
No incluye los ficheros `-HIST.md` (el historial de versiones de cada
documento, siempre junto a su documento principal).

Este resumen no forma parte del canon `DOC-nn` — ningún skill lo
regenera automáticamente; se actualiza a mano cuando aparece o
desaparece algún fichero de `docs/`.

| Fichero | Qué es | Lo crea |
|---|---|---|
| `DOC-01-BASE-ASIS.md` | Qué hace la aplicación contado en lenguaje de negocio: para qué sirve, quién la usa, qué se puede hacer con ella y qué reglas sigue. Sin tecnicismos. | Skill `skill-doc-base` (S-01) |
| `DOC-02-TECNICA.md` | La misma base que DOC-01 pero contada en términos técnicos: con qué está hecha la aplicación, cómo está organizada por dentro, su modelo de datos y qué pruebas existen ya en el código. | Skill `skill-doc-base` (S-01) |
| `DOC-04-FUNCIONAL.md` | Convierte DOC-01 en una lista numerada de requisitos (`REQ-nnn`). Es el documento del que cuelga todo lo demás: pruebas, manual, trazabilidad. | Agente `a02-funcional` (A-02) |
| `DOC-05-PLAN-PRUEBAS.md` | El plan de pruebas: qué casos de prueba (`TC-nnn`) hay que comprobar para verificar que cada requisito de DOC-04 funciona de verdad. | Agente `a03-pruebas` (A-03) |
| `DOC-06-MANUAL-USUARIO.md` | El manual para la persona que usa la aplicación sin saber programar, organizado por tareas reales ("cómo doy de alta un cliente"), no por menús. | Agente `a04-manual` (A-04) |
| `DOC-07-MATRIZ.csv` | Una tabla exportable que cruza cada requisito con los casos de prueba que lo cubren — pensada para abrir en una hoja de cálculo, no para leer como texto. | Skill `s14-matriz-trazabilidad` (S-14) |
| `DOC-07-TRAZABILIDAD.md` | La misma información que la matriz, pero contada: qué requisitos no tienen ninguna prueba, cuánta cobertura hay y qué riesgos deja eso. | Agente `a05-trazabilidad` (A-05) |
| `DOC-08-ESPEC-EVOLUTIVO-albara-canvi-client.md` | **Retirado.** Era el formato antiguo para especificar un cambio de negocio sobre la aplicación ya construida. Su contenido se migró a `specs/SPE-06-albara-canvi-client.md`; se conserva aquí solo como registro histórico, nadie lo actualiza ya. | Antes: agente `a06-refinamiento` (A-06, retirado) — ahora los cambios de este tipo se escriben con `/spec` |
| `DOC-09-IMPACTO-albara-canvi-client.md` | Analiza qué partes de la aplicación tocaría el cambio "un albarán no puede cambiar de cliente" (`EVO-001`), antes de estimarlo o planificarlo. | Agente `a07-impacto` (A-07) |
| `DOC-10-ESTIMACION-albara-canvi-client.md` | Estima cuánto esfuerzo (en jornadas) llevaría implementar ese mismo cambio. | Agente `a08-estimacion` (A-08) |
| `DOC-11-PLAN-IMPL-albara-canvi-client.md` | El plan paso a paso para implementar ese cambio: qué archivos tocar, en qué orden y qué queda fuera. | Skill `s04-plan-implementacion` (S-04) |
| `DOC-12-REGRESION-albara-canvi-client.md` | Decide qué casos de prueba ya existentes hay que volver a pasar para asegurarse de que ese cambio no rompe otra cosa. | Agente `a09-regresion` (A-09) |
| `DOC-14-EXPLORATORIO.md` | El informe de alguien que navega la aplicación real probando cosas sin guion, buscando fallos que las pruebas automatizadas no pillan — tanto de funcionamiento como de aspecto visual. | Agente `a10-explorador` (A-10) |
| `DOC-16-ROADMAP.md` | Propuestas de mejora técnica (limpiar código, arreglar deuda técnica) ordenadas por lo que más conviene hacer primero. No es funcionalidad nueva, es mantenimiento. | Agente `a12-roadmap` (A-12) |
| `DOC-23-INFORME.md` | El resultado de ejecutar toda la suite de pruebas automatizadas: cuántas han pasado, cuáles han fallado y por qué. | Skill `s10-auto-tcs` (S-10) |
| `DOC-24-BUGS.json` | El listado de fallos confirmados en la aplicación, con su estado (abierto o cerrado). | Agente A-14 |
| `DOC-25-PROPUESTAS-FUNCIONALES.md` | Propuestas de funcionalidad completamente nueva para hacer crecer la aplicación, ordenadas por el valor que aportarían al negocio. | Agente `a15-funcionalidad` (A-15) |
