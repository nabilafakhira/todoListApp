import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TaskAction from './TaskAction';

class TaskRow extends Component {

    constructor(props){
        super(props);
    }

    completedTask = (task) => {
        axios.post('/api/task/'+task, {
            taskId: this.props.data.id,
        }).then(() => {
            location.reload();
        })
    }

    render(){
        return (
            <tr>
                <td width="20">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={ () => {this.completedTask(this.props.data.id)}} />
                </div>
                </td>
                <td><h5>{ this.props.data.desc }</h5></td>
                <td width="20"><span className="h5 badge bg-primary"> { this.props.data.todoCompleted }/{ this.props.data.todolists_count }</span></td>
                <td width="40"><span className="h5 badge bg-warning">{ this.props.data.created_at }</span></td>
                <td width="20">
                    <TaskAction eachRowId={ this.props.data.id } />
                </td>
            </tr>
        );
    }
}

export default TaskRow;