import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createComment(postId: number, commentData: Comment, headers: HttpHeaders): Observable<any>{
    return this.http.post(`${this.apiUrl}/comment/${postId}`, commentData, {headers})
  }

}
