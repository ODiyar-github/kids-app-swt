package com.example.demo.MyFolder.services.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;

@Component
public class TestService implements MessageHandler {
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.BACKEND_TEST; // Dieses Pattern erwartet eine Antwort (true in Enum)
    }

    @Override
    public Object handle(Map<String, Object> data) {
        String messageFromBFF = (String) data.get("message");
        System.out.println("✔️ TestBackendTestHandler: Nachricht erhalten: " + messageFromBFF);

        // Hier deine Business-Logik.
        // Da dieses Pattern eine Antwort erwartet (expectsReply = true),
        // geben wir hier ein Ergebnis zurück.
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("status", "SUCCESS");
        responseData.put("responseFrom", "Spring Boot Backend");
        responseData.put("originalMessage", messageFromBFF);
        return responseData; // Dies wird vom RabbitMqController zurückgesendet
    }
}
