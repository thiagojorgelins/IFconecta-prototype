import { Component, OnInit } from '@angular/core';
import { faChevronDown, faMagnifyingGlass, faSquarePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faChevronDown: IconDefinition = faChevronDown;
  faSquarePlus: IconDefinition = faSquarePlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;

  posts$!: Observable<Array<Post>>;

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private authGuard: AuthGuardService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.posts$ = this.postService.getPosts();
  }

  redirectCreatePost() {
    this.router.navigate(['/create-post'])
  }

}
