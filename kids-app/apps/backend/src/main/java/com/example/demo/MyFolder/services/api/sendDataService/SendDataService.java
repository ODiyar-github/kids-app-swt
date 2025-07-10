package com.example.demo.MyFolder.services.api.sendDataService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.services.couchdb.CouchDbStorage;
import com.example.demo.MyFolder.share.dataObjects.dtos.JsonData;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class SendDataService implements MessageHandler {

    private final ObjectMapper objectMapper; // Füge ein Feld für ObjectMapper hinzu
    private final CouchDbStorage couchdbStorage;
    private final SingleDataPacketHolder jsonDataHolder;

    // Nutze den Konstruktor für Dependency Injection
    @Autowired // Optional, aber gute Praxis für Konstruktor-Injection
    public SendDataService(ObjectMapper objectMapper, CouchDbStorage couchdbStorage,
            SingleDataPacketHolder jsonDataHolder) {
        this.objectMapper = objectMapper; // Spring injiziert den konfigurierten ObjectMapper
        this.couchdbStorage = couchdbStorage;
        this.jsonDataHolder = jsonDataHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.SEND_MOCKUP;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        try {
            JsonData incomingData = objectMapper.convertValue(data, JsonData.class);
            List<JsonData> allDocs = this.couchdbStorage.findAll();
            String docId = null;
            JsonData jsonData;

            System.out.println("📄 Anzahl an Dokumenten in der DB: " + allDocs.size());

            if (allDocs.size() > 1) {
                // Mehrere vorhanden: Lösche alle, speichere neues
                for (JsonData doc : allDocs) {
                    this.couchdbStorage.delete(doc);
                }
                // neues Dokument speichern – _id & _rev null setzen
                incomingData.set_id(null);
                incomingData.set_rev(null);
                docId = this.couchdbStorage.save(incomingData);
                jsonData = incomingData;
            } else if (allDocs.size() == 1) {
                // Nur eins vorhanden: wiederverwenden
                jsonData = allDocs.get(0);
                docId = jsonData.get_id();
            } else {
                // Kein Dokument vorhanden: Speichere das neue
                incomingData.set_id(null);
                incomingData.set_rev(null);
                docId = this.couchdbStorage.save(incomingData);
                jsonData = incomingData;
            }

            // Test: Abruf anhand ID
            System.out.println("✅ Gefundene ID: " + jsonData.get_id() + ", " + jsonData.get_rev());
            System.out.println("➡ Dokument: " + this.couchdbStorage.find(docId));

            // Halte den Datensatz im Holder
            this.jsonDataHolder.setJsonData(jsonData);

            // Rückgabe
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", "SUCCESS");
            responseData.put("responseFrom", "Spring Boot Backend");
            responseData.put("originalMessage", docId);
            return responseData;

        } catch (Exception e) {
            System.err.println("❗ Fehler beim Verarbeiten der Mockup-Daten: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
