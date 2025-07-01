package com.example.demo.MyFolder.share.dataObjects.dtos;

import java.util.List;

import com.example.demo.MyFolder.share.dataObjects.util.AppFeedback;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonData {
    @JsonProperty("_id")
    private String _id;
    @JsonProperty("_rev")
    private String _rev;
    private List<UserDTO> userData;
    private List<EventDTO> eventData;
    private List<AppFeedback> feedBackAppData;

    public JsonData() {
    }

    // Getter und Setter
    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_rev() {
        return _rev;
    }

    public void set_rev(String _rev) {
        this._rev = _rev;
    }

    public List<UserDTO> getUserData() {
        return userData;
    }

    public void setUserData(List<UserDTO> userData) {
        this.userData = userData;
    }

    public List<EventDTO> getEventData() {
        return eventData;
    }

    public void setEventData(List<EventDTO> eventData) {
        this.eventData = eventData;
    }

    public List<AppFeedback> getFeedBackAppData() {
        return feedBackAppData;
    }

    public void setFeedBackAppData(List<AppFeedback> feedBackAppData) {
        this.feedBackAppData = feedBackAppData;
    }
}