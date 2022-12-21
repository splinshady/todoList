import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, FieldsErrorsType, LoginParamsType} from "../../api/todolist-api";
import {setAppStatus} from "../../reducers/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

// thunks

export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {
  rejectValue: {errors: string[], fieldsErrors?: FieldsErrorsType[]}
}>('auth/login', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  try {
    const res = await authAPI.login(param)
    if (res.data.resultCode === 0) {
      return {isLoggedIn: true}
    } else {
      handleServerAppError<{ userId: number }>(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
    }
  } catch (e: any) {
    const error: AxiosError = e
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})

  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})

export const logoutTC = createAsyncThunk<{isLoggedIn: boolean}>('auth/logout', async (param , thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      return {isLoggedIn: false}
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  } catch (e: any) {
    const error: AxiosError = e
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)

  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})

// reducer

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  } as initialAuthStateType,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  }
})

export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// types

type initialAuthStateType = {
  isLoggedIn: boolean
}