import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './layout/toolbar.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ RouterModule, ToolbarComponent],
})
export class AppComponent {
}
