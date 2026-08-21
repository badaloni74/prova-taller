package com.qa.taller.Utils;

/**
 * Desglosa el formato "Tipo: Valor" que usan todos los argumentos de los
 * features. Es la pieza que permite que StepDef sea genérico: el step no sabe
 * si "Boton: Guardar" es un botón o un enlace, solo pasa la cadena entera.
 */
public class Argumentos {

    public static class Argumento {
        public final String tipo;
        public final String valor;

        Argumento(String tipo, String valor) {
            this.tipo = tipo;
            this.valor = valor;
        }
    }

    public static Argumento desglosar(String argumento) {
        int sep = argumento.indexOf(':');
        if (sep < 0) {
            throw new IllegalArgumentException(
                "argumentoMalFormado: se esperaba \"Tipo: Valor\" y llegó \"" + argumento + "\"");
        }
        return new Argumento(
            argumento.substring(0, sep).trim(),
            argumento.substring(sep + 1).trim());
    }
}
