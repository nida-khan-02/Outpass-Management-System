// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Components/Login';
// import StudentDashboard from './Components/StudentDashboard';
// import WardenDashboard from './Components/WardenDashboard';


// function App() {
 
//   return (
    
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         <Route path="/warden-dashboard" element={<WardenDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import Login from './Components/Login';
// import StudentDashboard from './Components/StudentDashboard';
// import WardenDashboard from './Components/WardenDashboard';

// function App() {
//   const [hostelName, setHostelName] = useState('');

//   useEffect(() => {
//     // Fetch logged-in user info (assume you have the user's ID stored in localStorage or state)
//     const fetchHostelName = async () => {
//       try {
//         const response = await axios.get('/api/auth/user'); // Assuming the endpoint to get user data
//         setHostelName(response.data.hostelName);  // Set the hostelName of the logged-in user (warden)
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       }
//     };

//     fetchHostelName();
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         <Route path="/warden-dashboard" element={<WardenDashboard hostel={hostelName} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios'; 
import Login from './Components/Login';
import StudentDashboard from './Components/StudentDashboard';
import WardenDashboard from './Components/WardenDashboard';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hostelName, setHostelName] = useState(null);
 



  // Function to check if the user is authenticated
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  // Function to fetch the user's hostelName once they are logged in
  const fetchHostelName = async () => {
   // Fetch the user's hostelName using the token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHostelName(user.hostelName);
      } catch (error) {
        console.error('Error fetching hostelName:', error);
        // Handle token expiration or other auth errors here
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    }
  };
  

  // Effect to check authentication on page load
  useEffect(() => {
    const authenticated = checkAuthentication();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      fetchHostelName();  // Fetch hostelName if the user is authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          // Only render Login component if not authenticated
          <Route path="/" element={<Login onLoginSuccess={() => {
            setIsAuthenticated(true);
            fetchHostelName();
          }} />} />
        ) : (
          <>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            {/* Pass hostelName as a prop to WardenDashboard */}
            <Route path="/warden-dashboard" element={<WardenDashboard hostel={hostelName} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
