export class Logs{
    name: string;
    date: string;
    joinedEventId: string;
    message: string;
    constructor(
        name: string,
        date: string,
        joinedEventId: string,
        message: string,
    ){
        this.name = name;
        this.date = date;
        this.joinedEventId = joinedEventId;
        this.message = message;
    }
}