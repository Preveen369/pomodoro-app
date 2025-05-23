import React, { useState } from 'react';
import { Settings, Coffee, Moon, Sun, Flame } from 'lucide-react';
import { useSettingsContext } from '../../context/SettingsContext';
import { useTaskContext } from '../../context/TaskContext';
import { useTimerContext } from '../../context/TimerContext';
import SettingsModal from '../Settings/SettingsModal';

const Header = () => {
  const { theme } = useSettingsContext();
  const { todayTasksCount, completedTasksCount } = useTaskContext();
  const { pomodoroStats } = useTimerContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Calculate theme-specific styles
  const getThemeIcon = () => {
    switch (theme) {
      case 'tomato':
        return <Sun className="w-5 h-5" />;
      case 'mint':
        return <Coffee className="w-5 h-5" />;
      case 'midnight':
        return <Moon className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'tomato':
        return 'bg-gradient-to-r from-red-600 to-orange-500 text-white';
      case 'mint':
        return 'bg-gradient-to-r from-green-500 to-teal-400 text-white';
      case 'midnight':
        return 'bg-gradient-to-r from-gray-800 to-gray-900 text-white';
      default:
        return 'bg-gradient-to-r from-red-600 to-orange-500 text-white';
    }
  };

  return (
    <header className={`py-4 px-4 md:px-6 shadow-md ${getThemeColors()} transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-6 h-6 text-white" />
            <h1 className="text-xl md:text-2xl font-bold">PomodoroTodo</h1>
          </div>

          <div className="flex space-x-4 items-center">
            <div className="hidden md:flex space-x-6">
              <div className="flex items-center text-white/90">
                <span className="font-semibold mr-1">{completedTasksCount}</span>
                <span className="text-sm">/ {todayTasksCount} tasks</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <span className="font-semibold mr-1">{pomodoroStats.today}</span>
                <span className="text-sm">pomodoros</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <span className="font-semibold mr-1">{pomodoroStats.streak}</span>
                <span className="text-sm">day streak</span>
              </div>
            </div>

            <button
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>

            <div className="bg-white/20 p-2 rounded-full">
              {getThemeIcon()}
            </div>
          </div>
        </div>
        
        {/* Mobile stats row */}
        <div className="flex justify-between mt-3 md:hidden">
          <div className="flex items-center text-white/90 text-sm">
            <span className="font-semibold mr-1">{completedTasksCount}/{todayTasksCount}</span>
            <span>tasks</span>
          </div>
          
          <div className="flex items-center text-white/90 text-sm">
            <span className="font-semibold mr-1">{pomodoroStats.today}</span>
            <span>pomodoros</span>
          </div>
          
          <div className="flex items-center text-white/90 text-sm">
            <span className="font-semibold mr-1">{pomodoroStats.streak}</span>
            <span>streak</span>
          </div>
        </div>
      </div>
      
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </header>
  );
};

export default Header;