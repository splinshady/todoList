import axios, {AxiosResponse} from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '6a3e89cd-d88e-4f3a-9ebc-280dc7449e40'
  }
})

export const todolistAPI = {
  getTodolist() {
    return axiosInstance.get<TodolistType[]>('todo-lists')
  },

  createTodolist(todoListTitle: string) {
    return axiosInstance.post<ResponseType<TodolistType>>(`todo-lists`, {title: todoListTitle})
  },

  deleteTodolist(todolistId: string) {
    return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },

  updateTodolist(todolistId: string, title: string) {
    return axiosInstance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
  },

  createTask(todolistId: string, title: string) {
    return axiosInstance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title: title})
  },

  getTasks(todolistId: string) {
    return axiosInstance.get<ResponseGetTaskType>(`/todo-lists/${todolistId}/tasks`)
  },

  deleteTask(todolistId: string, taskID: string) {
    return axiosInstance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskID}`)
  },

  updateTask(todolistId: string, taskID: string, data: TaskDataType) {
    return axiosInstance.put<ResponseType<TaskDataType>>(`/todo-lists/${todolistId}/tasks/${taskID}`, data)
  },
}

export const authAPI = {
  login(loginData: LoginParamsType) {
    return axiosInstance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>(`auth/login`, loginData)
  },
  me() {
    return axiosInstance.get<ResponseType<{ userId: number, email: string, login: string }>>(`auth/me`)

  },
  logout() {
    return axiosInstance.delete<ResponseType>(`auth/login`)
  }
}

export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: boolean
}

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: {
    item: T
  }
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskDataType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type TaskType = TaskDataType & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type ResponseGetTaskType = {
  error: string
  items: TaskType[]
  totalCount: number
}
