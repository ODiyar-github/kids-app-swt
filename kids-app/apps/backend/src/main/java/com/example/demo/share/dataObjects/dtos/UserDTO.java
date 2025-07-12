package com.example.demo.share.dataObjects.dtos;

import java.util.List;

import com.example.demo.share.dataObjects.enums.GenderEnum;
import com.example.demo.share.dataObjects.enums.InterestEnum;
import com.example.demo.share.dataObjects.util.Logs;

/**
 * @file UserDTO.java
 * @description Diese Klasse repräsentiert ein Datenübertragungsobjekt (DTO) für Benutzerinformationen.
 * Sie wird verwendet, um Benutzerdaten zwischen verschiedenen Schichten der Anwendung
 * oder zwischen Frontend und Backend zu übertragen.
 */

/**
 * @class UserDTO
 * @description POJO (Plain Old Java Object) zur Speicherung von Benutzerdaten.
 * Es enthält Felder für persönliche Informationen, soziale Verbindungen (Freunde),
 * Event-Historie, gebuchte Events, Interessen und Log-Einträge.
 */
public class UserDTO {
    /**
     * @private
     * @property {String} userId - Die eindeutige ID des Benutzers.
     */
    private String userId;
    /**
     * @private
     * @property {String} email - Die E-Mail-Adresse des Benutzers.
     */
    private String email;
    /**
     * @private
     * @property {String} firstName - Der Vorname des Benutzers.
     */
    private String firstName;
    /**
     * @private
     * @property {String} lastName - Der Nachname des Benutzers.
     */
    private String lastName;
    /**
     * @private
     * @property {int} age - Das Alter des Benutzers.
     */
    private int age;
    /**
     * @private
     * @property {GenderEnum} gender - Das Geschlecht des Benutzers, definiert durch `GenderEnum`.
     */
    private GenderEnum gender;
    /**
     * @private
     * @property {String} address - Die Adresse des Benutzers.
     */
    private String address;
    /**
     * @private
     * @property {List<String>} friendIds - Eine Liste von IDs der Freunde dieses Benutzers.
     */
    private List<String> friendIds;
    /**
     * @private
     * @property {List<String>} eventHistoryIds - Eine Liste von IDs der Events, die der Benutzer besucht hat.
     */
    private List<String> eventHistoryIds;
    /**
     * @private
     * @property {List<String>} bookedEventIds - Eine Liste von IDs der Events, die der Benutzer gebucht hat.
     */
    private List<String> bookedEventIds;
    /**
     * @private
     * @property {List<InterestEnum>} interests - Eine Liste der Interessen des Benutzers, definiert durch `InterestEnum`.
     */
    private List<InterestEnum> interests;
    /**
     * @private
     * @property {List<Logs>} logs - Eine Liste von Log-Einträgen, die Aktivitäten des Benutzers protokollieren.
     */
    private List<Logs> logs;

    /**
     * @constructor
     * @description Standardkonstruktor für die `UserDTO`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Werte.
     */
    public UserDTO() {
    }

    /**
     * @method getUserId
     * @description Gibt die eindeutige Benutzer-ID zurück.
     * @returns {String} Die Benutzer-ID.
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @method setUserId
     * @description Setzt die eindeutige Benutzer-ID.
     * @param {String} userId - Die neue Benutzer-ID.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * @method getEmail
     * @description Gibt die E-Mail-Adresse des Benutzers zurück.
     * @returns {String} Die E-Mail-Adresse.
     */
    public String getEmail() {
        return email;
    }

    /**
     * @method setEmail
     * @description Setzt die E-Mail-Adresse des Benutzers.
     * @param {String} email - Die neue E-Mail-Adresse.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @method getFirstName
     * @description Gibt den Vornamen des Benutzers zurück.
     * @returns {String} Der Vorname.
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @method setFirstName
     * @description Setzt den Vornamen des Benutzers.
     * @param {String} firstName - Der neue Vorname.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @method getLastName
     * @description Gibt den Nachnamen des Benutzers zurück.
     * @returns {String} Der Nachname.
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @method setLastName
     * @description Setzt den Nachnamen des Benutzers.
     * @param {String} lastName - Der neue Nachname.
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @method getAge
     * @description Gibt das Alter des Benutzers zurück.
     * @returns {int} Das Alter.
     */
    public int getAge() {
        return age;
    }

