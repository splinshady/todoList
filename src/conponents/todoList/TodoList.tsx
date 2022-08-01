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
    removeTask: (taskID: string) => void,
    changeFilter: (filter: TaskFilterType) => void,
    addTask: (inputValue: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [inputValue, setInputValue] = useState<string>('')

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    const pressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addTask()
    }
    const addTask = () => {
        props.addTask(inputValue)
        setInputValue('')
    }
    const setFilerCreator = (filter: TaskFilterType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div className={style.todo_List}>
            <h3>{props.title}</h3>
            <div>
                <input type={"text"} onKeyDown={pressEnterHandler} onChange={inputChangeHandler} value={inputValue}/>
                <Button callback={addTask} title={'add'}/>
            </div>
            <ul className={style.task_list}>
                {props.tasks.map((item) => {
                    return (
                        <li key={item.id} className={style.task_item}>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                            <Button callback={()=>{props.removeTask(item.id)}} title={'delete'}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button callback={setFilerCreator('all')} title={'All'}/>
                <Button callback={setFilerCreator('active')} title={'Active'}/>
                <Button callback={setFilerCreator('completed')} title={'Completed'}/>
            </div>
        </div>
    );
};

export default TodoList;