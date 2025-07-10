package com.example.demo.MyFolder.share.dataObjects.util;

public class WeatherForecast {
    private String day;
    private String icon;
    private int min;
    private int max;

    public WeatherForecast(String day, String icon, int min, int max) {
        this.day = day;
        this.icon = icon;
        this.min = min;
        this.max = max;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public String getDay() {
        return this.day;
    }

    public String getIcon() {
        return this.icon;
    }

    public int getMin() {
        return this.min;
    }

    public int getMax() {
        return this.max;
    }

}