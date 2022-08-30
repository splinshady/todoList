import React, {ChangeEvent, useState} from 'react';

type MutableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void,
}

export const MutableSpan: React.FC<MutableSpanPropsType> = (props) => {
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
            ? <input type="text" value={title} onChange={onChangeTitleHandler} onBlur={deactivateEditMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};