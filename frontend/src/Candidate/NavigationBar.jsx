import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/candidate/dashboard" className="font-poppins text-2xl font-bold text-white">
            AI<span className="text-primary">-Interview</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 font-roboto text-gray-300">
            <Link
              to="/candidate/dashboard"
              className={`transition ${
                location.pathname === '/candidate/dashboard'
                  ? 'text-primary'
                  : 'hover:text-primary'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/candidate/profile"
              className={`transition ${
                location.pathname === '/candidate/profile'
                  ? 'text-primary'
                  : 'hover:text-primary'
              }`}
            >
              Profile
            </Link>
            <Link
              to="/candidate/settings"
              className={`transition ${
                location.pathname === '/candidate/settings'
                  ? 'text-primary'
                  : 'hover:text-primary'
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/candidate/system-check/1"
              className={`transition ${
                location.pathname.startsWith('/candidate/system-check')
                  ? 'text-primary'
                  : 'hover:text-primary'
              }`}
            >
              System Check
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!user && (
              <Link
                to="/login"
                className="font-poppins text-gray-300 hover:text-primary transition"
              >
                Log In
              </Link>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => {
                    console.log('Settings dropdown toggle:', !isDropdownOpen);
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="font-poppins text-gray-300 hover:text-primary transition flex items-center space-x-1"
                >
                  <span>Settings</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                    <div className="py-2">
                      <Link
                        to="/candidate/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-gray-700 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/candidate/NotificationsSettings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-gray-700 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Notifications
                      </Link>
                      <Link
                        to="/candidate/AccountSecuritySettings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-gray-700 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Account Security
                      </Link>
                      <Link
                        to="/candidate/ThemeSettings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-gray-700 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Theme
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-gray-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
