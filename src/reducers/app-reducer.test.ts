import {appReducer, InitialAppStateType, setAppError, setAppStatus, setIsInitializedAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
  startState = {
    status: 'loading',
    error: null,
    isInitialized: false,
  }
})

test('correct error should be set', () => {
  const endState: InitialAppStateType = appReducer(startState, setAppError({error: 'correct error'}))
  expect(endState.error).toEqual('correct error')
  //expect(3+2).toEqual(5)
})

/*test('correct status should be set', () => {
  const endState: InitialAppStateType = appReducer(startState, setAppStatus({status: 'loading'}))
  expect(endState.status).toEqual('loading')
})*/

/*test('correct initialized should be set', () => {
  const endState: InitialAppStateType = appReducer(startState, setIsInitializedAC({isInitialized: true}))
  expect(endState.isInitialized).toEqual(false)
})*/
