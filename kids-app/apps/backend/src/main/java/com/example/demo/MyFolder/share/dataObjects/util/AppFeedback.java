package com.example.demo.MyFolder.share.dataObjects.util;

import com.example.demo.MyFolder.share.dataObjects.enums.AppFeedbackEnum;

public class AppFeedback {
    private String feedbackId;
    private String userId;
    private AppFeedbackEnum rating;
    private String comment;
    private String timestamp;

    public AppFeedback() {
    }

    // Getter und Setter
    public String getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(String feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public AppFeedbackEnum getRating() {
        return rating;
    }

    public void setRating(AppFeedbackEnum rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
