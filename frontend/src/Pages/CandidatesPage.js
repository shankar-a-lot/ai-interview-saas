import React from 'react';

const CandidatesPage = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">Candidates</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">
          Browse and manage your candidate pool.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-8 shadow-2xl text-center">
        <h2 className="font-poppins text-2xl font-bold text-white mb-4">
          No Candidates Found
        </h2>
        <p className="font-roboto text-gray-300">
          When you conduct interviews, candidates will appear here.
        </p>
      </div>
    </div>
  );
};

export default CandidatesPage;