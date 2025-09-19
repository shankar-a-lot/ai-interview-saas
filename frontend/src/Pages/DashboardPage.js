import React from 'react';
import { motion } from 'framer-motion';
import JobPostingCard from '../components/JobPostingCard'; // Import the new component
import { Link } from 'react-router-dom';

// Sample data to simulate real application data
const jobPostings = [
  { id: 1, title: 'Senior Frontend Developer', candidates: 24, status: 'Active' },
  { id: 2, title: 'Lead Backend Engineer', candidates: 15, status: 'Active' },
  { id: 3, title: 'UI/UX Designer', candidates: 32, status: 'Paused' },
];

const recentCandidates = [
  { id: 101, name: 'Rakshita Gada', job: 'Senior Frontend Developer', status: 'Pending Review' },
  { id: 102, name: 'Prawjal Patil', job: 'Lead Backend Engineer', status: 'Interview Scheduled' },
  { id: 103, name: 'Veerbhadrappa', job: 'UI/UX Designer', status: 'Completed' },
];

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-poppins text-4xl font-bold text-white">Recruiter Dashboard</h1>
          <p className="font-roboto text-lg text-gray-400 mt-2">
            Manage your hiring pipeline with ease.
          </p>
        </div>
        <Link to="/create-interview">
        <button className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg text-lg">
          + Create New Job
        </button>
        </Link>
      </div>

      {/* --- Job Postings Section (Requirement 3.2) --- */}
      <div>
        <h2 className="font-poppins text-2xl font-bold text-white mb-4">Active Job Postings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings.map(job => (
            <JobPostingCard key={job.id} title={job.title} candidates={job.candidates} status={job.status} />
          ))}
        </div>
      </div>

      {/* --- Candidate Tracking Section (Requirement 3.2) --- */}
      <div className="mt-12">
        <h2 className="font-poppins text-2xl font-bold text-white mb-4">Recent Candidates</h2>
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 font-poppins text-white">Name</th>
                <th className="p-4 font-poppins text-white">Applying For</th>
                <th className="p-4 font-poppins text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCandidates.map((candidate, index) => (
                <tr key={candidate.id} className="border-t border-gray-700">
                  <td className="p-4 font-roboto text-gray-300">{candidate.name}</td>
                  <td className="p-4 font-roboto text-gray-300">{candidate.job}</td>
                  <td className="p-4 font-roboto text-gray-400">{candidate.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;