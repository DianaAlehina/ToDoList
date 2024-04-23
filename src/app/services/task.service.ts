import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  static async getTasks (userID: number): Promise<Task> {
    try{
      const result = await fetch(`https://dummyjson.com/todos/user/${userID}`, {
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

  static async addTask (todo: string, userID: number): Promise<Task> {
    try {
      let body = JSON.stringify({
        todo: todo,
        completed: false,
        userId: userID,
      })
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin','http://localhost:3000');

      const result = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: headers,
        body: body
      })

      const resultJSON = await result.json()
      console.log(resultJSON)

      return new Task([], 0)
    } catch (error){
      console.error('Error createTask', error);
    }
    return new Task([], 0)
  }

  static async updateTask (todo: Todo): Promise<Task> {
    try {
      let body = JSON.stringify({
        todo: todo.todo,
        completed: todo.completed,
      })
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin','http://localhost:3000');

      const result = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'PUT', /* or PATCH */
        headers: headers,
        body: body
      })

      const resultJSON = await result.json()
      console.log(resultJSON)

      return new Task([], 0)
    } catch (error){
      console.error('Error createTask', error);
    }
    return new Task([], 0)
  }

  static async deleteTask (todoID: number): Promise<Task> {
    try {
      const result = await fetch(`https://dummyjson.com/todos/${todoID}`, {
        method: 'DELETE',
      })
      const resultJSON = await result.json()
      console.log(resultJSON)

      return new Task([], 0)
    } catch (error){
      console.error('Error createTask', error);
    }
    return new Task([], 0)
  }
}
