import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Search, Filter, Calendar, Activity, ChevronRight } from 'lucide-react';
import { JournalEntry } from '../types/wellness';

export const History: React.FC = () => {
  const { entries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);

  const moods = ['All', '🙂', '😔', '🤯', '😡', '😴', '💪', '🫠'];

  const filteredEntries = entries.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'All' || e.moodEmoji === selectedMood;
    return matchesSearch && matchesMood;
  });

  const displayEntry = activeEntry || filteredEntries[0] || entries[0];

  return (
    <div className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
      {/* Left List Pane */}
      <div className="w-1/2 border-r border-white/10 p-6 flex flex-col justify-between overflow-hidden bg-background/30">
        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Chronological Logs
            </span>
            <h2 className="font-heading font-black text-2xl text-white">
              Journal Logs History
            </h2>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-muted-foreground w-full"
              />
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white font-semibold cursor-pointer"
              >
                {moods.map((mood) => (
                  <option key={mood} value={mood} className="bg-[#0f0f1a] text-white">
                    {mood === 'All' ? 'All Moods' : mood}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mt-4">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setActiveEntry(e)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                    displayEntry?.id === e.id
                      ? 'bg-white/10 border-[#2563EB]'
                      : 'bg-white/5 border-white/5 hover:bg-white/8'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-white/5 rounded-xl">{e.moodEmoji}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                        {e.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(e.entryDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <BookOpen className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground">
                  No journals match current search filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Details Pane */}
      <div className="w-1/2 p-6 overflow-y-auto space-y-6">
        {displayEntry ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#14B8A6]">
                  Detail View
                </span>
                <h3 className="font-heading font-black text-2xl text-white mt-1 leading-snug">
                  {displayEntry.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Logged on {new Date(displayEntry.entryDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <span className="text-3xl bg-white/5 border border-white/10 p-3 rounded-2xl">
                {displayEntry.moodEmoji}
              </span>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed italic">
              "{displayEntry.content}"
            </div>

            {displayEntry.analysis ? (
              <div className="space-y-6">
                {/* Cognitive Score breakdowns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-900/50 border border-white/5 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Anxiety</span>
                    <p className="text-lg font-heading font-black text-white mt-0.5">
                      {displayEntry.analysis.emotions.metrics.anxiety}%
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/50 border border-white/5 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Stress</span>
                    <p className="text-lg font-heading font-black text-white mt-0.5">
                      {displayEntry.analysis.emotions.metrics.stress}%
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/50 border border-white/5 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Confidence</span>
                    <p className="text-lg font-heading font-black text-white mt-0.5">
                      {displayEntry.analysis.emotions.metrics.confidence}%
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/50 border border-white/5 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Motivation</span>
                    <p className="text-lg font-heading font-black text-white mt-0.5">
                      {displayEntry.analysis.emotions.metrics.motivation}%
                    </p>
                  </div>
                </div>

                {/* Challenges & Focus items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                    <h5 className="text-[10px] font-bold text-[#14B8A6] uppercase mb-1.5">Subject Focus</h5>
                    <div className="flex gap-1.5 flex-wrap">
                      {displayEntry.analysis.studyMetrics.subjectFocus.map((s, idx) => (
                        <span key={idx} className="text-xs bg-[#2563EB]/10 text-blue-300 border border-[#2563EB]/20 px-2.5 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                    <h5 className="text-[10px] font-bold text-[#EF4444] uppercase mb-1.5">Challenges</h5>
                    <div className="flex gap-1.5 flex-wrap">
                      {displayEntry.analysis.studyMetrics.challengesFaced.map((c, idx) => (
                        <span key={idx} className="text-xs bg-[#EF4444]/10 text-rose-300 border border-[#EF4444]/20 px-2.5 py-0.5 rounded-full">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No analysis payload available for this entry.</p>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <BookOpen className="h-10 w-10 text-muted-foreground/30 mb-2" />
            <p className="text-xs text-muted-foreground">Select a journal from the left pane to view detailed AI wellness insights.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default History;
