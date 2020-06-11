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
} from '../action/type/user-action-type';

const initialState = {
    users: [],
    user: {},
    error: '',
    editSuccessful: false
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                editSuccessful: false,
                user: {}
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(u => u.id !== action.payload),
                editSuccessful: false,
                user: {}
            };
        case EDIT_USER:
            return {
                ...state,
                user: {...state.user, ...action.payload},
                editSuccessful: false
            };
        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
                editSuccessful: false
            };
        case SAVE_USER:
            return {
                ...state,
                users: [...state.users.filter(u => u.id !== action.payload.id), action.payload],
                editSuccessful: false,
                user: {}
            }
        case CLEAR_USER:
            return {
                ...state,
                user: {}
            };
        case CREATE_USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_USER_ERROR:
            return {
                ...state, error: '',
                editSuccessful: false
            }
        case  SET_USER_EDIT_SUCCESSFUL:
            return {...state, editSuccessful: action.payload};
        default:
            return state;
    }
}