
import { Component } from '@angular/core';
import { CommunityService } from '../../shared/services/community.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EventDTO} from '@kids-app/share'
@Component({
  standalone:true,
  selector: 'app-community-component',
  templateUrl: './communityPage.component.html',
  styleUrl: './communityPage.component.css',
  imports: [
    HttpClientModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
],
  providers: [
    CommunityService
  ],
})
export class CommunityComponent  {
  eventList: EventDTO[] = [];
  isLoading = true;
}
