import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultSettings = {
  theme: 'tomato',
  timer: {
    workDuration: 25, // 25 minutes
    breakDuration: 5, // 5 minutes
    autoStartBreak: true,
  },
};

const SettingsContext = React.createContext(undefined);

export const SettingsProvider = ({ 
  children 
}) => {
  const [settings, setSettings] = useLocalStorage(
    'pomodoro-settings',
    defaultSettings
  );

  // Global theme toggle effect
  useEffect(() => {
    if (settings.theme === 'midnight') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateTheme = (theme) => {
    setSettings({ ...settings, theme });
  };

  const updateTimerSettings = (timerSettings) => {
    setSettings({
      ...settings,
      timer: { ...settings.timer, ...timerSettings },
    });
  };

  const value = {
    theme: settings.theme,
    timer: settings.timer,
    updateTheme,
    updateTimerSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};