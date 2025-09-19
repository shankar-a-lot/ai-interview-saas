import React from 'react';

const SettingsPage = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">Settings</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">
          Configure your account and application settings.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
        <h2 className="font-poppins text-2xl font-bold text-white mb-4">
          Account Settings
        </h2>
        <p className="font-roboto text-gray-300">
          User profile and billing information will be managed here.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;