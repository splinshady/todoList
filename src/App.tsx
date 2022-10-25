import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./conponents/todoList/TodoList";
import AddItemForm from "./conponents/common/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodoListAC,
    changeListFilterAC,
    changeListTitleAC, fetchTodoListsTC,
    removeListAC,
    TaskFilterType, TodolistDomainType
} from "./reducers/todoLists-reducer";
import {addTaskAC, fetchTasksTC} from "./reducers/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {useAppDispatch} from "./hooks-ts";

export type TasksType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useDispatch()
    const allTasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)

    const addTask = useCallback((inputValue: string, todoListID: string) => {
        dispatch(addTaskAC(inputValue, todoListID))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeListAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeListTitleAC(todoListID, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((filter: TaskFilterType, todoListID: string) => {
        dispatch(changeListFilterAC(filter, todoListID))
    }, [dispatch])

    const tasksForRender = (todoList: TodolistDomainType, tasks: TasksType) => {
        let currentTasks = tasks[todoList.id];
        switch (todoList.filter) {
            case 'active': {
                currentTasks = currentTasks.filter(item => item.status === TaskStatuses.New)
                break;
            }
            case 'completed': {
                currentTasks = currentTasks.filter(item => item.status === TaskStatuses.Completed)
                break;
            }
        }
        return currentTasks
    }

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((todoList) => {

                    return <TodoList
                        removeTodoList={removeTodoList}
                        todoListID={todoList.id}
                        key={todoList.id}
                        title={todoList.title}
                        tasks={tasksForRender(todoList, allTasks)}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={todoList.filter}
                        changeListTitle={changeListTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
