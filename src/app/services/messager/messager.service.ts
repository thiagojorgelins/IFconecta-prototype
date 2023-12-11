import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../../models/Alert.model';

@Injectable({
  providedIn: 'root'
})
export class MessagerService {

  constructor() { }

  alert?: Alert;

  addAlert(data: Alert): void {
    this.alert = {
      type: data.type,
      title: data.title,
      icon: data.icon,
      message: data.message,
    };

    if ('timeout' in data) {
      setTimeout(() => {
        this.clearAlert();
      }, data.timeout);
    }
  }

  clearAlert(): void {
    this.alert = undefined;
  }
}
