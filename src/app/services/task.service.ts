import { Injectable } from '@angular/core';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  static async getTasks (userId: number) {
    try{
      let headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Accept', 'application/json');
      // headers.append('Origin','http://localhost:3000');

      const result = await fetch(`https://dummyjson.com/todos/user/${userId}`, {
      });
      const todosJSON = await result.json();
      console.log(todosJSON)
      //
      // let task: Task;
      // // task.total = todos.total;
      // for (let i = 0; i < todos.total; i++){
      //
      // }

      if (todosJSON?.message) {
        return
      } else {
        return
      }
    } catch (error){
      console.error('Error getTasks', error);
    }
    return
  }
      // id: number,
      //   todo: string,
      //   completed: boolean,
      //   userId: number
      // //
      // response_json.todos;
      //
      //   name: req.body.name,
      //   value: req.body.value,
      //   marked: false,
      //   user: req.user.id
      // }).save()
      // response_json.status(201).json(contact)

  // getTask(id: number){
  //
  // }
  //
  // createTask(){
  //
  // }
  //
  // updateTask(id: number){
  //
  // }
  //
  // deleteTask(id: number){
  //
  // }
}
