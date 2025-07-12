import { EventDTO } from "../api/event/event.dto";
import { UserDTO } from "../api/user/user.dto";
import { Logs } from "../util/user.logs";

/**
 * @class UserModel
 * @description Repräsentiert das Modell eines Benutzers, das Geschäftslogik und Operationen
 * im Zusammenhang mit Benutzerdaten kapselt. Es interagiert mit dem UserDTO, um Daten zu verwalten.
 */
export class UserModel {
    /**
     * @private
     * @property {UserDTO} userDto - Das Datenübertragungsobjekt (DTO), das die rohen Benutzerdaten enthält.
     */
    private userDto: UserDTO;

    /**
     * Erstellt eine Instanz des UserModel.
     * @param {UserDTO} userDto - Das UserDTO-Objekt, das die initialen Benutzerdaten enthält.
     */
    constructor(userDto: UserDTO) {
        this.userDto = userDto;
    }

    /**
     * Gibt das zugrunde liegende UserDTO-Objekt zurück.
     * @returns {UserDTO} Das UserDTO-Objekt dieses Benutzermodells.
     */
    getUserDto(): UserDTO {
        return this.userDto;
    }

    /**
     * Fügt ein Event zur Liste der gebuchten und besuchten Events des Benutzers hinzu
     * und erstellt einen entsprechenden Log-Eintrag.
     * @param {EventDTO} event - Das Event, dem der Benutzer beigetreten ist.
     */
    joinEvent(event: EventDTO) {
        this.userDto.bookedEventIds.push(event.uuid);
        this.userDto.eventHistoryIds.push(event.uuid);
        this.userDto.logs.push(new Logs(this.userDto.firstName, new Date().toISOString(), event.uuid, `${this.userDto.firstName} ist der Veranstaltung ${event.title} beigetreten.`));
    }

    /**
     * Markiert ein Event als abgeschlossen, indem es aus der Liste der gebuchten Events entfernt
     * und ein Log-Eintrag über den Abschluss erstellt wird.
     * @param {EventDTO} event - Das Event, das abgeschlossen wurde.
     */
    eventFinished(event: EventDTO) {
        this.userDto.bookedEventIds = this.userDto.bookedEventIds.filter(
          id => id !== event.uuid
        );
        this.userDto.logs.push(
          new Logs(this.userDto.firstName, new Date().toISOString(), event.uuid, `Event abgeschlossen: ${event.title}`)
        );
    }

    /**
     * Gibt eine Liste der UUIDs von Events zurück, die der Benutzer in der Vergangenheit angesehen oder besucht hat.
     * @returns {string[]} Ein Array von Event-UUIDs, die der Benutzer angesehen hat.
     */
    getViewedEvent(): string[] {
      return this.userDto.eventHistoryIds;
    }

    /**
     * @private
     * @description Gibt eine Kopie der Benutzer-Logs zurück, sortiert nach Datum in absteigender Reihenfolge (neueste zuerst).
     * @returns {Logs[]} Ein Array von Log-Objekten, absteigend nach Datum sortiert.
     */
    private getLogsSortedDesc(): Logs[] {
      return [...this.userDto.logs].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
      });
    }

    /**
     * Sammelt und sortiert alle Log-Einträge aus einer Liste von UserModels,
     * um einen Feed von Community-Nachrichten zu erstellen.
     * @param {UserModel[]} userModels - Ein Array von UserModel-Instanzen, deren Logs gesammelt werden sollen.
     * @returns {Logs[]} Ein Array aller gesammelten Log-Objekte, absteigend nach Datum sortiert.
     */
    getCommunityNews(userModels: UserModel[]): Logs[] {
        return userModels
          .flatMap(user => user.getLogsSortedDesc())
          .sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB.getTime() - dateA.getTime();
          });
    }

    /**
     * Generiert Event-Empfehlungen basierend auf den Interessen des Benutzers und schließt
     * bereits gebuchte oder besuchte Events aus. Die Empfehlungen werden nach der Anzahl
     * der übereinstimmenden Interessen sortiert.
     * @param {EventDTO[]} allEvents - Eine Liste aller verfügbaren Events.
     * @returns {EventDTO[]} Ein Array von empfohlenen EventDTOs, sortiert nach Relevanz.
     */
    getEventRecommendations(allEvents: EventDTO[]): EventDTO[] {
      // Wenn der Benutzer keine Interessen hat, werden keine Empfehlungen gegeben.
      if (!this.userDto?.interests?.length) return [];

      // Erstellt ein Set aus gebuchten und besuchten Event-UUIDs für schnelle Lookups.
      const bookedOrVisited = new Set([
        ...(this.userDto.bookedEventIds ?? []),
        ...(this.userDto.eventHistoryIds ?? [])
      ]);

      // Konvertiert die Interessen des Benutzers in Kleinbuchstaben für den Vergleich.
      const userInterests = this.userDto.interests.map(i => i.toLowerCase());

      // Filtert und verarbeitet alle Events, um Empfehlungen zu generieren.
      return allEvents
        .filter(event => {
          // Prüft, ob das Event mindestens eine Kategorie hat, die den Interessen des Benutzers entspricht.
          const matchesInterest = event.category?.some(cat =>
            userInterests.includes(cat.toLowerCase())
          );
          // Prüft, ob das Event noch nicht gebucht oder besucht wurde.
          const isNew = !bookedOrVisited.has(event.uuid);
          return matchesInterest && isNew; // Nur Events, die Interessen entsprechen und neu sind.
        })
        .map(event => ({
          ...event,
          // Fügt eine temporäre Eigenschaft 'matchCount' hinzu, um die Anzahl der übereinstimmenden Interessen zu zählen.
          matchCount: event.category.filter(cat =>
            userInterests.includes(cat.toLowerCase())
          ).length
        }))
        // Sortiert die Events absteigend nach der Anzahl der übereinstimmenden Interessen.
        .sort((a, b) => b.matchCount - a.matchCount)
        // Entfernt die temporäre 'matchCount'-Eigenschaft, bevor die finalen EventDTOs zurückgegeben werden.
        .map(({ matchCount, ...event }) => event);
    }
}
