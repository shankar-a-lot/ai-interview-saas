import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './Pages/HomePage';
import FeaturesPage from './Pages/FeaturesPage';
import PricingPage from './Pages/PricingPage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import InterviewsPage from './Pages/InterviewsPage';
import CandidatesPage from './Pages/CandidatesPage';
import SettingsPage from './Pages/SettingsPage';
import EvaluationReportPage from './Pages/EvaluationReportPage';
import InterviewPage from './Pages/InterviewPage';
import ReportsPage from './Pages/ReportsPage';
import CreateInterviewPage from './Pages/CreateInterviewPage';
import './App.css';

// --- Layout for Marketing Pages with Parallax Stars ---
const MarketingLayout = () => (
  <div className="parallax-container">
    {/* These are the star layers */}
    <div className="star-layer" id="stars1"></div>
    <div className="star-layer" id="stars2"></div>
    <div className="star-layer" id="stars3"></div>

    {/* The content must be in a separate container with a higher z-index */}
    <div className="relative z-10">
      <NavBar />
      <Outlet />
    </div>
  </div>
);

// --- Layout for the Main Application ---
const AppLayout = () => (
  <div className="flex h-screen bg-gray-800">
    <Sidebar />
    <main className="flex-1 p-10 overflow-y-auto">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{ style: { background: '#333', color: '#fff' } }}
        />
        <Routes>
          {/* --- Marketing Routes (Public) --- */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* --- Application Routes (Protected) --- */}
          <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/interviews" element={<InterviewsPage />} />
                <Route path="/candidates" element={<CandidatesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/report/:candidateId" element={<EvaluationReportPage />} />
                <Route path="/create-interview" element={<CreateInterviewPage />} />
              </Route>
          </Route>

          {/* --- Candidate Interview Route (Public) --- */}
          <Route path="/interview/:id" element={<InterviewPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
