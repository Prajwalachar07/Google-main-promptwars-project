import React from 'react';
import { useApp } from '../context/AppContext';
import { Fingerprint, TrendingUp, AlertCircle, HelpCircle, ShieldAlert } from 'lucide-react';

export const Patterns: React.FC = () => {
  const { entries, examMode } = useApp();

  // Aggregate patterns across all journals
  const patternsList = entries.flatMap((e) => e.analysis?.cognitivePatterns || []);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Hidden Pattern Intelligence
        </span>
        <h2 className="font-heading font-black text-2xl text-white">
          AI Cognitive Pattern Identification
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-xl">
          MindMitra AI scans your log histories to detect long-term recurring stress loops that ordinary trackers overlook.
        </p>
      </div>

      {patternsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patternsList.map((p, idx) => (
            <div key={idx} className="glass-card p-5 relative overflow-hidden flex flex-col justify-between h-48 hover:scale-[1.01] transition-transform duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-rose-500/10 border border-rose-500/20 text-rose-300 px-2 py-0.5 rounded">
                      {p.type}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      Confidence: {p.confidence}%
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-lg text-white mt-2 leading-snug">
                    {p.pattern}
                  </h3>
                </div>
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-muted-foreground">
                  <Fingerprint className="h-5 w-5" />
                </div>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase">Trigger triggers</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {p.triggers.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold bg-white/5 border border-white/10 text-slate-300 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center flex flex-col items-center justify-center space-y-3">
          <Fingerprint className="h-10 w-10 text-muted-foreground/30 animate-pulse" />
          <h3 className="text-sm font-bold text-white">No Patterns Detected Yet</h3>
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            Keep writing journals detailing study sessions, mocks, sleep, and feelings. As your log history grows, Gemini will construct stress correlation insights here.
          </p>
        </div>
      )}

      {/* Typical Patterns Information */}
      <div className="glass-card p-6 border border-white/5">
        <h4 className="font-heading font-bold text-sm text-white mb-3">
          How Hidden Stress Tracking Works
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">01. Log Analysis</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every journal entry is structured into cognitive tokens (subjects studied, scores mentioned, time descriptors).
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">02. Sequence Correlation</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The AI runs background cross-checks to match drop in confidence with study topics (e.g. mock test days and self-doubt).
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-rose-400">03. Preventive Advice</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Once a pattern exceeds a 60% confidence rating, specialized study advice is prepared to offset burnout risks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
