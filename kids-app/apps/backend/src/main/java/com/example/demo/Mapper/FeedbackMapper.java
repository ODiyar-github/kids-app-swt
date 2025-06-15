package com.example.demo.Mapper;

import com.example.demo.Dtos.EventDtos.EventCreateDto;
import com.example.demo.Dtos.EventDtos.EventResponseDto;
import com.example.demo.Dtos.EventDtos.EventUpdateDto;
import com.example.demo.Dtos.FeedbackDtos.FeedbackCreateDto;
import com.example.demo.Dtos.FeedbackDtos.FeedbackResponseDto;
import com.example.demo.Dtos.FeedbackDtos.FeedbackUpdateDto;
import com.example.demo.entity.Event;
import com.example.demo.entity.Feedback;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {
  FeedbackCreateDto toFeedbackCreateDto (Feedback feedback);
  FeedbackResponseDto toFeedbackResponseDto(Feedback feedback);
  FeedbackUpdateDto toFeedbackUpdateDto(Feedback feedback);
}
