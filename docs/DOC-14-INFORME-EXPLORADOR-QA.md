---
doc_id: DOC-14
doc_name: DOC-14-INFORME-EXPLORADOR-QA
version: 2.1.2
status: draft
generator: A-10 explorador QA
generator_version: "1.0"
generated_at: 2026-08-31T16:00:00+02:00
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: spec-08-factura-rectificativa
  commit_sha: 528dfcd71f16d68ddd8da61f55c4205e9d6400a7
  working_tree_clean: false   # cambios locales ajenos a esta actualización: ApuntsAgentsISkills.txt y dashboard/ (modificados, borrados o sin versionar) y docs/DOC-09-IMPACTO-factura-rectificativa.md (sin versionar); ninguno toca client/, server/ ni este informe
inputs:
  - id: DOC-05-PLAN-PRUEBAS.md
    from: A-03
    version: 1.10.0
    hash: sha256:a050cca8974802655ff15515c99cde729d7c976d866a9622f30f689398745f32
  - id: automation/ui/**/*.feature
    from: S-10
    version: null
  - id: DOC-23-INFORME-EJECUCION-TCS-UI.md
    from: S-10
    version: 2.2.0
    hash: sha256:33ac58bcf4188dddccce71aa88bd2f4174af74c1c291032f302ec68fddd84c47
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    version: 1.3.0
    hash: sha256:c081aea157c978d8ffcfffaed9fa9b33fc10106fa47498277f07c9720ef26067
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.1.2
    hash: sha256:d62b236309a76e6e01b7f4fcf7962e8553ef70bbd569ac499da7c069f340f84b
  - id: DOC-16-ROADMAP.md
    from: A-12
    version: 3.1.0
    hash: sha256:9e68df18dd10f62a1698e5be478a1d5c0c46aa58b389ecf17394467989a85c81
  - id: DOC-14-INFORME-EXPLORADOR-QA.md
    from: A-10
    version: 1.0.0
    present: true
  - id: specs/implemented/SPE-04-proteccio-enviaments-duplicats.md
    from: implantación de la app (Estado: Implemented)
    present: true
  - id: specs/implemented/SPE-05-presentacio-imports-i-dates.md
    from: implantación de la app (Estado: Implemented)
    present: true
  - id: specs/implemented/SPE-07-importes-negativos/SPE-07-importes-negativos.md
    from: implantación de la app (Estado: Implemented)
    present: true
  - id: specs/implemented/SPE-08-factura-rectificativa/SPE-08-factura-rectificativa.md
    from: implantación de la app (Estado: Implemented)
    present: true
obsolescence_ack:
  - input: DOC-06
    upto: 1.4.1
    date: 2026-08-29
    note: "SPE-06: propagación de BR-ALB-10 al manual y renumeración de Q. Sin efecto sobre las troballas EXP-nnn."
  - input: DOC-16
    upto: 3.2.0
    date: 2026-08-29
    note: "Delta 3.2.0: DOC-16 solo mueve evidencia de MEJ-002/003/006 por DOC-27 1.1.0. Resync circular; ninguna troballa EXP-nnn depende del roadmap."
---

# DOC-14 · Informe de exploración QA · app-taller

## Procedencia

**Nota de la versión 2.1.2 (actualización dirigida de contenido desactualizado,
sin exploración nueva del navegador).** La cascada de obsolescencia marcó esta
versión como caducada por dos entradas que rebasaron el `--upto` de su propio
`obsolescence_ack`: `DOC-05-PLAN-PRUEBAS.md` subió de `1.6.0` a `1.10.0` (el
`ack` de la versión 2.1.1 solo cubría hasta `1.8.0`) y `DOC-04-FUNCIONAL.md`
de `1.2.0` a `1.3.2` (el `ack` cubría hasta `1.3.1`). Siguiendo el
procedimiento de resello (§4 del contrato documental), se ha leído el diff
real de ambas entradas para decidir si bastaba con extender el `ack` — y se
ha encontrado contenido de este informe que ya no es cierto, así que esto es
una actualización real de contenido, no un resello:

1. **La nota «Qué se ha dejado fuera a propósito», más abajo, decía que
   `BUG-003` y `BUG-004` de `DOC-24` seguían abiertos.** Ya no es así:
   `docs/DOC-24-BUGS.json` versión `1.1.2` marca ambos `status: fixed`.
   `BUG-003` (importes negativos en piezas y líneas de albarán, `Q-12`) se
   corrigió con `specs/implemented/SPE-07-importes-negativos` (`Implemented`,
   2026-08-30), verificado en vivo —navegador y API— según su propia ficha de
   cierre en `DOC-24`. `BUG-004` (una factura emitida no se podía anular ni
   corregir) se corrigió con `specs/implemented/SPE-08-factura-rectificativa`
   (`Implemented`, 2026-08-31), verificado en vivo por el mismo medio.
   Ninguna de las dos correcciones nace de un `EXP-nnn` de este informe —son
   bugs que `A-14` censó directamente en `DOC-24`, ajenos a esta línea de
   exploración— así que se corrige la nota sin abrir ni cerrar ningún
   `EXP-nnn`. Ver la nota intercalada en el apartado «Procedencia» original,
   más abajo.
2. **`P-01` se reformula, no se cierra.** `DOC-04` 1.3.2 confirma que la
   respuesta de negocio a `Q-12` (2026-08-16) y su implementación en `SPE-07`
   alcanzan solo «el precio, el coste y el stock de una pieza, el precio de
   una línea de albarán y el precio por hora de la mano de obra»
   (`docs/DOC-04-FUNCIONAL.md:1389`); el propio `SPE-07` lo deja escrito en
   su apartado «Fuera de alcance»: «Acotar cualquier otro importe del sistema
   no citado por Q-12 (salario de nómina, importes de factura calculados,
   etc.)» (`specs/implemented/SPE-07-importes-negativos/SPE-07-importes-negativos.md:35`).
   El salario de nómina —que es exactamente lo que pregunta `P-01`— queda
   fuera de esa respuesta por escrito. La pregunta original no estaba mal
   planteada, pero dejarla en los mismos términos genéricos, ahora que la
   mitad de su alcance ya existe implementada, podía leerse como si ya
   hubiera sido contestada de pasada. Se reformula, en el apartado 6 y en el
   bloque estructurado, para preguntar explícitamente por *extender* una
   decisión ya tomada e implementada en otro ámbito, no por tomarla desde
   cero.
3. **`EXP-004`, `EXP-005` y `EXP-015` siguen bloqueadas, sin cambios de
   fondo.** Se ha comprobado —por lectura de código, no por reproducción en
   vivo, porque no hay motivo para reabrir lo que nadie ha tocado— que
   `server/routes/nomines.js` no ha cambiado: sigue sin ninguna comprobación
   de signo sobre `salari_brut`, `deduccions` ni `salari_net` (líneas 33 a
   98). Es coherente con que `SPE-07` excluye la nómina de su alcance de
   forma explícita. No ha llegado respuesta de negocio a `P-01` ni a `P-02`.
   Las tres fichas —reproducción, evidencia y sugerencia— se mantienen
   exactamente como en la versión 2.0.0.

**Qué no se ha hecho, a propósito.** No se ha vuelto a abrir el navegador, no
se ha reproducido ninguna carta nueva, y no se ha revisado el bloque
`TC-120` a `TC-132` que `DOC-05` 1.9.0/1.10.0 añadió para `SPE-07` y
`SPE-08` —cubren exactamente el terreno que ya verificaron en vivo los
ficheros `-QA`/`-TS` de ambos specs, y repetirlo no es trabajo de
exploración, es trabajo ya hecho por `A-03`—. Este cambio se limita a: (a)
corregir la nota sobre `BUG-003`/`BUG-004`; (b) reformular `P-01`; (c)
confirmar por lectura de código, sin reproducir, que `EXP-004`/`EXP-005`/
`EXP-015` siguen igual; y (d) actualizar `version` y `hash` de las entradas
`DOC-04-FUNCIONAL.md`, `DOC-05-PLAN-PRUEBAS.md` y `DOC-24-BUGS.json` en el
front-matter, añadiendo además `SPE-07` y `SPE-08` a `inputs` porque esta
nota los cita directamente, y retirando los `obsolescence_ack` de `DOC-04` y
`DOC-05` porque ya no hacen falta: la entrada se ha revisado de verdad, no
solo aceptado sin mirar. Los `ack` de `DOC-06` (vigente hasta `1.4.1`, sin
cambios) y `DOC-16` (vigente hasta `3.2.0`, sin cambios) se mantienen
intactos.

**Nota de la versión 2.1.1 (resello de procedencia, sin exploración nueva).**
La cascada de obsolescencia marcó esta versión como caducada porque su
entrada `inputs` para `DOC-16-ROADMAP.md` seguía citando la versión `3.0.0`,
mientras que la vigente ya es `3.1.0`. El motivo del salto, según
`DOC-16-ROADMAP-HIST.md`: nació `docs/DOC-27-INFORME-EJECUCION-TCS-API.md` (primer
informe de ejecución de la suite de servicio de `S-17`), incorporado a
`DOC-07` 1.10.0, y `A-12` revisó las nueve `MEJ-nnn` contra esa evidencia
nueva. Ninguna `MEJ-nnn` cambió de estado (`implemented`/`accepted`/
`rejected`); lo que cambió fue la evidencia citada en varias fichas
(`MEJ-002`, `MEJ-003`, `MEJ-004`, `MEJ-006`) y el orden de la recomendación
(`MEJ-002` sube al segundo puesto, `MEJ-006` baja al tercero).

Se ha comprobado, hallazgo por hallazgo, si algún `EXP-nnn` de este informe
cita `DOC-16` como evidencia de algo concreto. **Ninguno lo hace.** `DOC-16`
solo aparece en este documento como mapa de cobertura de destino
(`deriva_a: A-12`, para que la mejora correspondiente se censara como
`MEJ-nnn`): `EXP-017`, `EXP-019`, `EXP-022` a `EXP-024`, `EXP-026` y
`EXP-028`, y esta última cita además `MEJ-008` por su nombre en la
sugerencia, como referencia de la familia de deuda técnica en la que
encajaría, no como prueba de un hallazgo. Como ninguna `MEJ-nnn` cambió de
estado en `DOC-16` 3.1.0, esa cita sigue siendo válida tal cual. No ha hecho
falta abrir el navegador ni repetir ninguna carta: este cambio se limita a
actualizar `version` y `hash` de la entrada `DOC-16-ROADMAP.md` en el
front-matter y a dejar constancia en `DOC-14-INFORME-EXPLORADOR-QA-HIST.md`.

