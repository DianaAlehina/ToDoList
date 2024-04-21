import { Injectable } from '@angular/core';
import { Task, task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  async getTasks(userId: number) {
      try {
        const response = await fetch(
          `https://dummyjson.com/todos/user/${userId}`
        );
        const todos = await response.json();

        let task: Task;
        task.total = todos.total;
        for (let i = 0; i < todos.total; i++){


        }

        // setTasks((prev) => [...prev, ...todos.todos]);
      } catch (error) {
        console.log(error);
      }
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
