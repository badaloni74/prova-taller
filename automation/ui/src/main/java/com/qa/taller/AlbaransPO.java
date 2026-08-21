package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Listado de albaranes.
 *
 * No sobreescribe sePulsaEn: el CTA "Nuevo albarán" es un <button>, así que el
 * comportamiento por defecto de BasePO ya sirve. La primera versión asumió que
 * era un <a> y falló contra la aplicación real.
 *
 * pantalla() espera "Nuevo albarán", no "Albaranes": el nombre del módulo
 * también está en el menú lateral, presente en todas las pantallas, así que
 * esperarlo no comprobaría nada — pasaría antes de que la lista cargue.
 * Corregido al generar las pantallas de listado del resto de módulos: el
 * mismo defecto estaba aquí desde el principio.
 */
public class AlbaransPO extends BasePO {

    public AlbaransPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nuevo albarán");
    }
}
