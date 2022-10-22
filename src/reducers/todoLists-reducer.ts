import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type TaskFilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: TaskFilterType
}

export type actionTypes =
    ReturnType<typeof removeListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeListTitleAC>
    | ReturnType<typeof changeListFilterAC>

const initialState: TodolistDomainType[] = []

export const todoListReducer = (todoLists: TodolistDomainType[] = initialState, action: actionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-LIST': {
            return todoLists.filter(list => list.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todoListID,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...todoLists]
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

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListID: v1()
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