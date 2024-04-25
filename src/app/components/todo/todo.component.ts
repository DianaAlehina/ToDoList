import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service'
import { Router } from '@angular/router';
import { createUser, User } from '../../models/user';
import { Task } from '../../models/task';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  newTask: string = ''
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
            this.getTasksForm()
          } else {
            this.router.navigate(['/'])
          }
        })
    }
  }

  logOut(){
    localStorage.setItem("token", '')
    this.router.navigate(['/'])
  }

  getTasksForm(){
    TaskService.getTasks(this.user.id)
      .then(task => {
        this.task = task
        console.log(this.task)
      });
  }

  addTaskForm(){
    if (this.newTask.length > 4){
      TaskService.addTask(this.newTask, this.user.id)
        .then(todo => {
          this.task.total += 1
          this.task.todos.push(todo)
          console.log(this.task)
        })
      this.newTask = ''
    }
  }

  updateTodoForm(i: number){
    if (this.task.todos[i].todo.length > 4) {
      TaskService.updateTask(this.task.todos[i])
        .then(todo => {
          this.task.todos[i] = todo
          console.log(todo)
        })
    }
  }

  updateCompletedForm(i: number){
    this.task.todos[i].completed = !this.task.todos[i].completed
    TaskService.updateTask(this.task.todos[i])
      .then(todo => {
        console.log(todo)
      })
  }

  deleteTaskForm(i: number){
    TaskService.deleteTask(this.task.todos[i].id)
      .then(todo => {
        this.task.todos[i] = todo
        this.task.todos = this.task.todos.filter((todo) => !todo.isDeleted)
        console.log(todo)
      })
  }

  sortByID (){
    this.task.todos.sort((a, b) => a.id < b.id ? 1 : -1);
    console.log(this.task)
  }

  sortByValue (){
    this.task.todos.sort((a, b) => a.id < b.id ? 1 : -1);
    this.task.todos.sort((a, b) => a.completed > b.completed ? 1 : -1);
    console.log(this.task)
  }
}
