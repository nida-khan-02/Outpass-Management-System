import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM5YzM5NjQ1YzY3MWM2ZDhhNmU1NjUiLCJjYXRlZ29yeSI6InN0dWRlbnQiLCJpYXQiOjE3MjU2NDM3MTB9.DmkN-jHAv_ftcRqnTMxgsCVAlN7kU_CDlDdnipobx64';
    if (token) {
      api.get('http://localhost:5000/api/auth/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setCurrentUser(res.data))
        .catch(err => {
          console.error('Error fetching user data:', err);
          // localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
