package com.example.demo.Dtos.SurveyResponseDtos;

import java.time.LocalDateTime;
import java.util.List;

public class SurveyResponseResponseDto {
  public String responseId;
  public List<String> answers;
  public LocalDateTime submittedAt;
}
