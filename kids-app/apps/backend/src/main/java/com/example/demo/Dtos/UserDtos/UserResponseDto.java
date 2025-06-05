package com.example.demo.Dtos.UserDtos;

import java.util.List;

public class UserResponseDto {
  private Long userId;
  private String email;
  private String firstName;
  private String lastName;
  private int age;
  private String gender;
  private String address;
  private List<Long> friendIds;
  private List<Long> eventHistoryIds;
  private List<Long> bookedEventIds;
  private List<String> interests;
}
