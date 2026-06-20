import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, ShieldAlert, Sparkles, HeartHandshake } from 'lucide-react';

export const Burnout: React.FC = () => {
  const { entries, dashboardData } = useApp();

  const latestEntry = entries[0];
  const assessment = latestEntry?.analysis?.burnoutAssessment;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Academic Stress Guard
        </span>
        <h2 className="font-heading font-black text-2xl text-white">
          Burnout Risk Assessment & Recovery
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-xl">
          Track study routine indicators to safeguard cognitive health during exam periods.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Risk indicator & meter */}
        <div className="md:col-span-1 glass-card p-6 flex flex-col justify-between h-72">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase">Current Risk Factor</span>
            <h3 className="font-heading font-black text-4xl text-white mt-1">
              {dashboardData.burnoutRisk}
            </h3>
          </div>

          <div className="my-4">
            <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase mb-1">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>Very High</span>
            </div>
            <div className="w-full h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  dashboardData.burnoutRisk === 'Low' 
                    ? 'bg-emerald-500 w-1/4' 
                    : dashboardData.burnoutRisk === 'Moderate'
                      ? 'bg-amber-500 w-2/4'
                      : dashboardData.burnoutRisk === 'High'
                        ? 'bg-orange-500 w-3/4'
                        : 'bg-rose-500 w-full'
                }`}
              />
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground leading-relaxed p-3 bg-white/5 border border-white/5 rounded-xl">
            Calculated by correlating sleep metrics, anxiety fluctuations, and weekly mock exam schedules.
          </div>
        </div>

        {/* Right Column: Active Indicators & AI Guidance recommendations list */}
        <div className="md:col-span-2 glass-card p-6 flex flex-col justify-between min-h-72">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase">AI Preventive Advice</span>
            <h3 className="font-heading font-bold text-base text-white mt-0.5">
              Identified stress triggers & recovery adjustments
            </h3>
          </div>

          <div className="my-4 space-y-3">
            {assessment ? (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">Warning Flags</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {assessment.indicators.map((ind, idx) => (
                      <span key={idx} className="text-xs font-medium bg-white/5 border border-white/10 text-slate-200 px-3 py-1 rounded-xl">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Preventive Actions</span>
                  <ul className="space-y-1.5">
                    {assessment.preventiveSuggestions.map((sug, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Activity className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">
                  Write and analyze a journal entry to generate custom preventative recovery recommendations.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] text-emerald-300/80 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start">
            <HeartHandshake className="h-4 w-4" />
            <span>Wellness coaching tips updated in real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
};
