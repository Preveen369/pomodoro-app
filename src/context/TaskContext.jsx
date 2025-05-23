import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getTodayDateString } from '../utils/timeUtils';

const TaskContext = React.createContext(undefined);

export const TaskProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useLocalStorage('pomodoro-tasks', []);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Split tasks into active and completed
  useEffect(() => {
    setTasks(allTasks.filter(task => !task.completed));
    setCompletedTasks(allTasks.filter(task => task.completed));
  }, [allTasks]);

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Add a new task
  const addTask = (title) => {
    const newTask = {
      id: generateId(),
      title,
      completed: false,
      createdAt: Date.now(),
      pomodorosCompleted: 0
    };
    
    setAllTasks([newTask, ...allTasks]);
  };

  // Update a task
  const updateTask = (id, updates) => {
    setAllTasks(
      allTasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setAllTasks(allTasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setAllTasks(
      allTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? Date.now() : undefined
            } 
          : task
      )
    );
  };

  // Reorder tasks
  const reorderTasks = (reorderedTasks) => {
    // Create a new array with all tasks, replacing only the non-completed ones
    const newAllTasks = [
      ...reorderedTasks,
      ...allTasks.filter(task => task.completed)
    ];
    
    setAllTasks(newAllTasks);
  };

  // Increment pomodoro count for a task
  const incrementPomodoroCount = (id) => {
    setAllTasks(
      allTasks.map(task => 
        task.id === id 
          ? { ...task, pomodorosCompleted: task.pomodorosCompleted + 1 } 
          : task
      )
    );
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    setAllTasks(allTasks.filter(task => !task.completed));
  };

  // Restore tasks (used for undo)

  // Count tasks for today
  const todayTasksCount = allTasks.filter(task => {
    const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
    return taskDate === getTodayDateString();
  }).length;

  // Count completed tasks for today
  const completedTasksCount = allTasks.filter(task => {
    if (!task.completed || !task.completedAt) return false;
    const taskDate = new Date(task.completedAt).toISOString().split('T')[0];
    return taskDate === getTodayDateString();
  }).length;

  const value = {
    tasks,
    completedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    reorderTasks,
    incrementPomodoroCount,
    clearCompletedTasks,
    todayTasksCount,
    completedTasksCount
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};