**Aprovechando esta revisión, se ha comprobado también la coherencia del
resto del bloque `inputs`** — versión declarada contra versión real del
fichero, hash declarado contra hash recalculado — porque hoy se ha detectado
el mismo fallo silencioso (hash desfasado sin cambio de versión) en varios
documentos del proyecto. Resultado: `DOC-23-INFORME-EJECUCION-TCS-UI.md`, `DOC-04-FUNCIONAL.md`
y `DOC-24-BUGS.json` estaban correctos (versión y hash coinciden con el
fichero real). **`DOC-05-PLAN-PRUEBAS.md` y `DOC-06-MANUAL-USUARIO.md`
tenían la versión correcta (`1.6.0` y `1.3.0` respectivamente, sin cambios
de contenido pendientes de reflejar) pero el `hash` declarado no
correspondía al contenido real del fichero** — un desajuste ya arrastrado
de una sesión anterior, no producido en esta. Se han recalculado y
corregido ambos hashes en el front-matter. No se ha revisado ningún
`EXP-nnn` a raíz de esto porque ninguno cita el hash de `DOC-05` ni de
`DOC-06` como evidencia — `EXP-025` cita números de línea de `DOC-06`, que
siguen siendo exactos (`:490` y `:806`, comprobado de nuevo), así que el
desajuste era puramente de metadato, no de contenido observado. Las
entradas `automation/ui/**/*.feature` (sin versión, a propósito — ver
`DOC-14` 1.0.0) y las de `specs/implemented/` (sin campo de versión, solo
`present: true`) no llevan hash que verificar.

**Nota de la versión 2.1.0 (resincronización dirigida, sin exploración nueva del
navegador).** La cascada de obsolescencia marcó esta versión como caducada
porque su entrada `inputs` para `DOC-23-INFORME-EJECUCION-TCS-UI.md` seguía citando la
versión `2.0.0`, mientras que la vigente ya es `2.2.0` — dos saltos:
`2.0.0 → 2.1.0` cerró `TC-048` y confirmó los 18 casos en rojo de
`EXP-027`/`TC-103`; `2.1.0 → 2.2.0` corrigió los 17 `.feature` de
`EXP-027` y confirmó que `TC-103` era transitorio, dejando la suite con
los 18 casos que estaban en rojo re-ejecutados y en verde (los otros 89, ya
verdes antes, no se han vuelto a ejecutar por no verse afectados).

A diferencia del resello anterior (2.0.1, sobre `DOC-16`), este sí obliga a
revisar contenido, no solo metadatos: se ha comprobado, hallazgo por
hallazgo, si alguno de este informe se apoyaba en las cifras de ejecución
de `DOC-23` en vez de en observación directa. Todos, salvo uno, son de
exploración manual/visual —consola, red, pantalla— independientes de si la
suite automatizada pasa o falla. La excepción es `EXP-027`: su objeto es
exactamente ese estado de los `.feature` frente a la pantalla, y `DOC-23`
2.2.0 documenta en sus §4.2 y §4.3 que ya se corrigió y se verificó (18 de
18 casos en verde, contrastado contra `testng-results.xml`). Por eso
`EXP-027` pasa a `estado: corregido` en esta versión —ver su ficha y el
bloque estructurado, más abajo— sin que haya hecho falta abrir el
navegador: la evidencia de cierre es el propio trabajo de verificación que
ya hizo `S-10` y que `DOC-23` documenta, no una reproducción nueva de
A-10. Ningún otro `EXP-nnn` cambia de estado, severidad o tipo; ninguna
carta se repite; no se ha tocado la aplicación ni creado ni destruido
ningún dato en esta actualización.

**Nota de la version 2.0.1 (resincronizacion, sin exploracion nueva).** La
cascada de obsolescencia marco este documento como caducado unicamente
porque citaba `DOC-16-ROADMAP.md` en version 2.1.0 y la version vigente ya
era 3.0.0 -- `DOC-16` 3.0.0 cita a su vez `DOC-14` 2.0.0 como version
vigente, asi que no hay ningun hallazgo de `DOC-16` posterior a la sesion
que genero esta version. No se ha vuelto a explorar la aplicacion ni se ha
abierto el navegador: la aplicacion no ha cambiado desde la sesion de
2.0.0. Este cambio se limita a actualizar `version` y `hash` de la entrada
`DOC-16-ROADMAP.md` en el front-matter y a dejar constancia en
`DOC-14-INFORME-EXPLORADOR-QA-HIST.md`. El resto del cuerpo de este documento --
hallazgos, cartas, preguntas abiertas -- es identico al de la version
2.0.0.

**Por qué existe esta versión.** El encargo de esta sesión es concreto:
verificar en vivo, reproduciendo exactamente los pasos que documentó
`DOC-14` 1.0.0, si **SPEC 04** (protección contra enviamientos duplicados) y
**SPEC 05** (presentación de importes y fechas) —ambos con `Estado:
Implemented`— cierran de verdad los hallazgos de los que nacieron: `EXP-002`
y `EXP-001` el primero, `EXP-007`, `EXP-009` y `EXP-014` el segundo. Además
se ha explorado con ojos frescos el resto de la aplicación en busca de lo
que ese cambio pudiera haber roto o dejado a medias.

**Contra qué se ha explorado.** Repositorio `C:\Claude\AppDani`, rama
`master`, commit `737b9c7425e6f6aa36f476fe62d28c7891efbb5b`. El árbol de
trabajo no tiene ningún fichero de la aplicación modificado: los cuatro
ficheros sin versionar (`ApuntsAgentsISkills.txt`, `bash.exe.stackdump`,
`dashboard/`, `promptDashboard.txt`) son notas y material ajeno a `client/`,
`server/` y `docs/`. **No se ha tocado ni un fichero de la aplicación
durante la sesión**; lo único que se ha escrito es este informe y su
fichero de historial. Mientras se exploraba, otros ciclos de la cascada de
obsolescencia han seguido fusionando commits sobre `master` (regeneración
de `DOC-06`, `DOC-07` y `DOC-08`); ninguno toca `client/` ni `server/`.

**Entorno.** Interfaz en `http://localhost:5173` (Vite dev server, proxy
`/api`), API en `http://localhost:3001` (Express + SQLite,
`data/taller.db`). Navegador Chromium controlado por herramientas,
1280×720 salvo cuando se indica otra anchura. La aplicación no tiene
autenticación. `npm run dev` se ha arrancado para esta sesión; no estaba
levantado al empezar.

**Estado de los datos al empezar — importante para leer este informe.**
La base **no se ha reseedeado**. Arrastra los residuos de la sesión de
`DOC-14` 1.0.0 (2026-08-21) tal como esa versión los dejó declarados en su
apartado 7, más un cambio adicional posterior y ajeno a esta sesión: la
factura **`2026/F-0004`** (91,36 €, cliente `Anna Puig Ferrer`, creada
`2026-08-22 19:19:05`), que factura el albarán `2026/A-0001` del seed
original. Por su marca de tiempo —dentro de la ventana de implantación de
SPEC 04— es razonable asumir que nació de la verificación manual del
criterio de aceptación «doble clic en Crear factura crea una sola factura»,
pero **no se ha confirmado su origen exacto** porque no aporta nada a esta
verificación; se anota para que nadie la confunda con un dato huérfano.
Con esto, el inventario al empezar era: 13 clientes, 7 vehículos, 6
albaranes (4 facturados, 2 pendientes), 4 facturas, 8 piezas y 5 nóminas.
El detalle completo, incluidos los valores deliberadamente sucios que deja
`DOC-14` 1.0.0 (vehículo 7 con año 2099 y −500 km), sigue vigente y no se
repite aquí; ver el apartado 7 de esa versión y el apartado 7 de esta.

**Cómo se ha usado el plan de pruebas.** Se ha vuelto a mirar `DOC-05` y los
ocho `.feature` de `automation/ui/` — no para elegir cartas nuevas, sino
para dos cosas puntuales: comprobar qué cubren `TC-073`/`TC-075` sobre el
IVA (para saber si SPEC 05 los deja verdes de verdad, no solo la pantalla)
y comprobar si los literales de importe de los escenarios siguen
coincidiendo con lo que la pantalla muestra ahora. **No se ha ejecutado la
suite automatizada.** La comparación se ha hecho leyendo el texto de los
`.feature` y observando en vivo lo que la pantalla renderiza hoy, sin
lanzar `mvn test` en ningún momento — ver `EXP-027`.

**Qué se ha dejado fuera a propósito.** En el momento de escribir este
párrafo (sesión 2.0.0, 2026-08-23), `BUG-003` y `BUG-004` de `DOC-24`
seguían abiertos y se dejaban fuera a propósito porque ninguna sesión de
A-10 los había originado — son bugs que censó `A-14` directamente.
**Corrección de la versión 2.1.2: ya no es así.** `docs/DOC-24-BUGS.json`
1.1.2 marca ambos `status: fixed` — `BUG-003` mediante
`specs/implemented/SPE-07-importes-negativos` (2026-08-30) y `BUG-004`
mediante `specs/implemented/SPE-08-factura-rectificativa` (2026-08-31),
ambos verificados en vivo; ver la nota de «Procedencia» de la versión 2.1.2,
arriba, para el detalle completo. `EXP-004`, `EXP-005` y `EXP-015` siguen
siendo las tres troballas —estas sí, propias de este informe— marcadas «no
tocar hasta que negocio conteste P-01/P-02»: se reverificaron en vivo en su
momento y se ha vuelto a confirmar, por lectura de código en la versión
2.1.2, que siguen igual — ver más abajo. No se ha repetido ninguna de las
cartas de límites, concurrencia con dos pestañas, idioma de errores, tema
oscuro o anchura móvil que ya cubrió `DOC-14` 1.0.0: nada en SPEC 04 ni en
SPEC 05 las toca, y repetirlas no habría descubierto nada nuevo.

**Qué se ha hecho en esta sesión, en orden.**

1. Reproducir, con datos nuevos y anotando red y base de datos antes/después,
   los cinco hallazgos que motivaron SPEC 04 y SPEC 05: `EXP-001`, `EXP-002`,
   `EXP-007`, `EXP-009`, `EXP-014`.
2. Extender la verificación de `EXP-001`/`EXP-002` a un segundo punto de
   escritura no probado en la sesión original (alta de vehículo), porque
   `DOC-14` 1.0.0 dejó escrito explícitamente que la generalización a los
   demás formularios de `EntityForm` era una suposición «no verificada».
3. Revisar el bloque nuevo del importe del IVA en `FacturaDetail.tsx` en
   tema oscuro, porque el propio `SPEC 05` señala como riesgo que deja una
   celda vacía en la rejilla de dos columnas.
4. Reverificar en vivo `EXP-004`, `EXP-005` y `EXP-015` sin tocar nada, solo
   para constatar si siguen igual.
5. Mirar con ojos frescos dos zonas no cubiertas por las cartas anteriores:
   la coherencia del nuevo formato de fecha entre módulos, y el estado real
   de los `.feature` frente a la pantalla. De ahí salen `EXP-027` y
   `EXP-028`.
6. Limpiar los datos de prueba propios de esta sesión desde la propia
   interfaz — ver apartado 7.

---

## 1 · Resumen ejecutivo

**28 hallazgos en total** a lo largo de las tres sesiones de exploración o
resincronización (26 de `DOC-14` 1.0.0 más `EXP-027` y `EXP-028`, nuevos en
la sesión 2.0.0). De ellos, **5 están corregidos**: `EXP-001`, `EXP-002`, `EXP-007` y
`EXP-014` —verificados en vivo en la sesión 2.0.0— y `EXP-027` —cerrado en
esta versión 2.1.0 sin exploración nueva, a partir de la corrección y
verificación que ya documenta `DOC-23` 2.2.0; ver «Procedencia»—.
Quedan **23 hallazgos abiertos**: 16 `defecto`, 7 `mejora`, 0 `duda`. Por
severidad, de los abiertos: **0 `critical`**, **2 `high`**, **17 `medium`**
y **4 `low`**.

