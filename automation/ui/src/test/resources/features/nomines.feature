# language: es
@nomines
Característica: Nóminas — casos críticos de DOC-05 (REQ prioridad critical)

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-088 @doc05 @critical
  Esquema del escenario: TC-088 Registrar una nómina desde el módulo de nóminas
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se rellena "Campo: Deducciones" con "<deducciones>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: <netoEsperado> €"

    Ejemplos:
      | empleado        | mes | anyo | bruto   | deducciones | netoEsperado |
      | Laia Muñoz Sala | 3   | 2026 | 1200.00 | 150.00      | 1050.00      |

  @TC-089 @doc05 @critical
  Esquema del escenario: TC-089 Registrar una nómina desde la ficha del empleado
    Cuando se navega a "/personal"
    Y se muestra la pantalla "Personal"
    Y se pulsa en "Fila: <empleado>"
    Entonces se muestra la pantalla "PersonalDetalle"
    Cuando se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se rellena "Campo: Deducciones" con "<deducciones>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: <netoEsperado> €"

    Ejemplos:
      | empleado        | mes | anyo | bruto   | deducciones | netoEsperado |
      | Laia Muñoz Sala | 4   | 2026 | 1300.00 | 100.00      | 1200.00      |

  @TC-090 @doc05 @critical
  Esquema del escenario: TC-090 Rechazar una nómina sin empleado existente
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se rellena "Campo: Deducciones" con "<deducciones>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | mes | anyo | bruto   | deducciones |
      | 6   | 2026 | 1500.00 | 200.00      |

  @TC-091 @doc05 @critical
  Esquema del escenario: TC-091 Rechazar una nómina sin empleado, mes o año
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Este campo es obligatorio"

    Ejemplos:
      | empleado          | mes | anyo |
      |                   | 7   | 2026 |
      | Laia Muñoz Sala   |     | 2026 |
      | Laia Muñoz Sala   | 7   |      |

  @TC-095 @doc05 @critical
  Esquema del escenario: TC-095 Impedir dos nóminas del mismo empleado, mes y año
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se pulsa en "Boton: Guardar"
    Entonces se valida "Literal: Ja existeix una nòmina d'aquest empleat per aquest mes i any"

    Ejemplos:
      | empleado           | mes | anyo | bruto   |
      | Marc Oliveras Puig | 1   | 2026 | 1000.00 |

  @TC-096 @doc05 @critical
  Esquema del escenario: TC-096 Permitir el mismo mes y año para otro empleado
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: Pendiente"

    Ejemplos:
      | empleado        | mes | anyo | bruto   |
      | Laia Muñoz Sala | 1   | 2026 | 1100.00 |

  @TC-098 @doc05 @critical
  Esquema del escenario: TC-098 El neto es el bruto menos las deducciones
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se rellena "Campo: Deducciones" con "<deducciones>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: <netoEsperado> €"

    Ejemplos:
      | empleado        | mes | anyo | bruto    | deducciones | netoEsperado |
      | Laia Muñoz Sala | 6   | 2026 | 1000.00  | 200.00      | 800.00       |

  @TC-099 @doc05 @critical
  Esquema del escenario: TC-099 Al cambiar el bruto, el neto consultado cambia con él
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<brutoInicial>"
    Y se rellena "Campo: Deducciones" con "<deducciones>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: <netoInicial> €"
    Cuando se pulsa en "Boton: Editar"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Campo: Salario bruto" con "<brutoNuevo>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: <netoNuevo> €"

    Ejemplos:
      | empleado        | mes | anyo | brutoInicial | deducciones | netoInicial | brutoNuevo | netoNuevo |
      | Laia Muñoz Sala | 7   | 2026 | 900.00       | 100.00      | 800.00      | 1000.00    | 900.00    |

  @TC-100 @doc05 @critical
  Esquema del escenario: TC-100 El neto se presenta con dos decimales
    Cuando se navega a "/nomines"
    Y se muestra la pantalla "Nomines"
    Y se pulsa en "Boton: Nueva nómina"
    Entonces se muestra la pantalla "NominaForm"
    Cuando se rellena "Lista: Empleado" con "<empleado>"
    Y se rellena "Campo: Mes" con "<mes>"
    Y se rellena "Campo: Año" con "<anyo>"
    Y se rellena "Campo: Salario bruto" con "<bruto>"
    Y se rellena "Campo: Deducciones" con "<deducciones>"
    Y se pulsa en "Boton: Guardar"
    Entonces se muestra la pantalla "NominaDetalle"
    Y se valida "Literal: <netoEsperado> €"

    Ejemplos:
      | empleado        | mes | anyo | bruto   | deducciones | netoEsperado |
      | Laia Muñoz Sala | 8   | 2026 | 1500.00 | 200.50      | 1299.50      |
