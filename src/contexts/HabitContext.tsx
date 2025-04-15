
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Habit } from '@/types';
import { updatedHabits } from '@/data/mockData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

type HabitContextType = {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'totalCompletions' | 'bestStreak' | 'completionHistory'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (id: string, date: string) => void;
  getHabitById: (id: string) => Habit | undefined;
  getHabitsByCategory: (category: string) => Habit[];
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { toast } = useToast();

  // Load initial habits from mock data
  useEffect(() => {
    setHabits(updatedHabits);
  }, []);

  // Compute current streak based on completion history
  const calculateStreak = (completionHistory: { date: string; completed: boolean }[]): number => {
    let streak = 0;
    const sortedHistory = [...completionHistory].sort((a, b) => 
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

  // Add a new habit
  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'totalCompletions' | 'bestStreak' | 'completionHistory'>) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}`,
      createdAt: today,
      streak: 0,
      totalCompletions: 0,
      bestStreak: 0,
      completionHistory: []
    };
    
    setHabits(prevHabits => [...prevHabits, newHabit]);
    toast({ title: "Success", description: "Habit created successfully" });
  };

  // Update an existing habit
  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
    toast({ title: "Success", description: "Habit updated successfully" });
  };

  // Delete a habit
  const deleteHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    toast({ title: "Success", description: "Habit deleted successfully" });
  };

  // Toggle completion for a specific date
  const toggleCompletion = (id: string, date: string = format(new Date(), 'yyyy-MM-dd')) => {
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id !== id) return habit;

        const existingEntryIndex = habit.completionHistory.findIndex(
          entry => entry.date === date
        );

        let newHistory;
        if (existingEntryIndex >= 0) {
          // Toggle existing entry
          newHistory = [...habit.completionHistory];
          newHistory[existingEntryIndex] = {
            ...newHistory[existingEntryIndex],
            completed: !newHistory[existingEntryIndex].completed
          };
        } else {
          // Create new entry
          newHistory = [
            ...habit.completionHistory,
            { date, completed: true }
          ];
        }

        // Calculate new streak
        const newStreak = calculateStreak(newHistory);
        const wasCompleted = existingEntryIndex >= 0 ? habit.completionHistory[existingEntryIndex].completed : false;
        
        // Calculate total completions
        const newTotalCompletions = wasCompleted 
          ? habit.totalCompletions - 1 
          : habit.totalCompletions + 1;
        
        // Calculate best streak
        const newBestStreak = Math.max(habit.bestStreak, newStreak);

        return {
          ...habit,
          completionHistory: newHistory,
          streak: newStreak,
          totalCompletions: Math.max(0, newTotalCompletions),
          bestStreak: newBestStreak
        };
      });
    });
  };

  // Get a habit by ID
  const getHabitById = (id: string): Habit | undefined => {
    return habits.find(habit => habit.id === id);
  };

  // Get habits by category
  const getHabitsByCategory = (category: string): Habit[] => {
    if (category === 'all') return habits;
    return habits.filter(habit => habit.category === category);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleCompletion,
        getHabitById,
        getHabitsByCategory
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
