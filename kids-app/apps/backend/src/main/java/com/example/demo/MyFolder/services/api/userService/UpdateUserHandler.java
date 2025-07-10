package com.example.demo.MyFolder.services.api.userService;

import com.example.demo.MyFolder.services.couchdb.CouchDbStorage;
import com.example.demo.MyFolder.share.dataObjects.dtos.AuthLoginDTO;
import com.example.demo.MyFolder.share.dataObjects.dtos.JsonData;
import com.example.demo.MyFolder.share.dataObjects.dtos.UserDTO;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.fasterxml.jackson.databind.ObjectMapper; // Für die Deserialisierung

@Component
public class UpdateUserHandler implements MessageHandler {

    private final SingleDataPacketHolder packetHolder;
    private final ObjectMapper objectMapper;
    private final CouchDbStorage couchDbStorage;

    @Autowired
    public UpdateUserHandler(SingleDataPacketHolder packetHolder, ObjectMapper objectMapper,
            CouchDbStorage couchDbStorage) {
        this.packetHolder = packetHolder;
        this.objectMapper = objectMapper;
        this.couchDbStorage = couchDbStorage;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.UPDATE_USER;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: AuthLoginDTO aktualisieren");

        AuthLoginDTO incomingAuthLoginDTO;
        try {
            incomingAuthLoginDTO = objectMapper.convertValue(data, AuthLoginDTO.class);
        } catch (IllegalArgumentException e) {
            System.err.println("❌ Fehler beim Deserialisieren des AuthLoginDTO: " + e.getMessage());
            return null;
        }

        if (incomingAuthLoginDTO == null || incomingAuthLoginDTO.getUser() == null
                || incomingAuthLoginDTO.getUser().getUserId() == null) {
            System.err.println("❌ Aktualisierungsanfrage ungültig: AuthLoginDTO, User oder userId fehlen.");
            return null;
        }

        JsonData currentJsonData = packetHolder.getData();
        List<AuthLoginDTO> authList = currentJsonData.getUserData();

        if (authList == null || authList.isEmpty()) {
            System.err.println("⚠️ Kein Datenpaket im Holder verfügbar für AuthLoginDTO-Aktualisierung.");
            return null;
        }

        int foundIndex = -1;
        for (int i = 0; i < authList.size(); i++) {
            AuthLoginDTO currentAuth = authList.get(i);
            if (currentAuth.getUser() != null
                    && currentAuth.getUser().getUserId().equals(incomingAuthLoginDTO.getUser().getUserId())) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex != -1) {
            authList.set(foundIndex, incomingAuthLoginDTO);

            try {

                JsonData updatedJsonDataFromDb = this.couchDbStorage.update(currentJsonData);

                packetHolder.setJsonData(updatedJsonDataFromDb);

                UserDTO responseUser = authList.get(foundIndex).getUser();

                System.out.println(String.format(
                        "✅ AuthLoginDTO für Benutzer mit ID %s erfolgreich aktualisiert UND in CouchDB gespeichert.",
                        incomingAuthLoginDTO.getUser().getUserId()));

                return responseUser;

            } catch (Exception e) {
                System.err.println("❌ Fehler beim Speichern/Verarbeiten des AuthLoginDTO: " + e.getMessage());
                e.printStackTrace();
                return null;
            }
        } else {
            System.err.println(String.format("❌ AuthLoginDTO für Benutzer mit ID %s nicht gefunden.",
                    incomingAuthLoginDTO.getUser().getUserId()));
            return null;
        }
    }
}