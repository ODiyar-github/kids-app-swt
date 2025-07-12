import { UserDTO } from "./user.dto";

/**
 * @class AuthLoginDTO
 * @description Datenübertragungsobjekt (DTO) zur Repräsentation von Anmeldeinformationen und zugehörigen Benutzerdaten.
 * Wird typischerweise für Authentifizierungszwecke verwendet, um Benutzername, Passwort und die Benutzerdetails zu kapseln.
 */
export class AuthLoginDTO {
    /**
     * @property {string} username - Der Benutzername für die Anmeldung.
     */
    username: string;

    /**
     * @property {string} password - Das Passwort für die Anmeldung.
     */
    password: string;

    /**
     * @property {UserDTO} user - Ein Objekt, das detaillierte Informationen über den angemeldeten Benutzer enthält.
     */
    user: UserDTO;

    /**
     * Erstellt eine Instanz von AuthLoginDTO.
     * @param {string} username - Der Benutzername.
     * @param {string} password - Das Passwort.
     * @param {UserDTO} user - Das Benutzerdatenobjekt.
     */
    constructor(
        username: string,
        password: string,
        user: UserDTO
    ) {
        this.password = password;
        this.username = username;
        this.user = user;
    }
}
