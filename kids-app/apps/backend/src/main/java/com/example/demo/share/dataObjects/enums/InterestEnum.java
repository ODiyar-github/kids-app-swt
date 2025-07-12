package com.example.demo.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @file InterestEnum.java
 * @description Diese Enumeration definiert verschiedene Interessenkategorien mit zugehörigen String-Labels.
 * Sie ist so konzipiert, dass sie nahtlos mit JSON-Serialisierung und -Deserialisierung über Jackson funktioniert.
 */

/**
 * @enum InterestEnum
 * @description Definiert die möglichen Interessenkategorien, die einem Benutzer oder Event zugewiesen werden können.
 * Jede Enum-Konstante hat ein spezifisches String-Label, das für die Darstellung und Kommunikation verwendet wird.
 */
public enum InterestEnum {
    /**
     * @member MUSIC - Repräsentiert das Interesse an Musik.
     */
    MUSIC("Music"),
    /**
     * @member SPORTS - Repräsentiert das Interesse an Sport.
     */
    SPORTS("Sports"),
    /**
     * @member READING - Repräsentiert das Interesse am Lesen.
     */
    READING("Reading"),
    /**
     * @member WRITING - Repräsentiert das Interesse am Schreiben.
     */
    WRITING("Writing"),
    /**
     * @member TRAVELING - Repräsentiert das Interesse am Reisen.
     */
    TRAVELING("Traveling"),
    /**
     * @member COOKING - Repräsentiert das Interesse am Kochen.
     */
    COOKING("Cooking"),
    /**
     * @member BAKING - Repräsentiert das Interesse am Backen.
     */
    BAKING("Baking"),
    /**
     * @member GARDENING - Repräsentiert das Interesse am Gärtnern.
     */
    GARDENING("Gardening"),
    /**
     * @member GAMING - Repräsentiert das Interesse am Gaming.
     */
    GAMING("Gaming"),
    /**
     * @member HIKING - Repräsentiert das Interesse am Wandern.
     */
    HIKING("Hiking"),
    /**
     * @member BIKING - Repräsentiert das Interesse am Radfahren.
     */
    BIKING("Biking"),
    /**
     * @member PHOTOGRAPHY - Repräsentiert das Interesse an Fotografie.
     */
    PHOTOGRAPHY("Photography"),
    /**
     * @member PAINTING - Repräsentiert das Interesse am Malen.
     */
    PAINTING("Painting"),
    /**
     * @member DRAWING - Repräsentiert das Interesse am Zeichnen.
     */
    DRAWING("Drawing"),
    /**
     * @member DANCING - Repräsentiert das Interesse am Tanzen.
     */
    DANCING("Dancing"),
    /**
     * @member YOGA - Repräsentiert das Interesse an Yoga.
     */
    YOGA("Yoga"),
    /**
     * @member MEDITATION - Repräsentiert das Interesse an Meditation.
     */
    MEDITATION("Meditation"),
    /**
     * @member FITNESS - Repräsentiert das Interesse an Fitness.
     */
    FITNESS("Fitness"),
    /**
     * @member FASHION - Repräsentiert das Interesse an Mode.
     */
    FASHION("Fashion"),
    /**
     * @member TECHNOLOGY - Repräsentiert das Interesse an Technologie.
     */
    TECHNOLOGY("Technology"),
    /**
     * @member PROGRAMMING - Repräsentiert das Interesse am Programmieren.
     */
    PROGRAMMING("Programming"),
    /**
     * @member SCIENCE - Repräsentiert das Interesse an Wissenschaft.
     */
    SCIENCE("Science"),
    /**
     * @member HISTORY - Repräsentiert das Interesse an Geschichte.
     */
    HISTORY("History"),
    /**
     * @member PHILOSOPHY - Repräsentiert das Interesse an Philosophie.
     */
    PHILOSOPHY("Philosophy"),
    /**
     * @member MOVIES - Repräsentiert das Interesse an Filmen.
     */
    MOVIES("Movies"),
    /**
     * @member TV_SHOWS - Repräsentiert das Interesse an Fernsehsendungen.
     */
    TV_SHOWS("TVShows"),
    /**
     * @member THEATER - Repräsentiert das Interesse an Theater.
     */
    THEATER("Theater"),
    /**
     * @member ANIMALS - Repräsentiert das Interesse an Tieren.
     */
    ANIMALS("Animals"),
    /**
     * @member NATURE - Repräsentiert das Interesse an Natur.
     */
    NATURE("Nature"),
    /**
     * @member CARS - Repräsentiert das Interesse an Autos.
     */
    CARS("Cars"),
    /**
     * @member DIY - Repräsentiert das Interesse an Heimwerken (Do It Yourself).
     */
    DIY("DIY"),
    /**
     * @member CRAFTS - Repräsentiert das Interesse an Handwerk.
     */
    CRAFTS("Crafts"),
    /**
     * @member LANGUAGES - Repräsentiert das Interesse an Sprachen.
     */
    LANGUAGES("Languages"),
    /**
     * @member POLITICS - Repräsentiert das Interesse an Politik.
     */
    POLITICS("Politics"),
    /**
     * @member VOLUNTEERING - Repräsentiert das Interesse an Freiwilligenarbeit.
     */
    VOLUNTEERING("Volunteering"),
    /**
     * @member ASTRONOMY - Repräsentiert das Interesse an Astronomie.
     */
    ASTRONOMY("Astronomy"),
    /**
     * @member INVESTING - Repräsentiert das Interesse am Investieren.
     */
    INVESTING("Investing"),
    /**
     * @member BOARD_GAMES - Repräsentiert das Interesse an Brettspielen.
     */
    BOARD_GAMES("BoardGames"),
    /**
     * @member PUZZLES - Repräsentiert das Interesse an Puzzles.
     */
    PUZZLES("Puzzles"),
    /**
     * @member FISHING - Repräsentiert das Interesse am Angeln.
     */
    FISHING("Fishing"),
    /**
     * @member SKIING - Repräsentiert das Interesse am Skifahren.
     */
    SKIING("Skiing"),
    /**
     * @member SURFING - Repräsentiert das Interesse am Surfen.
     */
    SURFING("Surfing"),
    /**
     * @member SKATEBOARDING - Repräsentiert das Interesse am Skateboarden.
     */
    SKATEBOARDING("Skateboarding"),
    /**
     * @member CLIMBING - Repräsentiert das Interesse am Klettern.
     */
    CLIMBING("Climbing"),
    /**
     * @member MARTIAL_ARTS - Repräsentiert das Interesse an Kampfkünsten.
     */
    MARTIAL_ARTS("MartialArts"),
    /**
     * @member EDUCATION - Repräsentiert das Interesse an Bildung.
     */
    EDUCATION("Education"),
    /**
     * @member FAMILY - Repräsentiert das Interesse an Familie.
     */
    FAMILY("Family"),
    /**
     * @member ART - Repräsentiert das Interesse an Kunst.
     */
    ART("Art");

