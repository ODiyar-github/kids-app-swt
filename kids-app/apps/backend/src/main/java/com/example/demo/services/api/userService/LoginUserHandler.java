package com.example.demo.services.api.userService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.share.dataObjects.dtos.AuthLoginDTO;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;

/**
 * @file LoginUserHandler.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die einen Benutzer-Login anfordern. Er überprüft die bereitgestellten Anmeldeinformationen
 * anhand der im `SingleDataPacketHolder` gespeicherten Benutzerdaten.
 */

/**
 * @class LoginUserHandler
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Login-Anfragen zu verarbeiten. Sie interagiert mit dem
 * `SingleDataPacketHolder`, um die global verfügbaren Benutzerdaten abzurufen und zu validieren.
 */
@Component
public class LoginUserHandler implements MessageHandler {

    /**
     * @private
     * @property {SingleDataPacketHolder} packetHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (einschließlich Benutzeranmeldedaten) speichert.
     */
    private final SingleDataPacketHolder packetHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `LoginUserHandler`.
     * Der `SingleDataPacketHolder` wird von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} packetHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired
    public LoginUserHandler(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.AUTH_LOGIN`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.AUTH_LOGIN;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht für einen Benutzer-Login.
     * Extrahiert Benutzername und Passwort aus den Daten, sucht den Benutzer
     * in den gespeicherten `AuthLoginDTO`s und gibt das zugehörige `UserDTO`
     * bei erfolgreichem Login zurück.
     * @param {Map<String, Object>} data - Die Payload der Nachricht, die den Benutzernamen und das Passwort enthält.
     * @returns {Object} Das `UserDTO`-Objekt des angemeldeten Benutzers bei Erfolg,
     * oder `null`, wenn der Login fehlschlägt (z.B. falsche Anmeldeinformationen oder fehlende Daten).
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Login-Versuch");
        // Extrahiert Benutzername und Passwort aus der Daten-Map.
        String username = (String) data.get("username");
        String password = (String) data.get("password");

        // Prüft, ob Benutzername oder Passwort fehlen.
        if (username == null || password == null) {
            System.err.println("❌ Login-Anfrage ungültig: Benutzername oder Passwort fehlen.");
            return null;
        }

        System.out.println(String.format("🔐 Loginversuch für Benutzer: %s", username));
        System.out.println(String.format("🔐 Loginversuch für Password: %s", password));

        // Prüft, ob Benutzerdaten im Holder verfügbar sind.
        if (packetHolder.getData() == null || packetHolder.getData().getUserData() == null) {
            System.out.println("⚠️ Kein Datenpaket im Holder verfügbar für Login-Prüfung.");
            return null;
        }
        System.out.println("ALLE Initialisierungsschritte sind durch, Jetzt kommt die Schleife: ");
        // Ruft die Liste der AuthLoginDTOs aus dem Datenpaket ab.
        List<AuthLoginDTO> authList = this.packetHolder.getData().getUserData();
        System.out.println("Kontrolle ob AuthList vorhanden ist: " + authList.size());

        // Iteriert durch die AuthLoginDTOs, um die Anmeldeinformationen zu überprüfen.
        for (AuthLoginDTO storedAuthData : authList) {
            // Führt den Vergleich der Anmeldedaten hier im Handler durch.
            // Der gespeicherte 'storedAuthData' aus der Liste hat seine eigenen
            // username/password Felder.
            boolean usernameMatches = storedAuthData.getUsername() != null
                    && username.equalsIgnoreCase(storedAuthData.getUsername());
            boolean passwordMatches = storedAuthData.getPassword() != null
                    && password.equals(storedAuthData.getPassword());

            if (usernameMatches && passwordMatches) {
                System.out.println("✅ Login erfolgreich!");
                return storedAuthData.getUser(); // Gibt das UserDTO bei erfolgreichem Login zurück.
            }
        }
        // Wenn kein passender Benutzer gefunden wurde.
        return null;
    }
}
