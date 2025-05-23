import React from 'react';
import { X, Sun, Coffee, Moon } from 'lucide-react';
import { useSettingsContext } from '../../context/SettingsContext';

const SettingsModal = ({ onClose }) => {
  const { theme, timer, updateTheme, updateTimerSettings } = useSettingsContext();
  
  // Handle theme change
  const handleThemeChange = (newTheme) => {
    updateTheme(newTheme);
  };
  
  // Handle work duration change
  const handleWorkDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateTimerSettings({ workDuration: value });
    }
  };
  
  // Handle break duration change
  const handleBreakDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateTimerSettings({ breakDuration: value });
    }
  };
  
  // Handle auto start break toggle
  const handleAutoStartBreakChange = (e) => {
    updateTimerSettings({ autoStartBreak: e.target.checked });
  };
  
  // Get theme-specific styles
  const getModalHeaderColors = () => {
    switch (theme) {
      case 'tomato': return 'bg-red-500 text-white';
      case 'mint': return 'bg-green-500 text-white';
      case 'midnight': return 'bg-gray-800 text-white';
      default: return 'bg-red-500 text-white';
    }
  };
  
  // Update getThemeButtonClasses to set unselected theme text to black (except in dark mode)
  const getThemeButtonClasses = (buttonTheme) => {
    const baseClasses = "flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer";
    const isActive = theme === buttonTheme;
    // If not active, set text-black (except in dark mode)
    const unselectedText = isActive ? '' : 'text-black dark:text-inherit';
    switch (buttonTheme) {
      case 'tomato':
        return `${baseClasses} ${isActive 
          ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
          : `border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-800 ${unselectedText}`}`;
      case 'mint':
        return `${baseClasses} ${isActive 
          ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
          : `border-gray-200 hover:border-green-200 dark:border-gray-700 dark:hover:border-green-800 ${unselectedText}`}`;
      case 'midnight':
        return `${baseClasses} ${isActive 
          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
          : `border-gray-200 hover:border-blue-200 dark:border-gray-700 dark:hover:border-blue-800 ${unselectedText}`}`;
      default:
        return `${baseClasses} ${isActive 
          ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
          : `border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-800 ${unselectedText}`}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto backdrop-blur-xl border border-gray-200 dark:border-gray-800 transition-all duration-300">
        {/* Header */}
        <div className={`px-6 py-4 flex justify-between items-center ${getModalHeaderColors()} rounded-t-2xl transition-colors duration-300`}>
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Theme Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              <label className={getThemeButtonClasses('tomato')}>
                <Sun className="w-8 h-8 mb-2 text-red-500" />
                <span>Tomato</span>
                <input
                  type="radio"
                  name="theme"
                  value="tomato"
                  checked={theme === 'tomato'}
                  onChange={() => handleThemeChange('tomato')}
                  className="sr-only"
                />
              </label>
              
              <label className={getThemeButtonClasses('mint')}>
                <Coffee className="w-8 h-8 mb-2 text-green-500" />
                <span>Mint</span>
                <input
                  type="radio"
                  name="theme"
                  value="mint"
                  checked={theme === 'mint'}
                  onChange={() => handleThemeChange('mint')}
                  className="sr-only"
                />
              </label>
              
              <label className={getThemeButtonClasses('midnight')}>
                <Moon className="w-8 h-8 mb-2 text-blue-500" />
                <span>Midnight</span>
                <input
                  type="radio"
                  name="theme"
                  value="midnight"
                  checked={theme === 'midnight'}
                  onChange={() => handleThemeChange('midnight')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          
          {/* Timer Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Timer</h3>
            
            <div className="space-y-4">
              {/* Work Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={timer.workDuration}
                  onChange={handleWorkDurationChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black pl-3"
                />
              </div>
              
              {/* Break Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={timer.breakDuration}
                  onChange={handleBreakDurationChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black pl-3"
                />
              </div>
              
              {/* Auto Start Break */}
              <div className="flex items-center">
                <input
                  id="auto-start-break"
                  type="checkbox"
                  checked={timer.autoStartBreak}
                  onChange={handleAutoStartBreakChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="auto-start-break" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Automatically start break after work session
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-900/80 rounded-b-2xl border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors duration-200
              ${theme === 'tomato' ? 'bg-red-500 hover:bg-red-600' : 
                theme === 'mint' ? 'bg-green-500 hover:bg-green-600' : 
                'bg-blue-500 hover:bg-blue-600'}`}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;