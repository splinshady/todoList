import {TasksType} from "../../app/App";
import {createTodoListsTC, fetchTodoListsTC, removeTodoListsTC} from "../todoList/todoLists-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', (todoListID: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  return todolistAPI.getTasks(todoListID)
    .then(response => {
      return {tasks: response.data.items, todoListID}
    })
    .finally(() => {
      thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    })
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todoListID: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  await todolistAPI.deleteTask(param.todoListID, param.taskId)
  thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  return {todoListID: param.todoListID, taskId: param.taskId}
})
export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todoListID: string, inputValue: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  try {
    const res = await todolistAPI.createTask(param.todoListID, param.inputValue)
    if (res.data.resultCode === 0) {
      return {task: res.data.data.item, todoListID: param.todoListID}
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  } catch
    (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})
export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus', async (param: { todoListID: string, status: TaskStatuses, taskID: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  const state = thunkAPI.getState() as AppRootStateType
  const currentTodoListTasks = state.tasks[param.todoListID]
  let task = currentTodoListTasks.find(task => task.id === param.taskID)
  if (!task) {
    return thunkAPI.rejectWithValue('task not found in the state')
  }
  try {
    const res = await todolistAPI.updateTask(param.todoListID, param.taskID, {...task, status: param.status})
    return {
      taskId: param.taskID,
      todoListID: param.todoListID,
      status: res.data.data.item.status
    }
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})
export const updateTaskTitleTC = createAsyncThunk('tasks/updateTaskTitle', async (param: { todoListID: string, title: string, taskID: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  const state = thunkAPI.getState() as AppRootStateType
  const currentTodoListTasks = state.tasks[param.todoListID]
  let task = currentTodoListTasks.find(task => task.id === param.taskID)
  if (!task) {
    return thunkAPI.rejectWithValue('task not found in the state')
  }
  try {
    const res = await todolistAPI.updateTask(param.todoListID, param.taskID, {...task, title: param.title})
    if (res.data.resultCode === 0) {
      return {
        taskId: param.taskID,
        todoListID: param.todoListID,
        title: res.data.data.item.title
      }
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})

export const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todoListID: string }>) {
      state[action.payload.todoListID] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      action.payload.todoLists.forEach(todoList => {
        state[todoList.id] = []
      })
    })
    builder.addCase(createTodoListsTC.fulfilled, (state, action) => {
      state[action.payload.todoList.id] = []
    })
    builder.addCase(removeTodoListsTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoListID] = action.payload.tasks
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListID] = state[action.payload.todoListID].filter(task => task.id !== action.payload.taskId)
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListID] = [{...action.payload.task}, ...state[action.payload.todoListID]]
    })
    builder.addCase(updateTaskStatusTC.fulfilled, (state, action) => {
      state[action.payload.todoListID] = state[action.payload.todoListID]
        .map(task => task.id === action.payload.taskId ? {...task, status: action.payload.status} : task)
    })
    builder.addCase(updateTaskTitleTC.fulfilled, (state, action) => {
      state[action.payload.todoListID] = state[action.payload.todoListID]
        .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
    })
  }
})

export const tasksReducer = slice.reducer

