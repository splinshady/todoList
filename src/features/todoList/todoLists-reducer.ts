import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//Thunk

export const fetchTodoListsTC = createAsyncThunk('todoList/fetchTodoLists', async (param, thunkAPI) => {
  try {
    const res = await todolistAPI.getTodolist()
    return {todoLists: res.data}
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})
export const removeTodoListsTC = createAsyncThunk('todoList/removeTodoLists', async (todoListID: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  thunkAPI.dispatch(changeTodoListEntityStatusAC({todoListID, status: 'loading'}))
  try {
    const res = await todolistAPI.deleteTodolist(todoListID)
    if (res.data.resultCode === 0) {
      return {id: todoListID}
    } else {
      return thunkAPI.rejectWithValue(null)
    }
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  } finally {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
  }
})
export const createTodoListsTC = createAsyncThunk('todoList/createTodoLists', async (title: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  const res = await todolistAPI.createTodolist(title)
  if (res.data.resultCode === 0) {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {todoList: res.data.data.item}
  } else {
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return thunkAPI.rejectWithValue(null)
  }
})
export const changeTodoListsTitleTC = createAsyncThunk('todoList/changeTodoListsTitle', async (param: { todoListID: string, newTitle: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({status: 'loading'}))
  try {
    const res = await todolistAPI.updateTodolist(param.todoListID, param.newTitle)
    if (res.data.resultCode === 0) {
      return {newTitle: param.newTitle, todoListID: param.todoListID}
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
  name: 'todoList',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeListFilterAC(state, action: PayloadAction<{ filter: TaskFilterType, todoListID: string }>) {
      return state.map(list => {
        return list.id === action.payload.todoListID ? {...list, filter: action.payload.filter} : list
      })
    },
    changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListID: string, status: RequestStatusType }>) {
      return state.map(list => {
        return list.id === action.payload.todoListID ? {...list, entityStatus: action.payload.status} : list
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(removeTodoListsTC.fulfilled, (state, action) => {
      return state.filter(list => list.id !== action.payload.id)
    })
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      return action.payload.todoLists.map(todoList => {
        return {...todoList, filter: "all", entityStatus: "idle"}
      })
    })
    builder.addCase(createTodoListsTC.fulfilled, (state, action) => {
      return [{...action.payload.todoList, filter: "all", entityStatus: "idle"}, ...state]
    })
    builder.addCase(changeTodoListsTitleTC.fulfilled, (state, action) => {
      return state.map(list => {
        return list.id === action.payload.todoListID ? {...list, title: action.payload.newTitle} : list
      })
    })
  }
})

export const todoListReducer = slice.reducer
export const {changeListFilterAC, changeTodoListEntityStatusAC} = slice.actions


export type TaskFilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: TaskFilterType,
  entityStatus: RequestStatusType
}
