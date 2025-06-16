package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String userId;

  private String email;
  private String password;
  private String firstName;
  private String lastName;
  private int age;

  @Enumerated(EnumType.STRING)
  private Gender gender;

  private String address;

  @OneToMany
  private List<User> friends;

  @OneToMany
  private List<Event> eventHistory;

  @ManyToMany
  private List<Event> bookedEvents;


  @ElementCollection
  private List<String> interests;

  public User() {
  }

  public User(String email, String password, String firstName, String lastName, int age, Gender gender, String address, List<User> friends, List<Event> eventHistory, List<Event> bookedEvents, List<String> interests) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.address = address;
    this.friends = friends;
    this.eventHistory = eventHistory;
    this.bookedEvents = bookedEvents;
    this.interests = interests;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public List<User> getFriends() {
    return friends;
  }

  public void setFriends(List<User> friends) {
    this.friends = friends;
  }

  public List<Event> getEventHistory() {
    return eventHistory;
  }

  public void setEventHistory(List<Event> eventHistory) {
    this.eventHistory = eventHistory;
  }

  public List<Event> getBookedEvents() {
    return bookedEvents;
  }

  public void setBookedEvents(List<Event> bookedEvents) {
    this.bookedEvents = bookedEvents;
  }

  public List<String> getInterests() {
    return interests;
  }

  public void setInterests(List<String> interests) {
    this.interests = interests;
  }

  @Override
  public String toString() {
    return "User{" +
      "userId=" + userId +
      ", email='" + email + '\'' +
      ", password='" + password + '\'' +
      ", firstName='" + firstName + '\'' +
      ", lastName='" + lastName + '\'' +
      ", age=" + age +
      ", gender=" + gender +
      ", address='" + address + '\'' +
      ", friends=" + friends +
      ", eventHistory=" + eventHistory +
      ", bookedEvents=" + bookedEvents +
      ", interests=" + interests +
      '}';
  }
}
