import React from 'react';
import { MutableSpan } from './MutableSpan';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";

export default {
    title: 'MutableSpan',
    component: MutableSpan,
    argTypes: {
        title: { title: '' },
        changeTitle: { title: 'changeTitle' },
    },
} as ComponentMeta<typeof MutableSpan>;

const Template: ComponentStory<typeof MutableSpan> = (args) => <MutableSpan {...args} />;

export const Span = Template.bind({});
Span.args = {
    title: 'Span Title',
    changeTitle: action('changeTitle')
};
