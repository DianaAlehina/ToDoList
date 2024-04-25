export interface ITodo{
  id: number,
  todo: string,
  completed: boolean,
  userId: number,
  isDeleted: boolean
}

export class Todo implements ITodo {
  id: number
  todo: string
  completed: boolean
  userId: number
  isDeleted: boolean

  constructor(todoId: number,
              todoTodo: string,
              todoCompleted: boolean,
              todoUserId: number,
              todoIsDeleted: boolean) {
    this.id = todoId
    this.todo = todoTodo
    this.completed = todoCompleted
    this.userId = todoUserId
    this.isDeleted = todoIsDeleted
  }
}
