import React, {ChangeEvent, memo} from 'react';
import style from "../todoList/TodoList.module.css";
import {MutableSpan} from "../common/MutableSpan";
import Button from "../common/Button";
import {TaskType} from "../todoList/TodoList";

type TaskPropsType = {
    task: TaskType
    todoListID: string,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void,
    removeTaskCallback: (taskId: string, todoListID: string) => void,
}

const Task: React.FC<TaskPropsType> = memo((props) => {
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListID)
    }
    const removeTaskCallback = () => {
        props.removeTaskCallback(props.task.id, props.todoListID)
    }
    return (
        <li key={props.task.id}
            className={props.task.isDone ? `${style.task_item_checked} ${style.task_item}` : style.task_item}>
            <input type="checkbox"
                   checked={props.task.isDone}
                   onChange={changeTaskStatus}/>
            <MutableSpan changeTitle={changeTaskTitle} title={props.task.title}/>
            <Button callback={removeTaskCallback} title={'delete'}/>
        </li>
    )
});

export default Task;