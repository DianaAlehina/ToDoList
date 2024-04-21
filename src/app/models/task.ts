
export interface Task {
  todos: [todos],
  total: number,
  // skip: number,
  // limit: number
}

export interface todos{
  id: number,
  todo: string,
  completed: boolean,
  userId: number
}
