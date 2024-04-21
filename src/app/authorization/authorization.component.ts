import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from '../app.routes';

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

  constructor() {
  }

  ngOnInit() {
  }

  // const navigateToRegister = () => {
  //   routes.push("/register");
  // }

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
        .then(res => res.json())
        .then((res) => {
          if (res?.message) {
            alert('Login or password entered incorrectly!')
          } else if (res.token) {
            localStorage.setItem("token", res.token);
            console.log(`You are authorized as ${this.login} with password ${this.password}`)
            console.log(res)

            // saveToken(res.token).then(() => {
            //   router.push("/list");
            // });
          }
        })
        .catch((error) => {
          console.error('Error during authentication', error);
        })

      return;
    }
    alert('Login and password are required fields!!!')
  }
}
