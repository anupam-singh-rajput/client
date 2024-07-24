import React, { useState } from 'react';
import ForgetTrue from './ForgetTrue';
const apiUrl = process.env.REACT_APP_API_URL;

const Forget = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState(null);

    const handleForgetForm = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${apiUrl}/api/users/forget`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setNewPassword(true);
            } else {
                setNewPassword(false);
                return alert('Email Not Found');
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const renderContent = () => {
        if (newPassword === null || newPassword === false) {
            return (
                <form onSubmit={handleForgetForm} className="space-y-4">
                    <input 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder='Email'
                    />
                    <div>
                        <button type="submit" className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md focus:outline-none">
                            Submit
                        </button>
                    </div>
                </form>
            );
        } else if (newPassword === true) {
            return <ForgetTrue result={true} email={email} />;
        } 
    };

    return (
        <div className="body flex h-screen items-center justify-center bg-gradient-to-tr from-purple-900 to-indigo-900">
            <div className="signup-container bg-white w-80 p-8 rounded-lg shadow-lg">
                <div className="title text-2xl font-bold text-center mb-4">Forget Password</div>
                <div className="space-y-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Forget;
