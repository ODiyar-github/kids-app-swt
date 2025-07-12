package com.example.demo.services.api.userService;

import java.util.ArrayList;
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
 * @file GetAllUser.java
 * @description Dieser MessageHandler ist für die Verarbeitung von RabbitMQ-Nachrichten zuständig,
 * die das Abrufen aller Benutzer anfordern. Er greift auf die im `SingleDataPacketHolder`
 * gespeicherten Benutzerdaten zu und gibt eine Liste von `UserDTO`s zurück.
 */

/**
 * @class GetAllUser
 * @description Eine Spring Component, die das `MessageHandler`-Interface implementiert,
 * um Anfragen für alle Benutzerdaten zu verarbeiten. Sie interagiert mit dem
 * `SingleDataPacketHolder`, um die global verfügbaren Daten abzurufen.
 */
@Component
public class GetAllUser implements MessageHandler {

    /**
     * @private
     * @property {SingleDataPacketHolder} packetHolder - Eine Instanz des `SingleDataPacketHolder`,
     * der die gesamten Anwendungsdaten (einschließlich Benutzerdaten) speichert.
     */
    private final SingleDataPacketHolder packetHolder;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `GetAllUser`.
     * Der `SingleDataPacketHolder` wird von Spring automatisch injiziert.
     * @param {SingleDataPacketHolder} packetHolder - Der injizierte `SingleDataPacketHolder`.
     */
    @Autowired
    public GetAllUser(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    /**
     * @method getPattern
     * @description Gibt das RabbitMQ-Muster zurück, für das dieser Handler zuständig ist.
     * @returns {RabbitMqPattern} Das `RabbitMqPattern.GET_ALL_USER`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.GET_ALL_USER;
    }

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht zum Abrufen aller Benutzer.
     * Greift auf die Benutzerdaten im `SingleDataPacketHolder` zu, extrahiert die `UserDTO`s
     * aus den `AuthLoginDTO`s und gibt sie als Liste zurück.
     * @param {Map<String, Object>} data - Die Payload der Nachricht (hier nicht verwendet, da alle Benutzer abgerufen werden).
     * @returns {Object} Eine Liste von `UserDTO`-Objekten oder eine leere Liste, wenn keine Daten verfügbar sind.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Alle User abrufen");
        // Überprüft, ob das Datenpaket oder die Benutzerdaten im Holder verfügbar sind.
        if (packetHolder.getData() == null || packetHolder.getData().getUserData() == null) {
            System.out.println("⚠️ Kein Datenpaket oder User-Daten im Holder verfügbar.");
            // Rückgabe einer leeren Liste anstatt null, um konsistenter zu sein
            return new ArrayList<UserDTO>();
        }

        // Ruft die Liste der AuthLoginDTOs aus dem Datenpaket ab.
        List<AuthLoginDTO> authList = this.packetHolder.getData().getUserData();

        // Liste für die zu sammelnden UserDTOs vorbereiten.
        List<UserDTO> allUsers = new ArrayList<>();

        // Iteriert durch alle AuthLoginDTOs und extrahiert das zugehörige UserDTO.
        for (AuthLoginDTO authLoginDTO : authList) {
            UserDTO user = authLoginDTO.getUser();
            if (user != null) {
                allUsers.add(user); // Fügt das UserDTO zur Liste hinzu.
            }
        }

        System.out.println(String.format("✅ %d UserDTO(s) erfolgreich abgerufen.", allUsers.size()));
        return allUsers; // Gibt die Liste aller UserDTOs zurück.
    }
}
