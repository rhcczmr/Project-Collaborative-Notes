import React from 'react';

export function Alert({ className = '', variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div
      role="alert"
      className={`p-4 rounded-md ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ className = '', children, ...props }) {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  );
}