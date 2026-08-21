package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Listado de clientes. No sobreescribe sePulsaEn/seRellena/seValida: "Nuevo
 * cliente" es un <button> (el default de BasePO ya sirve) y las filas se
 * abren con "Fila: <nombre>".
 *
 * pantalla() espera "Nuevo cliente", no "Clientes": el nombre del módulo
 * también está en el menú lateral, presente en todas las pantallas, así que
 * esperarlo no comprobaría nada — pasaría antes de que la lista cargue.
 */
public class ClientsPO extends BasePO {

    public ClientsPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Nuevo cliente");
    }
}
