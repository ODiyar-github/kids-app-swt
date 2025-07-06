import { InterestEnum } from "../../util/enums/interest.enum";
import { Point } from "../../util/location.point";
import { Appointment } from "./event.appointment";
import { EventFeedBackDto } from "./event.feedback.dto";
import { WeatherForecast } from "./event.weather.forecast";

export class EventDTO {
    uuid: string;
    title: string;
    description: string;
    priceList: string;
    address: string;
    location: Point;
    weatherForecast: WeatherForecast[];
    category: InterestEnum[];
    feedBack: EventFeedBackDto[];
    appointments: Appointment[];
    time: string;
    date: string;
    age: string;
    image: string;
    organization: string;
    author: string;

    constructor(
        uuid: string,
        title: string,
        description: string,
        priceList: string,
        address: string,
        location: Point,
        weatherForecast: WeatherForecast[],
        category: InterestEnum[],
        feedBack: EventFeedBackDto[],
        appointments: Appointment[],
        date: string,
        time: string,
        age: string,
        image: string,
        organization: string,
        author: string,
    ) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.priceList = priceList;
        this.address = address;
        this.location = location;
        this.weatherForecast = weatherForecast;
        this.category = category;
        this.feedBack = feedBack;
        this.appointments = appointments;
        this.date = date;
        this.time = time;
        this.age = age;
        this.image = image;
        this.organization = organization;
        this.author = author;
    }
}

export { Appointment, EventFeedBackDto, Point, WeatherForecast };
