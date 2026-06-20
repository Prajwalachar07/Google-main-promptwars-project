import axios from 'axios';
import { JournalAnalysis } from '../types/wellness';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  async checkHealth(): Promise<boolean> {
    try {
      const res = await api.get('/health');
      return res.status === 200;
    } catch {
      return false;
    }
  },

  async analyzeJournal(content: string, examType: string): Promise<JournalAnalysis> {
    try {
      const res = await api.post('/journals/analyze', { content, exam_type: examType });
      return res.data;
    } catch (err) {
      console.warn('API call failed, fallback to client-side emulation or mock analysis.', err);
      throw err;
    }
  },

  async getInsights(entries: string[]): Promise<any> {
    try {
      const res = await api.post('/insights/generate', { entries });
      return res.data;
    } catch (err) {
      console.warn('API getInsights failed.', err);
      throw err;
    }
  },
};
