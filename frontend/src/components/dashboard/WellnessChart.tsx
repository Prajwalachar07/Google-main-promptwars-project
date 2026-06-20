import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface WellnessChartProps {
  stressData: { date: string; score: number }[];
  motivationData: { date: string; score: number }[];
}

export const WellnessChart: React.FC<WellnessChartProps> = ({ stressData, motivationData }) => {
  // Merge datasets
  const chartData = stressData.map((item, index) => {
    // Format date to local month day
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return {
      name: formattedDate,
      stress: item.score,
      motivation: motivationData[index]?.score || 0,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#131326] border border-white/10 p-3 rounded-xl shadow-xl">
          <p className="text-[11px] font-mono text-muted-foreground font-bold mb-1.5 uppercase">
            {label}
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#f43f5e]" />
              <span className="text-xs text-rose-300 font-semibold">
                Stress: <span className="font-bold text-white">{payload[0].value}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#6366f1]" />
              <span className="text-xs text-indigo-300 font-semibold">
                Motivation: <span className="font-bold text-white">{payload[1].value}%</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5 h-80 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Stress & Motivation Trend
          </span>
          <h3 className="font-heading font-black text-lg text-white mt-0.5">
            Weekly Wellness Fluctuations
          </h3>
        </div>
        <div className="flex gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-rose-400">
            <div className="h-2.5 w-2.5 rounded bg-rose-500" />
            <span>Stress</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-400">
            <div className="h-2.5 w-2.5 rounded bg-indigo-500" />
            <span>Motivation</span>
          </div>
        </div>
      </div>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMotivation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="#f43f5e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorStress)"
            />
            <Area
              type="monotone"
              dataKey="motivation"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMotivation)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
