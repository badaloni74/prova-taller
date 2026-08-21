package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Ficha de factura. "Marcar como pagada"/"Marcar como pendiente" son botones
 * normales: el default de BasePO ya sirve.
 *
 * pantalla() reutiliza "Volver al listado", común a todas las fichas de
 * detalle de este proyecto (ver ClientDetailPO).
 */
public class FacturaDetailPO extends BasePO {

    public FacturaDetailPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Volver al listado");
    }

    /** "Enlace: primerAlbaran" sigue el primer albarán listado en "Albaranes
     *  incluidos". No hace falta conocer su número (autogenerado): el
     *  escenario acaba de facturar un único albarán y este es el único
     *  enlace de esa sección. */
    @Override
    public void sePulsaEn(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if ("Enlace".equals(a.tipo) && "primerAlbaran".equals(a.valor)) {
            primerAlbaranIncluido().click();
            return;
        }
        super.sePulsaEn(argumento);
    }

    private WebElement primerAlbaranIncluido() {
        String xp = "//h2[normalize-space()='Albaranes incluidos']/following-sibling::ul//a";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }
}
