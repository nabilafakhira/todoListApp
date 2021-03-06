import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoRow from './TodoRow';
import url from '../url';

class TodoList extends Component{

    
    constructor(props){
        super(props);

        this.state = {
            todos: [],
        }
    }

    //Life cycle method
    componentDidMount(){
        this.getTodoList();
    }

    //get todos
    getTodoList = () =>{
        let self = this;
        let id = this.props.taskId;
        axios.get(`${url}/api/todos/${id}`).then(function(response){
            self.setState({
                todos: response.data
            });
        });
    }
    render(){
        const todoNotEmpty = this.state.todos;
        return (
            <div className='row justify-content-center'>
                <div className="col-11 mx-2">
                <table className="table">
                {(Array.isArray(todoNotEmpty)) ? (
                    <tbody>{todoNotEmpty.map(function (x, i){
                        return <TodoRow key={i} data={x} />
                    })}</tbody>
                    ) : ('')}
                </table>
                </div>
            </div>
        );
    }
}

export default TodoList;

