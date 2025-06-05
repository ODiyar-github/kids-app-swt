package com.example.demo.Model;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Organiser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String email;
  private String name;
  private String phoneNumber;
  private String address;

  @OneToMany
  private List<Event> offers;

  public Organiser() {
  }

  public Organiser(String email, String name, String phoneNumber, String address, List<Event> offers) {
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.offers = offers;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public List<Event> getOffers() {
    return offers;
  }

  public void setOffers(List<Event> offers) {
    this.offers = offers;
  }

  @Override
  public String toString() {
    return "Organiser{" +
      "id=" + id +
      ", email='" + email + '\'' +
      ", name='" + name + '\'' +
      ", phoneNumber='" + phoneNumber + '\'' +
      ", address='" + address + '\'' +
      ", offers=" + offers +
      '}';
  }
}
