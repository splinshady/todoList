import React from 'react';
import {TaskFilterType} from "../../App";
import Button from "../common/Button";
import style from "./TodoList.module.css";
import AddItemForm from "../common/AddItemForm";
import {MutableSpan} from "../common/MutableSpan";

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
    removeTodoList: (todoListID: string) => void,
    changeTaskTitle: (taskID: string, todoListID: string, newTitle: string) => void
    changeListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const setFilerCreator = (filter: TaskFilterType, todoListID: string) => {
        return () => props.changeFilter(filter, todoListID)
    }
    const removeTask = (id: string) => {
        props.removeTask(id, props.todoListID)
    }
    const changeListTitle = (newTitle: string) => {
        props.changeListTitle(props.todoListID, newTitle)
    }

    return (
        <div className={style.todo_List}>
            <h3>
                <MutableSpan changeTitle={changeListTitle} title={props.title}/>
            </h3>
            <Button callback={() => props.removeTodoList(props.todoListID)} title={'x'}/>
            <AddItemForm addItem={addTask}/>
            <ul className={style.task_list}>
                {props.tasks.map((item) => {

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(item.id, props.todoListID, newTitle)
                    }

                    return (
                        <li key={item.id}
                            className={item.isDone ? `${style.task_item_checked} ${style.task_item}` : style.task_item}>
                            <input type="checkbox"
                                   checked={item.isDone}
                                   onChange={event => props.changeTaskStatus(item.id, event.currentTarget.checked, props.todoListID)}/>
                            <MutableSpan changeTitle={changeTaskTitle} title={item.title}/>
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