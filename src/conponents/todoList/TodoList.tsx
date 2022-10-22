import React, {memo, useCallback} from 'react';
import Button from "../common/Button";
import style from "./TodoList.module.css";
import AddItemForm from "../common/AddItemForm";
import {MutableSpan} from "../common/MutableSpan";
import Task from "../task/Task";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";
import {TaskFilterType} from "../../reducers/todoLists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    changeFilter: (filter: TaskFilterType, todoListID: string) => void,
    addTask: (inputValue: string, todoListID: string) => void,
    filter: TaskFilterType,
    todoListID: string,
    removeTodoList: (todoListID: string) => void,
    changeListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList: React.FC<TodoListPropsType> = memo(({addTask, changeListTitle, todoListID, ...props}) => {
    const dispatch = useDispatch()
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, status, todoListID))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    }
    const removeTaskCallback = (taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(taskId, todoListID))
    }

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, todoListID)
    }, [addTask, todoListID])
    const setFilerCreator = (filter: TaskFilterType, todoListID: string) => {
        return () => props.changeFilter(filter, todoListID)
    }
    const changeListTitleCallback = useCallback((newTitle: string) => {
        changeListTitle(todoListID, newTitle)
    }, [changeListTitle, todoListID])

    return (
        <div className={style.todo_List}>
            <h3>
                <MutableSpan changeTitle={changeListTitleCallback} title={props.title}/>
            </h3>
            <Button callback={() => props.removeTodoList(todoListID)} title={'x'}/>
            <AddItemForm addItem={addTaskCallback}/>
            <ul className={style.task_list}>
                {props.tasks.map((item) => <Task key={item.id}
                                                 task={item}
                                                 changeTaskStatus={changeTaskStatus}
                                                 changeTaskTitle={changeTaskTitle}
                                                 removeTaskCallback={removeTaskCallback}
                                                 todoListID={todoListID}/>)}
            </ul>
            <div className={style.filter_container}>
                <Button
                    callback={setFilerCreator('all', todoListID)}
                    title={'All'}
                    active={props.filter === 'all'}
                />

                <Button
                    callback={setFilerCreator('active', todoListID)}
                    title={'Active'}
                    active={props.filter === 'active'}
                />
                <Button
                    callback={setFilerCreator('completed', todoListID)}
                    title={'Completed'}
                    active={props.filter === 'completed'}
                />

            </div>
        </div>
    );
})

export default TodoList;