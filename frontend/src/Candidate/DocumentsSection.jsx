import React, { useRef } from 'react';
import { Upload, Eye, Download, ExternalLink, Trash2, Plus, FileText } from 'lucide-react';

const DocumentsSection = ({ profileData, isEditing, onResumeUpload, onDeleteProject }) => {
  const resumeInputRef = useRef(null);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onResumeUpload(file.name);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Documents & Portfolio</h2>

      {/* Resume Section */}
      <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Resume</h3>

        {profileData.resume ? (
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-600">
            <div className="flex items-center space-x-4">
              <div className="bg-green-900 p-3 rounded-xl">
                <FileText className="text-green-400" size={24} />
              </div>
              <div>
                <p className="font-medium text-white">{profileData.resume}</p>
                <p className="text-gray-300 text-sm">PDF • Updated today • 2.4 MB</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                <Eye size={18} />
              </button>
              <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center">
            <Upload className="mx-auto mb-4 text-green-400" size={32} />
            <p className="text-gray-300 mb-2">No resume uploaded</p>
            <p className="text-gray-400 text-sm">Upload your latest resume in PDF format</p>
          </div>
        )}

        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => resumeInputRef.current?.click()}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 flex items-center space-x-2 transition-colors"
          >
            <Upload size={18} />
            <span>Upload New Resume</span>
          </button>

          <button className="border border-green-600 text-green-400 px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
            Generate from Profile
          </button>
        </div>

        <input
          ref={resumeInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleResumeUpload}
        />
      </div>

      {/* Portfolio Projects */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Portfolio Projects</h3>
          {isEditing && (
            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 flex items-center space-x-2 transition-colors">
              <Plus size={16} />
              <span>Add Project</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {profileData.projects.map((project) => (
            <div key={project.id} className="bg-gray-800 border border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white text-lg">{project.name}</h4>
                  <p className="text-gray-400 text-sm">{project.year}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink size={16} />
                  </a>
                  {isEditing && (
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;
