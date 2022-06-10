import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TaskEdit from './modal/TaskEdit';
import axios from 'axios';

class TaskAction extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentTaskDesc: null,

        }
    }

    getTaskDetails = (id) => {
        axios.get('/api/task/'+id).then((response) => {
            this.setState({
                currentTaskDesc: response.data.desc
            })
        })
    }


    deleteTask = (task) => {
        axios.delete('/api/delete/task/' + task).then(() => {
            location.reload();
        })
    }

    render(){
        return (
            <div className="dropright">
                <a href="#" data-toggle="dropdown" aria-expanded="false"><i className="bi h5 bi-three-dots-vertical text-secondary"></i></a>
                <div className="dropdown-menu">
                    <Link className="dropdown-item" to={{ pathname: "/task/" + this.props.eachRowId }}><i className="bi bi-plus-lg"></i> Add To-Do</Link>



                    <button className="dropdown-item btn" data-toggle="modal" data-target={"#modal"+this.props.eachRowId} onClick={() => { this.getTaskDetails(this.props.eachRowId) }}><i className="bi bi-pencil-square"></i> Edit</button>

                    <button type="button" className="dropdown-item btn" onClick={ () => {this.deleteTask(this.props.eachRowId)}}><i className="bi bi-trash-fill" ></i> Delete</button>
                </div>
                
                <TaskEdit modalId={this.props.eachRowId} taskData={ this.state }/>
            </div>
            
        );
    }
}

export default TaskAction;