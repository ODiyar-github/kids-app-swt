export class Logs{
    date: Date;
    joinedEventId: string;
    message: string;
    constructor(
        date: Date,
        joinedEventId: string,
        message: string,
    ){
        this.date = date;
        this.joinedEventId = joinedEventId;
        this.message = message;
    }
}