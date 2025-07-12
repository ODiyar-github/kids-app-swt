import { InterestEnum } from "../../util/enums/interest.enum";
import { Point } from "../../util/location.point";
import { EventFeedBackDto } from "./event.feedback.dto";
import { WeatherForecast } from "./event.weather.forecast";

/**
 * @class EventDTO
 * @description Datenübertragungsobjekt (DTO) zur Repräsentation eines Events.
 * Enthält alle relevanten Informationen über ein Event, wie Titel, Beschreibung, Ort, Zeit und Feedback.
 */
export class EventDTO {
    /**
     * @property {string} uuid - Die eindeutige Kennung des Events.
     */
    uuid: string;

    /**
     * @property {string} title - Der Titel des Events.
     */
    title: string;

    /**
     * @property {string} description - Eine detaillierte Beschreibung des Events.
     */
    description: string;

    /**
     * @property {string} priceList - Informationen zur Preisgestaltung oder Preisliste des Events.
     */
    priceList: string;

    /**
     * @property {string} address - Die physische Adresse des Event-Ortes.
     */
    address: string;

    /**
     * @property {Point} location - Die geografischen Koordinaten des Event-Ortes.
     */
    location: Point;

    /**
     * @property {WeatherForecast[]} weatherForecasts - Eine Liste von Wettervorhersagen für das Event.
     */
    weatherForecasts: WeatherForecast[];

    /**
     * @property {InterestEnum[]} category - Eine Liste von Kategorien oder Interessen, zu denen das Event gehört.
     */
    category: InterestEnum[];

    /**
     * @property {EventFeedBackDto[]} feedBack - Eine Liste von Feedback-Objekten für das Event.
     */
    feedBack: EventFeedBackDto[];

    /**
     * @property {string} time - Die Startzeit des Events im String-Format.
     */
    time: string;

    /**
     * @property {string} date - Das Startdatum des Events im String-Format.
     */
    date: string;

    /**
     * @property {string} age - Altersbeschränkungen oder empfohlene Altersgruppe für das Event.
     */
    age: string;

    /**
     * @property {string} image - URL oder Pfad zu einem Bild, das das Event repräsentiert.
     */
    image: string;

    /**
     * @property {string} organisation - Der Name der Organisation, die das Event veranstaltet.
     */
    organisation: string;

    /**
     * @property {string} author - Der Autor oder Ersteller des Event-Eintrags.
     */
    author: string;

    /**
     * Erstellt eine Instanz von EventDTO.
     * @param {string} uuid - Die eindeutige Kennung des Events.
     * @param {string} title - Der Titel des Events.
     * @param {string} description - Eine detaillierte Beschreibung des Events.
     * @param {string} priceList - Informationen zur Preisgestaltung oder Preisliste des Events.
     * @param {string} address - Die physische Adresse des Event-Ortes.
     * @param {Point} location - Die geografischen Koordinaten des Event-Ortes.
     * @param {WeatherForecast[]} weatherForecasts - Eine Liste von Wettervorhersagen für das Event.
     * @param {InterestEnum[]} category - Eine Liste von Kategorien oder Interessen, zu denen das Event gehört.
     * @param {EventFeedBackDto[]} feedBack - Eine Liste von Feedback-Objekten für das Event.
     * @param {string} date - Das Startdatum des Events im String-Format.
     * @param {string} time - Die Startzeit des Events im String-Format.
     * @param {string} age - Altersbeschränkungen oder empfohlene Altersgruppe für das Event.
     * @param {string} image - URL oder Pfad zu einem Bild, das das Event repräsentiert.
     * @param {string} organisation - Der Name der Organisation, die das Event veranstaltet.
     * @param {string} author - Der Autor oder Ersteller des Event-Eintrags.
     */
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
