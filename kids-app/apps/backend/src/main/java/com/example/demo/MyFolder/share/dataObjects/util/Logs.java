package com.example.demo.MyFolder.share.dataObjects.util;

public class Logs {
    private String name;
    private String date;
    private String joinedEventId;
    private String message;

    public Logs() {
    }

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
