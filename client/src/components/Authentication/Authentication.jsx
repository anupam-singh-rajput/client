import React from 'react';
import { useLocation } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
 
const Authentication = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderComponent = () => {
    switch (path) {
      case '/':
        return <Signup />;
      case '/login':
        return <Login />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="body flex h-screen items-center justify-center bg-gradient-to-tr from-purple-900 to-indigo-900">
      {renderComponent()}
    </div>
  );
};

export default Authentication;
