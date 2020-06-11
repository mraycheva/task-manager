import React from 'react';
import {getLoggedUser} from '../api/user.api';
import {Redirect} from 'react-router-dom';

export function AuthenticatedRoute(props) {
    const loggedUser = getLoggedUser();

    if ((!props.admin && loggedUser) ||
        (loggedUser && loggedUser.admin)) {
        return <props.component {...props} />
    }

    return <Redirect to='/login'/>;
}