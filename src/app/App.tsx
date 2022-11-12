import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchTodoListsTC} from "../reducers/todoLists-reducer";
import {AppRootStateType} from "./store";
import {TaskType} from "../api/todolist-api";
import {AppBar, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {RequestStatusType} from "../reducers/app-reducer";
import CustomizedSnackbars from "../conponents/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/login/Login";
import Button from "@mui/material/Button";
import {Menu} from "@mui/icons-material";
import {Navigate, Route, Routes} from "react-router-dom";
import TodoListsPage from "../features/todoList/TodoListsPage";

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    const dispatch = useDispatch()
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)


    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    return (
        <>

            <div className="App">
                <CustomizedSnackbars/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {requestStatus === 'loading' && <LinearProgress color="info"/>}
                </AppBar>
                <Routes>
                    <Route path='/' element={<TodoListsPage />}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;