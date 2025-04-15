
import React from 'react';
import { HabitCard } from './habit-card';
import { Habit } from '@/types';
import { motion } from 'framer-motion';

interface HabitListProps {
  habits: Habit[];
  onHabitClick?: (habit: Habit) => void;
}

export function HabitList({ habits, onHabitClick }: HabitListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {habits.map(habit => (
        <motion.div key={habit.id} variants={item}>
          <HabitCard 
            habit={habit} 
            onClick={() => onHabitClick && onHabitClick(habit)} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
