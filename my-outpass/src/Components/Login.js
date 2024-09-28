import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { login } from '../Services/authService.js';
import StudentDashboard from './StudentDashboard';
import WardenDashboard from './WardenDashboard';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
axios.defaults.withCredentials = true;







function Login() {
  const [college_id, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useAuth();
  const [hostelName, setHostelName] = useState('');
  const [user, setUser] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ college_id, password, hostelName});
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setHostelName(user.hostelName);
      setUser({
        ...user,
        hostelName: user.hostelName || '13s1' 
      });
      

      console.log('User:', user);
      console.log('Token:', token);
      console.log('hostelName:', user.hostelName);
      console.log('college_id:', college_id);
    } catch (err) {
      alert('Login failed');
      console.error('Login error:', err);
    }
  };

  if (user) {
    return (
     <Routes>
        <Route path="/student-dashboard" element={user.category === 'student' ? <StudentDashboard userId={college_id}/> : <Navigate to="/warden-dashboard" />} />
        <Route path="/warden-dashboard" element={user.category === 'warden' ? <WardenDashboard hostel={user.hostelName}/> : <Navigate to="/student-dashboard" />} />
        <Route path="*" element={<Navigate to={user.category === 'student' ? "/student-dashboard" : "/warden-dashboard"} />} />
      </Routes>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="College ID"
          value={college_id}
          onChange={(e) => setCollegeId(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;




