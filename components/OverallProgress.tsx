import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface OverallProgressProps {
  percentage: number;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({ percentage }) => {
  const roundedPercentage = Math.round(percentage);
  const data = [{ name: 'overall', value: roundedPercentage }];
  
  let color = '#22c55e'; // green-500
  if (percentage < 75) color = '#f97316'; // orange-500
  if (percentage < 50) color = '#ef4444'; // red-500

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            angleAxisId={0}
            fill={color}
            cornerRadius={10}
            className="stroke-slate-700"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white text-5xl font-bold"
          >
            {`${roundedPercentage}%`}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
