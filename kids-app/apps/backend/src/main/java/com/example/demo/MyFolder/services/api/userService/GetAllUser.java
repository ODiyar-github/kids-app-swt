package com.example.demo.MyFolder.services.api.userService;

import java.util.ArrayList;
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
public class GetAllUser implements MessageHandler {

    private final SingleDataPacketHolder packetHolder;

    @Autowired
    public GetAllUser(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.GET_ALL_USER;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Alle User abrufen");
        if (packetHolder.getData() == null || packetHolder.getData().getUserData() == null) {
            System.out.println("⚠️ Kein Datenpaket oder User-Daten im Holder verfügbar.");
            // Rückgabe einer leeren Liste anstatt null, um konsistenter zu sein
            return new ArrayList<UserDTO>();
        }

        List<AuthLoginDTO> authList = this.packetHolder.getData().getUserData();

        // Liste für die UserDTOs vorbereiten
        List<UserDTO> allUsers = new ArrayList<>();

        // Durch alle AuthLoginDTOs iterieren und die UserDTOs extrahieren
        for (AuthLoginDTO authLoginDTO : authList) {
            UserDTO user = authLoginDTO.getUser();
            if (user != null) {
                allUsers.add(user);
            }
        }

        System.out.println(String.format("✅ %d UserDTO(s) erfolgreich abgerufen.", allUsers.size()));
        return allUsers; // Gib die Liste aller UserDTOs zurück
    }
}
