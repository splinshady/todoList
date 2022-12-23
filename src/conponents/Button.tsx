import React from 'react';
import style from "./Button.module.css";
import {TaskStatuses} from "../api/todolist-api";

type ButtonPropsType = {
  callback: (event: any) => void,
  title: string,
  disabled?: boolean
  active?: boolean,
  delete?: boolean,
  taskStatus?: TaskStatuses
}

const Button: React.FC<ButtonPropsType> = ({callback, title, active, ...props}) => {
  let endStyle = `${active && style.common} 
                  ${active && style.button_active} 
                  ${props.delete ? style.button_delete : style.button} 
                  ${props.taskStatus === TaskStatuses.Completed && style.task_fulfilled}`
  return (
    <button disabled={props.disabled} className={endStyle} onClick={callback}>{title}</button>
  );
};

export default Button;