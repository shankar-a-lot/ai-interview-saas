import React from 'react';
import { Link } from 'react-router-dom';

// Sample data for job listings
const jobs = [
  { id: 1, title: 'Senior Frontend Developer', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Lead Backend Engineer', location: 'New York, NY', type: 'Full-time' },
  { id: 3, title: 'UI/UX Designer', location: 'San Francisco, CA', type: 'Contract' },
  { id: 4, title: 'DevOps Specialist', location: 'Remote', type: 'Full-time' },
];

const JobListingsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-poppins text-5xl font-bold text-white">Find Your Next Opportunity</h1>
        <p className="font-roboto text-xl text-gray-300 mt-4">Browse our open positions and start your journey with us.</p>
      </div>

      {/* Job Listings */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {jobs.map(job => (
            <div key={job.id} className="backdrop-blur-sm bg-white/10 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center transform hover:scale-105 transition-transform duration-300">
              <div>
                <h2 className="font-poppins text-2xl font-bold text-white">{job.title}</h2>
                <p className="font-roboto text-gray-400">{job.location} • {job.type}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to={`/apply/${job.id}`} className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;