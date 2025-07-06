package com.example.demo.MyFolder.services.api.eventService;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.dataObjects.dtos.EventDTO;
import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;
import com.example.demo.MyFolder.share.util.SingleDataPacketHolder;

@Component
public class GetAllEventsHandler implements MessageHandler {

    private final SingleDataPacketHolder packetHolder;

    @Autowired
    public GetAllEventsHandler(SingleDataPacketHolder packetHolder) {
        this.packetHolder = packetHolder;
    }

    @Override
    public RabbitMqPattern getPattern() {
        return RabbitMqPattern.EVENTS_GET_ALL;
    }

    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend empfängt RabbitMQ-Anfrage: Alle Events abrufen (aus globalem Model-Cache)");
        List<EventDTO> events = packetHolder.getData().getEventData();
        System.out.println("EVENTLISTE:" + events.size());

        if (events != null && !events.isEmpty()) {
            return events;
        }
        System.out.println("⚠️ Keine Events im Holder gefunden.");
        return Collections.emptyList(); // Gib eine leere Liste zurück, wenn keine Events da sind
    }
}
