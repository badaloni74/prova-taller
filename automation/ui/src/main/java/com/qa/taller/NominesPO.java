package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Listado de nóminas. Sin overrides: "Nueva nómina" es un <button> y las
 * filas se abren con "Fila: <texto>" (heredado de BasePO).
 */
public class NominesPO extends BasePO {

    public NominesPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nueva nómina");
    }
}
