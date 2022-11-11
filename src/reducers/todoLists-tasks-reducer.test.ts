import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, TodolistDomainType, todoListReducer} from "./todoLists-reducer";
import {TasksType} from "../app/App";

/*test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState: TasksType = tasksReducer(startTasksState, action)
    const endTodolistsState: Array<TodolistDomainType> = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodolists).toBe(action.todoListID)
})*/
