import React from 'react';
import { Brain, GraduationCap, Flame, Sparkles, ShieldCheck, Zap, ArrowRight, Activity, BookOpen, Map } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#070712] bg-dots text-foreground overflow-y-auto flex flex-col justify-between">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] shadow-glow flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wide bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              MINDMITRA AI
            </span>
            <p className="text-[9px] text-[#14B8A6] uppercase tracking-widest font-bold">
              Study & Wellness Partner
            </p>
          </div>
        </div>
        <button
          onClick={onStart}
          className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
        >
          <span>Aspirant Portal</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex-1 space-y-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#14B8A6] animate-pulse" />
              <span>Google PromptWars 2026 Champion Architecture</span>
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white tracking-tight leading-tight">
              Master Your Exams, <br />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#14B8A6] bg-clip-text text-transparent">
                Guard Your Wellness.
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
              MindMitra AI is the ultimate study-stress diagnostic companion for JEE, NEET, UPSC, and GATE aspirants. We analyze your logs to highlight stress triggers and predict burnout risk.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onStart}
                className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl px-7 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <span>Launch Companion Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#8B5CF6]/15 rounded-3xl blur-2xl pointer-events-none" />
            <div className="glass-card p-6 border border-white/10 relative overflow-hidden animate-float">
              {/* Mock Dashboard Widget preview */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444] animate-ping" />
                  <span className="text-xs font-bold text-slate-300 font-mono">LIVE COGNITIVE LOAD</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-[#14B8A6] border border-[#14B8A6]/20 px-2 py-0.5 rounded font-bold uppercase">
                  JEE Exam Mode
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#8B5CF6]" />
                    <span className="text-xs text-white">Daily Wellness Score</span>
                  </div>
                  <span className="text-sm font-bold text-[#22C55E]">84% Stable</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-[#F59E0B]" />
                    <span className="text-xs text-white">Burnout Probability</span>
                  </div>
                  <span className="text-sm font-bold text-[#F59E0B]">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-heading font-black text-2xl md:text-4xl text-white">
              Why MindMitra AI?
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm max-w-md mx-auto">
              Custom-engineered wellness features designed specifically for Indian competitive exam workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border border-white/5 space-y-3">
              <div className="p-3 bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] rounded-2xl w-fit">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">AI Journal Analysis</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Free write your daily routines, mock scores, and self-doubt. Gemini analyzes underlying sentiments instantly.
              </p>
            </div>

            <div className="glass-card p-6 border border-white/5 space-y-3">
              <div className="p-3 bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] rounded-2xl w-fit">
                <Map className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Stress Trigger Map</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Automatically identifies which subjects (Physics, Quant, GK) or factors (Mock test, sleep) trigger anxiety spikes.
              </p>
            </div>

            <div className="glass-card p-6 border border-white/5 space-y-3">
              <div className="p-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] rounded-2xl w-fit">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Burnout Protection</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Tracks cumulative stress indicators over time to advise when to schedule breaks or sleep revisions.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer / Ethics Section */}
        <div className="glass-card p-6 border border-white/5 bg-gradient-to-r from-slate-900 to-[#070712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-10 w-10 text-[#22C55E] shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-white text-base">Privacy & Safety First Commitment</h4>
              <p className="text-muted-foreground text-xs leading-relaxed mt-1 max-w-2xl">
                MindMitra AI is an educational study advisor and cognitive tracker, not a medical or therapeutic device. We strictly sanitize inputs and flag emergency support lines when severe distress keywords are detected.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-muted-foreground max-w-7xl mx-auto w-full">
        © 2026 MindMitra AI. Built for Google PromptWars. All rights reserved.
      </footer>
    </div>
  );
};
export default Landing;
