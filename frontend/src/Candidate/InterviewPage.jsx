import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  Send,
  Clock,
  User,
  ChevronLeft,
  RotateCcw,
  Flag,
  HelpCircle
} from 'lucide-react';

const InterviewPage = ({ interview, onEndInterview }) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [interviewTime, setInterviewTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(8);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [interviewPhase, setInterviewPhase] = useState('introduction');

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Mock interview data
  const interviewData = {
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Inc.',
    interviewer: 'AI Assistant Sarah',
    duration: '45 minutes',
    type: 'Technical + Behavioral'
  };

  const questions = [
    {
      id: 1,
      phase: 'introduction',
      text: "Hello! Welcome to your interview for the Senior React Developer position at TechCorp Inc. I'm Sarah, your AI interviewer today. Let's start with a brief introduction - could you tell me about yourself and your background in software development?",
      type: 'introduction',
      timeLimit: 180
    },
    {
      id: 2,
      phase: 'technical',
      text: "Great! Now let's dive into some technical questions. Can you explain the difference between controlled and uncontrolled components in React? When would you use each approach?",
      type: 'technical',
      timeLimit: 240
    },
    {
      id: 3,
      phase: 'technical',
      text: "Excellent explanation! Let's talk about React hooks. How would you implement a custom hook for API data fetching with loading and error states?",
      type: 'technical',
      timeLimit: 300
    },
    {
      id: 4,
      phase: 'technical',
      text: "Perfect! Now, imagine you're working on a large React application and you notice performance issues. What are some strategies you would use to optimize the application?",
      type: 'technical',
      timeLimit: 300
    },
    {
      id: 5,
      phase: 'behavioral',
      text: "Now let's move to some behavioral questions. Tell me about a challenging project you worked on. What made it challenging and how did you overcome the obstacles?",
      type: 'behavioral',
      timeLimit: 240
    },
    {
      id: 6,
      phase: 'behavioral',
      text: "That's a great example! How do you stay updated with the latest developments in React and frontend technologies?",
      type: 'behavioral',
      timeLimit: 180
    },
    {
      id: 7,
      phase: 'behavioral',
      text: "Describe a time when you had to work with a difficult team member or stakeholder. How did you handle the situation?",
      type: 'behavioral',
      timeLimit: 240
    },
    {
      id: 8,
      phase: 'conclusion',
      text: "We're almost done! Do you have any questions about the role, the company, or our tech stack? This is your opportunity to learn more about what we do here at TechCorp.",
      type: 'conclusion',
      timeLimit: 180
    }
  ];

  const currentQuestionData = questions[currentQuestion - 1];
  const progress = (currentQuestion / totalQuestions) * 100;

  // Initialize video stream and timer
  useEffect(() => {
    const initializeStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeStream();

    // Start timer
    timerRef.current = setInterval(() => {
      setInterviewTime(prev => prev + 1);
    }, 1000);

    // Initialize chat history with first question
    setChatHistory([
      {
        id: 1,
        sender: 'ai',
        message: currentQuestionData.text,
        timestamp: new Date().toISOString(),
        questionNumber: currentQuestion
      }
    ]);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion, currentQuestionData.text]);

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    resetControlsTimeout();
    
    const handleMouseMove = () => resetControlsTimeout();
    const handleKeyPress = () => resetControlsTimeout();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setIsThinking(true);
      
      // Add current answer to chat history
      if (currentAnswer.trim()) {
        setChatHistory(prev => [...prev, {
          id: Date.now(),
          sender: 'candidate',
          message: currentAnswer,
          timestamp: new Date().toISOString(),
          questionNumber: currentQuestion
        }]);
        setCurrentAnswer('');
      }

      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        setIsThinking(false);
        setInterviewPhase(questions[nextQuestion - 1].phase);
        setChatHistory(prev => [...prev, {
          id: Date.now(),
          sender: 'ai',
          message: questions[nextQuestion - 1].text,
          timestamp: new Date().toISOString(),
          questionNumber: nextQuestion
        }]);
      }
      , 2000);
    } else {
      // End interview
      handleEndInterview();
    } 
  };
  const handleEndInterview = () => {
    // Stop media tracks
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onEndInterview({
      totalTime: interviewTime,
      chatHistory
    });
  }
  const handleRestartQuestion = () => {
    setCurrentAnswer('');
  }
  const handleToggleVideo = () => {
    setIsVideoEnabled(prev => !prev);

    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];  
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
      }
    }
  };
  const handleToggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];    
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
  };
  const handleFlagQuestion = () => {
    alert('Question flagged for review.');
  }
  const handleHelp = () => {
    alert('Help is on the way!');
  }
  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  }
  const handleAnswerKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNextQuestion();
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-600 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleEndInterview}
                className="mr-4 p-2 text-gray-300 hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-xl font-semibold text-white">{interviewData.jobTitle} at {interviewData.company}</h2>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <User size={16} />
                <span>{interviewData.interviewer}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Clock size={16} />
                <span>{interviewData.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>{interviewData.type}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col border-r border-gray-600">
          {/* Video Section */}
          <div className="relative flex-shrink-0 h-80 bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${!isVideoEnabled ? 'grayscale' : ''}`}
            />
            {/* Video Overlay */}
            {showControls && (
              <div className="absolute bottom-4 left-4 flex space-x-3">
                <button
                  onClick={handleToggleVideo}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
                <button
                  onClick={handleToggleAudio}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
                <button
                  onClick={handleFlagQuestion}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <Flag size={20} />
                </button>
                <button
                  onClick={handleHelp}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <HelpCircle size={20} />
                </button>
              </div>
            )}
            {/* Interview Phase Badge */}
            {showControls && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {interviewPhase.charAt(0).toUpperCase() + interviewPhase.slice(1)}
              </div>
            )}
            {/* Timer */}
            {showControls && (
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                {formatTime(interviewTime)}
              </div>
            )}
          </div>
          {/* Progress Bar */}
          <div className="h-2 bg-gray-700">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Question and Answer Section */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            <div className="mb-4 text-lg font-semibold text-white">
              Question {currentQuestion} of {totalQuestions}
            </div>
            <div className="flex-1 mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg overflow-y-auto">
              {isThinking ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-white">Thinking...</span>
                </div>
              ) : (
                <p className="text-white">{currentQuestionData.text}</p>
              )}
            </div>
            <textarea
              value={currentAnswer}
              onChange={handleAnswerChange}
              onKeyPress={handleAnswerKeyPress}
              placeholder="Type your answer here..."
              className="w-full h-24 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-700 text-white placeholder-gray-400"
              disabled={isThinking}
            />
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handleRestartQuestion}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Restart Question</span>
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Send size={16} />
                <span>{currentQuestion < totalQuestions ? 'Next Question' : 'End Interview'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Chat History */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-600">
            <h3 className="text-lg font-semibold text-white">Chat History</h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto bg-gray-800">
            {chatHistory.map(entry => (
              <div key={entry.id} className={`mb-4 ${entry.sender === 'ai' ? 'text-left' : 'text-right'}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  entry.sender === 'ai'
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-600 text-white'
                }`}>
                  <p className="whitespace-pre-wrap">{entry.message}</p>
                  <div className="text-xs mt-2 opacity-70">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default InterviewPage;