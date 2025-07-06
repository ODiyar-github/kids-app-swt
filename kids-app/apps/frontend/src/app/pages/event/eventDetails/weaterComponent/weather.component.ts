import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WeatherForecast } from '@kids-app/share';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    CommonModule

  ],
})
export class WeatherComponent {
  @Input() weatherForecast!: WeatherForecast[];
  currentWeath!: WeatherForecast;
  constructor(){
    this.currentWeath = new WeatherForecast('Today', 'wb_sunny', 22, 28);
  }
}