
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  imports: [RouterModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatMenuModule, MatTabsModule, MatButtonModule],
  selector: 'app-head-toolbar-component',
  standalone: true,
  templateUrl: './headToolbar.component.html',
  styleUrl: './headToolbar.component.css',
})
export class HeadToolbarComponent {

  URL_HOME: string = "/";

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
