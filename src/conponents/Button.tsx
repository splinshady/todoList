import React from 'react';
import style from "./Button.module.css";

type ButtonPropsType = {
    callback: (event:any) => void,
    title: string,
    disabled?: boolean
    active?: boolean,
}

const Button: React.FC<ButtonPropsType> = ({callback, title, active, ...props}) => {
    const endStyle = `${active ? style.button_active : ''} ${style.button} ${true ? style.button_disabled: ''}`
    return (
        <button disabled={props.disabled} className={endStyle} onClick={callback}>{title}</button>
    );
};

export default Button;