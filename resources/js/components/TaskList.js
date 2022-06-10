import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TaskRow from './TaskRow';

class TaskList extends Component{

    
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
        }
    }

    //Life cycle method
    componentDidMount(){
        this.getTaskList();
    }

    //get tasks
    getTaskList = () =>{
        let self = this;
        axios.get('/api/tasks').then(function(response){
            self.setState({
                tasks: response.data
            });
        });
    }
    render(){
        return (
            <div className="col-8 mx-2">
                <table className="table table-hover table-borderless">
                    <tbody>
                    {this.state.tasks.map(function (x, i){
                        return <TaskRow key={i} data={x} />
                    })}
                    
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;

