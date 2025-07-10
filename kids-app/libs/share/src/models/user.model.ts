import { EventDTO } from "../api/event/event.dto";
import { UserDTO } from "../api/user/user.dto";
import { Logs } from "../util/user.logs";

export class UserModel{
    private userDto: UserDTO;
    constructor(userDto: UserDTO){this.userDto = userDto}
    getUserDto():UserDTO{
        return this.userDto;
    }
    joinEvent(event: EventDTO){
        this.userDto.bookedEventIds.push(event.uuid);
        this.userDto.eventHistoryIds.push(event.uuid);
        this.userDto.logs.push(new Logs(this.userDto.firstName, new Date().toISOString(), event.uuid, `${this.userDto.firstName} ist der Veranstaltung ${event.title} beigetreten.`));
    }
    eventFinished(event: EventDTO) {
        this.userDto.bookedEventIds = this.userDto.bookedEventIds.filter(
          id => id !== event.uuid
        );
        this.userDto.logs.push(
          new Logs(this.userDto.firstName,new Date().toISOString(), event.uuid, `Event abgeschlossen: ${event.title}`)
        );
    }
    getViewedEvent(): string[]{
      return this.userDto.eventHistoryIds;
    }
    private getLogsSortedDesc(): Logs[] {
      return [...this.userDto.logs].sort((a, b) => {
          // Konvertiere die ISO-Strings in Date-Objekte für den Vergleich
          const dateA = new Date(a.date); // a.date ist der String
          const dateB = new Date(b.date); // b.date ist der String
          return dateB.getTime() - dateA.getTime(); // Vergleiche die Zeitstempel
      });
  }
  getCommunityNews(userModels: UserModel[]): Logs[] {
    return userModels
      .flatMap(user => user.getLogsSortedDesc()) // getLogsSortedDesc liefert bereits sortierte Logs
      .sort((a, b) => {
          // Auch hier die Strings in Date-Objekte umwandeln, bevor verglichen wird
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime(); // Sortiert absteigend
      });
}
getEventRecommendations(allEvents: EventDTO[]): EventDTO[] {
  if (!this.userDto?.interests?.length) return [];

  const bookedOrVisited = new Set([
    ...(this.userDto.bookedEventIds ?? []),
    ...(this.userDto.eventHistoryIds ?? [])
  ]);

  const userInterests = this.userDto.interests.map(i => i.toLowerCase());

  return allEvents
    .filter(event => {
      const matchesInterest = event.category?.some(cat =>
        userInterests.includes(cat.toLowerCase())
      );
      const isNew = !bookedOrVisited.has(event.uuid);
      return matchesInterest && isNew;
    })
    .map(event => ({
      ...event,
      matchCount: event.category.filter(cat =>
        userInterests.includes(cat.toLowerCase())
      ).length
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ matchCount, ...event }) => event);
}
}