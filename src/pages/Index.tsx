import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { HabitList } from '@/components/habits/habit-list';
import { useHabits } from '@/contexts/HabitContext';
import { useCompanion } from '@/hooks/use-companion';
import { useAddHabit } from '@/contexts/AddHabitContext';
import { useAuth } from '@/contexts/AuthContext';
import { HabitCategory } from '@/types';

// Import new components
import { GreetingSection } from '@/components/dashboard/greeting-section';
import { GuestWelcome } from '@/components/dashboard/guest-welcome';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { HabitListHeader } from '@/components/habits/habit-list-header';
import { CategoryFilter } from '@/components/habits/category-filter';
import { EmptyHabits } from '@/components/habits/empty-habits';

// Category data
const categories: { id: HabitCategory | 'all', label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'health', label: 'Health' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'learning', label: 'Learning' },
  { id: 'social', label: 'Social' },
  { id: 'creativity', label: 'Creativity' },
];

export default function Index() {
  const { habits } = useHabits();
  const { handleAddHabit } = useCompanion();
  const { openAddHabitDialog } = useAddHabit();
  const { user, isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<HabitCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter habits by category and search query
  const filteredHabits = habits.filter(habit => {
    const matchesCategory = activeCategory === 'all' || habit.category === activeCategory;
    const matchesSearch = !searchQuery || 
      habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (habit.description && habit.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Calculate today's streak count
  const todayCompletedCount = habits.filter(habit => 
    habit.completionHistory.some(entry => 
      entry.date === new Date().toISOString().split('T')[0] && entry.completed
    )
  ).length;
  
  // Calculate total habits with active streaks (> 0)
  const activeStreaksCount = habits.filter(habit => habit.streak > 0).length;

  // Handler for adding a new habit
  const handleAddNewHabit = () => {
    handleAddHabit();
    openAddHabitDialog();
  };
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* User Greeting Section - Only shown when logged in */}
        {isAuthenticated && user && (
          <GreetingSection 
            userName={user.name}
            todayCompletedCount={todayCompletedCount}
            totalHabitsCount={habits.length}
            activeStreaksCount={activeStreaksCount}
          />
        )}

        {/* Hero Section - Only shown when not logged in */}
        {!isAuthenticated && <GuestWelcome />}
        
        {/* Statistics Cards - Only shown when logged in */}
        {isAuthenticated && (
          <StatsCards 
            todayCompletedCount={todayCompletedCount}
            totalHabitsCount={habits.length}
            activeStreaksCount={activeStreaksCount}
          />
        )}
        
        {/* Habit List Section */}
        <section>
          <HabitListHeader 
            onSearch={setSearchQuery}
            onAddHabit={handleAddNewHabit}
          />
          
          {/* Category Pills */}
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories}
          />
          
          {/* Habits */}
          {filteredHabits.length > 0 ? (
            <HabitList habits={filteredHabits} />
          ) : (
            <EmptyHabits 
              isSearching={searchQuery.length > 0}
              onAddHabit={handleAddNewHabit}
            />
          )}
        </section>
      </motion.div>
    </MainLayout>
  );
}
