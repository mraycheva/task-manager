import {
    CLEAR_TASK,
    DELETE_TASK,
    EDIT_TASK,
    GET_ALL_TASKS,
    GET_MY_TASKS,
    GET_TASK_BY_ID,
    SAVE_TASK
} from "../action/type/task-action-type";

const initialState = {
    tasks: [],
    myTasks: [],
    task: {}
}

export function taskReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                tasks: action.payload,
                task: {}
            };
        case GET_MY_TASKS:
            return {
                ...state,
                myTasks: action.payload,
                task: {}
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload),
                myTasks: state.myTasks.filter(t => t.id !== action.payload)
            };
        case EDIT_TASK:
            return {
                ...state,
                task: {...state.task, ...action.payload}
            };
        case GET_TASK_BY_ID:
            return {
                ...state,
                task: action.payload
            };
        case CLEAR_TASK:
            return {
                ...state,
                task: {}
            };
        case SAVE_TASK:
            return {
                ...state,
                tasks: [...state.tasks.filter(t => t.id !== action.payload.id), action.payload],
                myTasks: [...state.myTasks.filter(t => t.id !== action.payload.id), action.payload],
                task: {}
            }
        default:
            return state;
    }
}