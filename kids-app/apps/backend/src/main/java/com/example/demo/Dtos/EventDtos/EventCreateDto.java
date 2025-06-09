package com.example.demo.Dtos.EventDtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class EventCreateDto {
  public String title;
  public String description;
  public List<String> category;
  public LocalDate date;
  public String location;
  public double price;
  public int minAge;
  public int maxAge;
  public LocalTime startTime;
  public LocalTime endTime;
}
