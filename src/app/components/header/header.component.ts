import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser: IconDefinition = faUser;

  constructor(private router: Router) {}

  loginRedirect() {
    this.router.navigate(['/login']);
  }
}
