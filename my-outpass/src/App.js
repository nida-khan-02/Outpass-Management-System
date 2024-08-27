import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import StudentDashboard from './Components/StudentDashboard';
import WardenDashboard from './Components/WardenDashboard';
// import { AuthProvider } from './contexts/AuthContext';

// import { useAuth } from './hooks/useAuth';

function App() {
  // const { user } = useAuth();
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/warden-dashboard" element={<WardenDashboard  />} />
        {/* <AuthProvider> */}
        {/* <div> */}
      {/* {user && user.role === 'warden' && ( */}
        {/* <WardenDashboard hostel={user.hostel} /> */}
      {/* )} */}
    {/* </div> */}
    {/* </AuthProvider> */}
      </Routes>
    </Router>
  );
}

export default App;
