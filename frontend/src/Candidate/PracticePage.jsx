import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Award,
  ChevronRight,
  Mic,
  Video,
  MessageSquare
} from 'lucide-react';

const PracticePage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [answers, setAnswers] = useState([]);

  const practiceQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and your background in software development.",
      type: "behavioral",
      timeLimit: 120,
      tips: "Focus on your experience, skills, and what motivates you."
    },
    {
      id: 2,
      question: "Explain the difference between let, const, and var in JavaScript.",
      type: "technical",
      timeLimit: 90,
      tips: "Cover scope, hoisting, and when to use each."
    },
    {
      id: 3,
      question: "How do you handle conflicts with team members?",
      type: "behavioral",
      timeLimit: 90,
      tips: "Use the STAR method and focus on positive outcomes."
    },
    {
      id: 4,
      question: "What are React hooks and how have you used them?",
      type: "technical",
      timeLimit: 120,
      tips: "Explain useState, useEffect, and custom hooks with examples."
    }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRecording(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setAnswers([...answers, {
      questionId: practiceQuestions[currentQuestion].id,
      answer: "Recorded answer would be saved here",
      timestamp: new Date().toISOString()
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(practiceQuestions[currentQuestion + 1].timeLimit);
      setIsRecording(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(practiceQuestions[currentQuestion - 1].timeLimit);
      setIsRecording(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-primary w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Award className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3 font-poppins">Practice Mode</h1>
        <p className="text-gray-300 text-lg">Sharpen your interview skills with guided practice sessions</p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Practice Session</h2>
          <span className="text-gray-300">
            Question {currentQuestion + 1} of {practiceQuestions.length}
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / practiceQuestions.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{Math.round(((currentQuestion + 1) / practiceQuestions.length) * 100)}% Complete</span>
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-gray-800 rounded-2xl border border-gray-600 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                practiceQuestions[currentQuestion].type === 'technical'
                  ? 'bg-blue-900 text-blue-200'
                  : 'bg-green-900 text-green-200'
              }`}>
                {practiceQuestions[currentQuestion].type}
              </span>
              <span className="text-gray-400 text-sm">
                <Clock size={14} className="inline mr-1" />
                {practiceQuestions[currentQuestion].timeLimit}s limit
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              {practiceQuestions[currentQuestion].question}
            </h2>

            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="text-blue-400 mt-1" size={16} />
                <div>
                  <h4 className="text-blue-200 font-medium mb-1">Tips:</h4>
                  <p className="text-blue-100 text-sm">{practiceQuestions[currentQuestion].tips}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="text-right">
            <div className={`text-3xl font-bold mb-2 ${timeLeft < 30 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-gray-400 text-sm">Time Remaining</div>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-center space-x-6">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 flex items-center font-semibold text-lg transition-all hover:scale-105"
            >
              <Play size={20} className="mr-2" />
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="bg-red-600 text-white px-8 py-4 rounded-2xl hover:bg-red-700 flex items-center font-semibold text-lg transition-all hover:scale-105"
            >
              <Pause size={20} className="mr-2" />
              Stop Recording
            </button>
          )}

          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="p-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === practiceQuestions.length - 1}
              className="p-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-red-900 border border-red-700 rounded-lg px-4 py-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-200 font-medium">Recording in progress...</span>
            </div>
          </div>
        )}
      </div>

      {/* Practice Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-900 p-3 rounded-xl">
              <Target className="text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Questions Completed</h3>
              <p className="text-gray-300 text-sm">{answers.length} of {practiceQuestions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-900 p-3 rounded-xl">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Average Time</h3>
              <p className="text-gray-300 text-sm">~2 min per question</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-900 p-3 rounded-xl">
              <Award className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Practice Streak</h3>
              <p className="text-gray-300 text-sm">Keep it up! 🔥</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate('/candidate/dashboard')}
          className="px-6 py-3 border-2 border-gray-600 rounded-2xl hover:bg-gray-800 text-white font-semibold transition-all"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate('/candidate/settings')}
          className="bg-primary text-white px-6 py-3 rounded-2xl hover:bg-blue-700 font-semibold transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
};

export default PracticePage;
