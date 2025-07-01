package com.example.demo.MyFolder.config;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.time.Instant;
import java.time.format.DateTimeFormatter; // Für ISO 8601 Format
import java.time.format.DateTimeParseException; // Für Fehlerbehandlung

public class GsonInstantAdapter extends TypeAdapter<Instant> {

    // Verwende einen Standard-Formatter für ISO 8601 Strings
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_INSTANT;

    @Override
    public void write(JsonWriter out, Instant value) throws IOException {
        if (value == null) {
            out.nullValue();
        } else {
            // Instant in ISO 8601 String schreiben
            out.value(FORMATTER.format(value));
        }
    }

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
