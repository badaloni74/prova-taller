# language: es
@factures
Característica: Facturas — casos críticos de DOC-05 (REQ prioridad critical)

  # Todos los escenarios usan el vehículo de pruebas 8001TST, creado para este
  # fichero (cliente "Autoescola Vilanova", que no tenía ningún vehículo en el
  # seed): así el listado de "albaranes pendientes de este cliente" nace
  # limpio y las sumas de base/IVA/total son exactas, sin depender del estado
  # que dejen otras suites.
  #
  # TC-063 y TC-064 NO están aquí: DOC-05 1.6.0 los reclasificó a
  # `verification_path: service` — FacturaForm solo lista albaranes
  # pendientes del cliente elegido, así que un albarán ya facturado o de otro
  # cliente nunca puede seleccionarse desde esta pantalla (ver el anexo de
  # DOC-05 y DOC-07 §3.11).

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-060 @doc05 @critical
  Esquema del escenario: TC-060 Emitir una factura con los albaranes pendientes de un cliente
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: <baseEsperada> €"
    Y se valida "Literal: <totalEsperado> €"

    Ejemplos:
      | matricula | cliente             | descripcion         | horas | precioHora | baseEsperada | totalEsperado |
      | 8001TST   | Autoescola Vilanova | TC-060 automatizado | 1     | 100.00     | 100,00        | 121,00        |

  @TC-061 @doc05 @critical
  Esquema del escenario: TC-061 La emisión solo ofrece albaranes pendientes del cliente elegido
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Entonces se valida "Ausente: <albaranDeOtroCliente>"

    Ejemplos:
      | matricula | cliente             | albaranDeOtroCliente |
      | 8001TST   | Autoescola Vilanova | 2026/A-0001           |

  @TC-062 @doc05 @critical
  Esquema del escenario: TC-062 Rechazar la emisión de una factura sin ningún albarán
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se valida "Literal: Selecciona al menos un albarán"

    Ejemplos:
      | matricula | cliente             |
      | 8001TST   | Autoescola Vilanova |

  @TC-065 @doc05 @critical
  Esquema del escenario: TC-065 Al emitir, los albaranes pasan a facturados y quedan enlazados
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Cuando se pulsa en "Enlace: primerAlbaran"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Y se valida "Literal: Facturado"

    Ejemplos:
      | matricula | cliente             | descripcion         | horas | precioHora |
      | 8001TST   | Autoescola Vilanova | TC-065 automatizado | 1     | 100.00     |

  @TC-066 @doc05 @critical
  Esquema del escenario: TC-066 Una emisión rechazada deja los albaranes pendientes
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se valida "Literal: Selecciona al menos un albarán"
    Y se valida "Pendientes: 1"

    Ejemplos:
      | matricula | cliente             |
      | 8001TST   | Autoescola Vilanova |

  @TC-069 @doc05 @critical
  Esquema del escenario: TC-069 La base es la suma de cantidad por precio y el total es base más IVA
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
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: <baseEsperada> €"
    Y se valida "Literal: <totalEsperado> €"

    Ejemplos:
      | matricula | cliente             | tipoLinea | pieza              | cantidad | baseEsperada | totalEsperado |
      | 8001TST   | Autoescola Vilanova | Pieza     | Bugies (joc de 4)  | 2        | 56,00         | 67,76         |

  @TC-070 @doc05 @critical
  Esquema del escenario: TC-070 La base agrega las líneas de todos los albaranes de la factura
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion1>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion2>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: todas"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: <baseEsperada> €"
    Y se valida "Literal: <totalEsperado> €"

    Ejemplos:
      | matricula | cliente             | descripcion1         | descripcion2         | horas | precioHora | baseEsperada | totalEsperado |
      | 8001TST   | Autoescola Vilanova | TC-070 automatizado 1| TC-070 automatizado 2| 1     | 100.00     | 200,00        | 242,00        |

  @TC-071 @doc05 @critical
  Esquema del escenario: TC-071 Sin indicar tipo de IVA, la factura aplica el 21 por ciento
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    # No se toca el campo IVA (%): debe conservar su valor por defecto, 21.
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: 21%"
    Y se valida "Literal: <totalEsperado> €"

    Ejemplos:
      | matricula | cliente             | descripcion         | horas | precioHora | totalEsperado |
      | 8001TST   | Autoescola Vilanova | TC-071 automatizado | 1     | 100.00     | 121,00        |

  @TC-072 @doc05 @critical
  Esquema del escenario: TC-072 El tipo de IVA indicado se aplica en lugar del 21 por ciento
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se rellena "Campo: IVA" con "<iva>"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: <iva>%"
    Y se valida "Literal: <totalEsperado> €"

    Ejemplos:
      | matricula | cliente             | descripcion         | horas | precioHora | iva | totalEsperado |
      | 8001TST   | Autoescola Vilanova | TC-072 automatizado | 1     | 100.00     | 10  | 110,00        |

  @TC-067 @doc05 @high
  Esquema del escenario: TC-067 La factura recibe número automático con formato año/F-nnnn
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Patron: ^\d{4}/F-\d{4}$"

    Ejemplos:
      | matricula | cliente             | descripcion         | horas | precioHora |
      | 8001TST   | Autoescola Vilanova | TC-067 automatizado | 1     | 100.00     |

  @TC-068 @doc05 @medium
  Esquema del escenario: TC-068 La segunda factura del año incrementa el correlativo en uno
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion1>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se guarda el número de esta pantalla
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion2>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y el número de esta pantalla es uno más que el guardado

    Ejemplos:
      | matricula | cliente             | descripcion1          | descripcion2          | horas | precioHora |
      | 8001TST   | Autoescola Vilanova | TC-068 automatizado 1 | TC-068 automatizado 2 | 1     | 100.00     |

  @TC-073 @doc05 @critical
  Esquema del escenario: TC-073 Base, IVA y total se presentan con dos decimales
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "<horas>"
    Y se rellena "Campo: Precio/hora" con "<precioHora>"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: <baseEsperada> €"
    Y se valida "Literal: <totalEsperado> €"

    Ejemplos:
      | matricula | cliente             | descripcion         | horas | precioHora | baseEsperada | totalEsperado |
      | 8001TST   | Autoescola Vilanova | TC-073 automatizado | 1     | 33.33      | 33,33         | 40,33         |

  @TC-074 @doc05 @high
  Esquema del escenario: TC-074 Listar facturas con número, estado de pago y total
    # El buscador acota antes de comprobar: el listado ordena por número
    # descendente y pagina de 10 en 10, y con las facturas que crean otros
    # escenarios de este fichero, la 2026/F-0001 del seed queda fuera de la
    # primera página.
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se rellena "Buscador: Número" con "<factura>"
    Entonces se valida "Literal: <factura>"
    Y se valida "Literal: <total>"

    Ejemplos:
      | factura       | total    |
      | 2026/F-0001   | 119,06 € |

  @TC-075 @doc05 @high
  Esquema del escenario: TC-075 El detalle de la factura muestra albaranes, base, IVA y total
    # Se navega directo por id en vez de buscar la fila: mismo motivo que
    # TC-074, y el id es estable porque sale del seed determinista.
    Cuando se navega a "/factures/1"
    Y se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: <albaran>"
    Y se valida "Literal: <base> €"
    Y se valida "Literal: <total> €"

    Ejemplos:
      | factura       | albaran      | base  | total  |
      | 2026/F-0001   | 2026/A-0002  | 98,40 | 119,06 |

  @TC-076 @doc05 @high
  Esquema del escenario: TC-076 Marcar una factura como pagada
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "1"
    Y se rellena "Campo: Precio/hora" con "50.00"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: Pendiente"
    Cuando se pulsa en "Boton: Marcar como pagada"
    Entonces se valida "Literal: Pagada"

    Ejemplos:
      | matricula | cliente             | descripcion         |
      | 8001TST   | Autoescola Vilanova | TC-076 automatizado |

  @TC-077 @doc05 @medium
  Esquema del escenario: TC-077 Devolver una factura pagada a pendiente de cobro
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "1"
    Y se rellena "Campo: Precio/hora" con "50.00"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Cuando se pulsa en "Boton: Marcar como pagada"
    Entonces se valida "Literal: Pagada"
    Cuando se pulsa en "Boton: Marcar como pendiente"
    Entonces se valida "Literal: Pendiente"

    Ejemplos:
      | matricula | cliente             | descripcion         |
      | 8001TST   | Autoescola Vilanova | TC-077 automatizado |

  @TC-078 @doc05 @high
  Esquema del escenario: TC-078 El estado de pago de la factura solo admite pendiente o pagada
    Cuando se navega a "/albarans"
    Y se muestra la pantalla "Albaranes"
    Y se pulsa en "Boton: Nuevo albarán"
    Entonces se muestra la pantalla "AlbaranForm"
    Cuando se rellena "Lista: Vehículo" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "AlbaranDetalle"
    Cuando se rellena "Lista: Tipo" con "Mano de obra"
    Y se rellena "Campo: Descripción" con "<descripcion>"
    Y se rellena "Campo: Horas" con "1"
    Y se rellena "Campo: Precio/hora" con "50.00"
    Y se pulsa en "Boton: Añadir línea"
    Entonces se valida "Lineas: 1"
    Cuando se navega a "/factures"
    Y se muestra la pantalla "Facturas"
    Y se pulsa en "Boton: Nueva factura"
    Entonces se muestra la pantalla "FacturaForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se pulsa en "Casilla: única"
    Y se pulsa en "Boton: Crea la factura"
    Entonces se muestra la pantalla "FacturaDetalle"
    Y se valida "Literal: Pendiente"
    Y se valida "Ausente: Pagada"
    Cuando se pulsa en "Boton: Marcar como pagada"
    Entonces se valida "Literal: Pagada"
    Y se valida "Ausente: Pendiente"
    Cuando se pulsa en "Boton: Marcar como pendiente"
    Entonces se valida "Literal: Pendiente"

    Ejemplos:
      | matricula | cliente             | descripcion         |
      | 8001TST   | Autoescola Vilanova | TC-078 automatizado |
