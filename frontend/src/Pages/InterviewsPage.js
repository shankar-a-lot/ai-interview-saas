import React from 'react';

// Sample data - in the future, this will come from your backend API
const interviews = [
  { id: '001', candidate: 'John Doe', position: 'Frontend Developer', date: '2025-09-20', status: 'Completed' },
  { id: '002', candidate: 'Jane Smith', position: 'Backend Developer', date: '2025-09-22', status: 'Scheduled' },
  { id: '003', candidate: 'Peter Jones', position: 'UI/UX Designer', date: '2025-09-24', status: 'Scheduled' },
];

const InterviewsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-poppins text-4xl font-bold text-white">Interviews</h1>
          <p className="font-roboto text-lg text-gray-400 mt-2">
            Manage and review all your scheduled interviews.
          </p>
        </div>
        <button className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
          + New Interview
        </button>
      </div>

      {/* Interviews Table */}
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-poppins text-white">Candidate</th>
              <th className="p-4 font-poppins text-white">Position</th>
              <th className="p-4 font-poppins text-white">Date</th>
              <th className="p-4 font-poppins text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, index) => (
              <tr key={interview.id} className={`border-t border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                <td className="p-4 font-roboto text-gray-300">{interview.candidate}</td>
                <td className="p-4 font-roboto text-gray-300">{interview.position}</td>
                <td className="p-4 font-roboto text-gray-300">{interview.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    interview.status === 'Completed' ? 'bg-green-500 text-green-100' : 'bg-yellow-500 text-yellow-100'
                  }`}>
                    {interview.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewsPage;