package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.WebDriver;

/**
 * Alta y edición de vehículo. Sus campos llevan id: EntityForm renderiza
 * id={field.name} (clientId, marca, model, matricula, bastidor,
 * anyMatriculacio, quilometratge, color).
 */
public class VehicleFormPO extends BasePO {

    public VehicleFormPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        porId("marca");
    }

    @Override
    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Lista" -> {
                if ("Cliente".equals(a.valor)) {
                    seleccionarPorTextoParcial(porId("clientId"), valor);
                    return;
                }
                throw noDisponible(argumento);
            }
            case "Campo" -> {
                switch (a.valor) {
                    case "Marca" -> escribir(porId("marca"), valor);
                    case "Modelo" -> escribir(porId("model"), valor);
                    case "Matrícula" -> escribir(porId("matricula"), valor);
                    case "Bastidor" -> escribir(porId("bastidor"), valor);
                    case "Año" -> escribir(porId("anyMatriculacio"), valor);
                    case "Kilometraje" -> escribir(porId("quilometratge"), valor);
                    case "Color" -> escribir(porId("color"), valor);
                    default -> throw noDisponible(argumento);
                }
            }
            default -> throw noDisponible(argumento);
        }
    }
}
