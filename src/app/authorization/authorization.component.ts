import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})

export class AuthorizationComponent implements OnInit{
  login = `atuny0`;
  password = '9uQFF1Lh';
  token = '';

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(){
    // login and password заполнены, пытаемся авторизоваться
    if (this.login && this.password){
      //TODO submit

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','http://localhost:3000');

      fetch('https://dummyjson.com/auth/login', {
        mode: 'cors',
        // credentials: 'include',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: this.login,
          password: this.password,
          expiresInMins: 60, // optional, defaults to 60
        })
      })
        .then(response => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            localStorage.setItem("token", data.token);
            // Redirect to the product list page
          }
        })
        .then(json => console.log(json))

      console.log(`You are authorized as ${this.login} with password ${this.password}`)
      return;
    }
    alert('Login and password are required fields!!!')
  }
}
