import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TaskFilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: TaskFilterType,
    entityStatus: RequestStatusType
}


const initialState: TodolistDomainType[] = []

export const slice = createSlice({
  name: 'todoList',
  initialState: initialState,
  reducers: {
    removeListAC(state, action: PayloadAction<{id: string}>){
      return state.filter(list => list.id !== action.payload.id)
    },
    addTodoListAC(state, action: PayloadAction<{todoList: TodolistType}>){
      return [{...action.payload.todoList, filter: "all", entityStatus: "idle"}, ...state]
    },
    changeListTitleAC(state, action: PayloadAction<{todoListID: string, newTitle: string}>){
      return state.map(list => {
        return list.id === action.payload.todoListID ? {...list, title: action.payload.newTitle} : list
      })
    },
    changeListFilterAC(state, action: PayloadAction<{filter: TaskFilterType, todoListID: string}>){
      return state.map(list => {
        return list.id === action.payload.todoListID ? {...list, filter: action.payload.filter} : list
      })
    },
    getTodoListsAC(state, action: PayloadAction<{todoLists: TodolistType[]}>){
      return  action.payload.todoLists.map(todoList => {
        return {...todoList, filter: "all", entityStatus: "idle"}
      })
    },
    changeTodoListEntityStatusAC(state, action: PayloadAction<{todoListID: string, status: RequestStatusType}>){
      return state.map(list => {
        return list.id === action.payload.todoListID ? {...list, entityStatus: action.payload.status} : list
      })
    },
  }
})

export const todoListReducer = slice.reducer
export const {removeListAC, addTodoListAC, changeListTitleAC,
              changeListFilterAC, getTodoListsAC, changeTodoListEntityStatusAC} = slice.actions

//Thunk

export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(response => {
            dispatch(getTodoListsAC({todoLists: response.data}))
        })
      .finally(() => {
        dispatch(setAppStatus({status: 'succeeded'}))
      })
}
export const removeTodoListsTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC({todoListID, status: 'loading'}))
    todolistAPI.deleteTodolist(todoListID)
        .then(response => {
            response.data.resultCode === 0 && dispatch(removeListAC({id: todoListID}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const createTodoListsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(response => {
            response.data.resultCode === 0 && dispatch(addTodoListAC({todoList: response.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const changeTodoListsTitleTC = (todoListID: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolist(todoListID, newTitle)
        .then(response => {
            response.data.resultCode === 0 && dispatch(changeListTitleAC({newTitle, todoListID}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}