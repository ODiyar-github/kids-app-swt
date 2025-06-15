package com.example.demo.Mapper;

import com.example.demo.Dtos.EventDtos.EventCreateDto;
import com.example.demo.Dtos.EventDtos.EventResponseDto;
import com.example.demo.Dtos.EventDtos.EventUpdateDto;
import com.example.demo.entity.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventMapper {
  EventCreateDto toEventCreateDto (Event event);
  EventResponseDto toEventResponseDto(Event event);
  EventUpdateDto toEventUpdateDto(Event event);
}
