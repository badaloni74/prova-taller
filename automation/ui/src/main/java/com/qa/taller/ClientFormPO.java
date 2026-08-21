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

    /** "CampoNombre: <valor>" comprueba el valor tecleado en el campo
     *  Nombre, aún sin guardar. "Literal:" no sirve aquí: el valor de un
     *  <input> no es un nodo de texto, así que una búsqueda por texto nunca
     *  lo encuentra, esté o no. Hace falta para TC-105 (cambiar idioma sin
     *  perder el trabajo en curso): el valor sobrevive de verdad al cambio
     *  de idioma, y sin este método no hay forma de comprobarlo. */
    @Override
    public void seValida(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if ("CampoNombre".equals(a.tipo)) {
            String actual = porId("nom").getAttribute("value");
            if (!a.valor.equals(actual)) {
                throw new AssertionError(
                    "valorInesperado: campo Nombre es \"" + actual + "\", se esperaba \"" + a.valor + "\"");
            }
            return;
        }
        super.seValida(argumento);
    }
}