    /**
     * @method setAge
     * @description Setzt das Alter des Benutzers.
     * @param {int} age - Das neue Alter.
     */
    public void setAge(int age) {
        this.age = age;
    }

    /**
     * @method getGender
     * @description Gibt das Geschlecht des Benutzers zurück.
     * @returns {GenderEnum} Das Geschlecht.
     */
    public GenderEnum getGender() {
        return gender;
    }

    /**
     * @method setGender
     * @description Setzt das Geschlecht des Benutzers.
     * @param {GenderEnum} gender - Das neue Geschlecht.
     */
    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    /**
     * @method getAddress
     * @description Gibt die Adresse des Benutzers zurück.
     * @returns {String} Die Adresse.
     */
    public String getAddress() {
        return address;
    }

    /**
     * @method setAddress
     * @description Setzt die Adresse des Benutzers.
     * @param {String} address - Die neue Adresse.
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @method getFriendIds
     * @description Gibt die Liste der Freund-IDs des Benutzers zurück.
     * @returns {List<String>} Die Liste der Freund-IDs.
     */
    public List<String> getFriendIds() {
        return friendIds;
    }

    /**
     * @method setFriendIds
     * @description Setzt die Liste der Freund-IDs des Benutzers.
     * @param {List<String>} friendIds - Die neue Liste der Freund-IDs.
     */
    public void setFriendIds(List<String> friendIds) {
        this.friendIds = friendIds;
    }

    /**
     * @method getEventHistoryIds
     * @description Gibt die Liste der Event-Historie-IDs des Benutzers zurück.
     * @returns {List<String>} Die Liste der Event-Historie-IDs.
     */
    public List<String> getEventHistoryIds() {
        return eventHistoryIds;
    }

    /**
     * @method setEventHistoryIds
     * @description Setzt die Liste der Event-Historie-IDs des Benutzers.
     * @param {List<String>} eventHistoryIds - Die neue Liste der Event-Historie-IDs.
     */
    public void setEventHistoryIds(List<String> eventHistoryIds) {
        this.eventHistoryIds = eventHistoryIds;
    }

    /**
     * @method getBookedEventIds
     * @description Gibt die Liste der gebuchten Event-IDs des Benutzers zurück.
     * @returns {List<String>} Die Liste der gebuchten Event-IDs.
     */
    public List<String> getBookedEventIds() {
        return bookedEventIds;
    }

    /**
     * @method setBookedEventIds
     * @description Setzt die Liste der gebuchten Event-IDs des Benutzers.
     * @param {List<String>} bookedEventIds - Die neue Liste der gebuchten Event-IDs.
     */
    public void setBookedEventIds(List<String> bookedEventIds) {
        this.bookedEventIds = bookedEventIds;
    }

    /**
     * @method getInterests
     * @description Gibt die Liste der Interessen des Benutzers zurück.
     * @returns {List<InterestEnum>} Die Liste der Interessen.
     */
    public List<InterestEnum> getInterests() {
        return interests;
    }

    /**
     * @method setInterests
     * @description Setzt die Liste der Interessen des Benutzers.
     * @param {List<InterestEnum>} interests - Die neue Liste der Interessen.
     */
    public void setInterests(List<InterestEnum> interests) {
        this.interests = interests;
    }

    /**
     * @method getLogs
     * @description Gibt die Liste der Log-Einträge des Benutzers zurück.
     * @returns {List<Logs>} Die Liste der Log-Einträge.
     */
    public List<Logs> getLogs() {
        return logs;
    }

    /**
     * @method setLogs
     * @description Setzt die Liste der Log-Einträge des Benutzers.
     * @param {List<Logs>} logs - Die neue Liste der Log-Einträge.
     */
    public void setLogs(List<Logs> logs) {
        this.logs = logs;
    }
}
