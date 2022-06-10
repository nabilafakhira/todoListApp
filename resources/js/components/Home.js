import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './TaskList';
import InputTask from './InputTask';

function Home() {
    return (
        <div className="row justify-content-center">
            <InputTask />
            <TaskList />
        </div>
    );
}

export default Home;