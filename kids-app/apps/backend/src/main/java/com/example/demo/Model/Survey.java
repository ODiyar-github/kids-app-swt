package com.example.demo.Model;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Survey {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String surveyId;

  private String title;
  private String description;

  @ElementCollection
  private List<String> questions;

  private LocalDateTime createdAt;

  public Survey() {
  }

  public Survey(String title, String description, List<String> questions, LocalDateTime createdAt) {
    this.title = title;
    this.description = description;
    this.questions = questions;
    this.createdAt = createdAt;
  }

  public String getSurveyId() {
    return surveyId;
  }

  public void setSurveyId(String surveyId) {
    this.surveyId = surveyId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<String> getQuestions() {
    return questions;
  }

  public void setQuestions(List<String> questions) {
    this.questions = questions;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  @Override
  public String toString() {
    return "Survey{" +
      "surveyId=" + surveyId +
      ", title='" + title + '\'' +
      ", description='" + description + '\'' +
      ", questions=" + questions +
      ", createdAt=" + createdAt +
      '}';
  }
}
