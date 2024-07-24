import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for the name field

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic email format validation
    if (!email.includes('@')) {
      alert('Invalid email format');
      console.error('Invalid email format');
      return;
    }

    if (username !== '' && password !== '' && name !== '') { // Check if name is also provided
      try {
        const response = await fetch(`${apiUrl}/api/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, name }), // Include name in the request
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to sign up');
        }

        alert(data.message);
        console.log('User signed up successfully:', data);
        // Optionally redirect or show success message
      } catch (error) {
        alert('Error signing up: ' + error.message);
        console.error('Error signing up:', error.message);
        // Handle error, show error message, etc.
      }
    } else {
      alert('All fields are required');
      console.error('All fields are required');
    }
  };

  return (
    <div className="signup-container bg-white w-80 p-8 rounded-lg shadow-lg">
      <div className="title text-2xl font-bold text-center mb-4">Sign Up</div>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <input
            type="text"
            value={name} // Bind value to the new state
            onChange={(e) => setName(e.target.value)} // Update state on change
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Name"
            name="name"
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Username"
            name="username"
          />
        </div>
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

        <div className="flex justify-around">
          <button
            type="submit"
            className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Sign up
          </button>
          <Link to="/login">
            <button className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md focus:outline-none">
              Sign in
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
