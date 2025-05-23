/**
 * Formats seconds into a MM:SS display
 * @param seconds - Number of seconds to format
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

/**
 * Gets the percentage of time elapsed in a timer
 * @param timeRemaining - Remaining time in seconds
 * @param originalDuration - Original duration in seconds
 * @returns Percentage of time elapsed (0-100)
 */
export const getTimePercentage = (timeRemaining, originalDuration) => {
  return 100 - Math.round((timeRemaining / originalDuration) * 100);
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns Today's date string
 */
export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Check if a date is today
 * @param timestamp - Timestamp to check
 * @returns Boolean indicating if the timestamp is from today
 */
export const isToday = (timestamp) => {
  const today = new Date();
  const date = new Date(timestamp);
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};