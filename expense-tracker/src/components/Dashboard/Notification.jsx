import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      case 'warning': return 'fa-exclamation-triangle';
      default: return 'fa-info-circle';
    }
  };

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <i className={`fas ${getIcon()}`}></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;