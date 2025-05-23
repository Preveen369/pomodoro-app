import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown, Trash2 } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useSettingsContext } from '../../context/SettingsContext';
import TaskItem from './TaskItem';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

const TaskList = () => {
  const { 
    tasks, 
    completedTasks, 
    addTask, 
    reorderTasks,
    clearCompletedTasks 
  } = useTaskContext();
  const { theme } = useSettingsContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const inputRef = useRef(null);
  
  const { handleDragStart, handleDragEnter, handleDragEnd } = useDragAndDrop(
    tasks,
    reorderTasks
  );
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };
  
  // Theme-specific styles
  const getInputBorderColor = () => {
    switch (theme) {
      case 'tomato': return 'focus:border-red-500 focus:ring-red-500';
      case 'mint': return 'focus:border-green-500 focus:ring-green-500';
      case 'midnight': return 'focus:border-blue-500 focus:ring-blue-500';
      default: return 'focus:border-red-500 focus:ring-red-500';
    }
  };
  
  const getButtonColor = () => {
    switch (theme) {
      case 'tomato': return 'bg-red-500 hover:bg-red-600 focus:ring-red-300';
      case 'mint': return 'bg-green-500 hover:bg-green-600 focus:ring-green-300';
      case 'midnight': return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300';
      default: return 'bg-red-500 hover:bg-red-600 focus:ring-red-300';
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6 animate-fade-in">
        <div className="flex shadow-lg rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
          <input
            ref={inputRef}
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a task..."
            className={`flex-grow block w-full border-none rounded-l-xl px-4 py-3 focus:ring-2 ${getInputBorderColor()} transition-colors duration-200 dark:bg-gray-800 dark:text-white text-lg placeholder-gray-400`}
          />
          <button
            type="submit"
            className={`px-5 py-3 rounded-r-xl ${getButtonColor()} text-white flex items-center justify-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </form>
      
      {/* Active Tasks */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 animate-fade-in">
          Tasks ({tasks.length})
        </h2>
        
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fade-in">
            <p>No active tasks. Add one above!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li 
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className="cursor-grab active:cursor-grabbing animate-fade-in"
              >
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronDown className={`w-5 h-5 mr-1 transition-transform ${showCompleted ? 'rotate-180' : ''}`} />
              <h2 className="text-lg font-semibold">
                Completed ({completedTasks.length})
              </h2>
            </button>
            
            <button
              onClick={clearCompletedTasks}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear all
            </button>
          </div>
          
          {showCompleted && (
            <ul className="space-y-3 mt-2">
              {completedTasks.map((task) => (
                <li key={task.id} className="animate-fade-in">
                  <TaskItem task={task} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;