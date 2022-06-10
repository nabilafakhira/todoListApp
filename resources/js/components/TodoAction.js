import React, { Component } from 'react';
import TodoEdit from './modal/TodoEdit';
import axios from 'axios';

class TodoAction extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentTodoDesc: null,

        }
    }

    getTodoDetails = (id) => {
        axios.get('/api/todo/'+id).then((response) => {
            this.setState({
                currentTodoDesc: response.data.desc
            })
        })
    }

    deleteTodo = (todo) => {
        axios.delete('/api/delete/todo/' + todo).then(() => {
            location.reload();
        })
    }

    render(){
        return (
            <td width='90'>
                <button type="button" className="btn rounded-circle btn-outline-warning btn-sm" data-toggle="modal" data-target={"#modal"+this.props.eachRowId} onClick={() => { this.getTodoDetails(this.props.eachRowId) }}><i className="bi bi-pencil-square"></i></button>
                <span className='mx-1'></span>
                <button type="button" className="btn rounded-circle btn-outline-danger btn-sm" data-toggle="modal" data-target="#hg" onClick={ () => {this.deleteTodo(this.props.eachRowId)}}><i className="bi bi-trash-fill" ></i></button>
                <TodoEdit modalId={this.props.eachRowId} todoData={ this.state }/>
            </td>
            
        );
    }
}

export default TodoAction;