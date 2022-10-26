import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type TaskFilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: TaskFilterType
}

export type actionTypes =
    ReturnType<typeof removeListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeListTitleAC>
    | ReturnType<typeof changeListFilterAC>
    | ReturnType<typeof getTodoListsAC>

const initialState: TodolistDomainType[] = []

export const todoListReducer = (todoLists: TodolistDomainType[] = initialState, action: actionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'GET-TODOLISTS': {
            return action.todoLists.map(todoList => {
                return {...todoList, filter: "all"}
            })
        }
        case 'REMOVE-LIST': {
            return todoLists.filter(list => list.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todoList, filter: "all"}, ...todoLists]
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

//Thunk

export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(response => {
            dispatch(getTodoListsAC(response.data))
        })
}
export const removeTodoListsTC = (todoListID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoListID)
        .then(response => {
            response.data.resultCode === 0 && dispatch(removeListAC(todoListID))
        })
}
export const createTodoListsTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(response => {
            response.data.resultCode === 0 && dispatch(addTodoListAC(response.data.data.item))
        })
}
export const changeTodoListsTitleTC = (todoListID: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todoListID, newTitle)
        .then(response => {
            response.data.resultCode === 0 && dispatch(changeListTitleAC(todoListID, newTitle))
        })
}