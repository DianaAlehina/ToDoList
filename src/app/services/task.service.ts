import { Injectable } from '@angular/core';
import { Task, ITask } from '../models/task';
import { Todo, ITodo } from '../models/todo';

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

      if (todosJSON?.message) {
        return
      } else {
        console.log('task')
        let todos: [Todo];
        for (let i = 0; i < todosJSON.total; i++) {
          let tdJSON = todosJSON.todos[i]
          let todo =
            new Todo(
              tdJSON.id,
              tdJSON.todo,
              tdJSON.completed,
              tdJSON.userId)
          todos.push(todo)
        }
        let task = new Task(todos, todosJSON.total)
        console.log(task)
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
