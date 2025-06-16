package com.example.demo.entity;
import jakarta.persistence.*;

@Entity
public class Location {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String id;

  private String name;
  private String address;
  private String city;
  private String postalCode;
  private double latitude;
  private double longitude;

  public Location() {
  }

  public Location(String name, String address, String city, String postalCode, double latitude, double longitude) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getPostalCode() {
    return postalCode;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }

  public double getLatitude() {
    return latitude;
  }

  public void setLatitude(double latitude) {
    this.latitude = latitude;
  }

  public double getLongitude() {
    return longitude;
  }

  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }

  @Override
  public String toString() {
    return "Location{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", address='" + address + '\'' +
      ", city='" + city + '\'' +
      ", postalCode='" + postalCode + '\'' +
      ", latitude=" + latitude +
      ", longitude=" + longitude +
      '}';
  }
}
