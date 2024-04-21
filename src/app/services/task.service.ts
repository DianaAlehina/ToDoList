import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(){

    fetch('https://dummyjson.com/todos/user/5')
      .then(res => res.json())
      .then(console.log);
  }

  getTask(id: number){

  }
}
