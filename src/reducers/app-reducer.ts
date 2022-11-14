import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/login/authReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: InitialStateType = {
  status: 'loading',
  error: null,
  isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-IS-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

// actions

export const setAppStatus = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    status
  } as const
}
export const setAppError = (error: AppErrorType) => {
  return {
    type: 'APP/SET-ERROR',
    error
  } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized
  } as const
}

// thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'))
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    } else {
      handleServerAppError<{ userId: number, email: string, login: string }>(res.data, dispatch);
    }
  })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
      dispatch(setAppStatus('succeeded'))
    })
}

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type InitialStateType = {
  status: RequestStatusType,
  error: AppErrorType,
  isInitialized: boolean,
}
type ActionsType = ReturnType<typeof setAppStatus | typeof setAppError | typeof setIsInitializedAC>