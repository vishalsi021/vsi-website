import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const baseClasses = "block w-full px-4 py-3 rounded-md bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:opacity-50";
  
  return (
    <input
      className={cn(baseClasses, className)}
      {...props}
    />
  );
};