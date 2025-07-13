package com.example.demo.services.api.eventService;

import com.example.demo.services.couchdb.CouchDbStorage;
import com.example.demo.share.dataObjects.dtos.EventDTO;
import com.example.demo.share.dataObjects.dtos.JsonData;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @file UpdateEventHandler.java
 * @brief RabbitMQ Message Handler für die Aktualisierung von Event-Daten.
 *
 * Diese Klasse implementiert das {@link MessageHandler}-Interface und ist dafür zuständig,
 * RabbitMQ-Nachrichten vom Typ {@link RabbitMqPattern#PUT_EVENT} zu verarbeiten.
 * Sie empfängt ein {@link EventDTO}-Objekt mit aktualisierten Informationen (z.B. neuem Feedback),
 * sucht das entsprechende Event in den zentral verwalteten Anwendungsdaten ({@link JsonData}),
 * aktualisiert dieses Event im Speicher und speichert die Änderungen persistent in CouchDB.
 *
 * @see MessageHandler
 * @see RabbitMqPattern
 * @see EventDTO
 * @see JsonData
 * @see CouchDbStorage
 * @see SingleDataPacketHolder
 */
@Component
public class UpdateEventHandler implements MessageHandler {
    private final ObjectMapper objectMapper;
    private final CouchDbStorage couchdbStorage;
    private final SingleDataPacketHolder jsonDataHolder;

    /**
     * Konstruktor zur Initialisierung des UpdateEventHandler mit notwendigen Abhängigkeiten.
     * Spring injiziert diese Abhängigkeiten automatisch.
     *
     * @param objectMapper Zum Deserialisieren von JSON-Daten in Java-Objekte.
     * @param couchdbStorage Zur Interaktion mit der CouchDB-Datenbank für Speicherung und Abruf.
     * @param jsonDataHolder Zum Zugriff auf die zentral im Speicher gehaltenen Anwendungsdaten ({@link JsonData}).
     */
    public UpdateEventHandler(ObjectMapper objectMapper, CouchDbStorage couchdbStorage,
            SingleDataPacketHolder jsonDataHolder) {
        this.objectMapper = objectMapper;
        this.couchdbStorage = couchdbStorage;
        this.jsonDataHolder = jsonDataHolder;
    }

    /**
     * Gibt das RabbitMQ-Nachrichtenmuster zurück, für das dieser Handler zuständig ist.
     *
     * @return Das {@link RabbitMqPattern#PUT_EVENT} Muster, das eine Event-Aktualisierung signalisiert.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.PUT_EVENT; // Muss mit dem BFF Pattern übereinstimmen
    }

    /**
     * Verarbeitet die eingehende RabbitMQ-Nachricht zur Aktualisierung eines Events.
     * <p>
     * Diese Methode deserialisiert die Daten in ein {@link EventDTO}-Objekt, sucht das zu aktualisierende Event
     * in der Liste der Events im {@link JsonData}-Objekt des {@link SingleDataPacketHolder},
     * ersetzt das alte Event durch das aktualisierte und speichert die gesamten {@link JsonData}
     * zurück in CouchDB.
     * </p>
     *
     * @param data Eine Map, die die deserialisierten JSON-Daten des {@link EventDTO} enthält.
     * @return Das aktualisierte {@link EventDTO}-Objekt bei Erfolg oder eine Fehlermeldung als Map im Fehlerfall.
     * @throws IllegalStateException Wenn die Anwendungsdaten im Holder oder die Event-Liste null ist.
     * @throws IllegalArgumentException Wenn das Event mit der angegebenen UUID nicht gefunden wird.
     * @throws Exception Fängt generische Ausnahmen während der Verarbeitung ab.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: UPDATE_EVENT");
        try {
            // Deserialisiere das gesamte EventDTO vom BFF
            EventDTO updatedEvent = objectMapper.convertValue(data, EventDTO.class);

            // Hol das Hauptdokument (JsonData)
            JsonData currentJsonData = jsonDataHolder.getData();
            if (currentJsonData == null) {
                throw new IllegalStateException("Anwendungsdaten im Holder sind null. Kann Event nicht aktualisieren.");
            }

            // Finde das Event in der Liste der Events in JsonData
            List<EventDTO> eventList = currentJsonData.getEventData();
            if (eventList == null) {
                throw new IllegalStateException("Event-Liste im JsonData ist null.");
            }

            Optional<EventDTO> existingEventOpt = eventList.stream()
                    .filter(e -> e.getUuid().equals(updatedEvent.getUuid()))
                    .findFirst();

            if (!existingEventOpt.isPresent()) {
                throw new IllegalArgumentException("Event mit UUID " + updatedEvent.getUuid() + " nicht gefunden.");
            }

            EventDTO existingEvent = existingEventOpt.get();

            // Annahme: Das BFF schickt das *vollständige* EventDTO mit dem neuen Feedback.
            // Ersetze das alte EventDTO mit dem neuen im Hauptdokument.
            // Du könntest auch nur das Feedback mergen, aber ein vollständiges Update ist
            // einfacher.
            eventList.remove(existingEvent); // Altes Event entfernen
            eventList.add(updatedEvent); // Neues Event (mit Feedback) hinzufügen

            currentJsonData.setEventData(eventList);

            // Speichere das aktualisierte JsonData-Dokument in CouchDB
            currentJsonData = couchdbStorage.update(currentJsonData);
            jsonDataHolder.setJsonData(currentJsonData); // Holder aktualisieren

            // Optional: Gib das aktualisierte EventDTO zurück
            return updatedEvent;
        } catch (Exception e) {
            System.err.println("❗ Fehler beim Aktualisieren des Events mit Feedback: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", "Fehler beim Verarbeiten des Event-Updates: " + e.getMessage());
            return errorResponse;
        }
    }
}
