import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TaskFilterType} from "../../App";
import Button from "../button/Button";
import style from "./TodoList.module.css";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string, todoListID: string) => void,
    changeFilter: (filter: TaskFilterType, todoListID: string) => void,
    addTask: (inputValue: string, todoListID: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: TaskFilterType,
    todoListID: string,
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === ' ') {
            setInputError(true)
        } else {
            setInputError(false)
            setInputValue(event.currentTarget.value)
        }
    }
    const pressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addTask()
    }
    const addTask = () => {
        if (inputValue.trim()) {
            props.addTask(inputValue, props.todoListID)
            setInputValue('')
        } else {
            setInputError(true)
        }
    }
    const setFilerCreator = (filter: TaskFilterType, todoListID: string) => {
        return () => props.changeFilter(filter, todoListID)
    }
    const removeTask = (id: string) => {
        setTimeout(() => {
            props.removeTask(id, props.todoListID)
        }, 500)
    }

    const inputStyle = `${style.input_style} ${inputError ? style.input_error : ''}`

    return (
        <div className={style.todo_List}>
            <h3>{props.title}</h3>

            <div className={style.input_container}>
                {inputError && <span className={style.input_message_error}>incorrect task name</span>}
                <input
                    className={inputStyle}
                    type={"text"}
                    onKeyDown={pressEnterHandler}
                    onChange={inputChangeHandler}
                    value={inputValue}
                />
                <Button callback={addTask} title={'add'}/>
            </div>

            <ul className={style.task_list}>
                {props.tasks.map((item) => {
                    return (
                        <li key={item.id} className={style.task_item}>
                            <input type="checkbox"
                                   checked={item.isDone}
                                   onChange={event => props.changeTaskStatus(item.id, event.currentTarget.checked, props.todoListID)}/>
                            <span className={item.isDone ? style.task_item_checked : ''}>{item.title}</span>
                            <Button
                                callback={() => {
                                    removeTask(item.id)
                                }} title={'delete'}/>
                        </li>
                    )
                })}
            </ul>
            <div className={style.filter_container}>
                <Button
                    callback={setFilerCreator('all', props.todoListID)}
                    title={'All'}
                    active={props.filter === 'all'}
                />

                <Button
                    callback={setFilerCreator('active', props.todoListID)}
                    title={'Active'}
                    active={props.filter === 'active'}
                />
                <Button
                    callback={setFilerCreator('completed', props.todoListID)}
                    title={'Completed'}
                    active={props.filter === 'completed'}
                />

            </div>
        </div>
    );
};

export default TodoList;