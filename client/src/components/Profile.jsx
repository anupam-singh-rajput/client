import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get('token');
            if (!token) {
                alert('Please login again');
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/api/users/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();
                setUserProfile(data.user);
            } catch (error) {
                setError('Error fetching user profile');
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchFriendRequests = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setError('Please login again');
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/users/friendrequests', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch friend requests');
                }
                const data = await response.json();
                setFriendRequests(data.friendRequests);
            } catch (error) {
                setError('Error fetching friend requests');
                console.error('Error fetching friend requests:', error);
            }
        };

        fetchUserProfile();
        fetchFriendRequests();
    }, []);

    const acceptFriendRequest = async (email) => {
        const token = Cookies.get('token');
        if (!token) {
            setError('Please login again');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/acceptfriendrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to accept friend request');
            }

            alert('Friend request accepted');
            setFriendRequests(friendRequests.filter(request => request.email !== email));
        } catch (error) {
            setError('Error accepting friend request');
            console.error('Error accepting friend request:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }



    return (
        <div className="w-screen bg-gradient-to-tr from-purple-900 to-indigo-900 h-screen flex flex-col items-center justify-start p-6">
            <div className="w-[50%] flex bg-white rounded-lg shadow-lg overflow-hidden">
                <div className=" p-4 flex items-center justify-center bg-gray-200">
                    <img src={userProfile.profilePhoto || "path_to_default_image"} alt="Profile" className="rounded-full h-32 w-32" />
                </div>
                <div className="w-[80%] p-4">
                    <h2 className="text-2xl font-semibold mb-2">{userProfile.name}</h2>
                    <p className="text-gray-700 mb-1">Email: {userProfile.email}</p>
                    <p className="text-gray-700 mb-1">Username: {userProfile.username}</p>
                    <p className="text-gray-700 mb-1">Created At: {new Date(userProfile.createdAt).toLocaleDateString()}</p>
                    <br></br>
                    <button
                      type="submit"
                      className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md mr-2"
                      onClick={()=>{navigate("/home")}}
                    >
                      Home
                    </button>
                </div>
            </div>
            <div className="friend-requests w-[50%]  mt-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
              {friendRequests.length === 0 ? (
                <p>No friend requests</p>
              ) : (
                friendRequests.map(request => (
                  <div key={request.email} className="user-card border bg-white border-gray-300 p-4 mb-4 flex items-center justify-between">
                    <div className="profile-pic mr-4">
                      <img src={request.profilePhoto || 'path_to_default_profile_pic'} alt="Profile Pic" className="w-16 h-16 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{request.name}</h2>
                      <p className="text-gray-600">{request.email}</p>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md ml-auto"
                      onClick={() => acceptFriendRequest(request.email)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              )}
            </div>
        </div>
    );
};

export default Profile;
