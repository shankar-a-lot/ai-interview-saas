import React from 'react';
import { Link } from 'react-router-dom';

const SystemCheckPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="font-poppins text-4xl font-bold">System Check</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">Let's make sure your camera and microphone are ready.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camera Check */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="font-poppins text-2xl font-semibold mb-4">Camera</h2>
          <div className="aspect-video bg-black rounded flex items-center justify-center">
            <p className="text-gray-500">Camera feed appears here</p>
          </div>
          <p className="font-roboto text-sm text-gray-400 mt-2 text-center">You should see yourself in the box above.</p>
        </div>

        {/* Microphone Check */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="font-poppins text-2xl font-semibold mb-4">Microphone</h2>
          <div className="h-full flex flex-col items-center justify-center">
            <p className="font-roboto text-gray-300 mb-4">Speak into your microphone.</p>
            {/* This is a visualizer that would react to sound */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3"></div>
            </div>
            <p className="font-roboto text-sm text-gray-400 mt-2">The bar should move when you talk.</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/interview/123" className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg">
          Continue to Interview
        </Link>
      </div>
    </div>
  );
};

export default SystemCheckPage;