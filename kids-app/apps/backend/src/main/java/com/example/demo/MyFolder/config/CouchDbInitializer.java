package com.example.demo.MyFolder.config;

import java.util.List;

import org.lightcouch.CouchDbClient;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.google.gson.JsonObject;

@Component
public class CouchDbInitializer {

    private final CouchDbClient couchDbClient;

    public CouchDbInitializer(CouchDbClient couchDbClient) {
        this.couchDbClient = couchDbClient;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        List<JsonObject> allDocs = couchDbClient.view("_all_docs")
                .includeDocs(true)
                .query(JsonObject.class);

        for (JsonObject doc : allDocs) {
            couchDbClient.remove(doc);
        }

        System.out.println("CouchDB-Daten gelöscht.");
    }
}