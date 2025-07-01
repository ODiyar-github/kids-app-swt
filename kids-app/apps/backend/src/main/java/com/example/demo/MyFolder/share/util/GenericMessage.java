package com.example.demo.MyFolder.share.util;

import java.util.Map;

public class GenericMessage {
    private String pattern;
    private Map<String, Object> data;

    // --- Standardkonstruktor für JSON-Deserialisierung (wichtig!) ---
    public GenericMessage() {
        // Dieser Konstruktor ist notwendig für Bibliotheken wie Jackson,
        // die JSON in Objekte umwandeln.
    }

    // --- Getter-Methoden ---
    public String getPattern() {
        return pattern;
    }

    public Map<String, Object> getData() {
        return data;
    }

    // --- Setter-Methoden (optional, aber oft nützlich, wenn du das Objekt auch selbst befüllen willst) ---
    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "GenericMessage{" +
               "pattern='" + pattern + '\'' +
               ", data=" + data +
               '}';
    }
}
