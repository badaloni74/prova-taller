# language: es
@albarans
Característica: Albaranes — casos de DOC-05, módulo albarans

  # Los cuatro primeros escenarios derivan de DOC-05 1.1.0. El quinto (TC-900)
  # NO existe en DOC-05: se escribió a mano para demostrar un punto ciego del
  # plan de pruebas (BUG-001), ya corregido — ver su comentario. Los
  # escenarios TC-036 en adelante son la ampliación con los casos `critical`
  # restantes del módulo. TC-045 no está aquí: DOC-05 1.6.0 lo reclasificó a
  # `verification_path: service`, no compostable por interfaz (ver el anexo
  # de DOC-05).
  #
  # CONVENCIÓN: todo dato concreto (matrícula, nombre de pieza, cantidad,
  # stock, NIF...) va como variable en la tabla Ejemplos, nunca incrustado en
  # el paso. Un escenario sin ningún dato propio puede seguir siendo
  # "Escenario"; en cuanto tiene uno, pasa a "Esquema de escenario".

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-034 @doc05 @critical
  Esquema del escenario: TC-034 Abrir un albarán y comprobar que no tiene líneas
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se rellena "Campo: Notas" con "<notas>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Y se valida "Literal: <estadoEsperado>"
    Y se valida "Lineas: <lineasEsperadas>"

    Ejemplos:
      | matricula | notas               | estadoEsperado | lineasEsperadas |
      | 2345FGH   | TC-034 automatizado | Pendiente      | 0               |

  @TC-040 @doc05 @critical
  Esquema del escenario: TC-040 Añadir una línea de pieza con cantidad y precio
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"

    Ejemplos:
      | matricula | tipoLinea | pieza         | cantidad | lineasEsperadas |
      | 2345FGH   | Pieza     | Filtre d'aire | 2        | 1               |

  @TC-042 @doc05 @critical
  Esquema del escenario: TC-042 Rechazar una línea con cantidad cero
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"

    Ejemplos:
      | matricula | tipoLinea | pieza         | cantidad | lineasEsperadas |
      | 2345FGH   | Pieza     | Filtre d'aire | 0        | 0               |

  @TC-048 @doc05 @critical
  Esquema del escenario: TC-048 Añadir una línea de pieza descuenta el stock del catálogo
    # DOC-05 dice FIL-001 con stock 40. Esa pieza no existe: DOC-13 (S-06)
    # nunca se generó, así que los datos del plan no están anclados a nada.
    # Se usa la pieza real del seed. Al estar en la tabla, cambiar de dataset
    # es cambiar una fila, no reescribir el escenario.
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockFinal>"

    Ejemplos:
      | matricula | tipoLinea | pieza         | cantidad | stockInicial | stockFinal | lineasEsperadas |
      | 2345FGH   | Pieza     | Filtre d'aire | 3        | 35           | 32         | 1               |

  @TC-900 @ausente-en-doc05 @bug-001
  Esquema del escenario: TC-900 El sistema debe rechazar consumir más unidades de las que hay
    # ESTE CASO NO EXISTE EN DOC-05, y ese es exactamente el hallazgo.
    # REQ-035 documenta que el stock se descuenta, no que se compruebe la
    # disponibilidad, porque el sistema no la comprueba. El defecto quedó
    # registrado como pregunta abierta Q-02, nunca como caso de prueba.
    # Debe fallar en rojo mientras BUG-001 siga abierto.
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"

    Ejemplos:
      | matricula | tipoLinea | pieza         | cantidad | lineasEsperadas |
      | 2345FGH   | Pieza     | Filtre d'aire | 999      | 0               |

  @TC-036 @doc05 @critical
  Esquema del escenario: TC-036 Rechazar la apertura de un albarán sin vehículo existente
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Campo: Notas" con "<notas>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | notas                |
      | TC-036 automatizado  |

  @TC-037 @doc05 @critical
  Esquema del escenario: TC-037 Un albarán recién abierto queda pendiente de facturar
    # DOC-05 pide además aplicar el filtro de "pendiente" en el listado. La
    # lista no tiene un filtro por estado propio, solo el buscador genérico de
    # DataTable — se simplifica a comprobar el estado en el detalle, que es lo
    # que verifica REQ-028 de forma directa.
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Y se valida "Literal: Pendiente"

    Ejemplos:
      | matricula |
      | 1234ABC   |

  @TC-043 @doc05 @critical
  Esquema del escenario: TC-043 Rechazar una línea con cantidad negativa
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"

    Ejemplos:
      | matricula | tipoLinea | pieza         | cantidad | lineasEsperadas |
      | 2345FGH   | Pieza     | Filtre d'aire | -1       | 0               |

  @TC-044 @doc05 @critical
  Esquema del escenario: TC-044 Aceptar una línea con cantidad uno
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"

    Ejemplos:
      | matricula | tipoLinea | pieza              | cantidad | lineasEsperadas |
      | 2345FGH   | Pieza     | Bugies (joc de 4)  | 1        | 1               |

  @TC-049 @doc05 @critical
  Esquema del escenario: TC-049 Una línea rechazada no mueve el stock
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"

    Ejemplos:
      | matricula | tipoLinea | pieza                      | cantidad | stockInicial | lineasEsperadas |
      | 2345FGH   | Pieza     | Pastilles de fre posteriors | 0       | 18           | 0               |

  @TC-050 @doc05 @critical
  Esquema del escenario: TC-050 Añadir una línea de mano de obra con horas y precio por hora
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasEsperadas>"
    Y se valida "Literal: <descripcion>"

    Ejemplos:
      | matricula | tipoLinea    | descripcion                  | horas | precioHora | lineasEsperadas |
      | 2345FGH   | Mano de obra | Cambio de aceite y filtro    | 2     | 35.00      | 1               |

  @TC-053 @doc05 @critical
  Esquema del escenario: TC-053 Retirar una línea de pieza devuelve el stock al catálogo
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: <lineasTrasAnadir>"
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockTrasAnadir>"
    Cuando se navega a "/albarans"
    Y se pulsa en "Fila: <matricula>"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se pulsa en "Linea: <pieza>"
    Entonces se valida "Lineas: <lineasTrasRetirar>"
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"

    Ejemplos:
      | matricula | tipoLinea | pieza                     | cantidad | stockInicial | stockTrasAnadir | lineasTrasAnadir | lineasTrasRetirar |
      | 2345FGH   | Pieza     | Corretja de distribució   | 2        | 8            | 6                | 1                 | 0                 |

  @TC-054 @doc05 @critical
  Esquema del escenario: TC-054 Añadir y retirar la misma línea deja el stock como estaba
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "<tipoLinea>"
    Y se rellena "Lista: Pieza" con "<pieza>"
    Y se rellena "Campo: Cantidad" con "<cantidad>"
    Y se pulsa en "Boton: Añadir línea"
    Cuando se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockTrasAnadir>"
    Cuando se navega a "/albarans"
    Y se pulsa en "Fila: <matricula>"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se pulsa en "Linea: <pieza>"
    Y se navega a "/peces"
    Y se muestra la pantalla "Piezas"
    Entonces se valida "Stock: <pieza>=<stockInicial>"

    Ejemplos:
      | matricula | tipoLinea | pieza                    | cantidad | stockInicial | stockTrasAnadir |
      | 2345FGH   | Pieza     | Oli motor 5W30 (5L)      | 4        | 24           | 20               |

  # TC-057, TC-058 y TC-059 verifican REQ-042 de forma distinta a como lo narra
  # DOC-05. El plan describe "intentar cambiar/borrar/añadir y ver el rechazo",
  # pero AlbaraDetail.tsx (isPendent) oculta por completo los botones Editar y
  # Eliminar, y AlbaraLiniesSection recibe editable={isPendent}: para un
  # albarán facturado no existe ningún control que pulsar. Es una prevención
  # más fuerte que un rechazo con aviso — no hay vector, ni siquiera hay
  # formulario — y la comprobación válida por UI es la ausencia de esos
  # controles, verificada aquí.

  @TC-057 @doc05 @critical
  Esquema del escenario: TC-057 Impedir modificar la cabecera de un albarán facturado
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Fila: <numero>"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Y se valida "Literal: Facturado"
    Y se valida "Ausente: Editar"

    Ejemplos:
      | numero        |
      | 2026/A-0002   |

  @TC-058 @doc05 @critical
  Esquema del escenario: TC-058 Impedir borrar un albarán facturado
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Fila: <numero>"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Y se valida "Literal: Facturado"
    Y se valida "Ausente: Eliminar"

    Ejemplos:
      | numero        |
      | 2026/A-0002   |

  @TC-059 @doc05 @critical
  Esquema del escenario: TC-059 Impedir añadir o retirar líneas en un albarán facturado
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Fila: <numero>"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Y se valida "Literal: <lineaPieza>"
    Y se valida "Literal: <lineaManoObra>"
    Y se valida "Ausente: Añadir línea"

    Ejemplos:
      | numero        | lineaPieza                     | lineaManoObra          |
      | 2026/A-0002   | Pastilles de fre davanteres    | Canvi de pastilles de fre |
