package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Ficha de nómina. "Editar"/"Eliminar"/"Marcar como..." son botones
 * normales: el default de BasePO ya sirve.
 *
 * pantalla() reutiliza "Volver al listado", común a todas las fichas de
 * detalle de este proyecto (ver ClientDetailPO).
 */
public class NominaDetailPO extends BasePO {

    public NominaDetailPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Volver al listado");
    }
}
