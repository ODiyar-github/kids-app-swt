import { Logs } from "../../util/user.logs";
import { GenderEnum } from "../../util/enums/gender.enum";
import { InterestEnum } from "../../util/enums/interest.enum";

/**
 * @class UserDTO
 * @description Datenübertragungsobjekt (DTO) zur Repräsentation eines Benutzers.
 * Enthält detaillierte Informationen über den Benutzer, seine Präferenzen, Aktivitäten und Beziehungen.
 */
export class UserDTO {
  /**
   * @property {string} userId - Die eindeutige Kennung des Benutzers.
   */
  userId: string;

  /**
   * @property {string} email - Die E-Mail-Adresse des Benutzers.
   */
  email: string;

  /**
   * @property {string} firstName - Der Vorname des Benutzers.
   */
  firstName: string;

  /**
   * @property {string} lastName - Der Nachname des Benutzers.
   */
  lastName: string;

  /**
   * @property {number} age - Das Alter des Benutzers.
   */
  age: number;

  /**
   * @property {GenderEnum} gender - Das Geschlecht des Benutzers, ausgedrückt durch den GenderEnum.
   */
  gender: GenderEnum;

  /**
   * @property {string} address - Die Adresse des Benutzers.
   */
  address: string;

  /**
   * @property {string[]} friendIds - Eine Liste von IDs der Freunde des Benutzers.
   */
  friendIds: string[];

  /**
   * @property {string[]} eventHistoryIds - Eine Liste von IDs der Events, die der Benutzer besucht hat.
   */
  eventHistoryIds: string[];

  /**
   * @property {string[]} bookedEventIds - Eine Liste von IDs der Events, die der Benutzer gebucht hat.
   */
  bookedEventIds: string[];

  /**
   * @property {InterestEnum[]} interests - Eine Liste von Interessen des Benutzers, ausgedrückt durch den InterestEnum.
   */
  interests: InterestEnum[];

  /**
   * @property {Logs[]} logs - Eine Liste von Log-Einträgen des Benutzers.
   */
  logs: Logs[];

  /**
   * Erstellt eine Instanz von UserDTO.
   * @param {string} userId - Die eindeutige Kennung des Benutzers.
   * @param {string} email - Die E-Mail-Adresse des Benutzers.
   * @param {string} firstName - Der Vorname des Benutzers.
   * @param {string} lastName - Der Nachname des Benutzers.
   * @param {number} age - Das Alter des Benutzers.
   * @param {GenderEnum} gender - Das Geschlecht des Benutzers.
   * @param {string} address - Die Adresse des Benutzers.
   * @param {string[]} friendIds - Eine Liste von IDs der Freunde des Benutzers.
   * @param {string[]} eventHistoryIds - Eine Liste von IDs der Events, die der Benutzer besucht hat.
   * @param {string[]} bookedEventIds - Eine Liste von IDs der Events, die der Benutzer gebucht hat.
   * @param {InterestEnum[]} interests - Eine Liste von Interessen des Benutzers.
   * @param {Logs[]} logs - Eine Liste von Log-Einträgen des Benutzers.
   */
  constructor(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: GenderEnum,
    address: string,
    friendIds: string[],
    eventHistoryIds: string[],
    bookedEventIds: string[],
    interests: InterestEnum[],
    logs: Logs[]
  ) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.address = address;
    this.friendIds = friendIds;
    this.eventHistoryIds = eventHistoryIds;
    this.bookedEventIds = bookedEventIds;
    this.interests = interests;
    this.logs = logs;
  }
}
