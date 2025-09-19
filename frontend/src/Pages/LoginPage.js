import React from 'react'; // Comma has been removed from this line
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt...');
    
    toast.loading('Logging in...');

    setTimeout(() => {
      const mockUser = { name: 'Test User', email: 'test@example.com' };
      login(mockUser);
      toast.dismiss();
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    }, 1500);
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
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" type="email" id="email" defaultValue="test@example.com" />
          </div>
          <div className="mb-6">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="password">Password</label>
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" type="password" id="password" defaultValue="password" />
          </div>
          <div className="text-center">
            <button type="submit" className="w-full font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg">
              Log In
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