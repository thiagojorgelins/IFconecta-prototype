import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CRUDUsersService {
  private readonly apiURL = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.apiURL}/user`)
  }
}