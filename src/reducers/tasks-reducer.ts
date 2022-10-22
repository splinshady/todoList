import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeListAC} from "./todoLists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export type actionTypes = ReturnType<typeof removeTaskAC
    | typeof addTaskAC
    | typeof changeTaskTitleAC
    | typeof addTodoListAC
    | typeof removeListAC
    | typeof changeTaskStatusAC>

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: actionTypes): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todoListID]: [
                    {
                        description: 'dd',
                        title: action.taskTitle,
                        completed: false,
                        status: TaskStatuses.New,
                        priority: TaskPriorities.Middle,
                        startDate: 'start Date',
                        deadline: 'dead line',
                        id: v1(),
                        todoListId: action.todoListID,
                        order: 0,
                        addedDate: 'addedDate',
                    }, ...state[action.todoListID]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskId ? {...task, status: action.status} : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todoListID]: []}
        }
        case 'REMOVE-LIST': {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (taskId: string, todoListID: string) => {
    return {type: 'REMOVE-TASK', taskId, todoListID} as const
}
export const addTaskAC = (taskTitle: string, todoListID: string) => {
    return {type: 'ADD-TASK', taskTitle, todoListID} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todoListID} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListID} as const
}