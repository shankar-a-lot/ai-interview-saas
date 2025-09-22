import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../services/authService';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleRoleChange = (role) => {
    setFormData({ ...formData, role: role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- THIS IS THE FIX ---
    // Check if any fields are empty before submitting
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields.');
      return; // Stop the function if fields are empty
    }

    setIsLoading(true);
    toast.loading('Creating your account...');
    const response = await registerUser(formData);
    toast.dismiss();
    if (response.success) {
      toast.success(response.message);
      navigate('/login');
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="max-w-md w-full bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-2xl">
        <h1 className="font-poppins text-3xl font-bold text-center text-white mb-6">
          Create Your Account
        </h1>
        <div className="mb-6">
          <label className="block font-poppins text-gray-300 mb-2">I am a...</label>
          <div className="flex rounded-lg bg-gray-700 p-1">
            <button
              type="button"
              onClick={() => handleRoleChange('candidate')}
              className={`w-1/2 p-2 rounded-md font-bold transition ${formData.role === 'candidate' ? 'bg-primary text-white' : 'text-gray-400'}`}
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('recruiter')}
              className={`w-1/2 p-2 rounded-md font-bold transition ${formData.role === 'recruiter' ? 'bg-primary text-white' : 'text-gray-400'}`}
            >
              Recruiter
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
           <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="name">Full Name</label>
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" type="text" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="email">Email</label>
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" type="email" id="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="password">Password</label>
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" type="password" id="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="text-center">
            <button type="submit" className="w-full font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;