import React, {useEffect} from 'react';
import {TaskCard} from '../task-card/TaskCard';
import {useDispatch, useSelector} from "react-redux";
import {deleteTaskFromApi, getMyTasksFromApi} from "../../../core/action/task-action";
import {getSearchParam} from "../../../core/api/constant";

const listStyles = {
    display: 'flex',
    flexWrap: 'wrap'
};

export function MyTasksList(props) {
    const dispatch = useDispatch();
    const userTasks = useSelector(state => state.tasks.myTasks);

    useEffect(() => {
        const searchParam = getSearchParam(props);
        dispatch(getMyTasksFromApi(searchParam));
    }, [props, dispatch]);

    const onTaskDelete = (id) => {
        dispatch(deleteTaskFromApi(id));
    };

    return (
        <div className="my-tasks-wrapper" style={listStyles}>
            {(userTasks.length === 0) ?
                <div>No records found.</div> :
                userTasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={onTaskDelete}/>)}
        </div>
    )
}