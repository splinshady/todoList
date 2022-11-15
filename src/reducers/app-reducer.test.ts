import {appReducer, InitialAppStateType, setAppError, setAppStatus} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false
  }
})

test('correct error should be set', () => {
  const endState: InitialAppStateType = appReducer(startState, setAppError({error: 'correct error'}))
  expect(endState.error).toEqual('correct error')
})

test('correct status should be set', () => {
  const endState: InitialAppStateType = appReducer(startState, setAppStatus({status: 'loading'}))
  expect(endState.status).toEqual('loading')
})
