import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Comment } from '../../models/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly apiUrl = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getComments(): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.apiUrl}Comments/all`);
  }

  getCommentByPost(postId: number): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.apiUrl}Comments/${postId}`);
  }
}
