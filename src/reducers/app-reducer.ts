
const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
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

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type InitialStateType = {
    status: RequestStatusType,
    error: AppErrorType
}
type ActionsType = ReturnType<typeof setAppStatus | typeof setAppError>