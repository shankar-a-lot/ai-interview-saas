import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* --- Hero Section --- */}
      <div className="container mx-auto px-6 text-center h-screen flex flex-col justify-center">
        <h1 className="font-poppins text-6xl font-extrabold text-white tracking-tight" style={{ textShadow: '0 0 30px rgba(37, 99, 235, 0.5)' }}>
          The Future of Interviewing is Here
        </h1>
        <p className="font-roboto text-xl text-gray-300 max-w-3xl mx-auto mt-6">
          Our AI-driven platform provides deep insights and unbiased analysis to help you find the perfect candidate, faster than ever before.
        </p>
        <div className="mt-10">
          <Link to="/signup" className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg">
            Start for Free
          </Link>
        </div>
      </div>

      {/* --- NEW "How It Works" Section --- */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl font-bold text-white">Get Started in 3 Simple Steps</h2>
          <div className="mt-4 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-4">1</div>
            <h3 className="font-poppins text-2xl font-bold text-white mb-2">Create Interview</h3>
            <p className="font-roboto text-gray-300">Use our simple interface to set up your interview with custom or pre-built questions.</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-4">2</div>
            <h3 className="font-poppins text-2xl font-bold text-white mb-2">Invite Candidates</h3>
            <p className="font-roboto text-gray-300">Send a unique link. Candidates can take the interview anytime, anywhere.</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-4">3</div>
            <h3 className="font-poppins text-2xl font-bold text-white mb-2">Get AI Results</h3>
            <p className="font-roboto text-gray-300">Receive a detailed report with scoring, key insights, and a full transcript.</p>
          </div>
        </div>
      </div>

      {/* --- NEW Testimonials Section --- */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl font-bold text-white">What Our Customers Say</h2>
          <div className="mt-4 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg">
            <p className="font-roboto text-gray-300 italic mb-4">"This platform transformed our hiring process. The AI insights are incredibly accurate and saved us countless hours."</p>
            <p className="font-poppins font-bold text-white">- Sarah L., Head of Talent at TechCorp</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg">
            <p className="font-roboto text-gray-300 italic mb-4">"A game-changer for reducing bias and finding the best candidates. We've seen a massive improvement in hire quality."</p>
            <p className="font-poppins font-bold text-white">- Mark C., CEO of Innovate Inc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;