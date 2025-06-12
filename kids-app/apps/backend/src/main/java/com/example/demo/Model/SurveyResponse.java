package com.example.demo.Model;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class SurveyResponse {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String responseId;

  @ElementCollection
  private List<String> answers;

  private LocalDateTime submittedAt;

  public SurveyResponse() {
  }

  public SurveyResponse(LocalDateTime submittedAt, List<String> answers) {
    this.submittedAt = submittedAt;
    this.answers = answers;
  }

  public String getResponseId() {
    return responseId;
  }

  public void setResponseId(String responseId) {
    this.responseId = responseId;
  }

  public List<String> getAnswers() {
    return answers;
  }

  public void setAnswers(List<String> answers) {
    this.answers = answers;
  }

  public LocalDateTime getSubmittedAt() {
    return submittedAt;
  }

  public void setSubmittedAt(LocalDateTime submittedAt) {
    this.submittedAt = submittedAt;
  }

  @Override
  public String toString() {
    return "SurveyResponse{" +
      "responseId=" + responseId +
      ", answers=" + answers +
      ", submittedAt=" + submittedAt +
      '}';
  }
}
