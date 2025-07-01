package com.example.demo.MyFolder.share.dataObjects.util;

public class Point {
    private double lat; // Verwende double für Geokoordinaten für höhere Genauigkeit
    private double lng;

    public Point() {} // Standardkonstruktor
    public Point(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    // Getter und Setter
    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }
    public double getLng() { return lng; }
    public void setLng(double lng) { this.lng = lng; }
}
