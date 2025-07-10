package com.example.demo.MyFolder.services.api.userService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.dataObjects.dtos.AuthLoginDTO;
import com.example.demo.MyFolder.share.dataObjects.dtos.UserDTO;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;

@Component
public class LoginUserHandler implements MessageHandler {

    private final SingleDataPacketHolder packetHolder;

    @Autowired
    public LoginUserHandler(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.AUTH_LOGIN;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Login-Versuch");
        String username = (String) data.get("username");
        String password = (String) data.get("password");

        if (username == null || password == null) {
            System.err.println("❌ Login-Anfrage ungültig: Benutzername oder Passwort fehlen.");
            return null;
        }

        System.out.println(String.format("🔐 Loginversuch für Benutzer: %s", username));
        System.out.println(String.format("🔐 Loginversuch für Password: %s", password));

        if (packetHolder.getData().getUserData() == null) {
            System.out.println("⚠️ Kein Datenpaket im Holder verfügbar für Login-Prüfung.");
            return null;
        }
        System.out.println("ALLE Initialisierungsschritte sind durch, Jetzt kommt die Schleife: ");
        List<AuthLoginDTO> authList = this.packetHolder.getData().getUserData(); // Diese Liste enthält die
                                                                                 // AuthLoginDTOs aus deinem JsonData
        System.out.println("Kontrolle ob AuthList vorhanden ist: " + authList.size());

        for (AuthLoginDTO storedAuthData : authList) {
            // Führe den Vergleich der Anmeldedaten hier im Handler durch.
            // Der gespeicherte 'storedAuthData' aus der Liste hat seine eigenen
            // username/password Felder.
            boolean usernameMatches = storedAuthData.getUsername() != null
                    && username.equalsIgnoreCase(storedAuthData.getUsername());
            boolean passwordMatches = storedAuthData.getPassword() != null
                    && password.equals(storedAuthData.getPassword());

            if (usernameMatches && passwordMatches) {
                System.out.println("✅ Login erfolgreich!");
                return storedAuthData.getUser();
            }
        }
        return null;
    }
}
