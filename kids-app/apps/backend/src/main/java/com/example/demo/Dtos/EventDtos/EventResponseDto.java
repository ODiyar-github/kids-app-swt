package com.example.demo.Dtos.EventDtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class EventResponseDto {
  private Long offerID;
  private String title;
  private String description;
  private List<String> category;
  private LocalDate date;
  private String location;
  private double price;
  private int minAge;
  private int maxAge;
  private LocalTime startTime;
  private LocalTime endTime;
}
