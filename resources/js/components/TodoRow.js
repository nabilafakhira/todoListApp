import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoAction from './TodoAction';
import url from '../url';

class TodoRow extends Component {

    constructor(props){
        super(props);
        this.state = {
            todoCompleted: null,
        }

        if(this.props.data.completed == 1){
            this.state.todoCompleted= "checked";
        }
    }

    completedTodo = (todo) => {
        axios.post(`${url}/api/todo/${todo}`, {
            todoId: this.props.data.id,
        }).then(() => {
            location.reload()
        })
    }


    render(){
        return (
            <tr>
                <td width="20">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={ () => {this.completedTodo(this.props.data.id)}} checked={this.state.todoCompleted}/>
                </div>
                </td>
                <td><h6>{this.state.todoCompleted == "checked" ? <del>{ this.props.data.desc }</del> : this.props.data.desc }</h6></td>
                <TodoAction eachRowId={ this.props.data.id } />
            </tr>
        );
    }
}

export default TodoRow;