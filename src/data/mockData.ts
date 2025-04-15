
import { Habit, Quote } from '../types';
import { addDays, format, subDays } from 'date-fns';

// Helper to generate random completion history for demo
const generateCompletionHistory = (days: number, completionRate = 0.7): { date: string, completed: boolean }[] => {
  const history = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const completed = Math.random() < completionRate;
    history.push({
      date: format(date, 'yyyy-MM-dd'),
      completed
    });
  }
  
  return history;
};

// Helper to calculate current streak based on completion history
const calculateStreak = (history: { date: string, completed: boolean }[]): number => {
  let streak = 0;
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime());
  
  for (const day of sortedHistory) {
    if (day.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Generate habits
export const habits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: 'Start the day with 10 minutes of mindfulness meditation',
    category: 'mindfulness',
    icon: 'brain',
    frequency: 'daily',
    streak: 4,
    totalCompletions: 28,
    bestStreak: 14,
    createdAt: format(subDays(new Date(), 45), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(45, 0.8)
  },
  {
    id: '2',
    name: 'Read 30 pages',
    description: 'Read at least 30 pages of any book',
    category: 'learning',
    icon: 'book-open',
    frequency: 'daily',
    streak: 2,
    totalCompletions: 32,
    bestStreak: 12,
    createdAt: format(subDays(new Date(), 50), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(50, 0.65)
  },
  {
    id: '3',
    name: 'Drink 2L water',
    description: 'Stay hydrated throughout the day',
    category: 'health',
    icon: 'droplets',
    frequency: 'daily',
    streak: 7,
    totalCompletions: 40,
    bestStreak: 21,
    createdAt: format(subDays(new Date(), 60), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(60, 0.9)
  },
  {
    id: '4',
    name: 'Exercise',
    description: 'At least 30 minutes of physical activity',
    category: 'fitness',
    icon: 'dumbbell',
    frequency: 'weekdays',
    streak: 0,
    totalCompletions: 15,
    bestStreak: 8,
    createdAt: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(30, 0.5)
  },
  {
    id: '5',
    name: 'Code practice',
    description: 'Solve at least one coding problem',
    category: 'learning',
    icon: 'code',
    frequency: 'daily',
    streak: 12,
    totalCompletions: 56,
    bestStreak: 20,
    createdAt: format(subDays(new Date(), 70), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(70, 0.8)
  },
  {
    id: '6',
    name: 'Journal',
    description: 'Write down thoughts and reflections',
    category: 'mindfulness',
    icon: 'pen-line',
    frequency: 'daily',
    streak: 3,
    totalCompletions: 25,
    bestStreak: 10,
    createdAt: format(subDays(new Date(), 40), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(40, 0.6)
  },
  {
    id: '7',
    name: 'Social Media Detox',
    description: 'No social media before noon',
    category: 'productivity',
    icon: 'phone-off',
    frequency: 'daily',
    streak: 5,
    totalCompletions: 18,
    bestStreak: 7,
    createdAt: format(subDays(new Date(), 25), 'yyyy-MM-dd'),
    completionHistory: generateCompletionHistory(25, 0.7)
  }
];

export const motivationalQuotes: Quote[] = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "Habits are first cobwebs, then cables.",
    author: "Spanish Proverb"
  },
  {
    text: "You'll never change your life until you change something you do daily.",
    author: "John C. Maxwell"
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun"
  },
  {
    text: "Chains of habit are too light to be felt until they are too heavy to be broken.",
    author: "Warren Buffett"
  },
  {
    text: "First forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not.",
    author: "Octavia Butler"
  },
  {
    text: "Successful people are simply those with successful habits.",
    author: "Brian Tracy"
  },
  {
    text: "The quality of your life is determined by the quality of your habits.",
    author: "James Clear"
  },
  {
    text: "Small habits make big transformations.",
    author: "Anonymous"
  }
];

// Update streaks from completion history
export const updatedHabits = habits.map(habit => {
  const streak = calculateStreak(habit.completionHistory);
  return {
    ...habit,
    streak
  };
});
