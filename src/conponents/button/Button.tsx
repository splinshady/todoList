import React from 'react';
import style from "./Button.module.css";

type ButtonPropsType = {
    callback: (event:any) => void,
    title: string,
}

const Button: React.FC<ButtonPropsType> = ({callback, title}) => {
    return (
        <button className={style.button} onClick={callback}>{title}</button>
    );
};

export default Button;