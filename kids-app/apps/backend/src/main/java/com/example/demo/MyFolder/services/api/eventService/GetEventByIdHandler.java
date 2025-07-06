package com.example.demo.MyFolder.services.api.eventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.dataObjects.dtos.EventDTO;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class GetEventByIdHandler implements MessageHandler {

    private final SingleDataPacketHolder packetHolder;

    @Autowired
    public GetEventByIdHandler(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.EVENTS_GET_BY_ID;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        String eventUuid = (String) data.get("id");
        List<EventDTO> eventModels = packetHolder.getData().getEventData();

        if (eventModels != null) {
            Optional<EventDTO> foundEvent = eventModels.stream()
                    .filter(event -> event.getUuid() != null && event.getUuid().equals(eventUuid))
                    .findFirst();

            if (foundEvent.isPresent()) {
                return foundEvent.get();
            } else {
                return null; // Oder eine spezifische Fehlerantwort, falls dein BFF das erwartet
            }
        }
        System.out.println("⚠️ Keine Events im Holder verfügbar.");
        return null;
    }
}
