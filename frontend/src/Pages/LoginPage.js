import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService'; // Import our login service

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the global login function from context
  const [formData, setFormData] = useState({ email: 'candidate@example.com', password: 'password' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading('Logging in...');

    // Call our new API service
    const response = await loginUser(formData);
    
    toast.dismiss();

    if (response.success) {
      toast.success(response.message);
      login(response.user); // Update the global state with the user info
      if (formData.email === 'candidate@example.com') {
        navigate('/candidate/dashboard'); // Redirect to candidate dashboard
      } else {
        navigate('/dashboard'); // Redirect to admin dashboard
      }
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="max-w-md w-full bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-2xl">
        <h1 className="font-poppins text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit}>
           <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="email">Email</label>
            <input 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" 
                type="email" id="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="password">Password</label>
            <input 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" 
                type="password" id="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="text-center">
            <button 
                type="submit" 
                className="w-full font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg disabled:bg-gray-500"
                disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;