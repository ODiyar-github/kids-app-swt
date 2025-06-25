package com.example.demo.StorageService;

public interface IStorage {

  ProjectDataDTO find(ProjectDataDTO entity);
  void update(ProjectDataDTO entity);
}
