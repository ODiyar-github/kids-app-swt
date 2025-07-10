package com.example.demo.MyFolder.services.api.feedbackService;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.services.couchdb.CouchDbStorage;
import com.example.demo.MyFolder.share.dataObjects.dtos.JsonData;
import com.example.demo.MyFolder.share.dataObjects.util.AppFeedback;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CreateFeedbackHandler implements MessageHandler {

    private final ObjectMapper objectMapper;
    private final CouchDbStorage couchdbStorage;
    private final SingleDataPacketHolder jsonDataHolder;

    @Autowired
    public CreateFeedbackHandler(ObjectMapper objectMapper, CouchDbStorage couchdbStorage,
            SingleDataPacketHolder jsonDataHolder) {
        this.objectMapper = objectMapper;
        this.couchdbStorage = couchdbStorage;
        this.jsonDataHolder = jsonDataHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        // Dies ist das Pattern, auf das der Handler reagiert
        return RabbitMqPattern.APP_CREATE_FEEDBACK;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: " + getPattern().name());
        try {
            // 1. AppFeedback-Daten aus der RabbitMQ-Nachricht deserialisieren
            AppFeedback newFeedback = objectMapper.convertValue(data, AppFeedback.class);

            // 2. Generiere eine eindeutige feedbackId und setze den Timestamp (falls noch
            // nicht vorhanden)
            if (newFeedback.getFeedbackId() == null || newFeedback.getFeedbackId().isEmpty()) {
                newFeedback.setFeedbackId(UUID.randomUUID().toString());
            }
            if (newFeedback.getTimestamp() == null || newFeedback.getTimestamp().isEmpty()) {
                newFeedback.setTimestamp(Instant.now().toString()); // ISO-8601 Format
            }

            // 3. Hole das aktuelle Hauptdokument (JsonData) aus dem SingleDataPacketHolder
            JsonData currentJsonData = jsonDataHolder.getData();

            if (currentJsonData == null) {
                System.err.println("❌ Fehler: Hauptdaten nicht initialisiert. Kann Feedback nicht hinzufügen.");
                throw new IllegalStateException("Anwendungsdaten im Holder sind null.");
            }

            // 4. Stelle sicher, dass die Liste für Feedbacks im JsonData-Objekt existiert
            List<AppFeedback> feedbackList = currentJsonData.getFeedBackAppData();
            if (feedbackList == null) {
                feedbackList = new ArrayList<>();
                currentJsonData.setFeedBackAppData(feedbackList);
            }

            // 5. Füge das neue Feedback zur Liste hinzu
            feedbackList.add(newFeedback);
            System.out.println("Neues Feedback hinzugefügt. Aktuelle Anzahl: " + feedbackList.size());

            // 6. Aktualisiere das gesamte JsonData-Dokument in CouchDB
            // Die `update`-Methode im CouchDbStorage aktualisiert die _rev im übergebenen
            // Objekt.
            this.couchdbStorage.update(currentJsonData);

            // 7. Aktualisiere den SingleDataPacketHolder mit dem neuesten Zustand
            jsonDataHolder.setJsonData(currentJsonData);

            System.out.println("✅ App-Feedback erfolgreich in CouchDB gespeichert. Neue Revision: "
                    + jsonDataHolder.getData().get_rev());

            // 8. Baue eine Erfolgsantwort für den BFF/Frontend
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Feedback erfolgreich erstellt und gespeichert.");
            response.put("feedbackId", newFeedback.getFeedbackId());
            response.put("documentId", currentJsonData.get_id());
            response.put("documentRev", jsonDataHolder.getData().get_rev());
            return response;

        } catch (Exception e) {
            System.err.println("❗ Fehler beim Erstellen/Speichern von App-Feedback: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", "Fehler beim Verarbeiten des Feedbacks: " + e.getMessage());
            return errorResponse;
        }
    }
}
