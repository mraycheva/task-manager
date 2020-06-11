import React, {useEffect} from 'react';
import {UserCard} from '../card/UserCard';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUserFromApi, getAllUsersFromApi} from '../../../core/action/user-action';
import {getSearchParam} from "../../../core/api/constant";

const usersListStyle = {
    flexWrap: 'wrap'
};

export function UserList(props) {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        const searchParam = getSearchParam(props);
        dispatch(getAllUsersFromApi(searchParam));
    }, [props, dispatch]);

    const onUserDelete = (id) => {
        dispatch(deleteUserFromApi(id));
    };

    return (
        <div className="users-list d-flex" style={usersListStyle}>
            {(users.length === 0) ?
                <div>No records found.</div> :
                users.map((user) => <UserCard user={user} key={user.id} onDelete={onUserDelete}/>)}
        </div>
    );
}