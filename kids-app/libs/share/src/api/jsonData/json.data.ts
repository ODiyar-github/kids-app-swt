import { AppFeedback } from "../../util/app.feedback";
import { EventDTO } from "../event/event.dto";
import { AuthLoginDTO } from "../user/auth.login.dto";
export class JsonData{
    _id: string;
    _rev: string;
    userData: AuthLoginDTO[];
    eventData: EventDTO[];
    feedBackAppData: AppFeedback[];
    constructor(
        _id: string,
        _rev: string,
        userData: AuthLoginDTO[],
        eventData: EventDTO[],
        feedBackAppData: AppFeedback[]
    ){
        this._id = _id;
        this._rev = _rev;
        this.userData = userData;
        this.eventData = eventData;
        this.feedBackAppData = feedBackAppData;
    }
}