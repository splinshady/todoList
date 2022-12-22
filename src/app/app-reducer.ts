import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

// thunks

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatus({status: 'loading'}))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      console.log()
      dispatch(setIsLoggedInAC({isLoggedIn: true}))
      return {isInitialized: true, loginName: res.data.data.login}
    } else {
      handleServerAppError<{ userId: number, email: string, login: string }>(res.data, dispatch);
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setAppStatus({status: 'succeeded'}))
  }
})

export const slice = createSlice({
  name: 'app',
  initialState: {
    loginName: '',
    status: 'loading',
    error: null,
    isInitialized: false,
  } as InitialAppStateType,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.isInitialized = action.payload.isInitialized
      state.loginName = action.payload.loginName
    })
  }
})

export const {setAppStatus, setAppError} = slice.actions
export const appReducer = slice.reducer

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type InitialAppStateType = {
  status: RequestStatusType,
  error: AppErrorType,
  isInitialized: boolean,
  loginName: string
}