import {Dispatch} from 'redux'
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {setAppStatus} from "../../reducers/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk('auth/login', (data: LoginParamsType, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}))
      } else {
        handleServerAppError<{ userId: number }>(res.data, thunkAPI.dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, thunkAPI.dispatch)
    })
    .finally(() => {
      thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    })
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  } as initialAuthStateType,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})

export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// thunks


export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setAppStatus({status: 'succeeded'}))
    })
}

// types

type initialAuthStateType = {
  isLoggedIn: boolean
}