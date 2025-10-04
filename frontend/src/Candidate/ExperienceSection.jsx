import React from 'react';
import { MapPin, Calendar, Trash2 } from 'lucide-react';

const ExperienceSection = ({ experience, isEditing, onDeleteExperience }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Work Experience</h2>
        {isEditing && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            // onClick handler for adding experience can be passed as prop if needed
          >
            <span>Add Experience</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div key={exp.id} className="relative">
            <div className="flex items-start space-x-6">
              <div className="bg-blue-600 w-4 h-4 rounded-full mt-2 relative z-10"></div>
              <div className="flex-1">
                <div className="bg-gray-700 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-blue-400 font-medium text-lg">{exp.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mt-2">
                        <span className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {exp.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => onDeleteExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => {
                      const techColors = {
                        'React': 'bg-blue-900 text-blue-200',
                        'JavaScript': 'bg-yellow-900 text-yellow-200',
                        'TypeScript': 'bg-blue-800 text-blue-200',
                        'Node.js': 'bg-green-900 text-green-200',
                        'Python': 'bg-yellow-800 text-yellow-200',
                        'Java': 'bg-red-900 text-red-200',
                        'C++': 'bg-purple-900 text-purple-200',
                        'C#': 'bg-green-800 text-green-200',
                        'PHP': 'bg-indigo-900 text-indigo-200',
                        'Ruby': 'bg-red-800 text-red-200',
                        'Go': 'bg-cyan-900 text-cyan-200',
                        'Rust': 'bg-orange-900 text-orange-200',
                        'Swift': 'bg-pink-900 text-pink-200',
                        'Kotlin': 'bg-purple-800 text-purple-200',
                        'HTML': 'bg-orange-800 text-orange-200',
                        'CSS': 'bg-blue-700 text-blue-200',
                        'Sass': 'bg-pink-800 text-pink-200',
                        'Vue.js': 'bg-green-800 text-green-200',
                        'Angular': 'bg-red-800 text-red-200',
                        'Express': 'bg-gray-700 text-gray-200',
                        'Django': 'bg-green-800 text-green-200',
                        'Flask': 'bg-gray-600 text-gray-200',
                        'MongoDB': 'bg-green-800 text-green-200',
                        'PostgreSQL': 'bg-blue-800 text-blue-200',
                        'MySQL': 'bg-orange-800 text-orange-200',
                        'Redis': 'bg-red-800 text-red-200',
                        'AWS': 'bg-orange-900 text-orange-200',
                        'Docker': 'bg-blue-800 text-blue-200',
                        'Kubernetes': 'bg-blue-900 text-blue-200',
                        'Git': 'bg-orange-800 text-orange-200',
                        'Linux': 'bg-yellow-900 text-yellow-200',
                        'default': 'bg-gray-700 text-gray-200'
                      };

                      const colorClass = techColors[tech] || techColors['default'];

                      return (
                        <span
                          key={i}
                          className={`px-3 py-1 ${colorClass} rounded-full text-sm font-medium`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {index < experience.length - 1 && (
              <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
