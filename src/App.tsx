import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./conponents/todoList/TodoList";

export type TaskFilterType = 'all' | 'active' | 'completed';


function App() {
    const [tasks, setTasks] = React.useState<Array<TaskType>>([
        {id: 1, title: 'html', isDone: true},
        {id: 2, title: 'css', isDone: true},
        {id: 3, title: 'js', isDone: false},
    ])

    const [filter, setFilter] = React.useState<TaskFilterType>('all')
    const changeFilter = (filter: TaskFilterType) => {
        setFilter(filter);
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

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(item => item.id !== taskID))
    }

    return (
        <div className="App">
            <TodoList title={'tasks react'}
                      tasks={currentTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
