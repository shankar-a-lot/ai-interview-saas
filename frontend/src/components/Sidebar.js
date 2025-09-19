import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Import useAuth to handle logout

const SidebarLink = ({ to, children }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-md hover:bg-gray-700"
    >
      {children}
    </motion.div>
  </Link>
);

const Sidebar = () => {
  const { logout } = useAuth(); // Get the logout function from context

  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col border-r border-gray-700">
      <div className="font-poppins text-2xl font-bold mb-10">
        AI<span className="text-primary">-Interview</span>
      </div>
      <nav className="flex flex-col space-y-2">
        <SidebarLink to="/dashboard">Dashboard</SidebarLink>
        <SidebarLink to="/interviews">Interviews</SidebarLink>
        <SidebarLink to="/candidates">Candidates</SidebarLink>
        <SidebarLink to="/reports">Reports</SidebarLink> {/* ADDED THIS LINK */}
        <SidebarLink to="/settings">Settings</SidebarLink>
      </nav>
      {/* Make the logout button actually log the user out */}
      <div className="mt-auto" onClick={logout}>
        <SidebarLink to="/">Log Out</SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;