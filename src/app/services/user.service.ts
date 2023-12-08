import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiURL = environment.baseApiUrl

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiURL}/user`, user)
  }

  userLogin(email: string, senha: string): Observable<User>{
    return this.http.post<User>(`${this.apiURL}/login`, {email, senha})
  }
}
