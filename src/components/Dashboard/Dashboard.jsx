import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useTimerContext } from '../../context/TimerContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { Check, Clock, Flame } from 'lucide-react';

const Dashboard = () => {
  const { todayTasksCount, completedTasksCount, tasks, completedTasks } = useTaskContext();
  const { pomodoroStats } = useTimerContext();
  const { theme } = useSettingsContext();
  
  // Calculate completion percentage
  const completionPercentage = todayTasksCount > 0 
    ? Math.round((completedTasksCount / todayTasksCount) * 100) 
    : 0;
  
  // Get total pomodoros
  const totalPomodoros = [...tasks, ...completedTasks].reduce(
    (total, task) => total + task.pomodorosCompleted, 
    0
  );
  
  // Theme-specific styles
  const getBarColor = () => {
    switch (theme) {
      case 'tomato': return 'bg-red-500';
      case 'mint': return 'bg-green-500';
      case 'midnight': return 'bg-blue-500';
      default: return 'bg-red-500';
    }
  };
  
  const getCardBgColor = () => {
    switch (theme) {
      case 'tomato': return 'bg-red-50 border-red-200';
      case 'mint': return 'bg-green-50 border-green-200';
      case 'midnight': return 'bg-gray-800 border-gray-700 text-white';
      default: return 'bg-red-50 border-red-200';
    }
  };
  
  const getIconColor = () => {
    switch (theme) {
      case 'tomato': return 'text-red-500';
      case 'mint': return 'text-green-500';
      case 'midnight': return 'text-blue-400';
      default: return 'text-red-500';
    }
  };

  return (
    <div className="mb-6 max-w-3xl mx-auto px-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 animate-fade-in">Today's Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tasks Card */}
        <div className={`rounded-2xl border p-5 shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md hover:scale-[1.025] hover:shadow-2xl transition-all duration-300 ${getCardBgColor()}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Tasks</h3>
            <Check className={`w-5 h-5 ${getIconColor()}`} />
          </div>
          <div className="text-2xl font-bold mb-1">
            {completedTasksCount} <span className="text-base font-normal opacity-70">/ {todayTasksCount}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className={`h-2.5 rounded-full ${getBarColor()} transition-all duration-500 ease-out`} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="text-sm opacity-70">{completionPercentage}% complete</div>
        </div>
        
        {/* Pomodoros Card */}
        <div className={`rounded-2xl border p-5 shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md hover:scale-[1.025] hover:shadow-2xl transition-all duration-300 ${getCardBgColor()}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Pomodoros</h3>
            <Clock className={`w-5 h-5 ${getIconColor()}`} />
          </div>
          <div className="text-2xl font-bold mb-1">
            {pomodoroStats.today} <span className="text-base font-normal opacity-70">today</span>
          </div>
          <div className="text-sm mb-2 opacity-70">
            {totalPomodoros} total pomodoros
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${getBarColor()} transition-all duration-500 ease-out`} 
              style={{ width: `${Math.min(100, (pomodoroStats.today / 8) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Streak Card */}
        <div className={`rounded-2xl border p-5 shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md hover:scale-[1.025] hover:shadow-2xl transition-all duration-300 ${getCardBgColor()}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Streak</h3>
            <Flame className={`w-5 h-5 ${getIconColor()}`} />
          </div>
          <div className="text-2xl font-bold mb-1">
            {pomodoroStats.streak} <span className="text-base font-normal opacity-70">days</span>
          </div>
          <div className="flex space-x-1 mt-2">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className={`h-2 flex-1 rounded-full ${i < pomodoroStats.streak % 7 ? getBarColor() : 'bg-gray-200 dark:bg-gray-700'} transition-colors duration-300`}
              ></div>
            ))}
          </div>
          <div className="text-sm mt-2 opacity-70">Keep it going!</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;