import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm',
    component: AddItemForm,
}
const callback = action('addItem')
export const AddItemFormExample = () => {
    return <AddItemForm addItem={callback}/>
}