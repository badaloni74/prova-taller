---
doc_id: DOC-25
doc_name: DOC-25-PROPUESTAS-FUNCIONALES
version: 1.3.0
status: draft
generator: A-15 propuestas de funcionalidad
generator_version: "1.1"
generated_at: 2026-08-31T21:00:00+02:00
language: es
history_document: docs/DOC-25-PROPUESTAS-FUNCIONALES-HIST.md
history_note: >-
  este documento no lleva historial de cambios. Refleja solo el estado actual, con su version
  en este front-matter. Que cambio en cada version, y por que, esta en el fichero -HIST.md
source:
  repo_path: C:\Claude\AppDani
  vcs: git
  branch: master
  commit_sha: 6c8a8701a6db694fb21ee951646a4023f32308f3
  working_tree_clean: false   # sin versionar y ajenos a este documento: ApuntsAgentsISkills.txt, dashboard/, docs/DOC-09-IMPACTO-factura-rectificativa.md
inputs:
  - id: DOC-25-PROPUESTAS-FUNCIONALES.md
    from: A-15
    version: 1.2.2
    hash: sha256:d8990ff4a81f5c0a89e941021cde087977cd49bf14ef41134ad126b8c367ccfa
    present: true
    usage: >-
      documento anterior. Manda sobre esta ronda: las doce propuestas FUN-001 a FUN-012 se
      conservan con su numero y su texto, y solo se toca lo que la nueva evidencia obliga a tocar
  - id: DOC-01-BASE-ASIS.md
    from: S-01
    version: 1.3.0
    hash: sha256:aff457ef04ccfee18f7bb2c72cfd62b71dd4e9d7d498bbabdf921ab0ef0bd2b4
    present: true
    changed_since_previous_run: true
    previous_version_declared: 1.1.0
    change_note: >-
      motivo de esta ronda (1.3.0). El `obsolescence_ack` de la 1.2.2 solo cubría hasta 1.2.0
      (SPE-06); DOC-01 subió después a 1.3.0 (`DOC-01-BASE-ASIS-HIST.md`, 2026-08-31) por SPE-07
      y SPE-08, ya `Implemented`: nace `UC-FAC-05` (rectificar una factura), cinco reglas de
      negocio nuevas (`BR-PEC-03`/`BR-PEC-04` precio-coste-estoc de pieza siempre positivos,
      `BR-ALB-11` precio de línea siempre positivo, `BR-FAC-10`/`BR-FAC-11` la rectificación
      libera albaranes y no puede repetirse), se cierra `Q-06` y se reescribe la nota de §3.5
      sobre la vida de la factura. **Ninguna `FUN-nnn` depende de esta superficie**: las cinco
      reglas nuevas formalizan comportamiento que este documento ya trataba a través de
      `DOC-24/BUG-003` y `BUG-004` (ver apartado 1 y la entrada de `DOC-24` más abajo), no
      abren ni cierran ninguna propuesta por sí mismas. Verificado leyendo el `-HIST.md`
      completo de la 1.3.0, no solo el número de versión
  - id: DOC-04-FUNCIONAL.md
    from: A-02
    version: 1.3.2
    hash: sha256:72e167ee9943d429669e32c8c2f5abe5e2c27a7756756617411f9dab3eae053c
    present: true
    changed_since_previous_run: true
    previous_version_declared: 1.2.0
    change_note: >-
      motivo original de esta ronda (1.3.0): el `obsolescence_ack` de la 1.2.2 solo cubría
      hasta 1.3.1 (SPE-06: REQ-080/081, renumeración Q-16→Q-30, sin efecto ya reconocido).
      DOC-04 subió después a 1.3.2 (PATCH): corrige la atribución de bug de `Q-02` —citaba
      `BUG-003`, que es el de `Q-12`; el suyo es `BUG-001`, ya `fixed`— y sustituye en `Q-02`,
      `Q-06` y `Q-12` las referencias muertas a `A-06`/`DOC-08` por el mecanismo vigente
      (`/spec` → `specs/*.md`). **Ningún `REQ-nnn` cambia de enunciado ni de número; ninguna
      `FUN-nnn` nace ni se descarta por ello.** Sí obliga a corregir, en este mismo documento,
      la lectura de qué bugs siguen abiertos: ver apartado 1 y la entrada de `DOC-24` más abajo
    usage: requisitos REQ-001 a REQ-081, diez preguntas abiertas y seis respondidas el 2026-08-16
  - id: DOC-06-MANUAL-USUARIO.md
    from: A-04
    version: 1.3.0
    hash: sha256:c081aea157c978d8ffcfffaed9fa9b33fc10106fa47498277f07c9720ef26067
    present: true
    changed_since_previous_run: false
    hash_changed_note: >-
      el hash cambia respecto al declarado en 1.2.1 por el mismo commit c71c580 que tocó DOC-01 y
      registro-ids.json: dos rutas de spec en el front-matter (`specs/04-...md` ->
      `specs/implemented/SPE-04-...md`, `specs/05-...md` -> `specs/implemented/SPE-05-...md`).
      Verificado el diff completo: solo esas dos líneas de referencia. §6 y §9, el único alcance
      que A-15 lee de este documento por contrato, no cambian ni una palabra. Sin efecto sobre
      ninguna FUN-nnn
    scope: solo §6 (que no puede hacer la aplicacion todavia) y §9 (preguntas abiertas), por contrato
    change_note: >-
      1.3.0 (ronda 1.2.0 de este documento) añadió dos avisos sobre comportamiento ya implementado
      (guarda de reenvio de SPEC 04, formato de importes/fechas de SPEC 05): no son funcionalidad
      nueva, son defectos ya corregidos. §6.1 sigue con las mismas catorce carencias, mismo texto.
      §9 gana una pregunta nueva (Q-30, sobre que ve el usuario ante una anotacion invalida) que es
      hueco de documentacion, no de producto. Ninguna carencia de §6.1 se ha movido de dueño
  - id: DOC-24-BUGS.json
    from: A-14
    version: 1.1.2
    hash: sha256:d62b236309a76e6e01b7f4fcf7962e8553ef70bbd569ac499da7c069f340f84b
    present: true
    changed_since_previous_run: true
    previous_version_declared: 1.0.0
    change_note: >-
      motivo real de esta ronda. Ninguna ronda de A-15 había vuelto a leer DOC-24 desde la
      1.0.0: en ese intervalo pasó a 1.1.2 y los cuatro bugs censados —BUG-001 y BUG-002 el
      2026-08-21 (commit directo ed61c24, sin /spec), BUG-003 el 2026-08-30 (/spec SPE-07) y
      BUG-004 el 2026-08-31 (/spec SPE-08)— quedaron `status: fixed`, los cuatro verificados en
      vivo. Este documento seguía citando BUG-003 y BUG-004 como problema abierto en varios
      sitios (tabla del apartado 5.1, FUN-002, hallazgos hacia A-12): corregido esta ronda, ver
      apartado 1. El candidato a BUG-005 (avisos de error en catalán) sigue sin censar
    note: los cuatro bugs censados (BUG-001 a BUG-004) están fixed; el candidato BUG-005 sigue sin censar
  - id: DOC-16-ROADMAP.md
    from: A-12
    version: 3.3.0
    hash: sha256:15de983990c869bfee4e1b4e5659438b516baa2ab5a3eed2e09d0d9642bafe9d
    present: true
    changed_since_previous_run: true
    previous_version_declared: 3.1.0
    scope: >-
      el apartado 6 (hallazgos dirigidos a A-15) y, nuevo esta ronda, §1.8 (delta 3.3.0), la
      evidencia técnica que explica el cierre de BUG-003/BUG-004
    change_note: >-
      motivo original de la ronda 1.2.2 quedó resuelto (ver -HIST.md, entrada 1.2.2); su
      obsolescence_ack solo cubría hasta 3.2.0 (delta acotada de S-17/A-05, sin efecto ya
      reconocido). Esta ronda (1.3.0) consume la 3.3.0 real: §1.8 registra que BUG-003 y
      BUG-004 —los dos últimos de los cuatro defectos que sostenían MEJ-004— se cierran,
      verificados en vivo (SPE-07, SPE-08), y que ninguno pasó por un módulo de dominio
      compartido: SPE-07 deja además una duplicación verbatim de la misma regla en peces.js
      (POST y PUT). MEJ-004 no cambia de tamaño, dificultad ni estado —sigue proposed—, solo
      crece su evidencia. §6.1, §6.2 y §6.3 siguen sin matiz nuevo para A-15 (FUN-009 a
      FUN-012 y la redirección de REQ-025/REQ-034 a A-14, ya recogidas). §6.4 cierra
      formalmente hacia A-14 el hallazgo del censo de defectos desactualizado — no es mío,
      pero confirma independientemente lo que esta ronda de DOC-25 encontró leyendo DOC-24
      directamente (ver esa entrada, más abajo). §6.9 sigue dirigido a A-02, no se recoge aquí.
      Ninguna FUN-nnn nace ni cambia de estado por este delta; sí cambia, en este documento, el
      hallazgo hacia A-12 sobre el patrón de validación común (apartado 6), que gana el mismo
      ejemplo que §1.8 documenta
    usage: >-
      se lee por sus hallazgos §6.1 a §6.4 y §6.9, por el estado de las mejoras que atienden
      hallazgos que A-15 dirigió a A-12, y por §1.8 como evidencia técnica del cierre de
      BUG-003/BUG-004. El resto del roadmap no es materia de A-15
  - id: DOC-14-INFORME-EXPLORADOR-QA.md
    from: A-10
    version: 2.1.0
    hash: sha256:f1449e133c2eacf224467c55c01d9bcc4fb6bee9443d239fd27867ae1cd5b7ee
    present: true
    changed_since_previous_run: false
    previous_version_declared: 2.1.0
    first_read_in: 1.2.0
    scope: >-
      solo las fichas EXP-nnn que DOC-16/§6 cita como dirigidas a A-15 (EXP-003, EXP-017,
      EXP-019, EXP-026), y las dos nuevas del ciclo (EXP-027, EXP-028) para confirmar que
      ninguna es mia. No se ha auditado el informe entero: sigue sin ser una entrada formal de
      A-15, solo se abre para verificar lo que DOC-16 cita literalmente
    change_note: >-
      resello puro de procedencia. 2.0.0 -> 2.1.0 (via 2.0.1) es A-10 resincronizando su propia
      entrada de DOC-23 (2.0.0 -> 2.2.0) y cerrando EXP-027 (abierto -> corregido) porque S-10
      ya corrigio los .feature de automation/ui que citaban literales con punto decimal. Releidas
      las doce FUN-nnn de este documento: ninguna cita EXP-027 ni depende de su estado. La unica
      mencion que este documento le hacia era en este mismo campo `scope`/`usage`, para confirmar
      que derivaba a A-03 y no a A-15 -algo que ya era cierto con EXP-027 abierto y lo sigue
      siendo corregido-. Sin efecto sobre ninguna FUN-nnn ni sobre el apartado 5.7
    usage: >-
      detalle de reproduccion de los tres hallazgos de UX y del hallazgo de concurrencia que
      DOC-16 §6.1/§6.2 reenvia a A-15, y verificacion de que EXP-027 (→A-03, ya corregido en
      2.1.0) y EXP-028 (→A-12, ya MEJ-009) no me corresponden
  - id: registro-ids.json
    from: S-12
    present: true
    hash: sha256:bc54df9a531287e953975a311cea55a25297ecba3ce50d403f91dc6106528b97
    read_at: 2026-08-28
    hash_changed_note: >-
      el hash declarado en 1.2.1 (9f5b3679...) ya no correspondía al fichero: entre medias lo
      tocaron el commit 3f10869 (censo real de FUN-009 a FUN-012, la ronda 1.2.0 de este mismo
      documento) y el c71c580 (dos rutas de spec renombradas en dos anclas BR-SHL-01/02, ajenas a
      A-15). Recontado: siguen siendo doce anclas FUN, FUN-001 a FUN-012, todas presentes
    scope: "FUN-001 a FUN-012 censados, dueño A-15. Los doce están en proposed. Nada que reclamar esta ronda"
  - id: contexto-confluence
    from: I-02
    present: false
not_read_by_contract:
  - id: DOC-02-TECNICA.md
    from: S-01
    reason: >-
      prohibido para A-15. Las propuestas nacen de lo que el sistema hace para quien lo usa, no
      de como esta construido
  - id: DOC-07-TRAZABILIDAD.md
    from: A-05
    reason: >-
      no es entrada formal de A-15. Se ha citado puntualmente (§3.11, A-05-11c) solo porque
      DOC-16/§6.3 remite ahi para el detalle tecnico de REQ-025/REQ-034, y ese detalle es lo que
      permite decidir si el hallazgo es funcionalidad o defecto. No se ha leido el documento
      completo ni se trata como fuente de carencias propia
obsolescence_response:
  raised_by: S-16
  round: 1.3.0
  findings:
    - finding: "DOC-25 1.2.2 declaraba DOC-04 en 1.2.0 (ack solo hasta 1.3.1), y DOC-04 habia subido a 1.3.2"
      resolved: true
      how: >-
        releido DOC-04 1.3.2: corrige metadatos de tres open_questions (Q-02, Q-06, Q-12) sin
        tocar ningun REQ-nnn. Al leer el diff real se encontro que el propio texto de Q-06 y
        Q-12 seguia describiendo BUG-004 y BUG-003 como abiertos -cierto cuando A-02 escribio
        esa version (2026-08-30), ya no cierto el 2026-08-31-. Eso llevo a leer DOC-24
        directamente en vez de conformarse con un resello, y ahi esta el hallazgo real de esta
        ronda: ver el siguiente finding
    - finding: "DOC-24-BUGS.json (entrada opcional) llevaba desde la ronda 1.0.0 de este documento sin releerse: declarada 1.0.0, real 1.1.2"
      resolved: true
      how: >-
        los cuatro bugs censados constan `fixed` -BUG-001/BUG-002 desde el 2026-08-21 (commit
        directo), BUG-003 desde el 2026-08-30 (SPE-07) y BUG-004 desde el 2026-08-31 (SPE-08)-,
        los cuatro verificados en vivo. Este documento seguia citando BUG-003 y BUG-004 como
        problema sin resolver en la tabla del apartado 5.1, en FUN-002 y en los hallazgos hacia
        A-12: corregido. Detalle completo en el apartado 1 del cuerpo del documento
    - finding: "DOC-25 1.2.2 declaraba DOC-01 en 1.1.0 (ack solo hasta 1.2.0), y DOC-01 habia subido a 1.3.0"
      resolved: true
      how: >-
        releido DOC-01-BASE-ASIS-HIST.md 1.3.0: SPE-07 y SPE-08 (ya Implemented) añaden
        UC-FAC-05 y cinco reglas de negocio (BR-PEC-03/04, BR-ALB-11, BR-FAC-10/11) que
        formalizan exactamente el mismo cierre de BUG-003/BUG-004 ya tratado en el finding
        anterior. Ninguna FUN-nnn nace ni cambia por esta superficie
    - finding: "DOC-25 1.2.2 declaraba DOC-16 en 3.1.0 (ack solo hasta 3.2.0), y DOC-16 habia subido a 3.3.0"
      resolved: true
      how: >-
        releido DOC-16 3.3.0 §1.8: BUG-003 y BUG-004 se cierran sin pasar por un modulo de
        dominio compartido, y SPE-07 deja una duplicacion verbatim de la misma regla en
        peces.js. MEJ-004 no cambia de tamaño, dificultad ni estado -sigue proposed-, solo
        crece su evidencia. Actualizado el hallazgo hacia A-12 en el apartado 6 de este
        documento con el mismo ejemplo
  history:
    - round: 1.2.2
      findings:
        - finding: "DOC-25 1.2.1 declaraba DOC-16 en 3.0.0, y DOC-16 habia subido a 3.1.0"
          resolved: true
          how: >-
            releido DOC-16 3.1.0 (apartado 6 entero, motivo del salto: nace DOC-27 -primer
            informe de la suite de servicio, S-17- y A-12 revisa las nueve MEJ-nnn contra esa
            evidencia). Verificado explicitamente: ninguna MEJ-nnn cambia de estado ni nace
            ninguna nueva esta ronda -crece la evidencia de MEJ-002, MEJ-003 y MEJ-004, se
            matiza la de MEJ-006, sin tocar tamaño, dificultad ni dependencias-. §6.1 y §6.2
            confirman que EXP-017/EXP-026/EXP-019/EXP-003 "ya recogidos" como FUN-009 a
            FUN-012 en esta misma DOC-25; §6.3 confirma que la decision de A-15 de no proponer
            FUN-nnn para REQ-025/REQ-034 ya quedo registrada; §6.9 (nuevo) va dirigido a A-02,
            no a A-15. Ninguna de las doce FUN-nnn de este documento depende de una MEJ-nnn que
            haya cambiado de estado ni de una cifra de DOC-16 que este documento reproduzca:
            resello puro. Aprovechada la ronda para verificar version declarada vs real y hash
            declarado vs calculado en el resto de `inputs`: DOC-01 y DOC-06 (mismo commit
            c71c580, dos rutas de spec renombradas, sin cambio de version ni de contenido
            sustantivo) y registro-ids.json (commits 3f10869 y c71c580) llevaban hash
            desactualizado sin cambio de version. Los tres corregidos; ninguno cambia el fondo
            de ninguna FUN-nnn
    - round: 1.2.1
      findings:
        - finding: "DOC-25 1.2.0 declaraba DOC-14 en 2.0.0, y DOC-14 habia subido a 2.1.0 (via 2.0.1)"
          resolved: true
          how: >-
            releido DOC-14 2.1.0 y su -HIST.md: el unico cambio de fondo es que EXP-027 pasa de
            abierto a corregido, porque S-10 ya corrigio los .feature de automation/ui que
            DOC-23 2.2.0 confirma en verde. Verificado ancla a ancla que ninguna de las doce
            FUN-nnn de este documento cita EXP-027 ni depende de su estado -la unica mencion era
            de procedencia (scope/usage de la propia entrada), no evidencia de ninguna propuesta.
            Resello puro: version y hash reales declarados, sin tocar ninguna FUN-nnn ni el cuerpo
            del documento
    - round: 1.2.0
      findings:
        - finding: "DOC-25 1.1.1 declaraba DOC-01 en 1.0.0, DOC-06 en 1.2.0 y DOC-16 en 2.0.0, y los tres habian subido"
          resolved: true
          how: >-
            releidos DOC-01 1.1.0 (sin cambio de negocio, verificado contra su -HIST), DOC-06 1.3.0
            (§6 y §9 completos, sin carencias nuevas en §6.1) y DOC-16 3.0.0 (apartado 6 entero).
            Version y hash reales declarados en cada entrada
        - finding: "DOC-16 3.0.0 §6.1 reafirma tres hallazgos de UX dirigidos a A-15 (EXP-017, EXP-026, EXP-019) que ninguna ronda de DOC-25 habia convertido en propuesta"
          resolved: true
          how: "nacen FUN-009, FUN-010 y FUN-011. Ver apartado 3"
        - finding: "DOC-16 3.0.0 §6.2 (EXP-003, concurrencia) y §6.3 (REQ-025/REQ-034 sin cumplir) no habian sido evaluados nunca por A-15"
          resolved: true
          how: >-
            §6.2 da lugar a FUN-012. §6.3 se evalua y **no** da lugar a una FUN-nnn: por el mismo
            criterio que ya aplica este documento a los avisos en catalan (un requisito vigente no
            cumplido es defecto, no funcionalidad ausente), se redirige a A-14. Ver apartados 5.4,
            5.6 y 6
