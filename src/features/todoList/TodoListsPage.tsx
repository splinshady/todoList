import React, {useCallback} from 'react';
import style from './TodoListsPage.module.css';
import AddItemForm from "../../conponents/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../reducers/app-reducer";
import {
    changeListFilterAC,
    changeTodoListsTitleTC,
    createTodoListsTC,
    removeTodoListsTC, TaskFilterType,
    TodolistDomainType
} from "../../reducers/todoLists-reducer";
import {addTaskTC} from "../../reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import TodoList from "./TodoList";
import {TasksType} from "../../app/App";

const TodoListsPage = () => {
    const dispatch = useDispatch()
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const allTasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)

    const addTask = useCallback((inputValue: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, inputValue))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListsTC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListsTC(title))
    }, [dispatch])
    const changeListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodoListsTitleTC(todoListID, newTitle))
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

    const todoListsForRender = todoLists.map((todoList) => {
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
            entityStatus={todoList.entityStatus}
        />
    })
    return (
        <div className={style.todoLists_container}>
            <AddItemForm addItem={addTodoList}/>
            {todoListsForRender}
        </div>
    );
};

export default TodoListsPage;