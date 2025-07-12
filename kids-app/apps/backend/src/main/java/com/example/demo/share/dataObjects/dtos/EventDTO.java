package com.example.demo.share.dataObjects.dtos;

import java.util.List;

import com.example.demo.share.dataObjects.enums.InterestEnum;
import com.example.demo.share.dataObjects.util.Point;
import com.example.demo.share.dataObjects.util.WeatherForecast;

/**
 * @file EventDTO.java
 * @description Diese Klasse repräsentiert ein Datenübertragungsobjekt (DTO) für Event-Informationen.
 * Sie wird verwendet, um Event-Details zwischen verschiedenen Schichten der Anwendung
 * oder zwischen Frontend und Backend zu übertragen.
 */

/**
 * @class EventDTO
 * @description POJO (Plain Old Java Object) zur Speicherung von Event-Daten.
 * Es enthält Felder für grundlegende Event-Informationen, Standort, Wettervorhersage,
 * Kategorien, Feedback, Zeitplanung und Bildreferenzen.
 */
public class EventDTO {
    /**
     * @private
     * @property {String} uuid - Die eindeutige ID des Events.
     */
    private String uuid;
    /**
     * @private
     * @property {String} title - Der Titel des Events.
     */
    private String title;
    /**
     * @private
     * @property {String} description - Eine detaillierte Beschreibung des Events.
     */
    private String description;
    /**
     * @private
     * @property {String} priceList - Informationen zur Preisliste oder den Kosten des Events.
     */
    private String priceList;
    /**
     * @private
     * @property {String} address - Die physische Adresse des Event-Standorts.
     */
    private String address;
    /**
     * @private
     * @property {Point} location - Die geografischen Koordinaten des Event-Standorts.
     */
    private Point location;
    /**
     * @private
     * @property {List<WeatherForecast>} weatherForecasts - Eine Liste von Wettervorhersagen für das Event.
     */
    private List<WeatherForecast> weatherForecasts;
    /**
     * @private
     * @property {List<InterestEnum>} category - Eine Liste von Kategorien oder Interessen, die das Event beschreiben.
     */
    private List<InterestEnum> category;
    /**
     * @private
     * @property {List<EventFeedBackDto>} feedBack - Eine Liste von Feedback-Einträgen für das Event.
     */
    private List<EventFeedBackDto> feedBack;
    /**
     * @private
     * @property {String} time - Die Uhrzeit des Events (im String-Format).
     */
    private String time;
    /**
     * @private
     * @property {String} date - Das Datum des Events (im String-Format).
     */
    private String date;
    /**
     * @private
     * @property {String} age - Altersbeschränkungen oder Empfehlungen für das Event.
     */
    private String age;
    /**
     * @private
     * @property {String} image - Eine URL oder Referenz zu einem Bild des Events.
     */
    private String image;
    /**
     * @private
     * @property {String} organisation - Der Name der Organisation, die das Event veranstaltet.
     */
    private String organisation;
    /**
     * @private
     * @property {String} author - Der Autor oder Ersteller des Event-Eintrags.
     */
    private String author;

    /**
     * @constructor
     * @description Standardkonstruktor für die `EventDTO`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Werte.
     */
    public EventDTO() {
    }

    // Getter und Setter

    /**
     * @method getOrganisation
     * @description Gibt den Namen der Organisation zurück, die das Event veranstaltet.
     * @returns {String} Der Organisationsname.
     */
    public String getOrganisation() {
        return this.organisation;
    }

    /**
     * @method setOrganisation
     * @description Setzt den Namen der Organisation, die das Event veranstaltet.
     * @param {String} organisation - Der neue Organisationsname.
     */
    public void setOrganisation(String organisation) {
        this.organisation = organisation;
    }

    /**
     * @method getAuthor
     * @description Gibt den Autor oder Ersteller des Event-Eintrags zurück.
     * @returns {String} Der Autor.
     */
    public String getAuthor() {
        return this.author;
    }

    /**
     * @method setAuthor
     * @description Setzt den Autor oder Ersteller des Event-Eintrags.
     * @param {String} author - Der neue Autor.
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * @method getWeatherForecasts
     * @description Gibt die Liste der Wettervorhersagen für das Event zurück.
     * @returns {List<WeatherForecast>} Die Liste der Wettervorhersagen.
     */
    public List<WeatherForecast> getWeatherForecasts() {
        return this.weatherForecasts;
    }

    /**
     * @method setWeatherforecast
     * @description Setzt die Liste der Wettervorhersagen für das Event.
     * @param {List<WeatherForecast>} weatherForecast - Die neue Liste der Wettervorhersagen.
     */
    public void setWeatherforecast(List<WeatherForecast> weatherForecast) {
        this.weatherForecasts = weatherForecast;
    }

