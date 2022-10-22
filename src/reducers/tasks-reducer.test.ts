import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import { TasksType } from '../App'
import {removeListAC} from "./todoLists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                description: 'dd',
                title: 'CSS',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: 'start Date',
                deadline: 'dead line',
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: 'addedDate',
            },
            {
                description: 'dd',
                title: 'JS',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: 'start Date',
                deadline: 'dead line',
                id: '2',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: 'addedDate',
            },
            {
                description: 'dd',
                title: 'React',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: 'start Date',
                deadline: 'dead line',
                id: '3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: 'addedDate',
            }
        ],
        'todolistId2': [
            {
                description: 'dd',
                title: 'bread',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: 'start Date',
                deadline: 'dead line',
                id: '1',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: 'addedDate',
            },
            {
                description: 'dd',
                title: 'milk',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: 'start Date',
                deadline: 'dead line',
                id: '2',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: 'addedDate',
            },
            {
                description: 'dd',
                title: 'tea',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: 'start Date',
                deadline: 'dead line',
                id: '3',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: 'addedDate',
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')
    const endState: TasksType = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toEqual(2)
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2')
    const endState: TasksType = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(true)
    expect(endState['todolistId2'][1].status).toBe(false)
})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('3', 'new title', 'todolistId1')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][2].title).toBe('new title')
    expect(endState['todolistId2'][2].title).toBe('tea')
})

test('property with todolistId should be deleted', () => {

    const action = removeListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})


