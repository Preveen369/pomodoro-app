/**
 * Request notification permission
 * @returns Promise that resolves with the permission state
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return 'denied';
  }
  
  if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    return await Notification.requestPermission();
  }
  
  return Notification.permission;
};

/**
 * Show a browser notification
 * @param title - Notification title
 * @param options - Notification options
 */
export const showNotification = (title, options = {}) => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }
  
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options);
      }
    });
  }
};