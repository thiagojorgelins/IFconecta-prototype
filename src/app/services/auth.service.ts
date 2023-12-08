import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginSuccessSubject = new Subject<void>()

  loginSuccess$ = this.loginSuccessSubject.asObservable()

  emitLoginSuccess(){
    this.loginSuccessSubject.next()
  }

}
