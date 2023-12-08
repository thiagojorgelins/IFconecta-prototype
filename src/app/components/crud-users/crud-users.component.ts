import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { CRUDUsersService } from 'src/app/services/crud-users.service';
import { faTrash, faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.scss']
})
export class CRUDUsersComponent {
  faTrash: IconDefinition = faTrash;
  faPenToSquare: IconDefinition = faPenToSquare;
  
  users: User[] = [];

  constructor(private crudUsersService: CRUDUsersService) {}

  ngOnInit() {
    this.crudUsersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
