import React, {ChangeEvent, memo} from 'react';
import style from "./Task.module.css";
import {MutableSpan} from "../../conponents/MutableSpan/MutableSpan";
import Button from "../../conponents/Button";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../app/app-reducer";

type TaskPropsType = {
  task: TaskType
  todoListID: string,
  changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void,
  changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void,
  removeTaskCallback: (taskId: string, todoListID: string) => void,
}

const Task: React.FC<TaskPropsType> = memo((props) => {
  const  entityStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    let status: TaskStatuses
    status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    props.changeTaskStatus(props.task.id, status, props.todoListID)
  }
  const changeTaskTitle = (newTitle: string) => {
    props.changeTaskTitle(props.task.id, newTitle, props.todoListID)
  }
  const removeTaskCallback = () => {
    props.removeTaskCallback(props.task.id, props.todoListID)
  }
  return (
    <li key={props.task.id}
        className={props.task.status === TaskStatuses.Completed ? `${style.task_item_checked} ${style.task_item}` : style.task_item}>
      <input type="checkbox"
             checked={props.task.status === TaskStatuses.Completed}
             onChange={changeTaskStatus}/>
      <div className={style.task_container}>
        <MutableSpan changeTitle={changeTaskTitle} title={props.task.title}/>
      </div>
      <Button taskStatus={props.task.status} delete disabled={entityStatus === 'loading'} callback={removeTaskCallback} title={'x'}/>
    </li>
  )
});

export default Task;