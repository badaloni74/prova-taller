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

    protected void escribir(WebElement e, String valor) {
        e.clear();
        e.sendKeys(valor);
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

    public boolean existeLiteral(String texto) {
        return !driver.findElements(
            By.xpath("//*[contains(normalize-space(text())," + xq(texto) + ")]")).isEmpty();
    }

    protected void esperarLiteral(String texto) {
        wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//*[contains(normalize-space(text())," + xq(texto) + ")]")));
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
            default -> throw noDisponible(argumento);
        }
    }

    public void seRellena(String argumento, String valor) {
        throw noDisponible(argumento);
    }

    public void seValida(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Literal" -> {
                if (!existeLiteral(a.valor)) {
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
            default -> throw noDisponible(argumento);
        }
    }

    protected RuntimeException noDisponible(String argumento) {
        return new UnsupportedOperationException(
            "opcionNoDisponible: " + argumento + " no está implementado en " + getClass().getSimpleName());
    }
}
