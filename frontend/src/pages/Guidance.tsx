import React from 'react';
import { useApp } from '../context/AppContext';
import { Lightbulb, Sparkles, BookOpen, Clock, Activity, Zap } from 'lucide-react';

export const Guidance: React.FC = () => {
  const { entries, examMode } = useApp();

  const latestEntry = entries[0];
  const recommendations = latestEntry?.analysis?.recommendations;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Study & Wellness Advice
        </span>
        <h2 className="font-heading font-black text-2xl text-white">
          AI Study Mentor & Guidance Hub
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-xl">
          Contextual study guidance and cognitive wellness exercises tailored specifically to your log trends.
        </p>
      </div>

      {recommendations ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Study advice */}
          <div className="glass-card p-5 flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center gap-2 mb-3 text-blue-400">
                <BookOpen className="h-4.5 w-4.5" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Study Strategy</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{recommendations.studyAdvice}"
              </p>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              Exam mode context: {examMode}
            </div>
          </div>

          {/* Card 2: Mindfulness */}
          <div className="glass-card p-5 flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <Activity className="h-4.5 w-4.5" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Mindfulness Exercise</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{recommendations.mindfulnessExercise}"
              </p>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              Aim for 5-10 minutes daily
            </div>
          </div>

          {/* Card 3: Break Strategy */}
          <div className="glass-card p-5 flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center gap-2 mb-3 text-indigo-400">
                <Clock className="h-4.5 w-4.5" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Break & Rest Method</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{recommendations.breakStrategy}"
              </p>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              Optimized for mental focus
            </div>
          </div>

          {/* Card 4: Time Management */}
          <div className="glass-card p-5 flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center gap-2 mb-3 text-amber-400">
                <Zap className="h-4.5 w-4.5" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Time Management</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{recommendations.timeManagementTip}"
              </p>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              Prioritize task blocks
            </div>
          </div>

          {/* Card 5: Recovery */}
          <div className="glass-card p-5 flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center gap-2 mb-3 text-rose-400">
                <Activity className="h-4.5 w-4.5" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Melatonin & Rest Recovery</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{recommendations.recoveryAdvice}"
              </p>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              Prevents sleep deprecation
            </div>
          </div>

          {/* Card 6: Motivational encouragement */}
          <div className="glass-card p-5 flex flex-col justify-between h-60 bg-wellness-gradient">
            <div>
              <div className="flex items-center gap-2 mb-3 text-violet-400">
                <Sparkles className="h-4.5 w-4.5 animate-spin-slow" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Daily Encouragement</h4>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-mono italic">
                "{recommendations.motivationalMessage}"
              </p>
            </div>
            <div className="text-[10px] text-indigo-300/80 font-bold uppercase tracking-wider">
              Keep going!
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-8 text-center flex flex-col items-center justify-center space-y-3">
          <Lightbulb className="h-10 w-10 text-muted-foreground/30" />
          <h3 className="text-sm font-bold text-white">No Guidance Available</h3>
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            Write your first journal entry details. The AI will extract context and assemble tailored schedules, time blocking, and sleep adjustment guidelines.
          </p>
        </div>
      )}
    </div>
  );
};
