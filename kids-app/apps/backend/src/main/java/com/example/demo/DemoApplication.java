package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @file DemoApplication.java
 * @description Dies ist die Hauptklasse der Spring Boot Anwendung.
 * Sie dient als Einstiegspunkt für die Ausführung der Anwendung.
 */

/**
 * @class DemoApplication
 * @description Die Hauptklasse der Spring Boot Anwendung.
 * Die Annotation `@SpringBootApplication` ist eine Komfort-Annotation, die:
 * - `@Configuration`: Markiert die Klasse als Konfigurationsklasse für Spring Beans.
 * - `@EnableAutoConfiguration`: Aktiviert die automatische Konfiguration von Spring Boot,
 * die versucht, die Anwendung basierend auf den hinzugefügten JAR-Abhängigkeiten zu konfigurieren.
 * - `@ComponentScan`: Scannt das aktuelle Paket nach Komponenten, Konfigurationen und Diensten.
 */
@SpringBootApplication
public class DemoApplication {

    /**
     * @method main
     * @description Die Hauptmethode, die beim Starten der Java-Anwendung aufgerufen wird.
     * Sie verwendet `SpringApplication.run()` zum Bootstrappen und Starten der Spring Boot Anwendung.
     * @param {String[]} args - Kommandozeilenargumente, die an die Anwendung übergeben werden.
     */
    public static void main(String[] args) {
        // Startet die Spring Boot Anwendung.
        // `DemoApplication.class` gibt die Hauptkonfigurationsklasse an.
        // `args` werden an die SpringApplication übergeben.
        SpringApplication.run(DemoApplication.class, args);
    }

}
