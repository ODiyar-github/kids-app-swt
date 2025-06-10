import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserDTO } from '@kids-app/share'

@Injectable()
export class LoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private readonly httpClient: HttpClient){}

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public login(username: string, password: string): Observable<UserDTO> {
    const user = this.httpClient.get<UserDTO>(`${environment.USER.URL}/login`, {params: {username, password}});
    if(user){
        this.isLoggedInSubject.next(true);
    }
    console.log(user)
    return user;
  }

  logout() {
    this.isLoggedInSubject.next(false);
    return this.httpClient.post<boolean>(`${environment.USER.URL}/logout`,true);
  }

  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }
}
