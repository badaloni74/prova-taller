package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Listado de facturas. Sin overrides: "Nueva factura" es un <button> y las
 * filas se abren con "Fila: <número>" (heredado de BasePO).
 */
public class FacturesPO extends BasePO {

    public FacturesPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nueva factura");
    }
}
