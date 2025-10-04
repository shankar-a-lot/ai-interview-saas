import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

const SkillsSection = ({ skills, isEditing, onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 70, category: 'frontend' });

  const getSkillCategoryColor = (category) => {
    switch (category) {
      case 'frontend': return 'bg-blue-900 text-blue-200 border-blue-700';
      case 'backend': return 'bg-green-900 text-green-200 border-green-700';
      case 'language': return 'bg-purple-900 text-purple-200 border-purple-700';
      case 'database': return 'bg-orange-900 text-orange-200 border-orange-700';
      case 'cloud': return 'bg-indigo-900 text-indigo-200 border-indigo-700';
      case 'devops': return 'bg-red-900 text-red-200 border-red-700';
      case 'framework': return 'bg-pink-900 text-pink-200 border-pink-700';
      case 'api': return 'bg-teal-900 text-teal-200 border-teal-700';
      default: return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  const getProficiencyLabel = (level) => {
    if (level >= 85) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Beginner';
    return 'Novice';
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      onAddSkill(newSkill);
      setNewSkill({ name: '', level: 70, category: 'frontend' });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Skills & Technologies</h2>

      {/* Add New Skill */}
      {isEditing && (
        <div className="bg-gray-700 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Add New Skill</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              className="px-4 py-2 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="language">Language</option>
              <option value="database">Database</option>
              <option value="cloud">Cloud</option>
              <option value="devops">DevOps</option>
              <option value="framework">Framework</option>
              <option value="api">API</option>
            </select>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-sm text-gray-300 w-12">{newSkill.level}%</span>
            </div>
            <button
              onClick={handleAddSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Skill</span>
            </button>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-gray-800 border border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-white">{skill.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSkillCategoryColor(skill.category)}`}>
                  {skill.category}
                </span>
              </div>
              {isEditing && (
                <button
                  onClick={() => onRemoveSkill(skill.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Proficiency</span>
                <span className="font-medium text-white">{getProficiencyLabel(skill.level)}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
