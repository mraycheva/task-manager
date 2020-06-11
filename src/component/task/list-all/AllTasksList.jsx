import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTaskFromApi, getAllTasksFromApi} from "../../../core/action/task-action";
import {TaskCard} from "../task-card/TaskCard";
import {getSearchParam} from "../../../core/api/constant";

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'
};

export function AllTasksList(props) {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        const searchParam = getSearchParam(props);
        dispatch(getAllTasksFromApi(searchParam));

    }, [props, dispatch])

    const onTaskDelete = (id) => {
        dispatch(deleteTaskFromApi(id));
    };

    return (
        <div className="tasks-list-wrapper d-flex" style={listStyles}>
            {(tasks.length === 0) ?
                <div>No records found.</div> :
                tasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={onTaskDelete}/>)}
        </div>
    );
}