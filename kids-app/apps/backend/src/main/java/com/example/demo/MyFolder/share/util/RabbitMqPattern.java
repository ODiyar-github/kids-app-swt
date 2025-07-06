package com.example.demo.MyFolder.share.util;

public enum RabbitMqPattern {

    EVENTS_GET_ALL("get-all", true),
    EVENTS_GET_BY_ID("get-by-id", true),
    EVENTS_GET_BY("get-by", true),

    SEND_MOCKUP("send-mockup", true),

    AUTH_LOGIN("login", true),
    AUTH_GET_USER_BY_ID("get-user-by-id", true);

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
            System.out.println(mp.pattern.toString());
            if (mp.pattern.equalsIgnoreCase(text)) {
                System.out.println(mp.pattern.toString());
                return mp;
            }
        }
        throw new IllegalArgumentException("Kein RabbitMqPattern mit dem String: " + text + " gefunden.");
    }
}