import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from '../url';


function InputTodo(props) {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const submitForm = () =>{
        axios.post(`${url}/api/store/todo`,{
            todoDesc: inputs.desc,
            taskId: props.idTask,

        }).then((res)=>{
            navigate('/');
        })
    }

    return (
        <div className="row m-0">
            <div className="col-12 pr-2 pb-3">
            <form>
                <div className="row form-row justify-content-center">
                    <div className="form-group col-md-10 px-0 mt-1">
                    <input type="text" className="form-control" name="desc" value={inputs.desc} onChange={handleChange} placeholder='Add new...' required/>
                    </div>
                    <div className="form-group col-md-1 mt-1"><button type="submit" className="btn btn-block btn-primary" onClick={submitForm}>Add</button></div>
                </div>
            </form>
        </div>
        </div>
    );
}

export default InputTodo;

