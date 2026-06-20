import React from 'react';
import { useApp } from '../context/AppContext';
import { ScoreCard } from '../components/dashboard/ScoreCard';
import { BurnoutGauge } from '../components/dashboard/BurnoutGauge';
import { WellnessChart } from '../components/dashboard/WellnessChart';
import { StressRadar } from '../components/dashboard/StressRadar';
import { 
  Zap, 
  Moon, 
  Activity, 
  Calendar, 
  Sparkles,
  BookOpen,
  Plus
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const { dashboardData, examMode, entries } = useApp();

  const latestEntry = entries[0];
  const hasAnalysis = latestEntry?.analysis;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Welcome Hero Card */}
      <div className="relative rounded-3xl border border-white/10 p-8 overflow-hidden bg-wellness-gradient">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
                Aspirant Companion Mode: {examMode}
              </span>
            </div>
            <h1 className="font-heading font-black text-3xl md:text-4xl text-white tracking-tight">
              MindMitra Wellness Dashboard
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mt-2">
              Your comprehensive study-stress analytical engine. Write entries in the AI Journal to trigger real-time mood logging, burnout checks, and cognitive feedback.
            </p>
          </div>
          
          <button
            onClick={() => setActiveTab('journal')}
            className="btn-primary self-start md:self-center flex items-center gap-2"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Write New Journal</span>
          </button>
        </div>
      </div>

      {/* Main score grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard
          title="Daily Wellness Score"
          value={dashboardData.dailyWellnessScore}
          icon={Sparkles}
          color="purple"
          description="Synthesized mood, stress levels, and focus log."
        />
        <ScoreCard
          title="Focus Score"
          value={dashboardData.focusScore}
          icon={Zap}
          color="blue"
          description="Estimated productivity and subject focus level."
        />
        <ScoreCard
          title="Sleep Impact Index"
          value={dashboardData.sleepImpact}
          icon={Moon}
          color="green"
          description="Measures how rest patterns affected study quality."
        />
        <ScoreCard
          title="Study Consistency"
          value={dashboardData.studyConsistency}
          icon={Activity}
          color="amber"
          description="Calculated based on routines mentioned in logs."
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WellnessChart
            stressData={dashboardData.stressTrend}
            motivationData={dashboardData.motivationTrend}
          />
        </div>
        <div>
          <BurnoutGauge riskLevel={dashboardData.burnoutRisk} />
        </div>
      </div>

      {/* Sub-analytics & patterns Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StressRadar subjectStress={dashboardData.subjectStress} />

        <div className="glass-card p-5 flex flex-col justify-between h-80">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Insight Summary
            </span>
            <h3 className="font-heading font-black text-lg text-white mt-0.5">
              Latest AI Cognitive Advice
            </h3>
          </div>

          <div className="my-4 flex-1 overflow-y-auto space-y-3">
            {hasAnalysis ? (
              <>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-indigo-400 mb-1">
                    Study recommendation
                  </p>
                  <p className="text-xs text-slate-200">
                    {latestEntry.analysis?.recommendations.studyAdvice}
                  </p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">
                    Mindfulness exercise
                  </p>
                  <p className="text-xs text-slate-200">
                    {latestEntry.analysis?.recommendations.mindfulnessExercise}
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">
                  No journals analyzed yet. Write your first entry to generate customized suggestions.
                </p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-muted-foreground font-mono">
            Analyzed using {examMode} exam settings
          </div>
        </div>
      </div>
    </div>
  );
};
