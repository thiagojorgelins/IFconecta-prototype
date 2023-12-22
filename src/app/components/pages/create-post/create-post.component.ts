import { Component } from '@angular/core';
import { MessagerService } from 'src/app/services/messager/messager.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/Post.model';
import { User } from 'src/app/models/User.model';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  btnSubmit = 'Criar Postagem'
  user!: User
  userId!: Number

  constructor(
    private router: Router,
    private messageService: MessagerService,
    private postService: PostService,
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.fetchUser()
  }

  fetchUser() {
    this.authService.currentUser().subscribe(
      user => {
        this.user = user;
        this.userId = user.id
      }
    );
  }
  async createPost(post: Post) {
    const formData = new FormData()
    formData.append('category', post.category)
    formData.append('title', post.title)
    formData.append('subtitle', post.subtitle)
    formData.append('content', post.content)

    if (post.postImage) {
      formData.append('postImage', post.postImage);
    }
    const token = this.cookieService.get('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    await this.postService.createPost(formData, headers).subscribe(
      () => {
        this.messageService.addAlert({
          type: 'success',
          title: 'Publicado',
          icon: faCheck,
          message: 'Post criado com sucesso.',
          timeout: 2000,
        })
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 500);
      }
    )
  }
}
