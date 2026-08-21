package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Ficha de pieza. "Editar"/"Eliminar" y el diálogo de confirmación son
 * botones normales: el default de BasePO ya sirve.
 *
 * pantalla() reutiliza "Volver al listado", común a todas las fichas de
 * detalle de este proyecto (ver ClientDetailPO).
 */
public class PecaDetailPO extends BasePO {

    public PecaDetailPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Volver al listado");
    }
}
