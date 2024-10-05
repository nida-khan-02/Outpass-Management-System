import React, { useState } from 'react';

export function Sheet({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </>
  );
}

export function SheetTrigger({ children, setIsOpen }) {
  return React.cloneElement(children, {
    onClick: () => setIsOpen(true)
  });
}

export function SheetContent({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 right-0 w-64 bg-white p-6">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function SheetTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function SheetDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}