import React from 'react';
import { type DetailedLogEntry } from '../types';
import { FileX2 } from 'lucide-react';

interface DetailedLogTableProps {
  logs: DetailedLogEntry[];
}

export const DetailedLogTable: React.FC<DetailedLogTableProps> = ({ logs }) => {
  const StatusBadge = ({ status }: { status: 'PRESENT' | 'ABSENT' }) => {
    const baseClasses = 'px-2 py-1 text-xs font-bold rounded-full inline-block';
    if (status === 'PRESENT') {
      return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>PRESENT</span>;
    }
    return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>ABSENT</span>;
  };

  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <FileX2 className="mx-auto h-12 w-12" />
        <h4 className="mt-4 text-lg font-semibold text-slate-400">No Attendance Records Found</h4>
        <p className="mt-1">There is no detailed session log available to display.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-300 uppercase bg-slate-800/50">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Subject</th>
            <th scope="col" className="px-6 py-3">Topic</th>
            <th scope="col" className="px-6 py-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-b border-slate-700 hover:bg-slate-800/40">
              <td className="px-6 py-4 font-medium text-slate-300 whitespace-nowrap">{log.date}</td>
              <td className="px-6 py-4 font-mono">{log.subject}</td>
              <td className="px-6 py-4">{log.topic}</td>
              <td className="px-6 py-4 text-right">
                <StatusBadge status={log.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};