import React, {useEffect} from 'react';
import '../../layout/main/EditForm.css';
import {useDispatch, useSelector} from 'react-redux';
import {
    clearUser,
    deleteUserError,
    editUser,
    getUserByIdFromApi,
    saveUserInApi
} from '../../../core/action/user-action';
import {getLoggedUser, isPrincipalAdmin} from "../../../core/api/user.api";
import {Link, Redirect} from "react-router-dom";

export function UserEdit(props) {
    const dispatch = useDispatch();
    const editedUser = useSelector(state => state.users.user);
    const editSuccessful = useSelector(state => state.users.editSuccessful);
    const error = useSelector(state => state.users.error);

    useEffect(() => {
        dispatch(deleteUserError());
        const userId = props.computedMatch.params.id;
        if (userId) {
            dispatch(getUserByIdFromApi(userId));
        } else {
            dispatch(clearUser());
        }
    }, [props, dispatch]);


    const onInputChange = (event) => {
        event.persist();
        dispatch(editUser({[event.target.name]: event.target.value}));
        dispatch(deleteUserError())
    }

    const onCheckBoxChange = (event) => {
        event.persist();
        dispatch(editUser({[event.target.name]: event.target.checked}));
        dispatch(deleteUserError())
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(saveUserInApi(editedUser));
    }

    return (
        <>
            {editSuccessful && <Redirect to='/users'/>}
            <div className="edit-wrapper">
                <form className="edit-form" onSubmit={onFormSubmit}>
                    {error && <span className="text-danger">{error}</span>}
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" className="form-control" onChange={onInputChange}
                               value={editedUser.name || ''} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age: </label>
                        <input min="0" max="100" type="number" name="age" id="age" className="form-control"
                               onChange={onInputChange}
                               value={editedUser.age || ''} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" className="form-control" onChange={onInputChange}
                               value={editedUser.email || ''} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" className="form-control"
                               onChange={onInputChange} value={editedUser.password || ''} required/>
                    </div>
                    {getLoggedUser() &&
                    isPrincipalAdmin() &&
                    <div>
                        <div className="form-group">
                            <label htmlFor="active">Is Active: </label>
                            <input type="checkbox" name="active" id="active" className="form-control"
                                   onChange={onCheckBoxChange} checked={editedUser.active || false}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="admin">Is Admin: </label>
                            <input type="checkbox" name="admin" id="admin" className="form-control"
                                   onChange={onCheckBoxChange}
                                   checked={editedUser.admin || false}/>
                        </div>
                    </div>}
                    <button className="btn btn-success">{getLoggedUser() ? 'Save user' :
                        'Register'}</button>
                    {!getLoggedUser() && <div><Link to="/login">Already have an account?</Link></div>}
                </form>
            </div>
        </>
    )
}