import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { IconDefinition, faEye, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post!: Post;
  faEye: IconDefinition = faEye;
  faCalendarDays: IconDefinition = faCalendarDays;
  faUser: IconDefinition = faUser;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  pageRedirect(id: number): void {
    this.router.navigate([`/posts/${id}`])
  }


}