**La frase que resume el estado: las tres cosas concretas que impedían
entregar según `DOC-14` 1.0.0 están resueltas en dos de tres, y la tercera
sigue igual porque nadie la ha tocado.** SPEC 04 cierra de verdad la doble
pulsación: doble clic en «Guardar» y en «Añadir línea» crean **un solo**
registro, verificado con red y base de datos, y además se ha comprobado
que la protección alcanza un formulario que no se había probado antes
(alta de vehículo). SPEC 05 cierra de verdad el importe del IVA que
faltaba en la factura. Lo que **no** se ha tocado, porque nadie lo ha
tocado, es `EXP-003`: la aplicación sigue sin ningún control de
concurrencia entre dos pestañas, y sigue siendo, junto con `EXP-004`,
`EXP-005` y `EXP-015` —bloqueados a la espera de negocio—, lo más serio
que queda abierto.

**Con matices, y hay que decirlos.** Primero, `EXP-009` **no se cierra
entera**: la presentación de la fecha del albarán ya es `DD/MM/AAAA` en
listado y ficha, verificado en vivo, pero el defecto de fondo —guardar el
albarán reescribe la fecha a medianoche UTC y pierde la hora, aunque solo
se toquen las notas— **sigue reproduciéndose exactamente igual**, porque
SPEC 05 lo declaró fuera de su alcance explícitamente. Segundo, un efecto
colateral que sí dejó SPEC 05 y que en esta versión queda cerrado: los
ficheros `.feature` de `automation/ui/` que validaban literales de importe
con punto decimal (`98.40 €`, `1299.50 €`) dejaron de coincidir con lo que
la pantalla muestra (`98,40 €`, `1.299,50 €`) — ver `EXP-027`. Esto ya
estaba anotado como coste aceptado en el propio `SPEC 05`, y esta
resincronización confirma, sin exploración nueva, que `A-03`/`S-10` ya lo
corrigieron y lo verificaron: `DOC-23` 2.2.0 documenta los 17 `.feature`
actualizados a coma decimal y 18 de 18 casos en verde. Queda un desfase
documental menor y ajeno a este informe: `CLAUDE.md` sigue describiendo el
estado intermedio («1 caso rojo, TC-048») en vez del estado ya cerrado; no
es competencia de A-10 corregirlo.

El resto de la aplicación —lo que no tocan SPEC 04 ni SPEC 05— se comporta
exactamente como lo dejó `DOC-14` 1.0.0. No se ha encontrado ninguna
regresión en las zonas revisadas de paso (formato de importes en piezas,
nóminas y facturas; tema oscuro del bloque nuevo de IVA).

---

## 2 · Qué se ha explorado

| Carta | Misión | Resultado |
|---|---|---|
| CH-12 | Reproducir `EXP-001` (doble clic en «Guardar», alta de cliente) con datos nuevos | **Cierra.** Un solo `POST`, un solo registro |
| CH-13 | Reproducir `EXP-002` (doble clic en «Añadir línea», albarán) con datos nuevos | **Cierra.** Un solo `POST`, una sola línea, stock descontado una vez |
| CH-14 | Extender la verificación de la guarda a un formulario no probado antes (alta de vehículo) | **Cierra también.** La generalización que `DOC-14` 1.0.0 dejó como hipótesis queda confirmada |
| CH-15 | Reproducir `EXP-007` (importe del IVA ausente en la factura) | **Cierra.** «Importe del IVA · 20,66 €» presente en pantalla |
| CH-16 | Reproducir la parte de presentación de `EXP-009` (fecha en crudo) y la pérdida de hora al editar | **Presentación cierra; pérdida de hora sigue reproduciéndose igual** |
| CH-17 | Reproducir `EXP-014` (formato de precio inconsistente) en catálogo, ficha, línea de albarán, factura y nóminas | **Cierra.** Coma decimal, separador de miles y € en las cinco pantallas comprobadas |
| CH-18 | Revisar el bloque nuevo del importe del IVA en tema oscuro (riesgo señalado por el propio SPEC 05) | Sin hallazgos: etiqueta y valor llevan sus variantes `dark:` correctamente |
| CH-19 | Reverificar en vivo `EXP-004`, `EXP-005` y `EXP-015` sin tocarlos | Sin cambios: los tres se reproducen exactamente igual que en `DOC-14` 1.0.0 |
| CH-20 | Comparar los literales de importe de los `.feature` de `factures` y `nomines` con lo que la pantalla renderiza hoy | 1 hallazgo nuevo (`EXP-027`) |
| CH-21 | Mirar con ojos frescos la coherencia del nuevo formato de fecha entre los módulos que tocó SPEC 05 y los que no | 1 hallazgo nuevo (`EXP-028`) |

No se han repetido las cartas de límites de campo, concurrencia con dos
pestañas, idioma de los avisos del servidor, tema oscuro general ni
anchura móvil general de `DOC-14` 1.0.0: siguen vigentes tal como se
dejaron, y nada en SPEC 04 ni en SPEC 05 las toca.

---

## 3 · Qué funciona bien

Se mantiene todo lo que `DOC-14` 1.0.0 documentó en su apartado 3 —la
aritmética del dinero, la numeración, la emisión de factura resistiendo la
concurrencia, los acentos y apóstrofos, la consola limpia, las
traducciones completas— porque nada en esta sesión lo ha contradicho. Se
añade lo verificado ahora:

- **La guarda de doble envío funciona donde SPEC 04 dice que funciona, y
  también donde no se había probado.** Doble clic en «Guardar» (alta de
  cliente y alta de vehículo) y doble clic en «Añadir línea» (línea de
  albarán) producen todos **un solo** `POST`, verificado en el panel de
  red en los tres casos.
- **El importe del IVA se muestra, cuadra con la API y se lee bien en tema
  oscuro.** `20,66 €` en `/factures/1`, coherente con `iva_import` de la
  API; en tema oscuro la etiqueta usa `dark:text-slate-400` y el valor
  `dark:text-slate-100`, ambos con contraste alto sobre el fondo
  `slate-900`.
- **El formato de importe es ahora coherente en todas las pantallas
  comprobadas**: catálogo de piezas, ficha de pieza, línea de albarán,
  factura y listado y ficha de nómina muestran todos coma decimal,
  separador de miles y símbolo €. No se ha encontrado ninguna pantalla que
  se quedara con el formato antiguo entre las revisadas.
- **La fecha del albarán se presenta bien, en listado y en ficha.**
  `21/08/2026` en las seis filas de `/albarans` y en la ficha de cada uno,
  donde antes había una marca de tiempo ISO cruda.
- **La rejilla de la ficha de factura no se rompe con el elemento nuevo.**
  Cinco elementos en una rejilla de dos columnas dejan una celda vacía tras
  «Total», exactamente el riesgo que el propio `SPEC 05` anotó; comprobado
  que no hay solape ni desbordamiento, es inofensivo como allí se
  predijo.
- **Consola y red limpias también en esta sesión.** Ni un error, ni una
  petición fallida sin capturar, en ninguna de las diez cartas.

---

## 4 · Hallazgos

Ordenados por severidad. Los **cerrados** llevan un aviso al principio con
la verificación que los cierra; el resto de la ficha se conserva tal cual
la escribió `DOC-14` 1.0.0 porque sigue siendo la reproducción original y
tiene valor histórico. Los que siguen abiertos se reproducen sin cambios
desde la versión anterior salvo que se indique lo contrario.

---

### EXP-002 · `critical` · `defecto` · **CORREGIDO en v2.0.0** — Un doble clic en «Añadir línea» duplica la línea y descuenta el stock dos veces

> **Verificación de cierre — 2026-08-23.** Reproducidos los pasos originales
> sobre el albarán `2026/A-0003` (pendiente): pieza «Filtre d'oli», stock de
> partida 37, cantidad 2, doble clic sobre «Añadir línea» disparado con dos
> eventos `click()` consecutivos sobre el mismo botón, sin esperar entre
> ambos. **Panel de red: un solo `POST /api/albarans/3/linies` → `201
> Created`.** `GET /api/albarans/3` devuelve **una sola** línea nueva
> (id 14, cantidad 2, precio 8,5). `GET /api/peces/1` pasa de `estoc: 37` a
> `estoc: 35` — dos unidades, no cuatro. Cierra `SPEC 04`, paso 5. La línea
> y el stock de prueba se han deshecho desde la propia interfaz tras la
> verificación (ver apartado 7).

**Qué pasaba (histórico, ya no reproducible).** Pulsar dos veces seguidas
«Añadir línea» en un albarán creaba dos líneas idénticas, duplicaba el
importe del albarán y descontaba el stock de la pieza por partida doble,
sin ningún aviso. Reproducción, evidencia técnica e hipótesis de causa
originales: ver `DOC-14` 1.0.0, `EXP-002`.

**deriva_a: A-14** (para que `BUG-nnn` en `DOC-24` se marque corregido si
llegó a censarse allí).

---

### EXP-003 · `high` · `defecto` · Dos pestañas sobre la misma ficha: la última que guarda pisa a la otra sin avisar

