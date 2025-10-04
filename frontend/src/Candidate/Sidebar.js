import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col border-r border-gray-700 h-screen">
      <div className="font-poppins text-2xl font-bold mb-10">
        AI<span className="text-blue-400">-Interview</span>
      </div>
      <nav className="flex flex-col space-y-2 flex-1">
        <Link
          to="/candidate/dashboard"
          className="p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/candidate/system-check/1"
          className="p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          System Check
        </Link>
        <Link
          to="/candidate/interview/1"
          className="p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          Interview
        </Link>
        <Link
          to="/candidate/profile"
          className="p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          Profile
        </Link>
        <Link
          to="/candidate/settings"
          className="p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          Settings
        </Link>
      </nav>
      {user && (
        <button 
          onClick={handleLogout}
          className="mt-auto p-3 rounded-md hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default Sidebar;
