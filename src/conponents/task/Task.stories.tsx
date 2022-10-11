import React from 'react';
import Task from "./Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Task',
    component: Task,
}

const changeTaskStatusCallback = action('changeTaskStatus')
const changeTaskTitleCallback = action('changeTaskTitle')
const removeTaskCallbackCallback = action('removeTaskCallback')

export const TaskDoneExample = () => {
    return <Task task={{id: 'task-id', title: 'task-title', isDone: true,}}
                 changeTaskStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTaskCallback={removeTaskCallbackCallback}
                 todoListID={'todoListID1'}/>
}

export const TaskExample = () => {
    return <Task task={{id: 'task-id2', title: 'task-title2', isDone: false,}}
                 changeTaskStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTaskCallback={removeTaskCallbackCallback}
                 todoListID={'todoListID2'}/>
}