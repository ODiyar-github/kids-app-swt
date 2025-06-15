package com.example.demo.Mapper;

import com.example.demo.Dtos.SurveyResponseDtos.SurveyResponseCreateDto;
import com.example.demo.Dtos.SurveyResponseDtos.SurveyResponseResponseDto;
import com.example.demo.Dtos.SurveyResponseDtos.SurveyResponseUpdateDto;
import com.example.demo.entity.SurveyResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SurveyResponseMapper {
  SurveyResponseCreateDto toSurveyResponseCreateDto (SurveyResponse surveyResponse);
  SurveyResponseResponseDto toSurveyResponseResponseDto(SurveyResponse surveyResponse);
  SurveyResponseUpdateDto toSurveyResponseUpdateDto(SurveyResponse surveyResponse);
}
