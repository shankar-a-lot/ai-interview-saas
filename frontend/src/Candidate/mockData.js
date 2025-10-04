export const mockInterviews = [
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

export const mockNotifications = [
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

export const getStats = (interviews) => ({
  scheduled: interviews.filter(i => i.status === 'scheduled').length,
  completed: interviews.filter(i => i.status === 'completed').length,
  avgScore: Math.round(interviews.filter(i => i.score).reduce((acc, i) => acc + i.score, 0) / interviews.filter(i => i.score).length) || 0,
  totalApplications: 12,
  responseRate: 75
});
