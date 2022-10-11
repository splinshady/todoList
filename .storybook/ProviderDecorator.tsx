import {Provider} from "react-redux";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../src/reducers/tasks-reducer";
import {todoListReducer} from "../src/reducers/todoLists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

type AppRootStateType = ReturnType<typeof rootReducer>

const initialState: AppRootStateType = {
    tasks: {
        ['todolistID1']: [
            {id: 'taskid1', title: 'css', isDone: false},
            {id: 'taskid2', title: 'html', isDone: true},
            {id: 'taskid3', title: 'js', isDone: true},
        ],
        ['todolistID2']: [{id: 'taskid12', title: 'milk', isDone: true,}]
    },
    todoLists: [
        {id: 'todolistID1', title: 'skills', filter: 'all'},
        {id: 'todolistID2', title: 'what to buy', filter: 'active'}
    ],
}


export const store = legacy_createStore(rootReducer, initialState as AppRootStateType)

export const ProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}