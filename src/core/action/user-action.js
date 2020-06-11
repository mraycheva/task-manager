import {deleteUser, getAllUsers, getUserById, saveUser} from "../api/user.api"
import {
    CLEAR_USER,
    CREATE_USER_ERROR,
    DELETE_USER,
    DELETE_USER_ERROR,
    EDIT_USER,
    GET_USER_BY_ID,
    GET_USERS,
    SAVE_USER,
    SET_USER_EDIT_SUCCESSFUL
} from "./type/user-action-type";

export function getAllUsersFromApi(searchParam) {
    return dispatch => {
        getAllUsers(searchParam).then((users) => {
            dispatch({
                type: GET_USERS,
                payload: users
            });
        });
    }
}

export function deleteUserFromApi(id) {
    return dispatch => {
        deleteUser(id).then(() => {
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        });
    }
}

export function editUser(userData) {
    return dispatch => dispatch({
        type: EDIT_USER,
        payload: userData
    });
}

export function getUserByIdFromApi(id) {
    return dispatch => {
        getUserById(id).then((response) => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: response.data
            })
        });
    }
}

export function saveUserInApi(userData) {
    return dispatch => {
        saveUser(userData).then(() => {
            dispatch({
                type: SAVE_USER,
                payload: userData
            });

            dispatch({
                type: SET_USER_EDIT_SUCCESSFUL,
                payload: true
            });
        }).catch((err) => {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: err.message
            });
        })
    }
}

export function deleteUserError() {
    return dispatch => {
        dispatch({
            type: DELETE_USER_ERROR
        })
    }
}

export function clearUser() {
    return dispatch => dispatch({
        type: CLEAR_USER
    });
}
