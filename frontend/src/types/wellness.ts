export type ExamType = 'JEE' | 'NEET' | 'UPSC' | 'CAT' | 'GATE' | 'CUET';

export interface EmotionMetrics {
  anxiety: number; // 0-100
  stress: number; // 0-100
  confidence: number; // 0-100
  motivation: number; // 0-100
  productivity: number; // 0-100
  burnoutRisk: number; // 0-100
  sleepQuality: number; // 0-100
}

export interface JournalAnalysis {
  emotions: {
    primary: string;
    secondary: string[];
    metrics: EmotionMetrics;
  };
  studyMetrics: {
    subjectFocus: string[];
    hoursStudiedEstimate?: number;
    challengesFaced: string[];
    studyConsistencyScore: number; // 0-100
  };
  stressTriggers: {
    trigger: string;
    category: 'study' | 'mock-test' | 'sleep' | 'family' | 'social-media' | 'time-management' | 'self-comparison' | 'other';
    influenceLevel: number; // 0-100
    description: string;
  }[];
  burnoutAssessment: {
    level: 'Low' | 'Moderate' | 'High' | 'Very High';
    score: number; // 0-100
    indicators: string[];
    preventiveSuggestions: string[];
  };
  cognitivePatterns: {
    pattern: string;
    type: string;
    confidence: number; // 0-100
    triggers: string[];
  }[];
  recommendations: {
    studyAdvice: string;
    mindfulnessExercise: string;
    breakStrategy: string;
    motivationalMessage: string;
    timeManagementTip: string;
    recoveryAdvice: string;
  };
  safetyCheck: {
    severeDistressDetected: boolean;
    riskKeywordsIdentified: string[];
    message?: string; // Emergency safe support text
  };
}

export interface JournalEntry {
  id: string;
  content: string;
  entryDate: string;
  createdAt: string;
  analysis?: JournalAnalysis;
  moodEmoji: string;
  title: string;
}

export interface WellnessDashboardData {
  dailyWellnessScore: number;
  burnoutRisk: 'Low' | 'Moderate' | 'High' | 'Very High';
  stressTrend: { date: string; score: number }[];
  motivationTrend: { date: string; score: number }[];
  focusScore: number;
  sleepImpact: number;
  studyConsistency: number;
  weeklyProgress: { day: string; score: number; hours: number }[];
  subjectStress: { subject: string; stressLevel: number }[];
}
