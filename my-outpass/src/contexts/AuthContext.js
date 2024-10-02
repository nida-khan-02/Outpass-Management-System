import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // const [currentUser, setCurrentUser] = useState(() => {
  //   // Retrieve the user from localStorage if it exists
  //   const storedUser = localStorage.getItem('currentUser');
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });
  const [loading, setLoading] = useState(true);
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('https://outpass-management-system-backend.vercel.app/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setCurrentUser(null);
      }
    }
  };
  

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    console.log("Token in AuthContext.js:", token);

    
    if (token) {
      api.get('https://outpass-management-system-backend.vercel.app/auth/user', 
        { headers: { 
          Authorization: `Bearer ${token}` 
        } 
      })
        .then(res => {
          setCurrentUser(res.data);
          console.log('Current user in AuthContext.js: ', currentUser);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          localStorage.removeItem('token');
          setCurrentUser(null);
          setLoading(false);
        });
    } else {
      setCurrentUser(null);
      setLoading(false);
    }
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
