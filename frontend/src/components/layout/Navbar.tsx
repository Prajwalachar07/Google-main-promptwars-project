import React from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, GraduationCap, Flame, Sparkles, AlertTriangle } from 'lucide-react';
import { ExamType } from '../../types/wellness';

export const Navbar: React.FC = () => {
  const { examMode, setExamMode, entries } = useApp();

  const exams: ExamType[] = ['JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'CUET'];

  // Check if any recent entry is flag as safety distress
  const hasSafetyAlert = entries.some(
    (e) => e.analysis?.safetyCheck.severeDistressDetected === true
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow flex items-center justify-center">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <span className="font-heading font-extrabold text-lg tracking-wide bg-gradient-to-r from-white via-indigo-200 to-violet-400 bg-clip-text text-transparent">
            MINDMITRA AI
          </span>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Study & Wellness Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {hasSafetyAlert && (
          <div className="animate-pulse bg-rose-500/20 border border-rose-500/40 px-3 py-1.5 rounded-lg flex items-center gap-2 text-rose-300 text-xs font-semibold">
            <AlertTriangle className="h-4 w-4" />
            <span>Support Resource Alert Active</span>
          </div>
        )}

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl">
          <span className="text-xs font-semibold text-muted-foreground px-2 flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" />
            EXAM:
          </span>
          <div className="flex gap-1">
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setExamMode(exam)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold uppercase transition-all duration-150 ${
                  examMode === exam
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-xl">
          <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
          <span>Gemini 2.5 Flash</span>
        </div>
      </div>
    </nav>
  );
};
