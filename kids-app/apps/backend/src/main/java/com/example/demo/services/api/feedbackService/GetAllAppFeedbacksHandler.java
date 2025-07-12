package com.example.demo.services.api.feedbackService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.share.dataObjects.dtos.JsonData;
import com.example.demo.share.dataObjects.util.AppFeedback;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;

/**
 * @file GetAllAppFeedbacksHandler.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Abrufen aller Anwendungs-Feedback-Einträge anfordern. Er greift auf die im
 * `SingleDataPacketHolder` gespeicherten Daten zu und gibt eine Liste von `AppFeedback`-Objekten zurück.
 */

/**
 * @class GetAllAppFeedbacksHandler
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Anfragen für alle Anwendungs-Feedback-Daten zu verarbeiten. Sie interagiert mit dem
 * `SingleDataPacketHolder`, um die global verfügbaren Daten abzurufen.
 */
@Component
public class GetAllAppFeedbacksHandler implements MessageHandler {
    /**
     * @private
     * @property {SingleDataPacketHolder} jsonDataHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (`JsonData`) in-memory speichert.
     */
    private final SingleDataPacketHolder jsonDataHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `GetAllAppFeedbacksHandler`.
     * Der `SingleDataPacketHolder` wird von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} jsonDataHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired
    public GetAllAppFeedbacksHandler(SingleDataPacketHolder jsonDataHolder) {
        this.jsonDataHolder = jsonDataHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.APP_GET_ALL_FEEDBACK`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        // Annahme: Du fügst ein neues RabbitMqPattern für das Abrufen aller Feedbacks
        // hinzu
        return RabbitMqPattern.APP_GET_ALL_FEEDBACK; // <-- Neu in RabbitMqPattern.java definieren
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht zum Abrufen aller App-Feedbacks.
     * Greift auf die App-Feedback-Daten im `SingleDataPacketHolder` zu und gibt sie als Liste zurück.
     * @param {Map<String, Object>} data - Die Payload der Nachricht (hier nicht verwendet, da alle Feedbacks abgerufen werden).
     * @returns {Object} Eine Liste von `AppFeedback`-Objekten oder eine leere Liste, wenn keine Daten verfügbar sind.
     * Im Fehlerfall wird eine Map mit Fehlerinformationen zurückgegeben.
     */
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
