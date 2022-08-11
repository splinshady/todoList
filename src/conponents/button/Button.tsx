import React from 'react';
import style from "./Button.module.css";

type ButtonPropsType = {
    callback: (event:any) => void,
    title: string,
    active?: boolean,
}

const Button: React.FC<ButtonPropsType> = ({callback, title, active}) => {
    return (
        <button className={`${active ? style.button_active : ''} ${style.button}`} onClick={callback}>{title}</button>
    );
};

export default Button;