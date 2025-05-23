import React, { useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { useTimerContext } from '../../context/TimerContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { formatTime, getTimePercentage } from '../../utils/timeUtils';

const PomodoroTimer = () => {
  const { 
    isTimerModalOpen,
    closeTimerModal,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    adjustTime
  } = useTimerContext();
  
  const { theme } = useSettingsContext();
  
  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isTimerModalOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        timerState.isRunning ? pauseTimer() : startTimer(timerState.activeTaskId);
      } else if (e.code === 'KeyR') {
        resetTimer();
      } else if (e.code === 'Escape') {
        closeTimerModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTimerModalOpen, timerState.isRunning, timerState.activeTaskId, startTimer, pauseTimer, resetTimer, closeTimerModal]);
  
  if (!isTimerModalOpen) return null;
  
  // Calculate theme and mode specific colors
  const getThemeColors = () => {
    const mode = timerState.mode;
    
    // Work mode colors
    if (mode === 'work') {
      switch (theme) {
        case 'tomato':
          return {
            background: 'bg-red-500',
            accent: 'bg-red-600',
            text: 'text-white',
            button: 'bg-white text-red-600 hover:bg-red-100',
            progress: 'stroke-white',
            track: 'stroke-red-400'
          };
        case 'mint':
          return {
            background: 'bg-green-500',
            accent: 'bg-green-600',
            text: 'text-white',
            button: 'bg-white text-green-600 hover:bg-green-100',
            progress: 'stroke-white',
            track: 'stroke-green-400'
          };
        case 'midnight':
          return {
            background: 'bg-blue-600',
            accent: 'bg-blue-700',
            text: 'text-white',
            button: 'bg-white text-blue-600 hover:bg-blue-100',
            progress: 'stroke-white',
            track: 'stroke-blue-500'
          };
        default:
          return {
            background: 'bg-red-500',
            accent: 'bg-red-600',
            text: 'text-white',
            button: 'bg-white text-red-600 hover:bg-red-100',
            progress: 'stroke-white',
            track: 'stroke-red-400'
          };
      }
    }
    
    // Break mode colors
    switch (theme) {
      case 'tomato':
        return {
          background: 'bg-teal-500',
          accent: 'bg-teal-600',
          text: 'text-white',
          button: 'bg-white text-teal-600 hover:bg-teal-100',
          progress: 'stroke-white',
          track: 'stroke-teal-400'
        };
      case 'mint':
        return {
          background: 'bg-blue-500',
          accent: 'bg-blue-600',
          text: 'text-white',
          button: 'bg-white text-blue-600 hover:bg-blue-100',
          progress: 'stroke-white',
          track: 'stroke-blue-400'
        };
      case 'midnight':
        return {
          background: 'bg-purple-600',
          accent: 'bg-purple-700',
          text: 'text-white',
          button: 'bg-white text-purple-600 hover:bg-purple-100',
          progress: 'stroke-white',
          track: 'stroke-purple-500'
        };
      default:
        return {
          background: 'bg-teal-500',
          accent: 'bg-teal-600',
          text: 'text-white',
          button: 'bg-white text-teal-600 hover:bg-teal-100',
          progress: 'stroke-white',
          track: 'stroke-teal-400'
        };
    }
  };
  
  const colors = getThemeColors();
  const timePercentage = getTimePercentage(timerState.timeRemaining, timerState.originalDuration);
  
  // Calculate SVG parameters for the circular timer
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - timePercentage / 100);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`relative rounded-2xl shadow-xl max-w-md w-full ${colors.background} transition-colors duration-300`}>
        {/* Close button */}
        <button 
          onClick={closeTimerModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          aria-label="Close timer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="p-8 flex flex-col items-center">
          {/* Timer mode label */}
          <div className={`mb-4 font-semibold uppercase tracking-wider ${colors.text}`}>
            {timerState.mode === 'work' ? 'FOCUS TIME' : 'BREAK TIME'}
          </div>
          
          {/* Circle timer visualization */}
          <div className="relative mb-6">
            <svg width="280" height="280" viewBox="0 0 296 296">
              {/* Background track */}
              <circle
                cx="148"
                cy="148"
                r={radius}
                fill="none"
                strokeWidth="12"
                className={`${colors.track} opacity-30`}
              />
              
              {/* Progress circle */}
              <circle
                cx="148"
                cy="148"
                r={radius}
                fill="none"
                strokeWidth="12"
                className={`${colors.progress} transition-all duration-1000 ease-linear`}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 148 148)"
              />
            </svg>
            
            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-5xl font-bold ${colors.text}`}>
                {formatTime(timerState.timeRemaining)}
              </div>
              
              {/* Time adjustment buttons - only shown when paused */}
              {!timerState.isRunning && (
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    onClick={() => adjustTime(-1)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                    aria-label="Decrease time"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  
                  <button
                    onClick={() => adjustTime(1)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                    aria-label="Increase time"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="flex items-center space-x-4">
            {timerState.isRunning ? (
              <button
                onClick={pauseTimer}
                className={`p-4 rounded-full ${colors.button} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                aria-label="Pause timer"
              >
                <Pause className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => startTimer(timerState.activeTaskId)}
                className={`p-4 rounded-full ${colors.button} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                aria-label="Start timer"
              >
                <Play className="w-6 h-6" />
              </button>
            )}
            
            <button
              onClick={resetTimer}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          
          {/* Keyboard shortcuts help */}
          <div className="mt-6 text-sm text-white/70">
            <div className="flex justify-center space-x-4">
              <div className="flex items-center">
                <span className="px-2 py-1 bg-white/20 rounded mr-2 font-mono">Space</span>
                <span>Play/Pause</span>
              </div>
              
              <div className="flex items-center">
                <span className="px-2 py-1 bg-white/20 rounded mr-2 font-mono">R</span>
                <span>Reset</span>
              </div>
              
              <div className="flex items-center">
                <span className="px-2 py-1 bg-white/20 rounded mr-2 font-mono">Esc</span>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;