package com.example.demo.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @file AppFeedbackEnum.java
 * @description Diese Enumeration definiert verschiedene Kategorien für Anwendungs-Feedback mit zugehörigen String-Labels.
 * Sie ist so konzipiert, dass sie nahtlos mit JSON-Serialisierung und -Deserialisierung über Jackson funktioniert.
 */

/**
 * @enum AppFeedbackEnum
 * @description Definiert die möglichen Typen von Feedback, die Benutzer zur Anwendung geben können.
 * Jede Enum-Konstante hat ein spezifisches String-Label, das für die Darstellung und Kommunikation verwendet wird.
 */
public enum AppFeedbackEnum {
    /**
     * @member BUG_REPORT - Repräsentiert einen Fehlerbericht.
     */
    BUG_REPORT("BUG_REPORT"),
    /**
     * @member FEATURE_REQUEST - Repräsentiert einen Wunsch nach einer neuen Funktion.
     */
    FEATURE_REQUEST("FEATURE_REQUEST"),
    /**
     * @member GENERAL_FEEDBACK - Repräsentiert allgemeines Feedback zur Anwendung.
     */
    GENERAL_FEEDBACK("GENERAL_FEEDBACK"),
    /**
     * @member UI_UX_ISSUE - Repräsentiert ein Problem mit der Benutzeroberfläche oder Benutzererfahrung.
     */
    UI_UX_ISSUE("UI_UX_ISSUE"),
    /**
     * @member PERFORMANCE_ISSUE - Repräsentiert ein Problem mit der Anwendungsleistung.
     */
    PERFORMANCE_ISSUE("PERFORMANCE_ISSUE"),
    /**
     * @member OTHER - Repräsentiert sonstige Feedback-Typen, die in keine andere Kategorie fallen.
     */
    OTHER("OTHER");

    /**
     * @private
     * @property {String} label - Das Feld, das das String-Label speichert, das jeder Enum-Konstante zugewiesen ist.
     */
    private final String label; // Feld, um das String-Label zu speichern

    /**
     * @constructor
     * @description Konstruktor zum Initialisieren der Enum-Konstanten mit einem String-Label.
     * @param {String} label - Das String-Label, das dieser Enum-Konstante zugewiesen werden soll.
     */
    AppFeedbackEnum(String label) {
        this.label = label;
    }

    /**
     * @method getLabel
     * @description Gibt das String-Label der Enum-Konstante zurück.
     * Die `@JsonValue`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn das Enum-Objekt in einen JSON-String serialisiert wird.
     * Wenn also ein `AppFeedbackEnum.BUG_REPORT` serialisiert wird, wird es zu `"BUG_REPORT"` ausgegeben.
     * @returns {String} Das String-Label des Feedback-Typs.
     */
    @JsonValue
    public String getLabel() {
        return label;
    }

    /**
     * @static
     * @method fromLabel
     * @description Eine statische Fabrikmethode, die einen `AppFeedbackEnum`-Wert
     * aus einem gegebenen String-Label erstellt.
     * Die `@JsonCreator`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn ein String-Wert aus JSON in ein `AppFeedbackEnum`-Objekt deserialisiert wird.
     * Die Methode sucht nach dem passenden Enum-Wert, unabhängig von Groß-/Kleinschreibung.
     * @param {String} label - Der String-Label, der in einen `AppFeedbackEnum` umgewandelt werden soll.
     * @returns {AppFeedbackEnum} Der entsprechende `AppFeedbackEnum`-Wert.
     * @throws {IllegalArgumentException} Wenn kein passender `AppFeedbackEnum`-Wert für das gegebene Label gefunden wird.
     */
    @JsonCreator
    public static AppFeedbackEnum fromLabel(String label) {
        // Iteriere durch alle möglichen Enum-Werte
        for (AppFeedbackEnum feedback : AppFeedbackEnum.values()) {
            // Vergleiche das eingehende Label (ignoriert Groß-/Kleinschreibung) mit dem Label des Enums
            if (feedback.label.equalsIgnoreCase(label)) {
                return feedback; // Gib den passenden Enum-Wert zurück
            }
        }
        // Wenn kein passender Enum-Wert gefunden wurde, werfe eine Ausnahme
        throw new IllegalArgumentException("Unbekannter AppFeedback-Typ: " + label);
    }
}
