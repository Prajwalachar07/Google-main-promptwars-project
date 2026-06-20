import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'green' | 'amber' | 'blue' | 'purple';
  description: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, value, icon: Icon, color, description }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'green':
        return {
          glow: 'glow-green',
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10 border-emerald-500/20',
          bar: 'bg-emerald-500',
        };
      case 'amber':
        return {
          glow: 'glow-amber',
          text: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/20',
          bar: 'bg-amber-500',
        };
      case 'blue':
        return {
          glow: 'glow-primary',
          text: 'text-blue-400',
          bg: 'bg-blue-500/10 border-blue-500/20',
          bar: 'bg-blue-500',
        };
      case 'purple':
        return {
          glow: 'glow-primary',
          text: 'text-violet-400',
          bg: 'bg-violet-500/10 border-violet-500/20',
          bar: 'bg-violet-500',
        };
    }
  };

  const styles = getColorStyles();

  return (
    <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between h-40 hover:scale-[1.01] transition-transform duration-200">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          <h3 className={`font-heading font-black text-4xl mt-1 ${styles.text}`}>
            {value}%
          </h3>
        </div>
        <div className={`p-2.5 rounded-xl border ${styles.bg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-auto">
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${styles.bar}`}
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};
