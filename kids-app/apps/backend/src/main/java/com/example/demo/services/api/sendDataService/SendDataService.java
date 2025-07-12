package com.example.demo.services.api.sendDataService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.services.couchdb.CouchDbStorage;
import com.example.demo.share.dataObjects.dtos.JsonData;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @file SendDataService.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Senden von Mockup-Daten anfordern. Er verwaltet die Speicherung dieser Daten
 * in CouchDB und stellt sicher, dass nur ein Satz von Mockup-Daten persistent ist.
 * Die Daten werden auch im `SingleDataPacketHolder` für den In-Memory-Zugriff gehalten.
 */

/**
 * @class SendDataService
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Mockup-Daten zu empfangen und in CouchDB zu speichern.
 * Sie sorgt für die Konsistenz der Daten in der Datenbank, indem sie alte Mockup-Daten löscht,
 * bevor neue gespeichert werden, und hält eine Referenz auf die aktuellen Daten im
 * `SingleDataPacketHolder`.
 */
@Component
public class SendDataService implements MessageHandler {

    /**
     * @private
     * @property {ObjectMapper} objectMapper - Eine Instanz des Jackson `ObjectMapper` zum Konvertieren
     * von Daten zwischen Map- und DTO-Objekten.
     */
    private final ObjectMapper objectMapper;
    /**
     * @private
     * @property {CouchDbStorage} couchdbStorage - Eine Instanz des `CouchDbStorage` für die Interaktion
     * mit der CouchDB-Datenbank.
     */
    private final CouchDbStorage couchdbStorage;
    /**
     * @private
     * @property {SingleDataPacketHolder} jsonDataHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (JsonData) in-memory speichert.
     */
    private final SingleDataPacketHolder jsonDataHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `SendDataService`.
     * Die Abhängigkeiten (`ObjectMapper`, `CouchDbStorage`, `SingleDataPacketHolder`)
     * werden von Spring automatisch injiziert.
     * @param {ObjectMapper} objectMapper - Der injizierte `ObjectMapper`.
     * @param {CouchDbStorage} couchdbStorage - Der injizierte `CouchDbStorage`.
     * @param {SingleDataPacketHolder} jsonDataHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired // Optional, aber gute Praxis für Konstruktor-Injection
    public SendDataService(ObjectMapper objectMapper, CouchDbStorage couchdbStorage,
            SingleDataPacketHolder jsonDataHolder) {
        this.objectMapper = objectMapper; // Spring injiziert den konfigurierten ObjectMapper
        this.couchdbStorage = couchdbStorage;
        this.jsonDataHolder = jsonDataHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.SEND_MOCKUP`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.SEND_MOCKUP;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht, die Mockup-Daten enthält.
     * Deserialisiert die Daten, verwaltet die Speicherung in CouchDB (löscht alte, speichert neue)
     * und aktualisiert den `SingleDataPacketHolder`.
     * @param {Map<String, Object>} data - Die Payload der Nachricht, die das `JsonData`-Objekt enthält.
     * @returns {Object} Eine Map mit Statusinformationen (`"status"`, `"responseFrom"`, `"originalMessage"`)
     * bei Erfolg, oder `null` bei einem Fehler.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        try {
            // Konvertiert die eingehende Map (Payload) in ein JsonData-Objekt.
            JsonData incomingData = objectMapper.convertValue(data, JsonData.class);
            // Ruft alle vorhandenen Dokumente vom Typ JsonData aus CouchDB ab.
            List<JsonData> allDocs = this.couchdbStorage.findAll();
            String docId = null; // Variable für die ID des zu verwendenden Dokuments.
            JsonData jsonData; // Variable für das letztendlich im Holder zu speichernde JsonData.

            System.out.println("📄 Anzahl an Dokumenten in der DB: " + allDocs.size());

            // Logik zur Verwaltung der Dokumente in CouchDB:
            if (allDocs.size() > 1) {
                // Mehrere Dokumente vorhanden: Lösche alle bestehenden Dokumente.
                for (JsonData doc : allDocs) {
                    this.couchdbStorage.delete(doc);
                }
                // Speichere das neue eingehende Dokument. Setze _id und _rev auf null,
                // damit CouchDB neue generiert.
                incomingData.set_id(null);
                incomingData.set_rev(null);
                docId = this.couchdbStorage.save(incomingData);
                jsonData = incomingData; // Das neue Dokument ist das aktuelle.
            } else if (allDocs.size() == 1) {
                // Nur ein Dokument vorhanden: Verwende dieses vorhandene Dokument.
                jsonData = allDocs.get(0);
                docId = jsonData.get_id();
            } else {
                // Kein Dokument vorhanden: Speichere das neue eingehende Dokument.
                incomingData.set_id(null);
                incomingData.set_rev(null);
                docId = this.couchdbStorage.save(incomingData);
                jsonData = incomingData; // Das neue Dokument ist das aktuelle.
            }

            // Test: Abruf anhand ID zur Verifizierung der Speicherung.
            System.out.println("✅ Gefundene ID: " + jsonData.get_id() + ", " + jsonData.get_rev());
            System.out.println("➡ Dokument: " + this.couchdbStorage.find(docId));

            // Halte den aktuell verwendeten Datensatz im SingleDataPacketHolder.
            this.jsonDataHolder.setJsonData(jsonData);

            // Bereite die Antwortdaten vor.
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", "SUCCESS");
            responseData.put("responseFrom", "Spring Boot Backend");
            responseData.put("originalMessage", docId); // Die ID des gespeicherten Dokuments.
            return responseData; // Gibt die Antwort-Map zurück.

        } catch (Exception e) {
            // Fängt alle Ausnahmen ab, die während der Verarbeitung auftreten können.
            System.err.println("❗ Fehler beim Verarbeiten der Mockup-Daten: " + e.getMessage());
            e.printStackTrace(); // Gibt den Stacktrace für detailliertere Fehlerinformationen aus.
            return null; // Gibt null zurück bei einem Fehler.
        }
    }
}
