import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "./app-reducer";

export type TaskFilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: TaskFilterType,
    entityStatus: RequestStatusType
}

export type actionTypes =
    ReturnType<typeof removeListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeListTitleAC>
    | ReturnType<typeof changeListFilterAC>
    | ReturnType<typeof getTodoListsAC>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof changeTodoListEntityStatusAC>

const initialState: TodolistDomainType[] = []

export const todoListReducer = (todoLists: TodolistDomainType[] = initialState, action: actionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'GET-TODOLISTS': {
            return action.todoLists.map(todoList => {
                return {...todoList, filter: "all", entityStatus: "idle"}
            })
        }
        case 'REMOVE-LIST': {
            return todoLists.filter(list => list.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todoList, filter: "all", entityStatus: "idle"}, ...todoLists]
        }
        case 'CHANGE-LIST-TITLE': {
            return todoLists.map(list => {
                return list.id === action.todoListID ? {...list, title: action.newTitle} : list
            })
        }
        case 'CHANGE-LIST-FILTER': {
            return todoLists.map(list => {
                return list.id === action.todoListID ? {...list, filter: action.filter} : list
            })
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return todoLists.map(list => {
                return list.id === action.todoListID ? {...list, entityStatus: action.status} : list
            })
        }
        default: {
            return todoLists
        }
    }
}

export const removeListAC = (id: string) => {
    return {
        type: 'REMOVE-LIST',
        id: id
    } as const
}
export const addTodoListAC = (todoList: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todoList
    } as const
}
export const changeListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'CHANGE-LIST-TITLE',
        todoListID: todoListID,
        newTitle: newTitle
    } as const
}
export const changeListFilterAC = (filter: TaskFilterType, todoListID: string) => {
    return {
        type: 'CHANGE-LIST-FILTER',
        filter: filter,
        todoListID: todoListID
    } as const
}
export const getTodoListsAC = (todoLists: TodolistType[]) => {
    return {
        type: 'GET-TODOLISTS',
        todoLists
    } as const
}
export const changeTodoListEntityStatusAC = (todoListID: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        todoListID,
        status
    } as const
}

//Thunk

export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(response => {
            dispatch(getTodoListsAC(response.data))
        })
      .finally(() => {
        dispatch(setAppStatus('succeeded'))
      })
}
export const removeTodoListsTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListID, 'loading'))
    todolistAPI.deleteTodolist(todoListID)
        .then(response => {
            response.data.resultCode === 0 && dispatch(removeListAC(todoListID))
            dispatch(setAppStatus('succeeded'))
        })
}
export const createTodoListsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(response => {
            response.data.resultCode === 0 && dispatch(addTodoListAC(response.data.data.item))
            dispatch(setAppStatus('succeeded'))
        })
}
export const changeTodoListsTitleTC = (todoListID: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.updateTodolist(todoListID, newTitle)
        .then(response => {
            response.data.resultCode === 0 && dispatch(changeListTitleAC(todoListID, newTitle))
            dispatch(setAppStatus('succeeded'))
        })
}