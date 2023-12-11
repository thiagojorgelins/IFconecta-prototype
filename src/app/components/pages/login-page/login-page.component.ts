import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagerService } from 'src/app/services/messager/messager.service';
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
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user!: User
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
    private userService: UserService,
    private authService: AuthService,
    private cookieService: CookieService
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
  fetchUser() {
    this.authService.currentUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }
  login() {
    const { email, password } = this.loginForm.value
    this.userService.userLogin(email, password).subscribe(
      (response) =>{
        if(response.token){
          this.cookieService.set('token', response.token)
          this.authService.emitLoginSuccess()
          this.messagerService.addAlert({
            type: 'success',
            title: 'Autorizado!',
            icon: faRightToBracket,
            message: 'Login realizado com sucesso.',
            timeout: 1500,
          })
          setTimeout(()=>{
            this.router.navigate(['/'])
          }, 500)
        
      }},
      (error) =>{
        if(error.status === 401){
          this.messagerService.addAlert({
            type: 'danger',
            title: 'Erro!',
            icon: faCircleExclamation,
            message: 'Email ou senha incorretos!',
            timeout: 2000,
          })
        } else {
          this.messagerService.addAlert({
            type: 'danger',
            title: 'Erro!',
            icon: faCircleExclamation,
            message: 'Algo deu errado',
            timeout: 2000,
          })
        }
      }

    )
  }

  changePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

}
