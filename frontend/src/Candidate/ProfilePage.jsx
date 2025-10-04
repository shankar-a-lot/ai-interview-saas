import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Save } from 'lucide-react';
import PersonalInfoSection from './PersonalInfoSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import DocumentsSection from './DocumentsSection';
import CertificationsSection from './CertificationsSection';
import ProfileHeader from './profile/ProfileHeader';
import ProfileNavigation from './profile/ProfileNavigation';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate software developer with 5+ years of experience in full-stack development.'
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      duration: 'Jan 2022 - Present',
      description: 'Led development of scalable web applications using React and Node.js. Improved performance by 40% and mentored junior developers.',
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      duration: 'Jun 2020 - Dec 2021',
      description: 'Developed and maintained multiple client projects. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      technologies: ['JavaScript', 'Python', 'Django', 'PostgreSQL']
    }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 95, category: 'language' },
    { id: 2, name: 'React', level: 90, category: 'frontend' },
    { id: 3, name: 'Node.js', level: 80, category: 'backend' },
    { id: 4, name: 'Python', level: 75, category: 'language' },
    { id: 5, name: 'TypeScript', level: 60, category: 'language' }
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Boston, MA',
      duration: '2016 - 2020',
      gpa: '3.8/4.0'
    }
  ]);

  const [documents, setDocuments] = useState({
    resume: 'Resume.pdf',
    projects: [
      {
        id: 1,
        name: 'Project Alpha',
        year: '2023',
        url: 'https://project-alpha.example.com',
        description: 'A web application for managing tasks and projects.',
        technologies: ['React', 'Node.js', 'MongoDB']
      },
      {
        id: 2,
        name: 'Project Beta',
        year: '2022',
        url: 'https://project-beta.example.com',
        description: 'An e-commerce platform for handmade crafts.',
        technologies: ['Vue.js', 'Firebase', 'Stripe']
      }
    ]
  }) || {};

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-06-15',
      expiryDate: '2026-06-15'
    },
    {
      id: 2,
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      issueDate: '2023-03-20',
      expiryDate: '2026-03-20'
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToDashboard = () => {
    navigate('/candidate/dashboard');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleDeleteExperience = (id) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <ProfileHeader
        profileData={profileData}
        isEditing={isEditing}
        onUpdateProfile={setProfileData}
        setIsEditing={setIsEditing}
        handleImageUpload={() => {}}
        fileInputRef={{ current: null }}
      />

      <ProfileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="space-y-8">
        {activeSection === 'personal' && (
          <PersonalInfoSection
            profileData={profileData}
            isEditing={isEditing}
            onProfileDataChange={setProfileData}
          />
        )}

        {activeSection === 'experience' && (
          <ExperienceSection
            experience={experience}
            isEditing={isEditing}
            onDeleteExperience={handleDeleteExperience}
          />
        )}

        {activeSection === 'skills' && (
        <SkillsSection
          skills={skills}
          isEditing={isEditing}
          onAddSkill={(skill) => setSkills([...skills, { ...skill, id: Date.now() }])}
          onRemoveSkill={(id) => setSkills(skills.filter(skill => skill.id !== id))}
        />
        )}

        {activeSection === 'education' && (
          <EducationSection
            education={education}
            isEditing={isEditing}
            onEducationChange={setEducation}
          />
        )}

        {activeSection === 'documents' && (
          <DocumentsSection
            profileData={documents}
            isEditing={isEditing}
            onDocumentsChange={setDocuments}
          />
        )}

        {activeSection === 'certifications' && (
          <CertificationsSection
            certifications={certifications}
            isEditing={isEditing}
            onCertificationsChange={setCertifications}
          />
        )}

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
