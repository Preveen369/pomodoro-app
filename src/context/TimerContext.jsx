import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useSettingsContext } from './SettingsContext';
import { useTaskContext } from './TaskContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getTodayDateString } from '../utils/timeUtils';
import { showNotification } from '../utils/notificationUtils';

const TimerContext = React.createContext(undefined);

export const TimerProvider = ({ children }) => {
  const { timer: timerSettings } = useSettingsContext();
  const { incrementPomodoroCount } = useTaskContext();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [stats, setStats] = useLocalStorage('pomodoro-stats', {});
  const [pomodoroStats, setPomodoroStats] = useState({ today: 0, streak: 0 });
  
  // Handle work session completion
  const handleWorkComplete = () => {
    if (timerState.activeTaskId) {
      incrementPomodoroCount(timerState.activeTaskId);
      
      // Update today's pomodoro count
      const today = getTodayDateString();
      const todayCount = (stats[today] || 0) + 1;
      setStats({ ...stats, [today]: todayCount });
      
      showNotification('Work session complete!', {
        body: 'Time for a break.',
        icon: '/tomato-icon.png'
      });
    }
  };
  
  // Handle break completion
  const handleBreakComplete = () => {
    showNotification('Break complete!', {
      body: 'Ready for another pomodoro?',
      icon: '/tomato-icon.png'
    });
    
    // Close modal when break is complete
    setIsTimerModalOpen(false);
  };
  
  const {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    adjustTime
  } = useTimer(
    timerSettings.workDuration,
    timerSettings.breakDuration,
    timerSettings.autoStartBreak,
    handleWorkComplete,
    handleBreakComplete
  );
  
  // Open timer modal with a task
  const openTimerModal = (taskId) => {
    setIsTimerModalOpen(true);
    startTimer(taskId);
  };
  
  // Close timer modal
  const closeTimerModal = () => {
    setIsTimerModalOpen(false);
    pauseTimer();
  };
  
  // Calculate pomodoro stats
  useEffect(() => {
    const today = getTodayDateString();
    const todayCount = stats[today] || 0;
    
    // Calculate streak
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (stats[dateString] && stats[dateString] > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    setPomodoroStats({ today: todayCount, streak });
  }, [stats]);
  
  const value = {
    isTimerModalOpen,
    openTimerModal,
    closeTimerModal,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    adjustTime,
    pomodoroStats
  };
  
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};