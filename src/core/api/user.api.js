import axios from 'axios';
import {deleteTasksForAuthor} from "./task.api";
import {apiUrl} from "./constant";

const usersUrl = `${apiUrl}/users`;
const loggedUserKey = 'loggedUser';

export function isPrincipalAdmin() {
    const loggedUser = getLoggedUser();
    return loggedUser && getLoggedUser().admin;
}

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem(loggedUserKey));
}

export function getUserById(id) {
    return axios.get(`${usersUrl}/${id}`);
}

export async function login(userData) {
    const users = await getAllUsers();

    const user = users.find(u => u.email === userData.email &&
        u.password === userData.password);

    if (!user) {
        throw new Error('Incorrect username/password');
    }

    if (!user.active) {
        throw new Error('The current user has been blocked!');
    }

    localStorage.setItem(loggedUserKey, JSON.stringify(user));
}

export async function getAllUsers(params) {
    const allUsers = (await axios.get(`${usersUrl}`)).data;

    if (!params) {
        return allUsers;
    }

    const lowerParam = params.toLowerCase();
    return allUsers.filter(user => user.name.toLowerCase().includes(lowerParam) ||
        user.email.toLowerCase().includes(lowerParam));
}

export async function saveUser(userData) {
    return userData.id ? update(userData) : create(userData);
}

async function update(userData) {
    userData = await validateUserData(userData);

    return axios.put(`${usersUrl}/${userData.id}`, userData)
        .then((res) => {
            updateLoggedUser(userData, res);
        });
}

function updateLoggedUser(userData, res) {
    if (getLoggedUser().id === userData.id) {
        userData = res.data;
        localStorage.setItem(loggedUserKey, JSON.stringify(userData));
    }

    if (!getLoggedUser() || !getLoggedUser().active) {
        logout();
    }
}

async function create(userData) {
    userData = await validateUserData(userData);

    userData = {
        ...userData,
        picture: "https://picsum.photos/200/300?random=" + Math.random() * 1000
    }

    return axios.post(`${usersUrl}`, userData);
}

async function validateUserData(userData) {
    const users = await getAllUsers(userData.email);
    if (users.find(u => u.email === userData.email &&
        u.id !== userData.id)) {
        throw new Error('Email already exists!');
    }

    if (isUndefined(userData.active)) {
        if (!isPrincipalAdmin()) {
            userData = {...userData, active: true}
        } else {
            userData = {...userData, active: false}
        }
    }

    if (isUndefined(userData.admin)) {
        userData = {...userData, admin: false}
    }
    return userData;
}

export function deleteUser(id) {
    deleteTasksForAuthor(id);
    return axios.delete(`${usersUrl}/${id}`);
}

export function logout() {
    localStorage.removeItem(loggedUserKey);
}

function isUndefined(field) {
    return typeof (field) === 'undefined' || field == null;
}
