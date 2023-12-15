import { HttpHeaders } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  IconDefinition,
  faUser,
  faEye,
  faCalendarPlus,
  faComments,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { CommentsService } from 'src/app/services/comment/comments.service';
import { MessagerService } from 'src/app/services/messager/messager.service';
import { PostService } from 'src/app/services/post/post.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  baseUrl = environment.baseApiUrl
  post$?: Observable<Post>;
  isLoading: Boolean = false;
  isSign = false;
  commentForm!: FormGroup;
  
  faUser: IconDefinition = faUser;
  faEye: IconDefinition = faEye;
  faCalendarPlus: IconDefinition = faCalendarPlus;
  faComments: IconDefinition = faComments;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private commentService: CommentsService,
    private messageService: MessagerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userLogged()
    setTimeout(() => {
      this.fetchPost();
    }, 400);
    
    this.commentForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    })
  }

  get content() {
    return this.commentForm.get('content')
  }

  userLogged() {
    const token = this.cookieService.get('token')
    if (token) {
      this.isSign = true;
    }
  }

  submit() {
    if (this.commentForm.invalid) {
      return;
    }
    this.createComment();
  }

  createComment() {
    if (this.commentForm.invalid) return;
  
    const commentData = { ...this.commentForm.value };
    const postId = Number(this.route.snapshot.paramMap.get('id'));
  
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.commentService.createComment(postId, commentData , headers)
    .subscribe(
      response => {
        setTimeout(() => {
          this.fetchPost();
        }, 500);
      },
      error => {
        this.messageService.addAlert({
          type: 'danger',
          title: 'Erro!',
          icon: faCircleExclamation,
          message: 'Erro ao tentar criar comentário',
          timeout: 1000,
        });
      }
    );
  }

  fetchPost() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.post$ = this.postService.getPost(id);
  }

}
