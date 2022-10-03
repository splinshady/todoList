import React, {ChangeEvent, memo} from 'react';
import style from "../todoList/TodoList.module.css";
import {MutableSpan} from "../common/MutableSpan";
import Button from "../common/Button";
import {TaskType} from "../todoList/TodoList";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todoListID: string,
}

const Task: React.FC<TaskPropsType> = memo(({ ...props}) => {
    const dispatch = useDispatch()
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, event.currentTarget.checked, props.todoListID))
    }
    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todoListID))
    }
    const removeTaskCallback = () => {
        dispatch(removeTaskAC(props.task.id, props.todoListID))
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