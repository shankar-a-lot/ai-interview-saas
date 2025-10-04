import React from 'react';
import { User, Briefcase, GraduationCap, Star, Award, FileText } from 'lucide-react';

const ProfileNavigation = ({ activeSection, setActiveSection }) => {
  const sectionTabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-2">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {sectionTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeSection === tab.id 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <tab.icon size={18} />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileNavigation;
