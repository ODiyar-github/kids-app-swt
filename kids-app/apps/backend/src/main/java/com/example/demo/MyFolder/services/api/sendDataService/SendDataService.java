package com.example.demo.MyFolder.services.api.sendDataService;

import java.util.HashMap;
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
    public SendDataService(ObjectMapper objectMapper, CouchDbStorage couchdbStorage, SingleDataPacketHolder jsonDataHolder) {
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
            JsonData jsonData = objectMapper.convertValue(data, JsonData.class);
            jsonData.set_id(null);
            jsonData.set_rev(null);
            for (JsonData element : this.couchdbStorage.findAll()) {
                this.couchdbStorage.delete(element);
            }
            String docId = this.couchdbStorage.save(jsonData);
            this.jsonDataHolder.setJsonData(jsonData);
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
