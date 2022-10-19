import axios from 'axios'
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
        return axiosInstance.post<ResponseType<TodolistType>>(`todo-lists`, { title: todoListTitle })
    },

    deleteTodolist(todolistId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return axiosInstance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title })
    },

    createTask(todolistId: string, title: string) {
        return axiosInstance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, { title: title })
    },

    getTasks(todolistId: string) {
        return axiosInstance.get<ResponseGetTaskType>(`/todo-lists/${todolistId}/tasks`)
    },

    deleteTask(todolistId: string, taskID: string) {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskID}`)
    },

    updateTask(todolistId: string, taskID: string) {
        const data: TaskDataType = {
            title: 'new Title',
            description: 'new description',
            completed: false,
            status: 3,
            priority: 4,
            startDate: new Date(),
            deadline: new Date(),
        }
        return axiosInstance.put<TaskDataType>(`/todo-lists/${todolistId}/tasks/${taskID}`, data)
    },
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: T
    }
}

type TaskDataType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
}

type TaskType = TaskDataType & {
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type ResponseGetTaskType = {
    error: string
    items: TaskType[]
    totalCount: number
}
