import React, { useState } from 'react';

export function Popover({ children, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
}

export function PopoverTrigger({ children }) {
  return children;
}

export function PopoverContent({ children }) {
  return <div className="p-2">{children}</div>;
}