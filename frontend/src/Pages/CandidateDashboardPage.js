import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample data for a candidate's applications
const applications = [
  { jobId: 1, title: 'Senior Frontend Developer', status: 'Under Review' },
  { jobId: 2, title: 'Lead Backend Engineer', status: 'Interview Scheduled' },
  { jobId: 3, title: 'UI/UX Designer', status: 'Application Received' },
];

const StatusBadge = ({ status }) => {
  let colorClass = 'bg-gray-500';
  if (status === 'Under Review') colorClass = 'bg-yellow-500';
  if (status === 'Interview Scheduled') colorClass = 'bg-green-500';

  return (
    <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

const CandidateDashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-12"
    >
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">My Applications</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">
          Track the status of your job applications here.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="divide-y divide-gray-700">
          {applications.map((app) => (
            <div key={app.jobId} className="p-6 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="font-poppins text-2xl font-bold text-white">{app.title}</h2>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <StatusBadge status={app.status} />
                {app.status === 'Interview Scheduled' && (
                  <Link to={`/system-check/${app.jobId}`} className="font-roboto text-sm text-primary hover:underline">
                    Start System Check
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateDashboardPage;