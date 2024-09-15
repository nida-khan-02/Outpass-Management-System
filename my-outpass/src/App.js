import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios'; 
import Login from './Components/Login';
// import StudentDashboard from './Components/StudentDashboard';
// import WardenDashboard from './Components/WardenDashboard';
import { AuthProvider } from './contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';


function App() {
  // const Navigate = useNavigate();

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // // const [hostelName, setHostelName] = useState(null);
 
  // // Function to check if the user is authenticated
  // const checkAuthentication = () => {
  //   const token = localStorage.getItem('token');
  //   return token !== null;
  // };

  // // Function to fetch the user's hostelName once they are logged in
  // const fetchHostelName = async () => {
  // //  // Fetch the user's hostelName using the token
  //   const token = localStorage.getItem('token');
  //   console.log('Token:', token);
 
  //   if (token) {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/auth/user', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       setHostelName(response.data.hostelName);
  //       console.log('Hostel Name:', response.hostelName);
  //       console.log('Category:', response.category);
  //     } catch (error) {
  //       console.error('Error fetching hostelName:', error);
  //     } 
  //   } else {
  //     console.log('No token found')
  //   }
  // };
  
  // // Effect to check authentication on page load
  // useEffect(() => {
  //   const authenticated = checkAuthentication();
  //   setIsAuthenticated(authenticated);
  //   if (authenticated) {
  //     console.log('Authenticated:', authenticated);
  //     fetchHostelName();  // Fetch hostelName if the user is authenticated
  //   }
  // }, [isAuthenticated]);
 
  return (
    <Router>
    <AuthProvider>
  
      <Routes>
        <Route path="*" element={<Login />} />
          {/* <>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/warden-dashboard" element={<WardenDashboard hostel={hostelName} />} />
          </> */}

{/* <Route path="/login" element={<Login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/warden-dashboard" element={<WardenDashboard />} />
          <Route path="*" element={<Navigate to="/login" />} /> */}
        
      </Routes>
    </AuthProvider>
    </Router>

  );
}


export default App;
