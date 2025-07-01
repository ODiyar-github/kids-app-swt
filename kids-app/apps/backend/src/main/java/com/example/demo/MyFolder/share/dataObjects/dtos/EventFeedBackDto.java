package com.example.demo.MyFolder.share.dataObjects.dtos;

import com.example.demo.MyFolder.share.dataObjects.enums.RatingEnum;

public class EventFeedBackDto {
    private String userId;
    private String userName;
    private RatingEnum rating;
    private String message;

    public EventFeedBackDto() {}
    // Getter und Setter
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public RatingEnum getRating() { return rating; }
    public void setRating(RatingEnum rating) { this.rating = rating; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
