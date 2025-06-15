package com.example.demo.Mapper;

import com.example.demo.Dtos.UserDtos.UserCreateDto;
import com.example.demo.Dtos.UserDtos.UserResponseDto;
import com.example.demo.Dtos.UserDtos.UserUpdateDto;
import com.example.demo.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserCreateDto toUserCreateDto (User user);
  UserResponseDto toUserResponseDto(User user);
  UserUpdateDto toUserUpdateDto(User user);
}
