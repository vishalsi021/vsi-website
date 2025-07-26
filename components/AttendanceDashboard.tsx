import React from 'react';
import { type AttendanceData } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { OverallProgress } from './OverallProgress';
import { SubjectCard } from './SubjectCard';
import { DetailedLogTable } from './DetailedLogTable';
import { User, ArrowLeft, Clock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface AttendanceDashboardProps {
  data: AttendanceData;
  onBack: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};


export const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({ data, onBack }) => {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <motion.header variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <div className="flex items-center gap-3">
             <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-700">
                <User className="h-6 w-6 text-cyan-400" />
              </div>
            <div>
              <h2 className="text-3xl font-bold text-white truncate">{data.name}</h2>
              <p className="text-slate-400 font-mono">{data.userId}</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    Last updated: {data.fromCache ? 'moments ago (cached)' : 'just now'}
                  </span>
              </div>
            </div>
           </div>
        </div>
        <Button onClick={onBack} variant="secondary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Check Another ID
        </Button>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Overall Attendance</h3>
              <OverallProgress percentage={data.overall} />
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
           <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Subject-wise Summary</h3>
              <div className="space-y-4">
                {data.subjects.map((subject, index) => (
                  <SubjectCard key={index} subject={subject} />
                ))}
              </div>
            </div>
           </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Detailed Session Log</h3>                       
            <DetailedLogTable logs={data.detailedLog} />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AttendanceDashboard;