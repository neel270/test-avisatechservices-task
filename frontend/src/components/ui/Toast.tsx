import React, { useEffect, useState } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300); // Allow animation to complete
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform';
    const typeStyles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
    };
    return `${baseStyles} ${typeStyles[toast.type]} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center justify-between">
        <span>{toast.message}</span>
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;