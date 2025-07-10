package com.example.demo.MyFolder.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator; // Wichtig: Import hinzufügen!
import com.fasterxml.jackson.annotation.JsonValue; // Wichtig: Import hinzufügen!

public enum AppFeedbackEnum {
    // Definieren der Enum-Konstanten mit den zugehörigen String-Labels
    BUG_REPORT("BUG_REPORT"),
    FEATURE_REQUEST("FEATURE_REQUEST"),
    GENERAL_FEEDBACK("GENERAL_FEEDBACK"),
    UI_UX_ISSUE("UI_UX_ISSUE"), // Achte hier auf den Unterstrich in Java!
    PERFORMANCE_ISSUE("PERFORMANCE_ISSUE"), // Achte hier auf den Unterstrich in Java!
    OTHER("OTHER");

    private final String label; // Feld, um das String-Label zu speichern

    // Konstruktor, um das Label zu initialisieren
    AppFeedbackEnum(String label) {
        this.label = label;
    }

    // @JsonValue: Wird von Jackson verwendet, um den Enum-Wert in einen JSON-String
    // zu serialisieren.
    // Wenn du also ein AppFeedbackEnum.BUG_REPORT hast, wird es zu "BUG_REPORT"
    // serialisiert.
    @JsonValue
    public String getLabel() {
        return label;
    }

    // @JsonCreator: Wird von Jackson verwendet, um einen eingehenden JSON-String
    // (z.B. "BUG_REPORT") in den entsprechenden Enum-Wert zu deserialisieren.
    // Die Methode fromLabel wird dabei aufgerufen.
    @JsonCreator
    public static AppFeedbackEnum fromLabel(String label) {
        // Iteriere durch alle möglichen Enum-Werte
        for (AppFeedbackEnum feedback : AppFeedbackEnum.values()) {
            // Vergleiche das eingehende Label (ignoriert Groß-/Kleinschreibung) mit dem
            // Label des Enums
            if (feedback.label.equalsIgnoreCase(label)) {
                return feedback; // Gib den passenden Enum-Wert zurück
            }
        }
        // Wenn kein passender Enum-Wert gefunden wurde, werfe eine Ausnahme
        throw new IllegalArgumentException("Unbekannter AppFeedback-Typ: " + label);
    }
}
