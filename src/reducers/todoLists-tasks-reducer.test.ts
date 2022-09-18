import {tasksReducer} from "./tasks-reducer";
import {TasksType, TodoListsType} from "../App";
import {addTodoListAC, todoListReducer} from "./todoLists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState: TasksType = tasksReducer(startTasksState, action)
    const endTodolistsState: Array<TodoListsType> = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodolists).toBe(action.todoListID)
})
