import { Injectable } from '@angular/core';
import { Post } from '../../models/Post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiURL = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  createPost(formData: FormData, headers: HttpHeaders): Observable<any>{
    return this.http.post(`${this.apiURL}/post`, formData, {headers})
  }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.apiURL}/post`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/post/${id}`);
  }

  getPostsByCategory(category: string): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.apiURL}/post/category/${category}`);
  }

  searchPosts(query: string): Observable<Array<Post>> {
    const params = new HttpParams().set('filters', query);
    return this.http.get<Array<Post>>(`${this.apiURL}/post/search/${query}`, { params });
  }
}
