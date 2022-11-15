import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialAppStateType = {
  status: 'loading',
  error: null,
  isInitialized: false,
}

export const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{error: string | null}>) {
      state.error = action.payload.error
    },
    setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const {setAppStatus, setAppError, setIsInitializedAC} = slice.actions
export const appReducer = slice.reducer

// thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}))
    } else {
      handleServerAppError<{ userId: number, email: string, login: string }>(res.data, dispatch);
    }
  })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC({isInitialized: true}))
      dispatch(setAppStatus({status: 'succeeded'}))
    })
}

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type InitialAppStateType = {
  status: RequestStatusType,
  error: AppErrorType,
  isInitialized: boolean,
}