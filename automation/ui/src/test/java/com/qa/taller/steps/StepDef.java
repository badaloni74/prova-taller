package com.qa.taller.steps;

import com.qa.taller.*;
import com.qa.taller.Plantillas.BasePO;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.es.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Steps genéricos. No contiene ni un solo localizador: todo se delega en
 * pantallaActual. El único switch permitido es el que decide qué PO instanciar.
 */
public class StepDef {

    private static final String BASE_URL =
        System.getProperty("app.url", "http://localhost:5173");

    private WebDriver driver;
    private BasePO pantallaActual;
    private String numeroGuardado;

    @Before
    public void abrirNavegador() {
        ChromeOptions opts = new ChromeOptions();
        opts.addArguments("--headless=new", "--window-size=1400,1000",
                          "--no-sandbox", "--disable-dev-shm-usage");
        driver = new ChromeDriver(opts);
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(300));
    }

    @After
    public void cerrarNavegador() {
        if (driver != null) driver.quit();
    }

    @Dado("el navegador abierto, el usuario accede a la aplicacion")
    public void accedeALaAplicacion() {
        driver.get(BASE_URL);
    }

    @Cuando("se muestra la pantalla {string}")
    public void seMuestraLaPantalla(String nombre) {
        pantallaActual = switch (nombre) {
            case "Albaranes"      -> new AlbaransPO(driver);
            case "AlbaranForm"    -> new AlbaraFormPO(driver);
            case "AlbaranDetalle" -> new AlbaraDetallPO(driver);
            case "Piezas"         -> new PecesPO(driver);
            case "PiezaForm"      -> new PecaFormPO(driver);
            case "PiezaDetalle"   -> new PecaDetailPO(driver);
            case "Clientes"       -> new ClientsPO(driver);
            case "ClienteForm"    -> new ClientFormPO(driver);
            case "ClienteDetalle" -> new ClientDetailPO(driver);
            case "Vehiculos"        -> new VehiclesPO(driver);
            case "VehiculoForm"     -> new VehicleFormPO(driver);
            case "VehiculoDetalle"  -> new VehicleDetailPO(driver);
            case "Facturas"       -> new FacturesPO(driver);
            case "FacturaForm"    -> new FacturaFormPO(driver);
            case "FacturaDetalle" -> new FacturaDetailPO(driver);
            case "Personal"         -> new PersonalPO(driver);
            case "PersonalForm"     -> new PersonalFormPO(driver);
            case "PersonalDetalle"  -> new PersonalDetailPO(driver);
            case "Nomines"       -> new NominesPO(driver);
            case "NominaForm"    -> new NominaFormPO(driver);
            case "NominaDetalle" -> new NominaDetailPO(driver);
            case "Configuracio"  -> new ConfiguracioPO(driver);
            default -> throw new IllegalArgumentException(
                "pantallaDesconocida: \"" + nombre + "\" no está en el switch de StepDef");
        };
        pantallaActual.pantalla();
    }

    @Cuando("se navega a {string}")
    public void seNavegaA(String ruta) {
        driver.get(BASE_URL + ruta);
    }

    /** Vuelve a la página anterior del historial del navegador. Hace falta
     *  cuando el escenario necesita regresar a un registro recién creado
     *  cuyo id es autogenerado (no se puede volver a localizar por número
     *  en un listado paginado): la entrada de historial ya apunta a él, así
     *  que no hace falta buscarlo por la lista. */
    @Cuando("se vuelve atrás en el navegador")
    public void seVuelveAtras() {
        driver.navigate().back();
    }

    /** Guarda el número visible (el <h1> de un albarán o factura recién
     *  creado) para compararlo más tarde. Hace falta para comprobar que un
     *  correlativo sube en uno sin conocer de antemano ninguno de los dos
     *  valores — ambos son autogenerados. */
    @Cuando("se guarda el número de esta pantalla")
    public void seGuardaNumero() {
        numeroGuardado = driver.findElement(By.tagName("h1")).getText();
    }

    /** Compara el <h1> actual con el guardado: misma serie (año/prefijo) y
     *  correlativo exactamente uno mayor. */
    @Entonces("el número de esta pantalla es uno más que el guardado")
    public void seValidaIncremento() {
        String actual = driver.findElement(By.tagName("h1")).getText();
        Pattern p = Pattern.compile("^(.*-)(\\d+)$");
        Matcher mAnterior = p.matcher(numeroGuardado);
        Matcher mActual = p.matcher(actual);
        if (!mAnterior.matches() || !mActual.matches()) {
            throw new AssertionError(
                "formatoInesperado: \"" + numeroGuardado + "\" o \"" + actual + "\" no tienen forma <prefijo>-<nnnn>");
        }
        if (!mAnterior.group(1).equals(mActual.group(1))) {
            throw new AssertionError(
                "seriesDistintas: \"" + numeroGuardado + "\" y \"" + actual + "\" no comparten prefijo");
        }
        int anterior = Integer.parseInt(mAnterior.group(2));
        int nuevo = Integer.parseInt(mActual.group(2));
        if (nuevo != anterior + 1) {
            throw new AssertionError(
                "correlativoInesperado: " + numeroGuardado + " -> " + actual + " no incrementa en uno");
        }
    }

    @Cuando("se pulsa en {string}")
    public void sePulsaEn(String argumento) {
        pantallaActual.sePulsaEn(argumento);
    }

    @Cuando("se rellena {string} con {string}")
    public void seRellena(String argumento, String valor) {
        pantallaActual.seRellena(argumento, valor);
    }

    @Entonces("se valida {string}")
    public void seValida(String argumento) {
        pantallaActual.seValida(argumento);
    }
}
