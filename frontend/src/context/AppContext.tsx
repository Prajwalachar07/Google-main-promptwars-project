import React, { createContext, useContext, useState, useEffect } from 'react';
import { JournalEntry, ExamType, WellnessDashboardData } from '../types/wellness';

interface AppContextType {
  examMode: ExamType;
  setExamMode: (exam: ExamType) => void;
  entries: JournalEntry[];
  addEntry: (content: string, entryDate: string, moodEmoji: string, title: string) => Promise<JournalEntry>;
  deleteEntry: (id: string) => void;
  dashboardData: WellnessDashboardData;
  isLoading: boolean;
  isBackendConnected: boolean;
  setBackendConnected: (connected: boolean) => void;
  isAnalyzing: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to generate initial mock study / wellness history
const generateMockHistory = () => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const stressScores = [45, 60, 50, 75, 40, 30, 35];
  const motivationScores = [70, 55, 65, 40, 80, 85, 90];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return {
    dailyWellnessScore: 78,
    burnoutRisk: 'Moderate' as const,
    stressTrend: dates.map((d, i) => ({ date: d, score: stressScores[i] })),
    motivationTrend: dates.map((d, i) => ({ date: d, score: motivationScores[i] })),
    focusScore: 82,
    sleepImpact: 68,
    studyConsistency: 85,
    weeklyProgress: days.map((day, i) => ({
      day,
      score: 70 + (i * 4) % 25,
      hours: i === 3 ? 4 : 7 + (i % 3),
    })),
    subjectStress: [
      { subject: 'Mathematics / Quant', stressLevel: 75 },
      { subject: 'Physics / Logic', stressLevel: 85 },
      { subject: 'Chemistry / General', stressLevel: 50 },
      { subject: 'Mock Tests & Practice', stressLevel: 90 },
      { subject: 'Syllabus Coverage', stressLevel: 65 },
    ],
  };
};

const initialMockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Rough Mock Test Day',
    content: 'Attempted a Full Physics mock test today and got super low marks. Honestly, physics is always increasing my anxiety, especially thermodynamics. I feel like I am failing my parents. Stayed up until 3:00 AM studying, now my head is spinning. Will I even clear the cutoff?',
    entryDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    moodEmoji: '😔',
    analysis: {
      emotions: {
        primary: 'Anxious',
        secondary: ['Insecure', 'Fatigued'],
        metrics: {
          anxiety: 85,
          stress: 78,
          confidence: 30,
          motivation: 45,
          productivity: 50,
          burnoutRisk: 68,
          sleepQuality: 40,
        },
      },
      studyMetrics: {
        subjectFocus: ['Physics', 'Mock Test'],
        challengesFaced: ['Time pressure', 'Physics equations', 'Sleep deprivation'],
        studyConsistencyScore: 75,
      },
      stressTriggers: [
        {
          trigger: 'Physics Mock Test',
          category: 'mock-test',
          influenceLevel: 90,
          description: 'A mock test resulted in a severe drop in confidence.',
        },
        {
          trigger: 'Parental Expectation',
          category: 'family',
          influenceLevel: 70,
          description: 'Fear of failing parental hopes.',
        },
        {
          trigger: 'Late-night Study',
          category: 'sleep',
          influenceLevel: 80,
          description: 'Late study routine severely harming sleep cycle.',
        },
      ],
      burnoutAssessment: {
        level: 'High',
        score: 72,
        indicators: [
          'High study load with poor sleep',
          'Academic self-comparison',
          'Elevated anxiety score',
        ],
        preventiveSuggestions: [
          'Strictly sleep by 11:30 PM tonight.',
          'Take a 2-hour complete study break today to walk outdoors.',
          'Solve physics formula checklist instead of high-pressure mock tests for 2 days.',
        ],
      },
      cognitivePatterns: [
        {
          pattern: 'Physics increases anxiety',
          type: 'Trigger Relationship',
          confidence: 90,
          triggers: ['Physics study sessions', 'Mock tests'],
        },
      ],
      recommendations: {
        studyAdvice: 'Split thermodynamics into 3 small sub-topics. Study only 1 sub-topic per day with simple revision notes.',
        mindfulnessExercise: 'Try a 5-minute box breathing routine.',
        breakStrategy: 'Use the 50-10 study ratio: after 50 minutes of studying, get up and completely disconnect.',
        motivationalMessage: 'A single mock test score does not measure your final exam potential.',
        timeManagementTip: 'Study physics during your highest alertness window (usually morning).',
        recoveryAdvice: 'Keep hydration levels high today and listen to ambient instrumental music.',
      },
      safetyCheck: {
        severeDistressDetected: false,
        riskKeywordsIdentified: [],
      },
    },
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [examMode, setExamMode] = useState<ExamType>(() => {
    const saved = localStorage.getItem('mindmitra_exam_mode');
    return (saved as ExamType) || 'JEE';
  });

  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('mindmitra_journals');
    return saved ? JSON.parse(saved) : initialMockEntries;
  });

  const [dashboardData, setDashboardData] = useState<WellnessDashboardData>(generateMockHistory());
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setBackendConnected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    localStorage.setItem('mindmitra_exam_mode', examMode);
  }, [examMode]);

  useEffect(() => {
    localStorage.setItem('mindmitra_journals', JSON.stringify(entries));
    if (entries.length > 0) {
      const analyzedEntries = entries.filter((e) => e.analysis);
      if (analyzedEntries.length > 0) {
        const latest = analyzedEntries[0].analysis!;
        
        // Map from the expanded backend keys if they exist
        const rawAnalysis: any = latest;
        const wellnessScore = rawAnalysis.wellness_score || Math.round(
          (latest.emotions.metrics.confidence +
            latest.emotions.metrics.motivation +
            latest.emotions.metrics.productivity +
            (100 - latest.emotions.metrics.stress) +
            (100 - latest.emotions.metrics.anxiety) +
            latest.emotions.metrics.sleepQuality) /
            6
        );

        const currentRisk = rawAnalysis.burnout?.level || latest.burnoutAssessment?.level || 'Moderate';
        const currentFocus = latest.emotions.metrics.productivity;
        const currentSleep = latest.emotions.metrics.sleepQuality;
        const currentConsistency = latest.studyMetrics.studyConsistencyScore;

        setDashboardData((prev) => ({
          ...prev,
          dailyWellnessScore: wellnessScore,
          burnoutRisk: currentRisk,
          focusScore: currentFocus,
          sleepImpact: currentSleep,
          studyConsistency: currentConsistency,
        }));
      }
    }
  }, [entries]);

  const addEntry = async (content: string, entryDate: string, moodEmoji: string, title: string): Promise<JournalEntry> => {
    setIsAnalyzing(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dynamic client-side calculation
        let anxiety = 50;
        let stress = 60;
        let confidence = 55;
        let motivation = 70;
        let sleep = 65;
        let severeDistress = false;

        const lowerContent = content.toLowerCase();
        if (lowerContent.includes('anxious') || lowerContent.includes('physics')) {
          anxiety += 25;
          stress += 15;
        }
        if (lowerContent.includes('mock') || lowerContent.includes('fail')) {
          confidence -= 20;
          stress += 10;
        }
        if (lowerContent.includes('tired') || lowerContent.includes('sleep')) {
          sleep -= 25;
          stress += 10;
        }
        if (lowerContent.includes('die') || lowerContent.includes('suicide') || lowerContent.includes('give up')) {
          severeDistress = true;
        }

        const newEntry: JournalEntry = {
          id: Math.random().toString(36).substr(2, 9),
          title: title || 'Daily Entry',
          content,
          entryDate,
          createdAt: new Date().toISOString(),
          moodEmoji,
          analysis: {
            emotions: {
              primary: anxiety > 60 ? 'Anxious' : 'Focused',
              secondary: ['Reflective'],
              metrics: {
                anxiety: Math.min(100, Math.max(0, anxiety)),
                stress: Math.min(100, Math.max(0, stress)),
                confidence: Math.min(100, Math.max(0, confidence)),
                motivation: Math.min(100, Math.max(0, motivation)),
                productivity: Math.min(100, Math.max(0, (confidence + motivation) / 2)),
                burnoutRisk: Math.min(100, Math.max(0, (stress + (100 - sleep)) / 2)),
                sleepQuality: Math.min(100, Math.max(0, sleep)),
              },
            },
            studyMetrics: {
              subjectFocus: [examMode === 'JEE' || examMode === 'NEET' ? 'Physics' : 'General Aptitude'],
              challengesFaced: ['Conceptual understanding'],
              studyConsistencyScore: 80,
            },
            stressTriggers: [
              {
                trigger: 'Subject study load',
                category: 'study',
                influenceLevel: stress,
                description: 'Managing general subject revision load.',
              },
            ],
            burnoutAssessment: {
              level: stress > 75 ? 'High' : stress > 50 ? 'Moderate' : 'Low',
              score: stress,
              indicators: ['Consistent academic tracking'],
              preventiveSuggestions: [
                'Take structured 15-minute breaks after 90 minutes.',
                'Prioritize outdoor walking.',
              ],
            },
            cognitivePatterns: [
              {
                pattern: 'Topic reviews correlate with study anxiety',
                type: 'Subject Stress Link',
                confidence: 75,
                triggers: ['Revising heavy course areas'],
              },
            ],
            recommendations: {
              studyAdvice: `Break your ${examMode} study plan into manageable sessions.`,
              mindfulnessExercise: 'Spend 5 minutes doing deep diaphragmatic breathing.',
              breakStrategy: 'Engage in a sensory break — listen to music.',
              motivationalMessage: 'Progression is built step-by-step.',
              timeManagementTip: 'Use time blocking for revision.',
              recoveryAdvice: 'Shut off study screens before sleeping.',
            },
            safetyCheck: {
              severeDistressDetected: severeDistress,
              riskKeywordsIdentified: severeDistress ? ['give up'] : [],
              message: severeDistress
                ? 'We notice you might be experiencing significant distress. Please consider reaching out to trusted family members, a counselor, or calling a support hotline like Vandrevala Foundation (9999 666 555) or AASRA (91-9820466726).'
                : undefined,
            },
          },
        };

        setEntries((prev) => [newEntry, ...prev]);
        setIsAnalyzing(false);
        resolve(newEntry);
      }, 1500);
    });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        examMode,
        setExamMode,
        entries,
        addEntry,
        deleteEntry,
        dashboardData,
        isLoading,
        isBackendConnected,
        setBackendConnected,
        isAnalyzing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
