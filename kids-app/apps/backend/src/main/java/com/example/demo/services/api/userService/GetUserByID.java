package com.example.demo.services.api.userService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.share.dataObjects.dtos.AuthLoginDTO;
import com.example.demo.share.dataObjects.dtos.UserDTO;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;

/**
 * @file GetUserByID.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Abrufen eines Benutzers anhand seiner ID anfordern. Er sucht den Benutzer
 * in den im `SingleDataPacketHolder` gespeicherten Daten.
 */

/**
 * @class GetUserByID
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Anfragen für Benutzerdaten nach ID zu verarbeiten. Sie interagiert mit dem
 * `SingleDataPacketHolder`, um die global verfügbaren Daten abzurufen.
 */
@Component
public class GetUserByID implements MessageHandler {

    /**
     * @private
     * @property {SingleDataPacketHolder} packetHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (einschließlich Benutzerdaten) speichert.
     */
    private final SingleDataPacketHolder packetHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `GetUserByID`.
     * Der `SingleDataPacketHolder` wird von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} packetHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired
    public GetUserByID(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.AUTH_GET_USER_BY_ID`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.AUTH_GET_USER_BY_ID;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht zum Abrufen eines Benutzers anhand seiner ID.
     * Extrahiert die Benutzer-ID aus den Daten, sucht den Benutzer in den gespeicherten Daten
     * und gibt das gefundene `UserDTO` zurück.
     * @param {Map<String, Object>} data - Die Payload der Nachricht, die die Benutzer-ID enthält.
     * @returns {Object} Das gefundene `UserDTO`-Objekt oder `null`, wenn der Benutzer nicht gefunden wurde
     * oder die ID fehlt.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Login-Versuch"); // Der Log-Text ist hier irreführend, sollte "User nach ID abrufen" sein.
        // Extrahiert die Benutzer-ID aus der Daten-Map.
        String id = (String) data.get("id");

        // Prüft, ob die ID vorhanden ist.
        if (id == null) {
            System.err.println("❌ Login-Anfrage ungültig: Benutzername oder Passwort fehlen."); // Auch hier ist der Log-Text irreführend.
            return null;
        }

        System.out.println(String.format("🔐 Loginversuch für Benutzer: %s", id)); // Auch hier ist der Log-Text irreführend.

        // Prüft, ob Benutzerdaten im Holder verfügbar sind.
        if (packetHolder.getData() == null || packetHolder.getData().getUserData() == null) {
            System.out.println("⚠️ Kein Datenpaket im Holder verfügbar für Login-Prüfung.");
            return null;
        }
        // Ruft die Liste der AuthLoginDTOs aus dem Datenpaket ab.
        List<AuthLoginDTO> authList = this.packetHolder.getData().getUserData();
        UserDTO foundUser = null; // Variable zum Speichern des gefundenen Benutzers.

        // Iteriert durch die AuthLoginDTOs, um den Benutzer mit der passenden ID zu finden.
        for (AuthLoginDTO authLoginDTO : authList) {
            UserDTO check = authLoginDTO.getUser();
            if (check.getUserId().equals(id)) { // Vergleicht die Benutzer-ID.
                foundUser = check; // Setzt den gefundenen Benutzer.
                break; // Beendet die Schleife, sobald der Benutzer gefunden wurde.
            }
        }
        return foundUser; // Gibt den gefundenen Benutzer zurück (oder null).
    }
}
