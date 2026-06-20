import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, HelpCircle, Save, Sparkles, Trash2, ShieldAlert } from 'lucide-react';

export const Journal: React.FC = () => {
  const { entries, addEntry, deleteEntry, isAnalyzing, examMode } = useApp();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('🙂');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const emojis = ['🙂', '😔', '🤯', '😡', '😴', '💪', '🫠'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const newEntry = await addEntry(content, todayStr, moodEmoji, title || 'Journal Entry');
    setContent('');
    setTitle('');
    setSelectedEntryId(newEntry.id);
  };

  const selectedEntry = entries.find((e) => e.id === selectedEntryId) || entries[0];

  return (
    <div className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
      {/* Left Column: Journal Writer & History List */}
      <div className="w-1/2 border-r border-white/10 p-6 overflow-y-auto space-y-6 flex flex-col justify-between bg-background/30">
        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Cognitive Feed
            </span>
            <h2 className="font-heading font-black text-2xl text-white">
              AI Journal Workspace
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Entry Title</label>
              <input
                type="text"
                placeholder="e.g. Tough Thermodynamics Practice session"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">How is your study mood right now?</label>
              <div className="flex gap-2.5">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setMoodEmoji(emoji)}
                    className={`text-xl p-2 rounded-xl transition-all duration-150 border ${
                      moodEmoji === emoji 
                        ? 'bg-indigo-600/30 border-indigo-500 text-white scale-105' 
                        : 'bg-white/5 border-white/10 text-muted-foreground hover:scale-105'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Write freely (Subjects, mock scores, sleep, family or stress factors)</label>
              <textarea
                rows={6}
                placeholder="Write your journal entry here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !content.trim()}
              className="w-full btn-primary flex items-center justify-center gap-2 text-xs py-3 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="spinner" />
                  <span>Gemini Analyzing Entry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4.5 w-4.5" />
                  <span>Analyze Journal & Log wellness</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="border-t border-white/10 pt-4 mt-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Previous Logged Journals ({entries.length})
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntryId(entry.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  selectedEntry?.id === entry.id
                    ? 'bg-white/10 border-indigo-500'
                    : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{entry.moodEmoji}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white truncate max-w-xs">{entry.title}</h4>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(entry.entryDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEntry(entry.id);
                  }}
                  className="text-muted-foreground hover:text-rose-400 p-1.5 rounded-lg"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: AI Analysis Output Details */}
      <div className="w-1/2 p-6 overflow-y-auto space-y-6">
        {selectedEntry ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                  AI Intelligence Report
                </span>
                <h3 className="font-heading font-black text-2xl text-white mt-1">
                  {selectedEntry.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Logged on {new Date(selectedEntry.entryDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <span className="text-3xl bg-white/5 border border-white/10 p-2.5 rounded-2xl">
                {selectedEntry.moodEmoji}
              </span>
            </div>

            {/* Content preview */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-xs text-slate-300 leading-relaxed font-mono italic">
                "{selectedEntry.content}"
              </p>
            </div>

            {selectedEntry.analysis ? (
              <div className="space-y-6">
                {/* Emergency distress block */}
                {selectedEntry.analysis.safetyCheck.severeDistressDetected && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex gap-3 text-rose-300">
                    <ShieldAlert className="h-6 w-6 shrink-0 text-rose-400 animate-bounce" />
                    <div>
                      <h4 className="font-bold text-xs">Emergency safe support triggered</h4>
                      <p className="text-[11px] leading-relaxed mt-1">
                        {selectedEntry.analysis.safetyCheck.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* Score indicators grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-[#1e142e] border border-violet-500/20 rounded-xl text-center">
                    <span className="text-[10px] font-semibold text-violet-400 uppercase">Anxiety</span>
                    <p className="text-xl font-heading font-black text-white mt-0.5">
                      {selectedEntry.analysis.emotions.metrics.anxiety}%
                    </p>
                  </div>
                  <div className="p-3 bg-[#24131c] border border-rose-500/20 rounded-xl text-center">
                    <span className="text-[10px] font-semibold text-rose-400 uppercase">Stress</span>
                    <p className="text-xl font-heading font-black text-white mt-0.5">
                      {selectedEntry.analysis.emotions.metrics.stress}%
                    </p>
                  </div>
                  <div className="p-3 bg-[#11241a] border border-emerald-500/20 rounded-xl text-center">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase">Confidence</span>
                    <p className="text-xl font-heading font-black text-white mt-0.5">
                      {selectedEntry.analysis.emotions.metrics.confidence}%
                    </p>
                  </div>
                </div>

                {/* Stress triggers maps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stress Trigger Assessment</h4>
                  <div className="space-y-2">
                    {selectedEntry.analysis.stressTriggers.map((t, idx) => (
                      <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white">{t.trigger}</span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{t.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">
                            Level: {t.influenceLevel}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Personalized Coping Strategy</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-[#131b26] border border-blue-500/15 rounded-xl">
                      <h5 className="text-[10px] font-bold text-blue-400 uppercase mb-1">Study Advice</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {selectedEntry.analysis.recommendations.studyAdvice}
                      </p>
                    </div>
                    <div className="p-3 bg-[#16241c] border border-emerald-500/15 rounded-xl">
                      <h5 className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Mindfulness Exercise</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {selectedEntry.analysis.recommendations.mindfulnessExercise}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
                <Sparkles className="h-8 w-8 text-indigo-400 mb-2 animate-pulse" />
                <p className="text-xs text-muted-foreground">
                  Analyzing this entry...
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-bold text-muted-foreground">No Entry Selected</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Write a journal entry on the left workspace to begin wellness pattern logs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
