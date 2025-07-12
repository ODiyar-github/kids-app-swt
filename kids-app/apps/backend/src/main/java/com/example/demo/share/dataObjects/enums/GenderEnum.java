package com.example.demo.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @file GenderEnum.java
 * @description Diese Enumeration definiert die möglichen Geschlechterkategorien mit zugehörigen String-Labels.
 * Sie ist so konzipiert, dass sie nahtlos mit JSON-Serialisierung und -Deserialisierung über Jackson funktioniert.
 */

/**
 * @enum GenderEnum
 * @description Definiert die möglichen Geschlechterkategorien, die einem Benutzer zugewiesen werden können.
 * Jede Enum-Konstante hat ein spezifisches String-Label, das für die Darstellung und Kommunikation verwendet wird.
 */
public enum GenderEnum {
    /**
     * @member FEMALE - Repräsentiert das weibliche Geschlecht mit dem Label "female".
     */
    FEMALE("female"), // Speichere den erwarteten String-Wert hier
    /**
     * @member MALE - Repräsentiert das männliche Geschlecht mit dem Label "male".
     */
    MALE("male"), // Speichere den erwarteten String-Wert hier
    /**
     * @member DIVERSE - Repräsentiert ein diverses Geschlecht mit dem Label "diverse".
     */
    DIVERSE("diverse"); // Speichere den erwarteten String-Wert hier

    /**
     * @private
     * @property {String} label - Das Feld, das das String-Label speichert, das jeder Enum-Konstante zugewiesen ist.
     */
    private final String label; // Feld für den String-Wert

    /**
     * @constructor
     * @description Konstruktor zum Initialisieren der Enum-Konstanten mit einem String-Label.
     * @param {String} label - Das String-Label, das dieser Enum-Konstante zugewiesen werden soll.
     */
    GenderEnum(String label) {
        this.label = label;
    }

    /**
     * @method getLabel
     * @description Gibt das String-Label der Enum-Konstante zurück.
     * Die `@JsonValue`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn das Enum-Objekt in einen JSON-String serialisiert wird.
     * Das heißt, wenn du ein `GenderEnum.FEMALE` hast, wird es zu `"female"` serialisiert.
     * @returns {String} Das String-Label des Geschlechts.
     */
    @JsonValue
    public String getLabel() {
        return label;
    }

    /**
     * @static
     * @method fromLabel
     * @description Eine statische Fabrikmethode, die einen `GenderEnum`-Wert
     * aus einem gegebenen String-Label erstellt.
     * Die `@JsonCreator`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn ein String-Wert aus JSON in ein `GenderEnum`-Objekt deserialisiert wird.
     * Sie sucht nach dem passenden Enum-Wert, unabhängig von Groß-/Kleinschreibung.
     * @param {String} label - Der String-Label, der in einen `GenderEnum` umgewandelt werden soll.
     * @returns {GenderEnum} Der entsprechende `GenderEnum`-Wert.
     * @throws {IllegalArgumentException} Wenn kein passender `GenderEnum`-Wert für das gegebene Label gefunden wird.
     */
    @JsonCreator
    public static GenderEnum fromLabel(String label) {
        for (GenderEnum gender : GenderEnum.values()) {
            if (gender.label.equalsIgnoreCase(label)) { // Ignoriere Groß-/Kleinschreibung beim Vergleich
                return gender;
            }
        }
        // Wenn kein passender Enum-Wert gefunden wurde, werfe eine Ausnahme.
        throw new IllegalArgumentException("Unbekanntes Geschlecht: " + label);
    }
}
