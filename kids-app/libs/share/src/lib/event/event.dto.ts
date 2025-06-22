import { InterestEnum } from "../enums/interest.enum";
import { Point } from "../shared/point";

export class EventDTO {
    uuid: string;
    title: string;
    description: string;
    priceList: string;
    address: string;
    location: Point;
    category: InterestEnum[];
    time: string;
    date: string;
    age: string;
    image: string;

    constructor(uuid: string, title:string, description: string, priceList: string, address:string, location: Point, category: InterestEnum[] , date:string, time:string, age: string, image:string) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.priceList = priceList;
        this.address = address;
        this.location = location;
        this.category = category;
        this.time = time;
        this.date = date;
        this.age = age;
        this.image = image;
    }
}  