import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoRow from './TodoRow';

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
        axios.get('/api/todos/'+id).then(function(response){
            self.setState({
                todos: response.data
            });
        });
    }
    render(){
        return (
            <div className='row justify-content-center'>
                <div className="col-11 mx-2">
                <table className="table">
                    <tbody>
                    {this.state.todos.map(function (x, i){
                        return <TodoRow key={i} data={x} />
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default TodoList;

