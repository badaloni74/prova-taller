# language: es
@peces
Característica: Piezas — casos críticos restantes de DOC-05 (REQ prioridad critical)

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-026 @doc05 @critical
  Esquema del escenario: TC-026 Rechazar el alta de una pieza sin nombre
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Boton: Nueva pieza"
    Entonces se muestra la pantalla "PiezaForm"
    Cuando se rellena "Campo: Referencia" con "<referencia>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Ausente: <referencia>"

    Ejemplos:
      | referencia |
      | REF-9001   |

  @TC-027 @doc05 @critical
  Esquema del escenario: TC-027 Rechazar la modificación que deja la pieza sin nombre
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Fila: <piezaExistente>"
    Entonces se muestra la pantalla "PiezaDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "PiezaForm"
    Cuando se rellena "Campo: Nombre" con "<nombreVacio>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | piezaExistente        | nombreVacio |
      | Bugies (joc de 4)     |             |

  @TC-031 @doc05 @critical
  Esquema del escenario: TC-031 Impedir la baja de una pieza utilizada en un albarán
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Fila: <pieza>"
    Entonces se muestra la pantalla "PiezaDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se valida "Literal: La peça té albarans associats i no es pot esborrar"

    Ejemplos:
      | pieza          |
      | Filtre d'oli    |
