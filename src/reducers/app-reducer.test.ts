import {appReducer, InitialStateType, setAppError, setAppStatus} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('correct error should be set', () => {
    const endState: InitialStateType = appReducer(startState, setAppError('correct error'))
    expect(endState.error).toEqual('correct error')
})

test('correct status should be set', () => {
    const endState: InitialStateType = appReducer(startState, setAppStatus('loading'))
    expect(endState.status).toEqual('loading')
})
