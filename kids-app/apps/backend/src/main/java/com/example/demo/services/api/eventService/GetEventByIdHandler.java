package com.example.demo.services.api.eventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.share.dataObjects.dtos.EventDTO;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @file GetEventByIdHandler.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Abrufen eines einzelnen Events anhand seiner UUID anfordern. Er sucht das Event
 * in den im `SingleDataPacketHolder` gespeicherten Event-Daten.
 */

/**
 * @class GetEventByIdHandler
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Anfragen für Event-Daten nach UUID zu verarbeiten. Sie interagiert mit dem
 * `SingleDataPacketHolder`, um die global verfügbaren Event-Daten abzurufen.
 */
@Component
public class GetEventByIdHandler implements MessageHandler {

    /**
     * @private
     * @property {SingleDataPacketHolder} packetHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (einschließlich Event-Daten) speichert.
     */
    private final SingleDataPacketHolder packetHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `GetEventByIdHandler`.
     * Der `SingleDataPacketHolder` wird von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} packetHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired
    public GetEventByIdHandler(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.EVENTS_GET_BY_ID`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.EVENTS_GET_BY_ID;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht zum Abrufen eines Events anhand seiner UUID.
     * Extrahiert die Event-UUID aus den Daten, sucht das Event in den gespeicherten Daten
     * und gibt das gefundene `EventDTO` zurück.
     * @param {Map<String, Object>} data - Die Payload der Nachricht, die die Event-ID (`id`) enthält.
     * @returns {Object} Das gefundene `EventDTO`-Objekt, wenn es gefunden wird,
     * oder `null`, wenn das Event nicht gefunden wurde oder keine Events im Holder verfügbar sind.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        // Extrahiert die Event-UUID aus der Daten-Map.
        String eventUuid = (String) data.get("id");
        // Ruft die Liste der EventDTOs aus dem Datenpaket im Holder ab.
        List<EventDTO> eventModels = packetHolder.getData().getEventData();

        // Prüft, ob Event-Daten im Holder verfügbar sind.
        if (eventModels != null) {
            // Verwendet Java Streams, um das Event mit der passenden UUID zu finden.
            Optional<EventDTO> foundEvent = eventModels.stream()
                    .filter(event -> event.getUuid() != null && event.getUuid().equals(eventUuid))
                    .findFirst();

            // Prüft, ob ein Event gefunden wurde.
            if (foundEvent.isPresent()) {
                return foundEvent.get(); // Gibt das gefundene EventDTO zurück.
            } else {
                // Wenn das Event nicht gefunden wurde.
                System.out.println(String.format("⚠️ Event mit ID %s nicht im Holder gefunden.", eventUuid));
                return null; // Oder eine spezifische Fehlerantwort, falls dein BFF das erwartet.
            }
        }
        System.out.println("⚠️ Keine Events im Holder verfügbar.");
        return null; // Gibt null zurück, wenn keine Event-Daten im Holder sind.
    }
}
