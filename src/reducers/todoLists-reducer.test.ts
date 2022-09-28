import {
    actionTypes,
    addTodoListAC,
    changeListFilterAC,
    changeListTitleAC,
    removeListAC,
    todoListReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {TodoListsType} from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState: TodoListsType[] = todoListReducer(startState, removeListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState: TodoListsType[] = todoListReducer(startState, addTodoListAC('aaa'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('aaa');
});

test('correct todolist change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState: TodoListsType[] = todoListReducer(startState, changeListTitleAC(todolistId1, 'new'))

    expect(endState[0].title).toBe('new');
});

test('correct todolist change filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState: TodoListsType[] = todoListReducer(startState, changeListFilterAC('active', todolistId1))

    expect(endState[0].filter).toBe('active');
});
