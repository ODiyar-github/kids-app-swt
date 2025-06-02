
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { EventPreviewComponent } from '../eventPreview/eventPreview.component';
import { EventMockups } from '../shared/consts/eventPreviewList'

@Component({
  standalone: true,
  selector: 'app-eventPreviewList-component',
  templateUrl: './eventPreviewList.component.html',
  styleUrl: './eventPreviewList.component.css',
  imports: [
    NgForOf,
    EventPreviewComponent
  ],
})
export class EventPreviewListComponent {

  events = EventMockups;

  constructor(private router: Router) {}

  getEventByName(titleURL: string) {
    return this.events.find(event => event.titleURL === titleURL);
  }

  onEventPreviewClick(titleURL: string) {
    console.log(titleURL);
    this.router.navigate(['/angebote', titleURL]);
  }
}
