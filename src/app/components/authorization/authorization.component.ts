import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { User } from '../../models/user';


@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})

export class AuthorizationComponent implements OnInit{
  login = `atuny0`;
  password = '9uQFF1Lh';
  token = '';

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    let token= localStorage.getItem("token");
    if (!!token) {
      AuthService.getUserThroughToken(token)
        .then(user => this.router.navigate(['todo/' + user.id]))
    }
  }

  onSubmit(){
    // login and password заполнены, пытаемся авторизоваться
    if (this.login && this.password) {
      //TODO submit
      AuthService.getUserThroughLogin(this.login, this.password)
        .then(user => {
          if (user.id != -1) {
            this.router.navigate(['todo/' + user.id])
          }
        })
    } else {
      alert('Login and password are required fields!!!')
    }
  }
}
