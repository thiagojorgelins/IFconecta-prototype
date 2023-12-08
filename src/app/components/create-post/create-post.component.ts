import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagerService } from 'src/app/services/messager.service';
import {
  IconDefinition,
  faRightToBracket,
  faUpload,
  faBold,
  faItalic,
  faList,
  faCode,
  faCircleExclamation,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/models/Post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  faUpload: IconDefinition = faUpload;
  faBold: IconDefinition = faBold;
  faItalic: IconDefinition = faItalic;
  faList: IconDefinition = faList;
  faCode: IconDefinition = faCode;
  faCircleExclamation: IconDefinition = faCircleExclamation;
  faRightToBracket: IconDefinition = faRightToBracket;
  faCheckCircle: IconDefinition = faCheck;

  @Output() onSubmit = new EventEmitter<Post>();
  @Input() createPostData: Post | null = null;
  createPost!: FormGroup;

  get title() {
    return this.createPost.get('title')!;
  }
  get content() {
    return this.createPost.get('content')!;
  }
  get category() {
    return this.createPost.get('category');
  }
  get postImage(){
    return this.createPost.get('postImage')
  }
  
  categorias: string[] = ['technology', 'travel', 'gastronomy', 'health', 'science', 'fashion', 'sports', 'music', 'business', 'movies', 'culture'];

  constructor(
    private router: Router,
    private messageService: MessagerService,
  ){}

  ngOnInit(): void {
    this.createPost = new FormGroup({
      title: new FormControl(this.createPostData ? this.createPostData.title : '', [Validators.required]),
      content: new FormControl(this.createPostData ? this.createPostData.content : '', [Validators.required]),
      category: new FormControl(this.createPostData ? this.createPostData.category : '', [Validators.required]),
      postImage: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.createPost.invalid) {
      return;
    }

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
}
