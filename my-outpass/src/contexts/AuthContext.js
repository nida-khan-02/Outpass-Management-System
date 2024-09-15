import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';
// import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // const token = jwt.sign(
    //   { userId: user._id, college_id: user.college_id, category: user.category },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );
    const token = localStorage.getItem('token');
    console.log("Token in AuthContext.js:", token);

    
    if (token) {
      api.get('http://localhost:5000/api/auth/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setCurrentUser(res.data);
          
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
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
