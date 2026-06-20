import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScoreCard } from '../components/dashboard/ScoreCard';
import { BurnoutGauge } from '../components/dashboard/BurnoutGauge';
import { WellnessChart } from '../components/dashboard/WellnessChart';
import { StressRadar } from '../components/dashboard/StressRadar';
import { 
  Zap, 
  Moon, 
  Activity, 
  Sparkles,
  BookOpen,
  Plus,
  Trophy,
  Bell,
  Download,
  Calendar,
  Smile,
  Compass,
  ArrowUpRight,
  TrendingUp,
  Brain
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const { dashboardData, examMode, entries } = useApp();
  const [filterMood, setFilterMood] = useState('All');
  const [showNotifications, setShowNotifications] = useState(false);

  const latestEntry = entries[0];
  const hasAnalysis = latestEntry?.analysis;

  // Custom Achievements system
  const achievements = [
    { title: "7-Day Journal Streak", desc: "Maintained consistent logs", unlocked: entries.length >= 7, icon: BookOpen },
    { title: "First AI Insight", desc: "Trigger map generated", unlocked: entries.length >= 1, icon: Sparkles },
    { title: "Rest stabilizer", desc: "Sleep score above 70%", unlocked: dashboardData.sleepImpact > 70, icon: Moon },
    { title: "Discipline Champion", desc: "Completed mock reviews", unlocked: dashboardData.studyConsistency > 80, icon: Trophy },
  ];

  // System Notifications
  const notifications = [
    { title: "Journal reminder", text: "Time to reflect on today's study blocks.", time: "2h ago" },
    { title: "Hydration break", text: "Take a sip of water and look away from screens.", time: "4h ago" },
    { title: "Sleep reminder", text: "Target strictly 7 hours tonight for cognitive recovery.", time: "8h ago" }
  ];

  const handleExport = () => {
    alert("Exporting Weekly Analytics Report (PDF) - Document compiled successfully.");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      
      {/* Top Welcome & Notification Banner */}
      <div className="flex justify-between items-center bg-slate-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/25">
            <Brain className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-white tracking-tight">
              Mitra Dashboard Mode: <span className="text-indigo-400">{examMode}</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Analyzing daily logs for behavioral insights and cognitive stress mapping.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 text-slate-300 relative transition"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-[#EF4444] rounded-full animate-pulse" />
          </button>
          
          <button
            onClick={handleExport}
            className="bg-white/5 border border-white/10 hover:bg-white/8 text-slate-200 text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Notifications Dropdown tray */}
        {showNotifications && (
          <div className="absolute right-6 top-20 w-80 bg-[#0f0f24] border border-white/10 rounded-2xl shadow-xl z-50 p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Wellness Alerts</span>
              <button onClick={() => setShowNotifications(false)} className="text-[10px] text-indigo-400">Close</button>
            </div>
            <div className="space-y-3">
              {notifications.map((n, idx) => (
                <div key={idx} className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-left">
                  <h5 className="text-xs font-bold text-white">{n.title}</h5>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wellness score & Gauge layout row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Apple Health style large circular gauge */}
        <div className="glass-card p-6 flex flex-col justify-between h-80">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase">Wellness Index</span>
            <h3 className="font-heading font-black text-lg text-white mt-0.5">Circular Progress</h3>
          </div>
          <div className="flex justify-center items-center my-4">
            <div className="relative h-32 w-32 flex items-center justify-center rounded-full border-8 border-[#2563EB]/10 border-t-[#2563EB] animate-spin-slow">
              <div className="absolute flex flex-col items-center justify-center bg-[#070712] h-24 w-24 rounded-full">
                <span className="font-heading font-black text-3xl text-white">{dashboardData.dailyWellnessScore}%</span>
                <span className="text-[9px] text-[#14B8A6] uppercase tracking-wider font-bold">Stable</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-white/5 pt-3">
            <div className="flex items-center gap-1.5 text-[#22C55E]">
              <TrendingUp className="h-4.5 w-4.5" />
              <span className="font-bold">+4% vs last week</span>
            </div>
            <span>Calculated from sleep/stress ratios</span>
          </div>
        </div>

        {/* Stress Area Charts */}
        <div className="lg:col-span-2">
          <WellnessChart
            stressData={dashboardData.stressTrend}
            motivationData={dashboardData.motivationTrend}
          />
        </div>
      </div>

      {/* Primary Score Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard
          title="Daily Wellness Score"
          value={dashboardData.dailyWellnessScore}
          icon={Sparkles}
          color="purple"
          description="Average wellness indexes logged."
        />
        <ScoreCard
          title="Productivity Focus"
          value={dashboardData.focusScore}
          icon={Zap}
          color="blue"
          description="Syllabus focus consistency rating."
        />
        <ScoreCard
          title="Sleep Impact Score"
          value={dashboardData.sleepImpact}
          icon={Moon}
          color="green"
          description="Measures nightly recovery index."
        />
        <ScoreCard
          title="Study Consistency"
          value={dashboardData.studyConsistency}
          icon={Activity}
          color="amber"
          description="Routine tracking consistency metric."
        />
      </div>

      {/* Burnout Risk and Subject Stress Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <BurnoutGauge riskLevel={dashboardData.burnoutRisk} />
        </div>
        <div className="lg:col-span-2">
          <StressRadar subjectStress={dashboardData.subjectStress} />
        </div>
      </div>

      {/* Achievements Milestones panel */}
      <div className="glass-card p-6 space-y-4">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase">Aspirant Journey</span>
          <h3 className="font-heading font-black text-lg text-white mt-0.5">Encouraging Achievements</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((a, idx) => {
            const Icon = a.icon;
            return (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  a.unlocked 
                    ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]/20 text-[#8B5CF6]' 
                    : 'bg-white/5 border-white/5 text-muted-foreground opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-indigo-400" />
                  <span className="text-xs font-bold text-white">{a.title}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Memory Reflection Timeline */}
      <div className="glass-card p-6 space-y-4">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase">Timeline logs</span>
          <h3 className="font-heading font-black text-lg text-white mt-0.5">Cognitive Milestones Chronology</h3>
        </div>

        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
          {entries.slice(0, 3).map((e, idx) => (
            <div key={e.id} className="flex gap-4 items-start relative pl-8">
              <div className="absolute left-1.5 top-1.5 h-3.5 w-3.5 rounded-full bg-[#2563EB] border-4 border-[#070712] z-10" />
              <div className="flex-1 bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-[#14B8A6] uppercase">Journal analysis logged</span>
                  <h5 className="text-xs font-bold text-white mt-0.5">{e.title}</h5>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-lg">
                    "{e.content}"
                  </p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground font-mono">
                  {new Date(e.entryDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default Dashboard;
