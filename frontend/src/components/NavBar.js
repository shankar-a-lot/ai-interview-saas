import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-poppins text-2xl font-bold text-white">
            AI<span className="text-primary">-Interview</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 font-roboto text-gray-300">
            <Link to="/features" className="hover:text-primary transition">Features</Link>
            <Link to="/pricing" className="hover:text-primary transition">Pricing</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>
          </nav>
          <div className="space-x-4">
            <Link to="/login" className="font-poppins text-gray-300 hover:text-primary transition">Log In</Link>
            <Link to="/signup" className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;