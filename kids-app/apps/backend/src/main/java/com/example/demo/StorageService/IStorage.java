package com.example.demo.StorageService;

import java.util.List;

public interface IStorage<T> {

  /**
   * Save a new document in CouchDB.
   * @param entity The entity to save.
   * @return The generated ID.
   */
  String save(T entity);

  /**
   * Find a document by its ID.
   * @param id The document ID.
   * @param clazz The class type of the document.
   * @return The found document or null.
   */
  T find(String id, Class<T> clazz);

  /**
   * Update an existing document (must include _id and _rev).
   * @param entity The document to update.
   */
  void update(T entity);

  /**
   * Delete a document (must include _id and _rev).
   * @param entity The document to delete.
   */
  void delete(T entity);

  /**
   * Retrieve all documents of the given type.
   * @param clazz The class type.
   * @return List of all documents.
   */
  List<T> findAll(Class<T> clazz);
}
