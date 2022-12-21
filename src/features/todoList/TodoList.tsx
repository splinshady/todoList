import React, {memo, useCallback, useEffect} from 'react';
import Button from "../../conponents/Button";
import style from "./TodoList.module.css";
import AddItemForm from "../../conponents/AddItemForm";
import {MutableSpan} from "../../conponents/MutableSpan";
import Task from "../task/Task";
import {
    fetchTasksTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC
} from "../../reducers/tasks-reducer";
import {TaskFilterType} from "../../reducers/todoLists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "../../reducers/app-reducer";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    changeFilter: (filter: TaskFilterType, todoListID: string) => void,
    addTask: (inputValue: string, todoListID: string) => void,
    filter: TaskFilterType,
    todoListID: string,
    entityStatus: RequestStatusType,
    removeTodoList: (todoListID: string) => void,
    changeListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList: React.FC<TodoListPropsType> = memo(({addTask, changeListTitle, todoListID, ...props}) => {

    const dispatch = useDispatch()

    const changeTaskStatus = (taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskStatusTC({todoListID, status, taskID}))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(updateTaskTitleTC({todoListID, title, taskID}))
    }
    const removeTaskCallback = (taskId: string, todoListID: string) => {
        dispatch(removeTaskTC({taskId, todoListID}))
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

    useEffect(() => {
        dispatch(fetchTasksTC(todoListID))
    }, [])

    return (
        <div className={style.todo_List}>
            <h3>
                <MutableSpan changeTitle={changeListTitleCallback} title={props.title}/>
            </h3>
            <Button disabled={props.entityStatus === 'loading'} callback={() => props.removeTodoList(todoListID)} title={'delete todolist'}/>
            <AddItemForm addItem={addTaskCallback} disabled={props.entityStatus === 'loading'}/>
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