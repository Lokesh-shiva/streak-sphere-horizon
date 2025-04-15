
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { HabitList } from '@/components/habits/habit-list';
import { QuoteCarousel } from '@/components/ui/quote-carousel';
import { useHabits } from '@/contexts/HabitContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Flame, Plus, Search, X } from 'lucide-react';
import { HabitCategory } from '@/types';

// Category pills data
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
  const [activeCategory, setActiveCategory] = useState<HabitCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
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
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Hero Section */}
        <section className="mb-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold mb-2">Habit Dashboard</h1>
            <p className="text-muted-foreground">Track your daily habits and build consistent routines.</p>
          </motion.div>
          
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
                  <p className="text-3xl font-bold">{todayCompletedCount}/{habits.length}</p>
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
                        strokeDasharray={`${(todayCompletedCount / habits.length) * 125.6} 125.6`}
                        strokeDashoffset="0" 
                        transform="rotate(-90 24 24)" 
                      />
                    </svg>
                    <span className="absolute text-xs">{Math.round((todayCompletedCount / habits.length) * 100)}%</span>
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
        </section>
        
        {/* Habit List Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-xl font-semibold"
            >
              Your Habits
            </motion.h2>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative w-full md:w-auto"
                  >
                    <Input
                      placeholder="Search habits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setSearchQuery('')}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={16} />
              </Button>
              
              <Button className="gap-1">
                <Plus size={16} /> Add Habit
              </Button>
            </div>
          </div>
          
          {/* Category Pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none"
          >
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full whitespace-nowrap ${
                  activeCategory === category.id ? "" : "bg-background hover:bg-background/80"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>
          
          {/* Habits */}
          {filteredHabits.length > 0 ? (
            <HabitList habits={filteredHabits} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No habits found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? "Try adjusting your search query" 
                  : "Start by adding a new habit"}
              </p>
              <Button>
                <Plus size={16} className="mr-2" /> Add your first habit
              </Button>
            </div>
          )}
        </section>
      </motion.div>
    </MainLayout>
  );
}
