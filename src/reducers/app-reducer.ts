import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatus({status: 'loading'}))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}))
    } else {
      handleServerAppError<{ userId: number, email: string, login: string }>(res.data, dispatch);
      return rejectWithValue(null)
    }
  } catch (error: any) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setAppStatus({status: 'succeeded'}))
  }
  return {isInitialized: true}
})

export const slice = createSlice({
  name: 'app',
  initialState: {
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
    })
  }
})

export const {setAppStatus, setAppError} = slice.actions
export const appReducer = slice.reducer

// thunks


// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type InitialAppStateType = {
  status: RequestStatusType,
  error: AppErrorType,
  isInitialized: boolean,
}