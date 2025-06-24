import { RatingEnum } from "../../util/enums/rating.enum";

export class EventFeedBackDto{
    userId: string;
    userName: string;
    rating: RatingEnum;
    message: string;
    constructor(
        userId: string,
        userName: string,
        rating: RatingEnum,
        message: string
    ){
        this.userId = userId;
        this.userName = userName;
        this.rating = rating;
        this.message = message;
    }
}