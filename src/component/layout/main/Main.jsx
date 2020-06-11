import React from 'react';
import {Switch, withRouter} from 'react-router-dom';
import {UserList} from '../../user/list/UserList';
import {UserProfile} from '../../user/profile/UserProfile';
import {AuthenticatedRoute} from '../../../core/guard/AuthenticatedRoute';
import {AllTasksList} from "../../task/list-all/AllTasksList";
import {MyTasksList} from "../../task/list-my/MyTasksList";
import {UserEdit} from "../../user/edit/UserEdit";
import {TaskEdit} from "../../task/edit/TaskEdit";

export function Main() {

    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute exact path="/" component={AllTasksList}/>
                <AuthenticatedRoute exact path="/users" component={UserList}/>
                <AuthenticatedRoute exact path={["/users/create", "/users/edit/:id"]}
                                    admin={true}
                                    component={withRouter(UserEdit)}/>}/>
                <AuthenticatedRoute exact path="/users/:id" component={UserProfile}/>
                <AuthenticatedRoute exact path="/tasks" component={AllTasksList}/>
                <AuthenticatedRoute exact path="/tasks/my" component={MyTasksList}/>
                <AuthenticatedRoute exact path={["/tasks/create", "/tasks/edit/:id"]}
                                    component={TaskEdit}/>
            </Switch>
        </div>
    );
}
