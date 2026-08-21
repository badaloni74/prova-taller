# language: es
@personal
Característica: Personal — casos críticos de DOC-05 (REQ prioridad critical)

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-081 @doc05 @critical
  Esquema del escenario: TC-081 Rechazar el alta de un empleado sin nombre
    Cuando se navega a "/personal"
    Y se muestra la pantalla "Personal"
    Y se pulsa en "Boton: Nuevo empleado"
    Entonces se muestra la pantalla "PersonalForm"
    Cuando se rellena "Campo: DNI" con "<dni>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"
    Cuando se navega a "/personal"
    Y se muestra la pantalla "Personal"
    Entonces se valida "Ausente: <dni>"

    Ejemplos:
      | dni        |
      | 99999999Z  |

  @TC-082 @doc05 @critical
  Esquema del escenario: TC-082 Rechazar la modificación que deja al empleado sin nombre
    Cuando se navega a "/personal"
    Y se muestra la pantalla "Personal"
    Y se pulsa en "Fila: <empleadoExistente>"
    Entonces se muestra la pantalla "PersonalDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "PersonalForm"
    Cuando se rellena "Campo: Nombre" con "<nombreVacio>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | empleadoExistente | nombreVacio |
      | Laia Muñoz Sala   |             |

  @TC-086 @doc05 @critical
  Esquema del escenario: TC-086 Impedir la baja de un empleado con nóminas asociadas
    Cuando se navega a "/personal"
    Y se muestra la pantalla "Personal"
    Y se pulsa en "Fila: <empleado>"
    Entonces se muestra la pantalla "PersonalDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se valida "Literal: L'empleat té nòmines associades i no es pot esborrar"

    Ejemplos:
      | empleado          |
      | Marc Oliveras Puig |
