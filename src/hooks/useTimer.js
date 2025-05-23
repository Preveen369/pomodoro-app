import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (
  workDuration, 
  breakDuration, 
  autoStartBreak,
  onWorkComplete,
  onBreakComplete
) => {
  const [timerState, setTimerState] = useState({
    mode: 'work',
    isRunning: false,
    timeRemaining: workDuration * 60,
    originalDuration: workDuration * 60,
    activeTaskId: null,
  });
  
  const timerRef = useRef(null);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Set up the timer
  useEffect(() => {
    if (timerState.isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimerState(prevState => {
          // If timer ends
          if (prevState.timeRemaining <= 1) {
            clearInterval(timerRef.current);
            
            // Play notification sound
            const audio = new Audio('/notification.mp3');
            audio.play().catch(err => console.log('Audio play failed:', err));
            
            if (prevState.mode === 'work') {
              onWorkComplete();
              
              // If autoStartBreak is true, start break timer
              if (autoStartBreak) {
                return {
                  ...prevState,
                  mode: 'break',
                  isRunning: true,
                  timeRemaining: breakDuration * 60,
                  originalDuration: breakDuration * 60,
                };
              } else {
                return {
                  ...prevState,
                  mode: 'break',
                  isRunning: false,
                  timeRemaining: breakDuration * 60,
                  originalDuration: breakDuration * 60,
                };
              }
            } else {
              onBreakComplete();
              return {
                ...prevState,
                mode: 'work',
                isRunning: false,
                timeRemaining: workDuration * 60,
                originalDuration: workDuration * 60,
              };
            }
          }
          
          // Normal countdown
          return {
            ...prevState,
            timeRemaining: prevState.timeRemaining - 1,
          };
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerState.isRunning, workDuration, breakDuration, autoStartBreak, onWorkComplete, onBreakComplete]);
  
  const startTimer = useCallback((taskId) => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      activeTaskId: taskId,
    }));
  }, []);
  
  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
    }));
  }, []);
  
  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      timeRemaining: prev.mode === 'work' ? workDuration * 60 : breakDuration * 60,
      originalDuration: prev.mode === 'work' ? workDuration * 60 : breakDuration * 60,
    }));
  }, [workDuration, breakDuration]);
  
  const adjustTime = useCallback((minutes) => {
    setTimerState(prev => {
      // Only allow adjustments when timer is not running
      if (!prev.isRunning) {
        const newTimeInSeconds = Math.max(60, prev.timeRemaining + minutes * 60);
        return {
          ...prev,
          timeRemaining: newTimeInSeconds,
          originalDuration: newTimeInSeconds,
        };
      }
      return prev;
    });
  }, []);
  
  return {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    adjustTime,
  };
};