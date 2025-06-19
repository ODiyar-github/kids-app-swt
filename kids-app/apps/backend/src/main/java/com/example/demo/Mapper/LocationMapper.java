package com.example.demo.Mapper;

import com.example.demo.Dtos.LocationDtos.LocationCreateDto;
import com.example.demo.Dtos.LocationDtos.LocationResponseDto;
import com.example.demo.Dtos.LocationDtos.LocationUpdateDto;
import com.example.demo.entity.Location;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {
  LocationCreateDto toLocationCreateDto (Location location);
  LocationResponseDto toLocationResponseDto(Location location);
  LocationUpdateDto toLocationUpdateDto(Location location);
}
