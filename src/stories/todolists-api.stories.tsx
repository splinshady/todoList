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
        const listID = '27650c3f-df77-4e49-9e3b-59e3a4ae47f2'
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