obsolescence_ack:
  - input: DOC-06
    upto: 1.4.1
    date: 2026-08-29
    note: "SPE-06: propagación de BR-ALB-10 al manual y renumeración de Q. Sin efecto sobre las propuestas funcionales. Sigue vigente esta ronda: DOC-06 real sigue en 1.4.1, no ha subido más."
---

# DOC-25 · Propuestas de funcionalidad — app-taller

> Qué le falta a esta aplicación para servir mejor al taller que la usa. Está
> escrito en lenguaje de negocio y **lo decide negocio, no este documento**: aquí
> solo se propone, se justifica y se ordena.
>
> **No contiene refactorizaciones, deuda técnica ni cobertura de pruebas.** Lo
> que se ha detectado de eso está en el apartado 6, dirigido a `A-12`, `A-03` y
> `A-14`.
>
> **Este documento no lleva historial.** Lo que cambió en cada versión está en
> `DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`.

## 1. Qué ha cambiado desde la ronda anterior

**Nota de la versión 1.3.0 — esta vez sí hay contenido desactualizado, no solo
procedencia.** `S-16 · Cascada de obsolescencia` marcó este documento como
caducado porque declaraba `DOC-04-FUNCIONAL.md` en `1.2.0` (el `obsolescence_ack`
de la 1.2.2 solo cubría hasta `1.3.1`) y `DOC-04` había subido a `1.3.2`. Al leer
el diff real para decidir si bastaba con extender el `ack`, apareció el motivo
de fondo: `DOC-04` 1.3.2 corrige la atribución de bug de tres preguntas
respondidas (`Q-02`, `Q-06`, `Q-12`) y de paso deja constancia de que su propio
texto seguía describiendo `BUG-004` y `BUG-003` como abiertos en `DOC-24` — cierto
cuando A-02 escribió esa corrección (2026-08-30), **ya no cierto el 2026-08-31**.
Eso llevó a abrir `DOC-24-BUGS.json` directamente, entrada que ninguna ronda de
este documento había vuelto a leer desde la 1.0.0 original (2026-08-16):
declaraba `1.0.0` y la versión real es **`1.1.2`**.

**El hallazgo real: los cuatro bugs censados están `fixed`, no abiertos.**
`BUG-001` y `BUG-002` lo están desde el 2026-08-21 (commit directo `ed61c24`,
sin pasar por `/spec`); `BUG-003` desde el 2026-08-30 (`SPE-07-importes-negativos`)
y `BUG-004` desde el 2026-08-31 (`SPE-08-factura-rectificativa`), los cuatro
verificados en vivo según `DOC-24` 1.1.2. Este documento seguía citando
`BUG-003` y, sobre todo, `BUG-004` como problema sin resolver en tres sitios, y
los tres se corrigen esta ronda:

1. **La tabla del apartado 5.1** marcaba las decisiones de `Q-02`, `Q-06`, `Q-10`
   y `Q-12` como «Decidido», sin más. Las cuatro están **implementadas**: `Q-02`
   y `Q-10` por corrección directa (`Q-10` además formalizada como `SPEC 06`,
   `BR-ALB-10`/`REQ-080`/`REQ-081`), `Q-06` por `SPE-08` y `Q-12` por `SPE-07`.
   Solo `Q-14` y `Q-15` (recuento de pendientes de cobro y de pago) siguen
   pendientes. La viñeta sobre «los albaranes de una factura quedan bloqueados
   para siempre» deja de ser una decisión pendiente y pasa a ser un caso ya
   resuelto por `SPE-08`.
2. **`FUN-002`** citaba `DOC-24/BUG-004` como parte de lo que aportaría —«hace
   reversible lo que hoy no lo es»—. Ese caso concreto ya tiene solución propia,
   ajena a esta propuesta: se retira la cita y se explica por qué `FUN-002` no
   pierde nada al hacerlo, porque su valor nunca dependió de ese caso en
   particular. Queda anotado, y no propuesto por falta de evidencia, un matiz
   que `SPE-08` deja explícito como fuera de su alcance: el abono parcial de una
   factura (apartado 5.3).
3. **Los hallazgos hacia `A-12`** sobre la falta de una comprobación común de
   escritura (apartado 6) citaban `BUG-001`, `BUG-002` y `BUG-003` como el mismo
   patrón repetido, con `MEJ-004` sin decidir. Los cuatro bugs ya están
   corregidos, y **ninguno pasó por un módulo de dominio compartido** —dos por
   commit directo, dos por `/spec`, cada uno parcheando su propio router—:
   `DOC-16` 3.3.0 §1.8 documenta que `SPE-07` dejó además la misma regla
   duplicada verbatim en `peces.js` (`POST` y `PUT`). El patrón que motivó el
   hallazgo no se resolvió al corregir los defectos, cambió de forma; se
   actualiza la nota con este ejemplo, sin proponer nada nuevo (la decisión
   sobre `MEJ-004` sigue siendo de A-12).

**Aprovechando el mismo repaso, dos entradas más del bloque `inputs` estaban
fuera de su `ack`.** `DOC-01` declaraba `1.1.0` con un `ack` que cubría hasta
`1.2.0`, y la versión real es `1.3.0`: `SPE-07` y `SPE-08`, ya `Implemented`,
añaden `UC-FAC-05` y cinco reglas de negocio (`BR-PEC-03`/`BR-PEC-04`,
`BR-ALB-11`, `BR-FAC-10`/`BR-FAC-11`) que formalizan exactamente el mismo
cierre de `BUG-003`/`BUG-004` ya tratado arriba — ninguna `FUN-nnn` nace ni
cambia por esa superficie. `DOC-16` declaraba `3.1.0` con un `ack` que cubría
hasta `3.2.0`, y la real es `3.3.0` (el §1.8 ya citado en el punto 3). Los tres
`obsolescence_ack` superados por una lectura real esta ronda se retiran del
front-matter; el de `DOC-06` (hasta `1.4.1`) sigue vigente porque `DOC-06` real
sigue en `1.4.1`.

**Qué NO cambia.** Ninguna `FUN-nnn` nace, se retira ni cambia de `status`;
ninguna cambia de `impact`, `difficulty`, `size` ni `business_value`; el orden
de la recomendación del apartado 2 es el mismo que en 1.2.2. Lo único que se
mueve es la lectura de qué está pendiente y qué ya está hecho, y la evidencia
de una propuesta (`FUN-002`). Detalle completo en
`DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`, entrada `1.3.0`.

### Ronda anterior (1.2.2) — resello de procedencia, sin cambio de fondo

`S-16 · Cascada de obsolescencia` marcó este documento como caducado porque
declaraba `DOC-16-ROADMAP.md` en `3.0.0` y el roadmap había subido a `3.1.0`.
El motivo del salto es ajeno a `A-15`: nació `DOC-27` —primer informe de la
suite de servicio, `S-17`— y `A-12` revisó las nueve `MEJ-nnn` contra esa
evidencia nueva. **Ninguna `MEJ-nnn` cambió de estado y no nació ninguna**:
crece la evidencia de `MEJ-002`, `MEJ-003` y `MEJ-004`, y se matiza la de
`MEJ-006`, sin tocar tamaño, dificultad ni dependencias de ninguna. `DOC-16`
§6.1 y §6.2 ya no reenvían `EXP-017`/`EXP-026`/`EXP-019`/`EXP-003`: confirman
explícitamente que están «ya recogidos» como `FUN-009` a `FUN-012` en este
mismo documento, citando su versión 1.2.0/1.2.1, y que no hace falta seguir
reenviándolos. §6.3 confirma del mismo modo que A-15 ya evaluó `REQ-025` y
`REQ-034` y decidió no proponer ninguna `FUN-nnn`, redirigiendo a `A-14` — sin
matiz nuevo. Nace `§6.9`, un hallazgo sobre si borrar un albarán debe devolver
el stock de sus líneas de pieza: va dirigido a **`A-02`**, no a `A-15`, y no se
recoge aquí. **Se ha comprobado que ninguna de las doce `FUN-nnn` depende de
una `MEJ-nnn` que haya cambiado de estado ni de una cifra de `DOC-16` que este
documento reproduzca: no cambia ninguna propuesta, ni la recomendación, ni
ningún hallazgo del apartado 6.**

Se ha aprovechado la ronda para verificar, en todo el bloque `inputs`, la
versión declarada contra la real y el hash declarado contra el calculado —el
fallo silencioso que `S-16` no puede detectar por sí solo, porque solo compara
números de versión—. Resultado: **tres entradas llevaban un hash desactualizado
sin cambio de versión.** `DOC-01` y `DOC-06` cambiaron de bytes por el mismo
commit (`c71c580`), que renombra dos rutas de fichero de *spec* citadas en sus
anclas y no toca ningún actor, requisito, carencia ni pregunta abierta —
verificado leyendo el diff completo de cada uno, no asumido—. `registro-ids.json`
cambió por el registro real de `FUN-009` a `FUN-012` (commit `3f10869`, la
propia ronda 1.2.0 de este documento) y por el mismo `c71c580`; recontado,
sigue con las doce anclas `FUN` que ya declaraba este documento, todas
`proposed`. Las tres correcciones actualizan solo versión/hash en `inputs`, sin
tocar ninguna `FUN-nnn` ni el cuerpo de este documento. Detalle en
`DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`, entrada `1.2.2`.

### Dos rondas antes (1.2.1)

Resello de procedencia contra `DOC-14-EXPLORATORIO.md` 2.1.0: A-10 cerró
formalmente `EXP-027` (de `abierto` a `corregido`), porque `DOC-23` 2.2.0
confirma que los `.feature` de `automation/ui` que citaban literales con punto
decimal ya están corregidos. Ninguna de las doce `FUN-nnn` citaba `EXP-027` ni
dependía de su estado. Sin efecto en ninguna propuesta.

### Tres rondas antes (1.2.0)

**Nacen cuatro propuestas: `FUN-009` a `FUN-012`.** Las ocho anteriores no
cambian de estado ni de señal. Es la primera ronda con novedad desde 1.0.0, y
no sale de una carencia recién descubierta en el manual: sale de tres hallazgos
que `DOC-16 · Roadmap técnico` lleva **tres rondas** reenviando a este documento
sin que nadie los convirtiera en propuesta, más uno que nunca se había mirado.

Lo ha disparado `S-16 · Cascada de obsolescencia`: este documento declaraba
`DOC-01` en 1.0.0, `DOC-06` en 1.2.0 y `DOC-16` en 2.0.0, y los tres habían
subido a **1.1.0**, **1.3.0** y **3.0.0**.

### 1.1 DOC-01 y DOC-04: sin efecto

`DOC-01` sube a 1.1.0 sin cambio de contenido de negocio —mismos actores, casos
de uso, reglas y glosario, verificado contra su propio `-HIST.md`—: cierra una
pregunta ya resuelta y corrige un comentario del árbol de carpetas. `DOC-04`
sigue en 1.2.0; su hash cambió porque el front-matter se reescribió al
resincronizar contra `DOC-01`, pero A-02 verificó ancla a ancla que ningún
`REQ-nnn` cambió de enunciado. **Ninguno de los dos mueve nada aquí.**

### 1.2 DOC-06: dos avisos nuevos que no son míos

`DOC-06` sube a 1.3.0 y añade, en su apartado 6.1, dos avisos sobre
comportamiento **ya implementado**: la protección contra el doble envío y el
formato de importes y fechas. No son funcionalidad ausente —son defectos que
`SPEC 04` y `SPEC 05` ya corrigieron y que el manual todavía no ha limpiado de
su lista de carencias—, así que no dan lugar a ninguna `FUN-nnn`. El resto de
§6.1 —las catorce carencias que ya sostenían las ocho propuestas vivas— está
palabra por palabra igual. §9 gana `Q-30`, un hueco de documentación sobre qué
ve el usuario ante una anotación inválida: no es de A-15, va a `A-03`/`S-10` como
ya lo hacían `Q-24` a `Q-29`.

### 1.3 DOC-16 3.0.0: tres hallazgos de UX que llevaban desde su ronda 2.0.0 esperando

`DOC-16/§6.1` reafirma, **sin cambios respecto a 2.0.0 y 2.1.0**, tres hallazgos
de `DOC-14 · Exploración QA` que A-12 clasifica como «funcionalidad, no deuda
técnica» y que hasta hoy ninguna ronda de este documento había recogido:

- **`EXP-017`** — se puede abandonar un formulario a medio rellenar sin ningún
  aviso, y lo escrito se pierde. → **`FUN-009`**.
- **`EXP-026`** — el diálogo de confirmación de borrado no dice qué registro se
  va a borrar. → **`FUN-010`**.
- **`EXP-019`** — las pantallas de error no ofrecen más salida que un reintento
  que vuelve a fallar. → **`FUN-011`**.

**Por qué no habían entrado antes.** `DOC-14` no existía cuando se escribieron
1.0.0 y 1.1.0/1.1.1 de este documento (nació el 2026-08-21, cuatro días después
de la última ronda de A-15). La única vía por la que estos tres hallazgos podían
llegar a A-15 era que `A-12` los reenviara desde `DOC-16`, y así lo hizo desde su
versión 2.0.0/2.1.0 — pero ninguna ronda de A-15 se había ejecutado desde
entonces hasta ahora. No es un hallazgo perdido: es la primera oportunidad real
de recogerlo.

`DOC-16/§6.2` reafirma también, sin cambios, **`EXP-003`**: dos pestañas
abiertas sobre la misma ficha, y la que guarda en segundo lugar borra en
silencio lo que escribió la primera, sin ningún aviso. A-12 lo deja
explícitamente pendiente de una decisión de negocio —bloqueo con aviso o fusión
por campos— que no le corresponde a él. Tampoco había sido evaluado nunca por
A-15. → **`FUN-012`**.

### 1.4 DOC-16/§6.3: un hallazgo que no se convierte en propuesta

