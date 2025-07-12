package com.example.demo.share.dataObjects.util;

/**
 * @file Point.java
 * @description Diese Klasse repräsentiert ein geografisches Punktkoordinatenpaar
 * mit Breitengrad (latitude) und Längengrad (longitude).
 * Sie wird verwendet, um Standorte auf einer Karte oder in geografischen Daten zu definieren.
 */

/**
 * @class Point
 * @description POJO (Plain Old Java Object) zur Speicherung von geografischen Koordinaten.
 * Es verwendet `double` für die Koordinaten, um eine höhere Genauigkeit zu gewährleisten.
 */
public class Point {
    /**
     * @private
     * @property {double} lat - Der Breitengrad (Latitude) des Punktes.
     */
    private double lat; // Verwende double für Geokoordinaten für höhere Genauigkeit
    /**
     * @private
     * @property {double} lng - Der Längengrad (Longitude) des Punktes.
     */
    private double lng;

    /**
     * @constructor
     * @description Standardkonstruktor für die `Point`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Koordinaten.
     */
    public Point() {} // Standardkonstruktor

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `Point` mit angegebenen Koordinaten.
     * @param {double} lat - Der Breitengrad des Punktes.
     * @param {double} lng - Der Längengrad des Punktes.
     */
    public Point(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    // Getter und Setter

    /**
     * @method getLat
     * @description Gibt den Breitengrad des Punktes zurück.
     * @returns {double} Der Breitengrad.
     */
    public double getLat() { return lat; }

    /**
     * @method setLat
     * @description Setzt den Breitengrad des Punktes.
     * @param {double} lat - Der neue Breitengrad.
     */
    public void setLat(double lat) { this.lat = lat; }

    /**
     * @method getLng
     * @description Gibt den Längengrad des Punktes zurück.
     * @returns {double} Der Längengrad.
     */
    public double getLng() { return lng; }

    /**
     * @method setLng
     * @description Setzt den Längengrad des Punktes.
     * @param {double} lng - Der neue Längengrad.
     */
    public void setLng(double lng) { this.lng = lng; }
}
