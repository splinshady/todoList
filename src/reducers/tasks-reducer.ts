import {TasksType} from "../app/App";
import {addTodoListAC, getTodoListsAC, removeListAC} from "./todoLists-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";
import {setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksType = {}

export const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListID: string }>) {
      state[action.payload.todoListID] = state[action.payload.todoListID].filter(task => task.id !== action.payload.taskId)
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType, todoListID: string }>) {
      state[action.payload.todoListID] = [{...action.payload.task}, ...state[action.payload.todoListID]]
    },
    changeTaskStatusAC(state, action: PayloadAction<{ taskId: string, status: TaskStatuses, todoListID: string }>) {
      state[action.payload.todoListID] = state[action.payload.todoListID]
        .map(task => task.id === action.payload.taskId ? {...task, status: action.payload.status} : task)
    },
    changeTaskTitleAC(state, action: PayloadAction<{ taskId: string, title: string, todoListID: string }>) {
      state[action.payload.todoListID] = state[action.payload.todoListID]
        .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
    },
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todoListID: string }>) {
      state[action.payload.todoListID] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoListsAC, (state, action) => {
      action.payload.todoLists.forEach(todoList => {
        state[todoList.id] = []
      })
    })
    builder.addCase(addTodoListAC, (state, action) => {
      state[action.payload.todoList.id] = []
    })
    builder.addCase(removeListAC, (state, action) => {
      delete state[action.payload.id]
    })
  }
})

export const tasksReducer = slice.reducer
export default tasksReducer
export const {removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, setTasksAC} = slice.actions

//Thunk

export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  todolistAPI.getTasks(todoListID)
    .then(response => {
      dispatch(setTasksAC({tasks: response.data.items, todoListID}))
    })
    .finally(() => {
      dispatch(setAppStatus({status: 'succeeded'}))
    })
}
export const removeTaskTC = (taskId: string, todoListID: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  todolistAPI.deleteTask(todoListID, taskId)
    .then(response => {
      response.data.resultCode === 0 && dispatch(removeTaskAC({taskId, todoListID}))
      dispatch(setAppStatus({status: 'succeeded'}))
    })
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  todolistAPI.createTask(todoListID, title)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(addTaskAC({task: response.data.data.item, todoListID}))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setAppStatus({status: 'succeeded'}))
    })
}
export const updateTaskStatusTC = (todoListID: string, status: TaskStatuses, taskID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(setAppStatus({status: 'loading'}))
  const currentTodoListTasks = getState().tasks[todoListID]
  let task = currentTodoListTasks.find(task => task.id === taskID)
  if (!task) {
    throw new Error('task not found in the state')
  }
  todolistAPI.updateTask(todoListID, taskID, {...task, status})
    .then(response => {
      dispatch(changeTaskStatusAC({taskId: taskID, todoListID, status: response.data.data.item.status}))
      dispatch(setAppStatus({status: 'succeeded'}))
    })
}
export const updateTaskTitleTC = (todoListID: string, title: string, taskID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(setAppStatus({status: 'loading'}))
  const currentTodoListTasks = getState().tasks[todoListID]
  let task = currentTodoListTasks.find(task => task.id === taskID)
  if (!task) {
    throw new Error('task not found in the state')
  }
  todolistAPI.updateTask(todoListID, taskID, {...task, title})
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(changeTaskTitleAC({taskId: taskID, todoListID, title: response.data.data.item.title}))
      } else {
        handleServerAppError(response.data, dispatch)
      }
      dispatch(setAppStatus({status: 'succeeded'}))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

