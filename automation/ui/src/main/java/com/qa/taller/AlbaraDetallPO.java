package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Ficha de albarán, con su sección de líneas.
 *
 * NOTA DE LOCALIZADORES: el formulario de líneas (AlbaraLiniesSection.tsx) no
 * declara ningún id ni data-testid. Los localizadores van por proximidad de
 * etiqueta visible, que es el único anclaje estable disponible hoy. Si la
 * aplicación cambia los textos de interfaz, esta PO se rompe: está anotado
 * como riesgo conocido en DOC-23-INFORME.md.
 */
public class AlbaraDetallPO extends BasePO {

    public AlbaraDetallPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Líneas");
    }

    @Override
    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Lista" -> {
                switch (a.valor) {
                    case "Tipo" -> seleccionarPorTextoParcial(porEtiqueta("Tipo", "select"), valor);
                    case "Pieza" -> seleccionarPorTextoParcial(porEtiqueta("Pieza", "select"), valor);
                    default -> throw noDisponible(argumento);
                }
            }
            // "Cantidad"/"Horas" son el mismo <input>: la etiqueta cambia según
            // el tipo de línea elegido (AlbaraLiniesSection.tsx), así que basta
            // con localizar por el texto que esté vigente en ese momento.
            case "Campo" -> {
                switch (a.valor) {
                    case "Cantidad", "Horas" -> escribir(porEtiqueta(a.valor, "input"), valor);
                    case "Descripción" -> escribir(porEtiqueta("Descripción", "input"), valor);
                    case "Precio/hora" -> escribir(porEtiqueta("Precio/hora", "input"), valor);
                    default -> throw noDisponible(argumento);
                }
            }
            default -> throw noDisponible(argumento);
        }
    }

    /** "Linea: <texto>" pulsa el botón Eliminar de la fila de líneas que
     *  contiene ese texto (descripción de pieza o de mano de obra). Hace
     *  falta un tipo propio porque "Boton: Eliminar" es ambiguo aquí: cada
     *  línea tiene su propio botón "Eliminar", igual de literal. */
    @Override
    public void sePulsaEn(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if ("Linea".equals(a.tipo)) {
            botonEliminarLinea(a.valor).click();
            return;
        }
        super.sePulsaEn(argumento);
    }

    private WebElement botonEliminarLinea(String textoLinea) {
        String xp = "//table//tbody/tr[td[contains(normalize-space(text())," + xq(textoLinea)
            + ")]]//button[normalize-space()='Eliminar']";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }

    @Override
    public void seValida(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Lineas" -> {
                int esperadas = Integer.parseInt(a.valor);
                int reales = contarLineas();
                if (reales != esperadas) {
                    throw new AssertionError(
                        "lineasInesperadas: se esperaban " + esperadas + " y hay " + reales);
                }
            }
            case "Error" -> {
                if (!existeLiteral(a.valor)) {
                    throw new AssertionError(
                        "errorNoMostrado: se esperaba el aviso \"" + a.valor + "\" y no aparece");
                }
            }
            default -> super.seValida(argumento);
        }
    }

    /** Filas de la tabla de líneas, excluyendo la cabecera. */
    public int contarLineas() {
        return driver.findElements(By.xpath("//table//tbody/tr")).size();
    }
}
