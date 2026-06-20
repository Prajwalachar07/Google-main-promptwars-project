import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface StressRadarProps {
  subjectStress: { subject: string; stressLevel: number }[];
}

export const StressRadar: React.FC<StressRadarProps> = ({ subjectStress }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#131326] border border-white/10 p-2.5 rounded-xl shadow-xl">
          <p className="text-[11px] font-bold text-rose-300 font-mono uppercase mb-1">
            {payload[0].payload.subject}
          </p>
          <span className="text-xs font-semibold text-white">
            Influence Level: <span className="font-bold">{payload[0].value}%</span>
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5 h-80 flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stress Trigger Map
        </span>
        <h3 className="font-heading font-black text-lg text-white mt-0.5">
          AI Influence Analysis
        </h3>
      </div>

      <div className="w-full h-56 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={subjectStress}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              dataKey="subject" 
              type="category" 
              width={100}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="stressLevel" radius={[0, 4, 4, 0]} barSize={12}>
              {subjectStress.map((entry, index) => {
                const color = entry.stressLevel > 75 
                  ? '#f43f5e' 
                  : entry.stressLevel > 50 
                    ? '#fbbf24' 
                    : '#10b981';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