**Sin cambios.** No reproducido de nuevo en esta sesión porque ni SPEC 04
ni SPEC 05 tocan la edición de cliente ni el mecanismo de guardado de
formularios existentes (SPEC 04 solo añade una guarda contra el *segundo*
clic mientras la primera petición está en vuelo; no introduce ningún
control de versión ni de concurrencia entre pestañas distintas, y lo dice
explícitamente en su apartado «Fora d'abast»). Se da por vigente tal como
lo documentó `DOC-14` 1.0.0: reproducción, evidencia y sugerencia
completas allí.

**deriva_a: null** (pendiente de que el propietario decida entre bloqueo
optimista y fusión por campos, tal como quedó anotado).

---

### EXP-007 · `high` · `defecto` · **CORREGIDO en v2.0.0** — La ficha de la factura no muestra el importe del IVA en ninguna parte

> **Verificación de cierre — 2026-08-23.** `/factures/1` (`2026/F-0001`,
> seed) muestra ahora en pantalla: `ESTADO DE PAGO Pendiente · IVA 21% ·
> IMPORTE DEL IVA 20,66 € · BASE IMPONIBLE 98,40 € · TOTAL 119,06 €`. El
> valor coincide exactamente con `iva_import: 20.66` de `GET
> /api/factures/1`. Cierra `SPEC 05`, paso 4.
>
> **Matiz que sigue vigente y no depende de SPEC 05: `TC-073` y `TC-075`
> siguen sin comprobar el IVA en su literal.** Se ha leído de nuevo
> `automation/ui/src/test/resources/features/factures.feature`: los pasos
> de ambos casos siguen validando solo `Literal: <baseEsperada> €` y
> `Literal: <totalEsperado> €` (o `<total> €`), sin ningún paso que valide
> el importe del IVA. La pantalla ya no incumple el requisito, pero los dos
> casos **siguen sin probar la parte que su título anuncia**. Esto es
> trabajo de `A-03`, no de la aplicación — ya estaba anotado así en la
> ficha original y sigue pendiente.

**Qué pasaba (histórico).** El detalle de una factura mostraba la base, el
tipo de IVA en porcentaje y el total, pero nunca la cuota de IVA en euros.
Reproducción y evidencia técnica originales: ver `DOC-14` 1.0.0, `EXP-007`.

**deriva_a: A-03** (reforzar `TC-073` y `TC-075` con un paso que valide
`Literal: <ivaEsperado> €`; ya no hay `A-14` pendiente porque la aplicación
está corregida).

---

### EXP-001 · `high` · `defecto` · **CORREGIDO en v2.0.0** — Un doble clic en «Guardar» da de alta el registro dos veces

> **Verificación de cierre — 2026-08-23.** Alta de cliente
> «Verificacio EXP-001 Doble Clic», NIF `88888888X`, teléfono `600111222`,
> con doble clic sobre «Guardar». **Panel de red: un solo `POST
> /api/clients` → `201 Created`**, cliente id 19 único; `GET /api/clients`
> confirma que no hay ningún duplicado con ese nombre. La navegación
> resultante también queda coherente (`/clients/19` con el contenido de
> `id 19`), así que el efecto colateral de descuadre de URL que describía
> la ficha original tampoco se reproduce, como consecuencia directa de que
> ya no hay una segunda petición en vuelo. Cierra `SPEC 04`, paso 4.
>
> **La hipótesis de `DOC-14` 1.0.0 —«se espera el mismo comportamiento en
> los demás altas, no verificado»— queda confirmada en un segundo punto.**
> Repetido el mismo doble clic en el alta de un vehículo (`Skoda Octavia`,
> matrícula `9999VER`, cliente `Anna Puig Ferrer`): un solo `POST
> /api/vehicles` → `201 Created`, un solo vehículo (id 8) en
> `GET /api/vehicles`. El cliente id 19 y el vehículo id 8 se han borrado
> desde la interfaz tras la verificación (ver apartado 7).

**Qué pasaba (histórico).** Pulsar dos veces seguidas «Guardar» en el alta
de un cliente creaba dos clientes idénticos. Reproducción, evidencia
técnica y nota del efecto colateral de navegación: ver `DOC-14` 1.0.0,
`EXP-001`.

**deriva_a: A-14**.

---

### EXP-004 · `high` · `defecto` · Una nómina admite deducciones mayores que el bruto y presenta un salario neto negativo

**No tocar — bloqueado por P-01, sin respuesta de negocio.** Reverificado
en vivo el 2026-08-23, sin más propósito que constatar que sigue igual:
`POST /api/nomines` con `personal_id: 1, mes: 7, any_nomina: 2026,
salari_brut: 1000, deduccions: 1500` devuelve `201 Created` con
`salari_net: -500`, y la ficha (`/nomines/7`, ahora con el formato de
`SPEC 05`) muestra `SALARIO NETO -500,00 €` sin ningún aviso. Se comporta
exactamente igual que en `DOC-14` 1.0.0, solo que el número ahora se
presenta con coma decimal en vez de con punto. El registro de prueba se ha
borrado desde la interfaz tras la comprobación (ver apartado 7).
Reproducción completa, cita de `DOC-04`/`Q-12` y sugerencia: ver `DOC-14`
1.0.0, `EXP-004`.

**deriva_a: null** (espera P-01).

---

### EXP-006 · `medium` · `defecto` · Todos los avisos de error del servidor salen en catalán aunque la interfaz esté en castellano

**Sin cambios.** No revisado de nuevo en esta sesión: ni SPEC 04 ni SPEC 05
tocan los mensajes de error del servidor. Se mantiene vigente tal como lo
documentó `DOC-14` 1.0.0. Un detalle que sí conviene anotar sin haberlo
verificado exhaustivamente: los mensajes nuevos que introdujo SPEC 04
(«no se pot...», si los hubiera) no se han inspeccionado; ninguno de los
criterios de aceptación de SPEC 04 menciona un mensaje de error nuevo del
servidor, así que es razonable que el recuento de 71 literales siga vigente,
pero no se ha vuelto a contar.

**deriva_a: A-14**.

---

### EXP-005 · `medium` · `defecto` · El mes de una nómina admite decimales y el año no tiene ningún límite

**No tocar — bloqueado por P-02, sin respuesta de negocio.** Reverificado
en vivo el 2026-08-23 sobre el mismo registro de prueba usado para
`EXP-004`: `PUT /api/nomines/7` con `mes: 7.5, any_nomina: 999999` devuelve
`200 OK`; la ficha titula `7.5/999999`. Igual que en `DOC-14` 1.0.0.
Reproducción completa y cita de `REQ-067`: ver `DOC-14` 1.0.0, `EXP-005`.

**deriva_a: null** (espera P-02).

---

### EXP-008 · `medium` · `defecto` · Una ruta que no existe deja una página completamente en blanco, sin siquiera el menú

**Sin cambios.** No revisado de nuevo; ni SPEC 04 ni SPEC 05 tocan el
enrutado (`App.tsx`). Se mantiene vigente. Ver `DOC-14` 1.0.0, `EXP-008`.

**deriva_a: A-15**.

---

### EXP-009 · `medium` · `defecto` · **PARCIALMENTE CORREGIDO en v2.0.0** — La fecha del albarán ya no se muestra como marca de tiempo cruda, pero al editar el albarán se sigue perdiendo la hora

> **Verificación de cierre parcial — 2026-08-23.**
>
> **La parte de presentación cierra.** `/albarans` muestra ahora
> `21/08/2026` en las seis filas, y `/albarans/3` muestra `FECHA
> 21/08/2026` en la ficha. Antes ambas mostraban
> `2026-08-21T15:16:55.032Z`. Cierra `SPEC 05`, paso 5.
>
> **El defecto de fondo no cierra, y se ha reproducido de nuevo tal cual.**
> Editar el albarán `2026/A-0003` sin cambiar ningún campo y pulsar
> «Guardar» reescribe su fecha de `2026-08-21T15:16:55.032Z` a
> `2026-08-21T00:00:00.000Z`, verificado en `GET /api/albarans/3`
> inmediatamente antes y después del guardado. **Es exactamente el mismo
> comportamiento que documentó `DOC-14` 1.0.0.** `SPEC 05` lo declara fuera
> de su alcance de forma explícita, con el argumento correcto de que es una
> decisión de modelo de datos (¿el albarán guarda fecha o fecha y hora?),
> no de presentación, y no debía resolverse de paso. **Este efecto
> colateral de esta verificación es irreversible**: la fecha original del
> albarán `2026/A-0003` (`15:16:55.032Z`) no se puede recuperar por ningún
> medio de la interfaz; queda anotado en el apartado 7 como dato
> permanente.

**Qué pasaba y sigue pasando (reproducción vigente).** Editar cualquier
campo de un albarán —incluidas las notas— reescribe su fecha a medianoche
UTC, perdiendo la hora original. Reproducción completa, evidencia técnica
e hipótesis de riesgo de zona horaria: ver `DOC-14` 1.0.0, `EXP-009`
(sección «Reproducción, parte 2»); la parte 1, sobre la presentación,
queda superada por esta verificación.

**deriva_a: A-14** (el defecto de pérdida de hora sigue siendo del ámbito
de la aplicación, no de presentación; la parte de presentación ya no
necesita destino).

---

### EXP-010 · `medium` · `defecto` · El desplegable de piezas del albarán sigue ofreciendo el stock viejo después de añadir una línea

**Sin cambios.** No revisado de nuevo; SPEC 04 protege el *envío* del
formulario de línea, no la recarga del catálogo tras añadirla, y SPEC 05
no toca este comportamiento. Ninguno de los dos specs lo menciona. Se
mantiene vigente. Ver `DOC-14` 1.0.0, `EXP-010`.

**deriva_a: A-14**.

---

### EXP-011 · `medium` · `defecto` · En tema oscuro los enlaces de las fichas quedan por debajo del contraste mínimo legible

**Sin cambios**, con una comprobación adicional que lo acota mejor. Se ha
revisado en esta sesión, en tema oscuro, el bloque **nuevo** que introduce
`SPEC 05` en `/factures/1` (importe del IVA): su etiqueta usa
`text-slate-500 dark:text-slate-400` y su valor `text-slate-800
dark:text-slate-100`, ambos con variante oscura — **no repite el problema
de los 18 enlaces sin variante `dark:`** que describe este hallazgo,
porque no es un enlace, es texto de ficha. El hallazgo original sigue
vigente tal cual. Ver `DOC-14` 1.0.0, `EXP-011`.

**deriva_a: A-14**.

---

### EXP-012 · `medium` · `defecto` · En anchura de móvil la barra lateral no se repliega y todos los botones de acción quedan fuera de la pantalla

**Sin cambios.** No revisado de nuevo (carta ya cubierta en `DOC-14`
1.0.0; ni SPEC 04 ni SPEC 05 tocan `Layout.tsx`). Ver `DOC-14` 1.0.0,
`EXP-012`.

**deriva_a: null**.

---

### EXP-013 · `medium` · `defecto` · Un nombre largo ensancha la columna y expulsa el resto de la tabla fuera de la pantalla

**Sin cambios.** No revisado de nuevo; `DataTable.tsx` no forma parte de
ninguno de los dos specs. Ver `DOC-14` 1.0.0, `EXP-013`.

**deriva_a: A-14**.

---

### EXP-014 · `medium` · `defecto` · **CORREGIDO en v2.0.0** — El mismo precio se presentaba de tres formas distintas según la pantalla

> **Verificación de cierre — 2026-08-23.** Comprobado en las cinco
> pantallas que citaba el hallazgo original, más una:
>
> - `/peces`: «Filtre d'oli» ahora muestra `8,50 €` (antes `8.5`);
>   «Bateria 60Ah» `95,00 €` (antes `95`).
> - `/peces/1`: `PRECIO 8,50 € · COSTE 3,50 €` (sin cambio de forma, ya
>   llevaba símbolo y dos decimales, pero ahora con coma).
> - `/albarans/3`: línea «Bugies (joc de 4) · 1 · 28,00 € · 28,00 €».
> - `/factures/1`: `98,40 €`, `20,66 €`, `119,06 €`, todos con coma.
> - `/nomines`: `1.360,00 €` — confirma también el separador de miles, que
>   el hallazgo original pedía como parte de «un solo formato».
> - `/nomines/7` (registro de prueba): `SALARIO NETO -500,00 €` — el signo
>   negativo convive bien con el nuevo formato, sin ningún error de
>   presentación.
>
> **Ya no hay ninguna pantalla, de las revisadas, con punto decimal ni sin
> símbolo €.** Cierra `SPEC 05`, pasos 2 y 3, y responde la pregunta `P-03`
> con **coma**, decisión de negocio incorporada directamente al spec.

**Qué pasaba (histórico).** El precio de una pieza aparecía como `8.5` en
el catálogo, `8.50 €` en su ficha y `8.50 €` en la línea del albarán, con
punto decimal en toda la aplicación. Reproducción y evidencia técnica
originales: ver `DOC-14` 1.0.0, `EXP-014`.

**deriva_a: A-03** (el impacto conocido y aceptado sobre los literales de
`automation/ui/` ya no es una posibilidad, es un hecho — ver `EXP-027`).

---

### EXP-015 · `medium` · `defecto` · Un vehículo admite año de matriculación futuro y kilometraje negativo

**No tocar — bloqueado por P-02, sin respuesta de negocio.** Reverificado
por simple observación, sin volver a reproducirlo: el vehículo id 7
(«Citroën C4 Picasso — 7788 QAX») sigue con `any_matriculacio: 2099` y
`quilometratge: -500` en `GET /api/vehicles/7`, exactamente como lo dejó
`DOC-14` 1.0.0 como evidencia viva. Ningún spec ha tocado la validación de
vehículos. Ver `DOC-14` 1.0.0, `EXP-015`.

**deriva_a: null** (espera P-02).

---

### EXP-016 · `medium` · `defecto` · Los formularios llevan la validación del navegador desactivada

**Sin cambios.** `EntityForm.tsx` ha cambiado en esta sesión —SPEC 04 le
añade las props `submitting`/`submittingLabel`— pero el atributo
`noValidate` del formulario no se ha tocado; no era parte del alcance de
SPEC 04. No se ha vuelto a reproducir esta sesión. Ver `DOC-14` 1.0.0,
`EXP-016`.

**deriva_a: A-14**.

---

### EXP-017 · `medium` · `mejora` · Se puede abandonar un formulario a medio rellenar sin ningún aviso

**Sin cambios.** No revisado de nuevo. Ver `DOC-14` 1.0.0, `EXP-017`.

**deriva_a: A-12**.

---

### EXP-018 · `medium` · `defecto` · Retirar una línea de albarán no pide confirmación

**Sin cambios, confirmado de paso.** Al deshacer la línea de prueba de
`EXP-002` (apartado 7) se ha comprobado, sin buscarlo, que sigue sin haber
diálogo de confirmación al pulsar «Eliminar» en una línea: la línea
desapareció al primer clic. `SPEC 04` excluye explícitamente los botones
de borrado de su alcance, así que este resultado era el esperado. Ver
`DOC-14` 1.0.0, `EXP-018`.

**deriva_a: null**.

---

### EXP-022 · `medium` · `mejora` · El desplegable de vehículos no dice de qué cliente es cada vehículo

**Sin cambios.** No revisado de nuevo. Ver `DOC-14` 1.0.0, `EXP-022`.

**deriva_a: A-15**.

---

### EXP-023 · `medium` · `mejora` · El listado de nóminas no dice de qué empleado es cada nómina

**Sin cambios**, con una comprobación de paso: el listado sigue con las
columnas «Período, Pago, Neto» y ahora los importes llevan el formato de
`SPEC 05` (`1.360,00 €`), pero eso no añade la columna de empleado que
falta. Ver `DOC-14` 1.0.0, `EXP-023`.

**deriva_a: A-15**.

---

### EXP-024 · `medium` · `mejora` · Al emitir una factura, la lista de albaranes pendientes solo muestra el número

**Sin cambios.** No revisado de nuevo. Ver `DOC-14` 1.0.0, `EXP-024`.

**deriva_a: A-15**.

---

### EXP-025 · `medium` · `defecto` · El manual describe como vigente el comportamiento de stock que ya se corrigió

**Sin cambios, y sigue vigente pese a que `DOC-06` se ha regenerado dos
veces desde `DOC-14` 1.0.0.** Se ha comprobado que las dos frases que cita
este hallazgo siguen en el manual, solo que han cambiado de línea por el
crecimiento del documento: hoy están en `docs/DOC-06-MANUAL-USUARIO.md:490`
(«es que hoy no comprueba las existencias») y `:806` («La aplicación no lo
impide ni te avisa»), antes en `449-451` y `763-766`. El texto en sí no ha
cambiado una palabra. La resincronización de `DOC-06` a 1.3.0
(2026-08-23) añadió información sobre SPEC 04 y SPEC 05 pero no tocó estos
dos párrafos, que documentan un comportamiento de stock corregido antes de
`DOC-14` 1.0.0 (`BUG-001`) y ajeno a ambos specs. El sistema sigue
rechazando el sobregiro de stock exactamente igual que lo comprobó
`DOC-14` 1.0.0. Ver esa versión, `EXP-025`, para la reproducción completa.

**deriva_a: null** (es trabajo de A-04, no de Doctor QA, tal como ya
señalaba la ficha original).

---

### EXP-026 · `medium` · `mejora` · El diálogo de confirmación de borrado no dice qué registro se va a borrar

**Sin cambios, confirmado de paso.** Los diálogos de confirmación usados
para deshacer los datos de prueba de esta sesión (clientes, vehículo,
nómina — apartado 7) seguían mostrando el texto genérico «¿Seguro que
quieres eliminar este/a [entidad]?», sin el nombre del registro, en los
cuatro casos. `SPEC 04` no toca `ConfirmDialog.tsx`. Ver `DOC-14` 1.0.0,
`EXP-026`.

**deriva_a: A-12**.

---

### EXP-027 · `high` · `defecto` · **CORREGIDO en v2.1.0** — Los `.feature` de facturas y nóminas validaban literales de importe con punto decimal que ya no coincidían con lo que la pantalla mostraba

> **Verificación de cierre — 2026-08-24 (resincronización, sin exploración
> en vivo).** `DOC-23-INFORME-EJECUCION-TCS-UI.md` versión `2.2.0` (S-10, generado
> 2026-08-23T23:30) documenta en su §4.2 la corrección de 17 `.feature` de
> esta misma familia —incluye `factures.feature` y `nomines.feature`, los
> dos verificados a mano abajo, más `pieces.feature` y `albarans.feature`,
> que esta ficha no había llegado a revisar— pasando sus literales a coma
> decimal y añadiendo el espacio no separable antes de `€` que la pantalla
> usa. Su §4.3 confirma además que el caso aislado de infraestructura que
> la versión 2.1.0 de `DOC-23` había atribuido por error a `TC-029` era en
> realidad `TC-103`, y que era transitorio. Los 18 casos que estaban en
> rojo se han vuelto a ejecutar y están **18 de 18 en verde**, verificado
> por S-10 contra `testng-results.xml`. No se ha vuelto a abrir el
> navegador ni a comparar la pantalla a mano en esta verificación: la
> corrección de `automation/ui/` y su prueba son trabajo de `A-03`/`S-10`,
> zona que este informe no toca, y `DOC-23` 2.2.0 ya aporta la evidencia de
> ejecución que sustituye a la comparación manual que motivó esta ficha.
> Es el único hallazgo de este informe cuyo cierre depende de una cifra de
> ejecución de la suite — ver «Procedencia» de esta versión.

**Qué pasaba (histórico, ya corregido).**

`SPEC 05` cambió el separador decimal de toda la aplicación
de punto a coma (`EXP-014`, cerrado arriba). Los ficheros `.feature` de
`automation/ui/` que verifican esos mismos importes por su texto literal
en pantalla **no se han actualizado** y siguen escritos con punto. El
resultado es que, si se ejecutara la suite hoy, esos pasos no
encontrarían el texto que buscan.

**Dónde.** `automation/ui/src/test/resources/features/factures.feature` y
`automation/ui/src/test/resources/features/nomines.feature`.

**Reproducción — por lectura y observación en vivo, sin ejecutar la
suite.**

1. Leer `factures.feature`, escenario `TC-060`: su tabla de ejemplos fija
   `baseEsperada = 100.00` y `totalEsperado = 121.00`, y el paso final es
   `Y se valida "Literal: <totalEsperado> €"`, es decir busca en pantalla
   el texto `121.00 €`.
2. Reproducir el mismo flujo a mano: vehículo `8001TST`, una línea de mano
   de obra de 1 hora a 100,00 €/h, factura emitida sobre ese albarán.
3. Leer la pantalla resultante de `/factures/nova` → detalle.

**Observado.** La ficha de la factura muestra `TOTAL 121,00 €` —coma, no
punto—. El literal que `TC-060` va a buscar (`121.00 €`) no existe en la
pantalla.

**Alcance, contado a mano sobre los dos ficheros.** Además de `TC-060`, la
misma familia de aserción (`Literal: <algo> €` con un número de la tabla
de ejemplos escrito con punto) aparece en `TC-061`, `TC-069` a `TC-073`,
`TC-075` (líneas 43-44, 165-166, 208-209, 239-240, 380-381, 409-411 de
`factures.feature`) y en `TC-098` a `TC-100` de `nomines.feature`
(`netoEsperado = 1299.50`, comprobado línea 178). **No se ha contado el
total exacto de casos afectados porque eso exige ejecutar o parsear la
suite entera, y ninguna de las dos cosas es tarea de esta exploración**;
los nueve casos citados son los que se han verificado uno a uno, a mano,
comparando el `.feature` con la pantalla.

**Esperado.** Que el literal esperado por el `.feature` coincida con lo
que la pantalla muestra. **Por qué se espera eso:** no es un defecto de la
aplicación — la aplicación hace exactamente lo que `P-03` decidió— es un
hueco del plan de pruebas frente a un cambio de la aplicación que el
propio `SPEC 05` ya anticipó por escrito: «els fitxers `.feature`
d'`automation/ui/` que validen literals com `119.06 €` quedaran vermells
fins que `s10-auto-tcs` els actualitzi». Lo que aporta este hallazgo es
confirmar que **ya ha ocurrido**, no que pueda ocurrir, y medir que afecta
a más de un caso.

**Por qué `high` y no `medium`.** No es un defecto de negocio, pero
`CLAUDE.md`, que es lo primero que lee cualquiera que se incorpore al
proyecto, todavía dice «1 cas vermell: TC-048» en su apartado «Estado
conegut». Esa afirmación ya no es cierta y nadie lo sabe hasta que alguien
ejecuta la suite o lee este hallazgo. Una suite que se cree más verde de
lo que está es, siguiendo el mismo criterio que ya aplicó `EXP-007`, más
grave que el defecto que la motiva.

**Evidencia técnica.** Cita literal de `factures.feature:44`:
`Y se valida "Literal: <totalEsperado> €"` con `totalEsperado: 121.00` en
la tabla de ejemplos de `TC-060` (línea 39). Cita literal de
`nomines.feature:178`: `| Laia Muñoz Sala | 8 | 2026 | 1500.00 | 200.50 |
1299.50 |` seguida del paso `Y se valida "Literal: <netoEsperado> €"`.
Pantalla observada en vivo tras reproducir `TC-060` a mano: `TOTAL 121,00
€`.

**Hipótesis de causa.** Ninguna: no hace falta. La causa es el cambio de
formato de `SPEC 05`, ya documentado, no un error de código.

**Sugerencia para Doctor QA.** Ninguna — **nunca fue trabajo de Doctor
QA**. Era trabajo de `A-03`/`s10-auto-tcs`, tal como los propios `SPEC 04`
y `SPEC 05` ya señalaron en su nota final, y ya está hecho: `DOC-23` 2.2.0
confirma los 17 `.feature` corregidos y 18/18 casos en verde. Queda un
desfase documental menor y ajeno a este informe — `CLAUDE.md` todavía
describe el estado intermedio («1 caso rojo, TC-048», o el más reciente
«18 rojos nuevos») en vez del estado ya cerrado — pero no es competencia
de A-10 corregirlo.

**deriva_a: null** (ya no pendiente — `A-03`/`S-10` corrigieron y
verificaron los `.feature` afectados; ver `DOC-23` 2.2.0).

---

### EXP-028 · `low` · `mejora` · Nuevo — La fecha de alta de personal se sigue mostrando en formato ISO crudo, distinto del resto de fechas destacadas de la aplicación

**Qué pasa.** `SPEC 05` unificó el formato de fecha de los albaranes
(`DD/MM/AAAA`), pero `Personal.dataAlta` se queda fuera de su alcance —lo
dice el propio spec explícitamente— y sigue mostrándose como
`AAAA-MM-DD`. El resultado es que, hoy, la misma aplicación muestra una
fecha destacada de una forma en `/albarans` y de otra en `/personal/:id`.

**Dónde.** Ficha de empleado, `/personal/1`.

**Reproducción.**

1. Abrir `/personal/1` (Marc Oliveras Puig).
2. Leer el campo «Fecha de alta».
3. Comparar con `/albarans/3`, campo «Fecha».

**Observado.** `/personal/1` muestra `FECHA DE ALTA 2020-01-15`. En la
misma ficha, «Salario base» ya usa el formato nuevo: `1.650,00 €`. En
`/albarans/3`, «Fecha» muestra `21/08/2026`. Es la misma clase de dato
—una fecha destacada de la ficha, no una marca de auditoría— presentada
de dos formas distintas según el módulo.

**Distinción a propósito de `CREADO EL`/`ACTUALIZADO EL`.** Estos campos
de auditoría, presentes en todas las fichas, siguen en formato
`AAAA-MM-DD HH:MM:SS` en toda la aplicación, sin cambios, y **no es lo que
señala este hallazgo**: `SPEC 05` nunca prometió tocarlos y nadie lo
espera de un campo de auditoría. Lo que sí sorprende es la fecha de alta,
que es un dato de negocio visible al mismo nivel que la fecha del albarán.

**Esperado.** Que `Personal.dataAlta` use el mismo `formatDate` que ya
existe en `client/src/utils/format.ts` desde `SPEC 05`. **Por qué se
espera eso:** ni `DOC-04` ni `DOC-06` fijan un formato de fecha, así que
esto es criterio del explorador — pero el argumento no es externo, es el
propio `SPEC 05`, que ya declaró la inconsistencia como riesgo conocido y
aceptado: «`Personal.dataAlta` es queda amb un format diferent del de
l'albarà [...] si es vol coherència total, és un spec futur». Este
hallazgo es la constatación en vivo de ese riesgo ya escrito, no un
descubrimiento.

**Evidencia técnica.** Texto literal de pantalla, `/personal/1`: `FECHA DE
ALTA` seguido de `2020-01-15` (10 caracteres, sin formato). Texto literal
de `/albarans/3`: `FECHA` seguido de `21/08/2026`.

**Hipótesis de causa.** Ninguna necesaria: `SPEC 05`, apartado
«Fora d'abast», ya lo explica — «Cap hallazgo de `DOC-14` els reprodueix;
`formatDate` no s'hi aplica en aquest spec».

**Sugerencia para Doctor QA.** Aplicar `formatDate` de
`client/src/utils/format.ts` a `Personal.dataAlta` en `PersonalDetail.tsx`
es, según el propio `SPEC 05`, un cambio pequeño y ya resuelto en el
mecanismo — falta solo aplicarlo a un fichero más. Es una mejora de
coherencia, no un defecto: nada de la aplicación es incorrecto, solo
inconsistente entre pantallas.

**deriva_a: A-12** (deuda técnica pequeña y acotada, en la línea de
`MEJ-008`, no una funcionalidad nueva).

---

### EXP-019 · `low` · `mejora` · Las pantallas de error no ofrecen salida

**Sin cambios.** No revisado de nuevo. Ver `DOC-14` 1.0.0, `EXP-019`.

**deriva_a: A-12**.

---

### EXP-020 · `low` · `defecto` · El atributo de idioma del documento se queda en «en» en los dos idiomas

**Sin cambios.** No revisado de nuevo. Ver `DOC-14` 1.0.0, `EXP-020`.

**deriva_a: A-14**.

---

### EXP-021 · `low` · `defecto` · Campos sin etiqueta asociada en el alta de líneas de albarán y en la emisión de factura

**Sin cambios,** con una precisión: `AlbaraLiniesSection.tsx` ha cambiado
en esta sesión —`SPEC 04` le añade la guarda de envío y el estado
«Desant…»— pero el cambio no toca las etiquetas ni los `id` de los campos,
así que el hallazgo original sigue exactamente igual. No se ha vuelto a
inspeccionar el árbol de accesibilidad a fondo esta sesión. Ver `DOC-14`
1.0.0, `EXP-021`.

**deriva_a: A-14**.

---

## 5 · Aspecto y presentación

Los cinco hallazgos visuales de `DOC-14` 1.0.0 (`EXP-011`, `EXP-012`,
`EXP-013`, `EXP-020`, `EXP-021`) siguen todos abiertos y sin cambios; ver
la tabla completa en esa versión. Se añaden dos observaciones de esta
sesión:

- **El formato de importe (`EXP-014`) y la fecha del albarán (`EXP-009`,
  presentación) ya no pertenecen a este apartado**: están corregidos.
- **La fecha de alta de personal (`EXP-028`, nuevo)** entra en la misma
  familia que `EXP-009` y `EXP-014` por su naturaleza —coherencia de
  formato entre pantallas—, pero es `low` porque afecta a una sola pantalla
  y a un solo dato, no de forma transversal.

Lo revisado en esta sesión y que salió limpio: el bloque nuevo del importe
del IVA en `/factures/1` no rompe la rejilla, ni en claro ni en oscuro
(ver `EXP-011`, nota de esta versión).

---

## 6 · Preguntas para negocio

**`P-03` queda respondida** por la propia decisión incorporada a `SPEC 05`:
los importes se presentan con coma decimal, separador de miles y símbolo
€. No requiere ninguna acción adicional; se retira de esta lista. El coste
que la pregunta original anticipaba —los literales de `automation/ui/`
quedarían desactualizados— **ya no es una posibilidad, es un hecho
confirmado**: ver `EXP-027`.

Quedan **dos preguntas abiertas**, sin cambios desde `DOC-14` 1.0.0 porque
ninguna decisión de negocio ha llegado sobre ellas:

**P-01 · La decisión de bloquear importes negativos (`Q-12`) ya está
implementada para piezas y líneas de albarán — ¿debe extenderse también al
salario bruto, a las deducciones y al salario neto de una nómina?**
Reformulada en la versión 2.1.2: `SPE-07-importes-negativos`
(`Implemented`, 2026-08-30) resuelve `Q-12` para piezas y albaranes, y
excluye la nómina de forma explícita en su apartado «Fuera de alcance» —
«Acotar cualquier otro importe del sistema no citado por Q-12 (salario de
nómina, importes de factura calculados, etc.)». El contexto de fondo no
cambia; ver `DOC-14` 1.0.0. Última reproducción en vivo, sin cambios desde
entonces: 2026-08-23, el sistema aceptaba un bruto de 1.000 € con
deducciones de 1.500 € y un neto de −500,00 € (`EXP-004`). Confirmado de
nuevo en la versión 2.1.2, por lectura de código y sin reproducir en vivo
—no hay motivo para reabrir lo que nadie ha tocado—: `server/routes/nomines.js`
sigue sin comprobar el signo de `salari_brut`, `deduccions` ni
`salari_net`.

**P-02 · ¿Debe el sistema acotar los valores de calendario y de medida que
hoy no tienen límite: el año de una nómina, el año de matriculación y el
kilometraje de un vehículo?** Contexto sin cambios; ver `DOC-14` 1.0.0.
Reverificado en vivo el 2026-08-23 para el mes/año de nómina (`EXP-005`) y
por observación directa del registro existente para el vehículo
(`EXP-015`).

---

## 7 · Datos dejados en el sistema

**Reversibles: nada pendiente.** Todo lo creado para esta sesión se ha
deshecho desde la propia interfaz, verificado con la API tras cada
borrado:

- Cliente id **19** («Verificacio EXP-001 Doble Clic»), creado para
  verificar `EXP-001` — borrado. `GET /api/clients/19` → 404.
- Vehículo id **8** («Skoda Octavia — 9999VER»), creado para extender la
  verificación de `EXP-001` a un segundo formulario — borrado.
  `GET /api/vehicles/8` → 404.
- La línea añadida al albarán `2026/A-0003` para verificar `EXP-002`
  («Filtre d'oli», 2 unidades) — retirada desde la interfaz. El stock de
  «Filtre d'oli» volvió de 35 a **37**, su valor de partida.
- Nómina id **7** (`7.5/999999`, personal 1, neto −500,00 €), usada para
  reverificar `EXP-004` y `EXP-005` — borrada. `GET /api/nomines/7` → 404.
- No se ha borrado ningún dato del seed ni ningún dato ajeno a esta
  sesión, y no se ha regenerado la base.

**Permanentes, nuevos en esta sesión:**

| Qué queda | Por qué no se puede deshacer |
|---|---|
| Albarán `2026/A-0003` (id 3): la fecha pasó de `2026-08-21T15:16:55.032Z` a `2026-08-21T00:00:00.000Z` | Efecto directo, y ya conocido, de `EXP-009`: guardar el albarán reescribe la fecha a medianoche UTC y no hay forma de recuperar la hora original desde la interfaz |

**Permanentes, heredados de `DOC-14` 1.0.0 (sin cambios en esta sesión):**
cliente id 14, vehículo id 7 (con `any_matriculacio: 2099` y
`quilometratge: -500` a propósito, evidencia viva de `EXP-015`), albaranes
`2026/A-0005` y `2026/A-0006`, facturas `2026/F-0002` y `2026/F-0003`, y el
stock consumido en su momento de «Filtre d'oli» y «Bateria 60Ah». El
detalle completo está en `DOC-14` 1.0.0, apartado 7, y sigue siendo
exacto.

**Permanente, heredado de fuera de esta línea de exploración (constatado,
no producido aquí):** factura `2026/F-0004` (91,36 €, cliente `Anna Puig
Ferrer`), que factura el albarán `2026/A-0001` del seed original. Ver la
nota de Procedencia sobre su origen probable.

Si se prefiere el entorno limpio, `rm -f data/taller.db && npm run seed` lo
devuelve al estado inicial. **No se ha hecho**, por el mismo motivo que
`DOC-14` 1.0.0: destruiría el escenario de cualquier otro trabajo en
curso sobre esta base.

---

## 8 · Pistas descartadas

Se registran para que Doctor QA no gaste tiempo en ellas. Las de `DOC-14`
1.0.0 siguen vigentes (ver esa versión, apartado 8); se añade una de esta
sesión:

**La celda vacía de la rejilla del IVA no es un defecto.** `SPEC 05` avisó
en su tabla de riesgos de que añadir el importe del IVA a `FacturaDetail`
deja una rejilla de 5 elementos en `grid-cols-2`, con una celda vacía tras
«Total». Se ha medido con `getBoundingClientRect()` en claro y en oscuro:
sin solape, sin desbordamiento, cinco filas de 488×36/44 px perfectamente
alineadas. Es exactamente lo que el propio spec predijo — «visualment
inofensiu» — y así se confirma. No se le da número de hallazgo.

---

## 9 · Bloque estructurado

```yaml hallazgos
version: 1
project: app-taller
explorado_en: 2026-08-23T12:20:00+02:00
entorno:
  ui: http://localhost:5173
  api: http://localhost:3001
  navegador: Chromium controlado por herramientas, 1280x720 salvo indicación
  datos: heredados de DOC-14 1.0.0 (2026-08-21) mas la factura 2026/F-0004 (2026-08-22, ajena a esta sesion). No reseedeado.
  commit: 737b9c7425e6f6aa36f476fe62d28c7891efbb5b
  rama: master
  arbol_limpio: false   # solo ficheros no versionados ajenos a la app
cartas:
  - id: CH-12
    mision: Reproducir EXP-001 (doble clic en Guardar, alta de cliente) con datos nuevos
    resultado: cierra
  - id: CH-13
    mision: Reproducir EXP-002 (doble clic en Anadir linea) con datos nuevos
    resultado: cierra
  - id: CH-14
    mision: Extender la verificacion de la guarda a un formulario no probado antes (alta de vehiculo)
    resultado: cierra tambien
  - id: CH-15
    mision: Reproducir EXP-007 (importe del IVA ausente en la factura)
    resultado: cierra
  - id: CH-16
    mision: Reproducir la presentacion de la fecha del albaran y la perdida de hora al editar (EXP-009)
    resultado: presentacion cierra, perdida de hora sigue abierta
  - id: CH-17
    mision: Reproducir EXP-014 (formato de precio) en cinco pantallas
    resultado: cierra
  - id: CH-18
    mision: Revisar el bloque nuevo del importe del IVA en tema oscuro
    resultado: sin hallazgos
  - id: CH-19
    mision: Reverificar EXP-004, EXP-005 y EXP-015 sin tocarlos
    resultado: sin cambios, siguen reproduciendose
  - id: CH-20
    mision: Comparar los literales de importe de los .feature con la pantalla actual
    resultado: hallazgo nuevo EXP-027
  - id: CH-21
    mision: Mirar con ojos frescos la coherencia del formato de fecha entre modulos
    resultado: hallazgo nuevo EXP-028
hallazgos:
  - id: EXP-002
    titulo: Un doble clic en «Añadir línea» duplica la línea y descuenta el stock dos veces
    tipo: defecto
    severidad: critical
    pantalla: Detalle de albarán
    ruta: /albarans/3
    reproducible: si
    cubierto_por_tc: null
    estado: corregido
    corregido_en: 2026-08-23
    corregido_en_version: 2.0.0
    evidencia: 'Un solo POST /api/albarans/3/linies → 201 Created tras doble clic; GET /api/albarans/3 devuelve una sola línea nueva (id 14, quantitat 2); GET /api/peces/1 pasa de estoc 37 a estoc 35'
    hipotesis_causa: null
    sugerencia: null
    deriva_a: A-14
  - id: EXP-003
    titulo: 'Dos pestañas sobre la misma ficha: la última que guarda pisa a la otra sin avisar'
    tipo: defecto
    severidad: high
    pantalla: Edición de cliente
    ruta: /clients/14/editar
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; SPEC 04 no introduce control de concurrencia entre pestañas, lo declara fuera de su alcance'
    hipotesis_causa: null
    sugerencia: Decidir entre bloqueo optimista y fusión por campos; actualitzat_el ya existe en todas las tablas
    deriva_a: null
  - id: EXP-007
    titulo: La ficha de la factura no muestra el importe del IVA
    tipo: defecto
    severidad: high
    pantalla: Detalle de factura
    ruta: /factures/1
    reproducible: si
    cubierto_por_tc: TC-073, TC-075
    estado: corregido
    corregido_en: 2026-08-23
    corregido_en_version: 2.0.0
    evidencia: '/factures/1 muestra IMPORTE DEL IVA 20,66 €, coincidente con iva_import de la API. TC-073 y TC-075 siguen sin validar el IVA en su literal (pendiente de A-03)'
    hipotesis_causa: null
    sugerencia: 'Reforzar TC-073 y TC-075 con un paso Literal: <ivaEsperado> €; trabajo de A-03'
    deriva_a: A-03
  - id: EXP-001
    titulo: Un doble clic en «Guardar» da de alta el registro dos veces
    tipo: defecto
    severidad: high
    pantalla: Alta de cliente
    ruta: /clients/nou
    reproducible: si
    cubierto_por_tc: null
    estado: corregido
    corregido_en: 2026-08-23
    corregido_en_version: 2.0.0
    evidencia: 'Un solo POST /api/clients → 201 Created tras doble clic (cliente id 19 único); confirmado también en alta de vehículo (un solo POST /api/vehicles, vehículo id 8 único), generalización que DOC-14 1.0.0 dejaba como hipótesis no verificada'
    hipotesis_causa: null
    sugerencia: null
    deriva_a: A-14
  - id: EXP-004
    titulo: Una nómina admite deducciones mayores que el bruto y presenta un salario neto negativo
    tipo: defecto
    severidad: high
    pantalla: Detalle de nómina
    ruta: /nomines/nova
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    verificado_en: 2026-08-23
    evidencia: 'POST /api/nomines con salari_brut 1000, deduccions 1500 → 201 Created, salari_net -500. Reproducido de nuevo el 2026-08-23, sin cambios; formato ahora -500,00 € (SPEC 05)'
    hipotesis_causa: server/routes/nomines.js no valida el signo ni la relación bruto/deducciones
    sugerencia: No tocar hasta que negocio conteste P-01
    deriva_a: null
  - id: EXP-006
    titulo: Todos los avisos de error del servidor salen en catalán aunque la interfaz esté en castellano
    tipo: defecto
    severidad: medium
    pantalla: Transversal, los 7 módulos
    ruta: /nomines, /vehicles/nou, /clients/14, /albarans/5, /clients/99999
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; no revisado de nuevo esta sesión, ningún spec toca los mensajes de error del servidor'
    hipotesis_causa: Los res.status(...).json({error:'…'}) de server/routes/*.js llevan el texto incrustado sin pasar por i18next
    sugerencia: Devolver un código de error estable desde la API y traducirlo en el cliente
    deriva_a: A-14
  - id: EXP-005
    titulo: El mes de una nómina admite decimales y el año no tiene ningún límite
    tipo: defecto
    severidad: medium
    pantalla: Edición de nómina
    ruta: /nomines/7/editar
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    verificado_en: 2026-08-23
    evidencia: 'PUT /api/nomines/7 con mes 7.5, any_nomina 999999 → 200 OK. Reproducido de nuevo el 2026-08-23, sin cambios'
    hipotesis_causa: La validación de servidor comprueba el intervalo 1-12 pero no la integralidad; sobre el año no hay comprobación
    sugerencia: Exigir entero en el mes; el año, pendiente de P-02
    deriva_a: null
  - id: EXP-008
    titulo: Una ruta que no existe deja una página completamente en blanco, sin siquiera el menú
    tipo: defecto
    severidad: medium
    pantalla: Ruta desconocida
    ruta: /ruta-que-no-existe
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; no revisado de nuevo, ningún spec toca App.tsx'
    hipotesis_causa: client/src/App.tsx no declara ninguna ruta comodín path="*"
    sugerencia: Ruta comodín dentro del Layout reutilizando el componente de estado de error
    deriva_a: A-15
  - id: EXP-009
    titulo: La fecha del albarán ya se presenta bien, pero al editar el albarán se sigue perdiendo la hora
    tipo: defecto
    severidad: medium
    pantalla: Listado y detalle de albarán
    ruta: /albarans
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    corregido_parcialmente_en: 2.0.0
    evidencia: 'Presentación cerrada: /albarans y /albarans/3 muestran 21/08/2026. Defecto de fondo vigente: editar el albarán 3 sin cambiar nada reescribe su fecha de 2026-08-21T15:16:55.032Z a 2026-08-21T00:00:00.000Z, verificado el 2026-08-23. SPEC 05 lo declara fuera de su alcance explícitamente'
    hipotesis_causa: Decisión de modelo de datos pendiente — si el albarán guarda fecha o fecha y hora
    sugerencia: Decidir el modelo antes de tocar el guardado; no es un arreglo de presentación
    deriva_a: A-14
  - id: EXP-010
    titulo: El desplegable de piezas del albarán sigue ofreciendo el stock viejo después de añadir una línea
    tipo: defecto
    severidad: medium
    pantalla: Detalle de albarán
    ruta: /albarans/3
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; no revisado de nuevo, ningún spec recarga el catálogo tras añadir línea'
    hipotesis_causa: El catálogo de piezas solo se carga al montar el componente
    sugerencia: Recargar el catálogo al añadir y al retirar línea
    deriva_a: A-14
  - id: EXP-011
    titulo: En tema oscuro los enlaces de las fichas quedan por debajo del contraste mínimo legible
    tipo: defecto
    severidad: medium
    pantalla: Fichas de detalle, tema oscuro
    ruta: /factures/1
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0. Comprobado de paso que el bloque nuevo del IVA (SPEC 05) no repite el problema: usa dark:text-slate-400/dark:text-slate-100, con variante oscura'
    hipotesis_causa: 'Clase text-primary-600 sin variante dark:, en 18 apariciones'
    sugerencia: Extraer un componente o clase de utilidad
    deriva_a: A-14
  - id: EXP-012
    titulo: En anchura de móvil la barra lateral no se repliega y todos los botones de acción quedan fuera
    tipo: defecto
    severidad: medium
    pantalla: Transversal
    ruta: /albarans/5
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; no revisado de nuevo, ningún spec toca Layout.tsx'
    hipotesis_causa: 'client/src/components/Layout.tsx declara el menú con ancho fijo, sin punto de ruptura'
    sugerencia: No tocar hasta que producto diga si el móvil está en alcance
    deriva_a: null
  - id: EXP-013
    titulo: Un nombre largo ensancha la columna y expulsa el resto de la tabla fuera de la pantalla
    tipo: defecto
    severidad: medium
    pantalla: Listado de clientes
    ruta: /clients
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; DataTable.tsx no forma parte de ningún spec'
    hipotesis_causa: 'DataTable.tsx sin table-fixed, sin contenedor con desplazamiento propio y sin truncado en celdas'
    sugerencia: Es un componente único; el arreglo cubre los siete listados de golpe
    deriva_a: A-14
  - id: EXP-014
    titulo: El mismo precio se presentaba de tres formas distintas según la pantalla
    tipo: defecto
    severidad: medium
    pantalla: Catálogo de piezas y fichas
    ruta: /peces
    reproducible: si
    cubierto_por_tc: null
    estado: corregido
    corregido_en: 2026-08-23
    corregido_en_version: 2.0.0
    evidencia: 'Verificado en /peces (8,50 €), /peces/1, /albarans/3, /factures/1 (98,40 €, 20,66 €, 119,06 €) y /nomines (1.360,00 €, separador de miles incluido). Ninguna pantalla revisada conserva punto decimal'
    hipotesis_causa: null
    sugerencia: null
    deriva_a: A-03
  - id: EXP-015
    titulo: Un vehículo admite año de matriculación futuro y kilometraje negativo
    tipo: defecto
    severidad: medium
    pantalla: Alta de vehículo
    ruta: /vehicles/nou
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    verificado_en: 2026-08-23
    evidencia: 'GET /api/vehicles/7 sigue devolviendo any_matriculacio 2099 y quilometratge -500, sin cambios desde DOC-14 1.0.0'
    hipotesis_causa: null
    sugerencia: Esperar a P-02
    deriva_a: null
  - id: EXP-016
    titulo: Los formularios llevan la validación del navegador desactivada
    tipo: defecto
    severidad: medium
    pantalla: Edición de cliente
    ruta: /clients/14/editar
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; EntityForm.tsx cambia con SPEC 04 pero noValidate no se toca'
    hipotesis_causa: 'client/src/components/EntityForm.tsx declara el formulario con noValidate'
    sugerencia: Decidir antes si la validación de formato la hace el navegador, el cliente o el servidor
    deriva_a: A-14
  - id: EXP-017
    titulo: Se puede abandonar un formulario a medio rellenar sin ningún aviso y lo escrito se pierde
    tipo: mejora
    severidad: medium
    pantalla: Todos los formularios
    ruta: /clients/3/editar
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0'
    hipotesis_causa: null
    sugerencia: Un aviso de cambios sin guardar enganchado a la navegación interna y a beforeunload
    deriva_a: A-12
  - id: EXP-018
    titulo: Retirar una línea de albarán no pide confirmación, a diferencia de todos los demás borrados
    tipo: defecto
    severidad: medium
    pantalla: Detalle de albarán
    ruta: /albarans/3
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Confirmado de paso al deshacer la línea de prueba de EXP-002: sigue sin diálogo. SPEC 04 excluye explícitamente los botones de borrado de su alcance'
    hipotesis_causa: null
    sugerencia: Reutilizar ConfirmDialog; consultar antes a negocio
    deriva_a: null
  - id: EXP-022
    titulo: El desplegable de vehículos no dice de qué cliente es cada vehículo
    tipo: mejora
    severidad: medium
    pantalla: Edición de albarán
    ruta: /albarans/5/editar
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0'
    hipotesis_causa: null
    sugerencia: Filtrar por cliente al editar; al crear hay que poder elegir cualquiera
    deriva_a: A-15
  - id: EXP-023
    titulo: El listado de nóminas no dice de qué empleado es cada nómina
    tipo: mejora
    severidad: medium
    pantalla: Listado de nóminas
    ruta: /nomines
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0; los importes ya llevan el formato de SPEC 05 pero la columna de empleado sigue sin existir'
    hipotesis_causa: null
    sugerencia: El dato ya viaja en la respuesta de la API
    deriva_a: A-15
  - id: EXP-024
    titulo: Al emitir una factura la lista de albaranes pendientes solo muestra el número
    tipo: mejora
    severidad: medium
    pantalla: Emisión de factura
    ruta: /factures/nova
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0'
    hipotesis_causa: null
    sugerencia: Comprobar si la respuesta que ya alimenta la pantalla trae el importe por albarán
    deriva_a: A-15
  - id: EXP-025
    titulo: El manual describe como vigente el comportamiento de stock que ya se corrigió
    tipo: defecto
    severidad: medium
    pantalla: Documentación
    ruta: docs/DOC-06-MANUAL-USUARIO.md
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Texto sin cambios, solo desplazado de línea por el crecimiento del documento: ahora en DOC-06:490 y DOC-06:806 (antes 449-451 y 763-766). La resincronización de DOC-06 a 1.3.0 no tocó estos dos párrafos'
    hipotesis_causa: Documentación no actualizada tras la corrección de BUG-001
    sugerencia: No es trabajo de Doctor QA sino de A-04
    deriva_a: null
  - id: EXP-026
    titulo: El diálogo de confirmación de borrado no dice qué registro se va a borrar
    tipo: mejora
    severidad: medium
    pantalla: Diálogo de confirmación
    ruta: /clients/19
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Confirmado de paso al borrar los cuatro registros de prueba de esta sesión: el diálogo sigue sin nombrar el registro en ningún caso'
    hipotesis_causa: null
    sugerencia: 'ConfirmDialog.tsx es único; pasarle el nombre cubre todos los borrados'
    deriva_a: A-12
  - id: EXP-027
    titulo: Los .feature de facturas y nóminas validaban literales de importe con punto decimal que ya no coincidían con la pantalla
    tipo: defecto
    severidad: high
    pantalla: Suite automatizada (meta)
    ruta: automation/ui/src/test/resources/features/factures.feature, nomines.feature
    reproducible: si
    cubierto_por_tc: TC-060, TC-061, TC-069, TC-070, TC-071, TC-072, TC-073, TC-075, TC-098, TC-099, TC-100
    estado: corregido
    corregido_en: 2026-08-24
    corregido_en_version: 2.1.0
    evidencia: 'Cierre confirmado por DOC-23-INFORME-EJECUCION-TCS-UI.md 2.2.0 (S-10), no por exploracion en vivo: parrafo 4.2 documenta los 17 .feature corregidos a coma decimal (incluye factures.feature y nomines.feature, verificados a mano en la sesion original) y parrafo 4.3 confirma TC-103 transitorio; 18 de 18 casos rojos re-ejecutados en verde, contrastado contra testng-results.xml. Evidencia original de la sesion 2.0.0: factures.feature:44 fijaba totalEsperado 121.00 en TC-060, la pantalla mostraba TOTAL 121,00 €; nomines.feature:178 fijaba netoEsperado 1299.50 en TC-100'
    hipotesis_causa: null
    sugerencia: null
    deriva_a: null
  - id: EXP-028
    titulo: La fecha de alta de personal se sigue mostrando en formato ISO crudo, distinto del resto de fechas destacadas
    tipo: mejora
    severidad: low
    pantalla: Ficha de empleado
    ruta: /personal/1
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: '/personal/1 muestra FECHA DE ALTA 2020-01-15 (sin formatear) en la misma ficha donde SALARIO BASE ya muestra 1.650,00 €. /albarans/3 muestra FECHA 21/08/2026'
    hipotesis_causa: 'SPEC 05 declara Personal.dataAlta fuera de su alcance explícitamente'
    sugerencia: Aplicar formatDate de client/src/utils/format.ts a PersonalDetail.tsx
    deriva_a: A-12
  - id: EXP-019
    titulo: Las pantallas de error no ofrecen salida, solo «Volver a intentarlo», que vuelve a fallar
    tipo: mejora
    severidad: low
    pantalla: Estado de error de ficha
    ruta: /clients/99999
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0'
    hipotesis_causa: null
    sugerencia: Distinguir en ErrorState.tsx entre error recuperable y registro inexistente
    deriva_a: A-12
  - id: EXP-020
    titulo: El atributo de idioma del documento se queda en «en» en los dos idiomas
    tipo: defecto
    severidad: low
    pantalla: Transversal
    ruta: /clients
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios desde DOC-14 1.0.0'
    hipotesis_causa: null
    sugerencia: Ajustar document.documentElement.lang donde se aplica el cambio de idioma
    deriva_a: A-14
  - id: EXP-021
    titulo: Campos sin etiqueta asociada en el alta de líneas de albarán y en la emisión de factura
    tipo: defecto
    severidad: low
    pantalla: Formulario de línea de albarán y emisión de factura
    ruta: /albarans/3
    reproducible: si
    cubierto_por_tc: null
    estado: abierto
    evidencia: 'Sin cambios; AlbaraLiniesSection.tsx cambia con SPEC 04 (guarda de envío) pero no toca etiquetas ni id de campos'
    hipotesis_causa: null
    sugerencia: Dar id a los campos y htmlFor a las etiquetas en esos dos formularios
    deriva_a: A-14
preguntas_negocio:
  - id: P-01
    pregunta: 'La decisión de bloquear importes negativos (Q-12) ya está implementada para piezas y líneas de albarán (SPE-07, Implemented 2026-08-30, que excluye la nómina de forma explícita) — ¿debe extenderse también al salario bruto, las deducciones y el neto de una nómina?'
    relacionada_con: EXP-004
    estado: abierta
    reformulada_en: 2.1.2
  - id: P-02
    pregunta: ¿Debe el sistema acotar el año de una nómina, y el año de matriculación y el kilometraje de un vehículo?
    relacionada_con: EXP-005, EXP-015
    estado: abierta
  - id: P-03
    pregunta: ¿Los importes deben presentarse con la coma decimal del castellano y del catalán en lugar del punto que se usa hoy?
    relacionada_con: EXP-014
    estado: respondida
    respuesta: 'Sí, coma decimal, separador de miles y símbolo €. Incorporada directamente a SPEC 05, verificada en vivo el 2026-08-23'
verificacion_de_correcciones:
  - spec: SPEC 04 - proteccio-enviaments-duplicats
    estado: cerrado
    comprobado_el: 2026-08-23
    hallazgos_que_cierra: EXP-001, EXP-002
    evidencia: 'Doble clic en Guardar (cliente y vehículo) y en Añadir línea producen un solo POST en los tres casos, verificado en el panel de red y en la API'
  - spec: SPEC 05 - presentacio-imports-i-dates
    estado: cerrado parcialmente
    comprobado_el: 2026-08-23
    hallazgos_que_cierra: EXP-007, EXP-014
    hallazgos_que_cierra_parcialmente: EXP-009 (solo presentación; la pérdida de hora al editar sigue abierta, declarada fuera de alcance por el propio spec)
    evidencia: 'Importe del IVA visible y correcto en /factures/1; formato de coma decimal y separador de miles verificado en 5 pantallas; fecha de albarán en DD/MM/AAAA en listado y ficha'
datos_dejados:
  reversibles: 'Nada pendiente. Borrados desde la interfaz y confirmados por API: cliente id 19, vehículo id 8, nómina id 7, y la línea de prueba del albarán 2026/A-0003 (stock de Filtre d''oli restaurado de 35 a 37). No se ha borrado ningún dato del seed ni ajeno'
  permanentes: 'Nuevo en esta sesión: la fecha del albarán 2026/A-0003 quedó en 2026-08-21T00:00:00.000Z (perdió la hora original 15:16:55.032Z) como efecto directo, ya conocido, de verificar EXP-009. Heredado de DOC-14 1.0.0 sin cambios: cliente id 14, vehículo id 7 (any_matriculacio 2099, quilometratge -500, evidencia de EXP-015), albaranes 2026/A-0005 y 2026/A-0006, facturas 2026/F-0002 y 2026/F-0003. Constatado, no producido por esta sesión: factura 2026/F-0004 (91,36 €), de origen probable en la verificación manual de SPEC 04'
```

---

**Nota final para quien apruebe este informe.** Nada de lo que hay aquí es
una orden. `SPEC 04` y `SPEC 05` cierran, verificado en vivo, cuatro de los
cinco hallazgos de los que nacieron; el quinto (`EXP-009`) lo cierran solo
a medias, y así queda dicho tanto aquí como en el propio spec. `EXP-004`,
`EXP-005` y `EXP-015` **siguen sin tocarse** a la espera de `P-01`/`P-02`.
`EXP-027` nunca fue un defecto de la aplicación —era una factura pendiente
con `A-03`— y en esta versión 2.1.0 queda saldada: `DOC-23` 2.2.0 confirma
que `A-03`/`S-10` corrigieron los `.feature` afectados y que la suite pasa
18 de 18 en los casos que estaban en rojo. Sigue pendiente, y ajeno a este
informe, que `CLAUDE.md` refleje ese cierre en vez del estado intermedio
que todavía describe. **Añadido en la versión 2.1.2:** `BUG-003` y
`BUG-004` de `DOC-24` —que este informe nunca originó, solo mencionaba de
paso— están también cerrados (`SPE-07` y `SPE-08`, ambos `Implemented` y
verificados en vivo); `P-01` se reformula para preguntar por la extensión a
nóminas de una decisión que, para piezas y albaranes, ya está tomada y
construida.
