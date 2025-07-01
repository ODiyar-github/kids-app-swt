package com.example.demo.MyFolder.share.dataObjects.enums;

import com.fasterxml.jackson.annotation.JsonCreator; // Wichtig: Import hinzufügen!
import com.fasterxml.jackson.annotation.JsonValue; // Wichtig: Import hinzufügen!

public enum InterestEnum {
    // Definieren der Enum-Konstanten mit den zugehörigen String-Labels
    MUSIC("Music"),
    SPORTS("Sports"),
    READING("Reading"),
    WRITING("Writing"),
    TRAVELING("Traveling"),
    COOKING("Cooking"),
    BAKING("Baking"),
    GARDENING("Gardening"),
    GAMING("Gaming"),
    HIKING("Hiking"),
    BIKING("Biking"),
    PHOTOGRAPHY("Photography"),
    PAINTING("Painting"),
    DRAWING("Drawing"),
    DANCING("Dancing"),
    YOGA("Yoga"),
    MEDITATION("Meditation"),
    FITNESS("Fitness"),
    FASHION("Fashion"),
    TECHNOLOGY("Technology"),
    PROGRAMMING("Programming"),
    SCIENCE("Science"),
    HISTORY("History"),
    PHILOSOPHY("Philosophy"),
    MOVIES("Movies"),
    TV_SHOWS("TVShows"), // Hier musst du in Java einen Unterstrich verwenden
    THEATER("Theater"),
    ANIMALS("Animals"),
    NATURE("Nature"),
    CARS("Cars"),
    DIY("DIY"),
    CRAFTS("Crafts"),
    LANGUAGES("Languages"),
    POLITICS("Politics"),
    VOLUNTEERING("Volunteering"),
    ASTRONOMY("Astronomy"),
    INVESTING("Investing"),
    BOARD_GAMES("BoardGames"), // Hier musst du in Java einen Unterstrich verwenden
    PUZZLES("Puzzles"),
    FISHING("Fishing"),
    SKIING("Skiing"),
    SURFING("Surfing"),
    SKATEBOARDING("Skateboarding"),
    CLIMBING("Climbing"),
    MARTIAL_ARTS("MartialArts"), // Hier musst du in Java einen Unterstrich verwenden
    EDUCATION("Education"),
    FAMILY("Family"),
    // Besonderheit: Dein Frontend sendet "Kunst", der Enum-Name in Java ist aber
    // ART
    ART("Kunst");

    private final String label; // Feld, um das String-Label zu speichern

    // Konstruktor, um das Label zu initialisieren
    InterestEnum(String label) {
        this.label = label;
    }

    // @JsonValue: Wird von Jackson verwendet, um den Enum-Wert in einen JSON-String
    // zu serialisieren.
    // Wenn du also ein InterestEnum.MUSIC hast, wird es zu "Music" serialisiert.
    @JsonValue
    public String getLabel() {
        return label;
    }

    // @JsonCreator: Wird von Jackson verwendet, um einen eingehenden JSON-String
    // (z.B. "Music") in den entsprechenden Enum-Wert zu deserialisieren.
    @JsonCreator
    public static InterestEnum fromLabel(String label) {
        for (InterestEnum interest : InterestEnum.values()) {
            // Vergleiche das eingehende Label (ignoriert Groß-/Kleinschreibung) mit dem
            // Label des Enums
            if (interest.label.equalsIgnoreCase(label)) {
                return interest; // Gib den passenden Enum-Wert zurück
            }
        }
        // Wenn kein passender Enum-Wert gefunden wurde, werfe eine Ausnahme
        throw new IllegalArgumentException("Unbekanntes Interesse: " + label);
    }
}
