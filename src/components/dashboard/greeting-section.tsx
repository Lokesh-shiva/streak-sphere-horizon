import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface GreetingSectionProps {
  userName: string;
  todayCompletedCount: number;
  totalHabitsCount: number;
  activeStreaksCount: number;
}

export function GreetingSection({ 
  userName, 
  todayCompletedCount, 
  totalHabitsCount, 
  activeStreaksCount 
}: GreetingSectionProps) {
  // Time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Custom message based on user's progress
  const getProgressMessage = () => {
    if (todayCompletedCount === 0) {
      return "You haven't completed any habits yet today. Let's get started!";
    } else if (todayCompletedCount === totalHabitsCount && totalHabitsCount > 0) {
      return "Amazing! You've completed all your habits for today. Great job!";
    } else {
      return `You've completed ${todayCompletedCount} out of ${totalHabitsCount} habits today. Keep going!`;
    }
  };

  return (
    <motion.section 
      className="glass-card p-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getTimeBasedGreeting()}, {userName.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            {getProgressMessage()}
          </p>
        </div>
        {activeStreaksCount > 0 && (
          <div className="hidden md:flex items-center gap-2 bg-primary/10 p-3 rounded-lg">
            <Award className="h-5 w-5 text-theme-energy" />
            <span className="text-sm font-medium">
              {activeStreaksCount} Active {activeStreaksCount === 1 ? 'Streak' : 'Streaks'}
            </span>
          </div>
        )}
      </div>
    </motion.section>
  );
} 