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
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se valida "Literal: El client té factures associades i no es pot esborrar"
    Y se valida "Literal: <factura>"

    Ejemplos:
      | cliente          | factura       |
      | Marc Vidal Soler | 2026/F-0001   |
