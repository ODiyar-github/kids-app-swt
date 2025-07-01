package com.example.demo.MyFolder.share.dataObjects.util;

import java.time.Instant;

public class Logs {
    private String name;
    // TypeScript Date wird oft als String im ISO-Format gesendet.
    // Instant ist gut für die genaue Zeit, String für einfaches Mapping.
    // Wenn es ein ISO-8601 String ist, kann Jackson ihn direkt in Instant oder Date
    // parsen.
    // Oder, wenn es ein Millisekunden-Timestamp ist, kann Jackson auch damit
    // umgehen.
    // Hier verwenden wir Instant als gute Praxis für Datum/Uhrzeit.
    private String date;
    private String joinedEventId;
    private String message;

    public Logs() {
    } // Standardkonstruktor

    public Logs(String name, String date, String joinedEventId, String message) {
        this.name = name;
        this.date = date;
        this.joinedEventId = joinedEventId;
        this.message = message;
    }

    // Getter und Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getJoinedEventId() {
        return joinedEventId;
    }

    public void setJoinedEventId(String joinedEventId) {
        this.joinedEventId = joinedEventId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
