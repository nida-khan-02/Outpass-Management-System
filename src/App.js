import React, { useState } from 'react';
import WardenDashboard from './components/WardenDashboard';
import LoginComponent from './components/LoginComponent';

function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      {user && user.role === 'warden' ? (
        <WardenDashboard hostel={user.hostel} />
      ) : (
        <LoginComponent onLogin={login} />
      )}
    </div>
  );
}

export default App;






