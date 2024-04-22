import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service'
import { Router } from '@angular/router';
import { routes } from '../../app.routes';


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

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    TaskService.getTasks(1);
  }

  async logOut(){
    // localStorage.setItem("token", '')
    console.log('Auth Through Token: ' + localStorage.getItem("token"));
    // this.router.navigate(['/'])
  }
}
