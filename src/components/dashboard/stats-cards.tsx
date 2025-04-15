import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { QuoteCarousel } from '@/components/ui/quote-carousel';

interface StatsCardsProps {
  todayCompletedCount: number;
  totalHabitsCount: number;
  activeStreaksCount: number;
}

export function StatsCards({ 
  todayCompletedCount, 
  totalHabitsCount, 
  activeStreaksCount 
}: StatsCardsProps) {
  // Calculate progress percentage safely to prevent division by zero
  const completionPercentage = totalHabitsCount 
    ? Math.round((todayCompletedCount / totalHabitsCount) * 100) 
    : 0;

  // Calculate progress circle stroke dash value
  const circleDashArray = totalHabitsCount 
    ? `${(todayCompletedCount / totalHabitsCount) * 125.6} 125.6` 
    : '0 125.6';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Today's Progress Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h2 className="text-lg font-medium mb-2">Today's Progress</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{todayCompletedCount}/{totalHabitsCount}</p>
            <p className="text-sm text-muted-foreground">habits completed</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <div className="relative w-12 h-12 rounded-full bg-background flex items-center justify-center">
              <svg className="w-12 h-12">
                <circle 
                  className="text-muted" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="20" 
                  cx="24" 
                  cy="24" 
                />
                <circle 
                  className="text-primary" 
                  strokeWidth="2" 
                  stroke="currentColor"
                  fill="transparent" 
                  r="20" 
                  cx="24" 
                  cy="24"
                  strokeDasharray={circleDashArray}
                  strokeDashoffset="0" 
                  transform="rotate(-90 24 24)" 
                />
              </svg>
              <span className="absolute text-xs">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Streak Stats Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h2 className="text-lg font-medium mb-2">Active Streaks</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{activeStreaksCount}</p>
            <p className="text-sm text-muted-foreground">habits on streak</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-theme-energy">
            <Flame size={32} className="animate-flame" />
          </div>
        </div>
      </motion.div>
      
      {/* Motivational Quote */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 md:col-span-1"
      >
        <QuoteCarousel />
      </motion.div>
    </div>
  );
} 