`DOC-16/§6.3` señala, **por primera vez para A-15**, que `TC-032`, `TC-033` y
`TC-047` no tienen vector en la interfaz porque `REQ-025` (filtro de albaranes
por vehículo y por cliente) y `REQ-034`/`BR-ALB-06` (precio informado a mano en
una línea de pieza) no están construidos, verificado por `A-05` leyendo
`DataTable.tsx` y `AlbaraLiniesSection.tsx` (`DOC-07/A-05-11c`). A-12 lo etiqueta
como «funcionalidad ausente» y lo dirige aquí.

**Se ha evaluado, y no nace ninguna `FUN-nnn`.** El motivo es el mismo criterio
que este documento ya aplicaba a los avisos de error en catalán en rondas
anteriores: `REQ-025` no dice que la interfaz *debería* ofrecer el filtro, dice
que **lo ofrece**, en presente, como `REQ-034`/`BR-ALB-06` da por hecho que existe
un campo para informar el precio a mano. Cuando un requisito vigente afirma un
comportamiento y la aplicación se comporta de otra manera, eso no es un hueco de
producto por decidir: es algo que no cumple lo que ya se pidió, y el documento
que le corresponde es `DOC-24-BUGS`, no este. El detalle está en 5.6 y el
hallazgo, en el apartado 6, dirigido a `A-14`.

**Contradice además a `DOC-06/§3`**, que describe el listado de *Albaranes* como
«filtrable por vehículo, por cliente y por situación» sin matiz. Esa
contradicción entre lo que dice el manual y lo que confirma la lectura de código
más la ejecución de la suite (`DOC-23`) es justo el tipo de discrepancia que
`A-14` tiene que resolver antes de que nadie vuelva a citar `DOC-06/§3` como si
fuera cierto sin reservas.

### 1.5 Lo que no ha cambiado

Las **ocho propuestas anteriores**, con su número, su texto, su estado
`proposed` y todas sus señales, salvo el orden de la recomendación (apartado 2),
que sí se revisa: `FUN-010` entra en el podio y desplaza a `FUN-005` a cuarto
lugar, por relación valor/esfuerzo, no porque `FUN-005` haya perdido nada. Los
`REQ-nnn` citados existen todos y dicen lo mismo. `DOC-24` sigue en 1.0.0 con
cuatro defectos, sin cambios.

Para el detalle de qué cambió en cada versión y por qué,
**`docs/DOC-25-PROPUESTAS-FUNCIONALES-HIST.md`**.

## 2. Recomendación

Las tres primeras por relación entre lo que aportan y lo que cuestan. No es una
decisión, es un orden de lectura sugerido, y **cambia por primera vez desde
1.0.0**: `FUN-010` entra al tercer lugar.

| # | Propuesta | Por qué esta y no otra |
|---|---|---|
| 1 | **FUN-002 · Poder guardar una copia de los datos del taller y recuperarla** | Sigue siendo la única propuesta cuyo coste de no hacerla es **perderlo todo**. Toda la facturación vive en un solo ordenador (`DOC-06/§2`) y ningún requisito habla de respaldarla. El manual lo dice sin rodeos: si algo se borra, «no hay forma de saber quién fue ni de recuperarlo». Ninguna de las otras sirve de nada si eso pasa, y es la que menos toca lo que ya funciona. **Y no la cubre `MEJ-005`**, la mejora técnica aceptada: eso repone datos de prueba, no el trabajo de una mañana del taller (5.5). |
| 2 | **FUN-001 · Llevarse la factura en papel o en un archivo para dárselo al cliente** | Sigue siendo el hueco más grande del uso diario: la factura se calcula bien y **solo se puede mirar en la pantalla del taller**. **Con un matiz que hay que leer:** `DOC-06/Q-21` deja abierto si hoy existe alguna forma rudimentaria de imprimir, y conviene comprobarlo antes de dimensionar nada. La comprobación está pedida a `A-03` desde hace tres rondas y sigue sin respuesta (apartado 6). Aun así se mantiene la segunda, porque el documento **entregable** no existe en ningún caso: sin los datos fiscales del taller —que es **FUN-003**— no hay factura que dar. |
| 3 | **FUN-010 · Que el diálogo de borrado diga qué registro se va a borrar** | **Nueva esta ronda, y entra directa al podio.** Es tan pequeña como `FUN-005` —toca un único diálogo compartido por las seis entidades que se pueden borrar— pero su impacto es mayor: protege una acción **sin vuelta atrás** frente a un error de identificación, y hay evidencia reproducida de que ese error es posible de verdad (dos clientes con el mismo nombre, `EXP-001`/`EXP-026`). Coste bajo, riesgo real que evita: mejor relación que `FUN-005`, que baja al cuarto lugar sin haber perdido nada. |

## 3. Propuestas nuevas de esta ronda

**Cuatro: `FUN-009`, `FUN-010`, `FUN-011` y `FUN-012`.** Las cuatro nacen de
hallazgos que `DOC-16 · Roadmap técnico` dirige explícitamente a A-15 y que
ninguna ronda anterior había podido evaluar, tal como explica el apartado 1.
Las ocho anteriores no ganan ni pierden evidencia esta ronda.

`S-12` ha confirmado `FUN-009` como el siguiente libre (`next --prefix FUN` →
`FUN-009`); se reclaman los cuatro consecutivos, sin dejar huecos.

---

### FUN-009 · Avisar antes de perder lo escrito en un formulario sin guardar

`status: proposed` · nace en la ronda de 2026-08-23

**Qué problema resuelve.** Quien está rellenando un formulario —la nota de un
albarán, la ficha de un cliente, el alta de una pieza— y pulsa por error un
enlace del menú, o recarga la página, pierde todo lo escrito sin ningún aviso y
sin forma de recuperarlo. Le pasa a cualquiera que use la aplicación, y le pasa
justo en los campos de texto libre —las notas de un albarán son donde se
describe el trabajo hecho— que son los más caros de volver a escribir.

**En qué consiste.** Avisar, antes de abandonar un formulario con cambios sin
guardar, tanto si se navega a otra sección de la aplicación como si se recarga o
se cierra la pestaña.

**Qué aporta.** Evita perder tiempo de taller reescribiendo algo que ya se había
escrito, por un clic que no pretendía perder nada.

**Qué pasa si no se hace.** Se sigue perdiendo contenido sin que nadie se dé
cuenta hasta que falta.

- **Evidencia:** `DOC-16/§6.1` («EXP-017: aviso al abandonar un formulario con
  cambios sin guardar»), reproducido y documentado con dos escenarios distintos
  —navegación interna y recarga— en `DOC-14/EXP-017`. Reenviado por `A-12` desde
  su ronda 2.0.0/2.1.0 sin que ninguna ronda de A-15 lo hubiera evaluado hasta
  ahora, tal como explica el apartado 1.3.
- **Requisitos que tocaría:** ninguno de los 79. Ningún requisito de `DOC-04`
  menciona la pérdida de datos al navegar, así que no hay nada que reformular,
  hay algo que añadir.
- **Contradice:** ninguno.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** high.

---

### FUN-010 · Que el diálogo de confirmación de borrado diga qué registro se va a borrar

`status: proposed` · nace en la ronda de 2026-08-23

**Qué problema resuelve.** El diálogo que pide confirmar un borrado —de
cliente, vehículo, pieza, albarán, empleado o nómina— es siempre el mismo texto
genérico: «¿Seguro que quieres eliminar este cliente?». No dice el nombre ni
ningún otro dato del registro. Cuando hay dos registros parecidos —dos clientes
con el mismo nombre, algo que la propia aplicación permite— quien borra no
puede saber con certeza cuál de los dos está a punto de eliminar. Le pasa a
quien gestiona el listado de clientes, de empleados o de cualquier entidad del
taller, en el único momento en que un error ya no tiene vuelta atrás.

**En qué consiste.** Incluir el nombre o el identificador visible del registro
en el texto del diálogo de confirmación de borrado, en las seis entidades que
se pueden borrar.

**Qué aporta.** Reduce el riesgo de borrar el registro equivocado en una acción
irreversible, con un cambio pequeño y acotado a un único diálogo.

**Qué pasa si no se hace.** El taller sigue sin poder distinguir con seguridad
qué va a borrar cuando dos registros se parecen, en la única operación de la
aplicación que no admite arrepentirse.

- **Evidencia:** `DOC-16/§6.1` («EXP-026: el diálogo de borrado no identifica el
  registro»), reproducido en `/clients/13` y en `/nomines/6` con dos clientes
  homónimos (`DOC-14/EXP-026`). El manual avisa por su parte de que «un cliente
  borrado no se recupera» (`DOC-06`, tarea de baja de cliente), lo que hace más
  grave la falta de identificación.
- **Requisitos que tocaría:** REQ-006, REQ-016, REQ-023, REQ-041, REQ-061,
  REQ-074 — las seis piden «confirmación del usuario» para un borrado, pero
  ninguna especifica qué debe decir el mensaje.
- **Contradice:** ninguno. Añadir el nombre del registro no cambia ninguna de
  las seis reglas: solo precisa el contenido del aviso que ya exigen.
- **Tamaño** small · **impacto** medium · **dificultad** low ·
  **valor de negocio** medium · **confianza** high.

---

### FUN-011 · Dar una salida real a una pantalla de «registro no encontrado»

`status: proposed` · nace en la ronda de 2026-08-23

**Qué problema resuelve.** Si alguien abre una ficha que ya no existe —un
enlace viejo, un registro que se acaba de borrar en otra pestaña—, la pantalla
se reduce a un mensaje de error y un botón «Volver a intentarlo» que repite la
misma petición y vuelve a fallar siempre. No hay ningún enlace de vuelta al
listado. Le pasa a quien llega a una ficha inexistente, y aunque no se queda
atrapado —el menú lateral sigue funcionando—, el único botón que se le ofrece
no le sirve de nada.

**En qué consiste.** Cuando el registro no existe, ofrecer una salida que
funcione —un enlace al listado correspondiente— en vez de, o además de, un
reintento que no puede tener éxito.

**Qué aporta.** Una pantalla de error que ofrece algo útil en vez de un botón
que no lleva a ningún sitio.

**Qué pasa si no se hace.** Quien llega a una ficha inexistente tiene que
recurrir al menú lateral para salir; molesto, pero no bloqueante.

- **Evidencia:** `DOC-16/§6.1` («EXP-019: las pantallas de error no ofrecen
  salida»), reproducido en `/clients/99999` y al volver atrás tras borrar una
  nómina (`DOC-14/EXP-019`).
- **Requisitos que tocaría:** ninguno de los 79.
- **Contradice:** ninguno.
- **Tamaño** small · **impacto** low · **dificultad** low ·
  **valor de negocio** low · **confianza** high.

---

### FUN-012 · Proteger el trabajo cuando dos pestañas editan la misma ficha a la vez

`status: proposed` · nace en la ronda de 2026-08-23

**Qué problema resuelve.** Si alguien tiene la misma ficha abierta en dos
pestañas —algo tan simple como abrir un cliente, y luego abrir el mismo cliente
en otra pestaña para consultar algo mientras la primera sigue abierta— y guarda
en las dos, la segunda en guardar **borra en silencio** lo que había guardado la
primera. Ninguna de las dos pestañas avisa de nada: la que pierde su cambio
sigue mostrando la pantalla como si todo hubiera ido bien. Le pasa a quien
trabaja con varias pestañas abiertas sobre la misma ficha, algo habitual en
cualquier navegador.

**En qué consiste.** Que el sistema no deje que un guardado borre en silencio
lo que otro acaba de guardar: avisando de que el registro cambió desde que se
abrió, o conservando los cambios de ambas pestañas cuando no chocan entre sí.
**Cuál de las dos formas es la correcta es una decisión de negocio**, no algo
que este documento deba resolver.

**Qué aporta.** Evita perder trabajo ya guardado sin que nadie se entere de que
se ha perdido, que es el riesgo más silencioso de los que recoge este
documento: no hay ningún síntoma visible hasta que alguien nota que un cambio
que hizo ya no está.

**Qué pasa si no se hace.** El taller sigue expuesto a perder cambios ya
guardados sin ningún aviso, cada vez que la misma ficha queda abierta en más de
una pestaña. Es un escenario de un único puesto de trabajo, así que su
frecuencia real es baja; su coste, cuando ocurre, es alto porque no se detecta.

- **Evidencia:** `DOC-16/§6.2` («EXP-003: dos pestañas sobre la misma ficha, la
  última que guarda pisa a la otra sin avisar»), reproducido con evidencia de
  red y de base de datos en `DOC-14/EXP-003`. Ningún requisito de `DOC-04`
  menciona la concurrencia, y el propio hallazgo señala que ese silencio
  documental es lo que lo hace relevante. A-12 lo deja pendiente de una
  decisión de negocio que no le corresponde a él tomar.
- **Requisitos que tocaría:** ninguno de los 79.
- **Contradice:** ninguno.
- **Tamaño** medium · **impacto** high · **dificultad** medium ·
  **valor de negocio** medium · **confianza** medium — la confianza baja de
  `high` a `medium` no por dudar de la evidencia, que está reproducida con
  precisión, sino porque la solución correcta depende de una decisión que
  todavía no existe y que cambia el tamaño real del trabajo.

## 4. Propuestas vivas de rondas anteriores

Las ocho, **las ocho en `proposed`** y ninguna decidida. Ninguna ha sido
aceptada, rechazada, implementada ni sustituida, así que no hay ningún motivo de
rechazo que respetar ni ningún rastro que seguir hasta `DOC-08`.

Van con su ficha completa porque este documento refleja **el estado actual**:
quien lo lea hoy tiene que poder decidir sin abrir la versión anterior. El
apartado **Estado de la evidencia** de cada ficha dice de dónde viene hoy su
respaldo y si ha crecido o menguado desde que se propuso; el orden en que fue
cambiando está en el `-HIST.md`.

---

### FUN-001 · Llevarse la factura en papel o en un archivo para dárselo al cliente

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** El cliente paga y pide su factura. Hoy la factura
existe dentro de la aplicación —con su número `año/F-nnnn`, su base, su IVA y su
total— pero **solo se puede mirar en la pantalla del ordenador del taller**. La
tarea A.17 del manual, que es la que describe qué ve el usuario en una factura,
termina en la pantalla y no menciona ninguna forma de sacarla de ahí. Le pasa a
quien está en el mostrador, cada vez que cobra un trabajo. Lo mismo con el
albarán, que es lo que el taller enseña al cliente para explicarle qué se ha
hecho antes de cobrarle.

**En qué consiste.** Poder obtener la factura como documento entregable —papel o
archivo— con el número, la fecha, los datos del cliente, el detalle de los
albaranes que agrupa, la base, el IVA y el total. Lo mismo para el albarán, como
hoja de trabajo que se le enseña al cliente.

**Qué aporta.** Cierra el ciclo del negocio: hoy el taller hace todo el trabajo
de calcular bien la factura y luego tiene que copiarla a mano en otro sitio para
entregarla. Ahorra ese doble trabajo y elimina el riesgo de que el papel que ve
el cliente diga algo distinto de lo que dice la aplicación.

**Qué pasa si no se hace.** El taller sigue emitiendo facturas que no puede
entregar, y sigue rehaciéndolas fuera de la aplicación. Es el único punto donde
el sistema obliga a duplicar el trabajo en otra herramienta.

**Estado de la evidencia — su confianza es `medium`, y hay que saber por qué.**
Bajó de `high` a `medium` al releer el manual regenerado, por un matiz que la
primera versión de este documento pasó por alto: `DOC-06/§6.1` es una lista
explícita y enumerada de lo que la aplicación no puede hacer, y **la impresión no
está en ella**. No es un olvido de
A-04: es que `DOC-06/Q-21` dice literalmente que «no se sabe si no existe o si no
se documentó», y un manual honesto no declara carencia lo que no ha verificado.
Este documento sí lo dio por carencia cierta, y con el mismo criterio con el que
en 5.3 se niega a proponer la búsqueda en los listados. **La propuesta se
mantiene igualmente**, y por una razón que no depende de la comprobación: aunque
existiera hoy alguna forma rudimentaria de imprimir, seguiría sin haber factura
entregable, porque el documento que se le da a un cliente lleva los datos
fiscales del taller y **esos no se guardan en ninguna parte** —eso es FUN-003—.
La comprobación de `Q-21` sigue pedida a `A-03` y sigue sin respuesta (apartado
6).

**Y una cosa que no la cambia, dicha a propósito.** La mejora técnica `MEJ-001`,
aceptada el 2026-08-17, va a tocar las pantallas de facturas y de albaranes para
ponerles identificadores de prueba. Eso **no acerca ni un paso esta propuesta** y
no altera ninguna de sus señales: no cambia ninguna pantalla, ningún flujo ni
ningún texto, y sobre todo no hace aparecer el documento entregable que aquí se
pide. Se deja escrito para que nadie lo lea como un avance que no es.

