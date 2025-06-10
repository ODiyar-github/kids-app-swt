package com.example.demo.Dtos.SurveyResponseDtos;

import java.time.LocalDateTime;
import java.util.List;

public class SurveyResponseResponseDto {
  public Long responseId;
  public List<String> answers;
  public LocalDateTime submittedAt;
}
