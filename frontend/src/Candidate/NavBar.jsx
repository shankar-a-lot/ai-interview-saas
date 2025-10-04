import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to={user ? "/dashboard" : "/"} className="font-poppins text-2xl font-bold text-white">
            AI<span className="text-primary">-Interview</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 font-poppins text-gray-300">
            {!user ? (
              <>
                <Link to="/features" className="hover:text-primary transition">Features</Link>
                <Link to="/pricing" className="hover:text-primary transition">Pricing</Link>
                <Link to="/contact" className="hover:text-primary transition">Contact</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
                <Link to="/system-check/1" className="hover:text-primary transition">System Check</Link>
                <Link to="/interview/1" className="hover:text-primary transition">Interview</Link>
              </>
            )}
          </nav>
          <div className="space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="font-poppins text-gray-300 hover:text-primary transition">Log In</Link>
                <Link to="/signup" className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg">
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="font-poppins text-gray-300 hover:text-primary transition">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
