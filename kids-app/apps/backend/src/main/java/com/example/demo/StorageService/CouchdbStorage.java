package com.example.demo.StorageService;

import org.lightcouch.CouchDbClient;
import org.lightcouch.Response;
import org.springframework.stereotype.Component;

@Component
public class CouchdbStorage implements IStorage {

  private final CouchDbClient couchDbClient;
  private final Response response;


  /**
   * Konstruktor speichert das zentrale Projektobjekt einmalig.
   */
  public CouchdbStorage(CouchDbClient couchDbClient,ProjectDataDTO entity) {
    this.couchDbClient = couchDbClient;
    this.response = couchDbClient.save(entity);

  }

 @Override
  public ProjectDataDTO find(ProjectDataDTO entity){
    return couchDbClient.find(ProjectDataDTO.class, this.response.getId());
  }

  /**
   * Aktualisiert das zentrale Projektobjekt.
   */
  @Override
  public void update(ProjectDataDTO entity) {
    couchDbClient.update(entity);

  }
}
