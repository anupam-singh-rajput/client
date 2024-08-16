// import React, { useEffect, useState } from 'react';
// import './Hidescollbar.css';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import Chats from './Chats';
// import Profile from './Profile';
// const apiUrl = process.env.REACT_APP_API_URL;

// const Home = () => {
//     const [friends, setFriends] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [username, setUsername] = useState('')
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = Cookies.get('token');
//         // Fetch friends from the backend
//         const fetchFriends = async () => {
//             try {
//                 const response = await fetch(`${apiUrl}/api/users/getuser`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     credentials: 'include',
//                 });

//                 const data = await response.json();
//                 console.log(data);
//                 setUsername(data.name);

//                 // Check and set friends array
//                 if (data.success && Array.isArray(data.friends)) {
//                     setFriends(data.friends);
//                 } else {
//                     console.error('Unexpected response structure:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching friends:', error);
//             }
//         };

//         fetchFriends();
//     }, [navigate]);

//     const handleUserClick = (email) => {
//         setSelectedUser(email); // Set selected user email
//     };

//    function getUsername(){
//     setUsername(this.name);
//     // console.log(username);
//    }
//    console.log(username);
//     return (

//         <div className="bodyhome bg-gray-200 w-screen h-screen fixed overflow-hidden ml-4">
//             <div className="header flex justify-between mt-2 mb-2 ">
//                 <div className="header-search ml-4">
//                     <button 
//                         type="submit"  
//                         className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 focus:outline-none w-80"
//                         onClick={() => { navigate("/search") }}
//                     >
//                         Search
//                     </button>
//                 </div>
//                 <div className="header-search ml-4">
//                     {username}
//                 </div>
//                 <div className="header-profile">
//                     <button 
//                         type="submit"  
//                         className="bg-gradient-to-tr text-white from-purple-900 to-indigo-900 text-1rem px-4 py-2 focus:outline-none mr-8 w-32"
//                         onClick={() => { navigate('/profile') }}
//                     >
//                         Profile
//                     </button>
//                 </div> 
//             </div>  
//             <div className="container w-screen h-[90%] flex justify-between">
//                 <div className="left-container w-[21%] h-full bg-white scrollbar-hide overflow-y-scroll">
//                     {Array.isArray(friends) && friends.map((friend) => (
//                         <div 
//                             key={friend.email} 
//                             className={`user w-[100%] h-[100px] flex justify-center items-center border-b-2 border-indigo-900 pl-2 cursor-pointer ${
//                                 selectedUser === friend.email ? 'bg-gradient-to-tr  from-purple-900 to-indigo-900 text-white text-base' : 'bg-white'
//                             }`}
//                             onClick={() => handleUserClick(friend.email)} // Set selected user on click
//                         >
//                             <div className="profile-pic w-[30%] h-[90%] bg-black rounded-full">
//                                 <img src={friend.profilePhoto || "path_to_default_image"} alt="" />
//                             </div>
//                             <div className="username w-[70%] h-[90%] text-left pl-2 content-center">
//                                 <p>{friend.name}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <Chats selectedUser={selectedUser} /> {/* Pass selectedUser to Chats */}
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Chats from './Chats';
import './Hidescollbar.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const fetchFriends = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/users/getuser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                const data = await response.json();
                setUsername(data.name);

                if (data.success && Array.isArray(data.friends)) {
                    setFriends(data.friends);
                } else {
                    console.error('Unexpected response structure:', data);
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [navigate]);

    const handleUserClick = (email) => {
        setSelectedUser(email);
    };

    const handleSwipeBack = () => {
        setSelectedUser(null);
    };

    return (
        <div className="bg-gray-200 w-screen h-screen fixed overflow-hidden">
            <div className="header flex justify-between mt-2 mb-2 px-4">
                <button
                    type="button"
                    className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 focus:outline-none w-24"
                    onClick={() => { navigate("/search") }}
                >
                    Search
                </button>
                <div className="text-lg">{username}</div>
                <button
                    type="button"
                    className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 focus:outline-none w-24"
                    onClick={() => { navigate('/profile') }}
                >
                    Profile
                </button>
            </div>

            <div className="container h-[90%] flex flex-col md:flex-row">
                <div className={`left-container ${selectedUser ? 'hidden' : 'block'} md:w-[21%] w-full h-full bg-white scrollbar-hide overflow-y-scroll`}>
                    {Array.isArray(friends) && friends.map((friend) => (
                        <div
                            key={friend.email}
                            className={`user flex items-center border-b-2 border-indigo-900 p-4 cursor-pointer ${
                                selectedUser === friend.email ? 'bg-gradient-to-tr from-purple-900 to-indigo-900 text-white' : 'bg-white'
                            }`}
                            onClick={() => handleUserClick(friend.email)}
                        >
                            <div className="profile-pic w-[20%] h-[50px] rounded-full bg-black">
                                <img src={friend.profilePhoto || "path_to_default_image"} alt="Profile" className="rounded-full object-cover w-full h-full" />
                            </div>
                            <div className="username pl-4 w-[80%]">
                                <p className="text-base">{friend.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`right-container ${selectedUser ? 'block' : 'hidden'} md:w-[79%] w-full h-full bg-white relative`}>
                    <Chats selectedUser={selectedUser} onSwipeBack={handleSwipeBack} />
                </div>
            </div>
        </div>
    );
};

export default Home;

