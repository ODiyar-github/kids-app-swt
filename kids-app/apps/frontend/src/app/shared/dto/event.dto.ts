    export class EventDTO {
    uuid: string;
    title: string;
    desc: string;
    location: string;
    time: string;
    date: string;
    age: string;
    titleURL: string; 
    image: string;

    constructor(uuid: string, title:string, titleURL: string, desc: string, location:string, date:string, time:string, age: string, image:string) {
        this.uuid = uuid;
        this.title = title;
        this.desc = desc;
        this.location = location;
        this.time = time;
        this.date = date;
        this.age = age;
        if(titleURL === "") {
            console.log("leerer string");
            this.titleURL = title.replace(/ /g,"_");
            this.titleURL = "test"
        } else {
            this.titleURL = titleURL;
        }
        this.image = image;
    }
}