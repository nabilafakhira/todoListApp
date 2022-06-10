import * as React from "react";
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import TaskDetail from './TaskDetail';
import Home from './Home';

function App() {
  return (
  <Router>
    <div className="container">
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/task/:id' element={<TaskDetail />} />
        </Routes>
    </div>
  </Router>
  );
}

export default App;