import React from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// We'll simulate finding the job title based on the ID from the URL
const jobs = [
  { id: 1, title: 'Senior Frontend Developer' },
  { id: 2, title: 'Lead Backend Engineer' },
  { id: 3, title: 'UI/UX Designer' },
  { id: 4, title: 'DevOps Specialist' },
];

const ApplicationPage = () => {
  const { jobId } = useParams();
  const job = jobs.find(j => j.id.toString() === jobId);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your application has been submitted!');
    // In a real app, you would handle form data and file upload here
  };

  if (!job) {
    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="font-poppins text-4xl font-bold text-white">Job Not Found</h1>
            <Link to="/careers" className="text-primary mt-4 inline-block">← Back to Job Listings</Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-poppins text-4xl font-bold text-white">Apply for {job.title}</h1>
        <p className="font-roboto text-xl text-gray-300 mt-4">Complete the form below to submit your application.</p>
      </div>

      <div className="max-w-2xl mx-auto backdrop-blur-sm bg-white/10 p-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-poppins text-gray-300 mb-2" htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" />
            </div>
            <div>
              <label className="block font-poppins text-gray-300 mb-2" htmlFor="email">Email Address</label>
              <input type="email" id="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mt-6">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="resume">Upload Resume</label>
            <input type="file" id="resume" className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary-hover" />
          </div>
          
          <div className="text-center mt-8">
            <button type="submit" className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationPage;