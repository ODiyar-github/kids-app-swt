package com.example.demo.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @file RatingEnum.java
 * @description Diese Enumeration definiert verschiedene Bewertungsstufen mit zugehörigen numerischen Werten.
 * Sie ist so konzipiert, dass sie nahtlos mit JSON-Serialisierung und -Deserialisierung über Jackson funktioniert.
 */

/**
 * @enum RatingEnum
 * @description Definiert die möglichen Bewertungsstufen für ein Rating,
 * wobei jeder Enum-Konstante ein spezifischer numerischer Wert zugewiesen ist.
 * Dies ermöglicht eine einfache Konvertierung zwischen Enum-Typen und Integer-Werten,
 * insbesondere für die Kommunikation mit externen Systemen (z.B. JSON-APIs).
 */
public enum RatingEnum {
    /**
     * @member VERY_BAD - Repräsentiert eine sehr schlechte Bewertung mit dem Wert 1.
     */
    VERY_BAD(1),
    /**
     * @member BAD - Repräsentiert eine schlechte Bewertung mit dem Wert 2.
     */
    BAD(2),
    /**
     * @member AVERAGE - Repräsentiert eine durchschnittliche Bewertung mit dem Wert 3.
     */
    AVERAGE(3),
    /**
     * @member GOOD - Repräsentiert eine gute Bewertung mit dem Wert 4.
     */
    GOOD(4),
    /**
     * @member EXCELLENT - Repräsentiert eine ausgezeichnete Bewertung mit dem Wert 5.
     */
    EXCELLENT(5);

    /**
     * @private
     * @property {int} value - Das Feld, das den numerischen Wert speichert, der jeder Enum-Konstante zugewiesen ist.
     */
    private final int value;

    /**
     * @constructor
     * @description Konstruktor zum Initialisieren der Enum-Konstanten mit einem numerischen Wert.
     * @param {int} value - Der numerische Wert, der dieser Enum-Konstante zugewiesen werden soll.
     */
    RatingEnum(int value) {
        this.value = value;
    }

    /**
     * @method getValue
     * @description Gibt den numerischen Wert der Enum-Konstante zurück.
     * Die `@JsonValue`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn das Enum-Objekt in einen JSON-String serialisiert wird.
     * Wenn also ein `RatingEnum.GOOD` serialisiert wird, wird es als `4` ausgegeben.
     * @returns {int} Der numerische Wert der Bewertung.
     */
    @JsonValue
    public int getValue() {
        return value;
    }

    /**
     * @static
     * @method fromValue
     * @description Eine statische Fabrikmethode, die einen `RatingEnum`-Wert
     * aus einem gegebenen numerischen Wert erstellt.
     * Die `@JsonCreator`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn ein numerischer Wert aus JSON in ein `RatingEnum`-Objekt deserialisiert wird.
     * Wenn Jackson beispielsweise den Wert `4` liest, ruft es diese Methode auf,
     * um `RatingEnum.GOOD` zurückzugeben.
     * @param {int} value - Der numerische Wert, der in einen `RatingEnum` umgewandelt werden soll.
     * @returns {RatingEnum} Der entsprechende `RatingEnum`-Wert.
     * @throws {IllegalArgumentException} Wenn kein passender `RatingEnum`-Wert für den gegebenen numerischen Wert gefunden wird.
     */
    @JsonCreator
    public static RatingEnum fromValue(int value) {
        // Iteriert durch alle definierten Enum-Werte von RatingEnum.
        for (RatingEnum rating : RatingEnum.values()) {
            // Vergleicht den numerischen Wert der aktuellen Enum-Konstante mit dem Eingabewert.
            if (rating.value == value) {
                return rating; // Gibt die passende Enum-Konstante zurück.
            }
        }
        // Wenn nach dem Durchlaufen aller Konstanten keine Übereinstimmung gefunden wurde,
        // wird eine Ausnahme geworfen.
        throw new IllegalArgumentException("Unbekannter Rating-Wert: " + value);
    }
}
