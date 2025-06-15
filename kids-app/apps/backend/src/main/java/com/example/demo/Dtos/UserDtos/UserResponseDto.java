package com.example.demo.Dtos.UserDtos;

import java.util.List;

public class UserResponseDto {
  public String userId;
  public String email;
  public String firstName;
  public String lastName;
  public int age;
  public String gender;
  public String address;
  public List<String> friendIds;
  public List<String> eventHistoryIds;
  public List<String> bookedEventIds;
  public List<String> interests;
}
