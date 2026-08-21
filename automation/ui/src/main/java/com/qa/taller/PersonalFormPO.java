package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.WebDriver;

/**
 * Alta y edición de empleado. Sus campos llevan id: EntityForm renderiza
 * id={field.name} (nom, telefon, email, dni, carrec, dataAlta, salariBase).
 */
public class PersonalFormPO extends BasePO {

    public PersonalFormPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        porId("nom");
    }

    @Override
    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if (!"Campo".equals(a.tipo)) throw noDisponible(argumento);
        switch (a.valor) {
            case "Nombre" -> escribir(porId("nom"), valor);
            case "Teléfono" -> escribir(porId("telefon"), valor);
            case "Email" -> escribir(porId("email"), valor);
            case "DNI" -> escribir(porId("dni"), valor);
            case "Cargo" -> escribir(porId("carrec"), valor);
            case "Fecha alta" -> escribir(porId("dataAlta"), valor);
            case "Salario base" -> escribir(porId("salariBase"), valor);
            default -> throw noDisponible(argumento);
        }
    }
}
