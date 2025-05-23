import { useState, useRef } from 'react';

export const useDragAndDrop = (
  initialTasks,
  onReorder
) => {
  const [tasks, setTasks] = useState(initialTasks);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Update local tasks when initialTasks changes
  if (JSON.stringify(tasks) !== JSON.stringify(initialTasks)) {
    setTasks(initialTasks);
  }

  const handleDragStart = (position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (position) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const _tasks = [...tasks];
      const draggedItemContent = _tasks[dragItem.current];
      
      // Remove dragged item
      _tasks.splice(dragItem.current, 1);
      
      // Add it at the new position
      _tasks.splice(dragOverItem.current, 0, draggedItemContent);
      
      // Reset refs
      dragItem.current = null;
      dragOverItem.current = null;
      
      // Update state and call onReorder
      setTasks(_tasks);
      onReorder(_tasks);
    }
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDragEnd
  };
};