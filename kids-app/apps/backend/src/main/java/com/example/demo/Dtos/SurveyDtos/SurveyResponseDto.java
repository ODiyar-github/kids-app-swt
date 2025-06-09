package com.example.demo.Dtos.SurveyDtos;

import java.time.LocalDateTime;
import java.util.List;

public class SurveyResponseDto {
  public Long surveyId;
  public String title;
  public String description;
  public List<String> questions;
  public LocalDateTime createdAt;
}
