package com.example.demo.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Event {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String eventID;

  private String title;
  private String description;

  @ElementCollection
  private List<String> category;

  private LocalDate date;
  private String location;
  private double price;
  private int minAge;
  private int maxAge;

  private LocalTime startTime;
  private LocalTime endTime;

  public Event() {
  }

  public Event(String title, String description, List<String> category, LocalDate date, String location, double price, int minAge, int maxAge, LocalTime startTime, LocalTime endTime) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.date = date;
    this.location = location;
    this.price = price;
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public String getEventID() {
    return eventID;
  }

  public void setEventID(String eventID) {
    this.eventID = eventID;
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

  public List<String> getCategory() {
    return category;
  }

  public void setCategory(List<String> category) {
    this.category = category;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public int getMinAge() {
    return minAge;
  }

  public void setMinAge(int minAge) {
    this.minAge = minAge;
  }

  public int getMaxAge() {
    return maxAge;
  }

  public void setMaxAge(int maxAge) {
    this.maxAge = maxAge;
  }

  public LocalTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
  }

  public LocalTime getEndTime() {
    return endTime;
  }

  public void setEndTime(LocalTime endTime) {
    this.endTime = endTime;
  }

  @Override
  public String toString() {
    return "Event{" +
      "eventID=" + eventID +
      ", title='" + title + '\'' +
      ", description='" + description + '\'' +
      ", category=" + category +
      ", date=" + date +
      ", location='" + location + '\'' +
      ", price=" + price +
      ", minAge=" + minAge +
      ", maxAge=" + maxAge +
      ", startTime=" + startTime +
      ", endTime=" + endTime +
      '}';
  }
}
