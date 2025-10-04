import React from 'react';
import { ExternalLink, Trash2, Plus } from 'lucide-react';

const CertificationsSection = ({ certifications, isEditing, onDeleteCertification }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>
        {isEditing && (
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 flex items-center space-x-2 transition-colors">
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-gray-700 border border-gray-600 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                <p className="text-yellow-400 font-medium">{cert.issuer}</p>
                <p className="text-gray-300 text-sm mt-1">Issued: {cert.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <ExternalLink size={18} />
                </a>
                {isEditing && (
                  <button
                    onClick={() => onDeleteCertification(cert.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;
