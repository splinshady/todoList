import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "../api/todolist-api";
import {AppBar, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import CustomizedSnackbars from "../conponents/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/login/Login";
import Button from "@mui/material/Button";
import {Navigate, Route, Routes} from "react-router-dom";
import TodoListsPage from "../features/todoList/TodoListsPage";
import {logoutTC} from "../features/login/auth-reducer";

export type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {
  const dispatch = useDispatch()
  const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const loginName = useSelector<AppRootStateType, string>(state => state.app.loginName)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const logoutHandler = () => {
    dispatch(logoutTC())
  }


  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <>
      {!isInitialized
        ? <div
          style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
          <CircularProgress/>
        </div>
        : <div className="App">
          {requestStatus === 'loading' && <div className={'linear_progress'}><LinearProgress color="info"/></div>}
          <CustomizedSnackbars/>
          <AppBar position="static">
            <Toolbar className={'header_container'}>
              {isLoggedIn && <span>{loginName}</span>}
              {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path='/' element={<TodoListsPage/>}/>
            <Route path='/todoList' element={<TodoListsPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
          </Routes>
        </div>}
    </>
  );
}

export default App;
