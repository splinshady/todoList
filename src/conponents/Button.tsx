import React from 'react';
import style from "./Button.module.css";

type ButtonPropsType = {
  callback: (event: any) => void,
  title: string,
  disabled?: boolean
  active?: boolean,
  delete?: boolean
}

const Button: React.FC<ButtonPropsType> = ({callback, title, active, ...props}) => {
  let endStyle = `${active && style.common} ${active && style.button_active} ${props.delete ? style.button_delete : style.button}`
  return (
    <button disabled={props.disabled} className={endStyle} onClick={callback}>{title}</button>
  );
};

export default Button;