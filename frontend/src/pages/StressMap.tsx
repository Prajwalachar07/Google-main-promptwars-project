import React from 'react';
import { useApp } from '../context/AppContext';
import { Map, HelpCircle, AlertCircle } from 'lucide-react';

export const StressMap: React.FC = () => {
  const { entries } = useApp();

  // Aggregate triggers from last 5 entries
  const allTriggers = entries
    .slice(0, 5)
    .flatMap((e) => e.analysis?.stressTriggers || []);

  // Consolidate categories
  const categories = [
    { name: 'Study Subjects', key: 'study', count: 0, sum: 0 },
    { name: 'Mock Tests & Marks', key: 'mock-test', count: 0, sum: 0 },
    { name: 'Sleep & Routine', key: 'sleep', count: 0, sum: 0 },
    { name: 'Family expectations', key: 'family', count: 0, sum: 0 },
    { name: 'Social Media & comparison', key: 'social-media', count: 0, sum: 0 },
    { name: 'Time Management', key: 'time-management', count: 0, sum: 0 },
    { name: 'Self Comparison', key: 'self-comparison', count: 0, sum: 0 },
  ];

  allTriggers.forEach((t) => {
    const cat = categories.find((c) => c.key === t.category);
    if (cat) {
      cat.count += 1;
      cat.sum += t.influenceLevel;
    }
  });

  const getMeterColor = (val: number) => {
    if (val > 75) return 'bg-rose-500 border-rose-600';
    if (val > 50) return 'bg-amber-500 border-amber-600';
    return 'bg-emerald-500 border-emerald-600';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Visual stress map
        </span>
        <h2 className="font-heading font-black text-2xl text-white">
          AI Stress Trigger Map
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-xl">
          Visualizing primary sources of stress based on context extracted from journal logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Consolidate triggers list */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
            Consolidated Influence Mapping
          </h3>

          <div className="space-y-4">
            {categories.map((c, idx) => {
              const avg = c.count > 0 ? Math.round(c.sum / c.count) : 0;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{c.name}</span>
                    <span className="text-muted-foreground">{avg}% influence</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getMeterColor(avg)}`}
                      style={{ width: `${avg || 5}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Key Details info card */}
        <div className="glass-card p-6 flex flex-col justify-between min-h-64">
          <div>
            <div className="flex items-center gap-2 mb-3 text-indigo-400">
              <Map className="h-5 w-5" />
              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                How stress triggers are mapped
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our backend parser detects entities (e.g. subjects, exams, hours, family members, sleep logs) in daily logs. It then estimates a relative stress impact factor from 0% (no strain) to 100% (severe cognitive exhaustion).
            </p>
          </div>

          <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl flex items-start gap-2.5 mt-4">
            <AlertCircle className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Study Tip: Try rotating your high-intensity subjects (like math/logic mock sheets) with secondary subjects to distribute cognitive load.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
