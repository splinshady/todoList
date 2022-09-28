import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./conponents/todoList/TodoList";
import AddItemForm from "./conponents/common/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC, changeListFilterAC, changeListTitleAC, removeListAC} from "./reducers/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {AppRootStateType} from "./state/store";

export type TaskFilterType = 'all' | 'active' | 'completed';
export type TodoListsType = {
    id: string,
    title: string,
    filter: TaskFilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    const dispatch = useDispatch()
    const allTasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)
    const changeFilter = (filter: TaskFilterType, todoListID: string) => {
        dispatch(changeListFilterAC(filter, todoListID))
    }

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const addTask = (inputValue: string, todoListID: string) => {
        dispatch(addTaskAC(inputValue, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, todoListID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    const removeTodoList = (todoListID: string) => {
        dispatch(removeListAC(todoListID))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }
    const changeListTitle = (todoListID: string, newTitle: string) => {
        dispatch(changeListTitleAC(todoListID, newTitle))
    }

    const tasksForRender = (todoList: TodoListsType, tasks: TasksType) => {
        let currentTasks = tasks[todoList.id];
        switch (todoList.filter) {
            case 'active': {
                currentTasks = currentTasks.filter(item => !item.isDone)
                break;
            }
            case 'completed': {
                currentTasks = currentTasks.filter(item => item.isDone)
                break;
            }
        }
        return currentTasks
    }

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
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={todoList.filter}
                        changeListTitle={changeListTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
