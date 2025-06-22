import { Component, Input, OnInit } from "@angular/core";
import L from "leaflet";
import { EventDTO } from '@kids-app/share';
@Component({
    standalone: true,
    selector: 'app-map-component',
    templateUrl: './map.component.html',
    styleUrl: './map.component.css',
    imports: [],
  })
  export class MapComponent implements OnInit{
    
    map!: L.Map; 
    @Input() event!: EventDTO; 
    @Input() eventList: EventDTO[] = [];
    ngOnInit(): void {
        this.initMap();
        this.zoomToEvent(this.event.location.lat, this.event.location.lng, 13);
    }

    initMap(){
        this.map = L.map('map').setView([51.5361, 7.2006], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OppenStreetMap</a> contributors'}).addTo(this.map);
    }
    zoomToMain(){
      this.map.setView([51.5361, 7.2006], 6);
    }
    zoomToEvent(lat:number, lng: number, zoom: number | 13){
      this.map.setView([lat,lng],zoom);
      L.marker([lat,lng]).addTo(this.map).bindPopup(`<strong>${this.event.title}</strong>`)
      .openPopup();
    }
    zoomToEventList(){
      for(const event of this.eventList){
        const lat = event.location.lat;
        const lng = event.location.lng;
        L.marker([lat,lng]).addTo(this.map).bindPopup(`<strong>${this.event.title}</strong>`)
        .openPopup();
      }
    }
  }