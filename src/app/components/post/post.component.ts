import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { IconDefinition, faEye, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  baseUrl = environment.baseApiUrl
  @Input() post!: Post;
  faEye: IconDefinition = faEye;
  faCalendarDays: IconDefinition = faCalendarDays;
  faUser: IconDefinition = faUser;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  pageRedirect(id: number): void {
    this.router.navigate([`/posts/${id}`])
  }


}
