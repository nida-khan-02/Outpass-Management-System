import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../Services/authService';
import { School } from 'lucide-react';
import StudentDashboard from './StudentDashboard';
import WardenDashboard from './WardenDashboard';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function LandingPage() {
  const [college_id, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setCurrentUser } = useAuth();
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ college_id, password });
      localStorage.setItem('token', token);
      setCurrentUser(user);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <header className="p-4 bg-white shadow-sm">
        <div className="flex items-center justify-center">
          <School className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-blue-800">Campus Outpass</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your campus outpass
            </p>
          </div>
          <div className="w-64 h-64 mx-auto rounded-lg overflow-hidden shadow-md">
          <img
            src="/MU_Campus_1.jpg"
            alt="University Campus"
            className="w-full h-full object-cover"
            // style={{ minHeight: '256px', minWidth: '256px' }}
          />
        </div>

          <form onSubmit={handleLogin} className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="college_id" className="sr-only">
                  College ID
                </label>
                <input
                  id="college_id"
                  name="college_id"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="College ID"
                  value={college_id}
                  onChange={(e) => setCollegeId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="mt-8 py-4 text-center text-sm text-gray-600">
        <p>&copy; 2024 Campus Outpass System. All rights reserved.</p>
      </footer>
    </div>
  );
}