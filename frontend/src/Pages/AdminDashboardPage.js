import React from 'react';
import { motion } from 'framer-motion';

// Sample data for the admin dashboard
const stats = [
  { label: 'Total Companies', value: '14' },
  { label: 'Active Subscriptions', value: '12' },
  { label: 'Total Interviews', value: '1,230' },
  { label: 'New Users This Month', value: '8' },
];

const recentCompanies = [
    { id: 1, name: 'TechCorp', plan: 'Enterprise' },
    { id: 2, name: 'Innovate Inc.', plan: 'Pro' },
    { id: 3, name: 'Solutions Co.', plan: 'Pro' },
]

const AdminDashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Header --- */}
      <div className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-white">Admin Dashboard</h1>
        <p className="font-roboto text-lg text-gray-400 mt-2">
          Platform overview and management.
        </p>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <p className="font-roboto text-gray-400">{stat.label}</p>
            <p className="font-poppins text-4xl font-bold text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* --- Recent Companies Table --- */}
      <div className="mt-12">
        <h2 className="font-poppins text-2xl font-bold text-white mb-4">Recently Onboarded Companies</h2>
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 font-poppins text-white">Company Name</th>
                <th className="p-4 font-poppins text-white">Subscription Plan</th>
                <th className="p-4 font-poppins text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCompanies.map((company) => (
                <tr key={company.id} className="border-t border-gray-700">
                  <td className="p-4 font-roboto text-gray-300">{company.name}</td>
                  <td className="p-4 font-roboto text-gray-300">{company.plan}</td>
                  <td className="p-4">
                    <button className="font-roboto text-sm text-primary hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;