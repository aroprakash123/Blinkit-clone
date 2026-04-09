import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useAuth();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  if (username.length < 3) {
    setError('Username must be at least 3 characters');
    return;
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        username: data.username,
        email: data.email
      }));
      
      // Update auth context
      setUserData({
        _id: data._id,
        username: data.username,
        email: data.email
      });
      
      console.log('Login successful, user saved:', data.username);
      
      // Redirect to home
      navigate('/');
    } else {
      setError(data.message || 'Invalid credentials');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Network error. Please try again.');
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="35" viewBox="0 0 114 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.3342 7.186C16.2619 7.186 17.9832 7.66644 19.4978 8.62732C21.0262 9.57447 22.2242 10.9197 23.0917 12.663C23.9316 14.3377 24.3516 16.3075 24.3516 18.5724C24.3516 20.7687 23.9316 22.7316 23.0917 24.4612C22.2517 26.1908 21.0675 27.5429 19.5391 28.5175C17.9969 29.5058 16.2619 30 14.3342 30C12.9297 30 11.6078 29.7117 10.3685 29.1352C9.12927 28.5587 8.06901 27.7488 7.18775 26.7056V29.4852H0V0H7.18775V10.4598C8.06901 9.41661 9.12927 8.61359 10.3685 8.05079C11.6078 7.47426 12.9297 7.186 14.3342 7.186Z" fill="#F8CB46"/>
              <path d="M25.3356 29.4852V0H32.5233V29.4852H25.3356Z" fill="#F8CB46"/>
              <path d="M34.5607 29.4852V7.68016H41.7071V29.4852H34.5607Z" fill="#F8CB46"/>
              <path d="M90.3176 29.4198V7.61479H97.464V29.4198H90.3176Z" fill="#54B226"/>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
            India's last minute app
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Log in or Register
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter username or Email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;