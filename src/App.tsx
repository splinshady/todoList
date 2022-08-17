import React, {useState} from 'react';
import './App.css';
import TodoList from "./conponents/todoList/TodoList";
import {v1} from "uuid";

export type TaskFilterType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string,
    title: string,
    filter: TaskFilterType
}

function App() {

    const changeFilter = (filter: TaskFilterType, todoListID: string) => {
        debugger
        let list = todoLists.find(list => list.id === todoListID);
        if (list) {
            list.filter = filter;
            setTodoLists([...todoLists])
        }

    }
    const removeTask = (taskID: string, todoListID: string) => {
        let tasks = allTasks[todoListID]
        let filteredTasks = tasks.filter(item => item.id !== taskID)
        allTasks[todoListID] = filteredTasks
        setAllTasks({...allTasks})
    }

    const addTask = (inputValue: string, todoListID: string) => {
        let tasks = allTasks[todoListID]

        let inputValueWithoutSpase = inputValue.trim()
        if (inputValueWithoutSpase.length > 0) {
            allTasks[todoListID] = [{id: v1(), title: inputValue, isDone: false}, ...tasks]
            setAllTasks({...allTasks})
        }
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        let tasks = allTasks[todoListID]
        let task = tasks.find(task => taskID === task.id)
        if (task) {
            task.isDone = isDone
            setAllTasks({...allTasks})
        }
    }

    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'tasks react', filter: 'active'},
        {id: todoListID2, title: 'what to by', filter: 'completed'},
    ])

    let [allTasks, setAllTasks] = useState({
        [todoListID1] : [
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false},
        ],
        [todoListID2] : [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'salt', isDone: true},
            {id: v1(), title: 'pasta', isDone: false},
        ]
    })

    return (
        <div className="App">
            {
                todoLists.map((todoList) => {
                    let currentTasks = allTasks[todoList.id];
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
                    return <TodoList
                        todoListID={todoList.id}
                        key={todoList.id}
                        title={todoList.title}
                        tasks={currentTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todoList.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
