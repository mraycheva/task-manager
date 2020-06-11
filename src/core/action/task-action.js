import {deleteTask, getAllTasks, getMyTasks, getTaskById, saveTask} from "../api/task.api";
import {
    CLEAR_TASK,
    DELETE_TASK,
    EDIT_TASK,
    GET_ALL_TASKS,
    GET_MY_TASKS,
    GET_TASK_BY_ID,
    SAVE_TASK
} from "./type/task-action-type";

export function getAllTasksFromApi(searchParam) {
    return dispatch => {
        getAllTasks(searchParam).then((tasks) => {
            dispatch({
                type: GET_ALL_TASKS,
                payload: tasks
            });
        });
    }
}

export function getMyTasksFromApi(searchParam) {
    return dispatch => {
        getMyTasks(searchParam).then((myTasks) => {
            dispatch({
                type: GET_MY_TASKS,
                payload: myTasks
            });
        });
    }
}

export function deleteTaskFromApi(id) {
    return dispatch => {
        deleteTask(id).then(() => {
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        });
    }
}

export function editTask(taskData) {
    return dispatch => dispatch({
        type: EDIT_TASK,
        payload: taskData
    });
}

export function getTaskByIdFromApi(id) {
    return dispatch => {
        getTaskById(id).then((response) => {
            dispatch({
                type: GET_TASK_BY_ID,
                payload: response.data
            })
        });
    }
}

export function saveTaskInApi(taskData) {
    return dispatch => {
        saveTask(taskData).then((savedTask) => {
            dispatch({
                type: SAVE_TASK,
                payload: savedTask
            })
        })
    }
}

export function clearTask() {
    return dispatch => dispatch({
        type: CLEAR_TASK
    });
}
