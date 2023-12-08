import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiURL = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.apiURL}/post`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/post/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.apiURL}/user/${id}`)
  }

}
