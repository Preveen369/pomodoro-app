import React, { useState, useRef, useEffect } from 'react';
import { Check, Clock, Edit, Trash, MoreHorizontal } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useTimerContext } from '../../context/TimerContext';
import { useSettingsContext } from '../../context/SettingsContext';

const TaskItem = ({ task }) => {
  const { toggleTaskCompletion, updateTask, deleteTask } = useTaskContext();
  const { openTimerModal } = useTimerContext();
  const { theme } = useSettingsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [showOptions, setShowOptions] = useState(false);
  const editInputRef = useRef(null);
  const optionsRef = useRef(null);
  
  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleEditSubmit = () => {
    if (editedTitle.trim()) {
      updateTask(task.id, { title: editedTitle.trim() });
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };
  
  // Theme-specific styles
  const getThemeColors = () => {
    const baseClasses = "relative flex items-center p-3 rounded-lg transition-all duration-200 border ";
    
    if (task.completed) {
      return baseClasses + "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700";
    }
    
    switch (theme) {
      case 'tomato':
        return baseClasses + "bg-white border-gray-200 hover:border-red-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-red-700";
      case 'mint':
        return baseClasses + "bg-white border-gray-200 hover:border-green-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-green-700";
      case 'midnight':
        return baseClasses + "bg-white border-gray-200 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-700";
      default:
        return baseClasses + "bg-white border-gray-200 hover:border-red-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-red-700";
    }
  };
  
  const getCheckboxColors = () => {
    if (task.completed) {
      switch (theme) {
        case 'tomato': return "bg-red-500 border-red-500 text-white";
        case 'mint': return "bg-green-500 border-green-500 text-white";
        case 'midnight': return "bg-blue-500 border-blue-500 text-white";
        default: return "bg-red-500 border-red-500 text-white";
      }
    }
    
    return "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600";
  };
  
  const getTimerButtonColors = () => {
    switch (theme) {
      case 'tomato': return "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20";
      case 'mint': return "text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20";
      case 'midnight': return "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";
      default: return "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20";
    }
  };

  return (
    <div className={getThemeColors() + " shadow-lg hover:shadow-2xl hover:scale-[1.01] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl transition-all duration-300 animate-fade-in group"}>
      {/* Checkbox */}
      <button
        className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${getCheckboxColors()} group-hover:ring-2 group-hover:ring-accent`}
        onClick={() => toggleTaskCompletion(task.id)}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check className="w-3 h-3" />}
      </button>
      
      {/* Task Content */}
      <div className="ml-3 flex-grow">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="w-full border-gray-300 rounded p-1 focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        ) : (
          <span 
            className={`${
              task.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-800 dark:text-gray-200'
            }`}
          >
            {task.title}
          </span>
        )}
        
        {/* Pomodoro count for completed pomodoros */}
        {task.pomodorosCompleted > 0 && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-1">
            <Clock className="w-3 h-3 mr-1" />
            <span>{task.pomodorosCompleted} pomodoro{task.pomodorosCompleted !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      {/* Task Actions */}
      <div className="flex items-center space-x-1 ml-2">
        {!task.completed && (
          <button
            onClick={() => openTimerModal(task.id)}
            className={`p-2 rounded-full ${getTimerButtonColors()} transition-colors duration-200`}
            aria-label="Start timer"
          >
            <Clock className="w-5 h-5" />
          </button>
        )}
        
        <div className="relative" ref={optionsRef}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <ul className="py-1">
                {!task.completed && (
                  <li>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      deleteTask(task.id);
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;