- **Evidencia:** `DOC-06/Q-21` («No consta si se puede imprimir o exportar un
  albarán o una factura. Es la primera pregunta que hará quien tenga que
  entregarle algo en papel al cliente»), `DOC-06/§4/A.16`, `DOC-06/§4/A.17`.
- **Requisitos que tocaría:** REQ-048, REQ-049, REQ-051, REQ-052, REQ-053.
- **Contradice:** ninguno. El documento entregable muestra los mismos importes
  que ya calcula REQ-049 y presenta REQ-051; no cambia ningún cálculo.
- **Depende de:** FUN-003, para los datos del taller que van en la cabecera.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** high · **confianza** medium.

---

### FUN-002 · Poder guardar una copia de los datos del taller y recuperarla

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** Todos los datos del taller —clientes, vehículos,
albaranes, facturas emitidas, piezas, personal y nóminas— viven en un único
ordenador (`DOC-06/§2`). Si ese ordenador se estropea, se lo llevan o alguien
borra algo por error, **no hay ninguna forma de recuperarlo**: la aplicación no
ofrece nada y ningún requisito de DOC-04 habla de respaldar los datos. Le pasa al
dueño del taller el día que falla el disco, y para entonces ya es tarde.

**En qué consiste.** Que el taller pueda guardar una copia completa de sus datos
donde quiera —un disco externo, una carpeta— y volver a cargarla si hace falta,
sin depender de nadie técnico.

**Qué aporta.** Protege la facturación del taller, que es su contabilidad de
cobros: es la única propuesta de este documento que da marcha atrás ante una
pérdida total —el disco que falla, el borrado por error—, y ningún otro
evolutivo del sistema cubre ese caso.

**Qué pasa si no se hace.** El taller sigue con toda su facturación en un solo
sitio y sin red. La probabilidad es baja cualquier día concreto, y el daño el día
que ocurra es total.

**Estado de la evidencia — la más sólida del documento.** `DOC-06/§6.1` cierra la
viñeta de la ausencia de identificación diciendo que «si algo se borra, no hay
forma de saber quién fue **ni de recuperarlo**». Ese «ni de recuperarlo» es
exactamente lo que esta propuesta cubre, y llega desde una viñeta que este
documento había clasificado como decisión de negocio y no como carencia. La
decisión de no tener usuarios sigue siendo respetable y no se discute (5.3); la
imposibilidad de recuperar lo borrado no es parte de esa decisión.

**No la cubre `MEJ-005`, y la confusión es fácil.** La mejora técnica aceptada el
2026-08-17 sirve para que el equipo pueda dejar los datos en un estado conocido
antes de cada prueba. Eso no es una copia de seguridad del taller: repone unos
datos inventados, no el trabajo real de una mañana, y no hay ninguna forma de
pedirlo desde la aplicación. **Esta propuesta sigue entera y sigue siendo la
primera recomendada.**

**Nota de esta ronda: `DOC-24/BUG-004` deja de citarse como evidencia, y hay
que decir por qué.** Hasta la ronda anterior esta propuesta citaba que «una
factura emitida por error no se puede eliminar por ningún medio» como ejemplo
de que el sistema no daba marcha atrás en absoluto. `BUG-004` consta `fixed`
desde el 2026-08-31 (`DOC-24` 1.1.2): `SPE-08-factura-rectificativa` construyó
`POST /api/factures/:id/rectificar`, verificado en vivo. Ese caso concreto ya
tiene solución propia y no la necesita de una copia de seguridad. **La
propuesta no pierde nada por ello**: su valor nunca dependió de ese caso en
particular, sino de que todos los datos del taller viven en un único ordenador
sin ninguna forma de respaldo, que sigue siendo exactamente igual de cierto.
Queda un matiz que `SPE-08` deja escrito como fuera de alcance explícito —el
**abono parcial** de una factura, rectificarla por un importe distinto al
total—: no lo cubre esta propuesta ni ninguna otra de este documento, y no se
propone nada sobre él por falta de evidencia (apartado 5.3).

- **Evidencia:** `DOC-06/Q-22` («No consta ningún procedimiento de copia de
  seguridad. Un manual honesto debería decirle al taller cómo proteger su
  facturación, y hoy no puede»), `DOC-06/§2`, `DOC-06/§6.1`.
- **Requisitos que tocaría:** ninguno de los 79. **Y eso es justamente el
  hallazgo**: no existe ningún requisito que hable de conservar los datos, así
  que no hay nada que reformular, hay algo que añadir.
- **Contradice:** ninguno.
- **Tamaño** medium · **impacto** high · **dificultad** medium ·
  **valor de negocio** high · **confianza** high.

---

### FUN-003 · Dar contenido a la sección *Configuración*

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** *Configuración* está en el menú desde el principio y
al entrar solo dice que está pendiente de desarrollo (REQ-079). Le pasa a
cualquiera que la abra esperando encontrar algo. Pero el problema de fondo no es
la pantalla vacía: es que **hay datos del taller que hoy no se guardan en ningún
sitio** —el nombre del taller, su dirección, su identificación fiscal, el IVA
que aplica habitualmente— y que hacen falta en cuanto se quiera entregar un
documento al cliente.

**En qué consiste.** Decidir qué necesita el taller tener configurado y
construirlo en esa sección. Los candidatos que se deducen de lo que hoy falta:
los datos del propio taller que van en la cabecera de una factura, el tipo de IVA
habitual, y el idioma y el tema por defecto que hoy solo se cambian desde la
cabecera de la pantalla.

**Qué aporta.** Es lo que hace posible FUN-001: sin los datos del taller no hay
factura entregable. Y da un lugar a las decisiones que hoy están fijas dentro de
la aplicación, como el 21 % de IVA.

**Qué pasa si no se hace.** La sección sigue en el menú sin hacer nada, que es
una promesa incumplida delante del usuario todos los días, y FUN-001 se queda sin
la información que necesita.

**Estado de la evidencia — dos piezas independientes señalando el mismo hueco.**
El manual no se limita a decir que la sección no funciona: añade que «de momento
**no está decidido qué contendrá**», que es literalmente el enunciado de esta
propuesta visto desde el usuario. Y `A-12` la miró desde el lado técnico y
**decidió no proponer nada**, derivándola aquí con estas palabras: «un módulo
sin desarrollar es funcionalidad, no una mejora» (`DOC-16/§6.3` **en su versión
2.0.0**, donde marcó además su hallazgo como `encaminado` porque el número ya
existía aquí). **Nota de esta ronda: `DOC-16` reorganizó su apartado 6 al llegar
a 3.0.0, y su `§6.3` de hoy trata de otra cosa** —`REQ-025`/`REQ-034`, ver 5.6—,
no de *Configuración*. La cita queda fechada a la versión donde se hizo para que
nadie la busque en el lugar equivocado; el fondo de esta propuesta no depende de
en qué apartado viviera la frase.

- **Evidencia:** `DOC-04/Q-04` («La sección de Configuración aparece en el menú
  pero no está desarrollada y ninguna especificación describe su contenido. ¿Qué
  debe contener?»), REQ-079, `DOC-06/§3`, `DOC-06/§6.1`, `DOC-16 2.0.0/§6.3`.
- **Requisitos que tocaría:** REQ-079, REQ-050, REQ-076, REQ-078.
- **Contradice:** **REQ-050**, pero solo en un caso concreto: si el negocio
  decide que el IVA habitual se configure aquí, dejará de ser cierto que «el
  sistema aplica el 21 por ciento» cuando el usuario no indique tipo, porque
  aplicará el que esté configurado. Si el IVA no entra en esta sección, no
  contradice nada. **Esto lo tiene que resolver `A-06`, no este documento.**
- **Relación con lo abierto:** `DOC-04/Q-09` (qué tipos de IVA son admisibles)
  sigue abierta y es una decisión de negocio, no una propuesta; si se contesta,
  su respuesta encaja aquí de forma natural.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** medium.

---

### FUN-004 · Avisar de qué piezas se están acabando

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** El taller no se entera de que se le acaba una pieza
hasta que la necesita y no la tiene. La aplicación conoce el stock de cada pieza
y lo mueve sola al anotarla en un albarán, pero **no avisa de nada**: hay que
entrar en el catálogo y mirarlo pieza a pieza. Le pasa a quien hace el pedido al
proveedor, que hoy lo hace de memoria.

**En qué consiste.** Que cada pieza pueda tener un mínimo por debajo del cual el
taller quiere reponer, y que la aplicación muestre en un sitio la lista de las
piezas que están en ese caso o por debajo.

**Qué aporta.** Convierte un dato que ya existe —el stock— en una decisión de
compra. Evita el trabajo parado por no tener una pieza y las compras de urgencia.

**Qué pasa si no se hace.** El taller sigue comprando de memoria. No se rompe
nada; simplemente el dato de stock sigue sirviendo solo para consultarlo.

**No confundir con lo ya decidido.** El negocio ya decidió en `DOC-04/Q-02`
bloquear el consumo de una pieza sin existencias suficientes. **Eso es otra
cosa:** impide anotar lo que no hay, en el momento de anotarlo. Esta propuesta
avisa **antes** de llegar a cero, para poder comprar a tiempo. Una no sustituye a
la otra, y de hecho la decisión de Q-02 aumenta el valor de esta: cuando el
sistema bloquee el consumo sin existencias, quedarse sin stock dejará de ser un
número raro en pantalla y pasará a ser trabajo que no se puede anotar.

**Estado de la evidencia — sin cambios y verificada.** La viñeta de
`DOC-06/§6.1` sigue enunciada igual y la tarea B.2 sigue diciendo que el stock
solo se mueve por los albaranes y que nada más lo mueve automáticamente.

- **Evidencia:** `DOC-06/§6.1` («No hay avisos ni recordatorios. La aplicación no
  te avisa de facturas vencidas, de stock bajo ni de nóminas sin registrar»),
  `DOC-06/§4/B.2`.
- **Requisitos que tocaría:** REQ-018, REQ-021, REQ-022.
- **Contradice:** ninguno.
- **Tamaño** small · **impacto** medium · **dificultad** low ·
  **valor de negocio** medium · **confianza** high.

---

### FUN-005 · Que la nómina proponga el salario bruto del empleado

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** Cada mes, al registrar la nómina de cada empleado, hay
que **teclear el salario bruto a mano**, aunque la ficha del empleado ya guarde su
salario base. El dato está ahí y la aplicación no lo usa. Le pasa a quien cierra
el mes, tantas veces como empleados tenga el taller, y cada tecleo es una
oportunidad de errata en un importe que luego se paga.

**En qué consiste.** Que al registrar una nómina el bruto venga propuesto a
partir del salario base del empleado, y que se pueda cambiar cuando ese mes no
coincida —una paga extra, unas horas de más—.

**Qué aporta.** Quita un tecleo repetitivo al mes por empleado y el error que lo
acompaña. Y le da por fin un uso al salario base, que hoy es un dato que se
rellena para nada.

**Qué pasa si no se hace.** Se sigue tecleando el bruto cada mes. Es la propuesta
cuyo «no hacerla» duele menos.

**Estado de la evidencia — sin cambios; baja al cuarto lugar de la
recomendación.** Las tres citas siguen exactas. No pierde ninguna señal: baja en
el orden del apartado 2 porque `FUN-010`, nueva esta ronda, ofrece un riesgo
evitado mayor —una acción irreversible mal identificada, frente a un tecleo
repetitivo— por un coste comparable.

- **Evidencia:** `DOC-04/Q-05` («El empleado guarda fecha de alta y salario base,
  pero la nómina no los usa: el bruto se teclea a mano cada mes»),
  `DOC-06/§6.1` («La nómina no propone el salario base del empleado»),
  `DOC-06/§4/C.5`.
- **Requisitos que tocaría:** REQ-064, REQ-069.
- **Contradice:** ninguno. REQ-064 exige que se indique el salario bruto y eso
  sigue siendo verdad: proponerlo no es imponerlo, el usuario lo sigue pudiendo
  cambiar antes de guardar.
- **Tamaño** small · **impacto** low · **dificultad** low ·
  **valor de negocio** medium · **confianza** high.

---

### FUN-006 · Saber cuánto gana el taller en cada trabajo

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** El taller apunta en cada pieza lo que le cuesta a él
además de lo que le cobra al cliente, pero **ese coste no se usa para nada**: no
hay ninguna pantalla que diga cuánto se ha ganado en un albarán o en una factura.
Le pasa al dueño cuando quiere saber si un trabajo ha salido a cuenta, y hoy
tiene que hacerlo con una calculadora al lado.

**En qué consiste.** Mostrar, junto a lo que se le cobra al cliente, lo que le ha
costado al taller el material, y la diferencia entre ambos. En el albarán, en la
factura y, si se quiere, como resumen del catálogo.

**Qué aporta.** Da al taller la única cifra de negocio que hoy no tiene: si gana
o no gana. También convierte en útil un dato que ya se está rellenando.

**Qué pasa si no se hace.** El taller sigue facturando sin saber su margen, y el
campo *coste* sigue siendo, en palabras del manual, un dato que se rellena
sabiendo que la aplicación no hará nada con él.

**Una advertencia de alcance.** `DOC-04/Q-01` pregunta si el coste es un margen
previsto o un dato informativo, y **esa parte la decide negocio**. Lo que esta
propuesta aporta es que, si la respuesta es «margen», hay algo que construir; si
es «dato informativo», esta propuesta se rechaza y el manual dejará de tener que
avisar de un campo inútil.

**Estado de la evidencia — la mejor cita es la del propio manual.** La tarea A.17
se lo dice al usuario en su propia cara, dentro del apartado «si los importes no
te cuadran» —«el coste de la pieza no interviene: la aplicación lo guarda, pero
no lo usa para nada»—. Y la lista de preguntas frecuentes recoge la pregunta tal
cual la haría alguien del taller: «¿Para qué sirven el coste y la unidad de una
pieza?».

- **Evidencia:** `DOC-04/Q-01`, `DOC-06/§6.1` («El coste y la unidad de una pieza
  no se usan. No hay cálculo de margen ni de beneficio en ninguna pantalla»),
  `DOC-06/§4/B.1`, `DOC-06/§4/A.17`, `DOC-06/§5`, `DOC-06/§7` (glosario, entrada
  *Preu / Cost*).
- **Requisitos que tocaría:** REQ-018, REQ-021, REQ-053.
- **Contradice:** ninguno. La base de la factura se sigue calculando igual
  (REQ-049): el margen se **muestra aparte**, no entra en lo que se le cobra al
  cliente.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** medium.

---

### FUN-007 · Poder decir en qué punto está un trabajo

`status: proposed` · viva desde la ronda de 2026-08-16

**Qué problema resuelve.** Un albarán solo puede estar *pendiente de facturar* o
*facturado*. No hay forma de distinguir un coche que se está reparando ahora
mismo de uno que ya está acabado y esperando a que el cliente lo recoja, o de uno
que espera el visto bueno del cliente para empezar. Le pasa a quien mira el
listado de albaranes para saber qué hay en el taller hoy: los ve todos iguales.

**En qué consiste.** Que el albarán pueda reflejar el punto real del trabajo
—cuáles y cuántos los decide el taller— y que el listado se pueda filtrar por
ese punto.

**Qué aporta.** Convierte el listado de albaranes en la foto del taller de hoy, y
no solo en la lista de lo que queda por cobrar.

**Qué pasa si no se hace.** Puede que no pase nada: es posible que el taller
trabaje de verdad con dos situaciones y no eche en falta ninguna más. **Esta es
la propuesta con la que más fácil es equivocarse**, y se marca con confianza baja
a propósito.

**Cómo se decide si esto es un hueco o no.** `DOC-04/Q-07` pregunta exactamente
eso —«¿El taller trabaja así o falta reflejar un paso real del trabajo?»— y sigue
sin respuesta. Si la respuesta es que el taller trabaja así, esta propuesta se
rechaza y no vuelve. `A-06` es donde se sabrá, preguntando.

**Estado de la evidencia — acotada, y a mejor.** Esta propuesta nació pidiendo
también que el listado se pudiera filtrar por ese punto, dando a entender que el
filtro habría que construirlo. El apartado 3 del manual deja claro que **el
filtro por situación ya existe** —«el de *Albaranes* tiene filtros por vehículo,
cliente y situación»—, y REQ-025 lo confirma. Lo que faltaría, entonces, son las
situaciones: el sitio donde enseñarlas ya está.

