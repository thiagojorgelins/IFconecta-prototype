import { HttpHeaders } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IconDefinition,
  faUser,
  faCalendarPlus,
  faComments,
  faCircleExclamation,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';

import { Observable, tap } from 'rxjs';
import { Alert } from 'src/app/models/Alert.model';
import { Post } from 'src/app/models/Post.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  user!: User
  hasPermitionToRemove = false

  faUser: IconDefinition = faUser;
  faCalendarPlus: IconDefinition = faCalendarPlus;
  faComments: IconDefinition = faComments;
  faTrash: IconDefinition = faTrash
  token = this.cookieService.get('token')
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private commentService: CommentsService,
    private messageService: MessagerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchUser()
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
    if (this.token) {
      this.isSign = true;
    }
  }

  fetchUser() {
    this.authService.currentUser().subscribe(
      user => {
        this.user = user;
      }
    );
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

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
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
    this.post$ = this.postService.getPost(id).pipe(
      tap((response)=>{
        if(this.isSign){
          if(this.user.id === response.authorId){
            this.hasPermitionToRemove = true
          }
        }
      })
    )
  }
  deletePostConfirmation() {
    const confirmation: Alert = {
      type: 'warning',
      title: 'Confirmação',
      icon: faCircleExclamation,
      message: 'Tem certeza que deseja excluir este post?',
    };
  
    this.messageService.addAlert(confirmation);
  
    const confirmationSubscription = this.messageService.alertObservable().subscribe((confirmed) => {
      if (confirmed) {
        this.deletePost();
      }
      confirmationSubscription.unsubscribe();
    });
  }

  deletePost(){
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    this.postService.removePost(id, headers).subscribe(
      response => {
        this.messageService.addAlert({
          type: 'success',
          title: 'Sucesso',
          icon: faTrash,
          message: 'Post deletado com sucesso',
          timeout: 2000,
        });
        this.router.navigate(['/home'])
      },
      error => {
        this.messageService.addAlert({
          type: 'danger',
          title: 'Erro!',
          icon: faCircleExclamation,
          message: error.error.message,
          timeout: 3000,
        });
      }
    );
  }
}
