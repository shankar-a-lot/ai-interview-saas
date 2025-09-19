import React from 'react';
import Heading from '../components/Heading';

const FeaturesPage = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <Heading>An Unfair Advantage in Hiring</Heading>
      
      {/* Feature 1 */}
      <div className="flex flex-col md:flex-row items-center my-16">
        <div className="md:w-1/2 p-4">
          <h3 className="font-poppins text-3xl font-bold text-white mb-4">Comprehensive AI Analysis</h3>
          <p className="font-roboto text-gray-300">Our model goes beyond simple keywords. It analyzes speech patterns, clarity, confidence, and filler word usage to provide a holistic view of a candidate's communication skills.</p>
        </div>
        <div className="md:w-1/2 p-4">
          {/* We replace the code block with a relevant, AI-generated image */}
          <img 
            src="https://image.pollinations.ai/prompt/futuristic%20AI%20analyzing%20speech%20waveforms%20and%20data,%20holographic%20interface,%20glowing%20neural%20network,%20dark%20blue%20and%20purple%20theme,%20abstract"
            alt="AI Analysis"
            className="rounded-lg shadow-2xl w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center my-16">
        <div className="md:w-1/2 p-4">
          <h3 className="font-poppins text-3xl font-bold text-white mb-4">Unbiased & Consistent Scoring</h3>
          <p className="font-roboto text-gray-300">Remove unconscious bias from your process. Every candidate is evaluated on the exact same criteria, providing you with objective, data-driven scores you can trust.</p>
        </div>
        <div className="md:w-1/2 p-4">
           {/* We replace the code block with another relevant, AI-generated image */}
           <img
            src="https://image.pollinations.ai/prompt/balanced%20scales%20made%20of%20light,%20abstract%20data%20points,%20representing%20fairness%20and%20data,%20futuristic,%20clean%20design,%20dark%20blue%20background,%20professional"
            alt="Unbiased Scoring"
            className="rounded-lg shadow-2xl w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;