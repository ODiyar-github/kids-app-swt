package com.example.demo.MyFolder.share.dataObjects.dtos;

import java.util.List;

import com.example.demo.MyFolder.share.dataObjects.enums.GenderEnum;
import com.example.demo.MyFolder.share.dataObjects.enums.InterestEnum;
import com.example.demo.MyFolder.share.dataObjects.util.Logs;

public class UserDTO {
        private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private int age; // Typ int für age
    private GenderEnum gender;
    private String address;
    private List<String> friendIds;
    private List<String> eventHistoryIds;
    private List<String> bookedEventIds;
    private List<InterestEnum> interests;
    private List<Logs> logs; // List<Logs>

    public UserDTO() {}
    // Getter und Setter
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public GenderEnum getGender() { return gender; }
    public void setGender(GenderEnum gender) { this.gender = gender; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public List<String> getFriendIds() { return friendIds; }
    public void setFriendIds(List<String> friendIds) { this.friendIds = friendIds; }
    public List<String> getEventHistoryIds() { return eventHistoryIds; }
    public void setEventHistoryIds(List<String> eventHistoryIds) { this.eventHistoryIds = eventHistoryIds; }
    public List<String> getBookedEventIds() { return bookedEventIds; }
    public void setBookedEventIds(List<String> bookedEventIds) { this.bookedEventIds = bookedEventIds; }
    public List<InterestEnum> getInterests() { return interests; }
    public void setInterests(List<InterestEnum> interests) { this.interests = interests; }
    public List<Logs> getLogs() { return logs; }
    public void setLogs(List<Logs> logs) { this.logs = logs; }
}
