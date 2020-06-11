import axios from 'axios';
import {getLoggedUser} from './user.api';
import {apiUrl} from "./constant";

const tasksUrl = `${apiUrl}/tasks`;

export const TaskStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}

export async function getAllTasks(params) {
    const allTasks = (await axios.get(`${tasksUrl}`)).data;

    if (!params) {
        return allTasks;
    }

    const lowerParam = params.toLowerCase();
    return allTasks.filter(task => task.title.toLowerCase().includes(lowerParam) ||
        task.description.toLowerCase().includes(lowerParam));
}

export function getMyTasks(searchParam) {
    const loggedUserId = getLoggedUser().id;

    return getTasksByAuthorId(loggedUserId, searchParam);
}

export async function deleteTasksForAuthor(authorId) {
    const tasks = await getTasksByAuthorId(authorId);

    tasks.forEach(task => {
        deleteTask(task.id);
    });
}

export async function getTasksByAuthorId(authorId, searchParam) {
    const allTasks = await getAllTasks(searchParam);

    return allTasks.filter(task => task.authorId === authorId);
}

export function deleteTask(id) {
    return axios.delete(`${tasksUrl}/${id}`);
}

export function getTaskById(id) {
    return axios.get(`${tasksUrl}/${id}`);
}

export function saveTask(taskData) {
    return (taskData.id) ? update(taskData) : create(taskData);
}

function update(taskData) {
    return axios.put(`${tasksUrl}/${taskData.id}`, taskData)
        .then(() => {
            return taskData;
        });
}

function create(taskData) {
    const loggedUser = getLoggedUser();

    taskData.authorId = loggedUser.id;
    taskData.authorName = loggedUser.name;
    if (!taskData.status) {
        taskData.status = TaskStatus.Pending;
    }

    if (!taskData.description) {
        taskData.description = "";
    }

    return axios.post(`${tasksUrl}`, taskData).then(res => {
        return {...taskData, id: res.data.id};
    });
}