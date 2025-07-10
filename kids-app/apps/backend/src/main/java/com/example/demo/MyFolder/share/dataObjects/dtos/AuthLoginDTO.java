package com.example.demo.MyFolder.share.dataObjects.dtos;

public class AuthLoginDTO {
    private String username;
    private String password; // Für Mock-Zwecke/Interne Nutzung im JsonData. In Prod: NIEMALS Klartext!
    private UserDTO user; // Der vollständige UserDTO, wenn der Login erfolgreich ist

    // Standard-Konstruktor für Deserialisierung (wird von Jackson/Spring verwendet)
    public AuthLoginDTO() {}

    // Konstruktor zum Erstellen eines Login-Payloads (z.B. vom BFF an das Backend gesendet)
    public AuthLoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Konstruktor zum Speichern im JsonData (enthält alle Informationen, inkl. zugeordnetem UserDTO)
    public AuthLoginDTO(String username, String password, UserDTO user) {
        this.username = username;
        this.password = password;
        this.user = user;
    }

    // --- Getter ---
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public UserDTO getUser() {
        return user;
    }

    // --- Setter ---
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    // HINWEIS: Die Methoden isUser() und getUser(username, password) wurden entfernt.
    // Ihre Logik gehört in den LoginUserHandler!
}
