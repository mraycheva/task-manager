import React from 'react';
import './App.css';
import Layout from './component/layout/Layout';
import {Switch} from 'react-router-dom';
import {Login} from './component/auth/login/Login';
import {AuthenticatedRoute} from './core/guard/AuthenticatedRoute';
import {NonAuthenticatedRoute} from './core/guard/NonAuthenticatedRoute';
import {UserEdit} from "./component/user/edit/UserEdit";

function App() {
    return (
        <div className="App">
            <Switch>
                <NonAuthenticatedRoute exact path="/login" component={Login}/>
                <NonAuthenticatedRoute exact path="/register" component={UserEdit}/>
                <AuthenticatedRoute path="/" component={Layout}/>
            </Switch>
        </div>
    );
}

export default App;
