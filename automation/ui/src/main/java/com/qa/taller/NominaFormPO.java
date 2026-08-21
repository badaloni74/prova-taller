package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.WebDriver;

/**
 * Alta y edición de nómina. Sus campos llevan id: EntityForm renderiza
 * id={field.name} (personalId, mes, anyNomina, salariBrut, deduccions).
 */
public class NominaFormPO extends BasePO {

    public NominaFormPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        porId("mes");
    }

    @Override
    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Lista" -> {
                if ("Empleado".equals(a.valor)) {
                    seleccionarPorTextoParcial(porId("personalId"), valor);
                    return;
                }
                throw noDisponible(argumento);
            }
            case "Campo" -> {
                switch (a.valor) {
                    case "Mes" -> escribir(porId("mes"), valor);
                    case "Año" -> escribir(porId("anyNomina"), valor);
                    case "Salario bruto" -> escribir(porId("salariBrut"), valor);
                    case "Deducciones" -> escribir(porId("deduccions"), valor);
                    default -> throw noDisponible(argumento);
                }
            }
            default -> throw noDisponible(argumento);
        }
    }
}
