import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from '../url';


function InputTask() {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const submitForm = () =>{
        axios.post(`${url}/api/store/task`,inputs).then((res)=>{
            navigate('/');
        })
    }

    return (
        <div className="col-8 pr-2 pb-3">
            <form>
                <div className="row m-0">
                    <div className="col-md-11 px-0 mt-1">
                    <input type="text" className="form-control bg-white border-0" name="desc" value={inputs.desc} onChange={handleChange} placeholder='Add new...' required/>
                    </div>
                    <div className="col-md-1 mt-1"><button type="submit" className="btn btn-block btn-primary" onClick={submitForm}>Add</button></div>
                </div>
            </form>
        </div>
    );
}

export default InputTask;

