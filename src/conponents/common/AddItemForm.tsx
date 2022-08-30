import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import style from './AddItemForm.module.css'
import Button from "./Button";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type AddItemFormPropsType = DefaultInputPropsType & {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === ' ') {
            setInputError(true)
        } else {
            setInputError(false)
            setInputValue(event.currentTarget.value)
        }
    }

    const pressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && props.addItem(inputValue)
    }

    const addItem = () => {
        if (inputValue.trim()) {
            props.addItem(inputValue.trim())
            setInputValue('')
        } else {
            setInputError(true)
        }
    }

    const inputStyle = `${style.input_style} ${inputError ? style.input_error : ''}`

    return (
        <div className={style.input_container}>
            {inputError && <span className={style.input_message_error}>incorrect task name</span>}
            <input
                className={inputStyle}
                type={"text"}
                onKeyDown={pressEnterHandler}
                onChange={inputChangeHandler}
                value={inputValue}
            />
            <Button callback={addItem} title={'add'}/>
        </div>
    )
}

export default AddItemForm
