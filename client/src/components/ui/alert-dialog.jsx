import React from 'react';

export function AlertDialog({ open, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
}

export function AlertDialogContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AlertDialogHeader({ children, className = '', ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function AlertDialogFooter({ children, className = '', ...props }) {
  return (
    <div className={`flex justify-end space-x-4 mt-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AlertDialogAction({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}