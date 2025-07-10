package com.example.demo.MyFolder.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator; // Wichtig: Import hinzufügen!
import com.fasterxml.jackson.annotation.JsonValue; // Wichtig: Import hinzufügen!

public enum RatingEnum {
    // Definieren der Enum-Konstanten mit den zugehörigen numerischen Werten
    VERY_BAD(1), // Java-Konvention: UPPER_SNAKE_CASE für Enum-Namen
    BAD(2),
    AVERAGE(3),
    GOOD(4),
    EXCELLENT(5);

    private final int value; // Feld, um den numerischen Wert zu speichern

    // Konstruktor, um den Wert zu initialisieren
    RatingEnum(int value) {
        this.value = value;
    }

    // @JsonValue: Wird von Jackson verwendet, um den Enum-Wert in eine Zahl zu
    // serialisieren.
    // Wenn du also ein RatingEnum.GOOD hast, wird es zu '4' serialisiert.
    @JsonValue
    public int getValue() {
        return value;
    }

    // @JsonCreator: Wird von Jackson verwendet, um eine eingehende Zahl
    // (z.B. '4') in den entsprechenden Enum-Wert zu deserialisieren.
    @JsonCreator
    public static RatingEnum fromValue(int value) {
        // Iteriere durch alle möglichen Enum-Werte
        for (RatingEnum rating : RatingEnum.values()) {
            // Vergleiche den eingehenden numerischen Wert mit dem Wert des Enums
            if (rating.value == value) {
                return rating; // Gib den passenden Enum-Wert zurück
            }
        }
        // Wenn kein passender Enum-Wert gefunden wurde, werfe eine Ausnahme
        throw new IllegalArgumentException("Unbekannter Rating-Wert: " + value);
    }
}
