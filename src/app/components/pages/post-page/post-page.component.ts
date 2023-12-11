import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  IconDefinition,
  faUser,
  faEye,
  faCalendarPlus,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment.model';
import { Post } from 'src/app/models/Post.model';
import { CommentsService } from 'src/app/services/comment/comments.service';
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
  postComments$?: Observable<Array<Comment>>;

  isLoading: Boolean = false;

  faUser: IconDefinition = faUser;
  faEye: IconDefinition = faEye;
  faCalendarPlus: IconDefinition = faCalendarPlus;
  faComments: IconDefinition = faComments;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.fetchPost()
      this.fetchPostComments()
    }, 400);
  }

  fetchPost() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.post$ = this.postService.getPost(id);
  }

  fetchPostComments() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postComments$ = this.commentsService.getCommentByPost(id);
  }
}
