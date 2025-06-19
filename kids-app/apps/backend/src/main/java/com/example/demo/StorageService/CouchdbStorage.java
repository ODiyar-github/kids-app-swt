package com.example.demo.StorageService;

import org.lightcouch.CouchDbClient;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class CouchdbStorage<T> implements IStorage<T> {

  private final CouchDbClient couchDbClient;

  public  CouchdbStorage(CouchDbClient couchDbClient) {
    this.couchDbClient = couchDbClient;
  }

  @Override
  public String save(T entity) {
    return couchDbClient.save(entity).getId();
  }

  @Override
  public T find(String id, Class<T> clazz) {
    return couchDbClient.find(clazz, id);
  }

  @Override
  public void update(T entity) {
    couchDbClient.update(entity);
  }

  @Override
  public void delete(T entity) {
    couchDbClient.remove(entity);
  }

  @Override
  public List<T> findAll(Class<T> clazz) {
    return couchDbClient.view("_all_docs")
      .includeDocs(true)
      .query(clazz);
  }
}
