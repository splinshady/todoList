import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6a3e89cd-d88e-4f3a-9ebc-280dc7449e40'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('What to byu!1!')
            .then(response => {
                setState(response.data.data.item.title)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = '1705830a-9e3a-4fae-8c78-b6041b489351'
        todolistAPI.deleteTodolist(listID)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = 'd4792874-cf46-4017-b48e-135806307e98'
        todolistAPI.updateTodolist(listID, 'React')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

//Tasks

export const createTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = 'd4792874-cf46-4017-b48e-135806307e98'
        todolistAPI.createTask(listID, 'asdfghjkl;')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = 'd4792874-cf46-4017-b48e-135806307e98'
        todolistAPI.getTasks(listID)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const deleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = 'd4792874-cf46-4017-b48e-135806307e98'
        const taskID = 'ab772d1b-3216-40d7-9199-ff6609975a2d'
        todolistAPI.deleteTask(listID, taskID)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

/*export const updateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = 'd4792874-cf46-4017-b48e-135806307e98'
        const taskID = '223863d2-23eb-455b-83aa-40e8fa85b9a7'
        todolistAPI.updateTask(listID, taskID)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
