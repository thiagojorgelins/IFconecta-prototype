import { Component, OnInit } from '@angular/core';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MessagerService } from 'src/app/services/messager.service';

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss']
})
export class MessagerComponent implements OnInit {
  faXmark: IconDefinition = faXmark;

  constructor(public messagerService: MessagerService) { }

  ngOnInit(): void {
  }

  close() {
    this.messagerService.clearAlert();
  }
}
