import React from 'react';

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <Icon className="text-gray-400" size={24} />
    </div>
  </div>
);

export default StatCard;
