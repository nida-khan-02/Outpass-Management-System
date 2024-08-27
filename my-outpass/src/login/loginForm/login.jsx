import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-gray-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-200 text-black border border-black rounded-full hover:bg-gray-300 transition-all"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Not a Member? <a href="#" className="text-blue-600 hover:underline">Signup</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
