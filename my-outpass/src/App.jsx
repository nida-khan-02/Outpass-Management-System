import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <Router>
    <AuthProvider>
    <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AuthProvider>
    </Router>
  );
}
export default App;