package com.example.demo.config;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.time.Instant;
import java.time.format.DateTimeFormatter; // Für ISO 8601 Format
import java.time.format.DateTimeParseException; // Für Fehlerbehandlung

/**
 * @file GsonInstantAdapter.java
 * @description Dieser `TypeAdapter` für Gson ermöglicht die korrekte Serialisierung und Deserialisierung
 * von `java.time.Instant`-Objekten in und aus JSON-Strings im ISO 8601-Format.
 * Dies ist wichtig, um Datums- und Zeitinformationen konsistent zwischen Java-Anwendungen
 * und JSON-basierten Systemen auszutauschen.
 */

/**
 * @class GsonInstantAdapter
 * @description Ein benutzerdefinierter Gson `TypeAdapter` für die `Instant`-Klasse.
 * Er konvertiert `Instant`-Objekte in ISO 8601-formatierte Strings für die JSON-Serialisierung
 * und umgekehrt für die Deserialisierung.
 */
public class GsonInstantAdapter extends TypeAdapter<Instant> {

    /**
     * @private
     * @static
     * @property {DateTimeFormatter} FORMATTER - Ein `DateTimeFormatter`, der für das ISO 8601-Format konfiguriert ist.
     * Wird für die Konvertierung von `Instant` zu String und umgekehrt verwendet.
     */
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_INSTANT;

    /**
     * @method write
     * @description Serialisiert ein `Instant`-Objekt in einen JSON-String.
     * Wenn der Wert `null` ist, wird ein JSON `null` geschrieben. Andernfalls wird der `Instant`
     * in einen ISO 8601-formatierten String konvertiert und geschrieben.
     * @param {JsonWriter} out - Der `JsonWriter`, in den geschrieben werden soll.
     * @param {Instant} value - Das zu serialisierende `Instant`-Objekt.
     * @throws {IOException} Wenn ein E/A-Fehler auftritt.
     */
    @Override
    public void write(JsonWriter out, Instant value) throws IOException {
        if (value == null) {
            out.nullValue();
        } else {
            // Instant in ISO 8601 String schreiben
            out.value(FORMATTER.format(value));
        }
    }

    /**
     * @method read
     * @description Deserialisiert einen JSON-String in ein `Instant`-Objekt.
     * Wenn der eingehende JSON-Token `NULL` ist, wird `null` zurückgegeben.
     * Andernfalls wird der String gelesen und versucht, ihn in ein `Instant` zu parsen.
     * Bei einem Fehler während des Parsens wird eine `IOException` geworfen.
     * @param {JsonReader} in - Der `JsonReader`, aus dem gelesen werden soll.
     * @returns {Instant} Das deserialisierte `Instant`-Objekt oder `null`.
     * @throws {IOException} Wenn ein E/A-Fehler auftritt oder der String nicht als `Instant` geparst werden kann.
     */
    @Override
    public Instant read(JsonReader in) throws IOException {
        // Lies den String und parse ihn zu einem Instant
        if (in.peek() == com.google.gson.stream.JsonToken.NULL) {
            in.nextNull();
            return null;
        }
        String instantString = in.nextString();
        try {
            return Instant.parse(instantString);
        } catch (DateTimeParseException e) {
            // Optional: Logge den Fehler oder wirf eine spezifischere Exception
            throw new IOException("Fehler beim Parsen von Instant: " + instantString, e);
        }
    }
}
