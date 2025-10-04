import React from 'react';
import { Wifi, CheckCircle, XCircle, Clock } from 'lucide-react';

const checkInternet = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

const InternetCheck = ({ status, isChecking }) => {

  const getStatusIcon = (status) => {
    if (status === true) return <CheckCircle className="text-green-600" size={24} />;
    if (status === false) return <XCircle className="text-red-600" size={24} />;
    return <Clock className="text-gray-400" size={24} />;
  };

  const getStatusColor = (status) => {
    if (status === true) return 'border-green-200 bg-green-50';
    if (status === false) return 'border-red-200 bg-red-50';
    return 'border-gray-200 bg-white';
  };

  return (
    <div
      className={`flex items-center justify-between p-6 border-2 rounded-2xl transition-all ${getStatusColor(status)} ${
        isChecking ? 'ring-4 ring-blue-200 scale-105' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${
          status === true ? 'bg-green-900/30' :
          status === false ? 'bg-red-900/30' : 'bg-gray-700/50'
        }`}>
          <Wifi
            size={24}
            className={
              status === true ? 'text-green-400' :
              status === false ? 'text-red-400' : 'text-gray-400'
            }
          />
        </div>
        <div>
          <h3 className="font-semibold text-white text-lg">Internet Connection</h3>
          <p className="text-sm text-gray-300 mt-1">Verify your internet connectivity</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {isChecking && <div className="animate-spin text-blue-400">⟳</div>}
        {getStatusIcon(status)}
      </div>
    </div>
  );
};

export { InternetCheck, checkInternet };
