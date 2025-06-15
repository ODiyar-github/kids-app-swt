package com.example.demo.Mapper;

import com.example.demo.Dtos.SurveyDtos.SurveyCreateDto;
import com.example.demo.Dtos.SurveyDtos.SurveyUpdateDto;
import com.example.demo.entity.Survey;
import com.example.demo.entity.SurveyResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SurveyMapper {
  SurveyCreateDto toSurveyCreateDto (Survey survey);
  SurveyResponse toSurveyResponse(Survey survey);
  SurveyUpdateDto toSurveyUpdateDto(Survey survey);
}
