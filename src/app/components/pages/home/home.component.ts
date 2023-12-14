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
  ) {}

  categories: string[] = ['technology', 'travel', 'gastronomy', 'health', 'science', 'fashion', 'sports', 'music', 'business', 'movies', 'culture'];
  selectedCategory: string | undefined;
  searchQuery: string = '';

  ngOnInit(): void {
    this.selectedCategory = '';
    this.fetchPosts();
  }

  fetchPosts(): void {
    if (this.selectedCategory) {
      this.posts$ = this.postService.getPostsByCategory(this.selectedCategory);
    } else {
      this.posts$ = this.postService.getPosts();
    }
  }

  onCategoryChange(): void {
    this.fetchPosts();
  }

  redirectCreatePost() {
    this.router.navigate(['/create-post']);
  }

  searchPosts(): void {
    if (this.searchQuery.trim() !== '') {
      this.posts$ = this.postService.searchPosts(this.searchQuery);
    } else {
      this.fetchPosts();
    }
  }
}
