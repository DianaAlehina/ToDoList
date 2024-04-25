import { Injectable } from '@angular/core';
import { createUser, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  static async getUserThroughToken (token: string): Promise<User>{
    try{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','http://localhost:3000');
      headers.append('Authorization', token);

      const result = await fetch('https://dummyjson.com/auth/me', {
        mode: 'cors',
        method: 'GET',
        headers: headers,
      });
      const resJSON = await result.json();

      if (resJSON?.message) {
        localStorage.setItem("token", '');
        return createUser('')
      } else {
        console.log('Auth Through Token: ' + localStorage.getItem("token"));
        // console.log(resJSON)
        return createUser(resJSON)
      }
    } catch (error){
      console.error('Error during authentication', error)
    }
    return createUser('')
  }

  static async getUserThroughLogin (login: string, password: string): Promise<User>{
    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','http://localhost:3000');

      const result = await fetch('https://dummyjson.com/auth/login', {
        mode: 'cors',
        // credentials: 'include',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: login,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        })
      })

      const resJSON = await result.json();

      if (resJSON?.message) {
        alert('Login or password entered incorrectly!')
      } else if (resJSON.token) {
        localStorage.setItem("token", resJSON.token);
        console.log(`You are authorized as ${login} with password ${password}`)
        console.log(createUser(resJSON))

        return createUser(resJSON)
      }
    } catch (error){
      console.error('Error during authentication', error);
    }

    return createUser('')
  }
}
