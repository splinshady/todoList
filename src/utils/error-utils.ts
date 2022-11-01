import { Dispatch } from 'redux'
import {ResponseType} from '../api/todolist-api'
import {setAppError, setAppStatus} from '../reducers/app-reducer'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if( data.resultCode === 1) {
        data.messages[0]
            ? dispatch(setAppError(data.messages[0]))
            : dispatch(setAppError('something went wrong'))
    }
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}