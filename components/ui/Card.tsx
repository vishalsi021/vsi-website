import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50', className)}>
      {children}
    </div>
  );
};