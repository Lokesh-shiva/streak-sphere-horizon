
export type ThemeMode = 'light' | 'dark' | 'vibe';

export type HabitCategory = 
  | 'health' 
  | 'fitness' 
  | 'productivity' 
  | 'mindfulness' 
  | 'learning'
  | 'social'
  | 'creativity'
  | 'other';

export type HabitFrequency = 
  | 'daily' 
  | 'weekly'
  | 'weekdays'
  | 'weekends'
  | 'custom';

export interface CompletionHistory {
  date: string; // ISO date string: YYYY-MM-DD
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  icon: string;
  color?: string;
  frequency: HabitFrequency;
  customDays?: number[]; // 0-6 for Sunday-Saturday
  streak: number;
  totalCompletions: number;
  bestStreak: number;
  createdAt: string; // ISO date string
  completionHistory: CompletionHistory[];
}

export interface Quote {
  text: string;
  author: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface HabitStats {
  habitId: string;
  habitName: string;
  category: HabitCategory;
  weeklyCompletion: number; // 0-100 percentage
  monthlyCompletion: number; // 0-100 percentage
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
  chartData: ChartData[];
}
