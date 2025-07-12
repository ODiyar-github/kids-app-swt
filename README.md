# **Kids App: Eine Community-Plattform für Events**

## **📚 Projektübersicht**

Die Kids App ist eine umfassende Community-Plattform, die speziell für Kinder und Jugendliche entwickelt wurde, um lokale Veranstaltungen und Aktivitäten zu entdecken, sich mit Freunden zu vernetzen und Feedback zu teilen. Die Anwendung ist modular aufgebaut und nutzt eine moderne Microservices-Architektur, um Skalierbarkeit und Wartbarkeit zu gewährleisten.

## **✨ Funktionen**

* **Event-Entdeckung:** Durchsuchen und finden Sie lokale Veranstaltungen basierend auf Interessen, Alter und Standort.  
* **Event-Details:** Detaillierte Informationen zu jeder Veranstaltung, einschließlich Beschreibung, Preis, Adresse, Wettervorhersage und Feedback.  
* **Benutzerprofile:** Verwalten Sie persönliche Profile, Interessen und Event-Historien.  
* **Community-Feed:** Bleiben Sie mit Freunden in Kontakt und sehen Sie deren Aktivitäten und Event-Teilnahmen.  
* **Event-Empfehlungen:** Erhalten Sie personalisierte Event-Vorschläge basierend auf Ihren Interessen.  
* **Feedback-System:** Geben Sie Feedback zu Veranstaltungen und der App selbst ab.  
* **Anmeldung/Registrierung:** Sichere Benutzerauthentifizierung.

## **🏗️ Architektur**

Die Kids App folgt einer Microservices-Architektur, die aus mehreren unabhängigen Diensten besteht, die über einen Nachrichtenbroker kommunizieren.

* **Frontend (Angular):** Die Benutzeroberfläche der Anwendung, die im Browser läuft.  
* **BFF (Backend-for-Frontend, NestJS):** Ein Gateway-Dienst, der als Vermittler zwischen dem Frontend und dem Backend fungiert. Er aggregiert und transformiert Daten, um die spezifischen Anforderungen des Frontends zu erfüllen.  
* **Backend (Spring Boot):** Der Haupt-Backend-Dienst, der die Geschäftslogik implementiert und mit der Datenbank interagiert.  
* **RabbitMQ:** Ein robuster Nachrichtenbroker, der die asynchrone Kommunikation zwischen den Microservices ermöglicht.  
* **CouchDB:** Eine NoSQL-Datenbank, die für die Speicherung aller Anwendungsdaten verwendet wird.

## **💻 Technologien**

**Frontend (Angular):**

* **Framework:** Angular  
* **Sprache:** TypeScript  
* **UI-Bibliothek:** Angular Material

**BFF (NestJS):**

* **Framework:** NestJS  
* **Sprache:** TypeScript  
* **Messaging:** @nestjs/microservices (RabbitMQ-Transport)  
* **API-Dokumentation:** Swagger

**Backend (Spring Boot):**

* **Framework:** Spring Boot  
* **Sprache:** Java  
* **Datenbank-Client:** LightCouch (für CouchDB)  
* **JSON-Verarbeitung:** Jackson, Gson  
* **Messaging:** Spring AMQP (für RabbitMQ)

**Infrastruktur:**

* **Nachrichtenbroker:** RabbitMQ  
* **Datenbank:** Apache CouchDB  
* **Containerisierung:** Docker, Docker Compose

## **🚀 Einrichtung und Start**

Um das Projekt lokal auszuführen, benötigen Sie Docker und Docker Compose.

1. **Repository klonen:**  
   git clone \<Ihr-Repository-URL\>  
   cd kids-app

