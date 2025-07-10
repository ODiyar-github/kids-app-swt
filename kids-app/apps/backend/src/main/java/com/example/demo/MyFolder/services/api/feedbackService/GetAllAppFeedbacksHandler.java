package com.example.demo.MyFolder.services.api.feedbackService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.dataObjects.dtos.JsonData;
import com.example.demo.MyFolder.share.dataObjects.util.AppFeedback;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;

@Component
public class GetAllAppFeedbacksHandler implements MessageHandler {
    private final SingleDataPacketHolder jsonDataHolder;

    @Autowired
    public GetAllAppFeedbacksHandler(SingleDataPacketHolder jsonDataHolder) {
        this.jsonDataHolder = jsonDataHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        // Annahme: Du fügst ein neues RabbitMqPattern für das Abrufen aller Feedbacks
        // hinzu
        return RabbitMqPattern.APP_GET_ALL_FEEDBACK; // <-- Neu in RabbitMqPattern.java definieren
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: " + getPattern().name());
        try {
            // 1. Hole das aktuelle Hauptdokument (JsonData) aus dem SingleDataPacketHolder
            JsonData currentJsonData = jsonDataHolder.getData();

            if (currentJsonData == null) {
                System.err.println("❌ Fehler: Hauptdaten nicht initialisiert. Kann keine Feedbacks abrufen.");
                throw new IllegalStateException("Anwendungsdaten im Holder sind null.");
            }

            // 2. Extrahiere die Liste der AppFeedbacks
            List<AppFeedback> feedbackList = currentJsonData.getFeedBackAppData();

            // 3. Gib eine leere Liste zurück, wenn keine Feedbacks vorhanden sind, sonst
            // die Liste
            if (feedbackList == null) {
                feedbackList = new ArrayList<>();
            }
            System.out.println("✅ Alle App-Feedbacks erfolgreich abgerufen. Anzahl: " + feedbackList.size());

            // 4. Gib die Liste der Feedbacks zurück. ObjectMapper im BFF wird es zu JSON
            // konvertieren.
            return feedbackList;

        } catch (Exception e) {
            System.err.println("❗ Fehler beim Abrufen aller App-Feedbacks: " + e.getMessage());
            e.printStackTrace();
            // Im Fehlerfall eine leere Liste oder eine Fehlermeldung zurückgeben
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", "Fehler beim Abrufen der Feedbacks: " + e.getMessage());
            return errorResponse;
        }
    }
}
