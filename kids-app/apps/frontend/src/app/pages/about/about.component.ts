import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatCardModule, 
    MatAccordion, 
    MatExpansionModule,
  ],
})
export class AboutComponent {

}
