package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Listado de vehículos. Sin overrides de acciones: "Nuevo vehículo" es un
 * <button> y las filas se abren con "Fila: <matrícula>" (heredado de BasePO).
 *
 * pantalla() espera "Nuevo vehículo", no "Vehículos": el nombre del módulo
 * también está en el menú lateral, presente en todas las pantallas.
 */
public class VehiclesPO extends BasePO {

    public VehiclesPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nuevo vehículo");
    }
}
