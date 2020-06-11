import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {userReducer} from '../reducer/user-reducer';
import thunk from 'redux-thunk';
import {taskReducer} from "../reducer/task-reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    users: userReducer,
    tasks: taskReducer
});

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)),);