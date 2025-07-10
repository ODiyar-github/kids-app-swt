package com.example.demo.MyFolder.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum GenderEnum {
    FEMALE("female"), // Speichere den erwarteten String-Wert hier
    MALE("male"), // Speichere den erwarteten String-Wert hier
    DIVERSE("diverse"); // Speichere den erwarteten String-Wert hier

    private final String label; // Feld für den String-Wert

    GenderEnum(String label) {
        this.label = label;
    }

    // Diese Methode wird von Jackson verwendet, um den Enum-Wert zu serialisieren
    // Das heißt, wenn du ein GenderEnum.FEMALE hast, wird es zu "female"
    // serialisiert
    @JsonValue
    public String getLabel() {
        return label;
    }

    // Diese Methode wird von Jackson verwendet, um einen String in den Enum-Wert zu
    // deserialisieren
    // Sie sucht nach dem passenden Enum-Wert, unabhängig von Groß-/Kleinschreibung
    @JsonCreator
    public static GenderEnum fromLabel(String label) {
        for (GenderEnum gender : GenderEnum.values()) {
            if (gender.label.equalsIgnoreCase(label)) { // Ignoriere Groß-/Kleinschreibung beim Vergleich
                return gender;
            }
        }
        // Optional: Du könntest hier auch null zurückgeben oder eine andere Exception
        // werfen,
        // je nachdem, wie du ungültige Werte behandeln möchtest.
        throw new IllegalArgumentException("Unbekanntes Geschlecht: " + label);
    }
}