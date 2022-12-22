import {todoListReducer} from "../features/todoList/todoLists-reducer";
import {tasksReducer} from "../features/task/tasks-reducer";
import {AnyAction, combineReducers} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

// @ts-ignore
window.store = store