    /**
     * @method getUuid
     * @description Gibt die eindeutige ID des Events zurück.
     * @returns {String} Die Event-ID.
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * @method setUuid
     * @description Setzt die eindeutige ID des Events.
     * @param {String} uuid - Die neue Event-ID.
     */
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    /**
     * @method getTitle
     * @description Gibt den Titel des Events zurück.
     * @returns {String} Der Titel.
     */
    public String getTitle() {
        return title;
    }

    /**
     * @method setTitle
     * @description Setzt den Titel des Events.
     * @param {String} title - Der neue Titel.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @method getDescription
     * @description Gibt die Beschreibung des Events zurück.
     * @returns {String} Die Beschreibung.
     */
    public String getDescription() {
        return description;
    }

    /**
     * @method setDescription
     * @description Setzt die Beschreibung des Events.
     * @param {String} description - Die neue Beschreibung.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @method getPriceList
     * @description Gibt die Preisliste oder Kosteninformationen des Events zurück.
     * @returns {String} Die Preisliste.
     */
    public String getPriceList() {
        return priceList;
    }

    /**
     * @method setPriceList
     * @description Setzt die Preisliste oder Kosteninformationen des Events.
     * @param {String} priceList - Die neue Preisliste.
     */
    public void setPriceList(String priceList) {
        this.priceList = priceList;
    }

    /**
     * @method getAddress
     * @description Gibt die Adresse des Event-Standorts zurück.
     * @returns {String} Die Adresse.
     */
    public String getAddress() {
        return address;
    }

    /**
     * @method setAddress
     * @description Setzt die Adresse des Event-Standorts.
     * @param {String} address - Die neue Adresse.
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @method getLocation
     * @description Gibt die geografischen Koordinaten des Event-Standorts zurück.
     * @returns {Point} Die Standortkoordinaten.
     */
    public Point getLocation() {
        return location;
    }

    /**
     * @method setLocation
     * @description Setzt die geografischen Koordinaten des Event-Standorts.
     * @param {Point} location - Die neuen Standortkoordinaten.
     */
    public void setLocation(Point location) {
        this.location = location;
    }

    /**
     * @method getCategory
     * @description Gibt die Liste der Kategorien oder Interessen des Events zurück.
     * @returns {List<InterestEnum>} Die Liste der Kategorien.
     */
    public List<InterestEnum> getCategory() {
        return category;
    }

    /**
     * @method setCategory
     * @description Setzt die Liste der Kategorien oder Interessen des Events.
     * @param {List<InterestEnum>} category - Die neue Liste der Kategorien.
     */
    public void setCategory(List<InterestEnum> category) {
        this.category = category;
    }

    /**
     * @method getFeedBack
     * @description Gibt die Liste der Feedback-Einträge für das Event zurück.
     * @returns {List<EventFeedBackDto>} Die Liste der Feedback-Einträge.
     */
    public List<EventFeedBackDto> getFeedBack() {
        return feedBack;
    }

    /**
     * @method setFeedBack
     * @description Setzt die Liste der Feedback-Einträge für das Event.
     * @param {List<EventFeedBackDto>} feedBack - Die neue Liste der Feedback-Einträge.
     */
    public void setFeedBack(List<EventFeedBackDto> feedBack) {
        this.feedBack = feedBack;
    }

    /**
     * @method getTime
     * @description Gibt die Uhrzeit des Events zurück.
     * @returns {String} Die Uhrzeit.
     */
    public String getTime() {
        return time;
    }

    /**
     * @method setTime
     * @description Setzt die Uhrzeit des Events.
     * @param {String} time - Die neue Uhrzeit.
     */
    public void setTime(String time) {
        this.time = time;
    }

    /**
     * @method getDate
     * @description Gibt das Datum des Events zurück.
     * @returns {String} Das Datum.
     */
    public String getDate() {
        return date;
    }

    /**
     * @method setDate
     * @description Setzt das Datum des Events.
     * @param {String} date - Das neue Datum.
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * @method getAge
     * @description Gibt die Altersbeschränkungen oder Empfehlungen für das Event zurück.
     * @returns {String} Die Altersangabe.
     */
    public String getAge() {
        return age;
    }

    /**
     * @method setAge
     * @description Setzt die Altersbeschränkungen oder Empfehlungen für das Event.
     * @param {String} age - Die neue Altersangabe.
     */
    public void setAge(String age) {
        this.age = age;
    }

    /**
     * @method getImage
     * @description Gibt die URL oder Referenz zu einem Bild des Events zurück.
     * @returns {String} Die Bild-URL/Referenz.
     */
    public String getImage() {
        return image;
    }

    /**
     * @method setImage
     * @description Setzt die URL oder Referenz zu einem Bild des Events.
     * @param {String} image - Die neue Bild-URL/Referenz.
     */
    public void setImage(String image) {
        this.image = image;
    }
}
