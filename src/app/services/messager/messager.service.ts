import { Injectable } from '@angular/core';
import { Alert } from '../../models/Alert.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagerService {
  private confirmationSubject = new Subject<boolean>();
  constructor() { }

  alert?: Alert;

  alertObservable(): Observable<boolean> {
    return this.confirmationSubject.asObservable();
  }

  confirm(): void {
    this.confirmationSubject.next(true);
    this.clearAlert();
  }
  
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
