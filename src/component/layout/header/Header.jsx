import React, {useState} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {isPrincipalAdmin, logout} from '../../../core/api/user.api';
import {getSearchParam} from "../../../core/api/constant";

const logoutStyle = {
    cursor: 'pointer'
};

const navStyle = {
    "data-toggle": 'collapse',
    "data-target": '#navbarSupportedContent'
};

export const Header = withRouter((props) => {
    const [isLoggedOut, setLogoutFlag] = useState(false);
    const [searchParam, setSearchParam] = useState(getSearchParam(props));

    const onLogout = () => {
        logout();
        setLogoutFlag(true);
    }

    const onSearchChange = (event) => {
        event.persist();
        setSearchParam(event.target.value);
    }

    const onSearchClick = (event) => {
        event.preventDefault();
        const pathNameUrl = props.location.pathname.substr(1);

        const historyObj = {pathname: `/${pathNameUrl}`};
        if (searchParam) {
            historyObj['search'] = `?q=${searchParam}`;
        }

        props.history.push(historyObj);
    }

    return (
        <>
            {isLoggedOut && <Redirect to="/login"/>}
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="/">Task Manager</a>
                <button className="navbar-toggler" type="button"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"
                        style={navStyle}>
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/tasks" className="nav-link">All tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks/my" className="nav-link">My tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks/create" className="nav-link">Create task</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                        {isPrincipalAdmin() && <li className="nav-item">
                            <Link to="/users/create" className="nav-link">Create user</Link>
                        </li>}
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={onSearchClick}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                               onChange={onSearchChange} value={searchParam}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <span className="logout-btn ml-2" style={logoutStyle} onClick={onLogout}>Logout</span>
                </div>
            </nav>

        </>
    );
})