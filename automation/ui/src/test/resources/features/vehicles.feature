# language: es
@vehicles
Característica: Vehículos — casos críticos de DOC-05 (REQ prioridad critical)

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-013 @doc05 @critical
  Esquema del escenario: TC-013 Registrar un vehículo desde el módulo de vehículos
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Boton: Nuevo vehículo"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se rellena "Campo: Marca" con "<marca>"
    Y se rellena "Campo: Modelo" con "<modelo>"
    Y se rellena "Campo: Matrícula" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Y se valida "Literal: <matricula>"

    Ejemplos:
      | cliente          | marca | modelo | matricula |
      | Marta Font Aguilar | Ford  | Focus  | 4001MMM   |

  @TC-014 @doc05 @critical
  Esquema del escenario: TC-014 Registrar un vehículo desde la ficha del cliente
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Fila: <cliente>"
    Entonces se muestra la pantalla "ClienteDetalle"
    Cuando se pulsa en "Boton: Nuevo vehículo"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Campo: Marca" con "<marca>"
    Y se rellena "Campo: Modelo" con "<modelo>"
    Y se rellena "Campo: Matrícula" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Y se valida "Literal: <matricula>"

    Ejemplos:
      | cliente          | marca     | modelo | matricula |
      | Pere Alsina Roig | Peugeot   | 208    | 4002NNN   |

  @TC-015 @doc05 @critical
  Esquema del escenario: TC-015 Rechazar el alta de un vehículo sin cliente existente
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Boton: Nuevo vehículo"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Campo: Marca" con "<marca>"
    Y se rellena "Campo: Modelo" con "<modelo>"
    Y se rellena "Campo: Matrícula" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Entonces se valida "Ausente: <matricula>"

    Ejemplos:
      | marca | modelo | matricula |
      | Ford  | Focus  | 3456JKL   |

  @TC-016 @doc05 @critical
  Esquema del escenario: TC-016 Rechazar el alta de un vehículo sin marca, modelo o matrícula
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Boton: Nuevo vehículo"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se rellena "Campo: Marca" con "<marca>"
    Y se rellena "Campo: Modelo" con "<modelo>"
    Y se rellena "Campo: Matrícula" con "<matricula>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | cliente            | marca | modelo | matricula |
      | Anna Puig Ferrer    |       | Ibiza  | 4003OOO   |
      | Anna Puig Ferrer    | Seat  |        | 4004PPP   |
      | Anna Puig Ferrer    | Seat  | Ibiza  |           |

  @TC-017 @doc05 @critical
  Esquema del escenario: TC-017 Rechazar la modificación que deja el vehículo sin matrícula
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Fila: <matriculaExistente>"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Campo: Matrícula" con ""
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | matriculaExistente |
      | 5678BCD            |

  @TC-018 @doc05 @critical
  Esquema del escenario: TC-018 Impedir registrar dos vehículos con la misma matrícula
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Boton: Nuevo vehículo"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Lista: Cliente" con "<cliente>"
    Y se rellena "Campo: Marca" con "<marca>"
    Y se rellena "Campo: Modelo" con "<modelo>"
    Y se rellena "Campo: Matrícula" con "<matriculaDuplicada>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Ja existeix un vehicle amb aquesta matrícula"

    Ejemplos:
      | cliente          | marca | modelo | matriculaDuplicada |
      | Marc Vidal Soler | Seat  | Leon   | 1234ABC             |

  @TC-019 @doc05 @critical
  Esquema del escenario: TC-019 Impedir asignar por modificación una matrícula ya existente
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Fila: <matriculaAEditar>"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Campo: Matrícula" con "<matriculaDuplicada>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Ja existeix un vehicle amb aquesta matrícula"

    Ejemplos:
      | matriculaAEditar | matriculaDuplicada |
      | 5678BCD          | 1234ABC            |

  @TC-023 @doc05 @critical
  Esquema del escenario: TC-023 Impedir la baja de un vehículo con albaranes asociados
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Fila: <matricula>"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se valida "Literal: El vehicle té albarans associats i no es pot esborrar"
    Y se valida "Literal: <albaran>"

    Ejemplos:
      | matricula | albaran      |
      | 1234ABC   | 2026/A-0001  |

  @TC-012 @doc05 @high
  Esquema del escenario: TC-012 Listar vehículos, buscar, ordenar y paginar
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se rellena "Buscador: Matrícula" con "<busqueda>"
    Entonces se valida "Literal: <coincide>"
    Y se valida "Ausente: <noCoincide>"
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Columna: Matrícula"
    Entonces se valida "PrimeraFila: <primeroOrdenado>"

    Ejemplos:
      | busqueda | coincide  | noCoincide | primeroOrdenado |
      | 1234ABC  | 1234ABC   | 5678BCD    | 1234ABC         |

  @TC-020 @doc05 @high
  Esquema del escenario: TC-020 Consultar la ficha de un vehículo con su cliente y sus albaranes
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Fila: <matricula>"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Y se valida "Literal: <cliente>"
    Y se valida "Literal: <albaran>"

    Ejemplos:
      | matricula | cliente          | albaran      |
      | 1234ABC   | Anna Puig Ferrer | 2026/A-0001  |

  @TC-021 @doc05 @high
  Esquema del escenario: TC-021 Modificar los datos de un vehículo registrado
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Fila: <matricula>"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "VehiculoForm"
    Cuando se rellena "Campo: Color" con "<colorNuevo>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Y se valida "Literal: <colorNuevo>"

    Ejemplos:
      | matricula | colorNuevo |
      | 9012CDE   | Vermell    |

  @TC-022 @doc05 @medium
  Esquema del escenario: TC-022 Dar de baja un vehículo sin albaranes
    Cuando se navega a "/vehicles"
    Y se muestra la pantalla "Vehiculos"
    Y se pulsa en "Fila: <matricula>"
    Entonces se muestra la pantalla "VehiculoDetalle"
    Cuando se pulsa en "Boton: Eliminar"
    Y se pulsa en "Dialogo: Eliminar"
    Entonces se muestra la pantalla "Vehiculos"
    Y se valida "Literal: Vehículo eliminado correctamente"
    Y se valida "Ausente: <matricula>"

    Ejemplos:
      | matricula |
      | 7890EFG   |
