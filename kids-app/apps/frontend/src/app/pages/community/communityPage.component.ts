
import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EventDTO, Logs, UserDTO,  UserModel} from '@kids-app/share'
import { LoginService } from '../../shared/services/login.service';
import { EventPreviewComponent } from '../dashboard/eventPreview/eventPreview.component';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { filter, forkJoin, lastValueFrom, map, Observable, of, Subscription } from 'rxjs';
import { EventService } from '../../shared/services/event.service';
@Component({
  standalone:true,
  selector: 'app-community-component',
  templateUrl: './communityPage.component.html',
  styleUrl: './communityPage.component.css',
  imports: [
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    EventPreviewComponent
],
  providers: [
    UserService,
    EventService
  ],
})
export class CommunityComponent implements OnInit, OnDestroy{
  routingEnum = RoutingEnum;

  user?: UserDTO;
  userModel!: UserModel;
  friendModels: UserModel[] = [];
  userNews: Logs[] = [];
  recommendations: EventDTO[] = [];
  isLoading = true;

  private subscription = new Subscription();

  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/', this.routingEnum.LOGIN], {
        queryParams: { redirect: this.routingEnum.COMMUNITY }
      });
      return;
    }

    this.userModel = new UserModel(this.user);

    forkJoin([
      this.loadFriendModels(),
      this.eventService.getEventList()
    ]).subscribe({
      next: ([friends, allEvents]) => {
        this.friendModels = friends;
        this.userNews = this.userModel.getCommunityNews(friends);
        this.recommendations = this.userModel.getEventRecommendations(allEvents);
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('USER: ',this.user);
        console.log('FRIENDMODEL: ', this.friendModels);
        console.log('USERNEWS: ', this.userNews);
        console.log('RECOMMENDATION', this.recommendations);
      },
      error: err => {
        console.error('Fehler beim Laden der Community-Daten:', err);
        this.isLoading = false;
      }
    });
  }

  private loadFriendModels() {
    const friendIds = this.user?.friendIds || [];
    const requests = friendIds.map(friendId =>
      this.userService.getUserInformation(friendId)
    );
    return forkJoin(requests).pipe(
      map(users => users.map(user => new UserModel(user)))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}







































  // ngOnChanges(): void {
  //       // Erst synchron prüfen:
  //       const userDto = this.loginService.getCurrentUser();
  //       if (!userDto) {
  //         this.isLoading = false;
  //         // Option 1: Button/Anzeige zum Login (nicht umleiten)
  //         // Option 2: Sofort umleiten:
  //         // this.router.navigate(['/', this.routingEnum.LOGIN]);
  //         this.cdr.detectChanges();
  //       } else {
  //         this.currentUserModel = new UserModel(userDto);
  //         this.loadData();
  //       }
    
  //       // Auf User-Änderungen reagieren:
  //       this.subscription.add(
  //         this.loginService.currentUser$.subscribe(userDto => {
  //           if (!userDto) {
  //             this.isLoading = false;
  //             this.cdr.detectChanges();
  //             return;
  //           }
  //           this.currentUserModel = new UserModel(userDto);
  //           this.loadData();
  //         })
  //       );
  // }

  // private loadData(): void {
  //   this.isLoading = true;
  //   forkJoin([
  //     this.loadFriendModels(),
  //     this.eventService.getEventList()
  //   ]).subscribe(([friendModels, allEvents]) => {
  //     this.friendModels = friendModels;
  //     this.userNews = this.currentUserModel.getCommunityNews(friendModels);
  //     this.recommendations = this.currentUserModel.getEventRecommendations(allEvents);
  //     this.isLoading = false;
  //     this.cdr.detectChanges();
  //   });
  // }

  // private loadFriendModels(): Observable<UserModel[]> {
  //   const friendIds = this.currentUserModel.getUserDto().friendIds;
  //   if (friendIds.length === 0) {
  //     return of([]);
  //   }
  //   const friendObservables = friendIds.map(id =>
  //     this.userService.getUserInformation(id).pipe(
  //       map(user => new UserModel(user))
  //     )
  //   );
  //   return forkJoin(friendObservables);
  // }
