import React, { useState } from 'react';
import './Hidescollbar.css'; 
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Search = () => {
  const [name, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searched, setSearched] = useState(false); // Track if user has performed a search
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if username input is empty
    if (!name.trim()) {
      alert('Please enter a username');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.users.length === 0) {
        setErrorMessage('No users found');
        setSearchResults([]); // Clear previous search results if any
      } else {
        setSearchResults(data.users);
        setErrorMessage('');
      }

      setSearched(true); // Set searched to true after performing search
      
    } catch (error) {
      console.error('Error fetching search results:', error);
      setErrorMessage('Error fetching search results');
      setSearchResults([]); // Clear search results in case of error
    }
  };
  
  const addToChatList = async (email) => {
    const token = Cookies.get('token');
            console.log(token);
            if (!token) {
                alert('Please login again');
                return;
            }
    try {
      const response = await fetch('http://localhost:3001/api/users/add-to-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          email
        }),
      });
      const data = await response.json()
      if (response.ok) {
        alert('Friend request sent');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding to chat list:', error);
      alert('Error adding to chat list');
    }
  };

  return (
    <div className="body w-full h-screen flex flex-col bg-gradient-to-tr from-purple-900 to-indigo-900">
      <div className="search h-[100px] bg-gray-200 flex items-center justify-center">
        <form className="flex items-center w-full max-w-screen-md mx-auto"  onSubmit={handleSubmit}>
          {/* <button
            onClick={()=>{navigate("/home")}}
            className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-l-md mr-2"
          >
            Home
          </button> */}
          <input type="button" value="Home" 
          onClick={()=>{navigate("/home")}}
          className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-l-md mr-2"/>
          <input
            type="text"
            className="search-bar w-[80%] px-4 py-2 text-lg border-2 border-blue-600 rounded-l-md focus:outline-none"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-r-md ml-2"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="users w-[50%] mx-auto mt-4 scrollbar-hide overflow-y-auto">
        {errorMessage && <p className="text-gray-500 text-center">{errorMessage}</p>}
        {searchResults.map((user) => (
          <div key={user.email} className="user-card border bg-white border-gray-300 p-4 mb-4 flex items-center justify-between">
            <div className="profile-pic mr-4">
              <img src={user.profilePhoto || 'path_to_default_profile_pic'} alt="Profile Pic" className="w-16 h-16 rounded-full" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.profile}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md ml-auto"
              onClick={() => addToChatList(user.email)}
            >
              Add To Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
