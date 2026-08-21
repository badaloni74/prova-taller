package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.WebDriver;

/**
 * Alta y edición de pieza. Sus campos llevan id: EntityForm renderiza
 * id={field.name} (nom, referencia, preu, cost, unitat, proveidor, estoc).
 */
public class PecaFormPO extends BasePO {

    public PecaFormPO(WebDriver driver) {
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
            case "Referencia" -> escribir(porId("referencia"), valor);
            case "Precio" -> escribir(porId("preu"), valor);
            case "Coste" -> escribir(porId("cost"), valor);
            case "Unidad" -> escribir(porId("unitat"), valor);
            case "Proveedor" -> escribir(porId("proveidor"), valor);
            case "Stock" -> escribir(porId("estoc"), valor);
            default -> throw noDisponible(argumento);
        }
    }
}
