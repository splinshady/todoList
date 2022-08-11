import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./conponents/todoList/TodoList";
import {v1} from "uuid";

export type TaskFilterType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'html', isDone: true},
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: false},
    ])

    const [filter, setFilter] = useState<TaskFilterType>('all')

    const changeFilter = (filter: TaskFilterType) => {
        setFilter(filter);
    }
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(item => item.id !== taskID))
    }
    const addTask = (inputValue: string) => {
        let inputValueWithoutSpase = inputValue.trim()
        if (inputValueWithoutSpase.length > 0) {
            setTasks([{id: v1(), title: inputValue, isDone: false}, ...tasks])
        }
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskID ? {...task, isDone: isDone} : task))
    }

    let currentTasks;
    switch (filter) {
        case 'active': {
            currentTasks = tasks.filter(item => !item.isDone)
            break;
        }
        case 'completed': {
            currentTasks = tasks.filter(item => item.isDone)
            break;
        }
        default: {
            currentTasks = tasks;
        }
    }

    return (
        <div className="App">
            <TodoList title={'tasks react'}
                      tasks={currentTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
