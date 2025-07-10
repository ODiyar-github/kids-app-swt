package com.example.demo.MyFolder.share.util;

public enum RabbitMqPattern {

    EVENTS_GET_ALL("get-all", true),
    EVENTS_GET_BY_ID("get-by-id", true),
    EVENTS_GET_BY("get-by", true),

    SEND_MOCKUP("send-mockup", true),
    APP_GET_ALL_FEEDBACK("get-all-feedback", true),
    APP_CREATE_FEEDBACK("save-feedback", true),

    AUTH_LOGIN("login", true),
    AUTH_GET_USER_BY_ID("get-user-by-id", true),
    UPDATE_USER("update-user", true),
    GET_ALL_USER("get-all-user", true);

    private final String pattern;
    private final boolean expectsReply;

    RabbitMqPattern(String pattern, boolean expectsReply) {
        this.pattern = pattern;
        this.expectsReply = expectsReply;
    }

    public String getPattern() {
        return pattern;
    }

    public boolean expectsReply() {
        return expectsReply;
    }

    public static RabbitMqPattern fromString(String text) {
        for (RabbitMqPattern mp : RabbitMqPattern.values()) {
            if (mp.pattern.equalsIgnoreCase(text)) {
                System.out.println("Pattern gefunden: " + mp.pattern.toString());
                return mp;
            }
        }
        throw new IllegalArgumentException("Kein RabbitMqPattern mit dem String: " + text + " gefunden.");
    }
}