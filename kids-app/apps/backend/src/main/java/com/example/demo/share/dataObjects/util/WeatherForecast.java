package com.example.demo.share.dataObjects.util;

/**
 * @file WeatherForecast.java
 * @description Diese Klasse repräsentiert ein Datenobjekt für eine Wettervorhersage.
 * Sie enthält Informationen über den Tag, ein zugehöriges Icon, die minimale und maximale Temperatur.
 */

/**
 * @class WeatherForecast
 * @description POJO (Plain Old Java Object) zur Speicherung von Wettervorhersagedaten.
 * Es enthält Felder für den Tag der Vorhersage, ein Icon zur Darstellung des Wetters,
 * die minimale und die maximale Temperatur.
 */
public class WeatherForecast {
    /**
     * @private
     * @property {String} day - Der Tag der Wettervorhersage (z.B. "Montag", "Heute").
     */
    private String day;
    /**
     * @private
     * @property {String} icon - Der Name des Icons, das das Wetter visuell darstellt (z.B. "wb_sunny", "cloudy").
     */
    private String icon;
    /**
     * @private
     * @property {int} min - Die minimale Temperatur für den vorhergesagten Tag.
     */
    private int min;
    /**
     * @private
     * @property {int} max - Die maximale Temperatur für den vorhergesagten Tag.
     */
    private int max;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `WeatherForecast`.
     * @param {String} day - Der Tag der Wettervorhersage.
     * @param {String} icon - Der Name des Wetter-Icons.
     * @param {int} min - Die minimale Temperatur.
     * @param {int} max - Die maximale Temperatur.
     */
    public WeatherForecast(String day, String icon, int min, int max) {
        this.day = day;
        this.icon = icon;
        this.min = min;
        this.max = max;
    }

    /**
     * @method setDay
     * @description Setzt den Tag der Wettervorhersage.
     * @param {String} day - Der neue Tag.
     */
    public void setDay(String day) {
        this.day = day;
    }

    /**
     * @method setIcon
     * @description Setzt den Namen des Wetter-Icons.
     * @param {String} icon - Der neue Icon-Name.
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

    /**
     * @method setMin
     * @description Setzt die minimale Temperatur.
     * @param {int} min - Die neue minimale Temperatur.
     */
    public void setMin(int min) {
        this.min = min;
    }

    /**
     * @method setMax
     * @description Setzt die maximale Temperatur.
     * @param {int} max - Die neue maximale Temperatur.
     */
    public void setMax(int max) {
        this.max = max;
    }

    /**
     * @method getDay
     * @description Gibt den Tag der Wettervorhersage zurück.
     * @returns {String} Der Tag.
     */
    public String getDay() {
        return this.day;
    }

    /**
     * @method getIcon
     * @description Gibt den Namen des Wetter-Icons zurück.
     * @returns {String} Der Icon-Name.
     */
    public String getIcon() {
        return this.icon;
    }

    /**
     * @method getMin
     * @description Gibt die minimale Temperatur zurück.
     * @returns {int} Die minimale Temperatur.
     */
    public int getMin() {
        return this.min;
    }

    /**
     * @method getMax
     * @description Gibt die maximale Temperatur zurück.
     * @returns {int} Die maximale Temperatur.
     */
    public int getMax() {
        return this.max;
    }

}
