import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service'
import { Router } from '@angular/router';
import { createUser, User } from '../../models/user';
import { Task } from '../../models/task';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Todo } from '../../models/todo';
import { filter } from 'rxjs';


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
  operating_mode: string = ''

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    let token = localStorage.getItem("token")
    const taskLocal = JSON.parse('' + localStorage.getItem("task"))
    this.operating_mode = '' + localStorage.getItem("operating_mode")

    if (!!token) {
      AuthService.getUserThroughToken(token)
        .then(user => {
          if (user.id != -1) {
            this.router.navigate(['todo/' + user.id])
            this.user = user
            console.log(this.user)

            if (this.operating_mode == 'online'){
              this.getTasksForm()
            } else {
              for (let i = 0; i < taskLocal.todos.length; i++) {
                let todo =  new Todo(taskLocal.todos[i].id, taskLocal.todos[i].todo,
                  taskLocal.todos[i].completed, taskLocal.todos[i].userId, false)
                this.task.todos.push(todo)
                console.log(this.task)
              }
            }
          } else {
            this.router.navigate(['/'])
          }
        })
    }
  }

  logOut(){
    localStorage.clear()
    console.clear()
    this.router.navigate(['/'])
  }

  getTasksForm(){
    TaskService.getTasks(this.user.id)
      .then(task => {
        this.task = task
        localStorage.setItem("task", JSON.stringify(this.task))
        // console.log(localStorage.getItem("task"))
        console.log(this.task)
      });
  }

  addTaskForm(){
    if (this.operating_mode == 'online'){
      if (this.newTask.length >= 4){
        TaskService.addTask(this.newTask, this.user.id)
          .then(todo => {
            this.task.total += 1
            this.task.todos.push(todo)
            console.log(this.task)
          })
        this.newTask = ''
      }
    } else {
      let todo =  new Todo(200 + this.task.total, this.newTask, false, this.user.id, false)
      this.task.total += 1
      this.task.todos.push(todo)
      localStorage.setItem("task", JSON.stringify(this.task))
      console.log(localStorage.getItem("task"))
    }
  }

  updateTodoForm(i: number){
    if (this.operating_mode == 'online') {
      if (this.task.todos[i].todo.length >= 4) {
        TaskService.updateTask(this.task.todos[i])
          .then(todo => {
            this.task.todos[i] = todo
            console.log(todo)
          })
      }
      this.getTasksForm()
    } else {
      localStorage.setItem("task", JSON.stringify(this.task))
      console.log(localStorage.getItem("task"))
    }
  }

  updateCompletedForm(i: number){
    this.task.todos[i].completed = !this.task.todos[i].completed
    if (this.operating_mode == 'online') {
      TaskService.updateTask(this.task.todos[i])
        .then(todo => {
          console.log(todo)
        })
    } else {
      localStorage.setItem("task", JSON.stringify(this.task))
      console.log(localStorage.getItem("task"))
    }
  }

  deleteTaskForm(i: number){
    if (this.operating_mode == 'online') {
      TaskService.deleteTask(this.task.todos[i].id)
        .then(todo => {
          this.task.todos[i] = todo
          this.task.todos = this.task.todos.filter((todo) => !todo.isDeleted)
          console.log(todo)
        })
    } else {
      this.task.total -= 1
      this.task.todos[i].isDeleted = true
      this.task.todos = this.task.todos.filter((todo) => !todo.isDeleted)
      localStorage.setItem("task", JSON.stringify(this.task))
      console.log(localStorage.getItem("task"))
    }
  }

  offline(){
    this.operating_mode = 'offline'
    localStorage.setItem("operating_mode", 'offline')
    console.log('offline mode enabled')
  }

  online(){
    this.operating_mode = 'online'
    localStorage.setItem("operating_mode", 'online')
    console.log('online mode enabled')
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
