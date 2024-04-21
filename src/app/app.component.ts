import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthorizationComponent, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoList';
}
