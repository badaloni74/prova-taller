package com.qa.taller.Plantillas;

import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Centraliza todo lo reutilizable para que cada PO concreta sea pequeña.
 * Los localizadores viven en las PO concretas, nunca aquí ni en StepDef.
 */
public abstract class BasePO {

    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePO(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }


    /**
     * Cita un valor para XPath de forma segura. Sin esto, un valor con
     * apóstrofo como "Filtre d'aire" cierra la cadena y produce
     * InvalidSelectorException. Es un fallo real que apareció en la primera
     * ejecución contra la aplicación.
     */
    protected static String xq(String s) {
        if (!s.contains("'")) return "'" + s + "'";
        if (!s.contains("\"")) return "\"" + s + "\"";
        return "concat('" + s.replace("'", "',\"'\",'") + "')";
    }

    // ---------------------------------------------------------- localización

    /** Campo o select adyacente a una etiqueta visible. Es el patrón que exige
     *  esta aplicación: los formularios de línea no llevan id. */
    protected WebElement porEtiqueta(String etiqueta, String tag) {
        String xp = "//label[normalize-space()=" + xq(etiqueta) + "]/following-sibling::" + tag;
        return wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xp)));
    }

    protected WebElement porId(String id) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(By.id(id)));
    }

    protected WebElement boton(String texto) {
        String xp = "//button[normalize-space()=" + xq(texto) + "]";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    protected WebElement enlace(String texto) {
        String xp = "//a[normalize-space()=" + xq(texto) + "]";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    /** Fila de una tabla (DataTable) que contiene el texto dado. Las filas no
     *  son enlaces: el onClick vive en el propio <tr>, no en un <a>. Es
     *  transversal a todas las pantallas de listado (Clientes, Vehículos,
     *  Piezas, Personal, Nóminas, Facturas). */
    protected WebElement fila(String texto) {
        String xp = "//tbody/tr[td[contains(normalize-space(text())," + xq(texto) + ")]]";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    /** Buscador genérico de DataTable. No lleva id (a diferencia de todos los
     *  campos de formulario, que sí): es el único <input type="text"> sin id
     *  en una pantalla de listado, y ese es el ancla. Transversal a todos los
     *  listados de este proyecto. */
    protected WebElement buscador() {
        return wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//input[@type='text' and not(@id)]")));
    }

    /** Cabecera de columna de DataTable, para ordenar. */
    protected WebElement columna(String texto) {
        String xp = "//th[contains(normalize-space(.)," + xq(texto) + ")]";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    /** Botón localizado por su atributo title, no por su texto. Hace falta
     *  para ThemeToggle: el botón no lleva texto, solo un emoji y un
     *  title/aria-label ("Cambiar a tema oscuro"/"...claro"). */
    protected WebElement botonPorTitulo(String titulo) {
        String xp = "//button[@title=" + xq(titulo) + "]";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    /** Botón dentro de ConfirmDialog (role="dialog"). Hace falta porque el
     *  botón de confirmar repite el texto del botón que abre el diálogo
     *  ("Eliminar" y "Eliminar"): sin acotar al diálogo, boton() encuentra
     *  siempre el primero en el DOM, que es el de la ficha, no el del
     *  diálogo. Transversal: todo borrado de este proyecto pasa por
     *  ConfirmDialog. */
    protected WebElement botonDialogo(String texto) {
        String xp = "//div[@role='dialog']//button[normalize-space()=" + xq(texto) + "]";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    // ------------------------------------------------------------ acciones

    /**
     * WebElement.clear() no siempre dispara el 'input' event que React
     * necesita para actualizar su estado controlado: en Chrome vía CDP puede
     * limpiar el DOM sin pasar por el pipeline de eventos de teclado. Cuando
     * eso pasa, el campo se ve vacío pero React sigue creyendo que tiene el
     * valor anterior, y una validación de "campo obligatorio" nunca salta.
     * Limpiar con teclas reales (Ctrl+A, Supr) sí dispara un evento por
     * cada pulsación. Fallo real: TC-005 (editar y dejar el nombre vacío)
     * pasaba de largo la validación hasta corregir esto.
     */
    protected void escribir(WebElement e, String valor) {
        e.sendKeys(Keys.chord(Keys.CONTROL, "a"));
        e.sendKeys(Keys.DELETE);
        if (!valor.isEmpty()) {
            e.sendKeys(valor);
        }
    }

    protected void seleccionarPorTextoParcial(WebElement select, String parcial) {
        // Las opciones llegan de un fetch asíncrono: esperar al <select> no basta,
        // hay que esperar a que tenga contenido. Sin esto la suite es inestable:
        // pasa cuando un escenario anterior ya calentó la petición y falla en
        // ejecución aislada. Fallo real detectado en la primera ejecución limpia.
        wait.until(d -> new Select(select).getOptions().size() > 1);
        Select s = new Select(select);
        for (WebElement o : s.getOptions()) {
            if (o.getText().contains(parcial)) {
                s.selectByVisibleText(o.getText());
                return;
            }
        }
        throw new NoSuchElementException(
            "opcionNoEncontrada: ninguna opción contiene \"" + parcial + "\"");
    }

    // --------------------------------------------------------- validaciones

    /**
     * Localiza el elemento más específico cuyo texto contiene la cadena
     * dada. Usa normalize-space(.) —contenido íntegro del elemento—, no
     * normalize-space(text()) —solo su primer nodo de texto directo—:
     * cuando dos fragmentos son hermanos en el JSX (p.ej. {"← "}{t(...)}),
     * text() ignora el segundo y la búsqueda nunca encuentra "Volver al
     * listado". La cláusula not(.//*[...]) descarta los ancestros que
     * también casan por contener al hijo, para no devolver <body> entero.
     * Fallo real detectado en la primera ejecución completa de la suite.
     */
    public boolean existeLiteral(String texto) {
        return !driver.findElements(
            By.xpath("//*[contains(normalize-space(.)," + xq(texto) + ") and not(.//*[contains(normalize-space(.)," + xq(texto) + ")])]")).isEmpty();
    }

    protected void esperarLiteral(String texto) {
        wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//*[contains(normalize-space(.)," + xq(texto) + ") and not(.//*[contains(normalize-space(.)," + xq(texto) + ")])]")));
    }

    // ------------------------------------------------- contrato de cada PO

    /** Valida que la pantalla esperada está cargada. */
    public abstract void pantalla();

    public void sePulsaEn(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Boton" -> boton(a.valor).click();
            case "Enlace" -> enlace(a.valor).click();
            case "Fila" -> fila(a.valor).click();
            case "Dialogo" -> botonDialogo(a.valor).click();
            case "Columna" -> columna(a.valor).click();
            case "Titulo" -> botonPorTitulo(a.valor).click();
            default -> throw noDisponible(argumento);
        }
    }

    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if ("Buscador".equals(a.tipo)) {
            escribir(buscador(), valor);
            return;
        }
        throw noDisponible(argumento);
    }

    public void seValida(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            // Con espera, no con una lectura instantánea de existeLiteral():
            // muchos avisos (bloqueo de borrado, validación de formulario)
            // llegan tras un await a la API, y una comprobación inmediata es
            // una carrera que la mayoría de las veces gana pero a veces
            // pierde. Fallo real e intermitente: TC-031 lo perdió la primera
            // vez que corrió la suite completa tras añadir más escenarios.
            case "Literal" -> {
                try {
                    wait.until(d -> existeLiteral(a.valor));
                } catch (TimeoutException e) {
                    throw new AssertionError(
                        "literalNoEncontrado: no se ve \"" + a.valor + "\" en " + getClass().getSimpleName());
                }
            }
            // Comprueba una ausencia ("no existe ningún cliente con teléfono X").
            // Transversal a varias pantallas de listado: no es una comprobación
            // de una sola PO, así que vive aquí y no se duplica en cada una.
            case "Ausente" -> {
                if (existeLiteral(a.valor)) {
                    throw new AssertionError(
                        "literalNoDeberiaExistir: se ve \"" + a.valor + "\" y no debería, en "
                            + getClass().getSimpleName());
                }
            }
            // "Activo: Castellano" — el botón de idioma expone su estado con
            // aria-pressed, no con una clase visual comprobable por texto.
            // Con espera por el mismo motivo que "Titulo": aria-pressed
            // cambia en el siguiente re-render, no en el mismo instante.
            case "Activo" -> {
                try {
                    wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(
                        "//button[normalize-space()=" + xq(a.valor) + " and @aria-pressed='true']")));
                } catch (TimeoutException e) {
                    throw new AssertionError(
                        "noEstaActivo: \"" + a.valor + "\" no tiene aria-pressed=\"true\"");
                }
            }
            // "Titulo: Cambiar a tema oscuro" — comprueba que existe un botón
            // con ese title/aria-label (ThemeToggle no tiene texto, solo un
            // emoji: el title es el único ancla, y cambia según el estado).
            // Con espera: el título cambia en un re-render de React posterior
            // al clic, no en el mismo instante — un driver.findElements()
            // inmediato es una carrera que a veces pierde. Fallo real visto
            // al verificar el cambio de tema a mano antes de escribir esto.
            case "Titulo" -> {
                try {
                    wait.until(ExpectedConditions.presenceOfElementLocated(
                        By.xpath("//button[@title=" + xq(a.valor) + "]")));
                } catch (TimeoutException e) {
                    throw new AssertionError(
                        "botonNoEncontrado: ningún botón con title=\"" + a.valor + "\"");
                }
            }
            // Comprueba el contenido de la primera fila de una tabla, para
            // probar orden (no basta con "Literal", que solo prueba
            // presencia en cualquier parte de la página).
            case "PrimeraFila" -> {
                String texto = driver.findElement(By.cssSelector("tbody tr:first-child")).getText();
                if (!texto.contains(a.valor)) {
                    throw new AssertionError(
                        "primeraFilaInesperada: se esperaba \"" + a.valor + "\" y la fila es \"" + texto + "\"");
                }
            }
            // Comprueba que el <h1> (numero de albarán/factura recién creado)
            // cumple un formato, sin conocer el valor exacto — autogenerado.
            case "Patron" -> {
                String texto = driver.findElement(By.tagName("h1")).getText();
                if (!texto.matches(a.valor)) {
                    throw new AssertionError(
                        "formatoInesperado: \"" + texto + "\" no coincide con el patrón " + a.valor);
                }
            }
            default -> throw noDisponible(argumento);
        }
    }

    protected RuntimeException noDisponible(String argumento) {
        return new UnsupportedOperationException(
            "opcionNoDisponible: " + argumento + " no está implementado en " + getClass().getSimpleName());
    }
}
