import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import App from "./App";
import {ProviderDecorator} from "../.storybook/ProviderDecorator";

export default {
    title: 'App',
    component: App,
    decorators: [ProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const AppWithRedux = Template.bind({});
AppWithRedux.args = {
    title: 'Span Title',
    changeTitle: action('changeTitle')
};
