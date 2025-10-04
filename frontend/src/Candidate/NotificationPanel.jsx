import React from 'react';

const NotificationPanel = ({ notifications, showNotifications }) => (
  showNotifications && (
    <div className="fixed top-20 right-4 z-50 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-80">
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-semibold text-gray-200">Notifications</h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b border-gray-600 hover:bg-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-200 text-sm">{notification.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                <span className="text-gray-500 text-xs">{notification.time}</span>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
);

export default NotificationPanel;
