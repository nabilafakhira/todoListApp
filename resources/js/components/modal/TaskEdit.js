import React, { Component } from 'react';

class TaskEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskDesc: null,
        }
    }

    inputTaskDesc = (event) => {
        this.setState({
            taskDesc: event.target.value,
        });
    }

    static getDerivedStateFromProps(props, current_state) {
        let taskUpdate = {
            taskDesc: null,
        }

        // Updating data from input.

        if (current_state.taskDesc && (current_state.taskDesc !== props.taskData.currentTaskDesc)) {
            return null;
        }

        // Updating data from props Below.

        if (current_state.taskDesc !== props.taskData.currentTaskDesc ||
            current_state.taskDesc === props.taskData.currentTaskDesc) {
            taskUpdate.taskDesc = props.taskData.currentTaskDesc;
        }

        return taskUpdate;

    }

    updateTask = () => {
        axios.post('/api/update/task/', {
            taskId: this.props.modalId,
            taskDesc: this.state.taskDesc
        }).then(() => {
            location.reload();
        })
    }

    render(){
        return (
            <div className="modal fade" id={"modal"+this.props.modalId} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-body">
                    <form>
                    <div className="form-group">
                        <label>Task</label>
                        <input type="text" className="form-control" id="desc" value={this.state.taskDesc ?? ""} onChange={this.inputTaskDesc}/>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.updateTask}>Save</button>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default TaskEdit;