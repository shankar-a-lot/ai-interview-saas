import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Trophy,
  Target,
  TrendingUp,
  Award,
  ChevronRight,
  Eye,
  Download,
  Bell,
  Search,
  BarChart3,
  Timer
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleStartInterview = (id) => {
    navigate(`/candidate/interview/${id}`);
  };

  const handleSystemCheck = () => {
    navigate('/candidate/system-check/1');
  };

  const handlePracticeMode = () => {
    navigate('/candidate/practice');
  };

  const handleAnalytics = () => {
    navigate('/candidate/settings');
  };

  // Mock Data
  const interviews = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      company: 'TechCorp Inc.',
      companyLogo: '🚀',
      scheduledDate: '2025-01-25',
      scheduledTime: '10:00 AM',
      status: 'scheduled',
      duration: '45 min',
      type: 'Technical + HR',
      difficulty: 'Advanced',
      priority: 'high',
      location: 'Remote',
      salary: '$80k - $100k'
    },
    {
      id: 2,
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      companyLogo: '💡',
      scheduledDate: '2025-01-20',
      scheduledTime: '2:00 PM',
      status: 'completed',
      duration: '30 min',
      type: 'Technical',
      score: 85,
      feedback: 'Strong technical skills, excellent communication',
      difficulty: 'Intermediate',
      priority: 'medium',
      location: 'Hybrid'
    },
    {
      id: 3,
      jobTitle: 'Frontend Engineer',
      company: 'Innovation Labs',
      companyLogo: '🎨',
      scheduledDate: '2025-01-18',
      scheduledTime: '11:00 AM',
      status: 'missed',
      duration: '40 min',
      type: 'Technical',
      difficulty: 'Intermediate',
      priority: 'low',
      canReschedule: true
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'interview_reminder',
      title: 'Interview Tomorrow',
      message: 'Senior React Developer interview at 10:00 AM',
      time: '2h ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'score_available',
      title: 'Interview Results Ready',
      message: 'Your Full Stack Developer interview results are available',
      time: '1d ago',
      priority: 'medium',
      read: false
    }
  ];

  const stats = {
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    avgScore: Math.round(interviews.filter(i => i.score).reduce((acc, i) => acc + i.score, 0) / interviews.filter(i => i.score).length) || 0,
    totalApplications: 12,
    responseRate: 75
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-900 text-blue-200 border-blue-700';
      case 'completed': return 'bg-green-900 text-green-200 border-green-700';
      case 'missed': return 'bg-red-900 text-red-200 border-red-700';
      case 'in-progress': return 'bg-yellow-900 text-yellow-200 border-yellow-700';
      default: return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || interview.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl text-white p-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Candidate'}! 👋</h1>
              <p className="text-blue-100 text-lg">Ready to ace your next interview?</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Scheduled</p>
                  <p className="text-2xl font-bold">{stats.scheduled}</p>
                </div>
                <Calendar className="text-blue-200" size={24} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="text-green-300" size={24} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Avg Score</p>
                  <p className="text-2xl font-bold">{stats.avgScore}%</p>
                </div>
                <Trophy className="text-yellow-300" size={24} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Applications</p>
                  <p className="text-2xl font-bold">{stats.totalApplications}</p>
                </div>
                <Target className="text-purple-300" size={24} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Response Rate</p>
                  <p className="text-2xl font-bold">{stats.responseRate}%</p>
                </div>
                <TrendingUp className="text-green-300" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={handleSystemCheck}
          className="group bg-gray-800 border-2 border-gray-600 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-900 p-3 rounded-xl group-hover:bg-blue-800 transition-colors">
              <Video className="text-blue-400" size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">System Check</h3>
              <p className="text-gray-300 text-sm">Test camera & microphone</p>
            </div>
          </div>
        </button>

        <button
          onClick={handlePracticeMode}
          className="group bg-gray-800 border-2 border-gray-600 rounded-2xl p-6 hover:border-green-300 hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-900 p-3 rounded-xl group-hover:bg-green-800 transition-colors">
              <Award className="text-green-400" size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">Practice Mode</h3>
              <p className="text-gray-300 text-sm">Improve your skills</p>
            </div>
          </div>
        </button>

        <button
          onClick={handleAnalytics}
          className="group bg-gray-800 border-2 border-gray-600 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-900 p-3 rounded-xl group-hover:bg-purple-800 transition-colors">
              <BarChart3 className="text-purple-400" size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">Analytics</h3>
              <p className="text-gray-300 text-sm">View your performance</p>
            </div>
          </div>
        </button>
      </div>

      {/* Interviews Section */}
      <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-white">Your Interviews</h2>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search interviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className={`border-l-4 ${getPriorityColor(interview.priority)} bg-gray-700 border border-gray-600 rounded-xl p-6 hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{interview.companyLogo}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{interview.jobTitle}</h3>
                      <p className="text-gray-300">{interview.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {interview.scheduledDate}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {interview.scheduledTime}
                    </span>
                    <span className="flex items-center">
                      <Timer size={14} className="mr-1" />
                      {interview.duration}
                    </span>
                    <span className="flex items-center">
                      <Video size={14} className="mr-1" />
                      {interview.type}
                    </span>
                    {interview.salary && (
                      <span className="text-green-400 font-medium">{interview.salary}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>

                    <span className="px-3 py-1 bg-gray-600 text-gray-200 rounded-full text-xs font-medium">
                      {interview.difficulty}
                    </span>

                    {interview.score && (
                      <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-medium">
                        Score: {interview.score}/100
                      </span>
                    )}
                  </div>

                  {interview.feedback && (
                    <div className="mt-3 p-3 bg-green-900 border border-green-700 rounded-lg">
                      <p className="text-sm text-green-200">
                        <strong>Feedback:</strong> {interview.feedback}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {interview.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => handleStartInterview(interview.id)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center font-medium transition-all hover:scale-105"
                      >
                        Start Interview
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                      <button
                        onClick={handleSystemCheck}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        System Check
                      </button>
                    </>
                  )}

                  {interview.status === 'completed' && (
                    <div className="flex flex-col space-y-2">
                      <button className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium">
                        <Eye size={14} className="mr-1" />
                        View Report
                      </button>
                      <button className="flex items-center text-gray-400 hover:text-gray-300 text-sm">
                        <Download size={14} className="mr-1" />
                        Download
                      </button>
                    </div>
                  )}

                  {interview.status === 'missed' && interview.canReschedule && (
                    <div className="flex flex-col items-end space-y-2">
                      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm">
                        Reschedule
                      </button>
                      <span className="text-xs text-gray-400">Available until Jan 30</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-500" size={24} />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No interviews found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-4 z-50 bg-gray-800 rounded-2xl shadow-2xl border border-gray-600 w-80">
          <div className="p-4 border-b border-gray-600">
            <h3 className="font-semibold text-white">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border-b border-gray-700 hover:bg-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                    <p className="text-gray-300 text-xs mt-1">{notification.message}</p>
                    <span className="text-gray-500 text-xs">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
