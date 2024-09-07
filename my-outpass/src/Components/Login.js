import React, { useState } from 'react';
// import authService from '../Services/authService.js';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/authService.js';


function Login() {
  const [college_id, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ college_id, password });
      localStorage.setItem('token', token);
      if (user.category === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/warden-dashboard');
      }
    } catch (err) {
      alert('Login failed');
      console.error('Login error:', err);
    }
  };

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


// import React, { useState } from 'react';
// import authService from '../Services/authService.js';
// import { useNavigate } from 'react-router-dom';
// require('dotenv').config();


// function Login() {
//   const [college_id, setCollegeId] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { token, user } = await authService.login({ college_id, password });
//       localStorage.setItem('token', token);
//       if (user.category === 'student') {
//         navigate('/student-dashboard');
//       } else {
//         navigate('/warden-dashboard');
//       }
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <input
//           type="text"
//           placeholder="College ID"
//           value={college_id}
//           onChange={(e) => setCollegeId(e.target.value)}
//           className="block w-full mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-4 p-2 border rounded"
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

