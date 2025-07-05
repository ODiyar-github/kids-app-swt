package com.example.demo.MyFolder.share.util;

public enum RabbitMqPattern {

    EVENTS_GET_ALL("get-all", true), // Fire-and-Forget? Dann false.
    EVENTS_GET_BY_ID("get-by-id", true), // Fire-and-Forget? Dann false.

    // Korrekte Definition für dein Mockup-Pattern:
    SEND_MOCKUP("send-mockup", true), // Sollte KEINE Antwort erwarten (Fire-and-Forget)

    AUTH_LOGIN("login", true),
    AUTH_GET_USER_BY_ID("get-user-by-id", true),

    // Korrekte Definition für dein Backend-Test Pattern:
    BACKEND_TEST("get-backend-test", true); // Sollte EINE Antwort erwarten (Request-Response)

    private final String pattern;
    private final boolean expectsReply; // Neue Eigenschaft

    RabbitMqPattern(String pattern, boolean expectsReply) {
        this.pattern = pattern;
        this.expectsReply = expectsReply;
    }

    public String getPattern() {
        return pattern;
    }

    public boolean expectsReply() { // Getter für die neue Eigenschaft
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