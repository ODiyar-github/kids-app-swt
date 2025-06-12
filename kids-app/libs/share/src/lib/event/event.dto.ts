export class EventDTO {
    uuid: string;
    title: string;
    desc: string;
    location: string;
    time: string;
    date: string;
    age: string;
    image: string;

    constructor(uuid: string, title:string, titleURL: string, desc: string, location:string, date:string, time:string, age: string, image:string) {
        this.uuid = uuid;
        this.title = title;
        this.desc = desc;
        this.location = location;
        this.time = time;
        this.date = date;
        this.age = age;
        this.image = image;
    }
}