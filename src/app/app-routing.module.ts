import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PostPageComponent } from './components/pages/post-page/post-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts/:id', component: PostPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { scrollPositionRestoration: "enabled" },
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
