package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.WebDriver;

/**
 * Formulario de alta y edición de albarán.
 * Sus campos sí llevan id: EntityForm renderiza id={field.name}.
 */
public class AlbaraFormPO extends BasePO {

    public AlbaraFormPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        porId("vehicleId");
    }

    @Override
    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Lista" -> {
                if ("Vehículo".equals(a.valor)) {
                    seleccionarPorTextoParcial(porId("vehicleId"), valor);
                    return;
                }
                throw noDisponible(argumento);
            }
            case "Campo" -> {
                if ("Notas".equals(a.valor)) {
                    escribir(porId("notes"), valor);
                    return;
                }
                throw noDisponible(argumento);
            }
            default -> throw noDisponible(argumento);
        }
    }
}
