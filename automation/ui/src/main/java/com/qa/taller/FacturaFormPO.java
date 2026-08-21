package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

/**
 * Alta de factura. A diferencia del resto de formularios, este NO usa
 * EntityForm: ni el <select> de cliente ni el <input> de IVA llevan id, así
 * que se localizan por etiqueta. Las casillas de albarán sí llevan id
 * (`albara-<id>`), pero es un id interno que el escenario no conoce; se
 * localizan por el texto de su <label> asociada (el número de albarán).
 */
public class FacturaFormPO extends BasePO {

    public FacturaFormPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Crea la factura");
    }

    @Override
    public void seRellena(String argumento, String valor) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Lista" -> {
                if ("Cliente".equals(a.valor)) {
                    seleccionarPorTextoParcial(porEtiqueta("Cliente", "select"), valor);
                    return;
                }
                throw noDisponible(argumento);
            }
            case "Campo" -> {
                if ("IVA".equals(a.valor)) {
                    escribir(porEtiqueta("IVA (%)", "input"), valor);
                    return;
                }
                throw noDisponible(argumento);
            }
            default -> throw noDisponible(argumento);
        }
    }

    /**
     * "Casilla: <número de albarán>" marca la casilla de ese albarán.
     * "Casilla: única" marca la única casilla presente, sin conocer su
     * número (autogenerado) — válido cuando el escenario acaba de crear el
     * único albarán pendiente de este cliente.
     * "Casilla: todas" marca todas las casillas presentes.
     */
    @Override
    public void sePulsaEn(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        if ("Casilla".equals(a.tipo)) {
            switch (a.valor) {
                case "única" -> wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//input[@type='checkbox']"))).click();
                case "todas" -> {
                    List<WebElement> casillas = driver.findElements(By.xpath("//input[@type='checkbox']"));
                    casillas.forEach(WebElement::click);
                }
                default -> casillaAlbaran(a.valor).click();
            }
            return;
        }
        super.sePulsaEn(argumento);
    }

    private WebElement casillaAlbaran(String numero) {
        String xp = "//label[normalize-space()=" + xq(numero) + "]/preceding-sibling::input[@type='checkbox']";
        return wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xp)));
    }
}
