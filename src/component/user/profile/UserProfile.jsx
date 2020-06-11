import React, {Component} from 'react';
import {getUserById} from '../../../core/api/user.api';
import {UserCard} from '../card/UserCard';
import {TaskCard} from "../../task/task-card/TaskCard";
import {deleteTask, getTasksByAuthorId} from "../../../core/api/task.api";

export class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            tasks: []
        };
    }

    componentDidMount() {
        getUserById(this.props.computedMatch.params.id).then((response) => {
            this.setState({
                user: response.data
            });
        });

        getTasksByAuthorId(this.props.computedMatch.params.id).then((tasks) => {
            this.setState({
                tasks: tasks
            });
        })
    }

    onDelete = (id) => {
        deleteTask(id).then(() => {
            const initialTasks = this.state.tasks;
            const currentTasks = initialTasks.filter(task => task.id !== id);
            this.setState({
                tasks: currentTasks
            });
        })
    };

    render() {
        return (
            <div className="single-user">
                <UserCard user={this.state.user}/>
                {this.state.tasks.map(task => < TaskCard task={task} key={task.id} onDeleteClick={this.onDelete}/>)}
            </div>
        )
    }
}
