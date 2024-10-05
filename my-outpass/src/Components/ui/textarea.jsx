import React from 'react';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className || ''}`}
      {...props}
    />
  );
}