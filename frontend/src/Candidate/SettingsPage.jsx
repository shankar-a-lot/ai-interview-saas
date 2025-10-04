import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SettingsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    language: 'en'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToDashboard = () => {
    navigate('/candidate/dashboard');
  };

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={handleBackToDashboard}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </button>
      <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Analytics & Settings</h1>
        <p className="text-gray-300">View your performance analytics and manage your account settings.</p>

        {/* Analytics Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-3">Performance Analytics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-medium">Total Interviews</h3>
              <p className="text-2xl text-blue-400">12</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-medium">Average Score</h3>
              <p className="text-2xl text-green-400">85%</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-medium">Improvement Rate</h3>
              <p className="text-2xl text-purple-400">+15%</p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-3">Account Settings</h2>
          <div className="space-y-4">
            <div id="notifications" className="flex items-center justify-between">
              <span className="text-gray-300">Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email Updates</span>
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            <div id="account-security" className="flex items-center justify-between">
              <span className="text-gray-300">Dark Mode</span>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            <div id="theme" className="flex items-center justify-between">
              <span className="text-gray-300">Language</span>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
