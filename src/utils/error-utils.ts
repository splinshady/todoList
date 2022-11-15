import { Dispatch } from 'redux'
import {ResponseType} from '../api/todolist-api'
import {setAppError, setAppStatus} from '../reducers/app-reducer'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if( data.resultCode === 1) {
        data.messages[0]
            ? dispatch(setAppError({error: data.messages[0]}))
            : dispatch(setAppError({error: 'something went wrong'}))
    }
  if( data.resultCode === 10) {
    data.messages[0]
      ? dispatch(setAppError({error: data.messages[0]}))
      : dispatch(setAppError({error: 'something went wrong'}))
  }
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppError({error: error.message}))
    dispatch(setAppStatus({status: 'failed'}))
}