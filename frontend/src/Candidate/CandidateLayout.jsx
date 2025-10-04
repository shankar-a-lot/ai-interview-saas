import React from 'react';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router-dom';

const CandidateLayout = () => (
  <div className="min-h-screen bg-gray-900">
    <NavigationBar />
    <main className="container mx-auto px-6 py-8">
      <Outlet />
    </main>
  </div>
);

export default CandidateLayout;
