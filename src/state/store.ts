import {todoListReducer} from "../reducers/todoLists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {combineReducers, legacy_createStore} from "redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store
