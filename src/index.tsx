import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {store} from "./app/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement as HTMLElement)


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