2. Umgebungsvariablen konfigurieren:  
   Erstellen Sie eine .env-Datei im Root-Verzeichnis des Projekts und füllen Sie diese mit den erforderlichen Umgebungsvariablen. Eine Beispielkonfiguration finden Sie in der env-documentation.  
   \# \=== RabbitMQ Konfiguration \===  
   BROKER\_URI="amqp://guest:guest@rabbitmq:5672"  
   AMQP\_QUEUE\_PREFIX="kidsapp-dev-"

   \# \=== CouchDB Konfiguration \===  
   COUCHDB\_PROTOCOL=http  
   COUCHDB\_HOST=localhost  
   COUCHDB\_PORT=5984  
   COUCHDB\_USERNAME=admin  
   COUCHDB\_PASSWORD=admin  
   COUCHDB\_DATABASE=mydb  
   CLEAR\_DB\_ON\_START=true

3. Anwendung starten:  
   Navigieren Sie zum Root-Verzeichnis des Projekts (wo sich die docker-compose.yaml befindet) und führen Sie den folgenden Befehl aus:  
   docker-compose up \--build

   Dieser Befehl baut alle Docker-Images und startet die Dienste in der richtigen Reihenfolge.  
4. **Zugriff auf die Anwendung:**  
   * **Frontend:** http://localhost:8080  
   * **BFF (API-Gateway):** http://localhost:3000/api (Swagger-Dokumentation unter http://localhost:3000/api)  
   * **RabbitMQ Management UI:** http://localhost:15672 (Anmeldedaten: guest/guest)  
   * **CouchDB Fauxton UI:** http://localhost:5984/\_utils/ (Anmeldedaten: admin/admin)

## **⚙️ Konfiguration**

Die Konfiguration der Dienste erfolgt hauptsächlich über Umgebungsvariablen, die in der .env-Datei definiert werden. Diese werden dann von Docker Compose in die jeweiligen Container injiziert.

* **BROKER\_URI**: Die vollständige Verbindungs-URI für den RabbitMQ-Broker.  
* **AMQP\_QUEUE\_PREFIX**: Ein Präfix, das allen RabbitMQ-Warteschlangennamen vorangestellt wird, um Namenskonflikte zu vermeiden.  
* **COUCHDB\_PROTOCOL**, **COUCHDB\_HOST**, **COUCHDB\_PORT**, **COUCHDB\_USERNAME**, **COUCHDB\_PASSWORD**, **COUCHDB\_DATABASE**: Konfigurationsdetails für die CouchDB-Verbindung.  
* **CLEAR\_DB\_ON\_START**: Ein Flag, das steuert, ob die CouchDB-Datenbank beim Start der Anwendung geleert wird (nützlich für die Entwicklung).

## **🗺️ API Endpunkte (BFF)**

Der BFF-Dienst stellt die Haupt-API für das Frontend bereit. Die vollständige Swagger-Dokumentation ist unter http://localhost:3000/api verfügbar.

Einige wichtige Endpunkte sind:

* **/user/login**: Benutzeranmeldung.  
* **/user/:id**: Abrufen von Benutzerinformationen nach ID.  
* **/user/all**: Abrufen aller Benutzer.  
* **/user (PUT)**: Aktualisieren von Benutzerinformationen.  
* **/event**: Abrufen aller Events.  
* **/event/:id**: Abrufen eines einzelnen Events nach ID.  
* **/feedback (GET)**: Abrufen aller App-Feedbacks.  
* **/feedback (POST)**: Neues App-Feedback erstellen.  
* **/sendData**: Initialisiert Mock-Daten in der Datenbank (nur für Entwicklungszwecke).

## **📂 Projektstruktur (Auszug)**

.  
├── apps/  
│   ├── backend/             \# Spring Boot Anwendung  
│   ├── bff/                 \# NestJS Backend-for-Frontend  
│   └── frontend/            \# Angular Frontend  
├── docker/                  \# Dockerfiles für Angular und NestJS  
├── .env.example             \# Beispiel für Umgebungsvariablen  
├── docker-compose.yaml      \# Docker Compose Konfiguration  
└── README.md                \# Dieses Dokument

## **🤝 Mitwirken**

Beiträge sind herzlich willkommen\! Wenn Sie Fehler finden oder Verbesserungen vorschlagen möchten, öffnen Sie bitte ein Issue oder reichen Sie einen Pull Request ein.

## **📄 Lizenz**

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der LICENSE-Datei im Root-Verzeichnis.