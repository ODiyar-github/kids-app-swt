package com.example.demo.services.api.eventService;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.share.dataObjects.dtos.EventDTO;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;

/**
 * @file GetAllEventsHandler.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Abrufen aller Events anfordern. Er greift auf die im `SingleDataPacketHolder`
 * gespeicherten Event-Daten zu und gibt eine Liste von `EventDTO`s zurück.
 */

/**
 * @class GetAllEventsHandler
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Anfragen für alle Event-Daten zu verarbeiten. Sie interagiert mit dem
 * `SingleDataPacketHolder`, um die global verfügbaren Daten abzurufen.
 */
@Component
public class GetAllEventsHandler implements MessageHandler {

    /**
     * @private
     * @property {SingleDataPacketHolder} packetHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (einschließlich Event-Daten) speichert.
     */
    private final SingleDataPacketHolder packetHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `GetAllEventsHandler`.
     * Der `SingleDataPacketHolder` wird von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} packetHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired
    public GetAllEventsHandler(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.EVENTS_GET_ALL`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.EVENTS_GET_ALL;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht zum Abrufen aller Events.
     * Greift auf die Event-Daten im `SingleDataPacketHolder` zu und gibt sie als Liste zurück.
     * @param {Map<String, Object>} data - Die Payload der Nachricht (hier nicht verwendet, da alle Events abgerufen werden).
     * @returns {Object} Eine Liste von `EventDTO`-Objekten oder eine leere Liste, wenn keine Events verfügbar sind.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Alle Events abrufen (aus globalem Model-Cache)");
        // Ruft die Liste der EventDTOs aus dem Datenpaket im Holder ab.
        List<EventDTO> events = packetHolder.getData().getEventData();
        System.out.println("EVENTLISTE:" + events.size()); // Loggt die Anzahl der gefundenen Events.

        // Prüft, ob Events gefunden wurden und die Liste nicht leer ist.
        if (events != null && !events.isEmpty()) {
            return events; // Gibt die Liste der Events zurück.
        }
        System.out.println("⚠️ Keine Events im Holder gefunden.");
        return Collections.emptyList(); // Gib eine leere Liste zurück, wenn keine Events da sind.
    }
}
