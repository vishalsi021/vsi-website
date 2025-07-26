import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps {
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ message, className }) => {
  return (
    <div className={cn('flex items-center p-4 text-sm text-red-300 bg-red-500/20 rounded-lg border border-red-500/30', className)} role="alert">
      <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
      <span className="font-medium">{message}</span>
    </div>
  );
};