package com.example.demo.services.api.userService;

import com.example.demo.services.couchdb.CouchDbStorage;
import com.example.demo.share.dataObjects.dtos.AuthLoginDTO;
import com.example.demo.share.dataObjects.dtos.JsonData;
import com.example.demo.share.dataObjects.dtos.UserDTO;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper; // Für die Deserialisierung

/**
 * @file UpdateUserHandler.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Aktualisieren von Benutzerdaten anfordern. Er aktualisiert das `AuthLoginDTO`
 * eines Benutzers im `SingleDataPacketHolder` und speichert die Änderungen persistent in CouchDB.
 */

/**
 * @class UpdateUserHandler
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Anfragen zur Aktualisierung von Benutzerdaten zu verarbeiten.
 * Sie interagiert mit dem `SingleDataPacketHolder` zur In-Memory-Verwaltung der Daten
 * und mit `CouchDbStorage` zur persistenten Speicherung.
 */
@Component
public class UpdateUserHandler implements MessageHandler {

    /**
     * @private
     * @property {SingleDataPacketHolder} packetHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (einschließlich Benutzerdaten) speichert.
     */
    private final SingleDataPacketHolder packetHolder;
    /**
     * @private
     * @property {ObjectMapper} objectMapper - Eine Instanz des Jackson `ObjectMapper` zum Konvertieren
     * von Daten zwischen Map- und DTO-Objekten.
     */
    private final ObjectMapper objectMapper;
    /**
     * @private
     * @property {CouchDbStorage} couchDbStorage - Eine Instanz des `CouchDbStorage` für die Interaktion
     * mit der CouchDB-Datenbank.
     */
    private final CouchDbStorage couchDbStorage;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `UpdateUserHandler`.
     * Die Abhängigkeiten (`SingleDataPacketHolder`, `ObjectMapper`, `CouchDbStorage`)
     * werden von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} packetHolder - Der injizierte `SingleDataPacketHolder`.
     * @param {ObjectMapper} objectMapper - Der injizierte `ObjectMapper`.
     * @param {CouchDbStorage} couchDbStorage - Der injizierte `CouchDbStorage`.
     */
    @Autowired
    public UpdateUserHandler(SingleDataPacketHolder packetHolder, ObjectMapper objectMapper,
            CouchDbStorage couchDbStorage) {
        this.packetHolder = packetHolder;
        this.objectMapper = objectMapper;
        this.couchDbStorage = couchDbStorage;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.UPDATE_USER`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.UPDATE_USER;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht zur Aktualisierung eines `AuthLoginDTO`.
     * Deserialisiert die eingehenden Daten in ein `AuthLoginDTO`, sucht den entsprechenden
     * Benutzer im `SingleDataPacketHolder`, aktualisiert dessen Daten und speichert
     * die gesamte `JsonData` in CouchDB.
     * @param {Map<String, Object>} data - Die Payload der Nachricht, die das zu aktualisierende `AuthLoginDTO` enthält.
     * @returns {Object} Das aktualisierte `UserDTO`-Objekt bei Erfolg, oder `null` bei Fehlern
     * (z.B. Deserialisierungsfehler, fehlende Daten, Benutzer nicht gefunden, Datenbankfehler).
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: AuthLoginDTO aktualisieren");

        AuthLoginDTO incomingAuthLoginDTO;
        try {
            // Versucht, die eingehenden Daten (Map) in ein AuthLoginDTO-Objekt zu konvertieren.
            incomingAuthLoginDTO = objectMapper.convertValue(data, AuthLoginDTO.class);
        } catch (IllegalArgumentException e) {
            System.err.println("❌ Fehler beim Deserialisieren des AuthLoginDTO: " + e.getMessage());
            return null; // Gibt null zurück, wenn die Deserialisierung fehlschlägt.
        }

        // Prüft auf grundlegende Gültigkeit des eingehenden AuthLoginDTO.
        if (incomingAuthLoginDTO == null || incomingAuthLoginDTO.getUser() == null
                || incomingAuthLoginDTO.getUser().getUserId() == null) {
            System.err.println("❌ Aktualisierungsanfrage ungültig: AuthLoginDTO, User oder userId fehlen.");
            return null; // Gibt null zurück, wenn notwendige Daten fehlen.
        }

        // Ruft die aktuellen JsonData aus dem SingleDataPacketHolder ab.
        JsonData currentJsonData = packetHolder.getData();
        // Ruft die Liste der AuthLoginDTOs aus den aktuellen JsonData ab.
        List<AuthLoginDTO> authList = currentJsonData.getUserData();

        // Prüft, ob die AuthLoginDTO-Liste leer oder null ist.
        if (authList == null || authList.isEmpty()) {
            System.err.println("⚠️ Kein Datenpaket im Holder verfügbar für AuthLoginDTO-Aktualisierung.");
            return null;
        }

        int foundIndex = -1; // Index des zu aktualisierenden Benutzers in der Liste.
        // Sucht den Benutzer in der Liste anhand seiner userId.
        for (int i = 0; i < authList.size(); i++) {
            AuthLoginDTO currentAuth = authList.get(i);
            if (currentAuth.getUser() != null
                    && currentAuth.getUser().getUserId().equals(incomingAuthLoginDTO.getUser().getUserId())) {
                foundIndex = i; // Speichert den Index, wenn der Benutzer gefunden wird.
                break; // Beendet die Schleife.
            }
        }

        // Wenn der Benutzer gefunden wurde, aktualisiert und speichert die Daten.
        if (foundIndex != -1) {
            // Ersetzt das alte AuthLoginDTO durch das neue (aktualisierte).
            authList.set(foundIndex, incomingAuthLoginDTO);

            try {
                // Aktualisiert die gesamten JsonData in CouchDB.
                JsonData updatedJsonDataFromDb = this.couchDbStorage.update(currentJsonData);

                // Aktualisiert den SingleDataPacketHolder mit den neuesten Daten aus der Datenbank.
                packetHolder.setJsonData(updatedJsonDataFromDb);

                // Holt das UserDTO des aktualisierten Benutzers für die Rückgabe.
                UserDTO responseUser = authList.get(foundIndex).getUser();

                System.out.println(String.format(
                        "✅ AuthLoginDTO für Benutzer mit ID %s erfolgreich aktualisiert UND in CouchDB gespeichert.",
                        incomingAuthLoginDTO.getUser().getUserId()));

                return responseUser; // Gibt das aktualisierte UserDTO zurück.

            } catch (Exception e) {
                System.err.println("❌ Fehler beim Speichern/Verarbeiten des AuthLoginDTO: " + e.getMessage());
                e.printStackTrace(); // Gibt den Stacktrace für detailliertere Fehlerinformationen aus.
                return null; // Gibt null zurück bei einem Datenbank- oder Verarbeitungsfehler.
            }
        } else {
            // Wenn der Benutzer nicht gefunden wurde.
            System.err.println(String.format("❌ AuthLoginDTO für Benutzer mit ID %s nicht gefunden.",
                    incomingAuthLoginDTO.getUser().getUserId()));
            return null;
        }
    }
}
