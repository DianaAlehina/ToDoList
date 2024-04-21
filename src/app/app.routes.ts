import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent
  },
  {
    path: 'todo/:id',
    component: TodoComponent
  },
];
