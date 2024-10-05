import React from 'react';
import { format } from 'date-fns';

export function Calendar({ selected, onSelect }) {
  // This is a simplified calendar. In a real application, you'd want to use a more robust calendar component.
  return (
    <div className="p-2 bg-white border rounded-md shadow-lg">
      <input
        type="date"
        value={selected ? format(selected, 'yyyy-MM-dd') : ''}
        onChange={(e) => onSelect(new Date(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}