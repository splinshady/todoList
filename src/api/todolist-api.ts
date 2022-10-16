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
