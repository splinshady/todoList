import {TasksType} from "../app/App";
import {addTodoListAC, getTodoListsAC, removeListAC} from "./todoLists-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";
import {setAppError, setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type actionTypes = ReturnType<typeof removeTaskAC
    | typeof addTaskAC
    | typeof changeTaskTitleAC
    | typeof addTodoListAC
    | typeof removeListAC
    | typeof getTodoListsAC
    | typeof setTasksAC
    | typeof changeTaskStatusAC>

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: actionTypes): TasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = action.tasks
            return stateCopy
        }
        case 'GET-TODOLISTS': {
            let endState = {...state}
            action.todoLists.forEach(todoList => {
                endState[todoList.id] = []
            })
            return endState
        }

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todoListID]: [{...action.task}, ...state[action.todoListID]]
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
            return {...state, [action.todoList.id]: []}
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
export const addTaskAC = (task: TaskType, todoListID: string) => {
    return {type: 'ADD-TASK', task, todoListID} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todoListID} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListID} as const
}
export const setTasksAC = (tasks: TaskType[], todoListID: string) => {
    return {type: 'SET-TASKS', tasks, todoListID} as const
}

//Thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
            dispatch(setAppStatus('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.deleteTask(todoListID, taskId)
        .then(response => {
            response.data.resultCode === 0 && dispatch(removeTaskAC(taskId, todoListID))
            dispatch(setAppStatus('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item, todolistId))
            } else {
                handleServerAppError(response.data, dispatch)
            }
            dispatch(setAppStatus('succeeded'))
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskStatusTC = (todoListID: string, status: TaskStatuses, taskID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus('loading'))
    const currentTodoListTasks = getState().tasks[todoListID]
    let task = currentTodoListTasks.find(task => task.id === taskID)
    if (!task) {
        throw new Error('task not found in the state')
    }
    todolistAPI.updateTask(todoListID, taskID, {...task, status})
        .then(response => {
            console.log(response)
            dispatch(changeTaskStatusAC(taskID, response.data.data.item.status, todoListID))
            dispatch(setAppStatus('succeeded'))
        })
}
export const updateTaskTitleTC = (todoListID: string, title: string, taskID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus('loading'))
    const currentTodoListTasks = getState().tasks[todoListID]
    let task = currentTodoListTasks.find(task => task.id === taskID)
    if (!task) {
        throw new Error('task not found in the state')
    }
    todolistAPI.updateTask(todoListID, taskID, {...task, title})
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTaskTitleAC(taskID, response.data.data.item.title, todoListID))
            } else {
                handleServerAppError(response.data, dispatch)
            }
            dispatch(setAppStatus('succeeded'))
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}