- **Evidencia:** `DOC-04/Q-07`, `DOC-06/§6.1` («No hay estados intermedios en un
  albarán. Solo hay "pendiente de facturar" y "facturado": no puedes marcar un
  trabajo como "en curso", "acabado" o "pendiente de aprobación por el
  cliente"»), `DOC-06/§3`.
- **Requisitos que tocaría:** REQ-025, REQ-028, REQ-045.
- **Contradice:** **REQ-028** («Un albarán recién abierto queda en situación de
  pendiente de facturar») si el albarán pasara a nacer en otra situación. Y
  obligaría a reformular **REQ-045**, que hoy exige que todos los albaranes de
  una factura estén *pendientes de facturar*: habría que decir cuáles de las
  situaciones nuevas permiten facturar.
- **Relación con lo abierto:** `DOC-04/Q-13` (el término *estado* significa dos
  cosas distintas) empeora si se añaden situaciones sin resolverla antes. El
  manual ha tenido que inventarse la distinción entre «situación del albarán» y
  «estado de pago» precisamente por eso.
- **Tamaño** medium · **impacto** medium · **dificultad** medium ·
  **valor de negocio** medium · **confianza** low.

---

### FUN-008 · Anotar el material que entra, en vez de recontar el stock entero

`status: proposed` · viva desde la ronda de 2026-08-16

> **Esta propuesta es de criterio propio, no de evidencia.** Nace de una fricción
> que el manual describe, pero **ningún documento la declara una carencia**.
> Fíltrala como opinión.

**Qué problema resuelve.** Cuando llega material del proveedor, la única forma de
reflejarlo es abrir la pieza y **escribir a mano el stock total resultante**, es
decir, sumar mentalmente lo que había y lo que ha llegado. Le pasa a quien recibe
el pedido. Si mientras tanto alguien ha anotado esa pieza en un albarán, la
cuenta mental ya no sale, y no queda ningún rastro de cuánto entró ni cuándo.

**En qué consiste.** Poder anotar «han entrado N unidades de esta pieza» y que la
aplicación sume, en lugar de tener que teclear el total.

**Qué aporta.** Quita una cuenta mental que se hace con el albarán a medias y
evita que un descuadre de stock se arrastre. Es el complemento natural de
FUN-004: primero avisa de que falta, luego se anota lo que llega.

**Qué pasa si no se hace.** Se sigue recontando a mano, que es lo que se hace hoy
y funciona mientras el taller sea pequeño.

**Estado de la evidencia — no tiene, y merece repetirse.** Sigue siendo la única
propuesta que este documento no puede respaldar con una carencia declarada por
nadie. Se ha vuelto a comprobar contra el apartado 6.1 del manual y sigue sin
aparecer. Si el negocio la descarta, se descarta sin discusión.

- **Fuente:** criterio propio. Lo citable es la fricción, no la carencia:
  `DOC-06/§4/B.2` («Si has recibido material del proveedor, tienes que ponerlo tú
  a mano modificando la pieza»), `DOC-06/§4/B.3`.
- **Requisitos que tocaría:** REQ-018, REQ-022.
- **Contradice:** ninguno. Modificar el stock a mano (REQ-022) seguiría estando
  disponible para el recuento del almacén.
- **Tamaño** small · **impacto** low · **dificultad** low ·
  **valor de negocio** low · **confianza** medium.

## 5. Descartadas y no propuestas, con motivo

Sigue sin haber nada rechazado por negocio: **ninguna `FUN-nnn` ha sido decidida
todavía**, ni como `not-now` ni como `not-wanted`. Lo de este apartado son cosas
que **A-15 ha decidido no proponer**, y el motivo importa tanto como la propuesta.

### 5.1 Carencias reales que ya van a entrar en el ciclo — no se reproponen

Las seis decisiones de negocio del 2026-08-16 (`DOC-04/§6.2`) ya tienen evolutivo
asignado. Se listan para que quede constancia de que se han visto y de por qué no
están en el apartado 3 ni en el 4. **Nota de esta ronda: cuatro de las seis ya
están implementadas**, no solo decididas —`DOC-24` 1.1.2 marca sus cuatro bugs
`fixed`, los cuatro verificados en vivo—; las otras dos, `Q-14` y `Q-15`, siguen
pendientes.

| Origen | Carencia | Estado del evolutivo |
|---|---|---|
| `DOC-04/Q-02` · `DOC-24/BUG-001` | El stock queda negativo al anotar más piezas de las que hay | **Implementado** (commit `ed61c24`, 2026-08-21, sin pasar por `/spec`). `DOC-24` 1.1.2 marca `BUG-001` `fixed` |
| `DOC-04/Q-06` · `DOC-24/BUG-004` | Una factura emitida no se puede anular ni corregir, y sus albaranes quedan bloqueados para siempre | **Implementado** (`SPE-08-factura-rectificativa`, 2026-08-31, verificado en vivo). `DOC-24` 1.1.2 marca `BUG-004` `fixed`. La rectificativa anula siempre el importe íntegro; el **abono parcial** queda fuera de su alcance (ver 5.3) |
| `DOC-04/Q-10` · `DOC-24/BUG-002` | Cambiar el vehículo de un albarán cambia a quién se factura | **Implementado**, entregado como `SPEC 06` (`BR-ALB-10`, `REQ-080`, `REQ-081`; fix inicial por commit `ed61c24`). `DOC-24` 1.1.2 marca `BUG-002` `fixed` |
| `DOC-04/Q-12` · `DOC-24/BUG-003` | Se aceptan precios, costes y stocks negativos | **Implementado** (`SPE-07-importes-negativos`, 2026-08-30, verificado en vivo en servidor e interfaz). `DOC-24` 1.1.2 marca `BUG-003` `fixed` |
| `DOC-04/Q-14` | No se puede ver qué facturas están pendientes de cobro | Decidido: recuento y filtro. Alcance medio |
| `DOC-04/Q-15` | No se puede ver qué nóminas están pendientes de pago | Decidido: recuento y filtro. Alcance medio |

**Dónde está la frontera, y quién la dibuja.** DOC-06 1.2.0 dio a estas seis
decisiones un apartado propio y visible para el usuario, el **6.2**, con la
advertencia de que «nada de esto existe todavía» —advertencia que hoy ya no es
exacta para cuatro de las seis, y que le corresponde actualizar a `A-04`, no a
este documento—. Eso la hace fácil de respetar: lo que remite a 6.2 no es mío.
De las **catorce** viñetas del apartado 6.1, **cinco** remiten expresamente a
6.2.

Una de esas viñetas merece mención aparte porque es nueva y podría confundirse
con una propuesta: **«los albaranes de una factura quedan bloqueados para
siempre, ni siquiera para corregir una errata»**. Sigue sin proponerse nada
sobre ella, y ahora por un motivo más fuerte que antes: dejó de ser solo una
decisión pendiente. `SPE-08-factura-rectificativa` construyó exactamente esa
solución —una factura rectificativa que libera los albaranes de la original—,
está implementada y verificada en vivo (`DOC-24` 1.1.2, `BUG-004: fixed`).
Proponer aparte «poder corregir una errata de un albarán facturado» sería
trocear con otro nombre algo que ya está hecho, no solo encargado.

### 5.2 Preguntas abiertas que no son mías — falta decidir una regla, o falta documentar

| Pregunta | Por qué no genera propuesta |
|---|---|
| `DOC-04/Q-03` · La unidad de medida no se usa | Es una pregunta de qué significa un dato, no de qué falta construir. Según la respuesta, lo que hay que hacer es acotar la regla —o quitar el campo—, y ninguna de las dos cosas es funcionalidad nueva. |
| `DOC-04/Q-08` · ¿El idioma y el tema por defecto se comportan como dice la especificación? | Es una comprobación, no un hueco. Va a `A-03` (apartado 6). |
| `DOC-04/Q-09` · Qué tipos de IVA son admisibles | Falta acotar una regla sobre un campo que ya existe y ya funciona. Si la respuesta obliga a configurarlos en algún sitio, ese sitio es FUN-003. |
| `DOC-04/Q-11` · ¿Debe bloquearse una nómina pagada? | Falta decidir una regla sobre una operación que ya existe. Si se decide bloquear, es una restricción, no funcionalidad nueva. Sigue abierta y `DOC-04` avisa de que la respuesta a Q-15 **no** la contesta. |
| `DOC-04/Q-13` · *Estado* significa dos cosas distintas | Falta decidir con qué nombres aparece cada concepto. Es vocabulario de interfaz sobre pantallas que ya existen. Afecta a FUN-007, que la empeoraría si se resolviera después. |
| `DOC-06/Q-23` y `DOC-06/Q-24` a `DOC-06/Q-30` | Son huecos de **documentación**, no de producto: cómo arranca la aplicación, nombres de botones, textos de error, cómo se edita una ficha, la pantalla de emisión, dónde está el conmutador de pago, qué campos tiene el formulario de cliente y qué ve el usuario cuando una anotación no llega a registrarse. Lo que falta es escribirlos, y en varios casos bloquean a `S-10`, no al taller. |

**Nota para quien venga de DOC-25 1.0.0.** La última fila usaba la numeración de
DOC-06 1.0.0, que el manual cambió en su 1.1.0. **La tabla de equivalencia
completa está en el `-HIST.md`**, entrada 1.1.0. Lo que hay que saber para leer
esta tabla es que `Q-20` no está en ella: no es un hueco de documentación sino
una comprobación pendiente, y se trata en 5.3 y en el apartado 6.

### 5.3 Candidatas consideradas y no propuestas

| Candidata | Motivo de no proponerla |
|---|---|
| **Usuarios, contraseña y registro de quién hizo qué** | `DOC-06/§6.1` lo lista como carencia, pero `DOC-04/§1` y `DOC-04/§4` declaran que la ausencia de identificación es **una decisión de negocio documentada, no una carencia**, y `DOC-06/§2` se la explica al usuario sin disculparse. Proponer lo contrario sería contradecir una decisión ya tomada, y además cambiaría la premisa de los 79 requisitos, no de unos pocos. Si el negocio quiere reabrirlo, que lo pida; A-15 no lo propone. **La parte recuperable de esa viñeta —«ni de recuperarlo»— sí está propuesta, y es FUN-002.** |
| **Consultar la aplicación desde otro ordenador o desde el móvil** | Mismo motivo: `DOC-06/§2` describe el puesto único como decisión de instalación, no como falta. FUN-002 cubre la parte de esa situación que sí es un riesgo real —perder los datos—, que es lo que se puede proponer sin discutir la decisión. |
| **Una pantalla de inicio con el resumen del día** | Solaparía con el recuento de pendientes de cobro y de pago ya decidido en `DOC-04/Q-14` y `DOC-04/Q-15`. Volver a proponerlo con otro nombre es exactamente lo que este documento no debe hacer. Cuando esos evolutivos existan, se podrá valorar si además hace falta reunirlos en una pantalla. Hay una pregunta abierta relacionada, `DOC-06/Q-23`, pero pregunta qué se ve hoy al abrir la aplicación, no qué debería verse. |
| **Búsqueda, ordenación y paginación en el resto de listados** | `DOC-06/Q-20` sigue abierta y sigue avisando de que **no se sabe si no existen o solo no se documentaron**. El apartado 3 del manual solo se las atribuye a *Clientes* y *Vehículos*, y lo hace citando REQ-001 y REQ-009, no habiéndolo verificado. Proponer construir algo que quizá ya está construido es fabricar producto. Va a `A-03` como comprobación (apartado 6); si se confirma que no existen, entra en la próxima ronda con evidencia de verdad. |
| **Un aviso de nóminas del mes sin registrar** | Sale de la misma viñeta que FUN-004 —«no te avisa de facturas vencidas, de stock bajo ni de nóminas sin registrar»—. Se ha valorado separarlo y no se hace: nadie ha declarado que al taller se le olviden las nóminas, y trocear una viñeta en tres propuestas para engordar el documento es precisamente lo que lo haría inútil. Si `A-06` ve que el taller lo echa en falta al refinar FUN-004, que salga de ahí. |
| **Pedidos a proveedores y contabilidad** | `DOC-06/§1` dice que la aplicación no lo hace y no pretende hacerlo. Nada en la documentación indica que el taller lo espere. Sería inventar producto. |
| **Poder rectificar solo una parte de una factura (abono parcial)** *(nueva esta ronda)* | `SPE-08-factura-rectificativa` excluye esto explícitamente de su alcance: «la rectificativa anula siempre el importe íntegro de la original — es una sustitución completa, no un abono parcial». Es un hueco real y queda anotado, pero ningún documento de `DOC-04`, `DOC-06` ni `DOC-24` dice que el taller necesite hoy corregir solo una parte de una factura — sin esa evidencia, proponerlo sería fabricar producto sobre la base de una exclusión de alcance técnica, no de una carencia declarada por nadie que use la aplicación. Si esa necesidad aparece —en una pregunta abierta, en el manual o en un defecto—, entra con su propia evidencia. |

### 5.4 Dos hallazgos que `A-12` dejó dirigidos aquí en rondas anteriores — cerrados por ambas partes

**Los avisos que salen en catalán no son una funcionalidad ausente: son un
defecto.** El hecho, documentado en su día por `DOC-16`, es que los mensajes de
error que la aplicación devuelve están escritos en catalán fijo y se muestran
tal cual, independientemente del idioma elegido. Visto desde quien usa la
aplicación: alguien que trabaja con la interfaz en castellano guarda un cliente
sin nombre y recibe el aviso en catalán. **Y `REQ-076` ya dice que la interfaz
se presenta en castellano mientras el usuario no elija otro idioma.** Ahí está
la frontera, y es la misma que aplica el apartado 5.6 de esta ronda: cuando
existe un requisito vigente que dice cómo debe comportarse el sistema y el
sistema se comporta de otra manera, eso no es algo que falte por construir —es
algo que no cumple lo que ya se pidió—, y el documento que le corresponde es
`DOC-24-BUGS`, no este. **A-15 no propone nada**; sigue siendo candidato a
`BUG-005` y **sigue sin censar** en `DOC-24` 1.1.2 —a diferencia de los cuatro
bugs que sí están censados, los cuatro `fixed` esta ronda (apartado 1), este
candidato no tiene ni ficha—. `DOC-16` 3.3.0 ya no repite este hallazgo en su
apartado 6 —A-12 lo da por completamente encaminado hacia `A-14`—, así que este
documento es hoy el único lugar donde queda constancia de que sigue abierto; el
apartado 6 lo recuerda.

**El módulo de Configuración ya es FUN-003.** `A-12` lo derivó aquí en rondas
anteriores con el argumento correcto —«un módulo sin desarrollar es
funcionalidad, no una mejora»— y con la constancia expresa de no haber propuesto
nada sobre él. No hace falta un `FUN-nnn` nuevo: hace falta que el que existe se
decida. `DOC-16` 3.0.0 tampoco repite ya este hallazgo, por el mismo motivo:
A-12 lo considera encaminado desde que existe `FUN-003`.

### 5.5 Las mejoras técnicas decididas — ninguna produce ni cierra propuesta

Se ha mirado si alguna de las tres decisiones del 2026-08-17 abre un hueco
funcional o cierra uno. **Ninguna de las dos cosas.** Queda escrito porque en la
próxima ronda alguien se lo volverá a preguntar. Esta ronda se añaden las dos
que `DOC-16` mueve de estado: `MEJ-007` y `MEJ-008` pasan a `implemented`.

| Decidida | Qué se ha valorado | Conclusión |
|---|---|---|
| **MEJ-001** · identificadores de prueba | Va a abrir las pantallas de facturas y albaranes, donde vive `FUN-001`. ¿Aprovechar el viaje? | **No se propone nada.** Aprovechar que alguien va a tocar algo no es un problema de negocio; es calendario, y lo valora `A-07` |
| **MEJ-003** · pruebas del servidor y CI | ¿Cambia algo que el taller pueda hacer? | **No.** Cambia lo que el equipo sabe. No toca ninguna carencia del apartado 6.1 del manual |
| **MEJ-005** · estado de base reproducible | ¿Cubre `FUN-002`, la copia de seguridad? | **No, y es la confusión más fácil de este documento.** Repone datos de prueba para el entorno de pruebas; no guarda ni recupera el trabajo real del taller, y no hay forma de pedirlo desde la aplicación |
| **MEJ-007** *(implemented esta ronda)* · guarda única de reenvío | Es la corrección técnica de `EXP-001`/`EXP-002`, ya verificados en vivo por `DOC-14` 2.0.0. ¿Cierra algo de este documento? | **No.** Ninguna `FUN-nnn`, viva ni nueva, dependía de la guarda de reenvío |
| **MEJ-008** *(implemented esta ronda)* · formato único de importe y fecha | Es la corrección de `EXP-014`/`EXP-009` (presentación). ¿Cierra algo de este documento? | **No.** Ninguna `FUN-nnn` trataba del formato de importes o fechas |
| **MEJ-009** *(nueva, proposed)* · aplicar `formatDate` a la fecha de alta de personal | Coste trivial, nace de `EXP-028`. ¿Es esto mío? | **No.** Es consistencia de presentación entre dos pantallas que ya muestran el mismo tipo de dato de forma distinta; no falta ninguna capacidad. A-12 lo clasifica correctamente como mejora técnica |

### 5.6 `REQ-025` y `REQ-034`: dos requisitos vigentes que la interfaz no cumple — no se proponen, van a `A-14`

`DOC-16/§6.3` señala, citando la lectura de código de `A-05` (`DOC-07/A-05-11c`),
que `AlbaransList.tsx` no ofrece filtro por vehículo ni por cliente —solo busca
sobre las columnas que pinta, y ninguna es vehículo o cliente— y que
`AlbaraLiniesSection.tsx` no renderiza ningún campo de precio para las líneas de
tipo pieza. A-12 etiqueta esto como «funcionalidad ausente» y lo dirige a A-15.

**Se ha evaluado con el mismo criterio que ya aplica el apartado 5.4 a los
avisos en catalán, y la conclusión es la misma: no se propone.**

- **`REQ-025`** dice, en presente y sin condicional: «El sistema ofrece un
  listado de albaranes filtrable por vehículo, por cliente y por situación del
  albarán.» No dice que debería ofrecerlo. Hoy solo ofrece la tercera vía.
- **`REQ-034`** y `BR-ALB-06` dan por hecho que existe un campo para informar el
  precio de una línea de pieza a mano —«cuando el usuario **no indica** el
  precio»— y hoy ese campo no existe en la pantalla para líneas de pieza.

En los dos casos hay un requisito vigente, censado y con prioridad `high`, que
describe un comportamiento que la aplicación no tiene. **Eso no es un hueco de
producto por decidir: es algo que no cumple lo que ya se pidió**, exactamente el
mismo test que separó a `FUN-003` (donde `REQ-079` sí admite honestamente que el
módulo «está pendiente de desarrollo», sin fingir que ya existe) del candidato a
`BUG-005`. Aquí no hay ningún «pendiente»: `REQ-025` y `BR-ALB-06` se leen como
si la capacidad ya estuviera construida.

**Y hay una segunda pieza de evidencia que refuerza esta lectura, no la
contradicha.** `DOC-06/§3` —fuera del alcance que A-15 puede citar como fuente
propia, pero visible al leer §6 y §9 alrededor— describe el listado de
*Albaranes* como «filtrable por vehículo, por cliente y por situación», sin
matiz. El manual y el requisito coinciden en describir una capacidad que la
lectura de código de A-05 y la ejecución de la suite (`DOC-23`) confirman que no
está. Cuando dos fuentes documentales describen algo que el código no hace, no
es un producto por construir desde cero: es una discrepancia que hay que
resolver, y ese es el trabajo de `A-14`, no el de proponer una `FUN-nnn` que
pediría, en el fondo, lo mismo que ya se pidió una vez.

**Si al investigarlo resultara que `REQ-025` y `BR-ALB-06` nunca pretendieron
llegar a esa capacidad tal como está escrita** —por ejemplo, si el filtro por
vehículo y cliente se decidió y nunca se construyó, en vez de haberse construido
mal—, la frontera que marca 5.4 sigue aplicando igual: seguiría siendo un
requisito vigente incumplido, y el documento que decide qué hacer con un
requisito vigente incumplido es `DOC-24-BUGS`, no este. El apartado 6 lo dirige
a `A-14` con el detalle completo.

### 5.7 Tres hallazgos de `DOC-14` dirigidos a A-15 sin pasar por `DOC-16` — fuera de alcance esta ronda, y por qué

Al leer `DOC-14` 2.0.0 para verificar los hallazgos de esta ronda se ha visto que
tres fichas más —`EXP-022` (el desplegable de vehículos no dice de qué cliente
es cada uno), `EXP-023` (el listado de nóminas no dice de qué empleado es cada
una) y `EXP-024` (al emitir una factura, la lista de albaranes pendientes solo
muestra el número)— declaran `deriva_a: A-15` directamente en el propio informe
de A-10.

**No se convierten en propuesta esta ronda, y no por falta de mérito aparente.**
El contrato de A-15 no incluye `DOC-14` como entrada propia: los hallazgos de
exploración le llegan por la vía que ya ha usado esta ronda para `EXP-017`,
`EXP-019`, `EXP-026` y `EXP-003` —el triaje que hace `A-12` al escribir `DOC-16`,
que decide cuáles son deuda técnica y cuáles no—. `DOC-16` 3.0.0 no recoge
todavía estos tres. Adelantarlos ahora sería saltarse ese triaje y leer `DOC-14`
como si fuera una entrada formal, que no lo es. Quedan anotados aquí para que no
se pierdan, y se espera que `DOC-16` los recoja en su próxima ronda si A-12
concluye lo mismo que para los otros tres.

## 6. Hallazgos para otras piezas

Esto **no son propuestas** y no debe tratarse como tal. Pertenece a otras piezas.

### Para `A-14 · Defectos` — dos candidatos, uno de ellos nuevo

1. **El candidato a `BUG-005` sigue abierto, sin novedad.** Los mensajes de
   error llegan siempre en catalán, elija el usuario el idioma que elija,
   mientras REQ-076 dice que la interfaz se presenta en castellano por
   defecto. A-15 lo valoró como posible funcionalidad y **concluyó que no lo
   es**: hay un requisito vigente que el comportamiento no cumple. **`DOC-24`
   1.1.2 sigue sin censarlo** —a diferencia de los cuatro bugs que sí lo están,
   los cuatro `fixed` esta ronda (apartado 1)—. `DOC-16` 3.3.0 ya no repite este
   hallazgo en su apartado 6 —A-12 lo da por completamente encaminado hacia
   A-14 desde su ronda 2.0.0—, así que este documento pasa a ser la única traza
   activa de que sigue pendiente. Origen del hecho: lectura de código en
   `44748fb`, sin reproducir todavía por nadie.
2. **Nuevo — `REQ-025` (filtro de albaranes por vehículo y cliente) y
   `REQ-034`/`BR-ALB-06` (precio informado a mano en línea de pieza) son
   requisitos vigentes, prioridad `high`, que la interfaz no cumple.**
   Verificado por `A-05` leyendo `AlbaransList.tsx` y `AlbaraLiniesSection.tsx`
   (`DOC-07/A-05-11c`, citado por `DOC-16/§6.3`): el listado de albaranes solo
   filtra sobre las columnas que pinta (ninguna es vehículo ni cliente) y la
   línea de pieza no renderiza ningún campo de precio. **`DOC-06/§3` describe
   la misma capacidad como si existiera**, sin matiz — dos fuentes documentales
   dan por hecho algo que el código no hace, lo que hace más necesaria la
   verificación en vivo antes de decidir el alcance de la corrección. A-15
   valora esto como candidato a defecto y no como funcionalidad ausente, por el
   mismo criterio que ya aplicó al candidato a `BUG-005`; el razonamiento
   completo está en el apartado 5.6. Afecta a `TC-032`, `TC-033` y `TC-047`.

### Para `A-12 · Mejoras/Roadmap` — deuda técnica y fragilidad

Los cuatro de rondas anteriores se han contrastado contra `DOC-16` **3.3.0**,
que es lo que corresponde hacer con un hallazgo enviado: comprobar si ha
aterrizado. **Los cuatro tienen ya dueño técnico**, así que aquí quedan solo
para no perder el rastro, no para pedir nada nuevo. Dos de las tres mejoras
aceptadas que se citaban aquí —`MEJ-007` y `MEJ-008`— ya pasaron a
`implemented` (5.5); ninguna de las dos cerraba una `FUN-nnn`.

**Nota de esta ronda: los cuatro `BUG-nnn` que sostenían los hallazgos 1 y 4 ya
están `fixed` (`DOC-24` 1.1.2), y eso no cierra el hallazgo — lo confirma.**
Cada uno se corrigió por separado, en su propio router, sin pasar por ningún
módulo común: dos por commit directo (`BUG-001`, `BUG-002`) y dos por `/spec`
(`BUG-003` vía `SPE-07`, `BUG-004` vía `SPE-08`). `DOC-16` 3.3.0 §1.8 añade,
además, que `SPE-07` dejó la misma regla de validación **duplicada verbatim**
en `peces.js` (`POST` y `PUT`): el patrón que motivó esta tabla en la ronda
1.0.0 no se resolvió al corregir los defectos, solo cambió de forma.

| Hallazgo de A-15 | Dónde ha aterrizado | Estado |
|---|---|---|
| 1. **No hay una comprobación común de los datos que se guardan.** `DOC-24` documentaba que BUG-001, BUG-002 y BUG-003 eran el mismo patrón: cada operación comprueba lo suyo y varias no comprueban nada. Los tres ya están corregidos, cada uno en su router, y `SPE-07` (el fix de BUG-003) dejó de propina una duplicación verbatim de la misma regla en `peces.js` | `DOC-16/§1.8` (antes `§3.0`) lo reconfirma con ese ejemplo nuevo; `MEJ-004` es la respuesta | **Recogido y reforzado**, pero `MEJ-004` sigue **sin decidir** |
| 2. **Hay reglas que solo se cumplen porque la operación no existe.** `DOC-24/DISC-001` y la nota de `BUG-004`: la inmutabilidad de la factura no estaba implementada como regla; sencillamente no había forma de modificarla. La factura rectificativa de Q-06 ya construyó esa forma (`SPE-08`) | `DOC-16/§1.8` confirma que `SPE-08` escribió la regla dentro del router (`factures.js`), no en un módulo de dominio compartido | **Recogido y cerrado en su forma original.** El matiz que hacía esto urgente —que la protección se evaporara antes de que existiera la operación— ya no aplica: `SPE-08` construyó la operación con sus reglas escritas (`BR-FAC-10`/`BR-FAC-11`). Lo que queda es evidencia para `MEJ-004`, no un riesgo abierto |
| 3. **El entorno de pruebas no se puede dejar limpio desde la aplicación.** `DOC-24/test_data_left_behind`: una factura de 114.835,05 € y su albarán imposibles de eliminar por ningún camino | `MEJ-005`, que cita esa misma factura | **Recogido y decidido**: `MEJ-005` está `accepted` desde el 2026-08-17 |
| 4. **La comprobación de importes no negativos faltaba en las dos capas a la vez**, verificado deliberadamente en `DOC-24/BUG-003`. Ya está corregida en las dos (`SPE-07`) | `DOC-16/§1.8` documenta que el fix añadió, además, la misma validación duplicada verbatim en `peces.js`. Evidencia de `MEJ-004` | **Recogido y reforzado**, `MEJ-004` sigue sin decidir |

**Nada nuevo para `A-12` en esta ronda: `DOC-16` ya documentó este mismo
ejemplo en su §1.8 antes de que A-15 lo leyera.** Y conviene decir lo que A-15
no hace con la decisión del 2026-08-17: **no opina sobre ella**. Que `MEJ-004`
siga sin decidirse es una lectura técnica y le corresponde a A-12 defenderla,
no a este documento presionar desde el lado de negocio.

### Para `A-03 · Plan de pruebas` — comprobaciones pendientes

1. **`DOC-06/Q-21`, la más urgente de las tres y sigue sin respuesta.** No consta
   si hoy se puede imprimir o exportar un albarán o una factura, y de esa
   respuesta depende cómo se refine `FUN-001`, que es la segunda propuesta
   recomendada del documento. Si existiera alguna forma de sacar la factura de la
   pantalla, la propuesta se estrecharía a darle el formato entregable que le
   falta. Afecta a REQ-052 y REQ-053. **Nota de oportunidad, no de prioridad:**
   `MEJ-001`, aceptada el 2026-08-17, va a abrir esas mismas pantallas. Quien
   coordine el trabajo decide si vale la pena mirarlo de paso; **quién lo decide
   es `A-07`, no A-15.**
2. **`DOC-06/Q-20`**: no se sabe si los listados de piezas, facturas, personal y
   nóminas tienen búsqueda, ordenación y paginación. **La parte de albaranes ya
   tiene respuesta parcial esta ronda** (apartado 5.6): `DOC-07/A-05-11c`
   confirma que el listado de albaranes filtra por situación pero no por
   vehículo ni por cliente, con lectura de código, no por herencia de
   requisito. Queda por confirmar el resto de listados. Afecta a REQ-018,
   REQ-052, REQ-056 y REQ-063.
3. **`DOC-04/Q-08`**: el idioma y el tema por defecto son las dos únicas reglas
   que vienen de una especificación y no del comportamiento observado. No es una
   duda de negocio: se comprueba mirando la aplicación. Afecta a REQ-076 y
   REQ-078. Gana interés porque el candidato a BUG-005 toca el mismo requisito
   desde otro ángulo.

**Las tres siguen sin respuesta**, y la primera lleva tres rondas pedida. No es un
reproche: es el dato que explica por qué `FUN-001` conserva confianza `medium`.

## 7. Bloque estructurado

```yaml propuestas
version: 1
project: app-taller
run:
  date: 2026-08-31
  previous_doc_version: 1.2.2
  version_bump: MINOR
  version_bump_reason: >-
    No es PATCH: cambia la evidencia y la nota de FUN-002 (se retira DOC-24/BUG-004 como
    evidencia viva, ya resuelto por otra vía). No es MAJOR: ninguna FUN-nnn cambia de status,
    ninguna se retira ni se sustituye, y el orden de la recomendación no cambia. Disparado por
    S-16: DOC-04 subió de 1.2.0 a 1.3.2 (el ack de la 1.2.2 solo cubría hasta 1.3.1). Al leer
    el diff real se encontró que DOC-24-BUGS.json, entrada opcional sin releer desde la ronda
    1.0.0, había subido de 1.0.0 a 1.1.2: los cuatro bugs censados (BUG-001 a BUG-004) constan
    fixed, no abiertos. Esta ronda corrige: (1) la tabla del apartado 5.1, que marcaba Q-02,
    Q-06, Q-10 y Q-12 como "decidido" en vez de "implementado"; (2) FUN-002, que citaba
    BUG-004 como parte de su aporte y ya no puede, porque SPE-08 lo resolvió por su cuenta;
    (3) los hallazgos hacia A-12 sobre el patrón de validación común, que ganan el ejemplo de
    duplicación verbatim en peces.js que documenta DOC-16/§1.8. De paso se consumen dos ack
    superados por lectura real: DOC-01 (1.1.0 declarado, ack hasta 1.2.0, real 1.3.0: SPE-07/
    SPE-08 formalizan lo mismo) y DOC-16 (3.1.0 declarado, ack hasta 3.2.0, real 3.3.0: §1.8).
    Ninguna FUN-nnn nace, se retira ni cambia de status, impact, difficulty, size ni
    business_value.
  trigger: >-
    S-16 · cascada de obsolescencia: DOC-25 1.2.2 declaraba DOC-04 en 1.2.0 (ack solo hasta
    1.3.1), y DOC-04 había subido a 1.3.2
  new_proposals_this_round: 0
  new_proposals_note: >-
    Ninguna esta ronda. Las doce propuestas (FUN-001 a FUN-012) conservan su número y su texto.
    Cambia la evidencia de una viva (FUN-002).
  upstream_changes:
    - doc: DOC-24-BUGS.json
      from: 1.0.0
      to: 1.1.2
      level: n/a (JSON sin campo version en el bloque inputs; declarado vs real)
      what: >-
        los cuatro bugs censados pasan a status fixed: BUG-001/BUG-002 el 2026-08-21 (commit
        directo ed61c24), BUG-003 el 2026-08-30 (SPE-07-importes-negativos), BUG-004 el
        2026-08-31 (SPE-08-factura-rectificativa). Los cuatro verificados en vivo
      effect_on_this_doc: >-
        tabla del apartado 5.1 (Q-02/Q-06/Q-10/Q-12 pasan de "decidido" a "implementado"),
        FUN-002 (se retira BUG-004 de evidence_refs, se actualiza evidence_status), hallazgos
        hacia A-12 sobre el patrón de validación común (apartado 6, actualizados con DOC-16/§1.8)
    - doc: DOC-16-ROADMAP.md
      from: 3.1.0
      to: 3.3.0
      level: MINOR
      what: >-
        delta 3.3.0, §1.8: BUG-003 y BUG-004 se cierran sin pasar por un módulo de dominio
        compartido; SPE-07 deja una duplicación verbatim de la misma regla en peces.js.
        MEJ-004 no cambia de tamaño, dificultad ni estado; crece su evidencia
      effect_on_this_doc: >-
        actualiza el hallazgo hacia A-12 sobre el patrón de validación común (apartado 6) con
        el ejemplo de peces.js. Ninguna FUN-nnn nace ni cambia
    - doc: DOC-01-BASE-ASIS.md
      from: 1.1.0
      to: 1.3.0
      level: MINOR
      what: >-
        SPE-07 y SPE-08 (Implemented) añaden UC-FAC-05 y cinco BR nuevas (BR-PEC-03/04,
        BR-ALB-11, BR-FAC-10/11) que formalizan el mismo cierre de BUG-003/BUG-004
      effect_on_this_doc: ninguno sobre ninguna FUN-nnn; resello de la entrada en inputs
  inputs_obsolescence_ack_superseded_this_round: [DOC-01-BASE-ASIS.md, DOC-04-FUNCIONAL.md, DOC-16-ROADMAP.md]
  inputs_obsolescence_ack_superseded_note: >-
    Las tres entradas tenían un obsolescence_ack que cubría hasta una versión inferior a la
    real (DOC-01 hasta 1.2.0, real 1.3.0; DOC-04 hasta 1.3.1, real 1.3.2; DOC-16 hasta 3.2.0,
    real 3.3.0). Esta ronda hace la lectura real de las tres y el ack se retira del
    front-matter (queda registrado en obsolescence_response). El ack de DOC-06 (hasta 1.4.1)
    sigue vigente: DOC-06 real sigue en 1.4.1.
citations_verified_unchanged:
  - ref: DOC-16/§6.1
    note: "en 3.3.0 sigue confirmando que EXP-017/EXP-026/EXP-019 están ya recogidos como FUN-009 a FUN-011 en DOC-25"
  - ref: DOC-16/§6.2
    note: "en 3.3.0 sigue confirmando que EXP-003 está ya recogido como FUN-012 en DOC-25"
  - ref: DOC-16/§6.3
    note: "en 3.3.0 sigue confirmando sin matiz nuevo la redirección a A-14 de REQ-025/REQ-034 que A-15 ya decidió en la ronda 1.2.0"
  - ref: DOC-16/§6.9
    note: "sigue dirigido a A-02, no a A-15: no se recoge en este documento"
citations_updated_this_round:
  - ref: DOC-16/§1.8
    note: "nuevo en 3.3.0: BUG-003/BUG-004 se cierran sin módulo de dominio compartido; duplicación verbatim en peces.js. Actualiza el hallazgo hacia A-12 (apartado 6), no crea ninguna FUN-nnn"
  - ref: DOC-24 (bloque bugs)
    note: "1.0.0 -> 1.1.2: los cuatro bugs censados pasan a fixed. Actualiza la tabla del apartado 5.1 y la evidencia de FUN-002"
provenance_fixes:
  - entry: DOC-04-FUNCIONAL.md
    fix: version actualizada de 1.2.0 a 1.3.2, hash recalculado
  - entry: DOC-24-BUGS.json
    fix: version actualizada de 1.0.0 a 1.1.2, hash recalculado
  - entry: DOC-16-ROADMAP.md
    fix: version actualizada de 3.1.0 a 3.3.0, hash recalculado
  - entry: DOC-01-BASE-ASIS.md
    fix: version actualizada de 1.1.0 a 1.3.0, hash recalculado
proposals_note: >-
  Las doce conservan su número, su texto y su estado. FUN-002 cambia de evidencia (se retira
  DOC-24/BUG-004, ya resuelto por SPE-08). El orden de la recomendación del apartado 2 no
  cambia respecto a 1.2.2.
proposals:
  - id: FUN-001
    title: "Llevarse la factura en papel o en un archivo para dárselo al cliente"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "El taller emite la factura y solo puede verla en su pantalla: no hay forma de imprimirla, guardarla ni enviarla, así que quien está en el mostrador la rehace fuera de la aplicación cada vez que cobra."
    what: "Obtener la factura como documento entregable con número, fecha, cliente, detalle de los albaranes, base, IVA y total. Lo mismo para el albarán que se le enseña al cliente antes de cobrar."
    value: "Cierra el ciclo del negocio y elimina el trabajo duplicado en otra herramienta, además del riesgo de que el papel diga algo distinto de la aplicación."
    source: evidence
    evidence_refs: [DOC-06/Q-21, DOC-06/§4/A.16, DOC-06/§4/A.17]
    affects_requirements: [REQ-048, REQ-049, REQ-051, REQ-052, REQ-053]
    contradicts: []
    depends_on: [FUN-003]
    impact: medium
    difficulty: medium
    business_value: high
    size: medium
    confidence: medium
    confidence_lowered_from: high
    confidence_lowered_in: 1.1.0
    confidence_reason: >-
      DOC-06 1.2.0 convierte su apartado 6 en una lista explícita de lo que la aplicación no
      puede hacer, y la impresión NO está en ella: Q-21 dice que no se sabe si no existe o si
      solo no se documentó, y A-04 no declara carencia lo no verificado. La propuesta se mantiene
      porque el documento entregable no existe en ningún caso —falta la identidad fiscal del
      taller, que es FUN-003—, pero la comprobación va a A-03 antes de refinar, y sigue sin
      respuesta.
    not_affected_by: >-
      MEJ-001 (accepted el 2026-08-17) va a tocar factures-pages y albarans-pages para ponerles
      identificadores de prueba. No cambia ninguna pantalla, flujo ni texto y no hace aparecer el
      documento entregable: esta propuesta no avanza ni un paso por esa aceptación, y ninguna de
      sus señales se mueve. Aprovechar el viaje es calendario y lo valora A-07, no A-15.
    if_not_done: "El taller sigue emitiendo facturas que no puede entregar y las copia a mano fuera de la aplicación."
    enters_cycle_via: A-06
  - id: FUN-002
    title: "Poder guardar una copia de los datos del taller y recuperarla"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Clientes, albaranes, facturas, piezas y nóminas viven en un único ordenador y no hay ninguna forma de respaldarlos. Le pasa al dueño del taller el día que falle el disco, y para entonces ya es tarde."
    what: "Guardar una copia completa de los datos donde el taller quiera y volver a cargarla si hace falta, sin depender de nadie técnico."
    value: "Protege toda la facturación del taller: es la única propuesta que da marcha atrás ante una pérdida total de datos, y ningún otro evolutivo del sistema la cubre."
    source: evidence
    evidence_refs: [DOC-06/Q-22, DOC-06/§2, DOC-06/§6.1]
    evidence_refs_removed_this_round: [DOC-24/BUG-004]
    evidence_refs_removed_reason: >-
      BUG-004 consta fixed desde el 2026-08-31 (DOC-24 1.1.2, SPE-08-factura-rectificativa,
      verificado en vivo): el caso concreto que citaba —una factura emitida por error no se
      podía eliminar por ningún medio— ya tiene solución propia, ajena a esta propuesta. El
      valor de FUN-002 nunca dependió de ese caso: sigue entera por el resto de su evidencia.
      SPE-08 deja explícito fuera de su alcance el abono parcial de una factura; no se propone
      nada sobre eso por falta de evidencia (ver considered_and_not_proposed)
    evidence_status: >-
      reforzada. DOC-06 1.2.0 §6.1 cierra la viñeta de la ausencia de identificación con «si algo
      se borra, no hay forma de saber quién fue ni de recuperarlo». La parte de recuperar es esta
      propuesta, y no forma parte de la decisión de negocio de no tener usuarios.
    affects_requirements: []
    contradicts: []
    impact: high
    difficulty: medium
    business_value: high
    size: medium
    confidence: high
    not_covered_by: >-
      MEJ-005 (accepted el 2026-08-17) NO cubre esta propuesta, y es la confusión más fácil de
      este documento. Sirve para que el equipo deje los datos en un estado conocido antes de
      cada prueba: repone unos datos inventados, no el trabajo real del taller, y no hay forma
      de pedirlo desde la aplicación. FUN-002 sigue entera.
    if_not_done: "Toda la facturación del taller sigue en un solo sitio y sin red; el día que falle, el daño es total."
    enters_cycle_via: A-06
  - id: FUN-003
    title: "Dar contenido a la sección Configuración"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Configuración está en el menú y solo avisa de que está pendiente. Detrás hay un hueco real: los datos del propio taller y el IVA habitual no se guardan en ninguna parte."
    what: "Decidir qué necesita el taller tener configurado y construirlo: datos del taller para la cabecera de una factura, tipo de IVA habitual, idioma y tema por defecto."
    value: "Hace posible FUN-001 y da un sitio a decisiones que hoy están fijas dentro de la aplicación."
    source: evidence
    evidence_refs: [DOC-04/Q-04, DOC-06/§3, DOC-06/§6.1, "DOC-16 2.0.0/§6.3"]
    evidence_status: >-
      reforzada por dos vías. DOC-06 §6.1 añade que «de momento no está decidido qué contendrá»,
      y A-12 la derivó expresamente a A-15 en DOC-16 2.0.0 §6.3 sin proponer nada él, marcando su
      hallazgo `encaminado` porque el número ya existía aquí. Lo que no existe es la decisión.
      Nota de esta ronda: DOC-16 3.0.0 reorganizó su apartado 6 y su §6.3 actual trata de
      REQ-025/REQ-034 (ver FUN-009 a FUN-012 y el apartado 5.6 del documento principal), no de
      Configuración; la cita se fecha a la versión donde se hizo.
    citation_corrected_in_1_1_1: >-
      la cita literal de A-12 era «un módulo sin desarrollar no es una mejora, es funcionalidad»
      (redacción de DOC-16 1.0.0) y es «un módulo sin desarrollar es funcionalidad, no una
      mejora» (redacción de 2.0.0). Mismo sentido, cita ahora exacta.
    affects_requirements: [REQ-079, REQ-050, REQ-076, REQ-078]
    contradicts: [REQ-050]
    contradicts_note: "Solo si el negocio decide configurar aquí el IVA habitual: entonces dejaría de ser cierto que se aplica siempre el 21 por ciento por defecto. Lo resuelve A-06."
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: medium
    if_not_done: "La sección sigue prometiendo algo que no hace, y FUN-001 se queda sin los datos del taller."
    enters_cycle_via: A-06
  - id: FUN-004
    title: "Avisar de qué piezas se están acabando"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "El taller no sabe que se le acaba una pieza hasta que la necesita y no la tiene. Quien hace el pedido al proveedor lo hace de memoria."
    what: "Que cada pieza tenga un mínimo por debajo del cual se quiere reponer, y que la aplicación muestre la lista de las que están en ese caso."
    value: "Convierte el stock, que ya se conoce, en una decisión de compra. Evita el trabajo parado y las compras de urgencia."
    source: evidence
    evidence_refs: [DOC-06/§6.1, DOC-06/§4/B.2]
    evidence_status: "sin cambios; la viñeta de DOC-06 1.2.0 está enunciada igual que en 1.0.0"
    affects_requirements: [REQ-018, REQ-021, REQ-022]
    contradicts: []
    impact: medium
    difficulty: low
    business_value: medium
    size: small
    confidence: high
    if_not_done: "El taller sigue comprando de memoria; el stock sigue sirviendo solo para consultarlo."
    not_to_confuse_with: "La decisión de DOC-04/Q-02 bloquea el consumo sin existencias en el momento de anotarlo; esta propuesta avisa antes de llegar a cero. Son complementarias, no la misma."
    enters_cycle_via: A-06
  - id: FUN-005
    title: "Que la nómina proponga el salario bruto del empleado"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Cada mes hay que teclear a mano el salario bruto de cada empleado aunque su ficha guarde el salario base. Le pasa a quien cierra el mes, una vez por empleado, y cada tecleo es una posible errata en un importe que se paga."
    what: "Que el bruto venga propuesto a partir del salario base del empleado y se pueda cambiar cuando ese mes no coincida."
    value: "Quita un tecleo repetitivo al mes por empleado y su error asociado, y le da uso a un dato que hoy se rellena para nada."
    source: evidence
    evidence_refs: [DOC-04/Q-05, DOC-06/§6.1, DOC-06/§4/C.5]
    evidence_status: "sin cambios; las tres citas siguen exactas en DOC-06 1.2.0"
    affects_requirements: [REQ-064, REQ-069]
    contradicts: []
    impact: low
    difficulty: low
    business_value: medium
    size: small
    confidence: high
    if_not_done: "Se sigue tecleando el bruto cada mes. Es la propuesta cuyo no hacerla duele menos."
    enters_cycle_via: A-06
  - id: FUN-006
    title: "Saber cuánto gana el taller en cada trabajo"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "El taller apunta lo que le cuesta cada pieza además de lo que cobra, pero ninguna pantalla dice cuánto se ha ganado en un albarán o en una factura. El dueño lo calcula con una calculadora al lado."
    what: "Mostrar junto a lo que se cobra al cliente lo que ha costado el material y la diferencia entre ambos, en el albarán y en la factura."
    value: "Da al taller la única cifra de negocio que hoy no tiene: si gana o no gana. Y convierte en útil un dato que ya se rellena."
    source: evidence
    evidence_refs: [DOC-04/Q-01, DOC-06/§6.1, DOC-06/§4/B.1, DOC-06/§4/A.17, DOC-06/§5, DOC-06/§7]
    evidence_status: >-
      gana dos citas. La tarea A.17 de DOC-06 1.2.0 se lo dice ya al usuario dentro de «si los
      importes no te cuadran», y el apartado 5 recoge la pregunta frecuente «¿para qué sirven el
      coste y la unidad de una pieza?».
    affects_requirements: [REQ-018, REQ-021, REQ-053]
    contradicts: []
    contradicts_note: "El margen se muestra aparte y no entra en la base de la factura, así que REQ-049 sigue siendo cierto tal cual."
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: medium
    if_not_done: "El taller sigue facturando sin saber su margen y el coste sigue siendo un campo que se rellena para nada."
    enters_cycle_via: A-06
  - id: FUN-007
    title: "Poder decir en qué punto está un trabajo"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Un albarán solo puede estar pendiente de facturar o facturado. Quien mira el listado para saber qué hay hoy en el taller no distingue un coche que se está reparando de uno acabado esperando a que lo recojan."
    what: "Que el albarán refleje el punto real del trabajo, con las situaciones que decida el taller. El listado de albaranes ya se filtra por situación, así que el sitio donde enseñarlas existe."
    value: "Convierte el listado de albaranes en la foto del taller de hoy y no solo en la lista de lo que queda por cobrar."
    source: evidence
    evidence_refs: [DOC-04/Q-07, DOC-06/§6.1, DOC-06/§3]
    evidence_status: >-
      se acota. DOC-06 1.2.0 §3 y REQ-025 confirman que el listado de albaranes ya tiene filtro
      por situación. En 1.0.0 la propuesta pedía construir ese filtro; ahora solo pide las
      situaciones. El alcance se estrecha.
    affects_requirements: [REQ-025, REQ-028, REQ-045]
    contradicts: [REQ-028, REQ-045]
    contradicts_note: "REQ-028 dejaría de ser cierto si el albarán naciera en otra situación, y REQ-045 habría que reformularlo diciendo desde qué situaciones se puede facturar."
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: low
    if_not_done: "Puede que no pase nada: es posible que el taller trabaje de verdad con dos situaciones. DOC-04/Q-07 sigue sin respuesta y es lo primero que A-06 debe preguntar."
    enters_cycle_via: A-06
  - id: FUN-008
    title: "Anotar el material que entra, en vez de recontar el stock entero"
    status: proposed
    first_proposed_in: 1.0.0
    problem: "Cuando llega material del proveedor hay que escribir a mano el stock total resultante, sumando mentalmente lo que había y lo que llega. Si entretanto alguien anota esa pieza en un albarán, la cuenta ya no sale."
    what: "Poder anotar las unidades que entran y que la aplicación sume, en lugar de teclear el total."
    value: "Quita una cuenta mental hecha con el albarán a medias y evita que un descuadre de stock se arrastre. Complementa FUN-004."
    source: opinion
    evidence_refs: [DOC-06/§4/B.2, DOC-06/§4/B.3]
    opinion_note: "Ningún documento declara esto una carencia, y se ha vuelto a comprobar contra DOC-06 1.2.0: no aparece en la lista del apartado 6.1. Lo citado es la fricción descrita en el manual. Fíltrala como opinión."
    evidence_status: "sin cambios; sigue sin respaldo documental y sigue siendo la única de criterio propio"
    affects_requirements: [REQ-018, REQ-022]
    contradicts: []
    impact: low
    difficulty: low
    business_value: low
    size: small
    confidence: medium
    if_not_done: "Se sigue recontando a mano, que es lo que se hace hoy y funciona mientras el taller sea pequeño."
    enters_cycle_via: A-06
  - id: FUN-009
    title: "Avisar antes de perder lo escrito en un formulario sin guardar"
    status: proposed
    first_proposed_in: 1.2.0
    problem: "Quien está rellenando un formulario y navega a otra sección, o recarga la página, pierde lo escrito sin ningún aviso y sin forma de recuperarlo. Es especialmente caro en los campos de texto libre, como las notas de un albarán."
    what: "Avisar de cambios sin guardar antes de abandonar un formulario, tanto en la navegación interna como al recargar o cerrar la pestaña."
    value: "Evita perder tiempo de taller reescribiendo algo que ya se había escrito por un clic accidental."
    source: evidence
    evidence_refs: [DOC-16/§6.1, DOC-14/EXP-017]
    origin_note: >-
      DOC-16 lleva reenviando este hallazgo desde su ronda 2.0.0/2.1.0 sin cambios; es la
      primera ronda de A-15 que se ejecuta desde que DOC-14 existe (nació el 2026-08-21,
      después de la última ronda de este documento) y por tanto la primera oportunidad de
      recogerlo.
    affects_requirements: []
    contradicts: []
    impact: medium
    difficulty: medium
    business_value: medium
    size: medium
    confidence: high
    if_not_done: "Se sigue perdiendo contenido sin que nadie se dé cuenta hasta que falta."
    enters_cycle_via: A-06
  - id: FUN-010
    title: "Que el diálogo de confirmación de borrado diga qué registro se va a borrar"
    status: proposed
    first_proposed_in: 1.2.0
    problem: "El diálogo de confirmación de borrado es siempre un texto genérico que no identifica el registro. Cuando hay dos registros parecidos (dos clientes con el mismo nombre, algo que la aplicación permite), quien borra no puede saber con certeza cuál va a eliminar."
    what: "Incluir el nombre o identificador visible del registro en el texto del diálogo de confirmación de borrado, en las seis entidades que se pueden borrar."
    value: "Reduce el riesgo de borrar el registro equivocado en una acción irreversible, con un cambio pequeño y acotado a un único diálogo."
    source: evidence
    evidence_refs: [DOC-16/§6.1, DOC-14/EXP-026]
    origin_note: "misma vía que FUN-009: reenviado por DOC-16 desde 2.0.0/2.1.0, primera ronda de A-15 en condiciones de recogerlo."
    affects_requirements: [REQ-006, REQ-016, REQ-023, REQ-041, REQ-061, REQ-074]
    contradicts: []
    impact: medium
    difficulty: low
    business_value: medium
    size: small
    confidence: high
    if_not_done: "El taller sigue sin poder distinguir con seguridad qué va a borrar cuando dos registros se parecen, en la única operación que no admite arrepentirse."
    enters_cycle_via: A-06
  - id: FUN-011
    title: "Dar una salida real a una pantalla de registro no encontrado"
    status: proposed
    first_proposed_in: 1.2.0
    problem: "Al abrir una ficha que ya no existe, la pantalla solo ofrece un botón «Volver a intentarlo» que repite la misma petición y vuelve a fallar siempre. No hay enlace de vuelta al listado."
    what: "Cuando el registro no existe, ofrecer una salida que funcione (un enlace al listado correspondiente) en vez de, o además de, un reintento sin éxito posible."
    value: "Una pantalla de error que ofrece algo útil en vez de un botón que no lleva a ningún sitio."
    source: evidence
    evidence_refs: [DOC-16/§6.1, DOC-14/EXP-019]
    origin_note: "misma vía que FUN-009 y FUN-010."
    affects_requirements: []
    contradicts: []
    impact: low
    difficulty: low
    business_value: low
    size: small
    confidence: high
    if_not_done: "Quien llega a una ficha inexistente recurre al menú lateral para salir; molesto, no bloqueante."
    enters_cycle_via: A-06
  - id: FUN-012
    title: "Proteger el trabajo cuando dos pestañas editan la misma ficha a la vez"
    status: proposed
    first_proposed_in: 1.2.0
    problem: "Si la misma ficha está abierta en dos pestañas y se guarda en las dos, la segunda en guardar borra en silencio lo que había guardado la primera, sin ningún aviso en ninguna de las dos."
    what: "Que un guardado no borre en silencio lo que otro acaba de guardar: avisando de que el registro cambió, o conservando los cambios de ambas pestañas cuando no chocan. Cuál de las dos formas es correcta lo decide negocio."
    value: "Evita perder trabajo ya guardado sin que nadie se entere de que se ha perdido: el riesgo más silencioso de los que recoge este documento."
    source: evidence
    evidence_refs: [DOC-16/§6.2, DOC-14/EXP-003]
    origin_note: >-
      DOC-16 lo deja pendiente de una decisión de negocio (bloqueo con aviso o fusión por
      campos) desde su ronda 2.0.0/2.1.0; no había sido evaluado nunca por A-15.
    affects_requirements: []
    contradicts: []
    impact: high
    difficulty: medium
    business_value: medium
    size: medium
    confidence: medium
    confidence_reason: >-
      la evidencia está reproducida con precisión (red y base de datos comprobadas), pero la
      solución correcta depende de una decisión que todavía no existe y que cambia el tamaño
      real del trabajo.
    if_not_done: "El taller sigue expuesto a perder cambios ya guardados sin ningún aviso cada vez que la misma ficha queda abierta en más de una pestaña. Escenario de baja frecuencia en un puesto único, coste alto cuando ocurre porque no se detecta."
    enters_cycle_via: A-06
considered_and_not_proposed:
  - what: "Los avisos de error llegan siempre en catalán aunque la interfaz esté en castellano"
    origin: DOC-16/§6.1 (rondas anteriores; ya no repetido en 3.0.0 por darse por encaminado)
    decision: no_proposal
    why: >-
      REQ-076 ya exige que la interfaz se presente en castellano mientras el usuario no elija
      otro idioma. Cuando existe requisito vigente y el sistema no lo cumple, es defecto y no
      funcionalidad ausente. Va a A-14 como confirmación del candidato BUG-005, todavía sin
      censar en DOC-24 1.1.2 (a diferencia de los cuatro bugs que sí lo están, los cuatro
      fixed).
  - what: "REQ-025 (filtro de albaranes por vehículo/cliente) y REQ-034/BR-ALB-06 (precio a mano en línea de pieza) no están construidos en la interfaz"
    origin: "DOC-16/§6.3, citando DOC-07/A-05-11c"
    decision: no_proposal
    why: >-
      Mismo criterio que los avisos en catalán: los dos requisitos están redactados en presente,
      no en condicional, y describen una capacidad que la aplicación no tiene. DOC-06/§3
      describe la misma capacidad como si existiera, lo que refuerza que es una discrepancia
      a resolver, no un hueco de producto que decidir. Va a A-14. Detalle en 5.6.
  - what: "Corregir una errata de un albarán ya facturado"
    origin: DOC-06/§6.1
    decision: no_proposal
    why: >-
      Es la cara operativa de la factura rectificativa, y desde el 2026-08-31 ya no es un
      evolutivo pendiente: está implementada y verificada en vivo (SPE-08-factura-rectificativa,
      DOC-24/BUG-004: fixed). Proponerlo aparte sería trocear con otro nombre algo que ya está
      hecho, no solo encargado.
  - what: "Poder rectificar solo una parte de una factura (abono parcial)"
    origin: "SPE-08-factura-rectificativa, apartado Alcance/Fuera (implementado el 2026-08-31)"
    decision: no_proposal
    why: >-
      SPE-08 excluye explícitamente el abono parcial: la rectificativa siempre anula el
      importe íntegro de la original. Es un hueco real, pero ningún documento de DOC-04,
      DOC-06 ni DOC-24 declara que el taller necesite hoy corregir solo una parte de una
      factura; sin esa evidencia, proponerlo sería fabricar producto sobre una exclusión de
      alcance técnica, no sobre una carencia declarada por quien usa la aplicación. Si esa
      necesidad aparece, entra con su propia evidencia.
  - what: "Un aviso de nóminas del mes sin registrar"
    origin: DOC-06/§6.1
    decision: no_proposal
    why: >-
      Sale de la misma viñeta que FUN-004 y nadie ha declarado que al taller se le olviden las
      nóminas. Si A-06 ve que se echa en falta al refinar FUN-004, que salga de ahí.
  - what: "EXP-022, EXP-023 y EXP-024 (deriva_a: A-15 directo en DOC-14, sin pasar por el triaje de DOC-16)"
    origin: DOC-14 2.0.0
    decision: no_proposal
    why: >-
      DOC-14 no es entrada formal de A-15; los hallazgos de exploración llegan por el triaje
      que hace A-12 en DOC-16, que no los recoge todavía en su 3.0.0. Adelantarlos sería
      saltarse ese triaje. Quedan anotados para que no se pierdan (apartado 5.7).
findings_for_others:
  - target: A-14
    status: abierto
    note: >-
      Candidato a BUG-005 sin novedad: los avisos de error llegan siempre en catalán y REQ-076
      dice que la interfaz se presenta en castellano mientras el usuario no elija otro idioma.
      A-15 lo valoró como posible propuesta y concluyó que es defecto, no funcionalidad. DOC-24
      1.1.2 sigue sin censarlo, a diferencia de los cuatro bugs que sí lo están y que constan
      fixed esta ronda. DOC-16 3.3.0 ya no repite este hallazgo en su apartado 6 (lo da por
      encaminado hacia A-14 desde 2.0.0); este documento es hoy la única traza activa de que
      sigue pendiente.
  - target: A-14
    status: abierto
    priority: alta
    note: >-
      REQ-025 (filtro de albaranes por vehículo y por cliente) y REQ-034/BR-ALB-06 (precio
      informado a mano en una línea de pieza) son requisitos vigentes de prioridad high que la
      interfaz no cumple, verificado por A-05 leyendo AlbaransList.tsx y
      AlbaraLiniesSection.tsx (DOC-07/A-05-11c, citado por DOC-16/§6.3, confirmado sin matiz
      nuevo en 3.3.0). DOC-06/§3 describe la misma capacidad como si existiera, sin matiz, lo
      que añade una discrepancia documental a resolver. A-15 lo valora como candidato a
      defecto, no como funcionalidad ausente, por el
      mismo criterio que el candidato a BUG-005 (detalle en 5.6). Afecta a TC-032, TC-033 y
      TC-047, que hoy no tienen vector en la interfaz por este motivo.
  - target: A-12
    status: recogido_sin_decidir
    landed_in: DOC-16/§1.8 (antes §3.0), MEJ-004
    note: "No hay comprobación común de los datos que se guardan: DOC-24 documentaba que BUG-001, BUG-002 y BUG-003 eran el mismo patrón repetido. Los tres ya están fixed (DOC-24 1.1.2), cada uno corregido en su propio router, sin módulo compartido; DOC-16/§1.8 añade que SPE-07 (el fix de BUG-003) dejó la misma regla duplicada verbatim en peces.js (POST y PUT). MEJ-004 no cambia de tamaño ni de estado; sigue proposed, con más evidencia. A-15 no opina sobre esa decisión: es técnica y es de A-12."
  - target: A-12
    status: recogido_y_cerrado_en_su_forma_original
    landed_in: DOC-16/§1.8 (antes §3.0), MEJ-004
    note: "Hay reglas que solo se cumplen porque la operación no existe. DOC-24/DISC-001 y la nota de BUG-004 señalaban que la inmutabilidad de la factura no estaba implementada, solo no había forma de modificarla. SPE-08-factura-rectificativa (2026-08-31) ya construyó esa operación con reglas escritas (BR-FAC-10/BR-FAC-11), dentro del router, no en un módulo de dominio compartido: DOC-16/§1.8 lo confirma. El riesgo que hacía esto urgente —que la protección se evaporara antes de que existiera la operación— ya no aplica; queda como evidencia de MEJ-004, no como riesgo abierto."
  - target: A-12
    status: recogido_y_decidido
    landed_in: MEJ-005
    note: "El entorno de pruebas no se puede dejar limpio desde la aplicación: DOC-24/test_data_left_behind documenta una factura de 114.835,05 € y su albarán imposibles de eliminar por ningún camino. MEJ-005 lo recoge citando esa misma factura y está accepted desde el 2026-08-17. Hallazgo cerrado por parte de A-15."
  - target: A-12
    status: recogido_sin_decidir
    landed_in: DOC-16/§1.8 (antes MEJ-004 a secas), MEJ-004
    note: "La comprobación de importes no negativos, que faltaba a la vez en pantalla y en servidor (DOC-24/BUG-003), ya está corregida en las dos (SPE-07, 2026-08-30). DOC-16/§1.8 documenta que el fix añadió, de propina, la misma validación duplicada verbatim en peces.js entre POST y PUT: sigue siendo evidencia de MEJ-004, que sigue proposed, ahora con un ejemplo más concreto."
  - target: A-03
    status: abierto
    priority: alta
    note: "DOC-06/Q-21 lleva tres rondas pedida y sigue sin respuesta: no consta si hoy se puede imprimir o exportar un albarán o una factura. De ello depende cómo se refine FUN-001, segunda propuesta recomendada, y es lo que explica su confianza medium. Si existiera alguna forma de sacar la factura de la pantalla, la propuesta se estrecharía al formato entregable. Afecta a REQ-052 y REQ-053. Nota de oportunidad, no de prioridad: MEJ-001 (accepted) va a abrir esas mismas pantallas; si vale la pena mirarlo de paso lo decide A-07, no A-15."
  - target: A-03
    status: abierto
    note: "DOC-06/Q-20 pregunta si los listados de piezas, facturas, personal y nóminas tienen búsqueda, ordenación y paginación. La parte de albaranes queda parcialmente resuelta esta ronda por DOC-07/A-05-11c: filtra por situación pero no por vehículo ni por cliente, verificado en código, no por herencia de requisito. Afecta a REQ-018, REQ-052, REQ-056 y REQ-063."
  - target: A-03
    status: abierto
    note: "DOC-04/Q-08 no es una duda de negocio sino una comprobación: el idioma y el tema por defecto son las dos únicas reglas que vienen de una especificación y no del comportamiento observado. Afecta a REQ-076 y REQ-078, y gana interés porque el candidato a BUG-005 toca REQ-076 desde otro ángulo."
summary:
  new: 0
  still_open: 12
  rejected_respected: 0
  by_source: { evidence: 11, opinion: 1 }
  by_status: { proposed: 12, accepted: 0, rejected: 0, implemented: 0, superseded: 0 }
  proposals_changed_this_round: 1          # FUN-002 cambia evidencia y nota; ninguna cambia de status ni de señal
  evidence_changed_this_round: 1           # FUN-002: se retira DOC-24/BUG-004, ya resuelto por SPE-08
  citations_verified: 4                    # DOC-16/§6.1, §6.2, §6.3, §6.9, todas en 3.3.0
  citations_updated: 2                     # DOC-16/§1.8 (nuevo) y DOC-24 (bloque bugs, 1.0.0 -> 1.1.2)
  citations_fixed: 0
  ids_requested_from_S12: 0
  not_proposed_already_in_cycle: 6
  not_proposed_not_mine: 7                 # 6 anteriores + EXP-022/023/024 agrupadas como una entrada
  not_proposed_by_judgement: 8             # incluye el redirect a A-14 de REQ-025/REQ-034 y el abono parcial (nuevo)
  upstream_decisions_evaluated: 9          # las nueve MEJ-nnn de DOC-16 3.3.0; ninguna cambia de estado ni cierra/abre una FUN-nnn
  provenance_fixes: 4                      # version/hash desactualizados corregidos: DOC-04, DOC-24, DOC-16, DOC-01
  obsolescence_ack_superseded_by_real_read: 3   # DOC-01, DOC-04, DOC-16: el ack cubría menos que la version real
  rounds_without_new_proposals: 2
  recommendation_order_changed: false
```

---

**Nota de vigencia.** Este documento se ha escrito sobre `DOC-01-BASE-ASIS`
**1.3.0**, `DOC-04-FUNCIONAL` **1.3.2**, `DOC-06-MANUAL-USUARIO` **1.3.0** (solo
§6 y §9, por contrato), `DOC-24-BUGS` **1.1.2**, el apartado 6 y el §1.8 de
`DOC-16-ROADMAP` **3.3.0** y las fichas que ese apartado cita de
`DOC-14-EXPLORATORIO` **2.1.0**, en el commit `6c8a8701a6db694fb21ee951646a4023f32308f3`.
**No se ha leído `DOC-02-TECNICA`**, y no por descuido: el contrato de A-15 lo
prohíbe. Las versiones y los hashes están en el front-matter para que `S-16`
pueda comprobarlos sin leer esta línea.

**Nada de esto está decidido.** `status: draft`. Las doce propuestas —ocho
esperando desde hace cuatro rondas, cuatro desde hace dos— siguen sin que
ninguna decisión de negocio haya recaído sobre ellas. Prioriza negocio; A-15
solo propone y ordena, y cada propuesta entra en el ciclo por
`A-06 · Refinamiento`, que es donde se resuelve hablando lo que aquí queda
ambiguo.
