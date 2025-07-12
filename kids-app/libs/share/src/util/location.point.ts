/**
 * @class Point
 * @description Repräsentiert einen geografischen Punkt mit Breitengrad (Latitude) und Längengrad (Longitude).
 * Wird verwendet, um Standorte oder Positionen zu definieren.
 */
export class Point {
    /**
     * @property {number} lat - Der Breitengrad des Punktes.
     */
    lat: number;

    /**
     * @property {number} lng - Der Längengrad des Punktes.
     */
    lng: number;

    /**
     * Erstellt eine Instanz von Point.
     * @param {number} lat - Der Breitengrad des Punktes.
     * @param {number} lng - Der Längengrad des Punktes.
     */
    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }
}