    /**
     * @private
     * @property {String} label - Das Feld, das das String-Label speichert, das jeder Enum-Konstante zugewiesen ist.
     */
    private final String label;

    /**
     * @constructor
     * @description Konstruktor zum Initialisieren der Enum-Konstanten mit einem String-Label.
     * @param {String} label - Das String-Label, das dieser Enum-Konstante zugewiesen werden soll.
     */
    InterestEnum(String label) {
        this.label = label;
    }

    /**
     * @method getLabel
     * @description Gibt das String-Label der Enum-Konstante zurück.
     * Die `@JsonValue`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn das Enum-Objekt in einen JSON-String serialisiert wird.
     * Wenn also ein `InterestEnum.MUSIC` serialisiert wird, wird es als `"Music"` ausgegeben.
     * @returns {String} Das String-Label des Interesses.
     */
    @JsonValue
    public String getLabel() {
        return label;
    }

    /**
     * @static
     * @method fromLabel
     * @description Eine statische Fabrikmethode, die einen `InterestEnum`-Wert
     * aus einem gegebenen String-Label erstellt.
     * Die `@JsonCreator`-Annotation weist Jackson an, diese Methode zu verwenden,
     * wenn ein String-Wert aus JSON in ein `InterestEnum`-Objekt deserialisiert wird.
     * Wenn Jackson beispielsweise den Wert `"Music"` liest, ruft es diese Methode auf,
     * um `InterestEnum.MUSIC` zurückzugeben. Die Suche ist case-insensitive.
     * @param {String} label - Das String-Label, das in einen `InterestEnum` umgewandelt werden soll.
     * @returns {InterestEnum} Der entsprechende `InterestEnum`-Wert.
     * @throws {IllegalArgumentException} Wenn kein passender `InterestEnum`-Wert für das gegebene Label gefunden wird.
     */
    @JsonCreator
    public static InterestEnum fromLabel(String label) {
        // Iteriert durch alle definierten Enum-Werte von InterestEnum.
        for (InterestEnum interest : InterestEnum.values()) {
            // Vergleicht das eingehende Label (ignoriert Groß-/Kleinschreibung) mit dem Label der aktuellen Enum-Konstante.
            if (interest.label.equalsIgnoreCase(label)) {
                return interest; // Gibt die passende Enum-Konstante zurück.
            }
        }
        // Wenn nach dem Durchlaufen aller Konstanten keine Übereinstimmung gefunden wurde,
        // wird eine Ausnahme geworfen.
        throw new IllegalArgumentException("Unbekanntes Interesse: " + label);
    }
}
