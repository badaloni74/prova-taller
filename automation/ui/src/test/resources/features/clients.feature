# language: es
@clients
Característica: Clientes — casos críticos de DOC-05 (REQ prioridad critical)

  # Todos los escenarios usan datos reales del seed (npm run seed), no los del
  # DOC-05 original (p.ej. "Tallers Puig SL"), que no existen en esta base.
  # CONVENCIÓN: todo dato concreto va en la tabla Ejemplos, nunca incrustado en
  # el paso.

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-003 @doc05 @critical
  Esquema del escenario: TC-003 Registrar un cliente nuevo
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Boton: Nuevo cliente"
    Entonces se muestra la pantalla "ClienteForm"
    Cuando se rellena "Campo: Nombre" con "<nombre>"
    Y se rellena "Campo: NIF" con "<nif>"
    Y se rellena "Campo: Teléfono" con "<telefono>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "ClienteDetalle"
    Y se valida "Literal: <nif>"
    Y se valida "Literal: <telefono>"

    Ejemplos:
      | nombre          | nif       | telefono  |
      | Tallers Nou SL  | B99999999 | 933999888 |

  @TC-004 @doc05 @critical
  Esquema del escenario: TC-004 Rechazar el alta de un cliente sin nombre
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Boton: Nuevo cliente"
    Entonces se muestra la pantalla "ClienteForm"
    Cuando se rellena "Campo: Teléfono" con "<telefono>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Entonces se valida "Ausente: <telefono>"

    Ejemplos:
      | telefono  |
      | 933999777 |

  @TC-005-alta @doc05 @critical
  Esquema del escenario: TC-005 Rechazar la modificación que deja al cliente sin nombre
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <clienteExistente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "ClienteForm"
    Cuando se rellena "Campo: Nombre" con "<nombreVacio>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | clienteExistente     | nombreVacio |
      | Garatge Pujol SL     |             |

  @TC-010 @doc05 @critical
  Esquema del escenario: TC-010 Impedir la baja de un cliente con vehículos asociados
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se valida "Literal: El client té vehicles associats i no es pot esborrar"
    Y se valida "Literal: <vehiculo>"

    Ejemplos:
      | cliente           | vehiculo  |
      | Anna Puig Ferrer   | 1234ABC   |

  @TC-011 @doc05 @critical
  Esquema del escenario: TC-011 Impedir la baja de un cliente con facturas asociadas
    # server/routes/clients.js comprueba primero vehículos y solo después
    # facturas (líneas 74-86). Una factura nace de un albarán, que nace de un
    # vehículo, y un vehículo con cualquier albarán no se puede borrar nunca
    # (vehicles.js) — así que ningún cliente con factura puede llegar sin
    # vehículo: el aviso de "factures associades" es inalcanzable con datos
    # reales, siempre gana el de "vehicles associats" primero. El cliente
    # sigue protegido igual; cambia solo cuál de los dos avisos se ve.
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se valida "Literal: El client té vehicles associats i no es pot esborrar"
    Y se valida "Literal: <factura>"

    Ejemplos:
      | cliente          | factura       |
      | Marc Vidal Soler | 2026/F-0001   |

  @TC-001 @doc05 @high
  Esquema del escenario: TC-001 Listar clientes y buscar por nombre
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se rellena "Buscador: Nombre" con "<busqueda>"
    Entonces se valida "Literal: <coincide>"
    Y se valida "Ausente: <noCoincide>"

    Ejemplos:
      | busqueda | coincide           | noCoincide         |
      | Anna     | Anna Puig Ferrer    | Marc Vidal Soler   |

  @TC-002 @doc05 @medium
  Esquema del escenario: TC-002 Ordenar por columna y paginar el listado de clientes
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Columna: Nombre"
    Entonces se valida "PrimeraFila: <primeroAlfabetico>"
    Cuando se pulsa en "Boton: ›"
    Entonces se valida "Literal: 2 / 2"

    Ejemplos:
      | primeroAlfabetico |
      | Anna Puig Ferrer  |

  @TC-006 @doc05 @high
  Esquema del escenario: TC-006 Consultar la ficha de un cliente con vehículos y facturas
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Y se valida "Literal: <vehiculo>"
    Y se valida "Literal: <factura>"

    Ejemplos:
      | cliente          | vehiculo   | factura     |
      | Marc Vidal Soler | 5678BCD    | 2026/F-0001 |

  @TC-007 @doc05 @high
  Esquema del escenario: TC-007 Modificar los datos de un cliente registrado
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "ClienteForm"
    Cuando se rellena "Campo: Teléfono" con "<telefonoNuevo>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "ClienteDetalle"
    Y se valida "Literal: <telefonoNuevo>"

    Ejemplos:
      | cliente                  | telefonoNuevo |
      | Distribucions Vallès SL  | 938255599     |

  @TC-008 @doc05 @medium
  Esquema del escenario: TC-008 Dar de baja un cliente sin vehículos ni facturas
    # El buscador acota antes de pulsar la fila: el listado ordena por nombre
    # y pagina de 10 en 10, y con las altas de otros escenarios este cliente
    # puede quedar fuera de la primera página.
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se rellena "Buscador: Nombre" con "<cliente>"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se muestra la pantalla "Clientes"
    Y se valida "Literal: Cliente eliminado correctamente"
    Y se valida "Ausente: <cliente>"

    Ejemplos:
      | cliente              |
      | Tallers Roca i Fills |

  @TC-009 @doc05 @medium
  Esquema del escenario: TC-009 Cancelar la confirmación de baja deja el cliente registrado
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se rellena "Buscador: Nombre" con "<cliente>"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Cancelar"
    Entonces se valida "Literal: <cliente>"
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se rellena "Buscador: Nombre" con "<cliente>"
    Entonces se valida "Literal: <cliente>"

    Ejemplos:
      | cliente             |
      | Transports Bages SL |
