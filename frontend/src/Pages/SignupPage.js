import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupPage = () => {
  // Create state for all three signup fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New user signed up:', formData);
    toast.success('Account created successfully!');
    // In a real app, you would log the user in and navigate to the dashboard
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="max-w-md w-full bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-2xl">
        <h1 className="font-poppins text-3xl font-bold text-center text-white mb-6">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit}>
           <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="name">Full Name</label>
            <input 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-pink-500" 
              type="text" 
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="email">Email</label>
            <input 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-pink-500" 
              type="email" 
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="password">Password</label>
            <input 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-pink-500" 
              type="password" 
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="w-full font-poppins bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;