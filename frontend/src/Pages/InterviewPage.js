import React from 'react';

const InterviewPage = () => {
  // We'll use placeholder data for now
  const currentQuestion = "Can you tell me about a challenging project you've worked on?";
  const questionNumber = 2;
  const totalQuestions = 10;

  return (
    // We use a flex layout to create the main panel and sidebar
    <div className="flex h-screen bg-gray-900 text-white">
      
      {/* Main Content: Video Feed */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <p className="font-roboto text-lg text-gray-400 mb-4">Question {questionNumber} of {totalQuestions}</p>
        <div className="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl flex items-center justify-center">
          {/* In a real app, the user's video feed would go here */}
          <p className="text-gray-500">Your camera feed will appear here</p>
        </div>
        <div className="mt-6 flex space-x-4">
          {/* Placeholder buttons for camera/mic controls */}
          <button className="bg-red-600 text-white p-3 rounded-full">Mic Off</button>
          <button className="bg-gray-700 text-white p-3 rounded-full">Cam Off</button>
        </div>
      </div>

      {/* Sidebar: AI Questions and Info */}
      <div className="w-96 bg-gray-800 p-8 flex flex-col border-l border-gray-700">
        <h2 className="font-poppins text-2xl font-bold mb-6">AI Interviewer</h2>
        <div className="bg-gray-700 p-6 rounded-lg flex-grow">
          <h3 className="font-poppins text-lg font-semibold mb-2">Current Question:</h3>
          <p className="font-roboto text-gray-300">
            {currentQuestion}
          </p>
        </div>
        <div className="mt-6">
          <button className="w-full font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg text-lg">
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;