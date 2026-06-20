import React from 'react';
import { Activity, Flame, ShieldAlert } from 'lucide-react';

interface BurnoutGaugeProps {
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
}

export const BurnoutGauge: React.FC<BurnoutGaugeProps> = ({ riskLevel }) => {
  const getStyles = () => {
    switch (riskLevel) {
      case 'Low':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20',
          text: 'text-emerald-400',
          indicator: 'bg-emerald-500',
          glow: 'glow-green',
          width: 'w-1/4',
          advice: 'Excellent routine. Maintain current study blocks and sleep consistency.',
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20',
          text: 'text-amber-400',
          indicator: 'bg-amber-500',
          glow: 'glow-amber',
          width: 'w-2/4',
          advice: 'Slight fatigue detected. Monitor late study sessions and take 15m breaks.',
        };
      case 'High':
        return {
          bg: 'bg-orange-500/10 border-orange-500/20',
          text: 'text-orange-400',
          indicator: 'bg-orange-500',
          glow: 'glow-amber',
          width: 'w-3/4',
          advice: 'Warning signs present. Consider reducing mock tests. Sleep at least 7 hours.',
        };
      case 'Very High':
        return {
          bg: 'bg-rose-500/10 border-rose-500/20',
          text: 'text-rose-400',
          indicator: 'bg-rose-500',
          glow: 'glow-red',
          width: 'w-full',
          advice: 'Immediate risk of burnout. Rest completely for 1 day and skip night study.',
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="glass-card p-5 flex flex-col justify-between h-64 hover:scale-[1.01] transition-transform duration-200">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Burnout Assessment
          </span>
          <Flame className={`h-5 w-5 ${styles.text}`} />
        </div>

        <div className="flex items-baseline gap-2">
          <h3 className={`font-heading font-black text-3xl tracking-tight ${styles.text}`}>
            {riskLevel}
          </h3>
          <span className="text-xs text-muted-foreground font-semibold">burnout risk</span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono font-bold mb-1.5 uppercase">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Critical</span>
        </div>
        <div className="w-full h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${styles.indicator}`}
            style={{ width: riskLevel === 'Low' ? '25%' : riskLevel === 'Moderate' ? '50%' : riskLevel === 'High' ? '75%' : '100%' }}
          />
        </div>
      </div>

      <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${styles.bg}`}>
        <ShieldAlert className={`h-4.5 w-4.5 shrink-0 ${styles.text}`} />
        <p className="text-[11px] font-medium leading-relaxed">
          {styles.advice}
        </p>
      </div>
    </div>
  );
};
