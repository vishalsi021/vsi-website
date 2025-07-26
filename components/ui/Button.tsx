import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ className, children, variant = 'primary', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
    secondary: 'text-slate-300 bg-slate-700 hover:bg-slate-600 focus:ring-slate-500',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};