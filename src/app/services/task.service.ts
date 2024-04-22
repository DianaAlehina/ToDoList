import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  static async getTasks (userId: number): Promise<Task> {
    try{
      const result = await fetch(`https://dummyjson.com/todos/user/${userId}`, {
      });
      const todosJSON = await result.json();

      if (todosJSON?.total) {
        let todos: Todo[] = [];
        for (let i = 0; i < todosJSON.total; i++) {
          let tdJSON = todosJSON.todos[i]
          let todo: Todo =
            new Todo(
              tdJSON.id,
              tdJSON.todo,
              tdJSON.completed,
              tdJSON.userId)
          todos.push(todo)
        }

        let task = new Task(todos, todosJSON.total)
        console.log(task)
        return task
      }
    } catch (error){
      console.error('Error getTasks', error);
    }
    return new Task([], 0)
  }

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
