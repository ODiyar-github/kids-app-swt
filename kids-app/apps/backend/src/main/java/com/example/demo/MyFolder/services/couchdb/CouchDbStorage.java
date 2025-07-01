package com.example.demo.MyFolder.services.couchdb;

import java.util.List;

import org.lightcouch.CouchDbClient;
import org.springframework.stereotype.Repository;

import com.example.demo.MyFolder.share.dataObjects.dtos.JsonData;

@Repository
public class CouchDbStorage {
        private final CouchDbClient couchDbClient;

    // Spring injiziert hier automatisch den CouchDbClient Bean
    public CouchDbStorage(CouchDbClient couchDbClient) {
        this.couchDbClient = couchDbClient;
    }

    /**
     * Speichert ein neues JsonData-Dokument in CouchDB.
     * @param entity Die zu speichernde JsonData-Entität.
     * @return Die generierte ID des Dokuments.
     */
    public String save(JsonData entity) {
        // WICHTIG: Dein JsonData DTO muss _id und _rev Felder haben (siehe unten).
        // Wenn entity.id (oder _id) null ist, generiert CouchDB eine neue ID.
        // Wenn es gesetzt ist, wird versucht, das Dokument mit dieser ID zu speichern/aktualisieren.
        return couchDbClient.save(entity).getId();
    }

    /**
     * Findet ein JsonData-Dokument anhand seiner ID.
     * @param id Die Dokumenten-ID.
     * @return Das gefundene Dokument oder null.
     */
    public JsonData find(String id) {
        return couchDbClient.find(JsonData.class, id); // JsonData.class wird direkt übergeben
    }

    /**
     * Aktualisiert ein bestehendes JsonData-Dokument (muss _id und _rev enthalten).
     * @param entity Das zu aktualisierende Dokument.
     */
    public void update(JsonData entity) {
        // WICHTIG: Das 'entity' Objekt MUSS die Felder '_id' und '_rev' enthalten.
        couchDbClient.update(entity);
    }

    /**
     * Löscht ein JsonData-Dokument (muss _id und _rev enthalten).
     * @param entity Das zu löschende Dokument.
     */
    public void delete(JsonData entity) {
        // WICHTIG: Das 'entity' Objekt MUSS die Felder '_id' und '_rev' enthalten.
        couchDbClient.remove(entity);
    }

    /**
     * Ruft alle JsonData-Dokumente ab.
     * @return Liste aller JsonData-Dokumente.
     */
    public List<JsonData> findAll() {
        return couchDbClient.view("_all_docs")
                .includeDocs(true)
                .query(JsonData.class); // JsonData.class wird direkt übergeben
    }
}
