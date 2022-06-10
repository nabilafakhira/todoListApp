import React, { Component } from 'react';
import url from '../../url';

class TodoEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            todoDesc: null,
        }
    }

    inputTodoDesc = (event) => {
        this.setState({
            todoDesc: event.target.value,
        });
    }

    static getDerivedStateFromProps(props, current_state) {
        let todoUpdate = {
            todoDesc: null,
        }

        // Updating data from input.

        if (current_state.todoDesc && (current_state.todoDesc !== props.todoData.currentTodoDesc)) {
            return null;
        }

        // Updating data from props Below.

        if (current_state.todoDesc !== props.todoData.currentTodoDesc ||
            current_state.todoDesc === props.todoData.currentTodoDesc) {
            todoUpdate.todoDesc = props.todoData.currentTodoDesc;
        }

        return todoUpdate;

    }

    updateTodo = () => {
        axios.post(`https://app-mytodolist.herokuapp.com/api/update/todo/`, {
            todoId: this.props.modalId,
            todoDesc: this.state.todoDesc
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
                        <label>To-Do</label>
                        <input type="text" className="form-control" id="desc" value={this.state.todoDesc ?? ""} onChange={this.inputTodoDesc}/>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.updateTodo}>Save</button>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default TodoEdit;