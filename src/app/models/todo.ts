export interface ITodo{
  id: number,
  todo: string,
  completed: boolean,
  userId: number
}

export class Todo implements ITodo {
  id: number
  todo: string
  completed: boolean
  userId: number

  constructor(todoId: number,
              todoTodo: string,
              todoCompleted: boolean,
              todoUserId: number) {
    this.id = todoId
    this.todo = todoTodo
    this.completed = todoCompleted
    this.userId = todoUserId
  }
}
