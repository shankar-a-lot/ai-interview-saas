import React from 'react';
import { Calendar, Star, Trash2 } from 'lucide-react';

const EducationSection = ({ education, isEditing, onDeleteEducation }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Education</h2>
        {isEditing && (
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 flex items-center space-x-2 transition-colors"
          >
            <span>Add Education</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="bg-gray-700 border border-gray-600 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                <p className="text-purple-600 font-medium text-lg">{edu.institution}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-300 mt-2 mb-4">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center">
                    <Star size={14} className="mr-1" />
                    {edu.grade}
                  </span>
                </div>
                <p className="text-gray-300">{edu.description}</p>
              </div>
              {isEditing && (
                <button
                  onClick={() => onDeleteEducation(edu.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
