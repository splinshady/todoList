import React, {ChangeEvent, memo, useState} from 'react';
import style from './Mutablespan.module.css'

type MutableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void,
}

export const MutableSpan: React.FC<MutableSpanPropsType> = memo((props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setTitle(props.title)
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (editMode
            ? <input className={style.item} type="text" value={title} onChange={onChangeTitleHandler} onBlur={deactivateEditMode} autoFocus/>
            : <span className={style.item} onDoubleClick={activateEditMode}>{props.title}</span>
    );
})