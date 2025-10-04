import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Mic,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  AlertCircle,
  Wifi,
  Monitor,
  Zap,
  VideoOff,
  RefreshCw,
  ArrowRight,
  Info
} from 'lucide-react';

const SystemCheckPage = () => {
  const navigate = useNavigate();
  const [systemCheck, setSystemCheck] = useState({
    camera: null,
    microphone: null,
    internet: null,
    browser: null,
    bandwidth: null
  });
  
  const [isChecking, setIsChecking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [videoStream, setVideoStream] = useState(null);
  const [checkProgress, setCheckProgress] = useState(0);
  
  const videoRef = useRef(null);

  const checkSteps = [
    { id: 'browser', name: 'Browser Compatibility', icon: Monitor },
    { id: 'internet', name: 'Internet Connection', icon: Wifi },
    { id: 'bandwidth', name: 'Network Speed', icon: Zap },
    { id: 'camera', name: 'Camera Access', icon: Video },
    { id: 'microphone', name: 'Microphone Access', icon: Mic }
  ];

  // Browser Compatibility Check
  const checkBrowser = () => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isEdge = /Edge/.test(navigator.userAgent);
    
    const hasWebRTC = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasAudioContext = !!(window.AudioContext || window.webkitAudioContext);
    
    const browserSupported = (isChrome || isFirefox || isSafari || isEdge) && hasWebRTC && hasAudioContext;
    
    setSystemCheck(prev => ({ ...prev, browser: browserSupported }));
    return browserSupported;
  };

  // Internet Connection Check
  const checkInternet = async () => {
    try {
      const isOnline = navigator.onLine;
      setSystemCheck(prev => ({ ...prev, internet: isOnline }));
      return isOnline;
    } catch (error) {
      setSystemCheck(prev => ({ ...prev, internet: false }));
      return false;
    }
  };

  // Bandwidth Check (Simplified)
  const checkBandwidth = async () => {
    try {
      const startTime = Date.now();
      // Simulate bandwidth test with a small request
      await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const hasGoodBandwidth = duration < 2000; // Less than 2 seconds is considered good
      setSystemCheck(prev => ({ ...prev, bandwidth: hasGoodBandwidth }));
      return hasGoodBandwidth;
    } catch (error) {
      setSystemCheck(prev => ({ ...prev, bandwidth: false }));
      return false;
    }
  };

  // Camera Check
  const checkCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      console.log('Camera stream obtained:', stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('Video element ref:', videoRef.current);
        setVideoStream(stream);
      }
      
      setSystemCheck(prev => ({ ...prev, camera: true }));
      return true;
    } catch (error) {
      console.error('Camera error:', error);
      setSystemCheck(prev => ({ ...prev, camera: false }));
      return false;
    }
  };

  // Microphone Check
  const checkMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis for level monitoring
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      
      microphone.connect(analyser);
      analyser.fftSize = 256;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      // Start monitoring audio levels
      const monitorAudio = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
        setAudioLevel(Math.round((average / 255) * 100));
        
        if (audioCtx.state === 'running') {
          setTimeout(monitorAudio, 100);
        }
      };
      
      monitorAudio();
      
      setSystemCheck(prev => ({ ...prev, microphone: true }));
      
      // Clean up the test stream after 5 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        audioCtx.close();
      }, 5000);
      
      return true;
    } catch (error) {
      console.error('Microphone error:', error);
      setSystemCheck(prev => ({ ...prev, microphone: false }));
      return false;
    }
  };

  // Run all checks sequentially
  const runSystemCheck = async () => {
    setIsChecking(true);
    setCheckProgress(0);
    
    const checks = [
      checkBrowser,
      checkInternet,
      checkBandwidth,
      checkCamera,
      checkMicrophone
    ];

    for (let i = 0; i < checks.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800)); // Delay for UX
      await checks[i]();
      setCheckProgress(((i + 1) / checks.length) * 100);
    }
    
    setIsChecking(false);
    setCurrentStep(0);
  };

  // Clean up streams on unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  // Play video when videoStream is set
  useEffect(() => {
    if (videoRef.current && videoStream) {
      const videoElement = videoRef.current;

      // Add event listeners for debugging
      const onPlay = () => console.log('Video element play event fired');
      const onPlaying = () => console.log('Video element playing event fired');
      const onError = (e) => console.error('Video element error event:', e);

      videoElement.addEventListener('play', onPlay);
      videoElement.addEventListener('playing', onPlaying);
      videoElement.addEventListener('error', onError);

      const playVideo = async () => {
        try {
          await videoElement.play();
          console.log('Video playback started');
        } catch (error) {
          console.error('Error playing video:', error);
        }
      };
      playVideo();

      // Cleanup event listeners on unmount or videoStream change
      return () => {
        videoElement.removeEventListener('play', onPlay);
        videoElement.removeEventListener('playing', onPlaying);
        videoElement.removeEventListener('error', onError);
      };
    }
  }, [videoStream]);

  const getStatusIcon = (status) => {
    if (status === true) return <CheckCircle className="text-green-600" size={24} />;
    if (status === false) return <XCircle className="text-red-600" size={24} />;
    return <Clock className="text-gray-400" size={24} />;
  };

  const getStatusColor = (status) => {
    if (status === true) return 'border-green-600 bg-gray-800';
    if (status === false) return 'border-red-600 bg-gray-800';
    return 'border-gray-600 bg-gray-800';
  };

  const allChecksPassed = Object.values(systemCheck).every(check => check === true);
  const anyChecksFailed = Object.values(systemCheck).some(check => check === false);
  const hasRunChecks = Object.values(systemCheck).some(check => check !== null);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-primary w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Settings className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3 font-poppins">Pre-Interview System Check</h1>
        <p className="text-gray-300 text-lg">Let's make sure everything is working perfectly for your interview</p>
      </div>

      {/* Progress Bar */}
      {isChecking && (
        <div className="bg-gray-900 bg-opacity-80 rounded-lg border border-gray-600 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-white">
              Checking: {checkSteps[currentStep]?.name}
            </span>
            <span className="text-lg text-gray-300">{Math.round(checkProgress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${checkProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Please wait while we test your system...</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* System Requirements Panel */}
        <div className="bg-gray-900 bg-opacity-80 rounded-lg border border-gray-600 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8 font-poppins">System Requirements</h2>

          <div className="space-y-6">
            {checkSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-between p-6 border-2 rounded-lg transition-all ${getStatusColor(systemCheck[step.id])} ${
                  isChecking && currentStep === index ? 'ring-4 ring-primary scale-105' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    systemCheck[step.id] === true ? 'bg-green-900' :
                    systemCheck[step.id] === false ? 'bg-red-900' : 'bg-gray-700'
                  }`}>
                    <step.icon
                      size={24}
                      className={
                        systemCheck[step.id] === true ? 'text-green-400' :
                        systemCheck[step.id] === false ? 'text-red-400' : 'text-gray-400'
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{step.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {step.id === 'browser' && 'Chrome, Firefox, Safari, Edge supported'}
                      {step.id === 'internet' && 'Stable internet connection required'}
                      {step.id === 'bandwidth' && 'Minimum 2 Mbps for smooth video calls'}
                      {step.id === 'camera' && 'HD camera access for video interview'}
                      {step.id === 'microphone' && 'Clear audio input for responses'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {isChecking && currentStep === index && (
                    <RefreshCw className="animate-spin text-primary" size={24} />
                  )}
                  {getStatusIcon(systemCheck[step.id])}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-8">
          {/* Video Preview */}
          <div className="bg-gray-900 bg-opacity-80 rounded-lg border border-gray-600 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 font-poppins">Camera Preview</h3>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              {systemCheck.camera === true ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <VideoOff className="text-gray-500 mx-auto mb-4" size={48} />
                    <p className="text-gray-400 text-lg">
                      {systemCheck.camera === false ? 'Camera access denied' : 'Camera not tested yet'}
                    </p>
                    {systemCheck.camera === false && (
                      <p className="text-gray-500 text-sm mt-2">
                        Please allow camera access and try again
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Camera Status Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      systemCheck.camera === true ? 'bg-green-400' : 'bg-red-400'
                    } animate-pulse`} />
                    <span className="text-white font-medium">
                      {systemCheck.camera === true ? 'Camera Active' : 'Camera Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Test Panel */}
          <div className="bg-gray-900 bg-opacity-80 rounded-lg border border-gray-600 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 font-poppins">Microphone Test</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mic className={`${
                  systemCheck.microphone === true ? 'text-green-400' : 'text-gray-400'
                }`} size={24} />
                <span className="text-gray-300 font-medium">Speak to test your microphone</span>
              </div>

              {/* Audio Level Visualizer */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Audio Level</span>
                  <span className="font-medium">{audioLevel}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-150 ${
                      audioLevel > 70 ? 'bg-red-500' :
                      audioLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(audioLevel, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  {audioLevel > 70 ? 'Too loud - adjust your microphone' :
                   audioLevel > 30 ? 'Good audio level detected' :
                   audioLevel > 5 ? 'Speak a bit louder' : 'No audio detected - please speak'}
                </p>
              </div>

              {/* Audio Status */}
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Microphone Status</span>
                  <div className="flex items-center space-x-2">
                    {systemCheck.microphone === true ? (
                      <>
                        <CheckCircle className="text-green-400" size={18} />
                        <span className="text-green-400 font-medium">Working</span>
                      </>
                    ) : systemCheck.microphone === false ? (
                      <>
                        <XCircle className="text-red-400" size={18} />
                        <span className="text-red-400 font-medium">Access Denied</span>
                      </>
                    ) : (
                      <>
                        <Clock className="text-gray-400" size={18} />
                        <span className="text-gray-400 font-medium">Not Tested</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results & Actions */}
      <div className="bg-gray-900 bg-opacity-80 rounded-2xl border border-gray-600 p-8 shadow-2xl">
        {!hasRunChecks && (
          <div className="text-center">
            <button 
              onClick={runSystemCheck}
              disabled={isChecking}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xl flex items-center mx-auto transition-all hover:scale-105"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="animate-spin mr-3" size={24} />
                  Running System Check...
                </>
              ) : (
                <>
                  <Settings className="mr-3" size={24} />
                  Start System Check
                </>
              )}
            </button>
            <p className="text-gray-300 mt-4 text-lg">This will test all required components for your interview</p>
          </div>
        )}

        {hasRunChecks && allChecksPassed && (
          <div className="text-center">
            <div className="bg-green-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-600">
              <CheckCircle className="text-green-400" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-green-400 mb-4">System Ready! 🎉</h3>
            <p className="text-green-300 text-xl mb-8">All components are working perfectly. You're ready for your interview.</p>
            
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => navigate('/candidate/dashboard')}
                className="px-8 py-4 border-2 border-gray-600 rounded-2xl hover:bg-gray-800 text-white font-semibold text-lg transition-all"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate('/candidate/interview')}
                className="bg-green-600 text-white px-12 py-4 rounded-2xl hover:bg-green-700 font-semibold text-lg flex items-center transition-all hover:scale-105"
              >
                Continue to Interview
                <ArrowRight className="ml-3" size={20} />
              </button>
            </div>
          </div>
        )}

        {hasRunChecks && anyChecksFailed && (
          <div className="text-center">
            <div className="bg-red-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-600">
              <AlertCircle className="text-red-400" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-red-400 mb-4">Issues Detected</h3>
            <p className="text-red-300 text-xl mb-8">Some components need attention before you can start your interview.</p>
            
            <div className="bg-red-900 border border-red-600 rounded-2xl p-6 mb-8">
              <h4 className="font-semibold text-red-400 mb-4 text-lg">Troubleshooting Tips:</h4>
              <ul className="text-left text-red-300 space-y-2">
                {systemCheck.camera === false && (
                  <li>• Allow camera access in your browser settings and refresh the page</li>
                )}
                {systemCheck.microphone === false && (
                  <li>• Enable microphone permissions for this website</li>
                )}
                {systemCheck.internet === false && (
                  <li>• Check your internet connection and try again</li>
                )}
                {systemCheck.bandwidth === false && (
                  <li>• Close other applications using internet to improve connection speed</li>
                )}
                {systemCheck.browser === false && (
                  <li>• Use a supported browser (Chrome, Firefox, Safari, Edge) with the latest version</li>
                )}
              </ul>
            </div>
            
            <div className="flex justify-center space-x-6">
              <button 
                onClick={runSystemCheck}
                disabled={isChecking}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50 flex items-center font-semibold text-lg transition-all"
              >
                <RotateCcw className="mr-3" size={20} />
                Try Again
              </button>
              <button
                onClick={() => navigate('/candidate/dashboard')}
                className="px-8 py-4 border-2 border-gray-600 rounded-2xl hover:bg-gray-800 text-white font-semibold text-lg transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Info className="text-blue-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h4 className="font-semibold text-white mb-3 text-lg">Need Help?</h4>
            <p className="text-gray-300 mb-4">
              If you're experiencing issues, make sure:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside mb-6">
              <li>Your browser is up to date (Chrome, Firefox, Safari, or Edge)</li>
              <li>No other applications are using your camera or microphone</li>
              <li>You have a stable internet connection (minimum 2 Mbps recommended)</li>
              <li>Pop-up blockers and ad blockers are disabled for this site</li>
              <li>Your camera and microphone are properly connected</li>
            </ul>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-medium transition-all">
                Contact Technical Support
              </button>
              <button className="text-blue-400 hover:text-blue-300 font-medium">
                View Troubleshooting Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCheckPage;