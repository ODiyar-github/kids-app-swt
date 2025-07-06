export class WeatherForecast{
    day: string;
    icon: string;
    min: number;
    max: number;
    constructor(
        day: string,
        icon: string,
        min: number,
        max: number
    ){
        this.day = day;
        this.icon = icon;
        this.min = min;
        this.max = max;
    }
}