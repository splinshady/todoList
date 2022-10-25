import {todoListReducer} from "../reducers/todoLists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
