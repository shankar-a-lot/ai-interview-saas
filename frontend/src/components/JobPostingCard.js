import React from 'react';

const JobPostingCard = ({ title, candidates, status }) => {
  const statusColor = status === 'Active' ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-poppins font-bold text-xl text-white">{title}</h3>
        <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>
      <p className="font-roboto text-gray-400 mt-2">{candidates} candidates applied</p>
      <div className="mt-4">
        <button className="font-roboto text-sm text-primary hover:underline">View Candidates</button>
      </div>
    </div>
  );
};

export default JobPostingCard;