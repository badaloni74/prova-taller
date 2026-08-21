package com.qa.taller;

import com.qa.taller.Plantillas.BasePO;
import org.openqa.selenium.WebDriver;

/**
 * Ficha de cliente. "Editar"/"Eliminar" y el diálogo de confirmación
 * ("Cancelar"/"Eliminar") son botones normales: el default de BasePO ya
 * sirve, no hace falta sobreescribir sePulsaEn.
 *
 * "Volver al listado" es el marcador de "estoy en una ficha", común a todas
 * las pantallas de detalle e inexistente en los listados: evita colisionar
 * con cabeceras de columna que reaparecen en varias pantallas (p.ej. "NIF").
 */
public class ClientDetailPO extends BasePO {

    public ClientDetailPO(WebDriver driver) {
        super(driver);
    }

    @Override
    public void pantalla() {
        esperarLiteral("Volver al listado");
    }
}
