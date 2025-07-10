package com.example.demo.MyFolder.share.dataObjects.dtos;

import java.util.List;

import com.example.demo.MyFolder.share.dataObjects.enums.InterestEnum;
import com.example.demo.MyFolder.share.dataObjects.util.Point;
import com.example.demo.MyFolder.share.dataObjects.util.WeatherForecast;

public class EventDTO {
    private String uuid;
    private String title;
    private String description;
    private String priceList;
    private String address;
    private Point location;
    private List<WeatherForecast> weatherForecasts;
    private List<InterestEnum> category;
    private List<EventFeedBackDto> feedBack;
    private String time;
    private String date;
    private String age;
    private String image;
    private String organisation;
    private String author;

    public EventDTO() {
    }

    // Getter und Setter

    public String getOrganisation() {
        return this.organisation;
    }

    public void setOrganisation(String organisation) {
        this.organisation = organisation;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<WeatherForecast> getWeatherForecasts() {
        return this.weatherForecasts;
    }

    public void setWeatherforecast(List<WeatherForecast> weatherForecast) {
        this.weatherForecasts = weatherForecast;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriceList() {
        return priceList;
    }

    public void setPriceList(String priceList) {
        this.priceList = priceList;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public List<InterestEnum> getCategory() {
        return category;
    }

    public void setCategory(List<InterestEnum> category) {
        this.category = category;
    }

    public List<EventFeedBackDto> getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(List<EventFeedBackDto> feedBack) {
        this.feedBack = feedBack;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
