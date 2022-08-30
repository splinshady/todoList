import React, {ChangeEvent, useState} from 'react';
import style from "./TodoList.module.css";

type MutableTaskPropsType = {
    title: string,
    isDone: boolean,
    changeTaskTitle: (taskID: string, newTitle: string) => void,
    taskID: string,
}

export const MutableTask: React.FC<MutableTaskPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    let spanClass = props.isDone ? style.task_item_checked : ''

    const activateEditMode = () => {
        setTitle(props.title)
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.changeTaskTitle(props.taskID, title)
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (editMode
            ? <input type="text" value={title} onChange={onChangeTitleHandler} onBlur={deactivateEditMode} autoFocus/>
            : <span className={spanClass} onDoubleClick={activateEditMode}>{props.title}</span>
    );
};