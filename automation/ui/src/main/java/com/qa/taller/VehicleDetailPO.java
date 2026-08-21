package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Ficha de vehículo. "Editar"/"Eliminar" y el diálogo de confirmación son
 * botones normales: el default de BasePO ya sirve.
 *
 * pantalla() reutiliza "Volver al listado", común a todas las fichas de
 * detalle de este proyecto (ver ClientDetailPO).
 */
public class VehicleDetailPO extends BasePO {

    public VehicleDetailPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Volver al listado");
    }
}
