import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser: IconDefinition = faUser;
  faLogout: IconDefinition = faSignOutAlt;
  isSign = false;
  user!: User;
  baseUrl = environment.baseApiUrl

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.authService.loginSuccess$.subscribe(() => {
      this.fetchLogin()
    });
  }
  ngOnInit() {
    this.fetchLogin();
  }
  
  fetchLogin() {
    const token = this.cookieService.get('token')
    if (token) {
      this.isSign = true;
      this.fetchUser();
    }
  }

  fetchUser() {
    this.authService.currentUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  logout() {
    this.cookieService.delete('token')
    setTimeout(() => {
      location.reload();
    }, 500);
    this.router.navigate(['/']);
  }

  loginRedirect() {
    this.router.navigate(['/login']);
  }
}
