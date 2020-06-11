import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import '../../layout/main/EditForm.css';
import {useDispatch, useSelector} from "react-redux";
import {clearTask, editTask, getTaskByIdFromApi, saveTaskInApi} from "../../../core/action/task-action";

export function TaskEdit(props) {

    const dispatch = useDispatch();
    const currentTask = useSelector(state => state.tasks.task);
    const [isSaveSuccessful, setSaveSuccessful] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            const id = props.computedMatch.params.id;
            dispatch(getTaskByIdFromApi(id));
        } else {
            dispatch(clearTask());
        }
    }, [props.computedMatch.params.id, dispatch])

    const onInputChange = (event) => {
        event.persist();
        dispatch(editTask({[event.target.name]: event.target.value}));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        dispatch(saveTaskInApi(currentTask));
        setSaveSuccessful(true);
    }

    return (
        <>
            {isSaveSuccessful && <Redirect to="/tasks/my"/>}
            <div className="edit-wrapper">
                <form onSubmit={onTaskSave} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input className="form-control" type="text" id="title" name="title" onChange={onInputChange}
                               value={currentTask.title || ''} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <textarea className="form-control" id="description" name="description" onChange={onInputChange}
                                  value={currentTask.description || ''}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="hours-estimation">Estimation in hours: </label>
                        <input type="number" className="form-control" id="hours-estimation" name="hoursEstimation"
                               onChange={onInputChange}
                               value={currentTask.hoursEstimation || ''} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status: </label>
                        <select className="form-control" id="status" name="status" onChange={onInputChange}
                                value={currentTask.status} required>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Save task</button>
                </form>
            </div>
        </>
    )
}