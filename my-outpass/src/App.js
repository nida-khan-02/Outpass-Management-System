import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import StudentDashboard from './Components/StudentDashboard';
import WardenDashboard from './Components/WardenDashboard';


function App() {
 
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/warden-dashboard" element={<WardenDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;




