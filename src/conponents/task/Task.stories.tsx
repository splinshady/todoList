import React from 'react';
import Task from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {v1} from "uuid";


export default {
    title: 'Task',
    component: Task,
}

const changeTaskStatusCallback = action('changeTaskStatus')
const changeTaskTitleCallback = action('changeTaskTitle')
const removeTaskCallbackCallback = action('removeTaskCallback')

export const TaskDoneExample = () => {
    return <Task task={
        {
            id: 'task-id',
            title: 'task-title',
            status: TaskStatuses.Completed,
            description: 'dd',
            completed: false,
            priority: TaskPriorities.Middle,
            startDate: 'start Date',
            deadline: 'dead line',
            todoListId: 'todoListId',
            order: 0,
            addedDate: 'addedDate',
        }
    }
                 changeTaskStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTaskCallback={removeTaskCallbackCallback}
                 todoListID={'todoListID1'}/>
}

export const TaskExample = () => {
    return <Task task={
        {
            id: 'task-id2',
            title: 'task-title2',
            status: TaskStatuses.Completed,
            description: 'dd',
            completed: false,
            priority: TaskPriorities.Middle,
            startDate: 'start Date',
            deadline: 'dead line',
            todoListId: 'todoListId',
            order: 0,
            addedDate: 'addedDate',
        }
    }
                 changeTaskStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTaskCallback={removeTaskCallbackCallback}
                 todoListID={'todoListID2'}/>
}