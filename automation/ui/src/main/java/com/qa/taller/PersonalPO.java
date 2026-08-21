package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Listado de personal. Sin overrides: "Nuevo empleado" es un <button> y las
 * filas se abren con "Fila: <nombre>" (heredado de BasePO).
 */
public class PersonalPO extends BasePO {

    public PersonalPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nuevo empleado");
    }
}
