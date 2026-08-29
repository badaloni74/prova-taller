package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import com.qa.taller.Utils.Argumentos;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.ArrayList;
import java.util.List;

/**
 * Formulario de alta y edición de albarán.
 * Sus campos sí llevan id: EntityForm renderiza id={field.name}.
 *
 * Rama de edición (SPE-06): el <select id="vehicleId"> ya no lista todos los
 * vehículos, solo los del cliente del albarán (vehiclesService.listByClient).
 * Sus opciones llegan por fetch asíncrono, así que toda comprobación sobre
 * ellas espera a que estén cargadas antes de mirar.
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

    /**
     * Validaciones sobre el selector de vehículo:
     *   "Opcion: <texto>"      — el selector ofrece una opción que contiene ese texto.
     *   "Sin opcion: <texto>"  — el selector NO ofrece ninguna opción con ese texto
     *                            (una vez cargadas: si no, la ausencia sería trivial).
     *   "Seleccionado: <texto>" — la opción seleccionada actualmente contiene ese texto
     *                            (sirve para comprobar que el selector no queda vacío).
     */
    @Override
    public void seValida(String argumento) {
        Argumentos.Argumento a = Argumentos.desglosar(argumento);
        switch (a.tipo) {
            case "Opcion" -> {
                try {
                    wait.until(d -> opcionesVehiculo().stream().anyMatch(o -> o.contains(a.valor)));
                } catch (TimeoutException e) {
                    throw new AssertionError(
                        "opcionNoOfrecida: el selector de vehículo no ofrece \"" + a.valor
                            + "\"; opciones=" + opcionesVehiculo());
                }
            }
            case "Sin opcion" -> {
                // Espera a que haya opciones reales cargadas antes de comprobar la ausencia.
                try {
                    wait.until(d -> !opcionesVehiculo().isEmpty());
                } catch (TimeoutException e) {
                    throw new AssertionError(
                        "selectorSinOpciones: el selector de vehículo no cargó ninguna opción");
                }
                if (opcionesVehiculo().stream().anyMatch(o -> o.contains(a.valor))) {
                    throw new AssertionError(
                        "opcionNoDeberiaOfrecerse: el selector ofrece \"" + a.valor
                            + "\" y no debería; opciones=" + opcionesVehiculo());
                }
            }
            case "Seleccionado" -> {
                try {
                    wait.until(d -> {
                        WebElement sel = porId("vehicleId");
                        String texto = new Select(sel).getFirstSelectedOption().getText();
                        return texto != null && texto.contains(a.valor);
                    });
                } catch (TimeoutException e) {
                    throw new AssertionError(
                        "seleccionInesperada: el selector de vehículo no tiene seleccionado \""
                            + a.valor + "\"");
                }
            }
            default -> super.seValida(argumento);
        }
    }

    /** Textos de las opciones reales del selector de vehículo, excluyendo el
     *  placeholder (la <option value=""> que EntityForm antepone siempre). */
    private List<String> opcionesVehiculo() {
        List<String> textos = new ArrayList<>();
        for (WebElement o : new Select(porId("vehicleId")).getOptions()) {
            String value = o.getAttribute("value");
            if (value != null && !value.isEmpty()) {
                textos.add(o.getText());
            }
        }
        return textos;
    }
}
