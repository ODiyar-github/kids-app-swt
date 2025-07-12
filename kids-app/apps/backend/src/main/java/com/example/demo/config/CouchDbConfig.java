package com.example.demo.config;

import org.lightcouch.CouchDbClient;
import org.lightcouch.CouchDbProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @file CouchDbConfig.java
 * @description Konfigurationsklasse für die CouchDB-Datenbankverbindung.
 * Diese Klasse definiert Spring Beans für `CouchDbProperties` und `CouchDbClient`,
 * die für die Interaktion mit einer CouchDB-Instanz benötigt werden.
 * Die Konfiguration erfolgt über Werte, die aus den `application.properties` injiziert werden.
 */

/**
 * @class CouchDbConfig
 * @description Markiert diese Klasse als Spring-Konfigurationsklasse.
 * Sie ist für die Bereitstellung von Beans zuständig, die die
 * Verbindung zur CouchDB-Datenbank herstellen.
 */
@Configuration
public class CouchDbConfig {

    /**
     * @method couchDbProperties
     * @description Definiert einen Bean für die `CouchDbProperties`.
     * Diese Methode injiziert Konfigurationswerte aus den `application.properties`
     * und verwendet sie, um ein `CouchDbProperties`-Objekt zu konfigurieren.
     * @param {String} protocol - Das Protokoll (z.B. "http") für die CouchDB-Verbindung.
     * @param {String} host - Der Hostname oder die IP-Adresse des CouchDB-Servers.
     * @param {int} port - Der Port des CouchDB-Servers.
     * @param {String} username - Der Benutzername für die CouchDB-Authentifizierung.
     * @param {String} password - Das Passwort für die CouchDB-Authentifizierung.
     * @param {String} dbName - Der Name der zu verwendenden CouchDB-Datenbank.
     * @returns {CouchDbProperties} Ein konfiguriertes `CouchDbProperties`-Objekt.
     */
    @Bean
    public CouchDbProperties couchDbProperties(
            @Value("${couchdb.protocol}") String protocol,
            @Value("${couchdb.host}") String host,
            @Value("${couchdb.port}") int port,
            @Value("${couchdb.username}") String username,
            @Value("${couchdb.password}") String password,
            @Value("${couchdb.database}") String dbName) {

        CouchDbProperties properties = new CouchDbProperties();
        properties.setDbName(dbName); // Setzt den Datenbanknamen.
        properties.setHost(host);     // Setzt den Host.
        properties.setPort(port);     // Setzt den Port.
        properties.setProtocol(protocol); // Setzt das Protokoll.
        properties.setUsername(username); // Setzt den Benutzernamen.
        properties.setPassword(password); // Setzt das Passwort.
        properties.setCreateDbIfNotExist(true); // Stellt sicher, dass die Datenbank erstellt wird, falls sie nicht existiert.
        properties.setConnectionTimeout(0); // Setzt das Verbindungs-Timeout auf unendlich (0).
        properties.setSocketTimeout(0);     // Setzt das Socket-Timeout auf unendlich (0).
        return properties;
    }

    /**
     * @method couchDbClient
     * @description Definiert einen Bean für den `CouchDbClient`.
     * Diese Methode verwendet das zuvor definierte `CouchDbProperties`-Bean,
     * um eine Instanz des `CouchDbClient` zu erstellen, die für die tatsächliche
     * Datenbankkommunikation verwendet wird.
     * @param {CouchDbProperties} properties - Die injizierten CouchDB-Eigenschaften.
     * @returns {CouchDbClient} Eine Instanz des `CouchDbClient`.
     */
    @Bean
    public CouchDbClient couchDbClient(CouchDbProperties properties) {
        return new CouchDbClient(properties);
    }
}
