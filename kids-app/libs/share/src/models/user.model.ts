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
        this.userDto.logs.push(new Logs(this.userDto.firstName, new Date(), event.uuid, `${this.userDto.firstName} ist der Veranstaltung ${event.title} beigetreten.`));
    }
    eventFinished(event: EventDTO) {
        this.userDto.bookedEventIds = this.userDto.bookedEventIds.filter(
          id => id !== event.uuid
        );
        this.userDto.logs.push(
          new Logs(this.userDto.firstName,new Date(), event.uuid, `Event abgeschlossen: ${event.title}`)
        );
    }
    getViewedEvent(): string[]{
      return this.userDto.eventHistoryIds;
    }
    private getLogsSortedDesc(): Logs[] {
        return [...this.userDto.logs].sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    getCommunityNews(userModels: UserModel[]): Logs[] {
        return userModels
          .flatMap(user => user.getLogsSortedDesc())
          .sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    getEventRecommendations(allEvents: EventDTO[]): EventDTO[] {
      if (!this.userDto?.interests?.length) {
        return []; 
      }
    
      const bookedOrVisited = new Set([
        ...(this.userDto.bookedEventIds ?? []),
        ...(this.userDto.eventHistoryIds ?? [])
      ]);
    
      return allEvents
        .filter(event => {
          const matchesInterest = event.category?.some(cat =>
            this.userDto.interests.includes(cat)
          );
          const isNew = !bookedOrVisited.has(event.uuid);
          return matchesInterest && isNew;
        })
        .map(event => ({
          ...event,
          matchCount: event.category.filter(cat =>
            this.userDto.interests.includes(cat)
          ).length
        }))
        .sort((a, b) => b.matchCount - a.matchCount)
        .map(({ matchCount, ...event }) => event); 
    }
}