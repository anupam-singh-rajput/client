import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const ForgetTrue = (props) => {
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const updatePassword = async (e) => {
        e.preventDefault();

        //if value of any element is empty
        if (password === '' || confirmPassword === '') {
            alert('Please enter a new password');
        } else {
            //if both the element values are not same
            if (password !== confirmPassword) {
                alert('Both passwords must be the same');
            } else {
                //if everything is correct
                let response = await fetch(`${apiUrl}/api/users/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (data.success) {
                    alert(data.message);
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            }
        }
    };

    
    return (
        <div>
            {/* {props.result === true ? ( */}
                <form onSubmit={updatePassword} className="space-y-4">
                    <input type="text" value={email} placeholder='Email' disabled  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="New Password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input 
                        type="password" 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm Password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <div>
                        <button type="submit" className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md focus:outline-none">Update Password</button>
                    </div>
                </form>
            {/* ) : (
                <span>Email not found</span>
            )} */}
        </div>
    );
};

export default ForgetTrue;
