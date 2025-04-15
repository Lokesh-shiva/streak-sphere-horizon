
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle, Brain, BookOpen, Droplets, Dumbbell, Code, PenLine, PhoneOff } from 'lucide-react';
import { Habit } from '@/types';
import { useHabits } from '@/contexts/HabitContext';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onClick?: () => void;
}

export function HabitCard({ habit, onClick }: HabitCardProps) {
  const { toggleCompletion } = useHabits();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Check if habit is completed today
  const isCompletedToday = habit.completionHistory.some(
    entry => entry.date === today && entry.completed
  );
  
  // Map icon string to component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'brain': return <Brain size={24} />;
      case 'book-open': return <BookOpen size={24} />;
      case 'droplets': return <Droplets size={24} />;
      case 'dumbbell': return <Dumbbell size={24} />;
      case 'code': return <Code size={24} />;
      case 'pen-line': return <PenLine size={24} />;
      case 'phone-off': return <PhoneOff size={24} />;
      default: return <CheckCircle size={24} />;
    }
  };
  
  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    const today = format(new Date(), 'yyyy-MM-dd');
    toggleCompletion(habit.id, today);
  };

  // Animation variants for the card
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Card className={cn(
        "overflow-hidden",
        isCompletedToday ? "border-l-4 border-l-primary" : ""
      )}>
        <div className="flex items-start p-4">
          <div 
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white bg-habit-${habit.category}`}
          >
            {getIconComponent(habit.icon)}
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">{habit.name}</h3>
              <div onClick={handleCheckboxChange}>
                <Checkbox 
                  checked={isCompletedToday} 
                  className={cn(
                    "h-6 w-6 transition-transform",
                    isCompletedToday && "scale-110"
                  )}
                />
              </div>
            </div>
            
            {habit.description && (
              <p className="text-muted-foreground text-sm line-clamp-1 mt-1">
                {habit.description}
              </p>
            )}
            
            <div className="flex items-center mt-2 gap-2">
              <Badge variant="outline" className="text-xs gap-1">
                <span className="capitalize">{habit.category}</span>
              </Badge>
              
              {habit.streak > 0 && (
                <Badge className="bg-theme-energy text-white border-none gap-1 text-xs">
                  <Flame className="h-3 w-3" />
                  <span>{habit.streak} day streak</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
