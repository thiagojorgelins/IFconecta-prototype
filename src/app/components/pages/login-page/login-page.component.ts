import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagerService } from 'src/app/services/messager.service';
import {
  IconDefinition,
  faRightToBracket,
  faCircleExclamation,
  faDoorOpen,
  faKey,
  faEye,
  faEyeSlash,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  isPasswordVisible: Boolean = false;

  faRightToBracket: IconDefinition = faRightToBracket;
  faCircleExclamation: IconDefinition = faCircleExclamation;
  faDoorOpen: IconDefinition = faDoorOpen;
  faKey: IconDefinition = faKey;
  faEnvelope: IconDefinition = faEnvelope;
  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;

  constructor(
    private router: Router,
    private messagerService: MessagerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    const { email, password } = this.loginForm.value
    this.userService.userLogin(email as string, password as string).subscribe((res: any) => {
      if (this.loginForm.invalid) {
        return
      }
      console.log('res', res)
      localStorage.setItem('token', res.token)
      
      this.messagerService.addAlert({
        type: 'success',
        title: 'Autorizado!',
        icon: faRightToBracket,
        message: 'Login realizado com sucesso.',
        timeout: 2000,
      })
  
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 500);
    })
    
  }

  changePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

}
