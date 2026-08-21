package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * Catálogo de piezas. Se usa para comprobar el stock antes y después.
 *
 * pantalla() espera "Nueva pieza", no "Piezas": el nombre del módulo también
 * está en el menú lateral, presente en todas las pantallas, así que
 * esperarlo no comprobaría nada — pasaría antes de que la lista cargue.
 * Corregido al generar las pantallas de listado del resto de módulos: el
 * mismo defecto estaba aquí desde el principio.
 */
public class PecesPO extends BasePO {

    public PecesPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nueva pieza");
    }

    @Override
    public void seValida(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if ("Stock".equals(a.tipo)) {
            // formato del valor: "<nombre de pieza>=<stock esperado>"
            String[] partes = a.valor.split("=", 2);
            String pieza = partes[0].trim();
            int esperado = Integer.parseInt(partes[1].trim());
            int real = stockDe(pieza);
            if (real != esperado) {
                throw new AssertionError(
                    "stockInesperado: " + pieza + " tiene " + real + " y se esperaba " + esperado);
            }
            return;
        }
        super.seValida(argumento);
    }

    /** Lee el stock de la fila cuyo nombre coincide. */
    public int stockDe(String nombrePieza) {
        String xp = "//tbody/tr[td[normalize-space()=" + xq(nombrePieza) + "]]/td[last()]";
        WebElement celda = wait.until(
            org.openqa.selenium.support.ui.ExpectedConditions
                .presenceOfElementLocated(By.xpath(xp)));
        return Integer.parseInt(celda.getText().trim());
    }
}
