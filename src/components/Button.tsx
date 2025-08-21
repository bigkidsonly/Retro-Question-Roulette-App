import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}
export function Button({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg focus:ring-indigo-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-indigo-300 text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-500'
  };
  return <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>;
}