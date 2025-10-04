import React, { useRef } from 'react';
import {
  User,
  Edit3,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Linkedin,
  Github,
  Globe,
  Camera,
  FileText
} from 'lucide-react';

const ProfileHeader = ({ profileData, isEditing, onUpdateProfile, setIsEditing, handleImageUpload, fileInputRef }) => {
  const handleSave = () => {
    setIsEditing(false);
    onUpdateProfile(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center overflow-hidden">
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-white" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Camera size={18} />
                </button>
              )}
            </div>

            {/* Basic Info */}
            <div>
              <h1 className="text-4xl font-bold mb-1">{profileData.name}</h1>
              <p className="text-xl text-blue-100 mb-2">{profileData.location}</p>
              <p className="text-sm text-blue-200 mb-6">{profileData.phone} | {profileData.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors font-medium"
                >
                  <Save size={20} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors"
                >
                  <X size={20} />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors"
              >
                <Edit3 size={20} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <p className="text-blue-100 text-xl leading-relaxed max-w-4xl">{profileData.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
