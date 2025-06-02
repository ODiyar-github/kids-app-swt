
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
@Component({
  standalone: true,
  selector: 'app-startseite-component',
  templateUrl: './startPage.component.html',
  styleUrl: './startPage.component.css',
  imports: [MatGridListModule, MatListModule],
})
export class StartPageComponent {
  readonly path = 'startseite';
}
