import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service'
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { createUser, User } from '../../models/user';
import { Todo } from '../../models/todo';
import { Task } from '../../models/task';
import { NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  newTask: string = 'Buy milk'
  todo: Todo = new Todo (-1, '', false, -1)
  user: User = createUser('')
  task: Task = new Task([], 0)

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    let token = localStorage.getItem("token");
    if (!!token) {
      AuthService.getUserThroughToken(token)
        .then(user => {
          if (user.id != -1) {
            this.router.navigate(['todo/' + user.id])
            this.user = user
            console.log(this.user)
          } else {
            this.router.navigate(['/'])
          }
        })

        this.getTasksForm()
    }
  }

  logOut(){
    localStorage.setItem("token", '')
    this.router.navigate(['/'])
  }

  getTasksForm(){
    TaskService.getTasks(1)
      .then(task => {
        this.task = task
        console.log(this.task)
      });
  }

  addTaskForm(){
    TaskService.addTask(this.newTask, this.user.id)
      .then(todo => {
        this.task.total += 1;
        this.task.todos.push(todo)
        console.log(this.task)
      })
  }

  updateTaskForm(){
    TaskService.updateTask(this.todo)
      .then(res => console.log(res))
  }

  deleteTaskForm(){
    TaskService.deleteTask(this.todo.id)
      .then(res => console.log(res))
  }

  sortByID (){

  }

  sortByValue (){

  }
}
