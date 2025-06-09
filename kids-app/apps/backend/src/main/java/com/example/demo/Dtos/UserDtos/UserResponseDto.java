package com.example.demo.Dtos.UserDtos;

import java.util.List;

public class UserResponseDto {
  public Long userId;
  public String email;
  public String firstName;
  public String lastName;
  public int age;
  public String gender;
  public String address;
  public List<Long> friendIds;
  public List<Long> eventHistoryIds;
  public List<Long> bookedEventIds;
  public List<String> interests;
}
