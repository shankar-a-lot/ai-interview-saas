import React from 'react';

const PersonalInfoSection = ({ profileData, isEditing, onProfileDataChange }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => onProfileDataChange({ ...profileData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => onProfileDataChange({ ...profileData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => onProfileDataChange({ ...profileData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => onProfileDataChange({ ...profileData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => onProfileDataChange({ ...profileData, bio: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-700 text-white placeholder-gray-400"
              rows="4"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
