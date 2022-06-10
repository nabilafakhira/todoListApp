import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";


function TaskDetail() {
    const [state,setState] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        getTaskDetails(id)
    },[]);

    const getTaskDetails= (id) =>{
        axios.get('/api/task/'+id).then((res)=>{
           setState({
                id:res.data.id,
                desc:res.data.desc,
                date:res.data.created_at,
            });
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <div className="row justify-content-between">
                            <div className="col-md-10">{state.desc}</div>
                            <div className="col-md-2">{state.date}</div>
                            </div>
                        </div>

                        <div className="card-body">
                            <InputTodo idTask={state.id}/>
                            <TodoList taskId={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;

