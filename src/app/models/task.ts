import { Todo, ITodo } from './todo';

export interface ITask {
  todos: Todo[],
  total: number,
  // skip: number,
  // limit: number
}

export class Task implements ITask {
  todos: Todo[]
  total: number

  constructor(taskTodos: Todo[],
              taskTotal: number) {
    this.todos = taskTodos
    this.total = taskTotal
  }
}
