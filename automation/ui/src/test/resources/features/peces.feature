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

  @TC-024 @doc05 @high
  Esquema del escenario: TC-024 Consultar el catálogo de piezas con referencia, precio y stock
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Literal: <pieza>"
    Y se valida "Literal: <referencia>"

    Ejemplos:
      | pieza          | referencia |
      | Filtre d'oli    | FO-100     |

  @TC-025 @doc05 @high
  Esquema del escenario: TC-025 Dar de alta una pieza con su stock inicial
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Boton: Nueva pieza"
    Entonces se muestra la pantalla "PiezaForm"
    Cuando se rellena "Campo: Nombre" con "<nombre>"
    Y se rellena "Campo: Stock" con "<stock>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "PiezaDetalle"
    Y se valida "Literal: <stock>"

    Ejemplos:
      | nombre           | stock |
      | Pieza TC-025     | 50    |

  @TC-028 @doc05 @medium
  Esquema del escenario: TC-028 Consultar la ficha completa de una pieza
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Fila: <pieza>"
    Entonces se muestra la pantalla "PiezaDetalle"
    Y se valida "Literal: <referencia>"
    Y se valida "Literal: <proveedor>"

    Ejemplos:
      | pieza          | referencia | proveedor      |
      | Filtre d'oli    | FO-100     | Recanvis Nord  |

  @TC-029 @doc05 @high
  Esquema del escenario: TC-029 Modificar el precio y el stock de una pieza
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Fila: <pieza>"
    Entonces se muestra la pantalla "PiezaDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "PiezaForm"
    Cuando se rellena "Campo: Precio" con "<precioNuevo>"
    Y se rellena "Campo: Stock" con "<stockNuevo>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "PiezaDetalle"
    Y se valida "Literal: <precioNuevo>"

    Ejemplos:
      | pieza                          | precioNuevo | stockNuevo |
      | Pastilles de fre davanteres    | 49.90       | 19         |

  @TC-030 @doc05 @medium
  Esquema del escenario: TC-030 Dar de baja una pieza no utilizada en ningún albarán
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Y se pulsa en "Fila: <pieza>"
    Entonces se muestra la pantalla "PiezaDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se muestra la pantalla "Piezas"
    Y se valida "Literal: Pieza eliminada correctamente"
    Y se valida "Ausente: <pieza>"

    Ejemplos:
      | pieza                       |
      | Pastilles de fre posteriors |
