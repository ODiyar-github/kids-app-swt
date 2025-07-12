package com.example.demo.services.couchdb;

import java.util.List;

import org.lightcouch.CouchDbClient;
import org.lightcouch.Response;
import org.springframework.stereotype.Repository;

import com.example.demo.share.dataObjects.dtos.JsonData;

/**
 * @file CouchDbStorage.java
 * @description Diese Klasse ist ein Repository für die Interaktion mit einer CouchDB-Datenbank.
 * Sie bietet grundlegende CRUD-Operationen (Create, Read, Update, Delete) für `JsonData`-Dokumente.
 * Sie verwendet die LightCouch-Bibliothek für die CouchDB-Kommunikation.
 */

/**
 * @class CouchDbStorage
 * @description Spring Repository für CouchDB-Operationen.
 * Die `@Repository`-Annotation markiert diese Klasse als eine Spring-Komponente,
 * die für den Datenzugriff zuständig ist.
 */
@Repository
public class CouchDbStorage {
    /**
     * @private
     * @property {CouchDbClient} couchDbClient - Der CouchDbClient, der für die Kommunikation mit der CouchDB-Instanz verwendet wird.
     * Dieser wird von Spring automatisch injiziert.
     */
    private final CouchDbClient couchDbClient;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `CouchDbStorage`.
     * Spring injiziert hier automatisch den `CouchDbClient`-Bean, der in der Konfiguration definiert ist.
     * @param {CouchDbClient} couchDbClient - Der injizierte CouchDbClient.
     */
    public CouchDbStorage(CouchDbClient couchDbClient) {
        this.couchDbClient = couchDbClient;
    }

    /**
     * @method save
     * @description Speichert ein neues `JsonData`-Dokument in CouchDB.
     * Wenn die `_id` des `entity`-Objekts `null` ist, generiert CouchDB eine neue ID.
     * Wenn sie gesetzt ist, wird versucht, das Dokument mit dieser ID zu speichern oder zu aktualisieren.
     * @param {JsonData} entity - Die zu speichernde `JsonData`-Entität.
     * @returns {String} Die generierte oder verwendete ID des Dokuments.
     */
    public String save(JsonData entity) {
        // WICHTIG: Dein JsonData DTO muss _id und _rev Felder haben (siehe unten).
        // Wenn entity.id (oder _id) null ist, generiert CouchDB eine neue ID.
        // Wenn es gesetzt ist, wird versucht, das Dokument mit dieser ID zu
        // speichern/aktualisieren.
        return couchDbClient.save(entity).getId();
    }

    /**
     * @method find
     * @description Findet ein `JsonData`-Dokument anhand seiner ID.
     * @param {String} id - Die Dokumenten-ID des zu findenden Dokuments.
     * @returns {JsonData} Das gefundene Dokument oder `null`, wenn kein Dokument mit der angegebenen ID gefunden wird.
     */
    public JsonData find(String id) {
        return couchDbClient.find(JsonData.class, id); // JsonData.class wird direkt übergeben
    }

    /**
     * @method update
     * @description Aktualisiert ein bestehendes `JsonData`-Dokument in CouchDB.
     * Das zu aktualisierende `entity`-Objekt muss die Felder `_id` und `_rev` enthalten.
     * Nach einem erfolgreichen Update wird die neue Revision (`_rev`) im `entity`-Objekt aktualisiert.
     * @param {JsonData} entity - Das zu aktualisierende Dokument.
     * @returns {JsonData} Das aktualisierte `JsonData`-Objekt mit der neuen Revision.
     */
    public JsonData update(JsonData entity) {
        Response response = couchDbClient.update(entity);

        // Überprüfe, ob das Update erfolgreich war und eine neue Revision generiert
        // wurde.
        if (response != null && response.getRev() != null) {
            // Setze die neue _rev in das ursprüngliche entity-Objekt.
            // LightCouch sollte dies bereits automatisch tun, aber explizit ist sicherer.
            entity.set_rev(response.getRev());
        } else {
            // Optional: Fehlerbehandlung, falls das Update fehlschlägt oder keine _rev
            // zurückgibt.
            System.err
                    .println("❌ CouchDbStorage: Update-Operation lieferte keine gültige Revision für Dokument mit ID: "
                            + entity.get_id());
            // Du könntest hier eine spezifische Exception werfen, wenn das für deine
            // Fehlerbehandlung wichtig ist.
        }
        return entity; // Gib das jetzt aktualisierte JsonData-Objekt zurück
    }

    /**
     * @method delete
     * @description Löscht ein `JsonData`-Dokument aus CouchDB.
     * Das zu löschende `entity`-Objekt muss die Felder `_id` und `_rev` enthalten.
     * @param {JsonData} entity - Das zu löschende Dokument.
     */
    public void delete(JsonData entity) {
        // WICHTIG: Das 'entity' Objekt MUSS die Felder '_id' und '_rev' enthalten.
        couchDbClient.remove(entity);
    }

    /**
     * @method findAll
     * @description Ruft alle `JsonData`-Dokumente aus der CouchDB-Datenbank ab.
     * @returns {List<JsonData>} Eine Liste aller gefundenen `JsonData`-Dokumente.
     */
    public List<JsonData> findAll() {
        return couchDbClient.view("_all_docs")
                .includeDocs(true)
                .query(JsonData.class); // JsonData.class wird direkt übergeben
    }
}
