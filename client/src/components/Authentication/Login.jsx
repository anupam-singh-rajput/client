import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic email format validation
    if (!email.includes('@')) {
      alert('Invalid email format');
      console.error('Invalid email format');
      return;
    }

    if (password !== '') {
      try {
        const response = await fetch(`${apiUrl}/api/users/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // This is important to include cookies
        });


        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to log in');
        }

        // Store the token in local storage
        localStorage.setItem('token', data.token);

        console.log('User logged in successfully:', data);
        navigate('/home', { state: { email, password } });

      } catch (error) {
        console.error('Error logging in:', error.message);
        alert(error.message);
      }
    } else {
      console.error('All fields are required');
      alert('All fields are required');
    }
  };

  return (
    <div className="body">
      <div className="signup-container bg-white w-80 p-8 rounded-lg shadow-lg">
        <div className="title text-2xl font-bold text-center mb-4">Sign In</div>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Email"
              name="email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="text-sm text-center mb-4">
            <p>
              Lost password?{' '}
              <span className="text-blue-500 cursor-pointer"><Link to='/forget'>Click here!</Link></span>
            </p>
          </div>
          <div className="flex justify-around">
            <Link to="/">
              <button
                type="submit"
                className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md focus:outline-none"
              >
                Sign up
              </button>
            </Link>
            <button className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md focus:outline-none">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
