import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./conponents/todoList/TodoList";
import {v1} from "uuid";
import AddItemForm from "./conponents/common/AddItemForm";

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
    const changeFilter = (filter: TaskFilterType, todoListID: string) => {
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
    const changeTaskTitle = (taskID: string, todoListID: string, newTitle: string) => {
        let tasks = allTasks[todoListID]
        let task = tasks.find(task => taskID === task.id)
        if (task) {
            task.title = newTitle
            setAllTasks({...allTasks})
        }
    }

    const removeTodoList = (todoListID: string) => {
        let filteredTodoList = todoLists.filter(list => list.id !== todoListID)
        setTodoLists(filteredTodoList);
        delete allTasks[todoListID]
        setAllTasks({...allTasks})
    }
    const addTodoList = (title: string) => {
        let todoList: TodoListsType = {id: v1(), title: title, filter: 'all'}
        setTodoLists(
            [todoList, ...todoLists]
        )
        setAllTasks({...allTasks, [todoList.id]: []})
    }
    const changeListTitle = (todoListID: string, newTitle: string) => {
        let list = todoLists.find(item => item.id === todoListID)
        if (list) {
            list.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'tasks react', filter: 'active'},
        {id: todoListID2, title: 'what to by', filter: 'completed'},
    ])
    let [allTasks, setAllTasks] = useState<TasksType>({
        [todoListID1]: [
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'salt', isDone: true},
            {id: v1(), title: 'pasta', isDone: false},
        ]
    })

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
