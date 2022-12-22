import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, memo, useState} from 'react'
import style from './AddItemForm.module.css'
import Button from "./Button";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type AddItemFormPropsType = DefaultInputPropsType & {
    addItem: (title: string) => void
    disabled?: boolean
}

const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
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

    const addItem = () => {
        if (inputValue.trim()) {
            props.addItem(inputValue.trim())
            setInputValue('')
        } else {
            setInputError(true)
        }
    }

    const pressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addItem()
    }

    const inputStyle = `${style.input_style} ${inputError && style.input_error}`

    return (
        <div className={style.input_container}>
            {inputError && <span className={style.input_message_error}>incorrect task name</span>}
            <input
                className={inputStyle}
                type={"text"}
                disabled={props.disabled}
                onKeyDown={pressEnterHandler}
                onChange={inputChangeHandler}
                value={inputValue}
            />
            <Button callback={addItem} title={'add'} disabled={props.disabled}/>
        </div>
    )
})

export default AddItemForm
