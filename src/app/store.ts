import {todoListReducer} from "../reducers/todoLists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../features/login/authReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer,
  app: appReducer,
  auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

// @ts-ignore
window.store = store
