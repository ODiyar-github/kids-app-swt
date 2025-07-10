import { InterestEnum } from "../../util/enums/interest.enum";
import { Point } from "../../util/location.point";
import { EventFeedBackDto } from "./event.feedback.dto";
import { WeatherForecast } from "./event.weather.forecast";

export class EventDTO {
    uuid: string;
    title: string;
    description: string;
    priceList: string;
    address: string;
    location: Point;
    weatherForecasts: WeatherForecast[];
    category: InterestEnum[];
    feedBack: EventFeedBackDto[];
    time: string;
    date: string;
    age: string;
    image: string;
    organisation: string;
    author: string;

    constructor(
        uuid: string,
        title: string,
        description: string,
        priceList: string,
        address: string,
        location: Point,
        weatherForecasts: WeatherForecast[],
        category: InterestEnum[],
        feedBack: EventFeedBackDto[],
        date: string,
        time: string,
        age: string,
        image: string,
        organisation: string,
        author: string,
    ) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.priceList = priceList;
        this.address = address;
        this.location = location;
        this.weatherForecasts = weatherForecasts;
        this.category = category;
        this.feedBack = feedBack;
        this.date = date;
        this.time = time;
        this.age = age;
        this.image = image;
        this.organisation = organisation;
        this.author = author;
    }
}

