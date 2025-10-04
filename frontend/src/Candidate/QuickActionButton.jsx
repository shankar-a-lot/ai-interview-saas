import React from 'react';

const QuickActionButton = ({ onClick, icon: Icon, title, description, hoverColor }) => (
  <button
    onClick={onClick}
    className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors text-left w-full"
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-blue-600 rounded-lg">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  </button>
);

export default QuickActionButton;
