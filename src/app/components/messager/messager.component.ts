import { Component, OnInit } from '@angular/core';
import { IconDefinition, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessagerService } from 'src/app/services/messager/messager.service';

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss']
})
export class MessagerComponent implements OnInit {
  faXmark: IconDefinition = faXmark;
  faTrash: IconDefinition = faTrash
  constructor(public messagerService: MessagerService) { }

  ngOnInit(): void {
  }

  close() {
    this.messagerService.clearAlert();
  }
}
