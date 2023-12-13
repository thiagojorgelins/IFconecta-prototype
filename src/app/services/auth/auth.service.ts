import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../models/User.model';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ){ }
  private loginSuccessSubject = new Subject<void>()
  private readonly apiURL = environment.baseApiUrl
  

  loginSuccess$ = this.loginSuccessSubject.asObservable()

  emitLoginSuccess() {
    this.loginSuccessSubject.next()
  }

  currentUser(): Observable<User> {
    const token = this.cookieService.get('token')
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
      return this.http.get<User>(`${this.apiURL}/user/profile`, { headers });
    } else {
      return new Observable<User>()
    }

  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    return !!token;
  }
}
