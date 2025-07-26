import React from 'react';
import { type SubjectAttendance } from '../types';
import { motion } from 'framer-motion';

interface SubjectCardProps {
  subject: SubjectAttendance;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const percentage = subject.percentage;
  let progressBarColor = 'bg-emerald-500';
  if (percentage < 75) progressBarColor = 'bg-amber-500';
  if (percentage < 65) progressBarColor = 'bg-red-500';

  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1 mb-2 sm:mb-0">
          <p className="font-bold text-white">{subject.name}</p>
          <p className="text-sm text-slate-400 font-mono">{subject.code}</p>
        </div>
        <div className="flex items-center gap-4">
            <p className="text-slate-300 font-mono text-sm whitespace-nowrap">
                {subject.present} / {subject.total} sessions
            </p>
            <p className={`font-bold text-lg ${percentage < 75 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {subject.percentage.toFixed(2)}%
            </p>
        </div>
      </div>
      <div className="mt-3 bg-slate-700 rounded-full h-2.5 w-full overflow-hidden">
        <motion.div
          className={`${progressBarColor} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};