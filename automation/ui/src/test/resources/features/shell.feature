# language: es
@shell
Característica: Esquelet de l'aplicació — idioma, tema i mòduls pendents (DOC-05)

  # No hay una PO dedicada: idioma y tema viven en la cabecera, presente en
  # todas las pantallas, así que los métodos genéricos de BasePO (heredados
  # por cualquier PO concreta) bastan. Se usa Clientes como pantalla ancla.

  Antecedentes: Abrir la aplicación
    Dado el navegador abierto, el usuario accede a la aplicacion

  @TC-105 @doc05 @high
  Esquema del escenario: TC-105 Cambiar el idioma sin perder el trabajo en curso
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Boton: Nuevo cliente"
    Entonces se muestra la pantalla "ClienteForm"
    Cuando se rellena "Campo: Nombre" con "<nombre>"
    Y se pulsa en "Boton: Catalán"
    Entonces se valida "Activo: Català"
    Y se valida "CampoNombre: <nombre>"
    Cuando se pulsa en "Boton: Castellà"
    Entonces se valida "Activo: Castellano"
    Y se valida "CampoNombre: <nombre>"

    Ejemplos:
      | nombre               |
      | TC-105 automatizado  |

  @TC-106 @doc05 @medium
  Esquema del escenario: TC-106 La interfaz arranca en castellano sin elección previa
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Entonces se valida "Activo: Castellano"

  @TC-107 @doc05 @medium
  Esquema del escenario: TC-107 El idioma elegido se conserva en la sesión siguiente
    # Tras el "se navega" de vuelta no se repite "se muestra la pantalla
    # Clientes": ClientsPO.pantalla() espera el literal "Nuevo cliente", que
    # solo existe en castellano — con catalán activo el botón dice "Nou
    # client" y la comprobación de pantalla fallaría por sí sola, sin que
    # signifique nada sobre si el idioma persistió. "Activo: Català" no
    # depende del idioma del botón que comprueba, así que basta con seguir
    # usando la misma instancia de pantallaActual.
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Y se pulsa en "Boton: Catalán"
    Entonces se valida "Activo: Català"
    Cuando se navega a "/clients"
    Entonces se valida "Activo: Català"

  @TC-108 @doc05 @medium
  Esquema del escenario: TC-108 Cambiar entre tema claro y tema oscuro
    Cuando se navega a "/clients"
    Y se muestra la pantalla "Clientes"
    Entonces se valida "Titulo: Cambiar a tema oscuro"
    Cuando se pulsa en "Titulo: Cambiar a tema oscuro"
    Entonces se valida "Titulo: Cambiar a tema claro"
    Cuando se pulsa en "Titulo: Cambiar a tema claro"
    Entonces se valida "Titulo: Cambiar a tema oscuro"

  # TC-109 (el tema sigue la preferencia del equipo) no está aquí: DOC-05 lo
  # marca automation.grade: not-recommended. Depende de la preferencia de
  # color del sistema operativo que ejecuta el navegador, algo que Selenium
  # no controla desde el escenario sin banderas especiales de arranque de
  # Chrome — exactamente el motivo por el que A-03 lo dejó fuera. Se ejecuta
  # a mano, tal como el propio plan de pruebas indica.

  @TC-110 @doc05 @low
  Esquema del escenario: TC-110 La sección de Configuración avisa de que está pendiente de desarrollo
    Cuando se navega a "/configuracio"
    Y se muestra la pantalla "Configuracio"
    Entonces se valida "Literal: Configuración"
    Y se valida "Literal: Módulo pendiente"
