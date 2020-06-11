import React from 'react';
import {Link} from 'react-router-dom';
import {getLoggedUser} from "../../../core/api/user.api";
import {TaskStatus} from "../../../core/api/task.api";

const taskCardStyle = {
    maxWidth: '18rem'
};

const deleteBtnStyles = {
    cursor: 'pointer'
};

export function TaskCard({task, onDeleteClick}) {
    const loggedUser = getLoggedUser();
    const isModificationAllowed = loggedUser.admin ||
        loggedUser.id === task.authorId;

    let taskClassByType = "card text-white m-3 ";
    switch (task.status) {
        case TaskStatus.Pending:
            taskClassByType += "bg-dark";
            break;
        case TaskStatus.Done:
            taskClassByType += "bg-info";
            break;
        case TaskStatus.Active:
        default:
            taskClassByType += "bg-warning";
    }

    return (
        <div className={taskClassByType} style={taskCardStyle}>
            <div className="card-header">
                <div>{task.title}</div>
                {isModificationAllowed &&
                <div>
                    <div><Link to={`/tasks/edit/${task.id}`}> Edit </Link></div>
                    <div style={deleteBtnStyles} onClick={() => onDeleteClick(task.id)}>Delete</div>
                </div>}
            </div>
            <div className="card-body">
                <p className="card-text">{task.description}</p>
            </div>
            <div className="card-footer bg-transparent border-secondary">
                <div>Author: {task.authorName}</div>
                <div>Estimation in hours: {task.hoursEstimation}</div>
            </div>
        </div>
    )
}