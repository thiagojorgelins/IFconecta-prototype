import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import {
  IconDefinition,
  faUpload,
  faCircleExclamation,
  faCheck,
  faFilter,
  faHighlighter,
  faClosedCaptioning,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss']
})
export class CreatePostFormComponent implements OnInit {
  faUpload: IconDefinition = faUpload;
  faCircleExclamation: IconDefinition = faCircleExclamation;
  faCheckCircle: IconDefinition = faCheck;
  faFilter: IconDefinition = faFilter;
  faHighlighter: IconDefinition = faHighlighter;
  faClosedCaptioning: IconDefinition = faClosedCaptioning;
  faFileLines: IconDefinition = faFileLines;

  @Output() onSubmit = new EventEmitter<Post>();
  @Input() btnSubmit!: string
  @Input() postData: Post | null = null;
  postPost!: FormGroup;

  ngOnInit(): void {
    this.postPost = new FormGroup({
      id: new FormControl(this.postData ? this.postData.id : ''),
      title: new FormControl(this.postData ? this.postData.title : '', [Validators.required]),
      subtitle: new FormControl(this.postData ? this.postData.subtitle : '', [Validators.required]),
      content: new FormControl(this.postData ? this.postData.content : '', [Validators.required]),
      category: new FormControl(this.postData ? this.postData.category : '', [Validators.required]),
      postImage: new FormControl(''),
    })
  }

  get category() {
    return this.postPost.get('category');
  }

  get title() {
    return this.postPost.get('title')!;
  }

  get subtitle() {
    return this.postPost.get('subtitle')!
  }

  get content() {
    return this.postPost.get('content')!;
  }

  get postImage(){
    return this.postPost.get('post_image')
  }
  categories: string[] = ['technology', 'travel', 'gastronomy', 'health', 'science', 'fashion', 'sports', 'music', 'business', 'movies', 'culture']
  selectedFileName: string | null = null

  onFileSelected(event: any) {
    const file = File = event.target.files[0]
    if (file) {
      this.selectedFileName = file.name;
      this.postPost.patchValue({ postImage: file });
    } else {
      this.selectedFileName = null;
      this.postPost.patchValue({ postImage: null });
    }
  }
  submit() {
    if (this.postPost.invalid) {
      return;
    }
    this.onSubmit.emit(this.postPost.value)
  }
}
