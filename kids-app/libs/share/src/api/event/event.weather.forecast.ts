/**
 * @class WeatherForecast
 * @description Repräsentiert eine Wettervorhersage für einen bestimmten Tag.
 * Enthält Informationen wie den Tag, ein Symbol, die minimale und maximale Temperatur.
 */
export class WeatherForecast {
    /**
     * @property {string} day - Der Tag, für den die Wettervorhersage gilt (z.B. "Montag", "Dienstag").
     */
    day: string;

    /**
     * @property {string} icon - Ein Symbol oder eine Zeichenfolge, die das Wetter visuell darstellt (z.B. "sonnig", "bewölkt").
     */
    icon: string;

    /**
     * @property {number} min - Die vorhergesagte minimale Temperatur für den Tag.
     */
    min: number;

    /**
     * @property {number} max - Die vorhergesagte maximale Temperatur für den Tag.
     */
    max: number;

    /**
     * Erstellt eine Instanz von WeatherForecast.
     * @param {string} day - Der Tag der Wettervorhersage.
     * @param {string} icon - Das Symbol für die Wettervorhersage.
     * @param {number} min - Die minimale Temperatur.
     * @param {number} max - Die maximale Temperatur.
     */
    constructor(
        day: string,
        icon: string,
        min: number,
        max: number
    ) {
        this.day = day;
        this.icon = icon;
        this.min = min;
        this.max = max;
    }
}