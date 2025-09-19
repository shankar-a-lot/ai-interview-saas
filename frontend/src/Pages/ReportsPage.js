import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample data for a list of reports
const reports = [
  { id: 101, candidate: 'Rakshita Gada', job: 'Senior Frontend Developer', score: 92 },
  { id: 102, candidate: 'Prajwal Patil', job: 'Lead Backend Engineer', score: 88 },
  { id: 103, candidate: 'Veerbhadrappa', job: 'UI/UX Designer', score: 95 },
];

const ReportsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">Candidate Reports</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">
          Review the AI-generated evaluation reports for all candidates.
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-poppins text-white">Candidate</th>
              <th className="p-4 font-poppins text-white">Position</th>
              <th className="p-4 font-poppins text-white">Overall Score</th>
              <th className="p-4 font-poppins text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-gray-700">
                <td className="p-4 font-roboto text-gray-300">{report.candidate}</td>
                <td className="p-4 font-roboto text-gray-300">{report.job}</td>
                <td className="p-4 font-roboto font-bold text-white">{report.score}%</td>
                <td className="p-4">
                  <Link to={`/report/${report.id}`} className="font-roboto text-sm text-primary hover:underline">
                    View Full Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ReportsPage;