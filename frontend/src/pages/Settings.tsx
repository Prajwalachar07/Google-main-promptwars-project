import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, ShieldCheck, Database, Key, GraduationCap } from 'lucide-react';
import { ExamType } from '../types/wellness';

export const Settings: React.FC = () => {
  const { examMode, setExamMode, isBackendConnected, setBackendConnected } = useApp();
  const [apiKey, setApiKey] = useState(localStorage.getItem('mindmitra_api_key') || '');
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('mindmitra_supabase_url') || '');

  const exams: ExamType[] = ['JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'CUET'];

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mindmitra_api_key', apiKey);
    localStorage.setItem('mindmitra_supabase_url', supabaseUrl);
    alert('Local client credentials cached successfully.');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          System Preferences
        </span>
        <h2 className="font-heading font-black text-2xl text-white">
          MindMitra AI Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam Category Settings */}
        <div className="glass-card p-6 border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-[#2563EB]">
            <GraduationCap className="h-5 w-5" />
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Exam Mode Selector
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Changing the exam type modifies study recommendations, focus subjects, and time management targets customized to match each syllabus context.
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setExamMode(exam)}
                className={`py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                  examMode === exam
                    ? 'bg-[#2563EB]/20 border-[#2563EB] text-white'
                    : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/8 hover:text-white'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* API backend connection setup */}
        <div className="glass-card p-6 border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-[#14B8A6]">
            <Database className="h-5 w-5" />
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Service Connection Mode
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Toggle between backend API service querying and frontend mock emulation. Emulation operates completely client-side without any server requirements.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBackendConnected(false)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                !isBackendConnected
                  ? 'bg-[#14B8A6]/20 border-[#14B8A6] text-white'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/8'
              }`}
            >
              Emulated Client Mode
            </button>
            <button
              onClick={() => setBackendConnected(true)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isBackendConnected
                  ? 'bg-[#14B8A6]/20 border-[#14B8A6] text-white'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/8'
              }`}
            >
              Live Backend API Mode
            </button>
          </div>
        </div>
      </div>

      {/* Manual Keys Settings */}
      <div className="glass-card p-6 border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-[#8B5CF6]">
          <Key className="h-5 w-5" />
          <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
            API Keys & Supabase URLs (Optional Client Override)
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Optionally store key variables directly in browser localStorage to bypass project default setups.
        </p>

        <form onSubmit={handleSaveKeys} className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Gemini API Key</label>
            <input
              type="password"
              placeholder="AQ.Ab8RN6Lcz..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Supabase URL</label>
            <input
              type="text"
              placeholder="https://yourproj.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <button
            type="submit"
            className="btn-primary text-xs py-2.5 px-6 font-bold"
          >
            Save Client Preferences
          </button>
        </form>
      </div>
    </div>
  );
};
export default Settings;
