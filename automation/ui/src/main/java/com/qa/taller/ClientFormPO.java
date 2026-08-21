package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.WebDriver;

/**
 * Alta y edición de cliente. Sus campos llevan id: EntityForm renderiza
 * id={field.name} (nom, nif, telefon, email, adreca, notes).
 */
public class ClientFormPO extends BasePO {

    public ClientFormPO(WebDriver driver) {
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
            case "NIF" -> escribir(porId("nif"), valor);
            case "Teléfono" -> escribir(porId("telefon"), valor);
            case "Email" -> escribir(porId("email"), valor);
            case "Dirección" -> escribir(porId("adreca"), valor);
            case "Notas" -> escribir(porId("notes"), valor);
            default -> throw noDisponible(argumento);
        }
    }
}
