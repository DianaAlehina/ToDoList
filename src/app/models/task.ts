import { ITodo } from './todo';

export interface ITask {
  todos: ITodo[],
  total: number,
  // skip: number,
  // limit: number
}

class Task implements ITask {
  todos: [ITodo]
  total: number

  constructor(taskTodos: [ITodo],
              taskTotal: number) {
    this.todos = taskTodos
    this.total = taskTotal
  }
}
//
// export function createTask(taskAPI: any): ITask {
//
//   if (!!taskAPI){
//     let task: ITask = {
//       todos: taskAPI.id,
//       total: taskAPI.total
//     }
//     return taskAPI
//   }
//
//   return {
//     todos: [],
//     total: -1
//   }
// }
//
//
// export function createTodo(todoAPI: any): ITodo {
//
//   if (!!todoAPI){
//     let todo: ITodo = {
//       id: todoAPI.id,
//       todo: todoAPI.todo,
//       completed: todoAPI.completed,
//       userId: todoAPI.userId
//     }
//     return todo
//   }
//
//   return {
//     id: -1,
//     todo: '',
//     completed: '',
//     userId: ''
//   }
// }
