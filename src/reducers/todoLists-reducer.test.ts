import {
    actionTypes,
    addTodoListAC,
    changeListFilterAC,
    changeListTitleAC, getTodoListsAC,
    removeListAC, TodolistDomainType,
    todoListReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../api/todolist-api";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

    const endState: TodolistDomainType[] = todoListReducer(startState, removeListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

/*test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0},
    ]

    const endState: TodolistDomainType[] = todoListReducer(startState, addTodoListAC('aaa'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('aaa');
});*/

test('correct todolist change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

    const endState: TodolistDomainType[] = todoListReducer(startState, changeListTitleAC(todolistId1, 'new'))

    expect(endState[0].title).toBe('new');
});

test('correct todolist change filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

    const endState: TodolistDomainType[] = todoListReducer(startState, changeListFilterAC('active', todolistId1))

    expect(endState[0].filter).toBe('active');
});

test('correct set todolist to the state', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn",  addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy",  addedDate: '', order: 0}
    ]

    const endState: TodolistDomainType[] = todoListReducer([], getTodoListsAC(startState))

    expect(endState.length).toBe(2);
});
