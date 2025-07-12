package com.example.demo.share.util;

import org.springframework.stereotype.Component;

import com.example.demo.share.dataObjects.dtos.JsonData;

/**
 * @file SingleDataPacketHolder.java
 * @description Diese Klasse dient als Singleton-Container zum Halten eines einzelnen `JsonData`-Objekts.
 * Sie ist nützlich, um Daten, die nur einmal geladen oder konfiguriert werden müssen,
 * global in der Anwendung verfügbar zu machen.
 */

/**
 * @class SingleDataPacketHolder
 * @description Spring Component, die ein `JsonData`-Objekt thread-sicher speichert.
 * Die Annotation `@Component` markiert diese Klasse als eine Spring-Komponente,
 * die vom Spring IoC-Container verwaltet wird.
 */
@Component
public class SingleDataPacketHolder {
    /**
     * @private
     * @property {JsonData} jsonData - Das `JsonData`-Objekt, das von dieser Komponente gehalten wird.
     */
    private JsonData jsonData;

    /**
     * @method setJsonData
     * @description Setzt das `JsonData`-Objekt. Die Methode ist `synchronized`,
     * um Thread-Sicherheit beim Schreiben der Daten zu gewährleisten.
     * @param {JsonData} jsonData - Das zu speichernde `JsonData`-Objekt.
     */
    public synchronized void setJsonData(JsonData jsonData) {
        this.jsonData = jsonData;
    }

    /**
     * @method getData
     * @description Ruft das gespeicherte `JsonData`-Objekt ab. Die Methode ist `synchronized`,
     * um Thread-Sicherheit beim Lesen der Daten zu gewährleisten.
     * @returns {JsonData} Das gespeicherte `JsonData`-Objekt oder `null`, wenn keine Daten gesetzt sind.
     */
    public synchronized JsonData getData() {
        if (jsonData != null) {
            return this.jsonData;
        }
        return null;
    }
}
