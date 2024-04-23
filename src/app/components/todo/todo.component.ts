import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service'
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { createUser, User } from '../../models/user';
import { Todo } from '../../models/todo';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  userID: number = 1
  newTask: string = 'Buy milk'
  todo: Todo = new Todo (-1, '', false, this.userID)
  user: User = createUser('')

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    let token= localStorage.getItem("token");
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
        TaskService.getTasks(this.user.id);
    }
  }

  logOut(){
    localStorage.setItem("token", '')
    this.router.navigate(['/'])
  }

  addTaskForm(){
    TaskService.addTask(this.newTask, this.userID).then(res => console.log(res))
  }

  updateTaskForm(){
    TaskService.updateTask(this.todo).then(res => console.log(res))
  }

  deleteTaskForm(){
    TaskService.deleteTask(this.todo.id).then(res => console.log(res))
  }
}
