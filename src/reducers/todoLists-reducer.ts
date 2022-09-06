import {TaskFilterType, TodoListsType} from "../App";
import {v1} from "uuid";

export type actionTypes =
    ReturnType<typeof removeListAC>
    | ReturnType<typeof addListAC>
    | ReturnType<typeof changeListTitleAC>
    | ReturnType<typeof changeListFilterAC>

export const todoListReducer = (todoLists: TodoListsType[], action: actionTypes) => {
    switch (action.type) {
        case 'REMOVE-LIST': {
            return todoLists.filter(list => list.id !== action.id)
        }
        case 'ADD-LIST': {
            debugger
            let todoList: TodoListsType = {id: v1(), title: action.title, filter: 'all'}
            return [todoList, ...todoLists]
        }
        case 'CHANGE-LIST-TITLE': {
            let list = todoLists.find(item => item.id === action.todoListID)
            if (list) {
                list.title = action.newTitle
            }

            return {...todoLists, list}
        }
        case 'CHANGE-LIST-FILTER': {
            let list = todoLists.find(list => list.id === action.todoListID);
            if (list) {
                list.filter = action.filter;
            }
            return {...todoLists, list}
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

export const addListAC = (title: string) => {
    return {
        type: 'ADD-LIST',
        title: title,
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