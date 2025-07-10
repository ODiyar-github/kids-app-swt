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
public class GetUserByID implements MessageHandler {

    private final SingleDataPacketHolder packetHolder;

    @Autowired
    public GetUserByID(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.AUTH_GET_USER_BY_ID;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Login-Versuch");
        String id = (String) data.get("id");

        if (id == null) {
            System.err.println("❌ Login-Anfrage ungültig: Benutzername oder Passwort fehlen.");
            return null;
        }

        System.out.println(String.format("🔐 Loginversuch für Benutzer: %s", id));

        if (packetHolder.getData().getUserData() == null) {
            System.out.println("⚠️ Kein Datenpaket im Holder verfügbar für Login-Prüfung.");
            return null;
        }
        List<AuthLoginDTO> authList = this.packetHolder.getData().getUserData();
        UserDTO foundUser = null;
        for (AuthLoginDTO authLoginDTO : authList) {
            UserDTO check = authLoginDTO.getUser();
            if (check.getUserId().equals(id)) {
                foundUser = check;
                break;
            }
        }
        return foundUser;
    }
}
