import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { PostComponent } from './components/post/post.component';
import { CategoryTranslatePipe } from './pipes/category-translate.pipe';
import { CategoryColorPipe } from './pipes/category-color.pipe';
import { PostPageComponent } from './components/pages/post-page/post-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { MessagerComponent } from './components/messager/messager.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { CreatePostFormComponent } from './components/create-post-form/create-post-form.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PostComponent,
    CategoryTranslatePipe,
    CategoryColorPipe,
    PostPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MessagerComponent,
    CreatePostComponent,
    CreatePostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
